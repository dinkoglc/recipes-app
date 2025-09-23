<template>
  <div class="recipes-page">
    <Header />

    <v-main>
      <v-container>
        <SearchFilter @search="searchQuery = $event" />

        <!-- Add Recipe Button -->
        <v-btn color="success" class="mb-4" @click="addDialog = true">Add Recipe</v-btn>

        <!-- Add Recipe Dialog -->
        <v-dialog v-model="addDialog" max-width="500">
          <v-card>
            <v-card-title>Add New Recipe</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="saveNewRecipe">
                <v-text-field v-model="newRecipe.strMeal" label="Title" required />
                <v-textarea v-model="newRecipe.strInstructions" label="Instructions" required />
                <v-text-field v-model="newRecipe.strMealThumb" label="Image URL" />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="addDialog = false">Cancel</v-btn>
                  <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Tabs -->
        <div class="tabs">
          <v-tabs v-model="activeTab" dark color="primary">
            <v-tab value="all" style="font-weight: 600; font-size: 16px; color: lightskyblue"
              >Svi recepti</v-tab
            >
            <v-tab value="local" style="font-weight: 600; font-size: 16px; color: lightskyblue"
              >Moji recepti</v-tab
            >
            <v-tab value="api" style="font-weight: 600; font-size: 16px; color: lightskyblue"
              >API recepti</v-tab
            >
          </v-tabs>
        </div>
        <div class="pag">
          <!-- Recipe List per tab -->
          <v-window v-model="activeTab">
            <v-window-item value="all">
              <RecipeList
                :recipes="paginatedRecipes"
                @edit="handleEdit"
                @delete="handleDelete"
                @view="openView"
              />
            </v-window-item>

            <v-window-item value="local">
              <RecipeList
                :recipes="paginatedRecipes"
                @edit="handleEdit"
                @delete="handleDelete"
                @view="openView"
              />
            </v-window-item>

            <v-window-item value="api">
              <RecipeList
                :recipes="paginatedRecipes"
                @edit="handleEdit"
                @delete="handleDelete"
                @view="openView"
              />
            </v-window-item>
          </v-window>
        </div>

        <!-- Pagination -->
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          color="black"
          style="font-weight: 600"
          class="my-4"
        />

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" top>
          {{ snackbarMessage }}
          <template #action>
            <v-btn text @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>

        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="500">
          <v-card>
            <v-card-title>Edit Recipe</v-card-title>
            <v-card-text>
              <v-form ref="editForm" @submit.prevent="saveEdit">
                <v-text-field v-model="editedRecipe.idMeal" label="ID" readonly />
                <v-text-field v-model="editedRecipe.strMeal" label="Title" />
                <v-textarea v-model="editedRecipe.strInstructions" label="Instructions" />
                <v-card-actions>
                  <v-btn text @click="editDialog = false">Cancel</v-btn>
                  <v-btn color="primary" type="submit">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- View Dialog -->
        <v-dialog v-model="viewDialog" max-width="600">
          <v-card>
            <v-card-title>{{ viewedRecipe?.strMeal }}</v-card-title>
            <v-card-text>
              <v-img :src="sanitizeUrl(viewedRecipe?.strMealThumb)" class="mb-4" max-height="300" />
              <p>{{ viewedRecipe?.strInstructions }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="viewDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import RecipeList from '@/components/RecipeList.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import { useRecipesStore } from '@/stores/recipes'

export default {
  components: { Header, Footer, RecipeList, SearchFilter },

  data() {
    return {
      activeTab: 'all',
      editDialog: false,
      addDialog: false,
      editedRecipe: { idMeal: '', strMeal: '', strInstructions: '' },
      newRecipe: { strMeal: '', strInstructions: '', strMealThumb: '' },
      currentPage: 1,
      itemsPerPage: 6,
      viewDialog: false,
      viewedRecipe: null,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
      searchQuery: '',
    }
  },

  computed: {
    recipesStore() {
      return useRecipesStore()
    },

    filteredRecipes() {
      const all = this.recipesStore.allRecipes || []

      let base = []
      if (this.activeTab === 'all') base = all
      if (this.activeTab === 'local') base = all.filter((r) => r.isLocal)
      if (this.activeTab === 'api') base = all.filter((r) => !r.isLocal)

      // 🔥 filtriranje po searchQuery
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase()
        base = base.filter(
          (r) =>
            r.strMeal?.toLowerCase().includes(query) ||
            r.strInstructions?.toLowerCase().includes(query),
        )
      }

      return base
    },

    paginatedRecipes() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredRecipes.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.filteredRecipes.length / this.itemsPerPage)
    },
  },

  watch: {
    activeTab() {
      this.currentPage = 1
    },
  },

  async created() {
    await this.recipesStore.fetchRecipes()

    // 🔥 Sanitizacija ID-eva i URL-ova
    this.recipesStore.apiRecipes = this.recipesStore.apiRecipes.map((r, i) => ({
      ...r,
      idMeal: this.sanitizeKey(r.idMeal || `api-${i}`),
      strMealThumb: this.sanitizeUrl(r.strMealThumb),
    }))

    this.recipesStore.localRecipes = this.recipesStore.localRecipes.map((r, i) => ({
      ...r,
      id: this.sanitizeKey(r.id || `local-${i}`),
      strMealThumb: this.sanitizeUrl(r.strMealThumb),
    }))

    console.log(
      '✅ API recipes IDs:',
      this.recipesStore.apiRecipes.map((r) => r.idMeal),
    )
    console.log(
      '✅ Local recipes IDs:',
      this.recipesStore.localRecipes.map((r) => r.id),
    )
  },

  methods: {
    sanitizeKey(value) {
      if (!value) return `recipe-${Date.now()}`
      const cleaned = String(value)
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
      return cleaned.length ? cleaned : `recipe-${Date.now()}`
    },

    sanitizeUrl(url) {
      if (!url || url.trim() === '') {
        return 'https://via.placeholder.com/300x200?text=No+Image'
      }
      return url
    },

    handleEdit(recipe) {
      this.editedRecipe = { ...recipe }
      this.editDialog = true
    },

    async saveEdit() {
      await this.recipesStore.updateRecipe(this.editedRecipe.idMeal, this.editedRecipe)
      this.editDialog = false
      this.snackbarMessage = 'Recept je uređen'
      this.snackbarColor = 'success'
      this.snackbar = true
    },

    async handleDelete(idMeal) {
      await this.recipesStore.deleteRecipe(idMeal)
      this.snackbarMessage = 'Recept je obrisan'
      this.snackbarColor = 'error'
      this.snackbar = true
    },

    async saveNewRecipe() {
      const newId = Date.now().toString()
      const recipeToAdd = {
        idMeal: this.sanitizeKey(newId),
        ...this.newRecipe,
        isLocal: true,
        strMealThumb: this.sanitizeUrl(this.newRecipe.strMealThumb),
      }
      await this.recipesStore.addRecipe(recipeToAdd)
      this.newRecipe = { strMeal: '', strInstructions: '', strMealThumb: '' }
      this.addDialog = false
      this.snackbarMessage = 'Recept je dodan'
      this.snackbarColor = 'success'
      this.snackbar = true
    },

    openView(recipe) {
      this.viewedRecipe = recipe
      this.viewDialog = true
    },
  },
}
</script>

<style scoped>
.recipes-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/public/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.tabs {
  border-radius: 8px;
  padding: 0 16px;
  color: black;
}

.pag {
}
</style>

<template>
  <div class="recipes-page">
    <Header />

    <v-main>
      <v-container>
        <h2>Dummy Recipes List</h2>

        <!-- RecipeList s dummy podacima -->
        <RecipeList
          :recipes="dummyRecipes"
          @edit="handleEdit"
          @delete="handleDelete"
          @view="handleView"
        />
      </v-container>
    </v-main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import RecipeList from '@/components/RecipeList.vue'

export default {
  components: { Header, Footer, RecipeList },
  data() {
    return {
      dummyRecipes: [
        {
          idMeal: '1',
          strMeal: 'Zagrebački odrezak',
          strInstructions: 'Instrukcije za Zagrebački odrezak...',
          strMealThumb: '',
        },
        {
          idMeal: '2',
          strMeal: 'Pura',
          strInstructions: 'Instrukcije za Puru...',
          strMealThumb: '',
        },
      ],
    }
  },
  methods: {
    handleEdit(recipe) {
      alert('Edit clicked: ' + recipe.strMeal)
    },
    handleDelete(recipe) {
      alert('Delete clicked: ' + recipe.strMeal)
    },
    handleView(recipe) {
      alert('View clicked: ' + recipe.strMeal)
    },
  },
}
</script>

<style scoped>
.recipes-page {
  padding: 20px;
}
</style>

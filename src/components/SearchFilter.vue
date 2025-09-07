<template>
  <v-row class="mb-4" align="center">
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="searchQuery"
        label="Search recipes..."
        outlined
        @input="search"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { useRecipesStore } from '@/stores/recipes.js'

export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  setup() {
    const recipesStore = useRecipesStore()
    return { recipesStore }
  },
  methods: {
    search() {
      this.recipesStore.fetchRecipes(this.searchQuery)
    },
  },
}
</script>

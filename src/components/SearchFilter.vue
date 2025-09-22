<template>
  <v-row class="mb-4" align="center">
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="searchQuery"
        label="Search recipes..."
        outlined
        @input="$emit('search', searchQuery)"
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
  methods: {
    search() {
      const recipesStore = useRecipesStore()
      recipesStore.fetchRecipes(this.searchQuery)
    },
  },
}
</script>

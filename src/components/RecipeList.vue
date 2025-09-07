<template>
  <v-row>
    <v-col
      v-for="(recipe, index) in recipes"
      :key="recipe.idMeal || recipe.id || `recipe-${index}`"
      cols="12"
      sm="6"
      md="4"
      --
    >
      >
      <RecipeCard :recipe="recipe" />
    </v-col>
  </v-row>
</template>

<script>
import RecipeCard from './RecipeCard.vue' // prilagodi putanju
export default {
  components: { RecipeCard },
  props: { recipes: Array },
}
</script>

<style scoped>
/* po želji stilovi */
</style>

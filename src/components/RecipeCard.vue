<template>
  <v-card class="mx-auto my-2" max-width="344">
    <v-img
      :src="recipe.strMealThumb || 'https://via.placeholder.com/300x200'"
      :alt="recipe.strMeal"
      height="200"
    />
    <v-card-title>{{ recipe.strMeal }}</v-card-title>
    <v-card-text>
      {{ recipe.strInstructions ? recipe.strInstructions.slice(0, 100) : '' }}...
    </v-card-text>

    <!-- Edit/Delete -->
    <v-card-actions>
      <v-btn color="primary" text @click="$emit('edit', recipe)">Edit</v-btn>
      <v-btn color="error" text @click="$emit('delete', recipe)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    recipe: { type: Object, required: true },
  },
}
</script>

<style scoped>
.v-card {
  background: rgba(0, 0, 150, 0.2);
  color: black;
}
</style>

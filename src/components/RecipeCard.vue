<template>
  <v-card class="recipe-card mx-auto my-2" max-width="344">
    <v-img :src="recipe.strMealThumb || '/placeholder.jpg'" :alt="recipe.strMeal"></v-img>
    <v-card-title>{{ recipe.strMeal }}</v-card-title>
    <v-card-text>
      {{ recipe.strInstructions ? recipe.strInstructions.slice(0, 100) : '' }}...
    </v-card-text>
    <v-card-actions v-if="isLocal">
      <v-btn color="primary" text @click="$emit('edit', recipe)">Edit</v-btn>
      <v-btn color="error" text @click="$emit('delete', safeId)">Delete</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn text @click="$emit('view', recipe)">Vidi više...</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    recipe: { type: Object, required: true },
    isLocal: { type: Boolean, default: false },
  },
  computed: {
    // Siguran ID koji je uvijek string i bez razmaka
    safeId() {
      const id = this.recipe.idMeal || this.recipe.id || 'unknown-id'
      return String(id).replace(/\s+/g, '-')
    },
  },
}
</script>

<style scoped>
.recipe-card {
  background: rgba(0, 0, 150, 0.25); /* tamnoplava prozirna boja */
  color: white; /* tekst bijeli da bude čitljiv */
  border-radius: 12px;
}

/* Opcionalno: naslovi i tekst mogu imati lagani shadow za bolju čitljivost */
.v-card-title,
.v-card-text {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
</style>

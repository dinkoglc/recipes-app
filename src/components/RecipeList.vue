<template>
  <v-row>
    <v-col
      v-for="(recipe, index) in recipes"
      :key="sanitizeKey(recipe.idMeal || recipe.id || `recipe-${index}`)"
      :cols="12 / recipesPerRow"
    >
      <RecipeCard
        :recipe="recipe"
        :isLocal="recipe.isLocal"
        @edit="$emit('edit', recipe)"
        @delete="$emit('delete', recipe.idMeal || recipe.id)"
        @view="$emit('view', recipe)"
      />
    </v-col>
  </v-row>
</template>

<script>
import RecipeCard from './RecipeCard.vue'

export default {
  components: { RecipeCard },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
    recipesPerRow: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    sanitizeKey(value) {
      if (!value) return `recipe-${Date.now()}`

      const cleaned = String(value)
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')

      return cleaned.length > 0 ? cleaned : `recipe-${Date.now()}`
    },
  },
}
</script>

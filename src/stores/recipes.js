import { defineStore } from 'pinia'
import axios from 'axios'

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    apiRecipes: [],
    localRecipes: [],
  }),

  getters: {
    allRecipes: (state) => [...state.apiRecipes, ...state.localRecipes],
  },

  actions: {
    async fetchApiRecipes(query = '') {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        this.apiRecipes = res.data.meals || []
      } catch (err) {
        console.error('❌ Greška kod dohvaćanja API recepata:', err)
      }
    },

    async fetchLocalRecipes() {
      try {
        const res = await axios.get('http://localhost:3000/recipes')
        this.localRecipes = (res.data || []).map((r) => ({
          ...r,
          isLocal: true,
        }))
      } catch (err) {
        console.error('❌ Greška kod dohvaćanja lokalnih recepata:', err)
      }
    },

    async fetchRecipes(query = '') {
      await this.fetchApiRecipes(query)
      await this.fetchLocalRecipes()
    },

    async addRecipe(recipe) {
      try {
        const res = await axios.post('http://localhost:3000/recipes', recipe)
        this.localRecipes.push({ ...res.data, isLocal: true })
      } catch (err) {
        console.error('❌ Greška kod dodavanja recepta:', err)
      }
    },

    async updateRecipe(id, updatedRecipe) {
      try {
        const res = await axios.put(`http://localhost:3000/recipes/${id}`, updatedRecipe)
        const index = this.localRecipes.findIndex((r) => r.id === id || r.idMeal == id)
        if (index !== -1) this.localRecipes[index] = res.data
      } catch (err) {
        console.error('❌ Greška kod ažuriranja lokalnog recepta:', err)
      }
    },

    async deleteRecipe(id) {
      try {
        await axios.delete(`http://localhost:3000/recipes/${id}`)
        this.localRecipes = this.localRecipes.filter((r) => r.idMeal !== id)
      } catch (err) {
        console.error('❌ Greška kod brisanja lokalnog recepta:', err)
      }
    },
  },
})

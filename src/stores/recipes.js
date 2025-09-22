import { defineStore } from 'pinia'
import axios from 'axios'

export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    apiRecipes: [], // recepti s javnog API-ja
    localRecipes: [], // recepti koje korisnik doda (backend)
    // recipes: [],
  }),

  getters: {
    // Kombinirani recepti za prikaz u UI-u
    allRecipes: (state) => [...state.apiRecipes, ...state.localRecipes],
  },

  actions: {
    // Dohvat s javnog API-ja
    async fetchApiRecipes(query = '') {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        this.apiRecipes = res.data.meals || []
      } catch (err) {
        console.error('❌ Greška kod dohvaćanja API recepata:', err)
      }
    },

    // Dohvat lokalnih recepata iz backend-a
    async fetchLocalRecipes() {
      try {
        const res = await axios.get('http://localhost:3000/recipes')
        this.localRecipes = (res.data || []).map((r) => ({
          ...r,
          isLocal: true, // 🔥 sad svi backend recepti dobiju flag
        }))
      } catch (err) {
        console.error('❌ Greška kod dohvaćanja lokalnih recepata:', err)
      }
    },

    // Kombinirani fetch
    async fetchRecipes(query = '') {
      await this.fetchApiRecipes(query)
      await this.fetchLocalRecipes()
    },

    // Dodavanje novog recepta u backend
    async addRecipe(recipe) {
      try {
        const res = await axios.post('http://localhost:3000/recipes', recipe)
        this.localRecipes.push({ ...res.data, isLocal: true })
        // await this.fetchLocalRecipes() // refresha listu iz backend-a
      } catch (err) {
        console.error('❌ Greška kod dodavanja recepta:', err)
      }
    },

    // Edit lokalnog recepta
    async updateRecipe(id, updatedRecipe) {
      try {
        const res = await axios.put(`http://localhost:3000/recipes/${id}`, updatedRecipe)
        const index = this.localRecipes.findIndex((r) => r.id === id || r.idMeal == id)
        if (index !== -1) this.localRecipes[index] = res.data
      } catch (err) {
        console.error('❌ Greška kod ažuriranja lokalnog recepta:', err)
      }
    },

    // Delete lokalnog recepta
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

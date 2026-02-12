const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = 3000

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

app.use(bodyParser.json())

const RECIPES_FILE = './recipes.json'

if (!fs.existsSync(RECIPES_FILE)) {
  fs.writeFileSync(RECIPES_FILE, '[]')
}

const readRecipes = () => JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf-8'))
const writeRecipes = (recipes) => fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2))

app.get('/recipes', (req, res) => {
  const recipes = readRecipes()
  res.json(recipes)
})

let users = []

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }
  users.push({ name, email, password })
  res.status(201).json({ message: 'User created' })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    res.json({ message: 'Login successful', user })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
})

app.post('/recipes', (req, res) => {
  const recipes = readRecipes()
  const newRecipe = { idMeal: Date.now().toString(), ...req.body }
  recipes.push(newRecipe)
  writeRecipes(recipes)
  res.status(201).json(newRecipe)
})

app.put('/recipes/:id', (req, res) => {
  const recipes = readRecipes()
  const index = recipes.findIndex((r) => r.idMeal === req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Recipe not found' })
  recipes[index] = { ...recipes[index], ...req.body }
  writeRecipes(recipes)
  res.json(recipes[index])
})

app.delete('/recipes/:id', (req, res) => {
  let recipes = readRecipes()
  const exists = recipes.some((r) => r.idMeal === req.params.id)
  if (!exists) return res.status(404).json({ message: 'Recipe not found' })
  recipes = recipes.filter((r) => r.idMeal !== req.params.id)
  writeRecipes(recipes)
  res.json({ message: 'Deleted successfully' })
})

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

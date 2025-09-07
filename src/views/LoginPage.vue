<template>
  <v-container class="container" style="height: 100vh">
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text class="loginCard">
            <v-form @submit.prevent="login" ref="form">
              <v-text-field v-model="email" label="Email" required />
              <v-text-field v-model="password" label="Password" type="password" required />
              <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
              <v-btn variant="text" type="submit" @click="$router.push('/signup')">
                Nemaš račun?
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      console.log('Login button clicked')
      try {
        const res = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        })
        alert(res.data.message)
        // Spremi trenutno logiranog korisnika
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user))
        console.log(localStorage.getItem('loggedInUser'))
        this.$router.push('/landing')
      } catch (err) {
        alert(err.response.data.message || 'Login failed')
      }
    },
  },
}
</script>

<style>
#loginCard {
  width: 800px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #f5f5f5; /* svijetlo siva pozadina (opcija) */
  padding: 20px;
  margin: auto;
  width: 100px;
  max-width: 300px;
}
</style>

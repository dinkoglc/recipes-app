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
              <div class="text-center mt-4">
                <v-btn variant="text" color="primary" @click="$router.push('/signup')">
                  Nemaš račun?
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success',
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
        this.snackbarText = res.data.message
        this.snackbarColor = 'success'
        this.snackbar = true

        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user))

        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      } catch (err) {
        this.snackbarText = err.response?.data?.message || 'Login failed'
        this.snackbarColor = 'error'
        this.snackbar = true
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
  background-color: #f5f5f5;
  padding: 20px;
  margin: auto;
  width: 100px;
  max-width: 300px;
}
</style>

<template>
  <v-container class="container" style="height: 100vh">
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title>Sign Up</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="signup" ref="form">
              <v-text-field v-model="name" label="Full Name" required />

              <v-text-field v-model="email" label="Email" required />

              <v-text-field v-model="password" label="Password" type="password" required />

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              />

              <v-btn type="submit" color="primary" class="mt-4" block @click="$router.push('/')">
                Sign Up
              </v-btn>
            </v-form>

            <div class="text-center mt-4">
              <v-btn variant="text" color="primary" @click="$router.push('/login')">
                Već imaš račun?
              </v-btn>
            </div>
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success',
    }
  },

  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        this.snackbarText = 'Passwords do not match!'
        this.snackbarColor = 'error'
        this.snackbar = true
        return
      }

      try {
        const res = await axios.post('http://localhost:3000/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })

        this.snackbarText = res.data.message
        this.snackbarColor = 'success'
        this.snackbar = true

        this.$router.push('/login')
      } catch (err) {
        this.snackbarText = err.response?.data?.message || 'Signup failed'
        this.snackbarColor = 'error'
        this.snackbar = true
      }
    },
  },
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #f5f5f5;
  padding: 20px;
  margin: auto;
  max-width: 800px;
}
</style>

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
              <v-btn type="submit" color="primary" class="mt-4" block>Sign Up</v-btn>
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    async signup() {
      console.log('Login button clicked')
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }

      try {
        const res = await axios.post('http://localhost:3000/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })

        alert(res.data.message)
        this.$router.push('/landing')
      } catch (err) {
        alert(err.response.data.message || 'Signup failed')
      }

      console.log('Signup podaci:', {
        name: this.name,
        email: this.email,
        password: this.password,
      })

      alert('Signup successful')

      this.$router.push('/')
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

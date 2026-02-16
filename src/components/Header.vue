<template>
  <v-toolbar style="background-color: rgba(255, 215, 0, 0.2)">
    <v-toolbar-title style="color: black">Recipes App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/" style="color: black">Home</v-btn>

    <v-btn v-if="!isLoggedIn" text to="/login" style="color: black"> Login </v-btn>

    <v-btn v-if="isLoggedIn" text @click="logout" style="color: black"> Logout </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('loggedInUser')
    },
  },

  methods: {
    logout() {
      localStorage.removeItem('loggedInUser')
      this.$router.push('/landing')
      window.location.reload()
    },
  },
}
</script>

<style scoped></style>

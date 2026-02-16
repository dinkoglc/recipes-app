<template>
  <v-container class="landing-page" fluid>
    <v-row justify="center" align="center" class="text-center my-12">
      <v-col cols="12" md="8">
        <div class="text-background">
          <h1 class="display-2 font-weight-bold mb-4">Dobrodošli u Svijet Recepta!</h1>
          <p class="subtitle-1 mb-6">
            Otkrijte recepte iz cijelog svijeta, dodajte svoje omiljene i istražujte kulinarske
            avanture!
          </p>
        </div>
        <v-btn color="primary" class="mt-4" @click="goToRecipes">Pogledaj recepte</v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="showAlert" type="error" border="left" colored-border prominent class="mt-6">
      Morate biti prijavljeni da biste pristupili receptima!
    </v-alert>

    <v-row justify="center" class="mt-12">
      <v-col cols="12" md="4" class="text-center">
        <v-card outlined>
          <v-card-title class="headline">Dodajte vlastite recepte</v-card-title>
          <v-card-text>
            Pohranite vaše omiljene recepte i podijelite ih s drugim korisnicima.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="text-center">
        <v-card outlined>
          <v-card-title class="headline">Pretražite API recepte</v-card-title>
          <v-card-text>
            Pristupite ogromnoj bazi recepata iz javnog API-ja i inspirirajte se za kuhanje.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
function isLoggedIn() {
  const userStr = localStorage.getItem('loggedInUser')
  return userStr ? JSON.parse(userStr) : null
}

export default {
  data() {
    return {
      showAlert: false,
    }
  },

  methods: {
    goToRecipes() {
      const userStr = localStorage.getItem('loggedInUser')
      const user = userStr ? JSON.parse(userStr) : null

      if (user) {
        this.$router.push({ name: 'RecipesPage' })
      } else {
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 3000)

        this.$router.push({ name: 'LoginPage' })
      }
    },
  },
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')
    no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-background {
  background: rgba(0, 0, 50, 0.5);
  color: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  display: inline-block;
  text-align: center;
}
</style>

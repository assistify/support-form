<template>
<div>
     <Navbar/>
    <div id="app">
      <!-- As a link -->
    <router-view />
  </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import {logout} from './api/login'
export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    makeToast (msg) {
      this.$bvToast.toast(msg.text, {
        title: msg.title,
        autoHideDelay: 5000,
        variant: msg.variant || null,
        toaster: msg.toaster || 'b-toaster-top-right',
        solid: true
      })
    },
    onLogout (event) {
      event.preventDefault()
      const client = {
        server: 'http://localhost:3000',
        userId: this.$route.query.userId,
        authToken: this.$route.query.authToken
      }
      logout(client, () => {
        this.$router.push({name: 'Login'})
      })
    }
  }
}
</script>

<style>
body {
  height: 100vh;
  margin: 0;
  padding: 0px;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 100px;
}

img {
  max-width: 100%;
  max-height: 150px;
  display: inline-block;
}
</style>

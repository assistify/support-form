<template>
  <div>
    <Navbar />
    <div id="app">
      <!-- As a link -->
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { logout, checkMySession } from './api/login'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    this.config = {
      server: 'http://localhost:3000',
      authToken: this.$cookies.get('authToken'),
      userId: this.$cookies.get('userId'),
      admin: this.$cookies.get('admin')
    }
    const session = checkMySession(this.config)
    if (session.status !== 'error') {
      this.$router.push({ name: 'Support' })
    }
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
      logout(this.config, () => {
        this.$router.push({ name: 'Login' })
      })
      this.$cookies.set('authToken', null)
      this.$cookies.set('userId', null)
      this.$cookies.set('admin', null)
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

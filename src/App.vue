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
      server: this.$cookies.get('server'),
      authToken: this.$cookies.get('authToken'),
      userId: this.$cookies.get('userId')
    }
    const session = checkMySession(this.config)
    if (session && session.status !== 'error') {
      this.setMyInfo(session)
      this.$router.push({ name: 'Support' })
    } else {
      console.log('No session found')
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
    setMyInfo (me) {
      this.config.email = me.email
      this.config.name = me.name
      this.config.admin = me.roles.includes('admin')
    },
    doLogin (server, authToken, userId, me) {
      this.$cookies.set('server', this.config.server = server)
      this.$cookies.set('authToken', this.config.authToken = authToken)
      this.$cookies.set('userId', this.config.userId = userId)
      this.setMyInfo(me)

      this.$router.push({ name: 'Support' })
    },
    onLogout (event) {
      event.preventDefault()
      logout(this.config, () => {
        this.$router.push({ name: 'Login' })
      })
      this.$cookies.set('server', null)
      this.$cookies.set('authToken', null)
      this.$cookies.set('userId', null)
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

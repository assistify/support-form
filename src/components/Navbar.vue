<template>
  <b-navbar v-if="$route.name!='Login'" variant="dark" type="dark">
    <b-navbar-brand href="#">
      <img src="../assets/assistify.png" width="50" height="50" alt="assistify" />
      Assistify Support
    </b-navbar-brand>
    <b-navbar-nav class="ml-left">
      <b-nav-item v-show="config">
        <b-nav-item href="#" v-on:click="onConfigure">Configure</b-nav-item>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item right>
        <b-button variant="danger" v-on:click="this.$parent.onLogout">Logout</b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      config: this.showConfigure()
    }
  },
  methods: {
    onConfigure () {
      this.$router.push({name: 'Configure'})
    },
    showConfigure () {
      return this.$parent.config.admin || false
    }
  }
}
</script>

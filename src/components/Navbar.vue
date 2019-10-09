<template>
  <b-navbar variant="dark" type="dark">
    <b-navbar-brand href="#">
      <img src="../assets/assistify.png" width="50" height="50" alt="assistify" />
      Assistify Support
    </b-navbar-brand>
    <b-navbar-nav class="ml-left">
      <b-nav-item>
        <b-nav-item href="#">Configure</b-nav-item>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item right>
        <b-button variant="danger">Logout</b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

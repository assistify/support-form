<template>
  <div>
    <b-modal id="modal">{{ message }}</b-modal>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      message: 'hello'
    }
  }
}
</script>

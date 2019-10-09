<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          channel: 'general',
          keyowrds: 'general'
        },
        {
          channel: 'support',
          keywords: 'Support'
        },
        {
          channel: 'testing',
          keywords: 'unit tests'
        }
      ]
    }
  }
}
</script>

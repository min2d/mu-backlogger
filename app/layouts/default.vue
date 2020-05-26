<template>
  <div>
    <AppNavigation />
    <section class="section">
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import { mapState, mapActions } from 'vuex'

import AppNavigation from '~/components/AppNavigation.vue'

export default {
  components: {
    AppNavigation
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([])
  }
}
</script>

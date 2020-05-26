<template>
  <div class="navbar is-primary">
    <div class="navbar-item">
      <nuxt-link to="/" class="has-text-white">
        mu-backlogger
      </nuxt-link>
    </div>
    <div class="navbar-item">
      <nuxt-link to="/issues" class="has-text-white">
        issues
      </nuxt-link>
    </div>
    <div class="navbar-item">
      <nuxt-link to="/projects" class="has-text-white">
        projects
      </nuxt-link>
    </div>
    <div class="navbar-item">
      <nuxt-link to="/issues/jsonata" class="has-text-white">
        jsonata
      </nuxt-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <nuxt-link to="/settings" class="has-text-white">
          settings
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('settings', ['userId'])
  },
  methods: {
    ...mapActions('settings', ['clearAll'])
  }
}
</script>

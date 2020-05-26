<template>
  <div class="wrap">
    <div>
      <label for="" class="label">sample</label>
      <p>ここは砂場です</p>
      <p>issues{$substringBefore(issueKey,'-'):[$]}</p>
      <p>issues{$string($.id):($)}</p>
      <p>$sum(issues[estimatedHours!=null].estimatedHours)</p>
      <p>issues{$substringBefore(issueKey,'-'):$sum($[estimatedHours!=null].estimatedHours)}</p>
      <p>issues{$substringBefore(issueKey,'-'):$sum($[estimatedHours!=null][status.name!='完了'].estimatedHours)}</p>
    </div>
    <input v-model="query" class="input" type="text" placeholder="">
    <button @click="exec(query)" class="button">
      go
    </button>
    <div>
      {{ result }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  data: function () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState('jsonata', ['result'])
  },
  created() {

  },
  methods: {
    ...mapActions('jsonata', ['exec'])
  }
}
</script>

<style>
</style>

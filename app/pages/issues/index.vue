<template>
  <div class="wrap">
    <b-field>
      <b-select v-model="filterIdSelection" placeholder="filter?">
        <option v-for="(option, key) in filters" :key="key" :value="key">
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <button @click="fetchItems" class="button is-default">
      再取得
    </button>

    <b-table :data="filtered" :narrowed="true">
      <template slot-scope="props">
        <b-table-column :style="{borderLeft:`4px solid ${props.row.color}`}" field="issueKey" label="Issue Key" sortable>
          {{ props.row.issueKey }}
        </b-table-column>
        <b-table-column field="summary" label="Summary">
          <nuxt-link :to="`issues/${props.row.issueKey}`">
            {{ props.row.summary }}
          </nuxt-link>
        </b-table-column>
        <b-table-column field="estimatedHours" label="状態">
          {{ props.row.status.name|| '' }}
        </b-table-column>
        <b-table-column
          field="estimatedHours"
          label="予定"
        >
          {{ (props.row.estimatedHours == 0) ? 0 : (props.row.estimatedHours || '') }}
        </b-table-column>
        <b-table-column
          field="actualHours"
          label="実績"
        >
          {{ (props.row.actualHours == 0) ? 0 : (props.row.actualHours || '') }}
        </b-table-column>
        <b-table-column field="completedAt" label="完了日" sortable>
          {{ props.row.completedAt || '' }}
        </b-table-column>
        <b-table-column field="completedAt" label="本家">
          <a :href="backlogUrlBase +'/view/'+props.row.issueKey" target="_blank">本家</a>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('settings', ['backlogUrlBase']),
    ...mapGetters('issues', ['filtered', 'filters']),
    filterIdSelection: {
      get() {
        return this.$store.getters['issues/filterIdSelection']
      },
      set(filterId) {
        this.$store.commit('issues/setFilterIdSelection', filterId)
      }
    }
  },
  created() {
    this.$store.dispatch('issues/fetchItems')
  },
  methods: {
    ...mapActions('issues', ['fetchItems'])
  }
}
</script>

<style lang="scss">
@import "~assets/scss/variables";
.select {
  select option {
    color: $front;
  }
  &.is-empty select {
    color: $front;
  }
}
</style>

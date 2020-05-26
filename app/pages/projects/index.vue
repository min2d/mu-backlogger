<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-size-3">
        projects
      </h1>
      <div>灰色のは完了日IDです。取得できていれば課題ページで「本日で完了」ボタンが使えます</div>
      <div>再取得はプロジェクト数ぶんのアクセスを行いますので一度押したらロードが終了するまでお待ちください</div>
      <button @click="fetchItems" class="button">
        再取得
      </button>
      <div class="box">
        <b-table :data="items" :narrowed="true">
          <template slot-scope="props">
            <b-table-column field="name" label="Name" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="completedAtFieldId" label="完了日フィールドID">
              <span
                v-if="props.row.completedAtFieldId"
                for
                class="tag"
              >{{ props.row.completedAtFieldId }}</span>
            </b-table-column>
            <b-table-column field="completedAtFieldId" label="色">
              <b-field>
                <b-input @input="colorInput($event, props.row.id)" :value="props.row.color ||'#000000'" type="color" style="width:70px;" />
                <span class="tag">#sample</span>
              </b-field>
            </b-table-column>
            <b-table-column field label="github">
              <b-field>
                <b-input
                  :value="props.row.github"
                  @input="githubInput($event, props.row.id)"
                  style="width:70%;"
                />
                <a
                  v-if="props.row.github"
                  :href="githubUrlBase + '/' + props.row.github"
                  class="button"
                >open</a>
              </b-field>
            </b-table-column>
            <b-table-column field label="本家">
              <a :href="backlogUrlBase + '/projects/' + props.row.projectKey" target="_blank">本家</a>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('settings', ['githubUrlBase', 'backlogUrlBase']),
    ...mapGetters('projects', ['getItems']),
    items() {
      return this.getItems
    }
  },
  methods: {
    ...mapActions('projects', ['fetchItems']),
    ...mapMutations('projects', ['setExternal']),
    githubInput(e, id) {
      this.setExternal({ external: { id: id, github: e } })
    },
    colorInput(e, id) {
      this.setExternal({ external: { id: id, color: e } })
    }
  }
}
</script>

<style>
</style>

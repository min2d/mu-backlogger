<template>
  <div class="section">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            settings
          </div>
        </div>
        <div class="card-content">
          <div class="field has-addons">
            <div class="control is-expanded">
              <label for="">APIキー</label>
              <input v-model="apiKey" type="text" class="input" placeholder="API key">
            </div>
          </div>
          <div class="field">
            <div class="control is-expanded">
              <label for="">ユーザーID(数字5,6桁)</label>
              <input v-model="userId" type="text" class="input" placeholder="userID">
            </div>
          </div>
          <div class="field">
            <div class="control is-expanded">
              <label for="">github リンク用URL</label>
              <input v-model="githubUrlBase" type="text" class="input" placeholder="https://github.com/xxxxx">
            </div>
          </div>
          <div class="field">
            <div class="control is-expanded">
              <label for="">Backlog ベースURL</label>
              <input v-model="backlogUrlBase" type="text" class="input" placeholder="https://xxxxx.backlog.com">
            </div>
          </div>
          <div class="field">
            <div class="control is-expanded">
              <label for="">完了日計算に使用する追加フィールド名</label>
              <p class="is-size-7">
                このフィールドの値は completedAt として jsonに挿入されます
              </p>
              <input v-model="customFieldName" type="text" class="input" placeholder="完了日">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

const attrList = ['userId', 'apiKey', 'githubUrlBase', 'backlogUrlBase', 'customFieldName']

function _computed() {
  return attrList.reduce((map, str) => {
    map[str] = {
      get() {
        return this.$store.state.settings[str]
      },
      set(val) {
        this.$store.commit('set' + str.charAt(0).toUpperCase() + str.slice(1), val)
      }
    }
    return map
  }, {})
}

export default {
  data: () => {
    return {
    }
  },
  computed: {
    ..._computed()
  },
  methods: {
  }
}
</script>

<style>
</style>

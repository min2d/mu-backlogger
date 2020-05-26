<template>
  <div class="container">
    <div class="content">
      <h2 class="subtitle">
        {{ item.issueKey }}
        <a :href="backlogUrl" target="_blank" class="is-size-6">{{ backlogUrl }}</a>
      </h2>
      <h1 class="title is-2">
        {{ item.summary }}
      </h1>
    </div>
    <div class="columns">
      <!-- <div class="column">
        <div class="box">
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </div>-->
      <div class="column">
        <div class="box has-text-centered">
          <div class="content">
            実績時間
            <span class="title is-4" style="padding:0 .2em">{{ item.actualHours }}</span>h
          </div>
          <div class="field has-addons">
            <div class="field-body">
              <div v-for="num in [0.5, 1, 2]" :key="num">
                <button
                  @click="hoursInput= (Number(hoursInput))+num"
                  class="button is-default"
                >
                  {{ num }}
                </button>
              </div>
              <div class="control">
                <input v-model="hoursInput" type="text" class="input">
              </div>
              <div class="control">
                <a class="button is-static">h</a>
              </div>
            </div>
          </div>
          <div>
            <button @click="addHoursClicked" class="button is-default">
              追加
            </button>
            <button @click="writeHoursClicked" class="button is-default">
              にする
            </button>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box has-text-centered">
          <div class="content">
            ステータス
            <span class="title is-4" style="padding:0 .2em">{{ item.status.name }}</span>
          </div>
          <div class="content">
            完了日
            <span class="title is-4" style="padding:0 .2em">{{ item.completedAt || '未入力' }}</span>
          </div>
          <div>
            <button @click="completeToday({item})" class="button">
              本日で完了登録
            </button>
            <button @click="completeLastMonth({item})" class="button">
              先月末で完了登録
            </button>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box has-text-centered">
          種別:{{ item.issueType.name }}
        </div>
        <div class="box has-text-centered">
          <div>
            <a :href="githubUrl" target="_blank" class="is-size-6">github</a>
            <a :href="githubPrUrl" target="_blank" class="is-size-6">PR</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="is-size-7 has-text-info">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      hoursInput: null,
      form: {
        addHours: null,
        writeHours: null
      }
    }
  },
  computed: {
    ...mapState('settings', ['backlogUrlBase', 'githubUrlBase']),
    ...mapState('issues', ['item']),
    backlogUrl() {
      return this.backlogUrlBase + '/view/' + this.item.issueKey
    },
    githubUrl() {
      if (!this.item.github) {
        return null
      }
      return this.githubUrlBase + '/' + this.item.github
    },
    githubPrUrl() {
      if (!this.githubUrl) {
        return null
      }
      return this.githubUrl + '/pulls'
    }
  },
  created() {
    this.$store.dispatch('issues/loadItem', { id: this.$route.params.id })
  },
  methods: {
    ...mapActions('issues', [
      'completeToday',
      'completeLastMonth',
      'addHours',
      'writeHours'
    ]),
    addHoursClicked() {
      this.addHours({ item: this.item, hours: this.hoursInput })
      this.hoursInput = null
    },
    writeHoursClicked() {
      this.writeHours({ item: this.item, hours: this.hoursInput })
      this.hoursInput = null
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  white-space: pre-line;
}
</style>

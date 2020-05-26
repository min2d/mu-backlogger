<template>
  <div class="section">
    <div class="container">
      <!-- グラフ -->
      <div class="columns">
        <div class="column">
          <p>
            <input v-model="plotlyLightMode" type="checkbox">
            <label for>白背景グラフ</label>
          </p>
          <p>最新状態にするにはissuesを一回表示してください</p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p>Last Month</p>
          <plotly
            :data="plotlyData.get('LastMonth')"
            :layout="plotlyLayout"
            :display-mode-bar="false"
          />
        </div>
        <div class="column">
          <p>This Month</p>
          <plotly
            :data="plotlyData.get('ThisMonth')"
            :layout="plotlyLayout"
            :display-mode-bar="false"
          />
        </div>
      </div>

      <p>今月の入力済み時間 {{ sumOfCompletedThisMonthHours }}h</p>
      <p>weekday:{{ daysInThisMonth }}日中{{ workDaysInThisMonth }}日({{ workDaysInThisMonth * hoursPerDay }}時間)</p>
      <p>経過{{ passedWorkDaysInThisMonth * hoursPerDay }}時間/残り{{ remainWorkDaysInThisMonth * hoursPerDay }}時間</p>

      <b-collapse :open="false" class="card" aria-id="settings">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="settings"
        >
          <p class="card-header-title">
            Settings
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="field is-horizontal">
              <span style="align-self:center;">1日あたり時間数</span>
              <div class="control">
                <input v-model="hoursPerDay" class="input" type="number">
              </div>
              <span style="align-self:center;">時間</span>
            </div>
            <!-- <div class="field is-horizontal">
              <span style="align-self:center;">N月休み日数[かり]</span>
              <div class="control">
                <input class="input" type="number">
              </div>
              <span style="align-self:center;">日</span>
            </div>-->
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import moment from 'moment'
import { Plotly } from 'vue-plotly'
export default {
  components: {
    Plotly
  },
  data() {
    return {
      hoursPerDay: 8,
      clockPickerData: null,
      plotlyLightMode: false,
      plotlyLayoutDark: {
        // plot_bgcolor: '#333333',
        paper_bgcolor: '#333333',
        font: {
          color: '#eeeeee'
        }
      },
      plotlyLayoutLight: {
        // plot_bgcolor: '#333333',
        paper_bgcolor: '#fff',
        font: {
          color: '#333'
        }
      },
      plotlyDataStyle: {
        textinfo: 'label+percent',
        type: 'pie',
        showlegend: false
      }
    }
  },
  computed: {
    ...mapState('analytics', []),
    ...mapGetters('issues', [
      'completedThisMonthHours',
      'completedLastMonthHours'
    ]),
    daysInThisMonth() {
      return moment().daysInMonth()
    },
    workDaysInThisMonth() {
      const from = moment().startOf('month')
      const to = moment().endOf('month')
      return workDays(from, to)
    },
    passedWorkDaysInThisMonth() {
      const from = moment().startOf('month')
      const to = moment()
      return workDays(from, to)
    },
    remainWorkDaysInThisMonth() {
      return this.workDaysInThisMonth - this.passedWorkDaysInThisMonth
    },
    sumOfCompletedThisMonthHours() {
      // 合計してるだけ
      if (this.completedThisMonthHours.length < 1) {
        return null
      }
      return this.completedThisMonthHours
        .map((e) => {
          return e.hours
        })
        .reduce(function (prev, current, i, arr) {
          return prev + current
        })
    },
    // lastMonthData() {
    //   return [Object.assign({
    //     values: this.completedLastMonthHours.map((item) => { return item.hours }),
    //     labels: this.completedLastMonthHours.map((item) => { return item.projectKey })
    //   }, this.plotlyDataStyle)]
    // },
    plotlyLayout() {
      return this.plotlyLightMode
        ? this.plotlyLayoutLight
        : this.plotlyLayoutDark
    },
    plotlyData() {
      return new Map(
        ['LastMonth', 'ThisMonth'].map((str) => {
          return [
            str,
            [
              Object.assign(
                {
                  values: this[`completed${str}Hours`].map((item) => {
                    return item.hours
                  }),
                  labels: this[`completed${str}Hours`].map((item) => {
                    return item.projectKey
                  })
                },
                this.plotlyDataStyle
              )
            ]
          ]
        })
      )
    }
  },
  methods: {
    ...mapActions('analytics', []),
    ...mapMutations('analytics', [])
  }
}

function workDays(fromMoment, toMoment) {
  const diff = toMoment.diff(fromMoment, 'day')
  const weeks = Math.floor(diff / 7)
  const remain = diff % 7
  const firstDay = fromMoment.day()
  let holidayInRemain = 0
  for (let i = 0; i < remain; i++) {
    const day = firstDay + i
    if (day === 6 || day === 7) {
      holidayInRemain++
    }
  }
  // TODO 祝日を引きたい
  return diff - weeks * 2 - holidayInRemain
}
</script>

<style lang="scss">
</style>

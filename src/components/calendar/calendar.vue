<template>
    <v-touch v-on:swipe="swipe">
    <div class="header" v-if="!isHideNextPre">
      <div class="left" @click="toPreMonth"><</div>
      <div class='title'>{{calendar.year}} 年 {{calendar.month}} 月</div>
      <div class="right" @click="toNextMonth">></div>
    </div>
    <div class="weeks">
      <span class="item hday">日</span><span class="item">一</span><span class="item">二</span><span class="item">三</span><span class="item">四</span><span class="item">五</span><span class="item hday">六</span>
    </div>
    <div class="dates">
    <transition-group name="list" tag="div" :css="false" @before-enter="beforeEnter" @enter="enter">
      <span class="item" v-for="(day, index) in dayList" v-bind:key="index" @click="setSelectedDay(day)">
        <div class="date-num" :class="{'hday': day.week === 6 || day.week === 0}">
          <div class="f14" :class="{'is-today': day.isToday}" v-show="day.status">{{day.day}}</div>
          <div v-show="day.status && day.dayMsg.length" class="color-999 h20" :class="{'selected': day.isToday}">{{day.dayMsg}}</div>
          <div v-if="day.event && day.status" class="event"></div>
        </div>
      </span>
    </transition-group>
    </div>
    </v-touch>
</template>

<script>
export default {
  name: 'bm-calendar',
  data () {
    return {
      dayList: [],
      curDay: {},
      action: 'cur', // 用来记录手势，是前进还是后退，以便完成动画
      toDateFormate: ''
    }
  },
  props: {
    isHideNextPre: {
      type: Boolean,
      default: false
    },
    calendar: {
      type: Object,
      required: false,
      default: function () {
        return {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate()
        }
      }
    },
    events : {
      type: Array,
      require: false,
      default: () => []
    },
    daysMsg: {
      type: Array,
      require: false,
      default: () => []
    }
  },
  watch: {
    events (newEvents) {
      // 设置小黑点
      // 先把原有的小黑点清除
      this.dayList.forEach((value) => {
        value.event = false
      })
      for (let event of newEvents) {
        for (let day of this.dayList) {
          if (day.formate === event) {
            day.event = true
            break
          }
        }
      }
    },
    daysMsg () {
      this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
      if (this.toDateFormate) {
        this.dayList.find( n => {
          if (n.formate === this.toDateFormate) this.setSelectedDay(n)
        })
      }
    }
  },
  mounted () {
    this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
    this.$emit('cur-day-changed', this.calendar.year + '/' + this.calendar.month + '/' + this.calendar.day)
  },
  methods: {
    getDayList(year, month) {
      // 计算1号时间戳
      let firstDay = new Date(year + '/' + month + '/01')
      let startTimestamp = firstDay-1000*60*60*24*firstDay.getDay()
      let item, status, tempArr = [], tempItem,tempDayMsg, dayMsgIndex = 0, now = new Date()
      for (let i = 0 ; i < 42 ; i++) {
          item = new Date(startTimestamp + i*1000*60*60*24)
          if (parseInt(month) === item.getMonth() + 1) {
            status = 1
            if (this.daysMsg.length > 0) {
              tempDayMsg = this.daysMsg[dayMsgIndex++]
            }
          } else {
            status = 0
          }
          let formate = `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`
          let index = this.events.findIndex((value, index) => {
            return value === formate
          })
          tempItem = {
            formate: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
            day: item.getDate(),
            week: item.getDay(),
            time: item.getTime(),
            isToday: formate === (this.curDay.formate || `${this.calendar.year}/${this.calendar.month}/${this.calendar.day}`),
            status: status,
            event: index > -1 ? true : false,
            dayMsg: tempDayMsg || ''
          }
          if (tempItem.isToday) {
            this.curDay = tempItem
          }
          tempArr.push(tempItem)
      }
      return tempArr    
    },
    setSelectedDay (day) {
      this.$emit('cur-day-changed', day.formate || day)
      this.curDay.isToday = false
      day.isToday = true
      this.curDay = day
    },
    // 跳转到指定日期并选中
    toDate (date) {
      // 判断目标日期是否在本月内
      let targe = this.dayList.find( n => {
        return n.formate === date && n.status === 1
      })
      if (targe) {
        this.setSelectedDay(targe)
      } else {
        this.toDateFormate = date
        // 切换月再设置选中日期
        let year = new Date(date).getFullYear()
        let month = new Date(date).getMonth() + 1
        let day = new Date(date).getDate()
        this.calendar.year = year
        this.calendar.month = month
        this.calendar.day = day
        if (this.daysMsg.length > 0) {
          this.$emit('cur-month-changed', `${this.calendar.year}/${this.calendar.month}/01`)
        } else {
          this.dayList = this.getDayList(year, month)
          this.dayList.find( n => {
            if (n.formate === date) this.setSelectedDay(n)
          })
        }
      }
    },
    toMonth (date) {
      // 判断目标日期是否在本月内
      let targe = this.dayList.find( n => {
        return n.formate === date && n.status === 1
      })
      if (targe) return
      // 切换月
      this.toDateFormate = ''
      let year = new Date(date).getFullYear()
      let month = new Date(date).getMonth() + 1
      let day = new Date(date).getDate()
      this.calendar.year = year
      this.calendar.month = month
      this.calendar.day = day
      if (this.daysMsg.length > 0) {
        this.$emit('cur-month-changed', `${this.calendar.year}/${this.calendar.month}/01`)
      } else {
        this.dayList = this.getDayList(year, month)
      }
    },
    toNextMonth () {
      if (this.calendar.month === 12) {
        this.calendar.year = parseInt(this.calendar.year) + 1
        this.calendar.month = 1
      } else {
        this.calendar.month = parseInt(this.calendar.month) + 1
      }
      this.action = 'next'
      this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
      this.$emit('cur-month-changed', `${this.calendar.year}/${this.calendar.month}/01`)
    },
    toPreMonth () {
      if (this.calendar.month === 1) {
        this.calendar.year = parseInt(this.calendar.year) - 1
        this.calendar.month = 12
      } else {
        this.calendar.month = parseInt(this.calendar.month) - 1
      }
      this.action = 'pre'
      this.dayList = this.getDayList(this.calendar.year, this.calendar.month)
      this.$emit('cur-month-changed', `${this.calendar.year}/${this.calendar.month}/01`)
    },
    swipe (e) {
      if (e.deltaX > 0) {
        this.toPreMonth()
      } else {
        this.toNextMonth()
      }
    },
    beforeEnter (el, done) {
      el.style.opacity = 0
      el.style.transform = `translateX(${this.action === 'next' ? 50 : -50}px)`
      el.style.transition = 'all .5s'
    },
    enter (el, done) {
      setTimeout(() => {
        el.style.opacity = 1
        el.style.transform = 'translateX(0px)'
      }, 0)
    }
  }
}
</script>

<style scoped>
.color-999 { color: #999; }
.f14 { font-size: 14px; }
.selected {color: #1eb8ff}
.h20 {height: 20px}
.header {
  padding: 15px;
  overflow: hidden;
}
.header > div{
  float: left;
  font-size: 14px;
  color: #1EB8FF;
}
.header .left{
  width: 20%;
  text-align: left;
}
.header .right {
  width: 20%;
  text-align: right;
}
.header .title {
  text-align: center;
  width: 60%;
}
.item {
  font-size: 12px;
}
.hday {
  color: #999;
}
.weeks {
  line-height: 32px;
}
.weeks,.dates {
  text-align: center;
  font-size: 20px;
  width: 100%;
  overflow: hidden;
}
.dates .item {
  line-height: 20px;
}
.dates>div {
  width: 100%;
}
.weeks span{
  width: 14.2%;
  display: inline-block;
  vertical-align: top;
}
.dates span {
  width: 14.2%;
  display: inline-block;
  margin: 5px 0;
  vertical-align: top;
}
.is-today {
  background: #1EB8FF;
  border-radius: 50%;
  color: #fff;
  width: 20px;
  height: 20px;
  margin:0 auto;
}
.is-today ~ .event {
  background: #1EB8FF;
}
.event {
  background: #999;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 2px auto 0 auto;
}
</style>

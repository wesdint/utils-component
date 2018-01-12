<template>
	<div>
		<bm-calendar @cur-day-changed="dayChange" ref="calendar" :events="events" @cur-month-changed="resChange" :daysMsg="daysMsg"></bm-calendar>
		<div class="action">
			<p>当前选中日期{{selectedDay}}</p>
			<p @click="toDate()">跳转到2017年1月一日</p>
			<p @click="setEvent()">设置今天小黑点</p>
			<p @click="toNextMonth()">跳到下个月</p>
			<p @click="toMonth()">跳转到某年某月</p><input type="text" v-model="toMonthFormate" placeholder="2016/12/1">
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				selectedDay: null,
				events: ['2017/4/1'],
				daysMsg: [],
        toMonthFormate: '2016/12/1'
			}
		},
		methods: {
			toDate () {
				this.$refs['calendar'].toDate('2017/1/1')
			},
			toMonth () {
			  this.$refs['calendar'].toMonth(this.toMonthFormate)
			},
			setEvent () {
				let today = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + "/" + new Date().getDate()
				this.events.push(today)
			},
			toNextMonth () {
				this.$refs['calendar'].toNextMonth()
			},
			dayChange (day) {
				this.selectedDay = day
			},
			mockData () {
        this.daysMsg = []
			  setTimeout(() => {
          this.daysMsg = []
          for (let i = 0; i < 31; i++) {
            this.daysMsg.push(parseInt(Math.random()*100) + '人')
          }
				}, 2000)
			},
			resChange (date) {
			  this.mockData()
			}
		},
		mounted () {
		  this.mockData()
		}
	}
</script>

<style scoped>
	.action {
		text-align: center;
	}
</style>
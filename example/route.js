import Demo from './pages/index.vue'
import Week from './pages/week.vue'
import Calendar from './pages/calendar.vue'
import Region from './pages/region.vue'
import SearchInput from './pages/searchInput.vue'
import EmptyPage from './pages/emptyPage.vue'
export default [
	{
		path: '/',
		component: Demo
	},
	{
		name: 'week',
		path: '/week',
		component: Week
	},
	{
		name: 'calendar',
		path: '/calendar',
		component: Calendar
	},
	{
		name: 'region',
		path: '/region',
		component: Region
	},
	{
		name: 'searchInput',
		path: '/searchInput',
		component: SearchInput
	},
	{
		name: 'EmptyPage',
		path: '/emptyPage',
		component: EmptyPage
	}
]
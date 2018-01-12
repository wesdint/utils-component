'use strict'

import directives from './directives'
import Week from './components/week/week.vue'
import Calendar from './components/calendar/calendar.vue'
import Region from './components/region/region.vue'
import SearchInput from './components/searchInput/searchInput.vue'
import SearchIcon from './components/svg/searchIcon.vue'
import EmptyPage from './components/emptyPage/emptyPage.vue'
import VueTouch from 'vue-touch'

function install (Vue, options = {}) {

  Object.keys(directives).forEach(name => {
    Vue.directive(name, directives[name])
  })

  Vue.use(VueTouch)
  Vue.component(Week.name, Week)
  Vue.component(Calendar.name, Calendar)
  Vue.component(Region.name, Region)
  Vue.component(SearchInput.name, SearchInput)
  Vue.component(SearchIcon.name, SearchIcon)
  Vue.component(EmptyPage.name, EmptyPage)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}
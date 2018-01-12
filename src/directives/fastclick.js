import FastClick from 'fastclick'
export default {
  inserted: function (el) {
    el.style.WebkitTapHighlightColor = 'rgba(0,0,0,0)'
    FastClick.attach(el)
  }
}
import 'assets/scss/base'
import FastClick from 'fastclick'
import './rem'

function bootstrap () {
  /* fastclick */
  FastClick.attach(document.body)
  /*
   * ontouchstart bind ，
   * 避免 iPhone 整屏后面的按钮
   * 点击无法触发 active
   */
  document.ontouchstart = function () { }
}

if ('addEventListener' in document) {
  window.addEventListener('DOMContentLoaded', bootstrap)
} else {
  window.onload = bootstrap
}

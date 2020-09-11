// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import 'babel-polyfill'
import {
  get,
  post,
  useAppend,
} from "./utils/http";
import store from './utils/store'
// import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/reset.css";
import epfTitle from '@/components/title'
import epfNav from '@/components/nav'
import scroll from 'vue-seamless-scroll'


import epfPage from '@/components/page'
import echarts from 'echarts' //引入echarts
// import Print from 'vue-print-nb'
import Bus from './utils/bus';
import Print from '@/assets/js/print'
// Vue.use(Print) // 注册
Vue.component("epfTitle", epfTitle);
Vue.component("epfNav", epfNav);
Vue.component("epfPage", epfPage);
Vue.use(ElementUI);
// Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(scroll)
Vue.use(Print);
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$useAppend = useAppend;
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = Bus




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

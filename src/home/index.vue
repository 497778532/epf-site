<template>
  <div class="app">
    <myHeader></myHeader>
    <div class="area"
         v-show="path!=='/government'&&path!=='/main'">
      <epf-nav></epf-nav>
    </div>
    <keep-alive :include="$store.state.keepAlive">
      <router-view></router-view>
    </keep-alive>

    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './makeUp/header'

import myFooter from './makeUp/footer'

export default {
  components: {
    myHeader,
    myFooter,

  },
  data () {
    return {

      data: [],
      path: '',

    }
  },
  created () {
    this.path = this.$route.path
    let that = this
    // window.addEventListener("popstate", function (e) {

    //   that.$store.commit('back_tabs', that.data)
    // }, false);

  },
  computed: {



  },

  watch: {
    $route (to) {
      console.log(to)
      this.path = to.path
    }
  },

  methods: {

  },
}
</script>

<style scoped >
.main {
  padding-bottom: 30px;
}
</style>
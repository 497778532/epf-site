<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">

      <el-breadcrumb-item v-for="(item,index) in levelList"
                          :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1"
              class="no-redirect">
          <span v-html="item.meta.title"></span>
        </span>
        <a v-else
           @click.prevent="handleLink(item)"> <span v-html="item.meta.title"></span></a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'

export default {

  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route (route, from) {
      route.meta.title = route.query.name

      let reg1 = /government/
      if (reg1.test(this.$route.path)) {
        switch (this.$route.query.no) {
          case '003001':
            route.meta.title = '政府采购'
            break;
          case '004001':
            route.meta.title = '建设工程'
            break;
          case '005005':
            route.meta.title = '土地及矿业权'
            break;
          case '006001':
            route.meta.title = '国有产权'
            break;
        }
      }


      this.getBreadcrumb()
    }
  },
  created () {

    this.getBreadcrumb()
    // let reg1 = /government/
    // if (reg1.test(this.$route.path)) {
    //   switch (this.$route.query.no) {
    //     case '003001':
    //       this.$route.meta.title = '政府采购'
    //       break;
    //     case '004001':
    //       this.$route.meta.title = '建设工程'
    //       break;
    //     case '005005':
    //       this.$route.meta.title = '土地及矿业权'
    //       break;
    //     case '006001':
    //       this.$route.meta.title = '国有产权'
    //       break;
    //   }
    // }
  },
  methods: {
    getBreadcrumb () {


      let reg = /noticeDetail/
      console.log(this.$route)
      let temp = this.$route.matched[this.$route.matched.length - 1]
      this.$set(temp, 'query', this.$route.query)
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      for (let i = 0; i < matched.length; i++) {
        if (matched[i].path === '/notice') {
          switch (this.$route.query.index) {
            case '1':
              matched[i].meta.title = '政策法规'
              break;
            case '2':
              matched[i].meta.title = '政务公开'
              break;
            case '3':
              matched[i].meta.title = '资料下载'
              break;
            case '4':
              matched[i].meta.title = '操作手册'
              break;
            default:
              break;
          }

        }
      }

      if (this.$route.query.index === '5' || this.$route.query.index == '6') {

        this.levelList = [{
          path: '/',
          meta: {
            title: '首页'
          }
        }, temp]

        return
      }

      const first = matched[0]

      if (reg.test(this.$route.path)) {
        if (!this.levelList.length) {
          this.levelList = [{
            path: '/',
            meta: {
              title: '首页'
            }
          }]
        }
        this.levelList.push(temp)
        return
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'main'.toLocaleLowerCase()
    },
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      let reg = /notice$/

      if (reg.test(item.path)) {
        return
      }


      // if (redirect) {
      //   this.$router.push({ path: item.path, query: item.query })
      //   return
      // }
      this.$router.push({ path: item.path, query: item.query })

    }
  }
}
</script>

<style >
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.app-breadcrumb.el-breadcrumb .no-redirect {
  color: #3854b8;
  cursor: text;
}

.app-breadcrumb .el-breadcrumb__inner a {
  color: #9a9a9a;
  font-weight: 400;
}
</style>

<template>
  <div class="top">
    <div class="header">
      <div class="area area-contain">
        <div class="left">
          <div>
            欢迎来到揭阳市公共资源交易中心
          </div>
          <div style="margin:0 20px">
            今天是
            {{weather.date}}
            {{weather.week}}

          </div>

          <div class="display align">
            <img :src="'http://tq.daodaoim.com//tianqiapi/skin/pitaya/'+this.weather.wea_img+'.png'"
                 alt=""
                 class="weather-img">
            <span>
              {{weather.tem2}} - {{weather.tem1}}
            </span>
          </div>

          <div>
          </div>
        </div>
        <div class="right display align">
          <a @click="SetHome"
             class="set"> 设为首页 </a>
          / <span @click="collect"
                class="set"> 加入收藏 </span>
        </div>
      </div>

    </div>

    <div class="banner"
         :style="{backgroundImage:'url('+require('@/assets/image/home/banner.png')+')'}">
    </div>

    <div class="nav">
      <div class="area display"
           style="justify-content:space-between">
        <div class="nav-content display">
          <div v-for="(item,index) in nav"
               :key="index"
               class="nav-content-one display align justify"
               :class="{'active':item.name===navActive}"
               @click="navClick(item)">
            {{item.name}}

          </div>
        </div>
        <div class="nav-search display align">
          <el-input placeholder="请输入关键词"
                    v-model="input">
            <i slot="prefix"
               class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="nav-button display align justify"
               @click="jump">
            搜索
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>


import axios from 'axios'

export default {
  data () {
    return {
      weather: {
        date: '',
        wea: '',
        week: '',
        air_tips: '',
        wea_img: ''
      },
      input: '',
      datetime: '',
      nav: [
        { name: '首页', path: '/', query: {} },
        { name: '政策法规', path: '/notice', query: { index: '1', id: '007002', name: '政府采购' }, },
        { name: '政务公开', path: '/notice', query: { index: '2', id: '002001', name: '中心简介' }, },
        { name: '资料下载', path: '/notice', query: { index: '3', id: '007002', name: '政府采购' }, },
        { name: '诚信体系', url: 'http://xywz.jieyang.gd.cn/' },
        { name: '操作手册', path: '/notice', query: { index: '4', id: '015001', name: '政府采购' }, },
        { name: '服务咨询', path: '/cityMap', query: {} },
        // { name: '操作手册', path: '/notice', query: { index: 5, id: '007002', name: '政府采购' }, top: 0 },
      ],
      navActive: '首页'
    }
  },
  components: {

  },
  created () {
    let index = this.$route.query.index
    switch (index) {
      case '1':
        this.navActive = '政策法规'
        break;

      case '2':
        this.navActive = '政务公开'
        break;
      case '3':
        this.navActive = '资料下载'
        break;
      case '4':
        this.navActive = '操作手册'
        break;
      default:
        this.navActive = '首页'
        break;
    }


    this.getWeather()

  },
  mounted () {

  },
  methods: {
    SetHome (obj) {

      var url = document.location.href; if (document.all) { document.body.style.behavior = 'url(#default#homepage)'; document.body.setHomePage(url); }

      else if (window.sidebar) {

        if (window.netscape) {

          try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); }

          catch (e) { this.$message.warning("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'"); }

        }



      }

      else {

        alert('您的浏览器不支持自动自动设置首页, 请使用浏览器菜单手动设置!');

      }
    },
    collect () {
      var url = window.location;
      var title = document.title;
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("msie 8") > -1) {
        external.AddToFavoritesBar(url, title, '');//IE8
      } else {
        try {
          window.external.addFavorite(url, title);
        } catch (e) {
          try {
            window.sidebar.addPanel(title, url, "");//firefox
          } catch (e) {
            this.$message.warning("加入收藏失败，请使用Ctrl+D进行添加");
          }
        }
      }
    },
    navClick (item) {

      if (item.url) {
        window.open(item.url)
        return
      }
      let initData = {
        path: item.path,
        query: {
          name: item.name,
          index: item.query.index,
          id: item.query.id
        }
      }

      if (this.navActive === item.name && item.name !== '首页') {
        return
      }
      let params = {
        path: item.path,
        query: item.query
      }


      if (item.name === '首页') {
        this.$store.commit('init_tabs', item)
        this.$router.push(params)
        this.navActive = item.name;
        return
      }
      this.$router.push(params)
      this.navActive = item.name;


    },
    jump () {
      console.log(this.$route.path)
      if (this.$route.path !== '/search') {
        this.$router.push('/search')
        this.$store.commit('add_tabs', { path: '/search', query: { name: '站内搜索' } })
      }

      this.$nextTick(function () {
        this.$bus.$emit('search', this.input)
      })

    },
    getWeather (val) {
      this.$axios.get('https://www.tianqiapi.com/api/?version=v1&city=揭阳&appid=23443729&appsecret=RyCI1McN').then(res => {
        if (res.status !== 200) {
          return
        }
        this.weather = res.data.data[0]
      });
    },

  }
}
</script>

<style scoped>
.header {
  height: 23px;
  background: #efefef;
  line-height: 23px;
}
.area-contain {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
}
.weather-img {
  width: 16px;
  height: 16px;
  display: inline-block;
}
.banner {
  height: 140px;
  background-repeat: no-repeat;

  background-position: center center;
}
.left,
.right {
  display: flex;
  align-items: center;
}
.right img {
  width: 20px;
  height: 20px;
  margin: 0 12px;
}
.nav {
  height: 50px;
  background: #3854b8;
  color: #fffeff;
  font-size: 14px;
  font-weight: Bold;
}
.right > span {
  display: flex;
  align-items: center;
  height: 100%;
}
.nav-content-one {
  height: 50px;
  padding: 0 34px;
  cursor: pointer;
  margin-right: 10px;
}
.nav-content-one.active {
  background: #e22e2e;
}
.nav-button {
  width: 40px;
  font-weight: 400;
  height: 32px;
  background: #e22e2e;
}
.right img {
  width: 16px;
  height: 16px;
}
.right span {
  cursor: pointer;
  margin: 0 5px;
}
</style>
<style>
.nav .el-input__inner {
  width: 195px;
}
</style>
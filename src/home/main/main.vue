<template>
  <div class="main">
    <div class="area">
      <div class="first-step display">
        <div class="left">
          <el-carousel height="330px">
            <el-carousel-item v-for="(item,index) in banner"
                              :key="index">
              <div class="img-contain"
                   @click="toDetail(item)">
                <img :src="'/api/ords/epfcms/file/download/'+item.flash_image"
                     alt=""
                     style="width:100%;height:330px">
                <div class="img-title">
                  <div class="img-text">{{item.name}}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="middle"
             v-loading="loading1">

          <el-tabs style="height:100%"
                   v-model="activeLabel"
                   @tab-click="handleClick">
            <el-tab-pane name="001003">
              <div slot="label">通知公告</div>
              <div class="article-title display"
                   v-for="(item,index) in notice1"
                   :key="index"
                   @click="toDetail(item)">
                <div class="title-left">
                  <span class="red-point"></span>
                  <span style="margin-left:3px">{{item.name}}</span>
                </div>
                <div class="title-right">
                  {{item.publish_time2}}
                </div>

              </div>

            </el-tab-pane>
            <el-tab-pane label="中心动态"
                         name="001002">
              <div class="article-title display"
                   v-for="(item,index) in notice2"
                   :key="index"
                   @click="toDetail(item)">
                <div class="title-left">
                  <span class="red-point"></span>
                  <span style="margin-left:3px">{{item.name}}</span>
                </div>
                <div class="title-right">
                  {{item.publish_time2}}
                </div>

              </div>

            </el-tab-pane>
            <el-tab-pane label="政声传递"
                         name="001005">
              <div class="article-title display"
                   v-for="(item,index) in notice3"
                   :key="index"
                   @click="toDetail(item)">
                <div class="title-left">
                  <span class="red-point"></span>
                  <span style="margin-left:3px">{{item.name}}</span>
                </div>
                <div class="title-right">
                  {{item.publish_time2}}
                </div>

              </div>
            </el-tab-pane>

          </el-tabs>
          <span class="more"
                @click="jump()">更多</span>
        </div>
        <div class="right">

          <div @click="toSome(item.jump)"
               v-for="(item,index) in login"
               @mouseover="over (item,index,'main') "
               @mouseout="out(item,index,'main')"
               :key="index">
            <img :src="item.url"
                 alt="登录">
          </div>

        </div>
      </div>
      <div class="second-step display">
        <div class="logo-text">
          揭阳市公共资源 电子交易平台
        </div>
        <div class="logo-push">
          <div class="push-top display align">
            <div class="logo-one"
                 @mouseover="over (item,index,'push') "
                 @mouseout="out(item,index,'push')"
                 v-for="(item,index) in logoDataTop"
                 @click="jumpGovernment(item)"
                 :key="index">
              <div>
                <img :src="item.url"
                     alt="">

                <div class="logon-one-text">
                  {{item.name}}
                </div>
              </div>

            </div>

          </div>
          <div class="push-bottom display align">

            <div class="logo-one"
                 :class="{'four':index===0,'five':index===1}"
                 v-for="(item,index) in logoDataBottom"
                 @mouseover="over (item,index+4,'push') "
                 @mouseout="out(item,index+4,'push')"
                 @click="jumpOther(item)"
                 :key="index">
              <div>
                <img :src="item.url"
                     alt="">

                <div class="logon-one-text">
                  {{item.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="third-step">
        <tabs style="margin-top:30px"
              :data="data1"></tabs>
        <tabs style="margin-top:30px"
              :data="data2"></tabs>
        <tabs style="margin-top:30px"
              :data="data3"></tabs>

        <tabs style="margin-top:30px"
              :data="data4"></tabs>
      </div>

      <div class="fourth-step"
           style="margin-top:30px">
        <to-do></to-do>
      </div>

    </div>

    <advertising></advertising>
    <card></card>
  </div>
</template>

<script>
import tabs from '@/components/tabs'


import toDo from './main-make-up/toDo'
import advertising from './main-make-up/advertising'
import card from './main-make-up/card'
export default {
  data () {
    return {
      activeLabel: '001003',
      title: '办事工具',
      notice1: [],
      notice2: [],
      notice3: [],
      data1: {
        title: '政府采购',
        head: [],
        list: [],
        no: '003',
        id: '',
      },
      data2: {

        title: '建设工程',
        head: [

        ],
        list: [],
        id: '',
        no: '004'
      },

      data3: {

        title: '土地及矿业权',
        id: '',
        head: [

        ],
        list: [],
        no: '005'
      },
      data4: {

        title: '国有产权',
        head: [

        ],
        id: '',
        list: [],
        no: '006'
      },

      login: [
        { name: '登录', url: require('@/assets/image/home/main1.png'), jump: 'login' },
        { name: '注册', url: require('@/assets/image/home/main2.png'), jump: 'register' },
        { name: '广东政务服务网', url: require('@/assets/image/home/main3.png'), jump: 'guang' },
      ],
      logoDataTop: [
        { name: '政府采购', url: require('@/assets/image/home/push1.png') },
        { name: '土地及矿业权', url: require('@/assets/image/home/push2.png') },
        { name: '建设工程', url: require('@/assets/image/home/push3.png') },
        { name: '国有产权', url: require('@/assets/image/home/push4.png') },
      ],
      logoDataBottom: [
        { name: '互认平台登录', url: require('@/assets/image/home/push5.png') },
        { name: '中介服务超市', url: require('@/assets/image/home/push6.png') },
        { name: '近期开标', url: require('@/assets/image/home/push7.png') },
        { name: '内部登录', url: require('@/assets/image/home/push8.png') },
      ],
      loading1: false,
      i: 0,
      banner: [],

    }
  },
  components: {
    tabs,
    toDo,

    advertising,
    card
  },
  created () {
    this.getTree()
    this.getList(this.activeLabel)
    this.getBanner()


  },
  mounted () {

  },
  methods: {
    getTabsHead () {

    },
    jumpOther (item) {
      switch (item.name) {
        case '互认平台登录':
          window.open('https://platform.gdggzy.org.cn:8443/sso/login')

          break;

        case '中介服务超市':
          window.open('https://zjcs.gdggzy.org.cn/gd-zjcs-pub/home')


          break;
        case '近期开标':
          let params = {
            path: '/bidOpening',
            name: '近期开标'
          }
          this.$store.commit('add_tabs', params)
          this.$router.push('/bidOpening')
          break;
        case '内部登录':
          window.open('http://121.11.160.122:9002/sso/ssosysuser/ssologin.html?netType=1')
          break;
      }
    },
    jumpGovernment (item) {
      window.open('http://121.11.160.122:9002/sso/')
      // let params = {
      //   path: '/government?name=' + item.name,
      //   name: item.name
      // }
      // this.$store.commit('add_tabs', params)
      // this.$router.push('/government?name=' + item.name)
    },
    over (item, index, name) {
      let num = index + 1
      item.url = require('@/assets/image/home/' + name + num + 'B.png')
    },
    out (item, index, name) {
      let num = index + 1
      item.url = require('@/assets/image/home/' + name + num + '.png')
    },
    toSome (key) {
      switch (key) {
        case 'login':
          window.open('http://121.11.160.122:9002/sso/')
          break;
        case 'register':
          window.open('http://121.11.160.122:9002/sso/ssosysuser/registBidder.html?returnUrl=http://121.11.160.122:9002/sso/ssosysuser/ssologin.html')
          break;
        case 'guang':

          window.open('http://www.gdzwfw.gov.cn/portal/index')

          break;

      }
    },
    jump () {

      let params = {
        path: '/notice',
        query: {
          name: '通知公告',
          index: '5',
          id: '001002'
        },

      }
      this.$store.commit('add_tabs', params)
      this.$router.push(params)

    },
    toDetail (item) {

      const { href } = this.$router.resolve({
        path: `noticeDetail`,
        query: { name: item.name, id: item.id }
      });
      window.open(href, "_blank");
    },
    getList (val) {
      if (this.i >= 3) {
        return
      }
      this.i++
      this.loading1 = true
      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemBySeriesId/' + val,
        {}
      ).then(res => {
        switch (val) {
          case '001003':
            this.notice1 = res.items
            break;
          case '001002':
            this.notice2 = res.items
            break;
          case '001005':
            this.notice3 = res.items
            break;
        }

        this.loading1 = false
      })
    },
    handleClick (val) {

      this.getList(this.activeLabel)
    },
    getBanner () {
      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemFlash',
        {}
      ).then(res => {
        this.banner = res.items
      })
    },
    getTree (val) {
      let that = this
      this.loading = true

      this.$get(
        '/ords/epfcms/series/queryListCmsSeriesAll',
        {}
      ).then(res => {
        this.$store.commit('init_tree', res.all);
        let data = this.$store.state.homeTree


        for (let i = 0; i < data.length; i++) {
          if (data[i].no === '003') {
            this.data1 = data[i]
            window.sessionStorage.setItem('ZFCG', JSON.stringify(data[i]))

          } else if (data[i].no === '004') {
            this.data2 = data[i]
            window.sessionStorage.setItem('JSGC', JSON.stringify(data[i]))
          } else if (data[i].no === '005') {

            this.data3 = data[i]
            window.sessionStorage.setItem('TDJKY', JSON.stringify(data[i]))
          } else if (data[i].no === '006') {
            this.data4 = data[i]
            window.sessionStorage.setItem('GYCQ', JSON.stringify(data[i]))
          } else if (data[i].no === '008') {
            window.sessionStorage.setItem('FWZN', JSON.stringify(data[i]))
          } else if (data[i].no === '016') {
            window.sessionStorage.setItem('JYLC', JSON.stringify(data[i]))
          }
        }
      })
    },
  }
}
</script>

<style scoped>
.img-contain {
  height: 330px;
}
.first-step {
  height: 330px;
  overflow: hidden;
}
.left {
  width: 460px;
  height: 330px;
}

.first-step {
}

.middle {
  margin: 0 22px;
  width: 462px;
  position: relative;
  height: 330px;
  overflow: hidden;
}

.more {
  font-size: 14px;
  color: #9a9a9a;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.article-title {
  height: 37.5px;
  align-items: flex-end;
  cursor: pointer;
}
.title-left:hover {
  color: #3854b8;
}
.red-point {
  width: 6px;
  height: 6px;
  background: rgba(226, 46, 46, 1);
  border-radius: 50%;
  display: inline-block;
}

.title-left {
  width: calc(100% - 110px);
  color: #343434;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-right {
  width: 80px;
  color: #9a9a9a;
  margin-left: 30px;
  text-align: right;
}

.right {
  width: 234px;
  height: 100%;
  overflow: hidden;
}
.right > div {
  cursor: pointer;
}
.right > div:nth-child(1) {
  height: 80px;
}
.right > div:nth-child(2) {
  height: 80px;
  margin: 10px 0;
}
.right > div:nth-child(3) {
  height: 150px;
}

.second-step {
  height: 222px;
  overflow: hidden;
  margin-top: 20px;
}

.logo-text {
  width: 220px;
  background: #eaefff;
  font-weight: bold;
  color: #3854b8;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 54px;
  line-height: 25px;
  position: relative;
}
.logo-text::after {
  /* #eaefff; */
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-left: 12px solid #eaefff;
  border-bottom: 7px solid transparent;
  content: "";
  position: absolute;
  right: -7px;
  top: 50%;
  margin-top: -6px;
}
.logo-push {
  width: calc(100% - 220px);
}
.logo-push > div {
  height: 110px;
  background: #f7f8fb;
}
.logo-push > div:nth-child(2) {
  margin-top: 2px;
}
.logo-one {
  width: 25%;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top: 12px;
}
.logo-one > div {
  text-align: center;
}
.logo-one:hover {
  background-color: #3753b7;
  color: #fff;
}

.logo-one.four:hover {
  background-color: #2989c7;
  color: #fff;
}
.logo-one.five:hover {
  background-color: #4779e3;
  color: #fff;
}
.logon-one-text {
  margin: 14px;
}
.main {
  margin-top: 20px;
  position: relative;
}
.img-title {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.4);
  line-height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 15px;
}
.img-text {
  width: 310px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}
</style>
<style>
.main .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 1);
  background-color: transparent;
}

.main .el-carousel__indicator.is-active button {
  background: rgba(244, 10, 10, 1);
  border: none;
}

.main .el-carousel__indicators--horizontal {
  left: auto;
  right: 0;
}
.main .el-carousel__indicators--horizontal {
  transform: translateX(0%);
}
.main .el-tabs__item {
  height: 30px;
  line-height: normal;
  padding: 0 26px;
}

.main .el-tabs__nav-wrap::after {
  height: 1px;
  background: rgba(238, 238, 238, 1);
}

.main .el-tabs__item:hover {
  color: #3854b8;
}

.main .el-tabs__item.is-active {
  color: #3854b8;
}

.main .el-tabs__active-bar {
  background: #e22e2e;
}

.main .el-tabs__header {
  margin: 0;
}
</style>
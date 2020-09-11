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
          <div class="gd display">
            <div v-for="(item,index) in server"
                 :key="index"
                 @click="serverJump(item)"
                 @mouseover="over (item,index,'server') "
                 @mouseout="out(item,index,'server')"
                 class="server-one display align justify">
              <div style="text-align:center">

                <img :src="item.url"
                     alt="">
                <div class="server-text">
                  {{item.name}}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="new-step display">
        <div class="laba display align justify">
          <img src="@/assets/image/home/laba.png"
               alt="">
        </div>
        <div class="laba-content">

          <div class="myCase">
            <vue-seamless-scroll :data="labaData"
                                 class="seamless-warp"
                                 :class-option="optionSingleHeightTime">
              <div @click="toDetail(item)"
                   v-for="(item,index) in labaData"
                   :key="index"
                   class="display align dataOne">

                <span class="write-pointer"></span>
                <span class="account"
                      v-if="item.target_type">【{{item.target_type}}】</span>
                <span class="text">{{item.name}}</span>

                <span class="my-date">{{item.info_time2}}</span>

              </div>
            </vue-seamless-scroll>

          </div>

        </div>
      </div>
      <div class="second-step display">

        <div class="logo-push">
          <div class="push-top display align">
            <div class="logo-one"
                 :class="{'one':index===0,'two':index===1,'three':index===2,'four':index===3}"
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
                 :class="{'five':index===0,'six':index===1,'seven':index===2,'eight':index==3}"
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
        <div class="logo-text"
             @click="people">
          <img src="@/assets/image/home/people.png"
               alt="">
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
      labaData: [],
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
        // { name: '广东政务服务网', url: require('@/assets/image/home/main3.png'), jump: 'guang' },
      ],

      server: [
        { name: '服务指南', url: require('@/assets/image/home/server1.png'), id: "008", eng: "FWZN", },
        { name: '交易流程', url: require('@/assets/image/home/server2.png'), id: "016", eng: "JYLC", },
        { name: '业务咨询', url: require('@/assets/image/home/server3.png'), id: "000004", },
        { name: '投诉举报', url: require('@/assets/image/home/server4.png'), id: "000005", },
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
        { name: '广东省政务服务网', url: require('@/assets/image/home/push8.png') },
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
    this.getLaba()
    this.getBanner()


  },
  mounted () {

  },
  computed: {
    optionSingleHeightTime () {
      return {
        singleHeight: 27,
        waitTime: 2500
      }
    }
  },
  methods: {
    getLaba (id) {

      this.$get(
        '/ords/epfcms/cmsItem/queryItemNewNotice',
        {}
      ).then(res => {
        let data = res.items
        // let arr = []
        // let result = []
        // if (!data) {
        //   return
        // }
        // for (let i = 0; i < data.length; i++) {
        //   arr.push(data[i])
        //   if (arr.length === 3) {
        //     result.push(arr)
        //     arr = []
        //   }
        // }
        this.labaData = data
      })
    },

    serverJump (item) {


      let params = {
        path: "/notice",
        query: {
          name: item.name,
          index: "6",
          id: item.id,
          eng: item.eng,
        },
      };
      this.$store.commit("add_tabs", params);
      this.$router.push(params);
    },
    people () {
      window.open('http://121.11.160.122:9002/sso/ssosysuser/ssologin.html?netType=1')
    },
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
        case '广东省政务服务网':
          window.open('http://www.gdzwfw.gov.cn/portal/index')
          break;
      }
    },
    jumpGovernment (item) {
      window.open('http://121.11.160.122:9002/sso/ssosysuser/ssologin.html?netType=0')
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

    getData (id) {

      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemDetails/' + id,
        {}
      ).then(res => {
        let data = res.items[0] || ''

        if (!data) {
          return

        }

        window.open(data.url);
      })
    },
    toDetail (item) {

      if (item.item_type === 1) {
        this.getData(item.id)
        return
      }


      const { href } = this.$router.resolve({
        path: `noticeDetail`,
        query: { name: item.name, id: item.id }
      });

      console.log(123)
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
  width: 81px;
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
  margin-top: 10px;
}

.logo-text {
  width: 234px;
  cursor: pointer;
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
.logo-one.one:hover {
  background: #526cfc;
  color: #fff;
}
.logo-one.two:hover {
  background: #ff6c22;
  color: #fff;
}
.logo-one.three:hover {
  background: #6c4afb;
  color: #fff;
}
.logo-one.four:hover {
  background: #46ccb4;
  color: #fff;
}

.logo-one.five:hover {
  background: #1e84c8;
  color: #fff;
}
.logo-one.six:hover {
  background: #487ae4;
  color: #fff;
}
.logo-one.seven:hover {
  background: #f6882c;
  color: #fff;
}
.logo-one.eight:hover {
  background: #4c90c8;
  color: #fff;
}
.gd {
  background: url("../../assets/image/home/main3.png") center center no-repeat;
  flex-wrap: wrap;
  align-items: center;
}
/* .gd:hover {
  background: url("../../assets/image/home/main3B.png") center center no-repeat;
} */
.server-one {
  width: 50%;
  height: 75px;
  color: #fff;
}
.server-one:hover {
  color: rgba(255, 255, 255, 0.8);
}
.server-text {
  margin-top: 6px;
}
.new-step {
  width: 1200px;
  height: 80px;
  background: linear-gradient(0deg, #2b9bf1 0%, #63bafd 100%);
  margin-top: 10px;
}
.laba {
  width: 75px;
  height: 80px;
}

.laba-content {
  /* padding: 4px 0; */
  /* line-height: 21px; */
  padding-right: 30px;
  color: #ffffff;
  font-size: 12px;
  width: calc(100% - 75px);
}
.write-pointer {
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  display: inline-block;
}
.my-date {
  margin-left: auto;
}
.dataOne {
  height: 27px;
  overflow: hidden;
  cursor: pointer;
}

.seamless-warp {
  height: 80px;
  overflow: hidden;
}
/* .myCase div {
  float: left;
} */
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
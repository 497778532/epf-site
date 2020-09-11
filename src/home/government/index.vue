<template>
  <div class="government">

    <div class="area">
      <!-- <epf-nav></epf-nav> -->
      <!-- @mouseover="over (item,index,'push') "
      @mouseout="out(item,index,'push')" -->
      <div class="logo-push">
        <div class="push-top display align">
          <div class="logo-one"
               v-for="(item,index) in logoDataTop"
               :class="{'active':activeLogo.slice(0,3)===item.no.slice(0,3),'one':index===0,'two':index===1,'three':index===2,'four':index===3}"
               :key="index"
               @click="logoClick(item)">
            <div>
              <img :src="activeLogo.slice(0,3)===item.no.slice(0,3)?item.urlB:item.url"
                   alt="">

              <div class="logon-one-text">
                {{item.name}}
              </div>
            </div>

          </div>

        </div>

      </div>

      <div class="dictionary"
           v-loading="loadingTable">
        <div class="button-contain transition_dom "
             ref="buttonContain">

          <buttonGroup :list="data"
                       :activeType="activeType"
                       :activeLogo="activeLogo"
                       @temp="myTemp"
                       @search="mySearch"></buttonGroup>

        </div>

        <div class="more-contain"
             @click="more">更多筛选（{{moreSearch}}）</div>

      </div>
      <div class="list"
           v-loading="tableloading">
        <el-table :data="tableData"
                  stripe
                  border
                  style="width: 100%;min-height:450px">

          <template slot="empty">
            <div class="empty-contain">
              <img src="@/assets/image/home/noData.png"
                   alt=""
                   class="empty-img">
              <div>暂无数据</div>
            </div>
          </template>
          <el-table-column type='index'
                           label="序号"
                           width="90"
                           align="center"
                           v-if="activeLogo==='003001'||activeLogo==='004001'">
          </el-table-column>
          <el-table-column v-for="(item,index) in tableHead"
                           :key="index"
                           :label="item.title"
                           :show-overflow-tooltip="true"
                           :width="getWidth(item)">
            <template slot-scope="scope">
              <span @click="tabletoDetail(scope.row,item)"
                    :class="{'table-content':item.prop==='name'}">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="page display">

        <epf-page :pre="pre"
                  :next="next"
                  @pre-click="prevClick"
                  @next-click="nextClick"
                  :url="initTableUrl"></epf-page>
      </div>
    </div>

  </div>
</template>

<script>
import buttonGroup from '@/components/buttonGroup'

export default {
  name: 'government',
  data () {
    return {
      id: '',
      all: [],
      moreSearch: '',
      loadingTable: false,

      activeLogo: '003001',
      myDate: {
        name: '时间',
        arr: [{ name: '全部', }, { name: '近七天', id: 7 }, { name: '近三十天', id: 30 }, { name: '近半年', id: 182 }, { name: '上一年度', id: 365 }],
      },
      location: {
        arr: [],
        name: '土地位置',
        isInput: true,
        last: true
      },
      target: {
        arr: [],
        name: '标的名称',
        isInput: true,
        last: true
      },
      activeType: '',
      serialNumber: {
        arr: [],
        name: '公告编号',
        isInput: true,

      },

      logoDataTop: [
        { name: '政府采购', url: require('@/assets/image/home/push1.png'), no: '003001', urlB: require('@/assets/image/home/push1B.png'), },
        { name: '建设工程', url: require('@/assets/image/home/push3.png'), no: '004001', urlB: require('@/assets/image/home/push3B.png'), },
        { name: '土地及矿业权', url: require('@/assets/image/home/push2.png'), no: '005005', urlB: require('@/assets/image/home/push2B.png'), },

        { name: '国有产权', url: require('@/assets/image/home/push4.png'), no: '006001', urlB: require('@/assets/image/home/push4B.png') },
      ],
      tableHead: [

      ],
      initTableUrl: '/ords/epfcms/cmsItem/queryCmsItemByParams/',
      tableloading: false,
      show: true,
      data: [

      ],

      tableParams: {},
      dictionary: [],
      tableData: [
      ],
      next: '',
      pre: '',
    }
  },
  methods: {
    tabletoDetail (row, item) {

      let reg = /编号/
      let reg2 = /名称/
      if (reg.test(item.title) || reg2.test(item.title)) {

        const { href } = this.$router.resolve({
          path: `noticeDetail`,
          query: { name: row.name, id: row.id }
        });
        window.open(href, "_blank");

      }

    },
    prevClick (val) {

      this.initTable(this.activeLogo, this.params, val)
    },
    nextClick (val) {
      this.initTable(this.activeLogo, this.params, val)
    },
    getWidth (item) {
      if (item.title === '土地位置' || item.title === '标的名称') {
        return '300'
      }
    },
    getTabHead (no) {

      switch (no) {
        case '005005':
          //土地及矿业权的交易公告
          this.tableHead = [
            { title: '公告编号', prop: 'name' },

            { title: '宗地编号', prop: 'trade_no' },
            { title: '公告时间', prop: 'info_time2' },
            { title: '起始价', prop: 'begin_price' },
            { title: '保证金', prop: 'earnest_money' },

            { title: '保证金截止日期', prop: 'end_earnest_time' },
            { title: '竞买申请截止日期', prop: 'end_apply_time' },
          ]
          break;

        case '006001':
          //国有产权的交易公告
          this.tableHead = [
            { title: '公告编号', prop: 'name' },
            { title: '公告时间', prop: 'info_time2' },
            { title: '保证金截止日期', prop: 'end_earnest_time' },
            { title: '竞买申请截止日期', prop: 'end_apply_time' },
            { title: '起始价', prop: 'begin_price' },
            { title: '保证金', prop: 'earnest_money' },
            { title: '标的名称', prop: 'trade_name' },
          ]
          break;
        case '005007':
          //土地及矿业权的变更公告
          this.tableHead = [
            { title: '公告编号', prop: 'name' },
            { title: '宗地编号', prop: 'trade_no' },
            { title: '公告类型', prop: 'noName' },
            { title: '公告时间', prop: 'info_time2' },
          ]
          break;
        case '005006':
          //土地及矿业权的成交结果公示
          this.tableHead = [
            { title: '宗地编号', prop: 'name' },
            { title: '起始价', prop: 'begin_price' },
            { title: '成交价', prop: 'trans_price' },
            { title: '成交时间', prop: 'end_trans_time' },
            { title: '竞得人', prop: 'trans_bidder' },
          ]
          break;
        case '006003':
          //国有产权的变更公告
          this.tableHead = [
            { title: '公告编号', prop: 'name' },
            { title: '标的名称', prop: 'trade_name' },
            { title: '公告类型', prop: 'noName' },
            { title: '公告时间', prop: 'info_time2' },
          ]
          break;
        case '006002':
          //国有产权的成交结果公示
          this.tableHead = [
            { title: '标的名称', prop: 'name' },
            { title: '起始价', prop: 'begin_price' },
            { title: '成交价', prop: 'trans_price' },
            { title: '成交时间', prop: 'end_trans_time' },
            { title: '竞得人', prop: 'trans_bidder' },
          ]
          break;
        default:

      }
    },
    myTemp (params) {
      console.log(params)
      this.activeType = params.name
      this.getTabHead(params.no)
      this.tableParams = params
      let url = this.initTableUrl + this.tableParams.no
      this.initTable(this.tableParams.no, this.tableParams, url)

    },
    mySearch () {

    },
    over (item, index, name) {
      let num = index + 1
      item.url = require('@/assets/image/home/' + name + num + 'B.png')
    },
    out (item, index, name) {
      let num = index + 1
      item.url = require('@/assets/image/home/' + name + num + '.png')
    },
    initTop () {

    },
    init () {
      this.loadingTable = true
      this.$get(
        '/ords/epfcms/series/queryListCmsSeriesAll',
        {}
      ).then(res => {
        this.all = res.all


        let arr = []
        if (/^003/.test(this.activeLogo)) {
          arr = ['ZFCG_CGFS', 'ZFCG_CGML', 'area']
        } else if (/^004/.test(this.activeLogo)) {
          arr = ['JSGC_GCLB', 'JSGC_ZBFS', 'area']
        } else if (/^005/.test(this.activeLogo)) {
          arr = ['area']
        } else if (/^006/.test(this.activeLogo)) {
          arr = ['area']
        }


        this.dictionary = arr

        this.getSearch(this.dictionary)
      })
    },
    more () {

      if (this.show) {
        var height = this.$refs.buttonContain.scrollHeight + 20;

        this.$refs.buttonContain.style.height = height + 'px'
      } else {
        this.$refs.buttonContain.style.height = '104px'
      }
      this.show = !this.show
    },
    logoClick (item) {
      this.$route.meta.title = item.name
      this.activeLogo = item.no

    },
    getSearch (dictionary) {

      let frist = this.getType()

      let reqArr = dictionary.map((item, index, arr) => {
        let reqFun = new Promise((resolve, reject) => {
          let temp = ''
          switch (item) {
            case 'ZFCG_CGFS':

              temp = '采购方式'
              break;

            case 'ZFCG_CGML':
              temp = '采购目录'
              break;
            case 'JSGC_ZBFS':
              temp = '招标方式'
              break;

            case 'JSGC_GCLB':
              temp = '工程类别'
              break;
            case 'area':
              temp = '区域'
              break;
          }
          if (item === 'area') {
            this.$axios.get('/api/ords/epfcms/param/canton/445200', {
            }).then(res => {


              res.data.items.unshift({ id: '', name: '全部' })
              let obj = {
                name: temp,
                arr: res.data.items
              }
              resolve(obj)
            })
          } else {

            this.$axios.get(
              '/api/ords/epfcms/param/queryParamByNo?no=' + item

            ).then(res => {
              res.data.items.unshift({ id: '', name: '全部' })
              let obj = {
                name: temp,
                arr: res.data.items
              }
              resolve(obj)
            })
          }
        })
        return reqFun
      })
      Promise.all(reqArr).then(res => {
        this.data = []


        this.data = [frist, ...this.data, ...res, this.myDate]


        switch (this.activeLogo) {
          case '005005':
            this.data.splice(1, 0, this.serialNumber)
            this.data.push(this.location)
            break;
          case '006001':
            this.data.splice(1, 0, this.serialNumber)
            this.data.push(this.target)
            break;
        }

        console.log(this.data)
        this.loadingTable = false
      })
    },
    getType () {
      let data = {
        name: '公告类型',
        arr: []
      }

      if (/^003/.test(this.activeLogo)) {

        data.arr = JSON.parse(window.sessionStorage.getItem('ZFCG')).children
      } else if (/^004/.test(this.activeLogo)) {
        data.arr = JSON.parse(window.sessionStorage.getItem('JSGC')).children

      } else if (/^005/.test(this.activeLogo)) {
        data.arr = JSON.parse(window.sessionStorage.getItem('TDJKY')).children
      } else if (/^006/.test(this.activeLogo)) {
        data.arr = JSON.parse(window.sessionStorage.getItem('GYCQ')).children
      }
      return data
    },
    initTable (no, params, url) {
      this.tableloading = true
      let arr = []
      if (/^003/.test(no)) {
        arr = ['ZFCG_CGFS', 'ZFCG_CGML', 'area']

        this.tableHead = [
          { title: '采购方式', prop: 'trade_type' },
          { title: '公告类型', prop: 'noName' },
          { title: '公告名称', prop: 'name' },
          { title: '日期', prop: 'info_time2' },
        ]
        this.moreSearch = '区域/时间/采购目录'
      } else if (/^004/.test(no)) {
        arr = ['JSGC_GCLB', 'JSGC_ZBFS', 'area']
        this.tableHead = [
          { title: '招标方式', prop: 'trade_type' },
          { title: '公告类型', prop: 'noName' },
          { title: '公告名称', prop: 'name' },
          { title: '日期', prop: 'info_time2' },
        ]
        this.moreSearch = '区域/时间/招标方式'
      } else if (/^005/.test(no)) {
        this.moreSearch = '区域/时间/土地位置'
        switch (no) {
          case '005005':
            //土地及矿业权的交易公告
            this.tableHead = [
              { title: '公告编号', prop: 'name' },

              { title: '宗地编号', prop: 'trade_no' },
              { title: '公告时间', prop: 'info_time2' },
              { title: '起始价', prop: 'begin_price' },
              { title: '保证金', prop: 'earnest_money' },

              { title: '保证金截止日期', prop: 'end_earnest_time' },
              { title: '竞买申请截止日期', prop: 'end_apply_time' },
            ]
            break;
          case '005006':
            //土地及矿业权的成交结果公示
            this.tableHead = [
              { title: '宗地编号', prop: 'name' },
              { title: '起始价', prop: 'begin_price' },
              { title: '成交价', prop: 'trans_price' },
              { title: '成交时间', prop: 'end_trans_time' },
              { title: '竞得人', prop: 'trans_bidder' },
            ]
            break;
          case '005007':
            //土地及矿业权的变更公告
            this.tableHead = [
              { title: '公告编号', prop: 'name' },
              { title: '宗地编号', prop: 'trade_no' },
              { title: '公告类型', prop: 'noName' },
              { title: '公告时间', prop: 'info_time2' },
            ]
            break;
        }


        arr = ['area']
      } else if (/^006/.test(no)) {
        this.moreSearch = '区域/时间/标的名称'
        arr = ['area']

        switch (no) {
          case '006001':
            //国有产权的交易公告
            this.tableHead = [
              { title: '公告编号', prop: 'name' },
              { title: '公告时间', prop: 'info_time2' },
              { title: '保证金截止日期', prop: 'end_earnest_time' },
              { title: '竞买申请截止日期', prop: 'end_apply_time' },
              { title: '起始价', prop: 'begin_price' },
              { title: '保证金', prop: 'earnest_money' },
              { title: '标的名称', prop: 'trade_name' },
            ]
            break;

          case '006003':
            //国有产权的变更公告
            this.tableHead = [
              { title: '公告编号', prop: 'name' },
              { title: '标的名称', prop: 'trade_name' },
              { title: '公告类型', prop: 'noName' },
              { title: '公告时间', prop: 'info_time2' },
            ]
            break;
          case '006002':
            //国有产权的成交结果公示
            this.tableHead = [
              { title: '标的名称', prop: 'name' },
              { title: '起始价', prop: 'begin_price' },
              { title: '成交价', prop: 'trans_price' },
              { title: '成交时间', prop: 'end_trans_time' },
              { title: '竞得人', prop: 'trans_bidder' },
            ]
            break;
        }
      }
      // switch (no) {
      //   case '003001':
      //     arr = ['ZFCG_CGFS', 'ZFCG_CGML', 'area']
      //     this.tableHead = [
      //       { title: '采购方式', prop: 'trade_type' },
      //       { title: '公告类型', prop: 'noName' },
      //       { title: '公告名称', prop: 'name' },
      //       { title: '日期', prop: 'info_time2' },
      //     ]
      //     this.moreSearch = '区域/时间/采购目录'
      //     break;
      //   case '004001':
      //     arr = ['JSGC_GCLB', 'JSGC_ZBFS', 'area']
      //     this.tableHead = [
      //       { title: '招标方式', prop: 'trade_type' },
      //       { title: '公告类型', prop: 'noName' },
      //       { title: '公告名称', prop: 'name' },
      //       { title: '日期', prop: 'info_time2' },
      //     ]
      //     this.moreSearch = '区域/时间/招标方式'
      //     break;
      //   case '005005':
      //     arr = ['area']
      //     this.tableHead = [
      //       { title: '公告编号', prop: 'name' },
      //       { title: '公告时间', prop: 'info_time2' },
      //       { title: '起始价', prop: 'begin_price' },
      //       { title: '保证金', prop: 'earnest_money' },
      //       { title: '土地位置', prop: 'address' },
      //     ]
      //     this.moreSearch = '区域/时间/土地位置'


      //     break;
      //   case '006001':
      //     arr = ['area']
      //     this.tableHead = [
      //       { title: '公告编号', prop: 'name' },
      //       { title: '公告时间', prop: 'info_time2' },
      //       { title: '起始价', prop: 'begin_price' },
      //       { title: '保证金', prop: 'earnest_money' },
      //       { title: '标的名称', prop: 'trade_name' },
      //     ]
      //     this.moreSearch = '区域/时间/标的名称'
      //     break;
      // }


      this.$get(
        url,
        params
      ).then(res => {
        this.pre = res.prev ? res.prev.$ref : ''
        this.next = res.next ? res.next.$ref : ''
        this.tableData = res.items
        for (var i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], 'noName', this.activeType)
        }
        this.tableloading = false
        // if (no === !'005' || no !== '006') {
        //   let table = res.items


        //   if (table.length) {

        //     this.$get(
        //       '/ords/epfcms/series/queryListCmsSeriesChildren',
        //       { parentId: this.id }
        //     ).then(res => {
        //       let arr = res.items
        //       for (var i = 0; i < table.length; i++) {
        //         let temp = table[i]
        //         for (var j = 0; j < arr.length; j++) {
        //           if (temp.seriesno === arr[j].no) {
        //             this.$set(temp, 'noName', arr[j].name)
        //             continue
        //           }
        //         }
        //       }
        //       this.tableData = table
        //       this.tableloading = false
        //     })
        //   } else {
        //     this.tableData = res.items
        //     this.tableloading = false
        //   }
        // } else {

        //   this.tableloading = false
        // }

      })
    }
  },
  computed: {

  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 判断是否是去往页面 C 

    if (to.name === 'noticeDetail') {

      this.$store.commit('init_keepAlive')


    } else {
      this.$store.commit('delete_keepAlive')
    }


    next()
  },
  components: {
    buttonGroup
  },
  watch: {
    activeLogo (newVal) {
      let arr = []
      switch (this.activeLogo) {
        case '003001':
          this.activeType = '采购公告'
          arr = ['ZFCG_CGFS', 'ZFCG_CGML', 'area']

          break;
        case '004001':
          this.activeType = '招标公告'
          arr = ['JSGC_GCLB', 'JSGC_ZBFS', 'area']

          break;
        case '005005':
          this.activeType = '交易公告'
          arr = ['area']

          break;
        case '006001':
          this.activeType = '交易公告'
          arr = ['area']

          break;
      }

      this.dictionary = arr
      // this.initTableUrl = this.initTableUrl + this.activeLogo
      this.getSearch(this.dictionary)
      let url = this.initTableUrl + this.activeLogo
      this.initTable(this.activeLogo, {}, url)
    },

  },
  created () {

    // for (var i = 0; i < this.logoDataTop.length; i++) {
    //   if (this.logoDataTop[i].no = this.$route.query.no) {
    //     this.$route.meta.title = this.logoDataTop[i].name
    //   }
    // }
    this.init()

    this.id = this.$route.query.id
    this.activeLogo = this.$route.query.no
    this.activeType = this.$route.query.name
    let url = this.initTableUrl + this.activeLogo
    this.initTable(this.activeLogo, {}, url)

  },
}
</script>

<style scoped>
.logo-push {
  margin-top: 20px;
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
/* .logo-one:hover {
  background-color: #3753b7;
  color: #fff;
} */
.logo-one.one.active {
  background-color: #526cfc;
  color: #fff;
}
.logo-one.two.active {
  background-color: #6c4afb;
  color: #fff;
}
.logo-one.three.active {
  background-color: #ff6c22;
  color: #fff;
}
.logo-one.four.active {
  background-color: #46ccb4;
  color: #fff;
}
/* .logo-one.two .one {
  background: #526cfc;
}
.logo-one.two {
  background: #ff6c22;
}
.logo-one.three {
  background: #6c4afb;
}
.logo-one.four {
  background: #46ccb4;
} */
.logon-one-text {
  margin: 14px;
}
.dictionary {
  padding: 0 20px 20px 15px;

  border: 1px solid rgba(229, 229, 229, 1);
  margin: 20px 0;
  position: relative;
}

.more-contain {
  width: 228px;
  height: 24px;
  line-height: 24px;
  background: rgba(247, 183, 81, 1);
  border-radius: 10px 10px 0px 0px;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -114px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}

.transition_dom {
  transition: all 0.3s linear 0s;
}
.list {
  height: 490px;
  /* border: 1px solid rgba(229, 229, 229, 1); */
  padding: 5px;
}

.button-contain {
  height: 104px;
  overflow: hidden;
}
.page {
  margin-bottom: 20px;
  justify-content: flex-end;
  padding: 0 5px;
}
.empty-contain {
  margin-top: 100px;
}
.table-content {
  cursor: pointer;
}
.table-content:hover {
  color: #3753b7;
}
</style>
<template>
  <div class="notice">
    <div class="area">
      <!-- <epf-nav></epf-nav> -->
      <div class="notice-contain display"
           v-loading="load">
        <div class="notice-left">
          <div class="notice-left-one  "
               v-for="(item,index) in list"
               :key="index"
               :class="{'active':item.query.id===active}"
               @click="listClick(item)">
            <div class="blue display align justify">
              <span>
                {{item.query.name}}
              </span>
              <span class="icon"
                    :class="item.query.id===active?'el-icon-caret-right':''">
              </span>
            </div>
          </div>
        </div>
        <div class="notice-right">
          <router-view></router-view>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      index: '',
      list: [

      ],
      active: '',
      notice: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
      load: false
    }
  },
  methods: {

    getTabs () {
      this.active = this.$route.query.id
      switch (this.index) {
        case '1':
          this.list = [
            { path: '/notice', query: { index: 1, id: '007002', name: '政府采购' } },
            { path: '/notice', query: { index: 1, id: '007003', name: '建设工程' } },
            { path: '/notice', query: { index: 1, id: '007004', name: '土地及矿业权' } },
            { path: '/notice', query: { index: 1, id: '007005', name: '国有产权' } }]
          break;
        case '2':

          this.list = [
            { path: '/notice', query: { index: 2, id: '002001', name: '中心简介' } },
            { path: '/notice', query: { index: 2, id: '002003', name: '机构设置' } },
            { path: '/notice', query: { index: 2, id: '002005', name: '规章制度' } },
            { path: '/notice', query: { index: 2, id: '002008', name: '预决算公开' } }]


          break;
        case '3':

          this.list = [
            { path: '/notice', query: { index: 3, id: '007002', name: '政府采购' } },
            { path: '/notice', query: { index: 3, id: '007003', name: '建设工程' } },
            { path: '/notice', query: { index: 3, id: '007004', name: '土地及矿业权' } },
            { path: '/notice', query: { index: 3, id: '007005', name: '国有产权' } },

            { path: '/notice', query: { index: 3, id: '008005', name: '数字证书' } },

          ]



          break;
        case '4':
          this.list = [
            { path: '/notice', query: { index: 4, id: '015001', name: '政府采购' } },
            { path: '/notice', query: { index: 4, id: '015002', name: '建设工程' } },
            { path: '/notice', query: { index: 4, id: '015003', name: '土地及矿业权' } },
            { path: '/notice', query: { index: 4, id: '015004', name: '国有产权' } }]
          break;
        case '5':
          this.list = [
            { path: '/notice', query: { index: 5, id: '001002', name: '通知公告' } },
            { path: '/notice', query: { index: 5, id: '001003', name: '中心动态' } },
            { path: '/notice', query: { index: 5, id: '001005', name: '政声传递' } }]
          break;

        case '6':

          this.list = [
            { path: '/notice', query: { index: 6, id: '008', name: '服务指南', eng: 'FWZN' } },
            { path: '/notice', query: { index: 6, id: '016', name: '交易流程', eng: 'JYLC' } },
            { path: '/notice', query: { index: 6, id: '000004', name: '业务咨询' } },
            { path: '/notice', query: { index: 6, id: '000005', name: '投诉举报' } }]
          // this.list = [{ name: '服务指南', path: '/notice?index=6' }, { name: '交易流程', path: '/notice?index=6' }, { name: '业务咨询', path: '/notice?index=6' }, { name: '投诉举报', path: '/notice?index=6' }]


          break;
        case '7':
          this.list = [{ name: '通知公告', path: '/notice?index=7', id: '001003' }, { name: '中心动态', path: '/notice?index=7', id: '001002' }, { name: '业务咨询', path: '/notice?index=6', id: '001005' }]
          break;


      }
    },
    listClick (item) {



      this.active = item.query.id
      this.$router.push({ path: '/notice', query: item.query })


      // switch (this.index) {
      //   case '1':

      //     

      //   case '2':

      //     break;
      //   case '3':

      //     break;
      //   case '4':

      //     break;
      //   case '5':

      //     break;

      //   case '6':
      //     this.$router.push('/notice?index=6')
      //     break;
      //   case '7':
      //     let query = { index: '7', id: item.id, name: item.name }
      //     this.$router.push({ path: '/notice', query: query })
      //     break;
      // }

    },
    // toDetail (item) {

    //   this.$store.commit('add_tabs', { path: '/noticeDetail', query: { name: item.name, id: item.id } })
    //   let params = {
    //     path: '/noticeDetail',
    //     query: {
    //       id: item.id
    //     }
    //   }
    //   this.$router.push(params)
    // },

  },
  created () {

    let query = this.$route.query


    this.index = query.index
    this.getTabs()



  },
  components: {

  },
  watch: {
    $route (to, from) {
      this.index = to.query.index
      this.getTabs()
    }
  }
}
</script>

<style scoped>
.notice {
}
.notice-contain {
  overflow: hidden;
  margin: 2px 0 20px 0;
}
.notice-left {
  width: 185px;
}

.notice-right {
  margin-left: 20px;
  width: calc(100% - 200px);
}
.page {
  margin: 20px 0;
  justify-content: flex-end;
}
.notice-left-one {
  height: 50px;
  background: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-left: 1px solid rgba(229, 229, 229, 1);
  border-right: 1px solid rgba(229, 229, 229, 1);
  border-bottom: 1px solid rgba(229, 229, 229, 1);
}
.notice-left-one:nth-child(1) {
  border-top: 1px solid rgba(229, 229, 229, 1);
}
.blue {
  height: 50px;
  background: #fff;
  width: 180px;
  margin-left: 5px;
}

.notice-left-one.active {
  background: #e12d2d;
  border: none;
  font-weight: bold;
  color: #fff;
}
.notice-left-one.active .blue {
  background: #3753b7;
}
.icon {
  position: absolute;
  right: 10px;
  top: 20px;
}

.article-title {
  align-items: flex-end;
  cursor: pointer;
  line-height: 34px;
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
  color: #333;
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
</style>
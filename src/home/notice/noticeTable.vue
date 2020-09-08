<template>
  <div>
    <div class="noticeTable"
         v-loading="loading">
      <template v-if="notice.length">
        <div class="article-title display"
             v-for="(item,index) in notice"
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
      </template>

      <div v-else
           class="noData display align justify">
        <div style="text-align:center">

          <img src="@/assets/image/home/noData.png"
               alt="">
          <div class="noData-text">暂无数据</div>

        </div>
      </div>
    </div>
    <div class="page display">
      <!-- <el-pagination small
                     background
                     layout="prev, pager, next"
                     :total="50">
      </el-pagination> -->
      <epf-page :pre="pre"
                :next="next"
                @pre-click="prevClick"
                @next-click="nextClick"
                :url="url"></epf-page>
    </div>
  </div>

</template>

<script>
export default {
  props: ['index', 'id', 'name'],
  data () {
    return {
      notice: [],
      loading: false,
      pre: '',
      next: '',
      url: '/ords/epfcms/cmsItem/queryCmsItemBySeriesId/',
    }
  },
  methods: {
    prevClick (val) {
      this.getList(val)
    },
    nextClick (val) {
      this.getList(val)
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

      // this.$store.commit('add_tabs', { path: '/noticeDetail', query: { name: item.name, id: item.id } })
      // let params = {
      //   path: '/noticeDetail',
      //   query: {
      //     id: item.id
      //   }
      // }
      if (item.item_type === 1) {
        this.getData(item.id)
        return
      }

      const { href } = this.$router.resolve({
        path: `noticeDetail`,
        query: { name: item.name, id: item.id, index: this.$route.query.index }
      });
      window.open(href, "_blank");
    },
    getList (url) {
      let that = this
      let params = {}

      this.loading = true
      this.$get(
        url,
        params
      ).then(res => {
        this.notice = res.items
        this.pre = res.prev ? res.prev.$ref : ''
        this.next = res.next ? res.next.$ref : ''
        that.loading = false



      })
    },
  },
  mounted () {
    console.log(this.id)
    console.log(this.index)
  },
  created () {


    let url = this.url + this.$route.query.id
    this.getList(url)
  },
  watch: {
    $route (to, from) {
      let id = this.url + to.query.id
      this.getList(id)
    }
  }

}
</script>

<style scoped>
.noticeTable {
  border-left: 1px solid rgba(229, 229, 229, 1);
  border-right: 1px solid rgba(229, 229, 229, 1);
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  border-top: 2px solid #3854b8;
  padding: 21px 23px;
  min-height: 549px;
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
.page {
  margin: 20px 0;
  justify-content: flex-end;
}
.noData {
  height: 500px;
}
.noData-text {
  color: #999;
  margin-top: 10px;
}
</style>
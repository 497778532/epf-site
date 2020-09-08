<template>
  <div class="search"
       v-loading="loading">
    <div class="area">
      <!-- <epf-nav></epf-nav> -->
      <div class="search-Conditions">

        <span v-for="(item,index ) in data"
              :key="index"
              :class="{'active':active===item.series_id}"
              @click="search(item)"
              class="seaech-one">
          {{item.series_name}}({{item.count}})
        </span>

      </div>
      <div class="table"
           v-if="notice.length">
        <div class="display table-head">

          <div class="title-left"
               style="text-align:center">
            标题
          </div>
          <div class="title-right"
               style="text-align:center">
            日期
          </div>
        </div>
        <div class="notice-right">

          <div class="article-title display"
               v-for="(item,index) in notice"
               :key="index"
               @click="toDetail(item)">
            <div class="title-left">
              <span class="red-point"></span>
              <span style="margin-left:3px"
                    v-html="item.name"></span>
            </div>
            <div class="title-right">
              {{item.publish_time}}
            </div>

          </div>
        </div>
      </div>
      <div v-else
           class="noData display align justify">
        <div style="text-align:center">

          <img src="@/assets/image/home/noData.png"
               alt="">
          <div class="noData-text">暂无数据</div>

        </div>
      </div>
      <div class="page display">
        <epf-page :pre="pre"
                  :next="next"
                  @pre-click="prevClick"
                  @next-click="nextClick"
                  :url="url"></epf-page>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [

      ],
      loading: '',
      pre: '',
      next: '',
      url: '/ords/epfcms/cmsItem/queryCmsItemByContentBySeriesId',
      active: '',
      notice: [],
      content: '',
      params: {
        content: '',
        seriesId: ''
      }
    }
  },
  methods: {
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
      window.open(href, "_blank");


    },
    prevClick (val) {
      this.getList(val)
    },
    nextClick (val) {
      this.getList(val)
    },
    search (item) {

      this.active = item.series_id
      this.params.seriesId = item.series_id

      this.getList(this.url)
    },
    getList (url) {
      this.loading = true
      this.$get(
        url,
        this.params
      ).then(res => {
        this.pre = res.prev ? res.prev.$ref : ''
        this.next = res.next ? res.next.$ref : ''
        this.notice = res.items
        this.loading = false
      })
    },
    getTabs (content) {

      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemByContent',
        { content: content }
      ).then(res => {
        this.data = res.items

      })

    }
  },
  created () {
    this.getTabs(this.content)
    this.getList(this.url)
  },
  mounted: function () {
    this.$bus.$on("search", val => {
      this.content = val
      this.params.content = val
      this.getTabs(this.content)
      this.getList(this.url)
    });
  },
  beforeDestroy () {
    this.$bus.$off("search");
  }

}
</script>

<style scoped>
.search {
}
.search-Conditions {
  border: 1px solid rgba(229, 229, 229, 1);
  padding: 10px 20px 10px 20px;
  position: relative;
  word-break: break-all;
  line-height: 45px;
  min-height: 100px;
}

/* .line {
  height: 1px;
  background: rgba(229, 229, 229, 1);
  position: absolute;
  top: 50%;
  left: 20px;
  margin-top: -0.5px;
  width: calc(100% - 40px);
} */

.seaech-one {
  color: #999999;
  cursor: pointer;
  margin-left: 20px;
  display: inline-block;
  border-bottom: 2px solid transparent;
}
.seaech-one.active {
  color: #3753b7;
  font-size: 16px;
  border-bottom: 2px solid #3753b7;
}

.table {
  margin-top: 20px;
}

.notice-right {
  border: 1px solid rgba(229, 229, 229, 1);
  padding: 15px 23px;
  min-height: 360px;
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
.noData {
  min-height: 360px;
}
.title-left {
  width: calc(100% - 160px);
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-right {
  width: 130px;
  color: #9a9a9a;
  margin-left: 30px;
  text-align: center;
}
.table-head {
  background: #e9efff;
  color: #000;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  padding: 0 23px;
}
</style>
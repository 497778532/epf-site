<template>
  <div class="server">
    <div class="tab-contain">
      <div class="tab-warp display">
        <div class="tab-one"
             v-for="(item,index) in editableTabs"
             :key="index"
             :class="{'active':item.no===active}"
             @click="change(item)">
          <span class="title">{{item.name}}</span>
          <span class="line"
                v-if="item.no===active"></span>
        </div>
      </div>
    </div>
    <el-table :data="tableData"
              stripe
              border
              style="width: 100%;position:relative;margin-top:12px;min-height:450px"
              v-loading="loading">
      <template slot="empty">
        <div class="empty-contain">
          <img src="@/assets/image/home/noData.png"
               alt=""
               class="empty-img">
          <div>暂无数据</div>
        </div>
      </template>
      <el-table-column prop="date"
                       label="序号"
                       align="center"
                       type="index"
                       :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="文件名称"
                       :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span @click="toDetail(scope.row)"
                class="table-title">{{ scope.row.name }}</span>

        </template>

      </el-table-column>
      <el-table-column prop="publish_time2"
                       label="日期"
                       align="center"
                       :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
    <div class="page display">
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
  data () {
    return {
      active: '',
      notice: [],
      loading: false,
      pre: '',
      next: '',
      url: '/ords/epfcms/cmsItem/queryCmsItemBySeriesId/',
      tableData: [
      ],
      editableTabs: [],
      tabIndex: 2,
      tabs: true,
    }
  },
  created () {
    let eng = this.$route.query.eng
    this.init(eng)
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
    init (eng) {

      this.editableTabs = JSON.parse(window.sessionStorage.getItem(eng)).children
      if (this.editableTabs[0]) {
        this.active = this.editableTabs[0].no
      }
      let url = this.url + this.editableTabs[0].no
      this.getList(url)
    },
    change (item) {
      this.active = item.no
      let url = this.url + item.no
      this.getList(url)
    },
    prevClick (val) {
      this.getList(val)
    },
    nextClick (val) {
      this.getList(val)
    },
    getList (url) {
      let that = this
      this.loading = true

      this.$get(
        url,
        {}
      ).then(res => {
        this.tableData = res.items
        this.pre = res.prev ? res.prev.$ref : ''
        this.next = res.next ? res.next.$ref : ''
        that.loading = false
      })
    },
  },
  watch: {
    $route (to, from) {
      let eng = to.query.eng

      this.init(eng)





    }
  }
}
</script>

<style scoped>
.server {
  padding: 0 5px;
}
.page {
  margin: 20px 0;

  justify-content: flex-end;
}
.empty-contain {
  margin-top: 100px;
}

.tab-contain {
  padding: 0 8px;
  border-bottom: 1px solid #e5e5e5;
  color: #666666;
}
.tab-warp {
}
.tab-one {
  margin-right: 60px;
  position: relative;
  padding: 10px 0;
  cursor: pointer;
}
.tab-one.active {
  color: #3854b8;
}
.line {
  width: 50%;
  background: #3854b8;
  height: 2px;
  position: absolute;
  left: 50%;
  bottom: -1px;
  margin-left: -25%;
}
.table-title {
  cursor: pointer;
}
.table-title:hover {
  color: #3854b8;
}
</style>
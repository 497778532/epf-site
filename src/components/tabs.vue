<template>
  <div class="tabs"
       v-loading="loading">
    <div class="top display">
      <div class="tabs-title_big">
        <div class="tabs-title_small">
          {{data.name}}
        </div>
      </div>
      <div class="tabs-head display">
        <div v-for="(item,index) in data.children"
             :key="index"
             class="tabs-head-one"
             @click="change(item)"
             :class="{'active':item.name===activeName}">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div style="margin-left:auto;color:#999999;padding-right:20px;cursor:pointer"
           @click="jump()">
        更多 > >
      </div>
    </div>
    <div class="content"
         v-if="data.no==='003'||data.no==='004'">
      <div class="content-tr display"
           v-for="(item,index) in data.list"
           :key="index"
           @click="toDetail(item)">
        <div class="tr-left">
          <span v-if="data.no==='003'&&item.target_type">
            【{{item.target_type}}】
          </span>
          <span v-if="data.no==='004'&&item.target_type">
            【{{item.target_type}}】
          </span>
          <span v-html="item.name">

          </span>
        </div>
        <div class="tr-right display align">
          <template v-if="no==='003001'||no==='004001'">
            <div class="state end"
                 v-if="item.status_name==='已结束'">
              {{item.status_name}}
            </div>
            <div class="state warning"
                 v-if="item.status_name==='进行中'">
              {{item.status_name}}
            </div>
          </template>
          <div class="date">
            {{item.info_time2}}
          </div>

          <!-- <div class="state success"
               v-if="item.trade_status===2">
            已成交
          </div>
          <div class="state warning"
               v-if="item.trade_status===0">
            投保中
          </div>
          <div class="state ing"
               v-if="item.trade_status===1">
            正在开标
          </div>
          <div class="state end"
               v-if="item.trade_status===3">
            已流拍
          </div>
        -->

        </div>
      </div>
    </div>
    <div class="table"
         v-if="data.no==='005'||data.no==='006'">
      <el-table :data="data.list"
                stripe
                border
                style="width: 100%">

        <el-table-column v-for="(item,index) in tableHead"
                         :key="index"
                         :label="item.title"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span @click="tabletoDetail(scope.row,item)"
                  :class="{'table-content':item.prop==='name'}">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          name: '',
          id: '',
          no: '',
          children: ''
        }
      }
    }
  },
  data () {
    return {
      no: '',
      activeName: '',
      loading: false,
      tableHead: [{ title: '公告编号', prop: 'notice_no' },
      { title: '公告时间', prop: 'notice_time' },
      { title: '起始价', prop: 'begin_price' },
      { title: '保证金', prop: 'earnest_money' },
      { title: '土地位置', prop: 'address' },]
    }
  },
  created () {
  },
  computed: {

  },
  methods: {
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
    tabletoDetail (row, item) {

      let reg = /编号/
      let reg2 = /名称/
      if (reg.test(item.title) || reg2.test(item.title)) {
        // this.$router.push({ path: '/noticeDetail', })


        const { href } = this.$router.resolve({
          path: `noticeDetail`,
          query: { name: row.name, id: row.id }
        });
        window.open(href, "_blank");
      }

    },
    change (item) {
      this.activeName = item.name
      this.getTabHead(item.no)
      this.getList(item.no)
      this.no = item.no

    },
    jump (item) {
      // this.$store.commit('delete_keepAlive')

      this.$router.push(
        '/government?no=' + this.data.children[0].no + '&id=' + this.data.id + '&name=' + this.data.children[0].name)
    },
    getTabHead (no) {


      switch (no) {
        case '005005':
          //土地及矿业权的交易公告
          this.tableHead = [
            { title: '公告编号', prop: 'name' },

            // { title: '宗地编号', prop: 'trade_no' },
            { title: '公告时间', prop: 'info_time2' },

            { title: '保证金截止日期', prop: 'end_earnest_time' },
            { title: '竞买申请截止日期', prop: 'end_apply_time' },
            { title: '起始价', prop: 'begin_price' },
            { title: '保证金', prop: 'earnest_money' },


            // { title: '土地位置', prop: 'address' },
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
            // { title: '标的名称', prop: 'trade_name' },
          ]
          break;
        case '005007':
          //土地及矿业权的变更公告
          this.tableHead = [
            { title: '公告编号', prop: 'name' },

            { title: '宗地编号', prop: 'trade_no' },
            { title: '公告类型', prop: 'type' },
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
            { title: '公告类型', prop: 'type' },
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


    },
    getList (id) {

      let params = {
        row_offset: 1,
        row_count: 5
      }
      this.loading = true
      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemBySeriesId/' + id,
        params
      ).then(res => {
        this.data.list = res.items
        // activeName
        for (var i = 0; i < this.data.list.length; i++) {
          this.$set(this.data.list[i], 'type', this.activeName)
        }
        this.loading = false
      })
    },
  },
  watch: {
    'data.children': function (val) {
      this.getTabHead(val[0].no)
      this.getList(val[0].no)
      this.no = val[0].no
      this.activeName = JSON.parse(JSON.stringify(val[0].name))

    }

  }
}
</script>

<style scoped>
.tabs {
  /* line-height: 44px; */
}
.content {
  line-height: 40px;
}
.top {
  height: 44px;
  line-height: 44px;
  background: #f7f8fb;
}
.tabs-title_small {
  width: 130px;
  height: 44px;
  background: rgba(56, 84, 184, 1);
  border-radius: 0px 16px 0px 0px;

  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.tabs-title_big {
  width: 136px;
  height: 44px;
  background: #e22e2e;
  border-radius: 0px 16px 0px 0px;
}
.tabs-head {
  font-size: 14px;
  padding-left: 24px;
}

.tabs-head-one {
  margin-right: 70px;
  cursor: pointer;
  position: relative;
}
.tabs-head-one.active {
  font-weight: bold;
  color: rgba(56, 84, 184, 1);
}

.tabs-head-one.active::after {
  content: "";
  width: 30px;
  height: 3px;
  background: #3854b8;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -15px;
}

.content {
  padding: 20px;
  border: 1px solid #e2e8ff;
  border-top: none;
  min-height: 220px;
}
.content .content-tr {
  justify-content: space-between;
}

.state {
  padding: 1px 7px;
  text-align: center;
  font-size: 12px;
  margin-right: 10px;
  border-radius: 2px 6px 2px 6px;
  line-height: normal;
  color: #fff;
}
.tr-left {
  cursor: pointer;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tr-left:hover {
  color: #3753b7;
}
.warning {
  background: #f7b751;
}
.success {
  background: #20be54;
}
.ing {
  background: #14adf1;
}
.end {
  background: #999999;
}
.date {
  color: #999999;
}
.table {
  margin-top: 10px;
}
.table-content {
  cursor: pointer;
}
.table-content:hover {
  color: #3753b7;
}
</style>
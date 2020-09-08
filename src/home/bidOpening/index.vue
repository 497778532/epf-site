<template>
  <div class="bidOpening">
    <div class="area">
      <div class="search">
        <div class="display align search-contain">
          <div class="display align">
            <span>时间：</span>
            <!-- <el-date-picker v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                           >
            </el-date-picker>-->

            <el-date-picker v-model="date"
                            type="daterange"
                            @change="change"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"></el-date-picker>

          </div>
          <div class="display align">
            <span>区域：</span>

            <el-select v-model="params.cantonId"
                       placeholder="请选择">
              <el-option v-for="item in cantonData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="display align">
            <span>项目：</span>
            <el-input v-model="params.name"
                      placeholder="请输入内容"
                      style="width:280px"></el-input>
          </div>
        </div>
        <div class="display align justify">
          <span class="button blue"
                @click="bidOpenQuery(url)">搜索</span>
          <span class="button write"
                @click="resetData">重置</span>
        </div>
      </div>
      <div class="data-contain"
           v-loading="loading">
        <div class="data-one"
             v-for="(item,index) in data"
             :key="index">
          <div class="date">
            <span>开标时间：</span>
            <span>{{item.trade_time2}}</span>
          </div>
          <div class="tr display align">
            <div class="tr-left">
              <span>开标地点：</span>
              <span>{{item.trade_address}}</span>
            </div>
            <div class="tr-right">
              <span>标段编号：</span>
              <span>{{item.no}}</span>
            </div>
          </div>
          <div class="tr display align">
            <div class="tr-left">
              <span>开标室：</span>
              <span>{{item.name}}</span>
            </div>
            <div class="tr-right">
              <span>招标单位：</span>
              <span>{{item.trade_room}}</span>
            </div>
          </div>
          <div class="tr display align">
            <div class="tr-left">
              <span>标段名称：</span>
              <span>{{item.name}}</span>
            </div>
            <div class="tr-right">
              <span>状态：</span>
              <span v-if="item.status_name == '已成交'"
                    class="state green">{{item.status_name}}</span>
              <span v-else-if="item.status_name == '投保中'"
                    class="state orange">{{item.status_name}}</span>
              <span v-else-if="item.status_name == '已流拍'"
                    class="state gray">{{item.status_name}}</span>
              <span v-else
                    class="state blue2">{{item.status_name}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="page display">
        <epf-page :pre="pre"
                  :next="next"
                  @pre-click="prevClick"
                  @next-click="nextClick"
                  :url="url"></epf-page>
        <!-- <el-pagination small background layout="prev, pager, next" :total="50"></el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickerBeginDateBefore: {

      },
      loading: false,
      cantonData: [],
      date: ["", ""],
      params: {
        tradeTime1: "",
        tradeTime2: "",
        cantonId: "",
        name: "",
      },
      data: [],
      pre: "",
      next: "",
      url: "/ords/epfcms/trade/queryListTradeParams",
    };
  },
  created () {
    let time = new Date();
    this.date = [
      this.formatDateTime(time - 7 * 24 * 60 * 60 * 1000),
      this.formatDateTime(time),
    ];
    let url = this.url;
    this.bidOpenQuery(url);
    this.cantonQuery();
  },
  methods: {

    change (val) {
      console.log(val)
      if (val[0] === val[1]) {
        val[1] = this.formatDateTime(new Date())
      }
    },
    formatDateTime (time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // var h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // var minute = date.getMinutes();
      // var second = date.getSeconds();
      // minute = minute < 10 ? ('0' + minute) : minute;
      // second = second < 10 ? ('0' + second) : second;
      // + ' ' + h + ':' + minute + ':' + second;
      return y + "-" + m + "-" + d;
    },
    //列表
    bidOpenQuery (url) {
      if (this.date) {
        this.params.tradeTime1 = this.date[0];
        this.params.tradeTime2 = this.date[1];
      } else {
        this.params.tradeTime1 = "";
        this.params.tradeTime2 = "";
      }
      this.loading = true;
      this.$get(url, this.params).then((res) => {
        console.log(res.items);
        this.data = res.items;
        this.pre = res.prev ? res.prev.$ref : "";
        this.next = res.next ? res.next.$ref : "";
        this.loading = false;
      });
    },
    cantonQuery () {
      this.$axios.get("/api/ords/epfcms/param/canton/445200").then((res) => {
        if (res.status !== 200) {
          return;
        }
        this.cantonData = res.data.items;
        this.cantonData.unshift({ name: '请选择', id: '' })
      });
    },
    //重置
    resetData () {
      let time = new Date();
      this.date = [
        this.formatDateTime(time - 7 * 24 * 60 * 60 * 1000),
        this.formatDateTime(time),
      ];
      this.params = {
        tradeTime1: "",
        tradeTime2: "",
        cantonId: "",
        name: "",
      };
    },
    prevClick (val) {
      this.bidOpenQuery(val);
    },
    nextClick (val) {
      this.bidOpenQuery(val);
    },
  },
};
</script>

<style scoped>
.bidOpening {
  min-height: 500px;
}
.search-contain {
  width: 100%;
  justify-content: space-between;
  padding: 12px 20px;
}
.search {
  margin-top: 20px;
  height: 120px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}
.button {
  width: 100px;
  height: 32px;
  display: inline-block;
  border-radius: 4px;
  margin: 0 7px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.blue {
  background: rgba(56, 84, 184, 1);
  color: #fff;
}
.write {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
}

.data-contain {
}

.data-one {
  height: 150px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  padding: 12px;
  margin-top: 20px;
  line-height: 32px;
}
.data-one .tr {
  /* margin-top: 13px; */
}

.tr-left {
  width: 65%;
}
.tr-left > span:nth-child(1),
.tr-right > span:nth-child(1) {
  display: inline-block;
  width: 100px;
  text-align: right;
  color: #999999;
}

.date > span:nth-child(1) {
  width: 100px;
  display: inline-block;
  text-align: right;
}
.tr-right {
  width: 35%;
}
.date {
  font-weight: bold;
  font-size: 16px;
  color: rgba(55, 83, 183, 1);
}

.state {
  width: 80px;
  height: 32px;
  /* background: rgba(31, 189, 83, 1); */
  text-align: center;
  line-height: 32px;
  color: #fff;
  display: inline-block;
}
.page {
  margin: 20px 0;
  justify-content: flex-end;
}
.green {
  background: rgba(31, 189, 83, 1);
}
.orange {
  background: #f7b751;
}
.gray {
  background: #999999;
}
.blue2 {
  background: #14adf1;
}
</style>

<style>
.bidOpening .el-date-editor .el-range__icon {
  line-height: 25px;
}

.bidOpening .el-date-editor .el-range-separator {
  line-height: 25px;
}
</style>
<template>
  <div class="home">
    <!-- <div class="transaction w">
      <epf-title :title="'交易数据'"></epf-title>
      <div class="tran_bd">
        <div class="statistics tran_box">
          <h3>
            <span>{{year}}年公告统计</span>
          </h3>
          <div class="release">
            <div class="release_left">
              <p>发布公告</p>
              <i>{{toDOData.publish_count}}</i>（宗）
            </div>
            <div class="release_right">
              <p>成交结果</p>
              <i>{{toDOData.trans_count}}</i>
              （宗）
            </div>
          </div>
          <h3>
            <span>{{year}}年交易情况统计</span>
          </h3>
          <div class="yeardeal">
            <div>
              <span>{{year}}年交易数</span>
              <i>（宗）</i>
              <p>{{toDOData.trans_count}}</p>
            </div>
            <div v-if="toDOData.trans_price_sum1 > 9999">
              <span>{{year}}年交易额</span>
              <i>（亿元）</i>
              <p>{{toDOData.trans_price_sum2}}</p>
            </div>
            <div v-else>
              <span>{{year}}年交易额</span>
              <i>（万元）</i>
              <p>{{toDOData.trans_price_sum1}}</p>
            </div>
            <div>
              <span>节约资金</span>
              <i>（万元）</i>
              <p>{{toDOData.economize_price_sum}}</p>
            </div>
            <div>
              <span>增值金额</span>
              <i>（万元）</i>
              <p>{{toDOData.increment_price_sum}}</p>
            </div>
          </div>
        </div>
        <div class="trends tran_box">
          <h3>
            <span>交易趋势</span>
          </h3>
          <trends></trends>
        </div>
        <div class="proportion tran_box">
          <h3>
            <span>交易类型占比</span>
          </h3>
          <proportion></proportion>
        </div>
      </div>
    </div> -->
    <div class="guide w">

      <div class="guide_bd">
        <div class="guide_bdleft">
          <img src="@/assets/image/home/mapLeft.png"
               alt="">
        </div>
        <div class="guide_bdright"
             @click="toMap">

          <img src="@/assets/image/home/map.jpg"
               style="width:100%;height:240px"
               alt />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import trends from "./homeEcharts/trends";
import proportion from "./homeEcharts/proportion";
export default {
  components: {
    trends,
    proportion,
  },
  data () {
    return {
      toToData: [
        {
          name: "服务指南",
          url: require("@/assets/image/home/todo1.png"),
          id: "008",
          eng: "FWZN",
        },
        {
          name: "交易流程",
          url: require("@/assets/image/home/todo2.png"),
          id: "016",
          eng: "JYLC",
        },
        {
          name: "业务咨询",
          url: require("@/assets/image/home/todo3.png"),
          id: "000004",
        },
        {
          name: "投诉举报",
          url: require("@/assets/image/home/todo4.png"),
          id: "000005",
        },
      ],
      toDOData: {
        publish_count: 0,
        trans_count: 0,
        trans_price_sum1: 0,
        trans_price_sum2: 0,
        economize_price_sum: 0,
        increment_price_sum: 0,
      },
      year: "2020",
    };
  },
  mounted () { },
  created () {
    let date = new Date();
    this.year = date.getFullYear();
    this.toDoQuery();
  },
  methods: {
    toMap () {
      this.$router.push('cityMap')
    },
    over (item, index) {
      let num = index + 1;
      item.url = require("@/assets/image/home/todo" + num + "B.png");
    },
    out (item, index) {
      let num = index + 1;
      item.url = require("@/assets/image/home/todo" + num + ".png");
    },

    jump (item) {


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
    toDoQuery () {
      this.$axios
        .get("/api/ords/epfcms/trade/queryTradeTransData")
        .then((res) => {
          if (res.status !== 200) {
            return;
          }
          this.toDOData = res.data;
        });
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333333;
}
body {
  font-family: MicrosoftYaHei;
  font-size: 14px;
}
i {
  font-style: normal;
}

.transaction .tran_hd,
.guide .guide_hd {
  height: 44px;
  background: rgba(247, 248, 251, 1);
}
.tran_hd h3,
.guide_hd h3 {
  width: 134px;
  height: 44px;
  background: #3854b8;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  line-height: 44px;
  border-top-right-radius: 15px;
  box-shadow: 5px 0px 0px #e22e2e;
}
.tran_bd {
  display: flex;
  margin: 20px 0 10px 0;
}
.tran_box {
  width: 32%;
  height: 368px;
  margin-right: 20px;
  border: 1px solid #e5e5e5;
}
.proportion {
  margin-right: 0px;
}
.tran_box h3 {
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #3854b8;
  text-align: left;
  line-height: 40px;
  border-bottom: 1px solid #e5e5e5;
}
.tran_box h3 span {
  padding-left: 10px;
  display: inline-block;
  border-bottom: 3px solid #3854b8;
}
.release {
  display: flex;
  margin: 20px 10px 10px 10px;
  height: calc(40% - 41px);
  background: url("../../../assets/image/home/back.png") no-repeat center center;
  background-size: 100% 100%;
}
.release_left {
  width: 177px;
}
.release_left,
.release_right {
  height: 88px;
  padding-left: 20px;
  font-weight: 400;
  color: #ffffff;
  text-align: left;
  padding-top: 15px;
}
.release_left i,
.release_right i {
  margin-right: 5px;
  font-size: 30px;
  font-family: STHupo;
  font-weight: 400;
}
.release_right {
  position: relative;
  width: 198px;
}

.yeardeal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  height: calc(40% - 41px);
}
.yeardeal div {
  flex: 40%;
  padding: 5px 0px 10px 10px;
  text-align: left;
}
.yeardeal i {
  color: #3854b8;
}
.yeardeal div:nth-child(1),
.yeardeal div:nth-child(2) {
  border-bottom: 1px solid #e5e5e5;
}
.yeardeal div:nth-child(2),
.yeardeal div:nth-child(4) {
  border-left: 1px solid #e5e5e5;
}
.yeardeal span {
  color: #333333;
}
.yeardeal p {
  margin-top: 10px;
  color: #3854b8;
  font-size: 20px;
}
.guide_bd {
  margin: 20px 0 10px 0;
  display: flex;
}
.guide_bdleft {
  width: 862px;
}

.guide_bdright {
  width: 319px;
  height: 240px;
  margin-left: 19px;
  background-color: #f7f8fb;
}
/* 尾部开始 */
</style>
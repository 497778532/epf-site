<template>
  <div class="trends_chat">
    <div id="trendsChat"
         :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>

<script>
export default {
  mounted () {

    this.getData()
  },
  methods: {
    trendsLine (data) {
      // 基于准备好的dom，初始化echarts实例
      let trendsChat = this.$echarts.init(
        document.getElementById("trendsChat")
      );
      // 绘制图表配置
      let option = {
        tooltip: {},
        legend: {
          data: ["成交数量", "成交金额"],
          x: "30%",
          y: "90%",
        },
        color: ["#4779E8", "#E22E2E"],
        grid: {
          left: "12%",
        },
        xAxis: [
          {
            type: "category",
            data: data.months,
            axisPointer: {
              type: "shadow",
            },
            axisLine: {
              lineStyle: {
                color: '#C7D1FF'
              },

            },


            axisLabel: {
              textStyle: {
                color: '#666666',//坐标值得具体的颜色

              }
            },


          },

        ],
        yAxis: [
          {
            type: "value",
            name: "（项）",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: '#666666',//坐标值得具体的颜色

              }
            },
            splitLine: {//分割线配置

              lineStyle: {
                color: "#C7D1FF",
              }
            },
            axisLine: {
              lineStyle: {
                color: '#C7D1FF'
              }
            },

            axisTick: {
              show: false,
            },
            nameTextStyle: {
              color: "#999999",

            },
          },
          {
            type: "value",
            name: "（亿元）",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: '#666666',//坐标值得具体的颜色

              }
            },
            axisLine: {
              lineStyle: {
                color: '#C7D1FF'
              }
            },
            nameTextStyle: {
              color: "#999999",

            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "成交数量",
            type: "bar",
            data: data.trans_count,
            barWidth: 30,
            barMaxWidth: 30,
          },
          {
            name: "成交金额",
            type: "line",
            yAxisIndex: 1,
            data: data.trans_price_sum,
          },
        ],
      };
      trendsChat.setOption(option);
      setTimeout(function () {
        window.onresize = function () {
          trendsChat.resize();
        };
      }, 200);
    },
    getData (id) {

      this.$get(
        '/ords/epfcms/trade/queryTradeMonthsTransTotal',
        {}
      ).then(res => {
        let arr = res.items
        let months = []
        let trans_count = []
        let trans_price_sum = []

        if (!arr) {
          return
        }
        for (var i = 0; i < arr.length; i++) {
          months.push(arr[i].months)
          trans_count.push(arr[i].trans_count)
          trans_price_sum.push(arr[i].trans_price_sum)
        }

        let data = {
          months: months,
          trans_count: trans_count,
          trans_price_sum: trans_price_sum
        }
        this.trendsLine(data)
      })
    },
  }}

</script>

<style scoped>
.trends_chat,
.proportion_chat {
  width: 100%;
  height: calc(100% - 41px);
}
#trendsChat,
#proportionChat {
  width: 100%;
  height: 100%;
}
</style>
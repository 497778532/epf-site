<template>

  <div class="cityMap">
    <div class="area display">

      <div id="mapChart"
           ref="mapChart"
           class="mapChart"></div>
      <div class="phone">
        <el-scrollbar style="height:100%">
          <div class="phone-contain">

            <div class="phone-one"
                 v-for="(item,index) in data"
                 :key="index">
              <div class="title">
                {{item.name}}
              </div>
              <div class="content">
                <div v-for="(tel,telIndex) in item.children"
                     :key="telIndex">
                  <span>{{tel.name}}：</span>
                  <span>{{tel.lvalue}}</span>
                </div>

              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'
import '../../../../static/guangdong.js'
export default {
  data () {
    return {
      chart: null,
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      mapCode: '',
      // pro: {
      //   揭阳市: '../../../static/map/json/province/445200.json',
      // },
      jieyangData: [
        { areaCode: '445202', value: 1, name: '榕城区' },
        { areaCode: '445203', value: 11, name: '揭东区' },
        { areaCode: '445222', value: 21, name: '揭西县' },
        { areaCode: '445224', value: 31, name: '惠来县' },
        { areaCode: '445281', value: 41, name: '普宁市' },
      ],
      geoCoordMap: [
        { name: '揭阳市政务服务中心', value: [116.37905, 23.558611], address: 'hahahahahahah' },
        { name: '惠来县公共资源交易中心', value: [116.302927, 23.03418], address: '惠来县公共资源交易中心' },
        // { name: '揭西县公共资源交易中心', value: [116.37905, 23.558611], address: 'hahahahahahah' },
        // { name: '普宁市公共资源交易中心', value: [116.37905, 23.558611], address: 'hahahahahahah' },
        // { name: '揭东区公共资源交易中心', value: [116.37905, 23.558611], address: 'hahahahahahah' },
        // '揭阳市政务服务中心': [116.37905, 23.558611,],
        // '揭西县公共资源交易中心': [116.302927, 23.03418],
      ]
    }
  },
  methods: {
    async loadMapChart (mapCode, name) {
      let that = this



      const data = await axios.get(mapCode)

      let mapChartData = []
      mapChartData = this.jieyangData

      if (data) {

        this.chart = echarts.init(this.$refs.mapChart)
        echarts.registerMap(name, data.data)
        let lng = []
        for (let i = 0; i < this.geoCoordMap.length; i++) {
          lng.push(this.geoCoordMap[i].value)
        }
        var option2 = {
          visualMap: {
            // 颜色的设置  dataRange
            show: false,
            itemWidth: 14,
            itemHeight: 14,
            bottom: 60,
            left: 10,
            inverse: 'true', // 控制高低的位置
            orient: 'horizontal', // 控制导航的方向
            splitList: [
              {
                min: 1,
                max: 9,
                label: '绿色区域',
                color: '#0b539f',
              },
              {
                min: 11,
                max: 19,
                label: '深红色区域',
                color: '#2a78bc',
              },
              {
                min: 21,
                max: 29,
                label: '粉红色区域',
                color: '#3580c1',
              },
              {
                min: 31,
                max: 39,
                label: '紫色区域',
                color: '#6cafd9',
              },
              {
                min: 41,
                max: 49,
                label: '黄色区域',
                color: '#ded9ec',
              },
              // { end: 11, color: "#fb8c57" }
            ],
            seriesIndex: 0,
            text: ['高', '低'], // 文本，默认为数值文本
          },
          tooltip: {
            trigger: "item",
          },
          geo: {
            map: name,
            zoom: 1.1,
            aspectScale: 1,
            // center: [104.2978515625, 35.8544921875],
            label: {
              show: false,
              emphasis: {
                show: false
              }
            },
            roam: false, //是否允许缩放
            itemStyle: {
              normal: {
                color: "rgba(51, 69, 89, .5)", // 地图背景色
                borderColor: "#516a89", // 省市边界线00fcff 516a89
                borderWidth: 1,

              },
              emphasis: {

                color: "rgba(37, 43, 61, .5)" // 悬浮背景
              }
            }
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              aspectScale: 1,
              zoom: 1.1,
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: true,
                  fontSize: '16',
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  borderWidth: 2,
                  borderColor: '#fff',
                }, // 正常样式
                emphasis: {

                  areaColor: '#fff',
                  borderWidth: 2,
                  borderColor: '#3854b8',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00',
                    },
                  },
                }, // 鼠标事件区块样式
              },
              tooltip: {
                show: false
              },

              data: mapChartData,
              zlevel: 1
            },
            {
              name: '123',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: [
                [116.37905, 23.558611, { name: '揭阳市公共资源交易中心', address: '揭阳市政务服务中心6-7楼' }],
                [116.300749, 23.034824, { name: '揭阳市公共资源交易中心惠来分中心', address: '惠来县惠城镇南门西路21号（中国工商银行惠来支行9楼）' }],

                [115.862944, 23.451658, { name: '揭阳市公共资源交易中心揭西分中心', address: '揭西县政务服务中心B栋2楼' }],
                [116.16635, 23.326754, { name: '揭阳市公共资源交易中心普宁分中心', address: '普宁市燎原街道群飞大厦7、8楼' }],
                [116.435667, 23.585745, { name: '揭阳市公共资源交易中心揭东分中心', address: '揭东区公共服务中心三楼' }]


              ],
              symbolSize: 20,
              showEffectOn: 'render',
              rippleEffect: {
                color: '#F7B751',
                brushType: 'stroke'
              },
              zoom: 1.1,
              // label: {
              //   show: true,
              //   color: 'black'
              // },
              hoverAnimation: true,

              tooltip: {
                show: true,
                backgroundColor: '#fff',
                formatter: function (params) {
                  return `<p style="font-size:16px;color:#3854b8;font-weight:700">${params.data[2].name}</p>
                          <p style="font-size:14px;color:#333">${params.data[2].address}</p>`
                },
                padding: [5, 10],
                textStyle: {
                  color: '#000'
                },
                extraCssText: 'box-shadow: 3px 4px 17px 1px rgba(183, 218, 254, 0.7);border-radius: 10px;'
              },

              itemStyle: {    //打点的颜色
                normal: {
                  color: '#F7B751',
                  shadowBlur: 10,
                  shadowColor: '#F7B751'
                }
              },
              zlevel: 99
            }
          ],
        }

        this.chart.setOption(option2, true)
      } else {
        alert('无法加载该地图')
      }
    },
    getData () {

      this.$get(
        '/ords/epfcms/param/queryParamAllByNo/consultingService',
        {}
      ).then(res => {
        if (!res) {
          return
        }
        this.data = res[0].children

      })
    },

  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.loadMapChart(
          '../../../../static/445200.json',
          '揭阳市'
        )
      }, 200)
    })
  },
  created () {
    this.getData()
  }
}
</script>
<style scoped>
.cityMap {
  margin-bottom: 20px;
}
.mapChart {
  width: 800px;
  height: 630px;

  border: 1px solid #e5e5e5;
  border-top: 2px solid #3854b8;
}

.phone {
  width: 380px;
  height: 630px;
  border: 1px solid #e5e5e5;
  margin-left: 20px;
  border-top: 2px solid #3854b8;
}

.phone-one {
  background: #ffffff;
  border-top: 1px solid #e5e5e5;
  padding-bottom: 14px;
  margin-bottom: 20px;
  width: 100%;
}
.phone-one:first-child {
  border-top: none;
}
.phone-contain {
  flex-wrap: wrap;
  justify-content: space-between;
}
.title {
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.content {
  padding: 0 15px;
}
.content > div {
  margin-top: 14px;
}
.content > div > span:nth-child(1) {
  color: #656565;
}
</style>
<style >
.cityMap .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

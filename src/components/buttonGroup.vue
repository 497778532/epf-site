<template>
  <div class="nav buttonGroup-contain">
    <div v-for="(data,dataIndex) in list"
         class="buttonGroup display flex align"
         :key="dataIndex">

      <div style="width:80px;text-align:right">{{data.name}}：</div>
      <template v-for="(item,index) in data.arr">
        <div :key="index"
             :class="{'active':active[dataIndex]===item.name}"
             @click="myClick(item,dataIndex,data)"
             class="button display flex justify align"
             v-if="!data.isInput">

          {{item.name}}
        </div>

      </template>
      <div v-if="data.isInput"
           class="display align">
        <el-input placeholder="请输入关键词"
                  v-model="input[dataIndex]">
          <i slot="prefix"
             class="el-input__icon el-icon-search"></i>
        </el-input>

        <div v-if="data.last"
             class="button red display align justify"
             @click="buttonClick(dataIndex,data)">
          查询
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeType: {
      type: String,
      default: function () {
        return ''
      }
    },
    activeLogo: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {
      input: ['', '', '', '', '', '', ''],
      active: [],
      params: {}
    }
  },
  methods: {
    myClick (item, index, key) {
      // if (item.name === '全部') {

      // }
      console.log(key)
      this.params["no"] = this.activeLogo


      switch (key.name) {
        case '公告类型':
          this.params["no"] = item.no
          this.params["name"] = item.name
          break;

        case '采购方式':
          this.params["tradeType"] = item.name === '全部' ? '' : item.name
          break;
        case '采购目录':
          this.params["targetType"] = item.name === '全部' ? '' : item.name
          break;

        case '招标方式':
          this.params["tradeType"] = item.name === '全部' ? '' : item.name
          break;

        case '工程类别':
          this.params["targetType"] = item.name === '全部' ? '' : item.name
          break;

        case '区域':
          this.params["cantonId"] = item.name === '全部' ? '' : item.id
          break;

        case '时间':
          let time = new Date()
          this.params["infoTime1"] = item.name === '全部' ? '' : this.formatDateTime(time - item.id * 24 * 60 * 60 * 1000)
          this.params["infoTime2"] = item.name === '全部' ? '' : this.formatDateTime(time)

          break;
      }


      this.$set(this.active, index, item.name)

      this.$emit('temp', this.params)

    },
    formatDateTime (time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      // var h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // var minute = date.getMinutes();
      // var second = date.getSeconds();
      // minute = minute < 10 ? ('0' + minute) : minute;
      // second = second < 10 ? ('0' + second) : second;
      // + ' ' + h + ':' + minute + ':' + second;
      return y + '-' + m + '-' + d
    },
    buttonClick (item, index, key) {
      this.params["no"] = this.activeLogo
      this.params["noticeNo"] = this.input[1]
      this.params["address"] = this.input[4]
      this.$emit('temp', this.params)
    }

  },
  watch: {
    list (val) {
      this.active = []
      this.input = ['', '', '', '', '', '', ''];
      for (var i = 0; i < val.length; i++) {
        if (val[i].name === '公告类型') {
          this.active.push(this.activeType)
        } else {
          this.active.push('全部')
        }
      }
      // for (var i = 0; i < val.length; i++) {
      //   if (val[i].name === '公告类型') {
      //     this.active.push(val.arr[0].name)
      //   } else {

      //   }

      // }
    },
    deep: true
  }
}
</script>

<style scoped>
.buttonGroup {
  margin-top: 14px;
}
.button {
  width: 100px;
  height: 32px;
  margin-right: 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 4px;
  color: #999999;
  cursor: pointer;
}

.red {
  background: rgba(226, 46, 46, 1);
  border: none;
  color: #fff;
  margin-left: 20px;
}
.button.active {
  background: rgba(56, 84, 184, 1);
  color: #fff;
}
</style>
<style>
.buttonGroup-contain .buttonGroup .el-input__inner {
  border-radius: 4px;
  color: #999;
  width: 220px;
}
</style>
<template>
  <div class="phone">
    <div class="area display ">
      <div class="phone-one"
           v-for="(item,index) in data"
           :key="index">
        <div class="title">
          财务部
        </div>
        <div class="content">
          <div>
            <span>电话：</span>
            <span>1234567</span>
          </div>
          <div>
            <span>电话：</span>
            <span>1234567</span>
          </div>
          <div>
            <span>电话：</span>
            <span>1234567</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  }
}
</script>

<style scoped>
.phone {
  min-height: 500px;
}
.area {
  flex-wrap: wrap;
  justify-content: space-between;
}
.phone-one {
  width: 32%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding-bottom: 14px;
  margin-bottom: 20px;
}
.title {
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  border-bottom: 1px solid #e5e5e5;
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
/* .content > div > span:nth-child(2) {
  color: #656565;
} */
</style>
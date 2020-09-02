<template>
  <div class="advertising"
       id="advertising"
       @mouseover="over"
       @mouseout="out"
       v-if="$store.state.advertising">
    <div class="advertising-child">
      <p v-for="(item,index) in list"
         :key="index"
         style="cursor:pointer">
        <span @click="toDetail(item)"> {{index+1}}{{item.name}}</span>

      </p>

    </div>
    <div class="close"
         @click="close"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itl: null,
      advertising: true,
      x1: 50,
      y1: 60,
      step: 1,
      delay: 20,
      xin: true,
      yin: true,
      ele: null,
      list: []
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    let that = this
    if (!this.$store.state.advertising) {
      return
    }
    this.ele = document.getElementById("advertising");
    // this.itl = window.setInterval(that.float, 20);
    this.itl = window.setInterval(function () {
      that.float()
    }, 20)
  },

  methods: {
    toDetail (item) {
      const { href } = this.$router.resolve({
        path: `noticeDetail`,
        query: { name: item.name, id: item.id }
      });
      window.open(href, "_blank");
    },
    getList () {


      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemFloat',
        {}
      ).then(res => {
        this.list = res.items

      })
    },
    over () {
      let that = this
      window.clearInterval(that.itl);
    },
    out () {
      let that = this
      this.itl = setInterval(that.float, that.delay);
    },
    float () {

      var L = 0; var T = 0;
      var R = document.documentElement.clientWidth - this.ele.offsetWidth;
      var B = document.documentElement.clientHeight - this.ele.offsetHeight;
      this.ele.style.left = this.x1 + document.body.scrollLeft + 'px';
      this.ele.style.top = this.y1 + document.body.scrollTop + 'px';
      this.x1 = this.x1 + this.step * (this.xin ? 1 : -1);
      if (this.x1 < L) {
        this.xin = true;
        this.x1 = L;
      }
      if (this.x1 > R) {
        this.xin = false;
        this.x1 = R;
      }
      this.y1 = this.y1 + this.step * (this.yin ? 1 : -1);
      if (this.y1 < T) {
        this.yin = true;
        this.y1 = T;
      }
      if (this.y1 > B) {
        this.yin = false;
        this.y1 = B;
      }
    },
    close () {
      let that = this
      this.$store.commit('close_advertising')
      window.clearInterval(that.itl);
    },
  },
  beforeDestroy () {
    let that = this
    window.clearInterval(that.itl);
  }
}
</script>

<style scoped>
.advertising {
  width: 318px;

  position: absolute;
  top: 254px;
  left: 33px;
  z-index: 999999999999;
}

.advertising-child {
  width: 300px;

  padding: 20px 15px;
  background: #3ca0ee;
  color: #f7d30f;
  font-size: 16px;

  box-shadow: 0px 2px 7px 0px rgba(56, 184, 84, 0.35);
  border-radius: 4px;
  margin-top: 18px;
  margin-right: 18px;
}
.close {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0;
  top: 0;
  background: url("../../../assets/image/home/close1.png") no-repeat center
    center;
}
</style>
<template>
  <div class="epf-page">
    <div class="pre button"
         @click="myClick('pre-click','pre')"
         v-if="pre">上一页</div>
    <div class="next button"
         @click="myClick('next-click','next')"
         v-if="next">下一页</div>
  </div>
</template>

<script>
export default {
  props: {
    pre: {
      type: String,
      default: function () {
        return ''
      }
    },
    next: {
      type: String,
      default: function () {
        return ''
      }
    },
    url: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    myClick (key, value) {

      let str = this[value]

      let num = str.indexOf(this.url)
      str = str.slice(num)

      this.$emit(key, str)
    }
  }
}
</script>

<style scoped>
.button {
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding: 0 12px;
  cursor: pointer;
  display: inline-block;
  color: #666666;
  background: #fff;
  border: 1px solid rgba(229, 229, 229, 1);
  margin-left: 10px;
}
</style>
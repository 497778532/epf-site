<template>
  <div style="background:#F7F8FB">
    <div class="tabs-title_big">
      <div class="tabs-title_small">
        {{title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: function () {
        return ''
      }
    },
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.tabs-title_small {
  width: 130px;
  height: 44px;
  line-height: 44px;
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
</style>
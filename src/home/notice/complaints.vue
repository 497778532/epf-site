<template>
  <div class="complaints">
    投诉举报
  </div>
</template>

<script>
export default {
  created () {
    window.open('http://www.gdzwfw.gov.cn/portal/index')
  }
}
</script>

<style scoped>
.complaints {
  min-height: 500px;
}
</style>
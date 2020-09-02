<template>
  <div class="wrap"
       ref="wrap">
    <iframe :src="pSrc"
            width="100%"
            height="100%"></iframe>
  </div>
</template>

<script>
export default {
  name: 'ComprehensiveDeail',
  props: {
    id: {
      type: String,
      default: function () {
        return ''
      }
    },
  },
  data () {
    return {
      pSrc: '',
      documentId: this.$route.query.documentId
    }
  },
  created () {
    console.log(this.$route)
  },
  beforeDestroy () {
    document.querySelector('html').style.height = 'auto'
    document.querySelector('body').style.height = 'auto'
    document.querySelector('#app').style.height = 'auto'
  },
  methods: {
    loadPDF () {
      let id = this.documentId ? this.documentId : this.id
      document.querySelector('html').style.height = '100%'
      document.querySelector('body').style.height = '100%'
      document.querySelector('#app').style.height = '100%'
      if (id) {
        // baseurl ：pdf存放的文件路径，可以是本地的，也可以是远程
        let baseurl
          = '/api/ords/epfcms/file/download/' + id
        // ie有缓存加个随机数解决 + '?r=' + new Date()
        let pSrc = baseurl + '&r=' + new Date()
        this.pSrc = `/jiey/static/pdf/web/viewer.html?file=${baseurl}`
      }
    }
  },

  mounted () {
    this.loadPDF()
  }
}
</script>

<style scoped>
.wrap {
  height: 100%;
  overflow: hidden;
}
</style>

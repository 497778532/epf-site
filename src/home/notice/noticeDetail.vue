<template>
  <div class="noticeDetail">
    <div class="area">
      <!-- <epf-nav></epf-nav> -->
      <div class="detail"
           v-loading="loading">
        <div class="notice-title">
          <div class="h1"
               v-html="data.name"></div>
          <div class="description">
            <div class="display align description-child">
              <span class="from">信息来源： {{data.source}} </span>
              <span class="date">发布时间： {{data.publish_time}}</span>
              <span class="read">阅读量：{{data.read_count}}</span>

              <span class="print display align color"
                    v-if="!isPdf">
                <!-- <section ref="print">
                  打印内容
                  <div class="no-print">不要打印我</div>
                </section> -->
                <img src="@/assets/image/home/print.png"
                     alt="打印">
                <span @click="doPrint()"
                      style="cursor:pointer">【打印】</span>
              </span>
            </div>

          </div>
        </div>
        <div class="notice-content"
             v-if="!isPdf">

          <div v-html="data.clob_lob_content"
               id="printTest">

          </div>
          <div></div>
          <div class="display align"
               style="margin-top:30px"
               v-if="files.length">
            <div style="width:60px">
              附件
            </div>
            <div>
              <div v-for="(file,index) in files"
                   :key="index">
                <span class="fileName"
                      @click="down(file)">
                  {{file.file_name}}
                </span>

              </div>

            </div>

          </div>

        </div>
        <div v-if="href"
             style="padding:0 21px">
          <!-- <a :href="item.url">{{item.url}}</a> -->
          <span @click="jump(data.url)"
                class="href">{{data.url}}</span>
        </div>
        <div class="pdf-content"
             v-if="isPdf"
             style="height:600px">
          <pdf :id="data.pdf_blob_id"></pdf>
        </div>
        <iframe id="preview"
                width="0"
                height="0"
                frameborder="0"
                framespacing="0"
                border="0">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>

import pdf from '../login/pdf'
export default {
  name: 'noticeDetail',
  data () {
    return {
      loading: false,
      data: {
        title: '揭阳市城市轨道交通3号线四期等5个项目勘察文件专项审查和施工图审查',

      },
      files: [],
      isPdf: false
    }
  },
  components: {
    pdf
  },
  methods: {
    jump (url) {
      window.open(url)
    },
    doPrint () {
      var doc = document.getElementById("preview").contentDocument || document.frames["printTest"].document;
      doc.body.innerHTML = document.querySelector('#printTest').innerHTML
      document.getElementById('preview').contentWindow.print()
    },
    addReadCount (id) {

      this.$post(
        '/ords/epfcms/cmsItem/addReadCount',
        { itemId: id }
      ).then(res => {


      })
    },
    getData (id) {
      this.loading = true
      this.$get(
        '/ords/epfcms/cmsItem/queryCmsItemDetails/' + id,
        {}
      ).then(res => {
        this.data = res.items[0]
        if (this.data.item_type === 3) {
          this.isPdf = true
        } else if (this.data.item_type === 1) {
          this.href = true
        }


        if (res.items.length) {
          this.getFile(res.items[0].id)
        }
        this.loading = false

      })
    },
    down (item) {
      let reg = /.pdf$/

      if (reg.test(item.file_name)) {
        this.$router.push(
          {
            path: '/pdf',
            query: {
              documentId: item.id
            }
          })
        return
      }



      window.open('/api/ords/epfcms/file/download/' + item.id)
    },
    getFile (id) {
      this.$get(
        '/ords/epfcms/file/queryCmsItemFileList/cms_item/' + id,
        {}
      ).then(res => {

        this.files = res.items
        this.loading = false
      })
    },

  },
  created () {

    const id = this.$route.query.id

    this.addReadCount(id)
    this.getData(id)
    this.$store.commit('add_tabs', { path: '/noticeDetail', query: this.$route.query })
  },
  mounted () {
    window.setTimeout(function () {

      let img = document.getElementById('printTest').querySelectorAll('img')
      for (var i = 0; i < img.length; i++) {
        img[i].style.maxWidth = "100%"
      }
    }, 200)
    // this.$nextTick(() => {
    //   console.log(document.querySelectorAll('img'))
    // })
    // let img = document.querySelectorAll('img')
    // console.log(img)


  }
}
</script>

<style scoped>
.detail {
  min-height: 600px;
  border: 1px solid rgba(229, 229, 229, 1);
  margin-bottom: 20px;
}
.h1 {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  line-height: 56px;
}
.description {
  padding: 0 21px;
}
.description-child {
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  color: #666666;
}
.print {
  margin-left: auto;
}
.date {
  margin: 0 40px;
}
.notice-content {
  padding: 20px;
}
.fileName {
  color: #3854b8;
  cursor: pointer;
}
.href:hover {
  color: #3854b8;
  cursor: pointer;
}
</style>
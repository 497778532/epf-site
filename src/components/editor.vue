<template>
  <div class="hello">
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  class="quill-editor">
    </quill-editor>
    <el-upload action="/api/epf-document/document/upload"
               name="files"
               :show-file-list="false"
               :headers="headers"
               :on-success="success"
               :before-upload="beforeUpload"
               :on-remove="handleRemove"
               v-show="false"
               ref="upload">
      <i class="el-icon-plus"
         ref="upload-button"
         id="upload-button">图片上传</i>
    </el-upload>
  </div>
</template>

<script>

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]

export default {
  name: 'HelloWorld',

  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,  // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('#upload-button').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      headers: {
        token: '6fa8683c394f4091aca8a7772a323282'
      },
      res:    
    }
  },
  created () {

  },
  components: {

  },
  methods: {
    success (res) {
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      let url = '/api/epf-document/document/downloadById?id=' + res.data[0].id
      quill.insertEmbed(length, 'image', url);
      quill.setSelection(length + 1)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.warning('上传头像图片只能是 JPG Or PNG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.warning('上传头像图片大小不能超过 2MB!');
        return false
      }

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  height: 700px;
}
.quill-editor {
  height: 100%;
}
</style>
<style>
</style>
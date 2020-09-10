<template>
  <div class="answer">
    <div class="answer-one"
         v-for="(item,index) in data"
         :key="index">
      <div class="q">
        <div class="icon red">问</div>
        <div class="q-title">{{item.inquiry_consult}}</div>
        <div v-for="(file,fileIndex) in data.files"
             :key="fileIndex"
             class="q-file">{{file.name}}</div>

        <div class="q-info">
          <span>{{item.inquiry_owner_name}}</span>

          <span>发布于 {{item.inquiry_consult_time}}</span>
        </div>
      </div>
      <div class="a">
        <div class="icon green">答</div>
        <div class="a-contain">
          <div class="a-oneTr">
            <span>{{item.answer_owner_name}}</span>

            <span>回复于 {{item.answer_consult_time}}</span>
          </div>
          <div class="a-twoTr">{{item.answer_consult}}</div>
        </div>
      </div>

    </div>
    <div class="page display"
         style="padding-right:10px">
      <epf-page :pre="pre"
                :next="next"
                @pre-click="prevClick"
                @next-click="nextClick"
                :url="url"></epf-page>
    </div>
    <div v-if="!data.length"
         class="noData display align justify">
      <div style="text-align:center">

        <img src="@/assets/image/home/noData.png"
             alt="">
        <div class="noData-text">暂无数据</div>

      </div>
    </div>
    <div class="img-contain"
         @click="want()">
      <img src="@/assets/image/home/question.png"
           alt />
    </div>

    <el-dialog :visible.sync="dialogVisible"
               :show-close="false"
               width="35%">
      <template slot="title">
        <div class="dialog-title display align">
          <span class="title-text">我要投诉</span>
          <span class="el-icon-circle-close title-icon"
                @click="dialogVisible = false"></span>
        </div>
      </template>
      <div class="form-contain">
        <el-form ref="ownerForm"
                 :model="form"
                 label-width="100px"
                 :rules="formrules">
          <el-form-item label="联系人"
                        prop="ownerName">
            <el-input v-model="form.ownerName"
                      placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        prop="ownerTel">
            <el-input v-model="form.ownerTel"
                      placeholder="请输入常用座机号，便于联系"></el-input>
          </el-form-item>
          <el-form-item label="手机号码"
                        prop="ownerMobile">
            <el-input v-model="form.ownerMobile"
                      placeholder="请输入准确的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="短信验证码"
                        class="code-contain"
                        prop="code">
            <el-input v-model="form.code"
                      placeholder="请输入验证码"></el-input>

            <div class="code">
              获取验证码
            </div>
          </el-form-item>
          <el-form-item label="身份证号"
                        prop="ownerIdno">
            <el-input v-model="form.ownerIdno"
                      placeholder="请输入准确的身份证号"></el-input>
          </el-form-item>

          <el-form-item label="投诉内容"
                        prop="consult">
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请完整的表述问题"
                      v-model="form.consult"></el-input>
          </el-form-item>

          <!-- <el-form-item label="附件">
            <el-upload class="upload-demo"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :before-remove="beforeRemove"
                       multiple
                       :limit="3">
              <div class="upload">选择附件</div>
              <span slot="tip"
                    class="load-tip">(文件不得超过2M,支持.doc,pdf,.jpg)</span>
            </el-upload>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer"
            class="footer display justify"
            style="text-align:center">
        <div class="button cancel"
             @click="dialogVisible = false">取消</div>
        <div class="button enter"
             @click="submitRules">确定</div>
      </span>
      <!--  -->
    </el-dialog>
  </div>
</template>

<script>

let checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  if (!value) {
    return callback(new Error('手机号码不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
  }, 100)
}

let checkOwnerIdno = (rule, value, callback) => {
  const ownerIdno = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (!value) {
    return callback(new Error('身份证号码不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (ownerIdno.test(value)) {
        callback()
      } else {
        callback(new Error('身份证号码格式不正确'))
      }
    }
  }, 100)
}
export default {
  data () {
    return {
      dialogVisible: false,
      data: [],
      form: {
        ownerName: "",
        ownerMobile: "",
        ownerIdno: "",
        consultTime: "",
        consult: "",
        consultBusiness: '',
        code: '',
        ownerTel: '',

      },
      pre: "",
      next: "",
      url: "/ords/epfcms/consult/queryConsultByQA/1",
      dic: "/ords/epfcms/param/queryParamAllByNo/consultBusinessConfig",
      params: {
        // consultType: 0
      },
      business: [],
      formrules: {

        ownerName: [
          {
            required: true,
            message: '请输入真实的姓名',
            trigger: 'blur',
          },
        ],
        ownerMobile: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur',


          },
          { validator: checkPhone, trigger: 'blur' },
        ],
        ownerIdno: [
          {
            required: true,
            message: '请输入准确的身份证号',
            trigger: 'blur'
          },
          { validator: checkOwnerIdno, trigger: 'blur' },
        ],

        consult: [
          {
            required: true,
            message: '请完整的表述问题',
            trigger: 'blur',
          },
        ],
        consultTime: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],

        code: [
          {
            required: true,
            message: '请输入短信验证码',
            trigger: 'blur',
          },
        ],
        consultBusiness: [
          {
            required: true,
            message: '请选择业务模块',
            trigger: 'change',
          },
        ],

      },

    };
  },
  created () {
    this.getDic()
    this.answerQuery(this.url);
  },
  methods: {
    getDic () {
      this.$get(this.dic, {}).then((res) => {
        this.business = res[0]
      });
    },
    want () {
      this.dialogVisible = true;
    },
    submitRules () {

      this.form['allowPublish'] = '1'
      this.form['consultType'] = '1'
      this.submit();
    },
    submit () {
      this.$refs.ownerForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$axios
            .post("/api/ords/epfcms/consult/addConsult", this.form)
            .then((res) => {
              if (res.status !== 200) {
                return;
              }
              this.$message.success('提交成功')
              this.form = this.$options.data().form
            });
        } else {

          return false;
        }
      });

    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove () { },
    answerQuery (url) {
      this.$get(url, this.params).then((res) => {
        this.data = res.items;
        this.pre = res.prev ? res.prev.$ref : "";
        this.next = res.next ? res.next.$ref : "";
      });
    },
    prevClick (val) {
      this.answerQuery(val);
    },
    nextClick (val) {
      this.answerQuery(val);
    },
  },
};
</script>

<style scoped>
.answer {
  position: relative;
  min-height: 500px;
}
.answer-one {
  margin-bottom: 20px;
}
.code {
  display: inline-block;
  width: 90px;
  height: 32px;
  background: #f7b751;
  text-align: center;
  line-height: 32px;
  margin-left: 10px;
  color: #ffffff;
  cursor: pointer;
}
.a,
.q {
  position: relative;
  padding: 0 9px 0 36px;
  line-height: 24px;
  margin-top: 5px;
}
.icon {
  width: 30px;
  height: 24px;
  line-height: 24px;
  border-radius: 0px 12px 12px 0px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  position: absolute;
  left: 0;
}
.red {
  background: rgba(253, 85, 85, 1);
  top: 0;
}
.green {
  background: #1de05d;
  top: 5px;
}

.q-title {
  font-size: 16px;
  line-height: 24px;

  color: #000000;
}
.q-file {
  color: #3854b8;
}

.q-info {
  font-size: 12px;
  color: #666;
}

.q-info > span:nth-child(2) {
  margin-left: 20px;
}
.a-contain {
  width: 958px;

  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  padding: 0 9px;
}

.a-oneTr {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #e5e5e5;
}
.a-oneTr {
  color: #999999;
  font-size: 12px;
}

.a-oneTr > span:nth-child(2) {
  margin-left: 20px;
}

.a-twoTr {
  margin-top: 10px;
  color: #000000;
  line-height: 25px;
}
.img-contain {
  position: fixed;
  right: 5%;
  top: 250px;
  cursor: pointer;
}
.dialog-title {
  height: 44px;
  justify-content: space-between;
  padding: 0 13px;
  border-bottom: 1px solid #e5e5e5;
}
.title-text {
  font-size: 16px;
  font-weight: 700;
  color: #343434;
}
.title-icon {
  font-size: 20px;
  color: #9a9a9a;
}
.form-contain {
  padding: 14px 36px 0 36px;
}
.upload {
  width: 100px;
  height: 32px;
  background: rgba(247, 249, 255, 1);
  border: 1px solid rgba(125, 151, 243, 1);
  text-align: center;
  line-height: 32px;
  color: #3854b8;
  cursor: pointer;
}
.load-tip {
  color: rgba(255, 0, 0, 1);
  margin-left: 10px;
}
.button {
  width: 80px;
  height: 32px;
  margin: 0 5px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}

.cancel {
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 4px;
  color: #9a9a9a;
}
.enter {
  color: rgba(255, 255, 255, 1);
  background: rgba(56, 84, 184, 1);
}
.footer {
  margin-bottom: 20px;
}
.noData {
  height: 500px;
}
.noData-text {
  color: #999;
  margin-top: 10px;
}
</style>

<style>
.answer .el-form-item {
  margin-bottom: 11px;
}

.answer .el-form-item__label {
  color: #666666;
}

.answer .el-input,
.answer .el-select {
  width: 100%;
}
.page {
  margin: 20px 0;
  justify-content: flex-end;
}
.answer .code-contain .el-input {
  width: 120px;
}

.answer .el-form-item__error {
  padding-top: 0;
}
</style>
<template>
  <div class="aboutMe">
    <div class="area display">
      <div class="my-info">
        <div class="title">关于我们</div>
        <div>
          <p>揭阳市公共资源交易中心为揭阳市人民政府综合政务服务管理办公室（加挂揭阳市公共资源交易管理办公室牌子）管理的公益一类事业单位，不定级别。由原揭阳市土地与矿业交易中心、揭阳市建设工程交易中心、市政府采购中心和普宁市、揭东区、揭西县、惠来县公共资源交易中心整合而成。中心核定事业编制90名，其中主任1名（副处级）、副主任7名（正科级、兼任各部部长）；内设机构正副部长14名（部长7名，由副主任兼任；副部长7名，副科级）。下设普宁、揭东、揭西、惠来4个分中心，作为分支机构，副科级建制，隶属揭阳市公共资源交易中心垂直管理。</p>
          <p>一、主要任务</p>
          <p>（一）根据国家、省、市有关法律、法规和政策，制定公共资源进场交易各项业务操作规程，建立和完善内部管理制度。</p>
          <p>（二）负责管理全市公共资源交易业务工作。</p>
          <p>（三）负责全市公共资源交易平台、专家库、公共资源数据系统的建设、维护和管理工作。</p>
          <p>（四）为各类公共资源交易活动提供规范的场所、设施和服务。</p>
          <p>（五）依法开展政府采购、土地使用权和矿业权交易、建设工程招投标交易、产权交易等业务活动；维护公共资源交易中心的交易秩序。</p>
          <p>（六）检验市场主体、中介机构资格及进场交易项目资料。</p>
          <p>（七）为公共资源交易主体提供信息咨询服务；为公共资源交易行政监督工作提供监管平台，及时向有关部门报告并协助调查违法违规交易行为。</p>
          <p>（八）依法成立项目评审委员会，并按照规程组织项目评审、公开发布评审结果。</p>
          <p>（九）建立公共资源现场交易信用和纪律档案；收集、存储和发布公共资源交易信息；见证公共资源进场交易全过程，确认交易结果；整理、保存交易过程中的相关资料备查。</p>
          <p>（十）组织协调有关部门对全市公共资源交易活动进行监管，协助处理公共资源交易投诉。</p>
          <p>（十一）承办上级部门交办的其他各项任务。</p>
          <p>（十二）组织协调有关部门对全市公共资源交易活动进行监管，协助处理公共资源交易投诉。</p>
          <p>（十三）承办上级部门交办的其他各项任务。</p>
        </div>
      </div>
      <div class="my-phone">
        <div class="title">
          揭阳市公共资源电子交易平台
        </div>
        <div>
          <span>地址:</span>
          <span>揭阳市政务服务中心6-7楼</span>
        </div>

        <div v-for="(item,index) in data.children"
             :key="index">
          <span>{{item.name}}：</span>
          <span>{{item.value}}</span>
        </div>
        <!-- 
        <div>
          <span>综合部：</span>
          <span>0663-1234567</span>
        </div>
        <div>
          <span>财务部：</span>
          <span>0663-1234567</span>
        </div>
        <div>
          <span>信息部：</span>
          <span>0663-1234567</span>
        </div>
        <div>
          <span>政府采购部：</span>
          <span>0663-1234567</span>
        </div>
        <div>
          <span>建设工程部：</span>
          <span>0663-1234567</span>
        </div>
        <div>
          <span>国有产权部：</span>
          <span>0663-1234567</span>
        </div>
        <div>
          <span>土地及矿业权部：</span>
          <span>0663-1234567</span>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  methods: {
    getData (type) {

      this.$get(
        '/ords/epfcms/param/queryParamAllByNo/' + type,
        {}
      ).then(res => {
        if (!res) {
          return
        }
        this.data = res[0]

      })
    },
  },
  created () {
    this.getData('contactCenterTelConfig')
  }
}
</script>

<style scoped>
.aboutMe {
  margin: 20px 0;
  color: #656565;
}
.my-info {
  width: 800px;
  height: 630px;
  border: 1px solid rgba(229, 229, 229, 1);
  padding: 19px;
  line-height: 26px;
}
.my-phone {
  width: 380px;
  height: 630px;
  border: 1px solid rgba(229, 229, 229, 1);
  margin-left: 20px;
  padding: 19px;
  line-height: 35px;
}
.title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #333;
}
</style>
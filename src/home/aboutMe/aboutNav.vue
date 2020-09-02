<template>
  <div class="aboutNav">
    <div class="area">
      <div v-for="(item,index) in tree"
           :key="index">
        <div class="one-step">

          <span class="one-step-name">{{item.name}} </span></div>
        <div class="two-step">
          <span v-for="(child,childIndex) in item.children"
                :key="childIndex"
                @click="jump(child)">
            {{child.query.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tree: [
        {
          path: '/notice',
          name: '政策法规',
          id: '',
          index: '1',
          children: [
            { path: '/notice', query: { index: 1, id: '007002', name: '政府采购' } },
            { path: '/notice', query: { index: 1, id: '007003', name: '建设工程' } },
            { path: '/notice', query: { index: 1, id: '007004', name: '土地及矿业权' } },
            { path: '/notice', query: { index: 1, id: '007005', name: '国有产权' } }]
        },

        {
          path: '/notice',
          name: '政务公开',
          id: '',
          index: '2',
          children: [
            { path: '/notice', query: { index: 2, id: '002001', name: '中心简介' } },
            { path: '/notice', query: { index: 2, id: '002003', name: '机构设置' } },
            { path: '/notice', query: { index: 2, id: '002005', name: '规章制度' } },
            { path: '/notice', query: { index: 2, id: '002008', name: '预决算公开' } }]
        },

        {
          path: '/notice',
          name: '资料下载',
          id: '',
          children: [
            { path: '/notice', query: { index: 3, id: '007002', name: '政府采购' } },
            { path: '/notice', query: { index: 3, id: '007003', name: '建设工程' } },
            { path: '/notice', query: { index: 3, id: '007004', name: '土地及矿业权' } },
            { path: '/notice', query: { index: 3, id: '007005', name: '国有产权' } },

            { path: '/notice', query: { index: 3, id: '008005', name: '数字证书' } },
            // { path: '/notice', query: { index: 3, id: '008006', name: '中介服务超市' } }
          ]
        },

        {
          path: 'http://xywz.jieyang.gd.cn/',
          name: '诚信体系',
          id: '',
          children: []

        },
        {
          path: '/notice',
          name: '操作手册',
          id: '',
          children: []

        },



      ]
    }
  },
  created () {
    // this.$router.push(
    //   '/government?no=' + this.data.children[0].no + '&id=' + this.data.id)
    let arr = ['ZFCG', 'JSGC', 'TDJKY', 'GYCQ']

    for (let i = 0; i < arr.length; i++) {
      let data = JSON.parse(window.sessionStorage.getItem(arr[i]))
      for (let i = 0; i < data.children.length; i++) {
        let temp = data.children[i]
        temp['path'] = '/government?logo=003001'
        temp['query'] = {
          id: temp.id,
          no: temp.no,
          name: temp.name
        }
      }
      this.tree.push(data)
    }

    // this.tree.push(JSON.parse(window.sessionStorage.getItem('ZFCG')))
    // this.tree.push(JSON.parse(window.sessionStorage.getItem('JSGC')))

    // this.tree.push(JSON.parse(window.sessionStorage.getItem('TDJKY')))
    // this.tree.push(JSON.parse(window.sessionStorage.getItem('GYCQ')))

  },
  methods: {
    jump (child) {
      console.log(child)
      this.$router.push({ path: child.path, query: child.query })
    }
  }
}
</script>

<style scoped>
.aboutNav {
  min-height: 500px;
  /* line-height: 30px; */
  margin-bottom: 20px;
}
.one-step {
  font-size: 16px;
  font-weight: bold;
  color: rgba(56, 84, 184, 1);
  border-bottom: 1px solid #e5e5e5;
}

.one-step-name {
  border-bottom: 3px solid #3854b8;
  display: inline-block;
  height: 100%;
  margin-top: 20px;
  cursor: pointer;
}

.two-step {
  margin-top: 10px;
  color: #343434;
}
.two-step span {
  width: 100px;
  display: inline-block;
  text-align: left;
  margin-right: 100px;
  cursor: pointer;
}
.two-step span:hover {
  color: #3854b8;
}
</style>
<template>
  <div class="card">
    <div class="fixed-contain">
      <div class="one display align justify"
           v-for="(item,index) in data"
           :key="index">
        <div style="text-aling:center">
          <div class="display justify">
            <img :src="item.url"
                 alt="">
          </div>
          <div class="fix-text ">
            {{item.name}}
          </div>
        </div>
        <div class="hover-one none  display align">
          <div style="width:100%"
               v-if="item.all">
            <template v-for="(item2,index2) in item.all">
              <p style="text-align:left"
                 :key="index2">{{item2.lvalue}}</p>
              <p style="text-align:left;margin-top:5px"
                 :key="index2">{{item2.mvalue}}</p>

            </template>

          </div>

          <div style="width:100%"
               v-else>
            <p style="text-align:left">{{item.children.lvalue}}</p>
            <p style="text-align:left;margin-top:5px">{{item.children.mvalue}}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!-- <div class="card">
    <div class="appeal"
         v-if="$store.state.card.appeal">

      <div class="appeal-head display align">
        <span>
          {{data[0].lvalue}}
        </span>
        <span @click="close('appeal')">
          <img src="@/assets/image/home/close2.png"
               alt="">
        </span>
      </div>

      <div class="appeal-contain">
        <div v-for="(item,index) in data[0].child"
             :key="index">
          <span>{{item.lvalue}}</span>
          <span>{{item.mvalue}}</span>
        </div>

      </div>

    </div>
    <div class="tender"
         v-if="$store.state.card.tender">
      <div class="appeal-head display align">
        <span>
          {{data[1].lvalue}}
        </span>
        <span @click="close('tender')">
          <img src="@/assets/image/home/close2.png"
               alt="">
        </span>
      </div>

      <div class="tender-contain">
        <div style="color:#343434"
             v-for="(item,index) in data[1].child"
             :key="index">
          <span class="img"
                v-if="/@/.test(item.mvalue)"><img src="@/assets/image/home/email.png"
                 alt=""></span>
          {{item.mvalue}}
        </div>

      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  data () {
    return {
      myTender: true,
      appeal: true,
      data: [
        { name: '举报电话', url: require('@/assets/image/home/fix0.png'), no: 'rightInfo1-01', },
        { name: '电子邮箱', url: require('@/assets/image/home/fix1.png'), no: 'rightInfo1-02', },
        { name: '通讯地址', url: require('@/assets/image/home/fix2.png'), no: 'rightInfo1-03' },
        { name: '邮政编码', url: require('@/assets/image/home/fix3.png'), no: 'rightInfo1-04' },
        { name: '投诉邮箱', url: require('@/assets/image/home/fix4.png'), no: 'rightInfo2', all: [] }]

    }
  },
  methods: {
    close (key) {
      this.$store.commit('close_card', key)
    },
    getData () {
      this.$get(
        '/ords/epfcms/param/queryParamRightInfo',
        {}
      ).then(res => {
        let arr = res.items;
        for (var i = 0; i < this.data.length; i++) {
          let temp = this.data[i]
          for (var j = 0; j < arr.length; j++) {
            let item = arr[j]

            if (temp.no === 'rightInfo2' && eval(`/${temp.no}/`).test(item.no)) {
              temp.all.push(item)
            } else {
              if (temp.no === item.no) {
                this.$set(temp, 'children', item)
              }
            }

          }
        }
        console.log(this.data)
        // let arr = []


        // for (var j = 0; j < arr.length; j++) {

        //   let item = arr[j]
        //   item.child = []
        //   for (var k = 0; k < data.length; k++) {
        //     if (eval(`/${item.id}/`).test(data[k].id) && item.id !== data[k].id) {
        //       item.child.push(data[k])
        //     }
        //   }

        // }
        // this.data = arr

      })
    }

  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.card {
  position: absolute;

  top: 22px;
  right: 0;
}
.one {
  width: 70px;
  height: 70px;
  cursor: pointer;
  background: #ffffff;
  border-left: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
  box-shadow: 1px 2px 5px 0px rgba(216, 212, 212, 0.59);
  position: relative;
}

.one:hover .hover-one {
  visibility: visible;
}
.one:last-child {
  border-bottom: 1px solid #eaeaea;
}
.fix-text {
  margin-top: 10px;
  color: #474747;
}
.none {
  visibility: hidden;
}
.hover-one {
  width: 152px;
  min-height: 70px;
  background: #fff;
  box-shadow: 1px 3px 7px 1px rgba(184, 218, 254, 0.7);
  border-radius: 4px;
  position: absolute;
  left: -160px;
  top: 0;
  padding: 10px 7px;
  text-align: center;
  font-size: 12px;

  color: #666666;
}

.hover-one::after {
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-left: 12px solid #fff;
  border-bottom: 7px solid transparent;
  content: "";
  position: absolute;
  right: -7px;
  top: 50%;
  margin-top: -6px;
}
</style>
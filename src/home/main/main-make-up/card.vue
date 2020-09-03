<template>
  <div class="card">
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
        <!-- <div>
          <span>举报电话</span>
          <span>0663-8339608</span>
        </div>
        <div>
          <span>电子邮箱</span>
          <span>jysjw3z@163.com</span>
        </div>
        <div>
          <span>通讯地址</span>
          <span> 揭阳市临江北路市委大院市纪委第三派驻纪检组</span>
        </div>

        <div>
          <span>邮政编码</span>
          <span>522010</span>
        </div> -->
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      myTender: true,
      appeal: true,
      data: []

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
        let data = res.items;
        let arr = []
        for (var i = 0; i < data.length; i++) {
          let temp = data[i]
          if (!temp.parent_id) {
            arr.push(temp)
          }
        }

        for (var j = 0; j < arr.length; j++) {

          let item = arr[j]
          item.child = []
          for (var k = 0; k < data.length; k++) {
            if (eval(`/${item.id}/`).test(data[k].id) && item.id !== data[k].id) {
              item.child.push(data[k])
            }
          }

        }
        this.data = arr

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
.appeal {
  width: 220px;
  height: 260px;
}
.appeal-head {
  height: 40px;
  justify-content: space-between;
  padding: 0 14px;
  background: rgba(61, 161, 237, 1);
  color: #fff;
  border-radius: 4px 4px 0px 0px;
}
.appeal-contain {
  background: rgba(255, 255, 255, 1);
  padding: 14px;
  border: 1px solid rgba(61, 161, 237, 1);
  border-radius: 0px 0px 4px 4px;
}
.appeal-contain > div {
  margin-top: 14px;
}
.appeal-contain > div:nth-child(1) {
  margin-top: 0;
}

.appeal-contain > div > span:nth-child(1) {
  display: inline-block;
  width: 70px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #3da1ed;
  color: #fff;
}

.appeal-contain > div > span:nth-child(2) {
  color: #000;
  margin-left: 3px;
}

.tender {
  width: 220px;
  height: 114px;
  margin-top: 30px;

  border-radius: 4px;
  color: #000;
  background-color: #fff;
  border-top: none;
}

.tender-contain {
  padding: 16px 8px;
  background: #fff;

  border: 1px solid rgba(61, 161, 237, 1);
  border-radius: 0px 0px 4px 4px;
}
.tender-contain > div:nth-child(1) > span:nth-child(2) {
  /* margin-left: 5px; */
}
.tender-contain > div:nth-child(2) {
  margin-top: 10px;
}
.email {
  /* margin-left: 10px; */
}

/* @media screen and (max-width: 1824px) {
  .card {
    right: 0;
  }
  .appeal,
  .tender {
    width: 130px;
    overflow: hidden;
    height: auto;
    font-size: 12px;
  }
  .tender-contain {
    padding: 8px 6px;
  }
  .tender-contain > div:nth-child(1) > span {
    display: block;
  }
  .tender-contain > div:nth-child(1) > span:nth-child(2) {
    margin-left: 0;
  }

  .tender-contain > div:nth-child(2) {
    margin-top: 10px;
  }
  .appeal-contain > div > span:nth-child(1) {
    display: inline;
    width: auto;
    height: auto;
    line-height: normal;
    background: #fff;
    color: #000;
  }
  .img {
    text-align: center;
    display: block;
  }
  .appeal-head {
    font-size: 12px;
  }
  .email {
    margin-left: 0;
  }
} */
</style>
import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
import pdf from '@/home/login/pdf'
import home from '@/home/index'
import main from '@/home/main/main'
import cityMap from '@/home/main/main-make-up/cityMap'
import phone from '@/home/main/main-make-up/phone'
import notice from '@/home/notice/notice'
import noticeDetail from '@/home/notice/noticeDetail'
import noticeTable from '@/home/notice/noticeTable'
import server from '@/home/notice/server'

import complaints from '@/home/notice/complaints'

import answer from '@/home/notice/answer'

import government from '@/home/government/index'

import aboutMe from '@/home/aboutMe/aboutMe'

import aboutNav from '@/home/aboutMe/aboutNav'
import callMe from '@/home/aboutMe/callMe'

import search from '@/home/search/index'
import bidOpening from '@/home/bidOpening/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/main',
      children: [
        {
          path: '/main',
          name: 'main',
          component: main
        },
        {
          path: '/cityMap',
          name: 'cityMap',
          component: cityMap
        },
        {
          path: '/phone',
          name: 'phone',
          component: phone
        },
        {
          path: '/bidOpening',
          name: 'bidOpening',
          component: bidOpening,
        },

        {
          path: '/notice',
          name: 'notice',
          component: notice,
          meta: {
            title: '文章列表'
          },
          redirect: to => {
            let index = to.query.index
            let name = to.query.name
            let url = ''
            if (index === '6') {
              switch (name) {
                case '服务指南':
                  url = '/server'
                  break;

                case '交易流程':
                  url = "/server"
                  break;
                case '业务咨询':
                  url = '/answer'

                  break;
                case '投诉举报':
                  url = '/answer'

                  break;


                default:
                  url = "/noticeTable"
                  break;
              }
            } else {
              url = '/noticeTable'
            }
            return url
          },

          children: [
            {
              path: '/noticeTable',
              name: 'noticeTable',
              component: noticeTable,
              meta: {

              },
            },
            // {
            //   path: '/complaints',
            //   name: 'complaints',
            //   component: complaints,
            // },

            {
              path: '/answer',
              name: 'answer',
              component: answer,
            },

            {
              path: '/server',
              name: 'server',
              component: server,
            },
          ]
        },
        {
          path: '/noticeDetail',
          name: 'noticeDetail',
          component: noticeDetail,
          meta: {
            title: '文章详情'
          }
        },

        {
          path: '/government',
          name: 'government',
          component: government,
          meta: {
            title: '政府采购',

          }
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/aboutMe',
          name: 'aboutMe',
          component: aboutMe
        },
        {
          path: '/aboutNav',
          name: 'aboutNav',
          component: aboutNav
        },
        {
          path: '/callMe',
          name: 'callMe',
          component: callMe
        },




      ]
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: pdf,
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import ImageRec from '@/components/ImageRec.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home // 程序的入口为登录页面
    },
    {
      path: '/imageRec',
      name: 'ImageRec',
      component: ImageRec // 图片识别页面
    }
  ]
})

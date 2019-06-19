import Vue from 'vue'
import Router from 'vue-router'
import index from './components/index.vue'
import OnlineGal from "./components/online-gal";
import Video from "./components/video.vue";
import Comic from "./components/comic.vue";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/index/zhvn'
    },
    {
      path: '/index/:type',
      component: index,
      props: true
    },
    {
      path: '/index/:type/:search',
      component: index,
      props: true
    },
    {
      path: '/olgal/:id',
      component: OnlineGal,
      props: true
    },
    {
      path: '/video/:id',
      component: Video,
      props: true
    },
    {
      path: '/comic/:id',
      component: Comic,
      props: true
    }
  ]
})
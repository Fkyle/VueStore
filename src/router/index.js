import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Home = () => import("views/home/Home")
const Fenlei = () => import('views/fenlei/Fenlei')
const Me = () => import('views/me/Me')
const Shop = () => import('views/shop/Shop')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  component: Home,
  meta: {
    title: '首页'
  }
}, {
  path: '/fenlei',
  component: Fenlei,
  meta: {
    title: '分类'
    //因为beforeEach中的to是一个route类型==>就是这里的一个个路由
  }
}, {
  path: '/me',
  component: Me,
  meta: {
    title: '用户'
  },
  beforeEnter: (to, from, next) => {
    console.log('你进入了我的首页')
    next()
  }
}, {
  path: '/shop',
  component: Shop,
  meta: {
    title: '商城'
  },
}, {
  path: '/detail',
  component: Detail,
}, ]
const router = new VueRouter({
  routes,
  mode: 'history'
})
//前置守卫
router.beforeEach((to, from, next) => {
  //从from跳转到to
  // console.log(to);
  document.title = to.matched[0].meta.title  //修改网页标题
  //next必须调用
  next()
})
//后置钩子
router.afterEach((to, from) => {
  // console.log('跳转之后的操作');
})
export default router
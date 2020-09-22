import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("../views/Home.vue")
const Register = () => import("../views/Register.vue")
const Login = () => import("../views/Login.vue")
const Userinfo = () => import("../views/Userinfo.vue")
const Edit = () => import("../views/Edit.vue")
const Article = () => import("../views/Article.vue")
const EditCategory = () => import("../views/EditCategory.vue")

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "home",
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: Userinfo,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article,
  },
  {
    path: '/edit-category',
    name: 'edit-category',
    component: EditCategory,
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if ((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.requiredAuth) {
    // 如果用户没有登录，要跳转的页面需要权限，就强制跳转到登录页面
    router.push('/login')
    return
  }
  // 否则，放行
  next()
})


export default router
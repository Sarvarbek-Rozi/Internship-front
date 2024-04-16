import Vue from 'vue'
import VueRouter from 'vue-router'
import applicationsRouter from "@/router/modules/application";
import citizensRouter from "@/router/modules/citizen"
import doctorsRouter from "@/router/modules/doctor";
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/main'),
    children:[
      {
        path:'/',
        name:'ChooseType',
        component:()=>import('@/views/choose-type.vue')
      },
      {
        path:'/login',
        name:'Login',
        component:()=>import('@/views/Login.vue')
      },
      {
        name: 'ApplicationCheckYouth',
        path: '/application-check-youth',
        component: () => import('@/views/application-check')
      },
      {
        name: 'ApplicationsCreate',
        path: 'applications/create/',
        component: () => import('@/views/application/create/index'),
      },
    ]
  },


  {
    path: '/',
    component: () => import('@/layouts/main'),
    children: [
      ...applicationsRouter,
      ...citizensRouter,
      ...doctorsRouter
    ]
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

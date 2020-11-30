import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/components/Layout.vue"

Vue.use(VueRouter);

const routes = [
  // 登录
  {
    path: "/",
    redirect:'/login',
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/layout",
    name: "Layout",
    component: ()=> import ('@/components/Layout'),
    redirect:'/homepage',
    children:[
      // 首页
      {
        path:'/homepage',
        name:'homepage',
        component:()=> import('@/views/homepage'),
        meta:{title:'首页'}
      },


    ],
    
  },
  // 广告管理
  {
    path:'/advert',
    component:Layout,
    children:[
      {
        path:'index',
        name:'advert',
        component:()=>import('@/views/advert/index'),
        meta:{titlt:'广告管理'}
      },     

    ],
  },
  
  // 博客管理
  {
    path:'/blog',
    component:Layout,
    redirect: '/blog/article',
    name:'blog',
    meta:{title:"博客管理"},
    children:[
      {
        path:"/blog/article",
        // name:'article',
        component:()=>import('@/views/blog/article')
      },
      {
        path:"lable",
        name:'lable',
        component:()=>import('@/views/blog/lable')
      },
      {
        path:"sort",
        name:'sort',
        component:()=>import('@/views/blog/sort')
      },          

    ]
  },
  // 系统管理
  {
    path:'/system',
    component:Layout,
    redirect: '/system/user',
    name:'system',
    meta:{title:"系统管理"},
    children:[
      {
        path:'user',
        name:'user',
        component:()=>import('@/views/system/user'),
        meta:{title:'用户管理'}
      },
      {
        path:'role',
        name:'role',
        component:()=>import('@/views/system/role'),
        meta:{title:'用户管理'}
      },
      {
        path:'menu',
        name:'menu',
        component:()=>import('@/views/system/menu'),
        meta:{title:'用户管理'}
      },

    ]
  },
    // 跳转外网
  {
    path: '/mengxuegu',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '梦学谷官网', icon: 'el-icon-link' }
      }
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;

import Vue from 'vue' // 导入Vue
import Router from 'vue-router' // 导入vue-router 库
import Layouts from '@/components/layouts'
import {Todos} from "@/mock/data/todoList"; // 导入layouts.vue 组件
Vue.use(Router) //全局注册Router组件，它会绑定到Vue实例里面。
export default new Router({ // 创建 router 实例，然后传 `routes` 配置
  routes: [
    {
      path: '/',  //访问路径
      name: 'Layouts', // 路径名
      component: Layouts, //访问的组件,即访问‘/’,它会加载 Layouts 组件所有的内容。
      children: [{
        path: '/todo/:id',
        name: 'todo',
        component: Todos
      }]
    }
  ]
})

// vue-router的作用在于路由设置，用于设置页面跳转时的路径设置
// 它的工作原理也很简单，将组件(components)映射到路由(routes)，然后告诉vue-router在哪里渲染它们

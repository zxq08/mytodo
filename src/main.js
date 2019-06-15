import Vue from 'vue'             //引入vue模块
import App from './App'           //引入vue组件
import router from './router'     //引入路由配置文件
import Mock from './mock'         //引入mock模块
import store from './vuex/store'         //引入vuex实例
Mock.start();

Vue.config.productionTip = false  //关闭生产模式下给出的提示

/* eslint-disable no-new */
new Vue({                         //创建一个vue根实例
  el: '#app',                     //挂载id，这个实例下所有的内容都会在index.html  一个id为app的div下显示
  router,                         //注入路由配置
  store,                          //注入
  /*template: '<App/>',
  components: {
    App  //
  }*/
  render: h => h(App)             //0528-zxq,render函数是渲染一个视图，然后提供给el挂载
})

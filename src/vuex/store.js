import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);  //安装 Vuex 插件

const state = {
  todoList: [],     //指我们的待办事项列表数据
  menuOpen: false   //移动端的时候菜单是否开启
};

const mutations = {
  EDITTODE(state,data){ //定义名为EDITTODE的函数，用作改变todoList的值
    state.todoList = data;
  },
  MENUOPEN(state){     //定义名为MENUOPEN的函数，用作改变menuOpen的值
    state.menuOpen = !state.menuOpen;
  }
};

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});


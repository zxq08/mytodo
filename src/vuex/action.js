import {
  getTodoList
} from '../api/api.js';
//引入api接口函数getTodoList,请求最新的待办事项数据

export const getTodo = ({ //定义一个名为getTodo的事件
  commit
}) => {
  return new Promise((resolve) => {
    /**
     *调用 getTodo 这个函数时
     * 会调用 getTodoList 这个Ajax请求函数
     * 函数返回值后，再调用 store.js 里面的 EDITTODE 方法，并传值给它
     */
    getTodoList().then(res => {
      commit('EDITTODE',res.data.todos);
      resolve();
    });
  });
};

export const updateMenu = ({  //定义一个名字为updateMenu的事件
  commit
}) => {
  commit('MENUOPEN');         // 调用store.js里面的MENUOPEN方法
};



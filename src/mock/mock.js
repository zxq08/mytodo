import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
  Todos
} from './data/todoList';   //导入Todos数据
export default {
  /**
   * mock start
   */
  start() {
    let mock = new MockAdapter(axios);
    //获取todo列表
    mock.onGet('/todo/list').reply(config => {  //config 指 前台传过来的值
      let mockTodo = Todos.map(todo => {        //重组 Todos数组，变成我们想要的数据
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter((data) => {
            if(data.checked === false) return true;
            return false;
          }).length,          //过滤掉 record里面'checked'为true的数据，因为已经完成
          locked: todo.locked,
          isDelete: todo.isDelete
        };      
	}).filter(todo => {     //过滤掉 isDelete为true的数据，因为已经删除
	        if (todo.isDelete === true)return false;
        return true;
      });
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve([200,{
            todos:mockTodo   //返回状态为200，并且返回 todos 数据
          }]);
        },200);
      });
    });

    //新增一条 todo
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        },200);
      });
    });

    //获取 todo 单个列表
    mock.onGet('/todo/listId').reply(config => {
      let {
        id
      } = config.params;
      //id是传进来的值
      //todo是根据id和现有的Todos数据匹配，找出并返回id相等的数据
      let todo = Todos.find(todo => {
        return id && todo.id === id;
      });
      //todo.count 待完成数目 等于 todo.record 待办事项列表中未被选择的数据
      todo ? todo.count = todo ? todo.record.filter((data) => {
        return data.checked === false;
      }).length :null : false;
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve([200,{
            todo: todo
          }]);
        },200);
      });
    });

    //新增一条待办单项
    mock.onPost('/todo/addRecord').reply(config => {
      let{
        id,
        text
      } = JSON.parse(config.data);
      // id 是传进来的值唯一待办的id
      // text 是新增内容
      Todos.some((t,index) => {
        if(t.id === id){
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          });
          return true;
        }
      });
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve([200]);
        },200);
      });
    });

    // 修改标题
    mock.onPost('/todo/editTodo').reply(config => {
      let {
        todo
      } = JSON.parse(config.data);
      Todos.some((t, index) => {
        if (t.id === todo.id) {
          t.title = todo.title;
          t.locked = todo.locked;
          t.isDelete = todo.isDelete;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
    // 修改标题
    mock.onPost('/todo/editRecord').reply(config => {
      let {
        id,
        record,
        index
      } = JSON.parse(config.data);
      Todos.some((t) => {
        if (t.id === id) {
          t.record[index] = record;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
};

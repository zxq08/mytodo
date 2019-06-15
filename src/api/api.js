import axios from 'axios';

export const getTodoList = params => { //封装一个函数，名为getTodoList
  return axios.get(`/todo/list`,{      //请求路径 '/todo/list'
    params:params
  });
};

export const addTodo = params => {
  return axios.post(`/todo/addTodo`,params).then(res => res.data);
};

export const getTodo = params => {
  return axios.get(`/todo/listId`,{
    params:params
  })
};

export const addRecord = params => {
  return axios.post(`/todo/addRecord`,params).then(res => res.data);
};

export const editTodo = params => {
  return axios.post(`/todo/editTodo`,params).then(res => res.data);
};

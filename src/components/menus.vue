<template>
    <!-- 绑定点击事件goList，并且判断当todoId = item.id 时,文字高亮 -->
    <div class="list-todos"> <!-- 菜单容器 -->
        <a @click="goList(item.id)" class="list-todo activeListClass list"
           :class="{'active': item.id === todoId}" v-for="(item,index) in todoList" :key="index">
        <!-- 单个菜单容器 v-for列表渲染-->
          <span class="icon-lock" v-if="item.locked"></span> <!-- 锁的图标 -->
          <span class="count-list" v-if="item.count > 0">{{item.count}}</span> <!-- 数字 -->
          {{item.title}}<!-- 菜单内容 --> <!-- 数据绑定，模板语法 -->
        </a>
        <a class="link-list-new" @click="addTodoList">
          <span class="icon-plus"></span>
          新增
        </a>
    </div>
</template>

<script>
    import {getTodoList, addTodo} from '../api/api'; //引入我们封装好的两个接口函数

    export default {
      data(){
        return {
          items: [],  //菜单数据
          todoId: '' //默认选中id
        };
      },
      created(){
        this.$store.dispatch('getTodo').then(() => { //调用vuex actions.js 里面的 getTodo函数
          this.$nextTick(() => {
            this.goList(this.todoList[0].id);
          });
        });
        /*getTodoList({}).then(res => {
          const TODOS = res.data.todos;        //数据都会返回在res.data里
          this.items = TODOS;                  //把菜单数据复制给定义的this.items
          this.todoId = TODOS[0].id;           //把菜单数据的第一个对象的id赋值给默认选中id
        });*/
      },
      methods:{
        goList(id){ //点击菜单时候，替换选中id
          this.todoId = id;
        },
        addTodoList(){ //点击新增按钮
          /*//调用新增菜单接口，在调用成功时请求数据
          addTodo({}).then(data => {
            getTodoList({}).then(res => {
              const TODOS = res.data.todos;
              this.todoId = TODOS[TODOS.length - 1].id;
              this.items = TODOS;
            });
          });*/
          //调用vuex actions.js 里面的 getTodo函数
          addTodo({}).then(data => {
            this.$store.dispatch('getTodo').then(() => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.goList(this.todoList[this.todoList.length-1].id);
                },100)
              })
            });
          });
        }
      },
      watch: {
        'todoId'(id){
          this.$router.push({name:'todo',params:{id:id}});
          //监听到用户点击的todoId的变化在跳转路由
        }
      },
      computed: {
        todoList() {
          return this.$store.getters.getTodoList;
          // 返回vuex getters.js 定义的getTodoList数据
        }
      }


    };
</script>

<style lang="less" scoped>
  @import "../common/style/menu.less";
</style>

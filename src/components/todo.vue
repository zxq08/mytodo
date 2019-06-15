<template>
    <div class="page lists-show"><!-- 最外层容器 -->
      <nav><!-- 容器上半部分 -->
        <div class="form list-edit-form" v-show="isUpdate">
          <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
          <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked"/>
          <div class="nav-group right">
            <a class="nav-item" @click="isUpdate = false">
              <span class="icon-close"></span>
            </a>
          </div>
        </div>

        <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <!-- 浏览器窗口小于40em时，显示移动端的菜单图标 -->
        <!-- 在菜单的图标下面添加updateMenu时，他可以直接调用vuex actions.js里面的updateMenu方法 -->
          <a class="nav-item">
            <span class="icon-list-unordered">
            </span>
          </a>
        </div>

        <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
          <span class="title-wrapper">{{todo.title}}</span><!-- 标题 -->
          <span class="count-list">{{todo.count || 0}}</span><!-- 数目 -->
        </h1>
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class="nav-item"> <!-- 锁定图标 -->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class="nav-item"> <!-- 删除图标 -->
            <span class="icon-trash"></span>
          </a>
        </div>
      </div>
      <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,
            监听了disabled属性，在todo.locked为true的情况下无法编辑
        -->
      <div class="form todo-new input-symbol">
        <input type="text" v-model="text" placeholder="请输入"
         @keyup.enter="onAdd" :disabled="todo.locked"/>
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items"><!-- 容器下半部分 -->
      <div v-for="item in items">
        <item :item="item"></item>
      </div>
      <!--<item></item>-->
        <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，
        循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
    </div>
  </div>


</template>

<script>
    //引入组件
    import item from './item';
    import { getTodo,addRecord,editTodo} from "@/api/api";


    export default {
      data(){
        return {
          todo: {//详细内容
            title: '星期一',
            count: 12,
            locked: false
          },
          items: [], //待办单项列表
          text:'',//新增待办单项绑定的值
          isUpdate: false
        }
      },
      //挂载组件
      //components的作用看可以把其他子组件挂载当前父组件的作用域里
      components: {
        item
      },
      watch:{
        '$route.params.id'(){
          //监听 $route.params.id 的变化，这个id代表用户点击了其他待办项需要重新请求数据
          this.init();
        }
      },
      created(){
        //created 生命周期，在实例已经完成时创建，页面还没渲染时调用init方法
        this.init();
      },
      methods: {
        init(){
          //获取到 $route下params下的id，即我们在menus.vue传入的数据
          const ID = this.$route.params.id;
          getTodo({ id: ID}).then(res => {
            let{
              id, title, count, isDelete, locked, record
            } = res.data.todo;
            //请求成功，拿到res.data.todo;再将record赋值到待办单项列表，其他数据赋值到todo对象
            this.items = record;
            this.todo = {
              id: id,
              title: title,
              count: count,
              locked: locked,
              isDelete: isDelete
            };
          });
        },
        onAdd(){
          //当用户输入文字并且回车时调用此方法
          const ID = this.$route.params.id;
          addRecord({ id: ID,text: this.text}).then(res => {
            this.text= '';
            this.init();
            //请求成功后初始化
          });
        },
        updateTodo(){
          let _this = this;
          editTodo({
            todo:this.todo
          }).then(data => {
            _this.$store.dispatch('getTodo');
          });
        },
        updateTitle(){
          this.updateTodo();
          this.isUpdate = false;
        }
      }
    }
</script>

<style lang="less" >
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>

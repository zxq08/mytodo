<template>
  <!-- 这里写html -->
  <section class="container" :class="{'menu-open':menuOpen}"> <!--最外层容器-->
  <!-- 根据menuOpen的值来判断是否使用menu-open样式 -->
    <section class="menu"> <!--左边的容器-->
      <menus></menus>
    </section>
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
    <!-- 这个是当页面收缩覆盖在内容上面的模糊层，点击后复原 他可以直接调用vuex actions.js里面的updateMenu方法-->
    <div class="content-container"><!--右边的容器-->
      <todo></todo>
       <router-view></router-view>
    </div>
  </section>
</template>
<script>
  import menus from './menus';// * 导入刚才我们创建的 menus组件
  import todo from './todo';
  export  default {
    components : {// * 注册menus组件，让其可以在template调用
      menus,
      todo

    },
    computed: {
      menuOpen() {
        return this.$store.state.menuOpen;
      }
    }
  };




  //这里写js
</script>
<style lang="less" >
  @import '../common/style/layouts.less';
  /* 这里写css */
</style>


<!--
 *一个.vue 文件就等于单独组件。因为.vue文件是自定义的，浏览器不识别，所以要对该文件进行解析,在webpack构建中，
 *需要安装vue-loader 对.vue文件进行解析。
 *template里面最外层必须是只有一个容器
 *script 中的 export default {} 即导出这个组件，外部可以引用。
 *style 中的 lang 指额外表示支持的语言可以让编辑器识别,scoped 指这里写的css只适用于该组件。
 -->


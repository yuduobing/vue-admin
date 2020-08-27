<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import store from "@/store";
export default {
  name: 'App',

  mounted: function () {
    //此方法刷新页面时也会执行

    window.addEventListener('beforeunload',()=>{
      // window.sessionStorage.removeItem('menus')

      Cookies.remove("Token")
    });
  },

}
</script>
<style>
  /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>

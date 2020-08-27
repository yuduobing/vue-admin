<template>
  <!-- 系统主界面 -->


  <div class="dashboard-container">

    <transition name="el-zoom-in-center">
      <img    v-show="show" src="@/assets/1.jpg" alt="品牌logo">
    </transition>

    <transition name="el-zoom-in-top">
      <div   v-show="show">尊敬的 {{ QYMC }}，欢迎您的使用</div>
    </transition>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
      show:false
    }
  },
  mounted() {
     this.yshow()
  },
  computed: {
    ...mapGetters([
      'name',
      'token',
      'QYMC'
    ])
  },
  methods:{
    yshow(){
      this.show=true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

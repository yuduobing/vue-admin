<template>
  <!-- 修改客户信息界面 -->
  <div>
    <el-form ref="form" :model="form" label-width="120px" style="padding-top: 30px;">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户企业名称"><el-input v-model="form.cQYMC" :disabled="true"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="停用">
            <el-switch
              style="display: block;padding-top: 6px;"
              v-model="form.lTYBZ"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="停用"
              inactive-text="启用"
              :active-value="1" :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="绑定ERP">
          <el-switch
            style="display: block;padding-top: 6px;"
            v-model="form.Binding"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="停用"
            inactive-text="启用"
            :active-value="1" :inactive-value="0"
          ></el-switch></el-form-item>
        </el-col> -->
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cQYMC: '',
        lTYBZ:''
      },
      input: '',
      value: ''
    };
  },
  created() {
    var storage = window.sessionStorage;
    var data = JSON.parse(sessionStorage.getItem('data'))
    // this.updateBZ(data)
    this.form=data
  },
  methods: {
    updateBZ(data){//格式化标志
      if(data.lTYBZ == '0'){
         data.lTYBZ=false
      }else{
        data.lTYBZ=true
      }
    },
    onSubmit() {//客户信息修改
      this.$store
        .dispatch('customer/updateKh',this.form)
        .then(res => {
            // console.log("请求成功")
            window.sessionStorage.removeItem(data)
            this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
            this.$router.replace({
              path: '/Customer'
            });
        })
        .catch(() => {});

    },
    cancel() {//退出
      // this.$router.replace('/Customer');
      sessionStorage.clear()//清空所有缓存数据
      this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
      this.$router.replace({
        path: '/Customer'
      });
    }
    // changeStatus($event,num){
    // 	console.log($event);  // 默认参数，当前状态改变值
    // 	console.log(num);   // 自定义参数
    // }
  }
};
</script>

<style></style>

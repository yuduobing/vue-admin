<template>
  <!-- 修改供应商信息界面 -->
  <div>
    <el-form ref="form" :model="form" label-width="120px" style="padding-top: 30px;">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商名称"><el-input v-model="form.SupplierName" ></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="输入码">
          <el-input v-model="form.EnterCode" ></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="采购员"><el-input v-model="form.Buyer" ></el-input></el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="企业性质"><el-input v-model="form.Property" ></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="单位名称"><el-input v-model="form.CompanyName" ></el-input></el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="简称"><el-input v-model="form.Abbreviation" ></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="邮政编码"><el-input v-model="form.Postcode" ></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商等级"><el-input v-model="form.Grade" ></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="地址"><el-input v-model="form.Address" ></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="停用">
            <el-switch
              style="display: block;padding-top: 6px;"
              v-model="form.Deactivate"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="停用"
              inactive-text="启用"
              :active-value="1" :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-col>
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
        SupplierName: '',
        EnterCode: '',
        Buyer: '',
        Property: '',
        CompanyName: '',
        Abbreviation:'',
        Postcode:'',
        Grade:'',
        Address:'',
        Deactivate:''
      },

      input: '',
      url: '192.168.100.219:8011',
      url1: '192.168.100.219:8080',
      value: ''
    };
  },
  created() {
    var data = JSON.parse(sessionStorage.getItem('data'))
    // this.updateBZ(data)
    this.form=data
  },
  methods: {
    updateBZ(data){//格式化标志
      if(data.Billing == '0'){
         data.Billing=false
      }else{
        data.Billing=true
      }
      if(data.Deactivate == '0'){
         data.Deactivate=false
      }else{
        data.Deactivate=true
      }
      if(data.Binding == '0'){
         data.Binding=false
      }else{
        data.Binding=true
      }
    },
    onSubmit() {
      this.$store
        .dispatch('supplier/updateGYS',this.form)
        .then(res => {
            console.log("请求成功")
        })
        .catch(() => {});

    },
    cancel() {
      this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
      this.$router.replace({
        path: '/Supplier'
      });
    }
  }
};
</script>

<style></style>

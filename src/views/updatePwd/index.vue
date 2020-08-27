<template>
  <!-- 修改密码界面 -->
  <div >
    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      status-icon
      label-width="100px"
      :inline-message="true"
      style="position: absolute;left: 35%;top: 30%;"
    >
    <el-form-item label="用户名：" prop="account">
      <el-input type="text" v-model="resetForm.account" auto-complete="on" style="width: 260px;" >
      </el-input>
    </el-form-item>
      <el-form-item label="旧密码：" prop="password">
        <el-input type="password" v-model="resetForm.password" auto-complete="on" style="width: 260px;" show-password>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newpwd">
        <el-input type="password" v-model="resetForm.newpwd" auto-complete="on" style="width: 260px;" show-password>
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword1">
        <el-input type="password" v-model="resetForm.newpassword1" auto-complete="on" style="width: 260px;" show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">确认修改</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
// import api from "@/api";//这是我个人全局定义单独用来接收url接口的文件，不作参考
// import { getaccount } from "@/utils/auth";//这是我个人调用封装获取当前账户的account，不作参考
// import $ from '@/api/jquery-3.2.1.min.js';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6-18位'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      resetForm: {
        //传给后台所需要的参数
        newpassword1: '',
        password: '',
        account: '' //此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
      },
      resetFormRules: {
        account:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newpwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
        newpassword1: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  methods: {
    onSubmit() {
      // $.ajax({
      // 	url: 'http://' + this.url + '/User/createUse',
      // 	type: 'post',
      //   contentType:"application/json;charset=utf-8",
      // 	data: {
      // 		// message:JSON.stringify(this.data)
      //     // 用户信息
      //     account:this.userInfoForm.account,//用户名
      //     password:this.userInfoForm.password,//密码
      // 	},
      // 	dataType: 'json',
      // 	success: function(data) {
      // 		console.log('aaaaa:' + JSON.stringify(data));
      // 		// this.$message('保存成功');
      // 		var verify = data.status;
      // 		if (verify == '1') {
      // 			that.$message({
      // 				showClose: true,
      // 				type: 'success',
      // 				message: '注册成功'
      // 			});
      // 		} else if (verify == '0') {
      // 			this.$message({
      // 				showClose: true,
      // 				type: 'error',
      // 				message: '保存失败,' + data.error.message
      // 			});
      // 		}
      // 		this.$router.replace('/');
      // 	},
      // 	error: function() {
      // 		this.$message({
      // 			showClose: true,
      // 			type: 'error',
      // 			message: '网络连接失败'
      // 		});
      // 	}
      // });
      
      
      // this.$refs.resetForm.validate(valid => {
      //   if (valid) {
          
          // api.materialQuery
          //   .toAmend(this.resetForm)
          //   .then(res => {
          //     if (res.code === 2) {
          //       this.$message({
          //         message: res.msg,
          //         type: 'error',
          //         duration: '2000'
          //       });
          //       return false;
          //     }
          //     if (res.code === 0) {
          //       this.$message.success('修改成功,3秒后跳转到登录页！');
          //       setTimeout(() => {
          //         this.logout(); //调用跳转到登陆页的方法
          //       }, 3000);
          //     }
          //     ic;
          //   })
          //   .catch(() => {});
          //   }
          // });
    },
    //这是修改成功后重新返回登陆页的方法，
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login`);
    }
  }
};
</script>

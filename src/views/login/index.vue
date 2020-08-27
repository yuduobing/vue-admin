<template>
  <!-- 登录界面 -->
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container"><h3 class="title">高得软件SaaS系统</h3></div>

      <el-form-item prop="account">
        <span class="svg-container"><svg-icon icon-class="user" /></span>
        <el-input ref="account" v-model="loginForm.account" placeholder="用户名" name="account" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container"><svg-icon icon-class="password" /></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @keyup.enter.native.prevent="handleLogin" @click.native.prevent="handleLogin">
        登录
      </el-button>

      <div class="tips">
        <!-- <span style="margin-right:45%;"><router-link to="/updatePwd">忘记密码？</router-link></span> -->
        <el-button type="text" size="medium" @click="dialogVisible = true" style="margin-right:45%;">忘记密码</el-button>
        <span style="margin-right:0px;"><router-link to="/registered">还没有账号？请去注册！</router-link></span>
      </div>
    </el-form>

    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="35%" :before-close="handleClose" center>
      <el-form ref="UpdatePwdForm" :model="UpdatePwdForm" style="margin: auto;width: 30%;margin-left: 20%;" label-width="60px">
        <el-form-item label="账号:" prop="account" style="padding-top: 0px;padding-bottom: 0px;background-color: #FFF;">
          <vxe-input
            ref="account"
            v-model="UpdatePwdForm.account"
            placeholder="账号"
            name="account"
            type="text"
            tabindex="3"
            auto-complete="on"
            style="background-color: #FFF;width:220px"
          />
        </el-form-item>
        <!-- <el-form-item label="原密码:" prop="oldpassword" style="padding-top: 0px;padding-bottom: 0px;background-color: #FFF;">
          <vxe-input v-model="UpdatePwdForm.oldpassword" placeholder="原密码" style="background-color: #FFF;width:200px"></vxe-input>
        </el-form-item> -->
        <el-form-item label="新密码:" prop="newpassword" style="padding-top: 0px;padding-bottom: 0px;background-color: #FFF;">
          <vxe-input v-model="UpdatePwdForm.newpassword" placeholder="新密码" style="background-color: #FFF;width:220px"></vxe-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="tel" style="padding-top: 0px;padding-bottom: 0px;background-color: #FFF;">
          <vxe-input v-model="UpdatePwdForm.tel" placeholder="手机号" style="background-color: #FFF;width:220px"></vxe-input>
        </el-form-item>
        <el-row>
          <el-col :span="17">
            <el-form-item label="验证码:" prop="code" style="padding-top: 0px;padding-bottom: 0px;background-color: #FFF;">
              <vxe-input v-model="UpdatePwdForm.code" placeholder="短信验证码" style="background-color: #FFF;width:100px"></vxe-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item  style="padding-top: 0px;padding-bottom: 0px;background-color: #FFF;">
              <el-button  size="medium" :class="{disabled: !this.canClick}" @click="send" style="width: 120px;padding-left: 10px;" >{{ content }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        // callback(new Error('请输入正确的用户名'));
        callback();
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数字'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: '',//qybz
        password: ''//123456
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogVisible: false,
      UpdatePwdForm: {
        code: '',
        account: '',
        // oldpassword: '',
        newpassword: '',
        tel: ''
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60 ,//记录具体倒计时时间
      canClick: true //添加canClick
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // try {
          //   this.axios
          //     .post('/userController/verifyLogin', JSON.stringify({ account: this.loginForm.account.trim(), password: this.loginForm.password })
          //     ,{headers:{'Content-Type': 'application/json'}})
          //     .then(response => {
          //       this.$router.push({ path: this.redirect || '/' });
          //       this.loading = false;
          //     })
          //     .catch(() => {
          //       this.$message({
          //         showClose: true,
          //         type: 'error',
          //         message: 'Ajax error'
          //       });
          //     });
          // } catch (e) {
          //   //TODO handle the exception
          //   console.log(e.stack);
          // }
          // 代码调到了src/store下的user.js,调用了里面的login方法
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/' });
              this.loading = false;
            })
            .catch((err) => {
              console.log("登陆错误"+err)
              this.loading = false;
            });
        } else {
          console.log('输入错误!!');
          this.loading = false;
          return false;
        }
      });
    },
    getCaptcha() {
      this.axios
        .post('/supplierController/verifyUsernameAndCompany', { username: value, company: company })
        .then(response => {
          console.log(response);
          if (response.data.status === '0') {
            cb(response.data.error.message);
          } else {
            cb();
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'error',
            message: 'Ajax 错误'
          });
        });
    },
    handleClose(done) {
      //关闭弹窗
      this.dialogVisible = false;
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },

    send() {
      this.axios
        .post('/userController/sendCode', { tel: this.UpdatePwdForm.tel, dlh: this.UpdatePwdForm.account })
        .then(response => {
          console.log(response)
          if (response.data.status === '1') {
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.data.state
            });
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: response.data.data
            });
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'error',
            message: 'Ajax 错误'
          });
        });
      if (!this.canClick) return  //改动的是这两行代码
       this.canClick = false
       this.content = this.totalTime + 's后重新发送'
       let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
         window.clearInterval(clock)
         this.content = '重新发送验证码'
         this.totalTime = 30
         this.canClick = true  //这里重新开启
        }
       },1000)
    },

    save() {
      this.axios
        .post('/userController/modifyPassWord', { account: this.UpdatePwdForm.account, password: this.UpdatePwdForm.newpassword,code:this.UpdatePwdForm.code })
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: response.data.message
                });
                this.dialogVisible = false;
              } else {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: response.data.message
                });
              }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'error',
            message: 'Ajax 错误'
          });
        });

    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.disabled{
 background-color: #ddd;
 border-color: #ddd;
 color:#57a3f3;
 cursor: not-allowed; // 鼠标变化
}
</style>

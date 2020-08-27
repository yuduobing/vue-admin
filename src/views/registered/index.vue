<template>
  <!-- 注册页面 -->
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" style="margin-left:50px ;">
      <el-collapse-item title="用户信息" name="1">
        <el-form :model="userInfoForm" style="margin: 2% 0% 0% 2%;" :rules="rules" :inline-message="true">
          <el-row>
            <el-col :span="8">
              <el-form-item prop="account" label="用户名:">
                <el-input ref="account" v-model="userInfoForm.account" placeholder="请输入用户名" name="account" type="text" style="width: 50%;margin-left: 43px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item prop="password" label="密码:">
                <el-input
                  ref="password"
                  v-model="userInfoForm.password"
                  @focus="PasswordStrength()"
                  placeholder="请输入密码"
                  name="password"
                  type="text"
                  style="width: 29%;margin-left: 56px;"
                  show-password
                />
              </el-form-item>
              <password-strength v-model="userInfoForm.password" v-show="tips" style="width: 29%;margin-left:100px ;margin-bottom: 20px;"></password-strength>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="checkPwd" label="确认密码:">
                <el-input
                  ref="checkPwd"
                  v-model="userInfoForm.checkPwd"
                  placeholder="请确认密码"
                  name="checkPwd"
                  type="text"
                  style="width: 50%;margin-left: 30px; "
                  show-password
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="ContactPerson" label="联系人:">
                <el-input
                  ref="ContactPerson"
                  v-model="userInfoForm.ContactPerson"
                  placeholder="请输入联系人"
                  name="ContactPerson"
                  type="text"
                  style="width: 50%;margin-left: 43px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="CellPhone" label="手机:">
                <el-input ref="CellPhone" v-model="userInfoForm.CellPhone" placeholder="请输入手机号" name="password" type="text" style="width: 50%;margin-left: 52px;" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="供应商信息" name="2">
        <el-form :model="supplierInfoForm" style="margin: 2% 0% 0% 2%;" :inline-message="true">
          <!-- :rules="rules" -->
          <el-form-item prop="supplier" label="供应商:" style="margin-left: 10px;">
            <el-row>
              <el-col :span="8">
                <el-select v-model="supplierInfoForm.supplier" filterable multiple placeholder="请选择供应商" style="width: 50%;margin-left: 45px;">
                  <el-option v-for="item in suppliers" :key="item.QYMC" :label="item.QYMC" :value="item.QYMC">
                    <span style="float: left">{{ item.QYMC }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                  </el-option>
                </el-select>
                <!-- <multiselect
                  v-model="supplierInfoForm.supplier"
                  :options="suppliers"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="请选择供应商"
                  label="label"
                  track-by="label"
                  :preselect-first="true"
                  style="width: 75%;margin-left: 45px;padding: 0 0 0 0;"
                >
                  <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">已选中{{ values.length }}个角色</span></template>
                </multiselect> -->
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="企业信息" name="3">
        <el-form :model="companyForm" style="margin: 2% 0% 0% 2%;" :rules="rules" :inline-message="true">
          <el-row>
            <el-col :span="16">
              <el-form-item prop="CompanyName" label="企业名称:">
                <el-input ref="CompanyName" v-model="companyForm.CompanyName" placeholder="请输入企业名称" name="CompanyName" type="text" style="width: 74%;margin-left: 31px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="8">
              <el-form-item prop="EnterpriseCode" label="企业代码:" style="margin-left: 10px;">
                <el-input
                  ref="EnterpriseCode"
                  v-model="companyForm.EnterpriseCode"
                  placeholder="企业代码"
                  name="EnterpriseCode"
                  type="text"
                  style="width: 50%;margin-left: 31px;"
                />
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item prop="companyType" label="企业类型:">
                <el-select v-model="companyForm.companyType" placeholder="请选择企业类型" style="width: 50%;margin-left: 31px;">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="所属行业:" style="margin-left: 10px;">
                <el-select v-model="companyForm.Industry" placeholder="所属行业" style="width: 50%;margin-left: 26px;">
                  <el-option v-for="item in Industrys" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item prop="Address" label="企业地址:" style="margin-left: 10px;">
                <el-input ref="Address" v-model="companyForm.Address" placeholder="地址" name="Address" type="text" style="width: 74.8%;margin-left: 31px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="LegalPerson" label="企业法人:" style="margin-left: 10px;">
                <el-input ref="LegalPerson" v-model="companyForm.LegalPerson" placeholder="企业法人" name="LegalPerson" type="text" style="width: 50%;margin-left: 31px;" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="phone" label="电话:" style="margin-left: 10px;">
                <el-input ref="phone" v-model="companyForm.phone" placeholder="电话" name="phone" type="text" style="width: 50%;margin-left: 54px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="nsrsbh" label="纳税人识别号:" style="margin-left: 10px;">
                <el-input ref="nsrsbh" v-model="companyForm.nsrsbh" placeholder="纳税人识别号" name="nsrsbh" type="text" style="width: 50%;margin-left: 4px;" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="EnterpriseCode" label="企业代码:" style="margin-left: 10px;">
                <el-input
                  ref="EnterpriseCode"
                  v-model="companyForm.EnterpriseCode"
                  placeholder="企业代码"
                  name="EnterpriseCode"
                  type="text"
                  style="width: 50%;margin-left: 27px;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item prop="CompanyProfile" label="企业简介:" style="margin-left: 10px;">
                <el-input type="textarea" autosize placeholder="企业简介" v-model="companyForm.CompanyProfile" style="width: 75%;margin-left: 30px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="营业执照:" style="margin-left: 10px;">
                <el-upload
                  ref="upload"
                  action="http://192.168.100.78:8080/userController/uploadLicense"
                  list-type="picture-card"
                  :auto-upload="false"
                  accept="image/jpeg,image/jpg,image/png"
                  :http-request="uploadImgs2"
                  :limit="imgLimit"
                  :file-list="productImgs"
                  :multiple="isMultiple"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-exceed="handleExceed"
                  :on-error="imgUploadError"
                  style="margin-left: 102px;"
                  :on-change="imgBroadcastChange"
                  :on-progress="uploadVideoProcess"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <el-button :loading="loading" type="primary" style="margin: 1% 0% 3% 5%;" size="medium" @click.native.prevent="Registered">注册</el-button>
    <el-button :loading="loading" type="primary" style="margin: 1% 0% 3% 5%;" size="medium" @click.native.prevent="cancel">返回</el-button>
  </div>
</template>
<script>
import { validaccount } from '@/utils/validate';
import { getToken } from '@/api/qiniu';
import PasswordStrength from '@/components/drag/PasswordStrength'; //引入密码强度progress组件
export default {
  name: 'Registered',
  components: { PasswordStrength }, //注册密码强度progress组件
  data() {
    var validateAccount = (rule, value, cb) => {
      var company = '';
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
    };
    var validatePwd = (rule, value, cb) => {
      var pattern = /^\S{6,20}$/g;
      var pattern1 = /^(\w){6,20}$/;
      if (value === '') {
        cb(new Error('请输入密码'));
      }
      //  else if (!pattern.test(value)) {
      //   cb(new Error('请输入6-20个非空白字符'));
      // }
      else if (!pattern1.test(value)) {
        cb(new Error('只能输入6-20个字母、数字、下划线'));
      } else {
        if (this.userInfoForm.checkPwd !== '') {
          this.$refs.userInfoForm.validateField('checkPwd');
        }
        cb();
      }
    };
    var validateCheckPwd = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'));
      } else if (value !== this.userInfoForm.password) {
        cb(new Error('两次输入密码不一致!'));
      } else {
        cb();
      }
    };
    var validateCellPhone = (rule, value, cb) => {
      var phone = value;
      if (phone == '') {
        cb('手机号码不能为空');
      } else if (phone.length != 11) {
        cb('请输入11位手机号码！');
      } else if (!/^1[3456789]\d{9}$/.test(phone)) {
        cb('手机号码有误，请重填');
      }
    };
    var validateCompanyName = (rule, value, cb) => {
      var username = '';
      this.axios
        .post('/supplierController/verifyUsernameAndCompany', { username: username, company: value })
        .then(response => {
          // console.log(response);
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
    };
    return {
      userInfoForm: {
        account: '',
        password: '',
        checkPwd: '',
        ContactPerson: '',
        CellPhone: ''
      },
      companyForm: {
        CompanyName: '',
        // companyType: '',
        nsrsbh: '', //纳税人识别号
        Address: '',
        LegalPerson: '',
        phone: '',
        EnterpriseCode: '',
        Industry: '',
        CompanyProfile: ''
      },
      supplierInfoForm: {
        supplier: []
      },
      // value: '', //企业类型
      suppliers: [], //供应商下拉框options
      options: [{ label: '制造业', value: '1' }, { label: '商贸企业', value: '2' }], //企业类型下拉框options
      Industrys: [{ label: '包装', value: '1' }, { label: '服装', value: '2' }, { label: '机械', value: '3' }, { label: '医院', value: '4' }], //所属行业下拉框options
      rules: {
        account: [{ required: true, validator: validateAccount, trigger: 'blur' }],
        password: [{ required: true, validator: validatePwd, trigger: 'blur' }],
        checkPwd: [{ required: true, validator: validateCheckPwd, trigger: 'blur' }],
        CompanyName: [{ required: true, validator: validateCompanyName, trigger: 'blur' }],
        ContactPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // companyType: [{ required: true, message: '请选择企业类型', trigger: 'change' }],
        CellPhone: [{ required: true, validator: validateCellPhone, trigger: 'blur' }]
      },
      activeNames: ['1', '2', '3'],
      loading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      productImgs: [],
      isMultiple: true,
      imgLimit: 1,
      dataObj: { token: '', key: '' },
      fileList: [],
      updateLoading: false, //显示上传加载
      myHeader: {}, //请求头
      updateOtherData: {}, //其他请求数据
      imageUrl: '', //图片路径
      tips: false, //默认隐藏密码强度,
      network: true ,//默认有网
      file:''//营业执照
    };
  },
  created() {
    //this.suppliers=[{label: '制造业', value: '1'},{label: '商贸企业', value: '2'}]//赋值多选框options
    this.querySupplier();
  },
  mounted() {
    // 检测断网
    window.addEventListener('offline', () => {
      console.log('已断网');
      this.network = false;
      // var registered ={}
      // registered.userInfoForm=this.userInfoForm
      // registered.companyForm=this.companyForm
      // registered.supplierInfoForm=this.supplierInfoForm
      // console.log(registered)
      // var storage = window.sessionStorage
      // storage.setItem('registered', data.QYBH)
    });
    window.addEventListener('online', () => {
      console.log('网络已连接');
      this.network = true;
    });
  },
  computed: {
    // imageUrl() {
    //   return this.value;
    // }
  },
  methods: {
    querySupplier() {
      //获取供应商
      var name = '';
      this.axios
        .post('/supplierController/querySupplier', { name: name })
        .then(response => {
          if (response.data.status === '1') {
            this.suppliers = response.data.data.supplier;
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: response.message
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
    },
    PasswordStrength() {
      //控制密码强度显示
      this.tips = true;
    },
    handleChange(val) {
      // console.log(val);
    },
    handleRemove(file, fileList) {
      //移除图片
      this.file=file
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //预览图片时调用
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgBroadcastChange(file){
      this.file=file.raw
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      console.log(file);
      this.file=file
      this.dataObj = this.userInfoForm.account;
      const isJPG = true;
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      let regs = /.+?(\.jpg|\.png|\.jpeg)/g;
      let isImg = regs.test(file.name);
      if (!isImg) {
        this.$message.error('请上传正确的图片格式');
      }
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      //图片上传成功
      // console.log(res);
      // console.log(file);
      // console.log('上传成功');
      // this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 1) {
        this.updateLoading = false; //关闭上传加载
      } else {
        this.$message({
          type: 'error',
          message: '上传失败'
        });
      }
    },
    uploadImgs2(f,qybh) {
      // this.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      f=this.file
      let param = new FormData(); //创建form对象
      console.log(f)
      param.append('file',f)
      param.append('filename', f.name); //通过append向form对象添加数据
      param.append('qybh', qybh);
      this.axios
        .post(
          '/userController/uploadLicense',param
          ,{headers: {
              'Content-Type': 'false'
            }}
        ) //上传图片
        .then(response => {
          console.log(response);
          if(response.data.status == '0'){
            this.$message({
              showClose: true,
              type: 'error',
              message: response.data.error.message
            });
          }

        })
        .catch(error => {
          console.log('上传失败');
          console.log(error);
          this.$message({
            showClose: true,
            type: 'error',
            message: 'Ajax 错误'
          });
        });
    },
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      this.$message.error('上传图片不能超过1张!');
      // console.log(file, fileList);
    },
    imgUploadError(err, file, fileList) {
      //图片上传失败调用
      // console.log(err);
      this.$message.error('上传图片失败!');
    },
    Registered() {

      this.axios
        .post('/supplierController/supplierRegister', {
          // 用户信息
          account: this.userInfoForm.account, //用户名
          password: this.userInfoForm.password, //密码
          ContactPerson: this.userInfoForm.ContactPerson, //联系人
          CellPhone: this.userInfoForm.CellPhone, //手机
          // 供应商信息
          supplier: this.supplierInfoForm.supplier, //供应商
          // 企业信息
          CompanyName: this.companyForm.CompanyName, //企业名称
          // companyType: this.companyForm.companyType, //企业类型
          Industry: this.companyForm.Industry, //所属行业
          Address: this.companyForm.Address, //企业地址
          LegalPerson: this.companyForm.LegalPerson, //企业法人
          phone: this.companyForm.phone, //电话
          nsrsbh: this.companyForm.nsrsbh, //纳税人识别号
          EnterpriseCode: this.companyForm.EnterpriseCode, //企业代码
          CompanyProfile: this.companyForm.CompanyProfile //企业简介
        })
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            this.uploadImgs2(this.file,response.data.data.qybh)
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.data.message
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

      //this.$router.push({ path: this.redirect || '/' });
      // this.$message.success('请重新登录');
    },
    uploadVideoProcess(event, file, fileList) {
      //弹出上传加载
      this.updateLoading = true;
    },
    cancel() {
      this.$router.push({ path: this.redirect || '/' });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon-check:before {
  content: '\e6da';
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

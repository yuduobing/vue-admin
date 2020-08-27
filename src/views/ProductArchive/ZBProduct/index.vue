<template>
  <!-- 纸板产品档案管理界面 -->
  <div>
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-form-item label="配方名称">
<!--        @select="handleSelect"-->
        <el-autocomplete v-model="form.pfmc" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"></el-autocomplete>
        <!-- <el-input v-model="form.pfmc" placeholder="请输入内容" style="width: 200px;"></el-input> -->
        <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>
        <!-- <el-button type="primary" style="margin-left: 10px;" @click="add" size="small">新增</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData"
      border
      height="445px"
      style="width: 95%;margin:10px 40px 0px 40px;"
      max-height="80%"
      :row-style="rowStyle"
      highlight-current-row
      align="center"
      @row-dblclick="update"
      v-loading="listLoading"
      element-loading-text = "努力加载中..."
    >
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <el-table-column prop="pfbh" align="center" label="配方编号" min-width="60px" sortable></el-table-column>
      <el-table-column prop="pfmc" align="center" label="配方名称" min-width="60px" sortable></el-table-column>
      <el-table-column prop="pfmcbh" align="center" label="配方名称编号" min-width="70px" sortable></el-table-column>
      <el-table-column prop="lxmc" align="center" label="楞型" min-width="50px" sortable></el-table-column>
      <el-table-column prop="pfdj" align="center" label="平方单价" min-width="60px" sortable></el-table-column>
      <el-table-column prop="qymc" align="center" label="企业名称" min-width="140px" sortable></el-table-column>
      <el-table-column prop="gysmc" align="center" label="供应商名称" min-width="140px" sortable></el-table-column>
      <el-table-column prop="X3BH" align="center" label="客户物料编码" min-width="70px" sortable></el-table-column>
      <!-- <el-table-column fixed="right" align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="delete (scope.$index, scope.row)" size="mini" type="primary" plain>删除</el-button>
          </template>
        </el-table-column> -->
    </el-table>
    <div style="text-align: center; ">
    <div class="paginationClass">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rawList.length"
      ></el-pagination>
    </div>
    </div>
    <!-- 双击表格行弹框 -->
    <el-dialog title="产品信息修改" :visible.sync="dialogUpdate" width="50%">
      <el-form ref="UpdateForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="配方编号:"><el-input v-model="UpdateForm.pfbh" style="width: 210px;"></el-input></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户物料编码:"><el-input v-model="UpdateForm.X3BH" style="width: 210px;"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="配方名称:"><el-input v-model="UpdateForm.pfmc" style="width: 210px;"></el-input></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配方名称编号:"><el-input v-model="UpdateForm.pfmcbh" style="width: 210px;"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平方单价:"><el-input v-model="UpdateForm.pfdj" style="width: 210px;"></el-input></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楞型名称:"><el-input v-model="UpdateForm.lxmc" style="width: 210px;"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称:"><el-input v-model="UpdateForm.qymc" style="width: 210px;"></el-input></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商名称:"><el-input v-model="UpdateForm.gysmc" style="width: 210px;"></el-input></el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="dialogUpdate = false">取 消</el-button>
        <el-button type="primary" v-on:click="dialogUpdate = false" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="图稿上传" :visible.sync="dialogVisible" width="30%">
      <el-upload class="upload-demo" :data="uploadData" drag :http-request="upload"
      action="123" headers="headers" limit="1" :before-upload="beforeAvatarUpload" on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">上传文件不能超过10MB</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <!--<el-button v-on:click="dialogVisible = false">取 消</el-button>-->
        <el-button type="primary" v-on:click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  data() {
    return {
      url: '192.168.100.78:8080',
      input: '',
      form: {
        pfmc: ''
      },
      tableData: [],
      listLoading: false,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: [],
      value: '',
      dialogVisible: false, //图稿上传弹框
      uploadData: '', //上传文件时存储其他需要提交给后台的数据
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      radio: '纸板',
      qybh: '', //企业编号
      CQYLX: '', //企业类型
      PFList: '', //配方List
      state: '',
      timeout: null,
      dialogUpdate: false,
      UpdateForm: {
        pfbh: '',
        pfmc: '',
        pfmcbh: '',
        lxmc: '',
        pfdj: '',
        qymc: '',
        gysmc: '',
        X3BH: ''
      }
    };
  },
  created() {
    this.gettableData();
    this.getPFMC();
  },
  methods: {
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    querySearchAsync(queryString, callback) {
      var pfmc = this.PFList;
      var results = queryString ? pfmc.filter(this.createStateFilter(queryString)) : pfmc;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        callback(results);
      }, 300 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      this.axios
        .post('/ProductController/queryProductFileByPaperBoard', { qybh: this.qybh, cpmc: item })
        .then(response => {
          if (response.data.status === '1') {
            this.ZXtableData = response.data.data.productList;
            this.ZXrawList = response.data.data.productList;
            this.ZXcurrentChangePage(this.ZXrawList, 1);
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
            message: 'Ajax error'
          });
        });
    },
    getPFMC() {//获取配方名称
      var list = [{}];
      if (this.CQYLX == '二级厂') {
        this.axios
          .post('/ProductController/queryProductFileByPaperBoard', { gysbh: this.qybh })
          .then(response => {
            if (response.data.status === '1') {
              //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
              for (let i of response.data.data.productList) {
                i.value = i.pfmc; //将想要展示的数据作为value
              }
              list = response.data.data.productList;
              this.PFList = list;
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
              message: 'Ajax error'
            });
          });
      } else {
        this.axios
          .post('/ProductController/queryProductFileByPaperBoard', { qybh: this.qybh })
          .then(response => {
            if (response.data.status === '1') {
              //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
              for (let i of response.data.data.productList) {
                i.value = i.pfmc; //将想要展示的数据作为value
              }
              list = response.data.data.productList;
              this.PFList = list;
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
              message: 'Ajax error'
            });
          });
      }
    },
    gettableData() {
      //获取纸板表格数据
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      var CQYLX = storage.getItem('CQYLX');
      this.CQYLX = CQYLX;
      this.qybh = qybh;
      this.listLoading = true;
      if (CQYLX == '二级厂') {
        this.axios
          .post('/ProductController/queryProductFileByPaperBoard', { gysbh: qybh })
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {
              this.tableData = response.data.data.productList;
              this.rawList = response.data.data.productList;
              this.currentChangePage(this.rawList, 1);
              this.listLoading = false;
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
              message: 'Ajax error'
            });
          });
      } else {
        this.axios
          .post('/ProductController/queryProductFileByPaperBoard', { qybh: qybh })
          .then(response => {
            if (response.data.status === '1') {
              this.tableData = response.data.data.productList;
              this.rawList = response.data.data.productList;
              this.currentChangePage(this.rawList, 1);
              this.listLoading = false;
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
              message: 'Ajax error'
            });
          });
      }
    },
    handleSizeChange: function(pageSize) {
      // 每页条数切换
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage1);
    },
    handleCurrentChange: function(currentPage) {
      //页码切换
      // this.currentRow = val;
      this.currentPage1 = currentPage;
      this.currentChangePage(this.rawList, currentPage);
    },
    currentChangePage(list, currentPage) {
      //分页方法
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tableData = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableData.push(list[from]);
        }
      }
    },
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    search() {
      //查询方法
      if (this.CQYLX === '二级厂') {
        this.searchTwo(this.qybh, this.form.pfmc);
      } else {
        this.searchThree(this.qybh, this.form.pfmc);
      }
    },
    searchTwo(qybh, pfmc) {
      this.axios
        .post('/ProductController/queryProductFileByPaperBoard', { qybh: qybh, pfmc: pfmc })
        .then(response => {
          console.log(response);
          if (response.data.status == '1') {
            this.tableData = response.data.data.productList;
            this.rawList = response.data.data.productList;
            this.currentChangePage(this.rawList, 1);
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
            message: 'Ajax error'
          });
        });
    },
    searchThree(qybh, pfmc) {
      this.axios
        .post('/ProductController/queryProductFileByPaperBoard', { gysbh: qybh, pfmc: pfmc })
        .then(response => {
          console.log(response);
          if (response.data.status == '1') {
            this.tableData = response.data.data.productList;
            this.rawList = response.data.data.productList;
            this.currentChangePage(this.rawList, 1);
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
            message: 'Ajax error'
          });
        });
    },
    update(value) {
      //双击表格行弹框事件
      this.dialogUpdate = true;
      this.UpdateForm = value;
      console.log(value);
      //弹窗赋值
    },
    onSubmit() {
      this.$message({
        showClose: true,
        type: 'error',
        message: '修改失败！您暂无修改权限！'
      });
      //提交产品修改
      // this.axios
      //   .post('', {  })
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status == '1') {
      //
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         type: 'error',
      //         message: response.data.message
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     this.$message({
      //       showClose: true,
      //       type: 'error',
      //       message: 'Ajax error'
      //     });
      //   });
    },
    // delete(index, row){
    //   this.$notify({
    //     title: 'Success',
    //     message: '删除成功',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.tableData.splice(index, 1)
    // },
    add() {
      this.showEdit = true;
      this.ZXTitle = '纸箱下单';
    },
    Upload() {
      //打开上传图稿界面
      this.dialogVisible = true;
    },
    JumpUpload() {
      //打开上传图稿界面
      this.dialogVisible = true;
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      var fileName = new Array();
      fileName = file.name.split('.');
      // const extension = fileName[fileName.length - 1] === 'xls';
      // const extension2 = fileName[fileName.length - 1] === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!extension && !extension2) {
      //   this.$message({
      //     message: '上传文件只能是xls、xlsx格式!',
      //     type: 'warning'
      //   });
      //   //console.log('上传文件只能是xls、xlsx格式!')
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        //console.log('上传文件大小不能超过 10MB!')
      }
      if (extension || (extension2 && isLt2M == true)) {
        console.log(file);
        let fd = new FormData();
        fd.append('invoiceTypeId', this.invoice_type_id); //随文件上传的其他参数
        fd.append('epid', this.epid);
        fd.append('file', file);
        // console.log(fd)
        this.newImport(fd).then(
          function(res) {
            //校验完成后提交
            console.log(res);
          },
          function() {
            console.log('failed');
          }
        );
        return true;
      }
      return extension || (extension2 && isLt2M);
    },
    upload(){

    },
    uploadSuccess(response, file) {
      //上传成功处理
      if (response.code === 0) {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        });
      } else {
        //上传失败处理
        this.$notify.error({
          title: '失败',
          message: response.msg,
          duration: 3000
        });
      }
    },
    rowStyle({ row, rowIndex }) {
      return 'height:5px;';
    }
  }
};
</script>

<style lang="scss" scoped>
.cell-grey {
  background: #f2f2f2;
}
.paginationClass {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 50%;
}
.el-dialog {
  margin: 0 !important;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog__body {
  transform: translate3d(0, 0, 0);
  overflow: auto;
}
.el-dialog__header {
  padding: 20px 20px 20px 20px !important;
  border-bottom: 1px solid #f4f4f4;
}
.el-dialog__footer {
  text-align: center !important;
  padding: 12px 20px 12px 20px !important;
  border-top: 1px solid #f4f4f4;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 24px !important;
}
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

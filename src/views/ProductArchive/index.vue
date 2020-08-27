<template>
  <!-- 产品档案管理界面 -->
  <div>
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-form-item label="产品名称">
        <el-input v-model="form.cpmc" placeholder="请输入内容" style="width: 200px;"></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="Upload" size="small">上传</el-button>
        <!-- <el-button type="primary" style="margin-left: 10px;" @click="add" size="small">新增</el-button> -->
      </el-form-item>
    </el-form>
    <div>
      <el-radio-group v-model="radio" style="margin-left: 40px;">
        <el-radio-button label="纸板"></el-radio-button>
        <el-radio-button label="纸箱"></el-radio-button>
      </el-radio-group>
    </div>
    <div v-show="radio === '纸板'">
      <el-table
        ref="singleTable"
        :data="tableData"
        border
        height="450px"
        style="width: 95%;margin:10px 40px 0px 40px;"
        max-height="80%"
        :row-style="rowStyle"
        highlight-current-row
        align="center"
        @row-dblclick="update"
      >
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="pfbh" align="center" label="配方编号" min-width="80px" sortable></el-table-column>
        <el-table-column prop="pfmc" align="center" label="配方名称" min-width="80px" sortable></el-table-column>
        <el-table-column prop="pfmcbh" align="center" label="配方名称编号" min-width="90px" sortable></el-table-column>
        <el-table-column prop="lxmc" align="center" label="楞型" min-width="50px" sortable></el-table-column>
        <el-table-column prop="pfdj" align="center" label="平方单价" min-width="60px" sortable></el-table-column>
        <el-table-column prop="qymc" align="center" label="企业名称" min-width="140px" sortable></el-table-column>
        <el-table-column prop="gysmc" align="center" label="供应商名称" min-width="140px" sortable></el-table-column>
        <el-table-column prop="X3BH" align="center" label="客户物料编码" min-width="90px" sortable></el-table-column>
        <!-- <el-table-column fixed="right" align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="delete (scope.$index, scope.row)" size="mini" type="primary" plain>删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
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
    <div v-show="radio === '纸箱'">
      <el-table
        ref="ZXsingleTable"
        :data="ZXtableData"
        border
        height="450px"
        style="width: 95%;margin:10px 40px 0px 40px;"
        max-height="80%"
        :row-style="rowStyle"
        highlight-current-row
        align="center"
        @row-dblclick="update"
      >
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <!-- <el-table-column prop="SFSH" align="center" label="审核" min-width="80px" sortable>
             <template slot-scope="scope">
               <span v-if="scope.row.SFSH === 1">已审核</span>
               <span v-else-if="scope.row.SFSH === 0" style="color: red">未审核</span>
             </template>
           </el-table-column> -->
        <el-table-column prop="cCPBH" align="center" label="产品编号" min-width="100px" sortable></el-table-column>
        <el-table-column prop="cCPMC" align="center" label="产品名称" min-width="160px" sortable></el-table-column>
        <!-- <el-table-column prop="cKHMC" align="center" label="客户名称" min-width="110px" sortable></el-table-column>
        <el-table-column prop="cYGXM" align="center" label="员工姓名" min-width="100px" sortable></el-table-column> -->
        <el-table-column prop="cQYMC" align="center" label="企业名称" min-width="100px" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.cNiCheng != null">{{ scope.row.cNiCheng }}</span>
            <span v-else>{{ scope.row.cQYMC }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CardboardPrice" align="center" label="规格" min-width="120px" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.cCCBS != null">{{ scope.row.cCCBS }}:{{ scope.row.nGG_L }}*{{ scope.row.nGG_W }}*{{ scope.row.nGG_H }}</span>
            <span v-else>{{ scope.row.nGG_L }}*{{ scope.row.nGG_W }}*{{ scope.row.nGG_H }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nGG_L" align="center" label="规格长" min-width="90px" sortable></el-table-column>
        <el-table-column prop="nGG_W" align="center" label="规格宽" min-width="90px" sortable></el-table-column>
        <el-table-column prop="nGG_H" align="center" label="规格高" min-width="90px" sortable></el-table-column>
        <el-table-column prop="cLXMC" align="center" label="楞型" min-width="80px" sortable></el-table-column>
        <el-table-column prop="cXXMC" align="center" label="箱型名称" min-width="110px" sortable></el-table-column>
        <el-table-column prop="cCDYX" align="center" label="长度压线" min-width="180px" sortable></el-table-column>
        <el-table-column prop="cGDYX" align="center" label="压线" min-width="180px" sortable></el-table-column>
        <el-table-column prop="cYXLX" align="center" label="压线类型" min-width="100px" sortable></el-table-column>
        <el-table-column prop="cKHWLBM" align="center" label="客户物料编码" min-width="120px" sortable></el-table-column>
        <el-table-column prop="cCCBS" align="center" label="尺寸标识" min-width="100px" sortable></el-table-column>
        <el-table-column prop="nKunS" align="center" label="捆扎数" min-width="100px" sortable></el-table-column>
        <el-table-column prop="cDBFS" align="center" label="打包方式" min-width="100px" sortable></el-table-column>
        <el-table-column prop="cYSMC" align="center" label="印色名称" min-width="100px" sortable></el-table-column>
        <!-- <el-table-column prop="cURL" align="center" label="图片路径" min-width="100px" sortable></el-table-column> -->
        <el-table-column fixed="right" align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="delete (scope.$index, scope.row)" size="mini" type="primary" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="paginationClass">
        <el-pagination
          @size-change="ZXhandleSizeChange"
          @current-change="ZXhandleCurrentChange"
          :current-page="ZXcurrentPage1"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ZXrawList.length"
        ></el-pagination>
      </div>
    </div>
    <!-- 双击表格行弹框 -->
    <el-dialog title="图稿上传" :visible.sync="dialogVisible" width="30%">
      <el-upload class="upload-demo" :data="uploadData" drag action="123" headers="headers" :limit="1" :before-upload="beforeAvatarUpload" on-success="uploadSuccess">
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
        cpmc: ''
      },
      tableData: [],
      ZXtableData: [], //纸箱
      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      ZXrawList: [],
      ZXcurrentPage1: 1,
      ZXpageSize: 10,
      searchNumber: 0,
      tableList: [],
      value: '',
      dialogVisible: false, //图稿上传弹框
      uploadData: [], //上传文件时存储其他需要提交给后台的数据
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      radio: '纸板',
      qybh: ''
    };
  },
  created() {
    this.gettableData();
    this.getZXtableData();
  },
  methods: {
    gettableData() {
      //获取纸板表格数据
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      var CQYLX = storage.getItem('CQYLX');
      this.qybh = qybh;

      // if(CQYLX.equals('二级厂') ){
      if (CQYLX == '二级厂') {
        this.axios
          .post('/ProductController/queryProductFileByPaperBoard', { gysbh: qybh })
          .then(response => {
            console.log(response);

            if (response.data.status === '1') {
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
            console.log('this.tableData====>' + JSON.stringify(this.tableData));
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
            console.log(response);
            if (response.data.status === '1') {
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
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    search() {
      //查询方法

      // this.searchNumber += 1;
      // if (this.form.ProductName == null || this.form.ProductName == '') {
      //   //查询为空时默认显示全部数据
      //   this.gettableData();
      // } else {
      //   if (this.searchNumber <= 1) {
      //     this.currentPage1 = 1;
      //     // es6过滤得到满足搜索条件的展示数据list
      //     try {
      //       let list = this.rawList.filter((item, index) => item.RecipeName.includes(this.form.ProductName));
      //       this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
      //       this.rawList = this.tableData;
      //     } catch (error) {
      //       this.tableData = [];
      //       this.rawList = [];
      //     }
      //   } else {
      //     try {
      //       this.rawList = this.tableList;
      //       let list = this.rawList.filter((item, index) => item.RecipeName.includes(this.form.ProductName));
      //       this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
      //       this.rawList = this.tableData;
      //     } catch (error) {
      //       this.tableData = [];
      //       this.rawList = [];
      //     }
      //   }
      // }
    },
    searchZB(){
      this.axios
        .post('/ProductController/queryProductFileByPaperBoard', { qybh: this.qybh })
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.productList;
            this.rawList = response.data.productList;
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
    searchZX(){

    },

    getZXtableData() {
      //获取纸板表格数据
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.qybh = qybh;
      this.axios
        .post('/ProductController/queryProductFile', JSON.stringify({ qybh: qybh }))
        .then(response => {
          console.log(response);
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
    ZXhandleSizeChange: function(pageSize) {
      // 每页条数切换
      this.ZXpageSize = pageSize;
      this.ZXhandleCurrentChange(this.ZXcurrentPage1);
    },
    ZXhandleCurrentChange: function(currentPage) {
      //页码切换
      // this.currentRow = val;
      this.ZXcurrentPage1 = currentPage;
      this.ZXcurrentChangePage(this.ZXrawList, currentPage);
    },
    ZXcurrentChangePage(list, currentPage) {
      //分页方法
      let from = (currentPage - 1) * this.ZXpageSize;
      let to = currentPage * this.ZXpageSize;
      this.ZXtableData = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.ZXtableData.push(list[from]);
        }
      }
      console.log('biaoge========' + this.ZXtableData);
    },
    update(value) {
      //双击表格行弹框事件
      // this.showEdit = true;
      // this.ZXTitle="纸箱采购单修改"
      // console.log(value)
      //弹窗赋值
    },
    onSubmit() {
      //提交产品修改
      this.$ajax
        .post('https://api.xuliangzhan.com:10443/api/user/import', this.ProductInfo)
        .then(data => {
          this.showEdit = false;
          // this.$message(showClose: true,
          // type: 'success',
          // message: '保存成功')
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'error',
            message: 'Ajax error,'
          });
        });
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

<style>
.cell-grey {
  background: #f2f2f2;
}
.paginationClass {
  margin: auto;
  width: 50%;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>

<template>
  <!-- 纸箱产品档案管理界面 -->
  <div>
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-form-item label="产品名称">
<!--        @select="handleSelect"-->
        <el-autocomplete v-model="form.cCPMC" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"></el-autocomplete>
        <!-- <el-input v-model="form.cCPMC" placeholder="请输入内容" style="width: 200px;"></el-input> -->
        <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>

        <!-- <el-button type="primary" style="margin-left: 10px;" @click="add" size="small">新增</el-button> -->
      </el-form-item>
    </el-form>
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
      v-loading="listLoading"
      element-loading-text="努力加载中..."
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
          <el-button type="primary" style="margin-left: 10px;" @click="Upload(scope.$index, scope.row)" size="small">上传</el-button>
          <!-- <el-button @click="delete (scope.$index, scope.row)" size="mini" type="primary" plain>删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; ">
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
      <el-upload class="upload-demo"  drag action="http://192.168.100.78:8080/ProductController/uploadImage"  :http-request="upload"
       :limit="1" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">上传文件不能超过10MB</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <!--<el-button v-on:click="dialogVisible = false">取 消</el-button>-->
        <el-button type="primary" v-on:click="dialogVisible = false" >确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="图稿上传" :visible.sync="dialogVisible" width="400px">
      <el-upload class="upload-demo" :data="uploadData" drag action="123" :limit="1" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">上传文件不能超过10MB</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-on:click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  data() {
    return {
      form: {
        cCPMC: ''
      },
      ZXtableData: [], //纸箱
      listLoading: false,
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
      uploadData: {}, //上传文件时存储其他需要提交给后台的数据
      radio: '纸板',
      qybh: ''
    };
  },
  created() {
    this.getZXtableData();
  },
  methods: {
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    querySearchAsync(queryString, callback) {
      var list = [{}];
      //调用的后台接口
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.axios
        .post('/ProductController/queryProductFile', JSON.stringify({ qybh: qybh, cpmc: this.form.cCPMC }))
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
            for (let i of response.data.data.productList) {
              i.value = i.cCPMC; //将想要展示的数据作为value
            }
            list = response.data.data.productList;
            callback(list);
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
    handleSelect(item) {
      this.axios
        .post('/ProductController/queryProductFileNoTree', { qybh: this.qybh, cpmc: item })
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
    search() {
      //查询方法
      this.axios
        .post('/ProductController/queryProductFileNoTree', JSON.stringify({ qybh: this.qybh, cpmc: this.form.cCPMC }))
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
    getZXtableData() {
      //获取纸板表格数据
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.qybh = qybh;
      this.listLoading = true;
      this.axios
        .post('/ProductController/queryProductFile', JSON.stringify({ qybh: qybh }))
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            this.ZXtableData = response.data.data.productList;
            this.ZXrawList = response.data.data.productList;
            this.ZXcurrentChangePage(this.ZXrawList, 1);
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
    Upload(index, row) {
      //打开上传图稿界面
      this.dialogVisible = true;
      this.uploadData = row.cCPBH;
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
     return   isLt2M
   },
   upload(f){
     let param = new FormData(); //创建form对象
     console.log(f)
     param.append('file',f.file)
     param.append('filename', f.file.name); //通过append向form对象添加数据
     param.append('cpbh', this.uploadData.cCPBH);
     this.axios
       .post(
         '/ProductController/uploadImage',param
         ,{headers: {
             'Content-Type': 'multipart/form-data'
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
         }else{
           this.$message({
             showClose: true,
             type: 'success',
             message: "上传成功"
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
    uploadSuccess(response, file) {
      //上传成功处理
      // if (response.data.status === '1') {
      //   this.$notify({
      //     title: '成功',
      //     message: '上传成功',
      //     type: 'success',
      //     duration: 2000
      //   });
      // } else {
      //   //上传失败处理
      //   this.$notify.error({
      //     title: '失败',
      //     message: response.data.msg,
      //     duration: 3000
      //   });
      // }
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
  width: 35%;
}
</style>

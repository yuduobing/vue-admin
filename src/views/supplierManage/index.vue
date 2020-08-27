<template>
  <!-- 供应商管理界面 -->
  <div>
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-form-item label="企业名称">
        <!-- <el-input v-model="form.input" placeholder="请输入内容" style="width: 200px;"></el-input> -->
        <el-autocomplete v-model="form.qymc" :fetch-suggestions="querySearchAsync" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
        <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>
<!--        <el-button type="primary" style="margin-left: 10px;" @click="addSupplier" size="small">新增</el-button>-->
      </el-form-item>
    </el-form>
    <el-table ref="singleTable" :data="tableData" border style="width: 95%;margin:10px 40px 0px 40px" max-height="80%" highlight-current-row align="center">
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>

      <el-table-column prop="qybh" align="center" label="企业编号" min-width="60px" sortable></el-table-column>
      <el-table-column prop="qymc" align="center" label="企业名称" min-width="100px" sortable></el-table-column>
      <el-table-column prop="cNiCheng" align="center" label="简称" min-width="60px" sortable></el-table-column>
      <el-table-column prop="cDiZ " align="center" label="地址" min-width="180px" sortable></el-table-column>
      <!-- <el-table-column prop="cGYSBH" align="center" label="供应商编号" min-width="100px" sortable></el-table-column> -->
      <el-table-column prop="CCHECK_ERP" align="center" label="是否绑定erp" min-width="60px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.CCHECK_ERP === '1'" style="color: red">是</span>
          <span v-else-if="scope.row.CCHECK_ERP === '0'">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="lTYBZ" align="center" label="停用" min-width="60px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.lTYBZ === true" style="color: red">已停用</span>
          <span v-else-if="scope.row.lTYBZ === false">已启用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="EnterCode" align="center" label="输入码" min-width="70px" sortable></el-table-column>
      <el-table-column prop="SupplierName" align="center" label="供应商名称" min-width="200px" sortable></el-table-column>
      <el-table-column prop="Postcode" align="center" label="邮编" min-width="60px" ></el-table-column>
      <el-table-column prop="Grade" align="center" label="供应商等级" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Check" align="center" label="审核" min-width="60px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.Check === 1" >已审核</span>
          <span v-else-if="scope.row.Check === 0" style="color: red">未审核</span>
        </template>
      </el-table-column> -->

      <el-table-column fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button @click="update(scope.$index, scope.row)" size="mini" type="primary" plain>修改</el-button> -->
          <el-button @click="Deactivate(scope.$index, scope.row)" v-show="scope.row.lTYBZ == false"
          size="mini" type="danger" plain>停用</el-button>
          <el-button @click="Enable(scope.$index, scope.row)" v-show="scope.row.lTYBZ == true"
          size="mini" type="primary" plain>启用</el-button>
          <!-- <el-button @click="delete(scope.$index, scope.row)" size="mini" type="primary" plain>删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; ">
    <div class="paginationClass">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rawList.length"
      ></el-pagination>
    </div>
    </div>
    <el-dialog title="新增供应商" :visible.sync="dialogVisible" width="420px">
      <el-form ref="form" :model="addForm" label-width="120px">
        <el-form-item label="供应商名称:">
          <el-select v-model="addForm.supplier" filterable multiple placeholder="请选择供应商" style="width: 250px;">
            <el-option v-for="item in addForm.suppliers" :key="item.QYMC" :label="item.QYMC" :value="item.QYMC">
              <span style="float: left">{{ item.QYMC }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-on:click="dialogVisible = false" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="修改供应商" :visible.sync="dialogVisible" width="420px">
      <el-form ref="form" :model="addForm" label-width="120px">
        <el-form-item label="供应商名称:">
          <el-select v-model="addForm.supplier" filterable multiple placeholder="请选择供应商" style="width: 250px;">
            <el-option v-for="item in addForm.suppliers" :key="item.QYMC" :label="item.QYMC" :value="item.QYMC">
              <span style="float: left">{{ item.QYMC }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-on:click="dialogVisible = false" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog> -->
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
        qymc: ''
      },
      tableData: [],
      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: [],
      GYSList: [],
      dialogVisible: false, //供应商信息新增弹框
      addForm: {
        supplier: [], //选中供应商
        suppliers: [] //供应商下拉框options
      },
      qybh:''
    };
  },
  mounted() {
    var storage = window.sessionStorage;
    this.qybh = storage.getItem('QYBH');
    this.gettableData();
  },
  methods: {
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    querySearchAsync(queryString, callback) {
      var qymc = this.GYSList;
      var results = queryString ? qymc.filter(this.createStateFilter(queryString)) : qymc;
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
    //输入框选中执行事件
    handleSelect(item) {
      this.search();
    },
    gettableData() {
      var list = [{}];
      //获取表格数据
      this.$store
        .dispatch('supplier/getTable')
        .then(res => {
          this.tableData = res.supplier;
          this.rawList = res.supplier;
          this.tableList = res.supplier;
          this.currentChangePage(this.rawList, 1);
          for (let i of res.supplier) {
            i.value = i.qymc; //将想要展示的数据作为value
          }
          list = res.supplier;
          this.GYSList = list;
        })
        .catch(() => {});
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
      this.searchNumber += 1;
      if (this.form.qymc == null || this.form.qymc == '') {
        //查询为空时默认显示全部数据
        this.gettableData();
      } else {
        if (this.searchNumber <= 1) {
          this.currentPage1 = 1;
          // es6过滤得到满足搜索条件的展示数据list
          let list = this.rawList.filter((item, index) => item.qymc.includes(this.form.qymc));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        } else {
          this.rawList = this.tableList;
          let list = this.rawList.filter((item, index) => item.qymc.includes(this.form.qymc));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        }
      }
    },
    //新增按钮事件
    addSupplier() {
      // this.$router.push({
      //   path: '/addGYS'
      // });
      this.querySupplier(); //多选，获取供应商信息
      this.dialogVisible = true;
    },
    //保存新增供应商信息
    onSubmit() {
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.axios
        .post('/supplierController/querySupplier', { qybh: qybh, supplier: this.addForm.supplier })
        .then(response => {
          if (response.data.status === '1') {
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.message
            });
            this.gettableData(); //重新获取供应商信息
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
    },
    querySupplier() {
      var name = '';
      this.axios
        .post('/supplierController/querySupplier', { name: name })
        .then(response => {
          if (response.data.status === '1') {
            this.addForm.suppliers = response.data.data.supplier;
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
    Enable(index, row) {//启用供应商
      this.axios
        .post('/CustomerController/stopSupplier', { qybh: this.qybh,gysbh:row.qybh,lTYBZ:0 })
        .then(response => {
          if (response.data.status === '1') {
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.data
            });
            this.gettableData(); //重新获取供应商信息
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: response.data.error
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
    Deactivate(index, row) {//禁用供应商
      this.axios
        .post('/CustomerController/stopSupplier', { qybh: this.qybh,gysbh:row.qybh,lTYBZ:1 })
        .then(response => {
          if (response.data.status === '1') {
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.data
            });
            this.gettableData(); //重新获取供应商信息
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: response.data.error
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
    // update(index, row) {
    //   var storage = window.sessionStorage;
    //   var storageToString = JSON.stringify(row);
    //   // console.log("storageToString====="+storageToString);
    //   storage.setItem('data', storageToString);
    //   this.$router.push({
    //     path: '/updateGYS',
    //     query: {
    //       data: row
    //     }
    //   });
    // },
    // delete(index, row) {
    //   this.$notify({
    //     title: 'Success',
    //     message: '删除成功',
    //     type: 'success',
    //     duration: 2000
    //   });
    //   this.tableData.splice(index, 1);
    // },
  }
};
</script>

<style>
.cell-grey {
  background: #f2f2f2;
}
.paginationClass {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 35%;
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

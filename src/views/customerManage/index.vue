<template>
  <!-- 客户管理界面 -->
  <div >
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-form-item label="客户名称">
        <!-- <el-input v-model="form.input" placeholder="请输入内容" style="width: 200px;"></el-input> -->
        <el-autocomplete v-model="form.cQYMC" :fetch-suggestions="querySearchAsync" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
        <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="singleTable" :data="tableData" border style="width: 95%;margin:10px 40px 0px 40px" max-height="80%"
    v-loading="listLoading" element-loading-text = "努力加载中..." highlight-current-row align="center">
      <!-- @row-dblclick="update" -->
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="cQYMC" align="center" label="客户企业名称" min-width="180px"></el-table-column>
      <!-- <el-table-column prop="KhName" align="center" label="客户名称" min-width="100px"></el-table-column> -->
      <el-table-column prop="cNiCheng" align="center" label="简称" min-width="60px"></el-table-column>
      <el-table-column prop="cDLH" align="center" label="账号" min-width="70px"></el-table-column>
      <el-table-column prop="cQYDZ" align="center" label="客户地址" min-width="200px"></el-table-column>
      <el-table-column prop="cSCHY" align="center" label="生厂行业" min-width="80px"></el-table-column>
      <el-table-column prop="lTYBZ" align="center" label="停用" min-width="60px">
        <template slot-scope="scope">
          <span v-if="scope.row.lTYBZ === true" style="color: red">已停用</span>
          <span v-else-if="scope.row.lTYBZ === false">已启用</span>
        </template>
      </el-table-column>
      <el-table-column prop="CCHECK_ERP" align="center" label="绑定ERP" min-width="80px">
        <template slot-scope="scope">
          <span v-if="scope.row.CCHECK_ERP == '1'">已绑定</span>
          <span v-else-if="scope.row.CCHECK_ERP == '0'" style="color: red">未绑定</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index, scope.row)" size="mini" type="primary" plain>修改</el-button>
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

    <el-dialog title="客户信息修改" :visible.sync="dialogVisible" width="400px">
      <el-form ref="form" :model="updateForm" label-width="120px">
        <el-form-item label="客户企业名称"><el-input v-model="updateForm.cQYMC" :disabled="true"></el-input></el-form-item>
        <el-form-item label="停用">
          <el-switch
            style="display: block;padding-top: 6px;"
            v-model="updateForm.lTYBZ"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="停用"
            inactive-text="启用"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-on:click="dialogVisible = false" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Customer',
  data() {
    return {
      form: {
        cQYMC: ''
      },
      tableData: [],
      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: [],
      dialogVisible: false, //客户信息修改弹框
      updateForm: {
        cQYMC: '',
        lTYBZ: ''
      },
      KHList: []
    };
  },
  created() {
    this.gettableData();
  },
  methods: {
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    querySearchAsync(queryString, callback) {
      var cQYMC = this.KHList;
      var results = queryString ? cQYMC.filter(this.createStateFilter(queryString)) : cQYMC;
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
      this.search()
      // console.log(item)
      // var qybh=item.cQYBH
      // var storage = window.sessionStorage;
      // var supplierId = storage.getItem('QYBH');
      // this.axios
      //   .post('/supplierController/queryCustomerBySupplier', { supplierId: supplierId, cQYBH: qybh })
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status === '1') {
      //       this.tableData = response.data.Customer;
      //       this.rawList = response.data.data.Customer;
      //       this.currentChangePage(this.rawList, 1);
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
    gettableData() {//获取表格数据
      var list = [{}];
      this.listLoading=true
      this.$store
        .dispatch('customer/getTable')
        .then(res => {
          this.tableData = res.Customer;
          this.rawList = res.Customer;
          this.tableList= res.Customer;
          this.currentChangePage(this.rawList, 1);
          for (let i of res.Customer) {
            i.value = i.cQYMC; //将想要展示的数据作为value
          }
          list = res.Customer;
          this.KHList = list;
          this.listLoading=false
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
    search() {
      //查询方法
      this.searchNumber += 1;
      if (this.form.cQYMC == null || this.form.cQYMC == '') {
        //查询为空时默认显示全部数据
        this.gettableData();
      } else {
        if (this.searchNumber <= 1) {
          this.currentPage1 = 1;
          // es6过滤得到满足搜索条件的展示数据list
          let list = this.rawList.filter((item, index) => item.cQYMC.includes(this.form.cQYMC));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        } else {
          this.rawList = this.tableList;
          let list = this.rawList.filter((item, index) => item.cQYMC.includes(this.form.cQYMC));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        }
      }
    },
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    handleClick(index, row) {
      //打开客户信息修改弹窗
      this.updateForm.cQYMC = row.cQYMC;
      this.updateForm.cQYBH = row.cQYBH;
      if (row.lTYBZ == true) {
        this.updateForm.lTYBZ = 1;
      } else {
        this.updateForm.lTYBZ = 0;
      }
      this.dialogVisible = true;
      // this.$router.push({
      //   path: '/updateKh',
      //   query: {
      //     data: row
      //   }
      // });
    },
    onSubmit() {//客户信息修改
    var storage = window.sessionStorage; 
    var qybh = storage.getItem('QYBH');
      this.axios
        .post('/supplierController/updateCustomer', { tybz: this.updateForm.lTYBZ, qybh: this.updateForm.cQYBH,gysbh:qybh })
        .then(response => {
          console.log(response)
          if (response.data.status === '1') {
            this.gettableData();
            this.$message({
              showClose: true,
              type: 'success',
              message: response.data.data
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
            message: 'Ajax error'
          });
        });
    }
  }
};
</script>

<style>
.paginationClass {
  margin: auto;
  width: 50%;
  margin-top: 20px;
  margin-bottom: 50px;
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

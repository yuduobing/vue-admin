<template>
  <!-- 配方配料管理界面 -->
  <div>
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户名称">
            <el-select v-model="form.cqybh" filterable placeholder="请选择" style="width: 230px;">
              <el-option v-for="item in options" :key="item.cQYBH" :label="item.cQYMC" :value="item.cQYBH"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配方名称">
            <el-input v-model="form.pfmc" placeholder="请输入内容" @change="querySearchAsync" style="width: 200px;"></el-input>

            <!-- <el-autocomplete v-model="form.pfmc" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"></el-autocomplete> -->
            <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>
            <!-- <el-button type="primary" style="margin-left: 5%;" @click="add" size="medium">新增</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData"
      border
      style="width: 95%;margin:10px 40px 0px 40px"
      v-loading="listLoading"
      element-loading-text="努力加载中..."
      max-height="80%"
      highlight-current-row
      align="center"
    >
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <el-table-column prop="nPFBH" align="center" label="配方编号" min-width="80px" sortable></el-table-column>
      <el-table-column prop="pfmc" align="center" label="配方名称" min-width="100px" sortable></el-table-column>
      <el-table-column prop="cLXMC" align="center" label="楞型" min-width="60px" sortable></el-table-column>
      <!-- <el-table-column prop="RecipeDetails" align="center" label="配方明细" min-width="100px" sortable></el-table-column> -->
      <el-table-column prop="nPFZL" align="center" label="平方重量" min-width="100px" sortable></el-table-column>
      <el-table-column prop="nPFDJ" align="center" label="纸板平方价" min-width="80px" sortable></el-table-column>
      <el-table-column prop="dQYRQ" align="center" label="启用日期" min-width="100px" :formatter="dateFormat" sortable></el-table-column>
      <!-- <el-table-column fixed="right" align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row)" size="mini" type="primary" plain>修改</el-button>
          <el-button @click="delete(scope.$index, scope.row)" size="mini" type="primary" plain>删除</el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
let moment = require('moment'); //调用时间过滤器
// 中文简体
moment.locale('zh-cn');
export default {
  name: 'Formula',
  data() {
    return {
      url: 'http:/192.168.100.78:8080',
      input: '',
      form: {
        pfmc: ''
      },
      tableData: [],
      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: [],
      timeout: null,
      options: [] //客户名称
    };
  },
  created() {
    this.gettableData();
    this.getKHMC();
  },
  methods: {
    dateFormat(value) {
      //时间格式转换
      // console.log(value);
      if (value.dQYRQ == undefined) {
        return '';
      } else {
        return moment(value.dQYRQ).format('YYYY-MM-DD');
      }
    },
    getKHMC() {
      //获取客户名称
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.axios
        .post('/supplierController/queryCustomerBySupplier', { supplierId: qybh })
        .then(response => {
          // console.log(response)
          if (response.data.status === '1') {
            this.options = response.data.data.Customer;
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
            message: 'Ajax error'
          });
        });
    },
    gettableData() {
      //获取表格数据
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.listLoading = true;
      this.axios
        .post('/FormulaController/queryStandardFormula', { qybh: qybh })
        .then(response => {
          // console.log(response);
          if (response.data.status === '1') {
            this.tableData = response.data.data;
            this.rawList = response.data.data;
            this.currentChangePage(this.rawList, 1);
            this.listLoading = false;
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
            message: 'Ajax error'
          });
        });
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
    // querySearchAsync(queryString, callback) {
    querySearchAsync(queryString) {
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      var list = [{}];
      this.axios
        .post('/FormulaController/queryStandardFormula', { qybh: qybh, pfmc: this.form.pfmc, cqybh: this.form.cqybh })
        .then(response => {
          // console.log(response);
          if (response.data.status === '1') {
            this.tableData = response.data.data;
            this.rawList = response.data.data;
            this.currentChangePage(this.rawList, 1);
            // for (let i of response.data.data) {
            //   i.value = i.pfmc; //将想要展示的数据作为value,输入框数据回显
            // }
            // list = response.data.data;
            // console.log(list);
            // callback(list);
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

      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 3000 * Math.random());
    },
    search() {
      //查询方法
      this.listLoading = true;
      var storage = window.sessionStorage;
      var qybh = storage.getItem('QYBH');
      this.axios
        .post('/FormulaController/queryStandardFormula', { qybh: qybh, pfmc: this.form.pfmc, khbh: this.form.cqybh })
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            this.tableData = response.data.data;
            this.rawList = response.data.data;
            this.currentChangePage(this.rawList, 1);
            this.listLoading = false;
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
    }
    // search(){//查询方法
    //   this.searchNumber +=1
    //   if(this.form.pfmc == null || this.form.pfmc == ''){//查询为空时默认显示全部数据
    //     this.gettableData();
    //   }else{
    //     if(this.searchNumber <=1){
    //       this.currentPage1 = 1
    //       // es6过滤得到满足搜索条件的展示数据list
    //       let list = this.rawList.filter((item, index) =>
    //           item.pfmc.includes(this.form.pfmc)
    //       )
    //       this.tableData = list.filter((item, index) =>
    //           index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1)
    //       )
    //       this.rawList = this.tableData;
    //     }else{
    //       this.rawList=this.tableList
    //       let list = this.rawList.filter((item, index) =>
    //           item.pfmc.includes(this.form.pfmc)
    //       )
    //       this.tableData = list.filter((item, index) =>
    //           index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1)
    //       )
    //       this.rawList = this.tableData;
    //     }
    //   }
    // },
    // update(index, row) {
    //   var storage = window.sessionStorage;
    //   var storageToString = JSON.stringify(row);
    //   // console.log("storageToString====="+storageToString);
    //   storage.setItem('data', storageToString);
    //   this.$router.push({
    //     path: '/updatePF',
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
    // add() {
    //   this.$router.push({
    //     path: '/addPF'
    //   });
    // }
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
  width: 50%;
}
</style>

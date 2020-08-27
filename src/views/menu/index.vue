<template>
  <!-- 菜单管理界面 -->
  <div>
    <el-form ref="form" label-width="120px" style="margin:30px 60px 0px 0px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.input" placeholder="请输入内容" style="width: 200px;"></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 95%;margin:10px 40px 0px 40px" highlight-current-row max-height="400" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="MenuID" align="center" label="菜单ID" min-width="40"></el-table-column>
      <el-table-column prop="ParentMenuID" align="center" label="父级菜单ID" min-width="40"></el-table-column>
      <el-table-column prop="ParentMenuName" align="center" label="父级菜单名称" min-width="160"></el-table-column>
      <el-table-column prop="MenuName" align="center" label="菜单名称" min-width="160"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index, scope.row)" size="mini" type="primary" plain>分配客户</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      url: '192.168.100.78:8080',
      input: '',
      form: {
        input: ''
      },
      tableData: [],
      multipleSelection: [],
      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: []
    };
  },
  created() {
    this.gettableData();
  },
  methods: {
    gettableData() {
      //获取表格数据
      this.$store
        .dispatch('menu/getTable')
        .then(res => {
          // this.tableData = res;
          this.rawList = res;
          this.tableList = res;
          this.currentChangePage(this.rawList, 1);
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
      if (this.form.input == null || this.form.input == '') {
        //查询为空时默认显示全部数据
        this.gettableData();
      } else {
        if (this.searchNumber <= 1) {
          this.currentPage1 = 1;
          // es6过滤得到满足搜索条件的展示数据list
          let list = this.rawList.filter((item, index) => item.MenuName.includes(this.form.input));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        } else {
          this.rawList = this.tableList;
          let list = this.rawList.filter((item, index) => item.MenuName.includes(this.form.input));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        }
      }
    },
    handleClick(index, row) {
      var storage = window.sessionStorage;
      var storageToString = JSON.stringify(row);
      // console.log("storageToString====="+storageToString);
      storage.setItem('menudata', storageToString);
      this.$router.replace({
        path: '/menuAuthority',
        query: {
          data: row,
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    }
  }
};
</script>

<style>
.paginationClass {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 35%;
}
</style>

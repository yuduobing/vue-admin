<template>
  <div>
    <el-form ref="form" label-width="80px" style="margin:30px 60px 0px 10px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="菜单名称:"><el-input v-model="form.MenuName" placeholder="请输入内容" :disabled="true" style="width: 90%;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称:">
            <el-input v-model="form.KhName" placeholder="请输入客户名称" style="width: 200px;"></el-input>
            <el-button type="primary" size="medium" @click="search" style="margin-left: 5%;">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="13" style="height: 30px;">
          <el-form-item label="所有客户:">
          </el-form-item>
        </el-col>
        <el-col :span="6" style="height: 30px;">
          <el-form-item label="已选客户:" style="margin-left: 20px;">
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin-left: 20px;margin-right: 20px;height: 460px;">
      <el-col :span="11">
        <el-table :data="tableData" border ref="selection" v-loading="listLoading" highlight-current-row @selection-change="checkAll" style="width: 100%">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="KhCompanyName" label="客户企业名称" width="100"></el-table-column>
          <el-table-column prop="KhName" label="客户名称" width="100"></el-table-column>
          <el-table-column prop="KhAddress" label="客户地址"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rawList.length"
        ></el-pagination>
      </el-col>
      <el-col :span="2">
        <div class="opSetting">
          <div @click="handelSelect">
            <el-button icon="el-icon-d-arrow-right" :disabled="nowSelectData.length ? false : true" :size="buttonSize" type="primary">选中</el-button>
          </div>
          <div class="spacing" @click="handleRemoveSelect">
            <el-button icon="el-icon-d-arrow-left" :disabled="nowSelectRightData.length ? false : true" :size="buttonSize" type="primary">取消</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="11">
        <el-table :data="selectArr" border ref="selection" @selection-change="checkRightAll" style="width: 100%">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="KhCompanyName" label="客户企业名称" width="100"></el-table-column>
          <el-table-column prop="KhName" label="客户名称" width="100"></el-table-column>
          <el-table-column prop="KhAddress" label="客户地址"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChangeRight"
          @current-change="handleCurrentChangeRight"
          :current-page="RightCurrentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="RightRawList.length"
        ></el-pagination>
      </el-col>
    </div>
    <div style="margin: auto; width: 50%;padding: 10px;">
      <el-button type="primary" :size="buttonSize" @click="onSubmit" style="margin-left: -20%;">保存</el-button>
      <el-button type="primary" :size="buttonSize" @click="cancel" style="margin-left: 20%;">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        MenuName: '',
        KhName: ''
      },
      selectArr: [], // 右边列表
      buttonSize: 'large',
      options: [],
      value: '',
      tableData: [],
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据

      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: [],
     //右侧表格
      RightListLoading: true,
      RightRawList: [],
      RightCurrentPage: 1,
      RightPageSize: 10,
      RightSearchNumber: 0,
      RightTableList: []
    };
  },
  created() {
    var data = JSON.parse(sessionStorage.getItem('menudata'));
    this.form = data;
    this.getList();
    this.getRightList();
  },
  methods: {
    //左边表格相关方法
    getList() {
      this.listLoading = true;
      this.$store
        .dispatch('menu/getMenuKh', this.form)
        .then(res => {
          // this.tableData = res;
          this.rawList = res;
          this.tableList = res;
          this.currentChangePage(this.rawList, 1);
          this.listLoading = false;
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
    //右边表格相关方法
    getRightList() {
      this.RightListLoading = true;
      this.$store
        .dispatch('menu/getMenuKh1', this.form)
        .then(res => {
          // this.tableData = res;
          this.RightRawList = res;
          this.tableList = res;
          this.currentChangePageRight(this.RightRawList, 1);
          this.RightListLoading = false;
        })
        .catch(() => {});
    },
    handleSizeChangeRight: function(pageSize) {
      // 每页条数切换
      this.RightPageSize = pageSize;
      this.handleCurrentChangeRight(this.RightCurrentPage);
    },
    handleCurrentChangeRight: function(currentPage) {
      //页码切换
      // this.currentRow = val;
      this.RightCurrentPage = currentPage;
      this.currentChangePageRight(this.RightRawList, currentPage);
    },
    currentChangePageRight(list, currentPage) {
      //分页方法
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.selectArr = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.selectArr.push(list[from]);
        }
      }
    },

    getList1() {
      //解决移除左边所有数据中在右边表格已有选中的数据，去掉已经选择的
      this.$store
        .dispatch('menu/getMenuKh', this.form)
        .then(res => {
          // this.tableData = res;
          this.rawList = res;
          this.tableList = res;
          this.currentChangePage(this.rawList, 1);
          this.handleRemoveTabList(this.selectArr, this.tableData);
          // this.listLoading= false
        })
        .catch(() => {});
    },
    search() {
      //查询方法
      this.searchNumber += 1;
      if (this.form.KhName == null || this.form.KhName == '') {
        //查询为空时默认显示全部数据
        this.getList1();
      } else {
        if (this.searchNumber <= 1) {
          this.currentPage1 = 1;
          // es6过滤得到满足搜索条件的展示数据list
          let list = this.rawList.filter((item, index) => item.KhName.includes(this.form.KhName));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        } else {
          this.rawList = this.tableList;
          let list = this.rawList.filter((item, index) => item.KhName.includes(this.form.KhName));
          this.tableData = list.filter((item, index) => index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1));
          this.rawList = this.tableData;
        }
      }
    },
    checkAll(val) {
      this.nowSelectData = val;
    },
    checkRightAll(val) {
      this.nowSelectRightData = val;
    },
    // 选中
    handelSelect() {
      if (this.selectArr.length < 10) {
        this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData);
      } else {
      }
      this.handleRemoveTabList(this.nowSelectData, this.tableData);
      this.handleRemoveTabList(this.selectArr, this.rawList); //控制左边表格总条数变化
      if (this.nowSelectData.length >= 10) {
        var currentPage1 = this.currentPage1;
        this.currentChangePage(this.rawList, currentPage1);
        this.tableData = this.rawList;
      }
      if (this.RightRawList.length + this.nowSelectData.length > 10) {
        var data = this.RightRawList;
        for (let i = 0; i < this.nowSelectData.length; i++) {
          data.push(this.nowSelectData[i]);
        }
        this.selectArr = data;
        this.RightRawList = this.selectArr;
        this.currentChangePageRight(this.selectArr, 1);
      } else {
        this.RightRawList = this.selectArr;
      }
      this.nowSelectData = [];
    },
    // 取消
    handleRemoveSelect() {
      if (this.tableData.length < 10) {
        this.tableData = this.handleConcatArr(this.tableData, this.nowSelectRightData);
      } else {
      }
      this.handleRemoveTabList(this.nowSelectRightData, this.selectArr);
      this.handleRemoveTabList(this.nowSelectRightData, this.RightRawList); //控制右边表格总条数变化
      if (this.rawList.length + this.nowSelectRightData.length > 10) {
        //解决右边取消的数据加上左边的数据超过十条，进行重组分页
        var data = this.rawList;
        for (let i = 0; i < this.nowSelectRightData.length; i++) {
          data.push(this.nowSelectRightData[i]);
        }
        this.tableData = data;
        this.rawList = this.tableData;
        this.currentChangePage(this.tableData, 1);
      } else {
        this.rawList = this.tableData;
      }
      this.nowSelectRightData = [];
    },
    handleConcatArr(selectArr, nowSelectData) {
      let arr = [];
      arr = arr.concat(selectArr, nowSelectData);
      return arr;
    },
    handleRemoveTabList(isNeedArr, originalArr) {
      if (isNeedArr.length && originalArr.length) {
        for (let i = 0; i < isNeedArr.length; i++) {
          for (let k = 0; k < originalArr.length; k++) {
            if (isNeedArr[i]['KhName'] === originalArr[k]['KhName']) {
              originalArr.splice(k, 1);
            }
          }
        }
      }
    },
    onSubmit() {
      this.$store
        .dispatch('customer/updateKh', this.form)
        .then(res => {
          console.log('请求成功');
        })
        .catch(() => {});
    },
    cancel() {
      sessionStorage.clear(); //清空所有缓存数据
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.replace({
        path: '/menu'
      });
    }
  }
};
</script>
<style>
.opSetting {
  text-align: center;
  margin-top: 30px;
}
.spacing {
  margin-top: 10px;
}
</style>

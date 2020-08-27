<template>
  <!-- 审核纸板采购单界面 -->
  <div>
    <el-form ref="form" :model="form" style="margin:10px 40px 0px 10px;line-height:5px" :disabled="true" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-radio-group v-model="radio" :disabled="true">
              <el-radio-button label="3">客户配方</el-radio-button>
              <el-radio-button label="6">标准配方</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item style="height:20px">
            <el-radio-group v-model="radio1" :disabled="true">
              <el-radio-button label="3">自动匹配</el-radio-button>
              <el-radio-button label="6">手动匹配</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同号:"><el-input v-model="form.chth" style="width: 180px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户订单号:"><el-input v-model="form.cddh" style="width: 215px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8" style="height:20px;">
          <el-form-item label="供应商:">
            <el-select v-model="form.cqybhGys" placeholder="请选择供应商" no-data-text="无供应商" style="width: 216px;">
              <el-option v-for="item in suppliers" :key="item.qymc" :label="item.qymc" :value="item.qybh"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="配方名称:"><el-input v-model="form.cPFMC" style="width: 180px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楞型:"><el-input v-model="form.clxmc" style="width: 215px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="压型:"><el-input v-model="form.cyxlx" style="width: 215px;"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="压线:"><el-input v-model="form.cgdyx" style="width: 180px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="板片长:"><el-input v-model="form.nbpc" style="width: 215px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="板片宽:"><el-input v-model="form.nbpk" style="width: 215px;"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="采购数量:"><el-input v-model="form.ncgsl" style="width: 180px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否通片:"><el-input v-model="form.csftp" style="width: 215px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="门幅(mm):"><el-input v-model="form.nmenf" style="width: 215px;"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="采购日期:"><el-date-picker v-model="form.dcgrq" type="date" placeholder="选择日期" style="width: 180px;"></el-date-picker></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到货日期:"><el-date-picker v-model="form.ddhrq" type="date" placeholder="选择日期" style="width:215px"></el-date-picker></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送货地址:">
            <el-select v-model="form.cshdz" filterable placeholder="请选择地址" no-data-text="无地址" style="width: 216px">
              <el-option v-for="item in addressOptions" :key="item.cDZ" :label="item.cDZ" :value="item.cQYBH"></el-option>
            </el-select>
            <el-button type="primary" @click="edit" size="medium">编辑</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="打包方式:"><el-input v-model="form.cdbfs" style="width: 180px;"></el-input></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位净积:"><el-input v-model="form.ndwmj" style="width: 215px;"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="送货备注:"><el-input v-model="form.cshbzsm" type="textarea" autosize style="width: 630px;"></el-input></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="特殊要求:"><el-input v-model="form.ctsyq" type="textarea" autosize style="width: 630px;"></el-input></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin: auto;width: 20%;">
      <!-- <el-button type="danger" @click="uncheck">审核不通过</el-button> -->
      <el-button type="success" @click="check">审核通过</el-button>
      <el-button type="primary" @click="cancel">返回</el-button>

    </div>
    <!-- 编辑地址弹框 -->
    <el-dialog title="注:无默认地址,则企业地址作为默认地址" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dialogForm" size="medium">
        <el-form-item label="企业地址:"><el-input v-model="dialogForm.qydz" placeholder="请输入企业地址" style="width: 200px;margin-left: 30px"></el-input></el-form-item>
        <vxe-table
          ref="xTable"
          border
          row-id="id"
          resizable
          :data="tableDataAddress"
          keep-source
          highlight-cell
          @radio-change="RadioChange"
          show-overflow
          :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }"
        >
          <vxe-table-column type="radio" title="默认地址" width="100"></vxe-table-column>
          <vxe-table-column field="DeliveryAddress" title="送货地址" :edit-render="{ name: 'input', attrs: { type: 'text' }, defaultValue: ' ' }"></vxe-table-column>
        </vxe-table>
        <vxe-button icon="fa fa-plus" @click="insertEvent(-1)">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeRadioRow()">删除选中</vxe-button>
        <vxe-button icon="fa fa-save" @click="getInsertEvent">保存</vxe-button>
      </el-form>
    </el-dialog>
    <!-- 编辑地址弹框 -->
    <!-- <vxe-grid
      ref="xGrid"
      class="mytable-scrollbar"
      v-bind="gridOptions"
      :data="tableData"
      :pager-config="tablePage"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{ trigger: 'click', mode: 'row', showStatus: true, showIcon: false }"
      @toolbar-button-click="toolbarButtonClickEvent"
    ></vxe-grid> -->
    <!-- :proxy-config="tableProxy" -->
  </div>
</template>

<script>
import { parseTime, formatTime, param2Obj } from '../../../utils/index.js';
let moment = require('moment'); //调用时间过滤器
// 中文简体
moment.locale('zh-cn');
export default {
  name: 'addPurchase',
  data() {
    return {
      radio: 3,
      options: [],
      value: '',
      tableDataAddress: [],
      editable: [],
      dialogVisible: false, //地址弹出框
      defaultID: '', //默认选中行id
      multipleTable: [],
      input: '',
      PFList: [],
      suppliers: '', //供应商选项
      addressOptions: '', //地址选项
      qybh: '', //企业编号
      form: {
        cshdz: '', //地址
        cqybhGys: '', //供应商
        ddhrq: '', //到货日期
        dcgrq: '', //采购日期
        chth: '', //合同号
        cddh: '', //客户订单号
        clxmc: '', //楞型
        cyxlx: '', //压型
        cPFMC: '', //配方名称
        cgdyx: '', //压线
        nbpc: '', //板片长
        nbpk: '', //板片宽
        ncgsl: '', //采购数量
        cdbfs: '', //打包方式
        cshbzsm: '', //送货备注
        ctsyq: '', //特殊要求
        csftp: '', //是否通片
        nmenf: '', //门幅
        ndwmj: '', //单位净积
        // Purchaser: '', //采购人
        // ProcurementUnit: '' ,//采购单位
        cCGDH: '' //采购单号
      },
      dialogForm: {
        qydz: ''
      },
      tableData: [{}],
      listLoading: true,
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      searchNumber: 0,
      tableList: [],
      gridOptions: {
        border: true,
        resizable: true,
        keepSource: true,
        height: 500,
        align: 'center',
        rowId: 'id',
        size: 'small',
        importConfig: {
          remote: true,
          importMethod: this.importMethod,
          types: ['xlsx'],
          modes: ['insert']
        },
        exportConfig: {
          remote: true,
          exportMethod: this.exportMethod,
          types: ['xlsx'],
          modes: ['current', 'selected', 'all']
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        }
      },
      tablePage: {
        perfect: true,
        pageSize: 10
      },
      proxyConfig: {
        seq: true, // 启用动态序号代理
        sort: true // 启用排序代理
      },
      tableProxy: {
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // page 对象： { pageSize, currentPage }
          // query: ({ page }) => {}
          // XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          // // body 对象： { removeRecords }
          // delete: ({ body }) => XEAjax.post('/api/user/save', body),
          // // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          // save: ({ body }) => {
          //   return new Promise(function(resolve, reject) {
          //     var a=this.form
          //     console.log(a)
          //     resolve();
          //   });
          // }
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'myInsert', name: '新增', status: 'perfect', icon: 'fa fa-plus vxe-primary-color' },
          { code: 'remove', name: '删除选中', status: 'perfect', icon: 'fa fa-trash-o vxe-danger-color' },
          { code: 'mySave', name: '保存', status: 'perfect', icon: 'fa fa-save vxe-success-color' }
        ],
        perfect: true,
        refresh: {
          icon: 'fa fa-refresh',
          iconLoading: 'fa fa-spinner fa-spin'
        },
        import: true,
        // export: true,//导出
        print: true,
        // zoom: {//全屏最大化
        //   iconIn: 'fa fa-arrows-alt',
        //   iconOut: 'fa fa-expand'
        // },
        custom: {
          icon: 'fa fa-cog'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', title: '序号', width: 60 },
        { field: 'chth', title: '合同号', width: 80, editRender: { name: 'input' } },
        { field: 'cddh', title: '客户订单号', width: 100, editRender: { name: 'input' } },
        { field: 'clxmc', title: '楞型', width: 60, editRender: { name: 'input' } },
        { field: 'cyxlx', title: '压型', width: 60, editRender: { name: 'input' } },
        // { field: 'RecipeName', title: '配方查找', width: 120, editRender: { name: 'input' } },
        {
          field: 'cPFMC',
          title: '配方名称',
          width: 160,
          editRender: {
            name: 'ElSelect',
            options: [],
            events: { change: this.ChangeEvent },
            props: { filterable: true, defaultFirstOption: true, noMatchText: '无配方名称！请重新输入！' }
          }
        },
        { field: 'cgdyx', title: '压线', width: 140, editRender: { name: 'input' } },
        { field: 'nbpc', title: '板片长', width: 80, editRender: { name: 'input' } },
        { field: 'nbpk', title: '板片宽', width: 80, editRender: { name: 'input' } },
        { field: 'ncgsl', title: '采购数量', width: 80, editRender: { name: 'input' } },
        { field: 'cdbfs', title: '打包方式', width: 80, editRender: { name: 'input' } },
        { field: 'cshbzsm', title: '送货备注', width: 150, showOverflow: true, editRender: { name: 'input' } },
        { field: 'ctsyq', title: '特殊要求', width: 150, showOverflow: true, editRender: { name: 'input' } },
        { field: 'csftp', title: '是否通片', width: 80, editRender: { name: '$switch', props: { onValue: '1', offValue: '0' } } },
        { field: 'nmenf', title: '门幅(mm)', width: 100, editRender: { name: 'input' } },
        // { field: 'ndwmj', title: '开数', width: 60, editRender: { name: 'input' } },
        // { field: 'SpareFlute', title: '备用楞型', width: 80, editRender: { name: 'input' } },
        { field: 'ndwmj', title: '单位净积', width: 80, editRender: { name: 'input' } }
      ]
    };
  },
  created() {
    var storage = window.sessionStorage;
    this.qybh = storage.getItem('QYBH');
    this.dialogForm.qydz = storage.getItem('qydz');
    var check = storage.getItem('checkData');
    this.setForm(check);
    // this.findPFList(); //配方名称赋值
    this.getSupplier();
    // this.getAddress();
  },
  watch: {},
  methods: {
    setForm(check) {
      check = JSON.parse(check);
      console.log(check);
      this.form.cqybhGys = check.cQYMC;
      this.form.ddhrq = moment(check.dJHRQ).format('YYYY-MM-DD');
      this.form.dcgrq = moment(check.dCGRQ).format('YYYY-MM-DD');
      this.form.cshdz = check.cSHDZ;
      this.form.chth = check.cHTH;
      this.form.cddh = check.cDDH;
      this.form.cPFMC = check.cPFMC;
      this.form.cCGDH = check.cCGDH;
      this.form.clxmc = check.cLXMC;
      this.form.cyxlx = check.cYXLX;
      this.form.cgdyx = check.cGDYX;
      this.form.nbpc = check.nBPC;
      this.form.nbpk = check.nBPK;
      this.form.ncgsl = check.ncgsl;
      this.form.csftp = check.cSFTP;
      this.form.nmenf = check.NMENF;
      this.form.cdbfs = check.cdbfs;
      this.form.ndwmj = check.nDWMJ;
      this.form.cshbzsm = check.cSHBZSM;
      this.form.ctsyq = check.cTSYQ;
    },
    uncheck() {
      //审核不通过
      this.axios
        .post('/PaperBoardController/verifyPaper', {qybh: this.qybh, cgdh: this.form.cCGDH})
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            this.$message({
              showClose: true,
              type: 'succcess',
              message: response.data.data
            });
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: response.data.erroe.message
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
    check() {
      //审核通过
      this.axios
        .post('/PaperBoardController/verifyPaper', {qybh: this.qybh, cgdh: this.form.cCGDH})
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
            this.$router.push(       { path: '/ZBPurchase'})
            this.$message({
              showClose: true,
              type: 'succcess',
              message: response.data.data
            });
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: response.data.erroe.message
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
    findPFList() {
      this.axios
        .post('/FormulaController/queryCustomerFormula', {qybh: this.qybh})
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            var list = response.data.data.formula;
            if (list.length != 0) {
              for (let i of list) {
                i.label = i.pfmc;
                i.value = i.nPFBH;
              }
              this.tableColumn[6].editRender.options = list;
            }
            this.tableColumn[6].editRender.options = [{label: 1, value: 1}];
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
    ChangeEvent({column, $rowIndex, row}) {
      //楞型赋值
      // console.log(`${column.title} 触发 change 事件`);
      // console.log($rowIndex);
      // console.log(row.cPFMC);
      // this.axios
      //   .post('/FormulaController/queryCustomerFormula', { qybh: this.qybh,pfbh:row.cPFMC })
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status === '1') {
      //       var list = response.data.data.formula;
      //       // var lx =list[0].clxmc
      //       var lx =2
      //        console.log(this.tableData)
      //        this.tableData[$rowIndex].clxmc=333
      //        // this.xGrid.refreshColumn()
      //        // this.$refs.xGrid.setup.toolbar.refresh()
      //        console.log(this.tableData)
      //       // console.log(this.tableColumn[4])
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         type: 'error',
      //         message: response.message
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
    getAddress() {
      this.$ajax
        .post('/PaperBoardController/queryAddress', {qybh: this.qybh})
        .then(response => {
          console.log(response);
          if (response.status == 1) {
            this.addressOptions = response.data.address;
            for (var i = 0; i < this.addressOptions.length; i++) {
              if (this.addressOptions[i].cMR == '1') {
                this.form.cshdz = this.addressOptions[i].cDZ;
              }
            }
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
    getSupplier() {
      this.$store
        .dispatch('supplier/getTable')
        .then(res => {
          this.suppliers = res.supplier;
        })
        .catch(() => {
        });
    },
    gettableData() {
      //获取表格数据
      this.$store
        .dispatch('supplier/getTable')
        .then(res => {
          // this.tableData = res;
          this.rawList = res;
          this.tableList = res;
          this.currentChangePage(this.rawList, 1);
        })
        .catch(() => {
        });
    },
    handleSizeChange: function (pageSize) {
      // 每页条数切换
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage1);
    },
    handleCurrentChange: function (currentPage) {
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
    cellClass(row) {
      console.log(row);
      if (row.columnIndex === 0) {
        return 'DisableSelection';
      }
    },
    transfer() {
      //调用采购单号
    },
    clearDataEvent() {
      this.tableData = [];
    },
    saveEvent() {
      let {tableData} = this.$refs.singleTable.getTableData();
      console.log(JSON.stringify({tableData}));
    },
    async insertEvent(row) {
      let record = {
        DeliveryAddress: ''
      };
      this.$refs.xTable.insertAt(record, row).then(({row}) => this.$refs.xTable.setActiveCell(row, 'DeliveryAddress'));
    },
    //地址弹窗
    edit() {
      this.dialogVisible = true;
      clearTimeout(this.timeout);

      for (let i of this.addressOptions) {
        i.DeliveryAddress = i.cDZ;
        i.default = i.cMR;
      }
      console.log(this.addressOptions);
      this.tableDataAddress = this.addressOptions;
      this.timeout = setTimeout(() => {
        var address = this.addressOptions;
        for (var i = 0; i < address.length; i++) {
          if (address[i].default == '1' || address[i].default == 1) {
            this.$refs.xTable.setRadioRow(this.tableDataAddress[i]);
          }
        }
      }, 300 * Math.random());
    },
    RadioChange(row, rowIndex) {
      var rowdata = row.row;
      rowdata.default = 1;
      this.defaultID = rowdata.id;
      var tableData = this.$refs.xTable.getTableData().tableData;
      for (var i = 0; i < tableData.length; i++) {
        if (tableData[i].id != this.defaultID) {
          tableData[i].default = 0;
        }
      }
    },
    //保存地址
    getInsertEvent() {
      let {tableData} = this.$refs.xTable.getTableData();
      var record = this.$refs.xTable.getRecordset();
      var add = record.insertRecords;
      var update = record.updateRecords;
      var deletedata = record.removeRecords;
      for (var i = 0; i < add.length; i++) {
        add[i].qybh = this.qybh;
        if (add[i].default == undefined) {
          console.log(1);
          add[i].default = 0;
        }
      }
      for (var i = 0; i < update.length; i++) {
        update[i].qybh = this.qybh;
      }
      for (var i = 0; i < deletedata.length; i++) {
        deletedata[i].qybh = this.qybh;
      }
      this.axios
        .post('/PaperBoardController/modifyAddress', {add: add, update: update, del: deletedata})
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
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
    },
    toolbarButtonClickEvent({code}) {
      switch (code) {
        case 'myInsert':
          var row = -1;
          let record = {
            chth: ''
          };
          this.$refs.xGrid.insertAt(record, row).then(({row}) => this.$refs.xGrid.setActiveCell(row, 'chth'));
          break;
        case 'mySave':
          // const { insertRecords } = this.$refs.xGrid.getRecordset();
          var insertRecords = this.tableData;
          this.form.ddhrq = moment(this.form.ddhrq).format('YYYY-MM-DD');
          this.form.dcgrq = moment(this.form.dcgrq).format('YYYY-MM-DD');
          for (var i = 0; i < insertRecords.length; i++) {
            insertRecords[i].cqybh = this.qybh;
            insertRecords[i].ddhrq = this.form.ddhrq;
            insertRecords[i].dcgrq = this.form.dcgrq;
            insertRecords[i].cqybhGys = this.form.cqybhGys;
            insertRecords[i].cshdz = this.form.cshdz;
          }
          this.axios
            .post('/PaperBoardController/paperBoardBilling', {table: insertRecords})
            .then(response => {
              console.log(response);
              if (response.data.status === '1') {
                this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
                this.$router.push({
                  path: '/ZBPurchase'
                })
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
          break;
      }
    },

  // importMethod({ file }) {
  //   const formBody = new FormData();
  //   formBody.append('file', file);
  //   return this.$ajax.post('https://api.xuliangzhan.com:10443/api/user/import', formBody)
  //     .then(data => {
  //       this.$XModal.message({ message: `成功导入 ${data.result.insertRows} 条记录！`, status: 'success' });
  //       // 导入完成，刷新表格
  //       this.$refs.xGrid.commitProxy('query');
  //     })
  //     .catch(() => {
  //       this.$XModal.message({ message: '导入失败，请检查数据是否正确！', status: 'error' });
  //     });
  // },
  // exportMethod({ options }) {
  //   const proxyInfo = this.$refs.xGrid.getProxyInfo();
  //   const body = {
  //     filename: options.filename,
  //     sheetName: options.sheetName,
  //     isHeader: options.isHeader,
  //     original: options.original,
  //     mode: options.mode,
  //     pager: proxyInfo.pager,
  //     ids: options.mode === 'selected' ? options.data.map(item => item.id) : [],
  //     fields: options.columns.map(column => {
  //       return {
  //         field: column.property,
  //         title: column.title
  //       };
  //     })
  //   };
  //   // 开始服务端导出
  //   return XEAjax.post('https://api.xuliangzhan.com:10443/api/user/export', body)
  //     .then(data => {
  //       if (data.id) {
  //         this.$XModal.message({ message: '导出成功，开始下载', status: 'success' });
  //         // 读取路径，请求文件流 => 开始下载
  //         location.href = `https://api.xuliangzhan.com:10443/api/download/${data.id}`;
  //       }
  //     })
  //     .catch(() => {
  //       this.$XModal.message({ message: '导出失败！', status: 'error' });
  //     });
  // },

  cancel() {
    this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
    this.$router.push({
      path: '/ZBPurchase'
    })
  }
}
};
</script>

<style>
.my_table_status .vxe-body--row.is--new {
  background-color: #f1fdf1;
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

.paginationClass {
  margin-top: 5px;
  margin-right: 40px;
  float: right;
}
.vxe-button.type--button.theme--my-purple,
.vxe-button.type--button.theme--my-purple:hover {
  color: #fff;
}
.vxe-button.type--button.theme--my-purple {
  background-color: #800080;
}
.vxe-button.type--button.theme--my-purple:active {
  background-color: #a50aa5;
}
.my-green {
  color: #008000;
}

/*滚动条整体部分*/
.mytable-scrollbar div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar div::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar div::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar div::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar div::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar div::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>

<template>
  <!-- 新增纸板采购单界面 -->
  <div>
    <el-form :model="form" ref="form" style="margin:10px 40px 0px 10px;line-height:5px">
      <el-row>
        <el-col :span="7">
          <el-form-item style="height:20px">
            <el-radio-group :disabled="true" v-model="radio">
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
        <el-col :span="9" style="height:20px;">
          <el-form-item label="供应商:">
            <el-select @change="change(form.cqybhGys)" no-data-text="无供应商" placeholder="请选择供应商" style="width: 63%;margin-left:2px;"
                       v-model="form.cqybhGys">
              <el-option :key="item.qymc" :label="item.qymc" :value="item.qybh" v-for="item in suppliers"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="到货日期:" style="height:20px">
            <el-date-picker placeholder="选择日期" style="width:180px;margin-left: 27px;" type="date"
                            v-model="form.ddhrq"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址:" style="height:20px">
            <el-select filterable no-data-text="无地址" placeholder="请选择地址" style="width: 70%;margin-left: 15px;"
                       v-model="form.cshdz">
              <el-option :key="item.cDZ" :label="item.cDZ" :value="item.cQYBH"
                         v-for="item in addressOptions"></el-option>
            </el-select>
            <el-button @click="edit" size="medium" type="primary">编辑</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="采购日期:" style="height:20px">
            <el-date-picker placeholder="选择日期" style="width: 180px;margin-left: 27px;" type="date"
                            v-model="form.dcgrq"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="采购人:" style="height:20px">
            <el-input v-model="form.Purchaser" placeholder="请输入采购人" style="width: 60%;margin-left: 2px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购单位:" style="height:20px"><el-input v-model="form.ProcurementUnit" placeholder="请输入采购单位" style="width: 70%;"></el-input></el-form-item>
        </el-col> -->
      </el-row>
      <!-- <el-row>
        <el-col :span="6">
          <el-form-item label="调用采购单号:" style="height:20px">
            <el-input v-model="form.RecipeDetails" placeholder="请输入采购单号" style="width: 180px;"></el-input></el-form-item>
        </el-col>
        <el-button type="primary" @click="transfer" size="medium">调用</el-button>
        <el-button type="success" @click="save" size="medium">保存</el-button>
        <el-button type="info" @click="transfer" size="medium">导入说明</el-button>
        <el-button  @click="transfer" size="medium">退出</el-button>
      </el-row> -->
    </el-form>
    <!-- 编辑地址弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="注:无默认地址,则企业地址作为默认地址" width="40%">
      <el-form ref="dialogForm" size="medium">
        <el-form-item label="企业地址:">
          <el-input placeholder="请输入企业地址" style="width: 200px;margin-left: 30px" v-model="dialogForm.qydz"></el-input>
        </el-form-item>
        <vxe-table
          :data="tableDataAddress"
          :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }"
          @radio-change="RadioChange"
          border
          highlight-cell
          keep-source
          ref="xTable"

          resizable
          row-id="id"
          show-overflow
        >
          <vxe-table-column title="默认地址" type="radio" width="100"></vxe-table-column>
          <vxe-table-column :edit-render="{ name: 'input', attrs: { type: 'text' }, defaultValue: ' ' }" field="DeliveryAddress"
                            title="送货地址"></vxe-table-column>
        </vxe-table>
        <vxe-button @click="insertEvent(-1)" icon="fa fa-plus">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeRadioRow()">删除选中</vxe-button>
        <vxe-button @click="getInsertEvent" icon="fa fa-save">保存</vxe-button>
      </el-form>
    </el-dialog>
    <!-- 编辑地址弹框 -->

    <vxe-grid
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{ trigger: 'click', mode: 'row', showStatus: true, showIcon: false }"
      :pager-config="tablePage"
      :toolbar="tableToolbar"
      @toolbar-button-click="toolbarButtonClickEvent"
      class="mytable-scrollbar"
      ref="xGrid"
      v-bind="gridOptions"
    ></vxe-grid>
    <!-- :proxy-config="tableProxy" -->
  </div>
</template>

<script>
  let moment = require('moment'); //调用时间过滤器
  // 中文简体
  moment.locale('zh-cn');
  export default {
    name: 'addPurchase',
    data() {
      return {
        cyxlx1:'',
        radio: 3,
        options: [],
        tableDataAddress: [],
        editable: [],
        dialogVisible: false, //地址弹出框
        defaultID: '', //默认选中行id
        multipleTable: [],
        PFList: [],
        suppliers: '', //供应商选项
        addressOptions: '', //地址选项
        qybh: '', //企业编号
        form: {
          cshdz: '', //地址
          cqybhGys: '', //供应商
          ddhrq: '', //到货日期
          dcgrq: '', //采购日期
          Purchaser: '', //采购人
          ProcurementUnit: '', //采购单位
          njhq: '' //交货期
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
            {code: 'myInsert', name: '新增', status: 'perfect', icon: 'fa fa-plus vxe-primary-color'},
            {code: 'remove', name: '删除选中', status: 'perfect', icon: 'fa fa-trash-o vxe-danger-color'},
            {code: 'mySave', name: '保存', status: 'perfect', icon: 'fa fa-save vxe-success-color'}
            // ,{ code: 'impotEvent' ,name: '导入' ,status:'perfect' }
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
          {type: 'checkbox', width: 50},
          {type: 'seq', title: '序号', width: 60},
          {field: 'chth', title: '合同号', width: 80, editRender: {name: 'input'}},
          {field: 'cddh', title: '客户订单号', width: 100, editRender: {name: 'input'}},
          {field: 'clxmc', title: '楞型', width: 60, editRender: {name: 'input'}},
          {
            field: 'cyxlx', title: '压型', width: 90, editRender:

              {
                name: 'ElSelect',
                options: [ ],

                  events: {change: this.ChangeEvent1},
                  props: {filterable: true, defaultFirstOption: true, noMatchText: '无配方名称！请重新输入！'}


              }
          },
          // { field: 'RecipeName', title: '配方查找', width: 120, editRender: { name: 'input' } },
          {
            field: 'cPFMC',
            title: '配方名称',
            width: 160,
            editRender: {
              name: 'ElSelect',
              options: [],
              events: {change: this.ChangeEvent},
              props: {filterable: true, defaultFirstOption: true, noMatchText: '无配方名称！请重新输入！'}
            }

          },
          {field: 'cgdyx', title: '压线', width: 140, editRender: {name: 'input'}},
          {field: 'nbpc', title: '板片长', width: 80, editRender: {name: 'input'}},
          {field: 'nbpk', title: '板片宽', width: 80, editRender: {name: 'input'}},
          {field: 'ncgsl', title: '数量', width: 60, editRender: {name: 'input'}},
          {field: 'cdbfs', title: '打包方式', width: 80, editRender: {name: 'input'}},
          {field: 'cshbzsm', title: '送货备注', width: 150, showOverflow: true, editRender: {name: 'input'}},
          {field: 'ctsyq', title: '特殊要求', width: 150, showOverflow: true, editRender: {name: 'input'}},
          {
            field: 'csftp',
            title: '是否通片',
            width: 80,
            editRender: {name: '$switch', props: {onValue: '1', offValue: '0'}}
          },
          {field: 'nmenf', title: '门幅(mm)', width: 100, editRender: {name: 'input'}},
          // { field: 'ndwmj', title: '开数', width: 60, editRender: { name: 'input' } },
          // { field: 'SpareFlute', title: '备用楞型', width: 80, editRender: { name: 'input' } },
          {field: 'ndwmj', title: '单位净积', width: 80, editRender: {name: 'input'}}
        ]
      };
    },
    created() {
      var storage = window.sessionStorage;
      this.qybh = storage.getItem('QYBH');
      this.dialogForm.qydz = storage.getItem('qydz');
      this.findPFList(); //配方名称赋值

      this.getSupplier();
      this.getAddress();
    },
    watch: {},
    methods: {
      findPFList2() {
        this.tableColumn[5].editRender.options = [{label: "请选择供应商", value: "1"}];

        this.axios
          .post('/supplierController/selectYXLX', {qybh: this.qybh,gysbh:this.form.cqybhGys})
          .then(response => {

            if (response.data.status === '1') {
              var lists = response.data.data;

              if(lists[0].cyxlx_gys===''){   var      list = lists[0].cyxlx_bz.split(',');}
            else{     var   list = lists[0].cyxlx_gys.split(','); }



              var listsa=[]
              console.log("压型的选择"+JSON.stringify(list));
              if (list.length != 0) {
                for (let i of list) {

                    var form={
                      label: i,

                      value: i
                    }
                  listsa.push(form)
                }
                this.tableColumn[5].editRender.options = listsa;
              }
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
      findPFList() {
        this.tableColumn[6].editRender.options = [{label: 1, value: 1}];
        this.axios

          .post('   /FormulaController/queryCustomerFormula', {qybh: this.qybh})
          .then(response => {
            if (response.data.status === '1') {
              var list = response.data.data.formula;
              if (list.length != 0) {
                for (let i of list) {
                  i.label = i.pfmc;
                  i.value = i.nPFBH;
                }
                this.tableColumn[6].editRender.options = list;
              }
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
      ChangeEvent1({column, $rowIndex, row}) {
        //楞型赋值
        // this.tableData[$rowIndex].clxmc = 333;

         this.cyxlx1=row.cyxlx;

        console.log(`${column.title} 触发 change 事件`);
        console.log($rowIndex);
        console.log(JSON.stringify(row));
        console.log(row.cPFMC);

        // var form = {
        //
        //   "cyxlx": this.cyxlx1,
        // }
        // this.$set(this.tableData, $rowIndex, form);

        var form = this.tableData[$rowIndex]
        form.cyxlx=row.cyxlx



        this.$set(this.tableData, $rowIndex, form);


        // this.$refs.xTable.clearActived()//清除单元格激活状态
        //   this.$refs.xTable.setActiveCell(row.row,row.column.property)//设置单元格为激活状态

              // var form = {
              //   "clxmc": response.data.data.formula[$rowIndex].cLXMC,
              //   "cPFMC": response.data.data.formula[$rowIndex].pfmc,
              //
              // }
              //
              // that.$set(that.tableData, $rowIndex, form);


              // that.tableData[$rowIndex].cyxlx=response.data.data.formula[$rowIndex].cLXMC

              // this.xGrid.refreshColumn()
              // this.$refs.xGrid.setup.toolbar.refresh()


      },
      ChangeEvent({column, $rowIndex, row}) {
        //楞型赋值
        // this.tableData[$rowIndex].clxmc = 333;
        console.log(`${column.title} 触发 change 事件`);
        console.log($rowIndex);
        console.log(JSON.stringify(row));
        console.log(row.cPFMC);
        var that = this;
        this.axios
          .post('/FormulaController/queryCustomerFormula', {qybh: this.qybh, pfbh: row.cPFMC})
          .then(response => {

            if (response.data.status === '1') {


              var form = that.tableData[$rowIndex]
              form.cPFMC=response.data.data.formula[$rowIndex].pfmc
              form.clxmc=response.data.data.formula[$rowIndex].cLXMC

              console.log(JSON.stringify(form.clxmc))
              that.$set(that.tableData, $rowIndex, form);


              // that.tableData[$rowIndex].clxmc=response.data.data.formula[$rowIndex].cLXMC

              // this.xGrid.refreshColumn()
              // this.$refs.xGrid.setup.toolbar.refresh()

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
      getAddress() {
        this.$ajax
          .post('/PaperBoardController/queryAddress', {qybh: this.qybh})
          .then(response => {
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
            var data = res.supplier;
            var result = [];
            for (var i = 0; i < data.length; i++) {
              if (data[i].lTYBZ == false) {
                result.push(data[i]);
              }
            }
            this.suppliers = result;
          })
          .catch(() => {
          });
      },
      change(value) {
        for (var i = 0; i < this.suppliers.length; i++) {
          if (value == this.suppliers[i].qybh) {
            this.form.njhq = this.suppliers[i].njhq;
          }
        }
        this.findPFList2(); //配方名称赋值
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
        // console.log(JSON.stringify({ tableData }));
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
        // console.log(this.addressOptions);
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
            // console.log(1);
            add[i].default = 0;
          }
        }
        for (var i = 0; i < update.length; i++) {
          update[i].qybh = this.qybh;
        }
        for (var i = 0; i < deletedata.length; i++) {
          deletedata[i].qybh = this.qybh;
        }
        console.log("发起保存请求");
        this.axios
          .post('/PaperBoardController/modifyAddress', {add: add, update: update, del: deletedata})
          .then(response => {
            console.log("保存的数据" + JSON.stringify(response));
            if (response.data.status === '1') {
              this.$message({
                showClose: true,
                type: 'success',
                message: response.message
              });
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
            console.log("时间" + this.form.ddhrq.length)
            if (this.form.ddhrq.length == 10 && this.form.dcgrq.length == 10) {
              for (var i = 0; i < insertRecords.length; i++) {
                insertRecords[i].cqybh = this.qybh;
                insertRecords[i].ddhrq = this.form.ddhrq;
                insertRecords[i].dcgrq = this.form.dcgrq;
                insertRecords[i].cqybhGys = this.form.cqybhGys;
                insertRecords[i].cshdz = this.form.cshdz;
                insertRecords[i].jhq = this.form.njhq;
              }

              this.axios
                .post('/PaperBoardController/paperBoardBilling', {table: insertRecords})
                .then(response => {
                  // console.log(response);
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
                      message: response.data.error
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
              this.$message({
                showClose: true,
                type: 'error',
                message: "时间不能为空"
              });
            }
            break;
        }
      },
      importMethod(evnt) {
        let files = evnt.target.files;
        let fileReader = new FileReader();
        fileReader.onload = ev => {
          let data = ev.target.result;
          let workbook = XLSX.read(data, {type: 'binary'});
          let csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1);
          let tableData = [];
          // 解析数据
          csvData.split('\n').forEach((vRow, rIndex) => {
            if (vRow) {
              let vCols = vRow.split(',');
              let item = {};
              vCols.forEach((val, cIndex) => {
                let column = this.tableColumn[cIndex];
                if (column.field) {
                  item[column.field] = val;
                }
              });
              tableData.push(item);
            }
          });
          this.tableData1 = tableData;
        };
        fileReader.readAsBinaryString(files[0]);
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

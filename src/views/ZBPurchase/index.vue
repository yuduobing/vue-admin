<template>
  <!-- 纸板采购单界面 -->
  <div>
    <el-form ref="form2" label-width="80px" style="margin:20px  0px 0px">
      <el-row >
        <el-col :span="4">
          <el-form-item label="类型">
            <el-select v-model="value" disabled placeholder="请选择" @change="TypeChange" style="width: 80px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  :span="9"  >
          <el-form-item label="采购日期"   style="margin-left: 30px">
            <el-date-picker  @change="search"  @blur="search"  :picker-options="pickerOptionsStart"  v-model="form2.startTime"  type="date" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期" style="width: 135px;"></el-date-picker>--<el-date-picker :picker-options="pickerOptionsEnd" v-model="form2.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 135px;" @change="search"  @blur="search"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6"   :pull="1">
          <el-form-item label="采购单号"><el-input v-model="form2.cgdh"  @change="search"  @blur="search" placeholder="请输入内容" style="width:80%;"></el-input></el-form-item>
        </el-col>
        <el-col :span="4"  :pull="1" >
          <el-form-item label="送货地址"><el-input v-model="form2.cSHDZ"   @change="search"  @blur="search" placeholder="请输入内容" style="width: 170px;"></el-input></el-form-item>
        </el-col>

      </el-row>
      <el-row :span="24">


        <el-col :span="4">

          <el-form-item label="楞型" style="float: left;margin-left: 3px">

            <el-input v-model="form2.clxmc"   placeholder="楞型"  style="width: 80px;"  @change="search"  @blur="search"></el-input>

          </el-form-item>
        </el-col>

        <el-col :span="7" :pull="1">


          <el-form-item  style="float: left;">

            <el-form-item label="配方名称" style="float: left;">

              <el-input v-model="form2.cPFMC" placeholder="配方内容" style="width: 140px;"  @change="search"  @blur="search"></el-input>

            </el-form-item>



          </el-form-item>


        </el-col>

        <el-col :span="8" :pull="2">


<el-form-item  style="float: left;">
          规格
          <el-input v-model="form2.nbpc" placeholder="长" style="width: 100px;margin-left: 3px;"  @change="search"  @blur="search"></el-input>
          ×
          <el-input v-model="form2.nbpk" placeholder="宽" style="width: 100px;"  @change="search"  @blur="search"></el-input>
  </el-form-item>





          <!--          <el-form-item label="状态">-->
          <!--            <el-checkbox-group v-model="form.zt" >-->

          <!--              <el-checkbox  name="未收货" label="未收货" ></el-checkbox>-->
          <!--              <el-checkbox name="有库存" label="有库存"></el-checkbox>-->
          <!--              <el-checkbox name="出库" label=" 出库"></el-checkbox>-->
          <!--              <el-checkbox  name="入库" label=" 入库" ></el-checkbox>-->
          <!--              <el-checkbox name="生产" label="生产"></el-checkbox>-->
          <!--              <el-checkbox name="审核" label="审核 "></el-checkbox>-->
          <!--            </el-checkbox-group>-->
          <!--&lt;!&ndash;            <el-select v-model="form.zt" placeholder="请选择" @change="TypeChange" style="width: 90px;">&ndash;&gt;-->
          <!--&lt;!&ndash;              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>&ndash;&gt;-->
          <!--&lt;!&ndash;            </el-select>&ndash;&gt;-->

          <!--          </el-form-item>-->

        </el-col>

	<el-col :span="2">
		<el-button type="primary" style="" @click="search" size="small">查询</el-button>
	</el-col>
	<!--新增按钮被删除 -->
	<el-col :span="2">
		<el-button @click="add()" type="primary"    size="small">新增</el-button>
	</el-col>


      </el-row>
    </el-form>

    <el-table ref="singleTable"
              :row-style="{height:'10px'}"
              :cell-style="{padding:'0px'}"

              :data="tableData" border style="width: 95%;margin:5px 20px 0px 40px"
              v-loading="listLoading"
              element-loading-text = "努力加载中..." max-height="80%" highlight-current-row align="center">
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="110px" sortable></el-table-column>
      <!-- <el-table-column prop="cDDH" align="center" label="订单号" min-width="90px" sortable></el-table-column> -->
      <el-table-column prop="cLXMC" align="center" label="楞型" min-width="80px" sortable></el-table-column>
      <el-table-column prop="cPFMC" align="center" label="采购配方" min-width="100px" sortable></el-table-column>

      <el-table-column prop="nBPC" align="center" label="板片长×宽" v-if="gg==0" min-width="110px" sortable></el-table-column>

      <el-table-column prop="nBPK" align="center" label="板片宽×长"  v-if="gg==1"  min-width="110px" sortable></el-table-column>

	 <el-table-column  sortable  :show-overflow-tooltip="true" prop="cYXLX" align="center" label="压型" min-width="80"></el-table-column>
	 <el-table-column  sortable  :show-overflow-tooltip="true" prop="cGDYX" align="center" label="压线" min-width="105"></el-table-column>
	 <el-table-column prop="ncgsl" align="center" label="采购数量"  sortable :show-overflow-tooltip="true"  min-width="105"></el-table-column>

	 <el-table-column prop="cSHDZ" align="center" label="送货地址"   show-overflow-tooltip   min-width="120px" sortable></el-table-column>
	 <el-table-column prop="cDDH" align="center" label="订单号" sortable  :show-overflow-tooltip="true" min-width="110px" sortable></el-table-column>

	 <el-table-column prop="cQYMC" align="center" label="供应商名称"  show-overflow-tooltip  min-width="200px" sortable></el-table-column>


      <el-table-column prop="NMENF" align="center" label="门幅" min-width="90px" sortable></el-table-column>
      <el-table-column prop="dCGRQ" align="center" label="采购日期" min-width="100px" :formatter="dateFormat" sortable></el-table-column>
      <el-table-column prop="cSHBZ" align="center" label="供应商审核" min-width="110px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.cSHBZ == 1" style="color: red">已审核</span>
          <span v-else-if="scope.row.cSHBZ == 0" >待审核</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="Check" align="center" label="打印" min-width="80px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.Check === 1">已打印</span>
          <span v-else-if="scope.row.Check === 0" style="color: red">未打印</span>
        </template>
      </el-table-column>
      <el-table-column prop="Check" align="center" label="审核" min-width="80px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.Check === 1">已审核</span>
          <span v-else-if="scope.row.Check === 0" style="color: red">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="Number" align="center" label="供应商审核备注" min-width="130px" sortable></el-table-column>
      <el-table-column prop="RecipeName" align="center" label="供应商生产单号" min-width="130px" sortable></el-table-column>
      <el-table-column prop="SquareWeight" align="center" label="采购日期" min-width="100px" sortable></el-table-column>
      <el-table-column prop="CardboardPrice" align="center" label="供应商" min-width="100px" sortable></el-table-column>
      <el-table-column prop="PurchaseQuantity" align="center" label="采购数量" min-width="100px" sortable></el-table-column>
      <el-table-column prop="CrimpType" align="center" label="压线类型" min-width="100px" sortable></el-table-column>
      <el-table-column prop="HighPressureLine" align="center" label="压线" min-width="100px" sortable></el-table-column>
      <el-table-column prop="NetProduct" align="center" label="净积" min-width="80px" sortable></el-table-column>
      <el-table-column prop="PackingMethod" align="center" label="打包方式" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Pass" align="center" label="通片" min-width="80px" sortable></el-table-column>
      <el-table-column prop="SpareFlute" align="center" label="备用楞型" min-width="100px" sortable></el-table-column>
      <el-table-column prop="PurchasePrices" align="center" label="采购单价" min-width="100px" sortable></el-table-column>
      <el-table-column prop="PurchaseAmount" align="center" label="采购金额" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Purchaser" align="center" label="采购人" min-width="90px" sortable></el-table-column>
      <el-table-column prop="DeliveryDate" align="center" label="交货日期" min-width="100px" sortable></el-table-column>
      <el-table-column prop="InvoiceUnitPrice" align="center" label="发票单价" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Invoicing" align="center" label="开票" min-width="80px" sortable></el-table-column>
      <el-table-column prop="HarvestSign" align="center" label="收货标志" min-width="100px" sortable></el-table-column>
      <el-table-column prop="SpecialRequirements" align="center" label="特殊要求" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Remarks" align="center" label="备注" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Deactivate" align="center" label="停用" min-width="80px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.Deactivate === 1" style="color: red">已停用</span>
          <span v-else-if="scope.row.Deactivate === 0">已启用</span>
        </template>
      </el-table-column>
      <el-table-column prop="ActivationDate" align="center" label="启用日期" min-width="100px" sortable></el-table-column> -->
      <el-table-column fixed="right" align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row)" :disabled="scope.row.cSHBZ == 1" size="mini" type="primary" plain>修改</el-button>
          <el-button @click="check(scope.$index, scope.row)" :disabled="scope.row.cSHBZ == 1" size="mini" type="primary" plain>审核</el-button>
          <el-button @click="transfer(scope.$index, scope.row)" size="mini" type="primary" plain>再次下单</el-button>
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

  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  let moment = require('moment'); //调用时间过滤器
  // 中文简体
  moment.locale('zh-cn');
  export default {
    name: 'ZBPurchase',
    data() {
      return {
        options: [{ label: '纸板', value: '1' }, { label: '纸箱', value: '2' }],
        options2: [
          { label: '未收货', value: '未收货' },
          { label: '审核', value: '审核' },
          { label: '瓦机排程', value: '瓦机排程' },
          { label: '已入库', value: '入库' },
          { label: '已出库', value: '出库' },
          { label: '收货', value: '收货' },
          { label: '有库存', value: '有库存' }

        ],
        value: '1',
        pickerOptionsStart: {
          disabledDate: time => {
            if (this.form2.endTime) {
              return time.getTime() > new Date(this.form2.endTime).getTime()-24 * 60 * 60 * 1000
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            if (this.form2.startTime) {
              return time.getTime() < new Date(this.form2.startTime).getTime() + 24 * 60 * 60 * 1000
            }
          }
        },
        form2: {
          startTime: new Date().getTime() -  24 * 60 * 60 * 1000,
          cgdh: '',
          cSHDZ: '',
           zt:[],
          endTime: new Date(),
          input: '',
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
          // ccgdh: '', //采购单号
          cqybh: '' //企业编号
        },
        form: {

          input: '',
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
          // ccgdh: '', //采购单号
          cqybh: '' //企业编号
        },
        f: [],
        listLoading: true,
        rawList: [],
        currentPage1: 1,
        pageSize: 10,
        searchNumber: 0,
        tableLisqybht: [],
        qybh: '',
        gg:''
      };

    },
    mounted() {
      this.gettableData();
    },
    activated() {
      this.gettableData();
    },
    methods: {
      dateFormat(value) {
        // console.log(value);
        if (value.dCGRQ == undefined) {
          return '';
        } else {
          return moment(value.dCGRQ).format('YYYY-MM-DD');
        }
      },
      gettableData() {
        console.log("请求数据");
        this.listLoading=true
        var storage = window.sessionStorage;
        this.qybh = storage.getItem('QYBH');
        //查询长宽
        this.gg=Cookies.get('gg')
        //获取表格数据
        this.search()

        // this.axios
        //   // .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
        //   //页码写什么都无所应为不会判断
        //   .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh,start: this.currentPage1, limit: this.pageSize ,status:[]})
        //   .then(response => {
        //    if (response.data.status === '1') {
        //
        //       console.log(JSON.stringify( this.tableData))
        //       response.data.data.paperBoard.forEach(function(value,key,arr){
        //         var width=value.nBPC
        //         value.nBPC=value.nBPC+"×"+value.nBPK
        //         value.nBPK=+value.nBPK+"×"+width
        //         // 结果依次为1，2，3
        //         if(JSON.stringify(value.NMENF)=== '0'){
        //             value.NMENF =''
        //
        //           }
        //
        //       })
        //       console.log("传递过来的数据"+JSON.stringify(this.tableData))
        //       this.tableData= response.data.data.paperBoard;
        //       this.rawList = response.data.data.paperBoard;
        //       this.tableList = response.data.data.paperBoard;
        //       this.currentChangePage(this.rawList, 1);
        //       this.listLoading=false
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
        //       message: 'Ajax 错误'
        //     });
        //   });
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

        var storage = window.sessionStorage;
        var qybh = storage.getItem('QYBH');

        var startTime = '';
        var endTime = '';


        if (typeof(this.form2.startTime) === 'number') {
          startTime = moment(this.form2.startTime).format('YYYY-MM-DD') + ' 00:00:00';
        }

        console.log("查询的时间"+typeof(this.form2.endTime))
        if (typeof(this.form2.endTime) === 'number'||typeof(this.form2.endTime) === 'string'){

          endTime =  moment(this.form2.endTime).format('YYYY-MM-DD') + ' 23:59:59';
          console.log("查询的时间3"+endTime)
        }
        console.log("查询的时间2"+endTime)

        //查询方法
        this.$ajax
          .post( '/PaperBoardController/queryPaperBoard', { start: this.currentPage1, qybh: qybh, limit: this.pageSize,
            cgdh: this.form2.cgdh ,cPFMC:this.form2.cPFMC,cLXMC:this.form2.clxmc,cSHDZ:this.form2.cSHDZ,nBPC:this.form2.nbpc,nBPK:this.form2.nbpk,
            startTime:startTime, endTime:endTime,status: this.form2.zt,

          })
          .then(response => {
            if (response.status == 1) {
              //搜索条件循环
              response.data.paperBoard.forEach(function(value,key,arr){
                var width=value.nBPC
                value.nBPC=value.nBPC+"×"+value.nBPK
                value.nBPK=+value.nBPK+"×"+width
                // 结果依次为1，2，3
                console.log("门幅 "+ value.NMENF);
                if(value.NMENF==="0"){
                  value.NMENF=''
                }

              })

              //搜索后赋值
              this.tableData = response.data.paperBoard;
              console.log("获取参数",this.tableData);
              this.rawList = response.data.paperBoard;
              this.currentChangePage(this.rawList, 1);
              this.listLoading = false


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

        // this.searchNumber +=1
        // if(this.form.input == null || this.form.input == ''){//查询为空时默认显示全部数据
        //   this.gettableData();
        // }else{
        //   if(this.searchNumber <=1){
        //     this.currentPage1 = 1
        //     // es6过滤得到满足搜索条件的展示数据list
        //     let list = this.rawList.filter((item, index) =>
        //         item.RecipeName.includes(this.form.input)
        //     )
        //     this.tableData = list.filter((item, index) =>
        //         index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1)
        //     )
        //     this.rawList = this.tableData;
        //   }else{
        //     this.rawList=this.tableList
        //     let list = this.rawList.filter((item, index) =>
        //         item.RecipeName.includes(this.form.input)
        //     )
        //     this.tableData = list.filter((item, index) =>
        //         index < this.currentPage1 * this.pageSize && index >= this.pageSize * (this.currentPage1 - 1)
        //     )
        //     this.rawList = this.tableData;
        //   }
        // }
      },
      update(index, row) {
        var storage = window.sessionStorage;
        var cCGDH=row.cCGDH
        var checkData =JSON.stringify(row)
        storage.setItem('checkData', checkData);
        this.$router.push({
          path: '/UpdateCardboard',
          query: {
            data: row
          }
        });
      },
      check(index, row) {
        var storage = window.sessionStorage;
        var cCGDH=row.cCGDH
        var checkData =JSON.stringify(row)
        storage.setItem('checkData', checkData);
        this.$router.push({
          path: '/CheckCardboard',
          query: {
            data: row
          }
        });
      },
      getZBMX(cCGDH){
        this.axios
          .post('/CartonController/modifyCarton', { qybh: this.qybh, cgdh: cCGDH})
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {
              return response.data.data
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
        this.$router.push({
          path: '/addPurchase'
        });
      },
      transfer(index, row){

        var checkData =JSON.stringify(row);
        console.log(checkData)
        var check = JSON.parse(checkData);
        this.form.cqybhGys = check.gysbh;
        this.form.djhrq = moment(new Date()).format('YYYY-MM-DD');
        this.form.dcgrq = moment(check.dCGRQ).format('YYYY-MM-DD');
        this.form.cshdz = check.cSHDZ;
        this.form.chth = check.cHTH;
        this.form.cddh = check.cDDH;
        this.form.cPFMC = check.cPFMC;

        this.form.clxmc = check.cLXMC;
        this.form.cyxlx = check.cYXLX;
        this.form.cgdyx = check.cGDYX;
        this.form.nbpc = check.nBPC.split("×")[0];
        this.form.nbpk = check.nBPK.split("×")[0];
        this.form.ncgsl = check.ncgsl;
        this.form.csftp = check.cSFTP;
        this.form.nmenf = check.NMENF;
        this.form.cdbfs = check.cDBFS;
        this.form.ndwmj = check.nDWMJ;
        this.form.cshbzsm = check.cSHBZSM;
        this.form.ctsyq = check.cTSYQ;

        this.form.cqybh = this.qybh;
        console.log("转换后的表格"+JSON.stringify(this.form))
        // var table=row
        // this.form.cCJR="ydb"




        this.axios
          .post('/PaperBoardController/paperBoardBillingAgain',   this.form)
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
        this.gettableData();
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
    margin-top: 20px;
    margin-bottom: 30px;
    width: 50%;
  }
</style>


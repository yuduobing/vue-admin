<template>
  <!-- 采购单流程跟踪界面 -->
  <div>
      <div v-show="yshow">
    <el-form ref="form" label-width="90px" style="margin:20px  0px 0px">
      <el-row >
        <el-col :span="4">
          <el-form-item label="类型">
            <el-select v-model="value" disabled placeholder="请选择" @change="TypeChange" style="width: 90px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  :span="9"  >

          <el-select   style="width:100px" v-model="form.timeid" placeholder="采购日期">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>


          <!--          <el-form-item label="采购日期"   style="margin-left: 30px">-->
          <el-date-picker  @change="search"  @blur="search"  :picker-options="pickerOptionsStart"  v-model="form.startTime"  type="date" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期" style="width: 135px;"></el-date-picker>--<el-date-picker :picker-options="pickerOptionsEnd" v-model="form.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 135px;" @change="search"  @blur="search"></el-date-picker>
          <!--          </el-form-item>-->



        </el-col>
        <el-col :span="6"   :pull="1">
          <el-form-item label="采购单号"><el-input v-model="form.cgdh"  @change="search"  @blur="search" placeholder="请输入内容" style="width:80%;"></el-input></el-form-item>
        </el-col>
        <el-col :span="4"  :pull="1" >
          <el-form-item label="送货地址"><el-input v-model="form.cSHDZ"   @change="search"  @blur="search" placeholder="请输入内容" style="width: 170px;"></el-input></el-form-item>
        </el-col>

        </el-row>
      <el-row :span="24">


        <el-col :span="4">

        <el-form-item label="楞型" style="float: left;margin-left: 3px">

          <el-input v-model="form.clxmc"   placeholder="楞型"  style="width: 90px;"  @change="search"  @blur="search"></el-input>

        </el-form-item>
      </el-col>

          <el-col :span="4" :pull="2" >


    <el-form-item  style="float: left;">

      <el-form-item label="配方名称" style="float: left;">

        <el-input v-model="form.cPFMC" placeholder="配方内容" style="width: 140px;"  @change="search"  @blur="search"></el-input>

      </el-form-item>


    </el-form-item>


        </el-col>
        <el-col :span="8"    :offset="1">
   规格
          <el-input v-model="form.nbpc" placeholder="长" style="width: 100px;"  @change="search"  @blur="search"></el-input>
          ×
          <el-input v-model="form.nbpk" placeholder="宽" style="width: 100px;"  @change="search"  @blur="search"></el-input>




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
        <el-col :span="4"  :pull="3">

       <el-form-item label="状态">
         <el-select v-model="form.zt"   style="width: 240%"   multiple placeholder="请选择">
           <el-option
             @change="search"  @blur="search"
             v-for="item in options2"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>

       </el-col>
	   <el-col :span="2" :offset="1">
		  <el-button type="primary" style="margin-left: 10px;" @click="search" size="small">查询</el-button>

	   </el-col>






      </el-row>
    </el-form>
    <div v-show="value === '1'">
      <el-table
        :data="tableData"
        border
        style="width: 95%;margin:0px 40px 0px 40px"
        height="600px"
        v-loading="listLoading"
        element-loading-text = "努力加载中..."
        highlight-current-row
        max-height="400"
        @row-dblclick="handleClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="dCGRQ" align="center" label="采购日期" min-width="100" :formatter="dateFormat" sortable></el-table-column>
        <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="110px" sortable></el-table-column>
        <el-table-column  align="center" label="状态" min-width="80">
          <template slot-scope="scope">
            <span v-if="   scope.row.cWCZT!=null && scope.row.cWCZT!='' "  style="color: #ff0000">{{scope.row.cWCZT}}</span>
            <span v-else >待审核</span>
          </template>

        </el-table-column>
        <el-table-column prop="cLXMC" align="center" label="楞型" min-width="80"></el-table-column>
        <el-table-column prop="cPFMC" align="center" label="配方名称" min-width="100"></el-table-column>


        <el-table-column prop="nBPC" align="center" label="板片长×宽" v-if="gg==0" min-width="110px" sortable></el-table-column>

        <el-table-column prop="nBPK" align="center" label="板片宽×长" v-if="gg==1"  min-width="120px" sortable></el-table-column>
        <el-table-column  sortable  :show-overflow-tooltip="true" prop="cYXLX" align="center" label="压型" min-width="80"></el-table-column>
        <el-table-column  sortable  :show-overflow-tooltip="true" prop="cGDYX" align="center" label="压线" min-width="105"></el-table-column>

        <el-table-column prop="ncgsl" align="center" label="采购数量"  sortable :show-overflow-tooltip="true"  min-width="105"></el-table-column>
        <el-table-column prop="NMENF" align="center" label="门幅" sortable  min-width="70px" sortable></el-table-column>


        <el-table-column prop="cSHDZ" align="center" label="送货地址"  sortable  :show-overflow-tooltip="true"  min-width="140px" sortable></el-table-column>
<!--        <el-table-column prop="dWCSJ" align="center" label="完成时间"   show-overflow-tooltip min-width="100" sortable></el-table-column>-->


        <el-table-column prop="ncgsl" align="center" label="采购数量"  :show-overflow-tooltip="true"  min-width="100" sortable> </el-table-column>
        <el-table-column prop="nKCS" align="center" label="库存数" sortable :show-overflow-tooltip="true" min-width="100"></el-table-column>
        <el-table-column prop="cQYMC" align="center" label="供应商名称"  sortable  :show-overflow-tooltip="true" min-width="180"></el-table-column>
        <el-table-column prop="cDDH" align="center" label="订单号" sortable  :show-overflow-tooltip="true" min-width="110px" sortable></el-table-column>
        <el-table-column prop="cBeiZ" align="left" label="备注"  sortable :show-overflow-tooltip="true"  min-width="200"></el-table-column>

        <el-table-column prop="dXGRQ" align="center" label="修改日期" min-width="120"   :formatter="dateFormat2"  ></el-table-column>

      </el-table>
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


    <div v-show="value === '2'">
      <el-table
        :data="ZXtableData"
        border
        v-loading="listLoading"
        element-loading-text = "努力加载中..."
        style="width: 95%;margin:0px 40px 0px 40px"
        height="600px"
        highlight-current-row
        max-height="400"
        @row-dblclick="ZXhandleClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="dCGRQ" align="center" label="采购日期" min-width="100" :formatter="dateFormat" sortable></el-table-column>
        <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="110px" sortable></el-table-column>
        <el-table-column prop="cWCZT" align="center" label="状态" min-width="80" sortable></el-table-column>
<!--        <el-table-column prop="dSCSJ" align="center" label="生产时间" min-width="100" :formatter="SCSJ" sortable></el-table-column>-->
        <el-table-column prop="dWCSJ" align="center" label="完成时间" min-width="100" :formatter="WCSJ" sortable></el-table-column>
        <el-table-column prop="ncgsl" align="center" label="采购数量" min-width="100" sortable></el-table-column>
        <el-table-column prop="cBeiZ" align="center" label="备注" min-width="200"></el-table-column>
      </el-table>
      <div class="paginationClass">
        <el-pagination
          @size-change="ZXhandleSizeChange"
          @current-change="ZXhandleCurrentChange"
          :current-page="ZXcurrentPage1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ZXrawList.length"
        ></el-pagination>
      </div>
    </div>
      </div>
<!--    <div v-show="!yshow"  @click="yashow">-->
<!--    <el-table :data="MXtableData" border style="width: 95%;margin-left: 40px;" height="550px" v-loading="MXlistLoading"-->
<!--     element-loading-text = "努力加载中..." highlight-current-row max-height="600" @row-dblclick="handleClick">-->
<!--      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>-->
<!--      <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="110px" sortable></el-table-column>-->
<!--      <el-table-column prop="cWCZT" align="center" label="状态" min-width="60"></el-table-column>-->
<!--      <el-table-column prop="dWCSJ" align="center" label="完成时间" min-width="100" :formatter="WCSJ" sortable></el-table-column>-->
<!--      <el-table-column prop="nWCSL" align="center" label="完成数量" min-width="100"></el-table-column>-->
<!--      <el-table-column prop="cBeiZ" align="center" label="备注" min-width="600"></el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->
<!--  -->

  </div>
</template>

<script>
  import Cookies from 'js-cookie'
let moment = require('moment'); //调用时间过滤器
// 中文简体
moment.locale('zh-cn');
export default {
  name: 'CGDStatus',
  data() {
    return {


      pickerOptionsStart: {
        disabledDate: time => {
          if (this.form.endTime) {
            return time.getTime() > new Date(this.form.endTime).getTime()-24 * 60 * 60 * 1000
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.form.startTime) {
            return time.getTime() < new Date(this.form.startTime).getTime() + 24 * 60 * 60 * 1000
          }
        }
      },
      yshow:true,
      form: {
        startTime: new Date().getTime() -  24 * 60 * 60 * 1000,
        cPFMC: '',
        endTime: new Date(),
        cgdh: '',
        zt: [],
        cSHDZ: '',
        nbpc: '',
        nbpk: '',
        clxmc: '',
        timeid:'1',
      },
      meetingDate:{
        meetingDate: "",
      },
      tableData: [],
      rawList: [],
      currentPage1: 1,
      pageSize: 10,
      ZXtableData: [],
      ZXrawList: [],
      ZXcurrentPage1: 1,
      ZXpageSize: 10,
      multipleSelection: [],
      listLoading: false,
      MXlistLoading:false,
      searchNumber: 0,
      tableList: [],
      value: '1',
      qybh: '',
      options2: [
        { label: '未收货', value: '未收货' },
        { label: '审核', value: '审核' },
        { label: '瓦机排程', value: '瓦机排程' },
        { label: '已入库', value: '入库' },
        { label: '已出库', value: '出库' },
        { label: '收货', value: '收货' },
        { label: '有库存', value: '有库存' }

      ],
      options: [{ label: '纸板', value: '1' }, { label: '纸箱', value: '2' }],
      options3: [
        { label: '采购时间', value: '1' },
        { label: '操作时间', value: '2' },


      ],

      MXtableData: [], //采购单明细
      start: '', //采购开始日期
      end: '',
      status: '', //状态
      gg:0,
      statusOptions: [
        { label: '未收货', value: '未收货' },
        { label: '审核', value: '审核' },
        { label: '排程', value: '排程' },
        { label: '已入库', value: '入库' },
        { label: '已出库', value: '出库' },
        { label: '收货', value: '收货' },
        { label: '有库存', value: '有库存' }

      ],
    };
  },
  created() {
    var storage = window.sessionStorage;
    this.qybh = storage.getItem('QYBH');

  },
  mounted() {

    // const myDate = new Date();
    // const year = myDate.getFullYear(); // 获取当前年份
    // const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
    // const day = myDate.getDate(); // 获取当前日（1-31）
    // 日期格式：2019/07/29 - 2019/07/29
    this.gettableData();
    //
    // this.load();
  },
  methods: {
    // yashow(){
    //   this.yshow=true
    // },
    //*******表格时间格式转换**********//
    dateFormat(value) {
      if (value.dCGRQ == undefined) {
        return '';
      } else {
        return moment(value.dCGRQ).format('YYYY-MM-DD');
      }
    },
    dateFormat2(value) {
      if (value.dXGRQ == undefined) {
        return '';
      } else {
        return moment(value.dXGRQ).format('YYYY-MM-DD');
      }
    },
    SCSJ(value) {
      if (value.dSCSJ == undefined) {
        return '';
      } else {
        return moment(value.dSCSJ).format('YYYY-MM-DD');
      }
    },
    WCSJ(value) {
      if (value.dWCSJ == undefined) {
        return '';
      } else {
        return moment(value.dWCSJ).format('YYYY-MM-DD');
      }
    },
    //*******表格时间格式转换**********//
    TypeChange(value) {//纸板纸箱面板切换时获取数据
      if (value == '1') {
        this.gettableData();
      } else {
        this.getZXtable();
      }
    },
    gettableData() {
      //获取纸板表格数据
      // this.listLoading = true;
      this.gg=Cookies.get('gg');
      // this.axios
      //   .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status === '1') {
      //
      //
      //       response.data.data.paperBoard.forEach(function(value,key,arr){
      //         var width=value.nBPC
      //         value.nBPC=value.nBPC+"×"+value.nBPK
      //         value.nBPK=+value.nBPK+"×"+width
      //         // 结果依次为1，2，3
      //
      //         if(JSON.stringify(value.NMENF)=== '0'){
      //           value.NMENF =''
      //
      //         }
      //
      //       })
      //       this.tableData = response.data.data.paperBoard;
      //       this.rawList = response.data.data.paperBoard;
      //       this.currentChangePage(this.rawList, 1);
      //       this.listLoading = false;
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         type: 'error',
      //         message: "设置成功，请刷新浏览器"
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
      this.search()
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
    getZXtable() {
      //获取纸箱表格数据
      this.search()
      // this.listLoading = true;
      // this.axios
      //   .post('/CartonController/queryCarton', {
      //     qybh: this.qybh, start: this.ZXcurrentPage1, limit: this.ZXpageSize
      //
      //
      //
      //   })
      //   .then(response => {
      //     console.log("返回的数据"+JSON.stringify(response));
      //     if (response.data.status === '1') {
      //       this.ZXtableData = response.data.data.carton;
      //       this.ZXrawList = response.data.data.carton;
      //       this.ZXcurrentChangePage(this.ZXrawList, 1);
      //       this.listLoading = false;
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
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row);
    // },
    search() {//查询
      console.log("进来了");
      //his
      var startTime = '';
      var endTime = '';


      if (typeof(this.form.startTime) === 'number') {
        startTime = moment(this.form.startTime).format('YYYY-MM-DD') + ' 00:00:00';
      }

        if (typeof(this.form.endTime) === 'number'||typeof(this.form.endTime) === 'string'){

        endTime =  moment(this.form.endTime).format('YYYY-MM-DD') + ' 23:59:59';

        }


      this.listLoading = true;
      if (this.value == '1') {


        this.axios
          .post('/PaperBoardController/queryPaperBoard', {

            cPFMC:this.form.cPFMC,
            nBPC:this.form.nbpc,
            nBPK:this.form.nbpk,
            cLXMC:this.form.clxmc,
            qybh: this.qybh,
            startTime: startTime,
            endTime:endTime,
            cgdh: this.form.cgdh,
            status: this.form.zt,
            start: this.currentPage1,
            limit: this.pageSize,
            cSHDZ: this.form.cSHDZ,
            timeid:this.form.timeid,
          })
          .then(response => {
            if (response.data.status === '1') {
                    response.data.data.paperBoard.forEach(function(value,key,arr){
                      var width=value.nBPC
                      value.nBPC=value.nBPC+"×"+value.nBPK
                      value.nBPK=+value.nBPK+"×"+width
                      // 结果依次为1，2，3

                      if(JSON.stringify(value.NMENF)=== '0'){
                        value.NMENF =''

                      }})
              console.log("打印的数据"+JSON.stringify(response.data.data.paperBoard))
              this.tableData = response.data.data.paperBoard;
              this.rawList = response.data.data.paperBoard;
              this.currentChangePage(this.rawList, 1);
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
              message: 'Ajax 错误'
            });
          });
      } else {
        this.axios
          .post('/CartonController/queryCarton', {

            cPFMC:this.form.cPFMC,
            nGG_L:this.form.nbpc,
            nGG_W:this.form.nbpk,
            cLXMC:this.form.clxmc,
            qybh: this.qybh,
            startTime: startTime,
            endTime:endTime,
            cgdh: this.form.cgdh,
            status: this.form.zt,
            start: this.ZXcurrentPage1,
            limit: this.ZXpageSize,
            cSHDZ: this.form.cSHDZ,
          })
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {
              console.log("打印的数据2"+JSON.stringify(response.data.data.carton))
              this.ZXtableData = response.data.data.carton;
              this.ZXrawList = response.data.data.carton;
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
              message: 'Ajax 错误'
            });
          });
      }
    },
    handleClick(value) {//双击纸板表格行
      var cCGDH = value.cCGDH;


      this.$router.push({ path:'/ckCGDStatus' ,query:{qybh: this.qybh, cgdh: cCGDH,body:value}});
      // this.yshow=false;
      // this.MXlistLoading = true;

      // this.axios
      //   .post('/PaperBoardController/queryPaperBoardDetalied', { qybh: this.qybh, cgdh: cCGDH })
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status === '1') {
      //       this.MXtableData = response.data.data.detalied;
      //       this.MXlistLoading = false;
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
    ZXhandleClick(value) {//双击纸箱表格行
      // this.yshow=false;
      this.MXlistLoading = true;
      var cCGDH = value.cCGDH;
      this.axios
        .post('/CartonController/queryCartonDetail', { qybh: this.qybh, cgdh: cCGDH })
        .then(response => {
          console.log(response);
          if (response.data.status === '1') {
            this.MXtableData = response.data.data.cartonDetail;
            this.MXlistLoading = false;
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

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    }
  }
};
</script>

<style lang="scss" scoped>
.paginationClass {
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 70%;
}
</style>

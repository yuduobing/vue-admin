<template>
  <!-- 纸箱采购单界面 -->
  <div>
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
          <el-form-item label="产品名称"><el-input v-model="form.cpmc"   @change="search"  @blur="search" placeholder="请输入内容" style="width: 170px;"></el-input></el-form-item>
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
          <el-input v-model="form.nGG_L" placeholder="长" style="width: 60px;"  @change="search"  @blur="search"></el-input>
          ×
          <el-input v-model="form.nGG_W" placeholder="宽" style="width: 60px;"  @change="search"  @blur="search"></el-input>

          ×
          <el-input v-model="form.nGG_H" placeholder="高" style="width: 60px;"  @change="search"  @blur="search"></el-input>





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

    <el-table
      :data="tableData"
      border
      v-loading="listLoading"
      element-loading-text = "努力加载中..."
      style="width: 95%;margin:0px 40px 0px 40px"
      height="600px"
      highlight-current-row
      max-height="400"
      @row-dblclick="ZXhandleClick"

    >


      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>

      <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="100" sortable></el-table-column><el-table-column  align="center" label="状态" min-width="80">
      <template slot-scope="scope">
        <span v-if="   scope.row.cWCZT!=null && scope.row.cWCZT!='' "  style="color: #ff0000">{{scope.row.cWCZT}}</span>
        <span v-else >待审核</span>
      </template>

    </el-table-column>

      <el-table-column prop="ckhddhm" align="center" label="客户订单号" min-width="110"  sortable></el-table-column>
      <el-table-column prop="gysmc" align="center" label="供应商" min-width="130" sortable></el-table-column>
      <el-table-column prop="cCPMC" align="center" label="品名" min-width="80" sortable></el-table-column>
      <el-table-column prop="CardboardPrice" align="center" label="规格" min-width="80" sortable>

        <template slot-scope="scope">
          <span v-if="scope.row.nGG_L != null && scope.row.nGG_L != null && scope.row.nGG_L != null">{{ scope.row.nGG_L }}*{{ scope.row.nGG_W }}*{{ scope.row.nGG_H }}</span>
        </template>


      </el-table-column>
      <el-table-column prop="cWCZT1" align="center" label="材质" min-width="80" sortable></el-table-column>
      <el-table-column prop="cXXMC" align="center" label="箱型" min-width="130" sortable></el-table-column>
      <el-table-column prop="nKunS" align="center" label="捆扎数" min-width="100" sortable></el-table-column>
      <el-table-column prop="cDBFS" align="center" label="打包方式"        min-width="100" sortable></el-table-column>
      <el-table-column prop="cYSMC" align="center" label="印色" min-width="80" sortable></el-table-column>

      <el-table-column prop="cKHWLBM" align="center" label="客户物料号" min-width="110px" sortable></el-table-column>
      <el-table-column prop="cHTH" align="center" label="合同号" min-width="120" sortable></el-table-column>
      <!--        <el-table-column prop="dSCSJ" align="center" label="生产时间" min-width="100" :formatter="SCSJ" sortable></el-table-column>-->

      <el-table-column prop="nCGSL" align="center" label="采购数量" min-width="100" sortable></el-table-column>


      <el-table-column prop="cSHDZ" align="center" label="送货地址" min-width="200"></el-table-column>

      <el-table-column prop="cshbz" align="center" label="送货备注" min-width="200"></el-table-column>
      <el-table-column prop="cTSYQ" align="center" label="特殊要求" min-width="200"></el-table-column>
      <el-table-column prop="dCGRQ" align="center" label="采购日期" min-width="120"   :formatter="dateFormat"  ></el-table-column>
      <el-table-column prop="dXGRQ" align="center" label="修改日期" min-width="120"   :formatter="dateFormat2"  ></el-table-column>


    </el-table>





    <div class="paginationClass">
      <el-pagination
        :current-page="currentPage1"
        :page-size="10"
        :page-sizes="[10, 20, 30, 40]"
        :total="rawList.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>


  </div>
</template>

<script>
  let moment = require('moment'); //调用时间过滤器
  // 中文简体
  moment.locale('zh-cn');
  export default {
    data() {
      return {


        //匹配数据
        restaurants: [],
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
              return time.getTime() < new Date(this.form.startTime).getTime()  + 24 * 60 * 60 * 1000
            }
          }
        },
        options2: [
          { label: '未收货', value: '未收货' },
          { label: '审核', value: '审核' },
          { label: '瓦机排程', value: '瓦机排程' },
          { label: '已入库', value: '入库' },
          { label: '已出库', value: '出库' },
          { label: '收货', value: '收货' },
          { label: '有库存', value: '有库存' }

        ],
        options3: [
          { label: '采购时间', value: '1' },
          { label: '操作时间', value: '2' },


        ],
        form: {
          timeid:'1',
          startTime: new Date().getTime() -  24 * 60 * 60 * 1000,

          endTime: new Date(),
          cgdh: '',
          zt: [],
          //产品名称搜索
          cpmc: '',
          cSHDZ: '',
          //高度
          nGG_L: '',
          nGG_W: '',
          nGG_H: '',

          nbpc: '',
          nbpk: '',
          clxmc: '',

        },
        cpmc: '', //产品名称
        cpmcOptions: [], //产品名称下拉选项
        tableData: [], //表格数据
        listLoading: true,
        rawList: [],
        currentPage1: 1,
        pageSize: 10,
        searchNumber: 0,
        tableList: [],
        ZXTitle: '', //弹窗标题
        showEdit: false, //表格双击弹窗显示
        options: [{ label: '纸箱', value: '1' }, { label: '纸箱', value: '2' }],

        gysoptions: '', //供应商下拉框
        Boxoptions: '', //箱型options
        radio: false, //AB面
        Formdisabled2: true,
        ProductInfo: {
          cgdh: '', //采购单号
          Salesman: '', //业务员
          khddhm: '', //客户订单号
          gysmc: '', //供应商名称
          cqybhGys: '', //供应商编号
          khwlbm: '', //物料号
          cpmc: '', //产品名称
          cpbh: '', //产品编号
          HTH: '', //合同号
          xxmc: '', //箱型
          cgsl: '', //采购数量
          dbfs: '', //打包方式
          yxlx: '', //压线类型
          ggl: '', //制造mm长
          ggw: '', //宽
          ggh: '', //高
          shdz: '', //送货地址
          // CGS: '', //长格数
          // DGS: '', //短格数
          shbz: '', //送货备注
          lxmc: '', //瓦楞
          pfmc: '', //配方
          tsyq: '', //特殊要求
          kuns: '', //捆数
          ccbs: '',
          // PFJ: '', //平方价
          // DJ: '', //单价
          // YH: '', //优惠
          ysmc: '', //印色
          jhrq: '', //送货时间
          cCDYX: '', //长度压线
          cGDYX: '' //压线
        },
        select: '',
        value:'2',
        dialogVisible: false, //图稿上传弹框
        uploadData: '', //上传文件时存储其他需要提交给后台的数据
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'cCPMC'
        },
        startTimeRange: '',
        pickerOptions: {
          disabledDate(time) {
            // return time.getTime() < Date.now()-8.64e7;//设置选择今天以及今天之后的日期
            return time.getTime() < Date.now(); //设置选择今天之后的日期（不能选择当天时间）
          },
          selectableRange: moment(new Date(new Date().setHours(6))).format('hh') + ':00:00 - 23:59:00'
        },
        qybh: '',
        CP: [],
        cZCPH: '',
        gysbh: '', //供应商编号
        Formdisabled: false //表单禁用
      };
    },
    watch: {
      startTime: function (newVal, oldVal) {
        let selectDate = moment(newVal).format('yyyyMMdd');
        let oldDate = moment(oldVal).format('yyyyMMdd');
        let nowDate = moment(new Date()).format('yyyyMMdd');
        // 如果两次选择的时间不相等
        if (oldDate !== selectDate) {
          // 如果这次选择的时间等于今天的时间就不让选当前小时之前，否则就可以选全部时间段
          if (selectDate === nowDate) {
            this.pickerOptions.selectableRange = moment(new Date(new Date().setHours(6))).format('hh') + ':06:00 - 23:59:00';
          } else {
            this.pickerOptions.selectableRange = '06:00:00 - 23:59:00';
          }
          let realNewVal = new Date(moment(newVal).format('yyyy-MM-dd') + moment(oldVal).format(' hh:mm:ss'));
          // 如果这个时间比当前时间小，就等于当前时间，否则等于这个参数的时间
          if (realNewVal.getTime() < new Date().getTime()) {
            this.ProductInfo.shsj = new Date();
          } else {
            this.ProductInfo.shsj = realNewVal;
          }
        }
      }
    },
    mounted() {
      // this.gettableData();
      var storage = window.sessionStorage;
      this.qybh = storage.getItem('QYBH');



      this.search();
    },
    methods: {
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
      //修改数据
      ZXhandleClick(value) {


        var cCGDH = value.cCGDH;


        this.$router.push({ path:'/Productdetail' ,query:{qybh: this.qybh, cgdh: cCGDH,body:value}});

      },
      gettableData() {
        //获取表格数据
        this.search()
        this.listLoading = false
        // this.axios
        //   .post('/CartonController/queryCarton', {qybh: this.qybh})
        //   .then(response => {
        //     console.log(response);
        //     if (response.data.status === '1') {
        //       this.tableData = response.data.data.carton;
        //       this.rawList = response.data.data.carton;
        //       this.tableList = response.data.data.carton;
        //       this.currentChangePage(this.rawList, 1);
        //       this.listLoading = false
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
      search() {
        //查询方法
        this.listLoading = false
        this.load
        var startTime = '';
        var endTime = '';


        if (typeof(this.form.startTime) === 'number') {
          startTime = moment(this.form.startTime).format('YYYY-MM-DD') + ' 00:00:00';
        }

        if (typeof(this.form.endTime) === 'number'||typeof(this.form.endTime) === 'string'){

          endTime =  moment(this.form.endTime).format('YYYY-MM-DD') + ' 23:59:59';

        }
        this.axios
          .post('/CartonController/queryCarton', {
            nGG_L:this.form.nGG_L,
            nGG_W:this.form.nGG_W,
            nGG_H:this.form.nGG_H,
            //楞型
            cLXMC:this.form.clxmc,
            qybh: this.qybh,
            startTime: startTime,
            endTime:endTime,
            cgdh: this.form.cgdh,
            status: this.form.zt,
            cCPMC: this.form.cpmc,
            cPFMC: this.form.cPFMC,
            timeid:this.form.timeid,
            // start: this.ZXcurrentPage1,
            // limit: this.ZXpageSize,

          })
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {

              console.log("打印的数据"+JSON.stringify(response.data.data.carton));
              this.tableData = response.data.data.carton;
              this.rawList = response.data.data.carton;
              this.tableList = response.data.data.carton;
              this.listLoading = false
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
      update(index, row) {
        //双击表格行弹框事件或点击修改按钮
        console.log(row)
        this.showEdit = true;
        this.Formdisabled2 = false;
        this.Formdisabled = false;
        this.ZXTitle = '纸箱采购单修改';
        this.getsupplier();
        this.getcpmc();
        this.cpmc = row.cCPMC;
        this.cZCPH = row.cZCPH;
        this.getcpnj();
        this.ProductInfo.khddhm = row.ckhddhm;
        this.ProductInfo.gysmc = row.gysmc;
        this.ProductInfo.cqybhGys = row.cQYBH_gys;
        this.ProductInfo.khwlbm = row.cKHWLBM;
        this.ProductInfo.cpmc = row.cCPMC;
        this.ProductInfo.dcgrq = row.dCGRQ;
        this.ProductInfo.cpbh = row.cCPBH;
        this.ProductInfo.HTH = row.cHTH;
        this.ProductInfo.xxmc = row.cXXMC;
        this.ProductInfo.cgsl = row.nCGSL;
        this.ProductInfo.dbfs = row.cDBFS;
        this.ProductInfo.yxlx = row.cYXLX;
        this.ProductInfo.ggl = row.nGG_L;
        this.ProductInfo.ggw = row.nGG_W;
        // this.ProductInfo.ggh=row.nGG_H
        this.ProductInfo.shdz = row.cSHDZ;
        this.ProductInfo.shbz = row.cshbz;
        this.ProductInfo.lxmc = row.cLXMC;
        this.ProductInfo.pfmc = row.cPFMC;
        this.ProductInfo.tsyq = row.cTSYQ;
        this.ProductInfo.shdz = row.cSHDZ;
        this.ProductInfo.kuns = row.nKunS;
        this.ProductInfo.ccbs = row.cCCBS;
        this.ProductInfo.ysmc = row.cYSMC;
        this.ProductInfo.jhrq = moment(row.dJHRQ).format('YYYY-MM-DD HH:mm:ss');
        this.ProductInfo.cCDYX = row.cCDYX;
        this.ProductInfo.cGDYX = row.cGDYX;
        this.ProductInfo.cgdh = row.cCGDH;
        //弹窗赋值
      },
      check(index, row) {
        //审核按钮执行事件，并对form表单进行赋值且禁用
        this.showEdit = true;
        this.Formdisabled = true;
        this.ZXTitle = '纸箱采购单审核';
        this.getsupplier();
        this.getcpmc();
        this.cpmc = row.cCPMC;
        this.cZCPH = row.cZCPH;
        this.getcpnj();
        this.ProductInfo.khddhm = row.ckhddhm;
        this.ProductInfo.gysmc = row.gysmc;
        this.ProductInfo.cqybhGys = row.cQYBH_gys;
        this.ProductInfo.khwlbm = row.cKHWLBM;
        this.ProductInfo.cpmc = row.cCPMC;
        this.ProductInfo.cpbh = row.cCPBH;
        this.ProductInfo.HTH = row.cHTH;
        this.ProductInfo.xxmc = row.cXXMC;
        this.ProductInfo.cgsl = row.nCGSL;
        this.ProductInfo.dbfs = row.cDBFS;
        this.ProductInfo.yxlx = row.cYXLX;
        this.ProductInfo.ggl = row.nGG_L;
        this.ProductInfo.ggw = row.nGG_W;
        // this.ProductInfo.ggh=row.nGG_H
        this.ProductInfo.shdz = row.cSHDZ;
        this.ProductInfo.shbz = row.cshbz;
        this.ProductInfo.lxmc = row.cLXMC;
        this.ProductInfo.pfmc = row.cPFMC;
        this.ProductInfo.tsyq = row.cTSYQ;
        this.ProductInfo.shdz = row.cSHDZ;
        this.ProductInfo.kuns = row.nKunS;
        this.ProductInfo.ccbs = row.cCCBS;
        this.ProductInfo.ysmc = row.cYSMC;
        this.ProductInfo.jhrq = moment(row.dJHRQ).format('YYYY-MM-DD HH:mm:ss');
        this.ProductInfo.cCDYX = row.cCDYX;
        this.ProductInfo.cGDYX = row.cGDYX;
        this.ProductInfo.cgdh = row.cCGDH;
      },
      onSubmit() {

        //纸箱信息保存
        if (this.ZXTitle == '纸箱下单') {
          this.addZX();
          this.gettableData()
        } else if (this.ZXTitle == '纸箱采购单修改') {
          this.updateZX();
          this.gettableData()
        } else {
          this.checkZX();
          this.gettableData()
        }


      },


      close() {
        this.getdata();
        console.log("进行关闭")

        // this.treeData = [];
        // this.gysoptions = [];

        // Object.assign(this.$data, this.$options.data.call(this))
        var storage = window.sessionStorage;
        this.qybh = storage.getItem('QYBH');
        this.qybh = storage.getItem('QYBH');
        this.gettableData();
        this.getsupplier();

        // location.reload();
        // this.$router.push({
        //   path: '/UpdateCardboard',
        //   query: {
        //     data: row
        //   }
        // });

        this.$refs.xModal.close();

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
        //新增按钮执行事件
        this.showEdit = true;
        this.ZXTitle = '纸箱下单';
      },
      JumpUpload() {
        //上传按钮执行事件
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
        return isLt2M
      },
      upload(f) {
        let param = new FormData(); //创建form对象
        console.log(f)
        param.append('file', f.file)
        param.append('filename', f.file.name); //通过append向form对象添加数据
        param.append('cpbh', this.ProductInfo.cpbh);
        this.axios
          .post(
            '/ProductController/uploadImage', param
            , {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ) //上传图片
          .then(response => {
            console.log(response);
            if (response.data.status == '0') {
              this.$message({
                showClose: true,
                type: 'error',
                message: response.data.error.message
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
        // if (response.code === 0) {
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
        //     message: response.msg,
        //     duration: 3000
        //   });
        // }
      },
      rowStyle({row, rowIndex}) {
        return 'height:20px;';
      }
    }
  };
</script>

<style lang="scss">
  .el-tree--highlight-current {
    overflow: auto;
  }

  .cell-grey {
    background: #f2f2f2;
  }

  .paginationClass {
    margin-top: 5px;
    margin-right: 40px;
    float: right;
  }

  .outer {
    display: flex;
    width: 1100px;
    // margin:  auto;
    margin-right: 10px;
  }

  .box1 {
    width: 290px;
    margin-left: 10px;
    // height: 300px;
    // background: #ccc;
  }

  .vertical,
  .box3 .box2 {
    width: 450px;
    // height: 300px;
    background: #ccc;
  }

  .box1 {
    margin-right: 10px;
  }

  .box2 {
    margin-left: 10px;
  }

  .vertical {
    width: 1px;
  }
</style>

<template>
  <!-- 纸箱采购单界面 -->
  <div>
    <el-form label-width="120px" ref="form" style="margin:30px 60px 0px 0px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="采购单号">
            <el-input placeholder="请输入内容" style="width: 160px;" v-model="form.cgdh" @change="search"  @blur="search"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="采购日期"  >
            <el-date-picker  :picker-options="pickerOptionsStart" v-model="form.startTime"  type="date" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期" style="width: 135px;">

            </el-date-picker>--<el-date-picker  :picker-options="pickerOptionsEnd" v-model="form.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 135px;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button @click="search" size="small" style="margin-left: 10px;" type="primary">查询</el-button>
          <el-button @click="add" size="small" style="margin-left: 10px;" type="primary">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      :row-style="rowStyle"
      align="center"
      border
      element-loading-text="努力加载中..."
      highlight-current-row
      max-height="80%"
      ref="singleTable"

      style="width: 95%;margin:10px 40px 0px 40px;"
      v-loading="listLoading"
    >
      <!-- @row-dblclick="update" -->
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column align="center" label="审核" min-width="80px" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.cSHBZ == 1" style="color: #ff0000">已审核</span>
          <span v-else-if="scope.row.cSHBZ == 0" >待审核</span>

        </template>
      </el-table-column>
      <el-table-column align="center" label="采购单号" min-width="130px" prop="cCGDH" sortable></el-table-column>
      <el-table-column align="center" label="产品编号" min-width="130px" prop="cCPBH" sortable></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="产品名称" min-width="130px" prop="cCPMC"
                       sortable></el-table-column>
<!--      <el-table-column :show-overflow-tooltip="true" align="center" label="配方名称" min-width="130px" prop="nPFMC"-->
<!--                       sortable></el-table-column>-->
      <el-table-column align="center" label="供应商名称" min-width="110px" prop="gysmc" show-overflow-tooltip
                       sortable></el-table-column>
      <!-- <el-table-column prop="SquareWeight" align="center" label="销售员" min-width="100px" sortable></el-table-column> -->
      <el-table-column :show-overflow-tooltip="true" align="center" label="规格" min-width="100px" prop="CardboardPrice"
                       sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.nGG_L != null && scope.row.nGG_L != null && scope.row.nGG_L != null">{{ scope.row.nGG_L }}*{{ scope.row.nGG_W }}*{{ scope.row.nGG_H }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="楞型" min-width="80px" prop="cLXMC" sortable></el-table-column>
      <!-- <el-table-column prop="PurchasingFormula" align="center" label="瓦楞方向" min-width="100px" sortable></el-table-column> -->
      <el-table-column align="center" label="箱型名称" min-width="110px" prop="cXXMC" sortable></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="长度压线" min-width="100px" prop="cCDYX"
                       sortable></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="压线" min-width="100px" prop="cGDYX"
                       sortable></el-table-column>
      <el-table-column align="center" label="压线类型" min-width="100px" prop="cYXLX" sortable></el-table-column>
      <!-- <el-table-column prop="HighPressureLine" align="center" label="模板号" min-width="100px" sortable></el-table-column>
      <el-table-column prop="NetProduct" align="center" label="落料规格" min-width="100px" sortable></el-table-column>
      <el-table-column prop="Width" align="center" label="平方单价" min-width="100px" sortable></el-table-column>
      <el-table-column prop="PackingMethod" align="center" label="产品类型" min-width="100px" sortable></el-table-column> -->
      <el-table-column align="center" label="创建人" min-width="100px" prop="cCJR" sortable></el-table-column>

      <el-table-column align="center" label="送货地址" min-width="120px" prop="cSHDZ" sortable></el-table-column>


      <el-table-column align="center" fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="update(scope.$index, scope.row)"   :disabled="scope.row.cSHBZ == 1" plain size="mini" type="primary">修改</el-button>
          <el-button @click="check(scope.$index, scope.row)"  :disabled="scope.row.cSHBZ == 1" plain size="mini" type="primary">审核</el-button>
        </template>
      </el-table-column>
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
    <!-- 双击表格行弹框 -->
    <vxe-modal :title="ZXTitle" destroy-on-close esc-closable ref="xModal" resize style="margin-left: 130px;"
               v-model="showEdit" width="1200">
      <div class="outer">
        <div class="box1">
          <el-select
            @change="selectTrigger(cpmc)"
            clearable
            default-first-option
            filterable
            placeholder="请选择产品名称"
            style="width:100%"
            v-bind:disabled="Formdisabled"
            v-model="cpmc"
          >
            <el-option :key="item.cCPMC" :label="item.cCPMC" :value="item.cCPMC" :value-key="item.cCPMC"
                       v-for="item in cpmcOptions">
              <!-- :value="`${item.cCPMC}.${item.gysmc}`" -->
              <span style="float: left">{{ item.cCPMC }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.gysmc }}</span> -->
              <span style="float: right; color: #8492a6; font-size: 13px ;overflow:hidden;
   text-overflow:ellipsis;
   white-space:nowrap;
   width:10px;
 ">{{ item.nGG_L }}*{{ item.nGG_W }}*{{ item.nGG_H }}</span>
            </el-option>
          </el-select>
          <el-tree
            :check-strictly="true"
            :data="treeData"
            :expand-on-click-node="false"
            :load="loadNode"
            :props="defaultProps"
            default-expand-all
            empty-text="暂时没有数据"
            highlight-current
            node-key="cCPBH"
            ref="tree"
            show-checkbox

          ></el-tree>
          <el-button @click="confirm" type="primary">确定</el-button>
        </div>
        <div class="vertical"></div>
        <div class="box2">
          <vxe-form :data="ProductInfo" size="mini" title-align="right" title-width="90" v-bind:disabled="Formdisabled">
            <el-row>
              <!-- <vxe-form-item title="业务员:" field="Salesman" span="12">
                <el-select v-model="ProductInfo.Salesman" filterable placeholder="请选择业务员" no-data-text="无业务员" style="width: 290px;">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </vxe-form-item> -->
              <vxe-form-item field="cqybhGys" span="12" title="供应商:">
                <!-- <vxe-input v-model="ProductInfo.gysmc" style="width: 290px;"></vxe-input> -->
                <!--  -->
                <el-select
                  @change="selectGYS(ProductInfo.cqybhGys)"
                  filterable
                  no-data-text="无供应商"
                  placeholder="请选择供应商"
                  style="width: 290px;"
                  v-bind:disabled="Formdisabled"
                  v-model="ProductInfo.cqybhGys"
                >
                  <el-option :key="item.qymc" :label="item.qymc" :value="item.qybh"
                             v-for="item in gysoptions"></el-option>
                </el-select>
              </vxe-form-item>
              <vxe-form-item field="khddhm" span="12" title="客户订单号:">
                <vxe-input style="width:280px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.khddhm"></vxe-input>
              </vxe-form-item>
            </el-row>
            <el-row>
              <vxe-form-item field="DoorWidth" title="产品名称:">
                <vxe-input style="width: 290px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.cpmc"></vxe-input>
                <!-- <vxe-input v-model="ProductInfo.DoorWidth" style="width: 38px;"></vxe-input> -->
              </vxe-form-item>
              <vxe-form-item field="khwlbm" span="12" title="物料号:">
                <vxe-input style="width:280px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.khwlbm"></vxe-input>
              </vxe-form-item>
            </el-row>
            <el-row>
              <vxe-form-item field="Box" title="箱型:">
                <vxe-input style="width: 290px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.xxmc"></vxe-input>
                <!-- <el-select v-model="ProductInfo.xxmc" filterable placeholder="请选择" style="width: 290px;">
                  <el-option v-for="item in Boxoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select> -->
              </vxe-form-item>
              <vxe-form-item field="HTH" span="12" title="合同号:">
                <vxe-input style="width:280px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.HTH"></vxe-input>
              </vxe-form-item>
            </el-row>
            <el-row>
              <vxe-form-item field="Chang" span="4" title="制造mm长:">
                <vxe-input style="width: 75px" v-bind:disabled="Formdisabled" v-model="ProductInfo.ggl"></vxe-input>
              </vxe-form-item>
              <vxe-form-item field="Kuan" span="4" title="宽" title-width="22">
                <vxe-input style="width: 75px" v-bind:disabled="Formdisabled" v-model="ProductInfo.ggw"></vxe-input>
              </vxe-form-item>
              <vxe-form-item field="Gao" span="4" title="高" title-width="22">
                <vxe-input style="width: 75px" v-bind:disabled="Formdisabled" v-model="ProductInfo.ggh"></vxe-input>
              </vxe-form-item>
              <vxe-form-item field="CGSL" span="4" title="采购数量:">
                <vxe-input style="width: 108px" v-bind:disabled="Formdisabled" v-model="ProductInfo.cgsl"></vxe-input>
              </vxe-form-item>
              <vxe-form-item field="dbfs" span="4" title="打包方式:" title-width="70">
                <vxe-input style="width: 88px" v-bind:disabled="Formdisabled" v-model="ProductInfo.dbfs"></vxe-input>
              </vxe-form-item>
            </el-row>
            <el-row>
              <vxe-form-item field="WL" title="瓦楞:">
                <vxe-input style="width: 60px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.lxmc"></vxe-input>
              </vxe-form-item>
              <vxe-form-item field="PF" title="配方:" title-width="40">
                <vxe-input style="width:180px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.pfmc"></vxe-input>
              </vxe-form-item>
              <vxe-form-item field="SHDZ" span="12" title="送货地址:">
                <vxe-input style="width:280px;" v-bind:disabled="Formdisabled" v-model="ProductInfo.shdz"></vxe-input>
              </vxe-form-item>
            </el-row>
            <el-row>
              <!-- <vxe-form-item title="长格数:" field="CGS"><vxe-input v-model="ProductInfo.CGS" style="width: 115px;"></vxe-input></vxe-form-item>
              <vxe-form-item title="短格数" field="DGS" title-width="50"><vxe-input v-model="ProductInfo.DGS" style="width: 115px;"></vxe-input></vxe-form-item> -->
              <vxe-form-item field="ysmc" title="印色:">
                <vxe-input placeholder="请输入印色" style="width:294px;" v-bind:disabled="Formdisabled2"
                           v-model="ProductInfo.ysmc"></vxe-input>
              </vxe-form-item>


              <vxe-form-item field="shbz" span="12" title="送货备注:">
                <!--                      <el-autocomplete-->
                <!--                        type!="textarea"-->
                <!--                        size="medium "-->
                <!--                  v-model="ProductInfo.shbz"-->
                <!--                  :fetch-suggestions="querySearch"-->
                <!--                  placeholder="请输入内容"-->

                <!--                ></el-autocomplete>-->
                <el-autocomplete
                  :fetch-suggestions="querySearch"
                  class="inline-input"


                  placeholder="请输入内容"
                  v-model="ProductInfo.shbz"
                ></el-autocomplete>

              </vxe-form-item>
            </el-row>
            <el-row>
              <vxe-form-item field="YS" title="送货时间:">
                <el-date-picker
                  :picker-options="pickerOptions"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                  type="datetime"
                  v-bind:disabled="Formdisabled"
                  v-model="ProductInfo.jhrq"
                ></el-date-picker>
              </vxe-form-item>
              <vxe-form-item field="YSJH" span="12" style="margin-left: 90px;" title="特殊要求:">
                <el-input autosize placeholder="请输入内容" style="width:280px;" type="textarea"
                          v-bind:disabled="Formdisabled" v-model="ProductInfo.tsyq"></el-input>
              </vxe-form-item>
            </el-row>
            <!-- <el-row> -->
            <!-- <vxe-form-item title="平方价:" field="PFJ"><vxe-input v-model="ProductInfo.PFJ" style="width:62px;" type="number"></vxe-input></vxe-form-item>
            <vxe-form-item title="单价:" field="DJ" title-width="40"><vxe-input v-model="ProductInfo.DJ" style="width:62px;" type="number"></vxe-input></vxe-form-item>
            <vxe-form-item title="优惠:" field="YH" title-width="40"><vxe-input v-model="ProductInfo.YH" style="width:62px;" type="number"></vxe-input></vxe-form-item> -->
            <!-- <vxe-form-item title="送货时间:" field="YS">
              <el-date-picker v-model="ProductInfo.jhrq" type="datetime" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" placeholder="选择日期时间"></el-date-picker>
            </vxe-form-item> -->
            <!-- <vxe-form-item title="图稿:" field="TG">
              <el-button size="small" type="primary" @click="JumpUpload" v-bind:disabled="Formdisabled">
                上传
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </vxe-form-item>
          </el-row> -->
            <vxe-button @click="onSubmit" size="small" status="primary" style="margin-left: 40%;">保存</vxe-button>
            <!-- <vxe-button @click="onSubmit" status="primary" size="small" style="margin-left: 10px;">全部保存</vxe-button> -->
            <vxe-button @click="close" size="small">取消</vxe-button>
          </vxe-form>
        </div>
        <!-- <div class="vertical"></div> -->
      </div>
    </vxe-modal>
    <!-- 双击表格行弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="图稿上传" width="30%">
      <el-upload :before-upload="beforeAvatarUpload" :http-request="upload" :limit="1"
                 :on-success="uploadSuccess"
                 action="http://192.168.100.78:8080/ProductController/uploadImage" class="upload-demo" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">上传文件不能超过10MB</div>
      </el-upload>
      <div class="dialog-footer" slot="footer">
        <!--<el-button v-on:click="dialogVisible = false">取 消</el-button>-->
        <el-button type="primary" v-on:click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
        form: {
          startTime: new Date().getTime() -  24 * 60 * 60 * 1000,

          endTime: new Date(),
          cgdh: '',
          zt: [],
          cSHDZ: '',
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
        options: '', //业务员
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
        value: '',
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
      this.gettableData();
      this.getsupplier();

      this.getdata();
    },
    methods: {

      querySearch(queryString, cb) {

        // this.axios
        //   // .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
        //   .post('/userController/queryCYBZ ', { cQYBH: this.qybh, start: this.currentPage1, limit: this.pageSize })
        //   .then(response => {
        //
        //
        //     if (response.data.status === '1') {
        //
        //
        //
        //       response.data.data.forEach(function(values,key,arr){
        //
        //
        //         var a={
        //           value:values.cBeiZ
        //         }
        //
        //
        //         this.restaurants.push(a)
        //         JSON.stringify("加班的数据"+JSON.stringify(that.restaurants))
        //
        //
        //
        //       })
        //
        //
        //
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


        var restaurants = this.restaurants;


        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        console.log("返回的数据1" + JSON.stringify(results));
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      getdata() {

        var that = this
        this.restaurants = []
        this.axios
          // .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
          .post('/userController/queryCYBZ ', {cQYBH: this.qybh, start: this.currentPage1, limit: this.pageSize})
          .then(response => {


            if (response.data.status === '1') {


              response.data.data.forEach(function (values, key, arr) {


                var a = {
                  value: values.cBeiZ
                }


                that.restaurants.push(a)
                JSON.stringify("加班的数据" + JSON.stringify(that.restaurants))


              })


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
      // 调用 callback 返回建议列表的数据 cb(results); },
      confirm() {
        var tree = this.$refs.tree.getCheckedNodes();
        for (var i = 0; i < tree.length; i++) {
          this.ProductInfo.xxmc = tree[i].cXXMC;
          this.ProductInfo.ggl = tree[i].nGG_L;
          this.ProductInfo.ggw = tree[i].nGG_W;
          this.ProductInfo.ggh = tree[i].nGG_H;
          this.ProductInfo.lxmc = tree[i].cLXMC;
          this.ProductInfo.pfmc = tree[i].cPFMC;
          this.ProductInfo.ysmc = tree[i].cYSMC;
          this.ProductInfo.cpmc = tree[i].cCPMC;
          this.ProductInfo.khwlbm = tree[i].cKHWLBM;
          this.ProductInfo.yxlx = tree[i].cYXLX;
          this.ProductInfo.cpbh = tree[i].cCPBH;
          this.ProductInfo.kuns = tree[i].nKunS;
          this.ProductInfo.ccbs = tree[i].cCCBS;
          this.ProductInfo.cCDYX = tree[i].cCDYX;
          this.ProductInfo.cGDYX = tree[i].cGDYX;
        }
      },
      getsupplier() {
        //获取供应商
        this.axios
          .post('/CustomerController/querySupplierByCustomer', {qybh: this.qybh})
          .then(response => {
            if (response.data.status === '1') {
              var data = response.data.data.supplier;
              var result = []
              for (var i = 0; i < data.length; i++) {
                if (data[i].lTYBZ == false) {
                  result.push(data[i])
                }
              }
              console.log('result====>' + result)
              this.gysoptions = result
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
      selectGYS(cqybhGys) {
        //选中获取产品名称
        this.getcpmc();
      },
      getcpmc() {
        //获取产品名称
        this.axios
          .post('/ProductController/queryProductFileNoTree', {qybh: this.qybh, gysbh: this.ProductInfo.cqybhGys})
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {
              this.cpmcOptions = response.data.data.productList;
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
      selectTrigger(cpmc) {
        this.axios
          .post('/ProductController/queryProductFile', {qybh: this.qybh, cpmc: cpmc})
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {
              this.CP = response.data.data.productList;
              var cp = JSON.parse(JSON.stringify(this.CP));
              this.cZCPH = cp[0].cZCPH;
              // this.ProductInfo.yxlx=cp[0].cYXLX
              // this.ProductInfo.cpbh=cp[0].cCPBH
              // this.ProductInfo.kuns=cp[0].nKunS
              // this.ProductInfo.ccbs=cp[0].cCCBS
              // this.ProductInfo.gysmc=cp[0].gysmc
              // this.ProductInfo.cqybhGys=cp[0].cQYBH_gys
              this.getcpnj();
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
      getcpnj() {
        this.axios
          .post('/ProductController/queryProductFile', {qybh: this.qybh, cZCPH: this.cZCPH})
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {
              this.treeData = response.data.data.productList;
              // var cp=JSON.parse(JSON.stringify(this.CP))
              // this.cZCPH =cp[0].cZCPH
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
      loadNode(node, resolve) {
        setTimeout(() => {
          resolve();
        }, 500);
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
            nGG_L:this.form.nbpc,
            nGG_W:this.form.nbpk,
            cLXMC:this.form.clxmc,
            qybh: this.qybh,
            startTime: startTime,
            endTime:endTime,
            cgdh: this.form.cgdh,
            status: this.form.zt,
            // start: this.ZXcurrentPage1,
            // limit: this.ZXpageSize,
            cSHDZ: this.form.cSHDZ,
          })
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {

              console.log("打印的数据"+JSON.stringify( this.tableData));
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
      //纸箱采购单下单
      addZX() {
        var jhrq = moment(this.ProductInfo.jhrq).format('YYYY-MM-DD HH:mm:ss');
        this.axios
          .post('/CartonController/CartonBilling', {
            qybh: this.qybh,
            cjr: this.qybh,
            cZCPH: this.cZCPH,
            khddhm: this.ProductInfo.khddhm, //客户订单号
            gysmc: this.ProductInfo.gysmc, //供应商名称
            gysbh: this.ProductInfo.cqybhGys, //供应商编号
            khwlbm: this.ProductInfo.khwlbm, //物料号
            cpmc: this.ProductInfo.cpmc, //产品名称
            cpbh: this.ProductInfo.cpbh, //产品编号
            HTH: this.ProductInfo.HTH, //合同号
            xxmc: this.ProductInfo.xxmc, //箱型
            cgsl: this.ProductInfo.cgsl, //采购数量
            dbfs: this.ProductInfo.dbfs, //打包方式
            yxlx: this.ProductInfo.yxlx, //压线类型
            ggl: this.ProductInfo.ggl, //制造mm长
            ggw: this.ProductInfo.ggw, //宽
            ggh: this.ProductInfo.ggh, //高
            shdz: this.ProductInfo.shdz, //送货地址
            shbz: this.ProductInfo.shbz, //送货备注
            lxmc: this.ProductInfo.lxmc, //瓦楞
            pfmc: this.ProductInfo.pfmc, //配方
            tsyq: this.ProductInfo.tsyq, //特殊要求
            ysmc: this.ProductInfo.ysmc, //印色
            cdyx: this.ProductInfo.cCDYX, //长度压线
            gdyx: this.ProductInfo.cGDYX, //压线
            jhrq: jhrq //送货时间
          })
          .then(response => {

            if (response.data.status === '1') {
              this.treeData = response.data.data.productList;
              // var cp=JSON.parse(JSON.stringify(this.CP))
              // this.cZCPH =cp[0].cZCPH
              console.log("返回的灿说" + JSON.stringify(response.data.status))
              this.showEdit = false;
              this.$message({
                showClose: true,
                type: 'success',
                message: response.data.data
              });
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
      //修改纸箱采购单
      updateZX() {
        console.log("修改后" + this.ProductInfo.dcgrq)
        var jhrq = moment(this.ProductInfo.jhrq).format('YYYY-MM-DD HH:mm:ss');
        var xgrq = moment(new Date()).format('YYYY-MM-DD');
        this.axios
          .post('/CartonController/modifyCarton', {
            qybh: this.qybh,
            cZCPH: this.cZCPH,
            dCGRQ: moment(this.ProductInfo.dcgrq).format('YYYY-MM-DD HH:mm:ss'),
            cgdh: this.ProductInfo.cgdh,//采购单号
            khddhm: this.ProductInfo.khddhm, //客户订单号
            gysmc: this.ProductInfo.gysmc, //供应商名称
            gysbh: this.ProductInfo.cqybhGys, //供应商编号
            khwlbm: this.ProductInfo.khwlbm, //物料号
            cpmc: this.ProductInfo.cpmc, //产品名称
            cpbh: this.ProductInfo.cpbh, //产品编号
            HTH: this.ProductInfo.HTH, //合同号
            xxmc: this.ProductInfo.xxmc, //箱型
            cgsl: this.ProductInfo.cgsl, //采购数量
            dbfs: this.ProductInfo.dbfs, //打包方式
            yxlx: this.ProductInfo.yxlx, //压线类型
            ggl: this.ProductInfo.ggl, //制造mm长
            ggw: this.ProductInfo.ggw, //宽
            ggh: this.ProductInfo.ggh, //高
            shdz: this.ProductInfo.shdz, //送货地址
            shbz: this.ProductInfo.shbz, //送货备注
            lxmc: this.ProductInfo.lxmc, //瓦楞
            pfmc: this.ProductInfo.pfmc, //配方
            tsyq: this.ProductInfo.tsyq, //特殊要求
            ysmc: this.ProductInfo.ysmc, //印色
            cdyx: this.ProductInfo.cCDYX, //长度压线
            gdyx: this.ProductInfo.cGDYX, //压线
            jhrq: jhrq, //送货时间
            cXGR: this.qybh,
            xgrq: xgrq
          })
          .then(response => {

            if (response.data.status === '1') {
              this.treeData = response.data.data.productList;
              this.showEdit = false;
              this.$message({
                showClose: true,
                type: 'success',
                message: response.data.data
              });
              // var cp=JSON.parse(JSON.stringify(this.CP))
              // this.cZCPH =cp[0].cZCPH
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
      //审核纸箱采购单
      checkZX() {
        this.axios
          .post('/CartonController/verifyCarton', {
            qybh: this.qybh,
            cgdh: this.ProductInfo.cgdh
          })
          .then(response => {

            if (response.data.status === '1') {
              this.treeData = response.data.data.productList;
              // var cp=JSON.parse(JSON.stringify(this.CP))
              // this.cZCPH =cp[0].cZCPH
              this.showEdit = false;
              this.$message({
                showClose: true,
                type: 'success',
                message: response.data.data
              });
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
      //关闭xModal窗口
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

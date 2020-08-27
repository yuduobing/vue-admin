<template>
  <!--   (>‿◠)✌ ☜(ˆ▽ˆ)
  * User: ydb/1510557673@qq.com
  * Date: 2020/7/13 10:41
  * Content:
 -->

  <div   style="padding: 5px">
    <div style="margin: 10px">
      <span>纸箱订单基本信息:</span>

    </div>


    <el-table
      :data="body"
      border
      style="width: 95%;margin:0px 40px 0px 40px"
      height="120px"
      v-loading="listLoading"
      element-loading-text = "努力加载中..."
      highlight-current-row
      max-height="400"
      @row-dblclick="handleClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>


      <el-table-column prop="dCGRQ" align="center" label="采购日期" min-width="120"   :formatter="dateFormat"  ></el-table-column>
      <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="100" sortable></el-table-column>

      <el-table-column  align="center" label="状态" min-width="80">
        <template slot-scope="scope">
          <span v-if="   scope.row.cWCZT!=null && scope.row.cWCZT!='' "  style="color: #ff0000">{{scope.row.cWCZT}}</span>
          <span v-else >待审核</span>
        </template>

      </el-table-column>
      <el-table-column prop="ckhddhm" align="center" label="客户订单号" min-width="110"  sortable></el-table-column>
      <el-table-column prop="gysmc" align="center" label="供应商" min-width="130" sortable></el-table-column>
      <el-table-column prop="cCPMC1" align="center" label="品名" min-width="80" sortable></el-table-column>


      <el-table-column prop="CardboardPrice1" align="center" label="规格" min-width="80" sortable>

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



    </el-table>







    <div style="margin: 10px">
      <span> 纸箱订单操作明细:</span>

    </div>





    <!--    详情数据展示-->
    <el-table   v-show="show"   :data="MXtableData2" border style="width: 95%;margin-left: 40px;margin-top: 10px" height="280px" v-loading="MXlistLoading"
                element-loading-text = "努力加载中..." highlight-current-row max-height="600" >
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="110px" sortable></el-table-column>
      <el-table-column prop="cWCZT" align="center" label="状态" min-width="90">
        <template slot-scope="scope">
          <span v-if=" scope.row.cWCZT!=null && scope.row.cWCZT!=''"  style="color: #ff0000">{{scope.row.cWCZT}}</span>
          <span v-else >待审核</span>
        </template>

      </el-table-column>
      <el-table-column prop="dWCSJ" align="center" label="完成时间" min-width="150" :formatter="WCSJ" sortable></el-table-column>

      <!--      //完成数量改成采购数量-->
      <el-table-column prop="nWCSL" align="center" label="数量" min-width="100"></el-table-column>
      <el-table-column prop="cBeiZ"   :show-overflow-tooltip="true"  label="备注" min-width="600"></el-table-column>
    </el-table>
    <div style="margin-right:30px">
      <el-button type="primary" @click="cancel" style="float: right">返回</el-button>  </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  let moment = require('moment'); //调用时间过滤器
  // 中文简体
  moment.locale('zh-cn');
  export default {
    name: "index",
    data(){
      return {
        gg:0,
        show:true,
        qybh:'',
        cgdh:'',
        MXtableData2:[],
        body:[]
      }
    },
    activated() {
      this.add();
    },
    mounted() {
      this.add();
    },
    methods: {
      dateFormat(value) {
        if (value.dCGRQ == undefined) {
          return '';
        } else {
          return moment(value.dCGRQ).format('YYYY-MM-DD');
        }
      },
      cancel(){


        this.$store.dispatch('tagsView/delView', this.$route)//关闭当前标签页
        this.$router.push({
          path: '/ProductArchineStatus'
        })



      },
      WCSJ(value) {
        if (value.dWCSJ == undefined) {
          return '';
        } else {
          return moment(value.dWCSJ).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      add() {
        this.gg=Cookies.get('gg');
        this.body=[]
        this.body.push(this.$route.query.body)
        this.qybh=this.$route.query.qybh;

        this.cCGDH=this.$route.query.cgdh;
        this.MXlistLoading = true;
        this.axios
          .post('/CartonController/queryCartonDetail', {qybh: this.qybh, cgdh: this.cCGDH})
          .then(response => {
            console.log(response);
            if (response.data.status === '1') {

              this.MXtableData2 = response.data.data.cartonDetail;
              console.log("打印的数2据" + JSON.stringify(this.MXtableData2));
              // this.show=false,
              //   this.show=true,
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
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width:80%;
  }
</style>

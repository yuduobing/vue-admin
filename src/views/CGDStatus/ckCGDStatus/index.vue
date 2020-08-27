<template>
    <!--   (>‿◠)✌ ☜(ˆ▽ˆ)
    * User: ydb/1510557673@qq.com
    * Date: 2020/7/13 10:41
    * Content:
   -->

  <div   style="padding: 5px">
<div style="margin: 10px">
      <span>订单基本信息:</span>

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
      <el-table-column prop="dCGRQ" align="center" label="采购日期" min-width="100" :formatter="dateFormat" sortable></el-table-column>
      <el-table-column prop="cCGDH" align="center" label="采购单号" min-width="110px" sortable></el-table-column>
      <el-table-column  align="center" label="状态" min-width="80">
        <template slot-scope="scope">
          <span v-if="   scope.row.cWCZT!=null && scope.row.cWCZT!='' "  style="color: #ff0000">{{scope.row.cWCZT}}</span>
          <span v-else >待审核</span>
        </template>

      </el-table-column>
      <el-table-column prop="cLXMC" align="center" label="楞型" min-width="80"></el-table-column>
      <el-table-column prop="cPFMC" align="center" label="配方名称" min-width="130"></el-table-column>


      <el-table-column prop="nBPC" align="center" label="板片长×宽" v-if="gg==0" min-width="120px" sortable></el-table-column>

      <el-table-column prop="nBPK" align="center" label="板片宽×长" v-if="gg==1"  min-width="120px" sortable></el-table-column>
      <el-table-column  sortable  :show-overflow-tooltip="true" prop="cYXLX" align="center" label="压型" min-width="80"></el-table-column>
      <el-table-column  sortable  :show-overflow-tooltip="true" prop="cGDYX" align="center" label="压线" min-width="105"></el-table-column>

      <el-table-column prop="ncgsl" align="center" label="采购数量"  sortable :show-overflow-tooltip="true"  min-width="105"></el-table-column>
      <el-table-column prop="NMENF" align="center" label="门幅" sortable  min-width="70px" sortable></el-table-column>


      <el-table-column prop="cSHDZ" align="center" label="送货地址"  sortable  :show-overflow-tooltip="true"  min-width="120px" sortable></el-table-column>
      <!--        <el-table-column prop="dWCSJ" align="center" label="完成时间"   show-overflow-tooltip min-width="100" sortable></el-table-column>-->


      <el-table-column prop="ncgsl" align="center" label="采购数量"  :show-overflow-tooltip="true"  min-width="100" sortable> </el-table-column>
      <el-table-column prop="nKCS" align="center" label="库存数" sortable :show-overflow-tooltip="true" min-width="100"></el-table-column>
      <el-table-column prop="cQYMC" align="center" label="供应商名称"  sortable  :show-overflow-tooltip="true" min-width="180"></el-table-column>
      <el-table-column prop="cDDH" align="center" label="订单号" sortable  :show-overflow-tooltip="true" min-width="110px" sortable></el-table-column>
      <el-table-column prop="cBeiZ" align="left" label="备注"  sortable :show-overflow-tooltip="true"  min-width="200"></el-table-column>
    </el-table>







    <div style="margin: 10px">
      <span> 订单操作明细:</span>

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
                path: '/CGDStatus'
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
            console.log("单2号"+JSON.stringify(this.qybh))
            this.cCGDH=this.$route.query.cgdh;
            this.MXlistLoading = true;
            this.axios
              .post('/PaperBoardController/queryPaperBoardDetalied', {qybh: this.qybh, cgdh: this.cCGDH})
              .then(response => {
                console.log(response);
                if (response.data.status === '1') {

                  this.MXtableData2 = response.data.data.detalied;
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

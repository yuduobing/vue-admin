<template>
  <!--   (>‿◠)✌ ☜(ˆ▽ˆ)
  * User: ydb/1510557673@qq.com
  * Date: 2020/7/13 10:41
  * Content:系统设置
 -->
  <div style="padding:15px">
    <span>页面视图修改:</span>
<div  style="margin: 30px">

       <el-switch

      v-model="value1"
        width="60"

      active-text="按长×宽显示"
      inactive-text="按宽×长显示"
      @change="valuec"
    >
    </el-switch>

</div>
    <span>     常用备注修改:</span>
    <div  style="width: 50%">


      <el-table
        @row-click="getatribute1"
        @current-change="handleCurrentChange1"
         :data="tabledata"
        border
        style="float: left;margin-top: 30px;margin-left: 30px"
        highlight-current-row>
        <el-table-column align="left">

          <el-table-column
            type=index
            label="序号">
          </el-table-column>
          <el-table-column
            label="备注"
            prop="cBeiZ">
          </el-table-column>

        </el-table-column>

      </el-table>
      <div @click=" dialogFormVisible1 = true" style="width: 80px;color: #848487;font-size: 15px;float: right;"><span>+ 添加</span>    </div>
      <!--变量类别增加框-->
    </div>


    <el-dialog title="常用备注增加" :visible.sync="dialogFormVisible1" width="30%">
      <el-form :model="form1">

        <el-form-item label="备注" >
          <el-input v-model="form1.cBeiZ" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="insert1">确 定</el-button>
      </div>
    </el-dialog>


<!--  添加藏用备注表-->

<!--修改页面-->

    <el-form style="float: right;width: 30%;margin-top: 10px" v-model="form2">
      <el-form-item>
        <span class="text_font" >修改备注</span>
        <el-input class="el-input" v-model="form2.cBeiZ"
                  style="width: 30%;"></el-input>
      </el-form-item>


      <el-col >


        <el-button @click="updatedata" type="primary" style="float:  left">保存</el-button>
      </el-col>
    </el-form>





  </div>

</template>

<script>


  import Cookies from 'js-cookie'

  export default {
    data() {
      return {

        // 增加
        form1:{

        },
        //修改
        form2:{

        },
        tabledata:[],
        //显示
        dialogFormVisible1:false,
        value1: true,
        st: 0,
        qybh: ''
      }
    },
    created() {
      var storage = window.sessionStorage;
      this.qybh = storage.getItem('QYBH');
      this.getdata()
    },
    mounted() {
      if (Cookies.get('gg') == 1) {
        this.value1 = false

      }
    },
    methods: {
      //常用备注的方法



      //修改按钮
      getatribute1(row){


        this.form2=row



      },
      //发送请求数据
      getdata(){




        this.axios
          // .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
          .post('/userController/queryCYBZ ', { cQYBH: this.qybh, start: this.currentPage1, limit: this.pageSize })
          .then(response => {


            if (response.data.status === '1') {




              this.tabledata= response.data.data;
              console.log(
                this.tableData);

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

      //发送请求数据
      updatedata(){



        this.form2.cQYBH=this.qybh
        console.log("查询的数据"+JSON.stringify(this.form2));
        this.axios
          // .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
          .post('/userController/updateCYBZ', this.form2)
          .then(response => {


            if (response.data.status === '1') {


              // this.tableData= response.data.data;
              this.$message({
                showClose: true,
                type: 'success',
                message: '修改成功'
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
        this.form2 = {}
      },
      //修改按钮
      insert1(){

        // 把form传递过去 form1。bzu
        this.form1.cQYBH=this.qybh
        this.axios
          // .post('/PaperBoardController/queryPaperBoard', { qybh: this.qybh, start: this.currentPage1, limit: this.pageSize })
          .post('/userController/insertCYBZ', this.form1)
          .then(response => {


            if (response.data.status === '1') {


              // this.tableData= response.data.data;
              this.$message({
                showClose: true,
                type: 'success',
                message: '修改成功a'
              });
              this.dialogFormVisible1=false
              this.getdata()
              this.form1={}

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





      //
      valuec() {
            console.log("进入错误")



        //发送请求更改数组
        if (!this.value1) {
          this.st = 1
          Cookies.set('gg',1)
        }
        else {
          this.st = 0
          Cookies.set('gg',0)
        }
        //发送axios请求
        this.axios
          .post('/userController/modifyGuiGe ', {qybh: this.qybh, gg: this.st})

          .then(response => {
            if (response.data.status === '1') {
              this.$message({
                showClose: true,
                type: 'success',
                message: "修改成功请重启浏览器"
              });

            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: "修改失败"
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

</style>

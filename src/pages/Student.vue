<template>
  <div>
    <h1>{{ $route.query.context }}</h1>
    <!-- 搜索框 -->
    <div class="filter-container">
      <el-input placeholder="学号" auto-complete="false" v-model="inputdata.stunumber" style="width: 200px"
        class="filter-item"></el-input>
      <!--  分页时使用 v-model="stunumber" -->
      <el-input placeholder="姓名" v-model="inputdata.stuname" style="width: 200px" class="filter-item"></el-input>
      <!-- 分页时使用 v-model="stuname" -->
      <el-button @click="getgoal()" class="dalfBut">查询</el-button>
      <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
    </div>

    <!-- 新增标签弹层 -->
    <div class="add-form">
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" prop="stunumber">
                <el-input v-model="formData.stunumber" placeholder="学号在0-1000之间的整数"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="stuname">
                <el-input v-model="formData.stuname" placeholder="请输入2-5个汉字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="stusex">
                <el-input v-model="formData.stusex" placeholder="请输入 男 女"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="院系" prop="stucity">
                <el-input v-model="formData.stucity" placeholder="输入 AS BS CS DS ES IS"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="handleAdd()">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑层  -->
    <div class="add-form">
      <el-dialog title="编辑检查项" :visible.sync="dialogFormVisible4Edit">
        <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" prop="stunumber">
                <el-input v-model="formData.stunumber" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="姓名" prop="stuname">
                <el-input v-model="formData.stuname" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="stusex">
                <el-input v-model="formData.stusex" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="院系" prop="stucity">
                <el-input v-model="formData.stucity" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="handleEdit()">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 显示数据区域 -->
    <el-table size="small" current-row-key="id" stripe highlight-current-row :data="dataList">
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="stuname" label="姓名" align="center"></el-table-column>
      <el-table-column prop="stunumber" label="学号" align="center"></el-table-column>
      <el-table-column prop="stusex" label="性别" align="center"></el-table-column>
      <el-table-column prop="stucity" label="院系" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="pagination.currentPage"
        :page-size="pagination.pagesize" layout="total,prev,pager,next,jumper">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Student",
  data() {
    return {
      dataList: [],
      formData: {
        stunumber:'',
        stusex:'',
        stucity:'',
        stuname:''
      },
      dialogFormVisible: false,
      dialogFormVisible4Edit: false,
      rules: {
        //校验规则
        type: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        name: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
      },
      inputdata: {
        stunumber: "",
        stuname: "",
      },
      pagination: {//分页相关模型数据
        currentPage: 1,//当前页码
        pageSize: 5,//每页显示的记录数
        // total: 0,//总记录数 ''
      }
    };
  },
  mounted() {
    this.getsome();
  },
  methods: {
    // 向服务器请求数据
    async getsome() {
      let city = this.$route.query.city
      let data = city + '/' + this.pagination.currentPage + '/' + this.pagination.pageSize
      await this.$store.dispatch('showstudentList', data)
      this.dataList = this.studentlist
    },
    // 显示标签层
    handleCreate() {
      this.dialogFormVisible = true;
    },
    // 取消按钮
    cancel() {
      this.formData = {}
      this.dialogFormVisible = false;
      this.dialogFormVisible4Edit = false
    },
    // 提交数据，新建用户
    handleAdd() {
      // 对表单数据进行判断
      let flag = this.verify(this.formData)
      if (flag) {
        let form = new URLSearchParams()
        form.append('stunumber', this.formData.stunumber)
        form.append('stusex', this.formData.stusex)
        form.append('stucity', this.formData.stucity)
        form.append('stuname', this.formData.stuname)
        // 派发actions，将数据提交
        this.$store.dispatch('addstudent', form).then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
            this.dialogFormVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
          .finally(() => {
            this.getsome();
            this.formData = {}
          });
      }else{
        this.$message.error('信息校验错误')
      }
    },
    // 删除按钮
    handleDelete(row) {
      // console.log(row.stunumber);
      this.$confirm("是否要删除数据", "提示", { type: "info" }).then(() => {
        this.$store.dispatch('deletestu', row.stunumber)
      }).finally(() => {
        //   //    刷新数据
        this.getsome();
      })
        .catch(() => {
          this.$message.error("取消操作");
        });
    },
    // 查询
    getgoal() {
      // console.log(this.inputdata.stunumber, this.inputdata.stuname, this.$route.query.city);
      let data = ''
      let flag = false
      if (this.inputdata.stunumber) {
        data += 'stunumber=' + this.inputdata.stunumber
        flag = true
      }
      if (this.inputdata.stuname) {
        if (flag) {
          data += '&stuname=' + this.inputdata.stuname
        } else {
          data += 'stuname=' + this.inputdata.stuname
        }
      }
      data += '&stucity=' + this.$route.query.city
      this.$store.dispatch('getselect', data).finally(() => {
        this.dataList = this.studentlist
      })
    },
    // 修改的数据展示
    async handleUpdate(row) {
      this.dialogFormVisible4Edit = true
      // 获取目标学生信息
      await this.$store.dispatch('gettargetstuinfo', row.stunumber)
      this.formData = this.targetinfo
    },
    // 修改操作
    handleEdit() {
      let form = new URLSearchParams()
      form.append('stunumber', this.formData.stunumber)
      form.append('stusex', this.formData.stusex)
      form.append('stucity', this.formData.stucity)
      form.append('stuname', this.formData.stuname)
      this.$store.dispatch('changestudent', form).then(res => {
        if (res.status !== 0) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
        }
      }).finally(() => {
        this.dialogFormVisible4Edit = false
        this.getsome()
        this.formData = {}
      })
    },
    //切换页码
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getsome()
    },
    // 校验表单数据
    verify(formData) {
      var citys=['IS','AS','BS','CS' ,'DS','ES']
      var sexs=['男','女']
      // 名字校验
      let name = /^[\u4e00-\u9fa5]{0,5}$/
      let number = /^\d{1,3}$/
      let flag_name = name.test(formData.stuname)
      // 性别校验
      let flag_sex = sexs.some(item=>formData.stusex===item)
      let flag_city = citys.some(item=>formData.stucity===item)
      let flag_number = number.test(formData.stunumber)
      if (flag_number & flag_name & flag_city & flag_sex) {
        return true
      } else {
        return false
      }
    }

  },
  computed: {
    // 获取学生数据
    ...mapState({
      studentlist: (state) => state.student.studentlist,
      targetinfo: (state) => state.student.targetinfo,
      // totallength:(state)=>state.student.totallength
    })

  },
  watch: {
    $route(to, from) {
      // console.log('to'+to.fullPath);
      // console.log('from'+from.fullPath);
      if (to.fullPath !== from.fullPath) {
        // console.log('to from 匹配错误');
        this.getsome();
      }
    },
  }
};
</script>

<style>
</style>
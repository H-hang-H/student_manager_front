<template>
  <div>
    <h1>{{ $route.query.context }}</h1>
    <!-- 搜索框 -->
    <div class="filter-container">
      <el-input
        placeholder="学号"
        auto-complete="false"
        v-model="inputdata.teanumber"
        style="width: 200px"
        class="filter-item"
      ></el-input>
      <!--  分页时使用 v-model="teanumber" -->
      <el-input
        placeholder="姓名"
        v-model="inputdata.teaname"
        style="width: 200px"
        class="filter-item"
      ></el-input>
      <!-- 分页时使用 v-model="teaname" -->
      <el-button @click="getgoal()" class="dalfBut">查询</el-button>
      <el-button type="primary" class="butT" @click="handleCreate()"
        >新建</el-button
      >
    </div>

    <!-- 新增标签弹层 -->
    <div class="add-form">
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataAddForm"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="100px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" prop="teanumber">
                <el-input v-model="formData.teanumber" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="teaname">
                <el-input v-model="formData.teaname" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="teasex">
                <el-input v-model="formData.teasex" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="院系" prop="teacity">
                <el-input v-model="formData.teacity" />
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
        <el-form
          ref="dataEditForm"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="100px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" prop="teanumber">
                <el-input v-model="formData.teanumber" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="姓名" prop="teaname">
                <el-input v-model="formData.teaname" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="teasex">
                <el-input v-model="formData.teasex" />
              </el-form-item>
            </el-col>

          <el-col :span="12">
              <el-form-item label="院系" prop="teacity">
                <el-input v-model="formData.teacity" />
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
    <el-table
      size="small"
      current-row-key="id"
      :data="dataList"
      stripe
      highlight-current-row
    >
      <el-table-column
        type="index"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="teaname"
        label="姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="teanumber"
        label="职工号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="teasex"
        label="性别"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="teacity"
        label="院系"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Teacher",
  data() {
    return {
      dataList: [],
      formData: {},
      dialogFormVisible: false,
      dialogFormVisible4Edit:false,
      rules: {
        //校验规则
        type: [
          { required: true, message: "图书类别为必填项", trigger: "blur" },
        ],
        name: [
          { required: true, message: "图书名称为必填项", trigger: "blur" },
        ],
      },
      inputdata: {
        teanumber: "",
        teaname: "",
      },
    };
  },
  created() {
    this.getsome();
  },
  methods: {
    // 展示数据，发送axios请求
    getsome() {
      if (this.$route.query.city == "all") {
        axios.get("http://localhost:8081/teacherlist").then((res) => {
          this.dataList = res.data;
        });
      } else {
        axios
          .get(
            "http://localhost:8081/teacherlist/city/" + this.$route.query.city
          )
          .then((res) => {
            this.dataList = res.data;
          });
      }
    },
    // 显示标签层
    handleCreate() {
      this.dialogFormVisible = true;
    },
    // 取消按钮
    cancel() {
      this.dialogFormVisible = false;
      this.dialogFormVisible4Edit=false
    },
    // 提交数据，新建用户
    handleAdd() {
      let flag = true;
      axios
        .get("http://localhost:8081/teacherlist")
        .then((res) => {
          console.log(res.data[0].teanumber);
          let length = res.data.length;
          for (let i = 0; i < length; i++) {
            if (this.formData.teanumber == res.data[i].teanumber) {
              this.$message.info("学号重复");
              this.formData.teanumber = {};
              flag = false;
              break;
            }
          }
          if (flag) {
            this.$axios
              .post("http://localhost:8081/teacherlist", this.formData)
              .then(() => {
                this.$message.success("添加用户成功");
                this.dialogFormVisible = false;
              });
          }
        })
        .finally(() => {
          this.getsome();
        });
    },
    // 删除按钮
    handleDelete(row) {
      console.log(row);
      this.$confirm("是否要删除数据", "提示", { type: "info" })
        .then(() => {
          axios
            .delete("http://localhost:8081/teacherlist/" + row.teanumber)
            .then((res) => {
              this.$message.success("删除成功");
            })
            .finally(() => {
              //    刷新数据
              this.getsome();
            });
        })
        .catch(() => {
          this.$message.error("取消操作");
        });
    },
    // 查询
    getgoal() {
      if (this.inputdata.teanumber != "" && this.inputdata.teaname != "")
        axios
          .get(
            "http://localhost:8081/teacherlist/teanumber/" +
              this.inputdata.teanumber +
              "/" +
              this.inputdata.teaname
          )
          .then((res) => {
            this.dataList = res.data;
          });
      else if (this.inputdata.teanumber != "" && this.inputdata.teaname == "")
        axios
          .get(
            "http://localhost:8081/teacherlist/teanumber/" +
              this.inputdata.teanumber
          )
          .then((res) => {
            this.dataList = res.data;
          });
      else if (this.inputdata.teanumber == "" && this.inputdata.teaname != "")
        axios
          .get(
            "http://localhost:8081/teacherlist/teaname/" +
              this.inputdata.teaname
          )
          .then((res) => {
            this.dataList = res.data;
          });
      else this.$message.info("请输入要查询的信息");
    },
    // 修改的数据展示
    handleUpdate(row){
      this.dialogFormVisible4Edit=true
        axios.get('http://localhost:8081/teacherlist/city/'+this.$route.query.city+'/'+row.teanumber).then((res)=>{
          this.formData=res.data[0]
        })
    },
    // 修改操作
    handleEdit(){
      axios.put('http://localhost:8081/teacherlist',this.formData).then(res=>{
        if(res.data!=null){
          this.dialogFormVisible4Edit=false
          this.$message.success('修改成功')
        }else{
          this.$message.error('修改失败')
        }
      }).finally(()=>{
        this.getsome()
      })
    }
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
  },
};
</script>

<style>
</style>
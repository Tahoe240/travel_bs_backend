<template>
  <div class="xjt-user-view">
    <!-- 搜索用户界面 -->
    <div class="head-container">
      <!-- 搜索框 -->
      <el-input
          v-model="queryKeyForName"
          clearable
          size="small"
          placeholder="输入username模糊搜索"
          style="width: 200px;"
          class="filter-item"/>

      <!-- 状态筛选下拉框 -->
      <el-select v-model="statusKey" size="small"
                 placeholder="无状态"
                 class="filter-item"
                 style="width: 90px"
                 @change="_initTableData">
        <el-option label="无状态" value=""></el-option>
        <el-option label="禁用" value="0"></el-option>
        <el-option label="激活" value="1"></el-option>
      </el-select>

      <!-- 搜索按钮 -->
      <div class="btn">
        <el-button @click="_initTableData" size="medium" icon="el-icon-search">
          搜索
        </el-button>
      </div>

      <!-- 新增用户按钮 -->
      <div class="btn">
        <el-button type="success" size="medium" @click="addUserBtnClick" icon="el-icon-plus">
          新增
        </el-button>
      </div>
    </div>

    <!-- 用户信息编辑对话框 -->
    <el-dialog append-to-body :visible.sync="addUserDialogVisible"
               :title="userForm.userId?'编辑用户':'新增用户'"
               @close="dialogClose"
               :close-on-click-modal="false"
               width="570px">
      <el-form :model="userForm"
               :rules="addUserFormRules" ref="ruleForm"
               label-width="80px"
               label-position="left"
               size="small">
        <!-- 用户名输入框 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"/>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" type="password" prop="password">
          <el-input v-model="userForm.password"/>
        </el-form-item>
        <!-- 昵称输入框 -->
        <el-form-item label="角色" prop="nickname">
          <el-input v-model="userForm.nickname"/>
        </el-form-item>
        <!-- 头像输入框 -->
        <el-form-item label="头像">
          <el-input v-model="userForm.avatar"/>
        </el-form-item>
        <!-- 生日选择器 -->
        <el-form-item label="生日">
          <el-date-picker
              v-model="userForm.birthday"
              type="date"
              placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>
        <!-- 性别选择 -->
        <el-form-item label="性别">
          <el-radio-group v-model="userForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 手机号输入框 -->
        <el-form-item label="手机号">
          <el-input v-model="userForm.telephone"/>
        </el-form-item>
        <!-- 邮箱输入框 -->
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 提交或更新用户信息按钮 -->
        <el-button type="primary" v-if="!userForm.userId" @click="handleInsertUser">提交</el-button>
        <el-button type="primary" v-else @click="handleUpdateUser(userForm)">更新</el-button>
      </div>
    </el-dialog>

    <!-- 用户列表 -->
    <el-table
        v-loading="tableLoading"
        :data="tableUserData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <!-- 选择列 -->
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <!-- 用户ID列 -->
      <el-table-column :show-overflow-tooltip="true" prop="userId" width="70" label="用户ID"/>
      <!-- 头像列 -->
      <el-table-column
          label="头像">
        <template slot-scope="scope">
          <img v-lazy="scope.row.avatar" alt="" style="border: 1px solid  #ddd;" width="100px" height="100px">
        </template>
      </el-table-column>
      <!-- 用户名列 -->
      <el-table-column prop="username" :show-overflow-tooltip="true" label="用户名" width="100"></el-table-column>
      <!-- 角色列 -->
      <el-table-column :show-overflow-tooltip="true" prop="roleId" label="角色">
        <template slot-scope="scope">
          <span v-if="scope.row.roleId === 1">管理员</span>
          <span v-else-if="scope.row.roleId === 2">普通用户</span>
          <!-- 添加其他角色的判断 -->
        </template>
      </el-table-column>
      <!-- 性别列 -->
      <el-table-column
          label="性别"
          width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.sex === 1">男</span>
          <span v-else-if="scope.row.sex === 0">女</span>
          <span v-else>不详</span>
        </template>
      </el-table-column>

      <!-- 状态列 -->
      <el-table-column label="状态" align="center" width="100" prop="status">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- 手机号列 -->
      <el-table-column :show-overflow-tooltip="true" width="100" prop="tel" label="手机号"/>
      <!-- 邮箱列 -->
      <el-table-column :show-overflow-tooltip="true" width="150" prop="email" label="邮箱"/>
      <!-- 操作列 -->
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="my-pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3,6,9,12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "SysUser",
  data() {
    return {
      /*搜索条件*/
      queryKeyForName: "",
      statusKey: "",
      user_id: "",
      sex: "",

      addUserDialogVisible: false,

      tableLoading: true,
      tableUserData: [],
      multipleSelection: [],
      //用户信息（表单）
      userForm: {},

      addUserFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
      },

      /*分页*/
      currentPage: 1,
      pageSize: 6,
      total: 0
    }
  },
  methods: {
    /*网络请求*/
    _initTableData() {
      let params = {
        "current": this.currentPage,
        "pageSize": this.pageSize,
        "id": this.user_id,
        "username": this.queryKeyForName,
        "nickname": "",
        "sex": this.sex,
        "status": this.statusKey,
      }
      axios.get("/api/user/queryByCondition?" + this.$qs.stringify(params),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // 将token添加到请求头部
            }
          }
      ).then(res => {
        console.log("后端响应数据："+res);
        if (res.data.code === 200) {
          this.tableUserData.splice(0)
          this.tableUserData.push(...res.data.data.records.map(item => {
            return {
              userId: item.userId,
              username: item.username,
              password: item.password,
              avatar: item.avatar,
              status: item.status === 1 ? true : false,
              roleId: item.roleId,
              sex: item.sex,
              tel: item.tel,
              email: item.email,
            }
          }));
          this.total = Number(res.data.data.total);
          console.log("用户表数据：", this.tableUserData);

          this.tableLoading = false;
        } else {
          this.$message.warning(res.data.message);
        }
      })
    },

    // _initTableData() {
    //   this.tableLoading = true;
    //   const token = localStorage.getItem('token');
    //   axios.get("/api/user/getAllUsers", {
    //     headers: {
    //       Authorization: `Bearer ${token}` // 将token添加到请求头部
    //     }
    //   }).then(res => {
    //     console.log(res);
    //     if (res.data.code === 200) {
    //       this.tableUserData = res.data.data;
    //       this.total = this.tableUserData.length;
    //       this.tableLoading = false;
    //       console.log("用户表数据：", this.tableUserData);
    //     } else {
    //       this.$message.warning(res.data.message);
    //     }
    //   })
    // },


    /*表格操作*/
    handleEdit(index, row) {
      console.log(row);
      this.userForm = row;
      this.addUserDialogVisible = true;
    },
    handleDelete(index, row) {
      //删除
      this.$alert('用户删除后不可恢复，请谨慎操作！', '确认删除该用户吗？', {
        confirmButtonText: '确定',
        callback: action => {
          axios.get("/user/delete?id=" + row.userId).then(res => {
            if (res.data.status === 200) {
              this.tableUserData.splice(index, 1);
              this.$message.success("用户删除成功！")
            }
          })
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 改变状态
    changeEnabled(row) {
      console.log(row);
      this.$confirm('此操作将改变用户状态，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("/api/user/update/status?id=" + row.userId,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // 将token添加到请求头部
              }
            }
        ).then(res => {
          this.$notify.success("状态改变")
        }).catch(() => {
          row.status = !row.status
        })
      }).catch(() => {
        row.status = !row.status
      })
    },

    /*提交新增用户-表单操作*/
    handleInsertUser() {
      axios.post("/user/insert", this.userForm).then(res => {
        console.log(res);
        if (res.data.status === 200) {
          this.$message.success("用户创建成功！")
          this.tableUserData.push(this.userForm);
          this.addUserDialogVisible = false;
          this.userForm = {};
        }
      })
    },
    //更新用户信息
    handleUpdateUser(userObj) {
      axios.post("/user/update", userObj).then(res => {
        console.log(res);
        if (res.data.status === 200) {
          this.$message.success("用户更新成功！")
          this.addUserDialogVisible = false;
          this.userForm = {};
        }
      })
    },
    dialogClose() {
      this.userForm = {};
    },

    addUserBtnClick() {
      this.userForm = {};
      this.addUserDialogVisible = true;
    },

    /*分页*/
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this._initTableData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this._initTableData();
    },
  },
  created() {
    this._initTableData();
  }
}
</script>

<style lang="less" scoped>
.xjt-user-view {
  width: 70%;
  height: 100%;

  .head-container {
    height: 60px;
    display: flex;
    box-shadow: 0 2px 3px #ddd;
    padding: 0 30px;

    .filter-item {
      width: 150px;
      line-height: 60px;
      vertical-align: middle;
      margin: 0 3px 10px 0;

      input {
        height: 30.5px;
        line-height: 30.5px;
      }
    }

    .btn {
      line-height: 60px;
      margin-left: 20px;
    }
  }
}
</style>

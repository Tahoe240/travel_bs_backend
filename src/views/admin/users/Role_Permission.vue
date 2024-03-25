<template>
  <div>
    <el-button size="mini" type="primary" @click="handleAdd">添加角色</el-button>
    <div style="display: flex; justify-content: flex-end;">
      <el-input style="width: 20%" v-model="search" size="mini" placeholder="输入关键字搜索"/>
      <el-button style="width: auto; margin-left: .2rem" size="mini" type="primary" plain @click="searchRole">搜索</el-button>
    </div>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="角色名" label-width="100px">
          <el-input v-model="role.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色备注" label-width="100px">
          <el-input v-model="role.roleNameZh" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateCountry">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="filteredRoles" style="width: 100%">
      <el-table-column
          label="序号"
          prop="roleId">
      </el-table-column>
      <el-table-column
          label="角色名"
          prop="roleName">
      </el-table-column>
      <el-table-column
          label="角色备注"
          prop="roleNameZh">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="confirmDelete(scope.row.roleId)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "role_permission",
  data: function () {
    return {
      isEdit: false,
      search: "",
      roles: [],
      role: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      filteredRoles: []
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      axios.get("/api/role/getAllRoles",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }).then(res => {
        if (res.data.code === 200) {
          this.roles = res.data.data;
          this.filteredRoles = res.data.data;
        }
      })
    },

    handleDelete(id) {
      axios.delete(`/api/role/remove/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              })
              this.getAll();
            }
          })
          .catch(error => {
            console.error(error);
            this.$message({
              type: "error",
              message: "删除失败"
            })
          });
    },

    searchRole() {
      let search = this.search;
      axios.post("/api/role/searchByRoleNameZh", {
        roleNameZh: search
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.filteredRoles = res.data.data; // 更新filteredRoles为搜索结果
        }else{
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    },

    handleEdit(index, row) {
      // 设置isEdit为true，表示编辑操作
      this.isEdit = true;
      // 将row的值赋给newCountry，用于编辑时的数据回显
      this.role = Object.assign({}, row);
      // 打开对话框
      this.dialogFormVisible = true;
    },
    handleAdd() {
      // 设置isEdit为false，表示新增操作
      this.isEdit = false;
      // 清空newCountry对象的值
      this.role = {
        roleName: '',
        roleNameZh: ''
      };
      // 打开对话框
      this.dialogFormVisible = true;
    },
    addOrUpdateCountry() {
      let roleName = this.role.roleName;
      let roleNameZh = this.role.roleNameZh;

      if (this.isEdit) {
        // 编辑操作，发送修改请求
        console.log("this.role.roleId"+this.role.roleId)
        axios.put(`/api/role/updateRole`, {
              roleId: this.role.roleId,
              roleName: this.role.roleName,
              roleNameZh: this.role.roleNameZh
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "修改成功"
            })
            this.getAll();
          }
        }).catch(error => {
          console.error(error);
          this.$message({
            type: "error",
            message: "修改失败"
          })
        });
      } else {
        // 新增操作，发送新增请求
        axios.post('/api/role/addRole', {
          roleName: roleName,
          roleNameZh: roleNameZh
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "添加成功"
            })
            this.getAll();
          }

        }).catch(error => {
          console.error(error);
        });
      }
      this.getAll();
      this.dialogFormVisible = false;
    },

    //删除确认
    confirmDelete(id) {
      this.$confirm('确定要删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击了确定按钮
        this.handleDelete(id);
      }).catch(() => {
        // 用户点击了取消按钮
        // 可以不执行任何操作，确认框会自动关闭
      });
    },
  }
}
</script>

<style scoped>

</style>

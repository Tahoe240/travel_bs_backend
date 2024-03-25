 template
<template>
  <div>
    <!-- 角色选择下拉菜单，选择后根据角色获取相应权限 -->
    <el-select v-model="selected" placeholder="请选择" @change="getPermissions">
      <el-option
          v-for="item in roles"
          :key="item.roleId"
          :label="item.roleNameZh"
          :value="item.roleId"
      ></el-option>
    </el-select>
    <!-- 权限表格，展示可选权限及其当前状态 -->
    <el-table :data="filteredPermissions" style="width: 100%">
      <el-table-column label="权限值">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.value1"
              @change="check(scope.row)"
          ></el-switch>
          {{ scope.row.permission }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="detail"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Role",
  data() {
    return {
      selected: "", // 当前选中的角色
      roles: [], // 所有角色列表
      permissions: [], // 所有权限列表
      filteredPermissions: [], // 根据角色过滤后的权限列表
    };
  },
  mounted() {
    this.getAllRoles(); // 获取所有角色
    this.getAllPermissions(); // 获取所有权限
  },
  methods: {
    // 获取所有角色
    getAllRoles() {
      axios
          .get("/api/role/getAllRolesWithPermissions",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              })
          .then((res) => {
            this.roles = res.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    // 获取所有权限
    getAllPermissions() {
      axios
          .get("/api/permission/getAllPermissions",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((res) => {
            if (res.data.code === 200) {
              this.permissions = res.data.data;
              this.filteredPermissions = res.data.data;
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    // 根据选择的角色过滤权限
        /**
     * 根据当前选中的角色获取其权限列表。
     * 遍历所有权限，对于每个权限，检查该角色是否拥有该权限，
     * 如果拥有，则在该权限对象上添加一个名为value1的属性，值为true；
     * 否则，value1为false。最终将处理后的权限列表存储在filteredPermissions中。
     */
        // 根据选择的角色过滤权限
        getPermissions() {
          const roleId = this.selected;
          const role = this.roles.find((item) => item.roleId === roleId);

          if (role && Array.isArray(role.permissionsList)) {
            this.filteredPermissions = this.permissions.map((permission) => {
              const permissionCopy = { ...permission };
              permissionCopy.value1 = role.permissionsList.some(
                  (p) => p.permissionId === permission.permissionId
              );
              return permissionCopy;
            });
          } else {
            this.filteredPermissions = [];
          }
        },
    check(permission){
      //角色id
      let roleId = this.selected;
      //权限id
      let permissionId = permission.permissionId;
      //是否被选中
      let checked = permission.value1;
      console.log("roleId:"+roleId+"permissionId:"+permissionId+"checked:"+checked);
      axios.post("/api/role/updateRolePermission", null, {
        params: {
          roleId: roleId,
          permissionId: permissionId,
          checked: checked
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              })
              //this.getAll();
            }
          })
    }

  },
};
</script>

<style scoped>
</style>

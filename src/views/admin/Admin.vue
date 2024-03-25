
<template>
  <div>
    <el-container>
<!--      <el-header>Header</el-header>-->
      <el-container>
        <el-aside class="aside">
          <el-menu default-active="/user/list" class="el-menu-vertical-demo" :router="true">
            <!-- 一级菜单项 -->
            <el-submenu index="/user/list">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <!-- 二级菜单项 -->
              <el-menu-item-group>
                <el-menu-item index="/user/list">用户管理</el-menu-item>
                <el-menu-item index="/user/role">角色权限管理</el-menu-item>
                <el-menu-item index="/user/permission">权限管理</el-menu-item>
                <el-menu-item index="/user/role_permission">角色管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>





<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'admin',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.aside{
  width: 220px;
  height: 800px;
}
</style>

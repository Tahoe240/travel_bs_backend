
<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu default-active="page1" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose">
            <!-- 一级菜单项 -->
            <el-submenu index="page1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>页面1</span>
              </template>
              <!-- 二级菜单项 -->
              <el-menu-item-group>
                <el-menu-item index="/page1_1">页面1-1</el-menu-item>
                <el-menu-item index="/page1-2">页面1-2</el-menu-item>
                <el-menu-item index="/page1-3">页面1-3</el-menu-item>
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.aside{
  width: 220px;
  height: 800px;
}
</style>

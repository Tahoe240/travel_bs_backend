<template>
  <div class="amap-page-container">
    <el-amap vid="amap" class="amap-demo" :center="center" :zoom="zoom" :plugin="plugin">
      <el-amap-marker :position="position"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 12,
      center: [120.404, 30.915], // 地图中心点坐标
      markers: [
        {
          position: [120.404, 30.915] // 标记点坐标
        }
      ],
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init: (o) => { // 使用箭头函数
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // this.center = [result.position.lng, result.position.lat];
                  // this.markers = [
                  //   {
                  //     position: [result.position.lng, result.position.lat]
                  //   }
                  // ];
                }
              });
            }
          }
        }
      ]

    }
  },
  methods: {
    initMap(map) {
      // 在地图初始化完成后设置中心点坐标
      map.setCenter(this.center)
    }
  }
}
</script>

<style scoped>
.amap-demo {
  height: 500px;
}
</style>

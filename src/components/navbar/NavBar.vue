 template
<template>
		<div id="navBar">
			<div class="left">
				<slot name="left-slot"></slot> <!-- 左侧插槽，用于放置自定义导航栏左侧内容 -->
			</div>
			<div class="middle">
				<slot name="middle-slot"></slot> <!-- 中部插槽，用于放置自定义导航栏中部内容 -->
			</div>
			<div class="right">
				<slot name="right-slot"></slot> <!-- 右侧插槽，用于放置自定义导航栏右侧内容 -->
			</div>
		</div>
</template>

<script>
	export default {
		name: "NavBar" // 组件名称
	}
</script>

<style lang="less" scoped>
	#navBar{
		position: relative;
		display: flex;
		height: 60px;
		line-height: 60px;
		box-shadow: 0 1px 1px rgba(100,100,100,0.4); /* 导航栏阴影效果 */
		.left{
			flex: 1;
			font-size: 24px;
			line-height: 60px;
		} /* 导航栏左侧样式 */
		.middle{
			flex: 1;
		} /* 导航栏中部样式，自适应宽度 */
		.right{
			width: 120px;
			line-height: 60px;
		} /* 导航栏右侧样式，固定宽度 */
	}

</style>

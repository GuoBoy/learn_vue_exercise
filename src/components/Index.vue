<template>
	<el-container class="index-container">
		<!-- 头部区域 -->
		<el-header>
			<div class="logo">
				<img src="../assets/logo.png" alt="" />
				<span>电商后台管理系统</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<!-- 页面主体 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="200px">Aside</el-aside>
			<!-- 右侧内容 -->
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	methods: {
		logout() {
			console.log("推出登录");
		},
	},
};
</script>

<style lang="less" scoped>
.el-header {
	background-color: #333744;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: aliceblue;
	font-size: 1.5rem;
	div {
		display: flex;
		align-items: center;
	}
	.logo {
		img {
			height: 4rem;
			width: 4rem;
			border-radius: 50%;
			color: #333744;
		}
	}
}

.el-aside {
	background-color: #333744;
}
.el-main {
	background-color: #eadfbc;
}
.index-container {
	height: 100%;
}
</style>
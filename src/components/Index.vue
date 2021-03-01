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
			<el-aside :width="isCollapse ? '4rem' : '10rem'">
				<div class="toggle-btn" @click="toggleCollapse">|||</div>
				<!-- 菜单栏 -->
				<el-menu
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#9FCEFF"
					unique-opened
					:collapse="isCollapse"
					:collapse-transition="false"
					router
					:default-active="activeMenu"
				>
					<!-- 一级菜单 -->
					<el-submenu
						:index="item.id + ''"
						v-for="item in menuList"
						:key="item.id"
					>
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{ item.authName }}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item
							:index="subitem.path"
							v-for="subitem in item.children"
							:key="subitem.id"
							@click="changeActiveMenu(subitem.path)"
						>
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{ subitem.authName }}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 右侧内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			menuList: [
				{
					id: 1,
					authName: "用户管理",
					children: [
						{ id: 11, authName: "用户列表", path: "/users" },
					],
				},
				{
					id: 2,
					authName: "权限管理",
					children: [
						{ id: 21, authName: "角色列表", path: "/character" },
						{ id: 22, authName: "权限列表", path: "/authority" },
					],
				},
				{
					id: 3,
					authName: "商品管理",
				},
				{
					id: 4,
					authName: "订单管理",
				},
				{
					id: 5,
					authName: "数据统计",
				},
			],
			isCollapse: false,
			activeMenu: "",
		};
	},
	methods: {
		logout() {
			console.log("推出登录");
		},
		toggleCollapse() {
			console.log("折叠");
			this.isCollapse = !this.isCollapse;
		},
		changeActiveMenu(path) {
			this.activeMenu = path;
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
	.el-menu {
		border-right: none;
	}
	.toggle-btn {
		font-size: 1rem;
		line-height: 2rem;
		text-align: center;
		color: #fff;
		letter-spacing: 0.1rem;
		cursor: pointer;
	}
}
.el-main {
	background-color: #eadfbc;
}
.index-container {
	height: 100%;
}
</style>
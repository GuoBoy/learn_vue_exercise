<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 商品列表数据 -->
		<el-card>
			<!-- 搜索和添加 -->
			<el-row :gutter="20">
				<!-- 搜索框 -->
				<el-col :span="8">
					<el-input placeholder="请输入内容" v-model="searchData">
						<el-button
							slot="append"
							icon="el-icon-search"
						></el-button>
					</el-input>
				</el-col>
				<!-- 添加按钮 -->
				<el-col :span="12">
					<el-button type="primary" @click="onAddGoods"
						>添加商品</el-button
					>
				</el-col>
			</el-row>
			<!-- 商品列表 -->
			<el-table :data="goodsList" border style="width: 100%" stripe>
				<!-- 索引列 -->
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="name" label="角色名称"></el-table-column>
				<el-table-column prop="price" label="单价"></el-table-column>
				<el-table-column prop="time" label="创建时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
						></el-button>
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
						></el-button>
					</template>
				</el-table-column> </el-table
			><!-- 分页 -->
			<el-pagination
				:current-page="1"
				:page-sizes="[1, 2, 3, 4]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="goodsList.length"
			>
			</el-pagination
		></el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			goodsList: [
				{ gid: 1, name: "你好吗", price: "123", time: "2021-12-2" },
				{ gid: 2, name: "你ok吗", price: "123", time: "2021-12-2" },
			],
			searchData: "",
		};
	},
	methods: {
		onAddGoods() {
			this.$router.push("/list/add");
		},
	},
};
</script>
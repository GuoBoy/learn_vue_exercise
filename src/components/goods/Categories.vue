<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>分类列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 分类列表数据 -->
		<el-card>
			<el-button type="primary">添加分类</el-button>
			<el-table :data="cateList" border style="width: 100%" stripe>
				<!-- 索引列 -->
				<el-table-column type="index"></el-table-column>
				<el-table-column
					prop="cateName"
					label="分类名称"
				></el-table-column>
				<el-table-column prop="order" label="排序"></el-table-column>
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
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				:current-page="1"
				:page-sizes="[1, 2, 3, 4]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="cateList.length"
			>
			</el-pagination
		></el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cateList: [
				{ cateId: 1, cateName: "大家电" },
				{ cateId: 2, cateName: "热门推荐" },
			],
		};
	},
};
</script>
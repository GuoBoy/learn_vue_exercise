<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 订单列表数据 -->
		<el-card>
			<!-- 搜索框 -->
			<el-row>
				<el-col :span="10">
					<el-input placeholder="请输入内容" v-model="searchData">
						<el-button
							slot="append"
							icon="el-icon-search"
						></el-button> </el-input
				></el-col>
			</el-row>
			<!-- 表格数据 -->
			<el-table :data="orderList" border stripe>
				<!-- 索引列 -->
				<el-table-column type="index"></el-table-column>
				<el-table-column
					prop="orderName"
					label="订单编号"
				></el-table-column>
				<el-table-column
					prop="orderPrice"
					label="价值"
				></el-table-column>
				<el-table-column prop="isPay" label="付款状态">
					<template slot-scope="scope">
						<el-tag type="warning" v-if="scope.row.isPay"
							>已付款</el-tag
						>
						<el-tag type="danger" v-else>未付款</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="isSend" label="是否发货">
					<template slot-scope="scope">
						<el-tag type="warning" v-if="scope.row.isSend"
							>已发货</el-tag
						>
						<el-tag type="danger" v-else>未发货</el-tag></template
					></el-table-column
				>
				<el-table-column
					prop="orderTime"
					label="下单时间"
				></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
						></el-button>
						<el-button
							type="success"
							icon="el-icon-location"
							size="mini"
							@click="showProgress(scope.row)"
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
				:total="orderList.length"
			>
			</el-pagination
		></el-card>
		<!-- 显示物流进度对话框 -->
		<el-dialog title="物流进度" :visible.sync="dialogVisible" width="50%">
			<!-- 时间线 -->
			<el-timeline reverse>
				<el-timeline-item
					v-for="(activity, index) in activities"
					:key="index"
					:timestamp="activity.timestamp"
				>
					{{ activity.content }}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchData: "",
			orderList: [
				{
					orderName: "订单1",
					orderPrice: "123",
					isPay: false,
					isSend: false,
					orderTime: "2020-1-2",
				},
				{
					orderName: "订单2",
					orderPrice: "123",
					isPay: false,
					isSend: false,
					orderTime: "2020-1-2",
				},
			],
			dialogVisible: false,
			activities: [
				{
					content: "活动按期开始",
					timestamp: "2018-04-15",
				},
				{
					content: "通过审核",
					timestamp: "2018-04-13",
				},
				{
					content: "创建成功",
					timestamp: "2018-04-11",
				},
			],
		};
	},
	methods: {
		showProgress(info) {
			this.dialogVisible = true;
		},
	},
};
</script>
<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20">
				<el-col :span="12">
					<el-input placeholder="请输入内容" v-model="searchData">
						<el-button
							slot="append"
							icon="el-icon-search"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="12">
					<el-button type="primary" @click="dialogVisible = true"
						>添加用户</el-button
					>
				</el-col>
			</el-row>
			<!-- 用户列表区域 -->
			<el-table :data="userList" border stripe>
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="date" label="日期"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<!-- 使用插槽 -->
						<!-- {{ scope.row.status }} -->
						<el-switch v-model="scope.row.status"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- {{ scope.row }} -->
						<el-tooltip
							content="修改操作"
							placement="top"
							effect="dark"
							:enterable="false"
						>
							<el-button
								type="primary"
								icon="el-icon-edit"
								size="mini"
							></el-button>
						</el-tooltip>
						<el-tooltip
							content="删除操作"
							placement="top"
							effect="dark"
							:enterable="false"
						>
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="mini"
								@click="deleteUser(scope.row)"
							></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.currentPage"
				:page-sizes="[1, 2, 10]"
				:page-size="queryInfo.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="userList.length"
			>
			</el-pagination>
		</el-card>
		<!-- 添加用户对话框 -->
		<el-dialog
			title="添加用户"
			:visible.sync="dialogVisible"
			width="50%"
			@close="dialogClose"
		>
			<!-- 内容主体 -->
			<el-form
				:model="newUserInfo"
				label-width="80px"
				ref="newUserInfoRef"
				:rules="newUserInfoRules"
			>
				<el-form-item label="用户名" required prop="username">
					<el-input v-model="newUserInfo.username"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" required prop="emailAddr">
					<el-input v-model="newUserInfo.emailAddr"></el-input>
				</el-form-item>
				<el-form-item label="电话" required prop="phoneNum">
					<el-input v-model="newUserInfo.phoneNum"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		// 自定义邮箱验证规则
		var checkEmail = (rule, value, cb) => {
			const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/g;
			// 合法邮箱
			if (regEmail.test(value)) return cb();
			// 非法邮箱
			cb(new Error("请输入正确格式邮箱"));
		};
		return {
			// 用户列表
			userList: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
					status: true,
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄",
					status: false,
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄",
					status: true,
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄",
					status: false,
				},
			],
			// 分页对象数据
			queryInfo: {
				currentPage: 1,
				pageSize: 1,
			},
			searchData: "",
			dialogVisible: false,
			newUserInfo: {
				username: "",
				emailAddr: "",
				phoneNum: "",
			},
			newUserInfoRules: {
				username: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
				],
				emailAddr: [{ validator: checkEmail, trigger: "blur" }],
				phoneNum: [],
			},
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.queryInfo.pageSize = val;
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.queryInfo.currentPage = val;
		},
		dialogClose() {
			this.$refs.newUserInfoRef.resetFields();
		},
		async addUser() {
			this.dialogVisible = false;
			this.$refs.newUserInfoRef.validate((valid) => {
				// 验证失败
				if (!valid) {
					this.$message.error("添加失败");
					return;
				}
				// 验证成功
				// const {data: res} = await this.$http.post()
				this.$message("添加成功");
			});
		},
		deleteUser(userInfo) {
			console.log(userInfo);
			this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.userList.pop(userInfo);
					this.$message({
						type: "success",
						message: "删除成功!",
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
	},
};
</script>
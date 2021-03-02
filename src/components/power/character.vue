<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 角色列表数据 -->
		<el-card>
			<el-button type="primary" @click="addCharacter">添加角色</el-button>
			<el-table :data="authorityData" border style="width: 100%" stripe>
				<!-- 展开列 -->
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-row
							v-for="(item, index) in scope.row.children"
							:key="index"
							:class="[
								'bdbottom',
								index === 0 ? 'bdtop' : '',
								'vcenter',
							]"
						>
							<!-- 一级权限 -->
							<el-col :span="5"
								><el-tag closable>{{ item.name }}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!-- 二三级权限 -->
							<el-col :span="19">
								<el-row
									v-for="(item1, index1) in item.children"
									:key="index1"
									:class="[
										index1 === 0 ? '' : 'bdtop',
										'vcenter',
									]"
								>
									<!-- 二级权限 -->
									<el-col :span="6">
										<el-tag type="success" closable>{{
											item1.name
										}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<!-- 三级权限 -->
									<el-col
										:span="18"
										v-for="(
											item2, index2
										) in item1.children"
										:key="index2"
									>
										<el-tag
											type="warning"
											closable
											@close="
												removeAuthority(
													scope.row,
													item2
												)
											"
											>{{ item2.name }}</el-tag
										>
										<i class="el-icon-caret-right"></i>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<!-- <pre>{{ scope.row }}</pre> -->
					</template>
				</el-table-column>
				<!-- 索引列 -->
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="name" label="角色名称"></el-table-column>
				<el-table-column
					prop="describe"
					label="角色描述"
				></el-table-column>
				<el-table-column label="角色操作">
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
						<el-button
							type="warning"
							size="mini"
							icon="el-icon-setting"
							@click="showSetAuth(scope.row)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 分配权限对话框 -->
		<el-dialog
			title="分配权限"
			:visible.sync="dialogVisible"
			width="50%"
			@close="handleClose"
		>
			<!-- 树形控件 -->
			<el-tree
				:data="allAuthority"
				:props="treeProps"
				show-checkbox
				default-expand-all
				:default-checked-keys="defKeys"
				key="name"
			></el-tree>
			<!-- 底部按钮 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			authorityData: [
				{
					name: "主管",
					describe: "技术负责人",
					children: [
						{
							name: "商品管理",
							children: [
								{
									name: "分类参数",
									children: [{ name: "获取参数列表" }],
								},
								{ name: "商品分类" },
							],
						},
						{ name: "订单管理", children: [{ name: "点单数据" }] },
					],
				},
				{
					name: "副主管",
					describe: "技术副负责人",
				},
				{
					name: "业务主管",
					describe: "业务负责人",
				},
				{
					name: "分主管",
					describe: "分技术负责人",
				},
				{
					name: "小主管",
					describe: "小技术负责人",
				},
			],
			dialogVisible: false,
			allAuthority: [
				{
					name: "商品管理",
					children: [
						{
							name: "分类参数",
							children: [{ name: "获取参数列表" }],
						},
						{ name: "商品分类" },
					],
				},
				{ name: "订单管理", children: [{ name: "点单数据" }] },
				{
					name: "商品管理",
					children: [
						{
							name: "分类参数",
							children: [{ name: "获取参数列表" }],
						},
						{ name: "商品分类" },
					],
				},
			],
			// 树形控件属性绑定对象
			treeProps: {
				label: "name",
			},
			defKeys: [],
		};
	},
	methods: {
		addCharacter() {
			this.$message.success("添加角色");
		},
		removeAuthority(userInfo, aut) {
			this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
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
		// 显示编辑权限对话框
		showSetAuth(role) {
			// 获取三级节点id
			this.getLeafKeys(role, this.defKeys);
			this.dialogVisible = true;
			console.log(this.defKeys);
		},
		handleClose() {
			this.dialogVisible = false;
			this.defKeys = [];
		},
		// 通过递归获取所有三级权限的id并保存到defKeys
		getLeafKeys(node, arr) {
			// 当前node节点不包含children属性，是三级节点
			if (!node.children) {
				return arr.push(node.name);
			}
			node.children.forEach((item) => {
				this.getLeafKeys(item, arr);
			});
		},
		// ...[] ...为展开运算符
	},
};
</script>

<style lang="less" scoped>
.el-tag {
	margin: 1rem;
}
.bdtop {
	border-top: 0.1rem solid #eee;
}
.bdbottom {
	border-bottom: 0.1rem solid #eee;
}
.vcenter {
	display: flex;
	align-items: center;
}
</style>
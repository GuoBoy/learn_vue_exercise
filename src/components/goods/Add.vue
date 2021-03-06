<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加商品</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片区域 -->
		<el-card>
			<!-- 提示区域 -->
			<el-alert
				title="添加山工信息"
				type="info"
				center
				show-icon
				:closable="false"
			>
			</el-alert>
			<!-- 步骤条 -->
			<el-steps
				:space="200"
				:active="activeIndex - 0"
				finish-status="success"
				align-center
			>
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<!-- form包裹的tab -->
			<el-form
				:model="addForm"
				:rules="addFormRules"
				ref="addFormRef"
				label-position="top"
			>
				<!-- tab栏 -->
				<el-tabs
					tab-position="left"
					v-model="activeIndex"
					:before-leave="beforeTabLeave"
				>
					<el-tab-pane label="基本信息" name="0">
						<el-form-item label="商品名称" prop="goods_name">
							<el-input
								v-model="addForm.goods_name"
								clearable
							></el-input> </el-form-item
						><el-form-item label="商品价格" prop="goods_price">
							<el-input
								v-model="addForm.goods_price"
								clearable
								type="number"
							></el-input> </el-form-item
						><el-form-item label="商品重量" prop="goods_weight">
							<el-input
								v-model="addForm.goods_weight"
								clearable
								type="number"
							></el-input> </el-form-item
						><el-form-item label="商品数量" prop="goods_number">
							<el-input
								v-model="addForm.goods_number"
								clearable
								type="number"
							></el-input> </el-form-item
						><el-form-item label="商品分类" prop="goods_cate">
							<!-- 级联选择器 -->
							<el-cascader
								v-model="addForm.goods_cate"
								:options="cateList"
								expand-trigger="hover"
								:props="cateProps"
								@change="handleChange"
							></el-cascader>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品参数" name="1">
						<!-- <el-form-item label="商品参数">
							<el-input
								v-model="addForm.attrs"
								placeholder="输入商品参数"
								clearable
							></el-input>
						</el-form-item> -->
						11
					</el-tab-pane>
					<el-tab-pane label="商品属性" name="2"
						>角色管理</el-tab-pane
					>
					<el-tab-pane label="商品图片" name="3"
						>定时任务补偿</el-tab-pane
					>
					<el-tab-pane label="商品内容" name="4"
						>定时任务补偿</el-tab-pane
					>
				</el-tabs>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: "0",
			// 表单数据对象
			addForm: {
				goods_name: "",
				goods_price: 0,
				goods_weight: 0,
				goods_number: 0,
				goods_cate: [],
				attrs,
			},
			addFormRules: {
				goods_name: [
					{
						required: true,
						message: "请输入商品名称",
						trigger: "blur",
					},
				],
				goods_price: [
					{
						required: true,
						message: "请输入商品价格",
						trigger: "blur",
					},
				],
				goods_weight: [
					{
						required: true,
						message: "请输入商品重量",
						trigger: "blur",
					},
				],
				goods_number: [
					{
						required: true,
						message: "请输入商品数量",
						trigger: "blur",
					},
				],
				goods_cate: [
					{
						required: true,
						message: "请选择商品分类",
						trigger: "blur",
					},
				],
			},
			// 商品分类列表
			cateList: [
				{
					name: "家电",
					children: [
						{ name: "大家电", children: [{ name: "彩电" }] },
					],
				},
			],
			// 级联选择器配置
			cateProps: {
				label: "name",
				value: "name",
			},
		};
	},
	methods: {
		handleChange() {
			console.log(this.addForm);
			if (this.addForm.goods_cate.length != 3) {
				this.addForm.goods_cate = [];
			}
		},
		beforeTabLeave(toTabName, oldTabName) {
			console.log(toTabName, oldTabName);
			if (oldTabName === "0" && this.addForm.goods_cate.length != 3) {
				// 切换其他tab且未选择商品分类则组织跳转
				this.$message.error("请先选择商品分类！");
				return false;
			}
		},
	},
};
</script>
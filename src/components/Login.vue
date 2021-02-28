<template>
	<div class="login-container">
		<div class="login-box">
			<div class="avater">
				<img src="../assets/logo.png" alt="" />
			</div>
			<el-form
				ref="loginFormRef"
				class="login-form"
				:model="loginForm"
				:rules="rules"
			>
				<el-form-item prop="username">
					<el-input
						prefix-icon="el-icon-mobile-phone"
						v-model="loginForm.username"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						prefix-icon="el-icon-lock"
						v-model="loginForm.password"
					></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loginForm: {
				username: "",
				password: "",
			},
			rules: {
				username: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
					// {
					// 	min: 3,
					// 	max: 5,
					// 	message: "长度在 3 到 5 个字符",
					// 	trigger: "blur",
					// },
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
				],
			},
		};
	},
	methods: {
		// 重置表单
		resetLoginForm() {
			this.$refs.loginFormRef.resetFields();
		},
		login() {
			this.$refs.loginFormRef.validate((valid) => {
				if (!valid) return;
				this.$message.success("登录成功");
				this.$router.push("/");
			});
		},
	},
};
</script>

<style lang="less" scoped>
.login-container {
	background-color: #2b4b6b;
	width: 100%;
	height: 100%;
	.login-box {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		width: 30rem;
		height: 20rem;
		.avater {
			width: 10rem;
			height: 10rem;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			border: 0.1rem solid #eee;
			padding: 1rem;
			box-shadow: 0 0 1rem #ddd;
			background-color: #fff;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
		.login-form {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -20%);
			.btns {
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>

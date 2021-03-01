# vue+Element-UI实战
## 生成ssh公钥

`

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

`

## git提交代码

`

// 提交到缓存

git add .

// 提交到github

git commit -m "提交原因"

`
## git分支管理
`
// 获取分支
git branch
// 创建分支
git branch branchname
// 切换分支
git checkout branchname -b	// -b 创建新分支并切换到新分支
// 删除分支
git branch -d branchname
// 合并分支
切换到主分支
git merge 分支名
`
## 提交到github
`
git remote add origin https://github.com/easyprogramer/learn_vue_exercise.git
git branch -M main
git push -u origin main
`
## 报错
1. error  Unexpected tab character  no-tabs》》在.eslintrc.js的rules添加‘no-tabs’: 'off'

## 路由导航守卫控制访问权限
如果用户没有登陆，禁止访问页面
`
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转来
  // next 函数，表示放行
  //    next() 放行  next('/login')放行重定向
  if (to.path === '/login') return next()
  // const token = window.sessionStorage.getItem("token")
  const token = "sd"
  if (!token) return next('/login')
  next()
})
`


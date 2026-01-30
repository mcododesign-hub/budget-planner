# 部署到 Netlify

## 方法一：通过 Netlify CLI（推荐本地测试）

1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

2. 登录 Netlify
```bash
netlify login
```

3. 本地测试
```bash
netlify dev
```

4. 部署
```bash
netlify deploy --prod
```

---

## 方法二：通过 GitHub + Netlify 自动部署（推荐）

1. 将代码推送到 GitHub

2. 登录 [Netlify](https://netlify.com)

3. 点击 "Add new site" → "Import an existing project"

4. 选择你的 GitHub 仓库

5. 配置构建设置：
   - Build command: 留空
   - Publish directory: `.` (根目录)

6. 点击 "Deploy site"

---

## 部署后

部署成功后，Netlify 会给你一个 URL，比如：
```
https://your-site-name.netlify.app
```

手机直接访问这个 URL 即可使用！

---

## 注意事项

- AI 整理功能需要 DeepSeek API Key
- 数据保存在浏览器本地，换设备需导出备份

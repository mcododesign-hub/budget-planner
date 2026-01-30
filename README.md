# 予算表 - 预算计划工具

极简日式风格的预算计划表，支持AI智能整理。

## 功能

- **项目管理** - 添加、编辑、删除预算项目
- **状态管理** - 待购/已购切换，勾选完成
- **优先级** - 高/中/低三级优先级标记
- **预算对比** - 预算金额 vs 实际花费，显示差异
- **分类管理** - 食費、交通、光熱费、その他
- **数据管理** - 导出/导入JSON备份
- **小票导出** - 生成美观的收据PNG图片
- **AI整理** - 调用DeepSeek API智能分析优化

## 安装

```bash
npm install
```

## 运行

```bash
npm start
```

访问 http://localhost:3000

## AI整理使用

1. 点击「AI整理」按钮
2. 输入DeepSeek API Key（从 https://platform.deepseek.com 获取）
3. 可选：输入自定义整理要求
4. 点击「开始整理」

API Key会保存在浏览器本地存储中，下次无需重新输入。

## 项目结构

```
budget-planner/
├── index.html    # 前端页面
├── server.js     # 后端服务（可选，前端可直接调用API）
├── package.json  # 依赖配置
└── README.md     # 说明文档
```

## 技术栈

- 前端：HTML + CSS + 原生JavaScript
- 后端：Node.js + Express
- API：DeepSeek Chat

## 注意事项

- 前端可直接使用，无需启动后端
- 后端主要用于API代理，解决跨域问题
- 数据保存在浏览器localStorage中

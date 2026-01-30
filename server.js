/**
 * 预算表后端服务
 * 提供API代理和DeepSeek集成
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

// DeepSeek API代理 (支持流式响应)
app.post('/api/deepseek', async (req, res) => {
    const { apiKey, messages, model = 'deepseek-chat', temperature = 0.7, stream = false, apiUrl = 'https://api.deepseek.com' } = req.body;

    if (!apiKey) {
        return res.status(400).json({ error: '缺少API Key' });
    }

    try {
        // 构建请求体
        const requestBody = {
            model,
            messages,
            temperature
        };

        // 如果前端请求流式响应
        if (stream) {
            requestBody.stream = true;
        }

        const response = await fetch(`${apiUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            return res.status(response.status).json(errorData);
        }

        // 流式响应处理
        if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            // node-fetch v2 使用 Node.js stream
            response.body.pipe(res);
            response.body.on('error', (err) => {
                console.error('Stream error:', err);
                res.end();
            });
        } else {
            // 非流式响应
            const data = await response.json();
            res.json(data);
        }
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: '服务器内部错误: ' + error.message });
        }
    }
});

// 数据存储端点（可选，用于云端备份）
app.get('/api/data/:key', (req, res) => {
    // 简单的内存存储，生产环境应使用数据库
    const data = app.locals.dataStore?.[req.params.key];
    res.json({ data: data || null });
});

app.post('/api/data/:key', (req, res) => {
    if (!app.locals.dataStore) app.locals.dataStore = {};
    app.locals.dataStore[req.params.key] = req.body.data;
    res.json({ success: true });
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`预算表服务运行在 http://localhost:${PORT}`);
});

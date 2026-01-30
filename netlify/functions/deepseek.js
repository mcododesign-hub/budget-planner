/**
 * Netlify Function for DeepSeek API
 */

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // 只允许 POST 请求
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { apiKey, messages, model = 'deepseek-chat', temperature = 0.7, stream = false, apiUrl = 'https://api.deepseek.com' } = JSON.parse(event.body);

        if (!apiKey) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: '缺少API Key' })
            };
        }

        const requestBody = {
            model,
            messages,
            temperature
        };

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
            return {
                statusCode: response.status,
                body: JSON.stringify(errorData)
            };
        }

        // 流式响应处理
        if (stream) {
            const chunks = [];
            for await (const chunk of response.body) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                },
                body: buffer.toString(),
                isBase64Encoded: false
            };
        } else {
            const data = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        }
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: '服务器内部错误: ' + error.message })
        };
    }
};

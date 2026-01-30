/**
 * Netlify Function for Health Check
 */

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString()
        })
    };
};

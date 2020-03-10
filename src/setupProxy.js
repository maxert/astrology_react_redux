const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://1690550.masgroup.web.hosting-test.net',
      changeOrigin: true,
    })
  );
};
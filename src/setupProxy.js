const { createProxyMiddleware } = require('http-proxy-middleware');

//Связь по API с сервером для получения данных
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://1690550.masgroup.web.hosting-test.net',
      secure:false,
      changeOrigin: true,
    })
  );
};
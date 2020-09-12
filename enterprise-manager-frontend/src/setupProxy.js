const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: process.env.PUBLIC_URL || "http://localhost:3001",
			changeOrigin: true
		})
	)
	app.use(
		"/rails",
		createProxyMiddleware({
			target: process.env.PUBLIC_URL || "http://localhost:3001",
			changeOrigin: true
		})
	)
}

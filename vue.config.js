module.exports = {
	// publicPath: '/web',
	publicPath: '',
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/': {
				// target: 'http://leeshawbynn.vipgz4.idcfengye.com/dv/',
				// target: 'http://136.25.34.120:9090/dv/',
				// target: 'http://139.9.150.10:9876/dv/',
				// target: 'http://192.168.0.107:9090/dv/',
				// target: 'http://192.168.1.103:9090/dv/',
				// target: 'http://136.25.34.109:9090/dv/',
				target: 'http://139.9.150.10:9876/dv/',
				// target: 'http://106.14.82.40:8080',
				changeOrigin: true,
				pathRewrite: {
					'/': ''
				}
			}
		},

	}
}
// const APIV0 = 'http://local.siwei.com'
const APIV0 = ''
const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: '思维纺织后台',
  prefix: 'siweiAdmin',
  footerText: '思维纺织管理后台  © 2017 Penpo',
  logo: './logo.png',
  iconFontCSS: './iconfont.css',
  baseURL: './',
  iconFontJS: './iconfont.js',
  CORS: ['http://localhost:8082', 'http://127.0.0.1:8082', 'http://192.168.0.106:8082', 'http://local.siwei.com', 'http://192.168.0.105:8082'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV0}/api/login`,
    userLogout: `${APIV0}/api/logout`,
    userInfo: `${APIV0}/api/getCurrentUser`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}

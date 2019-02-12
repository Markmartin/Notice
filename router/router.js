const noticeManagerRouter = require('./noticeManagerRouter')
const noticeRouter = require('./noticeRouter')

const router = require('koa-router')();
router.use(noticeManagerRouter.routes(), noticeManagerRouter.allowedMethods())
router.use(noticeRouter.routes(), noticeRouter.allowedMethods())

module.exports = router;
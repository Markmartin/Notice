const router = require('koa-router')();
//业务逻辑code
const code = require('../config/code');
const jsonTool = require('../tools/jsonTool');
//鉴权
const auth = require('../crypto/Authentication');
//logic层
const notice_manager_logic = require('../database/dataModel/modelLogic/noticeManager_model_logic');

router.post('/noticeManager/login', async(ctx) => {
    var respObject = await notice_manager_logic.login(ctx.request.body.account, ctx.request.body.pwd)
    ctx.body = respObject
})

router.post('/noticeManager/:action', async(ctx) => {
    var authKey = ctx.request.body.authKey != undefined ? ctx.request.body.authKey : '';
    if (auth.authCreateManager(authKey) == true) {
        var action = ctx.params.action;
        switch (action) {
            case 'add':
                {
                    var respObject = await notice_manager_logic.create_manager_whole_process(ctx.request.body.account, ctx.request.body.pwd)
                    ctx.body = respObject
                }
                break;
            default:
                {
                    ctx.body = jsonTool.codeJson(code.no_action_match_code)
                }
                break;
        }
    } else {
        //授权错误
        ctx.body = jsonTool.codeJson(code.no_auth_code)
    }
})

module.exports = router
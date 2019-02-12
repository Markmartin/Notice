const router = require('koa-router')();
//业务逻辑code
const code = require('../config/code');
const jsonTool = require('../tools/jsonTool');
//鉴权
const auth = require('../crypto/Authentication');
//logic层
const notice_logic = require('../database/dataModel/modelLogic/notice_model_logic');

router.post('/notice/list', async(ctx) => {
    var page = ctx.request.body.page;
    if (page == undefined || page < 1) {
        page = 1;
    }
    var respObject = await notice_logic.notice_list(page);
    ctx.body = respObject;
})

router.post('/notice/:action', async(ctx) => {
    var secretKey = ctx.request.body.secretKey != undefined ? ctx.request.body.secretKey : '';
    var account = ctx.request.body.account != undefined ? ctx.request.body.account : '';
    if (auth.authPublishNotice(account, secretKey) == true) {
        var action = ctx.params.action;
        switch (action) {
            case 'add':
                {
                    var notice = ctx.request.body.notice != undefined ? ctx.request.body.notice : {};
                    var respObject = await notice_logic.insert_notice(account, notice)
                    ctx.body = respObject
                }
                break;
            case 'update':
                {
                    var notice = ctx.request.body.notice != undefined ? ctx.request.body.notice : {};
                    var respObject = await notice_logic.update_notice(notice)
                    ctx.body = respObject
                }
                break;
            case 'update_status':
                {
                    var noticeId = ctx.request.body.noticeId != undefined ? ctx.request.body.noticeId : -1;
                    var status = ctx.request.body.status != undefined ? ctx.request.body.status : -1;
                    var respObject = await notice_logic.update_notice_status(noticeId, status);
                    ctx.body = respObject;
                }
                break;
            case 'delete':
                {
                    var noticeId = ctx.request.body.noticeId != undefined ? ctx.request.body.noticeId : -1;
                    var respObject = await notice_logic.delete_notice(noticeId);
                    ctx.body = respObject;
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
// const http = require('http')
// const querystring = require('querystring')

// var postData = querystring.stringify({
//     account: '944565923@qq.com',
//     secretKey: 'U2FsdGVkX19nlwiuma2U3jEj8QJvmLBqkoqYHeMPmW0j6kD0vdodXSqRAnEnSNHX2/b5uIm+jSDB0DdZ1fcHPA==',
//     notice: querystring.stringify({
//         title_cn: 'chinese_title',
//         content_cn: 'chinese_content'
//     })
// })

// const options = {
//     hostname: '127.0.0.1',
//     port: 3000,
//     path: '/notice/add',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData)
//     }
// };

// const req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// });

// req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
// });

// // write data to request body
// req.write(postData);
// req.end();


const axios = require('axios');

// axios({
//     method: 'post',
//     url: 'http://127.0.0.1:3000/notice/update',
//     data: {
//         account: '944565923@qq.com',
//         secretKey: 'U2FsdGVkX19nlwiuma2U3jEj8QJvmLBqkoqYHeMPmW0j6kD0vdodXSqRAnEnSNHX2/b5uIm+jSDB0DdZ1fcHPA==',
//         notice: {
//             title_cn: 'chinese_title_update',
//             content_cn: 'chinese_content_update',
//             title_en: 'english_title_update',
//             content_en: 'english_content_update',
//             noticeId: 10,
//             kkk: 'kkk',
//             xxx: 'xxx',
//             zzz: 'zzz'
//         }
//     }
// }).then(function(response) {
//     console.log(response)
// })

axios({
    method: 'post',
    url: 'http://127.0.0.1:3000/notice/update_status',
    data: {
        account: '944565923@qq.com',
        secretKey: 'U2FsdGVkX19nlwiuma2U3jEj8QJvmLBqkoqYHeMPmW0j6kD0vdodXSqRAnEnSNHX2/b5uIm+jSDB0DdZ1fcHPA==',
        status: 1,
        noticeId: 10
    }
}).then(function(response) {
    console.log(response)
})
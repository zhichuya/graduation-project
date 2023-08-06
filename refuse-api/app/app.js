const Koa = require('koa');
const router = require('koa-router')();
const cors = require('@koa/cors')
const static = require('koa-static');
const connection = require('./dbconnection/index');

const app = new Koa();
app.use(static('./static'));
// 配置跨域请求头
app.use(cors({
    origin: (ctx) => {
        if (ctx.url === '/') {
            return "*";
        }
        return "*";
    },
    credentials: !0
}));


// query执行器
const queryExec = function (sql,agrs=[]) {
    return new Promise((resolve, reject) => {
        connection.query(sql,agrs,function (error, results) {
            if(error){
                reject(error);
            }else{
                resolve(results)
            }
        });
    })
}


//  查询垃圾分类
router.get('/api/refusecategory',async (ctx, next) => {
    let query = ctx.query;
    // 获取get的参数
    let keywords = query.keywords ? query.keywords : '垃圾';
    let sql = `SELECT * from refuleclassify WHERE refusename LIKE "%${keywords}%"  OR category LIKE "%${keywords}%" LIMIT 0,50`;
    let res = await queryExec(sql)
    ctx.body = res;
});

//  查询垃圾分类
router.get('/',async (ctx) => {
    ctx.body = 'Server running';
});

app.use(router.routes());

app.listen(3000,() => {
    console.log("app started at port 3000");
});
const Koa = require('koa');
const app = new Koa()

app.use(ctx => {
    const url = ctx.url
    
    switch (url) {
        case '/':
            ctx.status = 200
            ctx.body = `<h2> Index sayfasina hosgeldiniz </h2>`
            break;
        case '/about':
            ctx.status = 200
            ctx.body =`<h2> Hakkimda sayfasina hosgeldiniz </h2>`
            break;
        case '/contact':
            ctx.status = 200
            ctx.body =`<h2> Iletisim sayfasina hosgeldiniz </h2>`
            break;
        default:
            ctx.status = 404
            ctx.body =`<h2> 404 sayfa bulunamadi </h2>`
            break;
    }
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Sunucu port ${port} de başlatildi.`);
})



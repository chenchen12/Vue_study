const http =require('http');
const fs =require('fs');
const httpPort =80;
http.createServer((req,res)=>{
     fs.readFile('index.html','utf-8',(err,content)=>{
         if(err){
             console.log('we cannot open index file')
         }
         res.writeHead(200,{
             'Content-Type':'text/html,charset =utf-8'
         })
         res.end(content);
     })
}).listen(httpPort,()=>{
    console.log('server listening on');
})
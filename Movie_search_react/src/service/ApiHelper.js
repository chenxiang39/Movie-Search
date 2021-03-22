const server = {
    getUrl : 
    async function getUrl(url) {
        //关注分离
        // return new Promise(function(resolve,reject){
        //     //connect web server is ok?
        //     fetch(url).then(res =>{
        //         return res.json();
        //     }
        //     //不用异常处理，catch可以异常穿透
        //     // ,err => {
        //     //     reject("Web Error");
        //     //     return new Promise(()=>{});     //中断promise,因为服务器出错
        //     // }       
        //     //get data is success ?
        //     ).then(function(data){
        //         resolve(data);
        //     })
        //     .catch(function(e){
        //         reject(e);
        //     })
        // })
        try{
            const res = await fetch(url);
            const data = await res.json();
            return data.data;
        }catch(error){
            return "error";
        }
    },
    getUrlWithoutDataLabel : 
    async function getUrl(url) {
        //关注分离
        // return new Promise(function(resolve,reject){
        //     //connect web server is ok?
        //     fetch(url).then(res =>{
        //         return res.json();
        //     }
        //     //不用异常处理，catch可以异常穿透
        //     // ,err => {
        //     //     reject("Web Error");
        //     //     return new Promise(()=>{});     //中断promise,因为服务器出错
        //     // }       
        //     //get data is success ?
        //     ).then(function(data){
        //         resolve(data);
        //     })
        //     .catch(function(e){
        //         reject(e);
        //     })
        // })
        try{
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }catch(error){
            return "error";
        }
    }

}


export default server;
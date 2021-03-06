const query=require('../query')
const crypto=require('crypto')
const getData=require('../getdata')

//admin登录
//获得admin的数据
module.exports=async (req,res)=>{
    try{
        // let pwd=crypto.privateDecrypt({
        //     key:req.keys.privateKey,
        //     padding:crypto.constants.RSA_PKCS1_OAEP_PADDING,
        //     oaepHash:"sha256"
        // },Buffer.from(req.body.pwd)).toString()
        let pwd=req.body.pwd
        let result=await getData(req.body.id,query.getAdminById)
        //成功登录
        if(result.pwd==pwd){
            console.log('[OK]', decodeURIComponent(req.originalUrl))
            var date=new Date();
            date.setMonth(date.getMonth()+1)
            res.append('Set-Cookie', `loginId=${req.body.id};Path=/;expires=${date.toUTCString()}`)
            res.send({result:'OK',data:{
                id:result.id,
                name:result.name,
                create_time:result.create_time,
                work_id:result.work_id, //最近工作的一个admin_log id
                work_total:result.work_total,    //工作数
            }})
        }else{
            console.log('[OK]', decodeURIComponent(req.originalUrl))
            res.send({result:'NG'})
        }
    }catch(error){
        //查询数据库出错
        console.log('[ERR]', decodeURIComponent(req.originalUrl),req.body,error)
        res.status(500).send({result:'NG'})
    }
}
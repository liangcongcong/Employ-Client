//注册登录成功路由跳转
export function getRedirectPath(type,header)
{
    let path=''
    //根据type得到pathinfo
    path +=type==='TFBOYS'?'/tf':'/siyecao'
    // 如果没有头像添加info
    if(!header)
    {
        path+='info'
    }
    return path
}

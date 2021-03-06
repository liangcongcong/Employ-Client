
/**
 * 使用axios封装的ajax请求函数
 * 函数返回的是promise对象
 */
import axios from 'axios'
export default function ajax(url='',data={},type='GET'){
    if(type === 'GET')
    {
        //准备url query 参数数据
        let dataStr =''//数据拼接字符串
        Object.keys(data).forEach(key=>{
            dataStr+=key+'='+data[key]+'&'
        })
        if(dataStr!=='')
        {
            dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'))
            url=url+'?'+dataStr
        }
        return axios.get(url)
    }
    else{
        return axios.post(url,data)//data:包含请求数据的对象
    }
}
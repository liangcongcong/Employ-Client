/**
 * tf信息完善组件
 */
import React,{Component} from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/action'

class TfInfo extends Component{
    state = {
        header:'',//头像名称
        info:'',//职业简介
        post:'',//职位名称
        company:'',//公司名称
        salary:''//工资
    }
    handleChange = (name,val)=>{
        this.setState({[name]:val})
    }
    //设置更新header
    setHeader = (header)=>{
        this.setState({header})
    }
    render()
    {
        const {user} = this.props
        //如果用户信息已完善，自动跳转到tf主界面
        if(user.header)
        {
            return <Redirect to='/tf'/>
        }
        return (
            <div>
                <NavBar>TF信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val=>this.handleChange('post',val)}>职业：</InputItem>
                <InputItem onChange={val=>this.handleChange('company',val)}>公司：</InputItem>
                <InputItem onChange={val=>this.handleChange('salary',val)}>薪资：</InputItem>
                <TextareaItem title="详细信息：" rows={3} onChange={val=>this.handleChange('info',val)}/>
                <Button type="primary" onClick={()=>this.props.updateUser(this.state)}>保存</Button>
            </div>
        )
    }
}
export default connect(state =>({user:state.user}),{updateUser})(TfInfo)
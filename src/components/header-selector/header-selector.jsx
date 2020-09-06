/**
 * 选择头像的组件
 */
import React ,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelector extends Component{
static propTypes = {
    setHeader:PropTypes.func.isRequired
}
state = {
    icon : null
}
constructor(props)
{
    super(props)
    this.headerList = [];
    for(let i=0;i<6;i++)
    {
        const text = `${i+1}`
        this.headerList.push({text,icon:require(`../../assets/imgs/${text}.jpg`)})
    }
}
selectHeader = ({icon,text})=>{
    //更新当前组件状态
    this.setState({icon})
    //更新父组件状态
    this.props.setHeader(text)
}
render()
{
    //计算头部显示
    const {icon} = this.state
    const girdHeader = icon ?<p>已选择头像：<img src={icon} alt="header"/></p>:'请选择头像'
    return (
        <List renderHeader={girdHeader}>
            <Grid data={this.headerList} columnNum={3} onClick={this.selectHeader}/>
        </List>
    )
}
}
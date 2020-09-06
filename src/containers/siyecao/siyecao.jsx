/**
 * 四叶草的主路由组件
 */
import React,{Component} from 'react'
import {connect } from 'react-redux'

import {getUserList} from '../../redux/action'
import UserList from '../../components/user-list/user-list'
class Siyecao extends Component{
    componentDidMount()
    {
        this.props.getUserList('siyecao')
    }
    render()
    {
        return <UserList userList = {this.props.userList}></UserList>
    }
}
export default connect(
    state => ({userList: state.userList}),{getUserList}
)(Siyecao)
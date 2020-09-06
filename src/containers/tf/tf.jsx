/**
 * tf的主路由组件
 */
import React,{Component} from 'react'
import {connect } from 'react-redux'

import {getUserList} from '../../redux/action'
import UserList from '../../components/user-list/user-list'
class Tf extends Component{
    componentDidMount()
    {
        this.props.getUserList('TFBOYS')
    }
    render()
    {
        return <UserList userList = {this.props.userList}></UserList>
    }
}
export default connect(
    state => ({userList:state.userList}),{getUserList}
)(Tf)
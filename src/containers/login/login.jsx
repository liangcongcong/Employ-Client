import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/action'
class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  // 处理输入框数据/单选框变化，修改数据state
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  // 路由跳转到register
  toRegister = () => {
    this.props.history.replace("./register");
  };
  // 登录
  login = () => {
    //console.log(JSON.stringify(this.state));
    this.props.login(this.state)
  };
  render() {
    //const { type } = this.state;
    const {redirectTo ,msg}=this.props
    if(redirectTo)
    {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>啵啵与四叶草</NavBar>
        <Logo />
        <WingBlank>
         {msg?<p className='error-msg'>{msg}</p>:null}
          <List>
            <InputItem
              placeholder="请输入用户名"
              onChange={(val) => {
                this.handleChange("username", val);
              }}
            >
              用户名：
            </InputItem>
            <WhiteSpace />
            <InputItem
            type="password"
              placeholder="请输入密码"
              onChange={(val) => {
                this.handleChange("password", val);
              }}
            >
              密码：
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登录
            </Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
export default connect(state => state.user,{login})(Login)
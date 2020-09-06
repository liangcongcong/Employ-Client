import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {connect} from 'react-redux'
//重定向组件
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/action'
class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    type: "siyecao",
  };
  // 处理输入框数据/单选框变化，修改数据state
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  // 路由跳转到login
  toLogin = () => {
    this.props.history.replace("./login");
  };
  // 注册
  register = () => {
    //console.log(JSON.stringify(this.state));
    this.props.register(this.state)
  };
  render() {
    //const { type } = this.state;
    const {redirectTo,msg} = this.props
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
            <InputItem
            type="password"
              placeholder="请输入确认密码"
              onChange={(val) => {
                this.handleChange("password2", val);
              }}
            >
              确认密码：
            </InputItem>
            <WhiteSpace />
            <List.Item>
              <span style={{ marginRight: 30 }}>用户类型:</span>
              <Radio
                checked={this.state.type === "TFBOYS"}
                onClick={() => {
                  this.handleChange("type", "TFBOYS");
                }}
              >
                TFBOYS
              </Radio>
              <Radio
                checked={this.state.type === "siyecao"}
                onClick={() => {
                  this.handleChange("type", "siyecao");
                }}
              >
                四叶草
              </Radio>
              <WhiteSpace />
              <Button type="primary" onClick={this.register}>
                注册
              </Button>
              <WhiteSpace />
              <Button onClick={this.toLogin}>已有账户</Button>
            </List.Item>
          </List>
        </WingBlank>
      </div>
    );
  }
}
//connect包装组件的state数据
export default connect(state => state.user,{register})(Register)

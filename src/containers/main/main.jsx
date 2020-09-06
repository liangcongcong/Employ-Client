import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import siyecaoInfo from "../siyecaoInfo/siyecaoInfo";
import TfInfo from "../tf-info/TfInfo";
import Cookies from "js-cookie";
import Siyecao from "../siyecao/siyecao";
import Tf from "../tf/tf";
import Message from "../message/message";
import Personal from "../personsal/personal";
import NotFound from "../../containers/not-found/not-found";
import NavFooter from "../../components/nav-footer/nav-footer";
import { getUser } from "../../redux/action";
import { getRedirectPath } from "../../utils";
import { NavBar } from "antd-mobile";
import { connect } from "react-redux";
import Chat from "../chat/chat";
export class Main extends Component {
  //组件类与组件对象
  // 给组件对象添加属性
  navList = [
    {
      path: "/siyecao",
      component: Siyecao,
      title: "四叶草列表",
      icon: "siyecao",
      text: "四叶草",
    },
    {
      path: "/tf",
      component: Tf,
      title: "tfboys列表",
      icon: "tfboys",
      text: "啵啵",
    },
    {
      path: "/message",
      component: Message,
      title: "消息列表",
      icon: "message",
      text: "消息",
    },
    {
      path: "/personal",
      component: Personal,
      title: "个人中心",
      icon: "personal",
      text: "个人中心",
    },
  ];
  componentDidMount() {
    // cookie中有userId
    // redux中的user是空对象
    const userId = Cookies.get("userId");
    const { user } = this.props;
    if (userId && !user._id) {
      this.props.getUser(); //获取user并保存到redux中
    }
  }
  render() {
    // 得到当前请求的path
    const pathname = this.props.location.pathname;
    // 如果浏览器中没有保存userId的cookie，直接跳转到login
    const userId = Cookies.get("userId");
    if (!userId) {
      return <Redirect to="/login" />;
    }
    //cookie 中有userid
    //redux 中的user是否有数据
    const { user } = this.props;
    if (!user._id) {
      return null; //不做任何显示
    } else {
      //请求路径时，自动跳到对应的用户主界面
      if (pathname === "/") {
        const path = getRedirectPath(user.type, user.header);
        return <Redirect to={path} />;
      }
      if (user.type === "TFBOYS") {
        this.navList[1].hide = true;
      } else {
        this.navList[0].hide = true;
      }
    }
    // 得到当前的nav
    const currentNav = this.navList.find((nav) => nav.path === pathname);
    const unReadCount = this.props.unReadCount
    return (
      <div>
        {currentNav ? (
          <NavBar className="stick-top">{currentNav.title}</NavBar>
        ) : null}
        <Switch>
          <Route path="/tfinfo" component={TfInfo}></Route>
          <Route path="/siyecaoinfo" component={siyecaoInfo}></Route>
          <Route path="/siyecao" component={Siyecao}></Route>
          <Route path="/tf" component={Tf}></Route>
          <Route path="/message" component={Message}></Route>
          <Route path="/personal" component={Personal}></Route>
          <Route path="/chat/:userId" component={Chat}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        {currentNav ? (
          <NavFooter
            className="am-tab-bar"
            unReadCount={unReadCount}
            navList={this.navList}
          />
        ) : null}
      </div>
    );
  }
}
export default connect(
  (state) => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  { getUser }
)(Main);

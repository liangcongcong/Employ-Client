/**
 * 底部导航组件
 */
import React from "react";
import PropTypes from "prop-types";
import { TabBar } from "antd-mobile";
//import { withConverter } from "js-cookie";
import { withRouter } from "react-router-dom";
const Item = TabBar.Item;
class NavFooter extends React.Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount:PropTypes.number.isRequired
  };
  render() {
    const navList = this.props.navList.filter((nav) => !nav.hide);
    const { pathname } = this.props.location;
    return (
      <TabBar>
        {navList.map((nav, index) => (
          <Item
            key={nav.path}
            badge={nav.path === '/message'?this.props.unReadCount:0}
            title={nav.text}
            icon={{ uri: require(`./img/${nav.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${nav.icon}-selected.png`) }}
            selected={pathname===nav.path}
            onPress={()=>this.props.history.replace(nav.path)}
          />
        ))}
      </TabBar>
    );
  }
}
export default withRouter(NavFooter)//让非路由组件可以访问到路由组件的api

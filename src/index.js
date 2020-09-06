import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import {Provider} from 'react-redux'
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import Main from "./containers/main/main";
import store from './redux/store'
import './assets/css/index.less'
//项目入口
ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route component={Main}></Route> 默认路由
        </Switch>
      </HashRouter>
    </Provider>
  , document.getElementById('root'))

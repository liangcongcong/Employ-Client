/**
 * 包含所有action creator函数的模块
 */
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from "./action-types";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadChatMsg
} from "../api";
import io from "socket.io-client";
//import { resetWarningCache } from "prop-types";
//接收消息列表的同步action
const receiveMsgList = ({users,chatMsgs,userId})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userId}})
//接收消息的同步action
const receiveMsg = (chatMsg,isToMe)=>({type:RECEIVE_MSG,data:{chatMsg,isToMe}})
//读取了消息的同步action
const msgRead = ({from,to,count})=>({type:MSG_READ,data:{from,to,count}})
//同步错误消息
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
//同步成功响应
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
//同步接收用户
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
//同步重置用户
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });
// 用户列表
const receiveUserList = (users) => ({ type: RECEIVE_USER_LIST, data: users });

/** 
 * 初始化客户端socketio
 * 1、连接服务器
 * 2、绑定用于接收服务器返回chatMsg
*/
function initIO(dispatch,userId)
{
  if(!io.socket){
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMessage',(chatMsg)=>{
      if(chatMsg.from===userId||chatMsg.to===userId)
      {
        dispatch(receiveMsg(chatMsg,chatMsg.to === userId))
      }
    })
  }
}
/**
 * 
 * 获取当前用户相关的所有聊天消息列表
 * （在登陆/注册/获取用户信息成功后调用
 */
async function getMsgList(dispatch,userId)
{
  initIO(dispatch,userId)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0)
  {
    const {chatMsgs,users} = result.data
    dispatch(receiveMsgList({chatMsgs,users,userId}))
  }
}
/**
 * 发送消息异步action
 */
export const sendMsg = ({from,to,content}) => {
  return async dispatch =>{
    io.socket.emit('sendMessage',{from,to,content})
  }
}
/**
 * 更新读取消息的异步action
 */
export const readMsg = (userId) => {
  return async (dispatch,getState) =>{
    const response = await reqReadChatMsg(userId)
    const result = response.data
    if(result.code===0)
    {
      const count = result.data
      const from = userId
      const to = getState().user._id
      dispatch(msgRead({from,to,count}))
    }
  }
}
// 异步获取用户列表
export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};
/**
 * 异步注册
 */
export function register({ username, password, password2, type }) {
  //前台表单校验，如果不合法返回一个同步的action对象，显示提示信息
  if (!username || !password || !type) {
    return errorMsg("用户名密码必须输入");
  }
  if (password !== password2) {
    return errorMsg("密码与确认密码不一致");
  }
  return async (dispatch) => {
    //异步ajax请求，得到响应
    const response = await reqRegister({ username, password, type });
    //得到响应数据
    const result = response.data;
    //如果是正确的
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
}
/**
 * 异步登录
 */
export const login = ({ username, password }) => {
  if (!username || !password) {
    return errorMsg("用户密码必须输入");
  }
  return async (dispatch) => {
    const response = await reqLogin({ username, password });
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};
/**
 * 更新用户
 */
export const updateUser = (user) => {
  return async (dispatch) => {
    //发送异步ajax请求
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};
/**
 * 异步获取用户信息
 */
export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

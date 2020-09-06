/**
 * 包含多个用于生成新的state的reducer函数的模块
 */
import { combineReducers } from "redux";
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
import { getRedirectPath } from "../utils";
const initUser = { username: "", type: "", msg: "", redirectTo: "" };
const initUserList = [];
//初始化chat 对象
const initChat = {
    chatMsgs:[], //消息数组s
    users:{},//所有用户的集合对象
    unReadCount:0//未读消息的数量
}
// 管理消息数据的reducer
function chat(state = initChat,action){
    switch(action.type){
        case RECEIVE_MSG:
            const {chatMsg,userId1} = action.data
            return {
                chatMsgs:[...state.chatMsgs,chatMsg],
                users:state.users,
                unReadCount:state.unReadCount+(!chatMsg.read&&chatMsg.to===userId1?1:0)
            }
        case RECEIVE_MSG_LIST:
            const {chatMsgs,users,userId} = action.data
            return {
                chatMsgs,
                users,
                unReadCount: chatMsgs.reduce((preTotal,msg)=>{
                    return preTotal+(!msg.read&&msg.to===userId?1:0)
                },0)
            }
        case MSG_READ:
            const {count,from,to} = action.data
            return {
              chatMsgs:state.chatMsgs.map(msg=>{
                  if(msg.from===from&&msg.to===to&&!msg.read){
                      return {...msg,read:true}
                  } else {
                      return msg
                  }
              }),
              users:state.users,
              unReadCount:state.unReadCount-count
            }
        default:
            return state
    }
}
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const redirectTo = getRedirectPath(action.data.type, action.data.header);
      return { ...action.data, redirectTo };
    case ERROR_MSG:
      return { ...state, msg: action.data };
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return { ...initUser, msg: action.data };
    default:
      return state;
  }
}
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}
/**
 * 返回合并后的reducer函数
 */
export default combineReducers({
  user,
  userList,
  chat
});

/**
 *对话消息列表组件
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";
const Item = List.Item;
const Brief = Item.Brief;
function getLastMsgs(chatMsgs, userId) {
  const lastMsgsObj = {};
  chatMsgs.forEach(msg => {
    msg.unReadCount = 0;
    //判断当前msg对应lastMsg 是否存在
    const chatId = msg.chat_id;
    const lastMsg = lastMsgsObj[chatId];
    //不存在
    if (!lastMsg) {
      //将msg保存为lastMsg
      lastMsgsObj[chatId] = msg;
      //别人发给我的未读消息
      if (!msg.read && userId === msg.to) {
        //指定msg上的未读数量为1
        msg.unReadCount = 1;
      }
    } else {
      //存在
      //
      if (msg.create_time > lastMsg.create_time) {
        lastMsgsObj[chatId] = msg;
        msg.unReadCount = lastMsg.unReadCount;
      }
      if (!msg.read && userId === msg.to) {
        msg.unReadCount++;
      }
    }
  });
  const lastMsgs = Object.values(lastMsgsObj);
  lastMsgs.sort(function (msg1, msg2) {
    return msg2.create_time - msg1.create_time;
  });
  return lastMsgs;
}
class Message extends Component {
  render() {
    const { user, chat } = this.props;
    const meId = user._id;
    const { users, chatMsgs } = chat;
    const lastMsgs = getLastMsgs(chatMsgs, meId);
    return (
      <List style={{ marginTop: 50, marginBottom: 50 }}>
        {lastMsgs.map((msg) => {
          const targetId = msg.from === meId ? msg.to : msg.from;
          const targetUser = users[targetId];
          const avatarImg = targetUser.avatar
            ? require(`../../assets/imgs/${targetUser.avatar}.jpg`)
            : null;
          return (
            <Item
              key={msg._id}
              extra={<Badge text={msg.unReadCount}></Badge>}
              thumb={avatarImg}
              arrow="horizontal"
              onClick={() => this.props.history.push(`/chat/${targetId}`)}
            >
              {msg.content}
              <Brief>{targetUser.name}</Brief>
            </Item>
          );
        })}
      </List>
    );
  }
}
export default connect(
    state =>({
        user:state.user,
        chat:state.chat
    })
)(Message)

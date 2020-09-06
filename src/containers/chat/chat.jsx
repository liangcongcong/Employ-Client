/**
 * 对话聊天的路由组件
 */
import React, { Component } from "react";
import { NavBar, List, InputItem, Grid, Icon } from "antd-mobile";
import { sendMsg, readMsg } from "../../redux/action";
import QueueAnim from "rc-queue-anim";
import { connect } from "react-redux";
const Item = List.Item;
class Chat extends Component {
  state = {
    content: "", //输入聊天内容
    isShow: false, //是否显示表情列表
  };
  submit = () => {
    console.log('发送信息')
    const content = this.state.content.trim();
    console.log(content)
    const to = this.props.match.params.userId;
    console.log(to)
    const from = this.props.user._id;
    console.log(from)
    this.props.sendMsg({ from, to, content });
    console.log('消息发出')
    this.setState({ content: "" });
  };
  componentWillMount() {
      // 初始化表情列表数据
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
  this.emojis = emojis.map(emoji => ({text: emoji}))
  }
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
    this.props.readMsg(this.props.match.params.userId);
  }
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentWillUnmount() {
    this.props.readMsg(this.props.match.params.userId);
  }
  //切换表情列表显示
  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({ isShow });
    if (isShow) {
      //异步手动派发resize事件，解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"), 0);
      });
    }
  };
  render() {
    const { user } = this.props;
    const { chatMsgs, users } = this.props.chat;
    const targetId = this.props.match.params.userId;
    if (!users[targetId]) {
      return null;
    }
    const meId = user._id;
    const chatId = [targetId, meId].sort().join("_");
    const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);
    const targetIcon = users[targetId]
      ? require(`../../assets/imgs/${users[targetId].header}.jpg`)
      : null;
    return (
      <div id="chat-page">
        <NavBar
          className="stick-top"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>
        <List style={{ marginBottom: 50, marginTop: 50 }}>
          <QueueAnim type="left" delay={100}>
            {msgs.map((msg) => {
              if (msg.from === targetId) {
                return (
                  <Item key={msg._id} thumb={targetIcon}>
                    {msg.content}
                  </Item>
                );
              } else {
                return (
                  <Item key={msg._id} className="chat-me" extra="我">
                    {msg.content}
                  </Item>
                );
              }
            })}
          </QueueAnim>
        </List>
        <div className="am-tab-bar">
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={(val) => this.setState({ content: val })}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span>
                <span
                  onClick={this.toggleShow}
                  style={{ marginRight: 5 }}
                >😊</span>
                <span onClick={this.submit}>发送</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              onClick={(item) => {
                this.setState({ content: this.state.content + item.text });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg,
  readMsg,
})(Chat);

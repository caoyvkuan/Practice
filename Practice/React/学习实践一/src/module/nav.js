import React from 'react';
import './CSS/nva.css';
import { Button, Modal, Input, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';

export default class Nav extends React.Component {

  state = {
    pStyle: '"text-indent:2em"',
    style: '',
    visible: false,
    colorIndex : 0
  }
  color = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'magenta',
    'volcano',
    'gold',
    'lime',]

  render() {
    const { defaultOnClick, through } = this.props;
    const { visible, style } = this.state;
    return (
      <nav>
        <div>
          <Button
            value="游戏"
            block={true}
            onClick={defaultOnClick}>
            游戏
          </Button>
          <Button
            value="软件"
            block={true}
            onClick={defaultOnClick}>
            软件
          </Button>
        </div>
        <div>
          <Tooltip
            title="OK!"
            trigger={['click']}
            placement="right"
            color={this.color[this.state.colorIndex]}
            onVisibleChange={(e) => {
              if(!e){
                const i = Math.floor(Math.random() * this.color.length)
                this.setState({
                  colorIndex:i
                })
                console.log(this.color[i]);
              }
            }}
          >
            <Button
              onClick={through(this.addTagCopy.bind(this))}
              block={true}>
              格式化
            </Button>
          </Tooltip>
        </div>
        <div>
          <Button
            onClick={through(this.showModal)}
            block={true}>
            P 样式
          </Button>
          <Button
            block={true}
            onClick={through((v) => { copy(v) })}>
            复制
          </Button>
          <Modal
            visible={visible}
            title="修改格式化时P的样式,行内样式写法"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input value={style} onChange={this.inputChange} />
          </Modal>
        </div>
      </nav>
    );
  }

  addTagCopy(value) {
    // let strArr = value.match(/.+/gim);
    // let str = strArr.map(item => {
    //   if (/^([游戏|软件].{3})/.test(item)) {
    //     return `<h3>${item}</h3>`;
    //   } else {
    //     return `<p>${item}</p>`;
    //   }
    // })
    let str = value.replace(/(^[游戏|软件].{3})/gim, '<h3>$1</h3>');
    str = str.replace(/(^[^<].+)/gim, `<p style=${this.state.pStyle}>$1</p>`);

    copy(str);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  inputChange = (e) => {
    this.setState({
      style: e.target.value,
    });
  };
  handleOk = () => {
    this.setState({
      pStyle: `"${this.style}"`,
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
}
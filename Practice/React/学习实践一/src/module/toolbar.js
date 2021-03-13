import React from 'react';
import './CSS/toolbar.css';
import { Menu, Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ShowSpan, DropList, Button } from './toolSub';
import copy from 'copy-to-clipboard';
const { Item } = Menu; 

// 计数
export default class Toolbar extends React.Component {

  state = {
    kind: {
      software: { name: '软件', count: 0, id: 'software', checked: false },
      game: { name: '游戏', count: 0, id: 'game', checked: true },
      article: { name: '文章', count: 0, id: 'article', checked: false }
    },
    show: {
      one: 'game',
      two: 'software'
    },
    curShow: 'one',
    amount: 1,
    seoCurrent:'游戏',
    seoInputOne:'游戏下载地址',
    seoInputTwo:'安卓版下载地址',
  }
  seoSelect = ['游戏', '软件']
  seoContent = {
    软件: [
      ['APP下载地址', '安卓版下载地址'],
      ['软件下载地址', '安卓版软件下载'],
      ['软件客户端下载','下载安装地址']
    ],
    游戏: [
      ['游戏下载地址', '手游安卓版下载地址'],
      ['手游下载地址', '安卓手机版下载']
    ],
  }
  seoEnCorresponding = {
    游戏: 'game',
    软件: 'software'
  }

  render() {
    const data = this.state.kind;
    const key = this.getKey(data);

    const MenuDom = this.getMenu(key);

    const Dom = this.getDom();

    const sum = this.sum(key);

    const seoMenu = (
      <Menu onClick={this.SeoMenu.bind(this)}>
        {this.seoSelect.map((i) => {
          return (
            <Item key={i} >{i}</Item>
          )
        })}
      </Menu>
    )
    const {amount, seoInputOne, seoInputTwo, seoCurrent} = this.state;

    return (
      <div className="count">
        <div className="show">
          {Dom}
        </div>
        <div className="menu">
          {MenuDom}
        </div>
        <div className="sum">
          <span>总数：{sum}</span>
          <Input type="text"
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
            value={amount} />
        </div>
        <div className="calc">
          <Button className='but' onClick={() => { this.Calc(true) }}>
            <PlusOutlined />
          </Button>
          <Button className='but' onClick={() => { this.Calc(false) }}>
            <MinusOutlined />
          </Button>
        </div>
        <div className="game-name">
          <Input
            value=''
            onInput={this.Paste.bind(this)}
          />
        </div>
        <div className="seo">
          <Input value={seoInputOne} />
          <Input value={seoInputTwo} />
        </div>
        <div className="seo-select">
          <DropList menu={seoMenu} name={seoCurrent} />
        </div>
      </div>
    );
  }

  // seo 切换
  SeoMenu(e) {
    const key = e.key;
    const arr = this.seoContent[key];
    const i = Math.floor(Math.random() * arr.length);
    this.setState({
      seoCurrent: key,
      seoInputOne: arr[i][0],
      seoInputTwo: arr[i][1]
    })
  }

  // 粘贴复制
  Paste(e) {
    const state = this.state;
    const value = e.target.value.trim();
    const Copy = value +
      state.seoInputOne + '-' +
      value + state.seoInputTwo;
    copy(Copy);
    const cur = this.seoEnCorresponding[state.seoCurrent];
    this.setState({
      kind: {
        ...state.kind,
        [cur]: {
          ...state.kind[cur],
          count:state.kind[cur].count + 1
        }
      }
    })
    this.props.through((v) => {
      return value;
    },'curName')
  }

  // 计算
  Calc = calcBoole => {
    let kind = this.state.kind;
    const amount = this.state.amount;
    for (const key of Object.keys(kind)) {
      const cur = kind[key];
      const state = cur.checked;
      if (state) {
        let curSum = cur.count;
        if (calcBoole) {
          curSum += amount;
        } else {
          curSum -= amount;
          curSum = curSum < 0 ? 0 : curSum;
        }
        kind = {
          ...kind,
          [key]: {
            ...cur,
            count: curSum
          }
        }
      }
    }
    this.setState({
      kind: kind
    })
  }
  // input 输入问题
  onKeyPress = e => {
    if (!/\d/.test(e.key)) e.preventDefault();
  }
  onInputChange = e => {
    const value = ~~e.target.value;
    if (!/\d+/.test(value) || value <= 0) {
      this.setState({ amount: 1 });
      return;
    }
    this.setState({ amount: value });
  }

  // 计数
  sum(key) {
    let sum = 0;
    const kind = this.state.kind;
    key.forEach((i) => {
      const count = kind[i].count;
      sum += count;
    });
    return sum;
  }

  // 菜单切换
  onClickMenu = e => {
    const key = e.key;
    const state = this.state;
    const show = state.show;
    const cur = state.curShow === 'one' ? 'two' : 'one';
    if (key === show[cur]) {
      const { one, two } = show;
      this.setState({
        show: {
          one: two,
          two: one
        }
      });
      return;
    }
    this.setState({
      show: {
        ...show,
        [this.state.curShow]: key
      }
    });
  }
  onMenuChange = e => {
    this.setState({
      curShow: e.key
    });
  }

  // 勾选更改
  onChange = e => {
    const { id, checked } = e.target;
    const kind = this.state.kind;
    this.setState({
      kind: {
        ...kind,
        [id]: {
          ...kind[id],
          checked: checked
        }
      }
    });
  }

  // 得到key
  getKey(obj) {
    const key = [];
    for (const i of Object.keys(obj)) {
      key.push(i);
    }
    return key;
  }

  // 得到要的 Dom
  getDom() {
    const data = this.state.kind;
    const show = this.state.show;
    const arr = [];
    for (const k of Object.keys(show)) {
      arr.push(show[k]);
    }
    const dom = arr.map((i) => {
      return (
        <div className="item" key={i}>
          <ShowSpan {...data[i]} onChange={this.onChange} />

        </div>
      );
    });
    return dom;
  }

  // 得到菜单
  getMenu(key) {
    const kind = this.state.kind;
    const kindMenu = (
      <Menu onClick={this.onClickMenu}>
        {key.map(i => {
          return <Menu.Item key={i}>{kind[i].name}</Menu.Item>
        })}
      </Menu>
    )
    const showMenu = (
      <Menu onClick={this.onMenuChange} >
        <Item key="one">one</Item>
        <Item key="two">two</Item>
      </Menu>
    )
    const cur = this.state.curShow;
    const kindShow = this.state.show[cur];
    return (
      <>
        <DropList menu={showMenu} name={cur} />
        <DropList menu={kindMenu} name={kind[kindShow].name} />
      </>
    )
  }

}
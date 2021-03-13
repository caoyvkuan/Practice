import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hdr  from './module/hdr';
import Nav from './module/nav';
import { Input } from 'antd';
const { TextArea } = Input;
// import { PropTypes } from 'prop-types';

class App extends React.Component {
  state = {
    textArea: '',
    curName:''
  }
  sum = 0;
  
  render() {
    return (
      <main id="app">
          <Hdr through={this.changeStateThrough.bind(this)}/>
        <article>
          <Nav
            defaultOnClick={this.defaultChange}
            through={this.throughState.bind(this)}
            />
          <TextArea
            className="tsx"
            showCount
            maxLength={1000}
            value={this.state.textArea}
            onChange={this.TextChange.bind(this)}>
          </TextArea>
        </article>
      </main>
    );
  }
  // 回调用 接收一个函数和需要修改的属性
  throughState(fn, str) {
    const key = str ? str : 'textArea';
    const value = this.state[key];
    return () => {
      const getValue = fn(value);
      if (getValue) {
        this.setState({
          [key]:getValue
        })
      }
    }
  }
  changeStateThrough(fn, str) {
    const key = str ? str : 'textArea';
    const value = this.state[key];
    const getValue = fn(value);
      if (getValue) {
        this.setState({
          [key]:getValue
        })
      }
  }


  TextChange(e) {
    const value = e.target.value;
    this.setState({
      textArea:value
    })
  }
  defaultChange = (e) => {
    const str = e.target.value;
    const value = `《${this.state.curName}》是一款!喜欢就赶紧下载${str}体验一下吧!\n${str}特色\n· \n· \n· \n${str}亮点\n· \n· \n· \n${str}介绍\n· \n· \n· `;
    this.setState({
      textArea:value
    })
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
{/* <React.StrictMode>
    <App />
</React.StrictMode>, */}
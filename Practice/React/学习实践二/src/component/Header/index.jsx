import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import './index.css'

export default class Header extends Component {
	state = {
		value: ''
	}

	static propTypes = {
		addData: PropTypes.func.isRequired
	}

	render() {
		return <input
			className="enter"
			type="text"
			value={this.state.value}
			placeholder="请输入你的任务名称,按回车键确认!"
			onChange={this.handleChange.bind(this)}
			onKeyUp={this.props.addData(this.handleKeyUp.bind(this))}
		/>;
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}
	handleKeyUp(e, data) {
		const { target, key } = e;
		if (key !== 'Enter') return;
		if (target.value.trim() === '') { alert('输入不能为空'); return; }
		// 事件
		const newObj = { id: nanoid(), name: target.value, done: false };
		const newArr = [newObj, ...data];
		this.setState({ value: '' })
		return newArr;
		// console.log(e);
	}
}

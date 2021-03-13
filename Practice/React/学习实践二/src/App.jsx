import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import Header from './component/Header'
import List from './component/List'
import Footer from './component/Footer'
import './App.css'

export default class App extends Component {

	state = {
		data: [
			{ id: nanoid(), name: '吃饭', done: false },
			{ id: nanoid(), name: '打游戏', done: false },
			{ id: nanoid(), name: '打地鼠', done: false },
		]
	}

	render() {
		return (
			<main className="app">
				<Header addData={this.changeState} />
				<List data={this.state.data} update={this.update.bind(this)} />
				<Footer data={this.state.data} update={this.update.bind(this)} />
			</main>
		)
	}

	// 回调专用
	changeState = (fn, stateName) => {
		const key = stateName ? stateName : 'data';
		const value = this.state[key];

		return (e) => {
			const getValue = fn(e, value);
			if (getValue !== undefined) {
				this.setState({
					[key]: getValue
				})
			}
		}
	}

	// 更新数据
	update(type, id, done) {
		const { data } = this.state;
		// type = type || 'update';
		// id = id || 'all';
		const newData = data.map(i => {
			switch (type) {
				case 'update': {
					if (id === i.id || id === 'all') {
						return { ...i, done }
					} else {
						return i;
					}
				}
				case 'delete': {
					if (id === i.id || id === 'all' || (i.done && id === 'ok')) {
						break;
					} else {
						return i
					}
				}
			}
		}).filter(i => {
			return !!i;
		})
		this.setState({ data: newData });
	}
}

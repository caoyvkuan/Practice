import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {

	state = {
		butShow: false
	}
	// throttleId = 0

	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		done: PropTypes.bool.isRequired,
		update: PropTypes.func.isRequired
	}

	handleCheck = (e) => {
		const { update, id } = this.props;
		update('update', id, e.target.checked);
	}
	handleClick = () => {
		const { update, id } = this.props;
		window.confirm('确定要删除吗?') && update('delete', id)
		// update('delete', id)
	}
	// 不用提示连续删除的话后下一个不会直接显示删除按钮 方法不对
	// throttle = () => {
	// 	clearTimeout(this.throttleId);
	// 	this.throttleId = setTimeout(() => {
	// 		console.log('ok');
	// 		this.setState({ butShow: true })
	// 	}, 200)
	// }

	render() {
		const { name, done } = this.props;
		return (
			<li className="item"
				onMouseEnter={() => { this.setState({ butShow: true }) }}
				onMouseLeave={() => { this.setState({ butShow: false }) }}
				onMouseMove={this.throttle}
			>
				<label>
					<input
						type="checkbox"
						checked={done}
						onChange={this.handleCheck}
					/>
					<span>{name}</span>
				</label>
				{ this.state.butShow &&
					<button onClick={this.handleClick}>删除</button>
				}
			</li>
		)
	}

	// componentWillUnmount() {
	// 	clearTimeout(this.throttleId);
	// }
}

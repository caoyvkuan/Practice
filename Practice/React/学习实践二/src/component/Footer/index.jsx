import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

	// state = {
	// 	sum: 0,
	// 	checked: false
	// }

	// componentDidMount() {
	// 	const { data } = this.props;
	// 	let sum = 0;
	// 	const checked = data.every(i => {
	// 		i.done && sum++;
	// 		return i.done;
	// 	})
	// 	this.setState({
	// 		sum,
	// 		checked
	// 	})
	// }

	render() {
		const { data, update } = this.props;
		// const { sum, checked } = this.state;
		let sum = 0;
		const checked = data.every(i => {
			i.done && sum++;
			return i.done;
		})
		return (
			<footer>
				<label>
					<input
						type="checkbox"
						checked={checked && sum !== 0}
						onChange={e => {
							update('update', 'all', e.target.checked);
						}}
					/>
					<span>已完成{sum}/全部{data.length}</span>
				</label>
				<button
					onClick={() => {
						update('delete', 'ok');
					}}
				>清理所有已完成的任务</button>
			</footer>
		)
	}

	// handleChange = (e) => {
	// 	const flag = e.target.checked;
	// 	const { update } = this.props;
	// 	update('update', 'all', flag);
	// }
	// handleDelete = () => {
	// 	const { update } = this.props;
	// 	update('delete');
	// }
}

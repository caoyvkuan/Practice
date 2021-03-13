import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired
    }

    render() {
        const { data } = this.props;
        return (
            <ul className="list">
                {data.map(i => {
                    return <Item key={i.id} {...i} update={this.props.update} />
                })}
            </ul>
        )
    }
}

import React from 'react';
import './CSS/hdr.css';
import Logo from './logo';
import Toolbar from './toolbar'

export default class Hdr extends React.Component{


  render() {
    
    return (
      <header>
        <Logo />
        <Toolbar through={this.props.through}/>
      </header>
    );
  }
}
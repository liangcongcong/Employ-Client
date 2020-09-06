import React, { Component } from 'react'
import logo from './logo.jpg'
import './logo.less'
/**
 *显示logo组件
 */
export default class Logo extends Component{
    render()
    {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo-img"/>
            </div>
        )
    }
}
import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from './components/Home'
export default class MainRouter extends Component{
    render(){
        return(
            <Switch>
                <Route exct path='/' component={Home} />
            </Switch>
        )
    }
}
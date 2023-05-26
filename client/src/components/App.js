import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
    // 所以，connect(null, actions)(App)将返回一个新的组件，这个组件会自动处理Redux的state和actions，并将它们作为props传递给App组件。

    // 当你在App组件中调用一个action（比如this.props.fetchUser()）时，这个action会被dispatch到Redux store，
    // 并触发一个state的更新。这个更新的state会自动传递给所有连接到Redux store的组件，触发它们的重新渲染。
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)

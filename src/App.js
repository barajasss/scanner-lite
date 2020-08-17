import React, { Component } from 'react'
import './App.css'
import Header from './components/header/header.component'
import HomePage from './pages/home/home.component'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Header />
				<HomePage />
			</div>
		)
	}
}

export default App

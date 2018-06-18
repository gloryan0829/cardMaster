import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [
                {id: 1000, text: 'react로 투두앱 만들기'},
                {id: 1001, text: 'react는 라이브러리이다.'},
                {id: 1002, text: '라이브러리 치곤 러닝커브가 높은편이다.'}
            ],
            editing: null
        }
    }
    render(){
        return (
            <div>
                <Header/>
                <TodoList/>
                <Footer/>
            </div>
        )
    }
}

export default App;
import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'


import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';

import './App.css';
import axios from 'axios';



class App extends Component {
  state = {
    todos: [
    ]
  }
  markComplete = (id) => {
    this.setState({todos : this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
         .then( res =>this.setState( { todos: [...this.state.todos.filter(todo => todo.id!== id)]}));
  
  }

  addTodo = (title) => {
    // const newTodo = {
    //   id: this.state.todos.length + 1,
    //   title,
    //   completed:false
    // }
    axios.post('http://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }). then ( response => this.setState({todos: [...this.state.todos, response.data] }));
    // this.setState({todos: [...this.state.todos, newTodo]});
  }

  componentDidMount () {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
         .then(response => this.setState({todos:response.data}));
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container"> 
            <Header/>
            <Route exact path="/" render={props => (  
              <React.Fragment>
                  <AddTodo AddTodo={this.addTodo}/>
                  <Todos todos={this.state.todos}
                        markComplete = {this.markComplete}  
                        delTodo= {this.delTodo}  
                  />
              </React.Fragment> 
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

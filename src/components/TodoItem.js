import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  getStyle = () =>{
    if(this.props.todo.completed) {
      return {
        textDecoration : 'line-through'
      }
    } else {
      return {
        textDecoration : 'none'
      }
    }
  }

  render() {
    const { id,title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p> 
          <input type="checkbox" onChange={this.props.markComplete.bind(this,id)}/>
          {title}
          <button style ={btnStyle} onClick={this.props.delTodo.bind(this,id)}> x </button>
        </p>
      </div>
    )
  }
}

TodoItem.protoTypes = {
  todo: PropTypes.object.isRequired
}

const btnStyle = {
  background : 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor : 'pointer',
}

TodoItem.propTypes = {
  markComplete: PropTypes.func.isRequired,
  delTodo : PropTypes.func.isRequired,
}
export default TodoItem;

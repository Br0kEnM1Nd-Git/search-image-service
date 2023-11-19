import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos) {
      this.setState({ todos: localTodos });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  handleSubmit = value => {
    console.log(value);
    const newTodo = { text: value, id: nanoid() };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };
  render() {
    const { todos } = this.state;
    console.log(this.state.todos);
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo onDelete={this.deleteTodo} todo={todo} index={index + 1} />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}

import React, { Component } from 'react';
import './App.css';
import PostList from './PostList';
import Serach from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PostList />
          <Serach />
        </header>
      </div>
    );
  }
}

export default App;

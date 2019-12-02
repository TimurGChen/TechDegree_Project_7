import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import SearchForm from './SearchForm';
import PhotoContainer from './PhotoContainer';

class App extends Component {

  render() {
    return (
      <div className="container">
        <SearchForm />
        <Nav />
        <PhotoContainer />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import apiKey from './config.js';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

// Import components
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';



class App extends Component {

  state={
    cats: [],
    dogs: [],
    parrots: [],
    searchResult: [],
  }

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => { this.setState( {cats: response.data.photos.photo} ); })
      .catch(err => { console.log(`Error fetching and parsing data: ${ err }`); });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(response => { this.setState( {dogs: response.data.photos.photo} ); })
      .catch(err => { console.log(`Error fetching and parsing data: ${ err }`); });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=parrots&per_page=24&format=json&nojsoncallback=1`)
      .then(response => { this.setState( {parrots: response.data.photos.photo} ); })
      .catch(err => { console.log(`Error fetching and parsing data: ${ err }`); });
  }

  performSearch = query => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchResult: response.data.photos.photo
        });
      })
      .catch(err => {
        console.log(`Error fetching and loading data: ${ err }`);
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" render={ () => <SearchForm onSearch={ this.performSearch } /> } />
          <Nav />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/cats" /> } />
            <Route path="/cats" render={ () => <PhotoContainer data={ this.state.cats } /> } />
            <Route path="/dogs" render={ () => <PhotoContainer data={ this.state.dogs } /> } />
            <Route path="/parrots" render={ () => <PhotoContainer data={ this.state.parrots } /> } />
            <Route path="/search/:query" render={ () => <PhotoContainer data={ this.state.searchResult } />} />
            <Route path="/" render={ () => <PhotoContainer />} />
          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;

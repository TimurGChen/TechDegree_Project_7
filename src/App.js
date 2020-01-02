import React, { Component } from 'react';
import './images_and_styling/App.css';
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
import Error from './components/Error';



class App extends Component {

  state={
    cats: [],
    dogs: [],
    parrots: [],
    searchResult: [],
    query: "",
    isLoading: true
  }

  componentDidMount() {
    // request images data for cats, dogs, and parrots and store in state,
    // so that no request is needed during reloads
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

  // requests images data from flickr.com and update the state of App.js
  performSearch = query => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchResult: response.data.photos.photo,
          query: query,
          isLoading: false
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
          <SearchForm onSearch={ this.performSearch } />
          <Nav />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/cats" /> } />
            <Route exact path="/cats" render={ () => <PhotoContainer data={ this.state.cats } query="cats" isLoading={this.state.isLoading} /> } />
            <Route exact path="/dogs" render={ () => <PhotoContainer data={ this.state.dogs }  query="dogs" isLoading={this.state.isLoading} /> } />
            <Route exact path="/parrots" render={ () => <PhotoContainer data={ this.state.parrots } query="parrots" isLoading={this.state.isLoading} /> } />
            <Route path="/search" render={ () => <PhotoContainer data={ this.state.searchResult } query={ this.state.query } isLoading={this.state.isLoading} />} />
            <Route path="/" render={ () => <Error />} />
          </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import apiKey from './config';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';

class App extends React.Component {

  state = {
    searchResults: [], //Holds the search results to be shown
    searchResultsLoading: false, //holds the state of loading the images
    cats: [], //The next three hold the results for the default searches. This is to cache them.
    dogs: [],
    computers: []
  };



  componentDidMount() {
    //The following 3 calls pre-fetch the data for the linked searches and store them in state. Any errors are logged to the console.
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then((data) => {this.setState({
      cats: data.data.photos.photo,
    })})
    .catch(err => {console.error(`An error occured while retrieving cats data. Error Message: ${err.message}`)});

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then((data) => {this.setState({
      dogs: data.data.photos.photo,
    })})
    .catch(err => {console.error(`An error occured while retrieving dogs data. Error Message: ${err.message}`)});

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
    .then((data) => {this.setState({
      computers: data.data.photos.photo,
    })})
    .catch(err => {console.error(`An error occured while retrieving computers data. Error Message: ${err.message}`)});
  }

  //This function runs a search and stores the results in state. These are passed to the PhotoContainer component for displaying
  performSearch = query => {
    
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then((data) => {this.setState({
      searchResults: data.data.photos.photo,
      searchResultsLoading: false //We set loading to false since it's finished loading so we can hide the message.
    })})
    .catch(err => {console.error(`An error occured while retrieving search data. Error Message: ${err.message}`)});

  }

  //This is passed to the SearchForm Component so it can be set when a search is initiated
  setSearchLoading = (value) => {
    this.setState({
      searchResultsLoading: value
    })
  }

  render() {

    return(
      <div className="container">
          <BrowserRouter>
          <SearchForm handleSearch={this.performSearch} history={this.props.history} setsearchloading={this.setSearchLoading}/>
          <Nav />
            <Switch>
              <Redirect exact path="/" to="/cats" /> {/*Redirect home route to cats so results get shown*/}
              <Route path="/cats" render={() => <PhotoContainer photodata={this.state.cats} /> } /> {/* Show pre-fetched cat data*/}
              <Route path="/dogs" render={() => <PhotoContainer photodata={this.state.dogs} /> } /> 
              <Route path="/computers" render={() => <PhotoContainer photodata={this.state.computers} /> } />
              <Route path="/search/:query" render={() => <PhotoContainer photodata={this.state.searchResults} loading={this.state.searchResultsLoading}/> } /> {/* Show search Results. We also pass the loading state to show / hide the loading label*/}
              <Route component={PageNotFound} /> {/* Show 404 page since route doesn't exist */}
            </Switch>
          </BrowserRouter>      
      </div>
    )
  };
}

export default App;

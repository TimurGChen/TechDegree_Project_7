import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {

    state={
        images: [
          { 
            src: "https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg",
            desc: ""
          },
          {
            src: "https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg",
            desc: ""
          }, 
          {
            src: "https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg",
            desc:""
          },
          {
            src: "https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg",
            desc: ""
          }
        ]
      }

    render() {
        return (
            <div className="photo-container">
            <h2>Results</h2>
            <ul>
              { this.state.images.map( image => 
                <Photo src={ image.src } desc={ image.desc } />) }
              <NotFound />
            </ul>
            </div>
        );
    }
};

export default PhotoContainer;
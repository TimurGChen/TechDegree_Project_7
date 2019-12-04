import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = props => {
    
    const photoData = props.data;
    let photos;
    // when there is no matching photo, displays a not found message
    if (photoData.length > 0) {
      photos = photoData.map( image => 
        <Photo 
          src={ `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_n.jpg` } 
          desc={ image.title } 
          key={ image.id } 
        />);
    } else if (props.isLoading) {
      // Before the first search is completed, a content loading will display
      // rather than a not found page
      photos = <h3>Content Loading</h3>
    } else {
      photos = <NotFound />;
    }

    return (
        <div className="photo-container">
        <h2>Results of {props.query}</h2>
        <ul>
          {photos} 
        </ul>
        </div>
    );
};

export default PhotoContainer;
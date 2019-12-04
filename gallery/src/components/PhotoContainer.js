import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = props => {
    
    const photoData = props.data;
    let photos;
    if (photoData.length > 0) {
      photos = photoData.map( image => 
        <Photo 
          src={ `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg` } 
          desc={ image.title } 
          key={ image.id } 
        />);
    } else {
      photos = <NotFound />;
    }

    return (
        <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {photos} 
        </ul>
        </div>
    );
};

export default PhotoContainer;
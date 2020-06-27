import React from 'react';

const Photo = props => {

    const photo = props.PhotoObject;
    
    return (
        <li>
            <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
        </li>
    )
}


export default Photo;
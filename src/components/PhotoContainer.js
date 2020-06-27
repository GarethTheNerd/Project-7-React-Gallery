import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import Loading from './Loading';

class PhotoContainer extends React.Component {

    render() {
        return(
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    {
                        this.props.loading ? <Loading /> : null //Check if loading is true. if so, showing the loading indicator
                    }

                    {
                        this.props.photodata.length > 0 ? 
                            this.props.photodata.map(photo =>
                                <Photo key={photo.id} PhotoObject={photo}/> //Map over the search results and show photo components for each of them
                            )
                        : 
                        <NotFound /> //Otherwise show the not found label
                        
                    }
                </ul>
            </div>
        )
}
}

export default PhotoContainer;
import { assertLiteral } from '@babel/types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ACCESS_TOKEN, getArtists } from './spotify_data.js';

console.log(ACCESS_TOKEN);

function Artist(name, img_url, link) {
    return (
        <div className='artist'>
            <img className='artist-image' src={img_url} />
            <p className='artist Name'>{name}</p>
        </div>
    );
}

class Stage extends React.Component {
    renderArtist(name, img_url, link) {
        return <Artist />;
    }

    render() {
        const artists = getArtists();
        var artist_list = [];
        console.log(artists.length);
        for (var i = 0; i < artists.length; i++) {
            console.log(artists[i].name);
            artist_list.push(this.renderArtist(artists[i].name, artists[i].images[0].url));
        }
        return artist_list[0];
    }
}

const root = 
ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<Stage/>);
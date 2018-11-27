import React, {Component} from 'react';


const PATH_BASE = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&'
const PLAYLIST = 'playlistId=PLfoNZDHitwjXFH-NLpwL8eXzmxzJTUV2A&'
const KEY = `key=${process.env.REACT_APP_YOUTUBE_KEY}`

class Theatre extends Component {
 constructor(props){
     super(props);

     this.state={
         playlists:[]
    }

    this.fetchPlaylists = this.fetchPlaylists.bind(this);

   
 }
 fetchPlaylists(playlists){
    fetch(`${PATH_BASE}${PLAYLIST}${KEY}`)
    .then(response => response.json())
    //.then(result => this.setState(playlists))
    .then(result => console.log(result))
    .catch(error => error)

}


componentDidMount(){

   this.fetchPlaylists()
}

    render(){

        const {playlists} = this.state;
        return (
            <div>
                <h1>Theatre</h1>
            <ul>
                {
                    playlists.map(items =>
                    <li key={items.id}>
                    <p>{items.contentDetails.videoId}</p>
                    </li>
                    )
                }
            </ul>
            </div>
        )
    }
}

export default Theatre;
import React, {Component} from 'react';
import Iframe from '../components/Iframe';
import Slider from 'react-slick';
import '../styles/Theatre.css';

const PATH_BASE = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&';
const PLAYLIST = 'playlistId=PLfoNZDHitwjXFH-NLpwL8eXzmxzJTUV2A&';
const HIGHLIGHTS = 'playlistId=PLfoNZDHitwjUUrM4dYe542iCcRpEzS_RX';
const GUIDES = 'playlistId=PL2vgf11SN4RhB3Lz-eaREjLNERKAqVtoZ'
const KEY = `key=${process.env.REACT_APP_YOUTUBE_KEY}`
const KEY_II = `key=${process.env.REACT_APP_YOUTUBE_KEY_II}`

class Theatre extends Component {
 constructor(props){
     super(props);

     this.state={
         playlists:[],
         highlights:[],
         guides:[]
    }

    this.fetchPlaylists = this.fetchPlaylists.bind(this);
    this.fetchHighlights = this.fetchHighlights.bind(this);
    this.fetchGuides = this.fetchGuides.bind(this);
   
 }

 fetchPlaylists(playlists){
    fetch(`${PATH_BASE}${PLAYLIST}${KEY}`)
    .then(response => response.json())
    .then(result => this.setState({playlists: result.items}))
    //.then(result => console.log(result))
    .catch(error => error)

}

fetchGuides(guides){
    fetch(`${PATH_BASE}${GUIDES}${KEY_II}`)
    .then(response => response.json())
    //.then(result => this.setState({guides: result.items}))
    .then(data => console.log(data))
    .catch(error => error)

}

fetchHighlights(highlights){
    fetch(`${PATH_BASE}${HIGHLIGHTS}${KEY}`)
    .then(response => response.json())
    //.then(result => this.setState({highlights: result.items}))
    .then(result => console.log(result))
    .catch(error => error)

}

componentDidMount(){

   this.fetchPlaylists();
   this.fetchGuides();
  // this.fetchHighlights();
}

    render(){

        const {playlists} = this.state;
        console.log(playlists)
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            className: 'theatre__slider'
            
        };
        return (
            <div>
                <h1>Theatre</h1>


                <div className="theatre__paddock-pass">
                <h2 className="theatre__title">Paddock Pass</h2>
                <Slider {...settings}>
                {
                playlists.map(items =>
                    <div className="theatre__video" key={items.id}>
                    
                    <p className="theatre__video-title"><strong>{items.snippet.title}</strong></p>
                   
                    <Iframe
                    title='Test'
                    src={items.contentDetails.videoId}
                    allowFullScreen
                    className="theatre__video-iFrame"
                     />
                    
                   </div>
    
    
               )
                     }
               </Slider>
                </div>
                <div className="theatre__race-highlights">
                <h2 className="theatre__title">2018 Race Highlights</h2>
                
                </div>
                <div className="theatre__circuit-guide">
                <h2 className="theatre__title">Circuit Guides</h2>
                </div>
            
            </div>
        )
    }
}

export default Theatre;
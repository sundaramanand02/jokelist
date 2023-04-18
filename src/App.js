import React from 'react'
import { useState } from 'react'; 
import axios from 'axios';

const App = () => {

    const [value, setvalue] = useState('');

    const [AlbumData, setAlbumData] = useState([]);
    
    const [TrackData, setTrackData] = useState([]);
    const search=()=>{  
    console.log('The Searched Term is ');
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: value,
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': '31d6e89169mshccd30944b61d113p14cc72jsndc5d9f0ed1b2',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    axios.request(options).then(function (response) {
        // console.log(response.data); 
        setAlbumData(response.data.albums.items); 
        setTrackData(response.data.tracks.items);
        // console.log(response.data.albums.items);
        console.log(AlbumData); 
        console.log(TrackData);
        console.log(response.data);

      }).catch(function (error) {
          console.error(error);
      });

    }

    const imgUrl='https://media.istockphoto.com/id/1076840920/vector/music-background.jpg?s=612x612&w=is&k=20&c=iD9mwBHN0tqWFcM7fHcKU1UmSN_28br7h-1_X_C2Vu4=';
  return (
    <div style={{backgroundColor:'#c2dfba',padding:'10px' }}> 
        <h1 style={{textAlign:'center'}}>Music Search App</h1>
        <div style={{textAlign:'center'}}>powered by Spotify</div> 
        
        <div style={{textAlign:'center', margin:'10px'}}>
        <label htmlFor="value"> <h3>Enter the name of the form </h3></label>
        <input type="text" style={{height:'30px' ,width:'300px', borderRadius:'2.5px'}} value={value} onChange={(e) => setvalue(e.target.value)} />
        <button style={{marginLeft:'6px'}}onClick={search}>Submit</button>
        </div>
        <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'space-around'}}>
        {
            AlbumData && 
            // AlbumData && <Album items={AlbumData}/>
            AlbumData.map((album)=>{
                const url1=`https://open.spotify.com/album/${album.data.uri.slice(14, album.data.uri.length)}`;
            return (<div style={{textAlign:'center'}}>
                <h3 >Name : {album.data.name}</h3> 
                <div><strong><a href={url1} target='_blank'> Song's Spotify</a></strong></div>
                <div>Year : {album.data.date.year}</div>
                {/* {
                    album.data.coverArt.sources.map((item)=><img src={item.url} alt="" srcset="" />)
                } */}
                {/* <div>{album.data.coverArt.sources[0].url}</div> */}
                <div><a href={url1} target='_blank'>  <img src={album.data.coverArt.sources[0].url} alt="" srcset="" style={{marginLeft:'auto',marginRight:'auto'}}/></a></div>
            </div>)})
        }
        </div>
        {
            (TrackData.length>0)? <h1>Best Tracks</h1>: <div></div>
        }
        <div style={{display:'flex' ,flexWrap: 'wrap', justifyContent:'space-around'}}>
        {
            TrackData &&  
            TrackData.map((track)=>{
                const url2=track.data.albumOfTrack.sharingInfo.shareUrl;
            return (<div style={{textAlign:'center'}}>
                <div>Name : {track.data.name}</div>
                <div>By</div>
                {
                    
                    track.data.artists.items.map((item)=>{
                        const url1=`https://open.spotify.com/artist/${item.uri.slice(15, item.uri.length)}`;
                        return (
                            <div style={{margin:'15px',display:'flex' ,flexWrap: 'wrap', justifyContent:'space-between'}}>
                            <h3>{item.profile.name}</h3> 
                            <h3><a href={url1} target='_blank'>Artist's Spotify</a></h3> 
                            {/* <div>Artist's Spotify :   https://open.spotify.com/artist/{item.uri.slice(15, item.uri.length)}</div>  */}
                            </div>
                        )
                    }
                       
                    )
                }
                <div><a href={url2} target='_blank'><strong>Song Spotify</strong></a></div> 
                <div>Name : {track.data.name}</div>
                <div>Duration :{track.data.duration.totalMilliseconds} milliseconds</div>
                <div><img src={track.data.albumOfTrack.coverArt.sources[0].url} alt="" srcset="" style={{marginLeft:'auto',marginRight:'auto'}}/></div>
            </div>)})
        }
        </div>
    </div>
  )
}

export default App
import React, { useState } from "react";
import "./Playlist.css";
import axios from "axios";
import NavBar from "../../components/NavBar/Navbar";




function Playlists() {
    const [values, setValues] = useState({
  
        name: '',
        artist: '',
        song: '',
        image: ''
      });
      const [submitted, setSubmitted] = useState(true);
      const [valid, setValid] = useState(false);   
  
  
    const handleNameInputChange =(event) => {
      setValues({...values, name: event.target.value})
    }
        
    const handleArtistInputChange =(event) => {
      setValues({...values, artist: event.target.value})    
    }
  
    const handleSongInputChange =(event) => {
      setValues({...values, song: event.target.value})
    }
  
    const handleImageInputChange =(event) => {
      setValues({...values, image: event.target.value})
    }
   
  
    
    const handleSubmit = (event) => { 
      event.preventDefault() 
      if(values.name && values.artist && values.song && values.image) {
        setValid(true);
        axios.post ('http://localhost:3001/api/playlist/add', {body:equals}).then(()=> 
        console.log('uploaded'))
  
      }
      setSubmitted(true);
      
    }
    return (
      <div className="form-container">
        <form className='New Playlist' onSubmit={handleSubmit}>
        <h1> New Playlist</h1>
  
        {submitted && valid ? <div className='Your New Playlist Has Been Created !'></div> :null }
  
          <input
          onChange={handleNameInputChange}
          value={equals.name}
          className= 'form-field'
          placeholder='Name'
          name='name' />
         
  
          <input
          onChange={handleArtistInputChange}
          value={equals.artist}
          className= 'form-field'
          placeholder='Artist'
          name='Artist' />
          {/* {submitted && !equals.artist ? <span>Enter Artist</span> :null} */}
  
          <input
          onChange={handleSongInputChange}
          value={equals.song}
          className= 'form-field'
          placeholder='Song'
          name='Song' />
  
          <input
          onChange={handleImageInputChange}
          value={equals.image}
          className= 'form-field'
          placeholder='Image'
          name='Image' />
  
          
             {/* {submitted && !equals.email ?<span>Enter Email Name</span> :null} */}
           <button
           className='form-field'
           type='submit'>Add Your Playlist</button>
           </form>
    </div>
    )};
  
  
  export default Playlist;
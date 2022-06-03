import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/authServices";
import * as AiIcons from "react-icons/ai";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [liked, setLiked] = useState();
  const currentUser = AuthService.getCurrentUser();

  const URL = "http://localhost:3001/songs/"; // HEROKU LINK

  useEffect(() => {
    fetchSongData();
  }, []);
  const fetchSongData = () => {
    // fetching all songs from our heroku URL
    axios.get(URL).then((response) => {
      console.log(response.data.data);
      setSongs(response.data.data);
    });
  };

  if (!songs.length) {
    return <h1>loading....</h1>;
  }

  const likedSong = (id) => {
    console.log("liked hit");
    axios.put(URL + `likedsong/${id}`, null, {
      headers: { authorization: currentUser.token },
    });
  };

  const deleteSong = (id) => {
    console.log("deleted");
    axios
      .delete(URL + `${id}`, null, {
        // headers: { authorization: currentUser.token },
      })
      .then(window.location.reload());
  };

  console.log(songs);
  return (
    <section className="row">
      {songs.map((song) => (
        <div key={song._id} className="card col-md-4">
          <Link to={`/${song._id}`}>
            <h1>{song.name}</h1>
            <img src={song.image} alt={song.name} />
            <h3>{song.artist}</h3>
          </Link>
          <button className="btn">
            <Link to={`/${song._id}`}>Delete This</Link>
          </button>

          <button
            onClick={() => {
              likedSong(song._id);
            }}
          >
            <AiIcons.AiFillHeart />
          </button>
          <button
            onClick={() => {
              deleteSong(song._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

export default Songs;

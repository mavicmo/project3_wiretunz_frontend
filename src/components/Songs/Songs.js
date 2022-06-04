import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/authServices";
import * as AiIcons from "react-icons/ai";
// import UpdateSong from "./components/UpdateSong/UpdateSong";
import {
  DropdownButton,
  ButtonGroup,
  Dropdown,
  SplitButton,
  Card,
  Button,
} from "react-bootstrap";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [liked, setLiked] = useState();
  const [playlists, setPlaylists] = useState();
  const currentUser = AuthService.getCurrentUser();
  // const playlist = FetchPlaylist.fetchPlaylistData();

  const URL = "http://localhost:3001/songs/"; // HEROKU LINK

  useEffect(() => {
    fetchSongData();
  }, []);

  // fetch playlist information
  const fetchPlaylistData = () => {
    // fetching all playlist from our heroku URL
    axios.get("http://localhost:3001/playlist/").then((response) => {
      console.log(response.data.data);
      setPlaylists(response.data.data);
    });
  };

  useEffect(() => {
    fetchPlaylistData();
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
      .delete(URL + `${id}`, {
        headers: { authorization: currentUser.token },
      })
      .then(window.location.reload());
  };

  const addToPlaylist = (songID, playlistID) => {
    console.log(songID, playlistID);
    const data = {
      songID,
      playlistID,
    };
    axios
      .put("http://localhost:3001/playlist/addsong/", data, {
        headers: { authorization: currentUser.token },
      })
      .then(() => console.log("song added"));
  };

  return (
    <section className="row">
      {songs.map((song) => (
        <Card
          key={song._id}
          style={{ width: "25rem" }}
          className="col-md-4 border"
        >
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{song.name}</Card.Title>
            <Card.Text>{song.artist}</Card.Text>

            <button
              onClick={() => {
                likedSong(song._id);
              }}
            >
              <AiIcons.AiFillHeart />
            </button>
            <Link to={`/${song._id}`}>Delete This</Link>
            <Link to={`/updatesong/${song._id}`}>
              <button className="btn btn-secondary">Update</button>
            </Link>

            <button
              onClick={() => {
                deleteSong(song._id);
              }}
            >
              Delete
            </button>
            <DropdownButton
              as={ButtonGroup}
              key={"Warning"}
              id={`dropdown-"Warning"s-${"Warning"}`}
              variant={"Warning".toLowerCase()}
              title={"Playlist"}
            >
              {/* {playlists.map((playlist) => (
                <Dropdown.Item
                  eventKey={playlist._id}
                  onClick={() => {
                    addToPlaylist(song._id, playlist._id);
                  }}
                >
                  {playlist.name}
                </Dropdown.Item>
              ))} */}
            </DropdownButton>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}

export default Songs;

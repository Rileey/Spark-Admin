import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createContent } from "../../context/contentContext/apiCalls";
import { ContentContext } from "../../context/contentContext/contentContext";
import axios from "axios"
// import { createMovies } from "../../context/movieContext/apiCalls";
// import { MovieContext } from "../../context/movieContext/movieContext";
import "./newContent.css";

export default function NewContent() {

  const [movie, setMovie] = useState({})
  const [videoHD, setVideoHD] = useState(null)
  const [videoFHD, setVideoFHD] = useState(null)
  const [video2k, setVideo2k] = useState(null)
  const [video4k, setVideo4k] = useState(null)
  // const [uploaded, setUploaded] = useState(0)
  const history = useHistory();

  // const { dispatch } = useContext(ContentContext)

  // useEffect(() => {
  //   createContent(dispatch)
  // }, [dispatch])



  const handleChange = (e) => {
    const value = e.target.value
    setMovie({...movie, [e.target.name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    let formdata = new FormData()
    formdata.append('title', movie.title)
    if(!videoHD){
      formdata.append('videoHD', videoHD)
    }else {
    for (let i = 0; i < videoHD.length; i++) {
      formdata.append('videoHD', videoHD[i], videoHD[i].name)
    }
  }
  if(!videoFHD){
    formdata.append('videoFHD', videoFHD)
  }else {
    for (let i = 0; i < videoFHD.length; i++) {
      formdata.append('videoFHD', videoFHD[i], videoFHD[i].name)
    }
  }
  if(!video2k){
    formdata.append('video2k', video2k)
  }else {
    for (let i = 0; i < video2k.length; i++) {
      formdata.append('video2k', video2k[i], video2k[i].name)
    }
  }
  if(!video4k){
    formdata.append('video4k', video4k)
  }else {
    for (let i = 0; i < video4k.length; i++) {
      formdata.append('video4k', video4k[i], video4k[i].name)
    }
  }
    formdata.append('description', movie.description)
    formdata.append('director', movie.director)
    formdata.append('year', movie.year)
    formdata.append('ageLimit', movie.ageLimit)
    formdata.append('genre', movie.genre)
    formdata.append('duration', movie.duration)
    // formdata.append('isSeries', movie.isSeries)

    await axios.post('/content', formdata, {
      headers: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4',
        'Content-Type': 'multipart/form-data'
      }, 
    })


    history.push('/content')
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Content</h1>
      <form className="addProductForm">
      <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="The Crackdown" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Movie/Series Episode in HD</label>
          <input type="file" id="video" name="videoHD" 
          onChange={e => setVideoHD(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Movie/Series Episode in Full HD</label>
          <input type="file" id="video" name="videoFHD" 
          onChange={e => setVideoFHD(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Movie/Series Episode in 2k</label>
          <input type="file" id="video" name="video2k" 
          onChange={e => setVideo2k(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Movie/Series Episode in 4k</label>
          <input type="file" id="video" name="video4k" 
          onChange={e => setVideo4k(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Decription" name="description" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Director</label>
          <input type="text" placeholder="..." name="director" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="199-" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>AgeLimit</label>
          <input type="text" placeholder="17" name="ageLimit" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Drama" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="duration" onChange={handleChange}/>
        </div>

        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

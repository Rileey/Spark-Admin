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
  const [video, setVideo] = useState(null)
  // const [uploaded, setUploaded] = useState(0)
  const history = useHistory();

  const { dispatch } = useContext(ContentContext)

  useEffect(() => {
    createContent(dispatch)
  }, [dispatch])



  const handleChange = (e) => {
    const value = e.target.value
    setMovie({...movie, [e.target.name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    let formdata = new FormData()
    formdata.append('title', movie.title)
    for (let i = 0; i < video.length; i++) {
      formdata.append('image', video[i], video[i].name)
    }
    formdata.append('description', movie.description)
    formdata.append('director', movie.director)
    formdata.append('year', movie.year)
    formdata.append('ageLimit', movie.ageLimit)
    formdata.append('genre', movie.genre)
    formdata.append('duration', movie.duration)
    formdata.append('isSeries', movie.isSeries)

    const response =  await axios.post('/content', formdata, {
      headers: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4' 
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
          <label>Movie/Series Episode</label>
          <input type="file" id="video" name="video" 
          onChange={e => setVideo(e.target.files)}
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
        {/* <div className="addProductItem">
          <label>isSeries?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div> */}

        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

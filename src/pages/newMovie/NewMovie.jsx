import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getContent } from "../../context/contentContext/apiCalls";
import { ContentContext } from "../../context/contentContext/contentContext";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./newMovie.css";
import axios from 'axios'

export default function NewProduct() {

  const [movie, setMovie] = useState({})
  const [state, setState] = useState([])
  // const [image, setImage] = useState([])
  const history = useHistory();


  const { dispatch } = useContext(MovieContext)
  const { content, dispatch: dispatchContent } = useContext(ContentContext)

  // useEffect(() => {
  //   createMovies(dispatch)
  // }, [dispatch])

  useEffect(() => {
    getContent(dispatchContent)
  }, [dispatchContent])

  const handleChange = (e) => {
    const value = e.target.value
    setMovie({...movie, ...state, [e.target.name]: value})
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setMovie({...movie, ...state, [e.target.name]: value})
  }

  

  

  const handleFileChange = (e) => {
    //  setState({
    //   selectedFile: e.target.files
    // })
    let value = 
    Array.from
    (
      e.target?.files
      , (files)=> files.name
      )
    console.log(e.target.files, "---------", value)
    setState({...movie, ...state, [e.target.name]: value})

  //   if (e.target.files){
  //     const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
  //     console.log(fileArray) 
    
  //   setState((prevImages)=> prevImages.concat(fileArray))
  //   Array.from(e.target.files).map(
  //     (file)=>URL.revokeObjectURL(file)
  //   )
  //   // setImage(e.target.files)
  //   // console.log(e.target.files)
  // }
}


console.log(state)
console.log(state.image)
// console.log(state.image[0])

  const uploadFile = async () => {
  const fd = new FormData();
  for(var x = 0; x < state.image.length; x++) { 
    fd.append('image[]', state.image[x]) 
  }
  for(var y = 0; y < movie.content.length; y++) { 
    fd.append('content[]', movie.content[x]) 
  }
  fd.append('title', movie.title);
  fd.append('description', movie.description);
  fd.append('duration', movie.duration);
  fd.append('director', movie.director);
  fd.append('genre', movie.genre);
  fd.append('isSeries', movie.isSeries);
  fd.append('year', movie.year);
  fd.append('ageLimit', movie.ageLimit);


    
    await axios.post('/movies', fd, {
      headers: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4' 
      }, 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    createMovie(movie, dispatch)

    let res = await uploadFile()
    
    handleFileChange()

    console.log(state)

  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Movie</h1>
      <form encType="multipart/form-data" className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="image" name="image" accept="image/jpeg" onChange={handleFileChange} multiple/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="The Crackdown" name="title" onChange={handleChange}/>
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
        <div className="addProductItem">
          <label>isSeries?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option>Series?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name='content' onChange={handleSelect} style={{height: '280px'}}>
            {content.map((content)=> (
              <option key={content._id} value={content._id}>{content.title}</option>
            ))}
          </select>
        </div>
        <button className="addProductButton" >Create</button>
      </form>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getContent } from "../../context/contentContext/apiCalls";
import { ContentContext } from "../../context/contentContext/contentContext";
import { createMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./newMovie.css";

export default function NewProduct() {

  const [movie, setMovie] = useState({})
  const [image, setImage] = useState(null)
  const [trailer, setTrailer] = useState(null)
  // const [uploaded, setUploaded] = useState(0)
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
    setMovie({...movie,...image, ...trailer, [e.target.name]: value})
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setMovie({...movie,...image, ...trailer, [e.target.name]: value})
  }

  console.log(movie)
  console.log(image)

  const upload = (items) => {
    items.forEach(item=>{

    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    upload([
      {file: image, label: image},
      {file: trailer, label: trailer},
    ])
    createMovies( movie, image, trailer, dispatch)
    history.push('/movies')
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="image" name="image" onChange={e => setImage(e.target.files[0])}/>
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
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={e => setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name='content' onChange={handleSelect} style={{height: '280px'}}>
            {content.map((content)=> (
              <option key={content._id} value={content._id}>{content.title}</option>
            ))}
          </select>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createContent } from "../../context/contentContext/apiCalls";
import { ContentContext } from "../../context/contentContext/contentContext";
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
    setMovie({...movie,...video, [e.target.name]: value})
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setMovie({...movie,...video, [e.target.name]: value})
  }


  const upload = (items) => {
    items.forEach(item=>{

    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // upload([
    //   {file: image, label: image},
    //   {file: trailer, label: trailer},
    // ])
    // createMovies( movie, image, trailer, dispatch)
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
          <label>Video Files</label>
          <input type="file" id="image" name="image" 
          // onChange={e => setImage(e.target.files)}
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
        {/* <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Drama" name="genre" onChange={handleChange}/>
        </div> */}
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

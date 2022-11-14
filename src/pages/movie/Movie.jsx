import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useHistory } from "react-router";
import { useContext } from "react";
import { ContentContext } from "../../context/contentContext/contentContext";
import { useEffect, useState } from "react";
import { getContent } from "../../context/contentContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import axios from 'axios'

export default function Movie() {
    const location = useLocation();
    const movie = location.movie
    const history = useHistory();


    const [mov, setMov] = useState({})
    const [file, setFile] = useState({})
    const [thumbnail, setThumbnail] = useState({})
    const [trailer, setTrailer] = useState({})
    const [selectedContent, setSelectedContent] = useState([])

    const { content, dispatch: dispatchContent } = useContext(ContentContext)
    const { dispatch } = useContext(MovieContext)
  
    useEffect(() => {
      getContent(dispatchContent)
    }, [dispatchContent])

    const handleChange = (e) => {
        const value = e.target.value
        setMov({...mov, [e.target.name]: value, content: selectedContent})
        console.log(movie, selectedContent)
        // console.log(movie.content, '$$$$$$$$')
      }



    const handleSubmit = async(e) => {
        e.preventDefault()

    let formdata = new FormData()
    if(!mov.title){
        formdata.append('title', movie.title)
    }else {
        formdata.append('title', mov.title)
    }
    for (let i = 0; i < file.length; i++) {
      formdata.append('image', file[i], file[i].name)
    }
    for (let i = 0; i < thumbnail.length; i++) {
    formdata.append('thumbnail', thumbnail[i])
    }
    for (let i = 0; i < trailer.length; i++) {
      formdata.append('trailer', trailer[i])
      }
      if(!mov.description){
        formdata.append('description', movie.description)
    }else {  
    formdata.append('description', mov.description)
    }
    if(!mov.director){
        formdata.append('director', movie.director)
    }else {
    formdata.append('director', mov.director)
    }
    if(!mov.year){
        formdata.append('year', movie.year)
    }else {
    formdata.append('year', mov.year)
    }
    if(!mov.ageLimit){
        formdata.append('ageLimit', movie.ageLimit)
    }else {
    formdata.append('ageLimit', mov.ageLimit)
    }
    if(!mov.genre){
        formdata.append('genre', movie.genre)
    }else {
    formdata.append('genre', mov.genre)
    }
    if(!mov.duration){
        formdata.append('duration', movie.duration)
    }else {
    formdata.append('duration', mov.duration)
    }
    if(!mov.isSeries){
        formdata.append('isSeries', movie.isSeries)
    }else {
    formdata.append('isSeries', mov.isSeries)
    }
    if(!selectedContent){
        formdata.append('content', movie.content)
    }else {
    for (let i = 0; i < selectedContent.length; i++) {
      formdata.append('content', selectedContent[i])
        }
    }

    const response =  await axios.put(`/movies/${movie._id}`, formdata, {
        headers: {
          token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4',
          'Content-Type': 'multipart/form-data'
        }, 
      })
      console.log(response, 'responsee')
      history.push('/movies')


    }


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Movie</h1>
      </div>
      <div className="productTop"> 
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img className="productInfoImg" src={movie.image[0].image} alt=''/>
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">ageLimit:</span>
                      <span className="productInfoValue">{movie.ageLimit}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">desription:</span>
                      <span className="productInfoValue">{movie.description}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form encType="multipart/form-data" className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Thumbnail</label>
                  <input type="file" placeholder={movie.thumbnail}
                  onChange={(e)=> setThumbnail(e.target.files, console.log(e.target.files))}
                  />
                  <label>Trailer</label>
                  <input type="file" placeholder={movie.trailer}
                  onChange={(e)=> setTrailer(e.target.files, console.log(e.target.files))}
                  />
                  <label>Movie Title</label>
                  <input type="text" name='title' placeholder={movie.title} onChange={handleChange}/>
                  <label>Director</label>
                  <input type="text" name='director' placeholder={movie.director} onChange={handleChange}/>
                  <label>Duration</label>
                  <input type="text" name='duration' placeholder={movie.duration} onChange={handleChange}/>
                  <label>Description</label>
                  <input type="text" name='description' placeholder={movie.description} onChange={handleChange}/>
                  <label>Year</label>
                  <input type="text" name='year' placeholder={movie.year} onChange={handleChange}/>
                  <label>Genre</label>
                  <input type="text" name='genre' placeholder={movie.genre} onChange={handleChange}/>
                  <label>AgeLimit</label>
                  <input type="text" name='ageLimit' placeholder={movie.ageLimit} onChange={handleChange}/>
                  <label>Movie or Series</label>
                    <select name="isSeries" id="isSeries" onChange={handleChange}>
                        <option>Choose</option>
                        <option value="false">Movie</option>
                        <option value="true">Series</option>
                    </select>
                  <div className="addProductItem" id="last" style={{
                    overflow:"scroll",
                    height: "150px"
                }}>
                    <label>Content</label>
                    {content.map((newContent) => (
            <div key={newContent._id}>
            <input type="checkbox"
            name="content"
            // defaultChecked={checked}
            onChange={(e)=>{
              e.target.checked ? setSelectedContent(prev=> [...prev, newContent._id]) : setSelectedContent(selectedContent.filter(content=>content.id !== newContent.id)) 
            }}
            />
            <label >{newContent.title}</label>
            </div>
          ))}
                  </div>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.image[0].image} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish style={{cursor:"pointer"}}/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}}
                      onChange={(e)=> setFile(e.target.files, console.log(e.target.files))}
                      />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

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
  // const [cont, setContent] = useState([])
  const [file, setFile] = useState({})
  const [thumbnail, setThumbnail] = useState({})
  const [trailer, setTrailer] = useState({})
  const [checked, setChecked] = useState(false)
  const [selectedContent, setSelectedContent] = useState([])
  const history = useHistory();

  const { content, dispatch: dispatchContent } = useContext(ContentContext)

  useEffect(() => {
    getContent(dispatchContent)
  }, [dispatchContent])

  const handleChange = (e) => {
    const value = e.target.value
    setMovie({...movie, [e.target.name]: value, content: selectedContent})
    console.log(movie, selectedContent)
  }

  // const handleSelect = (e) => {
  //   let value = Array.from(e.target.selectedOptions, (option) => option.value)
  //   setMovie({...movie, [e.target.name]: value})
  // }

  // const handleChecked = (e, content) => {
  //   setChecked(!checked)

  //   e.target.checked && selectedContent.push(content)
  // }

    // console.log(checked)

console.log(selectedContent)
// console.log(movie.content)

console.log(file)
  const handleStart = async (e) => {
    e.preventDefault()

    let formdata = new FormData()
    formdata.append('title', movie.title)
    for (let i = 0; i < file.length; i++) {
      formdata.append('image', file[i], file[i].name)
    }
    for (let i = 0; i < thumbnail.length; i++) {
    formdata.append('thumbnail', thumbnail[i])
    }
    for (let i = 0; i < trailer.length; i++) {
      formdata.append('trailer', trailer[i])
      }
    formdata.append('description', movie.description)
    formdata.append('director', movie.director)
    formdata.append('year', movie.year)
    formdata.append('ageLimit', movie.ageLimit)
    formdata.append('genre', movie.genre)
    formdata.append('duration', movie.duration)
    formdata.append('isSeries', movie.isSeries)
    
    for (let i = 0; i < selectedContent.length; i++) {
      // var content = JSON.stringify(selectedContent[i])
      formdata.append('content', selectedContent[i])
      
    }
  

    const response =  await axios.post('/movies', formdata, {
      headers: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4',
        'Content-Type': 'multipart/form-data'
      }, 
    })
    console.log(response, 'responsee')
    // handleFileChange()
    // createMovie(movie, dispatch)

    history.push('/movies')


  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Movie</h1>
        <form encType="multipart/form-data" className="addProductForm" onSubmit={handleStart} >
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="image" accept="image/jpeg" 
          multiple
          // onChange={handleFileChange} 
          onChange={(e)=> setFile(e.target.files, console.log(e.target.files))}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail</label>
          <input type="file" id="image" accept="image/jpeg" 
          // onChange={handleFileChange} 
          onChange={(e)=> setThumbnail(e.target.files, console.log(e.target.files))}/>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" id="image"  
          // onChange={handleFileChange} 
          onChange={(e)=> setTrailer(e.target.files, console.log(e.target.files))}/>
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
            <option>Choose</option>
            <option value="false">Movie</option>
            <option value="true">Series</option>
          </select>
        </div>
        <div className="addProductItem" id="last" style={{
            overflow:"scroll",
            height: "150px"
          }}>
          <label >Content</label>
          {content.map((newContent) => (
            <div key={newContent._id}>
            <input type="checkbox"
            name="content"
            defaultChecked={checked}
            onChange={(e)=>{
              e.target.checked ? setSelectedContent(prev=> [...prev,
                //  {
                  //  contentId:
                    newContent._id
                  // }
                ]) : setSelectedContent(selectedContent.filter(content=>content.id !== newContent.id))
              
            }}
            />
            <label >{newContent.title}</label>
            </div>
          ))}
          
          {/* <select multiple name='content' onChange={handleSelect} style={{height: '280px'}}>
            {content.map((newContent)=> (
              <option key={newContent._id} 
              value={newContent}
              >{newContent.title}</option>
              
            ))} */}
            {/* {content.map((newContent).filter(newContent => newContent._id) =>(
            // 
           
              <option key={newContent._id}
              value={newContent}> 
              {newContent.title}</option>
            ))} */}
          {/* </select> */}
        </div>
        <button className="addProductButton" >Create</button>
      </form>
    </div>
  );
}

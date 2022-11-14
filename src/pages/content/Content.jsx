import { Link, useLocation, useHistory } from "react-router-dom";
import "./content.css";
import { useContext } from "react";
import { ContentContext } from "../../context/contentContext/contentContext";

import { useState } from "react";
import axios from 'axios'

export default function Content() {
    const location = useLocation();
    const content = location.content


    const [movie, setMovie] = useState({})
    const [videoHD, setVideoHD] = useState({})
    const [videoFHD, setVideoFHD] = useState({})
    const [video2k, setVideo2k] = useState({})
    const [video4k, setVideo4k] = useState({})
    const history = useHistory();


    const handleChange = (e) => {
        const value = e.target.value
        setMovie({...movie, [e.target.name]: value})
      }


      const handleSubmit = async(e) => {
        e.preventDefault()
    
        let formdata = new FormData()
        
        if(videoHD){
        for (let i = 0; i < videoHD.length; i++) {
          formdata.append('videoHD', videoHD[i])
        }
      }
      if(videoFHD){
        for (let i = 0; i < videoFHD.length; i++) {
          formdata.append('videoFHD', videoFHD[i])
        }
      }
      if(video2k){
        for (let i = 0; i < video2k.length; i++) {
          formdata.append('video2k', video2k[i])
        }
      }
      if(video4k){
        for (let i = 0; i < video4k.length; i++) {
          formdata.append('video4k', video4k[i])
        }
      }
      if(movie.title){
        formdata.append('title', movie.title)
    }
      if(movie.description){
          formdata.append('description', movie.description)
      } 
      if(movie.director){
        formdata.append('director', movie.director)
    } 
    if(movie.year){
        formdata.append('year', movie.year)
    } 
    if(movie.ageLimit){
        formdata.append('ageLimit', movie.ageLimit)
    }
    if(movie.genre){
        formdata.append('genre', movie.genre)
    }
    if(movie.duration){
        formdata.append('duration', movie.duration)
    }
    
        await axios.put(`/content/${content._id}`, formdata, {
          headers: {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4',
            'Content-Type': 'multipart/form-data'
          }, 
        })
        history.push('/content')
      }

  
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Content</h1>
        {/* <Link to="/newcontent">
          <button className="productAddButton">Create</button>
        </Link> */}
      </div>
      <div className="productTop"> 
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">{content.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{content._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{content.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">ageLimit:</span>
                      <span className="productInfoValue">{content.ageLimit}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">description:</span>
                      <span className="productInfoValue">{content.description}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Content Title</label>
                  <input type="text" name="title" placeholder='Title' onChange={handleChange}/>
                  <label>Movie/Series Episode in HD</label>
                    <input type="file" id="video" name="videoHD" 
                    onChange={e => setVideoHD(e.target.files, console.log(e.target.files))}
                    placeholder={content.image}/>

                  <label>Movie/Series Episode in Full HD</label>
                    <input type="file" id="video" name="videoFHD" 
                    onChange={e => setVideoFHD(e.target.files, console.log(e.target.files))}
                    />

                  <label>Movie/Series Episode in 2k</label>
                    <input type="file" id="video" name="video2k" 
                    onChange={e => setVideo2k(e.target.files, console.log(e.target.files))}
                    />

                  <label>Movie/Series Episode in 4k</label>
                    <input type="file" id="video" name="video4k" 
                    onChange={e => setVideo4k(e.target.files, console.log(e.target.files))}
                    />
                  
                  <label>Description</label>
                  <input type="text" placeholder="Decription" name="description" onChange={handleChange}/>
                  <label>Director</label>
                  <input type="text" placeholder='Director' name='director' onChange={handleChange}/>
                  <label>Year</label>
                  <input type="number" placeholder='Year' name='year' onChange={handleChange}/>
                  <label>Duration</label>
                  <input type="text" placeholder='Duration' name='duration' onChange={handleChange}/>
                  <label>AgeLimit</label>
                  <input type="number" placeholder='ageLimit' name='ageLimit' onChange={handleChange}/>
                  <label>Genre</label>
                  <input type="text" placeholder="Drama" name="genre" onChange={handleChange}/>
              </div>
              <div className="productFormRight">
                  <button className="productButton" >Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useContext } from "react";
import { ContentContext } from "../../context/contentContext/contentContext";
import { useEffect } from "react";
import { getContent } from "../../context/contentContext/apiCalls";

export default function Movie() {
    const location = useLocation();
    const movie = location.movie

    const { content, dispatch: dispatchContent } = useContext(ContentContext)
  
    useEffect(() => {
      getContent(dispatchContent)
    }, [dispatchContent])

    const handleSelect = (e) => {
        Array.from(e.target.selectedOptions, (option) => option.value)
      }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop"> 
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img className="productInfoImg" src={movie.image} alt=''/>
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
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" placeholder={movie.title} />
                  <label>Director</label>
                  <input type="text" placeholder={movie.director}/>
                  <label>Year</label>
                  <input type="text" placeholder={movie.year}/>
                  <label>Genre</label>
                  <input type="text" placeholder={movie.genre}/>
                  <label>AgeLimit</label>
                  <input type="text" placeholder={movie.ageLimit}/>
                  <label>Trailer</label>
                  <input type="file" placeholder={movie.trailer}/>
                  <label>Video</label>
                  <input type="file" placeholder={movie.video}/>
                  <div className="addProductItem">
                    <label>Content</label>
                    <select multiple name='content' onChange={handleSelect} style={{height: '280px'}}>
                        {content.map((content)=> (
                        <option key={content._id} value={content._id}>{content.title}</option>
                        ))}
                    </select>
                  </div>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.image} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish style={{cursor:"pointer"}}/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import "./content.css";
import { Publish } from "@material-ui/icons";
import { useContext } from "react";
import { ContentContext } from "../../context/contentContext/contentContext";
import { useEffect } from "react";
import { getContent } from "../../context/contentContext/apiCalls";

export default function Content() {
    const location = useLocation();
    const content = location.content


  
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
                      <span className="productInfoKey">desription:</span>
                      <span className="productInfoValue">{content.description}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Content Title</label>
                  <input type="text" placeholder={content.title} />
                  <label>Director</label>
                  <input type="text" placeholder={content.director}/>
                  <label>Year</label>
                  <input type="text" placeholder={content.year}/>
                  <label>Duration</label>
                  <input type="text" placeholder={content.duration}/>
                  <label>AgeLimit</label>
                  <input type="text" placeholder={content.ageLimit}/>
                  <label>Video Files</label>
                  <input type="file" placeholder={content.image}/>
              </div>
              <div className="productFormRight">
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}

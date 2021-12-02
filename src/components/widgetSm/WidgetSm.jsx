import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WidgetSm() {

  const [newusers, setNewusers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
      const res = await axios.get('/users?new=true', {
        headers: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTRjOTQyZDI3MjU2MDQ3NjMwOTE1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODA1NDI4MywiZXhwIjoxNjQwNjQ2MjgzfQ.-wK6MoeZembvg5rXNXuHYm3HpY5izx0iq3xf00DMHE4'
        }
        })
        setNewusers(res.data);
      } catch (err) {
      console.log(err)
      }
    }
    getNewUsers()
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Users</span>
      <ul className="widgetSmList">
        {newusers.map(user => (

        
        <li className="widgetSmListItem">
          <img
            src={user.profilePicture || 'https://c.tenor.com/7Dd4i9TgnW8AAAAM/ena-animated-profile-picture.gif'}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))} 
      </ul>
    </div>
  );
}

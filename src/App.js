import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";

import Login from "./pages/login/login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/authContext";
import List from "./pages/list/List"
import NewList from "./pages/newList/NewList";
import Movies from "./pages/movies/Movies";
import NewMovie from "./pages/newMovie/NewMovie";
import Contents from "./pages/contents/Contents";
import Content from "./pages/content/Content";
import NewContent from "./pages/newContent/NewContent";

function App() {

  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          { user ? <Redirect to='/' /> : <Login />}
          </Route>
        {user && (
        <>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/content">
            <Contents />
          </Route>
          <Route path="/content/:contentId">
            <Content />
          </Route>
          <Route path="/newcontent">
            <NewContent />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/movie/:movieId">
            <Movie />
          </Route>
          <Route path="/newmoviepage1">
            <NewMovie />
          </Route>
          <Route path="/lists">
            <MovieList />
          </Route>
          <Route path="/list/:listId">
            <List />
          </Route>
          <Route path="/newlist">
            <NewList />
          </Route>
          </div> 
          </>)}
        </Switch>
    </Router>
  );
}

export default App;

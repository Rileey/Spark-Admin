import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/userContext"
import { deleteUsers, getUsers } from "../../context/userContext/apiCalls";
import axios from 'axios';

export default function UserList() {
  // const [data, setData] = useState(userRows);

  const {users, dispatch} = useContext(UserContext)
  // const [user, setUser] = useState(userRows)

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch])

  // useEffect(() => {
  //   const getNewUsers = async () => {
  //     try {
  //     const res = await axios.get('/users', {
  //       headers: {
  //         token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
  //       }
  //       })
  //       setUser(res.data);
  //       console.log(res.data)
  //     } catch (err) {
  //     console.log(err)
  //     }
  //   }
  //   getNewUsers()
  // }, [])

  console.log(users)

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const handleDelete = (id) => {
    deleteUsers(id, dispatch)
  }
  
  const columns = [
    // { field: "id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "UserNumber",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            + { params.row.phoneNumber }
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250, 
    renderCell: (params) => {
      return (
        <div className="userListUser">
          <img className="userListImg" src={params.row.profilePicture || 'https://c.tenor.com/7Dd4i9TgnW8AAAAM/ena-animated-profile-picture.gif'} alt="" />
          { params.row.email }
        </div>
      );
    }, },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/user/" + params.row._id, user: params.row}}>
              <button className="userListEdit">View</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
        <Link to="/newUser">
          <button className="userAddButton1">Create</button>
        </Link>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}

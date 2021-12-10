
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./contents.css"
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from 'axios'
import { MovieContext }  from '../../context/movieContext/movieContext'
import { deleteContent, getContent } from "../../context/contentContext/apiCalls";
import { ContentContext } from "../../context/contentContext/contentContext";

export default function Contents() {
  const {content, dispatch} = useContext(ContentContext)

  useEffect(() => {
     getContent(dispatch);

  }, [dispatch])



  const handleDelete = (id) => {
    deleteContent(id, dispatch)
  };

  const columns = [
    {
      field: "title",
      headerName: "Content",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.title}
          </div>
        );
      },
    },
    { field: "year", headerName: "Year", width: 120 },
    { field: "ageLimit", headerName: "AgeLimit", width: 120 },
    { field: "duration", headerName: "Duration", width: 200 },
    { field: "director", headerName: "Director", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/content/" + params.row._id, content: params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newcontent">
          <button className="productAddButton1">Create Content</button>
        </Link>
      <DataGrid
        rows={content}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
      
    </div>
  );
}

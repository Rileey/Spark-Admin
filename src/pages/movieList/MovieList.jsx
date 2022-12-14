import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/listContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

export default function MovieList() {
  const {lists, dispatch} = useContext(ListContext)

  useEffect(() => {
     getLists(dispatch);

  }, [dispatch])

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  console.log(lists)

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/list/" + params.row._id, list: params.row}}>
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
      <Link to="/newlist">
          <button className="productAddButton1">Create Movie List</button>
        </Link>
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}

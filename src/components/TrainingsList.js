import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import { GET_TRAININGS_API, TRAININGS_API } from "../constants";
import Snackbar from "@mui/material/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TrainingsList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const [columnDefs] = useState([
    { field: "date", sortable: true, filter: true },
    {
      field: "duration",
      headerName: "Duration (mins)",
      sortable: true,
      filter: true,
    },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customerName",
      headerName: "Customer",
      sortable: true,
      filter: true,
    },
    {
      cellRenderer: (params) => (
        <IconButton color="error" onClick={() => deleteTraining(params)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch(GET_TRAININGS_API)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((training) => {
          console.log(data)
          const formattedDate = format(
            new Date(training.date),
            "dd.M.yyyy HH:mm"
          );

          return {
            ...training,
            date: formattedDate,
            customerName: `${training.customer.firstname} ${training.customer.lastname}`,
          };
        });
        setTrainings(formattedData);
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (params) => {
    if (window.confirm("Delete training?")) {
      fetch(TRAININGS_API + params.data.id, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Training deleted successfully");
            setOpen(true);
            getTrainings();
          } else {
            alert("Something went wrong in deletion: " + response.status);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <AgGridReact
        pagination={true}
        paginationPageSize={10}
        rowData={trainings}
        columnDefs={columnDefs}
      ></AgGridReact>
    </div>
    <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={() => setOpen(false)}
    message={msg}
  />
</>
  );
}

export default TrainingsList;

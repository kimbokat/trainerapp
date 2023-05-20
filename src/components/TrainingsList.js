import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import { TRAININGS_API } from "../constants";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TrainingsList() {
  const [trainings, setTrainings] = useState([]);

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
  ]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch(TRAININGS_API)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((training) => {
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

  return (
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
  );
}

export default TrainingsList;

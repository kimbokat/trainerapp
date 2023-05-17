import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import { CUSTOMER_API, TRAININGS_API } from "../constants";
import { CustomerList } from "./CustomerList"

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function TrainingsList({customers}) {
  const [trainings, setTrainings] = useState([]);

  

  const [columnDefs] = useState([
    { field: "date", sortable: true, filter: true },
    { field: "duration (minutes)", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    { 
      field: "customerName", 
      headerName: "Customer", 
      sortable: true, 
      filter: true,
      valueGetter: (params) => {
        return params.data.firstName + params.data.lastName;
      },
    },
  ]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch(TRAININGS_API)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.content.map((training) => {
        const formattedDate = format(new Date(training.date), "dd.MM.yyyy hh:mm");
        return { ...training, date: formattedDate };
      });
      setTrainings(formattedData);
      })
      .catch((err) => console.error(err));
  };
  
  return (
   
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}>
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

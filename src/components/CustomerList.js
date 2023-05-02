import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { CUSTOMER_API } from "../constants";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function CustomerList() {
  const [customers, setCustomers] = useState([]);

  

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
     ]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch(CUSTOMER_API)
      .then((response) => response.json())
      .then((data) => {
        (console.log(data.content[0]));
        setCustomers(data.content)
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
          rowData={customers}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
 
  );
}


export default CustomerList;

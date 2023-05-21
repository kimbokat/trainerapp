import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { CUSTOMER_API } from "../constants";
import AddCustomer from "./AddCustomer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const [columnDefs] = useState([
    {
      field: "firstname",
      headerName: "First name",
      sortable: true,
      filter: true,
    },
    {
      field: "lastname",
      headerName: "Last name",
      sortable: true,
      filter: true,
    },
    {
      field: "streetaddress",
      headerName: "Address",
      sortable: true,
      filter: true,
    },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <IconButton color="error" onClick={() => deleteCustomer(params)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch(CUSTOMER_API)
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (params) => {
    if (window.confirm("Delete customer?")) {
      fetch(params.data.links[1].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted successfully");
            setOpen(true);
            getCustomers();
          } else {
            alert("Something went wrong in deletion: " + response.status);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCustomer = (customer) => {
    fetch(CUSTOMER_API, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) getCustomers();
        else alert("Something went wrong when adding a new car");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          rowData={customers}
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

export default CustomerList;

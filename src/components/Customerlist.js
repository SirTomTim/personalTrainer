import React, {useState, useEffect} from "react";
import ReactTable from 'react-table';
import "react-table/react-table.css"; 
import Button from '@mui/material/Button';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
export default function Customerlist(){

    const [customer, setCustomer] = useState([]);
    useEffect(() => fetchData(), []);
    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomer(data.content))
    }
    const deleteCust = (link) => {
        if(window.confirm('Are you sure?'))
        {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData)
        .catch(err => console.error(err))
        }
    };
    const saveCustomer = (customer) => {
        window.confirm("Are you sure?");
        fetch("https://customerrest.herokuapp.com/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        })
          .then((res) => fetchData())
          .catch((err) => console.error(err));
      };
      const updateCustomer = (customer, link) => {
        window.confirm("Are you sure?");
        fetch(link, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        })
          .then((res) => fetchData())
          .catch((err) => console.error(err));
      };
    const columns = [
    {
        Header: 'First name',
        accessor: 'firstname'
    },
    {
        Header: 'Last name',
        accessor: 'lastname'
    },
    {
        Header: 'Address',
        accessor: 'streetaddress'
    },
    {
        Header: 'Postcode',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        Cell: row => <EditCustomer updateCustomer={updateCustomer} customer = {row.original}/>
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links.0.href',
        Cell: row => <Button color="secondary" onClick={() => deleteCust(row.value)}>Delete</Button>
    }


    ]
    return(
        <div>
            <AddCustomer saveCustomer={saveCustomer}/>
            <ReactTable filterable={true} data={customer} columns={columns}/>
        </div>
    )
}
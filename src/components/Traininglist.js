import React, {useState, useEffect} from "react";
import ReactTable from 'react-table';
import "react-table/react-table.css"; 
import Button from '@mui/material/Button';
import AddTraining from "./AddTraining";

export default function Traininglist(){

    const [training, setTraining] = useState([]);
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetchData();
        fetchCustomers();
      }, []);
    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTraining(data.content))
    }
    const deleteTrain = (link) => {
        if(window.confirm('Are you sure?'))
        {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData)
        .catch(err => console.error(err))
        }
    };
    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
          .then((response) => response.json())
          .then((data) => setCustomers(data.content))
          .catch((err) => console.error(err));
        console.log(customers);
      };
      const saveTrainings = (training) => {
        window.confirm("Are you sure?");
        fetch("https://customerrest.herokuapp.com/api/trainings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(training),
        })
          .then((res) => fetchData())
          .catch((err) => console.error(err));
      };
    const columns = [
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        Header: 'Duration',
        accessor: 'duration'
    },
    {
        Header: 'Activity',
        accessor: 'activity'
    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links.href',
        Cell: row => <Button color="secondary" onClick={() => deleteTrain(row.value)}>Delete</Button>
    }



    ]
    return(
        <div>
            <AddTraining saveTraining={saveTrainings} customers={customers}/>
            <ReactTable filterable={true} data={training} columns={columns}/>
        </div>
    )
}
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const TodoList = () => {

    const [users,setUsers] =useState([]);
    useEffect(() => {
      
  
    const fetchTodoList = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos');
        console.log(response.data);
        setUsers(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodoList();
    }, []);
  
    return <div>
        <Table bordered>
    <thead>
    <tr>
        <th>#</th>
        <th>Title</th>
        <th>Completed</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    </thead>
    <tbody>
        {users.length > 0 ?(
          users.map((user,index) =>(
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.title}</td>
              <td>{user.completed ? 'True' : 'False'}</td>
              <td><button>Edit</button></td>                     
              <td><button>Delete</button></td>                      
            </tr>
          ))
        ) :(
            <tr>
              <td>No Records Found</td>
            </tr>
          )}
    </tbody>                           
    </Table>
    </div>;
  };
  
  export default TodoList;
  
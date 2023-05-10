import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'https://jsonplaceholder.typicode.com/users';

const UserList = () => {

    const [listOfUser, setListOfUser] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then(res => setListOfUser(res.data));
    },[]);

    const CreateUser = () => {

        axios.post(baseURL, {
            id: 11,
            name: "Coulibaly Nahoua",
            username: "AbouMounir",
            email: "nahoua.c@gmail.com",
            address: {
                city: "Abidjan",
                zipcode: "92998-3874",
            },
            phone: "1-770-736-8031 x56442",
            website: "geodaftar.org",           
        })
        .then(res => setListOfUser([...listOfUser, res.data]));
    }

    const handleUpdate = (item) => {
        const list = [...listOfUser];
        const index = list.indexOf(item);
        axios.put(`${baseURL}/${item.id}`, {
            name: "Coulibaly Nahoua",
            username: "AbouMounir",
            email: "nahoua.c@gmail.com",
            address: {
                city: "Abidjan",
                zipcode: "92998-3874",
            },
            phone: "1-770-736-8031 x56442",
            website: "geodaftar.org", 
        })
        .then(res => list[index] = {...res.data})
        setListOfUser(list);
    }

    const handleDelete = (item) => {
        axios.delete(`${baseURL}/${item.id}`)
        setListOfUser(listOfUser.filter((elt) => elt.id !== item.id))
    }

    return (
       <>
         <div className="container">
         <button className="btn_add" onClick={CreateUser}> Create User </button>
         <table>
            <thead>
                <tr>
                    <th> Id </th>
                    <th> Name </th>
                    <th> Email </th>
                    <th> Website </th>
                    <th> City </th>
                    <th> Update </th>
                    <th> Delete </th>
                </tr>
            </thead>
            <tbody>
                {listOfUser.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td> {item.id} </td>
                            <td> {item.name} </td>
                            <td> {item.email} </td>
                            <td> {item.website} </td>
                            <td> {item.address.city} </td>
                            <td> <button style={{backgroundColor:'blue'}} className="btn" onClick={() => handleUpdate(item)}> Uptade </button> </td>
                            <td> <button style={{backgroundColor:'red'}} className="btn" onClick={() => handleDelete(item)}> Delete </button> </td>
                        </tr>
                    );
                })}
            </tbody>
         </table>
       </div> 
       </>
    );
};

export default UserList ;
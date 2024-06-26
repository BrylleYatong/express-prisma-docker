import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '@/components/CardComponent';

interface User {
  id: number;
  name: string;
  email: string;
};

interface UpdateUser {
    id: string;
    name: string;
    email: string;
};

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [users, setUsers] = useState<User[]>([]);
  console.log("%c 🔪: Home -> users ", "font-size:16px;background-color:#6a9f4b;color:white;", users)
  const [newUsers, setNewUsers] = useState({id: "", name: '', email:''});
  const [updateUser, setUpdateUser] = useState({id: '', name: '', email: ''});

  //  fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error in fetching user", error)
      }
    };
    fetchData();
  },[]);

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, newUsers);
      setUsers([response.data, ...users]);
      setNewUsers({id: "", name:"", email:""});
    } catch (error) {
      console.error("Error in creating user", error)
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, updateUser);
      setUpdateUser({id:"", name:"", email:""});
      setUsers(
        users.map((user:any) =>{
          if(user.id === parseInt(updateUser.id)) {
            return {...user,id: parseInt(updateUser.id), name: updateUser.name, email: updateUser.email};
          };
          return user;
        })
      );
    } catch (error) {
      console.error("Error in updating user", error)
    }
  };
  
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error in deleting a user", error)
    }
  }

  const handleSelectUser = (id: number) => {
    const user = users.find(
      (user: User) => {
        if (id === user.id) {
          return {...user, id: String(user.id)}
        }
      }
    ) 
    console.log("%c 🚮: handleSelectUser -> user ", "font-size:16px;background-color:#95382c;color:white;", user)
    // setUpdateUser(user ?? {id: '', name:'', email:''})
  }

  const sf = () => {
    console.log("%c 🇭🇲: sf -> sampleFunction ", "font-size:16px;background-color:#77172f;color:white;", sf)
  }

  return(
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-500">
      <div className="space-y-4 w-full max-w-2x1">
        <h1 className="text-2x1 font-bold text-gray-800 text-center">User Management App</h1>

        <form onSubmit={createUser} className="p-4 bg-blue-100 rounded shadow">
          <input
            placeholder="Name"
            value={newUsers.name}
            onChange={(e) => setNewUsers({...newUsers, name: e.target.value})}
            className="mb-2 w-full p-2 border border-gray-300 rounded pointer"
          />
          <input
            placeholder="Email"
            value={newUsers.email}
            onChange={(e) => setNewUsers({...newUsers, email: e.target.value})}
            className="mb-2 w-full p-2 border border-gray-300 rounded pointer"
          />
          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-700">
            Add User
          </button>
        </form>

        <form onSubmit={handleUpdateUser} className="p-4 bg-green-100 rounded shadow">
          <input 
            placeholder="User ID"
            value={updateUser.id}
            onChange={(e) => setUpdateUser({...updateUser, id: e.target.value})}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Name"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Email"
            value={updateUser.email}
            onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-700">
            Update User
          </button>
        </form>

        <div className="space-y-2">
          {users.map((user:any)=>(
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <CardComponent 
                onUserSelect={() => handleSelectUser(user.id)} 
                onClick={() => sf()} 
                updateUsers={updateUser} 
                user={user} 
              />
              <button onClick={() => deleteUser(user.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
};
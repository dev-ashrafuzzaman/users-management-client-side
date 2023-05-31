import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  } ,[])

  console.log(users)

  const handelUserAdd = (event) =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    <br />
    const email = form.email.value;
    <br />
    const user = {name , email}
    console.log(user)
    fetch('http://localhost:5000/users' , {
      method: "POST",
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const oldUsrs = [...users , data]
      setUsers(oldUsrs)
      form.reset()
    })
  }
  return (
    <>
    <form onSubmit={handelUserAdd}>
      <input type="text" name='name' />
      <input type="email" name='email' />
      <input type="submit" value="Add Users" />
    </form>
      <h1>Users Management System</h1>
      <h3>Total Users : {users.length}</h3>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App

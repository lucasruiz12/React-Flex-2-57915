import React, { useState } from 'react'

const Formulario = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailConfirm, setEmailConfirm] = useState('')
    const [phone, setPhone] = useState('')

  return (
    <div>
        <label>Nombre:</label>
        <input type="text" onChange={(event) => setName(event.target.value)}/>

        <label>Email:</label>
        <input type="email" onChange={(event) => setEmail(event.target.value)}/>

        <label>Confirmacion de Email:</label>
        <input type="email" onChange={(event) => setEmailConfirm(event.target.value)}/>

        <label>Telefono:</label>
        <input type="number" onChange={(event) => setPhone(event.target.value)}/>

        <h3>Nombre: {name}</h3>
        <h3>Email: {email}</h3>
        <h3>Confirmacion de Email: {emailConfirm}</h3>
        <h3>Telefono:   {phone}</h3>
    </div>
  )
}

export default Formulario
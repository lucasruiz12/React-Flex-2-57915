import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productos from '../instrumentos.json'
import Contador from './Contador'
import { useAppContext } from '../context/Context'

const ItemDetailContainer = () => {
    const [itemDetail, setItemDetail] = useState({})
    const {agregarAlCarrito} = useAppContext();
    const img = 'https://media.istockphoto.com/id/924715090/es/vector/conjunto-de-instrumentos-musicales-jazz-blues-y-m%C3%BAsica-cl%C3%A1sica.jpg?s=1024x1024&w=is&k=20&c=wxEIxzSzTAu3sUrpanfBky41RBLQbfzI2lPxoCLALOI='
    const {id} =  useParams()
    
    useEffect(() => {
        const findItem = productos.instrumentos.find((item) => item.id == id)
        setItemDetail(findItem)
    }, [])

  return (
    <div>
        <img src={img} alt="" width={400}/>
        <h1>{itemDetail.name}</h1>
        <h3>${itemDetail.price}</h3>
        <p>{itemDetail.description}</p>
        <Contador stock={itemDetail.stock}/>
        <button onClick={() => agregarAlCarrito(itemDetail)}>Agregar al carrito</button>
        
    </div>
  )
}

export default ItemDetailContainer
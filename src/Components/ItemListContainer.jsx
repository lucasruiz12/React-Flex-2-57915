import React, { useEffect, useState } from 'react'
import productos from '../instrumentos.json'
import ItemList from './ItemList'
import Loader from './Loader'
import { useAppContext } from '../context/Context'

const ItemListContainer = ({ greeting }) => {
    const [instrumentos, setInstrumentos] = useState([]);

    const { cargarProductos, productos } = useAppContext();

    const fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productos.instrumentos)
        }, 2000)
    })

    useEffect(() => {
        cargarProductos();
        fetchData()
            .then(res => setInstrumentos(res))
    }, [])

    // Deberian hacer para la 2da pre-entrega
    // Lógica para obtener mediante useParams() si existe tal category que muestre la lista filtrada (metodo .filter())
    //

    return (
        <div>
            <h1>Bienvenidos a Música del Alma</h1>
            {productos.length == 0 ? <Loader /> : <ItemList instrumentos={productos} />}
        </div>
    )
}

export default ItemListContainer
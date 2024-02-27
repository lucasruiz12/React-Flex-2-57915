import React from 'react'
import { Modal } from 'react-bootstrap';
import { useAppContext } from '../context/Context';

const ModalCarrito = () => {

    const { carrito, eliminarProducto, crearOrden } = useAppContext();

    return (
        <Modal show={true}>
            <Modal.Body>
                <div>
                    {carrito.map((el, index) => {
                        return (
                            <div className="card" key={index}>
                                <button onClick={() => eliminarProducto(el.id)}>X</button>
                                <ul>
                                    <li>
                                        Nombre: {el.name}
                                    </li>
                                    <li>
                                        Precio: $ {el.price}
                                    </li>
                                    <li>
                                        Cantidad: {el.cantidad}
                                    </li>
                                </ul>
                            </div>
                        )
                    })}
                    <button onClick={() => crearOrden()}>Comprar</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalCarrito;
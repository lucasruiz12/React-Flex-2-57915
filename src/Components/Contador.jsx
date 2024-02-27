import React from 'react';

const Contador = ({ stock, contador, setContador }) => {
  const sumar = () => setContador(contador + 1)
  const restar = () => setContador(contador - 1)

  return (
    <div>
      <button onClick={restar} disabled={contador < 2}>-</button>
      <h3>{contador}</h3>
      <button onClick={sumar} disabled={contador === stock}>+</button>
      {contador === stock && <h4 style={{ color: 'red' }}> No hay más productos en stock</h4>}
    </div>
  )
}

export default Contador
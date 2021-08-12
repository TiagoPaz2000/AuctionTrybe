import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
  const [products, setProducts] = useState([]);
  const [teste2, setTeste2] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then((response) => response.json())
      .then((product) => setProducts(product))
  }, []);

  useEffect(() => {
    socket.on('newPrice', (teste) => {
      const newProducts = products.map((product) => {
        if (product.id === teste.id) {
          return teste;
        }
        return product;
      });
      setProducts(newProducts);
    });
    console.log('teste');
  }, []);

  const handleClick = (id, current_price) => {
    const price = +current_price + 1;
    socket.emit('bid', { id, current_price: price });
  }

  if (!products.length) return <p>Carregando...</p>;

  return (
    <div className="App">
      { products.map((product) => {
        return (
          <div>
            <h3>{ product.name }</h3>
            <p>
              R$ 
              {
                product.current_price
              }
            </p>
            <button
              disabled={ +product.current_price >= +product.limit_price }
              onClick={ () => handleClick(product.id, product.current_price) }
            >
              Lance
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default App;

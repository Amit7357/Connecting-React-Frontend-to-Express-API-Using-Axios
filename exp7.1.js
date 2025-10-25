
{
  "dependencies": {
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  }
}

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Product Client</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        if (isMounted) {
          setProducts(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error fetching products');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="pl-center">Loading products...</div>;
  if (error) return <div className="pl-center pl-error">{error}</div>;

  return (
    <div className="pl-container">
      <h1 className="pl-title">Product List</h1>
      <div className="pl-grid">
        {products.map(p => (
          <div key={p.id} className="pl-card">
            <h2 className="pl-name">{p.name}</h2>
            <p className="pl-price">Price: ${p.price}</p>
            <button className="pl-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

.pl-container {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  padding: 24px;
  background: #1f1f1f;
  color: #e9e9e9;
  min-height: 100vh;
}

.pl-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.pl-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  max-width: 1100px;
  margin: 0 auto;
}

.pl-card {
  background: #2a2a2a;
  padding: 26px;
  border-radius: 10px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.03) inset;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.05);
}

.pl-name { margin: 0 0 12px 0; font-size: 20px; }
.pl-price { margin: 0 0 18px 0; }
.pl-button {
  background: #2f7bff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.pl-center { text-align: center; padding: 40px; }
.pl-error { color: #ff7b7b; }

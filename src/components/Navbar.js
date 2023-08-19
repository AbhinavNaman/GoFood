import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic fw-bolder" to="/">MyFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-1">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
        </li>:
        ""
        }
     
      </ul>
      
      {(!localStorage.getItem("authToken"))?
      <div className="d-flex">
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link className="btn bg-white text-success mx-1" to="/signup">signUp</Link>
          </div>
      :
      <div className="d-flex">
      <div className="btn text-white mx-1" disable>{localStorage.getItem("userEmail")}</div>
      <div className="btn bg-white text-success mx-1" onClick={()=>setCartView(true)}>My Cart {" "} &nbsp;
      <Badge pill bg="danger">{data.length}</Badge></div>
      {cartView? <Model onClose={()=>setCartView(false)}><Cart/></Model>: null}
          <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>LogOut</div>
          </div>
      }
          
      

    </div>
  </div>
</nav>
    </div>
  );
};

export default Navbar;

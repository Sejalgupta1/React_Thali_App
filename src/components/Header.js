import React, {useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
//import MenuItem from '@mui/material/MenuItem';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@mui/material';
import { padding } from '@mui/system';
import { DLT } from '../redux/actions/action';






export default function Header() {


  const [price,setPrice] = useState(0);



  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata)

  const dispatch = useDispatch();






  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const dlt = (id) => {
    dispatch(DLT(id))
  }


  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total])







  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <h2 style={{ color: 'white' }}>Thali App</h2>
          <NavLink to='./' className='' style={{ color: 'white', fontSize: 25, marginLeft: '20px' }}>Add to Cart</NavLink>

          <Nav className="me-auto">
            <NavLink to="/" style={{ color: 'white', fontSize: 25, marginLeft: '20px' }}>Home</NavLink>

          </Nav>


          <Badge badgeContent={getdata.length} color="primary"
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i className='fa-solid fa-cart-shopping text-light' style={{ fontSize: 25, cursor: "pointer" }}></i>
          </Badge>

        </Container>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >

          {
            getdata.length ?
              <div className='card_details' style={{ width: "24rem", padding: 7 }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Restaurant Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getdata.map((e) => {
                        return (
                          <div>
                            <tr>
                              <td>
                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}> <img src={e.image} style={{ width: "8rem", height: "8rem", marginTop: "20px" }} alt="" /></NavLink>
                              </td>
                              <td>
                                <p className='' style={{ paddingLeft: "55px" }}>{e.name}</p>
                                <p className='' style={{ paddingLeft: "49px" }}>Price : ₹ {e.price}</p>
                                <p className='' style={{ paddingLeft: "55px" }}>Quantity : {e.qnty}</p>
                                <p style={{ color: "red", fontSize: 20, cursor: "pointer", paddingLeft: "55px" }} onClick={() => dlt(e.id)}  >
                                  <i className='fas fa-trash smalltrash'></i>
                                </p>
                              </td>
                              <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                <i className='fas fa-trash largetrash'></i>
                              </td>
                            </tr>


                          </div>
                        )
                      })
                    }
                    <p className='text-center'>Total : ₹ {price}</p>
                  </tbody>
                </Table>

              </div> :
              <div className='card-details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10 }}>
                <p style={{ fontSize: 22, marginRight: "15px" }}>Your cart is empty</p>
                <i className='fas fa-close' style={{ fontSize: 23, cursor: "pointer" }} onClick={handleClose}></i>
              </div>
          }








        </Menu>
      </Navbar>
    </div>
  )
}

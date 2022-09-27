import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import Cardsdata from './CardsData';
import './style.css';
import {ADD} from '../redux/actions/action';

export default function Cards() {

  const [data,setData] = useState(Cardsdata);
  // console.log(data);

  const dispatch = useDispatch();

 const send = (e) =>{
  dispatch(ADD(e));
}


  return (
    <div  className='container mt-3' >
    <h2 className='text-center ' > Add to Cart Properties</h2> 

    <div className='row '>
   {
    data.map((element,id)=>{
      return(
        <div className='tt d-flex justify-content-center align-items-center '>
        <Card style={{width: '30rem' , border:"none", }} className="mx-2 mt-4 card_style">
        <Card.Img variant="top text-center" src={element.image} style={{height:"16rem"}} className="mt-3"/>
        <Card.Body>
          <Card.Title> {element.name}</Card.Title>
          <Card.Text>
            Price : ₹ {element.price}
          </Card.Text>
          <div className='buuton_div d-flex justify-content-center'>    
           <Button variant="primary " onClick={()=>send(element)} className='col-lg-12'>Add to Cart</Button>
          </div>
     
        </Card.Body>
      </Card>
      

        </div>
      )
    })
   }



    
    </div>
    
    </div>
  )
}

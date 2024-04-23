import React from "react";
import queryString from 'query-string';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import Tablet from './Tablet';
import'../styles/details.css';

import { get, post } from '../service/service'

class Details extends React.Component
{
  constructor()
  {
    super();
    this.state=
    {
      restaurents :{}
    }
  }
  async componentDidMount()
  {
    const qs = queryString.parse(this.props.location.search);
    const {restaurent} = qs;
    console.log("data")
    var newData = await get(`restaurent/getRestaurent/${restaurent}`);
    var data = {

    }

    var newData2 = await post(`restaurent/getRestaurent`, data);
    console.log(newData, newData2)

    axios({
      method : 'GET',
      url : `http://localhost:3002/api/restaurent/getRestaurentDetails/${restaurent}`,
      headers : {'Content-Type' : 'application/json'}
  })
      .then(response =>
          {
            localStorage.setItem("vijay", "deccan")
            console.log(localStorage.getItem("vijay"))
            this.setState({restaurents: response.data.data.restaurent});
            // console.log(response.data.data.restaurent)
          })
          .catch(err => console.log(err));


  }
render(){
  const {restaurents} = this.state;
    return(
        <div>
            
            <Carousel showThumbs={false}>
              <div>
              <img className="image"
               src= '../Assets/bery.jpg'
               alt="not Found"/>
              </div>
              <div>
              <img className="image"
               src= '../Assets/bread.jpg'
               alt="not Found"/>
              </div>
              <div>
              <img className="image"
               src='../Assets/sand.jpg'
               alt="not Found"/>
              </div>
            </Carousel>
            <Tablet resData = {restaurents} />
           
        </div>
    )
  }
}
 export default Details;
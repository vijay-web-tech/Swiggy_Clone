import React from 'react';

import axios from 'axios';

import "../styles/home.css";
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

// import mealtypes from '../../../Backend/src/models/mealtypes';
class Home extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            locations : [],
            mealtypes : []
        }
    }

    componentDidMount()
    {
        axios({
            method : 'GET',
            url : 'http://localhost:3002/api/location/getLocation',
            headers : {'Content-Type' : 'application/json'}
        })
            .then(response =>
                {
                    this.setState({locations: response.data.data})
                })
                .catch(err => console.log(err));

        axios({
            method : 'GET',
            url : 'http://localhost:3002/api/mealtype/getAllMealTypes',
            headers : {'Content-Type' : 'application/json'}
        })
            .then(response =>
                {
                    this.setState({mealtypes: response.data.data})
                })
                .catch(err => console.log(err));
    }
    render()
    {
        const {locations , mealtypes} = this.state;
        return(
    <div>
    <Wallpaper locationData = {locations}/>
    <QuickSearch quicksearchData = {mealtypes}/>
    </div>

        )
    }
}

export default Home;
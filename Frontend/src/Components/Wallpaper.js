import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
class Wallpaper extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            restaurents : [],
            inputText: '',
            suggestions : []
        }
    }
    
    handleLocation = (event) =>
    {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId',locationId);
        
        axios({
            method : 'GET',
            url : `http://localhost:3002/api/restaurent/getRestaurent/${locationId}`,
            headers : {'Content-Type' : 'application/json'}
        })
            .then(response =>
                {
                    this.setState({restaurents: response.data.data.restaurent});
                    console.log(response.data.data.restaurent)
                })
                .catch(err => console.log(err));


    }

    handleSearch = (event) =>
    {
        let inputText = event.target.value;

        const {restaurents} = this.state;

        const suggestions = restaurents.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));

        this.setState({suggestions, inputText});

    }

    showSuggestion = () =>
    {
        const {suggestions, inputText} = this.state;
        // eslint-disable-next-line
        if (suggestions.length == 0 && inputText == undefined)
        {
            return null;
        }
// eslint-disable-next-line
        if (suggestions.length > 0 && inputText == '')
        {
            return null;
        }
// eslint-disable-next-line
        if (suggestions.length == 0 && inputText)
        {
            return <ul>
                <li className="noSearch">No Results Found</li>
            </ul>;
        }

        return(
            <ul>
                {
                    suggestions.map((item,index) => (<li className="noSearch" key = {index} onClick={() => this.selectingRestaurent(item)}>{`${item.name} - ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );

    }

    selectingRestaurent = (resObj) =>
    {
        this.props.history.push(`/details?restaurent=${resObj._id}`);
    }

    render()
    {
        const {locationData} = this.props;
        return(
            <div>
                 <img src='./Assets/background.jpg' alt=" File Not Found" className='background'/>
    
    <div className ="topsection">
        <div className ="Home_logo">e!</div>
        <div className ="HeaderText">Find the best restaurants, cafes and bars</div>
        <div className ="searchoptions">
            <span>
                <select className ="locationbox" onChange={this.handleLocation}>
                    <option >--Select City--</option>
                    {locationData.map((item) =>
                    {
                        return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                    })};
                    
                    
                </select>
            </span>
            <span className ="SearchBox">
                <input type="text" className ="searchinput" placeholder="Search for restaurants" onChange={this.handleSearch} />  
                {this.showSuggestion()}
            </span>
        </div>
    </div>
            </div>
        )
    }
}

export default withRouter (Wallpaper);
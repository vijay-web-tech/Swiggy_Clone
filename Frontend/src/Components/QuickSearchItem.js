import React from "react"
import { withRouter} from "react-router-dom";
class QuickSearchItem extends React.Component
{
    handleNavigate = (meal) =>
    {
        // eslint-disable-next-line 
    const locationId = sessionStorage.setItem('locationId',locationId);
    if(locationId)
    {
        this.props.history.push(`/filter?mealtype=${meal}&location =${locationId}`);
    }
    else
    {
        this.props.history.push(`/filter?mealtype=${meal}`);
    }
    
    }

    render()
    {
        const {food_name, content, image, meal_type} = this.props.quicksearchitemData;
        console.log(meal_type);
        return(
            
                 <div className ="qs-box" onClick={() => this.handleNavigate(meal_type)}>
                    <div className ="qs-box-contents">
                    <img src={`./${image}`} alt = "File Not Found" className ="qs-images" height="150px" width="150px" />
                    <h4 className ="qs-item-heading">{food_name}</h4>
                    <p className ="qs-item-description">{content}</p>
                    </div>
                </div>

        )
    }
}

export default withRouter (QuickSearchItem);



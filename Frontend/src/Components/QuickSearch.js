import React from "react";

import QuickSearchItem from "./QuickSearchItem";
class QuickSearch extends React.Component
{
    render()
    {
        const {quicksearchData} = this.props;
        return(
        <div>
            <div className ="bottomsection">
                 <h1 className ="qs-heading">Quick Searches</h1>
                 <h3 className ="qs-subheading">Discover restaurants by type of meal</h3>
               <div className ="qs-boxes-container">
                {
                    quicksearchData.map((item) =>
                    {
                        return <QuickSearchItem quicksearchitemData = {item}/> 
                    })
                }
                
               </div>
            </div>
        </div>
        )
    }
}

export default QuickSearch;
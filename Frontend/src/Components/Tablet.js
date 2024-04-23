import React from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import'../styles/tab.css';






class Tablet extends React.Component{
    render(){
        const { resData } = this.props;
    
        return(
            <div>
            <div className="tabs">
                <h3 className="heading">{resData.name}</h3>
                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                    </TabList>
                    <TabPanel className="pannel">
                    <h4 className="Phone">Phone number</h4>
                        <h4>+91 6384027010</h4>
                        <br></br>
                        <h3>The big Chill Cakery</h3>
                        <p>No 5, second cross road, salem <br></br> Tamilnadu 636 105</p>
                        <p>&#8377;{resData.min_price} </p>
                    </TabPanel>
                    <TabPanel className="pannel">
                        <h4 className="Phone">Phone number</h4>
                        <h4>{resData.contact_number}</h4>
                        <br></br>
                        <h3>The big Chill Cakery</h3>
                        <h3>{resData.name}</h3>
                        <p>{resData.address}</p>
                    </TabPanel>
                </Tabs>
            </div>
            <div>
            <button className="btn-order"><a href="https://rzp.io/i/IJC0B4x80">Place online order</a></button>
            </div>
           
</div>
        )
    }
}
export default Tablet;
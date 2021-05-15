import React from "react";
import OperatorHeader from "../components/OperatorHeader";
import OperatorOrderList from "../components/OperatorOrderList";


function OperatorStartPage()
{
    return (
        <div className="content">
            <OperatorHeader />
            <div className="page">
                <OperatorOrderList />
            </div>
        </div>
    )
}


export default OperatorStartPage

import React from "react";
import {Route} from "react-router";
import OperatorStartPage from "./OperatorStartPage";
import OperatorPizzasPage from "./OperatorPizzasPage";
import OperatorOrderPage from "./OperatorOrderPage";
import AdminPage from "./AdminPage";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../selectors";


function RoleDependentRoutes()
{
    const user = useSelector(currentUserSelector);

    if(user == null)
    {
        return <div/>;
    }


    let routesInfo = [];
    if(user.role === "operator") {
        routesInfo = routesInfo.concat([
            {path: "/operator", component: OperatorStartPage},
            {path: "/operator/pizzas", component: OperatorPizzasPage},
            {path: "/operator/order", component: OperatorOrderPage},
        ]);
    } else if(user.role === "admin")
    {
        routesInfo = routesInfo.concat([
            {path: "/admin", component: AdminPage}
        ]);

    }

    return(
        <div>
            {routesInfo.map((routeInfo, i)=>
            {return <Route
                exact
                path={routeInfo.path}
                compnent={routeInfo.component}
                key={i}
            />})}
        </div>
    )



}

export default RoleDependentRoutes

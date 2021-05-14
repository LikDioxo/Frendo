import React from "react";
import {Route, withRouter} from "react-router";
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
    if(user.user_role === "ROLE_OPERATOR") {
        routesInfo = [
            {path: "/operator", component: OperatorStartPage},
            {path: "/operator/pizzas", component: OperatorPizzasPage},
            {path: "/operator/order", component: OperatorOrderPage},
        ]
    } else if(user.user_role === "ROLE_ADMIN")
    {
        routesInfo = [
            {path: "/admin", component: AdminPage}
        ];

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

export default withRouter(RoleDependentRoutes)

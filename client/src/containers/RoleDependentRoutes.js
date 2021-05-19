import React from "react";
import {Route} from "react-router";
import OperatorPizzasPage from "./OperatorPizzasPage";
import OperatorOrderPage from "./OperatorOrderPage";
import OperatorStartPage from "./OperatorStartPage";
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
            {path: '/operator', component: OperatorStartPage},
            {path: '/operator/pizzas', component: OperatorPizzasPage},
            {path: '/operator/order', component: OperatorOrderPage},
        ]
    } else if(user.user_role === "ROLE_ADMIN")
    {
        routesInfo = [
            {path: '/admin', component: AdminPage}
        ];
    }

    return(
        <>
            {routesInfo.map((routeInfo, i)=>
                (<Route
                    exact
                    path={routeInfo.path}
                    component={routeInfo.component}
                    key={i}
            />))}
        </>
    )
}


export default RoleDependentRoutes

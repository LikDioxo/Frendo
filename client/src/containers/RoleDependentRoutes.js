import React from "react";
import {Redirect, Route, useHistory} from "react-router";
import OperatorPizzasPage from "./OperatorPizzasPage";
import OperatorOrderPage from "./OperatorOrderPage";
import OperatorStartPage from "./OperatorStartPage";
import AdminPage from "./AdminPage";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../selectors";


function RoleDependentRoutes()
{
    const user = useSelector(currentUserSelector);
    const history = useHistory()
    // if(user == null)
    // {
    //     return <div/>;
    // }

    let routesInfo = [
        {path: '/operator', component: OperatorStartPage},
        {path: '/operator/pizzas', component: OperatorPizzasPage},
        {path: '/operator/order', component: OperatorOrderPage},
        {path: '/admin', component: AdminPage}
    ];
    // if(user.user_role === "ROLE_OPERATOR") {
    //     routesInfo = [
    //         {path: '/operator', component: OperatorStartPage},
    //         {path: '/operator/pizzas', component: OperatorPizzasPage},
    //         {path: '/operator/order', component: OperatorOrderPage},
    //     ]
    // } else if(user.user_role === "ROLE_ADMIN")
    // {
    //     routesInfo = [
    //         {path: '/admin', component: AdminPage}
    //     ];
    // }

    return(
        <>
            {routesInfo.map((routeInfo, i)=>
                (<Route
                    exact
                    path={routeInfo.path}
                    key={i}>
                        {user == null
                        || (user.user_role === "ROLE_OPERATOR" && history.location.pathname === "/admin")
                        ||(user.user_role === "ROLE_ADMIN" && ["/operator","/operator/pizzas","/operator/order"].some((el)=>history.location.pathname === el)) ?
                            <Redirect exact to="/authenticate" />:<routeInfo.component/>}
                </Route>
                ))}
        </>
    )
}


export default RoleDependentRoutes

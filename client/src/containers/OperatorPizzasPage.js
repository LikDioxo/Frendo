import React, {useEffect} from "react";
import OperatorHeader from "../components/OperatorHeader";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../selectors";
import {getPizzeriaPizzasByOperator} from "../actions";


function OperatorPizzasPage()
{
    let dispatch = useDispatch();

    let user = useSelector(currentUserSelector)
    let user_id = user.user_id;

    useEffect(() => {
        dispatch(getPizzeriaPizzasByOperator(user_id))
    }, [dispatch, user_id])


    return (
        <div className="content">
            <OperatorHeader/>
            <div className="page">
            </div>
        </div>
    )
}


export default OperatorPizzasPage

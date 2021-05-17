import React, {useEffect} from "react";
import OperatorHeader from "../components/OperatorHeader";
import OperatorOrderList from "../components/OperatorOrderList";
import {getOrdersForPizzeria, getPizzeriaByOperator} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector, getOrdersForPizzeriaSelector} from "../selectors";
import {useInterval} from "../hooks";
import Loading from "../components/Loading";


function OperatorStartPage()
{
    let dispatch = useDispatch();

    let user = useSelector(currentUserSelector)
    let user_id = user.user_id;

    useEffect(() => {
        dispatch(getPizzeriaByOperator(user_id))
    }, [dispatch, user_id])

    useInterval(()=>{
            dispatch(getOrdersForPizzeria(user_id))
        },
        5000)

    let orders = useSelector(getOrdersForPizzeriaSelector);

    if(orders === undefined)
    {
        return <Loading/>;
    }

    return (
        <div className="content">
            <OperatorHeader />
            <div className="page">
                <OperatorOrderList orders={Object.values(orders)}/>
            </div>
        </div>
    )
}


export default OperatorStartPage

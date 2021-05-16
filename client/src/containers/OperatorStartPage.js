import React, {useEffect} from "react";
import OperatorHeader from "../components/OperatorHeader";
import OperatorOrderList from "../components/OperatorOrderList";
import {getPizzeriaByOperator} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../selectors";


function OperatorStartPage()
{
    let dispatch = useDispatch();

    let user = useSelector(currentUserSelector)
    let user_id = user.user_id;

    useEffect(() => {
        dispatch(getPizzeriaByOperator(user_id))
    }, [dispatch, user_id])

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

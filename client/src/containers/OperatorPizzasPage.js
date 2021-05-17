import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getPizzeriaPizzasByOperator} from "../actions";
import {currentUserSelector, getAvailablePizzasSelector} from "../selectors";
import OperatorHeader from "../components/OperatorHeader";
import OperatorPizzas from "../components/OperatorPizzas";
import Loading from "../components/Loading";


function OperatorPizzasPage()
{
    let dispatch = useDispatch();

    let user = useSelector(currentUserSelector);
    let user_id = user.user_id;

    useEffect(() => {
        dispatch(getPizzeriaPizzasByOperator(user_id))
    }, [dispatch, user_id]);

    let pizzas = useSelector(getAvailablePizzasSelector);

    if (pizzas === undefined) {
        return <Loading />
    }


    return (
        <div className="content">
            <OperatorHeader/>
            <div className="page">
                <OperatorPizzas operator_id={user_id} pizzas={pizzas}/>
            </div>
        </div>
    )
}


export default OperatorPizzasPage

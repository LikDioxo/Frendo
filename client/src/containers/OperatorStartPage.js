import React, {useEffect} from "react";
import OperatorHeader from "../components/OperatorHeader";
import OperatorOrderList from "../components/OperatorOrderList";
import {
    endPizzaLoading,
    flipUpdateAvailablePizzasModalView,
    getOrdersForPizzeria,
    getPizzeriaByOperator,
    startPizzaLoading, updatePizzeriaAvailablePizzas, updatePizzeriaOrderStatus
} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {
    currentUserSelector,
    getAvailablePizzasOperatorModalView,
    getOrdersForPizzeriaSelector,
    getUpdatedOrderSelector, isLoading
} from "../selectors";
import {useInterval} from "../hooks";
import Loading from "../components/Loading";
import ModalWindow from "../components/ModalWindow";
import AreYouSureModal from "../components/AreYouSureModal";


function OperatorStartPage()
{
    let dispatch = useDispatch();

    let operator_id = useSelector(currentUserSelector).user_id

    useEffect(() => {
        dispatch(getPizzeriaByOperator(operator_id))
    }, [dispatch, operator_id])

    useInterval(()=>{
            dispatch(getOrdersForPizzeria(operator_id))
        },
        5000)

    let orders = useSelector(getOrdersForPizzeriaSelector);
    let show_confirm_window = useSelector(getAvailablePizzasOperatorModalView);
    let updated_order = useSelector(getUpdatedOrderSelector);
    let loading = useSelector(isLoading);

    if(orders === undefined)
    {
        return <Loading/>;
    }

    let onConfirmationModalClose = () => {
        dispatch(flipUpdateAvailablePizzasModalView())
    };

    let onConfirm = () => {
        dispatch(updatePizzeriaOrderStatus(operator_id, updated_order.order_id, updated_order.status))
    };

    let onDeny = () => {
        dispatch(flipUpdateAvailablePizzasModalView())
    };


    return (
        <div className="content">
            <OperatorHeader />
            <div className="page">
                <OperatorOrderList orders={Object.values(orders)}/>

                <ModalWindow
                    handleClose={onConfirmationModalClose}
                    show={show_confirm_window}
                    component={<AreYouSureModal onConfirm={onConfirm} onDeny={onDeny}/>}
                />
                {loading ? <Loading/> : null}
            </div>
        </div>
    )
}


export default OperatorStartPage

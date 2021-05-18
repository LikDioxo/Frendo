import React from "react";
import OperatorHeader from "../components/OperatorHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    currentUserSelector,
    getAvailablePizzasOperatorModalView,
    getDetailOrder,
    getUpdatedOrderSelector
} from "../selectors";
import OperatorOrderDetails from "../components/OperatorOrderDetails";
import OperatorOrderDetailsPizzaList from "../components/OperatorOrderDetailsPizzaList";
import {flipUpdateAvailablePizzasModalView, setUpdatedOrder, updatePizzeriaOrderStatus} from "../actions";
import ModalWindow from "../components/ModalWindow";
import AreYouSureModal from "../components/AreYouSureModal";


function OperatorOrderPage()
{
    let dispatch = useDispatch();

    let detail_order = useSelector(getDetailOrder);
    let operator_id = useSelector(currentUserSelector).user_id;

    let updated_order = useSelector(getUpdatedOrderSelector);
    let show_confirm_window = useSelector(getAvailablePizzasOperatorModalView);

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
            <OperatorHeader/>
            <div className="page">
                <OperatorOrderDetails
                    order_id={detail_order.id}
                    delivery_address={detail_order.delivery_address}
                    phone_number={detail_order.customers_phone_number}
                    total_price={detail_order.total_price}
                    order_status={detail_order.status}
                    onStatusPressed={(status) => {
                        dispatch(flipUpdateAvailablePizzasModalView())
                        dispatch(setUpdatedOrder(detail_order.id, status))}
                    }
                    onPrintPressed
                />
                <OperatorOrderDetailsPizzaList  choices={detail_order.choices}/>

                <ModalWindow
                    handleClose={onConfirmationModalClose}
                    show={show_confirm_window}
                    component={<AreYouSureModal onConfirm={onConfirm} onDeny={onDeny}/>}
                />
            </div>
        </div>
    )
}


export default OperatorOrderPage

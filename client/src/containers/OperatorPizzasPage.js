import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {
    endPizzaLoading,
    flipUpdateAvailablePizzasModalView,
    getPizzeriaPizzasByOperator, startPizzaLoading,
    updatePizzeriaAvailablePizzas
} from "../actions";
import {
    currentUserSelector,
    getAvailablePizzasOperatorModalView,
    getAvailablePizzasSelector,
    getFetchAvailablePizzasSelector, isLoading
} from "../selectors";
import OperatorHeader from "../components/OperatorHeader";
import OperatorPizzas from "../components/OperatorPizzas";
import Loading from "../components/Loading";
import ModalWindow from "../components/ModalWindow";
import AreYouSureModal from "../components/AreYouSureModal";


function OperatorPizzasPage() {
    let dispatch = useDispatch();

    let user = useSelector(currentUserSelector);
    let user_id = user.user_id;

    useEffect(() => {
        dispatch(getPizzeriaPizzasByOperator(user_id))
    }, [dispatch, user_id]);

    let pizzas = useSelector(getAvailablePizzasSelector);
    let show_confirm_window = useSelector(getAvailablePizzasOperatorModalView);
    let fetch_pizzas = useSelector(getFetchAvailablePizzasSelector);
    let loading = useSelector(isLoading);

    let onConfirmationModalClose = () => {
        dispatch(flipUpdateAvailablePizzasModalView())
    };

    let onConfirm = () => {
        dispatch(updatePizzeriaAvailablePizzas(user_id, fetch_pizzas))
    };

    let onDeny = () => {
        dispatch(flipUpdateAvailablePizzasModalView())
    };

    if (pizzas === undefined) {
        return <Loading/>
    }

    return (
        <div className="content">
            <OperatorHeader/>
            <div className="page">
                <OperatorPizzas pizzas={pizzas}/>
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


export default OperatorPizzasPage

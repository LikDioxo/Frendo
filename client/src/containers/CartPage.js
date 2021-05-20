import React, {useEffect} from "react";
import OrderList from "./OrderList";
import {useDispatch, useSelector} from "react-redux";
import {
    getChosenPizzeria,
    getOrder, getOrderSubmitModalView,
    getPizzaChange,
    getPizzeriasModalView,
    getPizzeriasSelector, isLoading,
    isPizzaChange
} from "../selectors";
import Header from "./Header";
import Footer from "../components/Footer";
import ChosenPizzeria from "../components/ChosenPizzeria";
import Post from "../components/Post";
import {
    clearCart, flipOrderSubmitModalView,
    flipPizzeriasModalView,
    getIngredients,
    getPizzerias, setChosenPizzeria,
    unsetPizzaChange,
} from "../actions";
import PizzeriaChoiceModal from "../components/PizzeriaChoiceModal";
import ModalWindow from "../components/ModalWindow";
import OrderSubmit from "../components/OrderSubmit";
import Loading from "../components/Loading";
import PizzaModal from "./PizzaModal";
import Nothing from "../components/Nothing";
import "../assets/css/cart_page.css";
import OrderSubmitModal from "../components/OrderSubmitModal";
import {useHistory} from "react-router";



function CartPage()
{
    const dispatch = useDispatch();
    let history = useHistory()
    useEffect(() =>
    {
        dispatch(getPizzerias());
        dispatch(getIngredients())
    },[dispatch])
    const order = useSelector(getOrder);
    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    const Pizzeria = useSelector(getChosenPizzeria);
    const Pizzerias = useSelector(getPizzeriasSelector);
    const Ingredients = useSelector(getIngredients);
    const PizzaChange = useSelector(isPizzaChange);
    const Pizza = useSelector(getPizzaChange);
    const OrderModalView = useSelector(getOrderSubmitModalView);
    const loading = useSelector(isLoading);

    const handlePizzeriaChange = () => {
        dispatch(flipPizzeriasModalView());
        dispatch(getPizzerias());
    };
    const handlePizzeriasModal = () => {
        dispatch(flipPizzeriasModalView());
    };
    const handlePizzeriaChosen = ({id, address, workload}) => {
        dispatch(setChosenPizzeria(id, address, workload));
        history.push("/")
        dispatch(flipPizzeriasModalView());
        dispatch(clearCart());
    };
    const handlePizzaModalClose = () => {
        dispatch(unsetPizzaChange())
    };
    const handleOrderSubmitModalClose = () => {
        dispatch(flipOrderSubmitModalView())
    };

    if(Pizzerias === undefined || Ingredients === undefined){
        return <Loading/>
    }

    const show_order = [];
    let price = 0;
    for (const item of Object.keys(order.ordered_pizzas)) {
        show_order.push({
            order_id: item,
            id: order.ordered_pizzas[item].id,
            image_name: order.ordered_pizzas[item].image_name,
            name: order.ordered_pizzas[item].name,
            quantity: order.ordered_pizzas[item].quantity,
            price: parseInt(order.ordered_pizzas[item].price),
            }
        )
        price += parseInt(order.ordered_pizzas[item].price);
    }

    return(
        <div className="content">
            <Header/>
            <div className="page">
                {Pizzeria.chosen ?
                    <>
                        <ChosenPizzeria
                            pizzeria_address={Pizzeria.pizzeria_address}
                            order_count={Pizzeria.orders_count}
                            onChange={handlePizzeriaChange}
                        />
                        {show_order.length !== 0 ?
                            <>
                                <OrderList ordered_pizzas={show_order}/>
                                <OrderSubmit order_price={price} onSubmit={handleOrderSubmitModalClose}/>
                            </>
                        : <Nothing text="Корзина пуста."/>
                        }
                    </>
                    : <Post onChoosePizzeria={handlePizzeriasModal} />
                }

                <ModalWindow
                    handleClose={handlePizzeriasModal}
                    show={PizzeriasModalView}
                    component={
                        <PizzeriaChoiceModal
                            onPizzeriaChosen={handlePizzeriaChosen}
                            addresses={Pizzerias}
                        />
                    }
                />
                <ModalWindow
                    handleClose={handlePizzaModalClose}
                    show={PizzaChange}
                    component={<PizzaModal pizza={Pizza} change={true}/>}
                />
                <ModalWindow
                    handleClose={handleOrderSubmitModalClose}
                    show={OrderModalView}
                    component={
                        <OrderSubmitModal total_price={price}/>
                    }
                />
                {loading ? <Loading/> : null}

            </div>
            <Footer/>
        </div>
    )
}


export default CartPage;

import React from "react";
import OrderList from "./OrderList";
import {useDispatch, useSelector} from "react-redux";
import {getChosenPizzeria, getOrder, getPizzeriasModalView, getPizzeriasSelector} from "../selectors";
import Header from "./Header";
import Footer from "../components/Footer";
import ChosenPizzeria from "../components/ChosenPizzeria";
import Post from "../components/Post";
import {flipPizzeriasModalView, getPizzerias, setChosenPizzeria, unsetSelectedPizza} from "../actions";
import PizzeriaChoiceModal from "../components/PizzeriaChoiceModal";
import ModalWindow from "../components/ModalWindow";
import OrderSubmit from "../components/OrderSubmit";
import "../assets/css/cart_page.css";


function CartPage()
{
    const dispatch = useDispatch();

    const order = useSelector(getOrder);
    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    const Pizzeria = useSelector(getChosenPizzeria);
    const Pizzerias = useSelector(getPizzeriasSelector);

    const handlePizzeriaChange = () => {
        dispatch(flipPizzeriasModalView());
        dispatch(getPizzerias());
    }
    const handlePizzeriasModal = () => {
        dispatch(flipPizzeriasModalView());
    };
    const handlePizzeriaChosen = ({id, address, workload}) => {
        dispatch(setChosenPizzeria(id, address, workload));
        dispatch(flipPizzeriasModalView());
    };


    const show_order = [];
    let price = 0;
    for (const item in order.ordered_pizzas) {
        show_order.push({
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
                        <OrderList ordered_pizzas={show_order}/>
                        <OrderSubmit order_price={price}/>
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
            </div>
            <Footer/>
        </div>
    )
}


export default CartPage;
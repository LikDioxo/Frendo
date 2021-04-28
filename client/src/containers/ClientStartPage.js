import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {flipPizzeriasModalView} from "../actions";
import {getPizzeriasModalView} from "../selectors";
import Header from "./Header";
import ModalWindow from "../components/ModalWindow";
import PizzeriaChoiceModal from "../components/PizzeriaChoiceModal";
import Post from "../components/Post";
import Footer from "../components/Footer";
import {withRouter} from "react-router";


function ClientStartPage() {
    const dispatch = useDispatch();
    const handlePizzeriasModal = useCallback(
        () => dispatch(flipPizzeriasModalView()),
        [dispatch]
    );
    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    return (
        <div className="content">
            <Header />
            <div className="page">
                <ModalWindow
                    handleClose={handlePizzeriasModal}
                    show={PizzeriasModalView}
                    component={<PizzeriaChoiceModal addresses={[["Донбасс", 42]]} />}
                />
                <Post onChoosePizzeria={handlePizzeriasModal} />
            </div>
            <Footer />
        </div>
    );
}


export default withRouter(ClientStartPage);
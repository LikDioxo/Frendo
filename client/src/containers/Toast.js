import React from "react";
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from "react-toasts";
import {getToasts} from "../selectors";
import {useSelector} from "react-redux";




function Toast()
{
    let toast = useSelector(getToasts);



    if (toast !== null) {

        if (toast.type === 'success') {
            ToastsStore.success(toast.message);
        }
        else if (toast.type === 'error') {
            ToastsStore.error(toast.message);
        }
    }

    return <ToastsContainer  store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT}/>


}

export default Toast;
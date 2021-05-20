import { useRef, useEffect } from 'react'


export function useInterval(callback, delay) {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) {
            return
        }

        const id = setInterval(() => savedCallback.current(), delay)

        return () => clearInterval(id)
    }, [delay])
}

// export function useAuthenticate()
// {
//     const user = useSelector(currentUserSelector)
//     let history = useHistory()
//
//     if(user === null
//         || (user.user_role === "ROLE_OPERATOR" && history.location.pathname === "/admin")
//         ||(user.user_role === "ROLE_ADMIN" && ["/operator","/operator/pizza","/operator/order"].some((el)=>history.location.pathname === el))
//     )
//     {
//         history.push("/authenticate")
//     }
//
//
// }

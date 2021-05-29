import React from "react"
import "./Error.css"
import {Link} from "react-router-dom";

export const Error = ({errMsg}) => {

    if (!errMsg){
        errMsg =  'Данная страница не существует.'
    }
    return(
        <div className="wrong notice--wrong">
            {errMsg}<Link to="/">Вернуься на главную страницу</Link>
        </div>
    )
}
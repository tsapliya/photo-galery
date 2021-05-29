import React from "react"
import './main.css'
import {useRoutes} from "./router";
import {BrowserRouter as Router} from "react-router-dom";

function App() {

    const Routes = useRoutes(false)

    return (
        <Router>
            <h1 className="main-title">Фото галерея</h1>
            <h2 className="main-title">Тестовое задание</h2>
            <div>
                {Routes}
            </div>
        </Router>
    )
}

export default App

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
            <div className="content">
                {Routes}
            </div>
            <footer className="footer">
                Тестовое задание для Elfsight <br/>
                разработчик Сергей Ермишев <br/>
                сслыки:<br/>
                <a href="https://vk.com/tsapliya"> Vk</a>
                <a href="https://github.com/tsapliya"> GitHub</a>
                <a href="mailto:s.ermishev@icloud.com">s.ermishev@icloud.com</a>

            </footer>
        </Router>
    )
}

export default App

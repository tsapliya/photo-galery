import React, {useState, useEffect} from "react"
import "./AuthorStyles.css"
import {Link} from "react-router-dom";
import {Error} from "../Error/Error";

export const AuthorList = () => {

    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        try {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(result => setAuthorList(result))
        } catch (err) {
            console.log(err)
            return (Error)
        }


    }, [])

    return (
        <div className="author-container">
            <span className="author-title">Список авторов:</span>
            <div className="author-list">
                {authorList.map((author) => {
                    return (<Link
                        key={author.id}
                        to={{
                            pathname: `/${author.username}`,
                            state: {
                                id: author.id,
                                name: author.name,
                                phone: author.phone,
                                website: author.website
                            }
                        }}
                        className="author-link btn btn--text">
                        {author.name}
                    </Link>)
                })}
            </div>
        </div>
    )
}
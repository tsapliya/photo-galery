import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthorList} from "./components/Authors/AuthorList";
import {AlbumsList} from "./components/Albums/AlbumsList";
import {PhotoList} from "./components/Photos/PhotoList";
import {Error} from "./components/Error/Error";



export const useRoutes = () => {

        return (
            <Switch>
                <Route path="/" exact component={AuthorList} />
                <Route path="/:author" exact component={AlbumsList} />
                <Route path="/:author/:photo" exact component={PhotoList} />
                <Route path="/" component={Error} />
            </Switch>


        )
}
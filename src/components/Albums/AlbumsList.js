import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import "./Album.css"
import {Error} from "../Error/Error";
import {Load} from "../Load/Load";

export const AlbumsList = ({match, location}) => {

    const [content, setContent] = useState(<Load/>)

    const data = {
        users: [],
        albums: [],
        photos: [],
        authorId: null,
        currentAlbumsList: [],
        authorInfo: {
            authorName: match.params.author
        }
    }

    const loadAllData = async () => {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(result => data.users = result)
        await fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(result => data.albums = result)
        await fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(result => data.photos = result)
        main()
    }

    function isCurrectAuthorName() {
        return data.users.find(user => user.username === data.authorInfo.authorName) !== undefined
    }

    function getAuthorId() {
        if (location.state !== undefined && location.state.id) {
            return location.state.id
        } else {
            return data.users.find(user => user.username === data.authorInfo.authorName).id
        }
    }

    function getAlbumListByAuthorId(authorId) {
        return data.albums.filter(album => album.userId === authorId)
    }

    function getMoreInfo(albumsList) {
        albumsList.forEach(album => {
            const photoCurrentAlbumList = data.photos.filter(photo => album.id === photo.albumId)
            album.countPhoto = photoCurrentAlbumList.length
            album.photoPreview = photoCurrentAlbumList[0].thumbnailUrl
        })
        return albumsList
    }

    function getAuthorInfo(authorId, authorInfo = {}) {

        const author = data.users.find(user => user.id === authorId)
        const currentAlbumsId = data.currentAlbumsList.map(album => album.id)
        const info = {
            countPhotoTotal: data.photos.filter(photo => currentAlbumsId.indexOf(photo.albumId) >= 0).length,
            countAlbums: data.currentAlbumsList.length,
            authorPhone: author.phone,
            authorWebsite: author.website
        }
        return {...authorInfo, ...info}
    }

    function main() {
        if (!isCurrectAuthorName()) {
            setContent(<Error errMsg="Некорректный url. "/>)
            return false
        }

        data.authorId = getAuthorId()
        data.currentAlbumsList = getAlbumListByAuthorId(data.authorId)
        data.currentAlbumsList = getMoreInfo(data.currentAlbumsList)
        data.authorInfo = getAuthorInfo(data.authorId, data.authorInfo)

        setContent(template(data))

    }

    function ct(val) {
        if (val) {
            return val
        } else return ''
    }

    useEffect(() => {
        loadAllData()
    }, [])


    function template({currentAlbumsList, authorInfo, photos}) {
        return (
            <div className="AlbumContainer">
                <Link className="back-to-authors btn btn--text" to="/">🔙 К списку авторов</Link>
                <div className="albums-info">
                    <li>Имя Автора: {ct(authorInfo.authorName)}</li>
                    <li>Телефон: {ct(authorInfo.authorPhone)}</li>
                    {authorInfo.authorWebsite
                        ? (<li>Сайт: <a href={'http://' + authorInfo.authorWebsite}>{authorInfo.authorWebsite}</a></li>)
                        : ''}
                    <li>Количество альбомов: {ct(authorInfo.countAlbums)}</li>
                    <li>Общее число фотографий: {ct(authorInfo.countPhotoTotal)}</li>
                </div>

                <div className="album-list">
                    {
                        currentAlbumsList.map(album => {
                            return (
                                <Link key={album.id}
                                      className="album btn "
                                      to={{
                                          pathname: match.url.substr(-1) === '/'
                                              ? match.url + album.id
                                              : match.url + '/' + album.id,
                                          state: {photos}
                                      }}>
                                    <img alt={album.title} src={album.photoPreview}/>
                                    <div className="album-info">
                                        <li> {album.title}</li>
                                        <div className="count-photo"> ({album.countPhoto})</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (<div>
        {content}
    </div>)
}
import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import "./Album.css"
import {Error} from "../Error/Error";

export const AlbumsList = ({match, location}) => {

    const authorUsername = match.params.author

    const [albumsList, setAlbumsList] = useState([])
    const [photoList, setPhotoList] = useState([])
    const [errors, setErrors] = useState([])
    const [albumInfo, setAlbumInfo] = useState({
        countPhoto: 0,
        countAlbums: 0,
        authorName: '',
        authorPhone: '',
        authorWebsite: ''
    })
    let authorId

    const addErrors = (error) => {
        setErrors([...errors, error])
    }

    const addAlbumInfo = (change = {}) => {
        setAlbumInfo({...albumInfo, ...change})
    }

    const setAuthorIdByUsername = (username) => {
        try {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(result => {
                const currentAuthor = result.find(author => author.username === username)
                if (currentAuthor === undefined){
                    addErrors('Некорректный url. ')
                    return false
                }
                authorId = currentAuthor.id

                addAlbumInfo({
                    authorName: currentAuthor.name,
                    authorPhone: currentAuthor.phone,
                    authorWebsite: currentAuthor.website
                })
            })
        } catch (err){
            addErrors(err)
        }
    }

    useEffect(() => {
        if (location.state !== undefined && location.state.id){
            authorId = location.state.id
            addAlbumInfo({
                authorName: location.state.name,
                authorPhone: location.state.phone,
                authorWebsite: location.state.website
            })
        } else {
            setAuthorIdByUsername(authorUsername)
        }
    }, [])

    useEffect(() => {
        try {
            fetch('https://jsonplaceholder.typicode.com/albums')
                .then(response => response.json())
                .then(result => setAlbumsList(result.filter(album => album.userId === authorId)))
        } catch (err) {
            addErrors(err)
        }
    }, [])

    useEffect(() => {
            try {
                fetch('https://jsonplaceholder.typicode.com/photos')
                    .then(response => response.json())
                    .then(result => {
                        const albumsCurrentAuthorListId = albumsList.map(album => album.id)
                        const photoCurrentAuthorList = result.filter(photo =>
                            albumsCurrentAuthorListId.indexOf(photo.albumId) >= 0
                        )
                        setPhotoList(photoCurrentAuthorList)
                        addAlbumInfo({
                            countPhoto: photoCurrentAuthorList.length,
                            countAlbums: albumsCurrentAuthorListId.length
                        })
                    })
            } catch (err) {
                addErrors(err)
            }

    }, [albumsList])

    useEffect(() => {
        if (photoList.length > 0 && albumsList.length > 0){

            albumsList.forEach(album => {
                const photoCurrentAlbumList = photoList.filter(photo => album.id === photo.albumId)
                album.countPhoto = photoCurrentAlbumList.length
                album.photoPreview = photoCurrentAlbumList[0].thumbnailUrl

            })
        }
    }, [photoList, albumsList])

    if (errors.length > 0){
       errors.forEach(errMsg => console.error(errMsg))
       return (errors.map((errMsg, i) => (<Error key={i} errMsg={errMsg} />)))
    }
    return(
        <div className="AlbumContainer">

                <Link className="back-to-authors btn btn--text" to="/" >🔙 К списку авторов</Link>
                <div className="albumInfo">
                    {albumInfo.authorName ? (<li>Имя Автора: {albumInfo.authorName}</li>) : ''}
                    {albumInfo.authorPhone ? (<li>Телефон: {albumInfo.authorPhone}</li>) : ''}
                    {albumInfo.authorWebsite
                        ? (<li>Сайт: <a href={'http://' + albumInfo.authorWebsite}>{albumInfo.authorWebsite}</a> </li>)
                        : ''}
                    {albumInfo.countAlbums ? (<li>Количество альбомов: {albumInfo.countAlbums}</li>) : ''}
                    {albumInfo.countPhoto ? (<li>Общее число фотографий: {albumInfo.countPhoto}</li>) : ''}
                </div>

            <div className="albumList">
                {
                    albumsList.map(album => {
                        return(
                            <Link key={album.id}
                                  className="album btn "
                                  to={{
                                      pathname: match.url.substr(-1) === '/'
                                        ? match.url + album.id
                                        : match.url + '/' + album.id,
                                      state: {photoList}
                                  }}>
                                <img alt={album.title} src={album.photoPreview}/>
                                <div className="album-info">
                                    <li> {album.title}</li>
                                    <li> Количество фото {album.countPhoto}</li>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
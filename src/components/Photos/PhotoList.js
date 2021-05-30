import React, {useState, useEffect} from "react"
import "./Photo.css"
import {Link} from "react-router-dom";
import {Error} from "../Error/Error";
import {PopUp} from "./PopUp";

export const PhotoList = ({match, location}) => {

    const albumId = Number(match.params.photo)
    const author = match.params.author
    const [photoList, setPhotoList] = useState([])
    const [errors, setErrors] = useState([])
    const [shadowShow, setShadowShow] = useState(false)
    const [popUpComponent, setPopUpComponent] = useState()

    const addErrors = (error) => {
        setErrors([...errors, error])
    }

    useEffect(() => {
        if (location.state){
            setPhotoList(location.state.photoList.filter(photo => photo.albumId === albumId))
        } else {
            fetch('https://jsonplaceholder.typicode.com/photos')
                .then(response => response.json())
                .then(result => {
                    const findedPhotos = result.filter(photo => photo.albumId === albumId)
                    if (findedPhotos.length > 0){
                        setPhotoList(findedPhotos)
                    } else {
                        addErrors('Альбом не существует. ')
                    }


                })
        }
    }, [])

    if (errors.length > 0){
        errors.forEach(errMsg => console.error(errMsg))
        return (errors.map((errMsg, i) => (<Error key={i} errMsg={errMsg} />)))
    }

    const popUpRender = (photoId, e) => {

        document.querySelector('body').style.position = 'fixed'
        setShadowShow(true)
        setPopUpComponent(
            <PopUp currentPhoto={photoId} photoList={photoList} />
        )

    }

    const popUpClose = () => {
        document.querySelector('body').style.position = 'inherit'
        setShadowShow(false)
        setPopUpComponent()
    }


    return(
        <div>
            <div onClick={() => popUpClose()} className={shadowShow ? 'shadow shadow--show' : 'shadow shadow--hide' }>
                <div className="closePopUp">x</div>
                {popUpComponent}
            </div>
            <Link to={'/' + author} className="btn btn--text back-to-albums">🔙 К списку альбомов</Link>
            <div className="photo-list">
            {
                photoList.map((photo, id) => {
                    return (
                        <div className="photo" key={id}>
                            <img onClick={() => {popUpRender(id)}} alt={photo.title} src={photo.thumbnailUrl}/>
                            <div className="photo-title">{photo.title}</div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
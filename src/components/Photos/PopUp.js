import React, {useState, useEffect} from "react"
import "./Photo.css"

export const PopUp = (data) => {

    const [currentPhoto, setCurrentPhoto] = useState(Number(data.currentPhoto) + 1, )

    const nextPhoto = () => {
        if (currentPhoto >= data.photoList.length){
            setCurrentPhoto(1)
        } else {
            setCurrentPhoto(currentPhoto + 1)
        }
    }

    const prevPhoto = () => {
        if (currentPhoto < 1){
            setCurrentPhoto(data.photoList.length)
        } else {
            setCurrentPhoto(currentPhoto - 1)
        }
    }

    useEffect(() => {
        if (currentPhoto < 1 || currentPhoto >= data.photoList.length ){
            setCurrentPhoto(1)
        }
    }, [])
    return (
        <div className="popUp">
            <img alt={data.photoList[currentPhoto].title} src={data.photoList[currentPhoto].url}/>
            <div className="nextPhoto" onClick={() => nextPhoto()}></div>
            <div className="prevPhoto" onClick={() => prevPhoto()}></div>
            <div className="info">
                <li>{currentPhoto + '/' + data.photoList.length}</li>
                <li> {data.photoList[currentPhoto].title}</li>

            </div>
        </div>
    )
}
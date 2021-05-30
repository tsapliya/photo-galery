import React, {useState} from "react"
import "./Photo.css"

export const PopUp = (data) => {

    const isCorrectIdVal = () => {
        return Number(data.currentPhoto) + 1 < data.photoList.length && Number(data.currentPhoto) > 0
    }
    const [currentPhoto, setCurrentPhoto] = useState(isCorrectIdVal() ? Number(data.currentPhoto) : 0)

    const nextPhoto = () => {
        if (currentPhoto + 1 >= data.photoList.length) {
            setCurrentPhoto(0)
        } else {
            setCurrentPhoto(currentPhoto + 1)
        }
    }

    const prevPhoto = () => {
        setCurrentPhoto(data.photoList.length)
        if (currentPhoto <= 0) {
            setCurrentPhoto(data.photoList.length - 1)
        } else {
            setCurrentPhoto(currentPhoto - 1)
        }
    }

    return (
        <div onClick={e => e.stopPropagation()} className="popUp">
            <img alt={data.photoList[currentPhoto].title} src={data.photoList[currentPhoto].url}/>
            <div className="nextPhoto" onClick={() => nextPhoto()}> {'>'} </div>
            <div className="prevPhoto" onClick={() => prevPhoto()}> {'<'} </div>
            <div className="pop-up-info">
                <div className="counter-photo">{currentPhoto + 1 + '/' + data.photoList.length}</div>
                <div className="pop-up-info-title"> {data.photoList[currentPhoto].title}</div>

            </div>
        </div>
    )
}
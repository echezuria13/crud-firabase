
import React, { useEffect, useState, } from 'react'

import { appFirebase } from '../firebase'
import {getFirestore, doc, getDoc } from 'firebase/firestore'

const db = getFirestore(appFirebase)


const LinkForm = (props) => {

    // initial form state

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    }

    // second: we created State where is it stored the value of the inputs

    const [values, setvalues] = useState(initialStateValues)

    // third: function that linten the change of the inputs

    const handleInputChange = (e) => {
       // console.log(e.target.name)
       // console.log(e.target.value)
        const {name, value} = e.target;
        setvalues({...values,
                    [name]: value 
        });
    }
    
    // fourth: we created a function that sends the form. This function it will be sent as props

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(values)

        props.addOrEditLink(values); 

        setvalues({...initialStateValues})

       // e.target.reset()
    }


    // funcion que pinta el value segun boton editar

    const getLinkById = async (id) => {

        const docRef = doc(db, "links", id)
        const docSnap = await getDoc(docRef)
    
        //console.log(docSnap.data())

        setvalues({...docSnap.data()})

    }


    useEffect(() => {
        console.log(props.currentId)
        if(props.currentId === ""){
            setvalues({...initialStateValues})
        }else{
            getLinkById(props.currentId)
        }

    }, [props.currentId])

    // first created template web 
    return (
        <form className='card card-body' onSubmit={handleSubmit}>
            <div className="form-group input-group mb-3">
                <div className="input-group-text bg-light"> 
                    <i className="material-icons">insert_link</i>
                </div>
                <input 
                    type="text" 
                    className='form-control' 
                    placeholder='https://example.com' 
                    name='url'
                    onChange={handleInputChange}
                    value={values.url}
                    />
            </div>
            <div className="form-group input-group mb-3">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input 
                    type="text" 
                    className='form-control' 
                    name='name' 
                    placeholder='Website Name' 
                    onChange={handleInputChange}
                    value={values.name}
                    />
            </div>
            <div className="form-group mb-3">
                <textarea 
                    name="description"  
                    rows="3" 
                    className='form-control'
                    placeholder='Whrite a description'
                    onChange={handleInputChange}
                    value={values.description}
                    >
                </textarea>
            </div>
            <button className='btn btn-primary btn-block'>
                save
            </button>
        </form>
    )
}

export default LinkForm
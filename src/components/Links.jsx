import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import Swal from 'sweetalert2'

import { appFirebase } from '../firebase'
import {getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'


const db = getFirestore(appFirebase)

const Links = () => {

  const [links, setLinks] = useState([])

  
  const [currentId, setCurrentId] = useState("")


  const addOrEditLink = async (linkObject/*values*/) =>{

    //console.log(linkObject)   este es el objeto que viene desde LinkForm y se pasa como parametro (values)

    try {

      await addDoc(collection(db, 'links'),{
        ...linkObject
      });
  
      console.log("Nueva tarea guardada")

      Swal.fire('Your link has been created')

      
    } catch (error) {
      console.log(error)
    }  

  }




  const onDeleteLink = async (id) => {
    if(window.confirm("Are you sure you want delete this link?")){
      await deleteDoc(doc(db, "links", id));
      Swal.fire('Your link has been removed successfuly')
    }
      
  }



  const getLinks = async () => {
    
    onSnapshot(collection(db, "links"), (snapshot) => {
      //console.log(snapshot.docs.map(doc => doc.data()))
      
      const docs = [] 
      snapshot.docs.map(doc => {
        //console.log(doc.data())
        //console.log(doc.id)
        docs.push({...doc.data(), id:doc.id})
        //console.log(docs)
      })
      setLinks(docs)
    })
  }
  


  useEffect(() => {
    
    console.log('getting data') 

    getLinks();     

    }, [])


    
  return (
    <div >
        <div className='col-md-4 mb-2'>
          <LinkForm {...{addOrEditLink, currentId, links}}/>
        </div>
      <div className="col-md-4 mb-1">
        {links.map(link => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i className="material-icons text-danger"  onClick={() => onDeleteLink(link.id)}>close</i>
                  <i className="material-icons"  onClick={() => setCurrentId(link.id)}>create</i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
            </div>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default Links
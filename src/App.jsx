import { useState, useEffect } from 'react'
import axios from 'axios'
import Detail from './Detail'
import Form from './Form'

function App() {
  const [atcAry, setAtcAry] = useState([])
  const [respDtl, setRespDtl] = useState("")

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/articles`)
      .then(response => {
        console.log(response.data.articles)
        setAtcAry(response.data.articles)
      })
  }, [])

  const dtlShow = async (id) => {
    await
      axios
        .get(`http://localhost:8000/api/articles/${id}`)
        .then(response => {
          //console.log("resp is ----" + JSON.stringify(response.data.detail))
          setRespDtl(response.data.detail)
          //console.log(respDtl)
        })
  }

  const add = (title, body, category_id) => {
    const tt = title
    const bd = body
    const cid = category_id

    const postData = {
      title: tt,
      body: bd,
      category_id: cid
    };

    axios
      .post(`http://localhost:8000/api/articles`, postData)
      .then(response => {
        //console.log("resp is ----" + JSON.stringify(response.data.detail))
        console.log(response.data)
        setAtcAry([...atcAry, response.data.newArtFacts])
        //console.log(respDtl)
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  }

  return (
    <>
      <h3>Articles</h3>
      <ul>
        {atcAry.map(atc =>
          <li key={atc.id} > <b>Article Title: </b>{atc.title} <b>Category: </b> {atc.category ? atc.category.name : ""}
            <button onClick={() => dtlShow(atc.id)}>detail</button>
          </li>
        )}
      </ul >

      <h3>Detail</h3>
      <Detail id={respDtl.id} title={respDtl.title} body={respDtl.body} cat={respDtl.category ? respDtl.category.name : ""} />
      <h3>Add new article</h3>
      <Form add={add} />
    </>
  )
}

export default App

import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Detail from './Detail'
import AddForm from './AddForm'
import UpdForm from './UpdForm'

const UpdFormContext = createContext();
const AddFormContext = createContext();

function App() {
  const [atcAry, setAtcAry] = useState([])
  const [respDtl, setRespDtl] = useState("")
  const [updid, setUpdid] = useState(0)
  const [art, setArt] = useState("")
  const [cat, setcat] = useState("")
  const [cats, setcats] = useState([])
  //const [show, setShow] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/articles`)
      .then(response => {
        //console.log("aaa")
        //console.log(response.data.articles)
        setAtcAry(response.data.articles)
      })

    axios
      .get(`http://localhost:8000/api/categories`)
      .then(response => {
        //console.log("bbb")
        setcats(response.data)
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

  const btnclr = () => { setRespDtl("") }

  const delOp = async (id) => {
    await
      axios
        .delete(`http://localhost:8000/api/articles/${id}`)
        .then(response => {
          //console.log("resp is ----" + JSON.stringify(response.data.detail))
          setAtcAry(response.data)
          //console.log(respDtl)
        })
  }

  const updPre = (id, title, body, category_id, category) => {
    //setShow(!show)
    setUpdid(id)
    setArt({ title: title, body: body, category_id: category_id })
    setcat(category)
    //console.log(art)
  }

  const add = (title, body, category_id) => {
    const postData = {
      title: title,
      body: body,
      category_id: category_id
    };

    axios
      .post(`http://localhost:8000/api/articles`, postData)
      .then(response => {
        //console.log("resp is ----" + JSON.stringify(response.data.detail))
        console.log(response.data)
        setAtcAry([...atcAry, response.data.newArtFacts])
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  }

  return (
    <>
      {/* {show &&
        <div>
          <h3>Update Form</h3>
          <UpdFormContext.Provider value={{ atcArySt: [atcAry, setAtcAry], updidSt: [updid, setUpdid], artSt: [art, setArt], showSt: [show, setShow] }}>
            <UpdForm ctx={UpdFormContext} />
          </UpdFormContext.Provider >
        </div>
      } */}

      <div>
        <h3>Update Form</h3>
        <UpdFormContext.Provider value={{ atcArySt: [atcAry, setAtcAry], updidSt: [updid, setUpdid], artSt: [art, setArt], catSt: [cat, setcat], catsSt: [cats, setcats] }}>
          <UpdForm ctx={UpdFormContext} />
        </UpdFormContext.Provider >
      </div >

      <h3>Articles</h3>
      <ul>
        {atcAry.map(atc =>
          <li key={atc.id} > <b>Article Title: </b>{atc.title ? atc.title : ""} <b>Category: </b> {atc.category ? atc.category.name : ""}
            <button onClick={() => dtlShow(atc.id)}>detail</button>
            <button onClick={() => delOp(atc.id)}>delete</button>
            {/* <button onClick={() => updPre(atc.id, atc.title, atc.body, atc.category_id)}>edit</button> */}
            <button onClick={() => updPre(atc.id, atc.title, atc.body, atc.category_id, atc.category)}>edit</button>
          </li>
        )}
      </ul >

      <h3>Detail</h3>
      <Detail id={respDtl.id} title={respDtl.title} body={respDtl.body} cat={respDtl.category ? respDtl.category.name : ""} btnclr={btnclr} />
      <h3>Add new article</h3>
      {/* <AddForm add={add} /> */}
      <AddFormContext.Provider value={{ catSt: [cat, setcat], catsSt: [cats, setcats] }}>
        <AddForm ctx={AddFormContext} add={add} />
      </AddFormContext.Provider >
    </>
  )
}

export default App

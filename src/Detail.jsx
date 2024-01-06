import { useState } from "react"

const Detail = (props) => {

  return (
    <>
      <p>id: {props.id}</p>
      <p>title: {props.title}</p>
      <p>body: {props.body}</p>
      <p>cat: {props.cat}</p>
      <button onClick={props.btnclr} >clear</button>
    </>
  )
}

export default Detail

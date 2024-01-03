import { useState } from "react"

const Detail = (props) => {

  return (
    <>
      <p>id: {props.id}</p>
      <p>title: {props.title}</p>
      <p>body: {props.body}</p>
      <p>cat: {props.cat}</p>
    </>
  )
}

export default Detail

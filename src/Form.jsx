import { useRef } from "react"

const Form = (props) => {
  const titleref = useRef();
  const bodyref = useRef();
  const cateref = useRef();

  return (
    <form onSubmit={e => {
      e.preventDefault();

      props.add(
        titleref.current.value,
        bodyref.current.value,
        cateref.current.value
      );

      titleref.current.value = ""
      bodyref.current.value = ""
      cateref.current.value = ""
    }}>

      <input type="text" ref={titleref} /> <br />
      <input type="text" ref={bodyref} /> <br />
      <input type="text" ref={cateref} /> <br />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form

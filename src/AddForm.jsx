import { useRef, useState, useEffect, useContext } from "react"
import axios from "axios"

const AddForm = (props) => {
  const { catSt, catsSt } = useContext(props.ctx);
  const [cat, setcat] = catSt;
  const [cats, setcats] = catsSt;

  // const [cat, setcat] = useState("")
  // const [cats, setcats] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/categories`)
  //     .then(response => {
  //       console.log(response.data)
  //       setcats(response.data)
  //     })
  // }, [])

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
      //cateref.current.value = ""
      setcat("")
    }}>

      Title: <input type="text" ref={titleref} /> <br />
      Body: <input type="text" ref={bodyref} /> <br />
      {/* Category id: <input type="text" ref={cateref} /> <br /> */}
      <label>Category:</label>
      <select value={cat} ref={cateref} onChange={(e) => setcat(e.target.value)} >
        <option value="">Select a category</option>
        {cats.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select><br />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddForm

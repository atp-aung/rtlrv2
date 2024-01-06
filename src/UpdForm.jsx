import axios from "axios";
import { useContext } from "react"

const UpdForm = ({ ctx }) => {
  const { atcArySt, updidSt, artSt, showSt } = useContext(ctx);
  const [atcAry, setAtcAry] = atcArySt;
  const [updid, setUpdid] = updidSt;
  const [art, setArt] = artSt
  //const [show, setShow] = showSt;

  const handleInputChange = event => {
    const { name, value } = event.target;
    setArt(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await
      axios
        .put(`http://localhost:8000/api/articles/${updid}`, { title: art.title, body: art.body, category_id: art.category_id })
        .then(response => {
          console.log(response)
          console.log(response.data)
          console.log("succ updated")
          setAtcAry(response.data.updated)
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        });
    //setShow(!show)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={art.title || ""}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Body:
        <textarea
          name="body"
          value={art.body || ""}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Category ID:
        <input
          type="text"
          name="category_id"
          value={art.category_id || ""}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default UpdForm

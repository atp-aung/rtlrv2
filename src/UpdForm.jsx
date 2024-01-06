import axios from "axios";
import { useContext, useState } from "react"

const UpdForm = (props) => {
  const { atcArySt, updidSt, artSt, showSt, catSt, catsSt } = useContext(props.ctx);
  const [atcAry, setAtcAry] = atcArySt;
  const [updid, setUpdid] = updidSt;
  const [art, setArt] = artSt;
  const [cat, setcat] = catSt;
  const [cats, setcats] = catsSt;
  const [alsubmit, setalsubmit] = useState(false);

  //console.log("ccc" + cat)

  const handleInputChange = event => {
    //setcat(event.target.value)
    const { name, value } = event.target;
    //console.log(name + "---" + value)
    setArt(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setalsubmit(true)
  };

  const handleInputChangee = event => {
    setcat(event.target.value)
    const { name, value } = event.target;
    //console.log(name + "---" + value)
    setArt(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setalsubmit(true)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(art)
    await
      axios
        .put(`http://localhost:8000/api/articles/${updid}`, { title: art.title, body: art.body, category_id: art.category_id })
        .then(response => {
          //console.log(response)
          //console.log(response.data)
          console.log("succ updated")
          setAtcAry(response.data.updated)
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        });
    setArt("")
    setcat("")
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
      {/* <label>
        Category ID:
        <input
          type="text"
          name="category_id"
          value={art.category_id || ""}
          onChange={handleInputChange}
        />
      </label>
      <br /> */}
      <p>current category: {cat.name}</p>
      <label>Category:</label>
      <select name="category_id" value={cat} onChange={handleInputChangee} >
        <option value="">Select a category</option>
        {cats.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select><br />
      <button type="submit" disabled={!alsubmit}>Submit</button>
    </form>
  )
}

export default UpdForm

import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)
  const [title ,setTitle]=useState("")
  const [content,setContent]=useState("")
  const [notes,setNotes]=useState([])

  async function getNotes() {
     const response=await axios({
      method:"get",
      url:"http://localhost:3100/notes",
      
    })  
     setNotes(response.data.data)  
  }

  async function addNote (){
    await axios({
      method:"post",
      url:"http://localhost:3100/add",
      data:{
        id:Math.random().toString(),
        title:title,
        content:content,
      }
    })  
    setContent("")
  setTitle("")
  getNotes()
  

  }
  useEffect(()=>{
     getNotes()
  },[])

  return (
    <>
      <div className="form">
        <input value ={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
         type="tex)t"
          placeholder="title" />
        <input value={content}
        onChange={(e)=>{
          setContent(e.target.value)
        }}
        content="content"
         type="text" 
         placeholder="content" />
        <button onClick={addNote}>ADD</button>
      </div>
      <div className="notes">
        {
          notes.map((element)=>{
            return <div> key={element.id}
              <h2>{element.title}</h2>
              <p>{element.content}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App

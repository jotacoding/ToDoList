import { useEffect,useState } from "react";
import "./Home.css";
// import Form from "../components/Form/Form";
const Home = () => {
  let [lista, setLista] = useState([]);
  let [novoItem, setNovoItem] = useState("");

  const baseURL= 'http://localhost:8000/Tarefas'; //url db.json

  //ACHAR TODAS AS TAREFAS
  async function findAllTarefas(){
    const response = await fetch(baseURL)
    const tarefas = await response.json() 
   setLista([...tarefas])
}
  
  useEffect(() =>{  
   findAllTarefas()
  },[])

  async function findOneTarefa(id){
    const response = await fetch(`${baseURL}/${id}`)
    const tarefa = await response.json() 
    setLista([tarefa])
}

useEffect(()=>{
// findOneTarefa(2)
},[])



async function create(){
  const response = await fetch(baseURL, {
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({title:novoItem}),
    })
  const novaTarefa = await response.json() 
  setLista([novaTarefa])
}

useEffect(()=>{
  // create()
  },[])
  return (
    <div className="Form">
     
        <input 
          placeholder="Digite sua Tarefa e clique no Botão abaixo para adiciona-la a Lista  " 
          value={novoItem}
          onChange={value => setNovoItem(value.target.value)}
          type="text"
        />
        <button className="btn-add" onClick={()=> AddNewItem()}>Adicionar nova Tarefa</button>
        <ul className="List-Item">
        {lista.map((item,index) =>  (
          <li className="Item" key={index}>
            {item.title}
            <div className="divbotoes">  <button onClick={()=>deletarItem(index)}>
              Deletar 
            </button>
            </div>
          
            </li>
        ) )}
      </ul>
    </div>
  );

  
  function AddNewItem(){
    create()
 
  }
    function deletarItem(index){
      let tempArray=[...lista]
      tempArray.splice(index,1);

      setLista(tempArray);
    }
};

export default Home;

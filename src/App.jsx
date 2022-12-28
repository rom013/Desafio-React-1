/*
  - o usuario pode clickar em qualquer lugar da pagina ok
  - deve-se renderizar um pequeno circulo na poisição clicada ok 
  - a cada click, mantém-se os circulos já criados e renderiza-se um novo ok

  - crie duas funções para a aplicação ok com ajuda
    - desfazer (undo)
    - refazer (redo)
*/

import { useState } from "react";

function App() {
  const [dot, setDot] = useState([])
  const [store, setStore] = useState([])


  function handleClick(e){
    setDot([...dot, <Circle x={e.clientX} y={e.clientY}/>])
    setStore([])
  }
  
  function undo(){
    if(dot.length === 0){
      return
    }

    const lastElement = dot[dot.length - 1]
    setStore((a) => [...a, lastElement])

    setDot((prev)=>{
      const newArray = [...prev].slice(0,-1)
      return newArray
    })
  }
  
  function redo(){
    if(store.length === 0){
      return
    }

    const lastElementd = store[store.length - 1]
    setStore((n)=>{
      const newArray = [...n].slice(0,-1)
      return newArray
    })
    setDot((r)=>[...r, lastElementd])
  }
  

  return (
    <div className="app">
      <div onClick={handleClick} className="screen">
        {
          dot.map((e)=>{return e})
        }
      </div>

      <div className="buttons">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
    </div>
  )
}

export function Circle(props){
  const position = {
    left: `${props.x - 10}px`,
    top: `${props.y - 10}px`
  }
  //console.log(position);
  return (
    <div className="circle" style={position}></div>
  )
}

export default App

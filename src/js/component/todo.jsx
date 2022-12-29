import React, { useState, useEffect } from 'react';

//create your first component
const ToDoList = () => {

    const [tarea, setTareaValue] = useState("");
    const [tareaList, setTareaListValue] = useState([]);

    const obtenerTareasAPI = async () => {
        try {
                const usuario = "irenequero";
                const url = "https://assets.breatheco.de/apis/fake/todos/user/" + usuario;
        
                const request = {
                                    method: "GET"
                }
                const response = await fetch(url,request);
                const resultado  = await response.json();
                    console.log(resultado);
                    setTareaListValue(resultado);
                } catch (error) {
                        console.log(error);
                    }
        };

    
        const actualizarTareasAPI = async (listadoActualizado) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const usuario = "irenequero";
                const url =
                    "https://assets.breatheco.de/apis/fake/todos/user/" + usuario;
                const request = {
                    method: "PUT",
                    body: JSON.stringify(listadoActualizado),
                    headers:  { "Content-Type":"application/json"
				},
                };
                const response = await fetch(url, request);
                const resultado = await response.json();
                console.log(resultado);
                console.log(setTareaListValue);
                obtenerTareasAPI();
                } catch (error) {
                    console.log(error);
            }
        };
        useEffect(() => {
            obtenerTareasAPI();
        }, []);
    


    const handleKeyDown = event => {
        if (event.key === 'Enter' && tarea !== "") {
            setTareaValue("")
            actualizarTareasAPI([...tareaList, { label: tarea, done: false},]);
        }
      };

    const removeTarea = (index) => {
        const arrayActualizado = tareaList.filter((valor, indice) => {
            return index != indice
        })
        actualizarTareasAPI(arrayActualizado)
    };

	return (
            <div className="container d-flex justify-content-center flex-column">
                <h1>Tasks Todo</h1>
                <div className="input-group input-group-lg w-50">
                    <input type="text" id="inputTask" className="form-control rounded-0" placeholder="¿Qué hacemos hoy?" name="inputTask" maxLength={"40"} value={tarea} onChange={(e) => setTareaValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} aria-label="inputTask" aria-describedby="basic-addon1"/>
                </div>
                    <ul className="list-group">
                        {tareaList.map((element, index) => {
                            return (
                                <li key={index} className="list-group-item rounded-0 border w-50 d-flex justify-content-between align-items-center task-none">
                                    {element.label}
                                    <i className="fas fa-trash-alt" onClick={() => removeTarea(index)}></i>
                                </li>
                            );
                        })}
                        <li className="list-group-item rounded-0 border w-50 text-muted"><small>{tareaList.length} {tareaList.length == 1 ? "tarea" : "tareas" }</small></li>
                    </ul>
                    <footer className="footer mt-auto py-3">
                        <div className="container">
                            <span>Diseñado por <a href="https://github.com/IreneQuero" target="blank" className="text-decoration-none text-warning" >Irene Quero</a> ❤</span>
                        </div>
                    </footer>
            </div>
	);
};

export default ToDoList;
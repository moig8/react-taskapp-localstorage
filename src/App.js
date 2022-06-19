import { useState, useEffect } from "react";
import { TaskCreator } from "./components/TaskCreator";
import "./App.css";
import { TaskTable } from "./components/TaskTable";

function App() {
  const [taskItems, setTaskItems] = useState([]);

  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    } else {
      alert("Tarea repetida!, no es posible agregarla");
    }
  }

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  /*Este use efect cuando su arreglo que se encuentra al finalizar la función
se deja vació como en esta ocasión, lo que hace es que se carga de primero al ejecutar
la aplicación
*/
  useEffect(() => {
    let data = localStorage.getItem("tasks"); //obtenemos el arreglo de datos de localStorage
    /**Comprobamos que contenga información */
    if (data) {
      setTaskItems(JSON.parse(data)); //actualizamos el estado del arreglo y parseamos a formato JSON la data
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems)); //añadimos los datos a local storage convirtiendolos en formato JSON
  }, [taskItems]);

  return (
    <div className="App">
      <TaskCreator createNewTask={createNewTask} />
      <TaskTable tasks={taskItems} toggleTask={toggleTask} />
    </div>
  );
}

export default App;

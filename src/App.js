import { useState, useEffect } from "react";
import { TaskCreator } from "./components/TaskCreator";
import "./App.css";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
import { Container } from "./components/Container";

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    } else {
      alert("Tarea repetida!, no es posible agregarla o el campo esta vacío");
    }
  }

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
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
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <h3>Tasks Incompleted</h3>
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        <h3>Tasks Completed</h3>
        {showCompleted === true && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;

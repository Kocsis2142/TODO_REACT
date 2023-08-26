import TodoCard from './TodoCard'
import './App.css'
import { useEffect, useState } from 'react'
import Modal from './Modal'

function App() {

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")

  const getTasks = () => {
    fetch("https://localhost:7183/Task")
      .then(res => res.json())
      .then(data => setTasks(data)),
      (error) => alert(error)
  }

  const changeTasks = (newTaskPhase) => {
    fetch("https://localhost:7183/Task", {
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        TaskId:selectedTask.TaskId,
        TaskTitle:selectedTask.TaskTitle,
        TaskDescription:selectedTask.TaskDescription,
        TaskPhase:newTaskPhase
      })
    })
      .then(resp => resp.json())
      .then(res => {
        getTasks()
      }),
      (error) => alert(error)
  }

  const deleteTask = (id) => {
    if (confirm("Sure you want to delete this task?")) {
      fetch("https://localhost:7183/Task/"+id, {
        method: 'DELETE',
        headers: {
          'Accept':'application/json',
          'Content-type':'application/json'
        }
      })
        .then(resp => resp.json())
        .then(res => {
          alert(res)
          getTasks()
        }),
        (error) => alert(error)
    }
  }

  useEffect(() => {
    console.log("render")
    getTasks()
  }, [])

  const openModal = (modalType) => {
    setModalType(modalType)
    setShowModal(true)
  }

  const dragOver = (event) => {
    event.preventDefault()
  }

  const dragDrop = (phase) => {
    changeTasks(phase)
  }


  return (
    <div className="App">
      {showModal ? <Modal getTasks={getTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} setShowModal={setShowModal} modalType={modalType}/> : null}
      <div className="todo-table-container">
        <div className="list-group d-inline-flex p-2 todo-card-column" onDrop={()=>dragDrop("TODO")} onDragOver={(e)=>dragOver(e)}>
          <h2 className="column-title">To-do</h2>
          {tasks.filter(task => task.TaskPhase === "TODO").map(task => {
            return <TodoCard key={task.TaskId} task={task} openModal={openModal} setSelectedTask={setSelectedTask} deleteTask={deleteTask}/>
          })}
        </div>
        <div className="list-group d-inline-flex p-2 todo-card-column" onDrop={()=>dragDrop("PROGRESS")} onDragOver={(e)=>dragOver(e)}>
          <h2 className="column-title">In-progress</h2>
          {tasks.filter(task => task.TaskPhase === "PROGRESS").map(task => {
            return <TodoCard key={task.TaskId} task={task} openModal={openModal} setSelectedTask={setSelectedTask} deleteTask={deleteTask}/>
          })}
        </div>
        <div className="list-group d-inline-flex p-2 todo-card-column" onDrop={()=>dragDrop("DONE")} onDragOver={(e)=>dragOver(e)}>
          <h2 className="column-title">Done</h2>
          {tasks.filter(task => task.TaskPhase === "DONE").map(task => {
            return <TodoCard key={task.TaskId} task={task} openModal={openModal} setSelectedTask={setSelectedTask} deleteTask={deleteTask}/>
          })}
        </div>
      </div>
      <div className='addBtn-container'>
        <button type="button" className="btn btn-primary addBtn" onClick={()=>openModal("ADD")}>Add new task</button>
      </div>
    </div>
  )
}

export default App;

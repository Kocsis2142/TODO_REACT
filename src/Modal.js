import { useState } from "react"

function Modal(props) {

    const [newTaskDetailes, setNewTaskDetailes] = useState(
      props.selectedTask !== null && props.modalType === "CHG" ? 
      props.selectedTask : 
      {
      TaskId:0, 
      TaskTitle:"", 
      TaskDescription:"", 
      TaskPhase:""
    })

    const closeModal = () => {
      props.setShowModal(false)
      props.setSelectedTask(null)
    }

    const postTasks = (task) => {
        fetch("https://localhost:7183/Task", {
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            TaskTitle:task.TaskTitle,
            TaskDescription:task.TaskDescription,
            TaskPhase:'TODO'
          })
        })
          .then(resp => resp.json())
          .then(res => {
            alert(res)
            props.getTasks()
            closeModal()
          }),
          (error) => alert(error)
      }

      const changeTasks = (task) => {
        fetch("https://localhost:7183/Task", {
          method: 'PUT',
          headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            TaskId:task.TaskId,
            TaskTitle:task.TaskTitle,
            TaskDescription:task.TaskDescription,
            TaskPhase:task.TaskPhase
          })
        })
          .then(resp => resp.json())
          .then(res => {
            alert(res)
            props.getTasks()
            closeModal()
          }),
          (error) => alert(error)
      }

    return (
    <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add new task</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>closeModal()}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">New task</span>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Task name" 
                      aria-label="Task name" 
                      aria-describedby="basic-addon1" 
                      value={newTaskDetailes.TaskTitle} 
                      onChange={(e)=>setNewTaskDetailes({...newTaskDetailes, TaskTitle:e.target.value})}/>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Description</span>
                    </div>
                    <textarea 
                      className="form-control" 
                      aria-label="Task description" 
                      value={newTaskDetailes.TaskDescription} 
                      onChange={(e)=>setNewTaskDetailes({...newTaskDetailes, TaskDescription:e.target.value})}/>
                </div>
                {props.modalType === "CHG" ? 
                  <select className="form-select" aria-label="Default select example" 
                      value={newTaskDetailes.TaskPhase} 
                      onChange={(e)=>setNewTaskDetailes({...newTaskDetailes, TaskPhase:e.target.value})}>
                    <option defaultValue value="TODO">To-do</option>
                    <option value="PROGRESS">In-progress</option>
                    <option value="DONE">Done</option>
                </select> 
                : null}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={props.modalType === "CHG" ? ()=>changeTasks(newTaskDetailes) : ()=>postTasks(newTaskDetailes)}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>closeModal()}>Close</button>
            </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default Modal;
  
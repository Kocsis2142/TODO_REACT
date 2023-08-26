function TodoCard({task,  openModal, setSelectedTask, deleteTask}) {
  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start active todo-card" draggable onDragStart={()=>setSelectedTask(task)}>
        <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{task.TaskTitle}</h5>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={
              ()=>{openModal("CHG")
              setSelectedTask(task)}}
              >Change</button>
            <button 
            type="button" 
            className="btn btn-primary" 
            onClick={
              ()=>{setSelectedTask(task)
              deleteTask(task.TaskId)}}
              >Delete</button>
        </div>
        </div>
        <p className="mb-1">{task.TaskDescription}</p>
        <small></small>
    </div>
  );
}

export default TodoCard;

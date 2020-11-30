import React from "react";
import { connect } from "react-redux";
import { deleteTask, updateTaskStatus, updateTaskDetails } from "../actions/index";


//toggle - takes in the id & task info of the task being clicked & then gets the task array from GS, and finds the task which mates the id of the task being passed in. If the task is set as completed set to not completed & if task set to not completed set to completed - works to toggle on & off.

class ListToDos extends React.Component {
 state = {
   editing: '',
   input: ''
 }

 setInput = (currentTask) => {
   this.setState({
     input: currentTask
   })
 }
 setEditing = (taskID) => {
  //  console.log('got to set editing')
   this.setState({
     editing: taskID
   })
  //  console.log(taskID)
 }

  toggle = (id) => {
    let updatedTask = this.props.tasks.find(task => {
      if (task.id == id) {
        // if (task.completed) {
        //   task.completed = 0
        // } else {
        //   task.completed = 1
        // }
        task.completed ? task.completed = 0 : task.completed = 1
        return task
      }
    })
    this.props.dispatch(updateTaskStatus(updatedTask.id, updatedTask.completed))
  }
  
    handleChange = event => {
      this.setInput(event.target.value)
    }

    handleSubmit = (event, id) => {
      event.preventDefault()
      this.props.dispatch(updateTaskDetails(id, this.state.input))
      this.setEditing(null)
    }

    setClassName = task => {
    if (task.id == this.state.editing) {
      return 'editing'
    }
    return task.completed ? 'completed' : 'view'
  }
  
  render(){
  return(
  <section className="main">
    <input id="toggle-all" className="toggle-all" type="checkbox" />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {this.props.tasks.map((task) => {
        return (
          <>
            <li className={this.setClassName(task)}
              onDoubleClick={() =>
                 {this.setEditing(task.id)
                 this.setInput(task.task)}}>
              <div className="view">
                <input className="toggle"
                  type="checkbox"
                  onClick={() => this.toggle(task.id, this.props)}
                  defaultChecked={task.completed && 'checked'} />
                <label>{task.task}</label>
                <button onClick={() => this.props.dispatch(deleteTask(task.id))} 
                className="destroy"></button>
              </div>
              <form onSubmit={(event) => this.handleSubmit(event, task.id)}>
                <input 
                className="edit" 
                value={this.state.input}
                onChange={(event) => this.handleChange(event)}/>
              </form> 
            </li>
          </>
        )
      })}
    </ul>
  </section>
  )}}
  


function mapStateToProps(globalState) {
  return {
    tasks: globalState.tasks,
  }
}

export default connect(mapStateToProps)(ListToDos);

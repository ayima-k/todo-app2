import Logo from './assets/Logo.png'
import Plus from './assets/plus.png'
import Empty from './assets/empty.png'
import Check from './assets/check.png'
import Check2 from './assets/check2.png'
import Delete from './assets/trash.png'
import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if(localStorage.getItem('tasks')) {
      const data = JSON.parse(localStorage.getItem('tasks'))
      setTasks(data)
    }
  }, [])

  const addTask = (e) => {
    if(task) {
      const newTask = {id: new Date().getTime().toString(), title: task, isChecked: false}
      setTasks([...tasks, newTask])
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
      setTask('')
    }
  }

  const handleDelete = (task) => {
    const deleted = tasks.filter(t => t.id !== task)
    setTasks(deleted)
    localStorage.setItem('tasks', JSON.stringify(deleted))
  }

  const handleCheck = (task) => {
    const updated = [...tasks].map(todo => {
      if(todo.id == task) {
        todo.isChecked = !todo.isChecked
      }
      return todo
    })
    setTasks(updated)
    localStorage.setItem('tasks', JSON.stringify(updated))
  }

  return ( 
    <div className='main'>
      <div className='logo'>
        <img src={Logo} alt="" />
      </div>
      <div className='new-task'>
        <input type="text" value={task} placeholder='Add a new task' onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTask}>Create <img src={Plus} alt="" /></button>
      </div>
      <div className='tasks'>
        <div className='tasks-heading'>
          <p>
            Tasks created 
            <span>{!tasks.length ? '0' : tasks.length == 1 ? '1' : tasks.length > 1 ? tasks.length : null}</span>
          </p>
          <p>Completed 
            <span>
              {!tasks.length ? '0' : tasks.length != 0 ? tasks.filter(t => t.isChecked == true).length : null}
            </span>
          </p>
        </div>
      </div>
      <div className='list'>
        {
          tasks.length > 0 ? (
            <div className='tasks-list'>
              {
                tasks.map(task => (
                  <div className='task' key={task.id}>
                    {
                      !task.isChecked ? (
                        <img onClick={() => handleCheck(task.id)} src={Check} alt="" />
                      ) : (
                        <img onClick={() => handleCheck(task.id)} src={Check2} alt="" />
                      )
                    }
                    {
                      !task.isChecked ? (<p>{task.title}</p>) : (<p><s>{task.title}</s></p>)
                    }
                    <img onClick={() => handleDelete(task.id)} src={Delete} alt="" />
                  </div>
                ))
              }
            </div>
          ) : (
            <div className='empty'>
              <img src={Empty} alt="" />
              <p>You don't have tasks registered yet</p>
              <span>Create tasks and organize your to-do items</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import styles from "./Home.module.css"

import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";


const Home = () => {

  const navigate = useNavigate()

  const {name, userId, isAuthenticated, isLoggedIn} = useAuth()

  const [taskDescription, setTaskDescription] = useState('')

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    isLoggedIn()
    if (isAuthenticated == false) {
      navigate('/login')
    }
  }, [isAuthenticated])

  const getTasks = async() => {

    const response = await fetch(`http://localhost:3001/getTasks/${userId}`, {
      method:"GET",
      headers: {
        "Content-Type":"application/json"
      }
    })

    const data = await response.json()
    
    const dataSorted = data.tasks.sort((a, b) => {

      if(a.status == "completed" && b.status == "pending") {
        return 1
      } else if (a.status == "pending" && b.status == 'completed') {
        return -1
      } else {
        return 0
      }

    })

    setTasks(dataSorted)

  }

  useEffect(() => {
    if(!userId) return
    getTasks()
  }, [userId])

  const handleTask = async(e) => {

    e.preventDefault()

    const response = await fetch("http://localhost:3001/addtask", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({description: taskDescription, user_id: userId, status:'pending'})
    })

    const data = await response.json()

    console.log(data)
    
    getTasks()
    setTaskDescription('')

  }

  const deleteTask = async(id) => {

    const response = await fetch(`http://localhost:3001/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json"
      }
    })

    const data = await response.json()

    console.log(data)

    getTasks()

  }

  const concludeTask = async(id) => {

    const response = await fetch(`http://localhost:3001/concludetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      }
    })

    const res = await response.json()

    console.log(res)

    getTasks()

  }

  const cancelCompleteTask = async(id) => {

    const response = await fetch(`http://localhost:3001/cancelconcludetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      }
    })

    const res = await response.json()

    console.log(res)

    getTasks()
    
  }

  return (
    <div className={styles.home_container}>
      
      {isAuthenticated == null ?

      (<p className="p-loading"> Carregando ... </p>)

      :

      (<>
        <h2 className={styles.title}> Hello, {name}! </h2>

        <form onSubmit={handleTask}>
          <input type="text" placeholder="New task" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          <button type="submit"> new task </button>
        </form>

        <div className={styles.tasks_container}>

          {tasks && tasks.map((task) => (
            <div className={styles.task} key={task.task_id}>
              <div className={task.status == 'completed' ? styles.completed : styles.pending}>
                <p className={styles.task_description}> {task.task_description} </p>
                <div className={styles.actions}>
                  <button onClick={() => deleteTask(task.task_id)}> <FaTrashAlt className={styles.trash_can_icon} /> </button>
                  { task.status == 'pending' ?
                    <button onClick={() => concludeTask(task.task_id)}> <FaCheck className={styles.check_icon} /> </button>
                    :
                    <button onClick={() => cancelCompleteTask(task.task_id)}> <GiReturnArrow className={styles.return_arrow_icon} /> </button>
                  }
                </div>
              </div>
            </div>
          ))}

        </div>

      </>)}

    </div>

  )
}

export default Home
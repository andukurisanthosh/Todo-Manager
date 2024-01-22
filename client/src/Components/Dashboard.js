import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [task, setTask] = useState()
  const [usertask, setUsertask] = useState([])
 

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks/gettask')
      .then((responce) => {
        console.log(responce)
        setUsertask(responce.data)
      })
  }, [])
  const addTask = (e) => {
    axios.post('http://localhost:5000/api/tasks/addtask', { task })
      .then((responce) => {
        console.log(responce.data)
      })
  }

  const deleteTask=(id)=>{
    axios.delete(`http://localhost:5000/api/tasks/deletetask/${id}`)
    .then(responce=>{
      console.log(responce)
    })
  }

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col border-dark'>
          <h3 className='text-secondary'>Your Tasks</h3>
          {
            usertask.map((item, index) => (
              <>
                <h5>
                  {item.task}
                  <form>
                  <button className='btn btn-danger m-3' onClick={deleteTask(item._id)}>
                    delete
                  </button>
                  </form>
                </h5>
              </>
            ))
          }
        </div>
        <div className='col'>
          <form onSubmit={addTask}>

            <div className='form-group'>
              <input
                type="text"
                className='form-control mt-2'
                name='task'
                placeholder='Add Task'
                onChange={(e) => { setTask(e.target.value) }}
              />
              <button type='submit' className='btn btn-secondary mt-3'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import Todolist from './component/Todolist'
import { TaskProvider } from './context/TaskContext';
// import homes from './assets/homes.jpg'
// import tick from './assets/tick.jpeg'
// import add from './assets/add.png'
// import cap from './assets/cap.png'


function App() {
  return (
     <TaskProvider>
            <Todolist />
        </TaskProvider>
   

    // <div className='flex min-h-screen'>
    // <div className='bg-blue-500 w-64 min-h-screen'>
    //   <img src={cap}alt='cap' className='w-10 h-10 mx-auto mb-4 mix-blend-multiply hover:bg-white'></img>
    //   <div className='flex flex-col items-center text-white'>
    //    <h2 className='text-2xl font-bold text-gray-800'>Campus Flow</h2>
    //    <h6 className="text-xs font-bold text-gray-800"> Student Task Manager</h6>
    //   </div>
    //  <br></br>
    //   <div className='group flex items-center gap-4 hover:bg-white p-2 rounded-xl'>
    //     <img src ={homes}alt='CampusFLow Logo' className='w-5 h-5 text-white mix-blend-multiply '/>
    //     <span className='text-white group-hover:text-black'>Dashboard</span>
    //   </div>
    //   <div className='group flex items-center gap-1 hover:bg-white p-2 rounded-xl'>
    //     <img src={tick}alt='tick'className='w-5 h-5 mix-blend-multiply hover:bg-white text-white'></img>
    //     <span className='group-hover:text-black text-white '>My Tasks</span>
    //   </div>
    //   <div className='group flex items-center gap-1 hover:bg-white p-2 rounded-xl'>
    //     <img src={add}alt='add'className='w-5 h-5 text-white mix-blend-multiply'/>
    //     <span className='text-white group-hover:text-black' >AddTask</span>
    //   </div>
    //   <div className='flex-1 p-5 bg-gray-100'>
    //     <h1>Hello</h1>
    //     <Todolist />
    //   </div>
    // </div>
    // </div>
  )
}

export default App

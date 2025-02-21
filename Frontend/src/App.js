import { useState } from 'react';
import './App.css';
import TaskAdd from "./components/TaskAdd"
import TaskShow from './components/TaskShow';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
    
        const data = await response.json();
        setTasks(data)
        console.log("Tasks:", data); // Handle the fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }finally {
        setLoading(false);
      }
    };
  return (
    <div>
      <div className="max-w-[800px] mx-auto my-20 px-6">
        <div className="flex justify-between mb-6 ">
          <TaskAdd data={'add'} fetchTasks={fetchTasks}   />
          <div className='text-[24px] font-bold text-[#1f1f1f] '>Todos</div>
        </div>
        <TaskShow fetchTasks={fetchTasks} tasks={tasks} setTasks={setTasks} loading={loading}/>
      </div>
    </div>
  );
  
}

export default App;

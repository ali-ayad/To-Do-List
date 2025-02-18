import './App.css';
import TaskAdd from "./components/TaskAdd"
import TaskShow from './components/TaskShow';

function App() {
  return (
    <div>
      <div className="max-w-[800px] mx-auto my-20 px-6">
        <div className="flex justify-between mb-6 ">
          <TaskAdd data={'add'} />
          <div className='text-[24px] font-bold text-[#1f1f1f] '>Todos</div>
        </div>
        <TaskShow/>
      </div>
    </div>
  );
  
}

export default App;

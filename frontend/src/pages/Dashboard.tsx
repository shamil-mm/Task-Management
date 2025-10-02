
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import StatsCard from '../components/StatsCard';
import type { ITask } from '../types/Itask';
import TaskChart from '../components/TaskChart';
import ChartSelector from '../components/ChartSelector';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';
import { initSocket, getSocket } from '../socket/socket';


import { useSelector } from 'react-redux';
import { BellIcon } from 'lucide-react';
import NotificationModal from '../components/NotificationModal';
const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [notifications, setNotifications] = useState<number>(0);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  const user = useSelector((state: any) => state.auth.user)
  useEffect(() => {
    if (user?._id) {
      initSocket(user._id);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return
    socket.on("unreadCount", (data: { count: number }) => {
      setNotifications(data.count)
    });
    return () => {
      socket.off("unreadCount");
    };
  }, [user._id])



  const fetchTasks = async () => {
    try {
      const data = await getTasks(user._id,);
      console.log("fetch tasks data", data)
      setTasks(data.tasks);
      setNotifications(data.unreadCount)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Partial<ITask>) => {
    try { 
      const newTask = await createTask(user._id, taskData);    
      if (newTask)setTasks([...tasks, newTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: Partial<ITask>) => {
    try {
      const updatedTask = await updateTask(user._id, taskId, taskData);
      if(updatedTask!==undefined){
        setTasks(tasks.map(t => String(t._id) === taskId ? updatedTask : t));
        setIsModalOpen(false);
        setSelectedTask(null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(user._id, taskId);
      console.log("its comming here after delete the task")
      setTasks(tasks.filter(t => String(t._id) !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : task.status === filter
  );

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">

          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
            </div>

            {/* Notification Icon */}
            <div className="relative cursor-pointer" onClick={() => setIsNotifModalOpen(true)}>
              <BellIcon className="h-8 w-8 text-gray-700 hover:text-gray-900 transition" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {notifications}
                </span>
              )}
            </div>
          </div>
          {isNotifModalOpen && (
            <NotificationModal
              onClose={() => setIsNotifModalOpen(false)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Tasks" value={stats.total} color="blue" />
            <StatsCard title="Pending" value={stats.pending} color="yellow" />
            <StatsCard title="In Progress" value={stats.inProgress} color="purple" />
            <StatsCard title="Completed" value={stats.completed} color="green" />
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Analytics</h2>
              <ChartSelector selectedChart={chartType} onSelectChart={setChartType} />
            </div>
            <TaskChart tasks={tasks} chartType={chartType} />
          </div>


          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-green-950 text-white' : 'bg-white text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-green-950 text-white' : 'bg-white text-gray-700'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-4 py-2 rounded-lg ${filter === 'in-progress' ? 'bg-green-950 text-white' : 'bg-white text-gray-700'}`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-green-950 text-white' : 'bg-white text-gray-700'}`}
              >
                Completed
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedTask(null);
                setIsModalOpen(true);
              }}
              className="bg-green-950 text-white px-6 py-2 rounded-lg hover:bg-green-950 transition"
            >
              + New Task
            </button>
          </div>


          {loading ? (
            <div className="text-center py-12">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No tasks found. Create your first task!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={() => {
                    setSelectedTask(task);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => handleDeleteTask(String(task._id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>


      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={(id, taskData) => {
            if (selectedTask) {
              handleUpdateTask(String(id), taskData);
            } else {
              handleCreateTask(taskData);
            }
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
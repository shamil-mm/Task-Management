import React, { useState, useEffect } from 'react';
import type { ITask, TaskPriority, TaskStatus } from '../types/Itask';
import { createTaskSchema, updateTaskSchema } from '../validation/taskValidation';

interface TaskModalProps {
  task: ITask | null;
  onClose: () => void;
  onSave: (id:string|null,taskData: Partial<ITask>) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<ITask>>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'LOW',
    dueDate: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task?.description!,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    }
  }, [task]);

 
  const handleSubmit = (e: React.FormEvent) => {

    
    e.preventDefault();
     let error: any;
     let value: any;
    if(!task){
       ({ error, value } = createTaskSchema.validate(formData, { abortEarly: false }));
    }else{
       ({ error, value } = updateTaskSchema.validate(formData, { abortEarly: false }))
    }
    if (error) {
    
    const validationErrors: { [key: string]: string } = {};
    error.details.forEach((err:any) => {
      if (err.path[0]) validationErrors[err.path[0]] = err.message;
    });
    setErrors(validationErrors);
    return;
  }
  setErrors({});
    onSave(task ? String(task._id) : null,value)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
             
            />
             {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus})}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.status ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`} >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority})}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.priority ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
             {errors.priority && <p className="text-red-600 text-sm mt-1">{errors.priority}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.dueDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`} />
               {errors.dueDate && <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {task ? 'Update' : 'Create'} Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
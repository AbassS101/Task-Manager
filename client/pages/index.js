import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { PlusCircle } from 'lucide-react';

// Dynamically import components with SSR disabled
const TaskForm = dynamic(() => import('../components/TaskForm'), { ssr: false });
const TaskList = dynamic(() => import('../components/TaskList'), { ssr: false });

const IndexPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (data) => {
    // Add new task to the list
    setTasks([...tasks, { ...data, id: Date.now() }]);
    setShowForm(false);
  };

  const handleEditTask = (task) => {
    // Implement edit functionality
    console.log('Editing task:', task);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Task Manager
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {!showForm && (
            <Button 
              onClick={() => setShowForm(true)}
              className="mb-6 mx-auto flex items-center"
            >
              <PlusCircle className="mr-2" />
              Add New Task
            </Button>
          )}

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <TaskForm onSubmit={handleSubmit} />
            </motion.div>
          )}

          <TaskList 
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default IndexPage;
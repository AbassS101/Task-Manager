import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2, Edit, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ onEditTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status.toLowerCase() === filter;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'to do': return 'bg-yellow-200 text-yellow-800';
      case 'in progress': return 'bg-blue-200 text-blue-800';
      case 'done': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'}>All</Button>
        <Button onClick={() => setFilter('to do')} variant={filter === 'to do' ? 'default' : 'outline'}>To Do</Button>
        <Button onClick={() => setFilter('in progress')} variant={filter === 'in progress' ? 'default' : 'outline'}>In Progress</Button>
        <Button onClick={() => setFilter('done')} variant={filter === 'done' ? 'default' : 'outline'}>Done</Button>
      </div>
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button onClick={() => onEditTask(task)} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button onClick={() => onDeleteTask(task._id)} variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
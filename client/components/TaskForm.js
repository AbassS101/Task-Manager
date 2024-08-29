'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const TaskForm = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('title')} placeholder="Title" />
      <Textarea {...register('description')} placeholder="Description" />
      <Controller
        name="status"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Input type="date" {...register('dueDate')} />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;
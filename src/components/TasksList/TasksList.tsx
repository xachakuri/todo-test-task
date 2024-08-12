import React from 'react';
import { Task as TaskInterface } from '@store/interfaces.ts';
import Task from '@components/Task';

interface TasksListProps {
  tasks: TaskInterface[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
  changeStatusTask: (id: string) => void;
  activeTab: string;
}

const filterTodos = (
  todos: TaskInterface[],
  activeTab: string
): TaskInterface[] => {
  const isCompleted: boolean = activeTab === 'Completed';
  return activeTab === 'All'
    ? todos
    : todos.filter(({ completed }) => completed === isCompleted);
};

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  changeStatusTask,
  deleteTask,
  updateTask,
  activeTab,
}) => {
  const filteredTodos: TaskInterface[] = filterTodos(tasks, activeTab);
  return (
    <section className="grid gap-5">
      {tasks.length === 0 ? (
        <div className="text-3xl font-bold text-center py-12">
          <p>No tasks available</p>
        </div>
      ) : (
        filteredTodos.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            changeStatus={changeStatusTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))
      )}
    </section>
  );
};

export default TasksList;

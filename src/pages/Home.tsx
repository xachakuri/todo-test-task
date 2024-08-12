import React, { useEffect } from 'react';

import { useTaskStore } from '@store/useTaskStore.ts';

import TasksList from '@components/TasksList';
import TaskForm from '@components/TaskForm';
import TaskInfo from '@components/TaskInfo';
import Tabs from '@components/Tabs';

export const Home: React.FC = () => {
  const {
    tasks,
    changeStatusTask,
    deleteTask,
    createTask,
    info,
    updateInfo,
    updateTask,
    tabs,
    changeTab,
    activeTab,
  } = useTaskStore();

  useEffect(() => {
    updateInfo();
  }, [updateInfo]);

  return (
    <main className="mx-auto px-5 sm:px-10 w-full sm:w-2/3">
      <h1 className="text-3xl sm:text-6xl font-bold text-center py-12 sm:py-24">
        TODOLIST
      </h1>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        changeTab={changeTab}
      />
      <TaskForm createTask={createTask} />
      <TaskInfo
        total={info.total}
        active={info.active}
        completed={info.completed}
      />
      <TasksList
        tasks={tasks}
        changeStatusTask={changeStatusTask}
        deleteTask={deleteTask}
        updateTask={updateTask}
        activeTab={activeTab}
      />
    </main>
  );
};

export default Home;

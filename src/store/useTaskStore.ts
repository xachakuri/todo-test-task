import { create } from 'zustand';

import { TaskStore, Task } from '@store/interfaces.ts';
import { persist } from 'zustand/middleware';

const initialState = {
  tasks: [] as Task[],
  tabs: [
    { status: 'All', id: 1 },
    { status: 'Active', id: 2 },
    { status: 'Completed', id: 3 },
  ],
  activeTab: 'All',
  info: { total: 0, active: 0, completed: 0 },
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      createTask: newTask => {
        const newTasks = [...get().tasks, newTask];
        set({ tasks: newTasks });
        get().updateInfo();
      },
      updateTask: (id, title) => {
        const tasks = get().tasks.map(t => (t.id === id ? { ...t, title } : t));
        set({ tasks });
      },
      changeStatusTask: id => {
        const tasks = get().tasks.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        set({ tasks });
        get().updateInfo();
      },
      deleteTask: id => {
        const tasks = get().tasks.filter(t => t.id !== id);
        set({ tasks });
        get().updateInfo();
      },
      updateInfo: () => {
        const tasks = get().tasks;
        const { length: total } = tasks;
        const active = tasks.filter(t => !t.completed).length;
        const completed = total - active;
        set({ info: { total, active, completed } });
      },
      changeTab: tab => {
        set({
          activeTab: tab,
        });
      },
    }),
    { name: 'tasks', partialize: state => ({ tasks: state.tasks }) }
  )
);

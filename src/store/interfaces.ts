export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Info {
  total: number;
  active: number;
  completed: number;
}

export interface Tab {
  status: string;
  id: number;
}

export interface TaskStore {
  tasks: Task[];
  info: Info;
  tabs: Tab[];
  activeTab: string;
  createTask: (task: Task) => void;
  changeStatusTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateInfo: () => void;
  changeTab: (filter: string) => void;
  updateTask: (id: string, title: string) => void;
}

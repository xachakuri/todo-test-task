import { render, screen } from '@testing-library/react';
import { describe, vi, it } from 'vitest';

import TasksList from '../TasksList';

const mockTasks = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
  { id: '3', title: 'Task 3', completed: false },
];

const mockChangeStatusTask = vi.fn();
const mockDeleteTask = vi.fn();
const mockUpdateTask = vi.fn();

describe('TasksList', () => {
  it('renders "No tasks available" message when tasks array is empty', () => {
    render(
      <TasksList
        tasks={[]}
        changeStatusTask={mockChangeStatusTask}
        deleteTask={mockDeleteTask}
        updateTask={mockUpdateTask}
        activeTab="All"
      />
    );

    expect(screen.getByText('No tasks available')).toBeInTheDocument();
  });

  it('renders all tasks when active tab is "All"', () => {
    render(
      <TasksList
        tasks={mockTasks}
        changeStatusTask={mockChangeStatusTask}
        deleteTask={mockDeleteTask}
        updateTask={mockUpdateTask}
        activeTab="All"
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('renders only completed tasks when active tab is "Completed"', () => {
    render(
      <TasksList
        tasks={mockTasks}
        changeStatusTask={mockChangeStatusTask}
        deleteTask={mockDeleteTask}
        updateTask={mockUpdateTask}
        activeTab="Completed"
      />
    );

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
  });
});

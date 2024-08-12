import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { useTaskStore } from '@store/useTaskStore';
import { act, renderHook } from '@testing-library/react';

describe('useTaskStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.tasks = [];
      result.current.info = { total: 0, active: 0, completed: 0 };
      result.current.activeTab = 'All';
    });
  });

  it('should create a task', () => {
    const { result } = renderHook(() => useTaskStore());

    act(() => {
      result.current.createTask({
        id: '1',
        title: 'Test Task',
        completed: false,
      });
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual({
      id: '1',
      title: 'Test Task',
      completed: false,
    });
    expect(result.current.info).toEqual({ total: 1, active: 1, completed: 0 });
  });

  it('should update a task', () => {
    const { result } = renderHook(() => useTaskStore());

    act(() => {
      result.current.createTask({
        id: '1',
        title: 'Test Task',
        completed: false,
      });
      result.current.updateTask('1', 'Updated Task');
    });

    expect(result.current.tasks[0].title).toBe('Updated Task');
  });

  it('should change the status of a task', () => {
    const { result } = renderHook(() => useTaskStore());

    act(() => {
      result.current.createTask({
        id: '1',
        title: 'Test Task',
        completed: false,
      });
      result.current.changeStatusTask('1');
    });

    expect(result.current.tasks[0].completed).toBe(true);
    expect(result.current.info).toEqual({ total: 1, active: 0, completed: 1 });
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTaskStore());

    act(() => {
      result.current.createTask({
        id: '1',
        title: 'Test Task',
        completed: false,
      });
    });

    expect(result.current.tasks).toHaveLength(1);

    act(() => {
      result.current.deleteTask('1');
    });

    expect(result.current.tasks).toHaveLength(0);
    expect(result.current.info).toEqual({ total: 0, active: 0, completed: 0 });
  });

  it('should change the active tab', () => {
    const { result } = renderHook(() => useTaskStore());

    act(() => {
      result.current.changeTab('Completed');
    });

    expect(result.current.activeTab).toBe('Completed');
  });
});

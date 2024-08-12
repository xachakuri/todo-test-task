import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';

import Task from '../Task.tsx';

const mockChangeStatus = vi.fn();
const mockDeleteTask = vi.fn();
const mockUpdateTask = vi.fn();

const statusCheckboxTestId = 'status-checkbox';
const editButtonTestId = 'edit-button';
const editInputTestId = 'edit-input';
const deleteButtonTestId = 'delete-button';
const saveButtonTestId = 'save-button';

const renderTask = () =>
  render(
    <Task
      id="testId"
      title="Test Title"
      completed={false}
      changeStatus={mockChangeStatus}
      deleteTask={mockDeleteTask}
      updateTask={mockUpdateTask}
    />
  );

describe('Task component', () => {
  it('renders task with correct properties', () => {
    renderTask();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByTestId(statusCheckboxTestId)).not.toBeChecked();
  });

  it('enters and exits edit mode correctly', () => {
    renderTask();

    const editButton: HTMLButtonElement = screen.getByTestId(editButtonTestId);
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(screen.queryByTestId(statusCheckboxTestId)).toBeDisabled();
    const editInput: HTMLInputElement = screen.getByTestId(editInputTestId);
    expect(editInput).toBeInTheDocument();
    const saveButton = screen.getByTestId(saveButtonTestId);
    expect(saveButton).toBeInTheDocument();

    fireEvent.change(editInput, { target: { value: 'Updated Title' } });
    expect(editInput.value).toBe('Updated Title');

    fireEvent.click(saveButton);

    expect(mockUpdateTask).toHaveBeenCalledWith('testId', 'Updated Title');

    expect(screen.getByTestId(editButtonTestId)).toBeInTheDocument();
  });
  it('toggles completion status correctly', () => {
    renderTask();

    const statusCheckbox: HTMLInputElement =
      screen.getByTestId(statusCheckboxTestId);
    expect(statusCheckbox).toBeInTheDocument();
    fireEvent.click(statusCheckbox);

    expect(mockChangeStatus).toHaveBeenCalledWith('testId');
  });
  it('deletes task correctly', () => {
    renderTask();

    const deleteButton: HTMLButtonElement =
      screen.getByTestId(deleteButtonTestId);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith('testId');
  });
});

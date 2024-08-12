import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';

import TaskForm from '../TaskForm';

const mockCreateTask = vi.fn();

const validValues: string[] = ['Valid message', '  Value message', ' Value'];
const invalidValue: string = '   ';

const inputFieldTestId = 'input-field';
const createButtonTestId = 'create-button';

describe('TaskForm', () => {
  beforeEach(() => {
    mockCreateTask.mockClear();
  });
  it('updates input value on change', async () => {
    render(<TaskForm createTask={mockCreateTask} />);
    const input: HTMLInputElement = screen.getByTestId(inputFieldTestId);

    await userEvent.type(input, 'New Task');

    expect(input).toHaveValue('New Task');
  });

  it.each(validValues)(
    'should display create task when value is %s',
    async value => {
      render(<TaskForm createTask={mockCreateTask} />);
      const input: HTMLInputElement = screen.getByTestId(inputFieldTestId);
      const button: HTMLButtonElement = screen.getByTestId(createButtonTestId);

      await userEvent.type(input, value);
      fireEvent.click(button);

      expect(mockCreateTask).toHaveBeenCalledTimes(1);
      expect(mockCreateTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: value,
          completed: false,
        })
      );
      expect(input).toHaveValue('');
    }
  );

  it('does not call createTask on invalid input', async () => {
    render(<TaskForm createTask={mockCreateTask} />);
    const input: HTMLInputElement = screen.getByTestId(inputFieldTestId);
    const button: HTMLButtonElement = screen.getByTestId(createButtonTestId);

    await userEvent.type(input, invalidValue);
    fireEvent.click(button);

    expect(mockCreateTask).not.toHaveBeenCalled();
    expect(input).toHaveValue(invalidValue);
  });
});

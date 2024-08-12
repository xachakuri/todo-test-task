import React, { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';
import { Task } from '@store/interfaces.ts';

interface TaskFormProps {
  createTask: (task: Task) => void;
}

const regex: RegExp = /^\s*\S.*\s*$/;

export const TaskForm: React.FC<TaskFormProps> = ({ createTask }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    [setInputValue]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (regex.test(inputValue)) {
        createTask({
          id: nanoid(),
          title: inputValue,
          completed: false,
        });
        setInputValue('');
      }
    },
    [createTask, inputValue]
  );

  return (
    <section className="w-auto min-w-max mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center rounded-full"
      >
        <input
          className="w-full sm:w-auto flex-grow px-2 py-2 sm:px-4 sm:py-4  text-black border-0 rounded-sm sm:rounded-l focus:outline-none"
          type="text"
          value={inputValue}
          onChange={onChangeInput}
          placeholder="What needs to be done?"
          data-testid="input-field"
        />
        <button
          className="px-2 py-2 sm:px-4 sm:py-4 bg-green-500 w-full sm:w-auto text-white rounded-sm sm:rounded-r hover:bg-green-600 focus:outline-none"
          aria-label="add"
          type="submit"
          data-testid="create-button"
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default TaskForm;

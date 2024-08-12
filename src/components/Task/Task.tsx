import React, { useCallback, useState } from 'react';

interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  changeStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  completed,
  title,
  changeStatus,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const onChangeEditInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value),
    [setEditedTitle]
  );

  const toggleEditMode = useCallback(() => {
    if (editMode) {
      updateTask(id, editedTitle);
    }
    setEditMode(!editMode);
  }, [editMode, editedTitle, id, updateTask]);

  const changeStatusHandler = useCallback(() => {
    changeStatus(id);
  }, [changeStatus, id]);

  const deleteHandler = useCallback(() => {
    deleteTask(id);
  }, [deleteTask, id]);

  return (
    <div
      className={`rounded-lg p-4 border border-white sm:min-w-min ${completed ? 'bg-gray-500' : 'bg-gray-600'} max-w-full`}
    >
      <label className="flex justify-between items-center cursor-pointer">
        <input
          data-testid="status-checkbox"
          type="checkbox"
          className="form-checkbox min-h-5 min-w-5 text-blue-500 mr-2"
          checked={completed}
          disabled={editMode}
          onChange={changeStatusHandler}
        />
        <div className="pr-6 w-full">
          {editMode ? (
            <input
              className="w-full px-2 py-2 text-black border-0 rounded-sm sm:rounded-l focus:outline-none"
              onChange={onChangeEditInput}
              value={editedTitle}
              autoFocus
              data-testid="edit-input"
            />
          ) : (
            <h3
              className={`${completed ? 'line-through' : ''} text-lg sm:text-3xl font-semibold max-h-20 overflow-auto`}
            >
              {title}
            </h3>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row">
          {editMode ? (
            <button
              data-testid="save-button"
              onClick={toggleEditMode}
              className="ml-0 sm:ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 sm:px-4 rounded"
            >
              Save
            </button>
          ) : (
            <>
              <button
                data-testid="edit-button"
                onClick={toggleEditMode}
                className="ml-0 sm:ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 sm:px-4 rounded"
              >
                Edit
              </button>
              <button
                data-testid="delete-button"
                onClick={deleteHandler}
                className="ml-0 sm:ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 sm:px-4 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default Task;

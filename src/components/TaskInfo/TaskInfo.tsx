import React from 'react';

interface TaskInfoProps {
  total: number;
  active: number;
  completed: number;
}

export const TaskInfo: React.FC<TaskInfoProps> = ({
  total,
  active,
  completed,
}) => {
  return (
    <section className="flex text-white gap-5 text-center text-lg py-4 ">
      <div>
        <span>Total: {total}</span>
      </div>
      <div>
        <span>Active: {active}</span>
      </div>
      <div>
        <span>Completed: {completed}</span>
      </div>
    </section>
  );
};

export default TaskInfo;

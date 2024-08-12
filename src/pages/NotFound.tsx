import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">Not Found</h1>
      <Link
        to="/"
        className="text-blue-500 hover:underline"
      >
        Return to homepage
      </Link>
    </div>
  );
};

export default NotFound;

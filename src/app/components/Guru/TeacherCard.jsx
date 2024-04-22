// components/TeacherCard.js
import React from 'react';

const TeacherCard = ({ name, email, isOnline }) => {
  return (
    <div className={`bg-white p-4 rounded-md shadow-md mb-4 ${isOnline ? 'border-green-500' : 'border-red-500'}`}>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{email}</p>

    </div>
  );
};

export default TeacherCard;

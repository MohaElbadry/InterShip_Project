import React from 'react';

const ClientRow = ({ client }) => {
  return (
    <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img className="object-cover w-full h-full rounded-full" src={client.image} alt="" loading="lazy" />
            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
          </div>
          <div>
            <p className="font-semibold">{client.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{client.occupation}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{client.amount}</td>
      <td className="px-4 py-3 text-xs">
        <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${client.statusClass}`}>{client.status}</span>
      </td>
      <td className="px-4 py-3 text-sm">{client.date}</td>
    </tr>
  );
};

export default ClientRow;
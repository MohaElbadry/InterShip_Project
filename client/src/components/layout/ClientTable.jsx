import React from 'react';
import ClientRow from './ClientRow';

const clients = [
  {
    name: 'Hans Burger',
    occupation: '10x Developer',
    image: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    amount: '$855.85',
    status: 'Approved',
    statusClass: 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100',
    date: '15-01-2021'
  },
  {
    name: 'Jolina Angelie',
    occupation: 'Unemployed',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6',
    amount: '$369.75',
    status: 'Pending',
    statusClass: 'text-yellow-700 bg-yellow-100',
    date: '23-03-2021'
  },
  {
    name: 'Dave Li',
    occupation: 'Influencer',
    image: 'https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=b8377ca9f985d80264279f277f3a67f5',
    amount: '$775.45',
    status: 'Expired',
    statusClass: 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700',
    date: '09-02-2021'
  },
  {
    name: 'Rulia Joberts',
    occupation: 'Actress',
    image: 'https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    amount: '$1276.75',
    status: 'Approved',
    statusClass: 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100',
    date: '17-04-2021'
  },
  {
    name: 'Hitney Wouston',
    occupation: 'Singer',
    image: 'https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    amount: '$863.45',
    status: 'Denied',
    statusClass: 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700',
    date: '11-01-2021'
  }
];

const ClientTable = () => {
  return (
    <div className="mt-4 mx-4">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {clients.map((client, index) => (
                <ClientRow key={index} client={client} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="flex items-center col-span-3"> Showing 21-30 of 100 </span>
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                    <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
                </li>
                <li>
                  <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">3</button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button>
                </li>
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                      <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
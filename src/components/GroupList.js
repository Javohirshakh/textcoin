import React from 'react';

// const groups = [
//   {
//     name: 'Group 1',
//     image: 'assets/images/group1.jpg',
//     wordsWritten: 120,
//     earned: 300,
//   },
//   {
//     name: 'Group 2',
//     image: 'assets/images/group2.jpg',
//     wordsWritten: 200,
//     earned: 500,
//   },
//   {
//     name: 'Group 3',
//     image: 'assets/images/group3.jpg',
//     wordsWritten: 150,
//     earned: 400,
//   },
// ];

function GroupList(props) {
  return (
    <div id="group-list" className="mt-4">
      {props.groups.map((group, index) => (
        <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-2">
          <div className="flex items-center">
            <img src={group.image} alt={group.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="text-white font-bold">{group.name}</p>
              <p className="text-xs text-gray-400">So'zlar yozildi: {group.wordsWritten}</p>
              <p className="text-xs text-gray-400">Ishlab topilgan: {group.earned} UZS</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupList;

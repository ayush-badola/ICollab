import { useState, useEffect } from 'react';
import ProfilePic from "../../Common/ProfilePic";
import { UserPlus, Clock } from "lucide-react";
import Name_Designation from '../../Common/Name&Designation';
import { suggestedNetwork } from '../../../Services/networkService';

function SuggestedNetwork() {
  const [people, setPeople] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const [collabStatus, setCollabStatus] = useState({}); 

  const toggleShowAll = () => setShowAll(!showAll);

  const visiblePeople = showAll ? people : people.slice(0, 6);

  // Function to handle button click
  const handleCollabClick = (personId) => {
    setCollabStatus((prevStatus) => ({
      ...prevStatus,
      [personId]: 'Pending', 
    }));
  };
  
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const response = await suggestedNetwork();
        if (response.status === "success") {
          setPeople(response.data);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    };
    fetchNetworkData();
  }

  , []);

  return (
    <div className="p-6 rounded-md w-full h-auto bg-white border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">People you may know</h2>
        <button
          onClick={toggleShowAll}
          className="text-blue-600 hover:underline font-medium"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePeople.map((person) => (
          <div key={person.id} className="bg-white p-4 shadow-md rounded-md border border-gray-300">
            {/* Profile Image */}
            <ProfilePic className="w-20 h-20 mx-auto mb-2 rounded-full object-cover" />
            {/* Name and Role */}
            <div className="flex flex-col items-center justify-center ">
              <Name_Designation
                name={person.name}
                designation={person.role}
                nameClass="text-[1.0rem] font-semibold text-gray-800 text-center"
                designationClass="text-sm text-gray-600 text-center"
              />
            </div>
            
            {/* Collab Button */}
            <button
              onClick={() => handleCollabClick(person.id)}
              className={`w-full mt-2 py-1 rounded flex items-center justify-center gap-1 ${collabStatus[person.id] === 'Pending' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}`}
              disabled={collabStatus[person.id] === 'Pending'} 
            >
              {/* Add appropriate icons */}
              {collabStatus[person.id] === 'Pending' ? (
                 <Clock size={20} />
              ) : (
                <UserPlus size={20} />
              )}
              {collabStatus[person.id] === 'Pending' ? 'Pending' : 'Collab'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedNetwork;

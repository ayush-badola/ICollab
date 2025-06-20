import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "../../Common/ProfilePic";
import Name_Designation from "../../Common/Name&Designation";

const NetworkCard = ({ person }) => {
  const description = person?.profile?.about || "";
  const truncatedDescription = description.slice(0, 30);
  const isDescriptionTruncated = description.length > 10;

  return (
    <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 flex flex-col items-center">
      {/* Profile Image */}
      <ProfilePic className="w-20 h-20 mx-auto mb-2 rounded-full border border-gray-300" picture={person?.profile_pic} />

      {/* Name */}
      <div className="flex flex-col items-center justify-center">
        <Name_Designation
          name={person.name}
          designation={person?.designation}
          nameClass="text-[1.0rem] font-semibold text-gray-800 text-center"
          user={person}
          designationClass="text-sm text-gray-600  text-center"
        />
      </div>
      
      <p className="text-center text-gray-600 text-sm mt-2">
        {person?.username}
      </p>

      {/* Description */}
      <p className="text-center text-gray-600 text-sm mt-2">
        {isDescriptionTruncated ? description : `${truncatedDescription}`}
      </p>

      {/* Read More Link */}
      {isDescriptionTruncated && (
        <Link
          to={`/profile/${person?.username}`}
          className="text-blue-500 mt-2 underline text-sm sm:text-base"
        >
          Read More
        </Link>
      )}
    </div>
  );
};

export default NetworkCard;

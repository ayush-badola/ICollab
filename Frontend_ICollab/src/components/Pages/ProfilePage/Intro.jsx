import ProfilePic from "../../Common/ProfilePic";
import {
  Github,
  Linkedin,
  Globe,
  MapPin,
  UserPlus,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";
import CollabButton from "../../Common/CollabButton";
import PageNavbar from "../../Common/PageNavbar/PageNavbar";
import PhonePageNavbar from "../../Common/PageNavbar/PhonePageNavbar";
import { useSelector } from "react-redux";
import { sendRequest } from "../../../Services/networkService";

function Intro({ activeTab, setActiveTab, user }) {
  const currentUser = useSelector((state) => state?.user?.userData);
  const isOwner = currentUser.username === user.username;

  const handleCollabRequest = () => {
    sendRequest(user?.username);
  };

  const tabs = ["Intro", "Projects", "Posts", ...(isOwner ? ["Saved"] : [])];

  return (
    <div className="flex flex-col min-h-64 justify-start items-center bg-white w-full px-4 sm:px-6 py-4 gap-3">
      {/* Edit button for mobile */}
      <div className="w-full flex justify-end sm:hidden">
        <Link
          to="/profile/edit"
          className="border border-gray-400 rounded-full p-4 text-purple-700 hover:bg-gray-100 transition text-sm md:text-lg font-semibold flex sm:hidden justify-evenly items-center gap-2"
        >
          <Pencil size={24} strokeWidth={2.1} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-auto w-full justify-around items-center gap-4 md:gap-2">
        {/* Profile Picture */}
        <div className="rounded-full h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 flex justify-center items-center">
          <ProfilePic className="h-full w-full object-cover rounded-full" />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-[80%] flex flex-col justify-evenly gap-4 md:gap-3">
          {/* Top Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
            {/* Name + Username + Collab */}
            <div className="flex flex-col justify-center items-center w-full sm:items-start gap-2">
              <div className="flex w-full flex-col justify-center items-center sm:flex-row flex-wrap sm:justify-start sm:items-baseline gap-2">
                <p className="text-3xl md:text-3xl font-bold tracking-tight">
                  {user?.name}
                </p>
                <p className="text-gray-600 font-normal tracking-tight underline text-lg">
                  {user?.profile?.designation}
                </p>
              </div>
              <div className="flex flex-wrap justify-start items-baseline gap-2">
                <p className="text-base md:text-xl text-gray-800 font-thin tracking-tight">
                  {user?.username}
                </p>
                <div className="hidden sm:flex justify-center items-center gap-2">
                  <CollabButton onClick={handleCollabRequest} />
                </div>
              </div>
            </div>

            {/* Social Icons + Edit Profile + Resume */}
            <div className="w-full md:w-[45%] flex flex-col-reverse items-end justify-start gap-3">
              {/* Top Row: Social Icons */}
              <div className="flex  gap-2">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="https://yourwebsite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  <Globe size={22} />
                </a>
              </div>

              {/* Buttons Below */}
              {isOwner && (
                <div className="flex gap-2 mt-2">
                  <Link
                    to="/profile/edit"
                    className="px-4 py-2 text-sm font-medium border border-purple-400 text-purple-600 rounded-md hover:bg-purple-50"
                  >
                    <div className="flex items-center gap-1">
                      <Pencil size={16} />
                      Edit Profile
                    </div>
                  </Link>
                  <a
                    href={user?.profile?.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium border border-purple-400 text-purple-600 rounded-md hover:bg-purple-50"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Skills + Location */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap justify-center items-center sm:justify-start sm:items-start gap-2">
              {user?.profile?.skills.map((skill, index) => (
                <button
                  key={index}
                  className="border border-purple-300 rounded-md px-6 md:px-8 py-1 md:py-2 hover:bg-purple-200 transition-colors text-md md:text-lg"
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Location or Collab (Mobile) */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full md:w-[70%] sm:opacity-75 gap-2">
              {/* Optional location */}
              {/* <p className="text-gray-600 font-normal tracking-tight text-base md:text-xl flex gap-2">
                <MapPin size={24} /> Delhi, India
              </p> */}
              <div className="flex sm:hidden justify-center items-center gap-2">
                <CollabButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="h-20 w-full hidden md:flex justify-center items-center">
        <PageNavbar
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
      <div className="h-auto w-full flex md:hidden justify-center items-center">
        <PhonePageNavbar
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}

export default Intro;

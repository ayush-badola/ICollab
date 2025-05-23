import React, { useState, useEffect } from "react";
import { Github, Linkedin, Globe } from "lucide-react";

const Links = ({ setActiveTab, formData, updateField, handleSave }) => {
  const [links, setLinks] = useState(formData?.links || ["", "", ""]);

  useEffect(() => {
    updateField("links", links);
  }, [links]);

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const addNewProfile = () => {
    if (links.length < 5) {
      setLinks([...links, ""]);
    }
  };

  const icons = [
    <Github key="github" className="w-5 h-5 text-blue-800 mr-2" />,
    <Linkedin key="linkedin" className="w-5 h-5 text-blue-600 mr-2" />,
    <Globe key="link" className="w-5 h-5 text-blue-600 mr-2" />,
  ];

  const placeholders = [
    "https://github.com/your-profile",
    "https://linkedin.com/in/your-profile",
    "https://your-website.com",
  ];

  return (
    <div className="relative h-auto pb-4">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] mx-auto sm:p-4 p-4 bg-white rounded-lg shadow mt-14">
        <h2 className="text-2xl font-semibold mb-2">Online Profiles</h2>
        <p className="text-lg text-gray-600 mb-4">
          Add links to your GitHub, LinkedIn, or any other online profile that
          showcases your work.
        </p>

        {links.map((link, index) => (
          <div key={index} className="flex items-center mb-3">
            {icons[index] || <Globe className="w-5 h-5 text-blue-600 mr-2" />}
            <input
              type="url"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={placeholders[index] || "https://your-link.com"}
            />
          </div>
        ))}

        <button
          onClick={addNewProfile}
          disabled={links.length >= 5}
          className={`mt-4 px-4 py-2 rounded-md text-xl w-full sm:w-[60%] transition 
          ${
            links.length >= 5
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-teal-200 text-black hover:bg-teal-300"
          }
        `}
        >
          + Add Social Link
        </button>
      </div>
      {/* Navigation Buttons */}

      <div className=" left-4 right-4 sm:left-32 sm:right-32 flex flex-row justify-between items-center space-x-4 mt-12  sm:mt-24">
        <button
          onClick={() => setActiveTab("CONTACT")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Links;

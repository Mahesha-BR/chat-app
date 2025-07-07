import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSidebar = ({ selectedUser }) => {
  return selectedUser ? (
    <div
      className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
      style={{ paddingBottom: '60px' }} // space for logout button
    >
      <div className="pt-8 flex flex-col items-center gap-2 text-xs font-light mx-auto px-4">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-16 aspect-square rounded-full object-cover" // smaller pic
        />
        <h1 className="px-10 text-lg font-medium mx-auto flex items-center gap-2"> {/* smaller font */}
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto text-center text-sm">{selectedUser.bio}</p> {/* smaller text */}
      </div>

      <hr className="border-[#ffffff50] my-3" /> {/* less margin */}

      <div className="px-5 text-xs">
        <p className="mb-1">Media</p>
        <div className="max-h-[140px] overflow-y-scroll grid grid-cols-2 gap-3 opacity-80"> {/* reduced height */}
          {imagesDummyData.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url)}
              className="cursor-pointer rounded"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') window.open(url);
              }}
              aria-label="Open media"
            >
              <img src={url} alt={`Media ${index + 1}`} className="h-full rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400
      to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  ) : null;
};

export default RightSidebar;

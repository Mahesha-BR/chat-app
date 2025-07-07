import React, { useState } from "react";
import ChatContainer from "../components/chatContainer";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  const gridColsClass = selectedUser
    ? "md:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_2fr_1fr]"
    : "md:grid-cols-2";

  return (
    <div className="w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div className={`grid ${gridColsClass} h-full border border-white rounded-lg `}>
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        {selectedUser && (
          <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        )}
      </div>
    </div>
  );
};

export default Homepage;

import React from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileButtons from "../components/ProfileButtons";
import ProfileFormPassword from "../components/ProfileFormPassword";
import Footer2 from "../components/Footer2";

function PasswordEdit() {
  return (
    <div>
      <Navbar />
      <div className="profile-edit-containe">
        <ProfileHeader />
        <ProfileButtons />
        <ProfileFormPassword />
      </div>
      <Footer2 />
    </div>
  );
}

export default PasswordEdit;

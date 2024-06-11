import React from "react";
import Navbar from "../components/Navbar";
import Footer2 from "../components/Footer2";
import ProfileHeader from "../components/ProfileHeader";
import ProfileButtons from "../components/ProfileButtons";
import ProfileForm from "../components/ProfileForm";
import "../css/ProfileEdit.css";

function ProfileEdit() {
  return (
    <div>
      <Navbar />
      <div className="profile-edit-containe">
        <ProfileHeader />
        <ProfileButtons />
        <ProfileForm />
      </div>
      <Footer2 />
    </div>
  );
}

export default ProfileEdit;

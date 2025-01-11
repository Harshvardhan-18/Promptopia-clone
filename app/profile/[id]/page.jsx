"use client";

import { useEffect, useState } from "react";
import * as React from "react";


import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userName, setUserName] = useState("");

  const [userPosts, setUserPosts] = useState([]);

  const { id } = React.use(params)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await response.json();
        setUserName(userData.username);
      } catch (error) {
        console.error("Fetch user details error:", error);
      }
    };

    if (id) {
      fetchPosts(); 
    fetchUserDetails();}
  }, [id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
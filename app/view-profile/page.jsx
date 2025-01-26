"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";

const ProfilePage = () => {
    const searchParams = useSearchParams()
    const creatorId = searchParams.get('id');
    const creatorName = searchParams.get('name');
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${creatorId}/posts`);
            const data = await response.json();
    
            setPosts(data);
        }

        if(creatorId) fetchPosts();
    }, [creatorId]);

    return (
        <Profile 
            name={creatorName+"'s"}
            id={creatorId}
            desc={`Welcome to ${creatorName}'s profile page`}
            data={posts}
            handleEdit={() => {}}
            handleDelete={() => {}}
            handleNameChangeClicked={() => {}}
        />
    )
}
 
export default ProfilePage

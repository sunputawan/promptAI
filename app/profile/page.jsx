"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const ProfilePage = () => {
    const { data:session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            console.log(session.user.id)
            const response = await fetch(`/api/users/${session?.user.id}/posts`, {
                method: 'GET'
            });
            const data = await response.json();
    
            setPosts(data);
        }

        if(session?.user.id) fetchPosts();
    }, [session]);

    const reloadPage = () => {
        window.location.reload();
    };

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    
    const handleDelete = async (post) => {
        const hasComfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if(hasComfirmed) {
            try {
                const response = await fetch(`/api/prompt/${(post._id).toString()}`, {
                    method: 'DELETE',
                })
                if(response.ok) {
                    setPosts((posts) => posts.filter((p) => p._id !== post._id));
                }
            } catch(error) {
                console.log(error);
            }
        }
    }
    
    const handleNameChangeClicked = async (displayName, setDisplayName) => {
        try {   
                console.log(session.user.id);
                const response = await fetch('/api/update-name', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: session?.user.id,
                        newName: displayName,
                    }),
                });

                if(!response.ok) {
                    throw new Error("Failed to update name");
                }

                setDisplayName(displayName);
                alert("New Username Saved Succesfully!");
                reloadPage();

                // const updatedSession = await signIn(null, { redirect: false });
                // console.log("Updated session:", updatedSession);
                
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Profile 
            name="My"
            id={session?.user.id}
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleNameChangeClicked={handleNameChangeClicked}
        />
    )
}
 
export default ProfilePage

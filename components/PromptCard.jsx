"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data:session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const handleCreatorClick = () => {
    (session?.user.id === post.creator._id) ?
    router.push(`/profile`):
    router.push(`/view-profile?id=${post.creator._id}&name=${encodeURIComponent(post.creator.username)}`);
  }
  
  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit hover:border-[0.1rem] hover:border-primary-orange">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => {handleCreatorClick()}}
        >
            <Image 
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
              />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gay-800">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ?
              "/assets/icons/tick.svg" : "/assets/icons/copy.svg"
            }
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="mt-5 font-satoshi text-md font-semibold text-gray-700">
        {post.topic}
      </p>

      <p className="mb-4 mt-2 font-satoshi text-sm text-gray-700">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.prompt}
      </p>

      <div className="flex justify-start items-start">
        <p 
          className="font-inter text-sm blue_gradient"
          onClick={handleTagClick && handleTagClick(post.tag)}
          >
          #{post.tag}
        </p>
      </div>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex justify-center gap-4 border-t border-gray-100">
          <p 
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p 
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;
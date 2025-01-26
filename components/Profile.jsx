"use client"

import PromptCard from "./PromptCard"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

const Profile = ({ name, id, desc, data, handleEdit, handleDelete, handleNameChangeClicked}) => {
  const { data:session } = useSession();
  const [displayName, setDisplayName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [ changing, setChanging ] = useState(false);

  useEffect(() => {
    const fetchName = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/get`, {
        method: 'GET'
      });
      const user = await response.json();
      // console.log(username);

      setDisplayName(user.username);
      setInitialName(user.username);
    }

    if(session?.user.id) fetchName();
  }, [session])

  
  const handleInputChange = (e) => {
    setDisplayName(e.target.value);
  }

  const isValidUsername = (username) => {
    // Regular expression: 8-20 alphanumeric characters, no symbols
    const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;
  
    // Test the username against the regex
    return usernameRegex.test(username);
  }

  const handleInvalidUserName = () => {
    (displayName === initialName) ? 
      alert("Your provided name is the same as your current username!") : 
      alert("Username Invalid: It should be composed of 8-20 alphabet or numeric letters!"),setDisplayName(initialName); 
  }

  return ( 
    <section className="w-full">
        {(name.length > 16) ?
        (<h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.15] text-black sm:text-6xl">
          <span className="blue_gradient">{name} Profile </span>
        </h1>) : 
        (<h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl">
          <span className="blue_gradient">{name} Profile </span>
        </h1>)
      }
      <p className="desc text-left">
        {desc}
      </p>
      {(id === session?.user.id) ? (
        <div>
          <h1 className="mt-8 mb-4 font-satoshi font-semibold">
            Your Display Name
          </h1>
          <div className="flex justify-start flex-col gap-4 sm:gap-1 sm:flex-row sm:items-center">
            <section className="w-full max-w-full md:max-w-[450px]">
              <form className="w-full">
                  <input
                    type="text"
                    placeholder="Please enter your display name..."
                    spellCheck="false"
                    value={displayName}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-gray-200 bg-white 
                    font-satoshi font-medium text-sm
                    py-2.5 pl-5 pr-12 shadow-lg
                    focus:border-primary-orange focus:border-2 focus:outline-none focus:ring-0 peer"
                    />
              </form>
            </section>
            <div className="sm:pt-1 ml-6 mr-4 flex justify-end items-end gap-3">
              <div className="px-5 py-2 text-sm bg-primary-orange rounded-full border border-primary-orange hover:bg-transparent hover:text-primary-orange transition-all hover:font-bold text-white drop-shadow-md cursor-pointer"
                onClick={() => {
                  if(!changing) {
                    (displayName !== initialName && isValidUsername(displayName)) ? 
                      (setChanging(true), handleNameChangeClicked(displayName,setDisplayName)) : 
                      handleInvalidUserName();
                  }
                }}
              >
                  {
                    (changing) ? <>Saving...</> : <>Change</>
                  }
              </div>
              <div className="py-2 text-sm text-gray-500 cursor-pointer"
                onClick={() => {setDisplayName(initialName)}}
              >
                  Cancel
              </div>
            </div>
          </div>
        </div>) : <></>}

      <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
      </div>
    </section>
  )
}

export default Profile
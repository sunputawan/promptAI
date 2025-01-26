"use client"

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, searchText, handleTagClick, isLoading}) => {
  const filteredData = data.filter((post) =>
    { return ((
        post.topic.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) || 
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase()) || 
        post.creator.email.split("@")[0].toLowerCase().includes(searchText.toLowerCase())
      ))
    }
  );
  const prioritizedData = filteredData.sort((a, b) => {
    const getPriority = (post) => {
      if (post.topic.toLowerCase().includes(searchText.toLowerCase())) return 1
      if (post.prompt.toLowerCase().includes(searchText.toLowerCase())) return 2
      else if (post.tag.toLowerCase().includes(searchText.toLowerCase())) return 3
      else if (post.creator.username.toLowerCase().includes(searchText.toLowerCase())) return 4
      else if (post.creator.email.toLowerCase().includes(searchText.toLowerCase())) return 5
      else return 5
    }

    const priorityA = getPriority(a);
    const priorityB = getPriority(b);

    return priorityA - priorityB;
  });
  
  return (
      <div className='mt-12 prompt_layout'>
        {isLoading ? (
          <h1 className='flex flex-row justify-center items-center h-screen text-gray-500 text-2xl font-satoshi font-bold'>
            Loading Prompts ...
          </h1>
        ) : (
            prioritizedData.map((post) => (
              <PromptCard 
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
              />
            ))
          )
        }
      </div>
  )
}

const Feed = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ posts, setPosts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full max-w-xl flex justify-center items-center">
          <input
            type="text"
            placeholder="Search for a tag or a username..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="block w-full rounded-md border border-gray-200 bg-white 
            font-satoshi font-medium text-sm
             py-2.5 pl-5 pr-12 shadow-lg
             focus:border-primary-orange focus:border-2 focus:outline-none focus:ring-0 peer"
          />
      </form>

      <PromptCardList
        data={posts}
        searchText={searchText}
        handleTagClick={() => {}}
        isLoading={isLoading}
        >
      </PromptCardList>
    </section>
  )
}

export default Feed
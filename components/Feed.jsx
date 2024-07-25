"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  const [searchedResults, setSearchedResults] = useState([]);
  useEffect(() => {
    console.log('test')
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    
    try {
      const response = await fetch("/api/prompt", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'reload'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Fetched posts:', data); // Debugging line
      
      setAllPosts(data);
    } catch (error) {
      console.error('Fetch error:', error); // Debugging line
    }
  };
  

  

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        (item.creator && regex.test(item.creator.username)) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleFormSubmit = (e) =>{
    e.preventDefault();
  }
 

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' onSubmit={handleFormSubmit}>
        <input
          type='text'
          placeholder='Pretraži prema ključnoj reči'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
       
    </section>
  );
};

export default Feed;

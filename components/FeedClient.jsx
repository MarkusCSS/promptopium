// FeedClient.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data = [], handleTagClick, handleAddComment }) => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return null;
    }
  
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleAddComment={handleAddComment}
          />
        ))}
      </div>
    );
  };
  

const FeedClient = ({ initialPosts=[] }) => {
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState(initialPosts);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
   fetchPosts()
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/prompt', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data)
      setAllPosts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    if (!session) {
      console.error('You must be logged in to add a comment');
      return;
    }

    const data = {
      userId: session.user.id,
      promptId: postId,
      text: comment,
    };

    try {
      const response = await fetch('/api/comment/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Comment successfully added:', result);

      fetchPosts(); // Osvježavanje liste postova nakon dodavanja komentara
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

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

      <PromptCardList
        data={searchText ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
        handleAddComment={handleAddComment}
      />
    </section>
  );
};

export default FeedClient;

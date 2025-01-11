'use client';
import {useState,useEffect, use} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText]=useState("");
  const [searchResults,setSearchResults]=useState([]);
  const [searchTimeout,setSearchTimeout]=useState(null);
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[]);

  const filterPrompts=(searchText,posts)=>{
    const regex= new RegExp(searchText,'gi');
    return posts.filter(
      (item)=>
        regex.test(item.prompt) || regex.test(item.creator.username) || regex.test(item.tag)

    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value,posts);
        setSearchResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const onSearch = filterPrompts(tagName,posts);
    setSearchResults(onSearch);
  };
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
      </section>
  )
}

export default Feed
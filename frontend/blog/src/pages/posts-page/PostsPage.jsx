import React from 'react';
import './posts-page.css';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import {posts,categories} from '../../dummyData';




const PostsPage = () => {
  return (
    <>
    <section className="posts-page">
      <PostList posts={posts}/>
      <Sidebar categories={categories}/>
    </section>
    </>
  )
}

export default PostsPage
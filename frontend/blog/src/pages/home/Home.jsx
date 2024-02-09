import React from 'react'
import './home.css'
import PostList from '../../components/posts/PostList'
import {posts} from '../../dummyData'





const Home = () => {
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className='home-title'>Welcome to Blog</h1>
        </div>
      </div>

      <div className="home-latest-post">Latest Posts</div>
      <div className="home-container">
        <PostList posts={posts}/>
        <div className="post-sidebar">side bar</div>
      </div>
    </section>
  )
}

export default Home
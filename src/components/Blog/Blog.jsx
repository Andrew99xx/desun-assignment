import React, { useEffect, useState } from 'react';
import './Blog.css';
import Navbar from '../navbar';
import Footer from '../Footer/Footer';

const Blog = () => {
    const [id, setId] = useState(null);
    const [blog, setBlog] = useState({
        id: '',
        title: '',
        time: '',
        content: '',
        quote: '',
        image: '',
        categories: '',  // Add selected categories to the blog object
        authName: '',
        authImg: ''
    })
    useEffect(() => {
        // Get the current path
        const path = window.location.pathname;

        // Assuming the path is like /article/12345
        const idFromPath = path.split("/").pop(); // Get the last part of the path
        console.log("idFromPath", idFromPath);

        setId(idFromPath);
    }, []);

    useEffect(() => {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

        // Find the blog with the matching ID
        const foundBlog = blogs.find(blog => blog.id === id);
        console.log("foundBlog", foundBlog);

        if (foundBlog) {
            setBlog(foundBlog);
        } else {
            console.log("Blog not found");
        }
    }, [id])
    return (
        <>
            <Navbar />

            <div className="article-content">
                <div className="article-header">
                    <span className="date">{blog.time}-- 4 minutes</span>
                    {/* <span>4 minutes</span> */}
                </div>
                <div className="content">
                    <p>
                        <p dangerouslySetInnerHTML={{ __html: blog.content }} />

                    </p>
                </div>
                {
                    blog.categories ?
                        <div className="tags">
                            {blog.categories.map((tag, index) => (
                                <span className="tag" key={index}>{tag}</span>
                            ))}
                        </div>
                        :
                        <div className="tags">
                            <span className="tag">ADVENTURE</span>
                            <span className="tag">PHOTO</span>
                            <span className="tag">DESIGN</span>
                        </div>
                }

                <div className="author">
                    <img src={blog.authImg ? blog.authImg : "image/avatar.png"} alt="Author" className="author-image" /> {/* Replace with actual image path */}
                    <div className="author-info">
                        <p className="author-name">By {blog.authName ? blog.authName : "Jennifer"}</p>
                        {/* // <p className="author-title">Thinker & Designer</p> */}
                    </div>
                </div>
                <div className="social-icons-blog">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-pinterest"></i>
                    <i className="fab fa-behance"></i>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Blog;

import React, { useEffect, useState } from 'react';
import './Admin.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { convertToBase64 } from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';

const Admin = ({setIsLoggedIn}) => {
    const [title, setTitle] = useState('');
    const [creationTime, setCreationTime] = useState('');
    const [content, setContent] = useState('');
    const [quote, setQuote] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        console.log(localStorage.getItem('loggedIn'), !loggedIn);

        if (!loggedIn) {
            console.log("User is not logged in, redirecting...");
            navigate('/user-acc');
        }
    }, [navigate]);
    const handleImageChange = async (e) => {
        const converted = await convertToBase64(e.target.files[0])
        setImage(converted);
    };
    const handleLogout = (e) => {
        setIsLoggedIn(false)
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('loggedInUID', null);


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form data object to send data to the backend
        const formData = new FormData();
        formData.append('title', title);
        formData.append('creationTime', creationTime);
        formData.append('content', content);
        formData.append('quote', quote);
        formData.append('image', image);
        
        const uid = `uid_${Math.random().toString(36).substr(2, 9)}`;
        const authorId=localStorage.getItem("loggedInUID")
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Search for a user with matching email and password
        const user = registeredUsers.find(user => user.uid === authorId );

        const blog = {
            id:uid,
            title: title,
            time: creationTime,
            content: content,
            quote: quote,
            image: image,
            categories: categories,  // Add selected categories to the blog object
            authName:user.email,
            authImg:user.image

        }

        // Here you would send the form data to your backend using fetch or axios
        // Example:
        // axios.post('/api/blogs', formData)
        //      .then(response => console.log(response))
        //      .catch(error => console.error(error));

        // Retrieve existing blogs from localStorage
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

        // Append the new blog to the list
        blogs.push(blog);

        // Save the updated list back to localStorage
        localStorage.setItem('blogs', JSON.stringify(blogs));
        alert("Blog saved successfully")
        // Clear the form fields
        setTitle('');
        setCreationTime('');
        setContent('');
        setQuote('');
        setImage(null);
        setCategories([]);

    };

    const handleCategoryChange = (e) => {
        const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
        setCategories(selectedCategories);
    };
    return (
        <div className="blog-creation-form">
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Blog Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="creationTime">Creation Time:</label>
                    <input
                        type="datetime-local"
                        id="creationTime"
                        value={creationTime}
                        onChange={(e) => setCreationTime(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Blog Content:</label>
                    {/* <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        required
                    /> */}
                    <ReactQuill theme="snow" style={{ height: '500px', marginBottom: '50px' }} value={content} onChange={setContent} />
                </div>

                <div className="form-group">
                    <label htmlFor="quote">Quote:</label>
                    <textarea
                        id="quote"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Upload Picture:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categories">Categories:</label>
                    <select
                        id="categories"
                        multiple
                        value={categories}
                        onChange={handleCategoryChange}
                    >
                        <option value="Adventure">Adventure</option>
                        <option value="Travel">Travel</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Technology">Technology</option>
                        <option value="Branding">Branding</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Create Blog Post</button>
            </form>

            <button onClick={handleLogout} className="submit-button">Logout</button>

        </div>
    );
};

export default Admin;

import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../navbar';
import Footer from '../Footer/Footer';


const Home = () => {
    const [topics, setTopics] = useState([

        // Add more topics here
    ]);


    const handleRedirect = (id) => {
        window.location.href = `/article/${id}`
    };
    const [fullTopic, setFullTopics] = useState([
        // Add more topics here
    ]);

    useEffect(() => {
        const blogs = JSON.parse(localStorage.getItem('blogs'))
        setTopics(blogs)
        setFullTopics
    }, [])
    return (
        <>
            <Navbar />

            <div className="popular-topics">
                <div className="heading">
                    <h2>Popular topics</h2>
                    <div className="categories">
                        <span className="category active">All</span>
                        <span className="category">Adventure</span>
                        <span className="category">Travel</span>
                        <span className="category">Fashion</span>
                        <span className="category">Technology</span>
                        <span className="category">Branding</span>
                    </div>
                    <a href="#view-all" className="view-all">View All</a>
                </div>
                <div className="topics-grid" >
                    {topics.slice(0, 6).map(topic => (
                        <div className="topic-card" key={topic.id} onClick={() => handleRedirect(topic.id)}>
                            <div className="topic-image">
                                <img src={topic.image} alt={topic.title} />
                                <span className="category-label">{topic.category}</span>
                            </div>
                            <div className="topic-content">
                                <p className="date">{topic.date}</p>
                                <h3>{topic.title}</h3>
                                <p>{topic.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ padding: '50px' }}>
                </div>

            </div>
            <div className="featured-banner">
                <div className="banner-content-fashion">
                    <span className="category-label-fashion">FASHION</span>
                    <h1>Richird Norton photorealistic </h1>
                    <h1>rendering as real photos</h1>
                    <p>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                    <p className="date">08.08.2021</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;

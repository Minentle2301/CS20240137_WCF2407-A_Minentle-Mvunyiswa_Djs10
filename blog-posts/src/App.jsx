// Importing necessary modules and hooks from React
import React, { useState, useEffect } from 'react';

// BlogPosts component for fetching and displaying blog posts
const BlogPosts = () => {
  // State to hold fetched posts data
  const [posts, setPosts] = useState([]);
  // State to handle and display errors
  const [error, setError] = useState(null);
  // State to manage the loading state of the fetch operation
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to perform side effects, such as data fetching
  useEffect(() => {
    // Function to fetch posts data from an external API
    const fetchPosts = async () => {
      try {
        // Making a GET request to fetch blog posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the response status is not successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parsing the JSON response data
        const data = await response.json();
        // Updating the posts state with fetched data
        setPosts(data);
      } catch (err) {
        // Logging the error to the console
        console.error('Error occurred:', err.message);
        // Updating the error state to display an error message
        setError('Something went wrong, please try again later.');
      } finally {
        // Updating the loading state to false, regardless of success or failure
        setIsLoading(false);
      }
    };

    // Calling the fetchPosts function to fetch data
    fetchPosts();
  }, []); // Dependency array is empty to run the effect only once after the component mounts

  // Display a loading message while data is being fetched
  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  // Display an error message if the fetch operation failed
  if (error) {
    return (
      <div>
        <h2>DATA FETCHING FAILED</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Render the list of blog posts if data fetching is successful
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        // Display the posts as an unordered list if posts are available
        <ul>
          {posts.map((post) => (
            // Use the unique post ID as a key for each list item
            <li key={post.id}>
              <h2>{post.title}</h2> {/* Display the post title */}
              <p>{post.body}</p> {/* Display the post body */}
            </li>
          ))}
        </ul>
      ) : (
        // Display a message if no posts are available
        <p>No posts available.</p>
      )}
    </div>
  );
};

// Exporting the BlogPosts component as the default export
export default BlogPosts;

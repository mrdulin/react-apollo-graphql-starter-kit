import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Hello() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul data-testid="list">
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

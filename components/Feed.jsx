// Feed.js
import FeedClient from './FeedClient';

const Feed = ({ initialPosts }) => {
  return <FeedClient initialPosts={initialPosts} />;
};

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL; // Uzmi URL iz environment varijable
  try {
    const response = await fetch(`${apiUrl}/api/prompt`);
    const initialPosts = await response.json();

    return { props: { initialPosts } };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { props: { initialPosts: [] } };
  }
  
}

export default Feed;

// Feed.js
import FeedClient from './FeedClient';

const Feed = ({ initialPosts }) => {
  return <FeedClient initialPosts={initialPosts} />;
};

export async function getServerSideProps() {
  try {
    const response = await fetch('https://tvoja-api.com/api/prompt');
    const initialPosts = await response.json();

    return { props: { initialPosts } };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { props: { initialPosts: [] } };
  }
}

export default Feed;

'use client'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const {data:session}=useSession();
    const [posts,setPosts]= useState([])
    const router = useRouter()


    useEffect(() => {
      const fetchPosts = async () => {
          
              const response = await fetch(`/api/users/${session.user.id}/posts`);
              const data = await response.json();
              setPosts(data);
          
      };

      fetchPosts();
  }, [session?.user.id]);
    
    
  

        const handleEdit= (post) =>{
            router.push(`/update-prompt?id=${post._id}`)
        }
        const handleDelete = async (post) => {
          const hasConfirmed = confirm("Da li ste sigurni da zelite da obrisete ovu objavu?");
          console.log(typeof post._id)
          if (hasConfirmed) {
            try {
              const response = await fetch(`/api/prompt/${post._id}`, {
                method: 'DELETE',
              });
        
              if (response.ok) {
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);

              } else {
                console.error('Failed to delete the prompt');
              }
            } catch (error) {
              console.error('Error deleting the prompt:', error);
            }
          }
        }

  return (
    <Profile
         name='Moj'
         desc='Dobrodošli na Vaš pesolizovani profil'
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
    />
  )
}

export default MyProfile 

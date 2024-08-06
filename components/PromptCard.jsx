'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import CommentCard from './CommentCard';

// Komponenta za prikaz pojedinačnog posta
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleAddComment }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comment?postId=${post._id}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      console.log(data)
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [post._id]);

  
  // useEffect(() => {
  // fetchComments();
   
  // }, [fetchComments,post._id]);

  // Funkcija za kopiranje teksta
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  // Funkcija za prikaz forme za dodavanje komentara
  const handleAddCommentClick = () => {
    session ? setShowAddCommentForm(!showAddCommentForm) : alert('PRIJAVI SE DA ČITAŠ ILI DA POSTAVLJAŠ KOMENTARE!');
  };

  // Funkcija za slanje novog komentara
  const handleSubmitComment = async () => {
    if (typeof handleAddComment === 'function') {
      await handleAddComment(post._id, newComment);
      fetchComments(); // Osveži komentare nakon dodavanja
    } else {
      console.error('handleAddComment nije funkcija!');
    }
    setNewComment('');
    setShowAddCommentForm(false);
  };

  if (!post.creator) {
    return null;
  }

  return (
    <div className='prompt_card'>
      <h2 className='text-center font-bold text-lg mb-4 text-red-800'>Tema</h2>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center cursor-pointer g-3'>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className="flex flex-col ms-1">
            <h3 className='font-satoshi font-bold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copy'
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
     

      {/* Prikaz liste komentara */}
      <div className="comments-section">
        {session &&   comments
          .filter(comment => comment.prompt && comment.prompt._id === post._id) 
          .map(comment => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
      </div>


      {showAddCommentForm && (
        <div className='flex flex-col mt-6'>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Novi komentar...'
          />
          <button className='block bg-green-500' onClick={handleSubmitComment}>Pošalji</button>
        </div>
      )}

      {/* Prikaz opcija za izmenu i brisanje */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Izmeni
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Obriši
          </p>
        </div>
      )}
       <div className='flex justify-between'>
        <p className='font-inter text-sm red_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>
          #{post.tag}
        </p>
        <p className='font-inter text-sm blue_gradient cursor-pointer w-full text-right' onClick={handleAddCommentClick}>
          Komentar na temu
        </p>
      </div>
    </div>
  );
};

export default PromptCard;

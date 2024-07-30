'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import CommentCard from './CommentCard'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleAddComment }) => {
  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [showAddCommentForm, setShowAddCommentForm] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }

  const handleAddCommentClick = () => {
    session ? setShowAddCommentForm(!showAddCommentForm) : alert('Prijavi se da postaviš komentar!')
    
  }

  const handleSubmitComment = () => {
    handleAddComment(post._id, newComment) // poziva funkciju za dodavanje komentara
    setNewComment('')
    setShowAddCommentForm(false)
  }

  if (!post.creator) {
    return null
  }

  return (
    <div className='prompt_card'>
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
      <div className='flex justify-between'>
      <p className='font-inter text-sm red_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer w-full text-right' onClick={handleAddCommentClick}>
         Komentar
        </p>
      </div>
      
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
      <div className="comments_section">
        {post.comments && post.comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} handleAddComment={handleAddComment} />
        ))}
        
        {showAddCommentForm && (
          <div className="add_comment_form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Novi komentar...'
            />
            <button onClick={handleSubmitComment}>Pošalji</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PromptCard

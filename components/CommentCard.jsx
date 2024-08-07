'use client'

import { useState } from 'react'
import Image from 'next/image'

const CommentCard = ({ comment, handleReply, handleEdit, handleDelete, handleAddComment }) => {
  const [showReplies, setShowReplies] = useState(false)
  const [showAddCommentForm, setShowAddCommentForm] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleToggleReplies = () => {
    setShowReplies(!showReplies)
  }

  const handleAddCommentClick = () => {
    setShowAddCommentForm(!showAddCommentForm)
  }

  const handleSubmitComment = () => {

   handleAddComment(comment._id, newComment)  // poziva funkciju za dodavanje komentara
    setNewComment('')
    setShowAddCommentForm(false)
  }

  return (
    <div className='comment_card border-y-2 p-1 my-4 bg-yellow-50'>
       <h2 className='text-center font-semibold text-base mb-4 text-green-800'>komentar</h2>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center cursor-pointer g-3'>
          <Image 
            src={comment.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className="flex flex-col ms-1">
            <h3 className='font-satoshi font-bold text-gray-900'>
              {comment.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {comment.creator.email}
            </p>
          </div>
        </div>
        <div className="comment_actions">
         
          {comment.isEditable && (
            <>
              <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleEdit}>
                Izmeni
              </p>
              <p className='font-inter text-sm red_gradient cursor-pointer' onClick={handleDelete}>
                Obriši
              </p>
            </>
          )}
          
         
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {comment.text}
      </p>
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
      {comment.replies && comment.replies.length > 0 && (
        <div className="nested_comments">
          <button onClick={handleToggleReplies}>
            {showReplies ? 'Sakrij Odgovore' : 'Prikaži Odgovore'}
          </button>
          {showReplies && comment.replies.map((reply) => (
            <CommentCard key={reply._id} comment={reply} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} handleAddComment={handleAddComment} />
          ))}
        </div>
      )}
       <p className='font-inter text-sm text-right mb-4 green_gradient cursor-pointer' onClick={handleReply}>
            Odgovori na komentar
          </p>
    </div>
  )
}

export default CommentCard

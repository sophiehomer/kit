import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { LIKE_POST, DELETE_POST, ADD_COMMENT } from '../../utils/mutations';
import { ADD_COMMENT_LIKE, DELETE_COMMENT } from '../../utils/mutations'
import Header from '../Header/header'
import { BsFillSuitHeartFill } from 'react-icons/bs'

import './singlePost.css';

function SinglePost() {
    // censor filter
    // Bad word Filter
    // var Filter = require('bad-words'),
    //     filter = new Filter();
    // filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')

    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    const userComments = data?.post?.comments || [];

    // Mutations
    const [addCommentLike] = useMutation(ADD_COMMENT_LIKE)
    const [addLike] = useMutation(LIKE_POST);
    const [addComment] = useMutation(ADD_COMMENT);
    const [deletePost] = useMutation(DELETE_POST)
    const [deleteComment] = useMutation(DELETE_COMMENT)

    const [formStateComment, setFormStateComment] = useState({
        commentBody: '',
        postId: postId,
    });

    const handleChangeComment = (event) => {
        let { name, value } = event.target;

        setFormStateComment({
            ...formStateComment,
            [name]: value,
        });
    };

    const handleFormSubmitComment = async (event) => {
        event.preventDefault();
        await addComment({
            variables: { ...formStateComment },

        });
        window.location.reload();
    };

    // Like click function
    function likeClick() {
        addLike({ variables: { postId: userPost._id } })
        if (userPost.banMeter >= 0.6) {
            deletePost({ variables: { postId: userPost._id } })
            const deletedPost = document.getElementById('single-post-page');
            deletedPost.remove();
        }
    }

    return (
        <>
            <Header />
            <main id="single-post-page">
                <section className='single-page-discussion-post'>
                    <div className="nameDateDiv">
                        <p id="username-post">{userPost.username}</p>
                        <p id="single-post-date">{userPost.createdAt}</p>
                    </div>
                        <p id="single-post-userTitle-post">{userPost.postTitle}</p>
                        <p id="postText"> {userPost.postText}</p>
                        <div id="likesAndCommments">
                            <form id='comment-form' onSubmit={handleFormSubmitComment}>
                                <input method="post" className='post-tile' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Leave a comment' />
                                <button className='post-button' id='postBtnComment'>Comment</button>
                                <div id='waringDivComment'></div>
                                
                                {userPost.likesLength}<button className='voteBtnClickable' onClick={likeClick}><BsFillSuitHeartFill /></button>
                               
                            </form>
                        </div>
                    </section>
                    <section className='commentSection'>
                        {userComments && userComments.map((comment, index) => (
                                <section className='comments-container' key={index} id={index}>
                                    <p className='commentUsername'>{comment.username} commented on {comment.createdAt}</p>
                                    <p className='commentDate'></p>
                                    <p className='commentBody'>{comment.commentBody}</p>

                                  <div className="commentLikesContainer">
                                    {comment.likesLength
                                    }<button  className='commentVoteBtn' onClick={() => {
                                        addCommentLike({ variables: { commentId: comment._id } })
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }}}>
                                        <BsFillSuitHeartFill />
                                    </button>
                                    </div>
                                </section>
                            ))}
                    </section>
                            
            </main>
        </>
    )
}

export default SinglePost;


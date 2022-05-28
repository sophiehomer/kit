import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';

function FriendProfile () {

    const { id: userId } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    const { basic } = useQuery(QUERY_ME_BASIC);
    const { queryPost } = useQuery(QUERY_POSTS);
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];
    const username = basic?.me.username || '';
    console.log('user', userPosts)

    // set up state variables
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
      const [addPost, { error }] = useMutation(ADD_POST);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addPost({
        variables: { ...formState },
    });
    };



    return (
        <>  
            <form id='post-form' onSubmit={handleFormSubmit}>
            <section>
            <input type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Write Title Here' />
            <input type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Write Post Here' />
            <button className='post-btn'>POST</button>
            </section>
            </form>

            <section>
                <h1>Posts</h1>
                {userPosts.map((post, index) => (
                    <section key={index}>
                        <h3>{post.postTitle}</h3>
                        <p>{post.postText}</p>
                    </section>
                ))}
            </section>
            <section>
                <h1>Friends</h1>
                {userFriends.map((friend, index) => (
                    <div key={index}>
                       <Link to={`/friendprofile/${friend._id}`}>{friend.username}</Link>
                    </div>
                ))} 
            </section>
        </>
    )
}

export default Profile;

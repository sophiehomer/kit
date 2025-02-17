import Auth from "../../utils/auth";
import { useParams, Link } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import { useQuery} from "@apollo/client";
import "./profile.css";
import Header from "../Header/header.js";
// import { Avatar } from "@chakra-ui/avatar"
import { BsDot } from 'react-icons/bs'
import Comment from '../Comment/comment'


function Profile() {
  // get ID and query a user's info
  const { id: userId } = useParams();
  const { data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  });

  // Get username and friends
  const userInfo = data?.user || [];
  const userPosts = data?.user.posts || [];
  const userFriends = data?.user.friends || [];

  const loggedIn = Auth.loggedIn();
  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <main className="profilePage">
            <section className="postsSection">
              {userPosts.map((post, index) => (
                <section className="profile-discussion-post" key={index}>
                  <div className="avatarNameDateContainer">
                    <div className="avatarContainer"> 
                      {/* <Avatar src="john-doe.png" name={userInfo.username} /> */}
                    </div>
                    <div className="nameDateContainer"> 
                      <h3 id="username-post">{userInfo.username}</h3>
                      <div className="dot"> 
                        < BsDot />
                      </div>
                      <p className="postDateCreated">{post.createdAt}</p>
                    </div>
                  </div>
                  <div className="profTitlePost">
                    <h4 id="userTitle-post">
                    {post.postTitle}
                    </h4>
                    <div className="profilePostAndLikes"> 
                    <p id="postText">{post.postText}</p>
                    </div>
                    < Comment post_id={post._id}  isProfile={true}/>
                  </div>
                </section>
              ))}
            </section>
            <section className="friendsSection">
              <h2 className="friends">Friends </h2>
                {userFriends.map((friend, index) => (
                  <div className="profileFriendAvatar" key={index}>
                    <Link to={`/profile/${friend._id}`}> 
                      <div className="profileAvatarContainer"> 
                        {/* <Avatar src="john-doe.png" name={friend.username} /> */}
                      </div>{friend.username}
                    </Link>
                  </div>
                ))}
            </section>
          </main>
        </>
      ) : (
        <>
          <p>You must be to logged in to proceed</p>
        </>
      )}
    </>
  );
}

export default Profile;

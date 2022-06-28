import './searchPeople.css';
import Header from '../Header/header.js';
import { QUERY_USER_BY_NAME } from '../../utils/queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';

function SearchPeople() {
    // find user Query
    const [findUser, { data }] = useLazyQuery(QUERY_USER_BY_NAME);

    // Add friend Query
    const [addFriend] = useMutation(ADD_FRIEND);
    return (
        <>
                <Header />
            <main className="search-friend-section">
            <form id="search-friend-form" onSubmit={async (e) => {
                e.preventDefault();
                console.log("hello world")
                const inquiryUser = await document.getElementById('search-bar').value
                console.log(inquiryUser)
                const user = await findUser({ variables: { username: inquiryUser } })
                console.log(user)
            }
            }>
                
                {/* <label id="sfp-label" className='searchFriendText'>Search Friends</label> */}
                <div className="searchSection">
                    <input id='search-bar' type='text' name='search-bar' placeholder="Search friends" />
                    <button id="search-friend-btn" type='submit'>Search</button>
                </div>
                { data && data.userByName === null && <p>User does not exist</p>}
                {/* { data && data.userByName !== null && 
        
                <>
                    <div id="foundFriendDiv">
                    <p id="foundFriend">{data.userByName.username}</p>
                    <button id="addFriendBTN"onClick={() => {
                        try {
                            addFriend({variables: {friendId: data.userByName._id}})
                            alert("friend has been added!")
                        } catch(e) {
                            console.log(e)
                            alert("You are already friends")
                        }
                    }}>Add Friend</button>
                    </div>
                </>
               
                } */}
            </form>
            { data && data.userByName !== null && 
        
        <>
            <div id="foundFriendDiv">
            <p id="foundFriend">{data.userByName.username}</p>
            <button id="addFriendBTN"onClick={() => {
                try {
                    addFriend({variables: {friendId: data.userByName._id}})
                    alert("friend has been added!")
                } catch(e) {
                    console.log(e)
                    alert("You are already friends")
                }
            }}>Add Friend</button>
            </div>
        </>
       
        }
            </main>
            <div>

            </div>
        </>
    )
}

export default SearchPeople;
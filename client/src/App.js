import 'bootstrap/dist/css/bootstrap.min.css';

// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import Apollo Client package for context
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// components 
import Home from "./components/Home/home";
import Nav from "./components/Nav/nav";
import Signup from "./components/Signup/signup";
import Profile from "./components/Profile/profile";
import Contact from "./components/Contact/contact";
import Login from "./components/Login/login";
import CreatePost from "./components/CreatePost/createPost";
<<<<<<< HEAD
import SinglePost from "./components/SinglePost/SinglePost";
import FriendProfile from "./components/FriendProfile/friendProfile";
import SearchPeople from "./components/SearchPeople/searchPeople";
=======
import Footer from "./components/Footer/footer"
>>>>>>> 056a81f (final use of positioning, moving forward with flexbox)

// Set up Apollo link 
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  // render Nav if logged in
    // ................

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/Create-post" element={<CreatePost />} />
          <Route path="/Single-post" element={<SinglePost />} />
          <Route path="/friendprofile/:id" element={<FriendProfile />} />
          <Route path="/search-people" element={<SearchPeople />} />
          {/* <Route path="/Contact" element={<Contact />} /> */}
        </Routes>
      </Router>
      <Footer></Footer>
    </ApolloProvider>
  );
}

export default App;

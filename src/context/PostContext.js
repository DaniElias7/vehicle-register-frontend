import {useState, createContext, useContext} from 'react';
import  {getPostRequests, createPostRequests, deletePostRequests, getPostRequest, updatePostRequest} from '../api/posts.js'

const postContext = createContext();

export const usePosts = () => {
    const context = useContext(postContext);
    return context;
}

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState('all-vehicles');  {/* Where the user is */}
    const [currentCarId, setCurrentCarId] = useState('');

    const getPosts = async () => {
        const res = await getPostRequests();
        setPosts(res.data)
    };

    const createPosts = async (post) => {
        const res = await createPostRequests(post);
        setPosts([...posts], res.data)
    };  

    const deletePosts = async (id) => {
        await deletePostRequests(id);
        setPosts(posts.filter( (post) => post._id !== id));
    };  

    const getPost = async id => {
        const res = await getPostRequest(id)
        return res.data
    }

    const updatePost = async (id, post) => {
        const res = await updatePostRequest(id, post)
        return res.data 
    }

    return (
        <postContext.Provider value={{ 
            posts, getPosts, createPosts, deletePosts, getPost, 
            updatePost, page, setPage, currentCarId, setCurrentCarId
         }}>
            {children}
        </postContext.Provider>
    )
}
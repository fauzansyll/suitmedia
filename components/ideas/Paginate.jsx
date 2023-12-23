import style from '@/styles/idea/Paginate.module.scss'
import axios from 'axios'
import {useEffect, useState} from 'react'

const ListPost= ({dataImages}) => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('latest');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [ideas, setIdeas] = useState([]);

    console.log(dataImages)

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('/api/blog.js', {
    //             params: {
    //                 'page[number]': 1,
    //                 'page[size]': 10,
    //                 append: ['small_image', 'medium_image'],
    //                 sort: '-published_at',
    //               },
    //         });
    //         setPosts(response.data); 
    //       } catch (error) {
    //         console.error('Error fetching data: ', error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

      

      const handleSortChange = (value) => {
        setSortBy(value);
      };
    
      const handlePerPageChange = (value) => {
        setPerPage(value);
      };
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      let sortedPosts = [...posts];
      if (sortBy === 'oldest') {
        sortedPosts = sortedPosts.reverse();
      }
    
      const indexOfLastPost = currentPage * perPage;
      const indexOfFirstPost = indexOfLastPost - perPage;
      const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    return(
        <div className={`${style.main}`}>
            <div className={`${style.list}`}>
                <select onChange={(e) => handleSortChange(e.target.value)}>
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                </select>
                <select onChange={(e) => handlePerPageChange(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                {currentPosts.map((post) => (
                    <div key={post.id} className="post-card">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <h3 style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {post.title}
                    </h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListPost;

export async function getStaticProps() {
    const res1 = await fetch('http://localhost:3000/api/blog.js')
    const dataImages = await res1.json()
  
    return {
      props: { dataImages,},
    };
  }
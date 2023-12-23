import style from '@/styles/idea/Paginate.module.scss'
import axios from 'axios'
import Image from 'next/image'
import {useEffect, useState, useRef} from 'react'
import ReactPaginate from 'react-paginate';

function Blog({dataUsers, dataEvent, dataNews, dataImages, ideas}) {
  
  const [sortBy, setSortBy] = useState('latest');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const postsPerPage = perPage;
  useEffect(() => {
    if (dataImages && dataImages.length > 0) {
      
      let sortedData = [...dataImages]; 

      if (sortBy === 'oldest') {
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      const indexOfLastPost = currentPage * perPage;
      const indexOfFirstPost = indexOfLastPost - perPage;
      const currentPosts = sortedData.slice(indexOfFirstPost, indexOfLastPost);

      setFilteredData(currentPosts);
    }
  }, [dataImages, sortBy, perPage, currentPage]);

  useEffect(() => {
    fetch('https://suitmedia-fauzansyahlan.vercel.app/api/blog')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setFilteredData(data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error); 
      });
      
  }, []);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
  };
  
  return (
      <div className={`${style.blog}`} >
      <div className={`${style.controls}`}>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <label htmlFor="perPage">Items per page:</label>
          <select id="perPage" value={perPage} onChange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className={`${style.paginate}`}>
      {filteredData
          .slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage)
          .map((post) => (
            <div key={post.id} className={`${style.postcard}`}>
            <Image
              src={post.urlImage}
              width={300}
              height={300}
              alt="Post image"
            />
            <div className={`${style.desc}`}>
              <h4>{post.date}</h4>
              <h3 >
                {post.title}
              </h3>
            </div>
            </div>
          ))}
        
        
      </div>
      <ReactPaginate
          previousLabel={'Previous'}
          className={`${style.pagi}`}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredData.length / postsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    
  )
}
export async function getStaticProps() {
  const res1 = await fetch('https://suitmedia-fauzansyahlan.vercel.app/api/blog')
  const dataImages = await res1.json()
  return {
    props: { dataImages },
  };
}

export async function getServerSideProps() {
  const ideas = await getIdeas();

  return {
    props: {
      ideas,
    },
  };
}
export default Blog;
import {useState} from 'react';

import { Row, Button, Col } from 'react-bootstrap';
//import BlogNavbar from '../components/Navbar';
import PageLayout from '../components/PageLayout';
import AuthorIntro from '../components/AuthorIntro';
//import CardItem from '../components/CardItem';
//import CardListItem from '../components/CardListItem';
import { getPaginatedBlogs } from '../lib/api';

import { useGetBlogsPages} from  '../actions/pagination';
import { useGetBlogs } from '../actions';
import FilterMenu from '../components/FilterMenu';

//const fetcher = url => fetch(url).then(res => res.json());

//export default function Home({blogs: initialData}) {
export default function Home({blogs}) {  
  const [filter, setFilter] = useState({
    view: {list: 0 },
    date: { asc: 0}
  });

  console.log('blogs', blogs);

  //loadMore: to load more data
  // isloadingMore: is true when we are making a request
  //isReachingEnd: is true when we loaded all the data
  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
  } = useGetBlogsPages({blogs, filter});
 
  //const { data: blogsData, error } = useGetBlogs(initialData); - not needed with pagination
  /* if (data) {
    alert(JSON.stringify(data)); */
  if (!blogs) {return 'Loading'; }
   


  return (
    <PageLayout>
      {/* <BlogNavbar /> */}
     
        <AuthorIntro />
        <FilterMenu 
          filter={filter}
          onChange={(option, value) => {
          setFilter({...filter, [option]: value});
        }} />
        <hr/>
      
        {/* className from props */}
       
        <Row className="mb-5">
          {pages}
         {/*  <Col md="10">
           
             <CardListItem />
            
          </Col> */}
       {/*   { blogs.map(blog =>
           filter.view.list ?
           <Col key={`${blog.slug}-list`} md="9">
              <CardListItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                link={{
                  href: '/blogs/[slug]',
                  as: `/blogs/${blog.slug}`
                }}
              />
            </Col>
           :
           <Col key={blog.slug} md="4">
              <CardItem 
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                image={blog.coverImage}
                //  slug={blog.slug}
                link={{
                  href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                }}
              />
           </Col>
        
          )}  */}
        </Row>
        <div style={{textAlign: "center"}}>
          <Button
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
            size="lg"
            variant="outline-secondary"
         >
            { isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More blogs'}
        
         
          </Button>
        </div>
       
      
     
    </PageLayout>
  )
}
//Provides props to the page
export async function getStaticProps() {
  const blogs = await getPaginatedBlogs({offset: 0, date: 'desc'});
  return {
    props: {
      blogs
    }
  }
}
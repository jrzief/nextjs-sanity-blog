import { Row, Col } from 'react-bootstrap';
import PageLayout from '../../components/PageLayout';
import BlogHeader from '../../components/BlogHeader';
import BlogContent from '../../components/BlogContent';
import { getBlogBySlug, getPaginatedBlogs } from '../../lib/api';

import { urlFor } from '../../lib/api';
import moment from 'moment';
import { useRouter } from 'next/router';
//import BlockContent from '@sanity/block-content-to-react';

/* const serializers = {
  types: {
    code: (props) => {
      return (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
          <p>{props.node.filename}</p>
        </pre>
      )
    }
  }
} */

const BlogDetail = ({blog}) => {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404"/>
  }
  if (router.isFallback) {
    console.log('Loading Fallback page');
    return (
      <PageLayout className="blog-detail-page">
        Loading...
      </PageLayout>
    )
  }
  //debugger
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
        <BlogHeader 
          title={blog.title}
          subtitle={blog.subtitle}
          coverImage={urlFor(blog.coverImage).height(400).url()}
          author={blog.author}
          date={moment(blog.date).format('LL')}
        />
       {/*  <BlockContent
           imageOptions={{w: 320, h: 240, fit: 'max'}}
           serializers={serializers}
           blocks={blog.content}
        />
 */}
          {/* <div className="blog-detail-header">
            <p className="lead mb-0">
              <img
                src={blog.author.avatar}
                className="rounded-circle mr-3"
                height="50px"
                width="50px"
                alt="avatar"/>
              {blog.author.name}
              {', '} {blog.date}
            </p>
            <h1 className="font-weight-bold blog-detail-header-title mb-0">{blog.title}</h1>
            <h2 className="blog-detail-header-subtitle mb-3">{blog.subtitle}</h2>
              {/* Check if contains cover image */}
             {/*  <img
                className="img-fluid rounded"
                src={blog.coverImage} alt=""/>

          </div> */} 
          <hr/>
          {/* Blog Content Here */}
          {blog.content &&
            <BlogContent content={blog.content}/>
          }
          {/* Default content here */}
        </Col>
      </Row>
    </PageLayout>
  )
}

/* export async function getServerSideProps({params}) {
  const blog = await getBlogBySlug(params.slug);
  return {
    props: {blog}
  }
} */

export async function getStaticProps({params}) {
  console.log(params);
  console.log('Loading  Detail Page!!!');
  const blog = await getBlogBySlug(params.slug);
  return {
    props: {blog},
    revalidate: 1
  }
}

// TODO: introduce Fallback
export async function getStaticPaths() {
  const blogs = await getPaginatedBlogs();
  //const paths = blogs?.map(b => ({params: {slug: b.slug}}));
  const paths = blogs?.map(b => (
    {
       params: {slug: b.slug}
    })
  );
  console.log(paths);
  return {
    paths,
    fallback: true
  }
}

export default BlogDetail;

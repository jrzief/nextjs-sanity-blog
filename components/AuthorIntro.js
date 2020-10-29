import { Row, Col, Media, Image } from 'react-bootstrap';



const AuthorIntro = () => 
  <Row>
    <Col md="8">
      {/* AUTHOR INTRO STARTS */}
      <Media className="mb-4 admin-intro">
        <Image
          roundedCircle
          width={120}
          height={120}
          className="mr-4"
          src="https://raw.githubusercontent.com/jrzief/nextjs-sanity-blog/main/public/BGheadshot.jpeg"
          // src="/bgheadshot.jpeg"
          //  src="https://avatars1.githubusercontent.com/u/9482724?s=460&u=69a6acab13fd5547a4e316e496b573271077147f&v=4"
          alt="image placeholder"
        />
        <Media.Body>
          <h5 className="font-weight-bold mb-0">Hello Friends,</h5>
          <p className="welcome-text">
            My name is Brian Griner and I am an experienced data scientist and freelance consultant
            in Machine Learning, Biostatistics, and Health Policy.
          </p>
        </Media.Body>
      </Media>
      {/* AUTHOR INTRO ENDS */}
    </Col>
  </Row>


export default AuthorIntro;
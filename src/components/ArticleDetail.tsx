import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  Alert,
  Spinner,
  Button,
} from 'react-bootstrap'
import { IArticle, ILaunch } from '../interfaces'

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<IArticle | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null) // Reset error state
    axios
      .get<IArticle>(`https://api.spaceflightnewsapi.net/v4/articles/${id}`)
      .then((response) => {
        setArticle(response.data)
        console.log(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching article:', error)
        setError(`Error fetching article:${error}`)
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return (
      <Container>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Alert variant='danger'>{error}</Alert>
      </Container>
    )
  }

  if (!article) {
    return (
      <Container>
        <Alert variant='danger'>Article not found</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Image
            src={article.image_url}
            alt={article.title || 'No title'}
            fluid
          />
        </Col>
        <Col md={4}>
          <h1>{article.title}</h1>
          <p>
            <small className='text-muted'>
              Published on{' '}
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString()
                : 'Unknown'}
            </small>
          </p>
          <p>Source: {article.news_site || 'Unknown'}</p>
          <p>{article.summary || 'No summary available'}</p>
          <a
            href={article.url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-primary'
          >
            View Original Article
          </a>
          <Link to={'/'} className='ms-3'>
            <Button variant='success'>Back</Button>
          </Link>
        </Col>
      </Row>
      {article.launches?.length > 0 && (
        <Row className='mt-4'>
          <Col>
            <h3>Related Launches</h3>
            <ListGroup>
              {article.launches.map((launch: ILaunch) => (
                <ListGroup.Item key={launch.launch_id}>
                  <Badge bg='secondary' className='me-2'>
                    {launch.launch_id}
                  </Badge>
                  {launch.provider}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
      {article.events?.length > 0 && (
        <Row className='mt-4'>
          <Col>
            <h3>Events</h3>
            <ListGroup>
              {article.events.map((event: any, index: number) => (
                <ListGroup.Item key={index}>{event}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ArticleDetail

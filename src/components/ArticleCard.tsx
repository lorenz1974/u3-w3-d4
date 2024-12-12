import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IArticle } from '../interfaces'

interface ArticleCardProps {
  article: IArticle
}

const ArticleCard = (props: ArticleCardProps) => {
  return (
    <Card>
      <Card.Img
        variant='top img-fluid'
        src={props.article.image_url}
        alt={props.article.title}
      />
      <Card.Body>
        <Card.Title>{props.article.title}</Card.Title>
        <Card.Text>
          <small className='text-muted'>Site: {props.article.news_site}</small>
        </Card.Text>
        <Card.Text>{props.article.summary.slice(0, 100)}...</Card.Text>
        <Link to={`/article/${props.article.id}`}>
          <Button variant='warning'>Read</Button>
        </Link>
        <a
          href={props.article.url}
          target='_blank'
          className='btn btn-secondary ms-2'
        >
          To the Article
        </a>
      </Card.Body>
    </Card>
  )
}

export default ArticleCard

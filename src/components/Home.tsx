import { useEffect, useState } from 'react'
import axios from 'axios' //https://www.npmjs.com/package/react-axios
import { Button } from 'react-bootstrap'
import Slider from 'react-slick'
import { IApiResponse, IArticle } from '../interfaces'
import ArticleCard from './ArticleCard'

const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles('https://api.spaceflightnewsapi.net/v4/articles/?limit=10')
  }, [])

  const fetchArticles = (url: string) => {
    axios
      .get<IApiResponse>(url)
      .then((response) => {
        setArticles(response.data.results)
        setNext(response.data.next)
        setPrevious(response.data.previous)
      })
      .catch((error) => console.error(error))
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <>
      <Slider {...settings}>
        {articles.map((article) => (
          <div key={article.id} className='p-2 h-100'>
            <ArticleCard article={article} />
          </div>
        ))}
      </Slider>
      <div className='d-flex justify-content-between my-4'>
        <Button
          disabled={!previous}
          onClick={() => previous && fetchArticles(previous)}
        >
          Previous
        </Button>
        <Button disabled={!next} onClick={() => next && fetchArticles(next)}>
          Next
        </Button>
      </div>
    </>
  )
}

export default Home

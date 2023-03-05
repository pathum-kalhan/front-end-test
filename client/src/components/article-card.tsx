import React from 'react'
import { Article } from '../types'

var intlNumberFormatValues = ['de-DE', 'currency', 'EUR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className={'article'}>
      <img src={article.images[0].path}  className={"article__sections"} />
      <div className={"article__sections"}>{article.name}</div>
      <div className={"article__sections"}>{formatter.format(article.prices.regular.value / 100)}</div>
      <section role="button" className='article__button' >Add to cart</section>
    </div>
  )
}

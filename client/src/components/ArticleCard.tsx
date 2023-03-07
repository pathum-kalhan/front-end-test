import { Grid } from '@mui/material';
import React from 'react'
import { Article } from '../types'

var intlNumberFormatValues = ['de-DE', 'currency', 'EUR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});

export default function ArticleCard({ article }: { article: Article }) {
 
  return (
    <Grid item className={'item'} xs={12} sm={6} md={3} lg={3}>
      <img src={article.images[0].path}  className={"item__sections"} alt={article.name} />
      <div className={"item__sections"}>{article.name}</div>
      <div className={"item__sections"}>{formatter.format(article.prices.regular.value / 100)}</div>
      <section role="button" className='item__button' >Add to cart</section>
    </Grid>
  )
}

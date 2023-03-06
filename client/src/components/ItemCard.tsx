import { Grid } from '@mui/material';
import React from 'react'
import { Article } from '../types'

var intlNumberFormatValues = ['de-DE', 'currency', 'EUR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});

export default function ItemCard({ item }: { item: Article }) {
 
  return (
    <Grid item className={'item'} xs={12} sm={6} md={3} lg={3}>
      <img src={item.images[0].path}  className={"item__sections"} alt={item.name} />
      <div className={"item__sections"}>{item.name}</div>
      <div className={"item__sections"}>{formatter.format(item.prices.regular.value / 100)}</div>
      <section role="button" className='item__button' >Add to cart</section>
    </Grid>
  )
}

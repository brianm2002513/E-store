import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../fetcher';
import styled from 'styled-components';

const ProductDetail = () => {

  const [product, setProduct] = useState({ errorMessage: '', data: [] });
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductById(productId);
      setProduct(responseObject);
    }
    fetchData();
  }, [productId]);

  const createMarkup = () => {
    return { __html: product.data?.description }
  }

  return (
    <>
      <div className="category-product-title">
        <h1>{product.data.title}</h1>
      </div>

      <article>
        <figure>
          <div className='category-product-image-container'>
            <img src={`/assets/${product.data.image}`} alt={product.data.title} />
          </div>
        </figure>

        <aside>
          <div className='category-product-info-dimensions'>
            <h3>Dimensions</h3>
            <label>{product.data.specs?.dimensions}</label>
          </div>

          {
            product.data.specs?.capacity &&
            <div className='category-product-info-capacity'>
              <h3>Capacity</h3>
              <label>{product.data.specs?.capacity}</label>
            </div>
          }

          <div className='category-product-info-features'>
            <h3>Features</h3>
            <ul>
              {product.data.features?.map((f, i) => {
                return <li key={`features${i}`}>{f}</li>
              })
              }
            </ul>
          </div>
        </aside>

        <aside className='category-product-finance'>
          <div className='category-product-finance-price'>
            &pound;{product.data.price}
          </div>

          <div className='category-product-info-stock'>
            <label>Stock level: {product.data.stock}</label><br />
            <label>FREE Delivery</label>
          </div>

          <div className='category-product-action'>
            <button className='add-to-basket'>Add to Basket</button>
          </div>
        </aside>

        <ProductDescription dangerouslySetInnerHTML={createMarkup()}></ProductDescription>

      </article>
    </>
  )
}

export default ProductDetail;

const ProductDescription = styled.div`
  grid-column: 1 / span 3;
`;
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';

// Subcomponent/Context imports
import StarRating from '../../shared/StarRating.jsx';
import { ProductIdContext } from '../../index.jsx';

function Checkout(props) {
  const {
    item, styles, styleIndex, setStyleIndex,
  } = { ...props }.data;

  const { addToOutfitter, itemId } = useContext(ProductIdContext);
  // Fill style thumbnails
  const styleThumbs = styles.map((dataStyle, index) => {
    const classList = index !== styleIndex
      ? 'style-thumbnail' : 'style-thumbnail style-thumbnail-selected';

    // Replace with placeholder, if image doesn't exist
    let thumbnailUrl = dataStyle.photos[index]?.thumbnail_url ? dataStyle.photos[index]?.thumbnail_url : '';
    if (thumbnailUrl.length > 0 && thumbnailUrl[0] !== 'h') {
      thumbnailUrl = thumbnailUrl.substring(1, thumbnailUrl.length);
    } else if (thumbnailUrl === '' || !thumbnailUrl) {
      thumbnailUrl = '../../assets/Images/placeholder.png';
    }

    return (
      <li>
        <button className={classList} style={{ backgroundImage: `url('${thumbnailUrl}')` }} data-index={index} type="button"> </button>
      </li>
    );
  }) || [];
  // Fill size options for current style
  const sizeOptions = Object.entries(styles[styleIndex].skus).map(([sku, data]) => (
    <option data-sku={sku}>
      {data.size}
    </option>
  )) || [];
  // Define quantity options
  const [quantityOptions, setQuantityOptions] = useState([]);

  // Event Handlers
  const styleChange = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('style-thumbnail')) {
      // Reassign selected style
      const index = e.target.getAttribute('data-index' || 0);
      document.querySelector('.style-thumbnail-selected')
        .classList.remove('style-thumbnail-selected');
      e.target.classList.add('style-thumbnail-selected');
      setStyleIndex(index);
      setQuantityOptions([]);
      document.querySelector('.size').value = 'SELECT SIZE';
      document.querySelector('.quantity').value = '0';
    }
  };
  const sizeChange = (e) => {
    e.preventDefault();
    const sku = e.target.options[e.target.selectedIndex].getAttribute('data-sku');
    const quantityAvailable = styles[styleIndex].skus[sku]?.quantity;
    const newQuantityOptions = [];
    for (let i = 1; i <= quantityAvailable; i += 1) {
      newQuantityOptions.push(<option>{i}</option>);
    }
    document.querySelector('.quantity').value = 0;
    setQuantityOptions(newQuantityOptions);
  };
  const checkout = (e) => {
    e.preventDefault();
    const sizeEl = document.querySelector('.size');
    const size = sizeEl.value.trim();
    const quantityEl = document.querySelector('.quantity');
    const quantity = parseInt(quantityEl.value.trim(), 10);
    if (size === 'SELECT SIZE' || quantity === 0) {
      alert('wrOOOng!!#@');
    }
  };

  useEffect(() => {
    // Reset selected style to be the first style
    document.querySelector('.style-thumbnail-selected')
      .classList.remove('style-thumbnail-selected');
    console.log(document.querySelectorAll('.style-thumbnail')[0]);
    document.querySelectorAll('.style-thumbnail')[0]
      .classList.add('style-thumbnail-selected');
    setStyleIndex(0);
  }, [itemId]);

  return (
    <section className="checkout-section">
      {/* Rating and Title */}
      <div className="rating-title">
        <div className="reviews-wrapper">
          <StarRating rating={item.rating} className="checkout-star-rating" />
          <a href="https://www.google.com/" className="reviews-link" target="_blank" rel="noreferrer">
            Read all reviews
          </a>
        </div>
        <p className="category">{item.category.toUpperCase()}</p>
        <h2 className="category-title">{item.name}</h2>
        <p className="price">{`$${Math.round(styles[styleIndex].original_price)}`}</p>
      </div>

      {/* Style */}
      <div className="style">
        <strong>
          {'STYLE > '}
          <span className="style-selected-span">{styles[styleIndex].name.toUpperCase()}</span>
        </strong>
        <ul className="style-list" onClick={styleChange}>
          {styleThumbs.map((style, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {style}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Checkout Options */}
      <div className="checkout">
        <select className="size" onChange={sizeChange} defaultValue="SELECT SIZE">
          <option disabled>SELECT SIZE</option>
          {sizeOptions.map((size, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {size}
            </React.Fragment>
          ))}
        </select>
        <i className="fa-solid fa-caret-down select-icon select-icon-quantity" />
        <select className="quantity">
          <option disabled>0</option>
          {quantityOptions.map((quantity, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {quantity}
            </React.Fragment>
          ))}
        </select>
        <i className="fa-solid fa-caret-down select-icon select-icon-size" />

        <button className="checkout-button" type="button" onClick={checkout}>ADD TO BAG</button>
        <button type="button" className="outfitter-add-button" onClick={addToOutfitter}>
          <i className="fa-solid fa-heart" />
        </button>
      </div>
    </section>
  );
}

export default Checkout;

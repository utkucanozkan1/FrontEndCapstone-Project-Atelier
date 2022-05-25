import React, { useState } from 'react';
import axios from 'axios';
import {
  FormStyle, Header,
} from '../../RR-styled-components/RRsectionContainerStyle';
// import withRangeOption from "./withRangeOption.jsx"

export default function Form({ product_id }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState('true');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setChar] = useState({});
  const chars = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const handleCheck = () => {
    if (recommend === 'true') {
      setRecommend('false');
    }
    setRecommend('true');
  };

  const handleSubmit = () => {
    // console.log({product_id, summary, name, content, email});
    axios.post('/reviews', {
      product_id, summary, body, recommend, name, email, photos, characteristics,
    })
      .then(() => {
        console.log('Added a review! ');
      })
      .catch((err) => {
        console.log('axios post reviews error', err);
      });
  };

  return (
    <FormStyle>
      <section>
        <header>
          <h2>Write Your Review</h2>
        </header>
        <form>
          <Header>
            <h3>
              <label>
                <span>Overall rating</span>
              </label>
            </h3>
          </Header>
          <hr />
          <Header>
            <label>
              <span>Do you recommend this product?</span>
              {' '}
              <medium>Yes</medium>
              {' '}
              <input name="status" type="checkbox" onChange={handleCheck} />
            </label>
          </Header>
          <hr />
          <Header>
            <h3>
              <label>
                <span>Characteristics</span>
              </label>
            </h3>
            {Object.keys(chars).map((char) => (
              <div>
                <span>{char}</span>
                {' '}
                <select>
                  {chars[char].map((elem, i) => (
                    <option value={i + 1}>{elem}</option>
                    // setChar
                  ))}
                </select>
              </div>
            ))}
          </Header>
          <hr />
          <Header>
            <h3>
              <label>
                <span>Review summary</span>
              </label>
            </h3>
          </Header>
          <div>
            <label>
              <textarea
                value={summary}
                maxLength="60"
                rows="3"
                cols="50"
                placeholder="Summary"
                onChange={(e) => setSummary(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <Header>
            <h3>
              <label>
                <span>Review body</span>
              </label>
            </h3>
          </Header>
          <div>
            <label>
              <textarea
                maxLength="1000"
                minLength="250"
                rows="5"
                cols="50"
                value={body}
                placeholder="Body"
                required
                autoComplete="off"
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <Header>
            <h3>
              <label>
                <span>Upload your photos</span>
              </label>
            </h3>
          </Header>
          <div>
            <button type="button">
              <input
                type="file"
                accept="image/*,video/*"
                // setphoto
              />
            </button>
          </div>
          <hr />
          <Header>
            <h3>
              <label>
                <span>What is your name?</span>
              </label>
            </h3>
            <span> Use nickname </span>
          </Header>
          <div>
            <label>
              <input
                value={name}
                maxLength="60"
                width="100%"
                placeholder="username"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <Header>
            <h3>
              <label>
                <span>Your email</span>
              </label>
            </h3>
            <span> For authentication reasons, you will not be emailed </span>
          </Header>
          <div>
            <label>
              <input
                value={email}
                maxLength="60"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
          </div>
          <hr />
          <div>
            <button type="button" onClick={handleSubmit}>
              <span>Submit review</span>
            </button>
          </div>
        </form>
      </section>
    </FormStyle>
  );
}

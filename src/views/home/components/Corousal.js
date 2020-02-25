import React, { useEffect } from 'react'
import styled from 'styled-components'
import CorousalItem from './CorousalItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import './slider.css'
import Slider from 'react-slick'
import User from '../../../assets/images/userimage.svg'
import User2 from '../../../assets/images/userimage2.svg'
import User3 from '../../../assets/images/userimage3.svg'

const Main = styled.div`
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  max-width: 70%;
  margin: 100px auto 20px auto;
`

const Description = styled.p`
  font-weight: 500;
  font-size: 19.228px;
  line-height: 36px;
  letter-spacing: 0.38456px;
  color: #7e8594;
  text-align: center;
  margin-bottom: 20px

`

const data = [
  {
    image: User,
    title: 'Student',
    name: 'Erin',
    occupation: 'University of Chicago',
    description:
      "With technology's omnipresence in my life, I often found hours to slip away. However, now I am in more control; DailyDoc allows me to see how I spent my time and where I lose my flow."
  },
  {
    image: User3,
    title: 'Knowledge worker',
    name: 'Lucas',
    occupation: 'lawyer',
    description:
      'DailyDoc has been instrumental in being able to track my hours and bill clients with more precision. Being able to see where my productivity dips (11 AM after donuts) allowed me to strategize and better structure my day.'
  },
  {
    image: User2,
    title: 'Knowledge worker',
    name: 'Ben',
    occupation: 'Developer',
    description:
      'Spending my days in front of screen causes all the hours to kind of mesh together. With DailyDoc, I can easily look back to see what I was doing at what time. The sprints are killer but effective. Nice job guys!'
  }
]

const Corousal = () => {
  useEffect(() => {}, [])
  const settings = {
    centerMode: true,
    centerPadding: '380px',
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  }
  return (
    <Main>
      <Description>You’ll love DailyDoc whether you’re a</Description>
      <Slider {...settings}>
        {data.map(item => (
          <CorousalItem item={item} />
        ))}
      </Slider>
    </Main>
  )
}

export default Corousal


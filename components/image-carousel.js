import React from 'react';
import { Button } from 'antd';
import Carousel from 'nuka-carousel';

import Image from './image';

const COEF = 0.9;

export default class ImageCarousel extends React.Component {
  render(){
    return (
      <Carousel
        autoplay={true}
        autoplayInterval={5000}
        wrapAround={true}
      >
        <Image titre='Kitoko Shop' color='black' width={`${window.innerWidth}px`} height={`${COEF*window.innerHeight}px`} url='https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'>
          Boutique de prêt à porter tendance.
        </Image>
        <Image titre='Kitoko Shop' color='black' width={`${window.innerWidth}px`} height={`${COEF*window.innerHeight}px`} url='https://images.pexels.com/photos/428543/pexels-photo-428543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'>
          Boutique de prêt à porter tendance.
        </Image>
      </Carousel>
      /*
        <Image color='black' width={`${window.innerWidth}px`} height={`${COEF*window.innerHeight}px`} url={require('../images/DSCN0384.JPG')} />
      </Carousel>
      */
    );}
}

const styles = {
  imgStyle: {
    width: 640,
    height: 180,
  }
}

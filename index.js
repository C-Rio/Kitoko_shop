import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout, Menu, Button, Row, Col, Tag, Drawer } from 'antd';
const { Header, Content, Footer, Icon } = Layout;
import GoogleMapReact from 'google-map-react';

import Router from 'react-router-component';
const Locations = Router.Locations;
const Location = Router.Location;

import {Provider} from 'mobx-react';

import PanierStore from './store/panier'

import Navbar from './components/navbar';
import Image from './components/image';
import ImageCarousel from './components/image-carousel';
import Item from './components/item';
import Collection from './components/collection';
import PanierDrawer from './components/panier-drawer';
import Checkout from './components/checkout';

const GOOGLEMAP_API_KEY = 'AIzaSyCS7fRjjs9sjhb5EZBj_TCMZuDS-tD5-2Q';

const CollectionComponent = (props) => (<div
style={{
  padding: 20
}}
>
<Collection categorie={props.categorie} />
</div>);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class App extends React.Component {
  state= {
    carouselHeight: 0,
    panier: true,
  }

  componentWillMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }

  render(){
    return (
      <Provider panierStore={PanierStore}>
      <Layout className="layout">
        <Locations>
          <Location path="/" handler={Accueil} />
          <Location path="/collection/:categorie" handler={CollectionComponent} />
          <Location path="/collection" handler={CollectionComponent} />
          <Location path="/checkout" handler={Checkout} />
        </Locations>

        <PanierDrawer />
        <Footer style={{ textAlign: 'center' }}>
          Kitoko Shop ©2018
        </Footer>
        <Navbar />
      </Layout>
    </Provider>

    );}
}

const Accueil = () => (<Content>
  <div style={{ background: '#fff' }}>
    <ImageCarousel />
    <h1>Notre Boutique</h1>
    <div
      style={{
        paddingLeft: 100,
        paddingRight: 100,
        marginTop: 20,
        height: 500
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLEMAP_API_KEY }}
        defaultCenter={{
          lat: 48.8692384,
          lng: 2.3685173999999733
        }}
        defaultZoom={17}
      >
        <div style={{
            position: 'absolute',
            width: 40,
            height: 40,
            left: -40 / 2,
            top: -40 / 2,
            marginTop: -20
          }}
          lat={48.8692384}
          lng={2.3685173999999733}
        >
          <img src='http://www.clker.com/cliparts/v/E/r/a/2/E/google-maps-marker-for-residencelamontagne.svg.hi.png' width='25px' />
        </div>
      </GoogleMapReact>
    </div>
  </div>
</Content>);

const styles = {
  imgStyle: {
    width: 640,
    height: 180,
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import { Layout, Menu, Breadcrumb, Divider, Badge } from 'antd';
const { Header, Content, Footer, Icon } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { Row, Col, Carousel } from 'antd';
import * as FaIconPack from 'react-icons/lib/fa';
import {inject,observer} from 'mobx-react';

import Router from 'react-router-component';
const Link = Router.Link;

@inject("panierStore")
@observer
export default class Navbar extends React.Component {
  state = {
    aff1: false,
    size: 60,
    color: 'rgba(35,35,35,0.5)'
  }

  componentDidMount() {
    const height = this.refs.navbar.clientHeight;
    console.log(height);
    window.addEventListener('scroll', (e) => {
      const offset = window.scrollY > 100 ? 100 : window.scrollY < 0 ? 0 : window.scrollY;
      const size = 60 - offset/6;

      const offsetCollor = window.scrollY > 10 ? 10 : window.scrollY < 0 ? 0 : window.scrollY;
      const alpha = 0.5 + offsetCollor/20;
      const color = `rgba(35,35,35,${alpha})`

      this.setState({size, color});
    });
  }

  render() {
    const { aff1 } = this.state;

    const affichable1 = aff1 ?
      (
        <div style={{...styles.dropDownStyle,textAlign: 'left'}} onMouseLeave={() => this.setState({aff1: false})}>
          <div style={styles.spacingStyle} />
          <div style={styles.containerStyle}>
            <Row gutter={16}>
            {/*<Col md={12} sm={24}>*/}
              <Row gutter={16}>
                <Col span={12}>
                  <Divider orientation="left"><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/hauts'>Hauts</Link></Divider>
                    <ul style={styles.listeStyle}>
                      <li>Tops</li>
                      <li><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/pulls'>Pulls</Link></li>
                      <li><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/vestes'>Vestes</Link></li>
                      <li>Robes</li>
                      <li>Combinaisons</li>
                    </ul>
                </Col>
                <Col span={12}>
                  <Divider orientation="left"><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/accessoires'>Accessoires</Link></Divider>
                    <ul style={styles.listeStyle}>
                      <li>Sacs</li>
                      <li>Bijoux</li>
                      <li><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/montres'>Montres</Link></li>
                      <li>Lunettes de soleil</li>
                      <li>Coques de téléphones</li>
                    </ul>
                </Col>
                <Col span={12}>
                  <Divider orientation="left"><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/bas'>Bas</Link></Divider>
                    <ul style={styles.listeStyle}>
                      <li><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/pantalons'>Pantalons</Link></li>
                      <li>Jupes</li>
                      <li>Shorts</li>
                    </ul>
                </Col>
                <Col span={12}>
                  <Divider orientation="left"><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/chaussures'>Chaussures</Link></Divider>
                    <ul style={styles.listeStyle}>
                      <li><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/sneakers'>Sneakers</Link></li>
                      <li>Talons</li>
                      <li><Link onClick={() => this.setState({aff1: false})} className='dark' href='/collection/bottes'>Bottes</Link></li>
                    </ul>
                </Col>
                <Col span={12}>
                  <Divider orientation="left">Plage</Divider>
                    <ul style={styles.listeStyle}>
                      <li>Bikinis</li>
                      <li>Une pièce</li>
                    </ul>
                </Col>
                <Col span={12}>
                  <Divider orientation="left">Lingerie</Divider>
                    <ul style={styles.listeStyle}>
                      <li>Sous-vêtements</li>
                      <li>Nuisettes</li>
                    </ul>
                </Col>
              </Row>

            {/*
            <Col md={12} sm={24}>
              <Row gutter={16}>
                <Col span={12} >
                  <img style={styles.imgStyle} width='100%' src="https://d166chel5lrjm5.cloudfront.net/images/menu/20180301_dropdown_01.jpg" />
                  <div style={styles.imgColStyle}>
                    <h2>Nouveaux Modèles</h2>
                  </div>
                </Col>
                <Col span={12} >
                  <img style={styles.imgStyle} width='100%' src="https://d166chel5lrjm5.cloudfront.net/images/menu/20180301_dropdown_02.jpg" />
                  <div style={styles.imgColStyle}>
                    <h2>Soldes</h2>
                  </div>
                </Col>
              </Row>
            </Col>
          */}

            </Row>
          </div>
        </div>
      ) : null;

    return (
      <div style={{top: 0,...styles.navbarStyle}}>
        <div style={{paddingBottom: 5, backgroundColor: this.state.color}} ref='navbar' >
          <Row type="flex" justify="space-between" align="bottom">
            {/*Logo du site*/}
            <Col lg={24} xl={8} >
              <span style={{color: 'white', fontSize: this.state.size}}><Link href='/'>KITOKO SHOP</Link></span>
            </Col>

            {/*Navigation du site*/}
            <Col lg={24} xl={16} style={{paddingRight: 30}}>
              <Row type="flex" justify="end" align="center">
                <NavbarItem path='/' over={() => this.setState({aff1: false})}>Accueil</NavbarItem>
                <NavbarItem path='/collection' onClick={() => this.setState({aff1: false})}
                  over={() => this.setState({aff1: true})}
                >
                  Nos Collections
                </NavbarItem>
                {/*<NavbarItem over={() => this.setState({aff1: false})}>Promotions</NavbarItem>*/}
                <NavbarItem over={() => this.setState({aff1: false})}>Notre Magasin</NavbarItem>
                <Badge count={this.props.panierStore.nbItems} style={{ marginLeft: 10, marginTop: 4, transform: 'scale(0.8)' }}>
                  <NavbarItem onClick={() => this.props.panierStore.showDrawer()} over={() => this.setState({aff1: false})}><FaIconPack.FaShoppingCart size={30}/></NavbarItem>
                </Badge>
                {/*<NavbarItem over={() => this.setState({aff1: false})}><FaIconPack.FaUser size={30}/></NavbarItem>
                <NavbarItem over={() => this.setState({aff1: false})}><FaIconPack.FaSearch size={30}/></NavbarItem>*/}
              </Row>
            </Col>
          </Row>
        </div>
        {affichable1}
      </div>
    );
  }
}

class NavbarItem extends React.Component {
  state = {
    isMouseOver: false
  }

  mouseHandle = () => {
    const isMouseOver = !this.state.isMouseOver;
    this.setState({ isMouseOver });
    if(this.state.isMouseOver){
      if(this.props.over)
        this.props.over();
    }else {
      if(this.props.out)
        this.props.out();
    }
  }

  componentDidMount() {
    this.refs.foo.addEventListener("mouseover", this.mouseHandle);
    this.refs.foo.addEventListener("mouseout", this.mouseHandle);
  }

  render() {
    const { isMouseOver } = this.state;
    const textStyle = isMouseOver ? {textDecoration: 'underline'} : {};
    const bgStyle = { marginLeft: 10, marginRight: 10};
    return (
      <Col style={bgStyle}>
        <div ref='foo' style={styles.colStyle} onClick={this.props.onClick}>
          <h2 className='ico-navbar' style={{color: 'white', ...textStyle}} >
            <Link href={this.props.path}>{this.props.children}</Link>
          </h2>
        </div>
      </Col>
    );
  }
}

const styles = {
  navbarStyle: {
    position: 'fixed',
    left: 0,
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Raleway',
    zIndex: 10
  },
  colStyle: {
    textAlign: 'center'
  },
  dropDownStyle: {
    width: '70%',
    margin: 'auto'
  },
  spacingStyle: {
    height: 10
  },
  containerStyle: {
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    color: 'black',
    padding: 10
  },
  listeStyle: {
    listStyleType: 'none'
  },
  imgColStyle: {
    margin: 'auto',
    textAlign: 'center',
    width: '100%'
  },
  imgStyle: {
    paddingTop: 20
  }
}

import React from 'react';
import { Rate, notification, Modal, Button, Select } from 'antd';
import {inject,observer} from 'mobx-react';

const Option = Select.Option;

const INCREMENT = 0.15;
const COEF = 1.2;

const style_transition = {
  transition: `all 0.1s ease-in-out`
};

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

@inject("panierStore")
@observer
export default class Item extends React.Component {
  state = {
    size: 0,
    opacity: 0,
    visible: false,
    taille: 'm',
  }

  handleChange = (value) => {
    this.setState({taille: value})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
 }

  openNotification = () => {
    notification.success({
      message: 'Ajout au panier',
      description: `${this.props.name} a été ajouté au panier.`,
      duration: 2
    });
  };

  update = () => {
    this.setState({size: this.container.clientWidth});
  }

  componentWillMount() {
    window.addEventListener('resize', () => this.update());
  }

  componentDidMount() {
    this.update();
  }

  over = () => {
    const {opacity} = this.state;
    this.setState({opacity: 1-opacity});
  }

  add = () => {
    this.openNotification();
    // this.props.panierStore.viderPanier();
    this.props.panierStore.addPanier({name: this.props.name, price: this.props.price, taille: this.state.taille});
  }

  render() {
    const {size} = this.state;
    return (
      <div style={{
          flex: 1,
          height: size*COEF,
          backgroundImage: `url("${this.props.img}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: 20,
        }}
        ref={(ref) => this.container = ref}
        onMouseLeave={this.over}
        onMouseEnter={this.over}
        onClick={this.state.visible ? null : this.showModal}
        className="item"
      >
        <div style={{
            position: 'absolute',
            height: size*COEF,
            width: size,
            backgroundImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0) 30%)',
            opacity: 0.2,
            zIndex: 1
          }}
        />
      <div style={{
            height: size*COEF,
            backgroundColor: 'rgba(245,226,227,0.6)',
            opacity: this.state.opacity,
            fontSize: 40,
            color: 'rgba(0,0,0,1)',
            textAlign: 'center',
            lineHeight: 1,
            ...style_transition,
            zIndex: 2,
          }}
          ref={(ref) => this.overlay = ref}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              width: size,
              transform: 'translate(0%, -50%)',
              zIndex: 3
            }}
          >
            <div>
              {this.props.name}<br />
              {this.props.price}€<br />
              <Rate allowHalf style={{fontSize: 30, textShadow: '0px 0px 15px rgba(0,0,0,0.3)'}} disabled defaultValue={this.props.rate} />
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          title={this.props.name}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ top: 20 }}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Fermer</Button>,
            <Button key="submit" type="primary" onClick={this.add}>
              Ajouter au panier
            </Button>,
          ]}
        >
          <img src={this.props.img} alt="Photo" width="100%"/>
          <p>{this.props.desc}</p><br/>
          <p>Choisir un taille :</p>
          <Select defaultValue="m" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
            <Option value="xxl" disabled>XXL</Option>
          </Select>
          <br/>
        </Modal>
      </div>
    );
  }
}

const buttonStyle = {
  backgroundColor: '#ec5f61',
  border: 'none',
  color: 'white',
  padding: '25px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  borderRadius: 100,
  fontSize: 20,
}

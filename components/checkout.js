import React from 'react';
import { Steps, Icon, Button, InputNumber, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';
import {inject,observer} from 'mobx-react';

import Router from 'react-router-component';
const Link = Router.Link;

const Step = Steps.Step;

@inject("panierStore")
@observer
export default class Checkout extends React.Component {
  state={
    panier: true,
    info: false,
    paiement: false,
    fin: false
  }

  changementQuant = (i, nb) => {
    this.props.panierStore.changementQuant(i,nb);
  }

  next = () => {
    const {panier,info,paiement,fin} = this.state;
    if( paiement ) this.setState({fin: true});
    else if( info ) this.setState({paiement: true});
    else if( panier ) this.setState({info: true});
  }

  panierComp = (items) => {
    return (
      <div>
      {
      items.map((e,i) =>
        <div style={{marginBottom: 5}}>{e.item.name}, taille: {e.item.taille}, prix: {e.item.price * e.quantite}€, quantité: <InputNumber min={0} max={100} value={e.quantite} onChange={(nb) => this.changementQuant(i,nb)} /> <Icon type="close-circle-o" onClick={()=>this.props.panierStore.supprimerItem(i)}/></div>
      )
      }
      <br/>
      <h2>Total: {this.props.panierStore.total}€</h2>
      <Button onClick={this.next} type="primary">Continuer</Button> <Button type="danger" onClick={()=>this.props.panierStore.viderPanier()}>Vider Panier</Button>
      </div>
    )
  }

  render(){
    const items = this.props.panierStore.contenuPanier;
    const {panier,info,paiement,fin} = this.state;

    let contenu = null;

    if(panier && !info) contenu = this.panierComp(items);

    return (
      <div style={{marginTop: 50, padding: 100}}>
        <Steps>
          <Step status={panier?"success":"wait"} title="Panier" icon={<Icon type="shopping-cart" />} />
          <Step status={info?"success":"wait"} title="Informations" icon={<Icon type="solution" />} />
          <Step status={paiement?"success":"wait"} title="Paiement" icon={<Icon type="credit-card" />} />
          <Step status={fin?"success":"wait"} title="Fin" icon={<Icon type="smile-o" />} />
        </Steps>
        <div style={{justifyContent: 'center', textAlign: 'center', marginTop: 50 }}>
          {contenu}
        </div>
      </div>
    );
  }
}

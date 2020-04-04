import React from 'react';
import { Drawer, InputNumber, Button, Icon } from 'antd';
import {inject,observer} from 'mobx-react';

import Router from 'react-router-component';
const Link = Router.Link;

@inject("panierStore")
@observer
export default class PanierDrawer extends React.Component {
  changementQuant(i, nb){
    this.props.panierStore.changementQuant(i,nb);
  }

  render() {
    const items = this.props.panierStore.contenuPanier;
    return (
      <Drawer
        title="Votre Panier"
        placement="right"
        closable={true}
        onClose={() => this.props.panierStore.closeDrawer()}
        visible={this.props.panierStore.visible}
        width='800px'
      >
        {
        items.map((e,i) =>
          <div>{e.item.name}, taille: {e.item.taille}, prix: {e.item.price * e.quantite}€, quantité: <InputNumber min={0} max={100} value={e.quantite} onChange={(nb) => this.changementQuant(i,nb)} /> <Icon type="close-circle-o" onClick={()=>this.props.panierStore.supprimerItem(i)}/></div>
        )
        }
        <p>Total: {this.props.panierStore.total}€</p>
        <Button onClick={() => this.props.panierStore.closeDrawer()} type="primary"><Link href='/checkout'>Passer commande</Link></Button> <Button type="danger" onClick={()=>this.props.panierStore.viderPanier()}>Vider Panier</Button>
      </Drawer>
    );
  }
}

import React from 'react';
import Item from './item';
import { Row, Col, Tag, Slider } from 'antd';

class MyTag extends React.Component {
  state = { checked: false };
  handleChange = () => {
    const {checked} = this.state;
    this.setState({ checked: !checked });
    if(!checked) {this.props.addFiltre();}
    else {this.props.removeFiltre();}
  }
  render() {
    const color = !this.state.checked ? "#d6abac" : "#ec5f61";
    return (<Tag
      color={color}
      onClick={this.handleChange}
    >
      {this.props.children}
    </Tag>);
  }
}

export default class Collection extends React.Component {
  state = {
    collection: [],
    filtre: [],
    couleur: []
  }

  componentWillMount() {
    const { collection } = require('../donnees/collection.json');
    this.setState({ collection: collection.filter((e)=>this.filtreCategorie(e)) });
  }

  componentWillReceiveProps(newProps){
    const { collection } = require('../donnees/collection.json');
    this.setState({ collection: collection.filter((e)=>this.filtreCategorie(e,newProps.categorie)) });
  }

  filtreCategorie(item, cat) {
    const filtre = cat || this.props.categorie;
    if(!filtre){
      return true;
    }
    let res = false;
    item.categorie.forEach((m) => {
      const k = filtre.indexOf(m) < 0 ? false : true;
      res = res || k;
    });
    return res;
  }

  filtreMc(item, filtre) {
    if(filtre.length == 0){
      return true;
    }
    let res = false;
    item.motcle.forEach((m) => {
      const k = filtre.indexOf(m) < 0 ? false : true;
      res = res || k;
    });
    return res;
  }

  filtreCouleur(item, filtre) {
    if(filtre.length == 0){
      return true;
    }
    let res = false;
    item.couleur.forEach((m) => {
      const k = filtre.indexOf(m) < 0 ? false : true;
      res = res || k;
    });
    return res;
  }

  render() {
    const items = this.state.collection.map(
      (item, i) =>
      {
        if(!this.filtreCouleur(item,this.state.couleur) || !this.filtreMc(item,this.state.filtre) || !this.filtreCategorie(item))
          return null;
        return (
          <Col xl={6} lg={8} sm={12} key={i}>
            <Item
              name={item.nom}
              price={item.prix}
              img={item.image}
              rate={item.note}
              desc={item.description}
            />
          </Col>
        );
      }
    );
    const doublon = [];
    const tags = this.state.collection.map(
      (item, i) =>
      {
        const _tags = [];
        item.couleur.forEach((c) => {
          if(doublon.indexOf(c) < 0){
            doublon.push(c);
            _tags.push(
              <MyTag
                addFiltre={() => {const {couleur} = this.state; couleur.push(c); this.setState({couleur});}}
                removeFiltre={() => {const {couleur} = this.state; const idx = couleur.indexOf(c); couleur.splice(idx, 1); this.setState({couleur});}}
                key={c}
              >
                {c}
              </MyTag>
            );
          }
        })
        return _tags;
      }
    );
    const min = this.state.collection.reduce((acc, cur) => {if(cur.prix < acc.prix) return cur; return acc}).prix;
    const max = this.state.collection.reduce((acc, cur) => {if(cur.prix > acc.prix) return cur; return acc}).prix;
    console.log(min, max);
    return (
      <div>
        <Row gutter={20}>
          <Col span={3}>
            <div style={{marginTop: 100, backgroundColor: '#d2d7dd', padding: 10, borderRadius: 5}}>
              <h2>Filtres :</h2>
              Couleurs :<br/>
              {tags}<br/>
            </div>
          </Col>
          <Col span={21} style={{marginTop: '80px'}}>
            <Row gutter={20} type="flex" justify="center" align="top">
              {items}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

import {observable, action, computed} from 'mobx';
import { create, persist } from 'mobx-persist';

function checkItems(a,b){
  return a.name == b.name && a.price == b.price && a.taille == b.taille;
}

class PanierStore {
  @persist('list') @observable list = [];

  @observable visible = false;

  @action showDrawer(){
    this.visible = true;
  }

  @action closeDrawer(){
    this.visible = false;
    this.purgerPanier();
  }

  @action addPanier(s){
    this.showPanier();
    if (this.list.filter(e => (checkItems(s,e.item))).length > 0){
      console.log('bjr');
      for(let i = 0; i<this.list.length; i++){
        if(checkItems(s,this.list[i].item)){
          this.list[i].quantite++;
        }
      }
    }else{
      this.list.push({item: s, quantite: 1});
    }
  }

  @action changementQuant(i, nb){
    this.list[i].quantite = nb;
  }

  @action showPanier(){
    console.log(this.contenuPanier);
  }

  @computed get contenuPanier(){
    return this.list.map(e=>e)
  }

  @computed get nbItems(){
    let total = 0;
    for(let i=0; i<this.list.length; i++){
      total += this.list[i].quantite;
    }
    return total;
  }

  @action viderPanier(){
    this.list = [];
  }

  @action purgerPanier(){
    let newList = [];
    for(let i=0;i<this.list.length;i++){
      if(this.list[i].quantite > 0){
        newList.push(this.list[i]);
      }
    }
    this.list = newList;
  }

  @action supprimerItem(i){
    this.changementQuant(i,0);
    this.purgerPanier();
  }

  @computed get total(){
    let total = 0;
    for (let i = 0; i < this.list.length; i++) {
      total += this.list[i].item.price * this.list[i].quantite;
    }
    return total;
  }

}

const hydrate = create({
    storage: localStorage,   // or AsyncStorage in react-native.
                            // default: localStorage
    jsonify: true  // if you use AsyncStorage, here shoud be true
                    // default: true
});

const panierStore = new PanierStore();
export default panierStore;

hydrate('list', panierStore).then(() => console.log('observable s hydrated'))

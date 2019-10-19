class Obs{
    constructor(){
          this.list = {};
    }
    add( type  , fn ){
          if( !this.list[type] ){
                this.list[type] = [];
          }
          this.list[type].push(fn);
    }
    publish( type , msg ){
         this.list[type] instanceof Array ?this.list[type].forEach( fn => {
                fn(msg);
          }) : "";
    }
}
export default new Obs()
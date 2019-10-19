const goodsView=require('../views/goods.art')
const goodsModel=require('../models/goods')


class Goods{  
    async render(){
         let $main =  $('main')
         let res=await goodsModel.get()              
         let list=res.data
         let html=goodsView({list})
            $main.html(html)  
    }
}
export default new Goods()
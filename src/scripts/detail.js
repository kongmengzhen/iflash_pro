const detailView = require('./views/detail.art')
// const detailModel = require('./models/prdLs')
const listModel = require('./models/list')
const BScroll = require('better-scroll')
const store = require('store')
import obs from './controllers/addcart'

obs.add("data", saveData);
obs.add("data", cTotal);

function cTotal(){
    let sum = 0;
    for(let attr in cart_data.data){
          sum += parseInt(cart_data.data[attr][0].count);
    }          
    console.log(sum) 
    $('#total').html(sum)
    return sum;
}
function saveData() {
    // console.log('savadata')
    store.set('cart', cart_data.data)
    // console.log(store.get('cart'))
    let list=store.get('cart')
    list.forEach((item,index)=>{
       
        item[0].count
    })
}
function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
let cart_data = {
    $data: {
        data: store.get('cart') || []
    }
}

Object.defineProperty(cart_data, 'data', {
    set: function (val) {
        this.$data.data = val;
        obs.publish('data')
    },
    get: function () {
        return this.$data.data
    }
})

class Detail {
    constructor() {
        this.render()
        this.subId=5571
       this.res=''
    }

    async render() {
        console.log(cTotal()) 
        let subId = (location.search.split('&')[0]).split('=')[1]   
        let target = (location.search.split('&')[1]).split('=')[1]    
        console.log(subId)
        console.log(target)//4360937479     
        let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${subId}&page=1&size=50`)      
        let list  = res.data  
        let tarlist = []         
      
        list.forEach(item => {
         if(item.goods_id==target){
            item.total=cTotal()
            tarlist.unshift(item)
            console.log(item)
         }
        
        });  
        let html = detailView({ tarlist })
        $('#root').html(html)
   

     

        let $main = $('main')

        let bScroll = new BScroll.default($main.get(0), {

        })
        // 实现页面的回退
        // 回退上一级  

        let backBtn = $('.header').children()[0]
        $(backBtn).on('click', function () {
            history.go(-1)
        })
        // 点击购物车 进行跳转
      $('#goMycart').on('tap',function(){
        location.href='./mycart.html'
      })
        let count = ""
        $('#reduce').on('click', function () {
            count--
            if (count <= 1) {
                count = 1
            }
            $(this).next().val(count)
        })
        $('#add').on('click', function () {
            count++
            $(this).prev().val(count)
        })
     
        // addcart        

         $('#addCart').on('tap', function () {   
           
             let hasSame = cart_data.data.some((item, index) => {
              
                if (target == item[0].goods_id) {   
                    console.log(item)                          
                    let temp = clone(cart_data.data);                   
                   temp[index][0].count=$('#amount').val();   
                   console.log( temp[index][0].count)                       
                    cart_data.data = temp;                    
                    return true;
                }
                return false
            })
            if (!hasSame) {            
                tarlist[0].count = 1;
                let temp = clone(cart_data.data);
                temp.push(tarlist);
                cart_data.data = temp;
                
            }
        }) 
    }
}
new Detail()





const mycartView = require('./views/mycart.art')
const store = require('store')
const BScroll = require('better-scroll')
import obs from './controllers/addcart'
// 删除或者改变数量做一个拦截器 观察 保证数组 和localstorage数据的实时一致。
obs.add("data", saveData);
obs.add("data", cTotal);

function cTotal() {
    let sum = 0;
    for (let attr in cart_data.data) {
        sum += parseInt(cart_data.data[attr][0].count);
    }
    // console.log(sum)
    $('#total').html(sum)
    return sum;
}
function saveData() {
    
    store.set('cart', cart_data.data)    
   /*  let list = store.get('cart')
    list.forEach((item, index) => {
        item[0].count
    }) */
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



class Mycart {
    constructor() {
        this.render()
      
    }
    // 渲染localstroage中的数据
    renderer() {
        let resls = store.get('cart')
        let html = mycartView({ resls })
        $('#root').html(html)

    }
    bindEvent() {
        // 实现页面的回退
        // 回退上一级  
       
        let backBtn = $('.header').children()[0]
        $(backBtn).on('click', function () {
            history.go(-1)
        })

        // 在这里实现按钮的变化      
        $('.item-check').on('tap', function () {           
            console.log(this);
            
            if ( this.onoff) {
                // console.log(this.onoff)
                let $img = $(this).children()
                $($img).attr('src', 'http://m.iflashbuy.com/themes/default/images/iconCart01.png')
                this.onoff = !this.onoff
            } else {
                // console.log(this.onoff)
                let $img = $(this).children()
                $($img).attr('src', 'http://m.iflashbuy.com/themes/default/images/iconCart02.png')
                this.onoff = !this.onoff
            }
        })
        // changecount
           // change count
           $('.num-control').on('click', function (evt) {
            let tarEle = evt.srcElement
            let id=$($(tarEle).parents()[2]).attr('data-id')
            let option = $(tarEle).attr('id')
            let temp1 = clone(cart_data.data)
            temp1.forEach((item, index) => {
                if (item[0].prd_id == id) {
                    //    console.log(id)
                    if (option == 'reduce') {
                        item[0].count--
                        console.log(item[0].count);
                    }
                    else if (option == 'add') {
                        item[0].count++
                        console.log(item[0].count);
                    }
                }   
            })
            cart_data.data = temp1    
           this.render()
        }.bind(this))

        // delete
        $('.item-delete').on('tap',function(evt){
            console.log()
            let tarEle = evt.srcElement
            let id=$($(tarEle).parents()[2]).attr('data-id')
            console.log(id)
            var temp1 = clone(cart_data.data)
            temp1.forEach((item, index) => {
                console.log(item[0].prd_id);
                if (item[0].prd_id  == id) {
                    temp1.splice(index,1)
                }
                cart_data.data = temp1;
                this.render()
            })
        }.bind(this))
       
    }
    render() {
        this.renderer()
        let $main = $('main')
        let bScroll = new BScroll.default($main.get(0), {
        })
        this.bindEvent()
    }

}
new Mycart()



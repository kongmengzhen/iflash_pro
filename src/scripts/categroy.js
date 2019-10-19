const categoryView = require('./views/categroy.art')
const positionModel=require('./models/categroy')

class Category {
    constructor() {
        this.render()
       
    }

   async render() {       
        let res=await positionModel.get()
        let list = res.data
        // console.log(list)
        let html = categoryView({list})
        $('#root').html(html)
        // 实现页面的回退
         // 回退上一级  
         console.log()  
         let backBtn=$('.header').children()[0]
         $(backBtn).on('click',function(){
            history.go(-1)
         })
        // 实现页面的点击
        $('.detail-li:eq(0)').css({
            "display":"block"
        })

        let firEle=$($('.g-list').children()[0]).children()[2]
        $(firEle).addClass('up')   
        $($(firEle).next()).css({
            display:'block'
        })    
        $('.g-item').on('click', function () {
            let curele = $(this).children()[2]
            $(this).siblings('.g-item').children('.select').removeClass("up");
            $(this).next().toggle()            
            $(curele).toggleClass('up')
            // $(this).siblings().next().toggle()
            $(this).siblings('.g-item').next().css({
                display:"none"
            }) 
        })
    }
   

}
new Category()





const prdlsView = require('../views/prdLs.art')
const BScroll = require('better-scroll')
const prdLsModel = require('../models/prdLs')
const Swiper =require('../../libs/swiper.min')
const querystring = require('querystring')
class Prdls {
  constructor() {
    // 声明一个数组 用来作为数据重新渲染的依据
    this.list = []
    this.ranum = []
    console.log()

  }
  renderer(prdls) {
    let lock  = null;  
    let html = prdlsView({ prdls })
    $('.prdUl').html(html)
    const mySwiper = new Swiper('.swiper-container', {
     autoplay:true,
     
})
    $('.prdUl li').on('tap', function () {    
      let id = $(this).attr('data-id')      
      location.href = `/detail.html?id=${id}`  
    })
    $('.search').on('tap',function(){
      // console.log($('#ipt').val())
      let kwd=$('#ipt').val()
      location.href  = `/list.html?keyword=${kwd}` 
 
      
    })
    $('.categroy').on('tap',function(){
      location.href = `/categroy.html` 
    })
    $('.mycart').on('tap',function(){
      location.href = `/mycart.html` 
    })
    $('.prolist').on('tap',function(){
      location.href = `/list.html`
    })
    $('#ipt').on('input',function(){  
      if(lock) return false;
      lock=setTimeout(function(){
        lock=null;
        console.log(1)
      },500)
    })
    //    location.hash = `detail/${id}`
  }
  async render() {
    let that = this
    let $main = $('main')
    let res = await prdLsModel.get()
    let prdls = res.data
    //  console.log(prdls)
    this.renderer(prdls)


    let bScroll = new BScroll.default($main.get(0), {
      probeType: 2,
      mouseWheel: true
    })
    let $imgHead = $('.head img')
    let $imgFoot = $('.foot img')
    bScroll.scrollBy(0, -40)
    bScroll.on('scrollEnd', async function () {
      if (this.y >= 0) {
        // 切换图片
        $imgHead.attr('src', '/assets/images/ajax-loader.gif')
        // 然后这个时候去发送ajax  请求
        let res = await prdLsModel.get()

        let { data: list } = res
        that.ranum.unshift(list[random()])

        that.list = [...that.ranum, ...prdls]
        // console.log(that.ranum)
        that.renderer(that.list)
        bScroll.scrollBy(0, -40)

      }

      // 下拉加载更多

      if (this.maxScrollY >= this.y) {
        $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
        let res = await prdLsModel.get()
        let { data: list } = res
        that.list = [...that.list, ...list]
        that.renderer(that.list)
        bScroll.scrollBy(0, 40)
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('down')
       
      }


    })
  
  }
}
export default new Prdls()

function random() {
  return Math.floor(13 * Math.random())
}

const listView = require('./views/list.art')
const BScroll = require('better-scroll')
const listModel = require('./models/list')
function random() {
    return Math.floor(10 * Math.random())
}
class Detail {
    constructor() {
        this.render()
    }

    bscroll() {
        let that = this
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')
        //使用better-scroll
        let $main = $('main')
        let bScroll = new BScroll.default($main.get(0), {
            probeType: 2,
        })
        bScroll.scrollBy(0, -40)
        bScroll.on('scroll', function () {
            if (this.y >= 0) {
                $imgHead.addClass('up')
            }
            if (this.maxScrollY > this.y) {
                $imgFoot.addClass('down')
            }
        })

        bScroll.on('scrollEnd', async function () {
            $imgHead.removeClass('down').addClass('up')
            if (this.y >= 0) {
               let ranum = []
                $imgHead.attr('src', '/assets/images/ajax-loader.gif')
                let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${that.subId}&page=1&size=50`)
                let { data: list } = res
                ranum.unshift(list[random()])
                console.log()
                that.list = [...ranum, ...that.list]
                that.renderer(that.list)
            }
            // 上拉加载更多
           else if (this.maxScrollY >= this.y) {
                $imgHead.attr('src', '/assets/images/ajax-loader.gif')
                let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${that.subId}&page=1&size=1`)
                let { data: list } = res
                console.log(res);
                that.list = [...that.list,...list]
                that.renderer(that.list)
            }
        })
    }

    bindevent() {
        let backBtn = $('.header').children()[0]
        $(backBtn).on('click', function () {
            history.go(-1)
        })
    }
    renderer(list) {
        // console.log(this)
        let that=this
        let html = listView({ list })
        $('#root').html(html)
        this.bindevent()
        this.bscroll()
        $('.prdUl li').on('tap', function () {
            console.log(that.subId)
            let id = $(this).attr('data-id')  
            console.log(id)    
            location.href = `/detail.html?subId=${that.subId}&id=${id}`          
       
               /*     */
          })
    }

    async render() {
        this.subId=''
        let query = decodeURIComponent(window.location.search).substr(1)
        let keyword = query.split('=')[1]
        //encodeURI()
        // console.log(keyword)
          
        if (/(.*)[(女)(.*)(衣服)(棉服)(打底裤)](.*)/i.test(keyword)) {
            this.subId=5571
            let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${this.subId}&page=1&size=50`)
            let list = this.list = res.data
            // console.log(list)
            this.renderer(list)
        }else if(/(.*)[(鞋)(.*)(皮鞋)(钱包)](.*)/i.test(keyword)){
            this.subId=5572
            let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${this.subId}&page=1&size=50`)
            let list = this.list = res.data
            console.log(list)
            this.renderer(list)
        } else if(/(.*)[(面膜))(.*)(水乳)(护肤)](.*)/i.test(keyword)){
            this.subId=5575
            let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${this.subId}&page=1&size=50`)
            let list = this.list = res.data
            console.log(list)
            this.renderer(list)
        }else if(/(.*)[(家具))(.*)(家居)(百货)](.*)/i.test(keyword)){
            this.subId=5578
            let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${this.subId}&page=1&size=50`)
            let list = this.list = res.data
            console.log(list)
            this.renderer(list)
        }
        else if(/(.*)[(电))](.*)/i.test(keyword)){
            this.subId=5577
            let res = await listModel.get(`api/gindex/subject/limited/goods?subject_id=${this.subId}&page=1&size=50`)
            let list = this.list = res.data
            console.log(list)
            this.renderer(list)
        }
    }


}
new Detail()





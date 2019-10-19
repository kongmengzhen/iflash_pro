// 把所有的页面  放在这个文件就是路由文件  
import indexController from '../controllers/'
import goodsController from '../controllers/goods'
import prdlsController from '../controllers/prdLs'


class Router {
    constructor() {
        this.render()
    }
    renderDom(hash) {
        let pageControllers = {
            prdlsController
         
        }
        pageControllers[hash + 'Controller'].render()
    }
    render() {
        window.addEventListener('hashchange', this.handleHashchange.bind(this))
        window.addEventListener('load', this.handlePageload.bind(this))
    }
    handleHashchange() {
        indexController.render()
        goodsController.render()
        let hash = location.hash.substr(1)
        console.log(hash)
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        this.renderDom(path[1])

    }
    handlePageload() {
        indexController.render()
        goodsController.render()
        let hash = location.hash.substr(1) || 'prdls'
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        location.hash = hash
        this.renderDom(path[1])
    }
}
new Router()
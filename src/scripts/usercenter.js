const usercenterView=require('./views/usercenter.art')
class Usercenter{
    render(){
        let html =usercenterView({})
        $('main').html(html)
    }
}
export default new Usercenter()



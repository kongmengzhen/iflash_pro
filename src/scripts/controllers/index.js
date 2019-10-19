const layoutView=require('../views/lay.art')
// 渲染layoutView
class Index{

  render(){
    const html=layoutView({})
   $("#root").html(html);
  }


}
export default new Index()
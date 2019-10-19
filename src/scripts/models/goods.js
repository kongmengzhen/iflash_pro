module.exports = {
    get() {
        return $.ajax({
            url: '../libs/data/indexdata.json'           
        })


    }


}
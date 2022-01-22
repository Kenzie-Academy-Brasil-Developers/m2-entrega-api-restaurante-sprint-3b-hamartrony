const MesaPost = require('../controllers/mesa')
const Read     = require('../helpers/read')
const db       = require('../mock/db.json')


class MesaModel{
    constructor({table, total, createdAt, paid = false, productList}){
        this.id             = this.id() + 1
        this.table          = table,
        this._total         = total,
        this._createdAt      = createdAt
        this.paid           = paid
        this._productList    = productList
    }

    id(){
        let lastId = 0

        db.orders.forEach(mesa => {
            if(mesa.id > lastId){
                lastId = mesa.id
            }
        });
        return lastId
        
    }

    set total(rs){
       
        const produtos      = [...rs]
        const produtosDb    = Read.lerProductos()
        let vlrTotal        = 0
        let products        = []
        for(let i=0; i<produtos.length; i++){
            for(let j=0; j<produtosDb.products.length; j++){
                if(produtos[i] === produtosDb.products[j].id){
                    products.push(produtosDb.products[j])
                    let preco = parseInt(produtosDb.products[j]._price)
                    vlrTotal = vlrTotal + preco

                }
            }
        }       
        this._productList = products
        this._total = vlrTotal
        
    }

    set createdAt(date){
        date = new Date
        const create = date.toUTCString()
        this._createdAt = create

    }

    

}


module.exports = MesaModel
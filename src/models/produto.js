const db        = require('../mock/db.json')

class ProductModel{                                                             // CRIAR PRODUTO
    constructor({name = '', calories = 0, price = '', session = ''}){
        this.id         = this.id() + 1,
        this.name       = name,
        this._calories   = calories,
        this._price      = price,
        this.session    = session

    }

    id(){
        let lastId = 0

        db.products.forEach(producto => {
            if(producto.id > lastId){
                lastId = producto.id
            }
        });
        return lastId
        this.save()
    }

    set price(preco){
        if(preco > 0){
        let newPrice = preco.toFixed(2)
        this._price = newPrice
        }else{
            this._price = 0
        }
        
    }

    set calories(valor){
        if(valor > 0){
        let newCalories = valor.toFixed(2)
        this._calories = newCalories
        }else{
            this._calories = 0
        }
        
    }

}




module.exports = ProductModel
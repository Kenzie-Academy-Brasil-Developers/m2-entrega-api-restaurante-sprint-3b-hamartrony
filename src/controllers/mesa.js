const Write               = require('../helpers/write')
const Read                = require('../helpers/read')
const MesaModel           = require('../models/mesa')
const {req, res}          = require('express')

class MesaPost {
    static criarMesa(data){
        const mesa      = new MesaModel(data)
        mesa.total      = data.productList
        mesa.createdAt  = 0

        return mesa
    }

    static escreverMesa(mesa){                               // ESCREVER NO BANCO
        Write.escreverMesa(mesa, 'orders')
      }
    

    static buscarMesa(id){                                   // BUSCAR NO BANCO
        const data  = Read.lerProductos()                 
        return data.orders.find((mesa) => mesa.id == id)   
      }

    static editarMesa(mesa){
        if(mesa.paid === false){
            mesa.paid = true
        }

        return mesa

    }




}







module.exports = MesaPost



const express       = require('express')
const routerOrder   = express.Router()
const MesaPost     = require('../controllers/mesa')
const db            = require('../mock/db.json')
const Write         = require('../helpers/write')
const Read          = require('../helpers/read')
const ProdutoPost   = require('../controllers/produto')

routerOrder.get('/false', (req, res) => {
    const retornoDb     = Read.lerProductos()
    
    let mesaFalse = []
    for(let i=0; i<retornoDb.orders.length; i++){
        
        if(retornoDb.orders[i].paid === false){
            mesaFalse.push(retornoDb.orders[i])           
            
        }

    }  

    console.log(mesaFalse)
    if(mesaFalse.length === 0){
        res.status(404).json({})

    }else{   

    res.status(200).json(mesaFalse)
    }

 })

 routerOrder.get('', (req, res) => {
    res.status(201).json(db.orders)
 })

routerOrder.get('/:id', (req, res) => {
    const getId     = req.params.id
    const retorno   = MesaPost.buscarMesa(getId)
    
    if(retorno === undefined){
        res.status(404).json({})
    }

    res.status(200).json(retorno)

    
})


routerOrder.post('', (req, res) => {
    const requisicao    = req.body
    const prodArr       = [...requisicao.productList]

    for(let i=0; i<prodArr.length; i++){
        const retorno  = ProdutoPost.buscarProduto(prodArr[i])

        if( retorno === undefined){
            res.status(404).json("Um ou mais produtos nao existe")
            
        }
    }       
    const mesa = MesaPost.criarMesa(requisicao) 
    MesaPost.escreverMesa(mesa)
    res.status(201).json(mesa)

 })


 routerOrder.delete('/:id', (req, res) => {
    const getId     = req.params.id
    const retorno   = MesaPost.buscarMesa(getId)
    
    if(retorno === undefined){
        res.status(404).json({})
    }else{
        Write.deleteMesa(getId)
        res.status(204).json({})
    }

    

    
})


routerOrder.patch('/:id/pay', (req, res) => {
    const getId         = req.params.id 

    const retornoDb     = MesaPost.buscarMesa(getId)

    if(retornoDb === undefined){
        res.status(404).json({})
        
    }else{

        const mesaEditado   = MesaPost.editarMesa(retornoDb)
         Write.deleteMesa(getId)

         Write.escreverMesa(mesaEditado)

         res.status(200).json(mesaEditado)
    }

    
 
 })




module.exports = routerOrder
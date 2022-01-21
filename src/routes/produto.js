const express       = require('express')
const router        = express.Router()
const ProdutoPost   = require('../controllers/produto')
const db            = require('../mock/db.json')
const Write         = require('../helpers/write')
const { write }     = require('fs')


// bsucar lista de produtos
router.get('', (req, res) => {
    
    res.status(201).json(db.products)
 })

 // buscar produto id
 router.get('/:id', (req, res) => {
    const getId     = req.params.id
    const retorno   = ProdutoPost.buscarProduto(getId)
    
    if(retorno === undefined){
        res.status(404).json({})
    }

    res.status(200).json(retorno)

 })
 
 
 // criar produto => controller
 router.post('', (req, res) => {

     const requisicao    = req.body
     
     if(typeof requisicao.calories !== 'number' || typeof requisicao.price !== 'number' ){
       
         res.status(400).json("Valores incorretos para numeros")


     }else{
        const prod = ProdutoPost.criarProduto(requisicao)
        ProdutoPost.escreverProduto(prod)

        res.status(201).json('received')
     }
 })
 


// Editar Produto 
router.patch('/:id', (req, res) => {
    const getId         = req.params.id 
    const retornoDb     = ProdutoPost.buscarProduto(getId)

    if(retornoDb === undefined){
        res.status(400).json("Produto nao encontrado")
    }else{
        const requisicao    = req.body  
        const prodEditado   = ProdutoPost.editarProduto(requisicao, retornoDb)
         Write.delete(getId)

         Write.escrever(prodEditado)
    }

    res.status(200).json('retorno')
 
 })


 // Excluir produto
 router.delete('/:id', (req, res) => {
    const getId     = req.params.id
    const retorno   = ProdutoPost.buscarProduto(getId)
    
    
    if(retorno === undefined){
        res.status(404).json({})
    }else{
        Write.delete(getId)
        res.status(204).send({})
    }
 })

 module.exports = router
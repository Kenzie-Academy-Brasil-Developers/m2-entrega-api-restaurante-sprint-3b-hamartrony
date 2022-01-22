
const Write               = require('../helpers/write')
const ProductModel        = require('../models/produto')
const {req, res}          = require('express')
const Read                = require('../helpers/read')



class ProdutoPost {    

  static criarProduto(data, req, res) {                                 // CRIAR PRODUTO 
    const produto     = new ProductModel(data);
    produto.price     = data.price
    produto.calories  = data.calories

    
    return produto
    
  }

  static escreverProduto(prod){                               // ESCREVER NO BANCO
    Write.escrever(prod)

  }


  static buscarProduto(id){                                   // BUSCAR NO BANCO
    const data  = Read.lerProductos()                 
    return data.products.find((produto) => produto.id == id)   
  }


  static editarProduto(request, retornoDb){                     // EDITAR PRODUTO

      if(request.name){
          retornoDb.name = request.name
      }
      if(request.calories){
          retornoDb._calories = request.calories.toFixed(2)
      }
      if(request.price){
          retornoDb._price = request.price.toFixed(2)
      }
      if(request.session){
          retornoDb.session = request.session
      }
  
      
      return retornoDb
  }



}


module.exports = ProdutoPost;

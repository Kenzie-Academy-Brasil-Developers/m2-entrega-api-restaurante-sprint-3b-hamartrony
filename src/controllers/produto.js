
const Write               = require('../helpers/write')
const ProductModel        = require('../models/produto')
const {req, res}          = require('express')
const Read                = require('../helpers/read')


// recebe dados do post, e manda criar em models
class ProdutoPost {    

  static criarProduto(data) {                                 // CRIAR PRODUTO 
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
    return data.find((produto) => produto.id == id)   
  }


  static editarProduto(request, retornoDb){                     // EDITAR PRODUTO

      if(request.name){
          retornoDb.name = request.name
      }
      if(request.calories){
          retornoDb._calories = request.calories
      }
      if(request.price){
          retornoDb._price = request.price
      }
      if(request.session){
          retornoDb.session = request.session
      }
  
      
      return retornoDb
  }



}


module.exports = ProdutoPost;

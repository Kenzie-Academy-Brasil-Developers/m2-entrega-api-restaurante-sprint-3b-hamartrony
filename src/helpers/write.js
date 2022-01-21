const { writeFileSync, readFileSync, write } = require("fs")
const { req, res } = require("express")


class Write{
    static escrever(req, res){                                                           // ESCREVER NO BANCO
        
        const banco     = readFileSync('./src/mock/db.json')
        const dbRead    =  JSON.parse(banco)
        
        if(dbRead.length !==0){
            const dbInsert  = {"products":[...dbRead.products, req], "orders":[...dbRead.orders]}
            
            writeFileSync('./src/mock/db.json', JSON.stringify(dbInsert))
            
            
        
        }else{
            const dbInsertFrist = {"products":[req], "orders":[...dbRead.orders]}
            writeFileSync('./src/mock/db.json', JSON.stringify(dbInsertFrist, null, 2))
        }

    
    }

   

    static delete(getId){                                                                   // DELETAR NO BANCO 
        const banco          = readFileSync('./src/mock/db.json')
        const dbRead         = JSON.parse(banco)                    //banco em js
        const prodIndex      = dbRead.products.findIndex((produto)=> produto.id == getId)
        dbRead.products.splice(prodIndex,1)
        const dbInsert =  {'products':[...dbRead.products], "orders":[...dbRead.orders]}
        writeFileSync('./src/mock/db.json', JSON.stringify(dbInsert))

    }
  
}





module.exports = Write




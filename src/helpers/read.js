const { writeFileSync, readFileSync } = require("fs")
const { req, res } = require("express")


class Read{                                                                 // LER NO BANCO
    static lerProductos(){
        const banco     = readFileSync('./src/mock/db.json')
        const dbRead    = JSON.parse(banco)
        
       
        return dbRead
        

    }

  




}



module.exports = Read
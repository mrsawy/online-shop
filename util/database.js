const mysql = require(`mysql2`);
const pool1 = mysql.createPool({
    host:`localhost`,
    user:`root`,
    database:`node_complete`
    ,password:`Dfg456h7j8!`
})

const pool2 = new Promise((resolve,reject)=>{
    resolve(mysql.createPool({
        host:`localhost`,
        user:`root`,
        database:`node_complete`
        ,password:`Dfg456h7j8!`
    }))
})


exports.pool1 = pool1.promise() ;
exports.pool2 = pool2 ;
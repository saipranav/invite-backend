module.exports = {
  "db" : {
    "connector" : "memory" ,
    "name" : "db"
  } ,
  "mongodb" : {
    "connector" : "mongodb" ,
    "host" : process.env.MONGODB_PORT_27017_TCP_ADDR ,
    "name" : "mongodb" ,
    "port" : process.env.MONGODB_PORT_27017_TCP_PORT
  }
};

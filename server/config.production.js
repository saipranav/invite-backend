var port = process.env.NOMAD_ADDR_http ? process.env.NOMAD_ADDR_http.split( ":" ) [ 1 ] : 3002;

module.exports = {
  "port" : port
};

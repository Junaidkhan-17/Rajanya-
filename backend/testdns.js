const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.spqccgp.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.log("DNS Error:", err);
    } else {
      console.log("SRV Records:");
      console.log(addresses);
    }
  }
);
var express = require('express');
var router = express.Router();
const webpush = require('web-push');

var rp = require('request-promise');

var cron = require('node-cron');
const { response } = require('../app');


const mazixeden = "https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=%7B%22%24match%22%3A%7B%22collectionSymbol%22%3A%22boss_bulls_club%22%7D%2C%22%24sort%22%3A%7B%22createdAt%22%3A-1%7D%2C%22%24skip%22%3A0%2C%22%24limit%22%3A20%7D";
const solart = "https://qzlsklfacc.medianetwork.cloud/get_nft?collection=bossbulls&page=0&limit=30&order=&fits=any&trait=&search=&min=0&max=0&listed=true&ownedby=&attrib_count=&bid=all";
let latest,latest2={_id:''};

let latests,latest2s={id:''};

cron.schedule('*/5 * * * * *',async () => {
    let res;
    var options = {
        uri: mazixeden,
        // json: true // Automatically parses the JSON string in the response
    };

    try{
         ress = await rp(mazixeden);
         latest = JSON.parse(ress).results[0];
    }catch(e){
        console.log(e);
    }

    let res2;
    var options = {
        uri: solart,
        // json: true // Automatically parses the JSON string in the response
    };

    try{
         res2 = await rp(solart);
         latests = JSON.parse(res2).items[0];
    }catch(e){
        console.log(e);
    }


});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//subscribe route
router.get('/subscribe', (req, res)=>{
  if(latest && latest._id !== latest2._id){
    latest2 = latest;
    res.json({item:latest});
    return;
  }
  res.json({item:null});
})

router.get('/subscribe2', (req, res)=>{
  if(latests && latests.id !== latest2s.id){
    latest2s = latests;
    res.json({item:latests});
    return;
  }
  res.json({item:null});
})

module.exports = router;

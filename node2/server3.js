

var kayttajat = ["admin", "user00", "topsecret"]; //kovakoodattu data 
var profiili_data = []; //tallennetaan "kovakoodauksella" konkreetisen käyttäjän profiilitietoja taulukkoon ja tehdä JSON-merkkijono joka palautetaan HTTP-response viestillä käyttäjälle 



var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var crypto = require('crypto');
//var hash = crypto.createHash('sha256'); //sha256



// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // laadataan JSON parserointi ominaisuus , jolloin "body" muuttuja on JSON rakenne
//palvelin kuuntelee porttia eli localhost:portti/...
var portti = 8080

// ??????
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(express.static('web_public'))
app.use(allowCrossDomain);
//----------------------------------------------------

app.get('/index.htm', function (req, res) {
  res.sendFile(__dirname + "/" + "index.htm");
})

app.get('/moi', function (req, res) {
  console.log("moi");
  res.send(JSON.stringify({ body: "moikka moi2" + new Date(), test: "test" }));
})

//-----------------------------------------------------

//=========

app.post('/lomake1', function (req, res) {

    

  //var muutuja =  req.body.nimi;  
  //console.log("Lomaken lähetys onnistunut .  ---> " + muuttuja);
  console.log("Lomaken lähetys onnistunut .  ---> ");
  console.log("JSON data : " + req.body);

  //JSON parser
  // { n1 : arvo1 , n2 : arvo2 ....  ,}

 //var json_objekti = JSON.parse(json_merkkijono); // ?????????????


//--------------


var kayttaja_loytyi = false;

//etsi käyttäjät globaali taulukosta (kavakoodattu data)
  for(var i = 0; i < kayttajat.length; i++){
      
      if(req.body[0] == kayttajat[i]){   
              kayttaja_loytyi = true;
            kovakoodattu_data(req.body[0]);
      }//if
  
}


      /*
      if(req.body[0] == "admin"){
      // req.body[0] = " **** Admin ******";
      req.body[1] = " **** Admin ******";

        //https://realguess.net/2015/09/26/node-js-crypto-starters/
        var j_data = req.body[2];
        req.body[2] = "password hash : "+ require('crypto').createHash('sha256').update(j_data, 'utf8').digest('hex'); //sha256('123123')

        
       
        profiili_data = [ "Hei "+ req.body[0] +" , Työtehtäväsi : " + req.body[3], 
                          "Yhteystietosi -> (puhelinumerosi )" + req.body[4] + "ja ( sähköpostisi ) " + req.body[5] ,
                          "Salasanasi (sha256) hash : " +req.body[2] ];
                          

      }
       */

       var json_tieto = "";

  //muuttaa merrijono taulukoksi
   if( ! kayttaja_loytyi )  json_tieto = JSON.stringify(req.body);
   else if( kayttaja_loytyi) json_tieto = JSON.stringify(profiili_data); 

// if(req.body[2] == "123123") req.body[2] = "password hash : "+ require('crypto').createHash('sha256').update('123123', 'utf8').digest('hex'); //sha256('123123');

//var json_tieto = JSON.stringify(req.body);

console.log("JSON GET tieto : " +json_tieto);
//--------------

 res.send(json_tieto);

})


//----------------------------------------------------

app.post('/process_post', function (req, res) {
  //app.post('/process_post', function (req, res) {

  //console.log("POST on suoritettu !", req.body);
  console.log("POST suoritettu : ", req.body.a);

  // req.body == "{a=1, b=2}"


  var p_first_name = req.body.a;
  var p_last_name = req.body.b;

 // console.log(response);

  var json_data_a = JSON.stringify({ n_firstname: p_first_name, n_last_name: p_last_name });
  console.log("Returning " + json_data_a);
  //res.send("POST komento on suoritettu ! <br> Nimi on : " + p_first_name + "<br>  Sukunimi : " + p_last_name + "<br /> </br>" + json_data_a);
   res.send("POST komento on suoritettu ! <br> Nimi on : " + json_data_a.a + "<br>  Sukunimi : " + json_data_a.b + "<br /> </br>" + json_data_a);


})


// ...................


app.listen(portti, function () {
  console.log('Example app listening on port !' + portti)
})



function kovakoodattu_data(  anna_kayttaja ){

        profiili_data.splice(0, profiili_data.length); //tyhjennä koko taulukko

        profiili_data.push(".login.."); //kaikki käyttäjät saavat

        if( anna_kayttaja == "admin" ){
            profiili_data.push("Olet tämän palvelimen ylläpitäjä");
            profiili_data.push("111");
            profiili_data.push("ADMIN_TOOLS");
        }

        else if ( anna_kayttaja == "user00"){
            profiili_data.push("Olet tavallinen käyttäjä");
            profiili_data.push("222");
            profiili_data.push("");
        }

        else if(anna_kayttaja == "topsecret"){
          profiili_data.push("Kehität salaista projektia");
          profiili_data.push("333");
          //sha256 hash 
          var salainen_data = "j_data";
          profiili_data.push("password hash : "+ require('crypto').createHash('sha256').update(salainen_data, 'utf8').digest('hex') );  //sha256('123123')

        }

}
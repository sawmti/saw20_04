
/* PRINCIPLES ############################################ */
// 1. API'S URL:
// 1a.Parts of the url:
wd = "https://www.wikidata.org/w/api.php?";
wp = "https://es.wikipedia.org/w/api.php?"; // list of iso-code = ? ----------------<
aw = "action=wbgetentities" ; // rather wdpoint
aq = "action=query" ; // ?rather wppage
ts = "&sites=eswiki" ; // wd only&required. // list of wiki-code = ? --------------<
t = "&titles=" // target, wd|wp
i = "Dragon"; //item, wd|wp
  // i_ht = "＊～米字鍵～" ; // wdpoint|wppage -- +few data
  // i_hs = "＊～米字键～" ; // wdpoint: missing; wppage: redirect (confirmed)
  // i_ht = "中國" ; // wdpoint|wppage -- +many data
  // i_hs = "中国" ; // wdpoint: missing; wppage: redirect (idem)
l  = "&languages=es" ; // wdpoint only
ps = "&props=sitelinks|labels|aliases|descriptions" ; // wdpoint only
  //sitelinks: all interwikis
  //labels: title without _(tag), for l (languages) only
  //aliases: label of redirect page
p = "&prop=extracts&exintro&explaintext&exsentences=10" ; // wppage only
r = "&redirects&converttitles" ; // wppage only
c = "&callback=?" ;// wd|wp
f = "&format=json" ;// wd|wp
q = "&ids=" // target, wd|wp variable JP

//1b. Compose your url:
  urlwd = wd+aw+ts+t+i+l+ps    +c+f; // typical wd query
  url   = wp+aq   +t+i     +p+r+c+f; // typical wp query
// Examples print in console:
console.log("1. WD: "+urlwd);
console.log("2. WP: "+url);

/* translate ***************** */
var wikidata_translate = function (item,isolang) {
  var url = wd+aw+ts+t+item+l+ps    +c+f, // typical wd query
      iso = isolang+"wiki",
      trad="";
  console.log(url);
  $.getJSON(url, function (json) {
      trad =  json.entities[ Object.keys(json.entities)[0] ].sitelinks[iso].title;
    console.log("1"+trad);
  })
//return trad +"y2"+toto;
};
//console.log(wikidata_translate("Dragon", "zh") /**/)


//--------------------------------------------------
// 2b. Single query (alternative code): WDjp
/*
function WD_i(item) {
  //var be = item
       url_tpl = wd+aw+ts+t+item+l+ps    +c+f; // typical wd query
       //url_tpl = wd+aw+ts+l+ps+f+q+item; // typical wd query JP
       console.log("3. JP: "+url_tpl);
       //  url_tpl = wp+aq+t+ item +p+r+c+f;
 $.getJSON(url_tpl, function (data) {
  $.each(data.query.pages, function (i, json) { // THIS DO THE TRICK !
          sent = json.extract.toString();
          title = json.title.toString();
 console("marca JP");
                result = "<table><tr><th><b>" + item + "</b></th></tr><tr><th>" + sent + title + "</th></tr></table>";
          

          $('#anchor2').append("<div>"+result+"</div>");// append
      });
  });
}
WD_i("Valparaiso");
*/
//--------------------------------------------------



//1c. DOM injection:
//$("body").html('<a href="'+url+'">Link</a>.<br />'+ url); //publish the url.
// wd+i INconsistently provide variants.

/* DEMO ################################################## */
/* 2. TEMPLATING ***************************************** */
// 2a. Single query :

function WD(item) {
 //       url_tpl = wd+aw+ts+t+item+l+ps    +c+f; // typical wd query

    url   = wp+aq+t+ item +p+r+c+f;
        //   url_tpl = wd+aw+ts+l+ps+f+q+item; // typical wd query JP

    console.log(url);
    $.getJSON(url, function (json) {
        var item_id = Object.keys(json.query.pages)[0]; // THIS DO THE TRICK !
//        var extract = json.query.pages[item_id].extract;
        var extract = json.query.pages[item_id].extract;       
        var pais = json.query.pages[item_id].id;       

        var result = "<b>En :</b> <t>" + item + item_id + pais +"</t> <b>⇒</b> " + extract;
        $('#anchor1').append("<div>"+result+"</div>"); // append
    });
}; 
//WD("Nirvana");
////var List = ["Q2887","Q33986","QJPI83","QJPI17","Q15920"];


// 2b. Single query (alternative code):

function WD_i(item) {
        //var be = item
 //       url_tpl = wd+aw+ts+t+item+l+ps    +c+f; // typical wd query
        url_tpl = wp+aq+t+ item +p+r+c+f;
        $.getJSON(url_tpl, function (data) {
            $.each(data.query.pages, function (i, json) { // THIS DO THE TRICK !
                sent = json.extract.toString();
                title = json.title.toString();
                result = "<b>En:</b> <t>" + item + "</t> <b>⇒</b> " + sent;
//                result = "<table><tr><th><b>" + item + "</b></th></tr><tr><th>" + sent + title + "</th></tr></table>";
                
      
                $('#anchor2').append("<div>"+result+"</div>");// append
            });
        });
}

//WD_i("Roma");

//armando url
//URL+accion+formato+lenguaje+props+
//wd+aw+f+l+ps+ts
https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&languages=es&props=sitelinks|labels|aliases|descriptions&sites=eswiki
//urlwd = wd+aw+ts+t+i+l+ps    +c+f; // typical wd query
//url   = wp+aq   +t+i     +p+r+c+f; // typical wp query



/* LOOP ****************** */
// 2c. LOOP on a list of existing articles
function WD_list(list) {
  console.log(list);
    $.each(list, function (a, item) {
        WD(item);
        WD_i(item);
    });
}



//var List = ["Santiago", "Valparaiso"];
var List = ["Santiago de Chile", "Buenos Aires", "Valparaiso"];
//var List = ["Q2887","Q33986","QJPI83","QJPI17","Q15920"];
//var List = [ "Nirvana", "Los Pericos","Guns N Roses"];

//console.log(List);
WD_list(List);

/*
//----------------------------------------------------------------------
//leer archivo
const fs = require ('fs');
const input = "fichero.txt";
fs.readFile(input,'utf8',(err,datos)=>{
if (err) throw err;
//datos = datos.toUpperCase();
console.log(datos);
});
*/
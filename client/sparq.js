// Consulta SPARQL
function testQuery(){
    var endpoint = "https://query.wikidata.org/sparql";
    var query = "SELECT distinct ?pais ?paisLabel ?ciudad ?ciudadLabel ?pic ?value \n\
    WHERE { \n\
        ?pais wdt:P31 wd:Q3624078 .\n\
        ?ciudad wdt:P31 wd:Q5119 .\n\
        ?pais wdt:P36 ?ciudad .\n\
       ?ciudad wdt:P18 ?pic .\n\
       ?ciudad wdt:P856 ?value . \n\
       SERVICE wikibase:label { bd:serviceParam wikibase:language 'en' } . \n\
    } \n\
       ORDER BY ?paisLabel \n\
           ";
  console.log(query);
    $.ajax({
                url: endpoint,
                dataType: 'json',
                data: {
                    queryLn: 'SPARQL',
                    query: query ,
                    limit: 'none',
                    infer: 'true',
                    Accept: 'application/sparql-results+json'
                },
                success: Resultados,
                error: displayError
        });
  }
  
  function displayError(xhr, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(errorThrown);
  }
  //Despliega Resultados
  

  function Resultados(data) {
    $.each(data.results.bindings, function(index, bs) {
      var html = "";
      if (bs['pic'] != null){
        console.log(bs['ciudadLabel']['value']);
        html += "<td><img style='width: 200px' src='" + bs['pic']['value'] + "'/></td>"; 
        html += "<td>PAIS: " + bs['paisLabel']['value'] + "<br>CAPITAL: " + bs['ciudadLabel']['value'] + "<BR>Màs Info en : <a href> " +  bs['value']['value'] + "</a></td>";
    }
        else
        { 
        html += "<div class='inline thumb'><img src=''/></div>";
  }
  
        $("#anchorcapital").append("<table><tr>"+ html +"</tr></table>");
    });
  }


//--------------

function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	var settings = {
		headers: { Accept: 'application/sparql-results+json' },
		data: { query: sparqlQuery }
	};
	return $.ajax( endpointUrl, settings ).then( doneCallback );
}

var endpointUrl = 'https://query.wikidata.org/sparql',
	sparqlQuery = "#defaultView:ImageGrid \\n\\\n" +
        "SELECT distinct ?pais ?paisLabel ?ciudad ?ciudadLabel ?pic \n" +
        "WHERE { \n" +
        "    ?pais wdt:P31 wd:Q3624078 .\n" +
        "    ?ciudad wdt:P31 wd:Q5119 .\n" +
        "    ?pais wdt:P36 ?ciudad .\n" +
        "    ?ciudad wdt:P18 ?pic .\n" +
        "    SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\" }\n" +
        "              }\n" +
        "ORDER BY ?paisLabel\n" +
        "";

makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
		$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
		console.log( data );
	}
);
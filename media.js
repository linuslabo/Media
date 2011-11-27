/**
Script written by Salvatore Cascone
http://coffcoff.netsons.org
Please don't copy this script without the permission of the author.
*/	
numRighe=1;
ultimaRiga=1;

$(function(){
		$("#piu").click(function() {
			pulsantePremuto();			
		});
		$("#calc").click(function() {
			media();
		});
	});
	
	var creditiEnter = function(e, id){
		if (e.keyCode != 13) return;
		var num=parseInt(id.substring(7));
		if(num==ultimaRiga) $('#piu').focus().click();
		else $("#esame"+(num+1)).focus();
	}
	
	var nomeEnter = function(e, id){
		if (e.keyCode != 13) return;
		$("#voto"+parseInt(id.substring(5))).focus();
	}
	
	var votoEnter = function(e, id){
		if (e.keyCode != 13) return;
		alert($("#"+id).val());
		$("#crediti"+parseInt(id.substring(4))).focus();
	}
	
	var pulsantePremuto = function(){
		aggiungiRiga();
		$("#esame"+ultimaRiga).focus();
	}

	var aggiungiRiga = function(){
		var numEsami=$("#numEsami").val();
		var numEsamiN=parseInt(numEsami)+1;
		var vot = $("#voto"+(numEsami)).val();
		var cred = $("#crediti"+(numEsami)).val();
		var flag=true;
		
		
		if(!isNum(vot)){ $("#voto"+numEsami).css("background-color", "red"); flag=false; }
		else if(vot<18 || vot>30){ $("#voto"+numEsami).css("background-color", "yellow"); flag=false; }
		else $("#voto"+numEsami).css("background-color", "white");
		
		if(!isNum(cred)){ $("#crediti"+numEsami).css("background-color", "red"); flag=false; }
		else if(cred<1 || cred>20){ $("#crediti"+numEsami).css("background-color", "yellow"); flag=false; }
		else $("#crediti"+numEsami).css("background-color", "white");
		
		if(flag==false) return;
		
		
		$("#lista").append('<tr>'+'<td><input type="text" id="esame'+numEsamiN+'" OnKeyDown="nomeEnter(event, this.id)"/></td>'+'<td><input type="text" class="vot" name="voto'+numEsamiN+'" id="voto'+numEsamiN+'" OnKeyDown="votoEnter(event, this.id)"/></td>'+'<td><input type="text" class="credit" name="crediti'+numEsamiN+'" id="crediti'+numEsamiN+'" OnKeyDown="creditiEnter(event, this.id)"/></td>'+'<td id="piu'+numEsamiN+'"></td>'+'</tr>');
		$("#piu").appendTo("#piu"+numEsamiN);
		var numEsami=$("#numEsami").val(numEsamiN);
		numRighe++;
		ultimaRiga++;
		$("#calc").removeAttr('DISABLED');
		
	}
	
	var media = function(){
		var numEsami = $("#numEsami").val();
		var numEsamiN=numEsami;
		var sommaCrediti=0;
		var sommaProdotti=0;
		var sommaVoti=0;
		var flag=true;
		
		for(var i=1; i<=numEsami; i++){
			var vot=parseInt($("#voto"+i).val());
			var cred=parseInt($("#crediti"+i).val());
			
			if(!isNum(vot)){ $("#voto"+i).css("background-color", "red"); flag=false; }
			else if(vot<18 || vot>30){ $("#voto"+i).css("background-color", "yellow"); flag=false; }
			else $("#voto"+i).css("background-color", "white");
			
			if(!isNum(cred)){ $("#crediti"+i).css("background-color", "red"); flag=false; }
			else if(cred<1 || cred>20){ $("#crediti"+i).css("background-color", "yellow"); flag=false; }
			else $("#crediti"+i).css("background-color", "white");
			
			if(!isNum(vot) || !isNum(cred)){
				numEsamiN--;
				continue;
			}
			
			sommaVoti+=vot;
			sommaProdotti+=vot*cred;
			sommaCrediti+=cred;
		}
		
		var mediaP = sommaProdotti/sommaCrediti;
		var mediaA = sommaVoti/numEsami;
		
		$("#mediaP").html(mediaP.toFixed(4));
		$("#mediaA").html(mediaA.toFixed(4));
		$("#totCred").html(sommaCrediti);
		$("#laurea").html(Math.round(mediaP*11/3)+' ('+(mediaP*11/3).toFixed(4)+')');
		$("#nEsami").html(numEsamiN);
			
	}
	
	var isNum = function(num) {
		return (!isNaN(num) && !isNaN(parseFloat(num)));
	}

/** by CoffCoff2 - http://coffcoff.netsons.org */

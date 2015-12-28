/**
 Written by Salvatore Cascone
 http://cascone.net
 If you need to use this script, please let the author know.
 */

$(function () {

	var esameOn = true;
	var creditiOn = true;

	$("#opzioni").click(function () {
		$(".leftAlign").slideToggle();
	});

	$("input[type=checkbox]").change(function () {
		if ($(this).val() == "nome") {
			$("#lista tr td:nth-child(2), #lista tr th:nth-child(2)").toggleClass("hidden");
			esameOn = !esameOn;
		}
		else if ($(this).val() == "crediti") {
			$("#lista tr td:nth-child(4), #lista tr th:nth-child(4)").toggleClass("hidden");
			creditiOn = !creditiOn;
		}
	});

	$(document).on("focusout", ".voto", function () {
		verificaVoto($(this));
	});

	$(document).on("focusout", ".crediti", function () {
		verificaCrediti($(this));
	});

	$(document).on("change", "input[type=text]", function () {
		$("#risultati").slideUp("slow");
	});

	$(document).on("keydown", "input", function (e) {
		var focusNextRow = function ($curtd) {
			$curRow = $curtd.closest("tr");
			if ($curRow.next().length == 0)
				$("#piu").click();
			if (esameOn)
				$curRow.next().find(".esame").focus().select();
			else
				$curRow.next().find(".voto").focus().select();
		}

		if (e.keyCode != 13)
			return;
		if ($(this).hasClass("esame"))
			$(this).closest("tr").find(".voto").focus().select();
		if ($(this).hasClass("voto")) {
			if (!creditiOn)
				focusNextRow($(this));
			$(this).closest("tr").find(".crediti").focus().select();
		}
		if ($(this).hasClass("crediti")) {
			focusNextRow($(this));
		}
	});

	$("#piu").click(function () {
		$row = $('<tr><td><input type="button" class="meno" value="-"/></td><td><input type="text" class="esame"/></td><td><input type="number" class="voto" /></td><td><input type="number" class="crediti"/></td></tr>');

		if (!esameOn)
			$row.find("td:nth-child(2)").addClass("hidden");
		if (!creditiOn)
			$row.find("td:nth-child(4)").addClass("hidden");

		$(this).parent("#piu1").appendTo($row);
		$("#lista > tbody").append($row);
		$("#calc").removeAttr('DISABLED');
	});

	$(document).on("click", ".meno", function () {
		if ($(this).closest("tr").find("#piu1").length == 0) {
			$(this).closest("tr").remove();
		}
		else {
			$prevRow = $(this).closest("tr").prev("tr");
			console.log($prevRow.find("th").length);
			if ($prevRow.find("th").length == 0) {
				$("#piu1").appendTo($prevRow);
				$(this).closest("tr").remove();
			}
		}
	});

	$("#calc").click(function () {

		var numEsami = 0;
		var sommaCrediti = 0;
		var sommaProdotti = 0;
		var sommaVoti = 0;
		var mediaP = 0;
		var mediaA = 0;

		$("#lista").find("tr").not(":first-child").each(function () {

			var voto = 0;
			var crediti = 0;

			var votoOk = verificaVoto($(this).find(".voto"));
			var creditiOk = !creditiOn || verificaCrediti($(this).find(".crediti"));

			if (votoOk && creditiOk) {
				voto = parseInt($(this).find(".voto").val(), 10);
				crediti = parseInt($(this).find(".crediti").val(), 10);

				numEsami++;
				sommaVoti += voto;
				sommaCrediti += crediti;
				sommaProdotti += voto * crediti;
			}
		});

		if (numEsami) {
			mediaP = sommaProdotti / sommaCrediti;
			mediaA = sommaVoti / numEsami;
		}

		$("#mediaP").html(mediaP.toFixed(4));
		$("#mediaA").html(mediaA.toFixed(4));

		$("#totCred").html(sommaCrediti);

		if (creditiOn)
			$("#laurea").html(Math.round(mediaP * 11 / 3) + ' (' + (mediaP * 11 / 3).toFixed(4) + ')');
		else
			$("#laurea").html(Math.round(mediaA * 11 / 3) + ' (' + (mediaA * 11 / 3).toFixed(4) + ')');

		$("#nEsami").html(numEsami);

		if (!creditiOn)
			$("#totCred, #mediaP").html("ignorato");

		$("#risultati").slideDown();
	});
});

var verificaVoto = function ($input) {
	var vot = $input.val();
	if (!isNum(vot) || vot < 18 || vot > 30) {
		$input.addClass("err");
		return false;
	}
	else
		$input.removeClass("err warn");

	return true;
};

var verificaCrediti = function ($input) {
	var cred = $input.val();

	if (!isNum(cred) || cred < 1) {
		$input.removeClass("err warn");
		$input.addClass("err");
		return false;
	}
	else if (cred > 30) {
		$input.removeClass("err warn");
		$input.addClass("warn");
	}
	else
		$input.removeClass("err warn");

	return true;
};

var isNum = function (num) {
	return (!isNaN(num) && !isNaN(parseFloat(num)));
};

/** by linuslabo - http://cascone.net */

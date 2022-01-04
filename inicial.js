var day_agend;
var det_agend;
var dt_now = new Date();

function inicial(){	
	var menu = document.querySelectorAll("#menu .myBtn");
	for (var i = 0; i < menu.length; i++){
		menu[i].addEventListener("click", selecionaMenu);
	}

	conecta("index","index", resultDetalhesGerais, "", "", "", true);
	conecta("inicial","inicial", resultNextEvents, "", "", "", true);
}

function resultDetalhesGerais(result){	
	var detalhes = JSON.parse(result);

	document.querySelector("#menu #number_nf_pro").innerHTML = "<strong>"+detalhes[0]+"</strong>";
	document.querySelector("#menu #number_nf_cli").innerHTML = "<strong>"+detalhes[7]+"</strong>";
	document.querySelector("#menu #number_nf_evt").innerHTML = "<strong>"+detalhes[6]+"</strong>";
	document.querySelector("#menu #number_nf_orc").innerHTML = "<strong>"+detalhes[5]+"</strong>";
	document.querySelector("#menu #number_nf_des").innerHTML = "<strong>"+detalhes[4]+"</strong>";
}

function selecionaMenu(e){
	buscaPagina(e.currentTarget.dataset.pagina);
};

function resultNextEvents(result){	
	var next_evt = JSON.parse(result);
	day_agend = new Array();
	det_agend = new Array();

	var trs = "";
	
	if (next_evt.length == 1){
		if (next_evt[0] == "nenhum resultado encontrado"){
			trs += "<tr><td colspan='6'><p class='pd-5'>Nenhum evento encontrado</p></td></tr>";
			day_agend = new Array("");
			det_agend = new Array("");
		}else{
			trs += "<tr><td>"+next_evt[0][0]+"</td><td>"+next_evt[0][3]+"</td><td>"+next_evt[0][4]+"</td><td>"+next_evt[0][6]+"</td><td>"+next_evt[0][7]+"</td><td>"+next_evt[0][8]+"</td></tr>";			
			if (next_evt[0][8].toString().split("/")[1] == dt_now.getMonth()){
				day_agend.push(next_evt[0][8].toString().split("/")[0]);
				det_agend.push(next_evt[0][4]);
			}
		}
	}else{
		console.log(next_evt);
		for (i = 0; i < next_evt.length; i++){
			trs += "<tr><td>"+next_evt[i][0]+"</td><td>"+next_evt[i][3]+"</td><td>"+next_evt[i][4]+"</td><td>"+next_evt[i][6]+"</td><td>"+next_evt[i][7]+"</td><td>"+next_evt[i][8]+"</td></tr>";
			if (next_evt[i][8].toString().split("/")[1] == dt_now.getMonth()){
				day_agend.push(next_evt[i][8].toString().split("/")[0]);
				det_agend.push(next_evt[i][4]);
			}			
		}
	}

	document.querySelector("table #result_next_events").innerHTML = trs;
	montaCalendarioAtual();
}

function montaCalendarioAtual(){	
	m_gl = dt_now.getMonth();    
	a_gl = dt_now.getFullYear();

	var ms = new Array('Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');
	var data = new Date(dt_now.getFullYear(), dt_now.getMonth(), 1);
	var dia = data.getDate();
	var dia_sem = data.getDay();
	var mes = data.getMonth();
	var ano2 = data.getYear();
	var ano4 = data.getFullYear();  
	var str_data = dia + '/' + (mes+1) + '/' + ano4;

	var total_dias = ultimo_dia((mes+1), a_gl);
	var linha = 1;
	var coluna = (dia_sem+1);	

	var descricao = "";

	for (var i = 1; i <= total_dias; i ++){       
		for (var j = 0; j < day_agend.length; j ++){
			if (i == day_agend[j]){        
				document.querySelector("#week-"+linha+" #col-"+coluna).innerHTML = "<p class='descricao'>"+i+"</p>";
				descricao += "<p>"+i+" - "+det_agend[j]+"</p>";  
				break;
			}
			document.querySelector("#week-"+linha+" #col-"+coluna).innerHTML = "<p>"+i+"</p>";      
		}

		if (coluna == 7){
			linha ++;
			coluna = 1;
		}else{
			coluna ++;
		};
	};

	document.querySelector("#month").innerHTML = "<p>"+ms[mes]+" - "+ano4+"</p>";    
	document.querySelector("#calendar #descricao").innerHTML = descricao;
};

/*
function exibeData(){
	window.top.mesFeriadosLocais = new Array(6,8,12);
	window.top.diaFeriadosLocais = new Array(20,15,8);
	window.top.descricaoFeriadosLocais = new Array ('Aniversário Everton','Nossa Senhora da Assunção',  'Nossa Senhora da Conceição');

	calendario.config("250","false",2,"true");
	calendario.datepicker("calendar","true",2);
};*/
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

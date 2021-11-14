function dna_writer(f) {
	
	this.home_url = "http://earthsciweb.org/js/bio/dna-writer/index.html";
	
	this.background_color = "#888";
	
	
	//letters
	this.char = new Object;
	
	this.char.start = "TTG";
	this.char.stop = "TAA";
	
	this.char.A = "ACT";
	this.char.B = "CAT";
	this.char.C = "TCA";
	this.char.D = "TAC";

	this.char.E = "CTA";
	this.char.F = "GCT";
	this.char.G = "GTC";
	this.char.H = "CGT";

	this.char.I = "CTG";
	this.char.J = "TGC";
	this.char.K = "TCG";
	this.char.L = "ATC";
	
	this.char.M = "ACA";
	this.char.N = "CTC";
	this.char.O = "TGT";
	this.char.P = "GAG";

	this.char.Q = "TAT";
	this.char.R = "CAC";
	this.char.S = "TGA";
	this.char.T = "TAG";

	this.char.U = "GAT";
	this.char.V = "GTA";
	this.char.W = "ATG";
	this.char.X = "AGT";

	this.char.Y = "GAC";
	this.char.Z = "GCA";
	
	this.char["0"] = "ATA";
	this.char["1"] = "TCT";
	this.char["2"] = "GCG";
	this.char["3"] = "GTG";
	this.char["4"] = "AGA";

	this.char["5"] = "CGC";
	this.char["6"] = "ATT";
	this.char["7"] = "ACC";
	this.char["8"] = "AGG";
	this.char["9"] = "CAA";

	this.char[" "] = "AGC";
	this.char["."] = "ACG";
	
	this.nchars = 40;
		
	this.color_codes = {
		A: "red",
		C: "green",
		G: "blue", 
		T: "yellow",	
	};

}


dna_writer.prototype.toCode_w_junk = function(f) {
	var txt = f.text.toUpperCase();
	var code = "";
	
	//put in a random length of junk dna
	var junk = this.get_random_letters();
	//alert(junk);
	
	code += this.toCode({text:junk});
	//alert(code);
	
	code += this.char["start"];

	code += this.toCode({text:txt});
	
	code += this.char["stop"];
	code += this.toCode({text:this.get_random_letters()});

	return code;	
}






dna_writer.prototype.colorBlock = function(letter) {
	return '<div class="color_'+letter+'">'+letter+'</div>';
}






dna_writer.prototype.colorCode = function(f) {
	
	var code = f.code.toUpperCase();
	
	var show_letter = typeof f.show_letter !== 'undefined' ? f.show_letter : true;

	var height = typeof f.height !== 'undefined' ? f.height : "auto";


	var link = typeof f.link !== 'undefined' ? f.link : "none";

	
	if (typeof f.title !== 'undefined') {
		if (f.title === "default" || f.title === "text") {
			var title = this.toWords({code:code});
		} else if (f.title === "seq") {
			var title = code;
		} else {
			var re = new RegExp("_", "g");
			var title = f.title.replace(re, " ");
		} 
	} else {
		var title = this.toWords({code:code});
	}
			

	//var title = typeof f.title !== 'undefined' ? f.title : this.toWords({code:code});

	
	if (typeof f.dimensions !== 'undefined') {
		switch(f.dimensions) {
			case "fit":
				var dimensions = "fit";
				break;
			default:
				var dimensions = "auto";
		}		
	} else {
		var dimensions = "auto";
	}
	
	//var dimensions = typeof f.dimensions !== 'undefined' ? f.dimensions : "auto";
	var ncols = typeof f.ncols !== 'undefined' ? parseInt(f.ncols) : 0;
	
	var div_id = f.div_id +"_cols_";
	var div = $("#"+f.div_id);
	
	//get width of one element
	div.html("");
	var max_width = div.width();
	if (show_letter) {
		div.append('<div id="test_col" class="color_base A" style="width:1em;">A</div>');
	} else {
		div.append('<div id="test_col" class="color_base A"> </div>');
	}
	var block_width = $("#test_col").width();
	var block_height = $("#test_col").height();
	//alert(block_height+ " "+block_width);	
	div.html("");
	
	if (link === "home") {
		var html = '<a id="home_link" href="'+this.home_url+'?seq='+code+'" ></a>';
		//alert(html);
		div.html(html);
		div = $("#home_link");
	}
	
	div.prop("title", title);
	
	var txt = "";
	var tile_id = '';
	var l = "";
	var lt = "";
	var n = -1;
	var r = 2;
	var xpos = 0;
	var ypos = 0;
	var ip = 0;
	

	for (var i=0; i<code.length; i++){
		n++;
		if (ncols === 0) {
			if (xpos > max_width - (2*block_width)) {
				r++;
				ypos += block_height+3;
				//alert(r+ " " + ypos);
				ip = 0;
			}
		} else {
			if (ip >= ncols) {
				r++;
				ypos += block_height+3;
				ip = 0
			}
		}
		xpos = block_width*ip;
		ip++;
		//alert(txt[i]);
		//l = this.color_codes[code[i]];
		l=code[i];
		lt = show_letter ? l : "";
		//txt = this.colorBlock(code[i]);
		tile_id = div_id+n;
		txt = '<div class="color_base '+l+'" id="'+tile_id+'" style="left:'+xpos+'px; top:'+ypos+'px">'+lt+'</div>';
		//txt = '<span class="color_base '+l+'" id="'+tile_id+'" style="width:15px;">'+lt+'</span>';
		div.append(txt);
		$("#"+tile_id).click({letter:l}, function(e) {
			//alert("hi");
			$(this).toggleClass('color_background');
			$(this).toggleClass(e.data.letter);
		});
		
		// add blank 
		/*
		if (i%3 == 2) {
			xpos = block_width*ip;
			ip++;
			n++;
			tile_id = div_id+n;
			txt = '<div class="color_blank" id="'+tile_id+'" style="left:'+(xpos-4)+'px; top:'+(ypos-1)+'px"></div>';
			div.append(txt);
		}
		*/
	}	
	
	
	if (height === "auto") {
		div.height((block_height)*r);
	}
	
	//return txt;
	
	
	
}

dna_writer.prototype.colorSwitch = function(f) {
	var div = $("#"+f.div_id);
	var l = f.letter;
	
	alert(div.css('backgroundColor'));
	
}

dna_writer.prototype.toCode = function(f) {
	var txt = f.text;
	var separator = typeof f.separator !== 'undefined' ? f.separator : "none";
	var code = "";
	
	if (separator !== "none") {
		var re = new RegExp(separator, "g");
		txt = txt.replace(re, " ");
	} 
	txt = txt.toUpperCase();
	//alert(separator);

	//translate code
	for (var i=0; i<txt.length; i++){
		if (typeof this.char[txt[i]] !== 'undefined') {
			code += this.char[txt[i]];
		}
		//alert(txt[i]+": "+this.char[txt[i]]+"\n"+code);	
	}	
	return code;
}

dna_writer.prototype.toWords = function(f) {
	var code = f.code.toUpperCase();
	var txt = "";
	
	for (var i=0; i<code.length; i+=3){
		//alert(txt[i]);
		c1 = code[i];
		c2 = code[i+1];
		c3 = code[i+2];
		//alert(c1+c2+c3);
		txt += this.lookup(c1+c2+c3);
		//alert(txt);
	}	
	return txt;
}

dna_writer.prototype.lookup = function(codon) {
	codon = codon.toUpperCase();
		
	for (var c in this.char) {
		if (codon === this.char[c]){
			return c;
		}
	}
	
	return "";
}

dna_writer.prototype.writedb = function(f){
	this.style = typeof f.style !== 'undefined' ? f.style : "html";
	var rows = typeof f.rows !== 'undefined' ? f.rows : 14;

	//alert(this.char.length);
	
	var t = "";

	t_head = "<table border='1'>";
	t_head += "  <tr>";
	t_head += "    <th>Letter</th>";
	t_head += "    <th>Code</th>";
	t_head += "  </tr>";
	
	t_tail = "</table>";
	
	if (this.style === "html") {

		t += '<div id="tables" style="width:500px;background-color:red;">';
		
		var ct = 0;
		var colwidth = 120;
		var colnum = 0;
		for (var c in this.char) {
			ct++;
			if (ct === 1) {
				t += '<div id="table" style="float:left;width:'+colwidth+'px;top:0px;">';
				colnum += 1;
				t += t_head;
			} ;
			t += "  <tr>";
			t += "    <td>"+c+"</td>";
			t += "    <td>"+this.char[c]+"</td>";
			t += "  </tr>";
			if (ct === rows) {
				t += t_tail;
				t += '</div>';
				ct = 0;
			};
		}

		if (ct !== 0) {
			t += " </table></div>";
		}
		
		t += '</div>';
	}
	
	if (this.style === "print") {
		
		t += "<!DOCTYPE HTML>";
		t += "<html>";
		t += " <head>";
		t += '	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >';
		t += " <title>Simple DNA Writer: via Montessori Muddle </title>";
		t += " </head>";
		t += ' <body style="background-color:#999";>';

		t += "To: "+ f.student + "<p>";
		t += '<div id="code" style="background-color:none;">';
		t += 'DNA Sequence:<br>';
		//t += f.code;
		var i = 0;
		var nbases = 20;
		while (i < f.code.length) {
			t += f.code.substring(i,i+nbases*3) + " <br>";
			i += nbases*3;
		}
		t += "<p></div>";
		
		t += '<div id="tables" style="width:500px;background-color:red;">';
		
		var ct = 0;
		var colwidth = 120;
		var colnum = 0;
		for (var c in this.char) {
			ct++;
			if (ct === 1) {
				t += '<div id="table" style="float:left;left:'+colnum*colwidth+'px;width:'+colwidth+'px;">';
				colnum += 1;
				t += t_head;
			} ;
			t += "  <tr>";
			t += "    <td>"+c+"</td>";
			t += "    <td>"+this.char[c]+"</td>";
			t += "  </tr>";
			if (ct === rows) {
				t += t_tail;
				t += '</div>';
				ct = 0;
			};
		}

		if (ct !== 0) {
			t += " </table></div>";
		}
		//t += " </div>";
		
		//alert(t);
		t += '<p><div id="info" style="position:absolute;left:'+(colnum)*colwidth+'px;background-color:none;border: 1px solid black; padding:2px;">';
		t += "In this activity, we're going to study how DNA stores and transfers information.<br>";
		t += "For our purposes, the DNA will code a message in English. Your job is to translate the message and execute the instruction.</br>";
		t += "Each letter in the engish alphabet will be represented by a string of three base codes. Since each DNA strand has hundreds of genes, there also needs to be codes to tell where each gene starts and stops. The DNA inbetween genes is called non-coding DNA (and is sometimes referred to as junk DNA).";
		t += " </div>";
		t += " </div>";
		
		t += '<p style="clear:both;">----</p>';
		t += '<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Simple DNA Writer</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://montessorimuddle.org/2013/02/02/dna-writer/" property="cc:attributionName" rel="cc:attributionURL">Lensyl Urbano</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.';
		
		t += " </body>";
		t += "</html>";
		
	}
	
	
	return t;
}

dna_writer.prototype.get_random_letters = function() {
	var nletters = 2+Math.floor(Math.random()*3);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < nletters; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

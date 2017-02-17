$(document).foundation()


$(document).ready(function(){
	var button = $("#ck");
	var image = document.getElementsByClassName("artist-picture");
	var name = document.getElementsByClassName("artist-name");
	var spotify = document.getElementsByClassName("artist-spotify");
	var followers = document.getElementsByClassName("artist-followers");
	var popularity = document.getElementsByClassName("artist-popularity");
	var progress = document.getElementsByClassName("progress-meter");

	var info = document.getElementsByClassName("artist-info");


	$(".orbit").hide();

	hideSlides();


	button.click(function(){

		$(".orbit").show();
		var input = $("#input-artist").val(); 	//Stores artist
		var artist = removeSpaces(input);

		

		$.getJSON("https://api.spotify.com/v1/search?q=" + input +"&type=artist", function(data){
			var obj = data;
			console.log(obj);
			var img = 0;
			var espacios = 0;

			showSlides();

			for(var i = 0; i < obj.artists.items.length; i++){
				if(img === image.length){
					break;
				}
				if(obj.artists.items[i].images.length !== 0){
					image[img].src = obj.artists.items[i].images[0].url;
					image[img].style.height = '450px';
					

					name[img].innerHTML = obj.artists.items[i].name;
					spotify[img].href = obj.artists.items[i].external_urls.spotify;
					followers[img].innerHTML = obj.artists.items[i].followers.total;
					popularity[img].innerHTML = obj.artists.items[i].popularity;
					progress[img].style.width = obj.artists.items[i].popularity + "%";
					img++;
					espacios++;
				}
			}

			//checa si era menor la lista de objetos
			if(espacios < image.length){
				for(var i = espacios; i < image.length; i++){
					image[i].src = "notfound.jpg";
					resetInfo(i);
					//image[i].style.display = "none";
					info[i].style.display = "none";
				}
			}


			
		});


		$("#input-artist").val("");
	});

	function removeSpaces(str){
		/*
			str must not be empty
		*/
		var strNoSpaces = "";
		for (var i = 0; i < str.length; i++) {
			if(str[i] === " "){
				strNoSpaces += "+";
			}else{
				strNoSpaces += str[i];
			}
		}
		return strNoSpaces;
	}

	function resetInfo(pos){
		name[pos].innerHTML = "";
		spotify[pos].href = "#";
		followers[pos].innerHTML = "";
		popularity[pos].innerHTML = "";
	}

	function hideSlides(){
		for(var i = 0; i < image.length; i++){
			image[i].style.display = "none";
		}
	}

	function showSlides(){
		for(var i = 0; i < image.length; i++){
			image[i].style.display = "block";
			info[i].style.display = "block";
		}
	}
});


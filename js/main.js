$(document).ready(function() {
	initialize();
});



function initialize() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoic25vd2dhZ2UiLCJhIjoiUnhjQVVqMCJ9.IwvvLu1WhgtaSryHAf5Daw';
	var map = L.mapbox.map('map', 'mapbox.streets');

	map.setView([45.2,-111],8)

	//var track = new L.KML("layers/habitatCores.kml", {async: true});
	//track.on("loaded", function(e) { map.fitBounds(e.target.getBounds()); });
	//map.addLayer(track);

	function addMapLayers(){
		$.each(dataStructure, function(i, item) {
			var thisItem=item;						
			for (var j = 0; j < thisItem.files.length; j++) {
				var thisFile = thisItem.files[j];				
				console.log(thisFile);
				window[thisFile.id] = omnivore.kml(thisItem.path+thisFile.fileName)
			    //.addTo(map)	    
			    .on('ready', function() {			    				        			    	
			    })			    
			}		
		})
	}
	addMapLayers();


	function buildDropDowns() {
		$.each(dataStructure, function(i, item) {			
			var thisItem = item;
			$('#sidebar').append("<div class='menuSubtitle'>" + thisItem.name + "</div><select id='" + thisItem.id + "' class='multiselectClass' multiple='multiple'></select><br>")
			window[thisItem.id + "Layers"] = [];
			for (var j = 0; j < thisItem.files.length; j++) {
				var thisFile = thisItem.files[j];
				eval(thisItem.id + "Layers").push(thisItem.files[j].id)
				$("#" + thisItem.id + "").append('<option value="' + thisItem.files[j].id + '">' + thisItem.files[j].name + '</option>')
			}
			$("#" + thisItem.id + "").multiselect({
				multiple: true,
				header: true,
				//noneSelectedText: "",
				selectedList: 1,
				height: '260px',
				position: {
					my: 'left top',
					at: 'right top'
				}
			});
			$("#" + thisItem.id + "").on('multiselectclick multiselectcheckall multiselectuncheckall', function(event, ui) {
				//when this timeout fires it will carry the clicked name callback that is based at the end of the timeout after 10,this.name - mofo
				window.setTimeout(function() {
					var layersToShow = $("#" + thisItem.id + "").val();
					//if layerstoshow is undefined it means there should be no layers so we will replace with an empty array
					if (layersToShow == undefined || layersToShow == null) {
						layersToShow=[];
					}
					//if there is a layer in all layers that is not in layersToShow, hide it.. redundant but whatev
					$.each(eval(thisItem.id + "Layers"), function(j, jitem) {
						if(layersToShow.indexOf(jitem)==-1){
							layerHider(jitem);
						}
						else if(layersToShow.indexOf(jitem)>-1){
							layerShower(jitem);
						}
					})
				}, 10);
			})
		})	
	}
	buildDropDowns();

	function layerHider(layerToHide) {	
		map.removeLayer(eval(layerToHide));
	}

	function layerShower(layerToShow) {
		eval(layerToShow).addTo(map);
	}



	//$('#controlsTitle').after("<div class='sidebarSubTitle'>"+thisFilterTitle+"</div><select id='"+thisSelectorId+"' name='"+thisSelectorName+"' class='multiselectClass' multiple='multiple'></select><br>")
}
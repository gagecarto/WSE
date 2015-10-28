$(document).ready(function() {
	initialize();
});


var numberOfFiles=0;

function initialize() {
	L.mapbox.accessToken = 'pk.eyJ1Ijoic25vd2dhZ2UiLCJhIjoiUnhjQVVqMCJ9.IwvvLu1WhgtaSryHAf5Daw';
	var map = L.mapbox.map('map', 'mapbox.streets');

	map.setView([45.2,-111],8);

	mapLayers = {};

	var pubLandsViz='https://westernsustainability.cartodb.com/api/v2/viz/020aca92-3bc4-11e5-9f39-0e853d047bba/viz.json';
	var pubLandsLayer;

	var grizViz='https://westernsustainability.cartodb.com/api/v2/viz/f8f05836-3c5a-11e5-bc3a-0e4fddd5de28/viz.json';
	var grizLayer;

	var elkViz='https://westernsustainability.cartodb.com/api/v2/viz/72226a64-3c5b-11e5-b8fa-0e018d66dc29/viz.json';
	var elkLayer;

	var hydroViz='https://westernsustainability.cartodb.com/api/v2/viz/53197708-3c87-11e5-bff0-0e018d66dc29/viz.json';
	var hydroLayer;

	var sageGrouseViz='https://westernsustainability.cartodb.com/api/v2/viz/445a39f0-3f98-11e5-b6a3-0e018d66dc29/viz.json';
	var sageGrouseLayer;

	var wolvesViz='https://westernsustainability.cartodb.com/api/v2/viz/3bf785fa-3f9e-11e5-b836-0e0c41326911/viz.json';
	var wolvesLayer;

	var consValueViz='https://westernsustainability.cartodb.com/api/v2/viz/88947276-45dc-11e5-97db-0e4fddd5de28/viz.json';
	var consValueLayer;

	var ibaViz='https://westernsustainability.cartodb.com/api/v2/viz/13a8317a-7dc0-11e5-903b-0e5db1731f59/viz.json';
	var ibaLayer;

	//publicLands
	cartodb.createLayer(map, pubLandsViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  pubLandsLayer=layer;  
		  mapLayers.pubLands=pubLandsLayer;
		  mapLayers.pubLands.type='cartoDBLayer';
		  mapLayers.pubLands.hide();
		  layer.hide(); 		  
		  pubLandsLayer		    		    
		    .on('featureOver',function(e,latlng, pos, data){
		      $("#map").css( 'cursor', 'pointer' );                    
		    })     
		    .on('featureOut',function(e,latlng, pos, data){ 
		      $("#map").css( 'cursor', '-moz-grab' );
		      $("#map").css( 'cursor', '-webkit-grab' );          
		    })     
		})

	//grizzly
	cartodb.createLayer(map, grizViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  grizLayer=layer;  
		  mapLayers.grizLayer=grizLayer;
		  mapLayers.grizLayer.type='cartoDBLayer';
		  mapLayers.grizLayer.hide();		  	  
		})

	//elk
	cartodb.createLayer(map, elkViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  elkLayer=layer;  
		  mapLayers.elkLayer=elkLayer;
		  mapLayers.elkLayer.type='cartoDBLayer';
		  mapLayers.elkLayer.hide();		  		  		  
		})

	//HUC 250
	cartodb.createLayer(map, hydroViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  hydroLayer=layer;  
		  mapLayers.hydroLayer=hydroLayer;
		  mapLayers.hydroLayer.type='cartoDBLayer';
		  mapLayers.hydroLayer.hide();				  
		})

	//sage grouse
	cartodb.createLayer(map, sageGrouseViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  sageGrouseLayer=layer;  
		  mapLayers.sageGrouseLayer=sageGrouseLayer;
		  mapLayers.sageGrouseLayer.type='cartoDBLayer';
		  mapLayers.sageGrouseLayer.hide();				  
		})

	//wolves
	cartodb.createLayer(map, wolvesViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  wolvesLayer=layer;  
		  mapLayers.wolvesLayer=wolvesLayer;
		  mapLayers.wolvesLayer.type='cartoDBLayer';
		  mapLayers.wolvesLayer.hide();				  
		})
	//conservation value
	cartodb.createLayer(map, consValueViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  consValueLayer=layer;  
		  mapLayers.consValueLayer=consValueLayer;
		  mapLayers.consValueLayer.type='cartoDBLayer';
		  mapLayers.consValueLayer.hide();				  
		})

	//important bird areas
	cartodb.createLayer(map, ibaViz,{
		legends:false,
		loaderControl:true,      
		})
		.addTo(map)
		.on('done', function(layer) {      
		  ibaLayer=layer;  
		  mapLayers.ibaLayer=ibaLayer;
		  mapLayers.ibaLayer.type='cartoDBLayer';
		  mapLayers.ibaLayer.hide();				  
		})



	function buildDropDowns() {		
		$.each(dataStructure, function(i, item) {						
		    var thisItem=item;
			$('#sidebar').append("<div class='menuSubtitle'>" + thisItem.name + "</div><select id='" + thisItem.id + "' class='multiselectClass' multiple='multiple'></select><br>")
			window[thisItem.id + "Layers"] = [];
			for (var j = 0; j < thisItem.files.length; j++) {
				numberOfFiles+=1;
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

	var markerColors=['#D64783','#40202A','#FD135A','#84C1B1'];

	var colorNumber=0;

	function addMapLayers(){
		$.each(dataStructure, function(i, item) {
			var thisItem = item;			
			if(thisItem.type=='kmlLayers'){
				//create a style for this group
				window[thisItem.id+'Style']=L.mapbox.marker.icon({
			        'marker-size': 'medium',
			        'stroke-width': 0.1,
			        'marker-symbol': 'marker-stroked',
			        'marker-color': markerColors[colorNumber],
			    })		
			    colorNumber+=1;	
				var thisGroupId=item.id;					
				for (var j = 0; j < thisItem.files.length; j++) {
					var thisFile = thisItem.files[j];	
					var thisFileId= thisFile.id;							
					//window[thisFileId] = omnivore.kml(thisItem.path+thisFile.fileName)			    
					mapLayers[thisFile.id] = omnivore.kml(thisItem.path+thisFile.fileName);
					mapLayers[thisFile.id].group=thisGroupId;
					mapLayers[thisFile.id].type='kmlLayer';
				}		
			}
		})		
	}
	addMapLayers();	

	function assignLayerSymbologies(){
		$.each(mapLayers, function(i, item) {				
			if(item.type=='kmlLayer'){
				var thisGroup=item.group;
				mapLayers[i].eachLayer(function(layer) {				
		        	var thisName=layer.feature.properties.name;	        	
		        	layer.bindPopup(thisName);	        		        	
		        	layer.setIcon(eval(thisGroup+'Style')); 	        	
		        });
			}
		});
	}

	var first=true;
	function layerShower(layerToShow) {		
		if(first){
			assignLayerSymbologies();
			first=false;
		}		
		if(mapLayers[layerToShow].type=='cartoDBLayer'){
			mapLayers[layerToShow].show();
		}
		if(mapLayers[layerToShow].type=='kmlLayer'){
			map.addLayer(mapLayers[layerToShow]);			
		}		
	}

	function layerHider(layerToHide) {							
		if(mapLayers[layerToHide].type=='cartoDBLayer'){
			mapLayers[layerToHide].hide();
		}
		if(mapLayers[layerToHide].type=='kmlLayer'){
			map.removeLayer(mapLayers[layerToHide]);
		}
	}

	//$('#controlsTitle').after("<div class='sidebarSubTitle'>"+thisFilterTitle+"</div><select id='"+thisSelectorId+"' name='"+thisSelectorName+"' class='multiselectClass' multiple='multiple'></select><br>")
}
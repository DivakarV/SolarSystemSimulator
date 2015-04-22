var solarSystemSimView = {
	
	svgContainer: 'undefined',
	planetDetailsContainer: 'undefined',
	alertHide: 'undefined',
	
	/*
	* Will initiate the values which are in scope to this module
	* Do the initial painting to the Solar System and Set the Revolutions for the Planets
	*/
	init: function() {
		
		this.svgContainer = document.querySelector('#svgContainer');
		this.planetDetailsContainer = document.querySelector('#planetDetails');
		this.alertHide = document.querySelector('#alertHide');
		var currSolarSystemDetails = solarSystemDetails;
		currSolarSystemDetails.init();
		
		this.paintSolarSystem(currSolarSystemDetails);
		var $this = this;
		var animateRevolutions = function() {
			$this.updateCurrInclinationPart(currSolarSystemDetails);
			if(currSolarSystemDetails.isRevolutionsOn) {
				window.requestAnimationFrame(animateRevolutions);
			}
			return $this.paintRevolutions(currSolarSystemDetails);
		};
		window.requestAnimationFrame(animateRevolutions);
		
		var pauseBtn = document.querySelector('#pause');
		var playBtn = document.querySelector('#play');

		pauseBtn.addEventListener("click", function() {
			pauseBtn.style.display = 'none';
			playBtn.style.display = 'inline';
			currSolarSystemDetails.isRevolutionsOn = false;
		});
		
		playBtn.addEventListener("click", function() {
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'inline';
			currSolarSystemDetails.isRevolutionsOn = true;
			window.requestAnimationFrame(animateRevolutions);
		});
		
		var zoomIn = document.querySelector('#zoomIn');
		var zoomOut = document.querySelector('#zoomOut');
		function toggleZoomWrapper(event) {
			return $this.toggleZoom(currSolarSystemDetails, event.target.id, $this);
		}
		zoomIn.addEventListener("click", toggleZoomWrapper);
		zoomOut.addEventListener("click", toggleZoomWrapper);
		
		this.alertHide.addEventListener("click", function() {
			$this.planetDetailsContainer.style.display = 'none';
		});
		
	},
	
	toggleZoom: function(currSolarSystemDetails, action, $this) {
		var planet;
		var noOfPlanets = currSolarSystemDetails.planetsInfo.length;
		var isZoomedIn = false;
		var isZoomedOut = false;
		for(var i=0; i<noOfPlanets; i++) {
			planet = currSolarSystemDetails.planetsInfo[i];
			
			if('zoomIn' === action) {
				if(currSolarSystemDetails.zoomFactor < currSolarSystemDetails.maxZoomFactor) {
					currSolarSystemDetails.reCalculateDetails4Zoom(planet, action);
					isZoomedIn = true;
				}
			} else {
				if(currSolarSystemDetails.zoomFactor > 0) {
					currSolarSystemDetails.reCalculateDetails4Zoom(planet, action);
					isZoomedOut = true;
				}
			}
		}
		if(isZoomedIn) {
			currSolarSystemDetails.zoomFactor++;
			currSolarSystemDetails.reCalculateDetails4Zoom(currSolarSystemDetails.SUN, action);
			$this.paintSolarSystem(currSolarSystemDetails);
		} else if(isZoomedOut) {
			currSolarSystemDetails.zoomFactor--;
			currSolarSystemDetails.reCalculateDetails4Zoom(currSolarSystemDetails.SUN, action);
			$this.paintSolarSystem(currSolarSystemDetails);
		}
	},
	
	/*
	* Will calculate the current inclination w.r.t to orbit. This will be used to place the Planet on Orbit
	*/
	updateCurrInclinationPart: function(currSolarSystemDetails) {
		var planet;
		var noOfPlanets = currSolarSystemDetails.planetsInfo.length;
		for(var i=0; i<noOfPlanets; i++) {
			planet = currSolarSystemDetails.planetsInfo[i];
			planet.currInclinationPart += 1;
			if(planet.currInclinationPart > planet.inclinationTotParts) {
				planet.currInclinationPart = 1;
			}
		}
	},
	
	/*
	* Will convert degrees to radians
	*/
	getInclinationInRedians: function(planet) {
		return planet.currInclinationPart*(2*Math.PI/planet.inclinationTotParts);
	},

	/*
	* Will calculate the point on orbit based on inclination
	* This will be used to place the Planet in Orbit
	*/	
	calculateCurrPointOnOrbit: function(planet) {
		var point = [];
		var radians = this.getInclinationInRedians(planet);
		var ab = planet.a*planet.b;
		var aSquare = Math.pow(planet.a, 2);
		var bSquare = Math.pow(planet.b, 2);
		var tanTetaSquare = Math.pow(Math.tan(radians), 2);
		if(planet.currInclinationPart >= 0 && planet.currInclinationPart < planet.inclinationTotParts/4) {
			point.push(planet.centerX + ab/Math.sqrt(bSquare+(aSquare*tanTetaSquare)));
			point.push(planet.centerY + ab/Math.sqrt(aSquare+(bSquare/tanTetaSquare)));
		} else if(planet.currInclinationPart >= planet.inclinationTotParts/4 && planet.currInclinationPart < planet.inclinationTotParts/2) {
			point.push(planet.centerX - ab/Math.sqrt(bSquare+(aSquare*tanTetaSquare)));
			point.push(planet.centerY + ab/Math.sqrt(aSquare+(bSquare/tanTetaSquare)));
		} else if(planet.currInclinationPart >= planet.inclinationTotParts/2 && planet.currInclinationPart < 3*planet.inclinationTotParts/4) {
			point.push(planet.centerX - ab/Math.sqrt(bSquare+(aSquare*tanTetaSquare)));
			point.push(planet.centerY - ab/Math.sqrt(aSquare+(bSquare/tanTetaSquare)));
		} else {
			point.push(planet.centerX + ab/Math.sqrt(bSquare+(aSquare*tanTetaSquare)));
			point.push(planet.centerY - ab/Math.sqrt(aSquare+(bSquare/tanTetaSquare)));
		}
		return point;
	},
	
	/*
	* This will calculate the position to show the Planet name based in Planets position
	*/
	calculateCurrPointForName: function(planet, planetPosition) {
		var point = [];
		var yFactor = 5;
		point.push(planetPosition[0]-planet.radius-planet.name.length*3);
		point.push(planetPosition[1]-planet.radius-yFactor);
		return point;
	},
	
	/*
	* This will paint the Solar System based on the JSON data, which was updated in other methods.
	*/
	paintSolarSystem: function(currSolarSystemDetails) {
		this.svgContainer.setAttribute('width', currSolarSystemDetails.width);
		this.svgContainer.setAttribute('height', currSolarSystemDetails.height);
		
		var orbitsHtmlStr = '';
		var planetsHtmlStr = '';
		var namesHtmlStr = '';
		var planet;
		var noOfPlanets = currSolarSystemDetails.planetsInfo.length;
		var currPointOnOrbit;
		var currPointForName;
		for(var i=0; i<noOfPlanets; i++) {
			planet = currSolarSystemDetails.planetsInfo[i];
				
			orbitsHtmlStr += '<ellipse cx="' + planet.centerX + '" cy="' + planet.centerY + '" rx="' + planet.a +
				'"' + 'ry="' + planet.b + '" stroke="#CCCCCC" stroke-width="1" fill="TRANSPARENT"/>';
				
			currPointOnOrbit = this.calculateCurrPointOnOrbit(planet);
			planetsHtmlStr += '<circle cx="' + currPointOnOrbit[0] + '" cy="' + currPointOnOrbit[1] + '" r="' + planet.radius + '" fill="' +
				planet.color + '" class="planet show-details" name="' + planet.name + '"/>';
				
			currPointForName = this.calculateCurrPointForName(planet, currPointOnOrbit);
			namesHtmlStr += '<text fill="' + planet.color + '" font-size="10" font-family="\'Helvetica Neue\',Helvetica,Arial,sans-serif"' +
				'x="' + currPointForName[0] + '" y="' + currPointForName[1] + '" class="planet-name">' + planet.name + '</text>';
					
		}
		
		planetsHtmlStr += '<circle cx="' + currSolarSystemDetails.centerX + '" cy="' + currSolarSystemDetails.centerY + '" r="' + 
			currSolarSystemDetails.SUN.radius + '"fill="' + currSolarSystemDetails.SUN.color + '" name="SUN" class="show-details"/>';
					
		this.svgContainer.innerHTML = (orbitsHtmlStr+planetsHtmlStr+namesHtmlStr);
		this.addHoverToPlanets(this);
				
	},
	
	paintRevolutions: function(currSolarSystemDetails) {
		
		var planet;
		var noOfPlanets = currSolarSystemDetails.planetsInfo.length;
		var planetEles = document.querySelectorAll('.planet');
		var planetNameEles = document.querySelectorAll('.planet-name');
		var currPointOnOrbit;
		var currPointForName;
		
		for(var i=0; i<noOfPlanets; i++) {
			planet = currSolarSystemDetails.planetsInfo[i];
			currPointOnOrbit = this.calculateCurrPointOnOrbit(planet);
			planetEles[i].attributes.cx.value = currPointOnOrbit[0];
			planetEles[i].attributes.cy.value = currPointOnOrbit[1];
			currPointForName = this.calculateCurrPointForName(planet, currPointOnOrbit);
			planetNameEles[i].attributes.x.value = currPointForName[0];
			planetNameEles[i].attributes.y.value = currPointForName[1];
		}
		
	},
	
	addHoverToPlanets: function($this) {
		var planets = document.querySelectorAll('.show-details');
		function showPlanetDetailsWrapper(event) {
			return $this.showPlanetDetails(event.target.attributes.name.value, $this);
		}
		for(var i=0; i<planets.length; i++) {
			planets[i].addEventListener("click", showPlanetDetailsWrapper); 
		}
	},
	
	showPlanetDetails: function(planetName, $this) {
		var contChildren = $this.planetDetailsContainer.children;
		var infoHeaderTitle = contChildren[0].children[0];
		var infoBody = contChildren[1];
		
		infoHeaderTitle.innerText = planetName;
		var actulaPlanetInfo = solarSystemDetails.actualInfo[planetName];
		var actulaPlanetInfoLabels = Object.keys(actulaPlanetInfo);
		var actulaPlanetInfoLabel;
		var innerHTMLStr = '';
		for(var i=0; i<actulaPlanetInfoLabels.length; i++) {
			actulaPlanetInfoLabel = actulaPlanetInfoLabels[i];
			innerHTMLStr += (actulaPlanetInfoLabel + ': <b>' + actulaPlanetInfo[actulaPlanetInfoLabel] + '</b><br>');
		}
		infoBody.innerHTML = innerHTMLStr;
		$this.planetDetailsContainer.style.display = 'inline';
	}
};

//Below will trigger solarSystemSimView.init method once content was loaded/rendered
document.addEventListener("DOMContentLoaded", function() {
	
	solarSystemSimView.init();
	
});
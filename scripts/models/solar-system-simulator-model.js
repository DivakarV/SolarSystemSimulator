//JSON containing Solar System Details
var solarSystemDetails = {
	width: 1000,
	height: 750,
	centerX: 0,
	centerY: 0,
	isRevolutionsOn: true,
	zoomFactor: 0,
	maxZoomFactor: 4,
	init: function() {
		this.centerX = this.width/2;
		this.centerY = this.height/2;
		var noOfPlanets = this.planetsInfo.length;
		var threeMulByTenPwrSeven = 2*Math.pow(10,7);
		var planet;
		for(var i=0; i<noOfPlanets; i++) {
			planet = this.planetsInfo[i];
			planet.a = (planet.maxDistance+planet.minDistance)/2;
			planet.b = Math.sqrt(Math.pow(planet.a,2)-Math.pow(this.centerX-planet.centerX,2));
			
			//scaling details
			planet.minDistance = (planet.minDistance/threeMulByTenPwrSeven) + 10;
			planet.maxDistance = (planet.maxDistance/threeMulByTenPwrSeven) + 10;
			planet.centerX = this.centerX - (planet.maxDistance-planet.minDistance)/2;
			planet.centerY = this.centerY;
			planet.a = (planet.a/threeMulByTenPwrSeven) + 10;
			planet.b = (planet.b/threeMulByTenPwrSeven) + 10;
		}
	},
	reCalculateDetails4Zoom: function(planet, action) {
		if('zoomIn' === action) {
			planet.radius *= 1.5;
			if(planet.minDistance) {
				planet.a *= 2.0;
				planet.b *= 2.0;
			}
		} else {
			planet.radius /= 1.5;
			if(planet.minDistance) {
				planet.a /= 2.0;
				planet.b /= 2.0;
			}
		}
	},
	SUN: { radius: 10, color: '#EE6628' },
	planetsInfo: [
		{ name: 'MERCURY', radius: 3.5, color: '#F4E2BC', currInclinationPart: 1, inclinationTotParts: 90,
			minDistance: 57900000, maxDistance: 69800000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'VENUS', radius: 4.5, color: '#CD8B41', currInclinationPart: 1, inclinationTotParts: 220,
			minDistance: 107500000, maxDistance: 108900000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'EARTH', radius: 5, color: '#6E9A7F', currInclinationPart: 1, inclinationTotParts: 360,
			minDistance: 147100000, maxDistance: 152100000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'MARS', radius: 4, color: '#D8B69A', currInclinationPart: 1, inclinationTotParts: 680,
			minDistance: 206700000, maxDistance: 249100000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'JUPITER', radius: 9, color: '#C58D80', currInclinationPart: 1, inclinationTotParts: 4290,
			minDistance: 740900000, maxDistance: 815700000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'SATURN', radius: 8, color: '#DCA15D', currInclinationPart: 1, inclinationTotParts: 10590,
			minDistance: 1348000000, maxDistance: 1503000000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'URANUS', radius: 7, color: '#80D0EB', currInclinationPart: 1, inclinationTotParts: 30250,
			minDistance: 2739000000, maxDistance: 3003000000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'NEPTUNE', radius: 6, color: '#769ACE', currInclinationPart: 1, inclinationTotParts: 59410,
			minDistance: 4456000000, maxDistance: 4546000000, centerX: 0, centerY: 0, a: 0, b:0 },
		{ name: 'PLUTO', radius: 3, color: '#D6C6B6', currInclinationPart: 1, inclinationTotParts: 89500,
			minDistance: 4447000000, maxDistance: 7380000000, centerX: 0, centerY: 0, a: 0, b:0 }
	],
	actualInfo: {
		SUN: {
			'Diameter': '1,390,000 km',
			'Mass': '1.989e30 kg',
			'Min Temperature': '5800 K',
			'Max Temperature': '15,600,000 K'
		},
		MERCURY: {
			  'Mean distance from Sun': '5.79x10^7 km',
			  'Maximum distance from Sun': '6.98x10^7 km',
			  'Minimum distance from Sun': '4.60x10^7 km',
			  'Mean orbital velocity': '47.9 km/s',
			  'Siderial period': '87.969 days',
			  'Rotation period': '58.646 days',
			  'Inclination of equator to orbit': '0°',
			  'Inclination of orbit to ecliptic': '7°00\'16"',
			  'Orbital eccentricity': '0.206',
			  'Diameter(equatorial)': '4878 km',
			  'Diameter (Earth = 1)': '0.382',
			  'Apparent diameter from Earth(max)': '12.9"',
			  'Apparent diameter from Earth(min)': '4.5"',
			  'Mass': '3.3x10^23 kg',
			  'Mass(Earth=1)': '0.055',
			  'Mean density': '5420 kg/m3',
			  'Surface gravity (Earth = 1)': '0.38',
			  'Escape velocity': '4.3 km/s',
			  'Oblateness': '0',
			  'Mean surface temperature(day)': '350°C',
			  'Mean surface temperature(night)': '-170°C',
			  'Albedo': '0.1',
			  'Brightest magnitude': '-1.9',
			  'Mean diameter of Sun from Mercury': '1°22\'40"'
		},
		VENUS: {
			  'Mean distance from Sun': '1.082x10^8 km',
			  'Maximum distance from Sun': '1.089x10^8 km',
			  'Minimum distance from Sun': '1.075x10^8 km',
			  'Mean orbital velocity': '35.0 km/s',
			  'Siderial period': '224.70 days',
			  'Rotation period': '243.01 days',
			  'Inclination of equator to orbit': '177.4°',
			  'Inclination of orbit to ecliptic': '3°23\'40"',
			  'Orbital eccentricity': '0.007',
			  'Diameter(equatorial)': '12,104 km',
			  'Diameter (Earth = 1)': '0.949',
			  'Apparent diameter from Earth(max)': '65.2"',
			  'Apparent diameter from Earth(min)': '9.5"',
			  'Mass': '4.87x10^24 kg',
			  'Mass(Earth=1)': '0.8150',
			  'Mean density': '5240 kg/m3',
			  'Surface gravity (Earth = 1)': '0.903',
			  'Escape velocity': '10.4 km/s',
			  'Oblateness': '0',
			  'Mean surface temperature': '480°C',
			  'Albedo': '0.65',
			  'Brightest magnitude': '-4.4',
			  'Mean diameter of Sun from Venus': '44\'15"'
		},
		EARTH: {
			  'Mean distance from Sun': '1.496x10^8 km',
			  'Maximum distance from Sun': '1.521x10^8 km',
			  'Minimum distance from Sun': '1.471x10^8 km',
			  'Mean orbital velocity': '29.8 km/s',
			  'Siderial period': '365.256 days',
			  'Rotation period': '23.9345 hours',
			  'Inclination of equator to orbit': '23° 27\'',
			  'Inclination of orbit to ecliptic': '0°',
			  'Orbital eccentricity': '0.0167',
			  'Diameter(equatorial)': '12,756 km',
			  'Mass': '5.976x10^24 kg',
			  'Mean density': '5500 kg/m3',
			  'Escape velocity': '11.2 km/s',
			  'Oblateness': '0.0034',
			  'Mean surface temperature': '20°C',
			  'Surface temperature(max)': '60°C',
			  'Surface temperature(min)': '-90°C',
			  'Albedo': '0.39',
			  'Brightest magnitude': '-1.9',
			  'Mean diameter of Sun from Earth': '0°32\''
		},
		MARS: {
			  'Mean distance from Sun': '2.279x10^8 km',
			  'Maximum distance from Sun': '2.491x10^8 km',
			  'Minimum distance from Sun': '2.067x10^8 km',
			  'Mean orbital velocity': '24.1 km/s',
			  'Siderial period': '686.98 days',
			  'Rotation period': '24hr 37m 23s',
			  'Inclination of equator to orbit': '25° 11\'',
			  'Inclination of orbit to ecliptic': '1°50\'59"',
			  'Orbital eccentricity': '0.093',
			  'Diameter(equatorial)': '6794 km',
			  'Diameter (Earth = 1)': '0.532',
			  'Apparent diameter from Earth(max)': '25.7"',
			  'Apparent diameter from Earth(min)': '3.5"',
			  'Mass': '6.42x10^23 kg',
			  'Mass(Earth=1)': '0.107',
			  'Mean density': '3940 kg/m3',
			  'Surface gravity (Earth = 1)': '0.380',
			  'Escape velocity': '5.0 km/s',
			  'Oblateness': '0.006',
			  'Mean surface temperature(max)': '20°C',
			  'Mean surface temperature(min)': '-140°C',
			  'Albedo': '0.15',
			  'Brightest magnitude': '-2.0',
			  'Mean diameter of Sun from Mars': '21\''
		},
		JUPITER: {
			  'Mean distance from Sun': '7.783x10^8 km',
			  'Maximum distance from Sun': '8.157x10^8 km',
			  'Minimum distance from Sun': '7.409x10^8 km',
			  'Mean orbital velocity': '13.1 km/s',
			  'Siderial period': '11.86 yr',
			  'Rotation period': '9hr 50m 30s',
			  'Inclination of equator to orbit': '3° 04\'',
			  'Inclination of orbit to ecliptic': '1°18\'',
			  'Orbital eccentricity': '0.048',
			  'Diameter(equatorial)': '142,800 km',
			  'Diameter (Earth = 1)': '11.19',
			  'Apparent diameter from Earth(max)': '50.1"',
			  'Apparent diameter from Earth(min)': '30.4"',
			  'Mass': '1.90x10^27 kg',
			  'Mass(Earth=1)': '317.8',
			  'Mean density': '1314 kg/m3',
			  'Surface gravity (Earth = 1)': '2.53',
			  'Escape velocity': '60 km/s',
			  'Oblateness': '0.065',
			  'Mean surface temperature': '-110°C',
			  'Albedo': '0.52',
			  'Brightest magnitude': '-2.7',
			  'Mean diameter of Sun from Mars': '6\'09"'
		},
		SATURN: {
			  'Mean distance from Sun': '1.426x10^9 km',
			  'Maximum distance from Sun': '1.503x10^9 km',
			  'Minimum distance from Sun': '1.348x10^9 km',
			  'Mean orbital velocity': '9.6 km/s',
			  'Siderial period': '29.41 years',
			  'Rotation period': '10 h 13m 59s',
			  'Inclination of equator to orbit': '27°',
			  'Inclination of orbit to ecliptic': '2°29\'',
			  'Orbital eccentricity': '0.054',
			  'Diameter(equatorial)': '120,000 km',
			  'Diameter (Earth = 1)': '9.26',
			  'Apparent diameter from Earth(max)': '20.9"',
			  'Apparent diameter from Earth(min)': '15"',
			  'Mass': '5.69x10^26 kg',
			  'Mass(Earth=1)': '95.3',
			  'Mean density': '700 kg/m3',
			  'Surface gravity (Earth = 1)': '1.07',
			  'Escape velocity': '35.6 km/s',
			  'Oblateness': '0.108',
			  'Mean surface temperature': '-180°C',
			  'Albedo': '0.76',
			  'Brightest magnitude': '-0.3',
			  'Mean diameter of Sun from Mars': '3\'22"'
		},
		URANUS: {
			  'Mean distance from Sun': '2.871x10^9 km',
			  'Maximum distance from Sun': '3.003x10^9 km',
			  'Minimum distance from Sun': '2.739x10^9 km',
			  'Mean orbital velocity': '6.8 km/s',
			  'Siderial period': '84.04 years',
			  'Rotation period': '17.2 hours',
			  'Inclination of equator to orbit': '97.9°',
			  'Inclination of orbit to ecliptic': '0.77°',
			  'Orbital eccentricity': '0.046',
			  'Diameter(equatorial)': '51,120 km',
			  'Diameter (Earth = 1)': '4.01',
			  'Apparent diameter from Earth(max)': '3.7"',
			  'Apparent diameter from Earth(min)': '3.1"',
			  'Mass': '8.7x10^25 kg',
			  'Mass(Earth=1)': '14.6',
			  'Mean density': '1300 kg/m3',
			  'Surface gravity (Earth = 1)': '0.92',
			  'Escape velocity': '21.2 km/s',
			  'Oblateness': '0.03',
			  'Mean surface temperature': '-216°C',
			  'Albedo': '0.51',
			  'Brightest magnitude': '+5.6',
			  'Mean diameter of Sun from Mars': '1\'41"'
		},
		NEPTUNE: {
			  'Mean distance from Sun': '4.497x10^9 km',
			  'Maximum distance from Sun': '4.546x10^9 km',
			  'Minimum distance from Sun': '4.456x10^9 km',
			  'Mean orbital velocity': '5.4 km/s',
			  'Siderial period': '164.8 years',
			  'Rotation period': '16.11 hours',
			  'Inclination of equator to orbit': '29.6°',
			  'Inclination of orbit to ecliptic': '1.77°',
			  'Orbital eccentricity': '0.01',
			  'Diameter(equatorial)': '49,528 km',
			  'Diameter (Earth = 1)': '3.88',
			  'Apparent diameter from Earth(max)': '2.2"',
			  'Apparent diameter from Earth(min)': '2.0"',
			  'Mass': '1.03x10^26 kg',
			  'Mass(Earth=1)': '17.23',
			  'Mean density': '1660 kg/m3',
			  'Surface gravity (Earth = 1)': '1.12',
			  'Escape velocity': '23.6 km/s',
			  'Oblateness': '0.026',
			  'Mean surface temperature': '-216°C',
			  'Albedo': '0.35',
			  'Brightest magnitude': '+7.7',
			  'Mean diameter of Sun from Mars': '1\'04"'
		},
		PLUTO: {
			  'Mean distance from Sun': '5.914x10^9 km',
			  'Maximum distance from Sun': '7.380x10^9 km',
			  'Minimum distance from Sun': '4.447x10^9 km',
			  'Mean orbital velocity': '4.7 km/s',
			  'Siderial period': '248.6 years',
			  'Rotation period': '6.3874 days',
			  'Inclination of equator to orbit': '122°',
			  'Inclination of orbit to ecliptic': '17.1°',
			  'Orbital eccentricity': '0.248',
			  'Diameter(equatorial)': '2290 km',
			  'Diameter (Earth = 1)': '0.18',
			  'Apparent diameter from Earth': '2.0"',
			  'Mass': '1x10^22 kg',
			  'Mass(Earth=1)': '0.002',
			  'Mean density': '2000 kg/m3',
			  'Surface gravity (Earth = 1)': '0.06',
			  'Escape velocity': '1 km/s',
			  'Mean surface temperature': '-223°C',
			  'Albedo': '0.4',
			  'Brightest magnitude': '+15',
			  'Mean diameter of Sun from Mars': '50"'
		}
	}
};
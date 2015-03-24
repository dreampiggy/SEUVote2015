/*
* debouncedresize: special jQuery event that happens once after a window resize
*
* latest version and complete README available on Github:
* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
*
* Copyright 2011 @louis_remi
* Licensed under the MIT license.
*/
var $event = $.event,
$special,
resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 250
};

// ======================= imagesLoaded Plugin ===============================
// https://github.com/desandro/imagesloaded

// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback function gets image collection as argument
//  this is the container

// original: MIT license. Paul Irish. 2010.
// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

/*var Grid = (function() {*/
//---------VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-----------------------
var $json_det;
var num = new Array("16010013","19110211","19210108","22010218","21110129","02010117","01209119","02610218","04210726","02010110","04210718","04010438","13110111","03010007","10110109","01109319","24010113","06010301","14110126","06010240","24010119","13210128","14210137","10310109","43209115","07210104","43209222","04010213","14810133","43109221","22010113","07110128","10210110","14410210","14710109","05110528","06010124","14210144","02010535","05110326","43209109","14410109","07310104","42109107","21710124","21010130","21710225","17110317","21010224","21110230","16010118","09010309","02010116","09010334","61310104","43109102","05210125","04210732","43109103","71110112","07310131","01109109","14310114","71110404","04010035","05110209","03010527","03010123","03210727","03010424","03110631","03010227","03010404","12010323","25010122","11110125","13310127");
$(document).ready(function(){
	var t=null;
	var tt=null;
	$("#"+num[0]).mouseenter(function(){t=setTimeout("$('#img1').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_1').style.zIndex=100;",350);});
	$("#"+num[0]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img1").stop().animate({top:"0px"});if (!$id("student_0").checked)$id("sel_1").style.zIndex=0;});
	
	$("#"+num[1]).mouseenter(function(){t=setTimeout("$('#img2').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_2').style.zIndex=100;",350);});
	$("#"+num[1]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img2").stop().animate({top:"0px"});if (!$id("student_1").checked)$id("sel_2").style.zIndex=0;});

	$("#"+num[2]).mouseenter(function(){t=setTimeout("$('#img3').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_3').style.zIndex=100;",350);});
	$("#"+num[2]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img3").stop().animate({top:"0px"});if (!$id("student_2").checked)$id("sel_3").style.zIndex=0;});

	$("#"+num[3]).mouseenter(function(){t=setTimeout("$('#img4').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_4').style.zIndex=100;",350);});
	$("#"+num[3]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img4").stop().animate({top:"0px"});if (!$id("student_3").checked)$id("sel_4").style.zIndex=0;});

	$("#"+num[4]).mouseenter(function(){t=setTimeout("$('#img5').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_5').style.zIndex=100;",350);});
	$("#"+num[4]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img5").stop().animate({top:"0px"});if (!$id("student_4").checked)$id("sel_5").style.zIndex=0;});

	$("#"+num[5]).mouseenter(function(){t=setTimeout("$('#img6').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_6').style.zIndex=100;",350);});
	$("#"+num[5]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img6").stop().animate({top:"0px"});if (!$id("student_5").checked)$id("sel_6").style.zIndex=0;});

	$("#"+num[6]).mouseenter(function(){t=setTimeout("$('#img7').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_7').style.zIndex=100;",350);});
	$("#"+num[6]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img7").stop().animate({top:"0px"});if (!$id("student_6").checked)$id("sel_7").style.zIndex=0;});

	$("#"+num[7]).mouseenter(function(){t=setTimeout("$('#img8').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_8').style.zIndex=100;",350);});
	$("#"+num[7]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img8").stop().animate({top:"0px"});if (!$id("student_7").checked)$id("sel_8").style.zIndex=0;});

	$("#"+num[8]).mouseenter(function(){t=setTimeout("$('#img9').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_9').style.zIndex=100;",350);});
	$("#"+num[8]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img9").stop().animate({top:"0px"});if (!$id("student_8").checked)$id("sel_9").style.zIndex=0;});

	$("#"+num[9]).mouseenter(function(){t=setTimeout("$('#img10').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_10').style.zIndex=100;",530);});
	$("#"+num[9]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img10").stop().animate({top:"0px"});if (!$id("student_9").checked)$id("sel_10").style.zIndex=0;});

	$("#"+num[10]).mouseenter(function(){t=setTimeout("$('#img11').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_11').style.zIndex=100;",530);});
	$("#"+num[10]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img11").stop().animate({top:"0px"});if (!$id("student_10").checked)$id("sel_11").style.zIndex=0;});

	$("#"+num[11]).mouseenter(function(){t=setTimeout("$('#img12').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_12').style.zIndex=100;",530);});
	$("#"+num[11]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img12").stop().animate({top:"0px"});if (!$id("student_11").checked)$id("sel_12").style.zIndex=0;});

	$("#"+num[12]).mouseenter(function(){t=setTimeout("$('#img13').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_13').style.zIndex=100;",350);});
	$("#"+num[12]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img13").stop().animate({top:"0px"});if (!$id("student_12").checked)$id("sel_13").style.zIndex=0;});
	
	$("#"+num[13]).mouseenter(function(){t=setTimeout("$('#img14').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_14').style.zIndex=100;",350);});
	$("#"+num[13]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img14").stop().animate({top:"0px"});if (!$id("student_13").checked)$id("sel_14").style.zIndex=0;});

	$("#"+num[14]).mouseenter(function(){t=setTimeout("$('#img15').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_15').style.zIndex=100;",350);});
	$("#"+num[14]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img15").stop().animate({top:"0px"});if (!$id("student_14").checked)$id("sel_15").style.zIndex=0;});

	$("#"+num[15]).mouseenter(function(){t=setTimeout("$('#img16').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_16').style.zIndex=100;",350);});
	$("#"+num[15]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img16").stop().animate({top:"0px"});if (!$id("student_15").checked)$id("sel_16").style.zIndex=0;});

	$("#"+num[16]).mouseenter(function(){t=setTimeout("$('#img17').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_17').style.zIndex=100;",350);});
	$("#"+num[16]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img17").stop().animate({top:"0px"});if (!$id("student_16").checked)$id("sel_17").style.zIndex=0;});

	$("#"+num[17]).mouseenter(function(){t=setTimeout("$('#img18').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_18').style.zIndex=100;",350);});
	$("#"+num[17]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img18").stop().animate({top:"0px"});if (!$id("student_17").checked)$id("sel_18").style.zIndex=0;});

	$("#"+num[18]).mouseenter(function(){t=setTimeout("$('#img19').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_19').style.zIndex=100;",350);});
	$("#"+num[18]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img19").stop().animate({top:"0px"});if (!$id("student_18").checked)$id("sel_19").style.zIndex=0;});

	$("#"+num[19]).mouseenter(function(){t=setTimeout("$('#img20').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_20').style.zIndex=100;",350);});
	$("#"+num[19]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img20").stop().animate({top:"0px"});if (!$id("student_19").checked)$id("sel_20").style.zIndex=0;});

	$("#"+num[20]).mouseenter(function(){t=setTimeout("$('#img21').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_21').style.zIndex=100;",350);});
	$("#"+num[20]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img21").stop().animate({top:"0px"});if (!$id("student_20").checked)$id("sel_21").style.zIndex=0;});

	$("#"+num[21]).mouseenter(function(){t=setTimeout("$('#img22').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_22').style.zIndex=100;",530);});
	$("#"+num[21]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img22").stop().animate({top:"0px"});if (!$id("student_21").checked)$id("sel_22").style.zIndex=0;});

	$("#"+num[22]).mouseenter(function(){t=setTimeout("$('#img23').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_23').style.zIndex=100;",530);});
	$("#"+num[22]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img23").stop().animate({top:"0px"});if (!$id("student_22").checked)$id("sel_23").style.zIndex=0;});

	$("#"+num[23]).mouseenter(function(){t=setTimeout("$('#img24').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_24').style.zIndex=100;",530);});
	$("#"+num[23]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img24").stop().animate({top:"0px"});if (!$id("student_23").checked)$id("sel_24").style.zIndex=0;});

	$("#"+num[24]).mouseenter(function(){t=setTimeout("$('#img25').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_25').style.zIndex=100;",350);});
	$("#"+num[24]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img25").stop().animate({top:"0px"});if (!$id("student_24").checked)$id("sel_25").style.zIndex=0;});
	
	$("#"+num[25]).mouseenter(function(){t=setTimeout("$('#img26').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_26').style.zIndex=100;",350);});
	$("#"+num[25]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img26").stop().animate({top:"0px"});if (!$id("student_25").checked)$id("sel_26").style.zIndex=0;});

	$("#"+num[26]).mouseenter(function(){t=setTimeout("$('#img27').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_27').style.zIndex=100;",350);});
	$("#"+num[26]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img27").stop().animate({top:"0px"});if (!$id("student_26").checked)$id("sel_27").style.zIndex=0;});

	$("#"+num[27]).mouseenter(function(){t=setTimeout("$('#img28').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_28').style.zIndex=100;",350);});
	$("#"+num[27]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img28").stop().animate({top:"0px"});if (!$id("student_27").checked)$id("sel_28").style.zIndex=0;});

	$("#"+num[28]).mouseenter(function(){t=setTimeout("$('#img29').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_29').style.zIndex=100;",350);});
	$("#"+num[28]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img29").stop().animate({top:"0px"});if (!$id("student_28").checked)$id("sel_29").style.zIndex=0;});

	$("#"+num[29]).mouseenter(function(){t=setTimeout("$('#img30').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_30').style.zIndex=100;",350);});
	$("#"+num[29]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img30").stop().animate({top:"0px"});if (!$id("student_29").checked)$id("sel_30").style.zIndex=0;});

	$("#"+num[30]).mouseenter(function(){t=setTimeout("$('#img31').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_31').style.zIndex=100;",350);});
	$("#"+num[30]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img31").stop().animate({top:"0px"});if (!$id("student_30").checked)$id("sel_31").style.zIndex=0;});

	$("#"+num[31]).mouseenter(function(){t=setTimeout("$('#img32').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_32').style.zIndex=100;",350);});
	$("#"+num[31]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img32").stop().animate({top:"0px"});if (!$id("student_31").checked)$id("sel_32").style.zIndex=0;});

	$("#"+num[32]).mouseenter(function(){t=setTimeout("$('#img33').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_33').style.zIndex=100;",350);});
	$("#"+num[32]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img33").stop().animate({top:"0px"});if (!$id("student_32").checked)$id("sel_33").style.zIndex=0;});

	$("#"+num[33]).mouseenter(function(){t=setTimeout("$('#img34').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_34').style.zIndex=100;",530);});
	$("#"+num[33]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img34").stop().animate({top:"0px"});if (!$id("student_33").checked)$id("sel_34").style.zIndex=0;});

	$("#"+num[34]).mouseenter(function(){t=setTimeout("$('#img35').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_35').style.zIndex=100;",530);});
	$("#"+num[34]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img35").stop().animate({top:"0px"});if (!$id("student_34").checked)$id("sel_35").style.zIndex=0;});

	$("#"+num[35]).mouseenter(function(){t=setTimeout("$('#img36').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_36').style.zIndex=100;",530);});
	$("#"+num[35]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img36").stop().animate({top:"0px"});if (!$id("student_35").checked)$id("sel_36").style.zIndex=0;});

	$("#"+num[36]).mouseenter(function(){t=setTimeout("$('#img37').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_37').style.zIndex=100;",350);});
	$("#"+num[36]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img37").stop().animate({top:"0px"});if (!$id("student_36").checked)$id("sel_37").style.zIndex=0;});
	
	$("#"+num[37]).mouseenter(function(){t=setTimeout("$('#img38').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_38').style.zIndex=100;",350);});
	$("#"+num[37]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img38").stop().animate({top:"0px"});if (!$id("student_37").checked)$id("sel_38").style.zIndex=0;});

	$("#"+num[38]).mouseenter(function(){t=setTimeout("$('#img39').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_39').style.zIndex=100;",350);});
	$("#"+num[38]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img39").stop().animate({top:"0px"});if (!$id("student_38").checked)$id("sel_39").style.zIndex=0;});

	$("#"+num[39]).mouseenter(function(){t=setTimeout("$('#img40').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_40').style.zIndex=100;",350);});
	$("#"+num[39]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img40").stop().animate({top:"0px"});if (!$id("student_39").checked)$id("sel_40").style.zIndex=0;});

	$("#"+num[40]).mouseenter(function(){t=setTimeout("$('#img41').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_41').style.zIndex=100;",350);});
	$("#"+num[40]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img41").stop().animate({top:"0px"});if (!$id("student_40").checked)$id("sel_41").style.zIndex=0;});

	$("#"+num[41]).mouseenter(function(){t=setTimeout("$('#img42').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_42').style.zIndex=100;",350);});
	$("#"+num[41]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img42").stop().animate({top:"0px"});if (!$id("student_41").checked)$id("sel_42").style.zIndex=0;});

	$("#"+num[42]).mouseenter(function(){t=setTimeout("$('#img43').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_43').style.zIndex=100;",350);});
	$("#"+num[42]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img43").stop().animate({top:"0px"});if (!$id("student_42").checked)$id("sel_43").style.zIndex=0;});

	$("#"+num[43]).mouseenter(function(){t=setTimeout("$('#img44').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_44').style.zIndex=100;",350);});
	$("#"+num[43]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img44").stop().animate({top:"0px"});if (!$id("student_43").checked)$id("sel_44").style.zIndex=0;});

	$("#"+num[44]).mouseenter(function(){t=setTimeout("$('#img45').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_45').style.zIndex=100;",350);});
	$("#"+num[44]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img45").stop().animate({top:"0px"});if (!$id("student_44").checked)$id("sel_45").style.zIndex=0;});

	$("#"+num[45]).mouseenter(function(){t=setTimeout("$('#img46').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_46').style.zIndex=100;",530);});
	$("#"+num[45]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img46").stop().animate({top:"0px"});if (!$id("student_45").checked)$id("sel_46").style.zIndex=0;});

	$("#"+num[46]).mouseenter(function(){t=setTimeout("$('#img47').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_47').style.zIndex=100;",530);});
	$("#"+num[46]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img47").stop().animate({top:"0px"});if (!$id("student_46").checked)$id("sel_47").style.zIndex=0;});

	$("#"+num[47]).mouseenter(function(){t=setTimeout("$('#img48').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_48').style.zIndex=100;",530);});
	$("#"+num[47]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img48").stop().animate({top:"0px"});if (!$id("student_47").checked)$id("sel_48").style.zIndex=0;});

	$("#"+num[48]).mouseenter(function(){t=setTimeout("$('#img49').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_49').style.zIndex=100;",350);});
	$("#"+num[48]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img49").stop().animate({top:"0px"});if (!$id("student_48").checked)$id("sel_49").style.zIndex=0;});
	
	$("#"+num[49]).mouseenter(function(){t=setTimeout("$('#img50').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_50').style.zIndex=100;",350);});
	$("#"+num[49]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img50").stop().animate({top:"0px"});if (!$id("student_49").checked)$id("sel_50").style.zIndex=0;});

	$("#"+num[50]).mouseenter(function(){t=setTimeout("$('#img51').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_51').style.zIndex=100;",350);});
	$("#"+num[50]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img51").stop().animate({top:"0px"});if (!$id("student_50").checked)$id("sel_51").style.zIndex=0;});

	$("#"+num[51]).mouseenter(function(){t=setTimeout("$('#img52').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_52').style.zIndex=100;",350);});
	$("#"+num[51]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img52").stop().animate({top:"0px"});if (!$id("student_51").checked)$id("sel_52").style.zIndex=0;});

	$("#"+num[52]).mouseenter(function(){t=setTimeout("$('#img53').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_53').style.zIndex=100;",350);});
	$("#"+num[52]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img53").stop().animate({top:"0px"});if (!$id("student_52").checked)$id("sel_53").style.zIndex=0;});

	$("#"+num[53]).mouseenter(function(){t=setTimeout("$('#img54').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_54').style.zIndex=100;",350);});
	$("#"+num[53]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img54").stop().animate({top:"0px"});if (!$id("student_53").checked)$id("sel_54").style.zIndex=0;});

	$("#"+num[54]).mouseenter(function(){t=setTimeout("$('#img55').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_55').style.zIndex=100;",350);});
	$("#"+num[54]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img55").stop().animate({top:"0px"});if (!$id("student_54").checked)$id("sel_55").style.zIndex=0;});

	$("#"+num[55]).mouseenter(function(){t=setTimeout("$('#img56').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_56').style.zIndex=100;",350);});
	$("#"+num[55]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img56").stop().animate({top:"0px"});if (!$id("student_55").checked)$id("sel_56").style.zIndex=0;});

	$("#"+num[56]).mouseenter(function(){t=setTimeout("$('#img57').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_57').style.zIndex=100;",350);});
	$("#"+num[56]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img57").stop().animate({top:"0px"});if (!$id("student_56").checked)$id("sel_57").style.zIndex=0;});

	$("#"+num[57]).mouseenter(function(){t=setTimeout("$('#img58').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_58').style.zIndex=100;",530);});
	$("#"+num[57]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img58").stop().animate({top:"0px"});if (!$id("student_57").checked)$id("sel_58").style.zIndex=0;});

	$("#"+num[58]).mouseenter(function(){t=setTimeout("$('#img59').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_59').style.zIndex=100;",530);});
	$("#"+num[58]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img59").stop().animate({top:"0px"});if (!$id("student_58").checked)$id("sel_59").style.zIndex=0;});

	$("#"+num[59]).mouseenter(function(){t=setTimeout("$('#img60').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_60').style.zIndex=100;",530);});
	$("#"+num[59]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img60").stop().animate({top:"0px"});if (!$id("student_59").checked)$id("sel_60").style.zIndex=0;});

	$("#"+num[60]).mouseenter(function(){t=setTimeout("$('#img61').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_61').style.zIndex=100;",350);});
	$("#"+num[60]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img61").stop().animate({top:"0px"});if (!$id("student_60").checked)$id("sel_61").style.zIndex=0;});
	
	$("#"+num[61]).mouseenter(function(){t=setTimeout("$('#img62').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_62').style.zIndex=100;",350);});
	$("#"+num[61]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img62").stop().animate({top:"0px"});if (!$id("student_61").checked)$id("sel_62").style.zIndex=0;});

	$("#"+num[62]).mouseenter(function(){t=setTimeout("$('#img63').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_63').style.zIndex=100;",350);});
	$("#"+num[62]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img63").stop().animate({top:"0px"});if (!$id("student_62").checked)$id("sel_63").style.zIndex=0;});

	$("#"+num[63]).mouseenter(function(){t=setTimeout("$('#img64').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_64').style.zIndex=100;",350);});
	$("#"+num[63]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img64").stop().animate({top:"0px"});if (!$id("student_63").checked)$id("sel_64").style.zIndex=0;});

	$("#"+num[64]).mouseenter(function(){t=setTimeout("$('#img65').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_65').style.zIndex=100;",350);});
	$("#"+num[64]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img65").stop().animate({top:"0px"});if (!$id("student_64").checked)$id("sel_65").style.zIndex=0;});

	$("#"+num[65]).mouseenter(function(){t=setTimeout("$('#img66').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_66').style.zIndex=100;",350);});
	$("#"+num[65]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img66").stop().animate({top:"0px"});if (!$id("student_65").checked)$id("sel_66").style.zIndex=0;});

	$("#"+num[66]).mouseenter(function(){t=setTimeout("$('#img67').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_67').style.zIndex=100;",350);});
	$("#"+num[66]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img67").stop().animate({top:"0px"});if (!$id("student_66").checked)$id("sel_67").style.zIndex=0;});

	$("#"+num[67]).mouseenter(function(){t=setTimeout("$('#img68').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_68').style.zIndex=100;",350);});
	$("#"+num[67]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img68").stop().animate({top:"0px"});if (!$id("student_67").checked)$id("sel_68").style.zIndex=0;});

	$("#"+num[68]).mouseenter(function(){t=setTimeout("$('#img69').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_69').style.zIndex=100;",350);});
	$("#"+num[68]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img69").stop().animate({top:"0px"});if (!$id("student_68").checked)$id("sel_69").style.zIndex=0;});

	$("#"+num[69]).mouseenter(function(){t=setTimeout("$('#img70').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_70').style.zIndex=100;",530);});
	$("#"+num[69]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img70").stop().animate({top:"0px"});if (!$id("student_69").checked)$id("sel_70").style.zIndex=0;});

	$("#"+num[70]).mouseenter(function(){t=setTimeout("$('#img71').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_71').style.zIndex=100;",530);});
	$("#"+num[70]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img71").stop().animate({top:"0px"});if (!$id("student_70").checked)$id("sel_71").style.zIndex=0;});

	$("#"+num[71]).mouseenter(function(){t=setTimeout("$('#img72').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_72').style.zIndex=100;",530);});
	$("#"+num[71]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img72").stop().animate({top:"0px"});if (!$id("student_71").checked)$id("sel_72").style.zIndex=0;});

	$("#"+num[72]).mouseenter(function(){t=setTimeout("$('#img73').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_73').style.zIndex=100;",350);});
	$("#"+num[72]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img73").stop().animate({top:"0px"});if (!$id("student_72").checked)$id("sel_73").style.zIndex=0;});

	$("#"+num[73]).mouseenter(function(){t=setTimeout("$('#img74').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_74').style.zIndex=100;",350);});
	$("#"+num[73]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img74").stop().animate({top:"0px"});if (!$id("student_73").checked)$id("sel_74").style.zIndex=0;});

	$("#"+num[74]).mouseenter(function(){t=setTimeout("$('#img75').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_75').style.zIndex=100;",350);});
	$("#"+num[74]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img75").stop().animate({top:"0px"});if (!$id("student_74").checked)$id("sel_75").style.zIndex=0;});

	$("#"+num[75]).mouseenter(function(){t=setTimeout("$('#img76').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_76').style.zIndex=100;",350);});
	$("#"+num[75]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img76").stop().animate({top:"0px"});if (!$id("student_75").checked)$id("sel_76").style.zIndex=0;});

	$("#"+num[76]).mouseenter(function(){t=setTimeout("$('#img77').stop().animate({top:'100px'});",200);tt=setTimeout("$id('sel_77').style.zIndex=100;",530);});
	$("#"+num[76]).mouseleave(function(){clearTimeout(t);clearTimeout(tt);$("#img77").stop().animate({top:"0px"});if (!$id("student_76").checked)$id("sel_77").style.zIndex=0;});

	setTimeout("$('#tips_1').fadeOut('slow');$('#tips_5').fadeOut('slow');",4000);
	$("#floatDiv").mouseenter(function(){$('#tips_5').fadeIn('slow');});
});
//header a标签点击事件
$(function(){
    $("p a").click(function(){
        var hr = $(this).attr("href");
        var anh = $(hr).offset().top-20;
        $("html,body").stop().animate({scrollTop:anh},1100);
    })
})
//图片大小设定
$(function(){
	$("p img").css("width","180px");
})
function $id(Read_Id) { return document.getElementById(Read_Id) }

function getElementsByClassName(className,ele,tagName){//通过类名获取元素，后两可参数是可选的
	var a=[];//用来存筛选用来的元素
	var eles=null;
	if(ele) {//如果指定了第二个参数，就是限定了获取元素的范围
		if(tagName)//如果指定了第三个参数 就是限定了标记名
			eles=ele.getElementsByTagName(tagName)
		else
			eles=ele.getElementsByTagName('*')
	}else //如果没有传后两个参数
		eles=document.getElementsByTagName('*');//则在所有的元素中做遍历
		
	for(var i=0;i<eles.length;i++){
		if(eles[i].className.search(new RegExp("\\b" + className + "\\b"))!=-1){//用正则表达式来判断是不是包含此类名
			a.push(eles.item(i))	//如果满足条件，则存到数组里
			
		}
		
	}
	return a
}
/*function getChildElements(ele,tagName){//获取ele对象的元素子节点
	if(!(ele&&ele.nodeType&&ele.nodeType===1))//传进来的对象是一个元素类型的DOM节点才行，否则退出
		return false
	var child=ele.firstChild;//从第一个节点开始判断
	var a=[]
	if(tagName){//参数是可选的，如果第二个参数传进来了
		while(child){
			
			if(child.nodeType==1&&child.tagName.toLowerCase()==tagName.toLowerCase()){
					a.push(child);
			}
			child=child.nextSibling;//判断完这个节点就判断下一个节点
		
		}
	}else{//如果第二个参数没有传
		while(child){
				if(child.nodeType==1){
						a.push(child);
				}
				child=child.nextSibling;			
		}
	}
	return a;//最后别忘把此数组返回	
}*/
function haveChinese(s){
	var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;  
    if(!patrn.exec(s)){  
    	return false;  
    }  
    else{  
    	return true;  
    }  
}

String.prototype.Trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
var skipurl = "";
function skip_url(){
	return skipurl;
}
//校内登录
function _inLogin(){
	var loginName=$('#oneCard').val();
	var pwd=$('#pwd_in').val();
	var validateNum=$('#vali_in').val();

	if (loginName==''){
		alert("请输入学号！");
		document.getElementById('valiPic_in').src = '/captcha';
	}
	else if (pwd==''){
		alert("请输入密码！");
		document.getElementById('valiPic_in').src = '/captcha';
	}
	else if (validateNum==''){
		alert("请输入验证码！");
		document.getElementById('valiPic_in').src = '/captcha';
	}else{
		var ajax;
		if (window.XMLHttpRequest)
	  	{// code for IE7+, Firefox, Chrome, Opera, Safari
		  ajax=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  ajax=new ActiveXObject("Microsoft.XMLHTTP");
		}
		ajax.onreadystatechange=updatePage;
		
		var postStr="loginName="+loginName+"&password="+pwd+"&postValidateNum="+validateNum+"&type=in&refere=reference2";
		ajax.open("post","/login",true);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		ajax.send(postStr);

		function updatePage() 
		{ 
	   		//如果执行状态成功，那么就把返回信息写到指定的层里
	   		if (ajax.readyState == 4 && ajax.status == 200)
			{ 
				var ret = ajax.responseText;
					if(ret == 4)
					{
					    alert("密码错误！");
						$('#pwd').val('');
						$id("valiPic_in").src=$id("valiPic_in").src;
					}
					else if(ret == 5){
						alert("用户名不存在！");
						$('#loginName').val('');
						$('#pwd').val('');
						$id("valiPic_in").src=$id("valiPic_in").src;
					}
					else if(ret == 2){
						alert("输入验证码错误！");
						$('#valiInput').val('');
						$id("valiPic_in").src=$id("valiPic_in").src;
					}
					else if(ret == 3){
						alert("Error!");
						$id("valiPic_in").src=$id("valiPic_in").src;
					}
					else if(ret == 6){
						alert("用户名.密码格式错误！");
						$('#loginName').val('');
						$('#pwd').val('');
						$id("valiPic_in").src=$id("valiPic_in").src;
					}
					else if(ret ==1){
						close_log();
						$id("valiPic_in").src=$id("valiPic_in").src;
						document.getElementById("dddddd").value="查看排名";
						skipurl = "/ranking";
						alert("登录成功！");
					}
	   		} 
		}//end function
	}//end else
}

var name_array = Array("冯士睿","王越明","凌丹丹","崔粟晋","刘善文","陈佳骐","张涵昱","傅祎旭","周景锦","陶毅","周全","柏川","李羿飞","邵陈希","刘洋","睢佳俊","李怀宇","席维唯","马丁一兰","吴啸辰","巢文挺","陆珈怡","潘滕杰","刘奇","王三妹","刘兵","陈彬","王宇轩","蔡涛","周包壹","吴泰洋","陶博","刘雨露","方皓","王璨","方根深","李佳琪","崔耀丹","雷侃","何雅雯","程莹","王一云","居晟","施倩雯","孙鹏","韩婧","周骁玮","陈抒涵","蒋超","张忆平","何超","刘垚","尹奇峰","李继庠","杨照辉","封晔","孙文捷","缪佳升","高丽娟","黄迪","夏泳","肖严航","顿珠","王安琪","于海磊","钱炫丞","孙朝","陈晓波","陈昕","刘燮","胡灿","林伽毅","吴吉","杨涛","李双双","赵聪","张丹丹");
//社会人员登录
function _outLogin(){
	var loginName=$('#mail').val();
	var pwd=$('#pwd_out').val();
	var validateNum=$('#vali_out').val();
	loginName = loginName.Trim();
	pwd = pwd.Trim();

	if (loginName==''){
		alert("请输入邮箱！");
		document.getElementById('valiPic_out').src = '/captcha';

	}else{//else 3
		var reg = /^[\w-]+[\.]*[\w-]+[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
		if(reg.test(loginName)){
			if (pwd==''){
				alert("请输入密码！");
				document.getElementById('valiPic_out').src = '/captcha';
			}else{//else 2
				var reg = /^[a-zA-Z|\d]{6,12}$/;
				if(reg.test(pwd)){
					if (validateNum==''){
						alert("请输入验证码！");
						document.getElementById('valiPic_out').src = '/captcha';
					}else{//else 1
						var ajax;
						if (window.XMLHttpRequest)
					  	{// code for IE7+, Firefox, Chrome, Opera, Safari
						  ajax=new XMLHttpRequest();
						}
						else
						{// code for IE6, IE5
						  ajax=new ActiveXObject("Microsoft.XMLHTTP");
						}
						ajax.onreadystatechange=updatePage;
						
						var postStr="loginName="+loginName+"&password="+pwd+"&postValidateNum="+validateNum+"&type=out&refere=reference2";
						ajax.open("post","/login",true);
						ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
						ajax.send(postStr);

						function updatePage() 
						{ 
					   		//如果执行状态成功，那么就把返回信息写到指定的层里
					   		if (ajax.readyState == 4 && ajax.status == 200)
							{ 
								var ret = ajax.responseText;
								
								if(ret == 4)
								{
								    alert("密码错误！");
									$('#pwd').val('');
									$id("valiPic_out").src=$id("valiPic_out").src;
								}
								else if(ret == 5){
									alert("用户名不存在！");
									$('#loginName').val('');
									$('#pwd').val('');
									$id("valiPic_out").src=$id("valiPic_out").src;
								}
								else if(ret == 2){
									alert("输入验证码错误！");
									$('#valiInput').val('');
									$id("valiPic_out").src=$id("valiPic_out").src;
								}
								else if(ret == 3){
									alert("Error!");
								}
								else if(ret == 6){
									alert("用户名.密码格式错误！");
									$('#loginName').val('');
									$('#pwd').val('');
									$id("valiPic_out").src=$id("valiPic_out").src;
								}
								else if(ret==1){
									close_log();
									$id("valiPic_out").src=$id("valiPic_out").src;
									document.getElementById("dddddd").value="查看排名";
                                    alert("登录成功！");
skipurl = "/ranking";
								}
					   		} 
						}//end function
					}//end else 1
				}//end if
				else{
					alert("密码不能包含特殊符号！");
					$('#pwd').val('');
				}
			}//end else 2
		}//end if
		else{
			alert("邮箱格式不正确！");
			$('#loginName').val('');
		}
	}//end else 3
}
function sendEmail(){
	var emailAddress = $('#mailReg').val();
	var emailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(emailAddress);
	if(!emailCheck){
		alert('邮箱格式不正确哦，请检查');
		return;
	}
	$.ajax({
		type: 'POST',
		url: '/email',
		data: {
			"address" : emailAddress
		},
		success: function(data){
			dataJSON = jQuery.parseJSON(data);
			if(dataJSON.status == 1){
				alert("邮件验证码已发送，请查看并在下方输入验证码！");
			}
			else{
				alert("邮件未发送，请确认您的邮箱是否正确！");
			}
		},
		error: function(){
			alert("邮件服务器请求超时，请稍候再试！");
		}
	});
}


//社会人员注册
function _register(){  
    var loginName=$('#mailReg').val();
	var password=$('#pwd1').val();
	var password2=$('#pwd2').val();
	var validateNum=$('#vali_reg').val();

	loginName = loginName.Trim();
	password = password.Trim();
	password2 = password2.Trim();
	if (!loginName) {
		alert("邮箱不能为空！");
	}
	else{//else 0
		var reg = /^[\w-]+[\.]*[\w-]+[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
		if(reg.test(loginName)){
			if(!password){
				alert("密码不能为空！")
			}
			else{//else 1
				var reg = /^[a-zA-Z\d]{6,15}$/;
				if(reg.test(password)){
					if (password != password2){
						alert("两次输入不一致！");
						$('#pwd1').val() = '';
						$('#pwd2').val() = '';
					}
					else {//else 2
						if (validateNum==''){
							alert("请输入验证码！");
						}
						else{//else 3
							var ajax;
							if (window.XMLHttpRequest)
						  	{// code for IE7+, Firefox, Chrome, Opera, Safari
							  ajax=new XMLHttpRequest();
							}
							else
							{// code for IE6, IE5
							  ajax=new ActiveXObject("Microsoft.XMLHTTP");
							}
							ajax.onreadystatechange=updatePage;
							
							var postStr="loginName="+loginName+"&password="+password+"&emailCheck="+validateNum+"&refere=reference1";
							ajax.open("post","/register",true);
							ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
							ajax.send(postStr);
					
							//获取执行状态
							function updatePage() 
							{ 
						   		//如果执行状态成功，那么就把返回信息写到指定的层里
						   		if (ajax.readyState == 4 && ajax.status == 200)
								{ 
									var ret = ajax.responseText;
									if (ret == 7){
										alert('邮箱验证码错误！');
									}
									if (ret == 6){
										alert("用户名已存在！");
										document.getElementById('mailReg').value='';//核对名字
										document.getElementById('pwd1').value='';//核对名字
										document.getElementById('pwd2').value='';
									}
									else if(ret == 2){
										alert("错误！");
									}
									else if(ret == 4){
										alert("用户名格式不符合规定！");
										document.getElementById('mailReg').value='';//核对
										document.getElementById('pwd1').value='';
										document.getElementById('pwd2').value='';
									}
									else if(ret == 3){
										alert("请诚信投票！");
										document.getElementById('mailReg').value='';//核对
									}
									else if(ret == 5){
										alert("密码格式不符合规定！");
										document.getElementById('pwd1').value='';//核对
										document.getElementById('pwd2').value='';
									}
									else{
										alert("注册成功！");
										close_log();
										document.getElementById("dddddd").value="查看排名";
										skipurl = "/ranking";
									}
						   		} 
							}//end function
						}//end else 3
					}//end else 2
				}//end if
				else{
					alert("密码不能包含特殊符号！")
					document.getElementById('pwd1').value='';
					document.getElementById('pwd2').value='';
				}
			}//end else 1
		}//end if
		else{
			alert("邮箱格式不正确！");
			document.getElementById('mailReg').value='';
		}
	}//end else 0
}
//投票提交
function _submit(){
	var check=0;
	var postArray = new Array();
	for (var i = 0; i < window.total_people; i++) {
		if($id("student_"+i).checked){
			++check;
			postArray.push(num[i]);
		}
	}
	var validateNum=$('#submit_input').val();
	if(validateNum==''){
		alert("请输入验证码！");
	}
	else{
		if (check>15){
		alert("请诚信投票！");
		$id("ok_vali").src=$id("ok_vali").src;
	}else if(check==15){
		
		var json_str = JSON.stringify(postArray);
		var ajax;
			if (window.XMLHttpRequest)
		  	{// code for IE7+, Firefox, Chrome, Opera, Safari
			  ajax=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
			  ajax=new ActiveXObject("Microsoft.XMLHTTP");
			}
			ajax.onreadystatechange=updatePage;
			
			var postStr="voteArray="+json_str+"&postValidateNum="+validateNum;
			ajax.open("post","/vote",true);
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			ajax.send(postStr);

			function updatePage() 
			{
				if (ajax.readyState == 4 && ajax.status == 200)
				{ 
					var ret = ajax.responseText;
					if (ret == 1){
						alert("投票成功！");
						 $id("ok_vali").src=$id("ok_vali").src;

						close_blo();
					} else if( ret== 2){
						alert("您还没有登陆哦~请先登陆！");
						close_blo();
						skip_1();
					} else if(ret ==3 ){
						alert("错误！！！");
						$id("ok_vali").src=$id("ok_vali").src;
					} else if(ret ==4 ){
						alert("您今天已经投过票啦~明天再来吧！");
						close_blo();
					} else if(ret ==5 ){
						alert("请诚信投票！");
						close_blo();
					} else if(ret ==6 ){
						alert("验证码错误！");
						$id("ok_vali").src=$id("ok_vali").src;
					} else if(ret ==7 ){
						alert("现在不是投票时间哦~明天再来吧！");
						close_blo();
					} else if(ret ==8){
						alert("同一IP半小时内只能投票一次哦～");
						close_blo();
					}
					 else if (ret == 9){
						alert("请您诚信投票！");
						close_blo();
					}


		   		} 
			}
		}//end else if
		else{
			alert("必须选满15个竞选者才可以提交哦~");
			 $id("ok_vali").src=$id("ok_vali").src;
			close_blo();
		}
	}//end else
	
}
function search(){
	var newId = $id("search").value;
	if(haveChinese(newId)){
		var r=0;
		for(;r<total_people;r++){
			if(name_array[r] == newId)
				break;
		}
		if(r == total_people){
			alert("不存在此选手！");
		}
		else{
			var ele=$id("voteBlock");
			var obj = getElementsByClassName("person",ele,"li");
			for(var j=0;j<obj.length;j++){
				obj[j].style.display="none";
			}
			$("#"+num[r]).fadeIn("normal");
			saveItemInfo();
			var preview = $.data(this,'preview');
			if(typeof preview != 'undefined'){
				hidePreview();
			}
		}
	}else
		alert("请输入选手姓名进行搜索！");
}

function start_click(){
	$("#voteBlock").slideToggle();
}
function start_over(){
	$id("start").src="/public/pic/start.png";
}
function start_out(){
	$id("start").src="/public/pic/start_.png";
}
function profile_click(){
	$("#profile_font").slideToggle();
	$('#tips_2').fadeOut('slow');
}
function profile_over(){
	$id("prof").src="/public/pic/profile.png";
}
function profile_out(){
	$id("prof").src="/public/pic/profile_.png";
}
function needknow_click(){
	$("#needknow_font").slideToggle();
}
function needknow_over(){
	$id("need").src="/public/pic/needknow.png";
}
function needknow_out(){
	$id("need").src="/public/pic/needknow_.png";
}
function rule_click(){
	$("#rule_font").slideToggle();
}
function rule_over(){
	$id("rule").src="/public/pic/rules.png";
}
function rule_out(){
	$id("rule").src="/public/pic/rules_.png";
}
function contact_click(){
	$("#contact_font").slideToggle();
}
function contact_over(){
	$id("contacting").src="/public/pic/contact.png";
}
function contact_out(){
	$id("contacting").src="/public/pic/contact_.png";
}

function click_0(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		$(obj[i]).fadeIn("normal");
	}
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_1(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[1]).fadeIn("normal");
	$("#"+num[2]).fadeIn("normal");
	$("#"+num[3]).fadeIn("normal");
	$("#"+num[5]).fadeIn("normal");
	$("#"+num[8]).fadeIn("normal");
	$("#"+num[9]).fadeIn("normal");
	$("#"+num[23]).fadeIn("normal");
	$("#"+num[25]).fadeIn("normal");
	$("#"+num[32]).fadeIn("normal");
	$("#"+num[35]).fadeIn("normal");
	$("#"+num[39]).fadeIn("normal");
	$("#"+num[42]).fadeIn("normal");
	$("#"+num[48]).fadeIn("normal");
	$("#"+num[51]).fadeIn("normal");
	$("#"+num[54]).fadeIn("normal");
	$("#"+num[55]).fadeIn("normal");
	$("#"+num[59]).fadeIn("normal");
	$("#"+num[64]).fadeIn("normal");
	$("#"+num[67]).fadeIn("normal");
	$("#"+num[71]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_2(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[10]).fadeIn("normal");
	$("#"+num[12]).fadeIn("normal");
	$("#"+num[16]).fadeIn("normal");
	$("#"+num[75]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_3(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#71112202").fadeIn("normal");
	$("#71112211").fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_4(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[37]).fadeIn("normal");
	$("#"+num[40]).fadeIn("normal");
	$("#"+num[66]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_5(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[15]).fadeIn("normal");
	$("#"+num[20]).fadeIn("normal");
	$("#"+num[24]).fadeIn("normal");
	$("#"+num[29]).fadeIn("normal");
	$("#"+num[38]).fadeIn("normal");
	$("#"+num[57]).fadeIn("normal");
	$("#"+num[58]).fadeIn("normal");
	$("#"+num[76]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_6(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[53]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_7(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[0]).fadeIn("normal");
	$("#"+num[6]).fadeIn("normal");
	$("#"+num[7]).fadeIn("normal");
	$("#"+num[11]).fadeIn("normal");
	$("#"+num[13]).fadeIn("normal");
	$("#"+num[14]).fadeIn("normal");
	$("#"+num[19]).fadeIn("normal");
	$("#"+num[21]).fadeIn("normal");
	$("#"+num[22]).fadeIn("normal");
	$("#"+num[26]).fadeIn("normal");
	$("#"+num[27]).fadeIn("normal");
	$("#"+num[31]).fadeIn("normal");
	$("#"+num[33]).fadeIn("normal");
	$("#"+num[34]).fadeIn("normal");
	$("#"+num[36]).fadeIn("normal");
	$("#"+num[43]).fadeIn("normal");
	$("#"+num[44]).fadeIn("normal");
	$("#"+num[45]).fadeIn("normal");
	$("#"+num[46]).fadeIn("normal");
	$("#"+num[47]).fadeIn("normal");
	$("#"+num[49]).fadeIn("normal");
	$("#"+num[50]).fadeIn("normal");
	$("#"+num[52]).fadeIn("normal");
	$("#"+num[56]).fadeIn("normal");
	$("#"+num[60]).fadeIn("normal");
	$("#"+num[61]).fadeIn("normal");
	$("#"+num[62]).fadeIn("normal");
	$("#"+num[63]).fadeIn("normal");
	$("#"+num[65]).fadeIn("normal");
	$("#"+num[69]).fadeIn("normal");
	$("#"+num[72]).fadeIn("normal");
	$("#"+num[74]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_8(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[17]).fadeIn("normal");
	$("#"+num[41]).fadeIn("normal");
	$("#"+num[68]).fadeIn("normal");
	$("#"+num[70]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}
function click_9(){
	var ele=$id("voteBlock");
	var obj = getElementsByClassName("person",ele,"li");
	for(var i=0;i<obj.length;i++){
		obj[i].style.display="none";
	}
	$("#"+num[4]).fadeIn("normal");
	$("#"+num[18]).fadeIn("normal");
	$("#"+num[28]).fadeIn("normal");
	$("#"+num[30]).fadeIn("normal");
	$("#"+num[73]).fadeIn("normal");
	saveItemInfo();
	var preview = $.data( this, 'preview' );
	if( typeof preview != 'undefined' ) {
		hidePreview();
	}
}

//---------VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-----------------------

		// list of items
	var $idrid = $( '#og-grid' ),
		// the items
		$items = $idrid.children( 'li' ),
		// current expanded item's index
		current = -1,
		// position (top) of the expanded item
		// used to know if the preview will expand in a different row
		previewPos = -1,
		// extra amount of pixels to scroll the window
		scrollExtra = 0,
		// extra margin when expanded (between preview overlay and the next items)
		marginExpanded = 10,
		$window = $( window ), winsize,
		$body = $( 'html, body' ),
		// transitionend events
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support for csstransitions
		support = Modernizr.csstransitions,
		// default settings
		settings = {
			minHeight : 430,
			speed : 350,
			easing : 'ease'
		};

	function init( config ) {
		
		// the settings..
		settings = $.extend( true, {}, settings, config );

		// preload all images
		$idrid.imagesLoaded( function() {

			// save item´s size and offset
			saveItemInfo( true );
			// get window´s size
			getWinSize();
			// initialize some events
			initEvents();

		} );

		return { 
		init : init,
		addItems : addItems
	};
	}

	// add more items to the grid.
	// the new items need to appended to the grid.
	// after that call Grid.addItems(theItems);
	function addItems( $newitems ) {

		$items = $items.add( $newitems );

		$newitems.each( function() {
			var $item = $( this );
			$item.data( {
				offsetTop : $item.offset().top,
				height : $item.height()
			} );
		} );

		initItemsEvents( $newitems );

	}

	// saves the item´s offset top and height (if saveheight is true)
	function saveItemInfo( saveheight ) {
		$items.each( function() {
			var $item = $( this );
			$item.data( 'offsetTop', $item.offset().top );
			if( saveheight ) {
				$item.data( 'height', $item.height() );
			}
		} );
	}

	function initEvents() {
		
		// when clicking an item, show the preview with the item´s info and large image.
		// close the item if already expanded.
		// also close if clicking on the item´s cross
		initItemsEvents( $items );
		
		// on window resize get the window´s size again
		// reset some values..
		$window.on( 'debouncedresize', function() {
			
			scrollExtra = 0;
			previewPos = -1;
			// save item´s offset
			saveItemInfo();
			getWinSize();
			var preview = $.data( this, 'preview' );
			if( typeof preview != 'undefined' ) {
				hidePreview();
			}

		} );

	}
function _loadDet($items,$item){
	var student_num = $item.attr('id');
	var xmlhttp;
	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
	  	textR1=xmlhttp.responseText;//这里的responseText是Json
	  	$json_det=JSON.parse(textR1);
	  	current === $item.index() ? hidePreview() : showPreview( $item ,$json_det);
	    //_addDetail(textR1);//这个是正常使用的代码
	  }
	}
	var getDetailStr = "/public/json/introduce_"+student_num+".json";
	xmlhttp.open("get",getDetailStr,true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	xmlhttp.send(getDetailStr);
}
	function initItemsEvents( $items ) {
		$items.on( 'click', 'span.og-close', function() {
			hidePreview();
			return false;
		} ).children( 'a' ).on( 'click', function(e) {
			var $item = $( this ).parent();
			_loadDet($items,$item);
			return false;
		} );
	}

	function getWinSize() {
		winsize = { width : $window.width(), height : $window.height() };
	}

	function showPreview( $item ,$json_det) {
		var preview = $.data( this, 'preview' ),
			// item´s offset top
			position = $item.data( 'offsetTop' );
		scrollExtra = 0;

		// if a preview exists and previewPos is different (different row) from item´s top then close it
		if( typeof preview != 'undefined' ) {
			// not in the same row
			if( previewPos !== position ) {
				// if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
				if( position > previewPos ) {
					scrollExtra = preview.height;
				}
				hidePreview();
			}
			// same row
			else {
				preview.update( $item ,$json_det);
				return false;
			}
			
		}
		// update previewPos
		previewPos = position;
		// initialize new preview for the clicked item
		preview = $.data( this, 'preview', new Preview( $item ,$json_det) );
		// expand preview overlay
		preview.open();

	}

	function hidePreview() {
		current = -1;
		var preview = $.data( this, 'preview' );
		preview.close();
		$.removeData( this, 'preview' );
	}

	// the preview obj / overlay
	function Preview( $item ,$json_det) {
		this.$item = $item;
		this.expandedIdx = this.$item.index();
		this.create();
		this.update($item,$json_det);
		
	}

	Preview.prototype = {
		create : function() {
			// create Preview structure:
			this.$realname = $( '<h4></h4>' );
			this.$college_type = $( '<h3></h3>' );
			this.$introduce = $( '<p></p>' );
			this.$meterial = $( '<p id=\"p1\"></p>' );
			//this.$href = $( '<a href="#">不要乱点这里</a>' );
			this.$details = $( '<div class="og-details"></div>' ).append( this.$realname, this.$college_type, this.$introduce, this.$meterial);
			this.$loading = $( '<div class="og-loading"></div>' );
			this.$fullimage = $( '<div class="og-fullimg"></div>' ).append( this.$loading );
			this.$closePreview = $( '<span class="og-close"></span>' ).append("×");
			this.$previewInner = $( '<div class="og-expander-inner"></div>' ).append( this.$closePreview, this.$fullimage, this.$details );
			this.$previewEl = $( '<div class="og-expander"></div>' ).append( this.$previewInner );
			// append preview element to the item
			this.$item.append( this.getEl() );
			// set the transitions for the preview and the item
			if( support ) {
				this.setTransition();
			}
		},
		update : function( $item ,$json_det) {

			if( $item ) {
				this.$item = $item;
			}
			
			// if already expanded remove class "og-expanded" from current item and add it to new item
			if( current !== -1 ) {
				var $currentItem = $items.eq( current );
				$currentItem.removeClass( 'og-expanded' );
				this.$item.addClass( 'og-expanded' );
				// position the preview correctly
				this.positionPreview();
			}

			// update current value
			current = this.$item.index();
			// update preview´s content
			var introduce_ret = $json_det['introduce'];
			introduce_ret = introduce_ret.replace(/`/g,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;");
			introduce_ret = introduce_ret.replace(/MicrosoftAA/g,"\"");
			introduce_ret = introduce_ret.replace(/MicrosoftBB/g,"\'");
			var proof_ret = $json_det['proof'];
			proof_ret = proof_ret.replace(/`/g,"<br/>");
			proof_ret = proof_ret.replace(/MicrosoftAA/g,"\"");
			proof_ret = proof_ret.replace(/MicrosoftBB/g,"\'");
			var $itemEl = this.$item.children( 'a' ),
				eldata = {
					//href : $itemEl.attr( 'href' ),
					largesrc : $itemEl.data( 'largesrc' ),
					realname : $json_det['realname'],
					college_type : $json_det['college']+"  "+$json_det['style'],
					introduce : introduce_ret,
					meterial : proof_ret
				};

			this.$realname.html( eldata.realname );
			this.$college_type.html( eldata.college_type );
			this.$introduce.html( eldata.introduce );
			this.$meterial.html( eldata.meterial );
			//this.$href.attr( 'href', eldata.href );

			var self = this;
			
			// remove the current image in the preview
			if( typeof self.$largeImg != 'undefined' ) {
				self.$largeImg.remove();
			}

			// preload large image and add it to the preview
			// for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
			if( self.$fullimage.is( ':visible' ) ) {
				this.$loading.show();
				$( '<img/>' ).load( function() {
					var $img = $( this );
					if( $img.attr( 'src' ) === self.$item.children('a').data( 'largesrc' ) ) {
						self.$loading.hide();
						self.$fullimage.find( 'img' ).remove();
						self.$largeImg = $img.fadeIn( 350 );
						self.$fullimage.append( self.$largeImg );
					}
				} ).attr( 'src', eldata.largesrc );	
			}

		},
		open : function() {

			setTimeout( $.proxy( function() {	
				// set the height for the preview and the item
				this.setHeights();
				// scroll to position the preview in the right place
				this.positionPreview();
			}, this ), 25 );

		},
		close : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						$( this ).off( transEndEventName );
					}
					self.$item.removeClass( 'og-expanded' );
					self.$previewEl.remove();
				};

			setTimeout( $.proxy( function() {

				if( typeof this.$largeImg !== 'undefined' ) {
					this.$largeImg.fadeOut( 'fast' );
				}
				this.$previewEl.css( 'height', 0 );
				// the current expanded item (might be different from this.$item)
				var $expandedItem = $items.eq( this.expandedIdx-1 );
				$expandedItem.css( 'height', $expandedItem.data( 'height' ) ).on( transEndEventName, onEndFn );

				if( !support ) {
					onEndFn.call();
				}

			}, this ), 25 );
			
			return false;

		},
		calcHeight : function() {

			var heightPreview = winsize.height - this.$item.data( 'height' ) - marginExpanded,
				itemHeight = winsize.height;

			if( heightPreview < settings.minHeight ) {
				heightPreview = settings.minHeight;
				itemHeight = settings.minHeight + this.$item.data( 'height' ) + marginExpanded;
			}

			this.height = heightPreview;
			this.itemHeight = itemHeight;

		},
		setHeights : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						self.$item.off( transEndEventName );
					}
					self.$item.addClass( 'og-expanded' );
				};

			this.calcHeight();
			this.$previewEl.css( 'height', this.height );
			this.$item.css( 'height', this.itemHeight ).on( transEndEventName, onEndFn );

			if( !support ) {
				onEndFn.call();
			}

		},
		positionPreview : function() {

			// scroll page
			// case 1 : preview height + item height fits in window´s height
			// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
			// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
			var position = this.$item.data( 'offsetTop' ),
				previewOffsetT = this.$previewEl.offset().top - scrollExtra,
				scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= winsize.height ? position : this.height < winsize.height ? previewOffsetT - ( winsize.height - this.height ) : previewOffsetT;
			
			$body.animate( { scrollTop : scrollVal }, settings.speed );

		},
		setTransition  : function() {
			this.$previewEl.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
			this.$item.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
		},
		getEl : function() {
			return this.$previewEl;
		}
	}

	/*return { 
		init : init,
		addItems : addItems
	};*/

/*})();*/

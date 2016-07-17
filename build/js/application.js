$(document).ready(function(){

	//HEADER

	var preventAction = true,
		bodyTag = $('body'),
		htmlTag = $('html'),
		dropdown = $(".dropdown"),
		dropdownDefinitionList = dropdown.children('.dropdown__definition-list'),
		dropdownTitle = dropdownDefinitionList.children('.dropdown__title'),
		dropdownTitleLink = dropdownDefinitionList.find('.dropdown__title-link'), // do I need this string?
		dropdownDefinition = dropdownDefinitionList.find('.dropdown__definition'),
		nav = $('.nav'),
		linkDropdown = $('.nav__link--dropdown'), //optimize
		dropdownHight;

	//slideToggle dropdown
	linkDropdown.on('click', function(){
		$(this).siblings(dropdown).css('height','auto');
		dropdownHight = $(this).siblings(dropdown).height();
		$(this).siblings(dropdown).slideToggle(180);
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}
		else{
			$(this).removeClass('active');
			dropdownDefinition.css('display','none');
		}
	});

	//for desktop
	showDropdownDefinition = function(){
		dropdownDefinition.css('display','none');
		$(this).children(dropdownDefinition).css('display','block');
	}

	//for mobile
	toggleDropdownDefinition = function(title){
		if(!title.parent().find(dropdownDefinition).hasClass('active')){
			dropdownDefinition.slideUp(250).removeClass('active');
			title.parent().find(dropdownDefinition).slideDown(250).addClass('active');
		}
		else{
			title.parent().find(dropdownDefinition).slideUp(250).removeClass('active');
		}
	}
	// dropdownDefinitionList.on("mouseover", function(event){
	// 	// preventAction = true;
	// 	// if(preventAction){
	// 		// event.preventDefault();
	// 		showDropdownDefinition($(this));
	// 	// };
	// });

	// $('.dropdown__link').on('click', function(){
		//disable event.preventDefault() which was created on higher level
		// preventAction = false;
	// });



	//make height of dropdowns columns equal
	// dropdownTitle.on('mouseover' , function(){
	// 	var heightOfDefinition = $(this).siblings(dropdownDefinition).height(),
	// 		parentDropdown =     $(this).parent().parent();

	// 	if (parentDropdown.height() < heightOfDefinition){
	// 		parentDropdown.height(heightOfDefinition-8); // 8px = padding of dropdown
	// 	}
	// 	else{
	// 		parentDropdown.css('height','auto');
	// 	}
	// });






	closeDropdown = function(link){
		bodyTag.on('click',function(event){
			if($(link).hasClass('active')&& !$(event.target).closest(".dropdown").length && !$(event.target).closest(link).length){
				$(link).removeClass('active').siblings(dropdown).slideUp(180) //$("link") optimize
				dropdownDefinition.css('display','none');
			}
		})
	};

	linksArray = ['.nav__link--primary','.nav__link--secondary'];
	for (var i = 0; i < linksArray.length; i++) {
		closeDropdown(linksArray[i]);
	};
	//  body.on('click',function(event){
	// 	if($(event.target) == $('.banner__title')){
	// 		console.log('this banner__title');
	// 	}
	// });
	$('.nav-icon')
	bodyTag.on('click',function(event){
		if(nav.hasClass('active') && !$(event.target).closest(".nav-icon").length && !$(event.target).closest(nav).length){
			nav.removeClass('active');
			htmlTag.removeClass('overflow-hidden');
		};
	});

	//search-toggle
	$('.search-toggle').on('click', function(){
		$('.form-wrap').toggle();
		$(this).toggleClass('active');
	});
	
	//nav toggle
	$('.nav-icon').on('click', function(){
		$(this).toggleClass('open');
		$('.nav').toggleClass('active');
		htmlTag.toggleClass('overflow-hidden');
	});


	//FOOTER
	$('.column__subtitle').on('click', function(){
		$(this).toggleClass('active');
		$(this).siblings('.column__list').toggleClass('active');
	});
















	//working space

	//make height of dropdowns columns equal
	makeHeightEqual = function(){
		console.log('make');
		var heightOfDefinition =   $(this).siblings(dropdownDefinition).height(),
			parentDropdown = $(this).parent().parent();
		if (dropdownHight < heightOfDefinition){
			parentDropdown.height(heightOfDefinition-8); // 8px = padding of dropdown
		}
		else{
			parentDropdown.css('height','auto');
		}
	};
	slideToggeDropdownDefinition = function(event){
		event.preventDefault();
		toggleDropdownDefinition($(this));
		console.log('slideToggeDropdownDefinition')
	};
	testFunc = function(){
		
		console.log('testFunc');
	}

	var destroyedDesktopFunctions;
	var destroyedMobileFunctions;
	var firstInit = true;

	$(window).on('resize', function(){


		if($(window).width() < 768){
			//
			bodyTag
				.on( "click", "#theone", flash )
				.find( "#theone" )
				.text( "Can Click!" );
			// bodyTag

			//
			console.log(destroyedDesktopFunctions);
			if(firstInit){
				console.log('if firstInit < 768');



				bodyTag.on("click", '.dropdown__title', slideToggeDropdownDefinition);
				firstInit = false;




			}
			else if (!destroyedDesktopFunctions) {
				console.log('main < 768');
				// console.log('switcher = true');
				//---------------------------------
				// dropdownTitle.off('mouseover');
				// dropdownDefinitionList.off('mouseover');



				bodyTag.off("mouseover", '.dropdown__definition-list', showDropdownDefinition);
				bodyTag.off("mouseover", '.dropdown__title', makeHeightEqual);
				bodyTag.on("click", '.dropdown__title', slideToggeDropdownDefinition);
				destroyedDesktopFunctions = true;
				destroyedMobileFunctions = false;







				// dropdownTitle.on("click", function(event){
				// 	event.preventDefault();
				// 	toggleDropdownDefinition($(this));
				// });
			};
		}
		else if($(window).width() >= 768){
			// btnFunc = function(){
			// 	console.log('here is btn on!');
			// };
			// bodyTag.on('click', '.test-btn', btnFunc);// delete this
			// $('.banner__title').on('click', function(){
			// 	bodyTag.off('click', '.test-btn', btnFunc);
			// });
			//
			bodyTag
				.off( "click", "#theone", flash )
				.find( "#theone" )
				.text( "Does nothing..." );
			//


			if(firstInit){
				console.log('if firstInit > 768');



				bodyTag.on("mouseover", '.dropdown__title', makeHeightEqual);
				bodyTag.on("mouseover", '.dropdown__definition-list', showDropdownDefinition);
				firstInit = false;


			}
			else if (!destroyedMobileFunctions) {
				console.log('main > 768');
				//---------------------------------
				
				bodyTag.off("click", '.dropdown__title', slideToggeDropdownDefinition);
				bodyTag.on("mouseover", '.dropdown__definition-list', showDropdownDefinition);
				// dropdownDefinitionList.on("mouseover", function(event){
				// 	showDropdownDefinition($(this));
				// });
				
				bodyTag.on("mouseover", '.dropdown__title', makeHeightEqual);






				// dropdownTitle.on('mouseover' , makeHeightEqual);
				destroyedMobileFunctions = true;
				destroyedDesktopFunctions = false;
				console.log(destroyedDesktopFunctions);
			};
		}

	});
	$(window).resize();


	//test code 
	function flash() {
		$( ".div" ).show().fadeOut( "slow" );
	}
	$( "#bind" ).click(function() {
		// $( "body" )
		// 	.on( "click", "#theone", flash )
		// 	.find( "#theone" )
		// 	.text( "Can Click!" );
	});
	$( "#unbind" ).click(function() {
		// $( "body" )
		// 	.off( "click", "#theone", flash )
		// 	.find( "#theone" )
		// 	.text( "Does nothing..." );
	});
});








// Example preventDefault();

// window.preventAction = true;

// $(document).keypress(function(e){
// 	if(e.keyCode==40 || e.keyCode==38){
// 		if (window.preventAction) e.preventDefault();
// 	};

// 	$('#img2').click(function(e){
// 		window.preventAction = false;
// 	});

// }

//- stack overflow disable jQuery's preventDefault for children









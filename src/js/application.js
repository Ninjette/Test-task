$(document).ready(function(){

	//HEADER

	var bodyTag = $('body'),
		htmlTag = $('html'),
		dropdown = $(".dropdown"),
		dropdownDefinitionList = dropdown.children('.dropdown__definition-list'),
		dropdownTitle = dropdownDefinitionList.children('.dropdown__title'),
		dropdownDefinition = dropdownDefinitionList.find('.dropdown__definition'),
		nav = $('.nav'),
		linkDropdown = nav.find('.nav__link--dropdown'),
		navIcon = $('.nav-icon'),
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

	closeDropdown = function(link){
		bodyTag.on('click',function(event){
			if(link.hasClass('active')&& !$(event.target).closest(".dropdown").length && !$(event.target).closest(link).length){
				link.removeClass('active').siblings(dropdown).slideUp(180);
				dropdownDefinition.css('display','none');
			}
		})
	};

	linksArray = [$('.nav__link--primary'),$('.nav__link--secondary')];
	for (var i = 0; i < linksArray.length; i++) {
		closeDropdown(linksArray[i]);
	};

	linksRemoveClass = function(){
		for (var i = 0; i < linksArray.length; i++) {
			linksArray[i].removeClass('active');
		};
	}

	bodyTag.on('click',function(event){
		if(nav.hasClass('active') && !$(event.target).closest(navIcon).length && !$(event.target).closest(nav).length){
			navClose();
		};
	});

	//search-toggle
	$('.search-toggle').on('click', function(){
		$('.form-wrap').toggle();
		$(this).toggleClass('active');
	});
	
	//nav toggle
	navToggle = function(){
		navIcon.toggleClass('open');
		nav.toggleClass('active');
		htmlTag.toggleClass('overflow-hidden');
	}
	navClose = function(){
		navIcon.removeClass('open');
		nav.removeClass('active');
		htmlTag.removeClass('overflow-hidden');
	}
	navIcon.on('click', navToggle);

	//make height of dropdowns columns equal
	makeHeightEqual = function(){
		var heightOfDefinition =   $(this).siblings(dropdownDefinition).height(),
			parentDropdown = $(this).parent().parent();
		if (dropdownHight < heightOfDefinition){
			parentDropdown.height(heightOfDefinition-8); // 8px = padding of dropdown
		}
		else{
			parentDropdown.css('height','auto');
		}
	};
	slideToggeDropdownDefinition = function(){
		toggleDropdownDefinition($(this));
	};

	//actions on window resize
	var destroyedDesktopFunctions,
		destroyedMobileFunctions,
		firstInit = true;

	var timeoutVar;
	$(window).on('resize', function(){
		clearTimeout(timeoutVar);
		timeoutVar = setTimeout(doneResizing, 100); // to prevent overwork on resize
		function doneResizing(){
			if($(window).width() < 768){
				if(firstInit){
					bodyTag.on("click", '.dropdown__title', slideToggeDropdownDefinition);
					firstInit = false;
				}
				else if(!destroyedDesktopFunctions) {
					dropdown.css('display','none');
					linksRemoveClass();
					bodyTag.off("mouseover", '.dropdown__definition-list', showDropdownDefinition);
					bodyTag.off("mouseover", '.dropdown__title', makeHeightEqual);
					bodyTag.on("click", '.dropdown__title', slideToggeDropdownDefinition);
					destroyedDesktopFunctions = true;
					destroyedMobileFunctions = false;
				};
			}
			else if($(window).width() >= 768){
				if(firstInit){
					bodyTag.on("mouseover", '.dropdown__title', makeHeightEqual);
					bodyTag.on("mouseover", '.dropdown__definition-list', showDropdownDefinition);
					firstInit = false;
				}
				else if(!destroyedMobileFunctions) {
					navClose();
					dropdown.css('display','none');
					linksRemoveClass();
					bodyTag.off("click", '.dropdown__title', slideToggeDropdownDefinition);
					bodyTag.on("mouseover", '.dropdown__definition-list', showDropdownDefinition);
					bodyTag.on("mouseover", '.dropdown__title', makeHeightEqual);
					destroyedMobileFunctions = true;
					destroyedDesktopFunctions = false;
				};
			}
		}
	});
	$(window).resize();


	//FOOTER

	$('.column__subtitle').on('click', function(){
		$(this).toggleClass('active');
		$(this).siblings('.column__list').toggleClass('active');
	});

});
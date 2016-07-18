$(document).ready(function(){

	//HEADER

	var bodyTag                 = $('body'),
		htmlTag                 = $('html'),
		dropdown                = $(".dropdown"),
		dropdownDefinitionList  = dropdown.children('.dropdown__definition-list'),
		dropdownTitle           = dropdownDefinitionList.children('.dropdown__title'),
		dropdownDefinition      = dropdownDefinitionList.find('.dropdown__definition'),
		nav                     = $('.nav'),
		linkDropdown            = nav.find('.nav__link--dropdown'),
		navIcon                 = $('.nav-icon'),
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


	//SIGN-UP
	var form           = $(".sign-up__form"),
		input          = form.find('.sign-up__input'),
		inputName      = form.find('.sign-up__input[name="name"]'),
		inputEmail     = form.find('.sign-up__input[name="email"]'),
		inputPassword  = form.find('.sign-up__input[name="password"]');
		regExpEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	removeClassUntouched = function(){
		$(this).parent().removeClass('untouched');
	}
	removeWarning = function(selector){
		selector.parent().removeClass('warning');
	};
	addWarning = function(selector){
		selector.parent().addClass('warning');
	}
	checkVal = function(){
		// for input name
		if($(this).is(inputName)){
			if ($(this).val().length < 1) {
				addWarning($(this))
			}
			else{
				removeWarning($(this))
			}
		}
		// for input email
		else if($(this).is(inputEmail)){
			if (regExpEmail.test($(this).val())){
				removeWarning($(this))
			}
			else{
				addWarning($(this))
			}
		}
		// for input password
		else{
			if($(this).val().length < 3){
				addWarning($(this))
			}
			else{
				removeWarning($(this))
			}
		}
	}

	input.on('blur', checkVal)
		 .on('keyup', checkVal)
		 .on('focus', removeClassUntouched);
	
	form.submit(function(event){
		if (input.parent().hasClass('warning') || input.parent().hasClass('untouched')){
			event.preventDefault();
			$('.untouched').addClass('warning');
		}
		else{
			$.ajax({
				type: "GET",
				url: "",
				data: form.serialize()
			}).done(function() {
				$('.success-window').fadeIn();
				setTimeout(function() {
					$('.success-window').fadeOut();
				}, 2000);
			});
			return false;
		};
	});

	//FOOTER
	$('.column__subtitle').on('click', function(){
		$(this).toggleClass('active');
		$(this).siblings('.column__list').toggleClass('active');
	});

});
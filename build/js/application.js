$(document).ready(function(){

	//HEADER

	var preventAction = true,
		dropdown = $(".dropdown"),
		dropdownDefinitionList = dropdown.children('.dropdown__definition-list'),
		dropdownTitle = dropdownDefinitionList.children('.dropdown__title'),
		dropdownTitleLink = dropdownDefinitionList.find('.dropdown__title-link'), // do I need this string?
		dropdownDefinition = dropdownDefinitionList.find('.dropdown__definition'),
		linkDropdown = $('.nav__link--dropdown'); //optimize

	$(".nav__link--dropdown").on('click', function(){
		$(this).siblings(dropdown).slideToggle(180);
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}
		else{
			$(this).removeClass('active');
		}
	});

	dropdownDefinitionList.on("mouseover", function(event){
		// preventAction = true;
		// if(preventAction){
			event.preventDefault();
			dropdownDefinition.css('display','none');
			$(this).children(dropdownDefinition).css('display','block');
		// };
	});

	$('.dropdown__link').on('click', function(){
		//disable event.preventDefault() which was created on higher level
		// preventAction = false;
	});




	dropdownTitle.on('mouseover' , function(){
		var heightOfDefinition = $(this).siblings(dropdownDefinition).height(),
			parentDropdown =     $(this).parent().parent();

		if (parentDropdown.height() < heightOfDefinition){
			parentDropdown.height(heightOfDefinition-8); // 8px = padding of dropdown
		}
		else{
			parentDropdown.css('height','auto');
		}
	});






	closeDropdown = function(link){
		$('body').on('click',function(event){
			if(!$(event.target).closest(".dropdown").length && !$(event.target).closest(link).length){
				$(link).removeClass('active').siblings(dropdown).slideUp(180) //$("link") optimize
			}
		})
	};

	linksArray = ['.nav__link--primary','.nav__link--secondary'];
	for (var i = 0; i < linksArray.length; i++) {
		closeDropdown(linksArray[i]);
	};

	//FOOTER
	$('.column__subtitle').on('click', function(){
		$(this).toggleClass('active');
		$(this).siblings('.column__list').toggleClass('active');
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
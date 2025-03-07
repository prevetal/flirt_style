WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {

	Fancybox.bind('[data-fancybox]', {
	    // Custom options for all galleries
	});


	document.addEventListener( 'wpcf7mailsent', function( event ) {
	    Fancybox.close()
		Fancybox.show([{
			src: '#thanks',
			type: 'inline'
		}])

	}, false );

	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})

	// Gallery slider
	const gallerySliders = [],
		gallery = document.querySelectorAll('.gallery .swiper')

	gallery.forEach((el, i) => {
		el.classList.add('gallery_s' + i)

		let options = {
			loop: true,
			speed: 10000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true
			},
			allowTouchMove: false,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 4,
			slidesPerView: 'auto',
			loopAdditionalSlides: 1
		}

		gallerySliders.push(new Swiper('.gallery_s' + i, options))
	})


	// Marquee
	new Swiper('.methods .marquee .swiper', {
		spaceBetween: 16,
		centeredSlides: true,
		speed: 6000,
		autoplay: {
			delay: 1,
			disableOnInteraction: true
		},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false
	  })


	$('.show_more').click((e) => {
		e.preventDefault()
		$('.show_more').hide();
		$(".show_more_text").slideDown();
	})

	// Mob. menu
	$('.mob_header .mob_menu_btn, .overlay, header .mob_close_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Animation
	let boxes = document.querySelectorAll('.animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('animated')) {
				entry.target.classList.add('animated')
			}
		}
	}

	let observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
})



window.addEventListener('load', function () {
	// Alternative
	alternativeHeight()


	// Accordion
	document.querySelectorAll('.accordion').forEach(el => {
		let styles = getComputedStyle(el)

		accordionHeight(el, parseInt(styles.getPropertyValue('--count')))
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Alternative
		alternativeHeight()


		// Accordion
		document.querySelectorAll('.accordion').forEach(el => {
			let styles = getComputedStyle(el)

			accordionHeight(el, parseInt(styles.getPropertyValue('--count')))
		})


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Alternative
function alternativeHeight() {
	let colLeftItems = document.querySelectorAll('.col_left .items > *'),
		colRightItems = document.querySelectorAll('.col_right .items > *')

	colLeftItems.forEach(el => el.style.height = 'auto')
	colRightItems.forEach(el => el.style.height = 'auto')

	for (let i = 0; i < colLeftItems.length; i++) {
		setHeight([colLeftItems[i], colRightItems[i]])
	}
}



// Accordion
function accordionHeight(context, step) {
	let start = 0,
		finish = step,
		heads = [...context.querySelectorAll('.head')],
		count = Math.ceil(heads.length / step)

	heads.forEach(el => el.style.height = 'auto')

	for (let i = 0; i < count; i++) {
		setHeight(heads.slice(start, finish))

		start = start + step
		finish = finish + step
	}
}
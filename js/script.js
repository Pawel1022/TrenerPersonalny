///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
	var flex = document.createElement('div')
	flex.style.display = 'flex'
	flex.style.flexDirection = 'column'
	flex.style.rowGap = '1px'

	flex.appendChild(document.createElement('div'))
	flex.appendChild(document.createElement('div'))

	document.body.appendChild(flex)
	var isSupported = flex.scrollHeight === 1
	flex.parentNode.removeChild(flex)
	console.log(isSupported)

	if (!isSupported) document.body.classList.add('no-flexbox-gap')
}
checkFlexGap()

function dynamicYear() {
	const yearEl = document.querySelector('.copyright-year')
	const year = new Date().getFullYear()
	yearEl.textContent = year
}

dynamicYear()

const btnNav = document.querySelector('.btn-mobile-nav')
const header = document.querySelector('.header')
const allLinks = document.querySelectorAll('a:link')
const mainLinks = [...document.querySelectorAll('.main-nav-link')]

btnNav.addEventListener('click', function () {
	header.classList.toggle('nav-open')
	let delay = 0.2

	mainLinks.forEach(link => {
		link.classList.toggle('animated')
		link.style.animationDelay = `${delay}s`
		delay += 0.1
	})
})

allLinks.forEach(function (link) {
	link.addEventListener('click', function (e) {
		e.preventDefault()
		const href = link.getAttribute('href')
		link.classList.toggle('animated')
		if (href === '#')
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})

		if (href !== '#' && href.startsWith('#')) {
			const targetCoords = document.querySelector(href).getBoundingClientRect()
			window.scrollTo({
				top: targetCoords.top,
				behavior: 'smooth',
			})
		}
	})
})

document.querySelectorAll('.main-nav-link').forEach(function (link) {
	link.addEventListener('click', function () {
		header.classList.remove('nav-open')
	})
})

// Sticky navigation

const sectionHeroEl = document.querySelector('.section-hero')

const observer = new IntersectionObserver(
	function (entries) {
		const ent = entries[0]
		if (!ent.isIntersecting) document.querySelector('body').classList.add('sticky')
		else document.querySelector('body').classList.remove('sticky')
	},
	{
		root: null,
		threshold: 0,
		rootMargin: '-80px',
	}
)

observer.observe(sectionHeroEl)

const slides = [...document.querySelectorAll('.slider__slide')]
const slider = document.querySelector('.slider')
const sliderBtnLeft = document.querySelector('.slider__btn--left')
const sliderBtnRight = document.querySelector('.slider__btn--right')
const dots = document.querySelector('.dots')

const sliderEl = function () {
	let curSlide = 0
	let maxSlide = slides.length
	const moveSlide = slide => {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${(i - slide) * 100}%)`
		})
		activateDot(slide)
		// switchDots(dots);
	}

	const createDots = function () {
		slides.forEach((_, i) => {
			dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
		})
	}

	const activateDot = function (slide) {
		document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
		document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
	}

	const nextSlide = () => {
		if (curSlide === maxSlide - 1) curSlide = 0
		else curSlide++
		moveSlide(curSlide)
	}

	const prevSlide = () => {
		if (curSlide === 0) curSlide = maxSlide - 1
		else curSlide--
		moveSlide(curSlide)
	}

	sliderBtnRight.addEventListener('click', nextSlide)

	sliderBtnLeft.addEventListener('click', prevSlide)

	dots.addEventListener('click', function (e) {
		if (e.target.classList.contains('dots__dot')) {
			const { slide } = e.target.dataset
			moveSlide(slide)
			activateDot(slide)
		}
	})

	document.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowRight') nextSlide()
		if (e.key === 'ArrowLeft') prevSlide()
	})

	slider.addEventListener('swiped-left', nextSlide)
	slider.addEventListener('swiped-right', prevSlide)

	const init = () => {
		createDots()
		moveSlide(0)
	}

	init()
}

sliderEl()

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/

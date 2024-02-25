document.addEventListener('DOMContentLoaded', function () {
	const body = document.querySelector('body')
	const logo = document.querySelector('.nav__logo')
	const bars = document.querySelector('.nav__bars')
	const menu = document.querySelector('.nav__menu')
	const allNavItems = document.querySelectorAll('.nav__menu-link')

	const nextBtn = document.querySelector('.header__btn--one')
	const prevBtn = document.querySelector('.header__btn--two')
	const slider = document.querySelector('.header__slider')
	const slide = document.querySelectorAll('.header__slide')
	let startIndex = 0
	const totalSlide = slide.length
	const slideWidth = slide[0].clientWidth

	const firstBtn = document.querySelector('.opinion__btn--one')
	const secondBtn = document.querySelector('.opinion__btn--two')
	const thirdBtn = document.querySelector('.opinion__btn--three')
	const sliderOpinion = document.querySelector('.opinion__slider')
	const slideOpinion = document.querySelectorAll('.opinion__slide')
	let startIndexOpinion = 0
	const totalOpinion = slideOpinion.length
	const opinionWidth = slideOpinion[0].clientWidth

	const footerYear = document.querySelector('.footer__year')

	const showMenu = () => {
		bars.classList.toggle('nav__bars--active')
		menu.classList.toggle('nav__menu--active')
		blockedMenu()

		allNavItems.forEach(item =>
			item.addEventListener('click', () => {
				bars.classList.remove('nav__bars--active')
				menu.classList.remove('nav__menu--active')
			})
		)
	}

	const handleSlider = index => {
		if (index < 0) {
			startIndex = totalSlide - 1
		} else if (index >= totalSlide) {
			startIndex = 0
		} else {
			startIndex = index
		}

		if (index === 0) {
			prevBtn.style.backgroundColor = '#222831'
			nextBtn.style.backgroundColor = '#6191da'
		} else {
			nextBtn.style.backgroundColor = '#222831'
			prevBtn.style.backgroundColor = '#6191da'
		}

		const displacement = -startIndex * slideWidth
		slider.style.transform = `translateX(${displacement}px)`
	}

	const handleOpinion = index => {
		if (index < 0) {
			startIndexOpinion = totalOpinion - 1
		} else if (index >= totalOpinion) {
			startIndexOpinion = 0
		} else {
			startIndexOpinion = index
		}

		const displacement = startIndexOpinion * opinionWidth
		sliderOpinion.style.transform = `translateX(-${displacement}px)`

		if (index === 0) {
			firstBtn.style.backgroundColor = '#6191da'
			secondBtn.style.backgroundColor = '#222831'
			thirdBtn.style.backgroundColor = '#222831'
		} else if (index === 1) {
			firstBtn.style.backgroundColor = '#222831'
			secondBtn.style.backgroundColor = '#6191da'
			thirdBtn.style.backgroundColor = '#222831'
		} else {
			firstBtn.style.backgroundColor = '#222831'
			secondBtn.style.backgroundColor = '#222831'
			thirdBtn.style.backgroundColor = '#6191da'
		}
	}

	const handleYear = () => {
		const date = new Date()
		const year = date.getFullYear()

		footerYear.textContent = year
	}

	const blockedMenu = () => {
		if (body.classList.contains('unlocked')) {
			body.classList.remove('unlocked')
			body.classList.add('blocked')
		} else {
			body.classList.remove('blocked')
			body.classList.add('unlocked')
		}
	}

	const closeLogo = () => {
		bars.classList.remove('nav__bars--active')
		menu.classList.remove('nav__menu--active')
		body.classList.remove('blocked')
		body.classList.add('unlocked')
	}

	handleYear()
	logo.addEventListener('click', closeLogo)
	firstBtn.addEventListener('click', () => handleOpinion(0))
	secondBtn.addEventListener('click', () => handleOpinion(1))
	thirdBtn.addEventListener('click', () => handleOpinion(2))
	nextBtn.addEventListener('click', () => handleSlider(0))
	prevBtn.addEventListener('click', () => handleSlider(1))
	bars.addEventListener('click', showMenu)
})

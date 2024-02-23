const { src, dest, series, parallel, watch } = require('gulp')
const gulpSass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const kit = require('gulp-kit');
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const sass = gulpSass(require('sass'))

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/*',
	dist: './dist',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
}

const sassCompiler = async () => {
	const autoprefixer = (await import('gulp-autoprefixer')).default

	return src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(paths.sassDest))
}

const javaScript = done => {
	src(paths.js)
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(paths.jsDest))
	done()
}

const convertImages = async () => {
	const imagemin = (await import('gulp-imagemin')).default

	return src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest))
}

const handleKit = () => {
	return src(paths.html).pipe(kit()).pipe(dest('./')).pipe(browserSync.stream())
}

const cleanStuff = done => {
	src(paths.dist, { read: false }).pipe(clean())
	done()
}

const startBrowserSync = done => {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}

const watchForChanges = done => {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.js], parallel(handleKit, sassCompiler, javaScript)).on('change', reload)
	watch(paths.img, convertImages).on('change', reload)
	done()
}

const mainFunctions = parallel(handleKit, sassCompiler, javaScript, convertImages)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)

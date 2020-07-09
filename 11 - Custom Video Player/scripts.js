// Get the elements

const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip')
const ranges = player.querySelectorAll('.player__slider')

// Write the functions

function togglePlay () {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton () {
  const icon = this.paused ? '▶️' : '⏸'
  toggle.textContent = icon
}

function skip () {
  const amount = parseInt(this.dataset.skip)
  video.currentTime += amount
}

function handleRangeUpdate (e) {
  (mouseDown || e.type === 'change') && (video[this.name] = this.value)
}

function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

// Connect the functions to the elements

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
let mouseDown = false
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousedown', () => { mouseDown = true }))
ranges.forEach(range => range.addEventListener('mouseup', () => { mouseDown = false }))
video.addEventListener('timeupdate', handleProgress)
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => { mouseDown = true })
progress.addEventListener('mouseup', () => { mouseDown = false })
progress.addEventListener('mousemove', e => { mouseDown && scrub(e) })

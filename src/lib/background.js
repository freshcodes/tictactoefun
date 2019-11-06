import GeoPattern from 'geopattern'

function changeBackground () {
  let pattern = GeoPattern.generate()
  document.body.style.backgroundImage = pattern.toDataUrl()
  document.documentElement.style.backgroundColor = pattern.color
}

export { changeBackground }

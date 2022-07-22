function isSetObject(target) {
  return Object.prototype.toString.call(target) === "[object Set]";
}

function isMapObject(target) {
  return Object.prototype.toString.call(target) === "[object Map]";
}

export { isSetObject, isMapObject };

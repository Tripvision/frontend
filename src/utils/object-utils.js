export function isEmptyObj(obj) {
    if (obj.constructor === Object
        && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}

export function isEmptyArr(arr)  {
    if(Array.isArray(arr) && arr.length === 0)  {
      return true;
    }
    
    return false;
  }

export function getLastPath(divider, path) {
    const standard = path.lastIndexOf(divider);
    const lastPath = path.slice(standard+1, path.length);
    return lastPath;
}

export function findIndex(arr, word) {
    return arr.indexOf(word);
}
// Extend the Array interface to include customMap
declare global {
  interface Array<T> {
    customMap(callback: (item: T, index: number, array: T[]) => any): any[];
  }
}

// Implement the customMap polyfill
if (!Array.prototype.customMap) {
  Array.prototype.customMap = function (callback: any) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}
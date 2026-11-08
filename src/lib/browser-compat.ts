// Runs first in <head>, before any app bundle. Written as plain ES5 text (not a
// serialized function) so no build transform can introduce syntax old browsers reject.
//
// - Object.hasOwn: used by the SSR data hydration code (missing before Safari 15.4 / Chrome 93).
// - String.prototype.replaceAll: used by the router (missing before Chrome 85; seen in visitor errors).
// - removeChild/insertBefore guard: browser page translation and in-app browsers move text
//   nodes React owns; React then throws NotFoundError and the whole page is replaced by the
//   error screen. Skipping the impossible DOM operation keeps the page usable.
export const COMPAT_HEAD_SCRIPT = [
  "(function(){try{",
  "var d=Object.defineProperty;",
  "if(!Object.hasOwn){d(Object,'hasOwn',{configurable:true,writable:true,value:function(o,k){if(o==null)throw new TypeError('Cannot convert undefined or null to object');return Object.prototype.hasOwnProperty.call(Object(o),k);}});}",
  "if(!String.prototype.replaceAll){d(String.prototype,'replaceAll',{configurable:true,writable:true,value:function(s,r){var str=String(this);",
  "if(Object.prototype.toString.call(s)==='[object RegExp]'){if(!s.global)throw new TypeError('replaceAll must be called with a global RegExp');return str.replace(s,r);}",
  "var pat=String(s),parts=str.split(pat);if(typeof r!=='function')return parts.join(String(r));",
  "var out=parts[0],off=parts[0].length;for(var i=1;i<parts.length;i++){out+=String(r(pat,off,str))+parts[i];off+=pat.length+parts[i].length;}return out;}});}",
  "if(typeof Node==='function'&&Node.prototype&&!Node.prototype.__skinupGuard){",
  "var p=Node.prototype,rc=p.removeChild,ib=p.insertBefore;p.__skinupGuard=true;",
  "p.removeChild=function(c){if(c&&c.parentNode!==this)return c;return rc.apply(this,arguments);};",
  "p.insertBefore=function(n,r){if(r&&r.parentNode!==this)return n;return ib.apply(this,arguments);};",
  "}",
  "}catch(e){}})();",
].join("");

// First-render protection, inlined in <head> before any app script.
//
// Written as plain ES5 text (not a serialized function) so it still runs on old
// phones and inside Instagram/Facebook in-app browsers even when the app bundle
// itself cannot download or parse. It never hides the server-rendered page.
//
// - Detects startup failures: the entry script (or one of its imports) failing to
//   download, a syntax error in an app file, or a missing file before startup.
// - Watches for the app signalling it started (window.__skinupBoot.markReady()).
// - Owns the single automatic-reload budget shared by startup and page-file
//   failures: one reload per tab per five minutes, only when that record can be
//   saved, never while an order is being submitted.
// - Shows a small "Réessayer" bar when startup fails or stalls.
// - Sends classified errors (startup, page file, hydration, storage) through the
//   site's built-in error reporting, without query strings or customer details.
// - When sessionStorage access throws (privacy modes, some in-app browsers) it
//   installs a page-only replacement so the router's own retry code cannot crash a
//   second time, and it routes the router's retry through the shared budget.

export type BootStrings = Record<"fr" | "ar" | "en", { title: string; retry: string }>;

export const RELOAD_KEY = "skinup-chunk-reload-at";
export const AUTO_RELOAD_WINDOW_MS = 5 * 60 * 1000;
/** Without a startup signal this long after the page's load event, show the retry bar. */
export const STARTUP_STALL_MS = 10000;

export function bootGuardScript(strings: BootStrings): string {
  return [
    "(function(){try{",
    "var W=window,D=document;if(W.__skinupBoot)return;",
    "var KEY=" + JSON.stringify(RELOAD_KEY) + ",WIN=" + AUTO_RELOAD_WINDOW_MS + ",STALL=" + STARTUP_STALL_MS + ";",
    "var TXT=" + JSON.stringify(strings) + ";",
    "var CHUNK=/failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|failed to load module script|loading chunk|loading css chunk|unable to preload css|is not a valid javascript mime type/i;",
    // React's "recovered by client rendering" errors (hydration mismatches and errors thrown while hydrating).
    "var HYD=/hydrat|Minified React error #(418|419|421|422|423|425|520)[^0-9]/i;",
    "var B=W.__skinupBoot={ready:false,failed:false,q:[],seen:{}};",

    // ---- context for reports (no query strings, no customer data) ----
    "function clean(s){return String(s==null?'':s).replace(/\\?[^\\s\"')]*/g,'').slice(0,300);}",
    "function family(){var u=navigator.userAgent||'',app=/Instagram/.test(u)?'instagram':/FBAN|FBAV|FB_IAB|FBIOS|FB4A/.test(u)?'facebook':/musical_ly|BytedanceWebview|TikTok/i.test(u)?'tiktok':/Snapchat/.test(u)?'snapchat':'';",
    "var os=/iPhone|iPad|iPod/.test(u)?'ios':/Android/.test(u)?'android':/Macintosh/.test(u)?'mac':/Windows/.test(u)?'windows':'other',v='',m;",
    "if(os==='ios'&&(m=u.match(/OS (\\d+)_(\\d+)/)))v=m[1]+'.'+m[2];if(os==='android'&&(m=u.match(/Android (\\d+)/)))v=m[1];",
    "var br=app?app+'-inapp':/CriOS/.test(u)?'chrome':/FxiOS|Firefox\\//.test(u)?'firefox':/SamsungBrowser/.test(u)?'samsung':/EdgA|Edg\\//.test(u)?'edge':/; wv\\)/.test(u)?'android-webview':/Chrome\\//.test(u)?'chrome':/Safari\\//.test(u)?'safari':'other';",
    "return br+'/'+os+(v?' '+v:'');}",
    "function deployment(){try{var s=D.querySelector('script[data-commit-sha]');if(s)return String(s.getAttribute('data-commit-sha')).slice(0,12);}catch(e){}return 'unknown';}",
    "function build(){try{var s=D.querySelector('script[type=module][src*=\"/assets/\"]');if(s){var p=s.getAttribute('src');return p.slice(p.lastIndexOf('/')+1);}}catch(e){}return 'unknown';}",
    "function flush(){var ev=W.__lovableEvents;if(!ev||typeof ev.captureException!=='function')return false;",
    "while(B.q.length){var r=B.q.shift();try{r.ctx.deployment=deployment();r.ctx.build=build();ev.captureException(r.err,r.ctx,{mechanism:'manual',handled:r.handled,severity:r.sev});}catch(e){}}return true;}",
    "var tries=0;function pump(){if(flush()||++tries>40)return;setTimeout(pump,500);}",
    "B.report=function(kind,detail,extra,sev){try{var msg=clean(detail&&detail.message!=null?detail.message:detail);var id=kind+'|'+msg;if(B.seen[id])return;B.seen[id]=1;",
    "var ctx={skinup_kind:kind,route:location.pathname,browser:family(),started:B.ready};if(extra)for(var k in extra)if(Object.prototype.hasOwnProperty.call(extra,k))ctx[k]=extra[k];",
    "var err=new Error('[skinup:'+kind+'] '+msg);err.name='SkinupBoot';B.q.push({err:err,ctx:ctx,handled:kind!=='entry_script_failed',sev:sev||'error'});if(!flush())pump();}catch(e){}};",

    // ---- storage: probe, page-only sessionStorage replacement, router retry budget ----
    "function probe(n){try{var s=W[n];if(!s)return 'missing';s.setItem('__skinup_probe','1');s.removeItem('__skinup_probe');return 'ok';}catch(e){return (e&&e.name)||'error';}}",
    "var ss=probe('sessionStorage'),ls=probe('localStorage');",
    "var ssThrows=false;try{void W.sessionStorage;}catch(e){ssThrows=true;}",
    "if(ssThrows){var data={};try{Object.defineProperty(W,'sessionStorage',{configurable:true,enumerable:true,writable:true,value:{__skinupMemory:true,length:0,",
    "getItem:function(k){k=String(k);if(k.indexOf('tanstack_router_reload:')===0)return '1';return Object.prototype.hasOwnProperty.call(data,k)?data[k]:null;},",
    "setItem:function(k,v){data[String(k)]=String(v);},removeItem:function(k){delete data[String(k)];},clear:function(){data={};},key:function(i){return Object.keys(data)[i]||null;}}});}catch(e){}}",
    // The router reloads on its own (once per distinct error). Send that decision to the shared budget instead.
    "try{var SP=W.Storage&&W.Storage.prototype,gi=SP&&SP.getItem;if(gi&&!SP.__skinupGuard){SP.__skinupGuard=true;SP.getItem=function(k){if(typeof k==='string'&&k.indexOf('tanstack_router_reload:')===0)return '1';return gi.apply(this,arguments);};}}catch(e){}",
    "if(ss!=='ok'||ls!=='ok')B.report('storage_unavailable','sessionStorage='+ss+' localStorage='+ls,{sessionStorage:ss,localStorage:ls},'warning');",

    // ---- shared automatic-reload budget ----
    "function store(){try{var s=W.sessionStorage;return s&&!s.__skinupMemory?s:null;}catch(e){return null;}}",
    "B.claim=function(){var s=store();if(!s)return false;try{var now=Date.now(),last=Number(s.getItem(KEY)||0);",
    "if(last>0&&now-last>=0&&now-last<WIN)return false;s.setItem(KEY,String(now));return s.getItem(KEY)===String(now);}catch(e){return false;}};",
    "B.reloadOnce=function(kind){if(W.__skinupSubmitting)return false;if(!B.claim())return false;B.report(kind,'automatic reload',{autoReload:true},'warning');try{flush();}catch(e){}location.reload();return true;};",

    // ---- retry bar ----
    "function bar(){if(B.ready||D.getElementById('skinup-boot-bar'))return;if(!D.body){D.addEventListener('DOMContentLoaded',bar);return;}",
    "var lang=(D.documentElement.getAttribute('lang')||'fr').slice(0,2),t=TXT[lang]||TXT.fr;",
    "var el=D.createElement('div');el.id='skinup-boot-bar';el.setAttribute('role','alert');el.setAttribute('dir',lang==='ar'?'rtl':'ltr');",
    "el.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:16px;background:var(--card,#fff);color:var(--foreground,#1f1a17);border:1px solid var(--border,#e7e1da);box-shadow:0 10px 30px rgba(0,0,0,.18);font:600 14px/1.35 system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;';",
    "var p=D.createElement('span');p.textContent=t.title;var b=D.createElement('button');b.type='button';b.textContent=t.retry;",
    "b.style.cssText='flex:none;min-height:44px;padding:0 18px;border:0;border-radius:999px;background:var(--primary,#f26b1d);color:var(--primary-foreground,#fff);font:700 14px system-ui,-apple-system,sans-serif;cursor:pointer;';",
    "b.onclick=function(){location.reload();};el.appendChild(p);el.appendChild(b);D.body.appendChild(el);}",
    "B.showRetry=bar;",
    "B.markReady=function(){B.ready=true;var el=D.getElementById('skinup-boot-bar');if(el&&el.parentNode)el.parentNode.removeChild(el);};",
    "function fail(detail){if(B.ready||B.failed)return;setTimeout(function(){if(B.ready||B.failed)return;B.failed=true;B.report('entry_script_failed',detail);if(!B.reloadOnce('entry_script_failed'))bar();},300);}",

    // ---- detection ----
    "function appAsset(u){u=String(u||'');return u.indexOf('/assets/')===0||u.indexOf(location.origin+'/assets/')===0;}",
    "function path(u){u=String(u||'');var i=u.indexOf('/assets/');return i>=0?u.slice(i):clean(u);}",
    "W.addEventListener('error',function(e){try{var t=e&&e.target;",
    "if(t&&t!==W&&t.tagName){var u=t.src||t.href||'';if(!appAsset(u))return;",
    "if(t.tagName==='SCRIPT'){if(!B.ready)fail('Failed to load '+path(u));else B.report('route_import_failed','Failed to load '+path(u));}",
    "else if(t.tagName==='LINK'&&/modulepreload/i.test(t.rel||''))B.report(B.ready?'route_import_failed':'entry_preload_failed','Failed to preload '+path(u),null,'warning');return;}",
    "var m=String(e.message||(e.error&&e.error.message)||'');",
    "if(HYD.test(m)){var c=e.error&&e.error.cause;B.report('hydration_error',m.slice(0,60)+(c?' | cause: '+(c.message||c):''),null,'warning');return;}",
    "if(!B.ready&&appAsset(e.filename)&&/SyntaxError/i.test(m+' '+(e.error&&e.error.name)))fail(m);",
    "}catch(x){}},true);",
    "W.addEventListener('unhandledrejection',function(e){try{var r=e&&e.reason,m=String(r&&r.message||r||'');if(!CHUNK.test(m))return;if(!B.ready)fail(m);else B.report('route_import_failed',m);}catch(x){}});",
    // Vite reports failed preloads of page files here; recover before the error reaches the page.
    "W.addEventListener('vite:preloadError',function(e){try{var m=e&&e.payload&&e.payload.message||'preload failed';B.report('route_import_failed',m);if(B.reloadOnce('route_import_failed'))e.preventDefault();}catch(x){}});",
    // Startup watchdog: page fully loaded but the app never signalled it started.
    "function watch(){setTimeout(function(){if(B.ready||B.failed)return;B.report('startup_timeout','no startup signal '+STALL+'ms after load');bar();},STALL);}",
    "if(D.readyState==='complete')watch();else W.addEventListener('load',watch);",
    "}catch(e){}})();",
  ].join("");
}

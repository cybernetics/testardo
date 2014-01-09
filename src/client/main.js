this.$ = function(global) {
  function showResult(text) {
    var html = document.documentElement;
    html.style.background = text == 'OK' ? '#0F0' : '#F00';
    html.innerHTML = '<center><b>' + text + '</b></center>';
  }
  function addIframeOnLoad(callback) {
    iframe.onload = callback ?
      function () {
        onload();
        setTimeout(callback, 100, sandbox, window, document);
      } :
      onload
    ;
  }
  function createEvent(type) {
    var e;
    if (document.createEvent) {
      e = document.createEvent('Event');
      e.initEvent(type, true, true);
    } else {
      e = document.createEventObject();
      e._type = type;
    }
    return e;
  }
  function dispatch(node, evt) {
    if ('dispatchEvent' in node) {
      node.dispatchEvent(evt);
    } else {
      var type = evt._type;
      delete evt._type;
      evt.preventDefault = preventDefault;
      evt.stopPropagation = stopPropagation;
      node.fireEvent(type, evt);
    }
    return evt;
  }
  function preventDefault() {
    this.returnValue = false;
    this.defaultPrevented = true;
  }
  function stopPropagation() {
    this.cancelBubble = true;
  }
  function getNode(nodeOrQuery) {
    return typeof nodeOrQuery == 'string' ?
      document.querySelector(nodeOrQuery) :
      nodeOrQuery;
  }
  function onerror(message, lineno, filename) {
    alert([message, lineno, filename].join('\n'));
  }
  function error(e) {
    var message;
    if (e instanceof Error) {
      message = e.message + (
        e.stack ? '\n' + e.stack : ''
      );
    }
    showResult(message);
    sandbox.error(message);
  }
  function onload() {
    iframe.onload = onUncaughtLoad;
    updateReferences();
  }
  function onUncaughtLoad() {
    var onload = sandbox.onload;
    sandbox.onload = null;
    updateReferences();
    if (onload) {
      setTimeout(function () {
        onload.call(sandbox, window, document);
      }, 100);
    }
  }
  function updateReferences() {
    var html, context;
    sandbox.window = window = frames[0];
    sandbox.document = document = window.document;
    // necessary to avoid problems with non respected
    //  viewport size inside the iframe
    html = document.documentElement;
    if (!html.style.width) {
      html.style.width = WIDTH + 'px';
    }
    // necessary for very old browsers
    if (!NATIVE_SELECTOR) {
      (function(){
        /*!
          * @preserve Qwery - A Blazing Fast query selector engine
          * https://github.com/ded/qwery
          * copyright Dustin Diaz 2012
          * MIT License
          */
        (function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(n):t[e]=n()})("qwery",this,function(){function L(){this.c={}}function D(e){return A.g(e)||A.s(e,"(^|\\s+)"+e+"(\\s+|$)",1)}function P(e,t){var n=0,r=e.length;for(;n<r;n++)t(e[n])}function H(e){for(var t=[],n=0,r=e.length;n<r;++n)$(e[n])?t=t.concat(e[n]):t[t.length]=e[n];return t}function B(e){var t=0,n=e.length,r=[];for(;t<n;t++)r[t]=e[t];return r}function j(e){while(e=e.previousSibling)if(e[u]==1)break;return e}function F(e){return e.match(C)}function I(e,t,n,r,i,s,a,c,h,p,d){var v,m,g,y,b;if(this[u]!==1)return!1;if(t&&t!=="*"&&this[o]&&this[o].toLowerCase()!==t)return!1;if(n&&(m=n.match(f))&&m[1]!==this.id)return!1;if(n&&(b=n.match(l)))for(v=b.length;v--;)if(!D(b[v].slice(1)).test(this.className))return!1;if(h&&Q.pseudos[h]&&!Q.pseudos[h](this,d))return!1;if(r&&!a){y=this.attributes;for(g in y)if(Object.prototype.hasOwnProperty.call(y,g)&&(y[g].name||g)==i)return this}return r&&!R(s,Z(this,i)||"",a)?!1:this}function q(e){return O.g(e)||O.s(e,e.replace(b,"\\$1"))}function R(e,t,n){switch(e){case"=":return t==n;case"^=":return t.match(M.g("^="+n)||M.s("^="+n,"^"+q(n),1));case"$=":return t.match(M.g("$="+n)||M.s("$="+n,q(n)+"$",1));case"*=":return t.match(M.g(n)||M.s(n,q(n),1));case"~=":return t.match(M.g("~="+n)||M.s("~="+n,"(?:^|\\s+)"+q(n)+"(?:\\s+|$)",1));case"|=":return t.match(M.g("|="+n)||M.s("|="+n,"^"+q(n)+"(-|$)",1))}return 0}function U(e,t){var n=[],i=[],s,a,f,l,h,p,d,v,m=t,g=_.g(e)||_.s(e,e.split(N)),y=e.match(T);if(!g.length)return n;l=(g=g.slice(0)).pop(),g.length&&(f=g[g.length-1].match(c))&&(m=K(t,f[1]));if(!m)return n;d=F(l),p=m!==t&&m[u]!==9&&y&&/^[+~]$/.test(y[y.length-1])?function(e){while(m=m.nextSibling)m[u]==1&&(d[1]?d[1]==m[o].toLowerCase():1)&&(e[e.length]=m);return e}([]):m[r](d[1]||"*");for(s=0,a=p.length;s<a;s++)if(v=I.apply(p[s],d))n[n.length]=v;return g.length?(P(n,function(e){W(e,g,y)&&(i[i.length]=e)}),i):n}function z(e,t,n){if(X(t))return e==t;if($(t))return!!~H(t).indexOf(e);var r=t.split(","),i,s;while(t=r.pop()){i=_.g(t)||_.s(t,t.split(N)),s=t.match(T),i=i.slice(0);if(I.apply(e,F(i.pop()))&&(!i.length||W(e,i,s,n)))return!0}return!1}function W(e,t,n,r){function s(e,r,o){while(o=k[n[r]](o,e))if(X(o)&&I.apply(o,F(t[r]))){if(!r)return o;if(i=s(o,r-1,o))return i}}var i;return(i=s(e,t.length-1,e))&&(!r||Y(i,r))}function X(e,t){return e&&typeof e=="object"&&(t=e[u])&&(t==1||t==9)}function V(e){var t=[],n,r;e:for(n=0;n<e.length;++n){for(r=0;r<t.length;++r)if(t[r]==e[n])continue e;t[t.length]=e[n]}return t}function $(e){return typeof e=="object"&&isFinite(e.length)}function J(t){return t?typeof t=="string"?Q(t)[0]:!t[u]&&$(t)?t[0]:t:e}function K(e,t,n){return e[u]===9?e.getElementById(t):e.ownerDocument&&((n=e.ownerDocument.getElementById(t))&&Y(n,e)&&n||!Y(e,e.ownerDocument)&&a('[id="'+t+'"]',e)[0])}function Q(e,t){var i,s,o=J(t);if(!o||!e)return[];if(e===window||X(e))return!t||e!==window&&X(o)&&Y(e,o)?[e]:[];if(e&&$(e))return H(e);if(i=e.match(x)){if(i[1])return(s=K(o,i[1]))?[s]:[];if(i[2])return B(o[r](i[2]));if(et&&i[3])return B(o[n](i[3]))}return a(e,o)}function G(e,t){return function(n){var r,i;if(v.test(n)){e[u]!==9&&((i=r=e.getAttribute("id"))||e.setAttribute("id",i="__qwerymeupscotty"),n='[id="'+i+'"]'+n,t(e.parentNode||e,n,!0),r||e.removeAttribute("id"));return}n.length&&t(e,n,!1)}}var e=document,t=e.documentElement,n="getElementsByClassName",r="getElementsByTagName",i="querySelectorAll",s="useNativeQSA",o="tagName",u="nodeType",a,f=/#([\w\-]+)/,l=/\.[\w\-]+/g,c=/^#([\w\-]+)$/,h=/^\.([\w\-]+)$/,p=/^([\w\-]+)$/,d=/^([\w]+)?\.([\w\-]+)$/,v=/(^|,)\s*[>~+]/,m=/^\s+|\s*([,\s\+\~>]|$)\s*/g,g=/[\s\>\+\~]/,y=/(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,b=/([.*+?\^=!:${}()|\[\]\/\\])/g,w=/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,E=/\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,S=/:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,x=new RegExp(c.source+"|"+p.source+"|"+h.source),T=new RegExp("("+g.source+")"+y.source,"g"),N=new RegExp(g.source+y.source),C=new RegExp(w.source+"("+E.source+")?"+"("+S.source+")?"),k={" ":function(e){return e&&e!==t&&e.parentNode},">":function(e,t){return e&&e.parentNode==t.parentNode&&e.parentNode},"~":function(e){return e&&e.previousSibling},"+":function(e,t,n,r){return e?(n=j(e))&&(r=j(t))&&n==r&&n:!1}};L.prototype={g:function(e){return this.c[e]||undefined},s:function(e,t,n){return t=n?new RegExp(t):t,this.c[e]=t}};var A=new L,O=new L,M=new L,_=new L,Y="compareDocumentPosition"in t?function(e,t){return(t.compareDocumentPosition(e)&16)==16}:"contains"in t?function(e,n){return n=n[u]===9||n==window?t:n,n!==e&&n.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0},Z=function(){var t=e.createElement("p");return(t.innerHTML='<a href="#x">x</a>')&&t.firstChild.getAttribute("href")!="#x"?function(e,t){return t==="class"?e.className:t==="href"||t==="src"?e.getAttribute(t,2):e.getAttribute(t)}:function(e,t){return e.getAttribute(t)}}(),et=!!e[n],tt=e.querySelector&&e[i],nt=function(e,t){var n=[],r,s;try{return t[u]===9||!v.test(e)?B(t[i](e)):(P(r=e.split(","),G(t,function(e,t){s=e[i](t),s.length==1?n[n.length]=s.item(0):s.length&&(n=n.concat(B(s)))})),r.length>1&&n.length>1?V(n):n)}catch(o){}return rt(e,t)},rt=function(e,t){var n=[],i,s,o,a,f,l;e=e.replace(m,"$1");if(s=e.match(d)){f=D(s[2]),i=t[r](s[1]||"*");for(o=0,a=i.length;o<a;o++)f.test(i[o].className)&&(n[n.length]=i[o]);return n}return P(l=e.split(","),G(t,function(e,r,i){f=U(r,e);for(o=0,a=f.length;o<a;o++)if(e[u]===9||i||Y(f[o],t))n[n.length]=f[o]})),l.length>1&&n.length>1?V(n):n},it=function(e){typeof e[s]!="undefined"&&(a=e[s]?tt?nt:rt:rt)};return it({useNativeQSA:!0}),Q.configure=it,Q.uniq=V,Q.is=z,Q.pseudos={},Q})
      }.call(context = {}));
      queryAll = context.qwery;
    }
    window.onerror = onerror;
    window.addEventListener('error', error, true);
  }
  function XHR() {
    return global.XMLHttpRequest ?
      new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHTTP');
  }
  var
    NATIVE_SELECTOR = !!global.document.querySelectorAll,
    WIDTH = (
      global.innerWidth ||
      document.documentElement.offsetWidth ||
      document.body.offsetWidth
    ),
    TIMEOUT = $.timeout,
    LOOP = $.loop,
    tests = $.tests,
    errors = [],
    lastFile = '',
    lastAction = '',
    lastCallback = null,
    timer = 0,
    iframe = global.document.getElementsByTagName('iframe')[0],
    window = frames[0],
    document = window.document,
    sandbox = {
      query: function (css, parent) {
        return sandbox.queryAll(css, parent)[0];
      },
      queryAll: NATIVE_SELECTOR ?
        function (css, parent) {
          return (parent || document).querySelectorAll(css);
        } :
        function (css, parent) {
          return queryAll(css, parent);
        },
      window: window,
      document: document,
      event: function (type, options) {
        var e = createEvent(type);
        if (options) {
          e.detail = options;
          for(var key in options) {
            if (options.hasOwnProperty(key)) {
              try {
                e[key] = options[key];
              } catch(o_O) {}
            }
          }
        }
        return e;
      },
      dispatch: function (nodeOrQuery, typeOrEvent, eventOptions) {
        return dispatch(
          getNode(nodeOrQuery),
          typeof typeOrEvent == 'string' ?
            sandbox.event(typeOrEvent, eventOptions || {}) :
            typeOrEvent
        );
      },
      then: function (callback) {
        switch(lastAction) {
          case 'load':
            addIframeOnLoad(callback);
            break;
          case 'write':
            lastCallback = callback;
            break;
        }
      },
      loadFromDifferentDomain: function(href, callback) {
        sandbox.status = 0;
        addIframeOnLoad(callback);
        window.location.href = '/' + encodeURIComponent('<<<' + href);
        lastAction = 'load';
        return sandbox;
      },
      load: function (href, callback) {
        var xhr = XHR();
        xhr.open('HEAD', href, false);
        xhr.send(null);
        sandbox.status = xhr.status;
        addIframeOnLoad(callback);
        window.location.href = href;
        lastAction = 'load';
        return sandbox;
      },
      write: function (nodeOrQuery, text, callback) {
        for(var
          goOnIfNotPrevented = function (type, options) {
            if (!evt.defaultPrevented) {
              evt = sandbox.dispatch(node, type, options);
            }
          },
          put = function(i) {
            var
              c = chars[i],
              code = c.charCodeAt(0),
              options = {
                charCode: code,
                keyCode: code,
                which: code,
                'char': c,
                key: c
              }
            ;
            goOnIfNotPrevented('keydown', options);
            goOnIfNotPrevented('keypress', options);
            goOnIfNotPrevented('keyup', options);
            if (!evt.defaultPrevented && node.value.length === i) {
              node.value += c;
            }
            if (i === chars.length - 1) {
              setTimeout(
                callback || lastCallback,
                100, sandbox, window, document
              );
            }
            evt = {};
          },
          evt = {},
          node = getNode(nodeOrQuery),
          chars = text.split(''),
          i = 0; i < chars.length; i++
        ) {
          setTimeout(put, i * 100, i);
        }
        lastAction = 'write';
        return sandbox;
      }
    },
    queryAll
  ;
  delete global.$;
  global.addEventListener('error', error, true);
  iframe.setAttribute('width', iframe.width = WIDTH);
  iframe.style.width = WIDTH + 'px';
  (function test() {
    function error(message) {
      errors.push(message);
      test();
    }
    var
      file = tests.shift(),
      xhr = XHR(),
      module
    ;
    clearTimeout(timer);
    timer = 0;
    if (file) {
      lastFile = file.name;
      sandbox.error = error;
      sandbox.done = test;
      try {
        module = {};
        Function('window,module', file.content).call(window, window, module);
        if (typeof module.exports === 'function') {
          module.exports = {
            test: module.exports
          };
        }
        sandbox.load(module.exports.path || '/', function () {
          timer = setTimeout(error, TIMEOUT, 'Expired');
          module.exports.test.apply(module.exports, arguments);
        });
      } catch(o_O) {
        error(o_O.message);
      }
    } else if(errors.length) {
      xhr.open('GET', '!' + escape(
        JSON.stringify(
          [
            '[file] ' + lastFile,
            '[user] ' + navigator.userAgent
          ].concat(errors)
        )
      ), false);
      xhr.send(null);
    } else {
      xhr.open('GET', '*' + new Date * 1, false);
      xhr.send(null);
      if (LOOP) {
        setTimeout(function(){
          top.location.reload();
        }, 10000);
      }
      showResult('OK');
    }
  }());
};
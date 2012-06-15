/*
    QuoJS 2.0.1
    http://quojs.tapquo.com

    Generated by CoffeeScript 1.3.1

    Copyright (C) 2011,2012 Javi Jiménez Villar (@soyjavi)

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/

(function() {
  var Quo;

  Quo = (function() {
    var $$, EMPTY_ARRAY, Q;
    EMPTY_ARRAY = [];
    Q = function(dom, selector) {
      dom = dom || EMPTY_ARRAY;
      dom.__proto__ = Q.prototype;
      dom.selector = selector || '';
      return dom;
    };
    $$ = function(selector) {
      var domain_selector;
      if (!selector) {
        return Q();
      } else {
        domain_selector = $$.getDomainSelector(selector);
        return Q(domain_selector, selector);
      }
    };
    $$.extend = function(target) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        var key, _results;
        _results = [];
        for (key in source) {
          _results.push(target[key] = source[key]);
        }
        return _results;
      });
      return target;
    };
    Q.prototype = $$.fn = {};
    return $$;
  })();

  window.Quo = Quo;

  "$$" in window || (window.$$ = Quo);

}).call(this);

(function() {

  (function($$) {
    var EMPTY_ARRAY, OBJECT_PROTOTYPE, _compact, _flatten;
    EMPTY_ARRAY = [];
    OBJECT_PROTOTYPE = Object.prototype;
    $$.toType = function(obj) {
      return OBJECT_PROTOTYPE.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };
    $$.isOwnProperty = function(object, property) {
      return OBJECT_PROTOTYPE.hasOwnProperty.call(object, property);
    };
    $$.getDomainSelector = function(selector) {
      var domain, elementTypes, type;
      domain = null;
      elementTypes = [1, 9, 11];
      type = $$.toType(selector);
      if (type === "array") {
        domain = _compact(selector);
      } else if (type === "string") {
        domain = $$.query(document, selector);
      } else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) {
        domain = [selector];
        selector = null;
      }
      return domain;
    };
    $$.map = function(elements, callback) {
      var i, key, value, values;
      values = [];
      i = void 0;
      key = void 0;
      if ($$.toType(elements) === "array") {
        i = 0;
        while (i < elements.length) {
          value = callback(elements[i], i);
          if (value != null) {
            values.push(value);
          }
          i++;
        }
      } else {
        for (key in elements) {
          value = callback(elements[key], key);
          if (value != null) {
            values.push(value);
          }
        }
      }
      return _flatten(values);
    };
    $$.each = function(elements, callback) {
      var i, key;
      i = void 0;
      key = void 0;
      if ($$.toType(elements) === "array") {
        i = 0;
        while (i < elements.length) {
          if (callback.call(elements[i], i, elements[i]) === false) {
            return elements;
          }
          i++;
        }
      } else {
        for (key in elements) {
          if (callback.call(elements[key], key, elements[key]) === false) {
            return elements;
          }
        }
      }
      return elements;
    };
    $$.mix = function() {
      var arg, argument, child, len, prop;
      child = {};
      arg = 0;
      len = arguments.length;
      while (arg < len) {
        argument = arguments[arg];
        for (prop in argument) {
          if ($$.isOwnProperty(argument, prop) && argument[prop] !== undefined) {
            child[prop] = argument[prop];
          }
        }
        arg++;
      }
      return child;
    };
    $$.fn.map = function(fn) {
      return $$.map(this, function(el, i) {
        return fn.call(el, i, el);
      });
    };
    $$.fn.instance = function(property) {
      return this.map(function() {
        return this[property];
      });
    };
    $$.fn.filter = function(selector) {
      return $$([].filter.call(this, function(element) {
        return element.parentNode && $$.query(element.parentNode, selector).indexOf(element) >= 0;
      }));
    };
    $$.fn.forEach = EMPTY_ARRAY.forEach;
    $$.fn.indexOf = EMPTY_ARRAY.indexOf;
    _compact = function(array) {
      return array.filter(function(item) {
        return item !== void 0 && item !== null;
      });
    };
    _flatten = function(array) {
      if (array.length > 0) {
        return [].concat.apply([], array);
      } else {
        return array;
      }
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    $$.fn.attr = function(name, value) {
      if ($$.toType(name) === "string" && value === void 0) {
        return this[0].getAttribute(name);
      } else {
        return this.each(function() {
          return this.setAttribute(name, value);
        });
      }
    };
    $$.fn.data = function(name, value) {
      return this.attr("data-" + name, value);
    };
    $$.fn.val = function(value) {
      if ($$.toType(value) === "string") {
        return this.each(function() {
          return this.value = value;
        });
      } else {
        if (this.length > 0) {
          return this[0].value;
        } else {
          return null;
        }
      }
    };
    $$.fn.show = function() {
      return this.style("display", "block");
    };
    $$.fn.hide = function() {
      return this.style("display", "none");
    };
    $$.fn.height = function() {
      var offset;
      offset = this.offset();
      return offset.height;
    };
    $$.fn.width = function() {
      var offset;
      offset = this.offset();
      return offset.width;
    };
    $$.fn.offset = function() {
      var bounding;
      bounding = this[0].getBoundingClientRect();
      return {
        left: bounding.left + window.pageXOffset,
        top: bounding.top + window.pageYOffset,
        width: bounding.width,
        height: bounding.height
      };
    };
    $$.fn.remove = function() {
      return this.each(function() {
        if (this.parentNode != null) {
          return this.parentNode.removeChild(this);
        }
      });
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var IS_WEBKIT, SUPPORTED_OS, _current, _detectBrowser, _detectEnvironment, _detectOS, _detectScreen;
    _current = null;
    IS_WEBKIT = /WebKit\/([\d.]+)/;
    SUPPORTED_OS = {
      Android: /(Android)\s+([\d.]+)/,
      ipad: /(iPad).*OS\s([\d_]+)/,
      iphone: /(iPhone\sOS)\s([\d_]+)/,
      blackberry: /(BlackBerry).*Version\/([\d.]+)/,
      webos: /(webOS|hpwOS)[\s\/]([\d.]+)/
    };
    $$.isMobile = function() {
      _current = _current || _detectEnvironment();
      return _current.isMobile;
    };
    $$.environment = function() {
      _current = _current || _detectEnvironment();
      return _current;
    };
    $$.isOnline = function() {
      return navigator.onLine;
    };
    _detectEnvironment = function() {
      var environment, user_agent;
      user_agent = navigator.userAgent;
      environment = {};
      environment.browser = _detectBrowser(user_agent);
      environment.os = _detectOS(user_agent);
      environment.isMobile = (environment.os ? true : false);
      environment.screen = _detectScreen();
      return environment;
    };
    _detectBrowser = function(user_agent) {
      var is_webkit;
      is_webkit = user_agent.match(IS_WEBKIT);
      if (is_webkit) {
        return is_webkit[0];
      } else {
        return user_agent;
      }
    };
    _detectOS = function(user_agent) {
      var detected_os, os, supported;
      detected_os = void 0;
      for (os in SUPPORTED_OS) {
        supported = user_agent.match(SUPPORTED_OS[os]);
        if (supported) {
          detected_os = {
            name: (os === "iphone" || os === "ipad" ? "ios" : os),
            version: supported[2].replace("_", ".")
          };
          break;
        }
      }
      return detected_os;
    };
    _detectScreen = function() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var _priv;
    $$.fn.text = function(value) {
      if (!value) {
        return this[0].textContent;
      } else {
        return this.each(function() {
          return this.textContent = value;
        });
      }
    };
    $$.fn.html = function(value) {
      var type;
      type = $$.toType(value);
      if (type === "string" || type === "number") {
        return this.each(function() {
          return this.innerHTML = value;
        });
      } else {
        return this[0].innerHTML;
      }
    };
    $$.fn.append = function(value) {
      return this.each(function() {
        var div;
        if ($$.toType(value) === "string") {
          if (value) {
            div = document.createElement("div");
            div.innerHTML = value;
            return this.appendChild(div.firstChild);
          }
        } else {
          return this.insertBefore(value);
        }
      });
    };
    $$.fn.prepend = function(value) {
      return this.each(function() {
        var parent;
        if ($$.toType(value) === "string") {
          return this.innerHTML = value + this.innerHTML;
        } else {
          parent = this.parentNode;
          return parent.insertBefore(value, parent.firstChild);
        }
      });
    };
    $$.fn.empty = function() {
      return this.each(function() {
        this.innerHTML = null;
      });
    };
    _priv = function() {
      return true;
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var PARENT_NODE, _filtered, _findAncestors;
    PARENT_NODE = "parentNode";
    $$.query = function(domain, selector) {
      var dom_elements;
      dom_elements = document.querySelectorAll(selector);
      dom_elements = Array.prototype.slice.call(dom_elements);
      return dom_elements;
    };
    $$.fn.find = function(selector) {
      var result;
      result = void 0;
      if (this.length === 1) {
        result = Quo.query(this[0], selector);
      } else {
        result = this.map(function() {
          return Quo.query(this, selector);
        });
      }
      return $$(result);
    };
    $$.fn.parent = function(selector) {
      var ancestors;
      ancestors = (selector ? _findAncestors(this) : this.instance(PARENT_NODE));
      return _filtered(ancestors, selector);
    };
    $$.fn.siblings = function(selector) {
      var siblings_elements;
      siblings_elements = this.map(function(index, element) {
        return Array.prototype.slice.call(element.parentNode.children).filter(function(child) {
          return child !== element;
        });
      });
      return _filtered(siblings_elements, selector);
    };
    $$.fn.children = function(selector) {
      var children_elements;
      children_elements = this.map(function() {
        return Array.prototype.slice.call(this.children);
      });
      return _filtered(children_elements, selector);
    };
    $$.fn.get = function(index) {
      if (index === undefined) {
        return this;
      } else {
        return this[index];
      }
    };
    $$.fn.first = function() {
      return $$(this[0]);
    };
    $$.fn.last = function() {
      var last_element_index;
      last_element_index = this.length - 1;
      return $$(this[last_element_index]);
    };
    $$.fn.closest = function(selector, context) {
      var candidates, node;
      node = this[0];
      candidates = $$(selector);
      if (!candidates.length) {
        node = null;
      }
      while (node && candidates.indexOf(node) < 0) {
        node = node !== context && node !== document && node.parentNode;
      }
      return $$(node);
    };
    $$.fn.each = function(callback) {
      this.forEach(function(element, index) {
        return callback.call(element, index, element);
      });
      return this;
    };
    _findAncestors = function(nodes) {
      var ancestors;
      ancestors = [];
      while (nodes.length > 0) {
        nodes = $$.map(nodes, function(node) {
          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }
      return ancestors;
    };
    _filtered = function(nodes, selector) {
      if (selector === undefined) {
        return $$(nodes);
      } else {
        return $$(nodes).filter(selector);
      }
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var _computedStyle, _existsClass;
    $$.fn.addClass = function(name) {
      return this.each(function() {
        if (!_existsClass(name, this.className)) {
          this.className += " " + name;
          return this.className = this.className.trim();
        }
      });
    };
    $$.fn.removeClass = function(name) {
      return this.each(function() {
        if (_existsClass(name, this.className)) {
          return this.className = this.className.replace(name, " ").replace(/\s+/g, " ").trim();
        }
      });
    };
    $$.fn.toggleClass = function(name) {
      return this.each(function() {
        if (_existsClass(name, this.className)) {
          return this.className = this.className.replace(name, " ");
        } else {
          this.className += " " + name;
          return this.className = this.className.trim();
        }
      });
    };
    $$.fn.hasClass = function(name) {
      return _existsClass(name, this[0].className);
    };
    $$.fn.style = function(property, value) {
      if (!value) {
        return this[0].style[property] || _computedStyle(this[0], property);
      } else {
        return this.each(function() {
          return this.style[property] = value;
        });
      }
    };
    _existsClass = function(name, className) {
      var classes;
      classes = className.split(/\s+/g);
      return classes.indexOf(name) >= 0;
    };
    _computedStyle = function(element, property) {
      return document.defaultView.getComputedStyle(element, "")[property];
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var DEFAULT, JSONP_ID, MIME_TYPES, _isJsonP, _parseResponse, _xhrError, _xhrHeaders, _xhrStatus, _xhrSuccess, _xhrTimeout;
    DEFAULT = {
      TYPE: "GET",
      MIME: "json"
    };
    MIME_TYPES = {
      script: "text/javascript, application/javascript",
      json: "application/json",
      xml: "application/xml, text/xml",
      html: "text/html",
      text: "text/plain"
    };
    JSONP_ID = 0;
    $$.ajaxSettings = {
      type: DEFAULT.TYPE,
      async: true,
      success: {},
      error: {},
      context: null,
      dataType: DEFAULT.MIME,
      headers: {},
      xhr: function() {
        return new window.XMLHttpRequest();
      },
      crossDomain: false,
      timeout: 0
    };
    $$.ajax = function(options) {
      var abortTimeout, settings, xhr;
      settings = $$.mix($$.ajaxSettings, options);
      if (_isJsonP(settings.url)) {
        return $$.jsonp(settings);
      }
      xhr = settings.xhr();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          clearTimeout(abortTimeout);
          return _xhrStatus(xhr, settings);
        }
      };
      xhr.open(settings.type, settings.url, settings.async);
      _xhrHeaders(xhr, settings);
      if (settings.timeout > 0) {
        abortTimeout = setTimeout(function() {
          return _xhrTimeout(xhr, settings);
        }, settings.timeout);
      }
      xhr.send(settings.data);
      if (settings.async) {
        return xhr;
      } else {
        return _parseResponse(xhr, settings);
      }
    };
    $$.jsonp = function(settings) {
      var abortTimeout, callbackName, script, xhr;
      if (settings.async) {
        callbackName = "jsonp" + (++JSONP_ID);
        script = document.createElement("script");
        xhr = {
          abort: function() {
            $$(script).remove();
            if (callbackName in window) {
              return window[callbackName] = {};
            }
          }
        };
        abortTimeout = void 0;
        window[callbackName] = function(response) {
          clearTimeout(abortTimeout);
          $$(script).remove();
          delete window[callbackName];
          return _xhrSuccess(response, xhr, settings);
        };
        script.src = settings.url.replace(RegExp("=\\?"), "=" + callbackName);
        $$("head").append(script);
        if (settings.timeout > 0) {
          abortTimeout = setTimeout(function() {
            return _xhrTimeout(xhr, settings);
          }, settings.timeout);
        }
        return xhr;
      } else {
        return console.error("ERROR: Unable to make jsonp synchronous call.");
      }
    };
    $$.get = function(url, data, success, dataType) {
      url += $$.serializeParameters(data);
      return $$.ajax({
        url: url,
        success: success,
        dataType: dataType
      });
    };
    $$.post = function(url, data, success, dataType) {
      return $$.ajax({
        type: "POST",
        url: url,
        data: data,
        success: success,
        dataType: dataType,
        contentType: "application/x-www-form-urlencoded"
      });
    };
    $$.json = function(url, data, success) {
      url += $$.serializeParameters(data);
      return $$.ajax({
        url: url,
        success: success,
        dataType: DEFAULT.MIME
      });
    };
    $$.serializeParameters = function(parameters) {
      var parameter, serialize;
      serialize = "?";
      for (parameter in parameters) {
        if (parameters.hasOwnProperty(parameter)) {
          if (serialize !== "?") {
            serialize += "&";
          }
          serialize += parameter + "=" + parameters[parameter];
        }
      }
      if (serialize === "?") {
        return "";
      } else {
        return serialize;
      }
    };
    _xhrStatus = function(xhr, settings) {
      if (xhr.status === 200 || xhr.status === 0) {
        if (settings.async) {
          _xhrSuccess(_parseResponse(xhr, settings), xhr, settings);
        }
      } else {
        _xhrError("QuoJS » $$.ajax", xhr, settings);
      }
    };
    _xhrSuccess = function(response, xhr, settings) {
      settings.success.call(settings.context, response, xhr);
    };
    _xhrError = function(type, xhr, settings) {
      settings.error.call(settings.context, type, xhr, settings);
    };
    _xhrHeaders = function(xhr, settings) {
      var header;
      if (settings.contentType) {
        settings.headers["Content-Type"] = settings.contentType;
      }
      if (settings.dataType) {
        settings.headers["Accept"] = MIME_TYPES[settings.dataType];
      }
      for (header in settings.headers) {
        xhr.setRequestHeader(header, settings.headers[header]);
      }
    };
    _xhrTimeout = function(xhr, settings) {
      xhr.onreadystatechange = {};
      xhr.abort();
      _xhrError("QuoJS » $$.ajax : timeout exceeded", xhr, settings);
    };
    _parseResponse = function(xhr, settings) {
      var response;
      response = xhr.responseText;
      if (response) {
        if (settings.dataType === DEFAULT.MIME) {
          try {
            response = JSON.parse(response);
          } catch (error) {
            response = error;
            _xhrError("Parse Error", xhr, settings);
          }
        } else {
          if (settings.dataType === "xml") {
            response = xhr.responseXML;
          }
        }
      }
      return response;
    };
    _isJsonP = function(url) {
      return RegExp("=\\?").test(url);
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var READY_EXPRESSION, SHORTCUTS, SHORTCUTS_EVENTS;
    READY_EXPRESSION = /complete|loaded|interactive/;
    SHORTCUTS = ["touch", "tap"];
    SHORTCUTS_EVENTS = {
      touch: "touchstart",
      tap: "tap"
    };
    SHORTCUTS.forEach(function(event) {
      $$.fn[event] = function(callback) {
        return $$(document.body).delegate(this.selector, SHORTCUTS_EVENTS[event], callback);
      };
      return this;
    });
    $$.fn.on = function(event, selector, callback) {
      if (selector === undefined || $$.toType(selector) === "function") {
        return this.bind(event, selector);
      } else {
        return this.delegate(selector, event, callback);
      }
    };
    $$.fn.off = function(event, selector, callback) {
      if (selector === undefined || $$.toType(selector) === "function") {
        return this.unbind(event, selector);
      } else {
        return this.undelegate(selector, event, callback);
      }
    };
    $$.fn.ready = function(callback) {
      if (READY_EXPRESSION.test(document.readyState)) {
        callback($$);
      } else {
        $$.fn.addEvent(document, "DOMContentLoaded", function() {
          return callback($$);
        });
      }
      return this;
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var ELEMENT_ID, EVENTS_DESKTOP, EVENT_METHODS, HANDLERS, _createProxy, _createProxyCallback, _environmentEvent, _findHandlers, _getElementId, _subscribe, _unsubscribe;
    ELEMENT_ID = 1;
    HANDLERS = {};
    EVENT_METHODS = {
      preventDefault: "isDefaultPrevented",
      stopImmediatePropagation: "isImmediatePropagationStopped",
      stopPropagation: "isPropagationStopped"
    };
    EVENTS_DESKTOP = {
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup",
      tap: "click",
      doubletap: "dblclick",
      orientationchange: "resize"
    };
    $$.Event = function(type, touch) {
      var event;
      event = document.createEvent("Events");
      event.initEvent(type, true, true, null, null, null, null, null, null, null, null, null, null, null, null);
      if (touch) {
        event.pageX = touch.x1;
        event.pageY = touch.y1;
        event.toX = touch.x2;
        event.toY = touch.y2;
        event.fingers = touch.fingers;
      }
      return event;
    };
    $$.fn.bind = function(event, callback) {
      return this.each(function() {
        _subscribe(this, event, callback);
      });
    };
    $$.fn.unbind = function(event, callback) {
      return this.each(function() {
        _unsubscribe(this, event, callback);
      });
    };
    $$.fn.delegate = function(selector, event, callback) {
      return this.each(function(i, element) {
        _subscribe(element, event, callback, selector, function(fn) {
          return function(e) {
            var evt, match;
            match = $$(e.target).closest(selector, element).get(0);
            if (match) {
              evt = $$.extend(_createProxy(e), {
                currentTarget: match,
                liveFired: element
              });
              return fn.apply(match, [evt].concat([].slice.call(arguments, 1)));
            }
          };
        });
      });
    };
    $$.fn.undelegate = function(selector, event, callback) {
      return this.each(function() {
        _unsubscribe(this, event, callback, selector);
      });
    };
    $$.fn.trigger = function(event, touch) {
      if ($$.toType(event) === "string") {
        event = $$.Event(event, touch);
      }
      return this.each(function() {
        this.dispatchEvent(event);
      });
    };
    $$.fn.addEvent = function(element, event_name, callback) {
      if (element.addEventListener) {
        return element.addEventListener(event_name, callback, false);
      } else if (element.attachEvent) {
        return element.attachEvent("on" + event_name, callback);
      } else {
        return element["on" + event_name] = callback;
      }
    };
    $$.fn.removeEvent = function(element, event_name, callback) {
      if (element.removeEventListener) {
        return element.removeEventListener(event_name, callback, false);
      } else if (element.detachEvent) {
        return element.detachEvent("on" + event_name, callback);
      } else {
        return element["on" + event_name] = null;
      }
    };
    _subscribe = function(element, event, callback, selector, delegate_callback) {
      var delegate, element_handlers, element_id, handler;
      event = _environmentEvent(event);
      element_id = _getElementId(element);
      element_handlers = HANDLERS[element_id] || (HANDLERS[element_id] = []);
      delegate = delegate_callback && delegate_callback(callback, event);
      handler = {
        event: event,
        callback: callback,
        selector: selector,
        proxy: _createProxyCallback(delegate, callback, element),
        delegate: delegate,
        index: element_handlers.length
      };
      element_handlers.push(handler);
      return $$.fn.addEvent(element, handler.event, handler.proxy);
    };
    _unsubscribe = function(element, event, callback, selector) {
      var element_id;
      event = _environmentEvent(event);
      element_id = _getElementId(element);
      return _findHandlers(element_id, event, callback, selector).forEach(function(handler) {
        delete HANDLERS[element_id][handler.index];
        return $$.fn.removeEvent(element, handler.event, handler.proxy);
      });
    };
    _getElementId = function(element) {
      return element._id || (element._id = ELEMENT_ID++);
    };
    _environmentEvent = function(event) {
      var environment_event;
      environment_event = ($$.isMobile() ? event : EVENTS_DESKTOP[event]);
      return environment_event || event;
    };
    _createProxyCallback = function(delegate, callback, element) {
      var proxy;
      callback = delegate || callback;
      proxy = function(event) {
        var result;
        result = callback.apply(element, [event].concat(event.data));
        if (result === false) {
          event.preventDefault();
        }
        return result;
      };
      return proxy;
    };
    _findHandlers = function(element_id, event, fn, selector) {
      return (HANDLERS[element_id] || []).filter(function(handler) {
        return handler && (!event || handler.event === event) && (!fn || handler.fn === fn) && (!selector || handler.selector === selector);
      });
    };
    _createProxy = function(event) {
      var proxy;
      proxy = $$.extend({
        originalEvent: event
      }, event);
      $$.each(EVENT_METHODS, function(name, method) {
        proxy[name] = function() {
          this[method] = function() {
            return true;
          };
          return event[name].apply(event, arguments);
        };
        return proxy[method] = function() {
          return false;
        };
      });
      return proxy;
    };
  })(Quo);

}).call(this);

(function() {

  (function($$) {
    var GESTURES, HOLD_DELAY, TOUCH, TOUCH_TIMEOUT, _captureTouch, _cleanGesture, _countFingers, _hold, _isSwipe, _listenTouches, _onTouchEnd, _onTouchMove, _onTouchStart, _parentIfText, _swipeDirection, _trigger;
    TOUCH = {};
    TOUCH_TIMEOUT = void 0;
    HOLD_DELAY = 650;
    GESTURES = ["doubleTap", "hold", "swipe", "swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "drag"];
    GESTURES.forEach(function(event) {
      $$.fn[event] = function(callback) {
        return this.on(event, callback);
      };
    });
    $$(document).ready(function() {
      return _listenTouches();
    });
    _listenTouches = function() {
      var environment;
      environment = $$(document.body);
      environment.bind("touchstart", _onTouchStart);
      environment.bind("touchmove", _onTouchMove);
      environment.bind("touchend", _onTouchEnd);
      return environment.bind("touchcancel", _cleanGesture);
    };
    _onTouchStart = function(event) {
      var delta, now, touch_event;
      now = Date.now();
      delta = now - (TOUCH.last || now);
      touch_event = _captureTouch(event);
      TOUCH_TIMEOUT && clearTimeout(TOUCH_TIMEOUT);
      TOUCH = {
        el: $$(_parentIfText(touch_event.target)),
        x1: touch_event.pageX,
        y1: touch_event.pageY,
        isDoubleTap: (delta > 0 && delta <= 250 ? true : false),
        last: now,
        fingers: _countFingers(event)
      };
      return setTimeout(_hold, HOLD_DELAY);
    };
    _onTouchMove = function(event) {
      var touch_event;
      touch_event = _captureTouch(event);
      TOUCH.x2 = touch_event.pageX;
      TOUCH.y2 = touch_event.pageY;
      if (_isSwipe(event)) {
        return TOUCH.el.trigger("swiping", TOUCH);
      }
    };
    _onTouchEnd = function(event) {
      var swipe_direction;
      if (TOUCH.isDoubleTap) {
        return _trigger("doubleTap", true);
      } else if (TOUCH.x2 > 0 || TOUCH.y2 > 0) {
        if (_isSwipe(event)) {
          if (TOUCH.fingers === 1) {
            _trigger("swipe", false);
            swipe_direction = _swipeDirection(TOUCH.x1, TOUCH.x2, TOUCH.y1, TOUCH.y2);
            _trigger(swipe_direction, false);
          } else {
            _trigger("drag", false);
          }
        }
        return _cleanGesture();
      } else {
        if (TOUCH.el) {
          _trigger("tap");
        }
        return TOUCH_TIMEOUT = setTimeout(_cleanGesture, 250);
      }
    };
    _trigger = function(type, clean) {
      TOUCH.el.trigger(type, TOUCH);
      return clean && _cleanGesture();
    };
    _cleanGesture = function(event) {
      TOUCH = {};
      return clearTimeout(TOUCH_TIMEOUT);
    };
    _isSwipe = function(event) {
      return TOUCH.el && (Math.abs(TOUCH.x1 - TOUCH.x2) > 30 || Math.abs(TOUCH.y1 - TOUCH.y2) > 30);
    };
    _captureTouch = function(event) {
      if ($$.isMobile()) {
        return event.touches[0];
      } else {
        return event;
      }
    };
    _parentIfText = function(node) {
      if ("tagName" in node) {
        return node;
      } else {
        return node.parentNode;
      }
    };
    _swipeDirection = function(x1, x2, y1, y2) {
      var xDelta, yDelta;
      xDelta = Math.abs(x1 - x2);
      yDelta = Math.abs(y1 - y2);
      if (xDelta >= yDelta) {
        if (x1 - x2 > 0) {
          return "swipeLeft";
        } else {
          return "swipeRight";
        }
      } else {
        if (y1 - y2 > 0) {
          return "swipeUp";
        } else {
          return "swipeDown";
        }
      }
    };
    _hold = function() {
      if (TOUCH.last && (Date.now() - TOUCH.last >= HOLD_DELAY)) {
        _trigger("hold");
        _cleanGesture();
      }
    };
    _countFingers = function(event) {
      if (event.touches) {
        return event.touches.length;
      } else {
        return 1;
      }
    };
  })(Quo);

}).call(this);

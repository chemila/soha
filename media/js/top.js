var WBTopTray = (function() {
    var STK = (function() {
        var spec = {
            "dependCacheList": {},
            "importCacheStore": {},
            "importCacheList": [],
            "jobsCacheList": []
        };
        var that = {};
        var lastPoint = 1;
        var baseURL = "";
        var errorInfo = [];
        var register = function(ns, maker) {
            var path = ns.split(".");
            var curr = that;
            for (var i = 0, len = path.length; i < len; i += 1) {
                if (i == len - 1) {
                    if (curr[path[i]] !== undefined) {
                        throw ns + "has been register!!!"
                    }
                    curr[path[i]] = maker(that);
                    return true
                }
                if (curr[path[i]] === undefined) {
                    curr[path[i]] = {}
                }
                curr = curr[path[i]]
            }
        };
        var checkPath = function(ns) {
            var list = ns.split(".");
            var curr = that;
            for (var i = 0, len = list.length; i < len; i += 1) {
                if (curr[list[i]] === undefined) {
                    return false
                }
                curr = curr[list[i]]
            }
            return true
        };
        var checkDepend = function() {
            for (var k in spec.dependCacheList) {
                var loaded = true;
                for (var i = 0, len = spec.dependCacheList[k]["depend"].length; i < len; i += 1) {
                    if (!checkPath(spec.dependCacheList[k]["depend"][i])) {
                        loaded = false;
                        break
                    }
                }
                if (loaded) {
                    register.apply(that, spec.dependCacheList[k]["args"]);
                    delete spec.dependCacheList[k];
                    setTimeout(function() {
                        checkDepend()
                    }, 25)
                }
            }
        };
        var E = function(id) {
            if (typeof id === "string") {
                return document.getElementById(id)
            } else {
                return id
            }
        };
        var addEvent = function(sNode, sEventType, oFunc) {
            var oElement = E(sNode);
            if (oElement == null) {
                return
            }
            sEventType = sEventType || "click";
            if ((typeof oFunc).toLowerCase() != "function") {
                return
            }
            if (oElement.attachEvent) {
                oElement.attachEvent("on" + sEventType, oFunc)
            } else {
                if (oElement.addEventListener) {
                    oElement.addEventListener(sEventType, oFunc, false)
                } else {
                    oElement["on" + sEventType] = oFunc
                }
            }
        };
        that.inc = function(ns, undepended) {
            if (!spec.importCacheList) {
                spec.importCacheList = []
            }
            for (var i = 0, len = spec.importCacheList.length; i < len; i += 1) {
                if (spec.importCacheList[i] === ns) {
                    if (!undepended) {
                        spec.importCacheList.push(ns)
                    }
                    return false
                }
            }
            if (!undepended) {
                spec.importCacheList.push(ns)
            }
            spec.importCacheStore[ns] = false;
            var js = document.createElement("SCRIPT");
            js.setAttribute("type", "text/javascript");
            js.setAttribute("src", baseURL + ns.replace(/\./ig, "/") + ".js");
            js.setAttribute("charset", "utf-8");
            js[that.IE ? "onreadystatechange" : "onload"] = function() {
                if (!that.IE || this.readyState.toLowerCase() == "complete" || this.readyState.toLowerCase() == "loaded") {
                    lastPoint = spec.importCacheList.length;
                    spec.importCacheStore[ns] = true;
                    checkDepend()
                }
            };
            document.getElementsByTagName("HEAD")[0].appendChild(js)
        };
        that.register = function(ns, maker, shortName) {
            spec.dependCacheList[ns] = {
                "args": arguments,
                "depend": spec.importCacheList.slice(lastPoint, spec.importCacheList.length),
                "short": shortName
            };
            lastPoint = spec.importCacheList.length;
            checkDepend()
        };
        that.regShort = function(sname, sfun) {
            if (that[sname] !== undefined) {
                throw sname + ":show has been register"
            }
            that[sname] = sfun
        };
        that.setBaseURL = function(url) {
            baseURL = url
        };
        that.getErrorInfo = function() {
            return errorInfo
        };
        that.IE = /msie/i.test(navigator.userAgent);
        that.E = E;
        that.C = function(tagName) {
            var dom;
            tagName = tagName.toUpperCase();
            if (tagName == "TEXT") {
                dom = document.createTextNode("")
            } else {
                if (tagName == "BUFFER") {
                    dom = document.createDocumentFragment()
                } else {
                    dom = document.createElement(tagName)
                }
            }
            return dom
        };
        that.Ready = (function() {
            var funcList = [];
            var inited = false;
            var exec_func_list = function() {
                if (inited == true) {
                    return
                }
                inited = true;
                for (var i = 0, len = funcList.length; i < len; i++) {
                    if ((typeof funcList[i]).toLowerCase() == "function") {
                        funcList[i].call()
                    }
                }
                funcList = []
            };
            if (document.attachEvent && window == window.top) {
                (function() {
                    try {
                        document.documentElement.doScroll("left")
                    } catch (e) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    exec_func_list()
                })()
            } else {
                if (document.addEventListener) {
                    addEvent(document, "DOMContentLoaded", exec_func_list)
                } else {
                    if (/WebKit/i.test(navigator.userAgent)) {
                        (function() {
                            if (/loaded|complete/.test(document.readyState.toLowerCase())) {
                                exec_func_list();
                                return
                            }
                            setTimeout(arguments.callee, 25)
                        })()
                    }
                }
            }
            addEvent(window, "load", exec_func_list);
            return function(oFunc) {
                if (inited == true || (/loaded|complete/).test(document.readyState.toLowerCase())) {
                    if ((typeof oFunc).toLowerCase() == "function") {
                        oFunc.call()
                    }
                } else {
                    funcList.push(oFunc)
                }
            }
        })();
        return that
    })();
    $Import = STK.inc;
    STK.register("core.util.browser", function($) {
        var ua = navigator.userAgent.toLowerCase();
        var ret = {
            "IE": /msie/.test(ua),
            "OPERA": /opera/.test(ua),
            "MOZ": /gecko/.test(ua),
            "IE5": /msie 5 /.test(ua),
            "IE55": /msie 5.5/.test(ua),
            "IE6": /msie 6/.test(ua),
            "IE7": /msie 7/.test(ua),
            "SAFARI": /safari/.test(ua)
        };
        return ret
    });
    STK.register("core.util.storage", function($) {
        var objDS = window.localStorage;
        if (window.ActiveXObject) {
            store = document.documentElement;
            STORE_NAME = "localstorage";
            try {
                store.addBehavior("#default#userdata");
                store.save("localstorage")
            } catch (e) {}
            return {
                set: function(key, value) {
                    try {
                        store.setAttribute(key, value);
                        store.save(STORE_NAME)
                    } catch (e) {}
                },
                get: function(key) {
                    try {
                        store.load(STORE_NAME);
                        return store.getAttribute(key)
                    } catch (e) {
                        return ""
                    }
                },
                del: function(key) {
                    try {
                        store.removeAttribute(key);
                        store.save(STORE_NAME)
                    } catch (e) {}
                }
            }
        } else {
            if (objDS) {
                return {
                    get: function(key) {
                        return objDS.getItem(key) == null ? null : unescape(objDS.getItem(key))
                    },
                    set: function(key, value, exp) {
                        objDS.setItem(key, escape(value))
                    },
                    del: function(key) {
                        objDS.removeItem(key)
                    },
                    clear: function() {
                        objDS.clear()
                    },
                    getAll: function() {
                        var l = objDS.length,
                            key = null,
                            ac = [];
                        for (var i = 0; i < l; i++) {
                                key = objDS.key(i),
                                ac.push(key + "=" + this.getKey(key))
                            }
                        return ac.join("; ")
                    }
                }
            } else {
                return {
                    get: function(key) {
                        var aCookie = document.cookie.split("; "),
                            l = aCookie.length,
                            aCrumb = [];
                        for (var i = 0; i < l; i++) {
                                aCrumb = aCookie[i].split("=");
                                if (key === aCrumb[0]) {
                                    return unescape(aCrumb[1])
                                }
                            }
                        return null
                    },
                    set: function(key, value, exp) {
                        if (!(exp && typeof exp === date)) {
                            exp = new Date(),
                            exp.setDate(exp.getDate() + 1)
                        }
                        document.cookie = key + "=" + escape(value) + "; expires=" + exp.toGMTString()
                    },
                    del: function(key) {
                        document.cookie = key + "=''; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
                    },
                    clear: function() {
                        var aCookie = document.cookie.split("; "),
                            l = aCookie.length,
                            aCrumb = [];
                        for (var i = 0; i < l; i++) {
                                aCrumb = aCookie[i].split("=");
                                this.deleteKey(aCrumb[0])
                            }
                    },
                    getAll: function() {
                        return unescape(document.cookie.toString())
                    }
                }
            }
        }
    });
    STK.register("core.dom.position", function($) {
        return function(oElement) {
            if (oElement == document.body) {
                return false
            }
            if (oElement.parentNode == null) {
                return false
            }
            if (oElement.offsetParent == null) {
                return false
            }
            if (oElement.style.display == "none") {
                return false
            }
            var parent = null,
                pos = [],
                box;
            var scrollTop, scrollLeft, borderLeft, borderTop;
            if (oElement.getBoundingClientRect) {
                    box = oElement.getBoundingClientRect();
                    scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                    scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                    return {
                        l: parseInt(box.left + scrollLeft, 10) || 0,
                        t: parseInt(box.top + scrollTop, 10) || 0
                    }
                } else {
                    if (document.getBoxObjectFor) {
                        box = document.getBoxObjectFor(oElement);
                        borderLeft = (oElement.style.borderLeftWidth) ? parseInt(oElement.style.borderLeftWidth, 10) : 0;
                        borderTop = (oElement.style.borderTopWidth) ? parseInt(oElement.style.borderTopWidth, 10) : 0;
                        pos = [box.x - borderLeft, box.y - borderTop]
                    } else {
                        pos = [oElement.offsetLeft, oElement.offsetTop];
                        parent = oElement.offsetParent;
                        if (parent != oElement) {
                            while (parent) {
                                pos[0] += parent.offsetLeft;
                                pos[1] += parent.offsetTop;
                                parent = parent.offsetParent
                            }
                        }
                        if ($.core.util.browser.OPERA != -1 || ($.core.util.browser.SAFARI != -1 && oElement.style.position == "absolute")) {
                            pos[0] -= document.body.offsetLeft;
                            pos[1] -= document.body.offsetTop
                        }
                    }
                }
            if (oElement.parentNode) {
                    parent = oElement.parentNode
                } else {
                    parent = null
                }
            while (parent && !/^body|html$/i.test(parent.tagName)) {
                    if (parent.style.display.search(/^inline|table-row.*$/i)) {
                        pos[0] -= parent.scrollLeft;
                        pos[1] -= parent.scrollTop
                    }
                    parent = parent.parentNode
                }
            return {
                    l: parseInt(pos[0], 10),
                    t: parseInt(pos[1], 10)
                }
        }
    });
    STK.register("core.evt.addEvent", function($) {
        return function(sNode, sEventType, oFunc) {
            var oElement = $.E(sNode);
            if (oElement == null) {
                return false
            }
            sEventType = sEventType || "click";
            if ((typeof oFunc).toLowerCase() != "function") {
                return
            }
            if (oElement.attachEvent) {
                oElement.attachEvent("on" + sEventType, oFunc)
            } else {
                if (oElement.addEventListener) {
                    oElement.addEventListener(sEventType, oFunc, false)
                } else {
                    oElement["on" + sEventType] = oFunc
                }
            }
            return true
        }
    });
    STK.register("core.obj.parseParam", function($) {
        return function(oSource, oParams, isown) {
            var key;
            if (typeof oParams != "undefined") {
                for (key in oSource) {
                    if (oParams[key] != null) {
                        if (isown) {
                            if (oSource.hasOwnProperty[key]) {
                                oSource[key] = oParams[key]
                            }
                        } else {
                            oSource[key] = oParams[key]
                        }
                    }
                }
            }
            return oSource
        }
    });
    STK.register("core.dom.removeNode", function($) {
        return function(node) {
            node = $.E(node) || node;
            try {
                node.parentNode.removeChild(node)
            } catch (e) {}
        }
    });
    STK.register("core.dom.getElementsByAttr", function($) {
        return function(node, attname, attvalue) {
            var nodes = [];
            for (var i = 0, l = node.childNodes.length; i < l; i++) {
                if (node.childNodes[i].nodeType == 1) {
                    if (node.childNodes[i].getAttribute(attname) == attvalue) {
                        nodes.push(node.childNodes[i])
                    }
                    if (node.childNodes[i].childNodes.length > 0) {
                        nodes = nodes.concat(arguments.callee.call(null, node.childNodes[i], attname, attvalue))
                    }
                }
            }
            return nodes
        }
    });
    STK.register("core.util.getUniqueKey", function($) {
        return function() {
            return Math.floor(Math.random() * 1000) + new Date().getTime().toString()
        }
    });
    STK.register("core.str.parseURL", function($) {
        return function(url) {
            var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
            var names = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"];
            var results = parse_url.exec(url);
            var that = {};
            for (var i = 0, len = names.length; i < len; i += 1) {
                that[names[i]] = results[i] || ""
            }
            return that
        }
    });
    STK.register("core.arr.isArray", function($) {
        return function(o) {
            return Object.prototype.toString.call(o) === "[object Array]"
        }
    });
    STK.register("core.str.trim", function($) {
        return function(str) {
            if (typeof str !== "string") {
                throw "trim need a string as parameter"
            }
            if (typeof str.trim === "function") {
                return str.trim()
            } else {
                return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "")
            }
        }
    });
    STK.register("core.json.queryToJson", function($) {
        return function(QS, isDecode) {
            var _Qlist = $.core.str.trim(QS).split("&");
            var _json = {};
            var _fData = function(data) {
                if (isDecode) {
                    return decodeURIComponent(data)
                } else {
                    return data
                }
            };
            for (var i = 0, len = _Qlist.length; i < len; i++) {
                if (_Qlist[i]) {
                    _hsh = _Qlist[i].split("=");
                    _key = _hsh[0];
                    _value = _hsh[1];
                    if (_hsh.length < 2) {
                        _value = _key;
                        _key = "$nullName"
                    }
                    if (!_json[_key]) {
                        _json[_key] = _fData(_value)
                    } else {
                        if ($.core.arr.isArray(_json[_key]) != true) {
                            _json[_key] = [_json[_key]]
                        }
                        _json[_key].push(_fData(_value))
                    }
                }
            }
            return _json
        }
    });
    STK.register("core.json.jsonToQuery", function($) {
        return function(JSON, isEncode) {
            var _Qstring = [];
            var _fdata = function(data) {
                data = data == null ? "" : data;
                data = $.core.str.trim(data.toString());
                if (isEncode) {
                    return encodeURIComponent(data)
                } else {
                    return data
                }
            };
            if (typeof JSON == "object") {
                for (var k in JSON) {
                    if (JSON[k] instanceof Array) {
                        for (var i = 0, len = JSON[k].length; i < len; i++) {
                            _Qstring.push(k + "=" + _fdata(JSON[k][i]))
                        }
                    } else {
                        if (typeof JSON[k] != "function") {
                            _Qstring.push(k + "=" + _fdata(JSON[k]))
                        }
                    }
                }
            }
            if (_Qstring.length) {
                return _Qstring.join("&")
            } else {
                return ""
            }
        }
    });
    STK.register("core.util.URL", function($) {
        return function(sURL) {
            var that = {};
            var url_json = $.core.str.parseURL(sURL);
            var query_json = $.core.json.queryToJson(url_json.query);
            var hash_json = $.core.json.queryToJson(url_json.hash);
            that.setParam = function(sKey, sValue) {
                query_json[sKey] = sValue;
                return this
            };
            that.getParam = function(sKey) {
                return query_json[sKey]
            };
            that.setParams = function(oJson) {
                for (var key in oJson) {
                    that.setParam(key, oJson[key])
                }
                return this
            };
            that.setHash = function(sKey, sValue) {
                hash_json[sKey] = sValue;
                return this
            };
            that.getHash = function(sKey) {
                return hash_json[sKey]
            };
            that.valueOf = that.toString = function() {
                var url = [];
                var query = $.core.json.jsonToQuery(query_json);
                var hash = $.core.json.jsonToQuery(hash_json);
                if (url_json.scheme != "") {
                    url.push(url_json.scheme + ":");
                    url.push(url_json.slash)
                }
                if (url_json.host != "") {
                    url.push(url_json.host);
                    url.push(url_json.port)
                }
                url.push("/");
                url.push(url_json.path);
                if (query != "") {
                    url.push("?" + query)
                }
                if (hash != "") {
                    url.push("#" + hash)
                }
                return url.join("")
            };
            return that
        }
    });
    STK.register("core.io.scriptLoader", function($) {
        var entityList = {};
        return function(oOpts) {
            var js, requestTimeout;
            var opts = {
                "url": "",
                "charset": "UTF-8",
                "timeout": 30 * 1000,
                "args": {},
                "onComplete": null,
                "onTimeout": null,
                "uniqueID": null
            };
            $.core.obj.parseParam(opts, oOpts);
            if (opts.url == "") {
                throw "scriptLoader: url is null"
            }
            var uniqueID = opts.uniqueID || $.core.util.getUniqueKey();
            js = entityList[uniqueID];
            if (js != null && $.IE != true) {
                $.core.dom.removeNode(js);
                js = null
            }
            if (js == null) {
                js = entityList[uniqueID] = $.C("script")
            }
            js.charset = opts.charset;
            js.id = "scriptRequest_script_" + uniqueID;
            js.type = "text/javascript";
            if (opts.onComplete != null) {
                if ($.IE) {
                    js["onreadystatechange"] = function() {
                        if (js.readyState.toLowerCase() == "loaded" || js.readyState.toLowerCase() == "complete") {
                            clearTimeout(requestTimeout);
                            opts.onComplete()
                        }
                    }
                } else {
                    js["onload"] = function() {
                        clearTimeout(requestTimeout);
                        opts.onComplete()
                    }
                }
            }
            js.src = STK.core.util.URL(opts.url).setParams(opts.args);
            document.getElementsByTagName("head")[0].appendChild(js);
            if (opts.timeout > 0 && opts.onTimeout != null) {
                requestTimeout = setTimeout(function() {
                    opts.onTimeout()
                }, opts.timeout)
            }
            return js
        }
    });
    STK.register("core.io.jsonp", function($) {
        return function(oOpts) {
            var opts = {
                "url": "",
                "charset": "UTF-8",
                "timeout": 30 * 1000,
                "args": {},
                "onComplete": null,
                "onTimeout": null,
                "responseName": null,
                "varkey": "callback"
            };
            var funcStatus = -1;
            $.core.obj.parseParam(opts, oOpts);
            var uniqueID = opts.responseName || ("STK_" + $.core.util.getUniqueKey());
            opts.args[opts.varkey] = uniqueID;
            var completeFunc = opts.onComplete;
            var timeoutFunc = opts.onTimeout;
            window[uniqueID] = function(oResult) {
                if (funcStatus != 2 && completeFunc != null) {
                    funcStatus = 1;
                    completeFunc(oResult)
                }
            };
            opts.onComplete = null;
            opts.onTimeout = function() {
                if (funcStatus != 1 && timeoutFunc != null) {
                    funcStatus = 2;
                    timeoutFunc()
                }
            };
            return $.core.io.scriptLoader(opts)
        }
    });
    STK.register("core.obj.isEmpty", function($) {
        return function(o, isprototype) {
            var ret = true;
            for (var k in o) {
                if (isprototype) {
                    ret = false;
                    break
                } else {
                    if (o.hasOwnProperty(k)) {
                        ret = false;
                        break
                    }
                }
            }
            return ret
        }
    });
    STK.register("core.str.encodeHTML", function($) {
        return function(str) {
            if (typeof str !== "string") {
                throw "encodeHTML need a string as parameter"
            }
            return str.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\'/g, "&#39").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, "&#32")
        }
    });
    STK.register("core.util.templet", function($) {
        return function(template, data) {
            return template.replace(/#\{(.+?)\}/ig, function() {
                var key = arguments[1].replace(/\s/ig, "");
                var ret = arguments[0];
                var list = key.split("||");
                for (var i = 0, len = list.length; i < len; i += 1) {
                    if (/^default:.*$/.test(list[i])) {
                        ret = list[i].replace(/^default:/, "");
                        break
                    } else {
                        if (data[list[i]] !== undefined) {
                            ret = data[list[i]];
                            break
                        }
                    }
                }
                return ret
            })
        }
    });
    STK.register("core.util.cookie", function($) {
        var that = {
            set: function(sKey, sValue, oOpts) {
                var arr = [];
                var d, t;
                var cfg = {
                    "expire": null,
                    "path": null,
                    "domain": null,
                    "secure": null,
                    "encode": true
                };
                $.core.obj.parseParam(cfg, oOpts);
                if (cfg.encode == true) {
                    sValue = escape(sValue)
                }
                arr.push(sKey + "=" + sValue);
                if (cfg.path != null) {
                    arr.push("path=" + cfg.path)
                }
                if (cfg.domain != null) {
                    arr.push("domain=" + cfg.domain)
                }
                if (cfg.secure != null) {
                    arr.push(cfg.secure)
                }
                if (cfg.expire != null) {
                    d = new Date();
                    t = d.getTime() + cfg.expire * 3600000;
                    d.setTime(t);
                    arr.push("expires=" + d.toGMTString())
                }
                document.cookie = arr.join(";")
            },
            get: function(sKey) {
                sKey = sKey.replace(/([\.\[\]\$])/g, "\\$1");
                var rep = new RegExp(sKey + "=([^;]*)?;", "i");
                var co = document.cookie + ";";
                var res = co.match(rep);
                if (res) {
                    return res[1] || ""
                } else {
                    return ""
                }
            },
            remove: function(sKey, oOpts) {
                oOpts = oOpts || {};
                oOpts.expire = -10;
                that.set(sKey, "", oOpts)
            }
        };
        return that
    });
    try {
        window.external.msSiteModeClearIconOverlay()
    } catch (e) {}
    var BOX_TEMPLATE = '<style type="text/css">@media screen and (-webkit-min-device-pixel-ratio:0){.tsina_gnb{top:8px;}.tsina_gnb ul li.on a{margin-bottom:-1px; padding:2px 5px 10px 7px;}.tsina_gnb ul.sltmenu{top:26px;}.tsina_gnb ul.sltmenu li a{margin:0 2px; padding:4px 13px 3px;}.tsina_gnb ul li em.nmTxt,.tsina_gnb ul li a{font-family:inherit;}}</style><div class="tsina_gnbarea" id="#{box}"></div><div class="small_Yellow_div"><div style="display:none" class="small_Yellow" id="#{unread_layer}"><table class="CP_w"><thead><tr><th class="tLeft"><span></span></th><th class="tMid"><span></span></th><th class="tRight"><span></span></th></tr></thead><tbody><tr><td class="tLeft"><span></span></td><td class="tMid"><a href="javascript:;" onfocus="(function(){var div = document.getElementById(\'#{unread_comm}\');var parent = div.parentNode;if(parent){parent.focus();}})();return false;" style="position:absolute;top:-9797em;" accesskey="4">新消息</a><div class="yInfo"><!--<span id="#{unread_title}"></span>--><p id="#{unread_comm}"></p><p id="#{unread_fans}"></p><p id="#{unread_msg}"></p><p id="#{unread_atme}"></p><p id="#{unread_group}"></p><p id="#{unread_notice}"></p><div id="#{unread_source}"></div></div></td><td class="tRight"><span></span></td></tr></tbody><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot></table><div class="close"><a href="javascript:void(0)" id="#{unread_layer_close}">&nbsp;</a></div></div><div id="#{once_layer}" class="eventTip" style="display:none;left:66px"></div></div>';
    var APP_TEMPLATE = "";
    var $ = STK;
    var that = {};
    var random = (new Date()).getTime();
    var language = {};
    var evts = {
        "unreadChange": null,
        "breath": null
    };
    var store = {};
    var setId = function(id) {
        return ("WB_" + id + "_" + random)
    };
    var getEl = function(id) {
        return $.E("WB_" + id + "_" + random)
    };
    var getLang = function(key, lang) {
        if (lang[key]) {
            return lang[key]
        }
        return key
    };
    var rendLanguage = function(temp, lang) {
        if (!lang) {
            lang = {}
        }
        return temp.replace(/\$\{([^\}]+)\}/ig, function() {
            var key = arguments[1].replace(/\s/ig, "");
            return getLang(key, lang)
        })
    };
    var hover = function(spec) {
        var act = spec.act;
        var ext = spec.ext || [];
        var overKey = false;
        var timer = null;
        var showAct = function() {
            if (overKey) {
                spec.fun(overKey)
            }
        };
        var hiddAct = function() {
            if (!overKey) {
                spec.fun(overKey)
            }
        };
        var hoverAct = function() {
            overKey = true;
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(showAct, 100)
        };
        var msoutAct = function() {
            overKey = false;
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(hiddAct, 100)
        };
        $.core.evt.addEvent(act, "mouseover", hoverAct);
        $.core.evt.addEvent(act, "mouseout", msoutAct);
        for (var i = 0, len = ext.length; i < len; i += 1) {
            $.core.evt.addEvent(ext[i], "mouseover", hoverAct);
            $.core.evt.addEvent(ext[i], "mouseout", msoutAct)
        }
    };
    var getOnhover = function(act, layer) {
        return function(b) {
            if (b) {
                act.parentNode.className = "on";
                layer.style.display = ""
            } else {
                layer.style.display = "none";
                act.parentNode.className = ""
            }
        }
    };
    var showPop = true;
    var globalUID = null;
    var _hasExecuted = false;
    var _sourceShow = false;
    var popset = {
        comment: 1,
        attention: 1,
        msg: 1,
        atme: 1,
        group: 1,
        notice: 1
    };
    var privacySwitch = function() {
        try {
            if (!$.core.util.cookie.get("WNP".toUpperCase())) {
                return false
            }
            var totallength = 6,
                c, pset = ((decodeURIComponent($.core.util.cookie.get("WNP".toUpperCase())).split(",")[1]) * 1).toString(2);
            pset = ((new Array(totallength - pset.length)).join("0") + pset).split("");
            for (var i in popset) {
                    c = pset.pop();
                    popset[i] = c
                }
        } catch (e) {}
    };
    var unreadPop = function(cache, source) {
        if (!showPop) {
            return false
        }
        var total = false,
            num = 0,
            timer = null;
        try {
                // FIXME: Unread xxxx functionality
                var layer = getEl("unread_layer");
                if (parseInt(popset["comment"]) && cache["comment"] > 0) {
                    getEl("unread_comm").innerHTML = rendLanguage(cache["comment"] + '${条新评论}，<a href="http://weibo.com/comments">${查看评论}</a>', language);
                    total = true;
                    num += cache["comment"];
                    getEl("unread_comm").style.display = ""
                } else {
                    getEl("unread_comm").style.display = "none"
                }
                if (parseInt(popset["attention"]) && cache["attention"] > 0) {
                    getEl("unread_fans").innerHTML = rendLanguage(cache["attention"] + '${位新粉丝}，<a href="http://weibo.com/' + globalUID + '/fans">${查看我的粉丝}</a>', language);
                    total = true;
                    num += cache["attention"];
                    getEl("unread_fans").style.display = ""
                } else {
                    getEl("unread_fans").style.display = "none"
                }
                if (parseInt(popset["msg"]) && cache["msg"] > 0) {
                    getEl("unread_msg").innerHTML = rendLanguage(cache["msg"] + '${条新私信}，<a href="http://weibo.com/messages">${查看私信}</a>', language);
                    total = true;
                    num += cache["msg"];
                    getEl("unread_msg").style.display = ""
                } else {
                    getEl("unread_msg").style.display = "none"
                }
                if (parseInt(popset["atme"]) && cache["atme"] > 0) {
                    getEl("unread_atme").innerHTML = rendLanguage(cache["atme"] + '${条微博提到我}，<a href="http://weibo.com/atme">${查看}<em>@</em>${我}</a>', language);
                    total = true;
                    num += cache["atme"];
                    getEl("unread_atme").style.display = ""
                } else {
                    getEl("unread_atme").style.display = "none"
                }
                if (parseInt(popset["group"]) && cache["group"] > 0) {
                    getEl("unread_group").innerHTML = rendLanguage(cache["group"] + '${条群内新消息}，<a href="http://q.weibo.com/message/proxJump.php">${查看消息}</a>', language);
                    total = true;
                    num += cache["group"];
                    getEl("unread_group").style.display = ""
                } else {
                    getEl("unread_group").style.display = "none"
                }
                if (parseInt(popset["notice"]) && cache["notice"] > 0) {
                    getEl("unread_notice").innerHTML = rendLanguage(cache["notice"] + '${条新通知}，<a href="http://weibo.com/systemnotice">${查看通知}</a>', language);
                    total = true;
                    num += cache["notice"];
                    getEl("unread_notice").style.display = ""
                } else {
                    getEl("unread_notice").style.display = "none"
                }
                if (source && source.html) {
                    _sourceShow = true;
                    total = true;
                    var p = STK.core.dom.getElementsByAttr(getEl("unread_source"), "SourceId", source.id);
                    if (p.length) {
                        p[0].innerHTML = source.html;
                        p = null
                    } else {
                        var tmp = document.createElement("DIV");
                        tmp.innerHTML = rendLanguage(source.html, language);
                        tmp.setAttribute("SourceId", source.id);
                        getEl("unread_source").appendChild(tmp);
                        tmp = null
                    }
                    getEl("unread_source").style.display = ""
                }
                if (total || _sourceShow) {
                    if (_hasExecuted === false) {
                        var top, box = getEl("box"),
                            box_top = box.offsetTop + box.clientHeight,
                            checkShow = function() {},
                            ie6 = /msie 6/.test(navigator.userAgent.toLowerCase());
                        _hasExecuted = true;
                        if (ie6 || document.compatMode === "BackCompat") {
                                checkShow = function() {
                                    if (showPop && total && layer.style.display == "none") {
                                        clearTimeout(timer);
                                        timer = null;
                                        box_top = box.offsetTop + box.clientHeight;
                                        top = document.documentElement.scrollTop || document.body.scrollTop;
                                        layer.style.top = (top < box_top ? 0 : top - box_top) + "px";
                                        layer.style.display = ""
                                    }
                                };
                                window.onscroll = function() {
                                    if (top != (document.documentElement.scrollTop || document.body.scrollTop)) {
                                        layer.style.display = "none";
                                        if (timer == null) {
                                            timer = setTimeout(checkShow, 500)
                                        }
                                    }
                                }
                            } else {
                                var box_child = box.getElementsByTagName("div")[1],
                                    right = box.offsetWidth - box_child.offsetLeft - box_child.offsetWidth;
                                top = document.documentElement.scrollTop || document.body.scrollTop;
                                checkShow = function() {
                                        if (showPop && total && layer.style.display == "none") {
                                            layer.style.display = ""
                                        }
                                    };
                                layer.style.cssText = "position:fixed;top:" + (top < box_top ? box_top - top : 0) + "px;right:" + right + "px";
                                window.onresize = function() {
                                        right = box.offsetWidth - box_child.offsetLeft - box_child.offsetWidth;
                                        layer.style.right = right + "px";
                                        top = document.documentElement.scrollTop || document.body.scrollTop;
                                        layer.style.top = (top < box_top ? box_top - top : 0) + "px"
                                    };
                                window.onscroll = function() {
                                        top = document.documentElement.scrollTop || document.body.scrollTop;
                                        layer.style.right = (right + document.documentElement.scrollLeft || document.body.scrollLeft) + "px";
                                        layer.style.top = (top < box_top ? box_top - top : 0) + "px"
                                    }
                            }
                    }
                    _hasExecuted && checkShow();
                    layer.style.display = ""
                } else {
                    clearTimeout(timer);
                    window.onscroll = null;
                    _hasExecuted = false;
                    layer.style.display = "none"
                }
            } catch (exp) {}
    };
    var onlineStatus = function() {
        $.core.io.jsonp({
            // FIXME: check online state functionality
            "url": "http://weibo.com/public/aj_setonline.php" + "?count=" + loopNumber,
            "onComplete": function() {}
        })
    };
    var loopNumber = 0;
    var startBreath = function(uid, config) {
        $.core.io.jsonp({
            // FIXME: unread_count functionality
            "url": "/remind/unread_count.json?source=1740131375&count=" + loopNumber + "&user_id=" + uid,
            "onComplete": function(data) {
            	
                var cache = {};
                data = data["data"];
                unreadPop(data);
                if (config.source && config.source.length > 0) {
                    startSource(config.source, data)
                }
                if (evts["breath"]) {
                    try {
                        evts["breath"](data)
                    } catch (exp) {}
                }
                for (var k in data) {
                    if (data[k] !== store[k]) {
                        cache[k] = data[k]
                    }
                }
                if (!$.core.obj.isEmpty(cache)) {
                    try {
                        if (evts["unreadChange"]) {
                            evts["unreadChange"](cache)
                        }
                    } catch (exp) {}
                }
                store = data
            }
        });
        loopNumber += 1
    };
    var startSource = function(source, cache) {
        if (!source || source.length == 0) {
            return false
        }
        for (var i = 0; i < source.length; i++) {
            $.core.io.jsonp({
                "url": source[i].source,
                "onComplete": (function(index) {
                    return function(data) {
                        var rtn;
                        rtn = source[index].callback(data);
                        unreadPop(cache, rtn);
                        rtn = null
                    }
                })(i)
            })
        }
        if (_sourceShow) {
            getEl("unread_source").style.display = "";
            _sourceShow = false
        } else {
            getEl("unread_source").style.display = "none"
        }
    };
    document.write($.core.util.templet(BOX_TEMPLATE, {
        "box": setId("box"),
        "unread_title": setId("unread_title"),
        "unread_layer": setId("unread_layer"),
        "unread_fans": setId("unread_fans"),
        "unread_comm": setId("unread_comm"),
        "unread_atme": setId("unread_atme"),
        "unread_group": setId("unread_group"),
        "unread_msg": setId("unread_msg"),
        "unread_notice": setId("unread_notice"),
        "unread_source": setId("unread_source"),
        "unread_layer_close": setId("unread_layer_close"),
        "once_layer": setId("once_layer")
    }));
    that.init = function(config) {
        var data = {
            "square": setId("square"),
            "application": setId("application"),
            "square_layer": setId("square_layer"),
            "application_layer": setId("application_layer"),
            "operation": "",
            "name_span": setId("name_span"),
            "square_list": rendLanguage(config["square"] || SQUARE_TEMPLATE, config["language"]),
            "application_list": rendLanguage(config["apps"] || APP_TEMPLATE, config["language"]),
            "account": decodeURIComponent(config["account"]),
            "uid": config["uid"] || "",
            "name": $.core.str.encodeHTML(decodeURIComponent(config["name"])),
            "source": config["source"] || []
        };
        globalUID = config["uid"];
        if (window.location.search) {
            var queryString = window.location.search.slice(1);
            var queryJson = $.core.json.queryToJson(queryString);
            if (queryJson["inviteCode"]) {
                data["inviteCode"] = queryJson["inviteCode"]
            }
        }
        if (config["operation"]) {
            data["operation"] = '<li class="line">|</li>' + config["operation"]
        }
        if (config.isLogin) {
            getEl("box").innerHTML = $.core.util.templet(rendLanguage(TOP_TEMPLATE, config["language"]), data);
            privacySwitch();
            startBreath(config["uid"], config);
            setInterval(function() {
                startBreath(config["uid"], config)
            }, 30 * 1000);
            setInterval(function() {
                onlineStatus()
            }, 29 * 60 * 1000);
            $.core.evt.addEvent(getEl("unread_layer_close"), "click", function() {
                getEl("unread_layer").style.display = "none";
                showPop = false;
                $.core.io.scriptLoader({
                    // FIXME: delete unread all functionality
                    "url": "http://weibo.com/public/del_unread_all.php"
                });
                if (config.source && config.source.length > 0) {
                    for (var j = 0; j < config.source.length; j++) {
                        $.core.io.scriptLoader({
                            "url": config.source[j].clear
                        })
                    }
                }
                return false
            })
        } else {
            getEl("box").innerHTML = $.core.util.templet(rendLanguage(UNLOGIN_TEMPLATE, config["language"]), data)
        }
        hover({
            "act": getEl("square"),
            "ext": [getEl("square_layer")],
            "fun": getOnhover(getEl("square"), getEl("square_layer"))
        });
        language = config["language"]
    };
    that.addListener = function(type, func) {
        if (typeof func !== "function") {
            throw "listener need a function as the second parameter"
        }
        evts[type] = func
    };
    return that
})();

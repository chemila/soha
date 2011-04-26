if (!$CONFIG) {
    $CONFIG = {}
}
var scope = $CONFIG;
Function.prototype.bind2 = function(b) {
    var a = this;
    return function() {
        return a.apply(b, arguments)
    }
};
scope.$VERSION = "t35";
scope.$BASEIMG = "http://img.t.sinajs.cn/" + scope.$VERSION + "/";
scope.$BASECSS = "http://img.t.sinajs.cn/" + scope.$VERSION + "/";
scope.$BASEJS = "http://js.t.sinajs.cn/" + scope.$VERSION + "/";
scope.$BASESTATIC = "http://js.t.sinajs.cn/" + scope.$VERSION + "/";
scope._ua = navigator.userAgent.toLowerCase();
scope.$IE = /msie/.test(scope._ua);
scope.$OPERA = /opera/.test(scope._ua);
scope.$MOZ = /gecko/.test(scope._ua);
scope.$IE5 = /msie 5 /.test(scope._ua);
scope.$IE55 = /msie 5.5/.test(scope._ua);
scope.$IE6 = /msie 6/.test(scope._ua);
scope.$IE7 = /msie 7/.test(scope._ua);
scope.$SAFARI = /safari/.test(scope._ua);
scope.$winXP = /windows nt 5.1/.test(scope._ua);
scope.$winVista = /windows nt 6.0/.test(scope._ua);
var $IE = scope.$IE,
    $MOZ = scope.$MOZ,
    $IE6 = scope.$IE6;

function $import(a) {}
var Boot = {};
Boot.addDOMLoadEvent = function(a) {
        if (!window.__load_events) {
            var b = function() {
                if (arguments.callee.done) {
                    return
                }
                arguments.callee.done = true;
                if (window.__load_timer) {
                    clearInterval(window.__load_timer);
                    window.__load_timer = null
                }
                for (var f = 0; f < window.__load_events.length; f++) {
                    window.__load_events[f]()
                }
                window.__load_events = null
            };
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", b, false)
            }
            if (/WebKit/i.test(navigator.userAgent)) {
                window.__load_timer = setInterval(function() {
                    if (/loaded|complete/.test(document.readyState)) {
                        b()
                    }
                }, 10)
            }
            if (window.ActiveXObject) {
                window.__load_timer = setInterval(function() {
                    try {
                        document.body.doScroll("left");
                        b()
                    } catch (f) {}
                }, 10)
            }
            window.onload = b;
            window.__load_events = []
        }
        window.__load_events.push(a)
    };
Boot.getJsVersion = function() {
        var a = false;
        if ($CONFIG) {
            a = $CONFIG.js ? $CONFIG.js : ""
        }
        if (a) {
            return "?v=" + a
        } else {
            return ""
        }
    };
try {
        Boot.addDOMLoadEvent(main)
    } catch (e) {}
var $Debug = (function() {
        var a = [];

        function f(h, n, g) {
            var j;
            var m = h != null ? h : "";
            var k = {
                color: null,
                bgcolor: null,
                html: null
            };
            var l = g != null ? g : "log";
            n = n != null ? n : {};
            for (j in k) {
                if (n[j] != null) {
                    k[j] = n[j]
                }
            }
            a.push({
                label: m,
                cmd: l,
                opts: k,
                time: new Date()
            })
        }
        function b(g, h) {
            f(g, h, "log")
        }
        b.fatal = function(g, h) {
            f(g, h, "fatal")
        };
        b.error = function(g, h) {
            f(g, h, "error")
        };
        b.warning = function(g, h) {
            f(g, h, "warning")
        };
        b.info = function(g, h) {
            f(g, h, "info")
        };
        b.log = function(g, h) {
            f(g, h, "log")
        };
        b.clear = function() {
            a = []
        };
        b.contentList = a;
        return b
    })();
if (typeof Sina == "undefined") {
        Sina = {}
    }
Sina.pkg = function(f) {
        if (!f || !f.length) {
            return null
        }
        var g = f.split(".");
        var b = Sina;
        for (var a = (g[0] == "Sina") ? 1 : 0; a < g.length; ++a) {
            b[g[a]] = b[g[a]] || {};
            b = b[g[a]]
        }
        return b
    };

function $E(b) {
        var a = typeof b == "string" ? document.getElementById(b) : b;
        if (a != null) {
            return a
        } else {}
        return null
    }
function $C(a) {
        return document.createElement(a)
    }
try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) {}(function() {
        var k = "trace";
        var j = [];
        var h = new Date().valueOf();
        var g = new Date().valueOf();
        var a;
        var f = function(l, n, m) {
            n = n || {};
            if (typeof n == "string") {
                n = {
                    color: n
                };
                if (typeof m != "undefined" && typeof m == "string") {
                    n.bgColor = m
                }
            }
            j[j.length] = [l, n]
        };
        var b = function(l) {
            f(l, {
                color: "#F00"
            })
        };
        f.error = b;
        f.traceList = j;
        f.toString = function() {
            return "Trace调试已关闭"
        };
        window[k] = f;
        window.traceError = b
    })();
Sina.pkg("Core");
if (typeof Core == "undefined") {
        Core = Sina.Core
    }
Sina.pkg("Core.Array");
Core.Array.each = function(f, b) {
        var h = [];
        for (var g = 0; g < f.length; g++) {
            var a = b(f[g], g);
            if (a !== null) {
                h.push(a)
            }
        }
        return h
    };

function Jobs() {
        this._jobTable = []
    }
Jobs.prototype = {
        _registedJobTable: {},
        initialize: function() {},
        _registJob: function(b, a) {
            this._registedJobTable[b] = a
        },
        add: function(a) {
            this._jobTable.push(a)
        },
        start: function() {
            var a = this._jobTable;
            var f = this._registedJobTable;
            var j = 0;
            var h = this._jobTable.length;
            var b = function() {
                return new Date().valueOf()
            };
            var g = window.setInterval(function() {
                if (j >= h) {
                    clearInterval(g);
                    return
                }
                var p = a[j];
                var n = f[p];
                j++;
                if (typeof n == "undefined") {
                    $Debug.error("<b>[" + p + "# is undefiend!!!</b>", {
                        html: true
                    });
                    return
                }
                var m = true;
                var l = b();
                try {
                    n.call()
                } catch (o) {
                    $Debug.error("<b>[" + p + "] failed!!!</b>", {
                        html: true
                    });
                    m = false
                } finally {
                    if (m) {
                        var k = b();
                        $Debug.info("[" + p + "] done in " + (k - l) + "ms.")
                    }
                }
            }, 10)
        },
        call: function(b, a) {
            if (typeof this._registedJobTable[b] != "undefined") {
                this._registedJobTable[b].apply(this, a)
            } else {
                $Debug("#" + b + "# is undefined!!!", {
                    color: "#900",
                    bgColor: "#FFF;"
                })
            }
        }
    };
$registJob = function(b, a) {
        Jobs.prototype._registJob(b, a)
    };
$callJob = function(b) {
        var a = [];
        if (arguments.length > 1) {
            Core.Array.foreach(arguments, function(f, g) {
                a[g] = f
            });
            a.shift()
        }
        Jobs.prototype.call(b, a)
    };
if (typeof App == "undefined") {
        var App = {}
    }
Sina.pkg("Core.Events");
Core.Events.addEvent = function(j, g, f, a) {
        var h = $E(j);
        if (h == null) {
            $Debug("addEvent 找不到对象：" + j);
            return
        }
        if (typeof a == "undefined") {
            a = false
        }
        if (typeof f == "undefined") {
            f = "click"
        }
        if (h.addEventListener) {
            h.addEventListener(f, g, a);
            return true
        } else {
            if (h.attachEvent) {
                var b = h.attachEvent("on" + f, g);
                return true
            } else {
                h["on" + f] = g
            }
        }
    };
Core.Events.removeEvent = function(a, b, f) {
        var g = $E(a);
        if (g == null) {
            $Debug("removeEvent 找不到对象：" + a);
            return
        }
        if (typeof b != "function") {
            return
        }
        if (typeof f == "undefined") {
            f = "click"
        }
        if (g.addEventListener) {
            g.removeEventListener(f, b, false)
        } else {
            if (g.attachEvent) {
                g.detachEvent("on" + f, b)
            }
        }
        b[f] = null
    };
Sina.pkg("Core.Base");
    (function() {
        var a = function() {
            var b = navigator.userAgent.toLowerCase();
            this.$IE = /msie/.test(b);
            this.$OPERA = /opera/.test(b);
            this.$MOZ = /gecko/.test(b);
            this.$IE5 = /msie 5 /.test(b);
            this.$IE55 = /msie 5.5/.test(b);
            this.$IE6 = /msie 6/.test(b);
            this.$IE7 = /msie 7/.test(b);
            this.$SAFARI = /safari/.test(b);
            this.$winXP = /windows nt 5.1/.test(b);
            this.$winVista = /windows nt 6.0/.test(b);
            this.$FF2 = /Firefox\/2/i.test(b);
            this.$IOS = /\((iPhone|iPad|iPod)/i.test(b)
        };
        Core.Base.detect = new a()
    })();
Core.Events.getEvent = function() {
        return window.event
    };
if (!Core.Base.detect.$IE) {
        Core.Events.getEvent = function() {
            if (window.event) {
                return window.event
            }
            var b = arguments.callee.caller;
            var a;
            var f = 0;
            while (b != null && f < 40) {
                a = b.arguments[0];
                if (a && (a.constructor == Event || a.constructor == MouseEvent)) {
                    return a
                }
                f++;
                b = b.caller
            }
            return a
        }
    }
Core.Events.stopEvent = function(a) {
        try {
            var b = a ? a : Core.Events.getEvent();
            b.cancelBubble = true;
            b.returnValue = false
        } catch (f) {}
    };
if (!$IE) {
        Core.Events.stopEvent = function(a) {
            try {
                var b = a ? a : Core.Events.getEvent();
                b.preventDefault();
                b.stopPropagation()
            } catch (f) {}
        }
    }
Core.Events.fixEvent = function(a) {
        if (typeof a == "undefined") {
            a = window.event
        }
        if (!a.target) {
            a.target = a.srcElement;
            a.pageX = a.x;
            a.pageY = a.y
        }
        if (typeof a.layerX == "undefined") {
            a.layerX = a.offsetX
        }
        if (typeof a.layerY == "undefined") {
            a.layerY = a.offsetY
        }
        return a
    };
Sina.pkg("Core.Dom");
Core.Dom.opacity = function(b, a) {
        b = $E(b);
        b.style.filter = "alpha(opacity=" + a + ")";
        b.style.opacity = a / 100
    };
Core.Dom.getElementsByClass = function(f, b, k) {
        f = f || document;
        var g = [];
        k = " " + k + " ";
        var m = f.getElementsByTagName(b),
            j = m.length;
        for (var h = 0; h < j; ++h) {
                var a = m[h];
                if (a.nodeType == 1) {
                    var l = " " + a.className + " ";
                    if (l.indexOf(k) != -1) {
                        g[g.length] = a
                    }
                }
            }
        return g
    };
Core.Dom.byClz = Core.Dom.getElementsByClass;
Sina.pkg("Utils");
if (typeof Utils == "undefined") {
        Utils = Sina.Utils
    }
Sina.pkg("Core.Function");
Core.Function.bind2 = function(f, b) {
        var a = f;
        return function() {
            return a.apply(b, arguments)
        }
    };
Function.prototype.bind2 = function(b) {
        var a = this;
        return function() {
            return a.apply(b, arguments)
        }
    };
Core.Array.foreach = function(g, f) {
        if (g == null && g.constructor != Array) {
            return []
        }
        var h = 0,
            b = g.length,
            j = [];
        while (h < b) {
                var a = f(g[h], h);
                if (a !== null) {
                    j[j.length] = a
                }
                h++
            }
        return j
    };
Utils.Template = function(a) {
        this.tmpl = a;
        this.pattern = /(#\{(.*?)\})/g
    };
Utils.Template.prototype = {
        evaluate: function(a) {
            return this.tmpl.replace(this.pattern, function() {
                return a[arguments[2]] || ""
            })
        },
        evaluateMulti: function(f, a) {
            var b = [];
            Core.Array.foreach(f, Core.Function.bind2(function(g, h) {
                h = a ? f.length - h : h;
                b[h] = this.evaluate(g)
            }, this));
            return b.join("")
        }
    };
Sina.pkg("Core.System");
Core.System.winSize = function(b) {
        var a, f;
        if (b) {
            target = b.document
        } else {
            target = document
        }
        if (self.innerHeight) {
            if (b) {
                target = b.self
            } else {
                target = self
            }
            a = target.innerWidth;
            f = target.innerHeight
        } else {
            if (target.documentElement && target.documentElement.clientHeight) {
                a = target.documentElement.clientWidth;
                f = target.documentElement.clientHeight
            } else {
                if (target.body) {
                    a = target.body.clientWidth;
                    f = target.body.clientHeight
                }
            }
        }
        return {
            width: a,
            height: f
        }
    };
Core.System.pageSize = function(f) {
        if (f) {
            target = f.document
        } else {
            target = document
        }
        var h = (target.compatMode == "CSS1Compat" ? target.documentElement : target.body);
        var g, b;
        if (window.innerHeight && window.scrollMaxY) {
            g = h.scrollWidth;
            b = window.innerHeight + window.scrollMaxY
        } else {
            if (h.scrollHeight > h.offsetHeight) {
                g = h.scrollWidth;
                b = h.scrollHeight
            } else {
                g = h.offsetWidth;
                b = h.offsetHeight
            }
        }
        var a = Core.System.winSize(f);
        if (b < a.height) {
            pageHeight = a.height
        } else {
            pageHeight = b
        }
        if (g < a.width) {
            pageWidth = a.width
        } else {
            pageWidth = g
        }
        return [pageWidth, pageHeight, a.width, a.height]
    };
Core.System.getScrollPos = function(f) {
        f = f || document;
        var a = f.documentElement;
        var b = f.body;
        return [Math.max(a.scrollTop, b.scrollTop), Math.max(a.scrollLeft, b.scrollLeft), Math.max(a.scrollWidth, b.scrollWidth), Math.max(a.scrollHeight, b.scrollHeight)]
    };
App.Dialog = {};
App.Dialog.BasicDialog = function(l, j, a) {
        a = a || {};
        a.noDrag = a.noDrag || true;
        this._node = $C("div");
        document.getElementsByTagName("BODY")[0].appendChild(this._node);
        var f = {
            title: l ? l : "BasicDialog",
            content: j ? j : "......",
            closeTip: $CLTMSG.CD0018
        };
        var h = this._node.style;
        h.position = "absolute";
        h.visibility = "hidden";
        if (a.zIndex) {
            h.zIndex = a.zIndex
        }
        if (a.hidden) {
            h.visibility = "hidden"
        }
        var k = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxTop"><div class="topCon"><strong>#{title}</strong><a href="javascript:;" class="close" title="#{closeTip}"></a><div class="clear"></div></div></div><div class="layerBoxCon">#{content}</div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr>			    </tbody></table>';
        var g = new Utils.Template(k);
        this._node.innerHTML = g.evaluate(f);
        this._node_body = Core.Dom.getElementsByClass(this._node, "DIV", "layerBoxCon")[0];
        this.setSize(a.width, a.height);
        this._btn_close = this._node.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.firstChild.childNodes[1];
        this._node_title = this._btn_close.previousSibling;
        this._btn_close.parent = this;
        this._btn_close.onclick = function() {
            Core.Events.stopEvent();
            if (a.hiddClose) {
                this.parent.hidd()
            } else {
                this.parent.close()
            }
        };
        this._btn_close.onmousedown = function() {};
        this._btn_move = this._btn_close.parentNode.parentNode;
        this._btn_move.parent = this;
        this._btn_move.onmousedown = function() {
            var m = Core.Events.fixEvent(Core.Events.getEvent());
            this.parent._ondrag = true;
            this.offsetx = m.layerX;
            this.offsety = m.layerY
        };
        if (!a.noDrag) {
            this._btn_move.style.cursor = "pointer"
        }
        var b = this;
        this._btn_move.mousemoveHandler = function() {
            b._mousemoveHandler()
        };
        this._btn_move.mouseupHandler = function() {
            b._mouserupHandler()
        };
        this._btn_move.resize = function() {
            b.resize()
        };
        this._btn_move.scroll = function() {
            b.scroll()
        };
        this._btn_move.close = function(n) {
            if (a.esc) {
                return
            }
            var m = n.keyCode;
            if (m === 27) {
                b.close()
            }
        };
        this.setMiddle();
        if (a.hidden) {
            h.visibility = "hidden";
            this.focusTarget = this._btn_close
        } else {
            h.visibility = "visible";
            this._btn_close.focus();
            this._btn_close.blur()
        }
        this.setMask(this._node.style.zIndex, a.hidden);
        if (!a.noDrag) {
            Core.Events.addEvent(document, this._btn_move.mousemoveHandler, "mousemove");
            Core.Events.addEvent(document, this._btn_move.mouseupHandler, "mouseup")
        }
        Core.Events.addEvent(window, this._btn_move.resize, "resize");
        Core.Events.addEvent(window, this._btn_move.scroll, "scroll");
        Core.Events.addEvent(document, this._btn_move.close, "keydown")
    };
App.Dialog.BasicDialog.prototype = {
        onClose: function() {},
        onHidd: function() {},
        gc: function() {},
        distory: function() {
            if (this._distory) {
                return
            }
            this.gc();
            Core.Events.removeEvent(document, this._btn_move.mousemoveHandler, "mousemove");
            Core.Events.removeEvent(document, this._btn_move.mouseupHandler, "mouseup");
            Core.Events.removeEvent(window, this._btn_move.resize, "resize");
            Core.Events.removeEvent(window, this._btn_move.scroll, "scroll");
            this._btn_close.onmousedown = null;
            this._btn_close.onclick = null;
            this._btn_close.parent = null;
            this._btn_close = null;
            this._node.parentNode.removeChild(this._node);
            this._mask && this._mask.parentNode.removeChild(this._mask);
            this._mask1.parentNode.removeChild(this._mask1);
            if (scope.$IE) {
                this._node.outerHTML = null;
                this._mask && (this._mask.outerHTML = null);
                this._mask1.outerHTML = null
            }
            this._node = null;
            this._btn_move.mousemoveHandler = null;
            this._btn_move.mouseupHandler = null;
            this._btn_move.resize = null;
            this._btn_move.scroll = null;
            this._btn_move.onmousedown = null;
            this._btn_move.parent = null;
            this._btn_move = null;
            this._mask && (this._mask = null);
            this._distory = true
        },
        close: function() {
            if (this.onClose) {
                this.onClose()
            }
            this.distory()
        },
        show: function() {
            this._node.style.visibility = "visible";
            this._mask && (this._mask.style.visibility = "visible");
            this._mask1.style.visibility = "visible";
            if (this.focusTarget) {
                this.focusTarget.focus()
            }
            this.resize();
            this.setMiddle()
        },
        hidd: function() {
            if (this.onHidd) {
                this.onHidd()
            }
            this._node.style.visibility = "hidden";
            this._mask && (this._mask.style.visibility = "hidden");
            this._mask1.style.visibility = "hidden"
        },
        setMask: function(z, hidden) {
            $IE && (this._mask = document.getElementsByTagName("BODY")[0].appendChild($C("iframe")));
            this._mask1 = document.getElementsByTagName("BODY")[0].appendChild($C("div"));
            if (hidden) {
                this._mask && (this._mask.style.visibility = "hidden");
                this._mask1.style.visibility = "hidden"
            }
            if (this._mask) {
                with(this._mask.style) {
                    position = "absolute";
                    width = "100%";
                    zIndex = parseInt(z) - 2;
                    top = "0px";
                    left = "0px";
                    border = "0"
                }
            }
            with(this._mask1.style) {
                position = "absolute";
                backgroundColor = "#000";
                width = "100%";
                zIndex = parseInt(z) - 1;
                top = "0px";
                left = "0px"
            }
            this._mask && Core.Dom.opacity(this._mask, 0);
            Core.Dom.opacity(this._mask1, 15);
            this.resize()
        },
        setPosition: function(a, b) {
            this._node.style.left = a + "px";
            this._node.style.top = b + "px"
        },
        resize: function() {
            if (this._mask1) {
                var f = Core.System.getScrollPos(),
                    b = Core.System.winSize(),
                    a;
                a = (b.height + 160) + "px";
                this._mask1.style.height = a;
                this._mask && (this._mask.style.height = a);
                a = (f[0] - 80) + "px";
                this._mask1.style.top = a;
                this._mask && (this._mask.style.top = a);
                this.setMiddle()
            }
        },
        scroll: function() {
            var b = Core.System.getScrollPos(),
                f = this._mask1.offsetHeight,
                a;
            if ((b[0] + f) <= b[3]) {
                    a = (b[0] - 80) + "px";
                    this._mask && (this._mask.style.top = a);
                    this._mask1.style.top = a
                } else {
                    a = (b[3] - f) + "px";
                    this._mask && (this._mask.style.top = a);
                    this._mask1.style.top = a
                }
        },
        setTitle: function(a) {
            this._node_title.innerHTML = a
        },
        setMiddle: function() {
            var g = this._node.offsetWidth;
            var j = this._node.offsetHeight;
            var b = Core.System.winSize();
            var h = Core.System.getScrollPos();
            var f = (b.width - g) / 2;
            var a = h[0] + (b.height - j) / 2;
            this._node.style.left = f + "px";
            this._node.style.top = (a < 20 ? 20 : a) + "px"
        },
        setSize: function(a, b) {
            a = a ? a + "px" : "auto";
            b = b ? b + "px" : "auto";
            var f = this._node_body.style;
            f.width = a;
            f.height = b
        },
        _mousemoveHandler: function() {
            if (this._ondrag) {
                var a = Core.Events.fixEvent(Core.Events.getEvent());
                if (a.target == this._btn_close) {
                    return
                }
                if ($IE) {
                    var b = Core.System.getScrollPos();
                    this._node.style.left = a.pageX - this._btn_move.offsetx + b[1] + "px";
                    this._node.style.top = a.pageY - this._btn_move.offsety + b[0] + "px"
                } else {
                    this._node.style.left = a.pageX - this._btn_move.offsetx + "px";
                    this._node.style.top = a.pageY - this._btn_move.offsety + "px"
                }
            }
        },
        _mouserupHandler: function() {
            this._ondrag = false;
            if (this._btn_move.offsetx) {
                this._btn_move.offsetx = null
            }
            if (this._btn_move.offsety) {
                this._btn_move.offsety = null
            }
        }
    };
App.alert = function(a, b) {
        b = b ? b : {};
        b.hasBtn = b.hasBtn == null ? true : b.hasBtn;
        var m = b.title ? b.title : $CLTMSG.CL0601;
        var r = b.ok_label ? b.ok_label : $CLTMSG.CL0602;
        if (typeof a == "object") {
            a = App.getMsg(a.code, a.replace)
        }
        var p = b.ok ? b.ok : null;
        var f = {};
        f.width = b.width ? b.width : 360;
        f.height = b.height;
        f.zIndex = b.zIndex ? b.zIndex : 1000;
        f.hidden = b.hidden;
        var n = [];
        n.push('<div class="commonLayer2">');
        n.push('<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>');
        n.push('<div class="layerR">');
        n.push("	<strong>#{cnt}</strong>");
        n.push("</div>");
        n.push('<div class="clear"></div>');
        if (b.hasBtn) {
            n.push('	<div class="MIB_btn">')
        } else {
            n.push('	<div class="MIB_btn" style="height:0;">')
        }
        n.push('	<a href="javascript:;" id="#{btn_id}" class="btn_normal"><em>' + r + "</em></a>");
        n.push("</div></div>");
        var g = new Utils.Template(n.join(""));
        var q = "btn_" + (new Date()).getTime();
        var l = b.icon ? b.icon : 1;
        a = g.evaluate({
            cnt: a,
            icon: l,
            btn_id: q
        });
        var j = new App.Dialog.BasicDialog(m, a, f);
        var k = $E(q);
        var h = function() {
            if (p) {
                try {
                    p()
                } catch (s) {}
            }
            p = null;
            k.onclick = null;
            k = null;
            j.close();
            Core.Events.removeEvent(document, o, "keyup");
            return false
        };
        var o = function(v) {
            var t = window.event || v;
            var s;
            if (t.target) {
                s = v.target
            } else {
                if (t.srcElement) {
                    s = v.srcElement
                }
            }
            if (s.nodeType == 3) {
                s = s.parentNode
            }
            if (s.tagName == "INPUT" || s.tagName == "TEXTAREA") {
                return
            }
            switch (t.keyCode) {
            case 27:
                h();
                break
            }
        };
        k.onclick = h;
        Core.Events.addEvent(document, o, "keyup");
        if (f.hidden) {
            this.focusTarget = k
        } else {
            k.focus()
        }
        return j
    };
App.confirm = function(f, r) {
        r = r ? r : {};
        var w = r.title ? r.title : $CLTMSG.CL0601;
        var v = r.ok_label ? r.ok_label : $CLTMSG.CL0602;
        var m = r.cancel_label ? r.cancel_label : $CLTMSG.CL0603;
        var b = "";
        if (typeof f == "object") {
            b = f.des;
            if (f.code) {
                f = App.getMsg(f.code, f.replace)
            } else {
                f = f.html
            }
        }
        if (f) {
            f = "<strong>" + f + "</strong>"
        }
        if (b) {
            b = '<div class="txt">' + b + "</div>"
        }
        var g = r.ok ? r.ok : null;
        var p = r.cancel ? r.cancel : null;
        var k = {};
        k.width = r.width ? r.width : 390;
        k.height = r.height;
        k.zIndex = r.zIndex ? r.zIndex : 1000;
        k.hidden = r.hidden;
        var x = '<div class="commonLayer2">                        	<div class="layerL"><img class="PY_ib PY_ib_#{icon}" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" alt="" title="" align="absmiddle"/></div>                        	<div class="layerR">					#{cnt}			        	#{des}                                	<div class="MIB_btn">						<a href="javascript:;" id="ok_#{t}" class="btn_normal"><em>' + v + '</em></a>						<a href="javascrpt:;" id="cancel_#{t}" class="btn_notclick"><em>' + m + '</em></a>					</div>                            	</div>                            <div class="clear"></div>                        </div>';
        var q = new Utils.Template(x);
        var j = (new Date()).getTime();
        var n = r.icon ? r.icon : 4;
        f = q.evaluate({
            cnt: f,
            des: b,
            icon: n,
            t: j
        });
        var l = new App.Dialog.BasicDialog(w, f, k);
        var s = $E("ok_" + j);
        var o = $E("cancel_" + j);
        var h = function(z) {
            var y = window.event || z;
            var t;
            if (y.target) {
                t = z.target
            } else {
                if (y.srcElement) {
                    t = z.srcElement
                }
            }
            if (t.nodeType == 3) {
                t = t.parentNode
            }
            if (t.tagName == "INPUT" || t.tagName == "TEXTAREA") {
                return
            }
            switch (y.keyCode) {
            case 27:
                a();
                break
            }
        };
        var a = function() {
            if (p) {
                try {
                    p()
                } catch (t) {}
            }
            p = null;
            s.onclick = null;
            o.onclick = null;
            o = null;
            s = null;
            l.distory();
            l = null;
            Core.Events.removeEvent(document, h, "keyup");
            return false
        };
        s.onclick = function() {
            if (g) {
                try {
                    g()
                } catch (t) {}
            }
            g = null;
            s.onclick = null;
            o.onclick = null;
            o = null;
            s = null;
            l.distory();
            l = null;
            Core.Events.removeEvent(document, h, "keyup");
            return false
        };
        o.onclick = a;
        if (r.ok_focus) {
            if (r.hidden) {
                this.focusTarget = s
            } else {
                s.focus()
            }
        } else {
            if (r.cancel_focus) {
                if (r.hidden) {
                    this.focusTarget = o
                } else {
                    o.focus()
                }
            }
        }
        Core.Events.addEvent(document, h, "keyup");
        return l
    };
App.customDialog = function(n, f) {
        f = f ? f : {};
        var p = f.title ? f.title : $CLTMSG.CL0601;
        var h = {};
        h.width = f.width ? f.width : 360;
        h.height = f.height;
        h.zIndex = f.zIndex ? f.zIndex : 1000;
        h.hidden = f.hidden;
        var m = '#{cnt} <div class="layerBtn" id="btn_#{t}"></div>';
        var l = new Utils.Template(m);
        var r = (new Date()).getTime();
        var b = l.evaluate({
            cnt: n,
            t: r
        });
        var o = new App.Dialog.BasicDialog(p, b, h);
        var q = $E("btn_" + r);
        var j = f.btns;
        for (var k = 0; k < j.length; k++) {
            var a = q.appendChild($C("a"));
            a.className = "mBlogBtn";
            a.href = "javascript:;";
            if (j[k].select) {
                if (f.hidden) {
                    this.focusTarget = a
                } else {
                    a.focus()
                }
            }
            a.innerHTML = "<em>" + j[k].text + "</em>";
            a.nohide = f.btns[k].nohide;
            a.func = f.btns[k].func;
            a.onclick = function() {
                var s = this.nohide;
                if (this.func) {
                    try {
                        this.func()
                    } catch (t) {}
                }
                if (!s) {
                    o.close()
                }
                return false
            }
        }
        function g() {
            var s = q.getElementsByTagName("A");
            for (var t in s) {
                s[t].nohide = null;
                s[t].func = null;
                s[t].onclick = null
            }
            q = null
        }
        o.close = function() {
            o.onClose();
            g();
            o.distory()
        };
        return o
    };
if (!App.getMsg) {
        App.getMsg = function(b, a) {
            alert("you should override this function! get more help from dialog.js ");
            return b
        }
    }
App.getMsg = function(a, f) {
        if (a === undefined) {
            return ""
        }
        if (typeof(a) == "object") {
            a = a.code
        }
        var g = $SYSMSG[a] || $CLTMSG[a] || ("Error[" + a + "]");
        if (f) {
            var b = new Utils.Template(g);
            return b.evaluate(f)
        } else {
            return g
        }
    };
App.Dom = (function() {
        var b = document.documentElement,
            a = (!b.hasAttribute) ? "className" : "class";
        var f = {
                trim: function(g) {
                    try {
                        return g.replace(/^\s+|\s+$/g, "")
                    } catch (h) {
                        return g
                    }
                },
                hasClass: function(j, h) {
                    var g = false,
                        k;
                    if (j && h) {
                            k = j.getAttribute(a) || "";
                            if (h.exec) {
                                g = h.test(k)
                            } else {
                                g = h && (" " + k + " ").indexOf(" " + h + " ") > -1
                            }
                        } else {}
                    return g
                },
                addClass: function(j, h) {
                    var g = false,
                        k;
                    if (j && h) {
                            k = j.className || "";
                            if (!this.hasClass(j, h)) {
                                k += " " + h;
                                j.setAttribute(a, k.replace(/^\s+|\s+$/g, ""));
                                g = true
                            }
                        } else {}
                    return g
                },
                removeClass: function(k, j) {
                    var h = false,
                        m, l, g;
                    if (k && j) {
                            m = k.getAttribute(a) || "";
                            k.setAttribute(a, f.trim((m + " ").replace(j + " ", "")));
                            l = k.getAttribute(a);
                            if (m !== l) {
                                k.setAttribute(a, f.trim(l));
                                h = true;
                                if (k.getAttribute(a) === "") {
                                    k.removeAttribute(a)
                                }
                            }
                        } else {}
                    return h
                },
                replaceClass: function(h, j, g) {
                    f.removeClass(h, g);
                    f.addClass(h, j)
                },
                getByClass: function(m, h, j) {
                    m = f.trim(m);
                    h = h || "*";
                    if (!j) {
                        return []
                    }
                    var k = [],
                        n = j.getElementsByTagName(h);
                    for (var l = 0, g = n.length; l < g; ++l) {
                            if (f.hasClass(n[l], m)) {
                                k[k.length] = n[l]
                            }
                        }
                    return k
                },
                getBy: function(n, h, j) {
                    h = h || "*";
                    if (!j) {
                        return []
                    }
                    var k = [],
                        m = j.getElementsByTagName(h);
                    for (var l = 0, g = m.length; l < g; ++l) {
                            if (n(m[l])) {
                                k[k.length] = m[l]
                            }
                        }
                    return k
                },
                getXY: function(k, h) {
                    h = h || {};
                    h.abs = h.abs || false;
                    var l = {};
                    var j = function(p) {
                        var m = 0,
                            q = 0;
                        if (p.getBoundingClientRect) {
                                var n = p.getBoundingClientRect();
                                var o = b;
                                m = n.left + Math.max(o.scrollLeft, document.body.scrollLeft) - o.clientLeft;
                                q = n.top + Math.max(o.scrollTop, document.body.scrollTop) - o.clientTop
                            } else {
                                for (; p != document.body; m += p.offsetLeft, q += p.offsetTop, p = p.offsetParent) {}
                            }
                        return {
                                x: m,
                                y: q
                            }
                    };
                    l = j(k);
                    if (h.abs) {
                        while (k = k.offsetParent) {
                            if (App.Dom.getStyle(k, "position") == "absolute") {
                                var g = j(k);
                                l.x -= g.x;
                                l.y -= g.y
                            }
                        }
                    }
                    return l
                },
                getScreen: function() {
                    var g = {};
                    if ($IE) {
                        g.w = b.clientWidth;
                        g.h = b.clientHeight
                    } else {
                        g.w = window.innerWidth;
                        g.h = window.innerHeight
                    }
                    return g
                },
                getStyle: function(g, k) {
                    if ($IE) {
                        var j = g.currentStyle ? g.currentStyle[k] : null;
                        switch (k) {
                        case "opacity":
                            var m = 100;
                            try {
                                m = g.filters["DXImageTransform.Microsoft.Alpha"].opacity
                            } catch (l) {
                                try {
                                    m = g.filters("alpha").opacity
                                } catch (l) {}
                            }
                            return m / 100;
                        case "float":
                            k = "styleFloat";
                        case "height":
                            return (j == "auto") ? "0px" : g.style[k];
                        case "width":
                            return (j == "auto") ? "0px" : g.style[k];
                        default:
                            var j = g.currentStyle ? g.currentStyle[k] : null;
                            return (g.style[k] || j)
                        }
                    } else {
                        if (k == "float") {
                            k = "cssFloat"
                        }
                        try {
                            var h = document.defaultView.getComputedStyle(g, "")
                        } catch (l) {
                            traceError(l)
                        }
                        return g.style[k] || h ? h[k] : null
                    }
                },
                setStyle: function(g, h, j) {
                    if ($IE) {
                        switch (h) {
                        case "opacity":
                            g.style.filter = "alpha(opacity=" + (j * 100) + ")";
                            if (!g.currentStyle || !g.currentStyle.hasLayout) {
                                g.style.zoom = 1
                            }
                            break;
                        case "float":
                            h = "styleFloat"
                        }
                    } else {
                        if (h == "float") {
                            h = "cssFloat"
                        }
                    }
                    g.style[h] = j
                },
                insertAfter: function(j, h) {
                    var g = h.parentNode;
                    if (g.lastChild == h) {
                        g.appendChild(j)
                    } else {
                        g.insertBefore(j, h.nextSibling)
                    }
                },
                getScroll: function() {
                    var o = document.documentElement,
                        k = document.body;
                    var m, j, g, n;
                    if (o && o.scrollTop) {
                            m = o.scrollTop;
                            j = o.scrollLeft;
                            g = o.scrollWidth;
                            n = o.scrollHeight
                        } else {
                            if (k) {
                                m = k.scrollTop;
                                j = k.scrollLeft;
                                g = k.scrollWidth;
                                n = k.scrollHeight
                            }
                        }
                    return {
                            t: m,
                            l: j,
                            w: g,
                            h: n
                        }
                },
                domClick: function(h) {
                    if ($IE) {
                        h.click()
                    } else {
                        var g = document.createEvent("MouseEvents");
                        g.initEvent("click", true, true);
                        h.dispatchEvent(g)
                    }
                },
                contains: function(g, h) {
                    if (g === h) {
                        return false
                    } else {
                        if (g.compareDocumentPosition) {
                            return ((g.compareDocumentPosition(h) & 16) === 16)
                        } else {
                            if (g.contains && h.nodeType === 1) {
                                return g.contains(h)
                            } else {
                                while (h = h.parentNode) {
                                    if (g === h) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                    return false
                }
            };
        return f
    })();
Core.Dom.getStyle = function(a, f) {
        switch (f) {
        case "opacity":
            var h = 100;
            try {
                h = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
            } catch (g) {
                try {
                    h = a.filters("alpha").opacity
                } catch (g) {}
            }
            return h / 100;
        case "float":
            f = "styleFloat";
        default:
            var b = a.currentStyle ? a.currentStyle[f] : null;
            return (a.style[f] || b)
        }
    };
if (!Core.Base.detect.$IE) {
        Core.Dom.getStyle = function(a, f) {
            if (f == "float") {
                f = "cssFloat"
            }
            try {
                var b = document.defaultView.getComputedStyle(a, "")
            } catch (g) {
                traceError(g)
            }
            return a.style[f] || b ? b[f] : null
        }
    }
Core.Dom.getXY = function(b) {
        if ((b.parentNode == null || b.offsetParent == null || Core.Dom.getStyle(b, "display") == "none") && b != document.body) {
            return false
        }
        var a = null;
        var j = [];
        var f;
        var g = b.ownerDocument;
        f = b.getBoundingClientRect();
        var h = Core.System.getScrollPos(b.ownerDocument);
        return [f.left + h[1], f.top + h[0]];
        a = b.parentNode;
        while (a.tagName && !/^body|html$/i.test(a.tagName)) {
            if (Core.Dom.getStyle(a, "display").search(/^inline|table-row.*$/i)) {
                j[0] -= a.scrollLeft;
                j[1] -= a.scrollTop
            }
            a = a.parentNode
        }
        return j
    };
if (!$IE) {
        Core.Dom.getXY = function(b) {
            if ((b.parentNode == null || b.offsetParent == null || Core.Dom.getStyle(b, "display") == "none") && b != document.body) {
                return false
            }
            var a = null;
            var j = [];
            var f;
            var g = b.ownerDocument;
            j = [b.offsetLeft, b.offsetTop];
            a = b.offsetParent;
            var h = Core.Dom.getStyle(b, "position") == "absolute";
            if (a != b) {
                while (a) {
                    j[0] += a.offsetLeft;
                    j[1] += a.offsetTop;
                    if (scope.$SAFARI && !h && Core.Dom.getStyle(a, "position") == "absolute") {
                        h = true
                    }
                    a = a.offsetParent
                }
            }
            if (scope.$SAFARI && h) {
                j[0] -= b.ownerDocument.body.offsetLeft;
                j[1] -= b.ownerDocument.body.offsetTop
            }
            a = b.parentNode;
            while (a.tagName && !/^body|html$/i.test(a.tagName)) {
                if (Core.Dom.getStyle(a, "display").search(/^inline|table-row.*$/i)) {
                    j[0] -= a.scrollLeft;
                    j[1] -= a.scrollTop
                }
                a = a.parentNode
            }
            return j
        }
    }(function(b) {
        var j, h, a, f = 8,
            g;
        b.scrollTo = function(m, k, l) {
                f = l || f;
                g = m - k;
                h = [g];
                h[f] = 0;
                a = 1;
                for (a; a < f; a++) {
                    h[a] = (g = g / 2)
                }
                clearInterval(j);
                j = setInterval(function() {
                    if (h.length) {
                        window.scrollTo(0, k + h.shift());
                        return
                    }
                    clearInterval(j)
                }, 30)
            }
    })(App);
    //1#
    (function() {
        Boot.addDOMLoadEvent(function() {
            var m = $C("a");
            var f = Core.Events.addEvent;
            var k = scope.goTopBg || "";
            var g = '<span class="goTopbg ' + k + '"></span>					<span class="goTopcon">						<em class="toparr">&lt;</em><span>' + $CLTMSG.CD0183 + "</span>					</span>";
            m.harf = "return false;";
            m.className = "goTop";
            m.innerHTML = g;
            var b = function() {
                return Core.System.getScrollPos(document)[0]
            };
            var j = function() {
                return App.Dom.getScreen().h
            };
            var n = function() {
                return App.Dom.getScreen().w
            };
            var a = function() {
                Core.Dom.setStyle(m, "visibility", "hidden")
            };
            var h = function() {
                Core.Dom.setStyle(m, "visibility", "visible")
            };
            var l = function() {
                Core.Dom.setStyle(m, "top", b() + j() - 110 + "px");
                h()
            };
            b() ? h() : a();
            document.body.appendChild(m);
            if ($IE6) {
                f(window, function() {
                    Core.Dom.setStyle(m, "display", (n() <= 800) ? "none" : "");
                    (Core.Dom.getStyle(m, "display") !== "none") && b() && l()
                }, "resize")
            } else {
                Core.Dom.setStyle(m, "position", "fixed");
                Core.Dom.setStyle(m, "bottom", "30px")
            }
            f(m, function() {
                App.scrollTo(Core.System.getScrollPos(document)[0], 0)
            }, "click");
            f(window, (function() {
                var o = "";
                return function() {
                    o && clearTimeout(o);
                    if (b()) {
                        if ($IE6) {
                            a();
                            o = setTimeout(l, 500)
                        } else {
                            h()
                        }
                    } else {
                        a()
                    }
                }
            })(), "scroll")
        })
    })();
Sina.pkg("Core.String");
Core.String.byteLength = function(b) {
        if (typeof b == "undefined") {
            return 0
        }
        var a = b.match(/[^\x00-\x80]/g);
        return (b.length + (!a ? 0 : a.length))
    };
Core.String.trimHead = function(a) {
        return a.replace(/^(\u3000|\s|\t)*/gi, "")
    };
Core.String.trimTail = function(a) {
        return a.replace(/(\u3000|\s|\t)*$/gi, "")
    };
Core.String.trim = function(a) {
        return Core.String.trimHead(Core.String.trimTail(a))
    };
Sina.pkg("Utils.Sinput");
Core.Function.bind3 = function(g, f, b) {
        b = b == null ? [] : b;
        var a = g;
        return function() {
            return a.apply(f, b)
        }
    };
Core.String.leftB = function(f, a) {
        var b = f.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
        f = f.slice(0, b.slice(0, a).replace(/\*\*/g, " ").replace(/\*/g, "").length);
        if (Core.String.byteLength(f) > a) {
            f = f.slice(0, f.length - 1)
        }
        return f
    };
Utils.Sinput.limitMaxLen = function(a, b) {
        var f;
        var g = function() {
            f = a.value;
            var h = Core.String.byteLength(f);
            if (h > b) {
                a.value = Core.String.leftB(f, b)
            }
        };
        Core.Events.addEvent(a, Core.Function.bind3(g, a), "keyup");
        Core.Events.addEvent(a, Core.Function.bind3(g, a), "blur");
        Core.Events.addEvent(a, Core.Function.bind3(g, a), "focus")
    };
Core.String.j2o = function(str) {
        if (!str || str == "") {
            return null
        }
        try {
            var o = window.eval("(" + str + ")");
            return o
        } catch (e) {
            $Debug("j2o : 数据分析出错");
            traceError(e);
            return null
        }
    };
Sina.pkg("Utils.Io");
Utils.Url = function(a) {
        a = a || "";
        this.url = a;
        this.query = {};
        this.parse()
    };
Utils.Url.prototype = {
        parse: function(a) {
            if (a) {
                this.url = a
            }
            this.parseAnchor();
            this.parseParam()
        },
        parseAnchor: function() {
            var a = this.url.match(/\#(.*)/);
            a = a ? a[1] : null;
            this._anchor = a;
            if (a != null) {
                this.anchor = this.getNameValuePair(a);
                this.url = this.url.replace(/\#.*/, "")
            }
        },
        parseParam: function() {
            var a = this.url.match(/\?([^\?]*)/);
            a = a ? a[1] : null;
            if (a != null) {
                this.url = this.url.replace(/\?([^\?]*)/, "");
                this.query = this.getNameValuePair(a)
            }
        },
        getNameValuePair: function(b) {
            var a = {};
            b.replace(/([^&=]*)(?:\=([^&]*))?/gim, function(f, h, g) {
                if (h == "") {
                    return
                }
                a[h] = g || ""
            });
            return a
        },
        getParam: function(a) {
            return this.query[a] || ""
        },
        clearParam: function() {
            this.query = {}
        },
        setParam: function(a, b) {
            if (a == null || a == "" || typeof(a) != "string") {
                throw new Error("no param name set")
            }
            this.query = this.query || {};
            this.query[a] = b
        },
        setParams: function(a) {
            this.query = a
        },
        serialize: function(f) {
            var a = [];
            for (var b in f) {
                if (f[b] == null || f[b] == "") {
                    a.push(b + "=")
                } else {
                    a.push(b + "=" + f[b])
                }
            }
            return a.join("&")
        },
        toString: function() {
            var a = this.serialize(this.query);
            return this.url + (a.length > 0 ? "?" + a : "") + (this.anchor ? "#" + this.serialize(this.anchor) : "")
        },
        getHashStr: function(a) {
            return this.anchor ? "#" + this.serialize(this.anchor) : (a ? "#" : "")
        }
    };
Core.String.encodeDoubleByte = function(a) {
        if (typeof a != "string") {
            return a
        }
        return encodeURIComponent(a)
    };
Utils.Io.Ajax = {
        createRequest: function() {
            var f = null;
            try {
                f = new XMLHttpRequest()
            } catch (b) {
                try {
                    f = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (g) {
                    try {
                        f = ActiveXObject("Microsoft.XMLHTTP")
                    } catch (a) {}
                }
            }
            if (f == null) {
                $Debug.error("<b>create request failed</b>", {
                    html: true
                })
            } else {
                return f
            }
        },
        request: function(a, b) {
            b = b || {};
            b.onComplete = b.onComplete ||
            function() {};
            b.onException = b.onException ||
            function() {};
            b.returnType = b.returnType || "txt";
            b.method = b.method || "get";
            b.data = b.data || {};
            if (typeof b.GET != "undefined" && typeof b.GET.url_random != "undefined" && b.GET.url_random == 0) {
                this.rand = false;
                b.GET.url_random = null
            }
            return this.loadData(a, b)
        },
        loadData: function(url, option) {
            var request = this.createRequest(),
                tmpArr = [];
            var _url = new Utils.Url(url);
            if (option.POST) {
                    for (var postkey in option.POST) {
                        var postvalue = option.POST[postkey];
                        if (postvalue != null) {
                            tmpArr.push(postkey + "=" + Core.String.encodeDoubleByte(postvalue))
                        }
                    }
                }
            var sParameter = tmpArr.join("&") || "";
            if (option.GET) {
                    for (var key in option.GET) {
                        if (key != "url_random") {
                            _url.setParam(key, Core.String.encodeDoubleByte(option.GET[key]))
                        }
                    }
                }
            if (this.rand != false) {
                    _url.setParam("rnd", Math.random())
                }
            request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        var response, type = option.returnType;
                        try {
                            switch (type) {
                            case "txt":
                                response = request.responseText;
                                break;
                            case "xml":
                                if (Core.Base.detect.$IE) {
                                    response = request.responseXML
                                } else {
                                    var Dparser = new DOMParser();
                                    response = Dparser.parseFromString(request.responseText, "text/xml")
                                }
                                break;
                            case "json":
                                response = eval("(" + request.responseText + ")");
                                break
                            }
                            option.onComplete(response)
                        } catch (e) {
                            option.onException(e.message, _url);
                            return false
                        }
                    }
                };
            try {
                    if (option.POST) {
                        request.open("POST", _url, true);
                        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        request.send(sParameter)
                    } else {
                        request.open("GET", _url, true);
                        request.send(null)
                    }
                    return request
                } catch (e) {
                    option.onException(e.message, _url);
                    return false
                }
        }
    };
App.doRequest = function(a, b, h, k, m, j, l) {
        var g = function() {};
        var f = {
            onComplete: function(n) {
                try {
                    if (typeof n == "string") {
                        n = n.replace(/;$/, "")
                    }
                    n = (typeof n == "string" && (/\s*{/.test(n))) ? Core.String.j2o(n) : n;
                    if (n && (n.code == "A00006" || n.code == "S00001")) {
                        (h || g)(n.data, n)
                    } else {
                        (k || g)(n)
                    }
                } catch (o) {}
            },
            onException: function(n) {
                (k || g)(n)
            }
        };
        m = (m || "post").toUpperCase();
        l = l || {};
        f[m] = a;
        f.returnType = "json";
        f.onTimeout = l.func ||
        function() {};
        f.delayTime = l.delay || 0;
        j = j || "ajax";
        return Utils.Io.Ajax.request(b, f)
    };
Core.Dom.replaceNode = function(a, b) {
        if (a == null || b == null) {
            return false
        }
        a = $E(a);
        b = $E(b);
        b.parentNode.replaceChild(a, b)
    };
Sina.pkg("Core.Class");
Core.Class.extend = function(a, f) {
        for (var b in f) {
            a[b] = f[b]
        }
        return a
    };
App.enterSubmit = function(options) {
        options = Core.Class.extend({
            parent: document
        }, options);
        var _p = $E(options.parent);
        var _checkEnter = function() {
            var _e = Core.Events.getEvent();
            var _k = _e.keyCode;
            var _act = this.getAttribute("act") || options.action || null;
            if (_k === 13 && _act) {
                try {
                    if (typeof _act === "string") {
                        eval("(" + _act + ")();")
                    } else {
                        if (typeof _act === "function") {
                            _act()
                        }
                    }
                } catch (e) {}
            }
        };
        if (_p) {
            var els = _p.getElementsByTagName("input");
            for (var i = 0, l = els.length; i < l; i++) {
                var cur = els[i];
                var _t = cur.getAttribute("type").toLowerCase();
                if (_t === "text" || _t === "password" || _t === "checkbox") {
                    if (cur.getAttribute("passenter") === "1") {
                        continue
                    }
                    Core.Events.addEvent(cur, _checkEnter.bind2(cur), "keydown")
                }
            }
        }
    };
Core.Dom.addHTML = function(a, b) {
        a.insertAdjacentHTML("BeforeEnd", b)
    };
if (!$IE) {
        Core.Dom.addHTML = function(b, f) {
            var g = b.ownerDocument.createRange();
            g.setStartBefore(b);
            var a = g.createContextualFragment(f);
            b.appendChild(a)
        }
    }
App.fixElement = {
        init: function(f) {
            var b = $E("mod_login_tip");
            if (!b) {
                var a = '<div class="errorLayer" id="mod_login_tip" style="visibility:hidden">				<div class="top"></div>			    <div class="mid">			    	<div class="close" onclick="App.fixElement.hidden()" id="mod_login_close">x</div>			        <div class="conn">			        		<p class="bigtxt" id="mod_login_title"></p>				            <span class="stxt" id="mod_login_content" style="padding:0px;"></span>			        </div>			    </div>			    <div class="bot"></div>			</div>			';
                if (f) {
                    f.innerHTML = a
                } else {
                    Core.Dom.addHTML((document.body), a)
                }
            }
            b = $E("mod_login_tip");
            this.element = b
        },
        setHTML: function(f, b, a) {
            this.init($E(a.wrap));
            $E("mod_login_title").innerHTML = f || "";
            if (b) {
                $E("mod_login_content").innerHTML = b;
                $E("mod_login_content").style.display = ""
            } else {
                $E("mod_login_content").style.display = "none"
            }
            this.fixPostion(a || {});
            this.show()
        },
        fixPostion: function(h) {
            var a = h.offsetX || 0;
            var j = h.offsetY || 0;
            var f = $E(h.ref);
            var g = this.element;
            var b = Core.Dom.getXY(f);
            g.style.position = "absolute";
            if (!h.wrap) {
                g.style.left = (b[0] + a) + "px";
                g.style.top = (b[1] + j - g.offsetHeight) + "px"
            } else {
                g.style.marginTop = (-g.offsetHeight + j) + "px";
                g.style.marginLeft = (a) + "px"
            }
            g.style.zIndex = h.zIndex || 10;
            return g
        },
        show: function() {
            this.element && (this.element.style.visibility = "visible");
            if ($E("mod_login_title")) {
                $E("mod_login_title").className = "bigtxt"
            }
        },
        hidden: function() {
            this.element = this.element || $E("mod_login_tip");
            this.element && (this.element.style.visibility = "hidden")
        }
    };
Sina.pkg("Utils.Cookie");
Utils.Cookie.getCookie = function(a) {
        a = a.replace(/([\.\[\]\$])/g, "\\$1");
        var f = new RegExp(a + "=([^;]*)?;", "i");
        var g = document.cookie + ";";
        var b = g.match(f);
        if (b) {
            return b[1] || ""
        } else {
            return ""
        }
    };
Utils.Cookie.setCookie = function(b, j, f, m, h, a) {
        var k = [];
        k.push(b + "=" + escape(j));
        if (f) {
            var l = new Date();
            var g = l.getTime() + f * 3600000;
            l.setTime(g);
            k.push("expires=" + l.toGMTString())
        }
        if (m) {
            k.push("path=" + m)
        }
        if (h) {
            k.push("domain=" + h)
        }
        if (a) {
            k.push(a)
        }
        document.cookie = k.join(";")
    };
Utils.Cookie.deleteCookie = function(a) {
        document.cookie = a + "=;expires=Fri, 31 Dec 1999 23:59:59 GMT;"
    };
App.setUsername = function(f) {
        var b = $E(f);
        var a = "";
        if (b) {
            if (b.value == $CLTMSG.R01008 || b.value == $CLTMSG.CR0001) {
                a = Utils.Cookie.getCookie("un");
                if (a) {
                    b.value = unescape(a);
                    return true
                }
            }
        }
        return false
    };
window.sinaSSOConfig = {
        //feedBackUrl: "http://" + window.location.hostname + "/ajaxlogin.php",
        feedBackUrl: "http://weibo.com/ajaxlogin.php",
        service: "miniblog",
        domain: "weibo.com",
        framelogin: "1",
        pageCharset: "utf-8",
        isCheckLoginState: false,
        customLoginCallBack: function() {},
        customUpdateCookieCallBack: function() {},
        entry: "miniblog"
    };
App.initLoginInput = function(a, b) {
        if (a) {
            (function(f, g, h) {
                g.style.color = "#999999";
                g.alt = g.title = f;
                if (!h) {
                    g.value = f
                }
                if (!g.binded) {
                    Core.Events.addEvent(g, function() {
                        g.style.color = "#333333";
                        if (g.value == f) {
                            g.value = ""
                        }
                    }, "focus");
                    Core.Events.addEvent(g, function() {
                        g.style.color = "#999999";
                        if (g.value == "") {
                            g.value = f;
                            return false
                        }
                        try {
                            if (window.sinaSSOController && window.sinaSSOController.getServerTime) {
                                window.sinaSSOController.getServerTime(g.value)
                            }
                        } catch (j) {}
                    }, "blur");
                    a.binded = true
                }
            })((b ? $SYSMSG[b] : $CLTMSG.R01008), a, a.value)
        }
        if (a && (Core.String.trim(a.value) == "" || a.value == ((b ? $SYSMSG[b] : $CLTMSG.R01008)))) {
            App.setUsername(a)
        }
    };
App.LoginAction = function(l) {
        var k = Core.String.trim(l.name);
        var a = Core.String.trim(l.pwd);
        var f = l.remb ? "7" : "0";
        if (!k) {
            l.error($CLTMSG.CL0801);
            return
        } else {
            if (!a) {
                l.error($CLTMSG.CL0802);
                return
            }
        }
        var o = function() {
            var j = window.sinaSSOController;
            j.useTicket = true;
            j.useticket = 1;
            j.customLoginCallBack = function(q) {
                if (q.result) {
                    j.customLoginCallBack = function() {};
                    !App.__no_login_name__ && Utils.Cookie.setCookie("un", k, 240, "/", "weibo.com");
                    l.succ()
                } else {
                    l.error(q.reason, q.errno);
                    a.value = ""
                }
                j.customLoginCallBack = function() {};
                j = null
            };
            try {
                j.setLoginType(2);
                j.customInit = function() {
                    j.setLoginType(2)
                }
            } catch (h) {}
            setTimeout(function() {
                j.login(k, a, f)
            }, 100)
        };
        if (typeof window.sinaSSOController != "undefined") {
            o()
        } else {
            var n = document,
                b = n.createElement("script"),
                g = n.body,
                p = false;
            b.type = "text/javascript";
            b.charset = "UTF-8";
            b.src = scope.$BASECSS + "miniblog/static/js/sso.js";
            b.onload = b.onreadystatechange = function() {
                    if (!p && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                        p = true;
                        b.onload = b.onreadystatechange = null;
                        setTimeout(o, 1000)
                    }
                };
            try {
                    g.appendChild(b)
                } catch (m) {}
        }
    };
Core.Events.fireEvent = function(b, f) {
        b = $E(b) || b;
        if ($IE) {
            b.fireEvent("on" + f)
        } else {
            var a = document.createEvent("HTMLEvents");
            a.initEvent(f, true, true);
            b.dispatchEvent(a)
        }
    };
    (function(b) {
        b.checkEml = function(g) {
            if (!/^[\.\w]([(\/)(\-)(\+).\w])*@([(\-)\w]{1,64}\.){1,7}[(\-)\w]{1,64}$/.test(g)) {
                return false
            } else {
                if (g && g != "" && (g.indexOf("@") != -1)) {
                    var f = g.indexOf("@");
                    var h = g.substring(0, f);
                    if (h.length > 64 || g.length > 256) {
                        return false
                    } else {
                        return true
                    }
                }
            }
            return false
        };
        b.checkEmpty = function(f) {
            if (!f) {
                return false
            }
            if (!(f instanceof String)) {
                f = f.toString()
            }
            if ((Core.String.trim(f)).length) {
                return true
            } else {
                return false
            }
        };
        b.checkRealName = function(f) {
            if (new RegExp("^[\u4e00-\u9fa5]{2,6}$").test(f)) {
                return true
            } else {
                if (new RegExp("^[a-z]{2,20}$").test(f)) {
                    return true
                } else {
                    if (new RegExp("^[a-z\u4e00-\u9fa5]{2,6}$")) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        };
        var a = function(f) {
            return function(g) {
                if (new RegExp(f).test(g)) {
                    return true
                } else {
                    return false
                }
            }
        };
        b.checkQQNum = function(f) {
            if (new RegExp("^[1-9][0-9]{4,11}$").test(f)) {
                return true
            } else {
                if (b.checkEml(f)) {
                    return true
                } else {
                    return false
                }
            }
        };
        b.checkUCNum = function(f) {
            if (new RegExp("^[1-9][0-9]{4,9}$").test(f)) {
                return true
            } else {
                return false
            }
        };
        b.checkMobile = a("^1(\\d{10})+$");
        b.checkTrName = a("^[\u4e00-\u9fa5]{2,6}$");
        b.checkNickSp = a("^[0-9a-zA-Z\u4e00-\u9fa5_]*$");
        b.checkNickSp2 = a("^[0-9a-zA-Z\u4e00-\u9fa5_-]*$");
        b.checkTrueNm = a("^[a-zA-Z·s.\u4e00-\u9fa5]*$");
        b.checkSkype1 = a("^[0-9a-zA-Z](-|w){3}(-|w)*$");
        b.checkSkype2 = a("[!#@%&/'\"$^*()+=[]{}?;:<>|~`\x80-\xff\\]");
        b.checkImgURI = a("(.jpg|.gif|.png|.JPG|.GIF|.PNG)$");
        b.checkURL = a("^http:\\/\\/([\\w-]+(\\.[\\w-]+)+(\\/[\\w-   .\\/\\?%@&+=\\u4e00-\\u9fa5]*)?)?$");
        b.checkURLoose = a("^([^://])+\\:\\/\\/([^\\.]+)(\\.)(.+)([^\\.]+)$");
        b.checkMiniName = a("^[a-zA-Z0-9\u4e00-\u9fa5\uff00-\uffff\u0800-\u4e00\u3130-\u318f\uac00-\ud7a3_]*$");
        b.checkIdCard = a("^(([0-9]{15})|([0-9]{18})|([0-9]{17}(x|X)))$");
        b.checkSchool = function(f) {
            if (new RegExp("'|\"|<|>|[|]", "g").test(f)) {
                return false
            } else {
                return true
            }
        };
        b.checkCompany = function(f) {
            if (new RegExp("'|\"|<|>|[|]", "g").test(f)) {
                return false
            } else {
                return true
            }
        };
        b.checkMobileCheckCode = a("^[0-9a-z]{6}$");
        b.checkSepicalSymbol = function(f) {
            if (new RegExp("[,|;|<|>]", "g").test(f)) {
                return true
            } else {
                return false
            }
        };
        b.checkPwdPower = function(j, h, g) {
            var f = (j.length - h) / (g - h);
            var k = 0;
            if (/[A-Z]/g.test(j)) {
                k += 0.273
            }
            if (/[a-z]/g.test(j)) {
                k += 0.273
            }
            if (/[0-9]/g.test(j)) {
                k += 0.114
            }
            if (/[^0-9a-zA-Z]/g.test(j)) {
                k += 0.34
            }
            return f / 2 + k / 2
        };
        b.checkPwdPowerNew = function(j) {
            function h(l) {
                if (l >= 65 && l <= 90) {
                    return 2
                }
                if (l >= 97 && l <= 122) {
                    return 4
                } else {
                    return 1
                }
            }
            function g(l) {
                var m = 0;
                for (i = 0; i < 3; i++) {
                    if (l & 1) {
                        m++
                    }
                    l >>>= 1
                }
                return m
            }
            var f = 0;
            for (i = 0; i < j.length; i++) {
                f |= h(j.charCodeAt(i))
            }
            var k = g(f);
            if (j.length >= 10) {
                k++
            }
            switch (k) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            default:
                return 1
            }
        }
    })(App);
App.timer = new
function() {
        this.list = {};
        this.refNum = 0;
        this.clock = null;
        this.allpause = false;
        this.delay = 25;
        this.add = function(a) {
            if (typeof a != "function") {
                throw ("The timer needs add a function as a parameters")
            }
            var b = "" + (new Date()).getTime() + (Math.random()) * Math.pow(10, 17);
            this.list[b] = {
                fun: a,
                pause: false
            };
            if (this.refNum <= 0) {
                this.start()
            }
            this.refNum++;
            return b
        };
        this.remove = function(a) {
            if (this.list[a]) {
                delete this.list[a];
                this.refNum--
            }
            if (this.refNum <= 0) {
                this.stop()
            }
        };
        this.pause = function(a) {
            if (this.list[a]) {
                this.list[a]["pause"] = true
            }
        };
        this.play = function(a) {
            if (this.list[a]) {
                this.list[a]["pause"] = false
            }
        };
        this.stop = function() {
            clearInterval(this.clock);
            this.clock = null
        };
        this.start = function() {
            var a = this;
            this.clock = setInterval(function() {
                a.loop.apply(a)
            }, this.delay)
        };
        this.loop = function() {
            for (var a in this.list) {
                if (!this.list[a]["pause"]) {
                    this.list[a]["fun"]()
                }
            }
        }
    };
App.animation = {
        vibrate: function(l, p, f, j, r, q) {
            var h = 2 * Math.PI * Math.sqrt(f / j);
            var a = p * Math.sqrt(f / j);
            var b = Math.ceil(h * 100 / l);
            var o = 0;
            var g = [];
            while (a > r) {
                g.push(a * Math.sin((o / b) * 2 * Math.PI));
                o++;
                o = o % b;
                a = a - q
            }
            return g
        },
        accelerate: function(m, j, k, b) {
            var f = [];
            var a = 0;
            while (true) {
                var n = b;
                b = n + m * k / 10;
                a = a + m * (b + n) / 20;
                if (a < j) {
                    f.push(a)
                } else {
                    break
                }
            }
            return f
        },
        curtain: function(j, f, g) {
            var b = [f];
            var a = f;
            while (a > 1) {
                a = a * g;
                b.unshift(a)
            }
            return b
        },
        speed: function(k, j, a) {
            var g = Math.ceil(j / a);
            var l = Math.ceil(g * 100 / k);
            var b = [];
            for (var f = 0; f < l; f++) {
                b.push((f + 1) * j / l)
            }
            return b
        },
        circle: function(j, a, b) {
            var h = 2 * Math.PI * a / b;
            var k = Math.ceil(h * 100 / j);
            var f = [];
            for (var g = 0; g < k; g++) {
                f.push({
                    x: a * Math.sin(((g + 1) / k) * 2 * Math.PI),
                    y: a * Math.cos(((g + 1) / k) * 2 * Math.PI)
                })
            }
            return f
        },
        taccelerate: function(j, g, f) {
            var k = Math.ceil(f * 100 / j);
            var a = [];
            for (var b = 0; b < k; b++) {
                a.push(Math.pow((b + 1) / k, 2) * g)
            }
            return a
        }
    };
    (function(n) {
        var q = false;
        var j = 10;
        var b = 20;
        var h = 10;
        var t = 0;
        var r = 0;
        var f = 0;
        var o = 0;
        var a = 0.4;
        n.curtain = {
            droop: function(l, s, w) {
                if (q) {
                    return false
                }
                q = true;
                var p = l.style.overflow;
                l.style.visibility = "hidden";
                l.style.display = "block";
                l.style.overflow = "hidden";
                var m = parseInt(l.offsetHeight);
                var g = n.animation.curtain(n.timer.delay, m, a);
                var v = 0;
                var k = n.timer.add(function() {
                    if (v >= g.length) {
                        n.timer.remove(k);
                        l.style.height = m + "px";
                        l.style.overflow = p;
                        q = false;
                        if (typeof s == "function") {
                            s()
                        }
                        return false
                    }
                    l.style.height = g[v] + "px";
                    l.scrollTop = (m - g[v]);
                    v++
                });
                l.style.height = "0px";
                l.style.visibility = "visible";
                return true
            },
            raise: function(m, k, y) {
                if (q) {
                    return false
                }
                q = true;
                var g = m.style.overflow;
                m.style.overflow = "hidden";
                var s = parseInt(m.offsetHeight);
                var l = [];
                if (r !== 0) {
                    var z = n.animation.speed(n.timer.delay, s * f, j / f);
                    for (var p = 0, v = z.length; p < v; p++) {
                        l.push(s + z[p])
                    }
                }
                var x = n.animation.speed(n.timer.delay, s * (1 + f), j * 10);
                for (var p = 0, v = x.length; p < v; p++) {
                    l.push(x[v - p - 1])
                }
                var w = 0;
                var A = n.timer.add(function() {
                    if (w >= l.length) {
                        n.timer.remove(A);
                        m.style.display = "none";
                        m.style.height = s + "px";
                        m.style.overflow = g;
                        q = false;
                        if (typeof k == "function") {
                            k()
                        }
                        return false
                    }
                    m.style.height = l[w] + "px";
                    m.scrollTop = (s - l[w]);
                    w++
                })
            },
            setting: function(g) {
                j = g.g || j;
                b = g.m || b;
                h = g.k || h;
                t = g.s || t;
                r = g.u || r;
                f = g.l || f
            }
        }
    })(App);
App.promptTip = function(a, f, l, h) {
        var g = {
            ask: 4,
            wrong: 1,
            error: 2,
            ok: 3
        };
        h = h ? h : "ok";
        var b = (typeof a == "object") ? App.getMsg(a, f) : a;
        var k = '		<div class="PY_clew">	            <div class="PY_clewcon">	                <div class="icon"><img align="absmiddle" class="PY_ib PY_ib_' + g[h] + '" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" alt="" title=""/></div>	                <div class="txt bold">	                    ' + b + '	                </div>	                <div class="clear"></div>	            </div>	    </div>';
        var j = $E(l ? l : "system_information");
        j.innerHTML = k;
        j.style.display = "";
        App.curtain.droop(j);
        window.scrollTo(0, 0);
        App.promptTip.close = (function(m) {
            return function() {
                if (m) {
                    App.curtain.raise(m)
                }
            }
        })(j);
        setTimeout(function() {
            App.promptTip.close()
        }, 2000)
    };
    (function(a) {
        var b = Core.Events.addEvent;
        var f = Core.String.trim;
        a.checkForm = function(j) {
            var g = {};
            var h = {};
            g.add = function(m, o, l, k, n) {
                h[m] = a.checkItem(m, o, l, j, k, n)
            };
            g.check = function(p) {
                var n = true;
                if (p) {
                    for (var o = 0, l = p.length; o < l; o += 1) {
                        if (h[p[o]]) {
                            if (!h[p[o]].check()) {
                                h[p[o]].changeUI(false);
                                n = false
                            }
                        }
                    }
                } else {
                    for (var m in h) {
                        if (!h[m].check()) {
                            h[m].changeUI(false);
                            n = false
                        }
                    }
                }
                return n
            };
            g.toggleError = function(n, l) {
                for (var m = 0, k = n.length; m < k; m += 1) {
                    if (h[n[m]]) {
                        h[n[m]].changeUI(l);
                        return true
                    }
                }
                return false
            };
            g.showError = function(k) {
                return this.toggleError(k, false)
            };
            g.hideError = function(k) {
                this.toggleError(k, true)
            };
            return g
        };
        a.checkItem = function(o, m, l, p, g, n) {
            var k = {};
            if (n === undefined) {
                if (m.type === "text" || m.type === "password" || m.tagName === "TEXTAREA") {
                    n = "blur"
                } else {
                    if (m.tagName === "SELECT") {
                        n = "change"
                    } else {
                        n = "click"
                    }
                }
            }
            if (g === undefined) {
                g = function(q) {
                    if (f(q.value) === "") {
                        return false
                    } else {
                        return true
                    }
                }
            }
            k.changeUI = function(q) {
                p(o, q, m, l)
            };
            k.check = function() {
                var q = g(m);
                p(o, q, m, l);
                return q
            };
            k.getAttr = function() {};
            if (m.tagName !== "SELECT" && m.length) {
                for (var h = 0, j = m.length; h < j; h += 1) {
                    b(m[h], function() {
                        k.check()
                    }, n)
                }
            } else {
                b(m, function() {
                    k.check()
                }, n)
            }
            return k
        }
    })(App);
Core.Array.findit = function(a, f) {
        var b = -1;
        Core.Array.foreach(a, function(h, g) {
            if (f == h) {
                b = g
            }
        });
        return b
    };
Core.Array.uniq = function(f) {
        var b = [];
        for (var g = 0; g < f.length; g++) {
            var a = f[g];
            if (Core.Array.findit(b, a) == -1) {
                b.push(a)
            }
        }
        return b
    };
App.nameValue = function(m, b) {
        var l = m.getAttribute("name");
        var g = m.getAttribute("type");
        var k = m.tagName;
        var n = {
            name: l,
            value: ""
        };
        var h = function(o) {
            if (o === false) {
                n = false;
                return false
            }
            if (!n.value) {
                n.value = Core.String.trim(o || "")
            } else {
                n.value = [Core.String.trim(o || "")].concat(n.value)
            }
        };
        if (!m.disabled && l) {
            switch (k) {
            case "INPUT":
                if (g == "radio" || g == "checkbox") {
                    if (m.checked) {
                        h(m.value)
                    } else {
                        h(false)
                    }
                } else {
                    if (g == "reset" || g == "submit" || g == "image") {
                        h(false)
                    } else {
                        h(b ? (m.value || false) : m.value)
                    }
                }
                break;
            case "SELECT":
                if (m.multiple) {
                    var a = m.options;
                    for (var f = 0, j = a.length; f < j; f++) {
                        if (a[f].selected) {
                            h(a[f].value)
                        }
                    }
                } else {
                    h(m.value)
                }
                break;
            case "TEXTAREA":
                h(b ? (m.value || m.getAttribute("value") || false) : (m.value || m.getAttribute("value")));
                break;
            case "BUTTON":
            default:
                h(m.value || m.getAttribute("value") || m.innerHTML || false)
            }
        } else {
            h(false)
        }
        return n
    };
App.htmlToJson = function(l, b, g) {
        var o = {};
        b = Core.Array.uniq(b || ["INPUT", "TEXTAREA", "BUTTON", "SELECT"]);
        if (!l || !b) {
            return false
        }
        var a = App.nameValue;
        for (var h = 0, k = b.length; h < k; h++) {
            var n = l.getElementsByTagName(b[h]);
            for (var f = 0, m = n.length; f < m; f++) {
                var p = a(n[f], g);
                if (!p) {
                    continue
                }
                if (o[p.name]) {
                    if (o[p.name] instanceof Array) {
                        o[p.name] = o[p.name].concat(p.value)
                    } else {
                        o[p.name] = [o[p.name]].concat(p.value)
                    }
                } else {
                    o[p.name] = p.value
                }
            }
        }
        return o
    };
App.jsonToQuery = function(j, f) {
        var l = [];
        var h = function(k) {
            k = Core.String.trim(k.toString());
            if (f) {
                return encodeURIComponent(k)
            } else {
                return k
            }
        };
        if (typeof j == "object") {
            for (var b in j) {
                if (j[b] instanceof Array) {
                    for (var g = 0, a = j[b].length; g < a; g++) {
                        l.push(b + "=" + h(j[b][g]))
                    }
                } else {
                    l.push(b + "=" + h(j[b]))
                }
            }
        }
        if (l.length) {
            return l.join("&")
        } else {
            return ""
        }
    };
    (function(a) {
        a.includeJson = function(g, f) {
            for (var b in g) {
                if (typeof g[b] == Object) {
                    if (g[b] instanceof Array) {
                        if (f[b] === undefined || f[b].join("|") != g[b].join("|")) {
                            return false
                        }
                    } else {
                        if (typeof f[b] == Object) {
                            return argument.callee(g[b], f[b])
                        } else {
                            return false
                        }
                    }
                } else {
                    if (f[b] === undefined || f[b] != g[b]) {
                        return false
                    }
                }
            }
            return true
        };
        a.compareJson = function(f, b) {
            if (a.includeJson(f, b) && a.includeJson(b, f)) {
                return true
            } else {
                return false
            }
        }
    })(App);
App.setPassword = function(g, b) {
        var a = $E(g);
        var f = $E(b);
        if (a) {
            if (a.value == "") {
                a.style.display = "none";
                f.style.display = "";
                f.value = $SYSMSG.M00902
            }
        }
        Core.Events.addEvent(f, function() {
            f.style.display = "none";
            a.style.display = "";
            a.focus();
            return false
        }, "focus");
        Core.Events.addEvent(a, function() {
            if (a.value == "") {
                if (a.tagName == "INPUT" && (a.type == "password" || a.getAttribute("type") == "password")) {
                    a.style.display = "none";
                    f.value = $SYSMSG.M00902;
                    f.style.display = "";
                    Core.Events.fireEvent(f, "blur")
                }
            }
            return false
        }, "blur");
        return false
    };
    (function(a) {
        var b = function(f, g) {
            this.box = null;
            this.domList = {};
            this.actList = {};
            if (g) {
                this.box = g
            } else {
                this.box = document.createElement("DIV")
            }
            if (f) {
                this.makeTree(this.box, f)
            }
        };
        (function(f) {
            f.init = function() {};
            f.disp = function() {};
            f.NODEMAP = {
                AREA: "MAP",
                CAPTION: "TABLE",
                COL: "TABLE|COLGROUP",
                COLGROUP: "TABLE",
                LEGEND: "FIELDSET",
                OPTGROUP: "SELECT",
                OPTION: "SELECT",
                PARAM: "OBJECT",
                TBODY: "TABLE",
                TD: "TR",
                TFOOT: "TABLE",
                TH: "TABLE|TR",
                THEAD: "TABLE",
                TR: "TBODY|THEAD|TH|TFOOT"
            };
            f.create = function(j, h) {
                var l = null;
                j = j.toUpperCase();
                if (j == "TEXT") {
                    l = document.createTextNode(h)
                } else {
                    l = document.createElement(j)
                }
                if (typeof h == "object") {
                    for (var g in h) {
                        switch (g) {
                        case "class":
                            l.className = h[g];
                            break;
                        case "id":
                            this.domList[h[g]] = l;
                            break;
                        case "action":
                            if (this.actList[h[g]]) {
                                this.actList[h[g]] = [l].concat(this.actList[h[g]])
                            } else {
                                this.actList[h[g]] = l
                            }
                            break;
                        case "style":
                            l.style.cssText = h[g];
                            break;
                        case "innerHTML":
                            l.innerHTML = h[g];
                            break;
                        case "nodeValue":
                            l.nodeValue = h[g];
                            break;
                        default:
                            l.setAttribute(g, h[g])
                        }
                    }
                }
                return l
            };
            f.check = function(l, m) {
                var j = this.NODEMAP[m.tagName];
                if (this.NODEMAP[m.tagName]) {
                    var k = j.split("|");
                    for (var h = 0, g = k.length; h < g; h++) {
                        if (l.tagName == k[h]) {
                            return true
                        }
                    }
                    return false
                }
                return true
            };
            f.append = function(h, j) {
                j.tagName = j.tagName.toLocaleUpperCase();
                if (!this.check(h, j)) {
                    return false
                }
                var g = this.create(j.tagName, j.attributes);
                h.appendChild(g);
                return g
            };
            f.makeTree = function(k, h) {
                for (var j = 0, g = h.length; j < g; j++) {
                    var l = this.append(k, h[j]);
                    if (!l) {
                        alert("tree wrong!!!");
                        return false
                    }
                    if (h[j].childList && h[j].childList.length) {
                        this.makeTree(l, h[j].childList)
                    }
                }
            }
        })(b.prototype);
        a.Builder = b;
        a.domBuilder = new b()
    })(App);
    (function(g) {
        var h = [{
            tagName: "SPAN",
            attributes: {
                "class": "zhuolu_isnote",
                id: "box",
                style: "width: 170px; position: absolute; z-index: 251; top: 73px; left: 320px;"
            }}];
        var a = new App.Builder(h);
        a.box = a.domList.box;
        a.box.style.display = "none";
        a.box.style.position = "absolute";
        a.box.style.zIndex = 1251;
        var b = '<span class="iswhat isok"><img class="tipicon tip3" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title=""></span>';
        var f = '<span class="iswhat iserro"><img class="tipicon tip2" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title="" /><em>${error}</em></span>';
        g.checkFormUI4 = function(k, j, n, l) {
            if (n.errorKey && n.errorKey !== k && j) {
                return false
            } else {
                try {
                    if (j) {
                        n.errorKey = false;
                        l.style.display = "";
                        l.innerHTML = b;
                        if (n.value !== undefined && (!n.value.length || n.noRightIcon)) {
                            l.style.display = "none";
                            return false
                        }
                    } else {
                        n.errorKey = k;
                        l.style.display = "";
                        l.innerHTML = f.replace("${error}", $SYSMSG[k])
                    }
                } catch (m) {}
            }
        };
        g.bindFormTips4 = function(l) {
            document.body.appendChild(a.box);
            for (var k = 0, j = l.length; k < j; k += 1) {
                (function(m) {
                    Core.Events.addEvent(l[m]["el"], function() {
                        var o = l[m]["el"].parentNode;
                        var p = Core.Dom.getXY(o);
                        if (!l[m]["el"].value.length && l[m]["key"] && $SYSMSG[l[m]["key"]]) {
                            a.domList.box.innerHTML = "<em>" + $SYSMSG[l[m]["key"]] + "</em>";
                            a.box.style.top = (p[1] + 10) + "px";
                            var n = parseInt(o.getAttribute("positionLeft")) || ($IE ? 7 : 9);
                            if (n) {
                                a.box.style.left = p[0] + o.offsetWidth + n + "px"
                            } else {
                                a.box.style.left = p[0] + o.offsetWidth + "px"
                            }
                            a.box.style.display = "";
                            if (l[m]["errorPos"]) {
                                l[m]["errorPos"].style.display = "none"
                            }
                        }
                    }, "focus");
                    Core.Events.addEvent(l[m]["el"], function() {
                        a.box.style.display = "none"
                    }, "blur")
                })(k)
            }
        }
    })(App);
App.TextareaUtils = (function() {
        var a = {},
            b = document.selection;
        a.selectionStart = function(g) {
                if (!b) {
                    return g.selectionStart
                }
                var l = b.createRange(),
                    k, f, j = 0;
                var h = document.body.createTextRange();
                h.moveToElementText(g);
                for (j; h.compareEndPoints("StartToStart", l) < 0; j++) {
                        h.moveStart("character", 1)
                    }
                return j
            };
        a.selectionBefore = function(f) {
                return f.value.slice(0, a.selectionStart(f))
            };
        a.selectText = function(f, g, h) {
                f.focus();
                if (!b) {
                    f.setSelectionRange(g, h);
                    return
                }
                var j = f.createTextRange();
                j.collapse(1);
                j.moveStart("character", g);
                j.moveEnd("character", h - g);
                j.select()
            };
        a.insertText = function(h, g, k, j) {
                h.focus();
                j = j || 0;
                if (!b) {
                    var l = h.value,
                        n = k - j,
                        f = n + g.length;
                    h.value = l.slice(0, n) + g + l.slice(k, l.length);
                    a.selectText(h, f, f);
                    return
                }
                var m = b.createRange();
                m.moveStart("character", -j);
                m.text = g
            };
        a.getCursorPos = function(j) {
                var h = 0;
                if ($IE) {
                    j.focus();
                    var f = null;
                    f = b.createRange();
                    var g = f.duplicate();
                    g.moveToElementText(j);
                    g.setEndPoint("EndToEnd", f);
                    j.selectionStart = g.text.length - f.text.length;
                    j.selectionEnd = j.selectionStart + f.text.length;
                    h = j.selectionStart
                } else {
                    if (j.selectionStart || j.selectionStart == "0") {
                        h = j.selectionStart
                    }
                }
                return h
            };
        a.getSelectedText = function(g) {
                var h = "";
                var f = function(j) {
                    if (j.selectionStart != undefined && j.selectionEnd != undefined) {
                        return j.value.substring(j.selectionStart, j.selectionEnd)
                    } else {
                        return ""
                    }
                };
                if (window.getSelection) {
                    h = f(g)
                } else {
                    h = b.createRange().text
                }
                return h
            };
        a.setCursor = function(h, j, g) {
                j = j == null ? h.value.length : j;
                g = g == null ? 0 : g;
                h.focus();
                if (h.createTextRange) {
                    var f = h.createTextRange();
                    f.move("character", j);
                    f.moveEnd("character", g);
                    f.select()
                } else {
                    h.setSelectionRange(j, j + g)
                }
            };
        a.unCoverInsertText = function(j, l, h) {
                h = (h == null) ? {} : h;
                h.rcs = h.rcs == null ? j.value.length : h.rcs * 1;
                h.rccl = h.rccl == null ? 0 : h.rccl * 1;
                var k = j.value,
                    f = k.slice(0, h.rcs),
                    g = k.slice(h.rcs + h.rccl, k == "" ? 0 : k.length);
                j.value = f + l + g;
                this.setCursor(j, h.rcs + (l == null ? 0 : l.length))
            };
        return a
    })();
    (function() {
        var a = function(f, b) {
            var g;
            try {
                if (typeof b != "undefined") {
                    for (g in f) {
                        if (b[g] != null) {
                            f[g] = b[g]
                        }
                    }
                }
            } finally {
                g = null;
                return f
            }
        };
        Core.Base.parseParam = a
    })();
Utils.Io.JsLoad = {};
    (function() {
        function a(m, j) {
            b(m, j);
            var l = m.urls;
            var h, g = l.length;
            for (h = 0; h < g; h++) {
                var k = $C("script");
                k.src = l[h].url;
                k.charset = l[h].charset;
                k[Core.Base.detect.$IE ? "onreadystatechange" : "onload"] = function() {
                    if (Core.Base.detect.$MOZ || this.readyState.toLowerCase() == "complete" || this.readyState.toLowerCase() == "loaded") {
                        j.script_loaded_num++
                    }
                };
                document.getElementsByTagName("head")[0].appendChild(k)
            }
        }
        function b(o, k) {
            var n = o.urls;
            var q = o.GET;
            var l, m = n.length;
            var p, h, g, j;
            for (l = 0; l < m; l++) {
                j = parseInt(Math.random() * 100000000);
                h = new Utils.Url(n[l].url);
                for (p in q) {
                    if (o.noencode == true) {
                        h.setParam(p, q[p])
                    } else {
                        h.setParam(p, Core.String.encodeDoubleByte(q[p]))
                    }
                }
                g = h.getParam("varname") || "requestId_" + j;
                if (o.noreturn != true) {
                    h.setParam("varname", g)
                }
                k.script_var_arr.push(g);
                n[l].url = h.toString();
                n[l].charset = n[l].charset || o.charset
            }
        }
        function f(j, k) {
            var h = {
                urls: [],
                charset: "utf-8",
                noreturn: false,
                noencode: true,
                timeout: -1,
                POST: {},
                GET: {},
                onComplete: null,
                onException: null
            };
            var g = {
                script_loaded_num: 0,
                is_timeout: false,
                is_loadcomplete: false,
                script_var_arr: []
            };
            h.urls = typeof j == "string" ? [{
                url: j}] : j;
            Core.Base.parseParam(h, k);
            a(h, g);
            (function() {
                if (h.noreturn == true && h.onComplete == null) {
                    return
                }
                var l, m = [];
                if (g.script_loaded_num == h.urls.length) {
                    g.is_loadcomplete = true;
                    if (h.onComplete != null) {
                        for (l = 0; l < g.script_var_arr.length; l++) {
                            m.push(window[g.script_var_arr[l]])
                        }
                        if (g.script_var_arr.length < 2) {
                            h.onComplete(m[0])
                        } else {
                            h.onComplete(m)
                        }
                    }
                    return
                }
                if (g.is_timeout == true) {
                    return
                }
                setTimeout(arguments.callee, 50)
            })();
            if (h.timeout > 0) {
                setTimeout(function() {
                    if (g.is_loadcomplete != true) {
                        if (h.onException != null) {
                            h.onException()
                        }
                        g.is_timeout = true
                    }
                }, h.timeout)
            }
        }
        Utils.Io.JsLoad.request = function(g, h) {
            new f(g, h)
        }
    })();
    (function() {
        var j = scope.$lang;
        var b = scope.$lang;
        var g;
        var a;
        var f = false;
        App.changeLanguage = function(l, k) {
            if (b == l) {
                return false
            }
            b = l;
            var m = scope.$BASEJS + $CONFIG.$product + "/js/lang_" + l + ".js" + Boot.getJsVersion();
            Utils.Io.JsLoad.request(m, {
                onComplete: function() {
                    if (k) {
                        k();
                        return false
                    }
                    if (scope.forbidrefreshD) {
                        f = true;
                        scope.forbidrefreshD.close()
                    }
                    f = false;
                    setTimeout(function() {
                        g && a && App.forbidrefresh(g, a)
                    }, 10)
                },
                onException: function() {
                    f = false
                },
                timeout: 30000
            })
        };
        var h = function(m, l) {
            var k = ['<a href="javascript:;" onClick="App.changeLanguage(\'' + l + "');return false;\">", m, "</a>"];
            if (l == b) {
                k[0] = k[2] = ""
            }
            return k.join("")
        };
        App.forbidrefresh = function(n, m) {
            g = n;
            a = m;
            if (!scope.forbidrefreshD) {
                var l = '<div class="auth_code">						<div class="auth_img"><img id="door2img" width="450" height="50" /><div style="text-align:right;padding:3px 0 0 0"><a id="changeyzm" href="javascript:void(0);" onclick="App.refreshCheckCode2();return false;">' + $CLTMSG.CC2103 + '</a></div></div>						<p class="tips">' + $CLTMSG.CC2104 + '</p>						<div class="code_input" id="yzm_input_div"><input id="yzm_input" type="text" value="" /></div>						<p id="yzm_error" class="errorTs error_color" style="display:none;">' + $CLTMSG.CC3301 + '</p>						<p class="btn"><a class="btn_normal" href="javascript:void(0);" id="auth_submit"><em>' + $CLTMSG.CC2105 + '</em></a> <a class="btn_normal" href="javascript:void(0);" id="door2Cancel"><em>' + $CLTMSG.CL0603 + '</em></a></p>			<div class="change_lan">' + h("中文简体", "zh") + '<em class="line">|</em>' + h("中文繁體", "zh-tw") + '<!--<em class="line">|</em>' + h("English", "en") + "--></div>			</div>";
                scope.forbidrefreshD = new App.Dialog.BasicDialog($SYSMSG.MR0050, l, {
                    zIndex: 1200,
                    hidden: true,
                    hiddClose: false,
                    width: 510
                });
                scope.forbidrefreshD.onClose = function() {
                    scope.forbidrefreshD = null;
                    if (!f && j) {
                        App.changeLanguage(j, function() {})
                    }
                };
                var q = Core.Events.addEvent;
                var r = Core.String.trim;
                var o = Core.Events.fireEvent;
                var p = {
                    img_yzm2: $E("door2img"),
                    btn_chgyzm: $E("changeyzm"),
                    input_yzm: $E("yzm_input"),
                    errinfo_yzm: $E("yzm_error"),
                    submit: $E("auth_submit"),
                    door2Cancel: $E("door2Cancel"),
                    yzm_input_div: $E("yzm_input_div"),
                    cb: function(s) {
                        scope.forbidrefreshD.close();
                        scope.forbidrefreshD = null;
                        scope.doorretcode = s || "";
                        n()
                    },
                    ecb: function(s) {
                        if (s.code == "R40010" || s.code == "R40001") {
                            App.refreshCheckCode2();
                            p.errinfo_yzm.style.display = "";
                            p.errinfo_yzm.innerHTML = $SYSMSG[s.code];
                            return
                        }
                        if (s.code != "R01409") {
                            scope.forbidrefreshD.close();
                            scope.forbidrefreshD = null
                        } else {
                            App.refreshCheckCode2();
                            p.errinfo_yzm.style.display = "";
                            p.errinfo_yzm.innerHTML = $CLTMSG.CC3301
                        }
                    },
                    url: m || "/attention/aj_addfollow.php"
                };
                p.errinfo_yzm.style.display = "none";
                var k = function() {
                    p.door = encodeURIComponent(r(p.input_yzm.value)) || r(p.input_yzm.value);
                    App.doRequest({
                        token: scope.$token,
                        door: p.door
                    }, p.url, p.cb ||
                    function() {}, p.ecb ||
                    function() {})
                };
                q(p.submit, function() {
                    if (r(p.input_yzm.value) == "") {
                        p.errinfo_yzm.style.display = "";
                        p.errinfo_yzm.innerHTML = $SYSMSG.MR0050;
                        return false
                    }
                    k();
                    return false
                }, "click");
                q(p.door2Cancel, function() {
                    scope.forbidrefreshD.close();
                    return false
                }, "click");
                q(p.input_yzm, function() {
                    p.errinfo_yzm.style.display = "none"
                }, "focus");
                App.enterSubmit({
                    parent: p.yzm_input_div,
                    action: function() {
                        o(p.submit, "click")
                    }
                })
            }
            App.refreshCheckCode2();
            if ($E("yzm_error")) {
                $E("yzm_error").style.display = "none"
            }
            if ($E("yzm_input")) {
                $E("yzm_input").value = ""
            }
            scope.forbidrefreshD.show()
        };
        App.refreshCheckCode2 = function() {
            setTimeout(function() {
                if ($E("door2img")) {
                    var k = "pin1.php";
                    if (scope.$pageid == "registermail") {
                        k = "pin.php"
                    }
                    if (scope.$pageid == "outreg") {
                        $E("door2img").src = "/reg/pin.php?rule=1&r=" + ((new Date()).getTime()) + "&lang=" + scope.$lang
                    } else {
                        $E("door2img").src = "/pincode/" + k + "?lang=" + b + "&r=" + ((new Date()).getTime()) + "&rule"
                    }
                    $E("door2img").style.display = ""
                }
            }, 100)
        }
    })();
    (function() {
        var l = navigator.userAgent.toLowerCase();
        var k = /msie/.test(l);
        var v = /gecko/.test(l);
        var o = /safari/.test(l);

        function r(x) {
            return typeof(x) == "string" ? q.document.getElementById(x) : x
        }
        var b = function(x) {
            x = x || document;
            return [Math.max(x.documentElement.scrollTop, x.body.scrollTop), Math.max(x.documentElement.scrollLeft, x.body.scrollLeft), Math.max(x.documentElement.scrollWidth, x.body.scrollWidth), Math.max(x.documentElement.scrollHeight, x.body.scrollHeight)]
        };
        var j = function(x, z) {
            switch (z) {
            case "opacity":
                var B = 100;
                try {
                    B = x.filters["DXImageTransform.Microsoft.Alpha"].opacity
                } catch (A) {
                    try {
                        B = x.filters("alpha").opacity
                    } catch (A) {}
                }
                return B;
            case "float":
                z = "styleFloat";
            default:
                var y = x.currentStyle ? x.currentStyle[z] : null;
                return (x.style[z] || y)
            }
        };
        if (v) {
            j = function(x, z) {
                if (z == "float") {
                    z = "cssFloat"
                }
                try {
                    var y = document.defaultView.getComputedStyle(x, "")
                } catch (A) {
                    traceError(A)
                }
                return x.style[z] || y ? y[z] : null
            }
        }
        var s = function(y) {
            if ((y.parentNode == null || y.offsetParent == null || j(y, "display") == "none") && y != document.body) {
                return false
            }
            var x = null;
            var C = [];
            var z;
            var A = y.ownerDocument;
            z = y.getBoundingClientRect();
            var B = b(y.ownerDocument);
            return [z.left + B[1], z.top + B[0]];
            x = y.parentNode;
            while (x.tagName && !/^body|html$/i.test(x.tagName)) {
                if (j(x, "display").search(/^inline|table-row.*$/i)) {
                    C[0] -= x.scrollLeft;
                    C[1] -= x.scrollTop
                }
                x = x.parentNode
            }
            return C
        };
        if (v) {
            s = function(y) {
                if ((y.parentNode == null || y.offsetParent == null || j(y, "display") == "none") && y != document.body) {
                    return false
                }
                var x = null;
                var C = [];
                var z;
                var A = y.ownerDocument;
                C = [y.offsetLeft, y.offsetTop];
                x = y.offsetParent;
                var B = j(y, "position") == "absolute";
                if (x != y) {
                    while (x) {
                        C[0] += x.offsetLeft;
                        C[1] += x.offsetTop;
                        if (o && !B && j(x, "position") == "absolute") {
                            B = true
                        }
                        x = x.offsetParent
                    }
                }
                if (o && B) {
                    C[0] -= y.ownerDocument.body.offsetLeft;
                    C[1] -= y.ownerDocument.body.offsetTop
                }
                x = y.parentNode;
                while (x.tagName && !/^body|html$/i.test(x.tagName)) {
                    if (j(x, "display").search(/^inline|table-row.*$/i)) {
                        C[0] -= x.scrollLeft;
                        C[1] -= x.scrollTop
                    }
                    x = x.parentNode
                }
                return C
            }
        }
        var h = function() {
            return window.event
        };
        if (v) {
            h = function() {
                var y = arguments.callee.caller;
                var x;
                var z = 0;
                while (y != null && z < 40) {
                    x = y.arguments[0];
                    if (x && (x.constructor == Event || x.constructor == MouseEvent)) {
                        return x
                    }
                    z++;
                    y = y.caller
                }
                return x
            }
        }
        var t = function() {
            var x = h();
            x.cancelBubble = true;
            x.returnValue = false
        };
        if (v) {
            t = function() {
                var x = h();
                x.preventDefault();
                x.stopPropagation()
            }
        }
        Function.prototype.bind3 = function(z, y) {
            y = y == null ? [] : y;
            var x = this;
            return function() {
                x.apply(z, y)
            }
        };

        function g(B, A, z, x) {
            var B = r(B);
            if (typeof x == "undefined") {
                x = false
            }
            if (typeof z == "undefined") {
                z = "click"
            }
            if (B.addEventListener) {
                B.addEventListener(z, A, x);
                return true
            } else {
                if (B.attachEvent) {
                    var y = B.attachEvent("on" + z, A);
                    return true
                } else {
                    B["on" + z] = A
                }
            }
        }
        var w;
        var a = parseInt(Math.random() * 100);
        var f = [];
        var m = -1;
        var n = "";
        var q = window;
        var p = {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: "",
            menuStatus: {
                "sina.com": true,
                "163.com": true,
                "qq.com": true,
                "126.com": true,
                "vip.sina.com": true,
                "sina.cn": true,
                "hotmail.com": true,
                "gmail.com": true,
                "sohu.com": true,
                "yahoo.cn": true,
                "139.com": true,
                "wo.com.cn": true,
                "189.cn": true
            }
        };
        p.createNode = function() {
            var x = q.document;
            var y = x.createElement("div");
            y.innerHTML = '<ul class="passCard" id="sinaNote" style="display:none;"></ul>';
            x.body.appendChild(y)
        };
        p.arrowKey = function(x) {
            if (x == 38) {
                if (m <= 0) {
                    m = f.length
                }
                m--;
                p.selectLi(m)
            }
            if (x == 40) {
                if (m >= f.length - 1) {
                    m = -1
                }
                m++;
                p.selectLi(m)
            }
        };
        p.showList = function(I) {
            n = "";
            var M = h().keyCode;
            if (M == 38 || M == 40) {
                p.arrowKey(M);
                return false
            }
            if (!r("sinaNote")) {
                p.createNode()
            }
            var A = r(I).value;
            A = A.replace(/\>/, "&gt;").replace(/\</, "&lt;");
            var z = {};
            var E = A.indexOf("@");
            var J = "";
            var D = "";
            if (E > -1) {
                J = A.substr(E + 1);
                D = A.substr(0, E)
            }
            f = [];
            m = 0;
            f[f.length] = "sinaNote_MenuItem_Title_" + a;
            for (var O in this.menuStatus) {
                this.menuStatus[O] = true;
                if (J != "" && J != O.substr(0, J.length)) {
                    this.menuStatus[O] = false
                } else {
                    f[f.length] = "sinaNote_MenuItem_" + O + "_" + a
                }
            }
            var G = '<li class="note">' + $CLTMSG.CC0301 + "</li>";
            G += '<li id="sinaNote_MenuItem_Title_' + a + '">' + A + "</li>";
            var L;
            for (var O in this.menuStatus) {
                if (this.menuStatus[O] == true) {
                    if (D == "") {
                        L = A + "@" + O
                    } else {
                        L = D + "@" + O
                    }
                    G += '<li id="sinaNote_MenuItem_' + O + "_" + a + '" title="' + L + '">' + L + "</li>"
                }
            }
            r("sinaNote").innerHTML = G;
            for (var H = 0; H < A.length; H++) {
                if (A.charCodeAt(H) < 160) {
                    r("sinaNote").style.display = "";
                    this.selectList(I)
                } else {
                    this.hideList()
                }
            }
            var x = r(I);
            var y = r("sinaNote");
            var C = 0;
            var F = 0;
            var B;
            if (q != window) {
                B = s(window.frameElement);
                C = B[0];
                F = B[1]
            }
            var K = x.offsetWidth;
            if (K < 200) {
                K = 200
            }
            y.style.width = K - 2 + "px";
            var N = s(x);
            y.style.left = (N[0] - (k ? 2 : -1) + C) + "px";
            y.style.top = (N[1] + x.offsetHeight - (k ? 2 : -1) + F) + "px"
        };
        p.selectList = function(z) {
            var x = r("sinaNote").getElementsByTagName("li");
            for (var y = 1; y < x.length; y++) {
                x[1].style.backgroundColor = p.overbgcolor;
                x[1].style.color = p.outfcolor;
                x[y].onmousedown = function() {
                    var A = this.innerHTML;
                    if (A.indexOf($CLTMSG.CC0302) > -1) {
                        var B = A.split("@");
                        r(z).value = B[0]
                    } else {
                        r(z).value = this.innerHTML
                    }
                    t()
                };
                x[y].onmouseover = function() {
                    if (y != 1) {
                        x[1].style.backgroundColor = p.outbgcolor;
                        x[1].style.color = p.overfcolor
                    }
                    this.style.backgroundColor = p.overbgcolor;
                    this.style.color = p.outfcolor
                };
                x[y].onmouseout = function() {
                    this.style.backgroundColor = p.outbgcolor;
                    this.style.color = p.overfcolor;
                    x[1].style.backgroundColor = p.overbgcolor;
                    x[1].style.color = p.outfcolor
                }
            }
        };
        p.selectLi = function(x) {
            var z;
            if (r("sinaNote_MenuItem_Title_" + a)) {
                r("sinaNote_MenuItem_Title_" + a).style.backgroundColor = p.outbgcolor;
                r("sinaNote_MenuItem_Title_" + a).style.color = p.overfcolor;
                for (var y = 0; y < f.length; y++) {
                    z = r(f[y]);
                    z.style.backgroundColor = p.outbgcolor;
                    z.style.color = p.overfcolor
                }
                r(f[x]).style.backgroundColor = p.overbgcolor;
                r(f[x]).style.color = p.outfcolor;
                n = r(f[x]).innerHTML
            }
        };
        p.hideList = function() {
            if (!r("sinaNote")) {
                p.createNode()
            }
            r("sinaNote").style.display = "none"
        };
        p.init = function(B, z, x, A) {
            for (var y in z) {
                this[y] = z[y]
            }
            g(document, p.hideList, "click");
            g(B, p.hideList, "blur");
            g(B, p.showList.bind3(this, [B]), "keyup");
            g(B, function(E) {
                var D = h().keyCode;
                if (D == 13 || D == 9) {
                    if (n != "") {
                        var C = n;
                        if (C.indexOf($CLTMSG.CC0302) > -1) {
                            var F = C.split("@");
                            B.value = F[0]
                        } else {
                            B.value = n
                        }
                    }
                    try {
                        if (x != null && x.style.display !== "none") {
                            x.focus()
                        }
                    } catch (E) {}
                    t()
                }
            }, "keydown");
            if (A) {
                q = A
            }
        };
        window.passcardOBJ = p
    })();
    (function(b) {
        var a = false;
        b.doFlyOut = function(q, f, g) {
            if (a) {
                return false
            }
            a = true;
            var j = function(t) {
                var v = Core.Dom.getXY(t);
                var s = {
                    x: v[0],
                    y: v[1]
                };
                return s
            };
            var n = {
                w: q.offsetWidth,
                h: q.offsetHeight,
                l: (j(q))["x"],
                t: (j(q))["y"]
            };
            var h = f.style.visibility;
            var m = f.style.display;
            if (f.style.display == "none") {
                f.style.visibility = "hidden";
                f.style.display = "block"
            }
            var p = {
                w: f.offsetWidth,
                h: f.offsetHeight,
                l: (j(f))["x"],
                t: (j(f))["y"]
            };
            var l = document.createElement("DIV");
            l.style.cssText = g.style;
            l.style.width = n.w + "px";
            l.style.height = n.h + "px";
            l.style.top = n.t + "px";
            l.style.left = n.l + "px";
            l.style.position = "absolute";
            document.body.appendChild(l);
            var k = {
                w: b.animation.taccelerate(b.timer.delay, p.w - n.w, g.time),
                h: b.animation.taccelerate(b.timer.delay, p.h - n.h, g.time),
                l: b.animation.taccelerate(b.timer.delay, p.l - n.l, g.time),
                t: b.animation.taccelerate(b.timer.delay, p.t - n.t, g.time)
            };
            var o = 0;
            var r = b.timer.add(function() {
                if (o >= k.w.length) {
                    b.timer.remove(r);
                    l.style.display = "none";
                    g.resFun();
                    a = false;
                    return false
                }
                l.style.width = n.w + k.w[o] + "px";
                l.style.height = n.h + k.h[o] + "px";
                l.style.top = n.t + k.t[o] + "px";
                l.style.left = n.l + k.l[o] + "px";
                o++
            });
            f.style.visibility = h;
            f.style.display = m
        }
    })(App);
Core.Dom.insertHTML = function(g, f, b) {
        g = $E(g) || document.body;
        b = b.toLowerCase() || "beforeend";
        if (g.insertAdjacentHTML) {
            switch (b) {
            case "beforebegin":
                g.insertAdjacentHTML("BeforeBegin", f);
                return g.previousSibling;
            case "afterbegin":
                g.insertAdjacentHTML("AfterBegin", f);
                return g.firstChild;
            case "beforeend":
                g.insertAdjacentHTML("BeforeEnd", f);
                return g.lastChild;
            case "afterend":
                g.insertAdjacentHTML("AfterEnd", f);
                return g.nextSibling
            }
            throw 'Illegal insertion point -> "' + b + '"'
        }
        var a = g.ownerDocument.createRange();
        var h;
        switch (b) {
        case "beforebegin":
            a.setStartBefore(g);
            h = a.createContextualFragment(f);
            g.parentNode.insertBefore(h, g);
            return g.previousSibling;
        case "afterbegin":
            if (g.firstChild) {
                a.setStartBefore(g.firstChild);
                h = a.createContextualFragment(f);
                g.insertBefore(h, g.firstChild);
                return g.firstChild
            } else {
                g.innerHTML = f;
                return g.firstChild
            }
            break;
        case "beforeend":
            if (g.lastChild) {
                a.setStartAfter(g.lastChild);
                h = a.createContextualFragment(f);
                g.appendChild(h);
                return g.lastChild
            } else {
                g.innerHTML = f;
                return g.lastChild
            }
            break;
        case "afterend":
            a.setStartAfter(g);
            h = a.createContextualFragment(f);
            g.parentNode.insertBefore(h, g.nextSibling);
            return g.nextSibling
        }
        throw 'Illegal insertion point -> "' + b + '"'
    };
App.autoHeightTextArea = function(g, b, f) {
        g = $E(g);
        b = b ||
        function() {};
        var a = function(k) {
            if (b) {
                b()
            }
            var h;
            var j;
            var l = App.getTextAreaHeight(this);
            k = k || l;
            if (l > k) {
                h = k;
                if (this.style.overflowY === "hidden") {
                    this.style.overflowY = "auto"
                }
            } else {
                h = l;
                if (this.style.overflowY === "auto") {
                    this.style.overflowY = "hidden"
                }
            }
            this.style.height = Math.min(k, l) + "px"
        };
        if (g.binded == null) {
            Core.Events.addEvent(g, Core.Function.bind3(a, g, [f]), "keyup");
            Core.Events.addEvent(g, Core.Function.bind3(a, g, [f]), "focus");
            Core.Events.addEvent(g, Core.Function.bind3(a, g, [f]), "blur");
            g.binded = true;
            g.style.overflowY = "hidden";
            g.style.overflowX = "hidden"
        }
    };
App.getTextAreaHeight = function(b) {
        b = $E(b);
        if (b.defaultHeight == null) {
            b.defaultHeight = window.parseInt(Core.Dom.getStyle(b, "height"))
        }
        var f;
        if ($IE) {
            f = Math.max(b.scrollHeight, b.defaultHeight)
        } else {
            var a = $E("_____textarea_____");
            if (a == null) {
                a = document.createElement("textarea");
                a.id = "_____textarea_____";
                document.getElementsByTagName("body")[0].appendChild(a)
            }
            if (a.currentTarget != b) {
                a.style.top = "-1000px";
                a.style.height = "0px";
                a.style.position = "absolute";
                a.style.overflow = "hidden";
                a.style.width = Core.Dom.getStyle(b, "width");
                a.style.fontSize = Core.Dom.getStyle(b, "fontSize");
                a.style.fontFamily = Core.Dom.getStyle(b, "fontFamily");
                a.style.lineHeight = Core.Dom.getStyle(b, "lineHeight");
                a.style.paddingLeft = Core.Dom.getStyle(b, "paddingLeft");
                a.style.paddingRight = Core.Dom.getStyle(b, "paddingRight");
                a.style.paddingTop = Core.Dom.getStyle(b, "paddingTop");
                a.style.paddingBottom = Core.Dom.getStyle(b, "paddingBottom")
            }
            a.value = b.value;
            f = Math.max(a.scrollHeight, b.defaultHeight);
            a.currentTarget = b
        }
        return f
    };
Core.Dom.setStyle = function(a, b, f) {
        switch (b) {
        case "opacity":
            a.style.filter = "alpha(opacity=" + (f * 100) + ")";
            if (!a.currentStyle || !a.currentStyle.hasLayout) {
                a.style.zoom = 1
            }
            break;
        case "float":
            b = "styleFloat";
        default:
            a.style[b] = f
        }
    };
if (!Core.Base.detect.$IE) {
        Core.Dom.setStyle = function(a, b, f) {
            if (b == "float") {
                b = "cssFloat"
            }
            a.style[b] = f
        }
    }
App.EncodeUtils = (function() {
        var f = {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "\\": "&#92;",
            "&": "&amp;",
            "'": "&#039;",
            "\r": "",
            "\n": "<br>"
        },
            a = /<|>|\'|\"|&|\\|\r\n|\n| /gi;
        var b = {};
        b.regexp = function(g) {
                return g.replace(/\}|\]|\)|\.|\$|\^|\{|\[|\(|\|\|\*|\+|\?|\\/gi, function(h) {
                    h = h.charCodeAt(0).toString(16);
                    return "\\u" + (new Array(5 - h.length)).join("0") + h
                })
            };
        b.html = function(g, h) {
                h = h || f;
                return g.replace(a, function(j) {
                    return h[j]
                })
            };
        return b
    })();
App.PopUpCombo = (function() {
        var it = {},
            ce = Core.Events,
            addEvent = ce.addEvent,
            removeEvent = ce.removeEvent,
            stopEvent = ce.stopEvent,
            filter = App.EncodeUtils.regexp,
            toIndex, value, content, current, key, reg, tip, panel, head, lis = [],
            onSelect, onClose, len, selected = 0;
        it.validate = false;
        it.index = function(num) {
                toIndex = !num ? 0 : selected + num;
                toIndex = toIndex < 0 ? len : (toIndex > len) ? 0 : toIndex;
                lis[selected].className = "";
                lis[toIndex].className = "cur";
                selected = toIndex;
                value = content[selected]
            };
        it.click = function() {
                onSelect && onSelect(value)
            };
        it.hidden = function() {
                it.initTip();
                tip.style.display = "none";
                it.validate && !(it.validate = false) && onClose && onClose()
            };
        it.initTip = function() {
                if (!tip) {
                    tip = $C("div");
                    tip.appendChild(panel = $C("ul"));
                    with(tip.style) {
                        zIndex = 2000;
                        position = "absolute";
                        display = "none"
                    }
                    tip.className = "Atwho";
                    document.body.appendChild(tip)
                }
            };
        it.position = function(x, y, offsetX, offsetY) {
                it.initTip();
                it.validate = true;
                tip.style.display = "block";
                with(tip.style) {
                    left = (x + offsetX) + "px";
                    top = (y + offsetY) + "px"
                }
            };
        it.selection = function(event) {
                var keyCode = event.keyCode,
                    toIndex, value;
                if (!it.validate) {
                        return
                    }
                if (keyCode == 40 || keyCode == 38) {
                        it.index(keyCode == 40 ? 1 : -1);
                        stopEvent()
                    } else {
                        if (keyCode == 13 || keyCode == 9) {
                            it.click();
                            stopEvent()
                        } else {
                            if (keyCode == 27) {
                                it.hidden();
                                stopEvent()
                            }
                        }
                    }
            };
        it.addItem = function(itemValue) {
                var li = document.createElement("li"),
                    index;
                li.innerHTML = itemValue.replace(reg, "<b>$1</b>");
                lis.push(li);
                len = index = lis.length - 1;
                content.push(itemValue);
                panel.appendChild(li);
                addEvent(li, function() {
                        lis[selected].className = "";
                        lis[index].className = "cur";
                        value = itemValue;
                        selected = index;
                        stopEvent()
                    }, "mouseover");
                addEvent(li, function() {
                        it.click();
                        it.hidden();
                        stopEvent()
                    }, "mousedown")
            };
        it.bind = function(oElement, aContent, sKey, fOnSelect, fOnClose, sHead) {
                var i = 0,
                    l = aContent.length;
                reg = new RegExp("(" + filter(sKey) + ")", "gi");
                selected = 0;
                content = [];
                onSelect = fOnSelect;
                len = 0;
                lis = [];
                onClose = fOnClose;
                it.initTip();
                panel.innerHTML = "";
                if (sHead) {
                        panel.appendChild(head = $C("div"));
                        head.innerHTML = sHead
                    }
                for (i; i < l; i++) {
                        it.addItem(aContent[i])
                    }
                if (!lis.length) {
                        it.addItem(sKey)
                    }
                it.index(0);
                if (current == oElement) {
                        return
                    }
                current && removeEvent(current, it.selection, "keydown");
                removeEvent(document.body, it.hidden, "mouseup");
                addEvent((current = oElement), it.selection, "keydown");
                addEvent(document.body, it.hidden, "mouseup")
            };
        return it
    })();
App.BindAtToTextarea = (function() {
        var d = document,
            format = App.EncodeUtils.html,
            select = App.PopUpCombo,
            cd = Core.Dom,
            getStyle = cd.getStyle,
            selectionStart, setStyle = cd.setStyle,
            getXY = cd.getXY,
            ce = Core.Events,
            addEvent = ce.addEvent,
            removeEvent = ce.removeEvent,
            stopEvent = ce.stopEvent,
            ajax = Utils.Io.Ajax,
            clock;
        var cssg = ["overflowY", "height", "width", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "marginTop", "marginLeft", "marginRight", "marginBottom"];
        var font = "Tahoma,宋体",
            cssc = {
                fontFamily: font,
                borderStyle: "solid",
                borderWidth: "0px",
                wordWrap: "break-word",
                fontSize: "14px",
                lineHeight: "18px",
                overflowX: "hidden"
            };
        var selectHead = '<div style="height:20px;color:#999999;padding-left:8px;padding-top:2px;line-height:18px;font-size:12px;Tahoma,宋体;">' + $CLTMSG.CL0827 + "</div>";
        var isCss1 = false,
            ua = navigator.userAgent,
            r = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(ua);
        if (r && (r = parseFloat(RegExp.$1)) && r < 8) {
                isCss1 = true
            }
        var hash = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "\\": "&#92;",
                "&": "&amp;",
                "'": "&#039;",
                "\r": "",
                "\n": "<br>",
                " ": !isCss1 ? "<span style='white-space:pre-wrap;font-size:14px;font-family:" + font + ";'> </span>" : "<pre style='overflow:hidden;display:inline;font-size:'+fontSize+';font-family:" + font + ";word-wrap:break-word;'> </pre>"
            },
            fReg = /<|>|\'|\"|&|\\|\r\n|\n| /gi;
        var AjaxHasAbort = function(url, success, error) {
                var req, res, error;
                req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
                if (!req) {
                    return
                }
                req.onreadystatechange = function() {
                    try {
                        if (req.readyState == 4) {
                            res = eval("(" + req.responseText + ")");
                            success(res)
                        }
                    } catch (e) {
                        return false
                    }
                };
                try {
                    req.open("GET", url, true);
                    req.send(null)
                } catch (e) {
                    return false
                }
                return req
            };
        var doRequest = (function() {
                var req;
                return function(url, success, error) {
                    if (req) {
                        req.abort();
                        req
                    }
                    req = AjaxHasAbort(url, success, error)
                }
            })();
        var at = (function() {
                var it = {},
                    current, panel, cache, lastCache, flag, content, nbody, reg, tu = App.TextareaUtils,
                    clock, reqed = {},
                    validate = false,
                    currentKey, keyChange = 0,
                    items;
                reg = /@[^@\s]{1,20}$/g;
                it.onClose = function() {
                        cache = null;
                        lastCache = null;
                        currentKey = null;
                        setTimeout(function() {
                            try {
                                current.focus()
                            } catch (e) {}
                        }, 0)
                    };
                it.onSelect = function(value) {
                        var st = current.scrollTop;
                        current.focus();
                        tu.insertText(current, value.substring(0, value.indexOf("(") > 0 ? value.indexOf("(") : value.length) + " ", selectionStart, currentKey.length);
                        current.scrollTop = st
                    };
                it.setContent = function(value, last) {
                        panel.style.height = current.clientHeight + "px";
                        if (cache != value) {
                            cache = value;
                            content.innerHTML = format(value, hash)
                        }
                        if (lastCache != last) {
                            lastCache = last;
                            nbody.innerHTML = format(last, hash)
                        }
                        if (scope.$SAFARI) {
                            panel.style.overflowY = getStyle(current, "overflowY") == "hidden" ? "hidden" : "scroll"
                        } else {
                            panel.style.overflowY = (current.scrollHeight > current.clientHeight) ? "auto" : "hidden"
                        }
                    };
                it.initTip = function(json) {
                        var data, len, i = 0,
                            list = [],
                            name, tmp = "background-color:#ebebeb;",
                            point;
                        if (json.code == "A00006" && (data = json.data || [])) {
                                point = getXY(flag);
                                select.position(point[0], point[1], 0, -(current.scrollTop - 20));
                                select.bind(current, data, currentKey, it.onSelect, it.onClose, selectHead);
                                reqed[currentKey] = json;
                                return
                            }
                        select.hidden()
                    };
                it.check = function() {
                        var snap, snap = value = current.value.replace(/\r/g, ""),
                            key, len, html, param, last;
                        selectionStart = tu.selectionStart(current);
                        value = value.slice(0, selectionStart);
                        if ((key = value.match(reg)) && (key = key[0]) && /^@[a-zA-Z0-9\u4e00-\u9fa5_]+$/.test(key)) {
                                key = key.slice(1);
                                if (currentKey == key) {
                                    return
                                }
                                currentKey = key;
                                last = snap.slice(selectionStart - currentKey.length, snap.length);
                                value = value.slice(0, -currentKey.length - 1);
                                it.setContent(value, last);
                                if (reqed[key]) {
                                    it.initTip(reqed[key]);
                                    return
                                }
                                doRequest("/mblog/aj_searchat.php?atkey=" + encodeURIComponent(key), function(json) {
                                    it.initTip(json, key)
                                }, select.hidden);
                                return
                            }
                        select.hidden()
                    };
                it.sleep = function(event) {
                        var keyCode = event.keyCode;
                        if (keyCode == "27") {
                            return
                        }
                        clearTimeout(clock);
                        clock = setTimeout(it.check, 100)
                    };
                it.bindEvent = function(oElement, b) {
                        var act = b ? addEvent : removeEvent;
                        act(oElement, it.sleep, "keypress");
                        act(oElement, it.sleep, "keyup");
                        act(oElement, it.sleep, "mouseup")
                    };
                it.rePosition = (function() {
                        var clock, stop = function() {
                            clearInterval(clock)
                        };
                        var flush = function() {
                            try {
                                if (!current) {
                                    return
                                }
                                point = getXY(current);
                                with(panel.style) {
                                    left = point[0] + "px";
                                    top = point[1] + "px"
                                }
                            } catch (e) {
                                stop()
                            }
                        };
                        return function() {
                            stop();
                            clock = setInterval(flush, 100)
                        }
                    })();
                it.mirror = function(oStyleFix) {
                        var i = 0,
                            p, len = cssg.length,
                            point, fix = 0,
                            size = "14px",
                            w;
                        if ($MOZ) {
                                fix = -2
                            }
                        if (scope.$SAFARI) {
                                fix = -6
                            }
                        for (i; i < len; i++) {
                                panel.style[cssg[i]] = getStyle(current, cssg[i])
                            }
                        for (p in cssc) {
                                panel.style[p] = current.style[p] = cssc[p]
                            }
                        for (p in oStyleFix) {
                                panel.style[p] = current.style[p] = oStyleFix[p]
                            }
                        if (oStyleFix && oStyleFix.fontSize) {
                                size = oStyleFix.fontSize
                            }
                        hash[" "] = !isCss1 ? "<span style='white-space:pre-wrap;font-size:" + size + ";font-family:" + font + ";'> </span>" : "<pre style='overflow:hidden;display:inline;font-size:" + size + ";font-family:" + font + ";word-wrap:break-word;'> </pre>";
                        panel.style.width = ((parseInt(current.style.width) || current.offsetWidth) + fix) + "px";
                        it.bindEvent(current, true);
                        it.rePosition();
                        return false
                    };
                it.to = function(oElement, oStyleFix) {
                        if (current == oElement) {
                            return
                        }
                        if (!it.panel) {
                            d.body.appendChild(it.panel = panel = $C("div"));
                            panel.appendChild(it.content = content = $C("span"));
                            panel.appendChild(it.flag = flag = $C("span"));
                            panel.appendChild(it.nbody = nbody = $C("span"));
                            with(panel.style) {
                                zIndex = -1000;
                                position = "absolute"
                            }
                            flag.innerHTML = "@";
                            setStyle(panel, "opacity", 0)
                        }
                        current && it.bindEvent(current, false);
                        (current = oElement) && it.mirror(oStyleFix)
                    };
                return it
            })();
        return function(oElement, oStyleFix) {
                oElement.style.fontFamily = font;
                addEvent(oElement, function() {
                    at.to(oElement, oStyleFix)
                }, "focus")
            }
    })();
scope.loginKit = function() {
        var b = document.cookie + ";";
        console.info(b);
        var j = ["uid", "=([^;]*)?;"].join("");
        var h = b.match(new RegExp(j, "i"));
        h = (h) ? h[1] || "" : "";
        h = unescape(h);
        //var g = scope["$oid"];
        return {
            uid: h,
            isLogin: !! h,
        }
    };
scope.$isLogin = function() {
        return scope.loginKit().isLogin
    };
scope.$isAdmin = function() {
        return scope.loginKit().isAdmin
    };
App.ModForward = function(O, m, g, Q, n, s, p, o, J) {
        Core.Events.stopEvent();
        if (Q && Q.getAttribute("allowforward")) {
            App.alert($SYSMSG.M02020);
            return false
        }
        if (scope.$cuser_status === "nofull" && scope.$uid !== "") {
            App.finishInformation();
            return false
        }
        if (g === scope.$uid) {
            App.alert($CLTMSG.CD0024);
            return false
        }
        var z = function(T, S) {
            if ((new RegExp("(@|＠)" + S + "([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(T)) {
                return true
            } else {
                return false
            }
        };
        var w = $CLTMSG.CD0025;
        var D = "";
        var a = decodeURIComponent(s);
        var N = decodeURIComponent(p);
        var x = decodeURIComponent(o);
        if (p === "" || p === undefined) {
            D = w
        } else {
            D = " //@" + a + ":" + N
        }
        var E = $CLTMSG.CD0026;
        var F = '<div class="shareLogin">                    	<div id="loginerror_' + O + '"></div>						<em>' + $CLTMSG.CD0027 + '</em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="text" id="logintitle_' + O + '" class="inputType"  style="width: 100px;"/></span></span>                        <em>&nbsp&nbsp&nbsp&nbsp' + $CLTMSG.CD0028 + ' </em>                        <span class="cInputBorder"><span class="cInputborderR"><input type="password" id="loginpwd_' + O + '" class="inputType" style="width: 100px;"/></span></span>                    	<div class="clearit"></div>                    </div>';
        F = "";
        if (Q) {
            var l = Q.getAttribute("lastforwardername");
            var H = Q.getAttribute("initblogername")
        }
        var f = [];
        f.push('<div class="selSend">');
        if (l) {
            f.push('<p><label for="lastForwarder_' + O + '"><input type="checkbox" class="labelbox" id="lastForwarder_' + O + '" />' + $CLTMSG.CD0029.replace(/#\{forwarder\}/g, l) + "</label></p>")
        }
        if (H && H != l) {
            f.push('<p><label for="initBloger_' + O + '"><input type="checkbox" class="labelbox" id="initBloger_' + O + '" />' + $CLTMSG.CD0030.replace(/#\{bloger\}/g, H) + "</label></p>")
        }
        f.push(" </div>");
        var C = '			<div class="shareLayer" id="forwardcontent_' + O + '">				<div class="zok" id="modforwardsucess_' + O + '" style="display:none"></div>				<div id="mdforwardinputarea_' + O + '">				<div class="turnToTxt" id="sharecontent_' + O + '">' + $CLTMSG.CD0031 + decodeURIComponent(m) + '</div>				<div class="clearit"></div>				<div style="margin-top:5px;">					<div class="lf">						<a onclick="App.showFaces(this,$E(\'mdforwardtextarea_' + O + '\'),-29,5);return false;" title="' + $CLTMSG.CD0032 + '" href="####" class="faceicon1"></a>					</div>				</div>				<div id="tipInfoBox' + O + '" style="float:right;margin-right:13px;color:#008800"></div>				<textarea class="PY_textarea" id="mdforwardtextarea_' + O + '">' + D + "</textarea>" + F + f.join(" ") + '<div class="MIB_btn"><a href="javascript:void(0);" id="mdforwardbtn_' + O + '" class="btn_normal"><em>' + $CLTMSG.CD0023 + '</em></a><a href="javascript:void(0)" id="mdforwardcancel_' + O + '" class="btn_notclick"><em>' + $CLTMSG.CD0005 + "</em></a></div>				</div>			</div>		";
        var j = {
            width: 390,
            zIndex: 1000
        };
        var P = new App.Dialog.BasicDialog(E, C, j);
        P.onClose = function() {
            setTimeout(function() {
                var S = $E("num_" + O);
                if (S) {
                    S.parentNode.focus()
                }
            }, 200)
        };
        P._success = function(S) {
            P.close();
            var T = new App.alert($CLTMSG.CD0035, {
                icon: 3,
                hasBtn: false
            });
            setTimeout(function() {
                T.close();
                S()
            }, 1000)
        };
        var k = $E("mdforwardtextarea_" + O);
        var I = $CLTMSG.CD0033;
        var r = $CLTMSG.CD0034;
        var L = function() {
            var S = Math.ceil(Core.String.byteLength(Core.String.trim(k.value)) / 2);
            if ($E("tipInfoBox" + O)) {
                if (S > 140) {
                    $E("tipInfoBox" + O).innerHTML = r.replace(/\$\{num\}/, (t / 2 - S) * (-1));
                    $E("tipInfoBox" + O).style.color = "#880000";
                    return false
                } else {
                    if (Core.String.trim(k.value) === w) {
                        $E("tipInfoBox" + O).innerHTML = I.replace(/\$\{num\}/, 140);
                        $E("tipInfoBox" + O).style.color = "#008800";
                        return true
                    }
                    $E("tipInfoBox" + O).innerHTML = I.replace(/\$\{num\}/, (t / 2 - S));
                    $E("tipInfoBox" + O).style.color = "#008800";
                    return true
                }
            }
        };
        if (Q) {
            try {
                setTimeout(function() {
                    $E("mdforwardtextarea_" + O).focus();
                    if (!$IE) {
                        $E("mdforwardtextarea_" + O).setSelectionRange(0, 0)
                    }
                    L()
                }, 100)
            } catch (R) {}
        } else {
            P.show();
            $E("mdforwardtextarea_" + O).focus();
            if (!$IE) {
                $E("mdforwardtextarea_" + O).setSelectionRange(0, 0)
            }
            setTimeout(L, 1)
        }
        var b = "/mblog/forward.php";
        if (scope.$eid) {
            b = "/event/aj_forward.php"
        }
        var G = $E("mdforwardbtn_" + O);
        var t = 280;
        App.BindAtToTextarea(k, {
            borderWidth: "1px",
            fontSize: "12px"
        });
        App.autoHeightTextArea(k, function() {
            setTimeout(L, 1)
        }, 145);
        var v = $E("loginerror_" + O);
        var B = "btn_notclick";
        var y = "btn_normal";
        var q = $E("logintitle_" + O);
        var h = $E("loginpwd_" + O);
        var A = {
            zIndex: 1010,
            ref: q,
            wrap: v,
            offsetY: -1,
            offsetX: 30
        };
        k.onfocus = function() {
            if (k.value === w) {
                k.value = ""
            }
        };
        k.onblur = function() {
            if (k.value === "") {
                k.value = w
            }
        };
        k.onkeydown = function(S) {
            S = S || window.event;
            if (S.keyCode === 13 && S.ctrlKey) {
                G.onclick()
            }
        };
        if ($E("lastForwarder_" + O)) {
            $E("lastForwarder_" + O).onkeydown = function(S) {
                S = S || window.event;
                if (S.keyCode === 13 && S.ctrlKey) {
                    G.onclick()
                }
            }
        }
        if ($E("initBloger_" + O)) {
            $E("initBloger_" + O).onkeydown = function(S) {
                S = S || window.event;
                if (S.keyCode === 13 && S.ctrlKey) {
                    G.onclick()
                }
            }
        }
        $E("mdforwardcancel_" + O).onclick = function() {
            P.close();
            return false
        };

        function M() {
            var W = k.value = Core.String.leftB(k.value, t);
            if (W === w) {
                W = ""
            }
            var Z = {
                reason: W.replace(/\uff20/ig, "@"),
                mid: O,
                styleid: scope.styleid,
                retcode: scope.doorretcode || ""
            };
            if (scope.$eid) {
                Z.eid = scope.$eid
            }
            scope.doorretcode = "";
            if (scope.$pageid === "search") {
                Z.from = "search"
            }
            if ((scope.$pageid === "myprofile" || scope.$pageid === "search") && scope.$feedtype !== "isori") {
                Z.isindex = 1
            }
            var U = function(af, ac) {
                if (Z.isLast) {
                    var ag = $E("_comment_count_miniblog2_" + O);
                    if (!ag) {
                        return
                    }
                    var ad = ag.getElementsByTagName("strong");
                    if (ad && (ad = ad[1])) {
                        var ae = ad.innerHTML;
                        ae = parseInt(ae.match(/(\d+)/));
                        ae = ((ae + "") == "NaN" ? 0 : ae);
                        ae = Math.max((ae + 1), 0);
                        ad.innerHTML = "";
                        ae && (ad.innerHTML = ["(", ae, ")"].join(""))
                    }
                }
                var ah = function() {
                    if (!scope.loginKit().isLogin) {
                        location.reload()
                    }
                    if (typeof J === "function") {
                        J(Q)
                    }
                    if (App.refurbishUpdate) {
                        App.refurbishUpdate.add(1)
                    }
                    if (!af) {
                        return
                    }
                    var an = $E("myTempFeedUl");
                    var al = an || $E("feed_list");
                    al.style.display = "";
                    if (al) {
                        var ai = document.createElement("UL");
                        ai.innerHTML = af.html;
                        var ak = window.document,
                            aj = ak.documentElement || {};
                        var am = function() {
                                if (arguments.length > 0) {
                                    aj.scrollTop = arguments[0];
                                    ak.body.scrollTop = arguments[0];
                                    return
                                }
                                return (window.pageYOffset || Math.max(aj.scrollTop, ak.body.scrollTop))
                            };
                        setTimeout(function() {
                                var ao = ai.getElementsByTagName("LI")[0];
                                if (!ao) {
                                    return
                                }
                                al.parentNode.insertBefore(ai, al);
                                var aq = al.getElementsByTagName("LI")[0];
                                if (aq) {
                                    al.insertBefore(ao, aq)
                                } else {
                                    al.appendChild(ao)
                                }
                                ai.parentNode.removeChild(ai);
                                try {
                                    App.bindMedia(ao);
                                    if (typeof App.regPopCard === "function") {
                                        var ap = {
                                            container: ao,
                                            tag: "namecard"
                                        };
                                        App.regPopCard(ap)
                                    }
                                } catch (at) {}
                                var ar = al.getElementsByTagName("LI")[0].offsetHeight;
                                am(am() + ar);
                                setTimeout(function() {
                                    var au = $E("num_" + O);
                                    if (au) {
                                        au.parentNode.focus()
                                    }
                                }, 2000)
                            }, 1000)
                    }
                };
                P._success(ah);
                var ab = $E(n);
                if (ab) {
                    var ae = ab.innerHTML.match(/\d+/) || 0;
                    ab.innerHTML = "(" + (parseInt(ae) + 1) + ")";
                    ab.style.display = ""
                }
            };
            var T = function(ab) {
                G.className = y;
                if (ab && typeof ab === "string" && ab.indexOf("error") > 0) {
                    App.alert($CLTMSG.CD0036);
                    return false
                }
                if (ab.code === "MR0050") {
                    G.className = y;
                    App.forbidrefresh(function() {
                        Core.Events.fireEvent(G, "click")
                    }, b);
                    return false
                }
                if (ab === $CLTMSG.CD0037) {
                    return
                }
                App.alert(ab, {
                    ok: function() {
                        if (!scope.loginKit().isLogin) {
                            location.reload()
                        }
                        if (ab.code === "M01155") {
                            P.close()
                        }
                    }
                })
            };
            var aa = 0;
            if ($E("lastForwarder_" + O) && $E("lastForwarder_" + O).checked) {
                Z.isLast = "1";
                aa++
            }
            if ($E("initBloger_" + O) && $E("initBloger_" + O).checked) {
                Z.isRoot = "1";
                aa++
            }
            if (aa > 0) {
                b += "?f=" + aa
            }
            var Y = Z.reason;
            var X = Y.split("//@");
            Y = Y.replace(new RegExp("//@", "gm"), "");
            var V = Y.split("@");
            if ((V.length - X.length) > 5) {
                var S = App.confirm({
                    html: $CLTMSG.ZB0032
                }, {
                    icon: 1,
                    ok: function() {
                        App.doRequest(Z, b, U, T)
                    },
                    cancel: function() {
                        G.className = y;
                        G.focus();
                        return false
                    },
                    ok_focus: true
                });
                S.onClose = function() {
                    try {
                        G.className = y;
                        G.focus()
                    } catch (ab) {}
                    return false
                };
                return
            }
            App.doRequest(Z, b, U, T)
        }
        function K(T, S) {
            S.focus();
            App.fixElement.setHTML(T, "", A);
            G.className = y;
            return false
        }
        G.onclick = function() {
            if (!L()) {
                var T = ["#fff", "#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff", "#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
                var S = 0;
                var U = App.timer.add(function() {
                    if (S / 2 >= T.length) {
                        App.timer.remove(U);
                        return false
                    }
                    k.style.backgroundColor = T[S / 2];
                    S += 1
                });
                return false
            }
            if (G.className === B) {
                return false
            }
            G.className = B;
            if (scope.loginKit().isLogin) {
                M()
            } else {
                App.ModLogin({
                    func: function() {
                        M()
                    }
                });
                G.className = y
            }
            return false
        };
        App.enterSubmit({
            parent: "forwardcontent",
            action: function() {
                G.onclick()
            }
        })
    };
Core.Dom.insertAfter = function(f, a) {
        var b = a.parentNode;
        if (b.lastChild == a) {
            b.appendChild(f)
        } else {
            b.insertBefore(f, a.nextSibling)
        }
        return f
    };
Core.Dom.removeNode = function(a) {
        a = $E(a) || a;
        try {
            a.parentNode.removeChild(a)
        } catch (b) {}
    };
App.copyText = function(j) {
        var l = function() {
            var s = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
            if (s) {
                var v = navigator.plugins["Shockwave Flash"].description.split(" ");
                for (var r = 0; r < v.length; ++r) {
                    if (isNaN(parseInt(v[r], 10))) {
                        continue
                    }
                    var q = v[r]
                }
                return q >= 10
            } else {
                if ($IE) {
                    try {
                        new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10");
                        return true
                    } catch (t) {
                        return false
                    }
                }
            }
        };
        if (window.clipboardData && $IE6) {
            window.clipboardData.clearData();
            return window.clipboardData.setData("Text", j)
        } else {
            if (l()) {
                if ($IE) {
                    try {
                        window.clipboardData.clearData();
                        return window.clipboardData.setData("Text", j)
                    } catch (n) {
                        return false
                    }
                }
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                    var g = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
                    if (!g) {
                        return
                    }
                    var p = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
                    if (!p) {
                        return
                    }
                    p.addDataFlavor("text/unicode");
                    var o = {};
                    var m = {};
                    o = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
                    var b = j;
                    o.data = b;
                    p.setTransferData("text/unicode", o, b.length * 2);
                    var a = Components.interfaces.nsIClipboard;
                    if (!g) {
                        return false
                    }
                    g.setData(p, null, a.kGlobalClipboard);
                    return true
                } catch (n) {
                    return false
                }
            } else {
                var k = "flashcopier";
                if (!$E(k)) {
                    var f = $C("div");
                    f.id = k;
                    document.body.appendChild(f)
                }
                j = j.replace(/%/g, escape("%")).replace(/&/g, escape("&"));
                var h = '<embed src="/view/js/clipboard.swf" FlashVars="clipboard=' + j + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
                $E(k).innerHTML = h;
                return true
            }
        }
    };
App.copyTextDialog = function(h, b) {
        var g = b || {};
        var a = g.succText || $CLTMSG.CC4101;
        var f = {
            icon: 3
        };
        if (App.copyText(h || "") == false) {
            a = g.errorText || $CLTMSG.CD0016;
            f = {
                icon: 1
            }
        }
        App.alert(a, f);
        Core.Events.stopEvent()
    };
App.flyDialog = function(b, a, h, g) {
        var f = App[a || "alert"](b, g);
        return f
    };
Core.Dom.contains = function(a, b) {
        return a.contains(b)
    };
if (!$IE) {
        Core.Dom.contains = function(a, b) {
            do {
                if (a == b) {
                    return true
                }
            } while (b = b.parentNode);
            return false
        }
    }
App.changeBackColor = function(j, f) {
        j = j || window.event;
        var l = f.id;
        var h = $E("cancel_" + l);
        var g = $E("message_" + l);
        var k = $E("remark_" + l);
        var b = $E("fire_" + l);
        if (j.type == "mouseover") {
            var a = j.relatedTarget || j.fromElement;
            if (f != a && a && !Core.Dom.contains(f, a)) {
                if (h) {
                    h.style.display = ""
                }
                if (g) {
                    g.style.display = ""
                }
                if (k) {
                    k.style.display = ""
                }
                if (b) {
                    b.style.display = ""
                }
            }
        }
        if (j.type == "mouseout") {
            var a = j.relatedTarget || j.toElement;
            if (f != a && a && !Core.Dom.contains(f, a)) {
                if (h) {
                    h.style.display = "none"
                }
                if (g) {
                    g.style.display = "none"
                }
                if (k) {
                    k.style.display = "none"
                }
                if (b) {
                    b.style.display = "none"
                }
            }
        }
    };
Core.String.encodeHTML = function(a) {
        var b = document.createElement("div");
        b.appendChild(document.createTextNode(a));
        return b.innerHTML.replace(/\s/g, "&nbsp;")
    };
App.admin_uid_list = ["1257113795", "1642909335", "1658688240", "1661523401"];
App.unit = function() {
        var b = {},
            a;
        b.u = u = function(h, g) {
                var f = {
                    it: b,
                    sup: b[g]
                };
                return function() {
                    h.apply(f, arguments);
                    return b
                }
            };
        return b
    };
    (function(a) {
        a.DomBuilder = function(n, s, f) {
            f = typeof f == "object" ? f : {};
            var g = $C("div");
            g.innerHTML = n;
            var l = {},
                m = 0,
                r = {},
                v = {},
                b = g.getElementsByTagName("*"),
                p = b.length,
                k = f.clear || 1,
                j = f.mm || "mm",
                o = f.dd || "dd",
                q, h, t;
            for (m; m < p; m++) {
                    q = b[m];
                    t = q.getAttribute(o);
                    h = q.getAttribute(j);
                    t && (r[t] = q) && (k && q.removeAttribute(o));
                    h && ((!v[h] && (v[h] = [q])) || (v[h] = v[h].concat([q]))) && (k && q.removeAttribute(j))
                }
            l.parent = s;
            l.domList = r;
            l.actList = v;
            l.add = function() {
                    while (g.firstChild) {
                        s.appendChild(g.firstChild)
                    }
                    return l
                };
            return l
        };
        a.builder3 = function(b, f, g) {
            f.innerHTML = "";
            return a.DomBuilder(b, f, g).add()
        }
    })(App);
App.removeChildren = function(a) {
        var b;
        while (b = a.firstChild) {
            a.removeChild(b)
        }
    };
    (function(proxy) {
        var d = document,
            zIndex = 1000;

        function b2(t, b) {
                return App.builder3(t, b, {
                    dd: "id",
                    mm: "action"
                })
            }
        proxy.PopUp = function() {
                var it = App.unit(),
                    u = it.u,
                    wrap, body, mask, cp = "position:absolute;clear:both;",
                    ch = "visibility:hidden;display:none",
                    cs = "width:100%;height:100%",
                    rall = App.removeChildren;
                with(it.wrap = wrap = $C("div")) {
                        appendChild(it.body = body = $C("div"));
                        style.cssText = [cp, ch, "z-index:" + zIndex++].join(";")
                    }
                it.mask = u(function() {
                        if (!mask) {
                            wrap.insertBefore(mask = $C("iframe"), body);
                            with(mask) {
                                frameborder = 0;
                                src = "about:blank";
                                style.cssText = [cp, cs, "filter:alpha(opacity=0);opacity:0;z-index:-1"].join(";")
                            }
                        }
                    });
                it.content = u(function(html) {
                        rall(body);
                        it.dom = b2(html, body)["domList"]
                    });
                it.position = u(function(x, y) {
                        with(wrap.style) {
                            left = x + "px";
                            top = y + "px"
                        }
                    });
                it.visible = u(function(b) {
                        with(wrap.style) {
                            visibility = b ? "visible" : "hidden";
                            display = b ? "" : "none"
                        }
                    });
                it.zIndex = u(function(nIndex) {
                        wrap.style.zIndex = nIndex
                    });
                it.destroy = u(function() {
                        wrap.parentNode.removeChild(wrap);
                        wrap = body = mask = dom = null
                    });
                d.body.appendChild(wrap);
                return it
            }
    })(App);
    (function(a) {
        a.ELSize = function(h, g, b) {
            var m = Core.Dom.getStyle,
                j = h[(g == "width") ? "offsetWidth" : "offsetHeight"],
                f = 0,
                k = ["padding", "margin", "border"],
                l = (g == "width") ? ["Left", "Right"] : ["Top", "Bottom"];
            for (f; f < l.length; f++) {
                    j -= parseFloat(m(h, "padding" + l[f])) || 0;
                    b && (j += parseFloat(m(h, "margin" + l[f])) || 0);
                    j -= parseFloat(m(h, "border" + l[f] + "Width")) || 0
                }
            return j
        }
    })(App);
    (function(b) {
        var f = document,
            a;
        App.Wipe = function(y, v, h) {
                var m = App.unit(),
                    w = App.ELSize,
                    k = 0,
                    p = m.u,
                    o, s = h || 8,
                    j = y,
                    g, z = v,
                    t = z.style,
                    n, r, x, l, q;
                if (!j) {
                        j = $C("div");
                        j.style.cssText = "position:relative;clear:both";
                        n = z.parentNode;
                        n.insertBefore(j, z);
                        j.appendChild(z)
                    }
                g = j.style;
                m.isPlaying = function() {
                        return k
                    };
                m.isVisible = function() {
                        return isVisible
                    };
                m.reset = p(function() {
                        k = 0;
                        clearInterval(o);
                        g.visibility = "hidden";
                        r = x = l = q = null
                    });
                m.wipe = p(function(B, E, F, I) {
                        if (k) {
                            return
                        }
                        var J, K, N, D, A, C, G = 1,
                            L = E == a ? true : E,
                            H, M;
                        k = 1;
                        g.visibility = g.overflow = "hidden";
                        g.display = "block";
                        t[$IE ? "styleFloat" : "cssFloat"] = "left";
                        t.marginTop = t.marginLeft = "0px";
                        t.width = (r || (r = w(z, "width"))) + "px";
                        t.height = (x || (x = w(z, "height"))) + "px";
                        g.width = (l || (l = z.offsetWidth)) + "px";
                        g.height = (q || (q = z.offsetHeight)) + "px";
                        t.marginTop = t.marginLeft = "0px";
                        J = {
                                up: 0,
                                down: 1,
                                left: 2,
                                right: 3
                            }[B];
                        K = ["marginTop", "height", "marginLeft", "width"][J];
                        N = [t, g, t, g][J];
                        D = [q, q, l, l][J];
                        A = [0, 1, 0, 1][J];
                        H = [D];
                        H[s] = 0;
                        for (G; G < s; G++) {
                                H[G] = (D = D / 2)
                            }
                        I && H.reverse();
                        M = H.concat().reverse();
                        C = (L ? A : !A) ? M : H;
                        N[K] = [C[0], "px"].join("");
                        g.visibility = "visible";
                        clearInterval(o);
                        o = setInterval(function() {
                                if (C.length) {
                                    N[K] = Math.floor(C.shift()) + "px";
                                    return
                                }
                                clearInterval(o);
                                k = 0;
                                L && (g.overflow = "");
                                try {
                                    t.cssText = "";
                                    F && p(F)()
                                } catch (O) {}
                            }, 30)
                    });
                return m
            }
    })(App);
    (function(f) {
        var g = document,
            h = (g.documentElement || {}),
            b, a = function(k, j) {
                return App.builder3(k, j, {
                    dd: "id",
                    mm: "action"
                })
            };
        f.PopUpWipe = function() {
                var l = f.PopUp(),
                    o = l.u,
                    m = l.e,
                    q = [],
                    n, r, k, j, p;
                l.ani = App.Wipe(l.wrap, l.body);
                l.wipe = o(function(v, s, t) {
                        n = v;
                        l.ani.wipe(v, s, t)
                    });
                l.wipeHide = o(function() {
                        l.ani.reset();
                        l.wipe(n, false, function() {
                            l.visible(false)
                        })
                    });
                l.position = o(function(s, t) {
                        if (k != s || j != t) {
                            k = s;
                            j = t;
                            l.ani.reset()
                        }
                        n = null;
                        p = window.pageYOffset || Math.max(h.scrollTop, g.body.scrollTop);
                        if (t < p) {
                            App.scrollTo(p, t)
                        }
                        this.sup(s, t)
                    }, "position");
                l.close = o(function() {
                        if (!n) {
                            l.visible(false);
                            return false
                        }
                        l.wipeHide()
                    });
                return l
            }
    })(App);
    (function(l) {
        var k = document,
            b = Core.Events,
            f = b.addEvent,
            j = b.removeEvent,
            h = b.stopEvent,
            a = App.removeChildren,
            m, g = function(o, n) {
                return App.builder3(o, n, {
                    dd: "id",
                    mm: "action"
                })
            };
        l.BasePopUpDialog = function() {
                var q = '<div id="panel" class="miniPopLayer" style="width:200px;"><div id="typePanel" class="txt1 gray6"><img class="tipicon tip1" id="icon" src="' + scope.$BASECSS + 'style/images/common/PY_ib.gif"/><div id="content"></div></div><div id="buttonPanel" style="display:none" class="btn"></div></div>';
                var p = l.PopUpWipe().content(q),
                    o = Core.System.winSize(),
                    n = p.u,
                    r = p.dom;
                p.show = n(function() {
                        p.visible(true)
                    });
                p.hide = n(function() {
                        p.visible(false)
                    });
                p.width = n(function(s) {
                        r.panel.style.width = (s || 200) + "px"
                    });
                p.addButton = n(function(w, s) {
                        if (w === m && s === m) {
                            a(r.buttonPanel);
                            return
                        }
                        var v;
                        r.buttonPanel.appendChild(v = $C("span"));
                        var t = g(['<a id="button" style="width:39px;" class="newabtn_ok" href="javascript:void(0)" onclick="return false;"><em>', w, "</em></a>"].join(""), v)["domList"]["button"];
                        t.onclick = n(s);
                        r.buttonPanel.style.display = ""
                    });
                p.content = n(function(s) {
                        r.content.innerHTML = s
                    });
                p.icon = n(function(s) {
                        r.icon.className = ["tipicon tip", s].join("")
                    });
                p.wipe = n(function(v, s, t) {
                        this.sup(v, s, t)
                    }, "wipe");
                f(window, function() {
                        var s = Core.System.winSize();
                        if (o.width != s.width || o.height != s.height) {
                            p.visible(false);
                            o = s
                        }
                    }, "resize");
                return p
            };
        l.PopUpAlert = (function() {
                var q, o, n, r, p;
                return function() {
                    if (q) {
                        return q
                    }
                    q = l.BasePopUpDialog();
                    o = q.u;
                    q.yes = o(function(s) {
                        q.onYes = s
                    });
                    q.close = o(function(s) {
                        clearTimeout(p);
                        typeof q.onYes == "function" && q.onYes();
                        this.sup()
                    }, "close");
                    q.lateClose = o(function(s) {
                        clearTimeout(p);
                        p = setTimeout(function() {
                            q.close()
                        }, s || 3000)
                    });
                    q.position = o(function(s, t) {
                        if (s != n || t != r) {
                            n = s;
                            r = t;
                            clearTimeout(p)
                        }
                        this.sup(s, t)
                    }, "position");
                    return q
                }
            })();
        l.PopUpConfirm = (function() {
                var p, o, n, q;
                return function() {
                    if (p) {
                        return p
                    }
                    p = l.BasePopUpDialog();
                    o = p.u;
                    p.yes = o(function(r) {
                        p.onYes = r
                    });
                    p.no = o(function(r) {
                        p.onNo = r
                    });
                    p.close = o(function(r) {
                        typeof p.onNo == "function" && p.onNo();
                        this.sup()
                    }, "close");
                    p.addButton($CLTMSG.CX0125, function() {
                        typeof p.onYes == "function" && p.onYes();
                        p.wipeHide()
                    });
                    p.addButton($CLTMSG.CX0126, function() {
                        p.close()
                    });
                    return p
                }
            })()
    })(App);
App.CustomEvent = (function() {
        var j = {},
            a = {},
            h = 0,
            b = Object.prototype.toString,
            g = {},
            k = function(l) {
                var m;
                for (m in l) {
                    break
                }
                return !m
            },
            f = function(l) {
                l = l === window ? g : l;
                if (!/^\[object (Number|String)\]$/.test(b.call(l))) {
                    l = l.rid || (l.rid = ++h)
                }
                return l
            };
        j.has = function(l, n) {
                var m;
                if (!(m = a[f(l)])) {
                    return false
                }
                if (!(m = m[n])) {
                    return false
                }
                return !k(m)
            };
        j.remove = function(l, n, m) {
                l = f(l);
                if (!(d = a[l])) {
                    return
                }
                if (m) {
                    d = d[n];
                    if (m.rid == null || !d) {
                        return
                    }
                    delete d[m.rid];
                    k(d) && j.remove(l, n);
                    return
                }
                if (n) {
                    delete d[n];
                    k(d) && j.remove(l);
                    return
                }
                delete a[l]
            };
        j.add = function(l, o, n) {
                if (typeof n !== "function") {
                    return
                }
                l = f(l);
                var m = f(n);
                c = a[l] = a[l] || {};
                c = c[o] = c[o] || {};
                c[m] = c[m] || n
            };
        j.fire = function(m, p) {
                var o = f(m);
                if (j.has(o, p)) {
                    var q = a[o][p],
                        n = [];
                    Array.prototype.push.apply(n, arguments);
                    n.splice(0, 2);
                    n.length === 0 && (n = [m, p]);
                    for (var l in q) {
                            q[l].apply(null, n)
                        }
                }
            };
        return j
    })();
Core.Dom.setXY = function(a, j, h) {
        var b = Core.Dom.getStyle(a, "position");
        if (b == "static") {
            Core.Dom.setStyle(a, "position", "relative");
            b = "relative"
        }
        var g = Core.Dom.getXY(a);
        if (g == false) {
            return false
        }
        var f = [parseInt(Core.Dom.getStyle(a, "left"), 10), parseInt(Core.Dom.getStyle(a, "top"), 10)];
        if (isNaN(f[0])) {
            f[0] = (b == "relative") ? 0 : a.offsetLeft
        }
        if (isNaN(f[1])) {
            f[1] = (b == "relative") ? 0 : a.offsetTop
        }
        if (j[0] != null) {
            a.style.left = j[0] - g[0] + f[0] + "px"
        }
        if (j[1] != null) {
            a.style.top = j[1] - g[1] + f[1] + "px"
        }
        return true
    };
App.group_interface = {};
    (function(a) {
        a.create = function(b) {
            Utils.Io.Ajax.request("/attention/aj_group_create.php", {
                POST: {
                    name: b.name,
                    mod: b.mod
                },
                onComplete: function(f) {
                    if (f.code == "A00006") {
                        b.onSuccess(f.data);
                        return true
                    }
                    b.onError(f);
                    return false
                },
                onException: function() {},
                returnType: "json"
            })
        };
        a.del = function(b) {
            Utils.Io.Ajax.request("/attention/aj_group_delete.php", {
                POST: {
                    gid: b.id
                },
                onComplete: function(f) {
                    if (f.code == "A00006") {
                        b.onSuccess(f.data);
                        return true
                    }
                    b.onError(f);
                    return false
                },
                onException: function() {},
                returnType: "json"
            })
        };
        a.rename = function(b) {
            Utils.Io.Ajax.request("/attention/aj_group_rename.php", {
                POST: {
                    name: b.name,
                    gid: b.id
                },
                onComplete: function(f) {
                    if (f.code == "A00006") {
                        b.onSuccess(f.data);
                        return true
                    }
                    b.onError(f);
                    return false
                },
                onException: function() {},
                returnType: "json"
            })
        };
        a.list = function() {
            return scope.groupList
        };
        a.add = function(b) {
            if (b.group_id instanceof Array) {
                b.group_id = b.group_id.join(",")
            }
            var f = {
                action: "add",
                gids: b.group_id
            };
            if (b.person_id) {
                f.fuid = b.person_id
            }
            if (b.person_name) {
                f.pname = b.person_name
            }
            Utils.Io.Ajax.request("/attention/aj_group_update.php", {
                POST: f,
                onComplete: function(g) {
                    if (g.code == "A00006") {
                        b.onSuccess(g.data);
                        return true
                    }
                    b.onError(g);
                    return false
                },
                onException: function() {
                    b.onError()
                },
                returnType: "json"
            })
        };
        a.addAll = function(b) {
            if (b.group_id instanceof Array) {
                b.group_id = b.group_id.join(",")
            }
            var f = {
                remarkname: b.remark,
                gids: b.group_id,
                atnId: b.atnId || "",
                newgroup: b.newgroup
            };
            if (b.person_id) {
                f.fuid = b.person_id
            }
            if (b.person_name) {
                f.pname = b.person_name
            }
            Utils.Io.Ajax.request("/attention/aj_group_update.php", {
                POST: f,
                onComplete: function(g) {
                    if (g.code == "A00006") {
                        b.onSuccess(g.data);
                        return true
                    }
                    b.onError(g);
                    return false
                },
                onException: function() {
                    b.onError()
                },
                returnType: "json"
            })
        };
        a.remove = function(b) {
            if (b.group_id instanceof Array) {
                b.group_id = b.group_id.join(",")
            }
            Utils.Io.Ajax.request("/attention/aj_group_update.php", {
                POST: {
                    fuid: b.person_id,
                    gids: b.group_id,
                    action: "delete"
                },
                onComplete: function(f) {
                    if (f.code == "A00006") {
                        b.onSuccess(f.data);
                        return true
                    }
                    b.onError(f);
                    return false
                },
                onException: function() {
                    b.onError()
                },
                returnType: "json"
            })
        }
    })(App.group_interface);
    (function(b) {
        var g = {};
        b.group_manage = {};
        var f = function(j, l, k) {
            g[j].push({
                onSuccess: l,
                params: k
            })
        };
        var h = function(n, o, l) {
            for (var m = 0, j = g[n].length; m < j; m += 1) {
                try {
                    var k = g[n][m];
                    k.onSuccess(o, l, k.params)
                } catch (p) {}
            }
        };
        for (var a in App.group_interface) {
            g[a] = [];
            b.group_manage[a] = (function(j) {
                return function(k) {
                    k = k || {};
                    k.onSuccess = function(l) {
                        try {
                            h(j, l, k)
                        } catch (m) {}
                        k.success(l)
                    };
                    k.onError = k.onError ||
                    function(l) {
                        if (l && l.code) {
                            App.alert($SYSMSG[l.code])
                        }
                    };
                    return App.group_interface[j](k)
                }
            })(a)
        }
        b.group_manage.register = f
    })(App);
App.group_manage.register("create", function(a, b) {
        scope.groupList.push({
            gid: a,
            name: Core.String.encodeHTML(b.name),
            count: 0
        })
    }, {});
App.group_manage.register("del", function(f, g) {
        for (var b = 0, a = scope.groupList.length; b < a; b += 1) {
            if (scope.groupList[b]["gid"] == g.id) {
                scope.groupList.splice(b, 1);
                return false
            }
        }
    }, {});
App.group_manage.register("rename", function(f, g) {
        for (var b = 0, a = scope.groupList.length; b < a; b += 1) {
            if (scope.groupList[b]["gid"] == g.id) {
                scope.groupList[b]["name"] = Core.String.encodeHTML(g.name)
            }
        }
    }, {});
App.group_manage.register("add", function(f, g) {
        for (var b = 0, a = scope.groupList.length; b < a; b += 1) {
            if (scope.groupList[b]["gid"] == g.group_id) {
                scope.groupList[b]["count"] = parseInt(scope.groupList[b]["count"]) + 1
            }
        }
    }, {});
App.group_manage.register("remove", function(f, g) {
        for (var b = 0, a = scope.groupList.length; b < a; b += 1) {
            if (scope.groupList[b]["gid"] == g.group_id) {
                scope.groupList[b]["count"] = parseInt(scope.groupList[b]["count"]) - 1
            }
        }
    }, {});
App.group_manage.register("addAll", function(f, g) {
        for (var b = 0, a = scope.groupList.length; b < a; b += 1) {
            if (scope.groupList[b]["gid"] == g.group_id) {
                scope.groupList[b]["count"] = parseInt(scope.groupList[b]["count"]) + 1
            }
        }
    }, {});
Core.String.decodeHTML = function(a) {
        var b = document.createElement("div");
        b.innerHTML = a;
        return b.innerText == undefined ? b.textContent : b.innerText
    };
Core.Array.isArray = function(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    };
App.profile_moreact = function(p, b, n) {
        var l = scope.letter || {
            show: false
        };
        var a = scope.intro_friend || {
            show: false
        };
        var f = {
            show: false
        };
        var q = scope.nickname || {
            show: false
        };
        var j = scope.recFriend || {
            show: false
        };
        var k = scope.black || {
            show: false
        };
        var r = {
            show: (scope.isfans ? true : false)
        };
        var m = [{
            tagName: "IFRAME",
            attributes: {
                frameborder: "0",
                src: "about:blank",
                "class": "",
                id: "ifm",
                style: "position: absolute; z-index: 120; left: 100px; top: 100px;"
            }},{
            tagName: "UL",
            attributes: {
                "class": "handle_menu",
                id: "handle_menu",
                style: "position: absolute; z-index: 600; left: 100px; top: 100px;"
            },
            childList: [{
                tagName: "LI",
                attributes: {
                    id: "message"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "letter",
                        id: "btn_message",
                        href: "javascript:void(0);",
                        innerHTML: $CLTMSG.CD0054
                    }}]},{
                tagName: "LI",
                attributes: {
                    id: "group"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "set_group",
                        id: "btn_group",
                        href: "javascript:void(0);",
                        innerHTML: $CLTMSG.CD0059
                    }}]},{
                tagName: "LI",
                attributes: {
                    id: "delfans"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "del_fans",
                        id: "btn_delfans",
                        href: "javascript:void(0);",
                        innerHTML: $CLTMSG.CY0104
                    }}]},{
                tagName: "LI",
                attributes: {
                    id: "nickname"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "nickname",
                        id: "btn_nickname",
                        href: "javascript:void(0);",
                        innerHTML: $CLTMSG.CD0060
                    }}]},{
                tagName: "LI",
                attributes: {
                    id: "friend"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "rec_friend",
                        id: "btn_friend",
                        href: "javascript:void(0);",
                        innerHTML: $CLTMSG.CX0028
                    }}]},{
                tagName: "LI",
                attributes: {
                    id: "intro_friend"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "intro_friend",
                        id: "btn_intro_friend",
                        href: "http://weibo.com/recommend/addrecommend.php?name=" + (encodeURIComponent(scope.realname) || ""),
                        innerHTML: $CLTMSG.CC6107.replace(/#sex#/, scope.sex)
                    }}]},{
                tagName: "LI",
                attributes: {
                    id: "black_list"
                },
                childList: [{
                    tagName: "A",
                    attributes: {
                        "class": "black_list",
                        id: "btn_black_list",
                        href: "javascript:void(0);",
                        innerHTML: $CLTMSG.CD0061
                    }}]}]}];
        var o = function(w, v) {
            var x = Core.Dom.getXY(w);
            Core.Dom.setXY(v.box, [x[0], x[1] + w.offsetHeight - 4]);
            Core.Dom.setXY(v.ifm, [x[0], x[1] + w.offsetHeight - 4])
        };
        var g = function(v) {
            Core.Events.addEvent(v.domList.btn_message, function() {
                App.msgDialog(decodeURIComponent(l.name), false);
                v.box.style.display = "none";
                v.ifm.style.display = "none"
            }, "click");
            Core.Events.addEvent(v.domList.btn_group, function() {
                App.grpDialog(scope.setGroup);
                v.box.style.display = "none";
                v.ifm.style.display = "none"
            }, "click");
            Core.Events.addEvent(v.domList.btn_nickname, function() {
                App.followRemarkAdd("", q.oid || "", Core.String.decodeHTML(decodeURIComponent(q.remarkName)) || "");
                v.box.style.display = "none";
                v.ifm.style.display = "none"
            }, "click");
            Core.Events.addEvent(v.domList.btn_friend, function() {
                App.modrecommended(decodeURIComponent(j.name));
                v.box.style.display = "none";
                v.ifm.style.display = "none"
            }, "click");
            Core.Events.addEvent(v.domList.btn_black_list, function() {
                App.move_to_blacklist(k.oid, v.domList.black_list, decodeURIComponent(k.name), decodeURIComponent(k.ta));
                v.box.style.display = "none";
                v.ifm.style.display = "none"
            }, "click");
            Core.Events.addEvent(v.domList.btn_delfans, function() {
                if (n) {
                    n.action = 1
                }
                App.removeFans(scope.$oid, v.domList.btn_delfans, decodeURIComponent(j.name), n);
                v.box.style.display = "none";
                v.ifm.style.display = "none"
            }, "click")
        };
        var s = function(v) {
            if (!l.show) {
                v.domList.message.style.display = "none"
            } else {
                v.domList.message.style.display = ""
            }
            if (!f.show) {
                v.domList.group.style.display = "none"
            } else {
                v.domList.group.style.display = ""
            }
            if (!q.show) {
                v.domList.nickname.style.display = "none"
            } else {
                v.domList.nickname.style.display = ""
            }
            if (!j.show) {
                v.domList.friend.style.display = "none"
            } else {
                v.domList.friend.style.display = ""
            }
            if (!k.show) {
                v.domList.black_list.style.display = "none"
            } else {
                v.domList.black_list.style.display = ""
            }
            if (!r.show) {
                v.domList.delfans.style.display = "none"
            } else {
                v.domList.delfans.style.display = ""
            }
            if (!a.show) {
                v.domList.intro_friend.style.display = "none"
            } else {
                v.domList.intro_friend.style.display = ""
            }
            v.box.style.display = ""
        };
        scope.moreactshowing = true;
        if (!scope.moreact) {
            scope.moreact = new App.Builder(m);
            scope.moreact.box = scope.moreact.domList.handle_menu;
            scope.moreact.ifm = scope.moreact.domList.ifm;
            document.body.appendChild(scope.moreact.ifm);
            document.body.appendChild(scope.moreact.box);
            s(scope.moreact);
            g(scope.moreact);
            scope.moreact.ifm.style.position = "absolute";
            scope.moreact.box.style.position = "absolute";
            scope.moreact.ifm.style.zIndex = 600;
            scope.moreact.box.style.zIndex = 600;
            scope.moreact.ifm.style.height = scope.moreact.box.offsetHeight + "px";
            scope.moreact.ifm.style.width = scope.moreact.box.offsetWidth + "px";
            var t;
            if (p) {
                o(p, scope.moreact);
                t = setInterval(function() {
                    o(p, scope.moreact)
                }, 100)
            }
            Core.Events.addEvent(p, function() {
                scope.moreactshowing = false;
                setTimeout(function() {
                    if (!scope.moreactshowing) {
                        h()
                    }
                }, 100)
            }, "mouseout");
            Core.Events.addEvent(scope.moreact.box, function() {
                scope.moreactshowing = true
            }, "mouseover");
            Core.Events.addEvent(scope.moreact.box, function() {
                scope.moreactshowing = false;
                setTimeout(function() {
                    if (!scope.moreactshowing) {
                        h()
                    }
                }, 100)
            }, "mouseout")
        } else {
            s(scope.moreact)
        }
        var h = function(x) {
            var w = Core.Events.getEvent();
            var v = w ? (w.srcElement || w.target) : null;
            while (v && v != document.body) {
                if (v == scope.moreact.box || v == $E("moreact")) {
                    return true
                }
                v = v.parentNode
            }
            if (scope.moreact) {
                scope.moreact.box.style.display = "none";
                scope.moreact.ifm.style.display = "none"
            }
            Core.Events.removeEvent(document.body, h, "click")
        };
        Core.Events.addEvent(document.body, h, "click")
    };
App.grpDialog = function(k, v, m, n) {
        try {
            var C = decodeURIComponent(k.name);
            var D = k.gids ? k.gids.split(",") : "";
            var t = App.group_manage.list();
            var r = k.oid;
            for (var x = 0, z = t.length; x < z; x += 1) {
                t[x]["checked"] = false;
                for (var w = 0, l = D.length; w < l; w += 1) {
                    if (D[w] == t[x][("gid")]) {
                        t[x]["checked"] = true
                    }
                }
            }
            var o = function() {
                var F = [];
                for (var G = 0; G < t.length; G++) {
                    F.push('<li><input type="checkbox" value="' + t[G]["gid"] + '" class="labelbox" name="group_dialog_' + t[G]["gid"] + '" id="group_dialog_' + t[G]["gid"] + '"' + (t[G]["checked"] ? "  checked" : "") + '/><label style="cursor:pointer;" for="group_dialog_' + t[G]["gid"] + '" title="' + Core.String.decodeHTML(Core.String.encodeHTML(t[G]["name"])) + '">' + Core.String.decodeHTML(Core.String.encodeHTML(t[G]["name"])) + "</label></li>")
                }
                return F.join("")
            };
            var p = '<div class="shareLayer groupNewBox">	                        <div class="shareTxt clearFix" id="shareTxt"><span class="lf">' + $CLTMSG.CD0062 + '</span><span class="rt gray6" id="whygroup">为什么要设置分组<img title="" alt="" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" class="tipicon tip4" /></span></div>							<div class="group_nb_bg" >							    ' + (scope.groupList.length <= 0 ? '<div id="group_intro" class="group_note">你可以新建一个分组，把你关注的同事、同学或名人明星等放入不同的分组中。</div>' : "") + '								<ul id="group_list_D" class="group_list">' + o() + '</ul>								<div class="addNew"><a id="creategrp" href="javascript:void(0);"><em>+</em>' + $CLTMSG.CD0063 + '</a></div>                                <div id="newgrp" class="newBox" style="display:none">                	                <div class="newBox_input">                                	   <input id="group_input" type="text" value="' + $CLTMSG.CD0064 + '" class="newBox_txt"/> 									   <a href="javascript:void(0);" id="create_group" class="btn_normal"><em>' + $CLTMSG.CD0065 + '</em></a>									   <a href="javascript:void(0);" id="cancel_group">' + $CLTMSG.CD0005 + '</a>                                    </div>                                <p id="group_error" class="newBox_err error_color" style="display:none">' + $CLTMSG.CD0066 + "</p>                                </div>							</div>" + (n ? ('<div class="addNew"> ' + $CLTMSG.ZB0006 + '<input type="text" id="set_group_remark" style="color:#999" value=""/><span id="set_group_remark_err" style="display:none" class="errorTs2 error_color"></span></div>') : "") + '<div class="MIB_btn">						    <a href="javascript:void(0)" id="g_submit" class="btn_normal"><em>' + $CLTMSG.CX0036 + '</em></a>							<a href="javascript:void(0)" id="g_nogroup" class="btn_normal"><em>' + $CLTMSG.CX0126 + "</em></a>						    </div>                        </div>";
            p = p.replace(/#\{nick\}/, C);
            var B = {
                width: 390,
                zIndex: 1200,
                hidden: true
            };
            var b = new App.Dialog.BasicDialog(n ? ('<img title="" alt="" src="' + scope.$BASEIMG + 'style/images/common/PY_ib.gif" class="tipicon tip3">' + $CLTMSG.CD0154) : $CLTMSG.CD0059, p, B);
            var a = App.PopUp().content('	               <div id="whygroup" class="PopLayer" style="visibility:hidden;position:absolute;z-Index:1300">					    <table class="Poptips">					        <tbody><tr>					            <td class="top_l"></td>					            <td class="top_c"></td>					            <td class="top_r"></td>					        </tr>					        <tr>					            <td class="mid_l"></td>					            <td class="mid_c"><div class="layerBox">					                    <div style="width: auto;" class="layerBoxCon1">					                        <div class="PopInfo clearFix">					                            <div class="Poparrow4"></div>					                            <div style="width: auto" class="iconntent clearFix">					                                <!--内容开始 -->					                                <div style="width: 205px; height: 50px;">													   •&nbsp;' + $CLTMSG.CC6701 + "<br />                                                       •&nbsp;" + $CLTMSG.CC6702 + "<br />                                                       •&nbsp;" + $CLTMSG.CC6703 + '					                                </div>					                                <!--内容结束 -->					                            </div>					                        </div>					                    </div>					                </div></td>					            <td class="mid_r"></td>					        </tr>					        <tr>					            <td class="bottom_l"></td>					            <td class="bottom_c"></td>					            <td class="bottom_r"></td>					        </tr>					    </tbody></table>                    </div>').zIndex(1300);
            a.wrap.style.display = "";
            a.wrap.style.position = "";
            var s = {
                submit: $E("g_submit"),
                shareTxt: $E("shareTxt"),
                notgroup: $E("g_nogroup"),
                creategroup: $E("create_group"),
                creategrp: $E("creategrp"),
                newgrp: $E("newgrp"),
                group_error: $E("group_error"),
                group_input: $E("group_input"),
                group_list: $E("group_list_D"),
                cancel_group: $E("cancel_group"),
                whygroup: $E("whygroup"),
                group_intro: $E("group_intro"),
                remark: $E("set_group_remark"),
                remark_err: $E("set_group_remark_err")
            };
            if (n) {
                var f = k.remarkName || (scope.nickname && Core.String.decodeHTML(decodeURIComponent(scope.nickname.remarkName))) || "";
                f = (f === "") ? $CLTMSG.ZB0007 : f;
                s.remark.value = f;
                s.remark.onfocus = function() {
                    if (this.value === $CLTMSG.ZB0007) {
                        this.value = ""
                    }
                    this.style.color = "#333";
                    s.remark_err.style.display = "none";
                    s.remark_err.innerHTML = ""
                };
                Utils.Sinput.limitMaxLen(s.remark, 16);
                Utils.Sinput.limitMaxLen(s.group_input, 16);
                s.remark.onblur = function() {
                    if (this.value === "") {
                        this.value = $CLTMSG.ZB0007
                    }
                    this.style.color = "#999"
                }
            }
            if (scope.groupList.length >= 20) {
                s.creategrp.style.display = "none"
            } else {
                s.creategrp.style.display = ""
            }
            if (scope.groupList.length <= 0) {
                s.creategrp.style.display = "none";
                s.newgrp.style.display = "";
                s.newgrp.className = "newBox newBox_noBg";
                s.submit.style.display = "";
                s.notgroup.style.display = ""
            } else {
                if (scope.groupList.length < 20) {
                    s.creategrp.style.display = ""
                }
                s.newgrp.style.display = "none";
                s.newgrp.className = "newBox";
                s.submit.style.display = "";
                s.notgroup.style.display = ""
            }
            b.show();
            var h = function(G, F) {
                if (G.length != F.length) {
                    return true
                } else {
                    for (var I = 0; I < G.length; I++) {
                        for (var H = 0; H < F.length; H++) {
                            if (G[I] == F[H]) {
                                break
                            } else {
                                if (H == F.length - 1) {
                                    return true
                                }
                            }
                        }
                    }
                    return false
                }
            };
            var q = function(H, G) {
                var F = Core.Events.getEventTarget(H);
                var j = F.tagName;
                if (!j) {
                    return
                }
                j = j.toLowerCase();
                if (j === "label" || j === "input") {
                    F.parentNode.className = G ? "hover" : "";
                    Core.Events.stopEvent(H)
                } else {
                    if (j === "li") {
                        F.className = G ? "hover" : ""
                    }
                }
            };
            var y = function(G) {
                var F = Core.Events.getEventTarget(G);
                var j = F.tagName;
                if (!j) {
                    return
                }
                j = j.toLowerCase();
                if (j === "li") {
                    F.getElementsByTagName("INPUT")[0].checked = !F.getElementsByTagName("INPUT")[0].checked;
                    Core.Events.stopEvent(G)
                }
                return false
            };
            s.whygroup.onmouseover = function(j) {
                var F = Core.Dom.getXY(s.whygroup);
                Core.Dom.setXY(a.dom.whygroup, [F[0] + s.whygroup.offsetWidth + 5, F[1] - 3 + s.whygroup.offsetHeight - a.dom.whygroup.offsetHeight / 2]);
                a.dom.whygroup.style.visibility = "visible"
            };
            s.whygroup.onmouseout = function(j) {
                a.dom.whygroup.style.visibility = "hidden"
            };
            s.group_list.onmouseover = function(j) {
                q(j, true)
            };
            s.group_list.onmouseout = function(j) {
                q(j)
            };
            s.group_list.onclick = function(j) {
                y(j)
            };
            s.notgroup.onclick = function() {
                b.close();
                if (v) {
                    window.location.reload(true)
                }
            };
            var g = $CLTMSG.CD0064;
            s.cancel_group.onclick = function() {
                if (scope.groupList.length <= 0) {
                    b.close();
                    return false
                }
                s.creategrp.style.display = "";
                s.newgrp.style.display = "none";
                s.group_input.value = g;
                s.group_error.style.display = "none"
            };
            s.group_input.onfocus = function() {
                if (s.group_input.value == g) {
                    s.group_input.value = ""
                }
            };
            s.group_input.onblur = function() {
                if (Core.String.trim(s.group_input.value) == "") {
                    s.group_input.value = g
                }
            };
            s.submit.onclick = function() {
                var H = App.htmlToJson(s.group_list, ["input"]);
                var j = new Array();
                for (var G in H) {
                    j.push(H[G])
                }
                if ((s.group_input.value !== g && s.group_input.value !== "") || h(j, D) || (n && (F !== f))) {
                    if (s.group_input.value !== g && s.group_input.value !== "") {
                        if (!E()) {
                            return false
                        }
                    }
                    var F = "";
                    var I = {
                        group_id: j.join(","),
                        person_id: r,
                        remark: F,
                        newgroup: s.group_input.value === g ? "" : s.group_input.value,
                        atnId: (m && m.atnId) ? m.atnId : "",
                        success: function(K) {
                            App.CustomEvent.fire("window", "cardCache");
                            b.close();
                            var J = App.alert($CLTMSG.CD0067, {
                                hasBtn: false,
                                icon: 3
                            });
                            setTimeout(function() {
                                J.close()
                            }, 1800);
                            if (K && K.global) {
                                for (var M in K.global) {
                                    scope[M] = K.global[M]
                                }
                            }
                            try {
                                if (scope.nickname && scope.nickname.remarkName) {
                                    $E("remark_name").innerHTML = "(" + scope.nickname.remarkName + ")";
                                    $E("remark_name").style.display = ""
                                } else {
                                    $E("remark_name").style.display = "none"
                                }
                            } catch (L) {}
                        },
                        onError: function(J) {
                            if (J.code == "M05008") {
                                s.remark_err.style.display = "";
                                s.remark_err.innerHTML = $CLTMSG.CC1205
                            } else {
                                s.remark_err.style.display = "none";
                                s.remark_err.innerHTML = ""
                            }
                            return false
                        }
                    };
                    if (n) {
                        F = s.remark.value === $CLTMSG.ZB0007 ? "" : s.remark.value;
                        I.remark = F
                    }
                    App.group_manage.addAll(I)
                } else {
                    if (v) {
                        window.location.reload(true)
                    }
                    b.close()
                }
            };
            s.creategroup.onclick = function() {
                if (s.creategroup.locked) {
                    return false
                }
                if (!E()) {
                    return false
                }
                s.group_input.value = Core.String.trim(s.group_input.value);
                if (!s.group_input.value) {
                    return false
                }
                s.creategroup.locked = true;
                App.group_manage.create({
                    name: Core.String.trim(s.group_input.value),
                    success: function(j) {
                        Core.Dom.removeNode(s.group_intro);
                        s.group_input.blur();
                        s.creategrp.style.display = "";
                        s.newgrp.style.display = "none";
                        s.group_error.style.display = "none";
                        Core.Dom.insertHTML(s.group_list, '<li><input type="checkbox" value="' + j + '" class="labelbox" name="group_dialog_' + j + '" id="group_dialog_' + j + '" checked/><label for="group_dialog_' + j + '" style="cursor:pointer" title="' + Core.String.encodeHTML(Core.String.trim(s.group_input.value)) + '">' + Core.String.encodeHTML(Core.String.trim(s.group_input.value)) + " </label></li>", "beforeend");
                        s.creategroup.locked = false;
                        s.group_input.value = g;
                        if (scope.groupList.length >= 20) {
                            setTimeout(function() {
                                s.creategrp.style.display = "none"
                            }, 20)
                        }
                        s.newgrp.className = "newBox";
                        s.submit.style.display = "";
                        s.notgroup.style.display = "";
                        s.shareTxt.innerHTML = $CLTMSG.CD0062.replace(/#\{nick\}/, C);
                        s.submit.focus();
                        App.CustomEvent.fire("window", "cardCache")
                    },
                    onError: function(j) {
                        s.creategroup.locked = false;
                        if (j && j.code) {
                            s.group_error.innerHTML = $SYSMSG[j.code];
                            s.group_error.style.display = ""
                        }
                        return false
                    }
                })
            };
            s.creategrp.onclick = function() {
                s.creategrp.style.display = "none";
                s.newgrp.style.display = ""
            };
            s.group_input.onkeypress = function(F) {
                var j = F || window.event;
                if (j.keyCode == 13) {
                    Core.Events.fireEvent(s.creategroup, "click")
                }
            };
            var E = function() {
                var G = Core.String.trim(s.group_input.value);
                if (Core.String.byteLength(G) > 16) {
                    s.group_error.innerHTML = $SYSMSG.M14010;
                    s.group_error.style.display = "";
                    return false
                }
                if (G == "" || G == g) {
                    s.group_error.innerHTML = $SYSMSG.M14014;
                    s.group_error.style.display = "";
                    return false
                }
                for (var F = 0, j = t.length; F < j; F += 1) {
                    if (Core.String.decodeHTML(t[F]["name"]) == G) {
                        s.group_error.innerHTML = $SYSMSG.M14008;
                        s.group_error.style.display = "";
                        return false
                    }
                }
                s.group_input.value = G;
                s.group_error.style.display = "none";
                return true
            };
            return b
        } catch (A) {}
    };
$registJob("profile_moreact", function() {
        var a = $E("moreact");
        _conf = scope.atnSts || {};
        Core.Events.addEvent(a, function() {
            App.profile_moreact(a, null, _conf)
        }, "mouseover")
    });
App.followadd = function(j, l, h, g, f) {
        h = "/attention/aj_addfollow.php";
        while (l.nodeName.toLowerCase(0) != "p") {
            l = l.parentNode
        }
        function a(n) {
            if (scope.$pageid == "follow" && scope.$oid == scope.$uid) {
                var k = scope.$BASECSS + "style/images/common/transparent.gif";
                l.innerHTML = '<img class="small_icon sicon_atteo" title="' + $CLTMSG.CC3001 + '" src="' + k + '">'
            } else {
                l.innerHTML = '<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"></span>' + $CLTMSG.CC2510 + "</a>"
            }
            App.grpDialog({
                oid: j,
                name: g
            }, false, f, true)
        }
        if (l.ask_following) {
            return false
        }
        var m = {
            uid: j,
            fromuid: scope.$uid
        };
        if (typeof f === "object") {
            for (var b in f) {
                m[b] = f[b]
            }
        }
        App.followOperation(m, h, a, l)
    };
App.followcancel = (function() {
        var a;
        return function(m, g, o, b, p, n) {
            p = p || "TA";
            var l = o == 1 ? -40 : 0;
            var t = Core.Dom.getXY(g);
            var v = t[0] - (((o == 1 ? 250 : 200) - g.offsetWidth) / 2);
            var s = t[1] - (g.offsetHeight) - 70 + l;
            var q = $CLTMSG.CC3101;
            var j = new Utils.Template(q);
            var k = j.evaluate({
                sex: p
            });
            if (Core.Array.findit(App.admin_uid_list, m) === -1) {
                k += '<div class="block"><input type="checkbox" id="del_block_user"><label for="del_block_user">' + $CLTMSG.CC2701 + "</label></div>"
            }
            var h = o == 1 ? [k, $CLTMSG.CC3102 + b + "?"].join("") : [$CLTMSG.CD0007, b, "?"].join("");
            var r = function() {
                var x = "/attention/aj_delfollow.php";
                var z = {
                    touid: m,
                    fromuid: scope.$uid
                };
                if (o && o == 1) {
                    z.action = 1
                }
                if ($E("del_block_user") && $E("del_block_user").checked) {
                    z.isblack = "OK"
                }
                if (n) {
                    for (var y in n) {
                        z[y] = n[y]
                    }
                }
                function w(B) {
                    var C = function() {
                        setTimeout(function() {
                            window.location.reload(true)
                        }, 500)
                    };
                    var A = $E(m);
                    if (!A) {
                        C();
                        return
                    }
                    A.onmouseover = null;
                    A.onmouseout = null;
                    App.Wipe(null, A).wipe("down", false, function() {
                        A.parentNode.parentNode.removeChild(A.parentNode);
                        if ($E("att_wrap")) {
                            if (!$E("att_wrap").getElementsByTagName("LI").length) {
                                C();
                                return false
                            }
                        }
                        if (scope.$pageid == "profile") {
                            C();
                            return false
                        }
                    })
                }
                App.followOperation(z, x, w, null, "del")
            };
            var f = App.PopUpConfirm().position(v, s).content(h).width(o == 1 ? 250 : 200).icon(4).yes(function() {
                if (!scope.loginKit().isLogin) {
                    App.ModLogin({
                        func: function() {
                            setTimeout(function() {
                                Core.Events.fireEvent(g, "click")
                            }, 200)
                        }
                    });
                    return false
                }
                r();
                return false
            }).no(function() {
                return false
            });
            setTimeout(function() {
                f.wipe("up", true)
            }, 100)
        }
    })();
App.followOperation = function(h, a, g, b, k, j) {
        if (!scope.$uid) {
            App.ModLogin({
                func: arguments.callee,
                param: [h, a, g]
            });
            return false
        }
        if (scope.$cuser_status === "nofull") {
            App.finishInformation();
            return false
        }
        if (scope.$uid == "123456") {
            var l = arguments[0];
            h = l[0];
            a = l[1];
            g = l[2]
        }
        function f(n) {
            if (b) {
                b.ask_following = false
            }
            if (n.code == "M00003") {
                App.ModLogin()
            } else {
                if (n && n.code == "MR0050") {
                    App.forbidrefresh(function() {
                        h.retcode = scope.doorretcode;
                        App.doRequest(h, a, m, f)
                    }, "/attention/aj_addfollow.php")
                } else {
                    App.alert(n, {
                        ok: function() {
                            if (scope.$uid == "123456") {
                                location.reload()
                            }
                        }
                    });
                    if (typeof j === "function") {
                        j.call(null, n)
                    }
                }
            }
        }
        var m = function(n) {
            g(n);
            if (scope.$uid == "123456") {
                location.reload(true)
            }
        };
        if (k === "del") {
            App.doRequest(h, a, m, f)
        } else {
            App.doRequest(h, a, function(n) {
                if (b) {
                    b.ask_following = true
                }
                m(n)
            }, f)
        }
    };
App.copyLink = function(f) {
        var g = $E("copytext");
        var a = $CLTMSG.CC2508;
        var b = {
            icon: 3
        };
        if (App.copyText(g.value) == false) {
            a = $CLTMSG.CC2509;
            b = {
                icon: 1
            }
        }
        App.flyDialog(a, null, $E("copylink"), b);
        Core.Events.stopEvent(f)
    };
$registJob("initPage", function() {
        var a = $E("copytext");
        if (a) {
            a.onfocus = a.onclick = function() {
                a.select()
            };
            Core.Events.addEvent($E("copylink"), App.copyLink, "click")
        }
    });
App.followAll = function(btn) {
        try {
            if (scope.$uid != scope.$oid) {
                return
            }
            var els = $E("att_wrap").getElementsByTagName("li");
            var uids = [];
            for (var i = 0, len = els.length; i < len; i++) {
                var el = els[i];
                if (el.className.search(/cur/i) != -1) {
                    continue
                }
                uids.push(el.id)
            }
            if (!uids.length) {
                return false
            }
            var pos = Core.Dom.getXY(btn);
            var x = pos[0] - ((200 - btn.offsetWidth) / 2);
            var y = pos[1] - (btn.offsetHeight) - 50;
            var msg = [$CLTMSG.CD0007, name, "?"].join("");
            var _alert = App.PopUpAlert().position(x, y);

            function changeBGcolor(uids) {
                for (var i = 0, ilen = uids.length; i < ilen; i++) {
                    var uid = uids[i];
                    var add = $E("add_" + uid);
                    if (add) {
                        if (scope.$uid == scope.$oid && scope.$pageid == "follow") {
                            var imgURI = scope.$BASECSS + "style/images/common/transparent.gif";
                            var _p = $C("p");
                            _p.className = "mutual";
                            _p.innerHTML = '<img class="small_icon sicon_atteo" title="' + $CLTMSG.CC3001 + '" src="' + imgURI + '">';
                            Core.Dom.replaceNode(_p, add)
                        } else {
                            add.innerHTML = '<a class="concernBtn_Yet" href="javascript:void(0);"><span class="add_yet"/>' + $CLTMSG.CC2510 + "</a>"
                        }
                    }
                }
            }
            function cb() {
                changeBGcolor(uids);
                setTimeout(function() {
                    _alert.content($CLTMSG.CC2601).position(x, y + 20).icon(3).wipe("up", true).lateClose(1500)
                }, 500);
                btn.style.visibility = "hidden"
            }
            function ecb(json) {
                if (json && json.code == "MR0050") {
                    App.forbidrefresh(function() {
                        var data = {
                            uid: uids.join(","),
                            fromuid: scope.$uid
                        };
                        data.retcode = scope.doorretcode;
                        App.doRequest(data, "/attention/aj_addfollow.php", cb, ecb)
                    }, "/attention/aj_addfollow.php")
                } else {
                    if (json.code == "R01440") {
                        App.alert({
                            code: json.code
                        });
                        return false
                    }
                    App.promptTip(json, null, "system_information", "error");
                    if (json.code == "M05003") {
                        changeBGcolor(json.data.uids)
                    }
                    if ($IE) {
                        location.hash = "top"
                    } else {
                        document.body.scrollIntoView()
                    }
                }
            }
            App.PopUpConfirm().position(x, y).width(200).content($CLTMSG.CL0803).icon(4).yes(function() {
                var data = {
                    uid: uids.join(","),
                    fromuid: scope.$uid
                };
                var statistics = btn.getAttribute("atnsts");
                try {
                    statistics = eval("(" + statistics + ")")
                } catch (e) {}
                if (typeof statistics === "object") {
                    for (var k in statistics) {
                        data[k] = statistics[k]
                    }
                }
                App.doRequest(data, "/attention/aj_addfollow.php", cb, ecb)
            }).wipe("up", true)
        } catch (e) {
            throw e
        }
    };
App.followRemarkAdd = function(f, h, k) {
        var j = $CLTMSG.CC3104;
        var l = '<div style="width: 390px;" class="layerBoxCon">	    <div class="inviteLayer">	        <p class="flName">	            ' + $CLTMSG.CC3105 + '	        </p>	        <div class="inviteLayerInput">	            <input type="text" class="PY_input" id="remark" value="">	            <a id="submit" href="javascript:void(0);" class="btn_normal"><em>' + $CLTMSG.CC1102 + '</em></a>	        </div>	        <p class="errorTs yellow2" id="errorTip" style="display:none;">' + j + "</p>	    </div>	</div>";
        var n = {
            width: 390,
            zIndex: 1000,
            hidden: true
        };
        var p = new App.Dialog.BasicDialog($CLTMSG.CC3106, l, n);
        p.show();
        var m = $E("remark"),
            b = $E("errorTip"),
            o = $E("submit");
        var a = (navigator.userAgent.toLowerCase().indexOf("chrome") != -1);
        if (a) {
                o.style.top = "-3px"
            }
        m.focus();
        m.value = (App._remarks_ && App._remarks_[h]) || k || m.value;
        if (App._remarks_ && App._remarks_[h] == "") {
                m.value = ""
            }
        var q = true;
        Core.Events.addEvent(m, function() {
                if (q && !k && !(App._remarks_ && App._remarks_[h])) {
                    m.value = "";
                    q = false
                }
            }, "focus");
        Core.Events.addEvent(m, function() {
                var r = Core.String.byteLength(m.value);
                if (r > 16) {
                    b.innerHTML = j;
                    b.style.display = "block";
                    setTimeout(function() {
                        m.focus()
                    }, 100)
                } else {
                    if (b.innerHTML == j) {
                        b.style.display = "none"
                    }
                }
            }, "blur");
        Core.Events.addEvent(m, function() {
                var r = Core.String.byteLength(m.value);
                if (r > 16) {
                    m.value = Core.String.leftB(m.value, 16)
                } else {
                    if (b.innerHTML == j) {
                        b.style.display = "none"
                    }
                }
            }, "keyup");

        function g() {
                if (Core.String.byteLength(m.value) > 16) {
                    b.innerHTML = j;
                    b.style.display = "block";
                    setTimeout(function() {
                        m.focus()
                    }, 200);
                    return
                }
                var r = m.value;
                App.doRequest({
                    fuid: h,
                    remarkname: r
                }, "/attention/aj_remarkname.php", function() {
                    App.CustomEvent.fire("window", "cardCache");
                    App._remarks_ = App._remarks_ || {};
                    App._remarks_[h] = r;
                    p.close();
                    var t = scope.$pageid === "profile";
                    if (f) {
                        if (Core.String.trim(r).length > 0) {
                            var s = Core.String.encodeHTML(Core.String.trim(r));
                            f.innerHTML = t ? "&nbsp;(" + s + ")" : s;
                            if (!t) {
                                f.parentNode.style.display = "";
                                f.parentNode.id = ""
                            }
                        } else {
                            if (t) {
                                f.innerHTML = "&nbsp;(" + $CLTMSG.ZB0007 + ")"
                            } else {
                                f.parentNode.style.display = "none";
                                f.parentNode.id = "remark_" + h;
                                f.innerHTML = $CLTMSG.ZB0007
                            }
                        }
                    }
                }, function() {
                    if (arguments[0] && arguments[0].code) {
                        b.innerHTML = $SYSMSG[arguments[0].code];
                        b.style.display = "block"
                    } else {
                        App.alert($CLTMSG.CC3107, {
                            icon: 2,
                            width: 370,
                            height: 120
                        })
                    }
                })
            }
        Core.Events.addEvent(o, g, "click");
        App.enterSubmit({
                parent: o.parentNode,
                action: function() {
                    Core.Events.fireEvent(o, "click")
                }
            })
    };
App.rightSideFollow = function(h, j, m, g) {
        var f = "/attention/aj_addfollow.php";

        function a() {
            var k = document.createElement("SPAN");
            k.innerHTML = $CLTMSG.CC2510;
            Core.Dom.insertAfter(k, j);
            Core.Dom.removeNode(j);
            if (typeof(m) == "function") {
                m()
            }
        }
        var l = {
            uid: h,
            fromuid: scope.$uid
        };
        if (g) {
            for (var b in g) {
                l[b] = g[b]
            }
        }
        App.followOperation(l, f, a)
    };
    (function() {
        var a = function(f, g) {
            var b = g;
            if (b.tagName !== "DL") {
                b = g.parentNode.parentNode.parentNode
            }
            App.replaceByAnewUser(b, f)
        };
        App.rightSuggestFollow = function(j, h, g) {
            if (App.mbufLock) {
                return false
            }
            var f = h.parentNode.parentNode.parentNode;
            var b = function() {
                try {
                    App.mbufLock = false;
                    App.grpDialog({
                        oid: j.uid,
                        name: j.name
                    }, false, g, true);
                    setTimeout(function() {
                        a(j && j.uid, f)
                    }, 1000)
                } catch (k) {}
            };
            App.rightSideFollow(j && j.uid, h, b, g)
        };
        App.card_follow = function(g) {
            var b = $E("interest_person");
            var j = b.getElementsByTagName("dl");
            for (var f = 0; f < j.length; f++) {
                if (j[f].getAttribute("uid") == g) {
                    var h = j[f];
                    break
                }
            }
            if (h) {
                a(g, h)
            }
        }
    })();
App.delDialog = function(b, l, j, f, k, h, a) {
        var g = App.flyDialog(b, "confirm", h || null, {
            ok: function() {
                if ($E("block_user") && $E("block_user").checked) {
                    j.isblack = "OK"
                }
                Utils.Io.Ajax.request(l, {
                    POST: j,
                    onComplete: function(m) {
                        if (m && m.code == "A00006") {
                            f(m)
                        } else {
                            k(m)
                        }
                    },
                    onException: k,
                    returnType: "json"
                })
            },
            icon: 4,
            title: a
        });
        return g
    };
App.msgPublisher = function(a, f, h, b) {
        a = a || {};
        f = f || {
            limit: 600,
            postUrl: "/message/addmsg.php",
            normClass: "btn_normal",
            disabledClass: "btn_notclick"
        };
        var g = {};
        g.limit = (function(j, k) {
            return function() {
                var l = j.editor.value;
                var m = Core.String.byteLength(l);
                if (m > k.limit) {
                    j.editor.value = Core.String.leftB(l, k.limit)
                }
            }
        })(a, f);
        App.autoHeightTextArea(a.editor, g.limit, f.maxHeight || null);
        g.submit = (function(j, k) {
            return function() {
                try {
                    if (!j.submit.lock) {
                        j.submit.className = k.disabledClass || j.submit.className;
                        j.submit.lock = true;
                        var l = Core.String.trim(j.nick.value);
                        if (!l || l == $CLTMSG.CD0049) {
                            j.submit.className = k.normClass || j.submit.className;
                            j.submit.lock = false;
                            j.info.innerHTML = $SYSMSG.M01100;
                            j.info.style.display = "";
                            return
                        }
                        var n = Core.String.trim(j.editor.value);
                        if (!n) {
                            j.submit.className = k.normClass || j.submit.className;
                            j.submit.lock = false;
                            j.info.innerHTML = $SYSMSG.M07001;
                            j.info.style.display = "";
                            return
                        }
                        var o = {
                            content: encodeURIComponent(n),
                            name: encodeURIComponent(l),
                            retcode: scope.doorretcode || ""
                        };
                        Utils.Io.Ajax.request(k.postUrl, {
                            POST: o,
                            onComplete: function(p) {
                                j.submit.className = k.normClass || j.submit.className;
                                j.submit.lock = false;
                                if (p.code == "A00006") {
                                    if (b) {
                                        b()
                                    }
                                    if (h) {
                                        window.location.reload(true)
                                    } else {
                                        var q = App.alert($SYSMSG.M09003, {
                                            icon: 3,
                                            hasBtn: false
                                        });
                                        setTimeout(function() {
                                            q.close()
                                        }, 1000)
                                    }
                                } else {
                                    if (p.code == "M00003") {
                                        App.ModLogin(function() {
                                            window.location.reload(true)
                                        })
                                    } else {
                                        if (p.code == "M09006") {
                                            if (b) {
                                                b()
                                            }
                                            var q = App.confirm($SYSMSG.M09006, {
                                                ok: function() {
                                                    location.href = "/mobile/msg.php"
                                                },
                                                cancel: function() {
                                                    q.close()
                                                }
                                            })
                                        } else {
                                            if (p.code == "MR0050") {
                                                App.forbidrefresh(function() {
                                                    g.submit()
                                                }, "/mblog/publish.php");
                                                return false
                                            } else {
                                                j.info.innerHTML = $SYSMSG[p.code];
                                                j.info.style.display = ""
                                            }
                                        }
                                    }
                                }
                            },
                            onException: function() {
                                j.submit.className = k.normClass || j.submit.className;
                                j.submit.lock = false
                            },
                            returnType: "json"
                        })
                    }
                } catch (m) {}
            }
        })(a, f);
        if (a.editor) {
            Core.Events.addEvent(a.editor, function(j) {
                if ((j.ctrlKey == true && j.keyCode == "13") || (j.altKey == true && j.keyCode == "83")) {
                    a.editor.blur();
                    g.submit()
                }
            }, "keyup")
        }
        if (a.nick) {
            Core.Events.addEvent(a.nick, (function(j) {
                return function() {
                    if (j.value === $CLTMSG.CD0049) {
                        j.value = ""
                    }
                    j.style.color = "#333333"
                }
            })(a.nick), "focus");
            Core.Events.addEvent(a.nick, (function(j) {
                return function() {
                    if (Core.String.trim(j.value) == "") {
                        j.value = $CLTMSG.CD0049
                    }
                    j.style.color = "#999999"
                }
            })(a.nick), "blur");
            a.nick.value = a.nick.value || $CLTMSG.CD0049;
            a.nick.style.color = "#999999"
        }
        if (a.submit) {
            Core.Events.addEvent(a.submit, g.submit, "click")
        }
        return g
    };
App.simpleAjax = function(url, success, error, fail) {
        var req, res, error;
        req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        if (!req) {
            return
        }
        req.onreadystatechange = function() {
            try {
                if (req.readyState == 4) {
                    res = eval("(" + req.responseText + ")");
                    if (res && res.code == "A00006") {
                        success && success(res);
                        return
                    }
                    error && error(res)
                }
            } catch (e) {
                fail && fail(e.message);
                return false
            }
        };
        try {
            req.open("GET", url, true);
            req.send(null)
        } catch (e) {
            fail && fail(e.message);
            return false
        }
        return {
            abort: function() {
                req.abort();
                return false
            }
        }
    };
var swfobject = function() {
        var aq = "undefined",
            aD = "object",
            ab = "Shockwave Flash",
            X = "ShockwaveFlash.ShockwaveFlash",
            aE = "application/x-shockwave-flash",
            ac = "SWFObjectExprInst",
            ax = "onreadystatechange",
            af = window,
            aL = document,
            aB = navigator,
            aa = false,
            Z = [aN],
            aG = [],
            ag = [],
            al = [],
            aJ, ad, ap, at, ak = false,
            aU = false,
            aH, an, aI = true,
            ah = function() {
                var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
                    h = aB.userAgent.toLowerCase(),
                    f = aB.platform.toLowerCase(),
                    l = f ? /win/.test(f) : /win/.test(h),
                    n = f ? /mac/.test(f) : /mac/.test(h),
                    k = /webkit/.test(h) ? parseFloat(h.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                    g = !+"\v1",
                    j = [0, 0, 0],
                    o = null;
                if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
                        o = aB.plugins[ab].description;
                        if (o && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
                            aa = true;
                            g = false;
                            o = o.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                            j[0] = parseInt(o.replace(/^(.*)\..*$/, "$1"), 10);
                            j[1] = parseInt(o.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                            j[2] = /[a-zA-Z]/.test(o) ? parseInt(o.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                        }
                    } else {
                        if (typeof af.ActiveXObject != aq) {
                            try {
                                var m = new ActiveXObject(X);
                                if (m) {
                                    o = m.GetVariable("$version");
                                    if (o) {
                                        g = true;
                                        o = o.split(" ")[1].split(",");
                                        j = [parseInt(o[0], 10), parseInt(o[1], 10), parseInt(o[2], 10)]
                                    }
                                }
                            } catch (b) {}
                        }
                    }
                return {
                        w3: a,
                        pv: j,
                        wk: k,
                        ie: g,
                        win: l,
                        mac: n
                    }
            }(),
            aK = function() {
                if (!ah.w3) {
                    return
                }
                if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
                    aP()
                }
                if (!ak) {
                    if (typeof aL.addEventListener != aq) {
                        aL.addEventListener("DOMContentLoaded", aP, false)
                    }
                    if (ah.ie && ah.win) {
                        aL.attachEvent(ax, function() {
                            if (aL.readyState == "complete") {
                                aL.detachEvent(ax, arguments.callee);
                                aP()
                            }
                        });
                        if (af == top) {
                            (function() {
                                if (ak) {
                                    return
                                }
                                try {
                                    aL.documentElement.doScroll("left")
                                } catch (a) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                aP()
                            })()
                        }
                    }
                    if (ah.wk) {
                        (function() {
                            if (ak) {
                                return
                            }
                            if (!/loaded|complete/.test(aL.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            aP()
                        })()
                    }
                    aC(aP)
                }
            }();

        function aP() {
                if (ak) {
                    return
                }
                try {
                    var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
                    b.parentNode.removeChild(b)
                } catch (a) {
                    return
                }
                ak = true;
                var g = Z.length;
                for (var f = 0; f < g; f++) {
                    Z[f]()
                }
            }
        function aj(a) {
                if (ak) {
                    a()
                } else {
                    Z[Z.length] = a
                }
            }
        function aC(a) {
                if (typeof af.addEventListener != aq) {
                    af.addEventListener("load", a, false)
                } else {
                    if (typeof aL.addEventListener != aq) {
                        aL.addEventListener("load", a, false)
                    } else {
                        if (typeof af.attachEvent != aq) {
                            aM(af, "onload", a)
                        } else {
                            if (typeof af.onload == "function") {
                                var b = af.onload;
                                af.onload = function() {
                                    b();
                                    a()
                                }
                            } else {
                                af.onload = a
                            }
                        }
                    }
                }
            }
        function aN() {
                if (aa) {
                    Y()
                } else {
                    am()
                }
            }
        function Y() {
                var g = aL.getElementsByTagName("body")[0];
                var b = ar(aD);
                b.setAttribute("type", aE);
                var a = g.appendChild(b);
                if (a) {
                    var f = 0;
                    (function() {
                        if (typeof a.GetVariable != aq) {
                            var h = a.GetVariable("$version");
                            if (h) {
                                h = h.split(" ")[1].split(",");
                                ah.pv = [parseInt(h[0], 10), parseInt(h[1], 10), parseInt(h[2], 10)]
                            }
                        } else {
                            if (f < 10) {
                                f++;
                                setTimeout(arguments.callee, 10);
                                return
                            }
                        }
                        g.removeChild(b);
                        a = null;
                        am()
                    })()
                } else {
                    am()
                }
            }
        function am() {
                var k = aG.length;
                if (k > 0) {
                    for (var l = 0; l < k; l++) {
                        var f = aG[l].id;
                        var p = aG[l].callbackFn;
                        var a = {
                            success: false,
                            id: f
                        };
                        if (ah.pv[0] > 0) {
                            var m = aS(f);
                            if (m) {
                                if (ao(aG[l].swfVersion) && !(ah.wk && ah.wk < 312)) {
                                    ay(f, true);
                                    if (p) {
                                        a.success = true;
                                        a.ref = av(f);
                                        p(a)
                                    }
                                } else {
                                    if (aG[l].expressInstall && au()) {
                                        var h = {};
                                        h.data = aG[l].expressInstall;
                                        h.width = m.getAttribute("width") || "0";
                                        h.height = m.getAttribute("height") || "0";
                                        if (m.getAttribute("class")) {
                                            h.styleclass = m.getAttribute("class")
                                        }
                                        if (m.getAttribute("align")) {
                                            h.align = m.getAttribute("align")
                                        }
                                        var j = {};
                                        var g = m.getElementsByTagName("param");
                                        var o = g.length;
                                        for (var n = 0; n < o; n++) {
                                            if (g[n].getAttribute("name").toLowerCase() != "movie") {
                                                j[g[n].getAttribute("name")] = g[n].getAttribute("value")
                                            }
                                        }
                                        ae(h, j, f, p)
                                    } else {
                                        aF(m);
                                        if (p) {
                                            p(a)
                                        }
                                    }
                                }
                            }
                        } else {
                            ay(f, true);
                            if (p) {
                                var b = av(f);
                                if (b && typeof b.SetVariable != aq) {
                                    a.success = true;
                                    a.ref = b
                                }
                                p(a)
                            }
                        }
                    }
                }
            }
        function av(b) {
                var g = null;
                var f = aS(b);
                if (f && f.nodeName == "OBJECT") {
                    if (typeof f.SetVariable != aq) {
                        g = f
                    } else {
                        var a = f.getElementsByTagName(aD)[0];
                        if (a) {
                            g = a
                        }
                    }
                }
                return g
            }
        function au() {
                return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312)
            }
        function ae(j, g, l, h) {
                aU = true;
                ap = h || null;
                at = {
                    success: false,
                    id: l
                };
                var a = aS(l);
                if (a) {
                    if (a.nodeName == "OBJECT") {
                        aJ = aO(a);
                        ad = null
                    } else {
                        aJ = a;
                        ad = l
                    }
                    j.id = ac;
                    if (typeof j.width == aq || (!/%$/.test(j.width) && parseInt(j.width, 10) < 310)) {
                        j.width = "310"
                    }
                    if (typeof j.height == aq || (!/%$/.test(j.height) && parseInt(j.height, 10) < 137)) {
                        j.height = "137"
                    }
                    aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
                    var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
                        f = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
                    if (typeof g.flashvars != aq) {
                            g.flashvars += "&" + f
                        } else {
                            g.flashvars = f
                        }
                    if (ah.ie && ah.win && a.readyState != 4) {
                            var k = ar("div");
                            l += "SWFObjectNew";
                            k.setAttribute("id", l);
                            a.parentNode.insertBefore(k, a);
                            a.style.display = "none";
                            (function() {
                                if (a.readyState == 4) {
                                    a.parentNode.removeChild(a)
                                } else {
                                    setTimeout(arguments.callee, 10)
                                }
                            })()
                        }
                    aA(j, g, l)
                }
            }
        function aF(a) {
                if (ah.ie && ah.win && a.readyState != 4) {
                    var b = ar("div");
                    a.parentNode.insertBefore(b, a);
                    b.parentNode.replaceChild(aO(a), b);
                    a.style.display = "none";
                    (function() {
                        if (a.readyState == 4) {
                            a.parentNode.removeChild(a)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                } else {
                    a.parentNode.replaceChild(aO(a), a)
                }
            }
        function aO(b) {
                var g = ar("div");
                if (ah.win && ah.ie) {
                    g.innerHTML = b.innerHTML
                } else {
                    var h = b.getElementsByTagName(aD)[0];
                    if (h) {
                        var a = h.childNodes;
                        if (a) {
                            var j = a.length;
                            for (var f = 0; f < j; f++) {
                                if (!(a[f].nodeType == 1 && a[f].nodeName == "PARAM") && !(a[f].nodeType == 8)) {
                                    g.appendChild(a[f].cloneNode(true))
                                }
                            }
                        }
                    }
                }
                return g
            }
        function aA(h, k, f) {
                var g, a = aS(f);
                if (ah.wk && ah.wk < 312) {
                    return g
                }
                if (a) {
                    if (typeof h.id == aq) {
                        h.id = f
                    }
                    if (ah.ie && ah.win) {
                        var j = "";
                        for (var m in h) {
                            if (h[m] != Object.prototype[m]) {
                                if (m.toLowerCase() == "data") {
                                    k.movie = h[m]
                                } else {
                                    if (m.toLowerCase() == "styleclass") {
                                        j += ' class="' + h[m] + '"'
                                    } else {
                                        if (m.toLowerCase() != "classid") {
                                            j += " " + m + '="' + h[m] + '"'
                                        }
                                    }
                                }
                            }
                        }
                        var l = "";
                        for (var n in k) {
                            if (k[n] != Object.prototype[n]) {
                                l += '<param name="' + n + '" value="' + k[n] + '" />'
                            }
                        }
                        a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + j + ">" + l + "</object>";
                        ag[ag.length] = h.id;
                        g = aS(h.id)
                    } else {
                        var b = ar(aD);
                        b.setAttribute("type", aE);
                        for (var o in h) {
                            if (h[o] != Object.prototype[o]) {
                                if (o.toLowerCase() == "styleclass") {
                                    b.setAttribute("class", h[o])
                                } else {
                                    if (o.toLowerCase() != "classid") {
                                        b.setAttribute(o, h[o])
                                    }
                                }
                            }
                        }
                        for (var p in k) {
                            if (k[p] != Object.prototype[p] && p.toLowerCase() != "movie") {
                                aQ(b, p, k[p])
                            }
                        }
                        a.parentNode.replaceChild(b, a);
                        g = b
                    }
                }
                return g
            }
        function aQ(b, g, f) {
                var a = ar("param");
                a.setAttribute("name", g);
                a.setAttribute("value", f);
                b.appendChild(a)
            }
        function aw(a) {
                var b = aS(a);
                if (b && b.nodeName == "OBJECT") {
                    if (ah.ie && ah.win) {
                        b.style.display = "none";
                        (function() {
                            if (b.readyState == 4) {
                                aT(a)
                            } else {
                                setTimeout(arguments.callee, 10)
                            }
                        })()
                    } else {
                        b.parentNode.removeChild(b)
                    }
                }
            }
        function aT(a) {
                var b = aS(a);
                if (b) {
                    for (var f in b) {
                        if (typeof b[f] == "function") {
                            b[f] = null
                        }
                    }
                    b.parentNode.removeChild(b)
                }
            }
        function aS(a) {
                var f = null;
                try {
                    f = aL.getElementById(a)
                } catch (b) {}
                return f
            }
        function ar(a) {
                return aL.createElement(a)
            }
        function aM(a, f, b) {
                a.attachEvent(f, b);
                al[al.length] = [a, f, b]
            }
        function ao(a) {
                var b = ah.pv,
                    f = a.split(".");
                f[0] = parseInt(f[0], 10);
                f[1] = parseInt(f[1], 10) || 0;
                f[2] = parseInt(f[2], 10) || 0;
                return (b[0] > f[0] || (b[0] == f[0] && b[1] > f[1]) || (b[0] == f[0] && b[1] == f[1] && b[2] >= f[2])) ? true : false
            }
        function az(b, j, a, f) {
                if (ah.ie && ah.mac) {
                    return
                }
                var h = aL.getElementsByTagName("head")[0];
                if (!h) {
                    return
                }
                var k = (a && typeof a == "string") ? a : "screen";
                if (f) {
                    aH = null;
                    an = null
                }
                if (!aH || an != k) {
                    var g = ar("style");
                    g.setAttribute("type", "text/css");
                    g.setAttribute("media", k);
                    aH = h.appendChild(g);
                    if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
                        aH = aL.styleSheets[aL.styleSheets.length - 1]
                    }
                    an = k
                }
                if (ah.ie && ah.win) {
                    if (aH && typeof aH.addRule == aD) {
                        aH.addRule(b, j)
                    }
                } else {
                    if (aH && typeof aL.createTextNode != aq) {
                        aH.appendChild(aL.createTextNode(b + " {" + j + "}"))
                    }
                }
            }
        function ay(a, f) {
                if (!aI) {
                    return
                }
                var b = f ? "visible" : "hidden";
                if (ak && aS(a)) {
                    aS(a).style.visibility = b
                } else {
                    az("#" + a, "visibility:" + b)
                }
            }
        function ai(b) {
                var a = /[\\\"<>\.;]/;
                var f = a.exec(b) != null;
                return f && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b
            }
        var aR = function() {
                if (ah.ie && ah.win) {
                    window.attachEvent("onunload", function() {
                        var a = al.length;
                        for (var b = 0; b < a; b++) {
                            al[b][0].detachEvent(al[b][1], al[b][2])
                        }
                        var g = ag.length;
                        for (var f = 0; f < g; f++) {
                            aw(ag[f])
                        }
                        for (var h in ah) {
                            ah[h] = null
                        }
                        ah = null;
                        for (var j in swfobject) {
                            swfobject[j] = null
                        }
                        swfobject = null
                    })
                }
            }();
        return {
                registerObject: function(a, h, f, b) {
                    if (ah.w3 && a && h) {
                        var g = {};
                        g.id = a;
                        g.swfVersion = h;
                        g.expressInstall = f;
                        g.callbackFn = b;
                        aG[aG.length] = g;
                        ay(a, false)
                    } else {
                        if (b) {
                            b({
                                success: false,
                                id: a
                            })
                        }
                    }
                },
                getObjectById: function(a) {
                    if (ah.w3) {
                        return av(a)
                    }
                },
                embedSWF: function(o, h, l, j, f, a, b, m, k, n) {
                    var g = {
                        success: false,
                        id: h
                    };
                    if (ah.w3 && !(ah.wk && ah.wk < 312) && o && h && l && j && f) {
                        ay(h, false);
                        aj(function() {
                            l += "";
                            j += "";
                            var v = {};
                            if (k && typeof k === aD) {
                                for (var s in k) {
                                    v[s] = k[s]
                                }
                            }
                            v.data = o;
                            v.width = l;
                            v.height = j;
                            var r = {};
                            if (m && typeof m === aD) {
                                for (var t in m) {
                                    r[t] = m[t]
                                }
                            }
                            if (b && typeof b === aD) {
                                for (var p in b) {
                                    if (typeof r.flashvars != aq) {
                                        r.flashvars += "&" + p + "=" + b[p]
                                    } else {
                                        r.flashvars = p + "=" + b[p]
                                    }
                                }
                            }
                            if (ao(f)) {
                                var q = aA(v, r, h);
                                if (v.id == h) {
                                    ay(h, true)
                                }
                                g.success = true;
                                g.ref = q
                            } else {
                                if (a && au()) {
                                    v.data = a;
                                    ae(v, r, h, n);
                                    return
                                } else {
                                    ay(h, true)
                                }
                            }
                            if (n) {
                                n(g)
                            }
                        })
                    } else {
                        if (n) {
                            n(g)
                        }
                    }
                },
                switchOffAutoHideShow: function() {
                    aI = false
                },
                ua: ah,
                getFlashPlayerVersion: function() {
                    return {
                        major: ah.pv[0],
                        minor: ah.pv[1],
                        release: ah.pv[2]
                    }
                },
                hasFlashPlayerVersion: ao,
                createSWF: function(a, b, f) {
                    if (ah.w3) {
                        return aA(a, b, f)
                    } else {
                        return undefined
                    }
                },
                showExpressInstall: function(b, a, g, f) {
                    if (ah.w3 && au()) {
                        ae(b, a, g, f)
                    }
                },
                removeSWF: function(a) {
                    if (ah.w3) {
                        aw(a)
                    }
                },
                createCSS: function(b, a, f, g) {
                    if (ah.w3) {
                        az(b, a, f, g)
                    }
                },
                addDomLoadEvent: aj,
                addLoadEvent: aC,
                getQueryParamValue: function(b) {
                    var a = aL.location.search || aL.location.hash;
                    if (a) {
                        if (/\?/.test(a)) {
                            a = a.split("?")[1]
                        }
                        if (b == null) {
                            return ai(a)
                        }
                        var f = a.split("&");
                        for (var g = 0; g < f.length; g++) {
                            if (f[g].substring(0, f[g].indexOf("=")) == b) {
                                return ai(f[g].substring((f[g].indexOf("=") + 1)))
                            }
                        }
                    }
                    return ""
                },
                expressInstallCallback: function() {
                    if (aU) {
                        var a = aS(ac);
                        if (a && aJ) {
                            a.parentNode.replaceChild(aJ, a);
                            if (ad) {
                                ay(ad, true);
                                if (ah.ie && ah.win) {
                                    aJ.style.display = "block"
                                }
                            }
                            if (ap) {
                                ap(at)
                            }
                        }
                        aU = false
                    }
                }
            }
    }();
  //2#
App.iframeMask = function(l, g) {
        var a = {};
        var j = a.oParent = document.getElementsByTagName("body")[0];
        var f = a.oMask = j.appendChild($C("div"));
        var k = a.oProtective = j.appendChild($C("iframe"));
        k.frameborder = 0;
        var h = f.style;
        var b = k.style;
        var b = k.style;
        h.top = b.top = "0px";
        h.left = b.left = "0px";
        h.overflow = b.overflow = "hidden";
        h.border = b.border = "0px";
        h.position = b.position = "absolute";
        h.display = b.display = "none";
        h.backgroundColor = b.backgroundColor = "#000000";
        h.zIndex = l || 799;
        b.zIndex = (l - 1) || 798;
        Core.Dom.setStyle(f, "opacity", "0.15");
        Core.Dom.setStyle(k, "opacity", "0");
        a.oMaskResize = (function(m) {
            return function() {
                var n = Core.System.pageSize();
                m.oMask.style.width = m.oProtective.style.width = Math.max(document.body.scrollWidth, (document.documentElement) ? document.documentElement.scrollWidth : 0) + "px";
                m.oMask.style.height = m.oProtective.style.height = n[1] + "px";
                if (g) {
                    g(n)
                }
            }
        })(a);
        a.hidden = (function(m) {
            return function() {
                m.oMask.style.display = m.oProtective.style.display = "none"
            }
        })(a);
        a.show = (function(m) {
            return function() {
                m.oMask.style.display = m.oProtective.style.display = "block"
            }
        })(a);
        a.oMaskResize();
        Core.Events.addEvent(window, a.oMaskResize, "resize");
        return a
    };
App.PopUpSwfPlayer = (function() {
        var f, b, a, g, k = Core.Events,
            j = k.addEvent,
            h = k.removeEvent;
        return function(l) {
                var m = "view_ani",
                    s = window,
                    q = document,
                    t = q.documentElement || {},
                    r = q.body;
                if (scope.statistics) {
                        scope.statistics({
                            type: "ani",
                            source: encodeURIComponent(l)
                        })
                    }
                if (!swfobject.hasFlashPlayerVersion("9.0.0")) {
                        App.alert({
                            code: "CD0084"
                        });
                        return
                    }
                if (!b) {
                        document.body.appendChild(b = $C("div"));
                        b.style.position = "absolute";
                        b.style.zIndex = "2012"
                    }
                b.style.display = "";
                if (!a) {
                        b.innerHTML = "";
                        b.appendChild(a = $C("div"));
                        a.id = m;
                        a.innerHTML = ['<div style="padding-left:202px;padding-top:172px;"><center><img src="', [scope.$BASECSS, "style/images/common/loading.gif"].join(""), '"/></center></div>'].join("")
                    }
                var n = function(w) {
                        var x = s.pageYOffset || Math.max(t.scrollTop, r.scrollTop);
                        b.style.left = (w[2] - 440) / 2 + "px";
                        b.style.top = ((w[3] - 360) / 2 + x) + "px"
                    };
                if (!f) {
                        f = App.iframeMask(2000, n)
                    } else {
                        n(Core.System.pageSize())
                    }
                var v = {
                        id: "view_ani",
                        quality: "high",
                        allowScriptAccess: "never",
                        wmode: "transparent",
                        allowFullscreen: true,
                        allownetworking: "internal"
                    };
                var p = {
                        playMovie: "true"
                    };
                var o = function(w) {
                        if (w && w.keyCode !== 27 && w.type !== "mouseup") {
                            return
                        }
                        clearInterval(g);
                        swfobject.removeSWF(m);
                        b.style.display = "none";
                        a = null;
                        f.hidden();
                        h(r, o, "keyup");
                        h(r, o, "mouseup");
                        if (!w) {
                            return
                        }
                        Core.Events.stopEvent()
                    };
                swfobject.embedSWF(l, m, "440", "360", "10.0.0", null, p, v);
                f.show();
                s.clearInterval(g);
                g = setInterval(function() {
                        var x = swfobject.getObjectById(m),
                            w = 0;
                        if (x && x.PercentLoaded() == 100) {
                                s.clearInterval(g);
                                g = setInterval(function() {
                                    var A = x.CurrentFrame(),
                                        y;
                                    try {
                                            y = x.TotalFrames()
                                        } catch (z) {
                                            y = x.TotalFrames
                                        }
                                    if (A < 0) {
                                            return
                                        }
                                    if (A < y && w <= A) {
                                            w = A
                                        } else {
                                            o()
                                        }
                                }, 80)
                            }
                    }, 100);
                j(r, o, "keyup");
                j(f.oMask, o, "mouseup");
                f.oMask.title = $CLTMSG.CF0105
            }
    })();
App.group = function(h, a, j) {
        var b = {},
            f = 0,
            g = h.length,
            k, l, m = Core.Events.addEvent;
        b.current = -1;
        b.items = h;
        b.selected;
        k = j && j.selected || null;
        l = j && j.unselected || null;
        for (f; f < g; f++) {
                (function(o, n) {
                    m(o, function(p) {
                        if (b.current == n && j) {
                            return
                        }
                        l && (b.current != -1) && (h[b.current].className = l);
                        k && (o.className = k);
                        b.current = n;
                        a(o, n, b);
                        return false
                    }, "mouseup")
                })(h[f], f)
            }
    };
    (function() {
        var n = document,
            k = "/face/get_face.php",
            b = Core.Events,
            l = Core.String,
            t = b.stopEvent,
            s = b.addEvent,
            a = b.removeEvent,
            f = b.fireEvent,
            q = App.simpleAjax,
            j = Core.Dom.getXY,
            r = App.group,
            m = App.removeChildren,
            g = App.PopUp,
            p;

        function o(w, v) {
                return App.builder3(w, v, {
                    dd: "id",
                    mm: "action"
                })
            }
        function h(v) {
                return v.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g, "")
            }
        App.showFaces = (function() {
                var y = {},
                    B, w, v = false,
                    A = false,
                    z, x = {
                        selected: "cur",
                        unselected: " "
                    };
                splitHTML = '<li class="magiclicur" style="visibility:hidden">|</li>',
                panelHTML = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox phiz_layerN"><div class="layerBoxTop"><div class="layerArrow" style="left:6px;"></div><div class="topCon"><ul class="phiz_menu"><li id="face" class="cur"><a href="#" onclick="this.blur();return false;">' + $CLTMSG.CL0901 + '</a></li><li id="ani" act="topTab" class="magic"><a href="#" onclick="this.blur();return false;"><strong></strong>' + $CLTMSG.CL0902 + '</a></li></ul><a id="close" href="#" onclick="return false;" title="' + $CLTMSG.CL0701 + '" class="close"></a><div class="clearit"></div></div></div><div class="magicT"><div class="magicTL"><ul id="tab"></ul></div><div class="magicTR"><a href="#" onclick="return false;" id="prevBtn" class="magicbtnL02" title="' + $CLTMSG.CX0076 + '"></a><a href="#" onclick="return false;" id="nextBtn" title="' + $CLTMSG.CX0077 + '" class="magicbtnR02"></a></div><div class="clear"></div></div><div class="layerBoxCon" style="width:450px;"><div id="hotPanel" class="faceItemPicbgT"><ul id="hot"></ul><div class="clearit"></div></div><div id="normPanel" class="faceItemPicbg"><ul id="norm"></ul><div class="clearit"></div></div><div id="pagePanel" class="magicB"><div id="magicNotes" class="magic_tit" style="display:none">' + $CLTMSG.CL0904 + '</div><div class="pages" id="pageing"></div></div></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>';
                return function(Z, E, Y, W, O, P, J) {
                        if (Z.tagName == "A") {
                            Z.href = "####"
                        }
                        z = J ||
                        function() {
                            return false
                        };
                        if (!v) {
                            w = g().zIndex(1500).content(panelHTML);
                            var V = w.dom,
                                N = V.close,
                                X = V.hot,
                                U = V.hotPanel,
                                G = V.magicNotes,
                                H = V.norm,
                                C = V.normPanel,
                                M = V.pageing,
                                I = V.prevBtn,
                                T = V.nextBtn,
                                D = V.tab;
                            face = V.face,
                            ani = V.ani,
                            cType = 1,
                            tabIndex = 0;

                            function K(ac, aj) {
                                    m(aj);
                                    var ad = 0,
                                        ae = ac.length,
                                        ab = [],
                                        ah, ak, al, aa, ag = "",
                                        ai = "",
                                        af;
                                    for (ad; ad < ae; ad++) {
                                            ah = ac[ad];
                                            af = h(ah.title);
                                            cType == 1 && (ag = 'class="face_box"');
                                            cType == 1 && (ai = ('<a action="play" title="' + $CLTMSG.CL0912 + '" class="play_btn" href="#" onclick="return false;"></a><span class="face_box_tex">' + (l.byteLength(af) > 8 ? l.leftB(af, 6) + "..." : af) + "</span>"));
                                            ab.push(['<li action="icon" title="', af, '"><a href="#" onclick="return false;" ', ag, ">", '<img src="', ah.icon, '"/>', "</a>", ai, "</li>"].join(""))
                                        }
                                    ak = o(ab.join(""), aj)["actList"];
                                    al = ak.icon;
                                    aa = ak.play;
                                    if (aa) {
                                            r(aa, function(an, am, ao) {
                                                an.onclick = function() {
                                                    return false
                                                };
                                                t();
                                                App.PopUpSwfPlayer(ac[am].src);
                                                return false
                                            })
                                        }
                                    r(al, function(an, am, ao) {
                                            an.onclick = function() {
                                                return false
                                            };
                                            setTimeout(function() {
                                                tArea.focus()
                                            }, 0);
                                            setTimeout(function() {
                                                var av = tArea.getAttribute("range");
                                                var ax = ac[am].value + " ";
                                                if (z(ax)) {} else {
                                                    if (document.selection) {
                                                        var aq = document.selection.createRange();
                                                        document.selection.empty();
                                                        aq.text = ax
                                                    } else {
                                                        if (tArea.setSelectionRange) {
                                                            var ap = tArea.selectionStart;
                                                            var ar = tArea.selectionEnd;
                                                            var au = tArea.value.substring(0, ap);
                                                            var at = tArea.value.substring(ar);
                                                            var ay = au + ax,
                                                                aw = ay.length;
                                                            tArea.value = ay + at;
                                                            tArea.setSelectionRange(aw, aw)
                                                        } else {
                                                            tArea.value += ax
                                                        }
                                                    }
                                                }
                                                if (reflush) {
                                                    reflush()
                                                }
                                                w.visible(false)
                                            }, 200);
                                            return false
                                        })
                                }
                            function F(ae) {
                                    m(M);
                                    var ad = 0,
                                        ab = ae.length,
                                        ac = [],
                                        aa;
                                    if (!ab) {
                                            return
                                        }
                                    for (ad; ad < ab; ad++) {
                                            ac.push('<a action="pageBtn" href="#" onclick="return false;">' + (ad + 1) + "</a>")
                                        }
                                    aa = o(ac.join(""), M)["actList"]["pageBtn"];
                                    r(aa, function(ag, af) {
                                            ag.onclick = function() {
                                                return false
                                            };
                                            U.style.display = (!cType && !tabIndex && !af) ? "" : "none";
                                            setTimeout(function() {
                                                K(ae[af], H)
                                            }, 50);
                                            ag.blur()
                                        }, x);
                                    M.style.display = aa.length < 2 ? "none" : "";
                                    f(aa[0], "mouseup")
                                }
                            function R(ao) {
                                    m(D);
                                    var ah = [{
                                        type: $CLTMSG.CL0914,
                                        icon: ao.data.norm}].concat(ao.data.more);
                                    var ai = 0,
                                        al = ah.length,
                                        am, ab = [],
                                        an;
                                    for (ai; ai < al; ai++) {
                                            am = ah[ai];
                                            if (!am || !am.type) {
                                                continue
                                            }
                                            ab.push('<li style="visibility:hidden"><a action="tabs" onclick="return false;" href="#">' + am.type + "</a></li>")
                                        }
                                    if (!ab.length) {
                                            return
                                        }
                                    an = o(ab.join(splitHTML), D)["actList"]["tabs"];
                                    r(an, function(aq, ap) {
                                            aq.onclick = function() {
                                                return false
                                            };
                                            tabIndex = ap;
                                            F(ah[ap].icon);
                                            aq.blur()
                                        }, {
                                            selected: "magicTcur",
                                            unselected: " "
                                        });
                                    f(an[0], "mouseup");
                                    var aj = 1,
                                        ak = 0,
                                        ad = D.getElementsByTagName("li"),
                                        ag = ad.length,
                                        ae = [],
                                        ac = 0,
                                        aa = [],
                                        af;
                                    setTimeout(function() {
                                            for (ak; ak < ag; ak++) {
                                                ad[ak].style.visibility = "visible";
                                                ad[ak].style.display = "";
                                                var ar = ad[ak].innerHTML == "|" ? 8 : ad[ak].offsetWidth;
                                                if (ac + ar > 400) {
                                                    ac = 0;
                                                    ae.push(aa);
                                                    aa = []
                                                }
                                                ad[ak].style.display = "none";
                                                aa.push(ad[ak]);
                                                ac += ar
                                            }
                                            aa.length && ae.push(aa);
                                            af = ae.length - 1;

                                            function aq() {
                                                I.className = aj == 0 ? "magicbtnL01" : "magicbtnL02";
                                                T.className = aj == af ? "magicbtnR01" : "magicbtnR02"
                                            }
                                            function ap(aw, au) {
                                                var av = 0;
                                                al = aw.length,
                                                end = Math.max(al - 1, 0);
                                                for (av; av < al; av++) {
                                                    aw[av].style.visibility = au ? "visible" : "hidden";
                                                    aw[av].style.display = !au ? "none" : ((av == 0 || av == end) && aw[av].innerHTML == "|") ? "none" : ""
                                                }
                                            }
                                            function at(av, aw) {
                                                var au = Math[av](aj + aw, aw > 0 ? af : 0);
                                                if (aj == au) {
                                                    aq();
                                                    return
                                                }
                                                ae[aj] && ap(ae[aj], false);
                                                ae[au] && ap(ae[au], true);
                                                aj = au;
                                                aq()
                                            }
                                            I.onclick = function() {
                                                at("max", -1);
                                                I.blur();
                                                return false
                                            };
                                            T.onclick = function() {
                                                at("min", 1);
                                                T.blur();
                                                return false
                                            };
                                            at("max", -1)
                                        }, 100)
                                }
                            function S(ab, aa, ac) {
                                    t();
                                    ab.onclick = function() {
                                        return false
                                    };
                                    m(H);
                                    m(D);
                                    m(M);
                                    face.className = aa ? "" : "cur";
                                    ani.className = aa ? "magic cur" : "magic";
                                    C.className = aa ? "magic_list" : "faceItemPicbg";
                                    U.style.display = aa ? "none" : "";
                                    G.style.display = aa ? "" : "none";
                                    M.style.display = "none";
                                    I.className = "magicbtnL01";
                                    T.className = "magicbtnR01";
                                    I.onclick = function() {
                                        return false
                                    };
                                    T.onclick = function() {
                                        return false
                                    };
                                    cType = aa;
                                    p && p.abort();
                                    if (y[aa]) {
                                        R(y[aa]);
                                        return false
                                    }
                                    H.innerHTML = '<center><img style="margin-top:10px;margin-bottom:10px" src="' + scope.$BASEIMG + 'style/images/common/loading.gif"/></center>';
                                    p = q([k, "?type=", aa ? "ani" : "face"].join(""), function(ad) {
                                        var ae;
                                        if (ad.code == "A00006" && (ae = ad.data)) {
                                            R(ad);
                                            if (!A && ae.hot) {
                                                A = true;
                                                K(ae.hot, X)
                                            }
                                            y[aa] = ad
                                        }
                                    });
                                    ab.blur();
                                    return false
                                }
                            r([face, ani], S);
                            v = true;
                            s(N, function() {
                                    N.onclick = function() {
                                        return false
                                    };
                                    w.visible(false);
                                    t()
                                }, "mouseup");
                            s(w.wrap, function() {
                                    t()
                                }, "mouseup");
                            s(n.body, function() {
                                    w.visible(false)
                                }, "mouseup");
                            var L = Core.System.winSize();
                            s(window, function(ab) {
                                    var aa = Core.System.winSize();
                                    if (L.width != aa.width || L.height != aa.height) {
                                        w.visible(false);
                                        L = aa
                                    }
                                }, "resize")
                        }
                        tArea = E;
                        reflush = P;
                        var Q = j(Z);
                        w.position(Q[0] + 19 + (Y || 0), Q[1] + Z.offsetHeight + (W || 5));
                        f(face, "mouseup");
                        setTimeout(function() {
                            w.visible(true)
                        }, 0);
                        return false
                    }
            })()
    })();
    (function(l) {
        $C = function(n) {
            return document.createElement(n)
        };
        var b = Core.Events.addEvent;
        var m = Core.Events.stopEvent;
        var a = Core.Events.removeEvent;
        var h = Core.Dom.getXY;
        var k = function(n) {
            if (n === undefined) {
                throw "the dropDown item need parameters"
            }
            n.text = n.text || n.value;
            n.ele = n.ele || $C("LI");
            n.focus = n.focus ||
            function() {};
            n.blur = n.blur ||
            function() {};
            n.ok = n.ok ||
            function() {};
            n.tnode = document.createTextNode("");
            n.ele.appendChild(n.tnode);
            n.ele.setAttribute("unselectable", "on");
            if (n.itemStyle) {
                n.ele.style.cssText = n.itemStyle
            }
            b(n.ele, function() {
                n.focus(o)
            }, "mouseover");
            b(n.ele, function() {
                n.blur(o)
            }, "mouseout");
            b(n.ele, function() {
                m();
                n.ok(o)
            }, "click");
            b(n.ele, m, "mousedown");
            var o = {};
            o.set = function(p, q) {
                if ((p == "focus" || p == "ok") && typeof q != "function") {
                    throw "dropDown item need function as parameters"
                }
                n[p] = q;
                if (p == "text") {
                    n.ele.innerHTML = q
                }
                if (p == "HTML") {
                    n.ele.innerHTML = q
                }
                return o
            };
            o.get = function(p) {
                return n[p]
            };
            return o
        };
        var g = function(o) {
            var q = {};
            if (o === undefined) {
                o = {}
            }
            o.items = [];
            o.count = 0;
            o.current = -1;
            o.key = {
                ENTER: 13,
                ESC: 27,
                UP: 38,
                DOWN: 40,
                LEFT: 37,
                RIGHT: 39,
                BACK: 8,
                TABLE: 9
            };
            o.box = $C("DIV");
            o.shell = $C("UL");
            o.showing = false;
            o.box.appendChild(o.shell);
            document.body.appendChild(o.box);
            var n = function(r) {
                r = r || o.items[o.current];
                o.light(r.get("ele"))
            };
            var p = function(r) {
                r = r || o.items[o.current];
                if (r) {
                    o.dark(r.get("ele"))
                }
            };
            o.newItem = function() {
                var r = k({
                    ok: o.select,
                    focus: function(s) {
                        if (o.items[o.current]) {
                            p()
                        }
                        o.current = s.index;
                        n()
                    },
                    itemStyle: o.itemStyle
                });
                o.shell.appendChild(r.get("ele"));
                return r
            };
            o.getItem = function(r) {
                if (!o.items[r]) {
                    o.items[r] = o.newItem();
                    o.items[r].index = r
                }
                return o.items[r]
            };
            o.up = function() {
                if (o.current >= o.count || o.current <= 0) {
                    p(o.items[0]);
                    o.current = o.count - 1
                } else {
                    p();
                    o.current -= 1
                }
                n()
            };
            o.down = function() {
                if (o.current >= o.count - 1 || o.current < 0) {
                    p(o.items[o.count - 1]);
                    o.current = 0
                } else {
                    p();
                    o.current += 1
                }
                n()
            };
            o.open = function() {
                o.box.style.display = "";
                b(document.documentElement, o.hotKey, "keydown");
                o.showing = true
            };
            o.close = function() {
                o.box.style.display = "none";
                if ($E("_iframe4select_")) {
                    $E("_iframe4select_").style.display = "none"
                }
                a(document.documentElement, o.hotKey, "keydown");
                o.showing = false
            };
            o.hotKey = function(t) {
                var s = window.event || t;
                var r = s.keyCode;
                if (r == o.key.UP) {
                    o.up();
                    m();
                    return false
                } else {
                    if (r == o.key.DOWN) {
                        o.down();
                        m();
                        return false
                    } else {
                        if (r == o.key.ESC) {
                            o.close();
                            m();
                            return false
                        }
                    }
                }
            };
            q.show = function(r) {
                o.open();
                return q
            };
            q.hidd = function(r) {
                o.close();
                if (o.current !== -1) {
                    p()
                }
                o.current = -1;
                return q
            };
            q.light = function(r) {
                n(o.items[r]);
                return q
            };
            q.dark = function(r) {
                p(o.items[r]);
                return q
            };
            q.data = function(t) {
                for (var s = 0, r = t.length; s < r; s += 1) {
                    o.getItem(s).set("text", t[s]["text"]).set("value", t[s]["value"]).get("ele").style.display = ""
                }
                for (var s = t.length, r = o.items.length; s < r; s += 1) {
                    o.getItem(s).get("ele").style.display = "none"
                }
                o.count = t.length;
                p();
                o.current = -1;
                return q
            };
            q.pushData = function(t) {
                for (var s = 0, r = t.length; s < r; s += 1) {
                    o.getItem(o.count + s).set("text", t[s]["text"]).set("value", t[s]["value"])
                }
                o.count += t.length;
                return q
            };
            q.set = function(r, s) {
                if (r === "position") {
                    o.box.style.left = s[0] + "px";
                    o.box.style.top = s[1] + "px"
                }
                return q
            };
            q.get = function(r) {
                if (r === "current") {
                    return o.items[o.current]
                }
                if (r === "index") {
                    return o.current
                }
                return o[r]
            };
            return q
        };
        var j = function(n) {
            var o = {};
            n.box = document.createElement("DIV");
            n.box.innerHTML = n.info;
            if (n.style) {
                n.box.style.cssText = n.style
            }
            if (n.className) {
                n.box.className = n.className
            }
            n.box.style.position = "absolute";
            n.box.style.display = "none";
            document.body.appendChild(n.box);
            o.show = function() {
                n.box.style.display = ""
            };
            o.hidd = function() {
                n.box.style.display = "none"
            };
            o.set = function(p, q) {
                if (p === "position") {
                    n.box.style.left = q[0] + "px";
                    n.box.style.top = q[1] + "px"
                }
                return o
            };
            o.get = function(p) {
                return n[p]
            };
            return o
        };
        var f = function(o) {
            var p = {};
            var n = function(v, r) {
                if (o.data.length === 0 || !v) {
                    setTimeout(function() {
                        r([])
                    }, 0)
                } else {
                    var t = [];
                    for (var s = 0, q = o.data.length; s < q; s += 1) {
                        if (o.data[s].value.indexOf(v) != -1) {
                            t[t.length] = o.data[s]
                        }
                    }
                    setTimeout(function() {
                        r(t)
                    }, 0)
                }
            };
            ajax = function(r, q, t) {
                var s = t ? {
                    key: r,
                    schooltype: t
                } : {
                    key: r
                };
                Utils.Io.Ajax.request(o.data, {
                    GET: s,
                    onComplete: function(v) {
                        if (v.code === "A00006") {
                            if (typeof o.search === "function") {
                                v.data = o.search(v.data)
                            }
                            q(v.data)
                        }
                    },
                    returnType: "json"
                })
            };
            jsonp = function() {};
            if (o.type === "ajax") {
                n = ajax
            } else {
                if (o.type === "jsonp") {
                    n = jsonp
                } else {
                    if (typeof o.search === "function") {
                        n = o.search
                    }
                }
            }
            p.result = function(r, q, s) {
                n(r, q, s)
            };
            p.set = function(q, r) {
                o[q] = r;
                return p
            };
            return p
        };
        l.autoComplate = function(A) {
            if (!A.input) {
                throw "the autoComplate need an input as an parameter"
            }
            A.searchCb = A.searchCb ||
            function() {};
            var o = null;
            var B = f({
                type: A.type,
                data: A.data,
                search: A.search
            });
            var w = g({
                select: function(C) {
                    A.ok(C.get("value"), C.get("text"));
                    A.input.blur()
                },
                itemStyle: A.itemStyle,
                light: A.light,
                dark: A.dark
            });
            if (A.emptyInfo) {
                var r = j({
                    info: A.emptyInfo,
                    style: A.emptyStyle,
                    className: A.emptyClass
                })
            }
            var y = w.get("box");
            y.className = A["class"];
            y.style.cssText = A.style;
            w.hidd();
            b(window, function() {
                if (y.style.display !== "none") {
                    A.input.blur();
                    w.hidd()
                }
            }, "resize");
            if ("v" == "\v") {
                var q = $C("IFRAME");
                q.id = "_iframe4select_";
                q.style.zIndex = A.zIndex || 50;
                q.style.display = "none";
                q.style.position = "absolute";
                document.body.appendChild(q)
            }
            var n = {};
            A.formatKey = A.formatKey ||
            function(C) {
                return C
            };
            var t = function(D, C) {
                D = A.formatKey(D);
                if (!n[D]) {
                    B.result(D, function(E) {
                        if (E.length === 0) {
                            if (D.indexOf(A.emptkey) !== -1) {
                                A.emptykey = D
                            }
                        }
                        C(E);
                        n[D] = E
                    }, A.schooltype)
                } else {
                    setTimeout(function() {
                        C(n[D])
                    }, 0)
                }
            };
            b(A.input, function(D) {
                var C = window.event || D;
                if (C.keyCode === 13) {
                    if (w.get("current")) {
                        A.ok(w.get("current").get("value"), w.get("current").get("text"));
                        m(C)
                    }
                    if (!A.noBlur) {
                        A.input.blur()
                    }
                }
            }, "keypress");
            var p = function() {
                o = setInterval(v, 100 * A.timer);
                A.searching = "";
                A.emptykey = "";
                var C = h(A.input);
                C[1] += A.input.offsetHeight;
                if (r) {
                    r.set("position", C).show()
                }
            };
            var s = function() {
                clearInterval(o);
                w.hidd();
                A.searching = "";
                A.emptykey = "";
                if ("v" == "\v") {
                    q.style.display = "none"
                }
                if (r) {
                    r.hidd()
                }
            };
            var z = function(D) {
                A.searchCb(D);
                w.data(D);
                if (D.length) {
                    if (!w.get("showing")) {
                        w.show()
                    }
                    if ("v" == "\v") {
                        q.style.width = y.offsetWidth + "px";
                        q.style.height = y.offsetHeight + "px";
                        var C = h(y);
                        q.style.top = C[1] + "px";
                        q.style.left = C[0] + "px";
                        q.style.display = ""
                    }
                } else {
                    w.hidd();
                    if ("v" == "\v") {
                        q.style.display = "none"
                    }
                }
            };
            var v = function() {
                if (A.input.value === A.searching) {
                    return false
                }
                if (A.input.value.indexOf(A.emptykey) !== -1 && A.emptykey !== "") {
                    return false
                }
                A.searching = A.input.value;
                var C = h(A.input);
                C[1] += A.input.offsetHeight;
                w.set("position", C);
                if (A.input.value === "") {
                    setTimeout(function() {
                        z([])
                    }, 0);
                    if (r) {
                        r.set("position", C).show()
                    }
                } else {
                    t(A.input.value, z);
                    if (r) {
                        r.hidd()
                    }
                }
            };
            b(A.input, p, "focus");
            b(A.input, s, "blur");
            A.searching = "";
            A.emptykey = "";
            var x = {};
            x.get = function(C) {
                if (C === "index") {
                    return w.get("index")
                }
                return A[C]
            };
            x.set = function(C, D) {
                if (C === "data") {
                    B.set("data", D);
                    n = {}
                }
            };
            x.end = function() {
                s();
                return x
            };
            return x
        }
    })(App);
App.fansfind = function(a) {
        a.ok = function(g, h) {
            h = h.replace(/\(.*\)/g, "");
            if (a.input.value && /,|;|\uFF0C|\uFF1B|\u3001|\s/.test(a.input.value)) {
                var b = a.input.value.split(/,|;|\uFF0C|\uFF1B|\u3001|\s/);
                var f = a.input.value.substring(0, a.input.value.length - b[b.length - 1].length);
                a.input.value = f + h + " "
            } else {
                a.input.value = h
            }
            if (a.select && typeof a.select == "function") {
                a.select(g, h)
            }
        };
        a.timer = a.timer || 5;
        a.style = a.style || "width:" + a.input.clientWidth + "px;position:absolute;z-Index:1200;";
        a.light = a.light ||
        function(b) {
            b.className = "cur"
        };
        a.dark = a.dark ||
        function(b) {
            b.className = ""
        };
        a["class"] = a["class"] || "layerMedia_menu";
        a.type = a.type || "ajax";
        a.data = a.data || "/attention/aj_chooser.php?key=" + a.input.value + "&type=" + a.searchtype;
        a.itemStyle = "overflow:hidden;height:20px";
        return App.autoComplate(a)
    };
App.msgDialog = function(a, k) {
        var h = function() {
            var n = Core.Events.getEvent();
            var m = n.srcElement || n.target;
            while (m.nodeType != 1) {
                m = m.parentNode
            }
            return m
        };
        var b = h();
        var g = '<table class="noteTab2"><tbody>	<tr>	<th>' + $CLTMSG.CD0050 + '&nbsp;</th><td><input  id="popUpNick" type="text"  class="PY_input" value="' + (a || "") + '"/>&nbsp;&nbsp;</td></tr>	<tr class="tPadding" ><th>' + $CLTMSG.CD0051 + '&nbsp;</th><td><textarea id="popUpEditor" class="PY_input"></textarea></td>	</tr>	 <tr class="tPadding1"><th></th><td><a class="faceicon1" id="insert_face_icon" href="javascript:void(0);" title="表情"></a></td></tr>	<tr><th/><td><a id="popUpSubmit" href="javascript:void(0);" class="btn_normal" ><em>' + $CLTMSG.CD0052 + '</em></a>	<span id="popUpError" style="display:none" class="errorTs2 error_color">' + $SYSMSG.M01112 + '</span></td></tr>	<tr><td></td><td><p class="inviteLayer_tip gray9">' + $CLTMSG.CD0053 + "</p></td></tr> 	</tbody></table>";
        var l = {
            width: 430,
            zIndex: 1000,
            hidden: true
        };
        var j = new App.Dialog.BasicDialog($CLTMSG.CD0054, g, l);
        Core.Events.addEvent($E("insert_face_icon"), function(n) {
            var m = n.srcElement || n.target;
            App.showFaces(m, $E("popUpEditor"), -30, 0, "360px")
        }, "click");
        App.fansfind({
            input: $E("popUpNick"),
            searchtype: 1
        });
        if (b) {
            App.doFlyOut(b, j._node, {
                resFun: function() {
                    try {
                        j.show()
                    } catch (m) {}
                },
                style: "border:#000 2px solid;background:#bad;opacity:0.2;filter:alpha(opacity=20);zoom:1",
                time: 0.75
            })
        } else {
            j.show()
        }
        var f = {
            submit: $E("popUpSubmit"),
            editor: $E("popUpEditor"),
            info: $E("popUpError"),
            nick: $E("popUpNick")
        };
        App.msgPublisher(f, null, k, function() {
            j.close()
        });
        App.CustomEvent.fire("window", "cardCache");
        return j
    };
$registJob("login", function() {
        var j = $E("login_submit_btn");
        var f = $E("loginname");
        var m = $E("password");
        var k = $E("remusrname");
        var h = $E("login_form");
        if (!k) {
            k = {
                checked: true
            }
        }
        App.initLoginInput(f);
        if (Utils.Cookie.getCookie("un")) {
            var b = $C("A");
            var l = f.parentNode;
            var a = false;
            b.onclick = function() {
                f.value = "";
                Utils.Cookie.setCookie("un", "", 0, "/", "weibo.com");
                Utils.Cookie.deleteCookie("un");
                App.__no_login_name__ = true;
                l.removeChild(b);
                a = true;
                return false
            };
            b.innerHTML = '<img class="lgicon_del" title="#{title}" src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif">'.replace(/#\{title\}/, $CLTMSG.CD0185);
            b.onmouseover = function() {
                this.style.cursor = "pointer"
            };
            l.appendChild(b);
            Core.Events.addEvent(f, function() {
                !a && l.removeChild(b);
                a = true
            }, "focus")
        }
        var n = {
            zIndex: 1010,
            ref: f,
            offsetY: 1,
            offsetX: 1
        };

        function g(o, p) {
            if (!Core.String.trim(o.value) || (o.value == o.title && o.title)) {
                o.style.display !== "none" && o.focus();
                App.fixElement.setHTML(p, "", n);
                return false
            } else {
                App.fixElement.hidden()
            }
            return true
        }
        Core.Events.addEvent(j, function(o) {
            if (!g(f, App.getMsg({
                code: "M00901"
            }))) {
                return false
            }
            if (!g(m, App.getMsg({
                code: "M00902"
            }))) {
                return false
            } else {
                App.LoginAction({
                    name: f.value,
                    pwd: m.value,
                    remb: k.checked,
                    error: function(q, p) {
                        var r = "";
                        if (p == "4010") {
                            q = App.getMsg({
                                code: "R01011"
                            });
                            r = App.getMsg("R01010", {
                                mail: f.value
                            })
                        } else {
                            if (p == "101" || p == "5") {
                                r = App.getMsg({
                                    code: "R11111"
                                })
                            }
                        }
                        App.fixElement.setHTML(q, r, n)
                    },
                    succ: function() {
                        var p = scope.redirect ? decodeURIComponent(Core.String.trim(scope.redirect)) : "http://weibo.com/";
                        location.replace(p)
                    }
                })
            }
            Core.Events.stopEvent(o)
        }, "click");
        if (h) {
            App.enterSubmit({
                parent: $E("password").parentNode,
                action: function() {
                    Core.Events.fireEvent("login_submit_btn", "click")
                }
            })
        }
        passcardOBJ.init(f, {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        }, m, parent);
        if (Core.String.trim(f.value) != "" && Core.String.trim(m.value) != "") {
            setTimeout(function() {
                Core.Events.fireEvent(j, "click")
            }, 100)
        }
        if (scope.isActiveBack === true) {
            App.fixElement.setHTML($CLTMSG.CY0115, "", n);
            $E("mod_login_title").className = "";
            $E("mod_login_title").style.color = "#f00";
            $E("mod_login_title").style.fontWeight = "bold"
        }
    });
$registJob("login1", function() {
        var j = $E("login_submit_btn1");
        var k = $E("loginname1");
        var g = $E("password1");
        var h = $E("remusrname1");
        var b = $E("login_form1");
        if (!h) {
            h = {
                checked: true
            }
        }
        App.initLoginInput(k, "CR0001");
        var f = {
            zIndex: 1010,
            ref: k,
            offsetY: 1,
            offsetX: 1
        };

        function a(l, m) {
            if (!Core.String.trim(l.value) || (l.value == l.title && l.title)) {
                l.style.display !== "none" && l.focus();
                App.fixElement.setHTML(m, "", f);
                return false
            } else {
                App.fixElement.hidden()
            }
            return true
        }
        Core.Events.addEvent(j, function(l) {
            if (!a(k, App.getMsg({
                code: "M00901"
            }))) {
                return false
            }
            if (!a(g, App.getMsg({
                code: "M00902"
            }))) {
                return false
            } else {
                App.LoginAction({
                    name: k.value,
                    pwd: g.value,
                    remb: h.checked,
                    error: function(n, m) {
                        var o = "";
                        if (m == "4010") {
                            n = App.getMsg({
                                code: "R01011"
                            });
                            o = App.getMsg("R01010", {
                                mail: k.value
                            })
                        } else {
                            if (m == "101" || m == "5") {
                                o = App.getMsg({
                                    code: "R11111"
                                })
                            }
                        }
                        App.fixElement.setHTML(n, o, f)
                    },
                    succ: function() {
                        var m = scope.redirect ? Core.String.trim(scope.redirect) : "http://weibo.com/";
                        location.replace(m)
                    }
                })
            }
            Core.Events.stopEvent(l)
        }, "click");
        if (b) {
            App.enterSubmit({
                parent: g.parentNode,
                action: function() {
                    Core.Events.fireEvent("login_submit_btn1", "click")
                }
            })
        }
        passcardOBJ.init(k, {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        }, g, parent)
    });
    (function() {
        App.getMsg = function(msgCode, replace) {
            if (msgCode === undefined) {
                return ""
            }
            if (typeof(msgCode) == "object") {
                msgCode = msgCode.code
            }
            var msg = $SYSMSG[msgCode] || $CLTMSG[msgCode] || ("Error[" + msgCode + "]");
            if (replace) {
                var tmp = new Utils.Template(msg);
                return tmp.evaluate(replace)
            } else {
                return msg
            }
        };

        function setMask(z, hidden) {
            var _mask1 = document.getElementsByTagName("BODY")[0].appendChild($C($IE ? "iframe" : "div"));
            var $w = window,
                $d = $w.document,
                $e = $d.documentElement || {};
            with(_mask1.style) {
                    position = "absolute";
                    backgroundColor = "#000";
                    width = "100%";
                    zIndex = parseInt(z) - 1;
                    top = "0px";
                    left = "0px"
                }
            Core.Dom.opacity(_mask1, 15);
            _mask1.style.height = Math.max($e.clientHeight, $e.scrollHeight, $e.offsetHeight, $d.body.scrollHeight, $d.body.offsetHeight) + "px";
            return _mask1
        }
        function setMiddle(_node) {
            var ow = _node.offsetWidth;
            var oh = _node.offsetHeight;
            var win_s = Core.System.winSize();
            var scroll_pos = Core.System.getScrollPos();
            var tx = (win_s.width - ow) / 2;
            var ty = scroll_pos[0] + (win_s.height - oh) / 2;
            _node.style.left = tx + "px";
            _node.style.top = (ty < 20 ? 20 : ty) + "px"
        }
        function iniRegForm(rnd) {
            var _box = $E("mod_reg_information_box" + rnd);
            var _submit = $E("mod_reg_submit" + rnd);
            var _username = $E("mod_reg_username" + rnd);
            var _password = $E("mod_reg_password" + rnd);
            var _password2 = $E("mod_reg_password2" + rnd);
            var _door = $E("mod_reg_door" + rnd);
            var _after = $E("mod_reg_after" + rnd);
            var _red_username = $E("mod_red_reg_username" + rnd);
            var _red_password = $E("mod_red_reg_password" + rnd);
            var _red_password2 = $E("mod_red_reg_password2" + rnd);
            var _red_door = $E("mod_red_reg_door" + rnd);
            var _red_after = $E("mod_red_reg_after" + rnd);
            var _addEvent = Core.Events.addEvent;
            var _trim = Core.String.trim;
            var _html2json = App.htmlToJson;
            var _compjson = App.compareJson;
            var _checkMail = App.checkEml;
            var _alert = App.alert;
            var _removeEvent = Core.Events.removeEvent;
            var _oData = _html2json(_box);
            var popWin = null;
            var success = function(json) {};
            var error = function(json) {
                if (json) {
                    if (!App.modCheckInfo.showError([json.code])) {
                        _alert($SYSMSG[json.code])
                    }
                } else {
                    _alert($SYSMSG[json.code])
                }
            };
            var errorInput = function(input, red, code) {
                red.innerHTML = $SYSMSG[code];
                red.style.display = ""
            };
            var rightInput = function(input, red) {
                red.style.display = "none"
            };
            var checkFunction = {
                MR0001: function(el) {
                    el.value = _trim(el.value);
                    if (el.value) {
                        return true
                    } else {
                        return false
                    }
                },
                MR0002: function(el) {
                    if (App.modCheckInfo.check(["MR0001"])) {
                        if (_checkMail(el.value)) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                },
                MR0007: function(el) {
                    if (!_trim(el.value).length) {
                        return true
                    }
                    if (App.modCheckInfo.check(["MR0001", "MR0002"])) {
                        if (/^.+@(sina\.com|vip\.sina\.com|sina\.cn|2008\.sina\.com|my3ia\.sina\.com)$/i.test(el.value)) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        return true
                    }
                },
                MR0005: function(el) {
                    el.ajaxCheck = "1";
                    if (App.modCheckInfo.check(["MR0001", "MR0002", "MR0004"])) {
                        var _parm = {
                            username: el.value
                        };
                        Utils.Io.Ajax.request("/reg/ami_check.php", {
                            POST: _parm,
                            onComplete: function(json) {
                                if (json.code == "A00006") {
                                    el.ajaxCheck = "1"
                                } else {
                                    el.ajaxCheck = "0"
                                }
                                checkFunction.MR0006(el);
                                return true
                            },
                            onException: function(json) {
                                return false
                            },
                            returnType: "json"
                        });
                        return true
                    } else {
                        return true
                    }
                },
                MR0006: function(el) {
                    if (el.ajaxCheck == "1") {
                        App.modCheckInfo.hideError(["MR0006"]);
                        return true
                    } else {
                        if (el.ajaxCheck === undefined) {
                            App.modCheckInfo.hideError(["MR0006"]);
                            return true
                        } else {
                            App.modCheckInfo.showError(["MR0006"]);
                            return false
                        }
                    }
                },
                MR0014: function(el) {
                    el.value = _trim(el.value);
                    if (App.modCheckInfo.check(["MR0011"]) && App.modCheckInfo.check(["MR0013"])) {
                        if (/^[0-9a-zA-z\._\-\?]{6,16}$/.test(el.value)) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                },
                MR0011: function(el) {
                    el.value = _trim(el.value);
                    if (el.value.length < 6) {
                        return false
                    } else {
                        return true
                    }
                },
                MR0013: function(el) {
                    el.value = _trim(el.value);
                    if (el.value.length > 16) {
                        return false
                    } else {
                        return true
                    }
                },
                MR0020: function(el) {
                    el.value = _trim(el.value);
                    if (el.value == _trim(_password.value)) {
                        return true
                    } else {
                        return false
                    }
                },
                MR0050: function(el) {
                    el.value = _trim(el.value);
                    if (el.value.length > 0) {
                        return true
                    } else {
                        return false
                    }
                },
                MR0071: function(el) {
                    if (el.checked) {
                        return true
                    }
                    return false
                }
            };
            App.modCheckInfo = App.checkForm(App.checkFormUI4);
            App.modCheckInfo.add("MR0001", _username, _red_username, checkFunction.MR0001);
            App.modCheckInfo.add("MR0002", _username, _red_username, checkFunction.MR0002);
            App.modCheckInfo.add("MR0007", _username, _red_username, checkFunction.MR0007);
            App.modCheckInfo.add("MR0005", _username, _red_username, checkFunction.MR0005);
            App.modCheckInfo.add("MR0006", _username, _red_username, checkFunction.MR0006);
            App.modCheckInfo.add("MR0014", _password, _red_password, checkFunction.MR0014);
            App.modCheckInfo.add("MR0011", _password, _red_password, checkFunction.MR0011);
            App.modCheckInfo.add("MR0013", _password, _red_password, checkFunction.MR0013);
            ($E("reg_password2") || scope.$pageid !== "register") && App.modCheckInfo.add("MR0020", _password2, _red_password2, checkFunction.MR0020);
            ($E("door") || scope.$pageid !== "register") && App.modCheckInfo.add("MR0050", _door, _red_door, checkFunction.MR0050);
            App.modCheckInfo.add("MR0071", _after, _red_after, checkFunction.MR0071);
            App.bindFormTips4([{
                el: _username,
                key: "MR0003",
                errorPos: _red_username},{
                el: _password,
                key: "MR0012",
                errorPos: _red_password},{
                el: _password2,
                key: "MR0021",
                errorPos: _red_password2}]);
            App.modRegisterMethod = {};
            App.modRegisterMethod.submit = function() {
                if (App.modCheckInfo.check() && (_username.ajaxCheck == "1")) {
                    setTimeout(function() {
                        App.modRegisterMethod.rumor(success, error)
                    }, 500)
                }
                return false
            };
            var _isNewCheckcode = false;
            App.modRegisterMethod.rumor = function(success, error) {
                if (typeof success != "function") {
                    throw ("The publishRumor need a function as thrid parameter")
                }
                if (typeof error != "function") {
                    throw ("The publishRumor need a function as fourth parameter")
                }
                var parameters = _html2json(_box);
                parameters.token = scope.$token;
                parameters.retcode = scope.doorretcode || "";
                parameters.r = window.location.href;
                parameters.regsrc = 4;
                scope.doorretcode = "";
                if (_compjson(parameters, _oData)) {
                    success()
                } else {
                    Utils.Io.Ajax.request("/reg/reg.php", {
                        POST: parameters,
                        onComplete: function(json) {
                            if (json.code == "A00006") {
                                success(json.data);
                                oData = parameters;
                                if (json.data) {
                                    window.location.replace(json.data)
                                }
                            } else {
                                if (json.code == "M00004") {
                                    _alert({
                                        code: "R01438"
                                    })
                                } else {
                                    if (json.code == "MR0050") {
                                        App.forbidrefresh(function() {
                                            Core.Events.fireEvent(_submit, "click")
                                        }, "/reg/reg.php");
                                        return
                                    } else {
                                        if (json.code == "R01409") {
                                            _red_door.innerHTML = '<span class="iswhat iserro"><img class="tipicon tip2" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title="" /><em>' + $SYSMSG[json.code] + "</em></span>";
                                            App.TextareaUtils.setCursor(_door);
                                            App.modRefreshCheckCode()
                                        } else {
                                            error(json)
                                        }
                                    }
                                }
                            }
                            _submit.className = "btnlogin1"
                        },
                        onException: function(json) {
                            _addEvent(_submit, App.modRegisterMethod.submit, "click");
                            error(json);
                            _submit.className = "btnlogin1"
                        },
                        returnType: "json"
                    });
                    _submit.className = "btnlogin1 btnlogin1_load"
                }
            };
            _addEvent(_submit, App.modRegisterMethod.submit, "click");
            App.enterSubmit({
                parent: _box,
                action: function() {
                    Core.Events.fireEvent(_submit, "click")
                }
            });
            passcardOBJ.init(_username, {
                overfcolor: "#999",
                overbgcolor: "#e8f4fc",
                outfcolor: "#000000",
                outbgcolor: ""
            }, _password, window)
        }
        function iniLoginForm(rnd, cb) {
            var login_submit = $E("mod_login_submit" + rnd);
            var login_tip = $E("mod_login_tip" + rnd);
            var loginname = $E("mod_loginname" + rnd);
            var password = $E("mod_password" + rnd);
            var isremember = $E("mod_isremember" + rnd);
            if (Utils.Cookie.getCookie("un")) {
                var dom = $C("A");
                var pNode = loginname.parentNode;
                var deleted = false;
                dom.onclick = function() {
                    loginname.value = "";
                    Utils.Cookie.setCookie("un", "", 0, "/", "weibo.com");
                    Utils.Cookie.deleteCookie("un");
                    App.__no_login_name__ = true;
                    pNode.removeChild(dom);
                    deleted = true;
                    return false
                };
                dom.innerHTML = '<img  class="lgicon_del" title="#{title}" src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif">'.replace(/#\{title\}/, $CLTMSG.CD0185);
                dom.onmouseover = function() {
                    this.style.cursor = "pointer"
                };
                pNode.appendChild(dom);
                Core.Events.addEvent(loginname, function() {
                    !deleted && pNode.removeChild(dom);
                    deleted = true
                }, "focus")
            }
            var disableClass = "btn_notclick";
            var enableClass = "btn_normal";
            var options = {
                zIndex: 1010,
                ref: loginname,
                wrap: login_tip,
                offsetX: 0,
                offsetY: 1
            };
            if (!$IE) {
                options.offsetY = 10
            }
            App.initLoginInput(loginname);
            if (cb && cb.initErrorTip) {
                App.fixElement.setHTML(cb.initErrorTip, "", options)
            }
            function checkForm(el, errStr) {
                if (!Core.String.trim(el.value) || (el.value == el.title && el.title)) {
                    var oPassword = $E("mod_password_text" + rnd);
                    if (oPassword && oPassword.style && oPassword.style.display !== "none") {
                        oPassword.focus()
                    }
                    App.fixElement.setHTML(errStr, "", options);
                    return false
                } else {
                    App.fixElement.hidden()
                }
                return true
            }
            login_submit.onclick = function() {
                if (login_submit.className == disableClass) {
                    return false
                }
                login_submit.className = enableClass;
                if (!checkForm(loginname, App.getMsg({
                    code: "M00901"
                }))) {
                    return false
                }
                if (!checkForm(password, App.getMsg({
                    code: "M00902"
                }))) {
                    return false
                }
                App.LoginAction({
                    name: loginname.value,
                    pwd: password.value,
                    remb: isremember.checked,
                    error: function(reason, errno) {
                        var msg = "";
                        if (errno == "4010") {
                            reason = App.getMsg({
                                code: "R01011"
                            });
                            msg = App.getMsg("R01010", {
                                mail: loginname.value
                            })
                        } else {
                            if (errno == "101" || errno == "5") {
                                msg = App.getMsg({
                                    code: "R11111"
                                })
                            }
                        }
                        App.fixElement.setHTML(reason, "", options)
                    },
                    succ: function() {
                        App.modRegisterOrLoginClose();
                        if (cb) {
                            scope.$uid = "123456";
                            cb.func(cb.param)
                        } else {
                            location.reload()
                        }
                    }
                })
            };
            App.enterSubmit({
                parent: password.parentNode,
                action: function() {
                    login_submit.onclick()
                }
            });
            passcardOBJ.init(loginname, {
                overfcolor: "#999",
                overbgcolor: "#e8f4fc",
                outfcolor: "#000000",
                outbgcolor: ""
            }, $E("mod_password_text" + rnd), window)
        }
        App.modRegisterAndLogin = function(showType, titleKey, callBackFunction, loginInfoKey) {
            var disableClass = "btn_notclick";
            var enableClass = "btn_normal";
            var options = {
                zIndex: 1010,
                ref: loginname,
                wrap: login_tip,
                offsetX: 0,
                offsetY: 1
            };
            if (!$IE) {
                options.offsetY = 10
            }
            App.initLoginInput(loginname);
            if (cb && cb.initErrorTip) {
                App.fixElement.setHTML(cb.initErrorTip, "", options)
            }
            function checkForm(el, errStr) {
                if (!Core.String.trim(el.value) || (el.value == el.title && el.title)) {
                    var oPassword = $E("mod_password_text" + rnd);
                    if (oPassword && oPassword.style && oPassword.style.display !== "none") {
                        oPassword.focus()
                    }
                    App.fixElement.setHTML(errStr, "", options);
                    return false
                } else {
                    App.fixElement.hidden()
                }
                return true
            }
            login_submit.onclick = function() {
                if (login_submit.className == disableClass) {
                    return false
                }
                login_submit.className = enableClass;
                if (!checkForm(loginname, App.getMsg({
                    code: "M00901"
                }))) {
                    return false
                }
                if (!checkForm(password, App.getMsg({
                    code: "M00902"
                }))) {
                    return false
                }
                App.LoginAction({
                    name: loginname.value,
                    pwd: password.value,
                    remb: isremember.checked,
                    error: function(reason, errno) {
                        var msg = "";
                        if (errno == "4010") {
                            reason = App.getMsg({
                                code: "R01011"
                            });
                            msg = App.getMsg("R01010", {
                                mail: loginname.value
                            })
                        } else {
                            if (errno == "101" || errno == "5") {
                                msg = App.getMsg({
                                    code: "R11111"
                                })
                            }
                        }
                        App.fixElement.setHTML(reason, "", options)
                    },
                    succ: function() {
                        App.modRegisterOrLoginClose();
                        if (cb) {
                            scope.$uid = "123456";
                            cb.func(cb.param)
                        } else {
                            location.reload()
                        }
                    }
                })
            };
            App.enterSubmit({
                parent: password.parentNode,
                action: function() {
                    login_submit.onclick()
                }
            });
            passcardOBJ.init(loginname, {
                overfcolor: "#999",
                overbgcolor: "#e8f4fc",
                outfcolor: "#000000",
                outbgcolor: ""
            }, $E("mod_password_text" + rnd), window)
        };
        App.modRegisterAndLogin = function(showType, titleKey, callBackFunction, loginInfoKey) {
            var regurl = /open\.weibo/.test(location.href) ? "http://weibo.com/reg.php" : "/reg.php";
            regurl += "?lang=" + scope.$lang;
            var recoverurl = "http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso";
            var regTitle = $CLTMSG.CY0124;
            var loginTitle = titleKey ? $CLTMSG[titleKey] : false;
            if (titleKey == "CY0130") {
                loginTitle = loginTitle.replace("{name}", Core.String.byteLength(scope.realname) > 10 ? (Core.String.leftB(scope.realname, 10) + "...") : scope.realname).replace("{titlename}", scope.realname)
            }
            var loginInfo = $CLTMSG[loginInfoKey] || $CLTMSG.CY0121;
            var rnd = (new Date()).getTime();
            var regPwd2Html = ($E("reg_password2") || scope.$pageid !== "register") ? "<tr>							<th><span>" + $CLTMSG.CY0118 + '：</span></th>							<td class="td1">								<input type="password" class="inp" id="mod_reg_password2' + rnd + '" name="password2" />							</td>							<td id="mod_red_reg_password2' + rnd + '"></td>						</tr>' : "";
            var regDoorHtml = ($E("door") || scope.$pageid !== "register") ? "<tr>							<th><span>" + $CLTMSG.CY0119 + '：</span></th>							<td class="td1">								<input type="text" class="inp w1" id="mod_reg_door' + rnd + '" name="basedoor" style="width:40px" />								<img width="90" height="31" align="absmiddle" src="/pincode/pin1.php?r=1275025963678&amp;lang=zh" style="margin:5px 0;" id="mod_reg_check_img" />								<a href="javascript:void(0);" onclick="App.modRefreshCheckCode()">' + $CLTMSG.CY0120 + '</a>							</td>							<td id="mod_red_reg_door' + rnd + '"></td>						</tr>' : "";
            var html = '<table class="mBlogLayer">					<tr>						<td class="top_l"></td>						<td class="top_c"></td>						<td class="top_r"></td>					</tr>					<tr>						<td class="mid_l"></td>						<td class="mid_c">					<div class="layerBox">					<div class="layerBoxCon" style=" width:530px;">					<div class="layerSmartlogin">						<div class="layerMedia_close"><a href="javascript:void(0);" onclick="App.modRegisterOrLoginClose()" class="close"></a></div>						<div class="yellowBg" id="mod_reg_login_yellow' + rnd + '"></div>						<div class="infoForm" id="mod_reg_information_box' + rnd + '">							<div class="infoReg">								<table class="tab2">                                <tr>                                	<th><span>' + $CLTMSG.CY0116 + '：</span></th>                                	<td class="td1"><input type="text" class="inp" id="mod_reg_username' + rnd + '" name="username" /></td>                                	<td id="mod_red_reg_username' + rnd + '"><a href="http://mail.sina.com.cn/cnmail/index.html" target="_blank">我没有邮箱</a></td>                                </tr>					            <tr><th></th>									<td class="td2"><p><a href="/reg/mobilereg.php">' + $CLTMSG.CY0152 + "</a></p></td>								<td></td></tr>                                <tr>                                	<th><span>" + $CLTMSG.CY0117 + '：</span></th>                                	<td class="td1">										<input type="password" class="inp" id="mod_reg_password' + rnd + '" name="password" />									</td>                                	<td id="mod_red_reg_password' + rnd + '"></td>                                </tr>' + regPwd2Html + regDoorHtml + '								<tr>                                	<th>&nbsp;</th>                                    <td class="td1"><div class="lf"><input type="checkbox" id="mod_reg_after' + rnd + '" class="labelbox" checked="checked" name="after" value="1" /><label for="chbb">' + $CLTMSG.CY0129 + '</label></div></td>                                	<td id="mod_red_reg_after' + rnd + '"></td>								</tr>                                <tr>                                	<th>&nbsp;</th>                                	<td class="td1"><a href="javascript:void(0);" class="btnlogin1" id="mod_reg_submit' + rnd + '"></a></td>                                	<td>&nbsp;</td>                                </tr>								</table>							</div>							<div class="clearit"></div>						</div>						<div class="infoForm" id="mod_reg_login_box' + rnd + '">							<div class="infoLeft">								<table class="tab1">								<caption>' + loginInfo + '</caption>								<tr>									<th id="mod_login_tip' + rnd + '" scope="row"></th>					            </tr>								<tr>									<td><div class="lgsz_wrap"><input type="text" class="inp" id="mod_loginname' + rnd + '" /></div></td>								</tr>								<tr>									<td><input type="text" style="color:#999;display:none;" class="inp" id="mod_password_text' + rnd + '" /><input type="password" class="inp" id="mod_password' + rnd + '" /></td>								</tr>								<tr>									<th>										<a href="javascript:void(0);" class="btn_normal" id="mod_login_submit' + rnd + '"><em>' + $CLTMSG.CD0134 + '</em></a>										<input type="checkbox" id="mod_isremember' + rnd + '" class="chkb" checked="checked" /><label for="mod_isremember' + rnd + '">' + $CLTMSG.CY0123 + '</label>									</th>								</tr>								</table>                                <div class="msnbind">                                    <div class="MIB_linedot1"></div>                                    <a class="msnlink" href="javascript:void(0);" onclick="App.connectMSN();">                                        <img class="small_icon msnicon" title="msn" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif">                                        <span class="txt">' + $CLTMSG.ZB0025 + '</span>                                    </a>                                </div>							</div>							<div class="infoRight">								<p class="p1">' + $CLTMSG.CY0122 + '</p>								<p class="p2"><a href="javascript:void(0);" class="btnlogin1" onclick="App.modRunToRegisterOrLogin(\'register\');"></a></p>							</div>							<div class="clearit"></div>						</div>					</div>					</div>					</div>					</td>					<td class="mid_r"></td>					</tr>					<tr>					<td class="bottom_l"></td>					<td class="bottom_c"></td>					<td class="bottom_r"></td>					</tr>					</table>';
            var box = $C("DIV");
            box.innerHTML = html;
            box.style.position = "absolute";
            box.style.zIndex = 1600;
            box.style.width = "540px";
            document.body.appendChild(box);
            iniRegForm(rnd, callBackFunction);
            iniLoginForm(rnd, callBackFunction);
            var cachePassCardStatus = passcardOBJ.menuStatus;
            App.modRunToRegisterOrLogin = function(type) {
                if (type === "login") {
                    $E("mod_reg_login_box" + rnd).style.display = "";
                    $E("mod_reg_information_box" + rnd).style.display = "none";
                    if (loginTitle) {
                        $E("mod_reg_login_yellow" + rnd).innerHTML = loginTitle;
                        $E("mod_reg_login_yellow" + rnd).style.display = ""
                    } else {
                        $E("mod_reg_login_yellow" + rnd).style.display = "none"
                    }
                    passcardOBJ.menuStatus = {
                        "sina.com": true,
                        "163.com": true,
                        "qq.com": true,
                        "126.com": true,
                        "vip.sina.com": true,
                        "sina.cn": true,
                        "hotmail.com": true,
                        "gmail.com": true,
                        "sohu.com": true,
                        "yahoo.cn": true,
                        "139.com": true,
                        "wo.com.cn": true,
                        "189.cn": true
                    }
                } else {
                    if (type === "register") {
                        $E("mod_reg_login_box" + rnd).style.display = "none";
                        $E("mod_reg_information_box" + rnd).style.display = "";
                        $E("mod_reg_login_yellow" + rnd).innerHTML = regTitle;
                        $E("mod_reg_login_yellow" + rnd).style.display = "";
                        passcardOBJ.menuStatus = {
                            "163.com": true,
                            "qq.com": true,
                            "126.com": true,
                            "hotmail.com": true,
                            "gmail.com": true,
                            "sohu.com": true,
                            "yahoo.cn": true,
                            "139.com": true,
                            "wo.com.cn": true,
                            "189.cn": true
                        };
                        try {
                            GB_SUDA._S_uaTrack("tblog_reg", "layer_reg")
                        } catch (ex) {}
                    }
                }
            };
            App.setPassword("mod_password" + rnd, "mod_password_text" + rnd);
            App.modRegisterOrLoginClose = function() {
                document.body.removeChild(box);
                document.body.removeChild(mask);
                passcardOBJ.menuStatus = cachePassCardStatus;
                App.modRunToRegisterOrLogin = false
            };
            App.modRunToRegisterOrLogin(showType);
            setMiddle(box);
            var mask = setMask(600);
            try {
                GB_SUDA._S_uaTrack("tblog_reg", "layer_login")
            } catch (exp) {}
            return box
        };
        App.modRefreshCheckCode = function() {
            setTimeout(function() {
                $E("mod_reg_check_img").src = "/pincode/pin1.php?r=" + ((new Date()).getTime()) + "&lang=" + scope.$lang;
                $E("mod_reg_check_img").style.display = ""
            }, 10)
        }
    })();
$registJob("start_suda", function() {
        try {
            _S_pSt(_S_PID_)
        } catch (a) {}
    });
var _SGUP_ = "SGUP";
var sgup = "";
var SSL = {
        Config: {},
        Space: function(g) {
            var b = g,
                f = null;
            b = b.split(".");
            f = SSL;
            for (i = 0, len = b.length; i < len; i++) {
                    f[b[i]] = f[b[i]] || {};
                    f = f[b[i]]
                }
            return f
        }
    };
SSL.Space("Global");
SSL.Space("Core.Dom");
SSL.Space("Core.Event");
SSL.Space("App");
SSL.Global = {
        win: window || {},
        doc: document,
        nav: navigator,
        loc: location
    };
SSL.Core.Dom = {
        get: function(a) {
            return document.getElementById(a)
        }
    };
SSL.Core.Event = {
        on: function() {}
    };
SSL.App = {
        _S_gConType: function() {
            var a = "";
            try {
                SSL.Global.doc.body.addBehavior("#default#clientCaps");
                a = SSL.Global.doc.body.connectionType
            } catch (b) {
                a = "unkown"
            }
            return a
        },
        _S_gKeyV: function(j, b, g, f) {
            if (j == "") {
                return ""
            }
            if (f == "") {
                f = "="
            }
            b = b + f;
            var h = j.indexOf(b);
            if (h < 0) {
                return ""
            }
            h = h + b.length;
            var a = j.indexOf(g, h);
            if (a < h) {
                a = j.length
            }
            return j.substring(h, a)
        },
        _S_gUCk: function(a) {
            if ((undefined == a) || ("" == a)) {
                return ""
            }
            return SSL.App._S_gKeyV(SSL.Global.doc.cookie, a, ";", "")
        },
        _S_sUCk: function(h, a, b, g) {
            if (a != null) {
                if ((undefined == g) || (null == g)) {
                    g = "weibo.com"
                }
                if ((undefined == b) || (null == b) || ("" == b)) {
                    SSL.Global.doc.cookie = h + "=" + a + ";domain=" + g + ";path=/"
                } else {
                    var f = new Date();
                    var j = f.getTime();
                    j = j + 86400000 * b;
                    f.setTime(j);
                    j = f.getTime();
                    SSL.Global.doc.cookie = h + "=" + a + ";domain=" + g + ";expires=" + f.toUTCString() + ";path=/"
                }
            }
        },
        _S_gJVer: function(j, b) {
            var h, a, k, f = 1,
                g = 0;
            if ("MSIE" == b) {
                    a = "MSIE";
                    h = j.indexOf(a);
                    if (h >= 0) {
                        k = parseInt(j.substring(h + 5));
                        if (3 <= k) {
                            f = 1.1;
                            if (4 <= k) {
                                f = 1.3
                            }
                        }
                    }
                } else {
                    if (("Netscape" == b) || ("Opera" == b) || ("Mozilla" == b)) {
                        f = 1.3;
                        a = "Netscape6";
                        h = j.indexOf(a);
                        if (h >= 0) {
                            f = 1.5
                        }
                    }
                }
            return f
        },
        _S_gFVer: function(nav) {
            var ua = SSL.Global.nav.userAgent.toLowerCase();
            var flash_version = 0;
            if (SSL.Global.nav.plugins && SSL.Global.nav.plugins.length) {
                var p = SSL.Global.nav.plugins["Shockwave Flash"];
                if (typeof p == "object") {
                    for (var i = 10; i >= 3; i--) {
                        if (p.description && p.description.indexOf(" " + i + ".") != -1) {
                            flash_version = i;
                            break
                        }
                    }
                }
            } else {
                if (ua.indexOf("msie") != -1 && ua.indexOf("win") != -1 && parseInt(SSL.Global.nav.appVersion) >= 4 && ua.indexOf("16bit") == -1) {
                    for (var i = 10; i >= 2; i--) {
                        try {
                            var object = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
                            if (object) {
                                flash_version = i;
                                break
                            }
                        } catch (e) {}
                    }
                } else {
                    if (ua.indexOf("webtv/2.5") != -1) {
                        flash_version = 3
                    } else {
                        if (ua.indexOf("webtv") != -1) {
                            flash_version = 2
                        }
                    }
                }
            }
            return flash_version
        },
        _S_gMeta: function(b, f) {
            var g = SSL.Global.doc.getElementsByName(b);
            var a = 0;
            if (f > 0) {
                a = f
            }
            return (g.length > a) ? g[a].content : ""
        },
        _S_gHost: function(b) {
            var a = new RegExp("^http(?:s)?://([^/]+)", "im");
            if (b.match(a)) {
                return b.match(a)[1].toString()
            } else {
                return ""
            }
        },
        _S_gDomain: function(a) {
            var b = a.indexOf(".sina.");
            if (b > 0) {
                return a.substr(0, b)
            } else {
                return a
            }
        },
        _S_gTJMTMeta: function() {
            return SSL.App._S_gMeta("mediaid")
        },
        _S_gTJZTMeta: function() {
            var a = SSL.App._S_gMeta("subjectid");
            a.replace(",", ".");
            a.replace(";", ",");
            return a
        },
        _S_isFreshMeta: function() {
            var b = SSL.Global.doc.documentElement.innerHTML.substring(0, 1024);
            var a = new RegExp("<meta\\s*http-equiv\\s*=((\\s*refresh\\s*)|('refresh')|(\"refresh\"))s*contents*=", "ig");
            return a.test(b)
        },
        _S_isIFrameSelf: function(b, a) {
            if (SSL.Global.win.top == SSL.Global.win) {
                return false
            } else {
                try {
                    if (SSL.Global.doc.body.clientHeight == 0) {
                        return false
                    }
                    if ((SSL.Global.doc.body.clientHeight >= b) && (SSL.Global.doc.body.clientWidth >= a)) {
                        return false
                    } else {
                        return true
                    }
                } catch (f) {
                    return true
                }
            }
        },
        _S_isHome: function(b) {
            var a = "";
            try {
                SSL.Global.doc.body.addBehavior("#default#homePage");
                a = SSL.Global.doc.body.isHomePage(b) ? "Y" : "N"
            } catch (f) {
                a = "unkown"
            }
            return a
        }
    };

function SUDA(N, l, k) {
        var j = SSL.Global,
            C = SSL.Core.Dom,
            z = SSL.Core.Event,
            m = SSL.App;
        var K = "webbug_meta_ref_mod_noiframe_async_fc_:9.12c",
            n = "-9999-0-0-1";
        var b = j.nav.appName.indexOf("Microsoft Internet Explorer") > -1 ? "MSIE" : j.nav.appName;
        var y = j.nav.appVersion;
        var t = j.loc.href.toLowerCase();
        var D = j.doc.referrer.toLowerCase();
        var s = "";
        var q = "",
            O = "SUP",
            A = "",
            x = "Apache",
            B = "SINAGLOBAL",
            v = "ULV",
            L = "UOR",
            w = "_s_upa",
            a = 320,
            o = 240,
            M = 0,
            r = "",
            p = "",
            S = 0,
            P = 10000,
            J = 0,
            g = "_s_acc";
        var T = "_s_tentry";
        var H = t.indexOf("https") > -1 ? "https://" : "http://",
            G = "beacon.sina.com.cn",
            I = H + G + "/a.gif",
            R = H + G + "/d.gif",
            Q = H + G + "/e.gif",
            F = H + G + "/fc.html";
        var h = 0,
            f = 0;
        var E = {
                _S_sSID: function() {
                    E._S_p2Bcn("", R);
                    var U = new Date();
                    sid = Math.random() * 10000000000000 + "." + U.getTime();
                    m._S_sUCk(x, sid);
                    return sid
                },
                _S_gsSID: function() {
                    var U = m._S_gUCk(x);
                    if ("" == U) {
                        U = E._S_sSID()
                    }
                    return U
                },
                _S_sGID: function(U) {
                    if ("" != U) {
                        m._S_sUCk(B, U, 3650)
                    }
                },
                _S_gGID: function() {
                    return m._S_gUCk(B)
                },
                _S_gsGID: function() {
                    if ("" != B) {
                        var U = E._S_gGID();
                        if ("" == U) {
                            U = m._S_gUCk(x);
                            E._S_sGID(U)
                        }
                        return U
                    } else {
                        return ""
                    }
                },
                _S_IFC2GID: function() {
                    var U = C.get("SUDA_FC");
                    if (U) {
                        U.src = F + "?a=g&n=" + B + "&r=" + Math.random()
                    }
                },
                _S_gCid: function() {
                    try {
                        var U = m._S_gMeta("publishid");
                        if ("" != U) {
                            var W = U.split(",");
                            if (W.length > 0) {
                                if (W.length >= 3) {
                                    n = "-9999-0-" + W[1] + "-" + W[2]
                                }
                                return W[0]
                            }
                        } else {
                            return "0"
                        }
                    } catch (V) {
                        return "0"
                    }
                },
                _S_gAEC: function() {
                    return m._S_gUCk(g)
                },
                _S_sAEC: function(U) {
                    if ("" == U) {
                        return
                    }
                    var V = E._S_gAEC();
                    if (V.indexOf(U + ",") < 0) {
                        V = V + U + ","
                    }
                    m._S_sUCk(g, V, 7)
                },
                _S_p2Bcn: function(X, W) {
                    var U = C.get("SUDA_CS_DIV");
                    if (null != U) {
                        var V = new Date();
                        U.innerHTML = "<img width=0 height=0 src='" + W + "?" + X + "&gUid_" + V.getTime() + "' border='0' alt='' />"
                    }
                },
                _S_gSUP: function() {
                    if (A != "") {
                        return A
                    }
                    var W = unescape(m._S_gUCk(O));
                    if (W != "") {
                        var V = m._S_gKeyV(W, "ag", "&", "");
                        var U = m._S_gKeyV(W, "user", "&", "");
                        var X = m._S_gKeyV(W, "uid", "&", "");
                        var Z = m._S_gKeyV(W, "sex", "&", "");
                        var Y = m._S_gKeyV(W, "dob", "&", "");
                        A = V + ":" + U + ":" + X + ":" + Z + ":" + Y;
                        return A
                    } else {
                        return ""
                    }
                },
                _S_gsLVisit: function(W) {
                    var Y = m._S_gUCk(v);
                    var X = Y.split(":");
                    var Z = "";
                    if (X.length >= 6) {
                        if (W != X[4]) {
                            var V = new Date();
                            var U = new Date(parseInt(X[0]));
                            X[1] = parseInt(X[1]) + 1;
                            if (V.getMonth() != U.getMonth()) {
                                X[2] = 1
                            } else {
                                X[2] = parseInt(X[2]) + 1
                            }
                            if (((V.getTime() - U.getTime()) / 86400000) >= 7) {
                                X[3] = 1
                            } else {
                                if (V.getDay() < U.getDay()) {
                                    X[3] = 1
                                } else {
                                    X[3] = parseInt(X[3]) + 1
                                }
                            }
                            Z = X[0] + ":" + X[1] + ":" + X[2] + ":" + X[3];
                            X[5] = X[0];
                            X[0] = V.getTime();
                            m._S_sUCk(v, X[0] + ":" + X[1] + ":" + X[2] + ":" + X[3] + ":" + W + ":" + X[5], 360)
                        } else {
                            Z = X[5] + ":" + X[1] + ":" + X[2] + ":" + X[3]
                        }
                    } else {
                        var V = new Date();
                        Z = ":1:1:1";
                        m._S_sUCk(v, V.getTime() + Z + ":" + W + ":", 360)
                    }
                    return Z
                },
                _S_gUOR: function() {
                    var U = m._S_gUCk(L);
                    var V = U.split(":");
                    if (V.length >= 2) {
                        return V[0]
                    } else {
                        return ""
                    }
                },
                _S_sUOR: function() {
                    var Y = m._S_gUCk(L),
                        ad = "",
                        V = "",
                        ac = "",
                        X = "";
                    var ae = /[&|?]c=spr(_[A-Za-z0-9]{1,}){3,}/;
                    var Z = new Date();
                    if (t.match(ae)) {
                            ac = t.match(ae)[0]
                        } else {
                            if (D.match(ae)) {
                                ac = D.match(ae)[0]
                            }
                        }
                    if (ac != "") {
                            ac = ac.substr(3) + ":" + Z.getTime()
                        }
                    if (Y == "") {
                            if (m._S_gUCk(v) == "" && m._S_gUCk(v) == "") {
                                ad = m._S_gDomain(m._S_gHost(D));
                                V = m._S_gDomain(m._S_gHost(t))
                            }
                            m._S_sUCk(L, ad + "," + V + "," + ac, 365)
                        } else {
                            var aa = 0,
                                ab = Y.split(",");
                            if (ab.length >= 1) {
                                    ad = ab[0]
                                }
                            if (ab.length >= 2) {
                                    V = ab[1]
                                }
                            if (ab.length >= 3) {
                                    X = ab[2]
                                }
                            if (ac != "") {
                                    aa = 1
                                } else {
                                    var W = X.split(":");
                                    if (W.length >= 2) {
                                        var U = new Date(parseInt(W[1]));
                                        if (U.getTime() < (Z.getTime() - 86400000 * 30)) {
                                            aa = 1
                                        }
                                    }
                                }
                            if (aa) {
                                    m._S_sUCk(L, ad + "," + V + "," + ac, 365)
                                }
                        }
                },
                _S_gRef: function() {
                    var U = /^[^\?&#]*.swf([\?#])?/;
                    if ((D == "") || (D.match(U))) {
                        var V = m._S_gKeyV(t, "ref", "&", "");
                        if (V != "") {
                            return V
                        }
                    }
                    return D
                },
                _S_MEvent: function() {
                    if (S == 0) {
                        S++;
                        var V = m._S_gUCk(w);
                        if (V == "") {
                            V = 0
                        }
                        V++;
                        if (V < P) {
                            var U = /[&|?]c=spr(_[A-Za-z0-9]{2,}){3,}/;
                            if (t.match(U) || D.match(U)) {
                                V = V + P
                            }
                        }
                        m._S_sUCk(w, V)
                    }
                },
                _S_gMET: function() {
                    var U = m._S_gUCk(w);
                    if (U == "") {
                        U = 0
                    }
                    return U
                },
                _S_gCInfo_v2: function() {
                    var U = new Date();
                    return "sz:" + screen.width + "x" + screen.height + "|dp:" + screen.colorDepth + "|ac:" + j.nav.appCodeName + "|an:" + b + "|cpu:" + j.nav.cpuClass + "|pf:" + j.nav.platform + "|jv:" + m._S_gJVer(y, b) + "|ct:" + m._S_gConType() + "|lg:" + j.nav.systemLanguage + "|tz:" + U.getTimezoneOffset() / 60 + "|fv:" + m._S_gFVer(j.nav)
                },
                _S_gPInfo_v2: function(U, V) {
                    if ((undefined == U) || ("" == U)) {
                        U = E._S_gCid() + n
                    }
                    return "pid:" + U + "|st:" + E._S_gMET() + "|et:" + J + "|ref:" + escape(V) + "|hp:" + m._S_isHome(t) + "|PGLS:" + m._S_gMeta("stencil") + "|ZT:" + escape(m._S_gTJZTMeta()) + "|MT:" + escape(m._S_gTJMTMeta()) + "|keys:"
                },
                _S_gUInfo_v2: function(U) {
                    return "vid:" + U + "|sid:" + E._S_gsSID() + "|lv:" + E._S_gsLVisit(E._S_gsSID()) + "|un:" + E._S_gSUP() + "|uo:" + E._S_gUOR() + "|ae:" + E._S_gAEC()
                },
                _S_gEXTInfo_v2: function(V, U) {
                    r = (undefined == V) ? r : V;
                    p = (undefined == U) ? p : U;
                    return "ex1:" + r + "|ex2:" + p
                },
                _S_pBeacon: function(Y, X, V) {
                    try {
                        var aa = E._S_gsGID();
                        if ("" == aa) {
                            if (M < 1) {
                                setTimeout(function() {
                                    E._S_pBeacon(Y, X, V)
                                }, f);
                                M++;
                                return
                            } else {
                                aa = E._S_gsSID();
                                E._S_sGID(aa)
                            }
                        }
                        var ac = "V=2";
                        var Z = E._S_gCInfo_v2();
                        var ae = E._S_gPInfo_v2(Y, E._S_gRef());
                        var W = E._S_gUInfo_v2(aa);
                        var U = E._S_gEXTInfo_v2(X, V);
                        var ad = ac + "&CI=" + Z + "&PI=" + ae + "&UI=" + W + "&EX=" + U;
                        E._S_p2Bcn(ad, I)
                    } catch (ab) {}
                },
                _S_acTrack_i: function(U, W) {
                    if (("" == U) || (undefined == U)) {
                        return
                    }
                    E._S_sAEC(U);
                    if (0 == W) {
                        return
                    }
                    var V = "AcTrack||" + E._S_gGID() + "||" + E._S_gsSID() + "||" + E._S_gSUP() + "||" + U + "||";
                    E._S_p2Bcn(V, Q)
                },
                _S_uaTrack_i: function(W, U) {
                    var V = "UATrack||" + E._S_gGID() + "||" + E._S_gsSID() + "||" + E._S_gSUP() + "||" + W + "||" + U + "||" + E._S_gRef() + "||";
                    E._S_p2Bcn(V, Q)
                },
                _S_sTEntry: function() {
                    var X = "-";
                    if ("" == m._S_gUCk(T)) {
                        if ("" != D) {
                            X = m._S_gHost(D)
                        }
                        m._S_sUCk(T, X, "", "weibo.com")
                    }
                    var V = /weibo.com\/reg.php/;
                    if (t.match(V)) {
                        var W = m._S_gKeyV(unescape(t), "sharehost", "&", "");
                        var U = m._S_gKeyV(unescape(t), "appkey", "&", "");
                        if ("" != W) {
                            m._S_sUCk(T, W, "", "weibo.com")
                        }
                        m._S_sUCk("appkey", U, "", "weibo.com")
                    }
                }
            };
        E._S_sTEntry();
        E._S_sUOR();
        return {
                _S_pSt: function(U, W, V) {
                    try {
                        if ((m._S_isFreshMeta()) || (m._S_isIFrameSelf(o, a))) {
                            return
                        }
                        if (J > 0) {
                            return
                        }++J;
                        E._S_gsSID();
                        setTimeout(function() {
                            E._S_pBeacon(U, W, V, 0)
                        }, f)
                    } catch (X) {}
                },
                _S_pStM: function(U, W, V) {
                    ++J;
                    E._S_pBeacon(U, ((undefined == W) ? E._S_upExt1() : W), V)
                },
                _S_acTrack: function(U, W) {
                    try {
                        if ((undefined != U) && ("" != U)) {
                            setTimeout(function() {
                                E._S_acTrack_i(U, W)
                            }, h)
                        }
                    } catch (V) {}
                },
                _S_uaTrack: function(V, U) {
                    try {
                        if (undefined == V) {
                            V = ""
                        }
                        if (undefined == U) {
                            U = ""
                        }
                        if (("" != V) || ("" != U)) {
                            setTimeout(function() {
                                E._S_uaTrack_i(V, U)
                            }, h)
                        }
                    } catch (W) {}
                },
                _S_gCk: function(U) {
                    return m._S_gUCk(U)
                },
                _S_sCk: function(X, U, V, W) {
                    return m._S_sUCk(X, U, V, W)
                },
                _S_gGlobalID: function() {
                    return E._S_gGID()
                },
                _S_gSessionID: function() {
                    return E._S_gsSID()
                }
            }
    }
var GB_SUDA;
if (GB_SUDA == null) {
        GB_SUDA = new SUDA({})
    }
var _S_PID_ = "";

function _S_pSt(a, f, b) {
        GB_SUDA._S_pSt(a, f, b)
    }
function _S_pStM(a, f, b) {
        GB_SUDA._S_pStM(a, f, b)
    }
function _S_acTrack(a) {
        GB_SUDA._S_acTrack(a, 1)
    }
function _S_uaTrack(b, a) {
        GB_SUDA._S_uaTrack(b, a)
    }(function() {
        if (!/\((iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
            return
        }
        var a = document.createElement("script");
        a.src = "http://news.sina.com.cn/js/ui/ipad/reset.js";
        document.getElementsByTagName("head")[0].appendChild(a)
    })();
    (function() {
        var a = null;
        App.CONNECTMSNCONFIG = {
            url: "https://consent.live.com/connect.aspx",
            wrap_client_id: "000000004C03D438",
            wrap_callback: "http://weibo.com/msn/msnLoginCallBack.php",
            wrap_scope: "WL_Activities.Update,WL_Contacts.View,WL_Profiles.View,Messenger.SignIn,IMControl.IMAllowAll,WL_Activities.View,WL_Photos.View",
            name: "neww",
            params: "height=400,width=500"
        };
        App.connectMSN = function(b) {
            GB_SUDA._S_uaTrack("bind_msn", "login");
            var h = App.CONNECTMSNCONFIG;
            var g = window.scope && window.scope.$lang ? (window.scope.$lang === "zh-tw" ? "zh-tw" : "zh-cn") : "zh-cn";
            var f = "?wrap_client_id=" + h.wrap_client_id + "&wrap_callback=" + encodeURIComponent(h.wrap_callback) + "&wrap_scope=" + h.wrap_scope + "&mkt=" + g + "&wrap_client_state=" + encodeURIComponent(b ? b + "?lang=" : "http://weibo.com/msn/bind.php?lang=") + g;
            f = h.url + f;
            a = window.open(f, h.name, h.params)
        };
        App.showBindMsnMsg = function(b) {
            App.alert(b, {
                zIndex: 2000
            })
        };
        App.sendRedirect = function(b) {
            if (b && a) {
                a = null;
                if (b) {
                    top.location.href = b
                }
            }
        }
    })();
App.ModLogin = function(l, w) {
        var o = w || $CLTMSG.CD0038;
        var t = /open\.t\.sina/.test(location.href) ? "http://weibo.com/reg.php" : "/reg.php";
        t += "?lang=" + scope.$lang;
        var a = "http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso";
        var m = (new Date()).getTime();
        var p = '<div class="loginLayer" id="login_wrap' + m + '">            	<table>                  <tbody>				  <tr>			      	   <th scope="row"/>	                        <td id="login_tip' + m + '"></td>	                    </tr>				  <tr>                    <th scope="row">' + $CLTMSG.CD0039 + '&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="1" type="text" name="loginname" id="loginname' + m + '" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="' + t + '" target="_blank">' + $CLTMSG.CD0040 + '</a></td>                  </tr>                  <tr>                    <th scope="row">' + $CLTMSG.CD0041 + '&nbsp;&nbsp;</th>                    <td><span class="cInputBorder"><span class="cInputborderR"><input tabIndex="2" type="password" name="password" id="password' + m + '" class="inputType" style="width: 210px;"/></span></span></td>                    <td><a href="' + a + '" target="_blank">' + $CLTMSG.CD0042 + '</a></td>                  </tr>                  <tr>                    <th scope="row"/>                    <td><input type="checkbox" id="isremember' + m + '"  checked="checked"/>' + $CLTMSG.CD0043 + '</td>                    <td/>                  </tr>                  <tr>                    <th scope="row"/>                    <td><a href="javascript:void(0);" id="login_submit' + m + '" class="btn_normal"><em>' + $CLTMSG.CD0044 + "</em></a></td>                    <td/>                  </tr>                </tbody></table>            </div>";
        var k = {
            width: 390,
            zIndex: 1000
        };
        var s = new App.Dialog.BasicDialog(o, p, k);
        var r = "btn_notclick";
        var g = "btn_normal";
        var j = $E("login_submit" + m);
        var q = $E("login_tip" + m);
        var v = $E("loginname" + m);
        var b = $E("password" + m);
        var h = $E("isremember" + m);
        var f = {
            zIndex: 1010,
            ref: v,
            wrap: q,
            offsetX: 0,
            offsetY: 1
        };
        if (!$IE) {
            f.offsetY = 10
        }
        App.initLoginInput(v);
        if (l && l.initErrorTip) {
            App.fixElement.setHTML(l.initErrorTip, "", f)
        }
        function n(x, y) {
            if (!Core.String.trim(x.value) || (x.value == x.title && x.title)) {
                if (x && x.style && x.style.display !== "none") {
                    x.focus()
                }
                App.fixElement.setHTML(y, "", f);
                return false
            } else {
                App.fixElement.hidden()
            }
            return true
        }
        j.onclick = function() {
            if (j.className == r) {
                return false
            }
            j.className = g;
            if (!n(v, App.getMsg({
                code: "M00901"
            }))) {
                return false
            }
            if (!n(b, App.getMsg({
                code: "M00902"
            }))) {
                return false
            }
            App.LoginAction({
                name: v.value,
                pwd: b.value,
                remb: h.checked,
                error: function(y, x) {
                    var z = "";
                    if (x == "4010") {
                        y = App.getMsg({
                            code: "R01011"
                        });
                        z = App.getMsg("R01010", {
                            mail: v.value
                        })
                    } else {
                        if (x == "101" || x == "5") {
                            z = App.getMsg({
                                code: "R11111"
                            })
                        }
                    }
                    App.fixElement.setHTML(y, z, f)
                },
                succ: function() {
                    s.close();
                    if (l) {
                        scope.$uid = "123456";
                        l.func(l.param)
                    } else {
                        location.reload()
                    }
                }
            })
        };
        App.enterSubmit({
            parent: b.parentNode,
            action: function() {
                j.onclick()
            }
        });
        passcardOBJ.init(v, {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        }, b, window);
        return s
    };
App.ModLogin = function(a, b) {
        if (App.modRunToRegisterOrLogin) {
            App.modRunToRegisterOrLogin("login")
        } else {
            App.modRegisterAndLogin("login", false, a)
        }
    };
Core.Events.getEventTarget = function(a) {
        a = a || Core.Events.getEvent();
        Core.Events.fixEvent(a);
        return a.target
    };
    (function() {
        var j = {
            AREA: "MAP",
            CAPTION: "TABLE",
            COL: "TABLE|COLGROUP",
            COLGROUP: "TABLE",
            LEGEND: "FIELDSET",
            OPTGROUP: "SELECT",
            OPTION: "SELECT",
            PARAM: "OBJECT",
            TBODY: "TABLE",
            TD: "TR",
            TFOOT: "TABLE",
            TH: "TABLE|TR",
            THEAD: "TABLE",
            TR: "TBODY|THEAD|TH|TFOOT"
        };
        var h = Core.String.trim;
        var k = function(q, p, r) {
            var s = null;
            if (q.toUpperCase() == "TEXT") {
                s = document.createTextNode(q)
            } else {
                s = $C(q)
            }
            if (typeof p === "object") {
                for (var o in p) {
                    switch (o) {
                    case "class":
                        s.className = p[o];
                        break;
                    case "id":
                        r.domList[p[o]] = s;
                        break;
                    case "action":
                        if (r.actList[p[o]]) {
                            r.actList[p[o]] = r.actList[p[o]].concat([s])
                        } else {
                            r.actList[p[o]] = [s]
                        }
                        break;
                    case "style":
                        s.style.cssText = p[o];
                        break;
                    case "innerHTML":
                        if (s.nodeType === 3) {
                            s.nodeValue = Core.String.decodeHTML(p[o])
                        } else {
                            s.innerHTML = p[o]
                        }
                        break;
                    case "nodeValue":
                        if (s.nodeType === 3) {
                            s.nodeValue = p[o]
                        } else {
                            s.innerHTML = Core.String.encodeHTML(p[o])
                        }
                        break;
                    default:
                        s.setAttribute(o, p[o])
                    }
                }
            }
            return s
        };
        var b = function(s, t) {
            var q = j[t.tag];
            if (q) {
                var r = q.split("|");
                for (var p = 0, o = r.length; p < o; p++) {
                    if (s.tagName == r[p]) {
                        return true
                    }
                }
                return false
            }
            return true
        };
        var g = function(p, r, q) {
            r.tag = r.tag.toLocaleUpperCase();
            if (!b(p, r)) {
                return false
            }
            var o = k(r.tag, r.attr, q);
            p.appendChild(o);
            return o
        };
        var l = function(r, p, s) {
            for (var q = 0, o = p.length; q < o; q++) {
                var t = g(r, p[q], s);
                if (!t) {
                    alert("tree wrong!!!");
                    return false
                }
                if (p[q].list && p[q].list.length) {
                    l(t, p[q].list, s)
                }
            }
        };
        var f = function(o) {
            var p = {};
            var r = [];
            if (o) {
                var q = new RegExp("(?:([^\\s=]+)\\s*=\\s*[\\\"\\']([^=\\\"\\']*)[\\\"\\'])", "ig");
                while (r = q.exec(o)) {
                    p[r[1]] = r[2]
                }
            }
            return p
        };
        var m = function(w) {
            var v = n(w);
            var s = [];
            var q = s;
            var p = [];
            for (var t = 0, o = v.length; t < o; t += 1) {
                if (v[t][1] === undefined) {
                    var r = a(["", "", "text", 'innerHTML="' + v[t][0] + '"', ""]);
                    q.push(r)
                }
                if (v[t][1] === "") {
                    if (h(v[t][0]) == "") {
                        continue
                    } else {
                        if (/^\<[^\>]+\>$/.test(v[t][0])) {
                            var r = a(v[t]);
                            q.push(r);
                            if (!/\/\s*>$/.test(v[t][0])) {
                                r.list = [];
                                q = r.list;
                                p.push(q)
                            }
                        } else {
                            var r = a(["", "", "text", 'innerHTML="' + v[t][0] + '"', ""]);
                            if (h(v[t][0]).replace(/\r|\n/ig, "")) {
                                q.push(r)
                            }
                        }
                    }
                }
                if (v[t][1] === "/") {
                    p.pop();
                    if (p.length === 0) {
                        q = s
                    } else {
                        q = p[p.length - 1]
                    }
                }
            }
            return s
        };
        var a = function(p) {
            var o = {};
            o.tag = p[2];
            o.attr = f(p[3]);
            return o
        };
        var n = function(s) {
            var q = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
            var o, r;
            var p = [];
            while ((o = q.exec(s))) {
                var t = [];
                for (r = 0; r < o.length; r += 1) {
                    t.push(o[r])
                }
                p.push(t)
            }
            return p
        };
        App.builder2 = function(o) {
            var p = {};
            p.box = null;
            p.domList = {};
            p.actList = {};
            if (o.box) {
                p.box = o.box
            } else {
                p.box = $C("DIV")
            }
            if (o.template) {
                if (typeof o.template === "string") {
                    o.template = m(o.template)
                }
                l(p.box, o.template, p)
            }
            return p
        }
    })();
Core.Dom.getLeft = function(a) {
        var f = 0;
        var b = $E(a);
        if (b.offsetParent) {
            while (b.offsetParent) {
                f += b.offsetLeft;
                b = b.offsetParent
            }
        } else {
            if (b.x) {
                f += b.x
            }
        }
        return f
    };
App.square_pop = function() {
        if (!$E("square_pop")) {
            return false
        }
        var o = Core.Events.addEvent;
        var l = Core.Events.getEventTarget;
        var p = Core.Events.stopEvent;
        var q = Core.Dom.getElementsByClass;
        var g = Core.Dom.getLeft;
        var m = Core.Dom.getXY;
        var k = null;
        var f = {
            oSquare: $E("gotosquare"),
            oPop: $E("square_pop")
        };
        var r = q(f.oPop, "div", "arrows")[0];
        var n = 0;
        var b = 0;
        var t = 0;
        var a = function(z, y) {
            n = r.offsetLeft;
            b = r.offsetHeight;
            var v = Core.Dom.getElementsByClass(document, "div", "MIB_trayMain_txt")[0];
            t = m(v)[1] + v.offsetHeight + b;
            var x = (g(z) + (z.offsetWidth / 2) - n) + "px";
            var w = t + "px";
            y.style.left = x;
            y.style.top = w
        };
        var j = function() {
            clearInterval(k)
        };
        var s = function(v) {
            v.style.display = "";
            a(f.oSquare, f.oPop);
            o(document.body, h, "mouseover")
        };
        var h = function() {
            var v = Core.Events.fixEvent(Core.Events.getEvent());
            var x = l(Core.Events.getEvent());
            var w = v.clientY;
            var y = v.clientX;
            var z = m(f.oSquare);
            while (x) {
                if ((x == f.oPop || x == f.oSquare) || (y >= z[0] && y <= z[0] + f.oSquare.offsetWidth && w < t)) {
                    return true
                }
                if (x != document.body) {
                    x = x.parentNode
                } else {
                    break
                }
            }
            j();
            f.oPop.style.display = "none";
            Core.Events.removeEvent(document.body, h, "mouseover")
        };
        o(f.oSquare, (function() {
            return function() {
                s(f.oPop)
            }
        })(), "mouseover")
    };
App.Clip = function(b, f) {
        var k = {};
        var l = f || {};
        var a, h, j, m;
        var g = function(q, n, r) {
            var o = {};
            o.left = (n.left && n.left + "px") || "auto";
            o.right = n.right || "auto";
            o.top = n.top || "auto";
            o.bottom = n.bottom || "auto";
            o.endPixel = n.endPixel || 0;
            q.style.clip = "rect(" + o.top + "," + o.right + "," + o.bottom + "," + o.left + ")";
            var p = 0;
            if (!a) {
                a = window.setInterval(function() {
                    r(o)
                }, 1)
            }
        };
        k.stopClip = function() {
            clearInterval(a);
            m(l);
            a = null
        };
        k.startClip = function() {
            b.style.visibility = "visible";
            g(b, f, h)
        };
        switch (l.clipType) {
        case "1":
            m = function(n) {
                j = parseInt(n.right || "0")
            };
            h = function(n) {
                j += l.clipspeed || 2;
                b.style.clip = "rect(" + n.top + "," + j + "px," + n.bottom + "," + n.right + ")";
                if (j >= parseInt(n.endPixel)) {
                    clearInterval(a)
                }
            };
            m(l);
            break;
        case "2":
            m = function(n) {
                j = parseInt(n.bottom || "0")
            };
            h = function(n) {
                j += l.clipspeed || 2;
                b.style.clip = "rect(" + n.top + "," + n.right + "," + j + "px," + n.left + ")";
                if (j >= parseInt(n.endPixel)) {
                    clearInterval(a)
                }
            };
            m(l);
            break
        }
        return k
    };
if (App.cartoon === undefined) {
        App.cartoon = {}
    }(function(a) {
        a.noticeInput = function(j, h) {
            if (!j) {
                throw "noticeInput need an element"
            }
            if (!h) {
                h = {}
            }
            var g = h.orbit || ["#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
            var l = h.times || 2;
            var f = h.delay || 2;
            var b = 0;
            var k = App.timer.add(function() {
                if (b / f >= g.length) {
                    l -= 1;
                    if (l > 0) {
                        b = 0
                    } else {
                        App.timer.remove(k);
                        return false
                    }
                }
                j.style.backgroundColor = g[b / f];
                b += 1
            });
            return false
        }
    })(App.cartoon);
Core.Dom.getTop = function(a) {
        var f = 0;
        var b = $E(a);
        if (b.offsetParent) {
            while (b.offsetParent) {
                f += b.offsetTop;
                b = b.offsetParent
            }
        } else {
            if (b.y) {
                f += b.y
            }
        }
        return f
    };
App.skin_pop = function() {
        if (!$E("skin_tip")) {
            return false
        }
        var l = Core.Events.addEvent;
        var j = Core.Events.getEventTarget;
        var m = Core.Events.stopEvent;
        var n = Core.Dom.getElementsByClass;
        var b = Core.Dom.getLeft;
        var o = Core.Dom.getTop;
        var k = Core.Dom.getXY;
        var h = null;
        var g = '<div id="skin_showtip" style="display:none;z-Index:999" class="pertemplate"><p><a href="/person/myskin.php">' + $CLTMSG.CC5701 + '</a></p><img title="" class="icon_pertemplate" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"></div>';
        Core.Dom.insertHTML(document.body, g, "beforeend");
        var a = {
            oSkin: $E("skin_tip"),
            oPop: $E("skin_showtip")
        };
        var p = function(v) {
            var r = b(a.oSkin);
            var q = o(a.oSkin);
            var t = (r - 38) + "px";
            var s = (q - 36) + "px";
            v.style.left = t;
            v.style.top = s;
            v.style.display = "";
            l(document.body, f, "mouseover")
        };
        var f = function() {
            var q = Core.Events.fixEvent(Core.Events.getEvent());
            var r = j(Core.Events.getEvent());
            while (r) {
                if ((r == a.oPop || r == a.oSkin.parentNode)) {
                    return true
                }
                if (r != document.body) {
                    r = r.parentNode
                } else {
                    break
                }
            }
            a.oPop.style.display = "none";
            Core.Events.removeEvent(document.body, f, "mouseover")
        };
        l(a.oSkin, (function() {
            return function() {
                p(a.oPop)
            }
        })(), "mouseover")
    };
$registJob("initSearch", function() {
        Core.Events.addEvent($E("m_keyword"), App.focusblur, "blur");
        App.square_pop();
        App.skin_pop();
        App.search("m_keyword", "m_submit", "m_search", 30, (scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
        $E("m_keyword").value = (scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002
    });
App.search = function(k, j, a, f, g, m) {
        var f = f || 30;
        var n = $E(k);
        var j = $E(j);
        var a = $E(a);
        Utils.Sinput.limitMaxLen(n, f);
        var l = new App.autoSelect({
            input: n,
            id: n.id + "_tip",
            subbtn: j,
            panel: a,
            maxlen: 12
        });
        var h = {
            0: "/k/",
            1: "/search/user.php?search="
        };
        if (scope.$FW == 0 && m !== undefined) {
            l.curIndex = m
        }
        function b(q) {
            var r = Core.String.trim(n.value);
            r = Core.String.leftB(r, f);
            if (r === ((scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002) || r === "") {
                n.focus();
                return App.cartoon.noticeInput(n)
            }
            if (r && r != g) {
                var o;
                switch ($CONFIG.$pageid) {
                case "myprofile":
                    if (window.location.href.indexOf("atme") !== -1) {
                        o = "Aboutme_header"
                    } else {
                        o = "Index_header"
                    }
                    break;
                case "miniblog_invite_search":
                    o = "User_header";
                    break;
                case "commentHandler":
                    o = "Comments_header";
                    break;
                case "favorite":
                    o = "favs_header";
                    break;
                case "follow":
                    if ((window.location.href.indexOf("attention") !== -1) || (window.location.href.indexOf("follow") !== -1)) {
                        o = "Friends_header"
                    } else {
                        o = "fans_header"
                    }
                    break;
                case "mobile":
                    o = "Mobile_header";
                    break;
                case "contactlist" || "talklist":
                    o = "messages_header";
                    break;
                case "mymblog":
                    o = "Profile_header";
                    break;
                case "skin":
                    o = "Skin_header";
                    break
                }
                var p = h[scope.$FW == 0 ? l.curIndex : 1] + encodeURIComponent(encodeURIComponent(r));
                location.href = p.indexOf("?") === -1 ? p + "?Refer=" + o : p + "&Refer=" + o
            } else {
                n.focus()
            }
            Core.Events.stopEvent(q)
        }
        Core.Events.addEvent(j, b, "click");
        App.enterSubmit({
            parent: a,
            action: function(o) {
                Core.Events.fireEvent(j, "click")
            }
        })
    };
App.autoSelect = function(a) {
        this.panel = a.panel;
        this.input = $E(a.input);
        this.maxLen = a.maxlen || 4 * 2;
        this.subbtn = a.subbtn;
        this.initHTML(a.id);
        this.clip = App.Clip($E(a.id), {
            clipType: "2",
            bottom: "0px",
            endPixel: "200px",
            clipspeed: 4
        });
        Core.Events.addEvent(this.input, this.fileElement.bind2(this), "focus");
        scope.$FW == 0 && Core.Events.addEvent(this.input, this.keydown.bind2(this), "keydown");
        scope.$FW == 0 && Core.Events.addEvent(this.input, this.fileElement.bind2(this), "keyup");
        scope.$FW == 0 && Core.Events.addEvent(document.body, this.removeElement.bind2(this), "click")
    };
App.autoSelect.prototype = {
        initHTML: function(a) {
            var b = $E(a);
            var l = "<span>" + $CLTMSG.CD0002 + '</span><ul id="#{id}_content">' + $CLTMSG.CD0003 + "</ul>";
            l = l.replace(/#\{id\}/g, a);
            b.innerHTML = l;
            var m = $E("m_keyword").value.replace(/^\s+|\s+$/g, "");
            var h = m == "" || m == ((scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
            App.Dom.getBy(function(n) {
                if (n.getAttribute("act") == "def") {
                    n.style.display = h ? "" : "none"
                }
                if (n.getAttribute("act") == "isinput") {
                    n.style.display = !h ? "" : "none"
                }
            }, "span", $E("m_keyword_tip"));
            b.style.zIndex = 300;
            b.style.left = (Core.Dom.getXY(this.input)[0] - Core.Dom.getXY(b.parentNode)[0]) + "px";
            b.style.top = (Core.Dom.getElementsByClass(b.parentNode, "div", "head_menu")[0].offsetTop + this.panel.offsetTop + this.panel.offsetHeight) + "px";
            b.style.width = this.input.offsetWidth + "px";
            this.wrap = b;
            this.searchBlog = $E(a + "_blog");
            this.searchAuthor = $E(a + "_author");
            this.curIndex = 0;
            this.elements = $E(a + "_content").getElementsByTagName("li");
            var g = this;
            for (var k = 0, j = this.elements, f; k < j.length; k++) {
                var f = j[k];
                f.onclick = Core.Function.bind3(g.setCurElement, g, [k, f, "click"]);
                f.onmouseover = Core.Function.bind3(g.setCurElement, g, [k, f, "mouseover"]);
                f.onmouseout = Core.Function.bind3(g.setCurElement, g, [k, f, "mouseout"])
            }
        },
        setCurElement: function(b, g, f) {
            var h = Core.Events.getEvent();
            this.curIndex = b;
            this.curElement = g;
            this.complete();
            this.curElement = this.elements[this.curIndex];
            if (f == "mouseout") {
                var a = h.relatedTarget || h.toElement;
                if (a && a.nodeType == 1) {
                    if (a.tagName.toLowerCase() == "li") {
                        this.elements[this.curIndex].className = ""
                    }
                }
            }
            if (f == "mouseover") {
                this.setBackGroud(g)
            }
            if (f == "click") {
                Core.Events.fireEvent(this.subbtn, "click");
                Core.Events.stopEvent(h);
                return false
            }
        },
        setBackGroud: function(g) {
            for (var f = 0, a = this.elements.length, b = this.elements; f < a; f++) {
                var h = b[f];
                if (h != g) {
                    h.className = ""
                } else {
                    h.className = "cur"
                }
            }
        },
        fileElement: function(b) {
            if (App.focusblur) {
                App.focusblur()
            }
            if (scope.$FW == 1) {
                return
            }
            var b = Core.Events.getEvent();
            var g = this.input.value;
            g = Core.String.trim(g);
            var a = $E("m_keyword").value.replace(/^\s+|\s+$/g, "");
            var f = a == "" || a == ((scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
            if (f) {
                this.wrap.style.display = "none"
            } else {
                this.wrap.style.display = "";
                this.clipStart()
            }
            if (Core.String.byteLength(g) > this.maxLen) {
                g = Core.String.leftB(g, this.maxLen - 1) + "..."
            }
            this.searchBlog.innerHTML = Core.String.encodeHTML(g);
            this.searchAuthor.innerHTML = Core.String.encodeHTML(g);
            Core.Events.addEvent(this.input, function() {
                var h = $E("m_keyword").value.replace(/^\s+|\s+$/g, "");
                var j = h == "" || h == ((scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002);
                App.Dom.getBy(function(k) {
                    if (k.getAttribute("act") == "def") {
                        k.style.display = j ? "" : "none"
                    }
                    if (k.getAttribute("act") == "isinput") {
                        k.style.display = !j ? "" : "none"
                    }
                    if (k.getAttribute("act") == "txt") {
                        k.innerHTML = h
                    }
                }, "span", $E("m_keyword_tip"))
            }, "keyup");
            return this
        },
        keydown: function(a) {
            a = a || window.event;
            if (a.keyCode == "38" || a.keyCode == "37") {
                this.curIndex--
            }
            if (a.keyCode == "40" || a.keyCode == "39") {
                this.curIndex++
            }
            this.curIndex = this.complete();
            if (this.curElement == this.elements[this.curIndex]) {
                return true
            }
            if (this.curElement) {
                this.curElement.className = "";
                this.curElement = null
            }
            this.curElement = this.elements[this.curIndex];
            this.curElement.className = "cur";
            this.url = this.curElement.getAttribute("url")
        },
        clipStart: function() {
            if (this.wrap.style.visibility != "visible") {
                this.clip.startClip()
            }
        },
        complete: function() {
            if (this.curIndex < 0) {
                this.curIndex = this.elements.length - 1
            }
            if (this.curIndex >= this.elements.length) {
                this.curIndex = 0
            }
            return this.curIndex
        },
        removeElement: function() {
            this.wrap.style.visibility = "hidden";
            this.clip.stopClip();
            this.wrap.style.display = "none"
        }
    };
    (function() {
        var g = function(m) {
            if (m) {
                for (var l in m) {
                    scope[l] = m[l]
                }
            }
        };
        var a = App.builder2({
            template: '<div class="inter_tip" id="outer" style="position:absolute"><div class="tipcontent" id="inner"></div><div class="tipbt"></div></div>'
        });
        var h = function() {
            document.body.appendChild(a.domList.outer);
            a.domList.outer.style.zIndex = 200;
            var l = Core.Dom.getXY($E("cancelfollow"));
            a.domList.outer.style.left = (l[0] - 45) + "px";
            a.domList.outer.style.top = (l[1] - 70) + "px";
            a.domList.inner.innerHTML = $CLTMSG.CY0107
        };
        var b = function() {
            if ($E("cancelfollow")) {
                h();
                $E("cancelfollow").onmouseover = function() {
                    a.domList.outer.style.display = ""
                };
                $E("cancelfollow").onmouseout = function() {
                    a.domList.outer.style.display = "none"
                };
                a.domList.outer.style.display = "none"
            } else {
                a.domList.outer.style.display = "none";
                setTimeout(b, 2000)
            }
        };
        b();
        var k = function(n) {
            var m = [];
            if (typeof n == "string" || n == null) {
                return n
            }
            if (typeof n == "object") {
                if (!n.sort) {
                    m[0] = "{";
                    for (var l in n) {
                        m[m.length] = l;
                        m[m.length] = ":";
                        m[m.length] = "'" + k(n[l]) + "'";
                        m[m.length] = ","
                    }
                    m[m.length - 1] = "}"
                }
            }
            return m.join("")
        };
        var j;
        var f = function() {
            for (var l = 0; l < j.length; l++) {
                if (!j[l].element) {
                    continue
                }
                j[l].element.innerHTML = j[l].html;
                if (j[l].classname) {
                    j[l].element.className = j[l].classname
                }
            }
        };
        App.followOper = function(o, s, m, r, F, t) {
            scope._uid_ = s;
            if (!scope.$uid) {
                location.replace("/login.php?url=" + encodeURIComponent(location.href));
                return false
            }
            if (scope.$cuser_status === "nofull") {
                App.finishInformation();
                return false
            }
            var E = 1;
            var q = "";
            var z = $C("div");
            z.id = "atnRelation";
            var l = t ? ("," + k(t)) : "";
            var n = $E("pop_3") || $E("atnRelation") || m.parentNode;
            try {
                if (o == "add") {
                    b();
                    q = "/attention/aj_addfollow.php";
                    if (t) {
                        q += ("?" + App.jsonToQuery(t))
                    }
                    j = [{
                        element: z,
                        html: n.innerHTML,
                        classname: n.className},{
                        element: $E("more_handle") || null,
                        html: ($E("more_handle") && $E("more_handle").innerHTML) || null,
                        classname: ""}];
                    if (scope.isfans) {
                        z.className = "MIB_btn_inter lf";
                        z.innerHTML = $CLTMSG.CY0105 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.removeFollow(\'' + s + "',this,'" + F + "'" + l + ')" href="javascript:void(0);"><em>' + $CLTMSG.CD0005 + "</em></a>"
                    } else {
                        z.className = "MIB_btn2 lf";
                        z.innerHTML = $CLTMSG.CD0004 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.removeFollow(\'' + s + "',this,'" + F + "'" + l + ')" href="javascript:void(0);"><em>' + $CLTMSG.CD0005 + "</em></a>"
                    }
                    if (scope.$pageid == "profile" && Core.Dom.getElementsByClass(document, "DIV", "roommate").length > 0) {
                        Core.Dom.getElementsByClass(document, "DIV", "roommate")[0].style.display = "";
                        var x = Core.Dom.getElementsByClass(document, "DIV", "roommate")[0];
                        var D = Core.Dom.getElementsByAttr(x, "action", "groupselector")[0];
                        var C = App.group_selector.person(D);
                        (function(p) {
                            D.onclick = function(G) {
                                App.group_selector.dropBox.moveTo(p).show();
                                Core.Events.stopEvent(G)
                            }
                        })(C)
                    }
                    b();
                    Core.Dom.replaceNode(z, n);
                    $E("more_handle") && (function() {
                        $E("more_handle").innerHTML = ""
                    })()
                } else {
                    if (o === "remove") {
                        q = "/attention/aj_delfollow.php";
                        if (scope.$pageid == "profile" && Core.Dom.getElementsByClass(document, "DIV", "roommate").length > 0) {
                            var x = Core.Dom.getElementsByClass(document, "DIV", "roommate")[0];
                            x.style.display = "none";
                            Core.Dom.getElementsByAttr(x, "action", "groupselector")[0].setAttribute("groupids", "");
                            Core.Dom.getElementsByClass(document, "DIV", "downmenu downmenuAttr")[0].style.display = "none"
                        }
                        j = [{
                            element: z,
                            html: n.innerHTML,
                            classname: n.className},{
                            element: $E("more_handle") || null,
                            html: ($E("more_handle") && $E("more_handle").innerHTML) || null,
                            classname: ""}];
                        z.className = "MIB_btn lf";
                        var A = scope.$BASEIMG + "style/images/common/transparent.gif";
                        var v = scope.isfans ? '<img class="ico_addGrn" title="' + scope.sex + $CLTMSG.CC6108 + '" alt="" src="' + A + '" />					<em>						<img class="SG_icon add_icoz" alt="" src="' + A + '">									' + $CLTMSG.CD0006 + "						</em>" : '<img class="SG_icon" src="' + A + '" title="' + $CLTMSG.CD0006 + '" />					<em>' + $CLTMSG.CD0006 + "</em>";
                        z.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"if(typeof _S_uaTrack =='function'){_S_uaTrack('tblog_attention_click','" + s + "')};App.followOne('" + s + "',this,'" + F + "'" + l + ')" class="btn_add">' + v + "</a>";
                        b();
                        Core.Dom.replaceNode(z, n);
                        $E("more_handle") && (function() {
                            $E("more_handle").innerHTML = ""
                        })()
                    } else {
                        if (o === "delfans") {
                            q = "/attention/aj_delfollow.php"
                        }
                    }
                }
            } catch (B) {}
            function y(G, p) {
                if (m) {
                    m.ask_following = true
                }
                setTimeout(function() {
                    try {
                        if (scope.$pageid == "profile") {
                            if (G) {
                                g(G.global);
                                if (G.html && $E("more_handle")) {
                                    $E("more_handle").innerHTML = G.html
                                }
                                if (o === "add") {
                                    App.grpDialog(scope.setGroup, false, t, true);
                                    Core.Events.addEvent($E("moreact"), function() {
                                        App.profile_moreact($E("moreact"), "", t)
                                    }, "mouseover");
                                    if ($E("remark_name")) {
                                        $E("remark_name").innerHTML = "&nbsp;(" + $CLTMSG.ZB0007 + ")";
                                        $E("remark_name").style.display = "";
                                        if (App._remarks_[s]) {
                                            App._remarks_[s] = ""
                                        }
                                    }
                                } else {
                                    if (o === "delfans") {
                                        if (G.global.isfollow) {
                                            z.className = "MIB_btn2 lf";
                                            z.innerHTML = $CLTMSG.CD0004 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.removeFollow(\'' + s + "',this,'" + F + "'" + l + ')" href="javascript:void(0);"><em>' + $CLTMSG.CD0005 + "</em></a>";
                                            Core.Dom.replaceNode(z, n)
                                        }
                                        Core.Events.addEvent($E("moreact"), function() {
                                            App.profile_moreact($E("moreact"), "", t)
                                        }, "mouseover");
                                        b()
                                    } else {
                                        if (o === "remove") {
                                            if (scope.setGroup) {
                                                scope.setGroup.show = false;
                                                scope.setGroup.gids = ""
                                            }
                                            if (scope.nickname) {
                                                scope.nickname.show = false;
                                                scope.nickname.remarkName = "";
                                                if ($E("remark_name")) {
                                                    $E("remark_name").innerHTML = "";
                                                    $E("remark_name").style.display = "none"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } catch (H) {}
                }, E)
            }
            function w(p) {
                if (m) {
                    m.ask_following = false
                }
                if (scope.$pageid == "profile") {
                    f()
                }
                if (p && p.code == "MR0050") {
                    App.forbidrefresh(function() {
                        r.retcode = scope.doorretcode;
                        App.doRequest(r, q, y, w)
                    }, "/attention/aj_addfollow.php")
                } else {
                    App.flyDialog(p, null, null, {
                        ok: function() {
                            if (scope.$uid == "123456") {
                                location.reload()
                            }
                        }
                    })
                }
            }
            App.doRequest(r, q, y, w)
        }
    })();
App.followOne = function(g, h, f, b) {
        if (h.ask_following) {
            return false
        }
        var j = {
            uid: g,
            fromuid: scope.$uid
        };
        if (typeof b === "object") {
            for (var a in b) {
                j[a] = b[a]
            }
        }
        App.followOper("add", g, h, j, f, b)
    };
App.removeFollow = function(j, b, a, l) {
        var m = Core.Dom.getXY(b);
        var o = m[0] - ((200 - b.offsetWidth) / 2);
        var n = m[1] - (b.offsetHeight) - 70;
        var f = [$CLTMSG.CD0007, a, "?"].join("");
        var g = {
            touid: j,
            fromuid: scope.$uid
        };
        for (var h in l) {
            g[h] = l[h]
        }
        App.PopUpConfirm().position(o, n).content(f).icon(4).yes(function() {
            setTimeout(function() {
                App.followOper("remove", j, b, g, a, l)
            }, 300)
        }).no(function() {
            b.isOpened = null
        }).wipe("up", true)
    };
App.removeFans = function(j, b, a, l) {
        var m = Core.Dom.getXY(b);
        var o = m[0] - ((200 - b.offsetWidth) / 2);
        var n = m[1] - (b.offsetHeight) - 70;
        var f = [$CLTMSG.CD0007, a, "?"].join("");
        var g = {
            touid: j,
            fromuid: scope.$uid,
            action: 1
        };
        for (var h in l) {
            g[h] = l[h]
        }
        App.PopUpConfirm().position(o, n).content(f).icon(4).yes(function() {
            setTimeout(function() {
                App.followOper("delfans", j, b, g, a, l)
            }, 300)
        }).no(function() {
            b.isOpened = null
        }).wipe("up", true)
    };
App.focusblur = function() {
        var b = Core.Events.getEventTarget();
        var f = Core.Events.getEvent();
        var a = (scope.$FW == 0) ? $CLTMSG.WL0001 : $CLTMSG.WL0002;
        a = a || $CLTMSG.CD0008;
        if (f.type == "focus") {
            if (b.value == a || b.value == $CLTMSG.CD0008) {
                b.value = ""
            }
        }
        if (f.type == "blur") {
            if (b.value == "") {
                b.value = a;
                if ($E("m_keyword_tip")) {
                    $E("m_keyword_tip").style.display = "none"
                }
            }
        }
    };
    (function(a) {
        a.tabs = function(f) {
            var h = {};
            f.current = f.current || 0;
            for (var g = 0, b = f.data.length; g < b; g += 1) {
                Core.Events.addEvent(f.data[g].tab, (function(j) {
                    return function() {
                        if (f.current >= 0) {
                            f.darkAction(f.data[f.current], j)
                        }
                        f.current = j;
                        f.lightAction(f.data[f.current], j)
                    }
                })(g), "click")
            }
            h.fire = function(j) {
                Core.Events.fireEvent(f.data[j]["tab"], "click")
            };
            return h
        }
    })(App);
    (function() {
        App.storage = (function() {
            var a = window.localStorage;
            if (window.ActiveXObject) {
                store = document.documentElement;
                STORE_NAME = "localstorage";
                try {
                    store.addBehavior("#default#userdata");
                    store.save(STORE_NAME)
                } catch (b) {}
                return {
                    set: function(f, g) {
                        try {
                            store.setAttribute(f, g);
                            store.save(STORE_NAME)
                        } catch (h) {}
                    },
                    get: function(f) {
                        try {
                            store.load(STORE_NAME);
                            return store.getAttribute(f)
                        } catch (g) {
                            return ""
                        }
                    },
                    del: function(f) {
                        try {
                            store.removeAttribute(f);
                            store.save(STORE_NAME)
                        } catch (g) {}
                    }
                }
            } else {
                if (a) {
                    return {
                        get: function(f) {
                            return a.getItem(f) == null ? null : unescape(a.getItem(f))
                        },
                        set: function(f, g, h) {
                            a.setItem(f, escape(g))
                        },
                        del: function(f) {
                            a.removeItem(f)
                        },
                        clear: function() {
                            a.clear()
                        },
                        getAll: function() {
                            var f = a.length,
                                h = null,
                                j = [];
                            for (var g = 0; g < f; g++) {
                                    h = a.key(g),
                                    j.push(h + "=" + this.getKey(h))
                                }
                            return j.join("; ")
                        }
                    }
                } else {
                    return {
                        get: function(k) {
                            var h = document.cookie.split("; "),
                                g = h.length,
                                f = [];
                            for (var j = 0; j < g; j++) {
                                    f = h[j].split("=");
                                    if (k === f[0]) {
                                        return unescape(f[1])
                                    }
                                }
                            return null
                        },
                        set: function(f, g, h) {
                            if (!(h && typeof h === date)) {
                                h = new Date(),
                                h.setDate(h.getDate() + 1)
                            }
                            document.cookie = f + "=" + escape(g) + "; expires=" + h.toGMTString()
                        },
                        del: function(f) {
                            document.cookie = f + "=''; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
                        },
                        clear: function() {
                            var h = document.cookie.split("; "),
                                g = h.length,
                                f = [];
                            for (var j = 0; j < g; j++) {
                                    f = h[j].split("=");
                                    this.deleteKey(f[0])
                                }
                        },
                        getAll: function() {
                            return unescape(document.cookie.toString())
                        }
                    }
                }
            }
        })()
    })();
    (function(a) {
        a.getLength = function(n, f) {
            f = f || {};
            f.max = f.max || 140;
            f.min = f.min || 41;
            f.surl = f.surl || 20;
            var m = Core.String.trim(n).length;
            if (m > 0) {
                var h = f.min,
                    p = f.max,
                    b = f.surl,
                    k = n;
                var o = n.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z\$\.\+\!\*\(\)//,:;@&=\?\~\#\%]*)*/gi) || [];
                var g = 0;
                for (var j = 0, m = o.length; j < m; j++) {
                        var l = Core.String.byteLength(o[j]);
                        if (/^(http:\/\/t.cn)/.test(o[j])) {
                            continue
                        } else {
                            if (/^(http:\/\/)+(weibo.com|weibo.cn)/.test(o[j])) {
                                g += l <= h ? l : (l <= p ? b : (l - p + b))
                            } else {
                                g += l <= p ? b : (l - p + b)
                            }
                        }
                        k = k.replace(o[j], "")
                    }
                return Math.ceil((g + Core.String.byteLength(k)) / 2)
            } else {
                return 0
            }
        }
    })(App);
    (function(a) {
        a.miniblogPublisher = function(q, z) {
            z.init = z.init ||
            function() {};
            if (!q) {
                throw "publisher need elements as parameters"
            }
            var j = {};
            var h = {};
            var A = true;
            h.pluginList = [];
            h.content = "";
            h.pic = [];
            var y = function() {
                if (z.topic) {
                    q.editor.value = "#" + z.topic + "#"
                } else {
                    q.editor.value = ""
                }
                x();
                h.pic = [];
                for (var D = 0, C = h.pluginList.length; D < C; D += 1) {
                    if (typeof h.pluginList[D].clear == "function") {
                        try {
                            h.pluginList[D].clear()
                        } catch (E) {}
                    }
                }
            };
            var g = function(C, D) {
                y();
                z.onSuccess(C, D);
                m.clear()
            };
            var w = function(C) {
                if (C && C.code) {
                    if (C.code == "MR0050") {
                        App.forbidrefresh(function() {
                            App.Dom.removeClass(q.submit.parentNode, " bgColorA_No");
                            n()
                        }, "/mblog/publish.php");
                        return false
                    }
                    App.alert({
                        code: C.code
                    })
                } else {
                    App.alert({
                        code: "R01404"
                    })
                }
                z.onError(C)
            };
            var f = function(D) {
                var C = new RegExp(z.emptyStr[0], "g");
                return App.getLength(D.replace(C, ""))
            };
            var m = {
                cashKey: "pub_" + $CONFIG.$uid,
                save: function() {
                    if (Core.Base.detect.$IOS) {
                        return
                    }
                    App.storage.set(m.cashKey, Core.String.trim(q.editor.value))
                },
                recover: function() {
                    if (Core.Base.detect.$IOS) {
                        return
                    }
                    var D = App.storage.get(m.cashKey) == null ? "" : App.storage.get(m.cashKey);
                    if (scope.defaultKeyword) {
                        var C = D.split(scope.defaultKeyword);
                        if (C.length <= 1) {
                            D = scope.defaultKeyword + D + " "
                        }
                    }
                    q.editor.value = D;
                    scope.defaultKeyword && App.TextareaUtils.setCursor(q.editor, scope.defaultKeyword.length)
                },
                clear: function(C) {
                    if (Core.Base.detect.$IOS) {
                        return
                    }
                    App.storage.set(m.cashKey, "")
                },
                action: function() {
                    var C = f(q.editor.value);
                    if (C <= 140) {
                        m.save()
                    }
                },
                casheCur: function(F) {
                    var D = App.TextareaUtils.getSelectedText(q.editor);
                    var E = (D == "" || D == null) ? 0 : D.length;
                    var G = App.TextareaUtils.getCursorPos(q.editor);
                    var C = G + "&" + E;
                    q.editor.setAttribute("range", C)
                },
                getCur: function() {
                    var C = q.editor.getAttribute("range");
                    return C.split("&")
                }
            };
            var k = function(D) {
                var C = f(q.editor.value);
                if (typeof D === "function") {
                    D(C)
                }
                if (C > 0 && C <= 140) {
                    return true
                } else {
                    return false
                }
            };
            var x = function(C) {
                if (!A) {
                    return
                }
                if (C && C.ctrlKey == true && (C.keyCode == "13" || C.keyCode == "10")) {
                    return
                }
                if (k(z.onLimit)) {
                    o();
                    m.save()
                } else {
                    r()
                }
            };
            var r = function() {
                z.onDisable()
            };
            var o = function() {
                z.onEnable()
            };
            var B = function(D) {
                var C = true;
                if (!scope.loginKit().isLogin) {
                    App.ModLogin({
                        func: function() {
                            D.callee.apply(D)
                        }
                    });
                    C = false
                }
                return C
            };
            var n = function() {
                if (!B(arguments)) {
                    return
                }
                if (App.Dom.hasClass(q.submit.parentNode, "bgColorA_No")) {
                    if (!k()) {
                        App.cartoon.noticeInput(q.editor)
                    }
                    return false
                }
                r();
                h.content = Core.String.trim(q.editor.value || "");
                m.clear();
                b(h.content, h.pic, g, w, z.styleId, z.topic, q.editor.getAttribute("ptype") || "");
                return false
            };
            var v = function(C) {
                if (C.ctrlKey == true && C.keyCode == "13") {
                    n()
                }
                return false
            };
            var l, p = 0;
            var s = function() {
                if (p >= 30) {
                    if (k(z.onLimit)) {
                        o();
                        m.save()
                    } else {
                        r()
                    }
                    p = 0
                }
                p++
            };
            var t = function(C) {
                switch (C.type) {
                case "focus":
                    if (!l) {
                        l = App.timer.add(function() {
                            s()
                        })
                    }
                    App.timer.play(l);
                    break;
                case "blur":
                    App.timer.pause(l);
                    break
                }
            };
            Core.Events.addEvent(q.editor, t, "focus");
            Core.Events.addEvent(q.editor, t, "blur");
            App.BindAtToTextarea(q.editor);
            Core.Events.addEvent(q.submit, n, "click");
            Core.Events.addEvent(q.editor, v, "keyup");
            Core.Events.addEvent(q.editor, m.action, "keyup");
            Core.Events.addEvent(q.editor, m.casheCur, "mouseup");
            Core.Events.addEvent(q.editor, m.casheCur, "keyup");
            j.casheInput = m.save;
            j.casheCur = m.casheCur;
            j.getCur = m.getCur;
            j.elements = q;
            j.limit = x;
            j.checkLogin = B;
            j.getDom = function(C) {
                return q[C]
            };
            j.set = function(C, D) {
                h[C] = D
            };
            j.get = function(C) {
                return h[C]
            };
            j.plugin = function(C) {
                h.pluginList.push(C);
                C.init(j);
                return j
            };
            j.enabled = function(C) {
                A = C;
                !C ? r() : x()
            };
            j.insertText = function(C, D) {
                D = D ||
                function() {
                    return true
                };
                var E = m.getCur();
                App.TextareaUtils.unCoverInsertText(q.editor, C, {
                    rcs: E[0],
                    rccl: E[1]
                });
                D(j);
                j.limit();
                j.casheCur()
            };
            j.clear = function() {
                y();
                m.clear()
            };
            if (z.init(j)) {
                y();
                m.recover();
                m.casheCur()
            }
            x();
            return j
        };
        var b = function(j, h, o, k, g, n, p) {
            if (typeof j != "string") {
                throw ("The publishRumor need a string as first parameter")
            }
            if (!(h instanceof Array)) {
                throw ("The publishRumor need an array as second parameter")
            }
            if (typeof o != "function") {
                throw ("The publishRumor need a function as thrid parameter")
            }
            if (typeof k != "function") {
                throw ("The publishRumor need a function as fourth parameter")
            }
            if (n) {
                if (j.indexOf(n) === -1) {
                    j = "#" + n + "#" + j
                }
            }
            var f = "/mblog/publish.php";
            var m = {
                content: j.replace(/\uff20/ig, "@"),
                pic: h.join(","),
                styleid: g,
                retcode: scope.doorretcode || ""
            };
            if (scope.appid) {
                m.appid = scope.appid
            }
            var q;
            if (q = a.miniblogPublisher.options) {
                for (var l in q) {
                    if (q[l] && !(l in {})) {
                        m[l] = q[l]
                    }
                }
            }
            f = a.miniblogPublisher.url || f;
            if (scope.$eid) {
                f = "/event/aj_publishmblog.php";
                m.eid = scope.$eid
            }
            p && (m.imgType = p);
            scope.doorretcode = "";
            Utils.Io.Ajax.request(f, {
                POST: m,
                onComplete: function(r) {
                    if (r.code == "A00006") {
                        o(r.data, m)
                    } else {
                        if (r.code == "M00008") {
                            window.location.replace(r.data)
                        } else {
                            k(r)
                        }
                    }
                },
                onException: function() {
                    k()
                },
                returnType: "json"
            })
        }
    })(App);
App.bindUploadImgToFile = function(l, t, m, j) {
        if (!l || !l.type || l.type != "file") {
            throw "传入的对像不是一个文件选择框"
        }
        var r = document,
            p = false,
            q, s, o, h, g, b, k = ("ifr_" + (b = ["up", Math.floor(Math.random() * 10000), new Date().getTime()].join("_"))),
            n, a = "";
        h = $C("div");
        h.style.display = "none";
        h.innerHTML = '<iframe frameborder="0" src="about:blank" id="' + k + '" name="' + k + '" class="fb_img_iframe"></iframe>';
        n = $C(k);
        g = $C("form");
        g.target = k;
        g.encoding = "multipart/form-data";
        g.method = "POST";
        g.action = "http://picupload.t.sina.com.cn/interface/pic_upload.php?marks=" + (scope.$domain ? "1" : "0") + (scope.wm ? "&wm=2" : "") + "&markstr=" + (scope.$domain && encodeURIComponent(scope.$domain.replace("http://", ""))) + "&s=rdxt&app=miniblog&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1";
        r.body.appendChild(h);
        l.parentNode.insertBefore(g, l);
        g.appendChild(l);
        setTimeout(function() {
                l.style.visibility = "visible"
            }, 300);
        q = function() {
                l.value = "";
                m && m()
            };
        o = function() {
                p = false;
                if (!/\.(gif|jpg|png|jpeg)$/i.test(l.value)) {
                    g.reset();
                    App.alert({
                        code: "M07004"
                    });
                    return false
                }
                a = l.value.match(/[^\/|\\]*$/)[0];
                var w = "",
                    v = [a.slice(0, -4), a.slice(-4)],
                    f = Core.String.byteLength(v[0]);
                if (f > 20) {
                        v[0] = Core.String.leftB(v[0], 20);
                        w = "..."
                    }
                a = v.join(w);
                scope.addImgSuccess = function(x) {
                        if (p) {
                            return
                        }
                        scope.addImgSuccess = function() {};
                        if (x && x.ret == "1") {
                            t && t(x, a);
                            g.reset();
                            return
                        }
                        g.reset();
                        App.alert({
                            code: "M07002"
                        }, {
                            width: 400
                        });
                        q()
                    };
                j && j();
                g.submit()
            };
        Core.Events.addEvent(l, o, "change");
        return {
                cancel: function() {
                    p = true;
                    scope.addImgSuccess = function() {};
                    n.location = "about:blank";
                    g.reset();
                    q()
                },
                reset: function() {
                    g.reset()
                }
            }
    };
App.getEventDom = function(b) {
        if (/msie/.test(navigator.userAgent.toLowerCase())) {
            return b.srcElement
        } else {
            var a = b.target;
            while (a.nodeType != 1) {
                a = a.parentNode
            }
            return a
        }
    };
App.isChildNode = function(b, a) {
        while (b) {
            if (b == a) {
                return true
            }
            if (b == document.body) {
                return false
            }
            b = b.parentNode
        }
    };
App.getImgSize = function(b, a) {
        function f() {
            var g = new Image();
            g.onload = function(j) {
                var h = [g.width, g.height];
                setTimeout(function() {
                    a(h);
                    g.onload = null;
                    g = null
                }, 1)
            };
            g.src = b
        }
        f()
    };
    (function(a) {
        a.crc32 = function(j, g) {
            function m(p) {
                p = p.replace(/\r\n/g, "\n");
                var o = "";
                for (var r = 0; r < p.length; r++) {
                    var q = p.charCodeAt(r);
                    if (q < 128) {
                        o += String.fromCharCode(q)
                    } else {
                        if ((q > 127) && (q < 2048)) {
                            o += String.fromCharCode((q >> 6) | 192);
                            o += String.fromCharCode((q & 63) | 128)
                        } else {
                            o += String.fromCharCode((q >> 12) | 224);
                            o += String.fromCharCode(((q >> 6) & 63) | 128);
                            o += String.fromCharCode((q & 63) | 128)
                        }
                    }
                }
                return o
            }
            j = m(j);
            var n = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
            var g;
            if (typeof(g) == "undefined") {
                g = 0
            }
            var l = 0;
            var k = 0;
            g = g ^ (-1);
            for (var f = 0, b = j.length; f < b; f++) {
                k = (g ^ j.charCodeAt(f)) & 255;
                l = "0x" + n.substr(k * 9, 8);
                g = (g >>> 8) ^ l
            }
            var h = g ^ (-1);
            if (h < 0) {
                h = 4294967296 + h
            }
            return h
        }
    })(App);
    (function(a) {
        a.imgURL = function(m, h) {
            h = h || "middle";

            function b(n) {
                n = (n + "").replace(/[^a-f0-9]/gi, "");
                return parseInt(n, 16)
            }
            var g = {
                ss: {
                    middle: "&690",
                    bmiddle: "&690",
                    small: "&690",
                    thumbnail: "&690",
                    square: "&690",
                    orignal: "&690"
                },
                ww: {
                    middle: "bmiddle",
                    large: "large",
                    bmiddle: "bmiddle",
                    small: "small",
                    thumbnail: "thumbnail",
                    square: "square",
                    orignal: "large"
                }
            };
            var l = m.charAt(9) == "w";
            var j = m.charAt(21) == "g" ? ".gif" : ".jpg";
            var k = l ? (App.crc32(m) % 4 + 1) : (b(m.substr(19, 2)) % 16 + 1);
            var f = "http://" + (l ? "ww" : "ss") + k + ".sinaimg.cn/" + (l ? g.ww[h] : h) + "/" + m + (l ? j : "") + (l ? "" : g.ss[h]);
            return f
        }
    })(App);
    (function() {
        var m = "/face/get_face.php";
        var t = document,
            v = t.documentElement || {},
            n = Core.Events,
            h = Core.String,
            r = n.stopEvent,
            o = n.addEvent,
            f = n.removeEvent,
            w = n.fireEvent,
            l = App.simpleAjax,
            s = Core.Dom.getXY,
            k = App.group,
            b = App.popUp,
            g, a = App.removeChildren,
            p;

        function j(y, x) {
                return App.builder3(y, x, {
                    dd: "id",
                    mm: "action"
                })
            }
        var q = function(x) {
                return x.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g, "")
            };
        App.popUpUpload = (function() {
                var D = {},
                    F, A, z = true,
                    H, y, I, x, C = 0,
                    B = 0,
                    J, G = {
                        selected: "cur",
                        unselected: " "
                    },
                    E;
                J = ['<li id="upload"><a href="####" onclick="this.blur();return false;">', $CLTMSG.CL0905, '</a></li><li id="figure"><a href="####" onclick="this.blur();return false;">', $CLTMSG.CL0906, "</a></li>"].join("");
                return function(K, av, at, W, S) {
                        if (!y) {
                            S = S ||
                            function() {};
                            y = App.PopUp().content('<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div id="contentPanel" class="layerBox phiz_layerN"><div id="topPanel" class="layerBoxTop" style="width:100%;"><div class="layerArrow"></div><div class="topCon" id="titlePanel"><ul id="title" class="phiz_menu"></ul><a id="close" title="' + $CLTMSG.CL0701 + '" href="####" onclick="return false" class="close"></a><div class="clearit"></div></div></div><div id="content"></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>');
                            y.zIndex(800);
                            F = j(J, y.dom.title)["domList"];
                            uploadPanel = F.upload;
                            figurePanel = F.figure;
                            var aj = '<div id="upload" class="layerBoxCon" style="display:none"><div class="local_pic" style="position:relative;"><a id="actButton" class="btn_green" style="overflow:hidden;position:relative;" href="javascript:void(0)"><em id="status">' + $CLTMSG.CL0907 + '</em><input type="file" hideFoucs="true" style="outline:none;width:75px;height:25px;" id="file" name="pic1"/></a><p id="tip" class="gray9">' + $CLTMSG.CX0193 + '</p></div></div><div id="uploading" class="layerBoxCon1" style="display:none;width:258px;"><div class="layerMedia"><div class="layerArrow" style="left:25px"></div><div class="statusBox"><span class="status_p"><img src="' + [scope.$BASEIMG, "style/images/common/loading.gif"].join("") + '" />' + $CLTMSG.CC1503 + '...</span><span class="status_b"><a id="cancelButton" href="####" onclick="return false" class="btn_normal"><em>' + $CLTMSG.CX0176 + '</em></a></span></div></div></div><div id="successpanel" class="layerBoxCon1" style="display:none;width:258px;"><div class="layerMedia"><div class="layerArrow" style="left:25px"></div><div class="cur_status"><a id="deleteuploaded" href="####" onclick="return false" class="dele">' + $CLTMSG.CX0043 + '</a><strong id="viewfilename"></strong></div><div class="cur_pic"><center><img id="imgview" /></center></div></div></div><div id="tabNav" class="magicT"><div class="magicTL"><ul id="tab"></ul></div><div class="magicTR"><a href="#" onclick="return false;" id="prevBtn" class="magicbtnL02" title="' + $CLTMSG.CX0076 + '"></a><a href="#" onclick="return false;" id="nextBtn" title="' + $CLTMSG.CX0077 + '" class="magicbtnR02"></a></div><div class="clear"></div></div><div id="illustration" class="layerBoxCon" style="width:100%;display:none"><div class="magic_list"><ul id="norm"></ul><div class="clearit"></div></div><div class="magicB"><div id="pageing" style="visibility:hidden" class="pages"></div></div></div>';
                            var M = j(aj, y.dom.content)["domList"],
                                Y = y.dom.topPanel,
                                U = y.dom.contentPanel,
                                ac = y.dom.titlePanel,
                                ag = M.upload,
                                ad = M.file,
                                T = M.actButton,
                                O = M.tip,
                                ay = M.tab,
                                X = M.prevBtn,
                                ah = M.nextBtn,
                                ar = M.cancelButton,
                                ai = M.uploading,
                                ao = M.successpanel,
                                R = M.deleteuploaded,
                                au = M.viewfilename,
                                ab = M.imgview,
                                ap = M.illustration,
                                az = M.norm,
                                an = M.more,
                                aA = (M.morebox || {})["style"],
                                L = M.morepageing,
                                ae = M.pageing,
                                al = M.morePanel,
                                ak = M.tabNav,
                                aq = M.moretab;
                            p = typeof p === "undefined" ? T : p;
                            var Q = function() {
                                    A && A.cancel();
                                    W();
                                    return false
                                },
                                Z = function(aK) {
                                    z = true;
                                    var aI = "none",
                                        aF = "layerBox phiz_layerN",
                                        aB = "",
                                        aD = "none",
                                        aL = "none",
                                        aH = "none",
                                        aC = "none",
                                        aJ = "none",
                                        aG = "none",
                                        aM = "none",
                                        aE = "378px",
                                        aH = "none";
                                    switch (aK) {
                                        case 0:
                                            aH = "";
                                            aI = "";
                                            aD = "";
                                            S(true);
                                            break;
                                        case 1:
                                            aL = "";
                                            ar.onclick = Q;
                                            z = false;
                                            S(false);
                                            break;
                                        case 2:
                                            aC = "";
                                            viewpanelv = "";
                                            R.onclick = E;
                                            z = false;
                                            setTimeout(function() {
                                                S(true)
                                            }, 1000);
                                            break;
                                        case 3:
                                            aM = "";
                                            aI = "";
                                            aG = "";
                                            aE = "442px";
                                            aF = "layerBox phiz_layerN";
                                            S(true);
                                            break
                                        }
                                    ac.style.width = aE;
                                    ag.style.display = aH;
                                    Y.style.display = aI;
                                    U.className = aF;
                                    ac.style.display = aB;
                                    ai.style.display = aL;
                                    ao.style.display = aC;
                                    ab.style.display = aJ;
                                    ap.style.display = aG;
                                    ak.style.display = aM;
                                    C = aK;
                                    y.visible(true)
                                },
                                af = function() {
                                    Z(1)
                                },
                                P = function(aB, aD) {
                                    ab.src = [scope.$BASECSS, "style/images/common/transparent.gif"].join("");
                                    Z(2);
                                    var aC = App.imgURL(aB, "small");
                                    new App.getImgSize(App.imgURL(aB, "small"), function(aE) {
                                        ab.style.width = aE[0] + "px";
                                        ab.style.height = aE[1] + "px";
                                        ab.src = aC;
                                        w(uploadPanel, "mouseup");
                                        Z(2);
                                        setTimeout(function() {
                                            App.curtain.droop(ab, function() {})
                                        }, 100)
                                    });
                                    W(aB, aD)
                                },
                                aw = function(aD, aC) {
                                    if (aD.pid) {
                                        au.innerHTML = "";
                                        var aB = t.createTextNode(aC);
                                        au.appendChild(aB);
                                        P(aD.pid, "upload")
                                    }
                                },
                                V = function() {
                                    Z(0);
                                    ab.src = null
                                },
                                N = function(aD, aK) {
                                    var aE = 0,
                                        aF = aD.length,
                                        aC = [],
                                        aI, aL, aM, aB, aH = "",
                                        aJ = "",
                                        aG;
                                    for (aE; aE < aF; aE++) {
                                            aI = aD[aE];
                                            aG = q(aI.title);
                                            aC.push(['<li action="icon" title="', aG, '"><a href="####" onclick="return false" class="face_box">', '<img src="', aI.src, '"/></a>', '<span class="face_box_tex">', (h.byteLength(aG) > 8 ? h.leftB(aG, 6) + "..." : aG), "</span>", "</li>"].join(""))
                                        }
                                    a(aK);
                                    aL = j(aC.join(""), aK)["actList"];
                                    aM = aL.icon;
                                    k(aM, function(aP, aO, aQ) {
                                            aP.onclick = function() {
                                                return false
                                            };
                                            var aN = (aN = aD[aO]) && aN.picid;
                                            if (aN) {
                                                P(aN, "cartoon");
                                                au.innerHTML = aD[aO].value
                                            }
                                        })
                                };
                            E = function() {
                                    A && A.reset();
                                    Z(0);
                                    y.visible(false);
                                    W();
                                    return false
                                };
                            if (ad) {
                                    A = App.bindUploadImgToFile(M.file, aw, V, af)
                                }
                            var ax = function(aG, aF, aE) {
                                    var aD = 0,
                                        aB = aG.length,
                                        aC = [];
                                    for (aD; aD < aB; aD++) {
                                            c = aG[aD];
                                            aC.push(['<a action="pb" href="####" onclick="return false">', (aD + 1), "</a>"].join(""))
                                        }
                                    a(aF);
                                    pages = j(aC.join(""), aF)["actList"]["pb"];
                                    if (pages.length < 2) {
                                            aF.style.visibility = "hidden"
                                        } else {
                                            aF.style.visibility = "visible"
                                        }
                                    k(pages, aE, G);
                                    w(pages[0], "mouseup")
                                };
                            var am = function(aP) {
                                    a(ay);
                                    var aI = [{
                                        type: $CLTMSG.CL0914,
                                        icon: aP.data.norm}].concat(aP.data.more);
                                    var aJ = 0,
                                        aM = aI.length,
                                        aN, aC = [],
                                        aO;
                                    for (aJ; aJ < aM; aJ++) {
                                            aN = aI[aJ];
                                            if (!aN || !aN.type) {
                                                continue
                                            }
                                            aC.push('<li style="visibility:hidden"><a action="tabs" onclick="return false;" href="#">' + aN.type + "</a></li>")
                                        }
                                    if (!aC.length) {
                                            return
                                        }
                                    aO = j(aC.join(splitHTML), ay)["actList"]["tabs"];
                                    k(aO, function(aR, aQ) {
                                            aR.onclick = function() {
                                                return false
                                            };
                                            tabIndex = aQ;
                                            ax(aI[aQ].icon, ae, function(aS, aU, aT) {
                                                N(aI[aQ].icon[aU], az);
                                                aS.blur();
                                                return false
                                            });
                                            aR.blur()
                                        }, {
                                            selected: "magicTcur",
                                            unselected: " "
                                        });
                                    w(aO[0], "mouseup");
                                    var aK = 1,
                                        aL = 0,
                                        aE = ay.getElementsByTagName("li"),
                                        aH = aE.length,
                                        aF = [],
                                        aD = 0,
                                        aB = [],
                                        aG;
                                    setTimeout(function() {
                                            for (aL; aL < aH; aL++) {
                                                aE[aL].style.visibility = "visible";
                                                aE[aL].style.display = "";
                                                var aS = aE[aL].innerHTML == "|" ? 8 : aE[aL].offsetWidth;
                                                if (aD + aS > 400) {
                                                    aD = 0;
                                                    aF.push(aB);
                                                    aB = []
                                                }
                                                aE[aL].style.display = "none";
                                                aB.push(aE[aL]);
                                                aD += aS
                                            }
                                            aB.length && aF.push(aB);
                                            aG = aF.length - 1;

                                            function aR() {
                                                X.className = aK == 0 ? "magicbtnL01" : "magicbtnL02";
                                                ah.className = aK == aG ? "magicbtnR01" : "magicbtnR02"
                                            }
                                            function aQ(aW, aU) {
                                                var aV = 0;
                                                aM = aW.length,
                                                end = Math.max(aM - 1, 0);
                                                for (aV; aV < aM; aV++) {
                                                    aW[aV].style.visibility = aU ? "visible" : "hidden";
                                                    aW[aV].style.display = !aU ? "none" : ((aV == 0 || aV == end) && aW[aV].innerHTML == "|") ? "none" : ""
                                                }
                                            }
                                            function aT(aV, aW) {
                                                var aU = Math[aV](aK + aW, aW > 0 ? aG : 0);
                                                if (aK == aU) {
                                                    aR();
                                                    return
                                                }
                                                aF[aK] && aQ(aF[aK], false);
                                                aF[aU] && aQ(aF[aU], true);
                                                aK = aU;
                                                aR()
                                            }
                                            X.onclick = function() {
                                                aT("max", -1);
                                                X.blur();
                                                return false
                                            };
                                            ah.onclick = function() {
                                                aT("min", 1);
                                                ah.blur();
                                                return false
                                            };
                                            aT("max", -1)
                                        }, 100)
                                };
                            k([uploadPanel, figurePanel], function(aD, aC, aB) {
                                    I && I.abort();
                                    aD.onclick = function() {
                                        return false
                                    };
                                    if (aD == uploadPanel) {
                                        a(ay);
                                        a(az);
                                        Z(C == 3 ? B : C)
                                    } else {
                                        Z(3);
                                        if (!x) {
                                            az.innerHTML = '<div style="width:100%;text-align:center;margin-top:10px;margin-bottom:10px"><img src="' + scope.$BASEIMG + 'style/images/common/loading.gif"/></div>';
                                            I = l([m, "?type=cartoon"].join(""), function(aE) {
                                                am(aE);
                                                x = aE
                                            });
                                            return
                                        }
                                        am(x)
                                    }
                                }, G);
                            o(y.wrap, function() {
                                    r()
                                }, "mouseup");
                            o(T, function(aD) {
                                    var aE = s(T);
                                    var aC = window.pageYOffset || Math.max(v.scrollTop, t.body.scrollTop);
                                    var aB = window.pageXOffset || Math.max(v.scrollLeft, t.body.scrollLeft);
                                    ad.style.top = ((aD.clientY + aC) - aE[1] - 13) + "px";
                                    ad.style.left = ((aD.clientX + aB) - aE[0] - 32) + "px"
                                }, "mousemove");
                            o(t.body, function(aB) {
                                    if (!z) {
                                        return
                                    }
                                    y.visible(false)
                                }, "mouseup");
                            o(y.dom.close, function() {
                                    I && I.abort();
                                    y.visible(false);
                                    return false
                                }, "click");
                            var aa = function() {
                                    var aB = s(K);
                                    y.position(aB[0] + (av || 0), aB[1] + K.offsetHeight + (at || 0))
                                };
                            o(window, function() {
                                    aa()
                                }, "resize");
                            aa();
                            w(uploadPanel, "mouseup")
                        }
                        y.visible(true);
                        if (!/^(1|2)$/.test(C)) {
                            w(uploadPanel, "mouseup")
                        }
                        return {
                            clear: function() {
                                E();
                                w(uploadPanel, "mouseup");
                                y.visible(false)
                            },
                            file: p
                        }
                    }
            })()
    })();
    (function(a) {
        a.miniblogPublisherImage = function(l, h) {
            var k = function(n, m) {
                return n.currentStyle ? n.currentStyle[m] : document.defaultView.getComputedStyle(n, false)[m]
            };
            var j = {};
            var f = {};
            var b = function(m, n) {
                f.set("pic", (m && [m]) || []);
                if (m && !Core.String.trim(f.getDom("editor").value)) {
                    f.getDom("editor").value = $CLTMSG.CX0117
                }
                if (!m && Core.String.trim(f.getDom("editor").value) == $CLTMSG.CX0117) {
                    f.getDom("editor").value = ""
                }
                f.getDom("editor").setAttribute("ptype", n || "");
                f.limit()
            };
            var g = function(m) {
                f.enabled(m);
                if (m) {
                    f.limit()
                }
            };
            j.clear = function() {
                try {
                    b()
                } catch (m) {
                    if (scope.$uid == "1505834385") {
                        //console.log(m)
                    }
                }
            };
            j.init = function(m) {
                f = m
            };
            l.button.onclick = function() {
                return false
            };
            Core.Events.addEvent(l.button, function() {
                if (!f.checkLogin(arguments)) {
                    return
                }
                var m = App.popUpUpload(l.button, -32, 5, b, g);
                setTimeout(function() {
                    if (m.file) {
                        m.file.focus()
                    }
                }, 300);
                j.clear = m.clear;
                return false
            });
            return j
        }
    })(App);
    (function(a) {
        a.miniblogPublisherTopic = function(b) {
            var g = {};
            var f = function(h, j, m, l) {
                var k = h.value.split(m)[0].length;
                k = k == "" ? 1 : k + 1;
                if (j) {
                    App.TextareaUtils.setCursor(h, k, l.length)
                } else {
                    k += m.length - 1;
                    App.TextareaUtils.setCursor(h, k)
                }
            };
            g.init = function(h) {
                Core.Events.addEvent(b.button, function() {
                    if (!h.checkLogin(arguments)) {
                        return
                    }
                    var j = h.getDom("editor");
                    var m = "#" + $CLTMSG.CX0119 + "#";
                    var l = App.TextareaUtils.getSelectedText(j);
                    var k = (l == "" || l == $CLTMSG.CX0119);
                    if (k) {
                        l = $CLTMSG.CX0119
                    } else {
                        m = "#" + l + "#"
                    }
                    if (j.value.indexOf(m) < 0) {
                        h.insertText(m, function(n) {
                            f(j, k, m, l)
                        })
                    }
                    f(j, k, m, l)
                }, "click")
            };
            g.clear = function() {};
            return g
        }
    })(App);
    (function(a) {
        a.setOpacity = function(b, f) {
            b.style.filter = "alpha(opacity=" + f + ")";
            b.style.opacity = f / 100
        };
        a.opacity = function(f, k, n) {
            var m = k.first;
            var l = k.last || 0;
            if (l == m) {
                a.setOpacity(f, m);
                if (typeof n === "function") {
                    n(m, l)
                }
                return false
            }
            var o = Math.floor((k.time || 5) * 100 / a.timer.delay);
            var j = [];
            for (var g = 0; g < o; g++) {
                j.push(m + (l - m) * g / o)
            }
            var h = 0;
            var b = a.timer.add(function() {
                if (h >= j.length) {
                    a.timer.remove(b);
                    a.setOpacity(f, l);
                    if (typeof n === "function") {
                        n(m, l)
                    }
                    return false
                }
                a.setOpacity(f, j[h]);
                h++
            })
        }
    })(App);
App.MediaDialog = {};
App.MediaDialog.BasicDialog = function(h, a, k) {
        this._node = $C("div");
        document.getElementsByTagName("BODY")[0].appendChild(this._node);
        var b = {
            title: k ? k : "",
            content: h ? h : "......"
        };
        var g = this._node.style;
        g.position = "absolute";
        g.visibility = "hidden";
        if (!a) {
            a = {}
        }
        if (a.zIndex) {
            g.zIndex = a.zIndex
        }
        if (a.beforeClose) {
            this._beforeClose = a.beforeClose
        }
        var j = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxCon1"><div class="layerMedia"><div class="layerArrow"></div><div class="layerMedia_close"><strong>#{title}</strong><a class="close" href="#" title="' + $CLTMSG.CD0018 + '"></a></div>							#{content}</div></div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr>			    </tbody></table>';
        var f = new Utils.Template(j);
        this._node.innerHTML = f.evaluate(b);
        this._node_body = Core.Dom.getElementsByClass(this._node, "DIV", "layerBoxCon1")[0];
        this._layerarrow = Core.Dom.getElementsByClass(this._node, "DIV", "layerArrow")[0];
        this.setSize(a.width, a.height);
        this._btn_close = this._node.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.firstChild.childNodes[1].childNodes[1];
        this._node_title = this._btn_close.previousSibling;
        this._btn_close.parent = this;
        this._btn_close.onclick = function() {
            Core.Events.stopEvent();
            if (a.hiddClose) {
                this.parent.hidd()
            } else {
                this.parent.close()
            }
        };
        this._btn_close.onmousedown = function() {};
        this.initinput();
        this._flytimer = a.timer || 0;
        this._flydistance = a.distance || 0;
        if (a.hidden) {
            g.visibility = "hidden";
            this.focusTarget = this._btn_close
        } else {
            g.visibility = "visible";
            this._btn_close.focus();
            this._btn_close.blur()
        }
    };
App.MediaDialog.BasicDialog.prototype = {
        onClose: function() {},
        gc: function() {},
        distory: function() {
            if (this._distory) {
                return
            }
            this.gc();
            this._btn_close.onmousedown = null;
            this._btn_close.onclick = null;
            this._btn_close.parent = null;
            this._btn_close = null;
            this._node.parentNode.removeChild(this._node);
            if (scope.$IE) {
                this._node.outerHTML = null
            }
            this._node = null;
            this._distory = true
        },
        close: function() {
            if (this._beforeClose) {
                this._beforeClose()
            }
            if (this.onClose) {
                this.onClose()
            }
            this.distory()
        },
        show: function() {
            if (this._flytimer == 0 && this._flydistance == 0) {
                this._node.style.visibility = "visible"
            } else {
                this._node.style.visibility = "visible"
            }
            if (this.focusTarget) {
                this.focusTarget.focus()
            }
        },
        fly: function() {
            var f = Core.Base.detect.$IE ? this._flydistance / 3 : this._flydistance / 5;
            var b = App.animation.speed(App.timer.delay, this._flydistance, f);
            var a = this.node;
            var h = 0;
            var g = (function(l, j, m) {
                var k = (m.style.top) + "px";
                App.timer.add(function() {
                    if (h >= b.length) {
                        App.timer.remove(g);
                        return false
                    }
                    m.style.top = (parseInt(k) - b[h]) + "px";
                    h++
                })
            })(this._flytimer, this._flydistance, this._node)
        },
        hidd: function() {
            this._node.style.visibility = "hidden"
        },
        setPosition: function(a, b) {
            this._node.style.left = (a - Core.Dom.getLeft(this._layerarrow)) + "px";
            this._node.style.top = b + "px"
        },
        setTitle: function(a) {
            this._node_title.innerHTML = a
        },
        setMiddle: function() {
            var g = this._node.offsetWidth;
            var j = this._node.offsetHeight;
            var b = Core.System.winSize();
            var h = Core.System.getScrollPos();
            var f = (b.width - g) / 2;
            var a = h[0] + (b.height - j) / 2;
            this._node.style.left = f + "px";
            this._node.style.top = (a < 20 ? 20 : a) + "px"
        },
        setSize: function(a, b) {
            a = a ? a + "px" : "auto";
            b = b ? b + "px" : "auto";
            var f = this._node_body.style;
            f.width = a;
            f.height = b
        },
        initinput: function() {
            var a = this._node.getElementsByTagName("input");
            var f = a.length;
            var b = 0;
            for (b; b < f; b++) {
                var g = a[b];
                var h = g.getAttribute("type");
                if (h == "text" || h == "password") {
                    g.style.color = "#999999";
                    Core.Events.addEvent(g, (function(j) {
                        return function() {
                            j.style.color = "#333333"
                        }
                    })(g), "focus");
                    Core.Events.addEvent(g, (function(j) {
                        return function() {
                            j.style.color = "#999999"
                        }
                    })(g), "blur")
                }
            }
        },
        _mousemoveHandler: function() {
            if (this._ondrag) {
                var a = Core.Events.fixEvent(Core.Events.getEvent());
                if (a.target == this._btn_close) {
                    return
                }
                if ($IE) {
                    var b = Core.System.getScrollPos();
                    this._node.style.left = a.pageX - this._btn_move.offsetx + b[1] + "px";
                    this._node.style.top = a.pageY - this._btn_move.offsety + b[0] + "px"
                } else {
                    this._node.style.left = a.pageX - this._btn_move.offsetx + "px";
                    this._node.style.top = a.pageY - this._btn_move.offsety + "px"
                }
            }
        }
    };
App.addvideo = function(f, j, h, a) {
        if (scope.$extdialog) {
            scope.$extdialog.close();
            scope.$extdialog = null;
            Core.Events.removeEvent(document.body, n, "click")
        }
        var g = '<div class="layerMedia_tip02">' + $CLTMSG.CL0201 + '</div>                    <div id="musicinput" class="layerMedia_input">                    	<input type="text" id="vinput"  class="layerMusic_txt"/>                        <a id="vsubmit" class="btn_normal" href="javascript:void(0)"><em>' + $CLTMSG.CL0112 + '</em></a>                    </div>                    <p id="vredinfo" class="layerMedia_err error_color" style="display:none">' + $CLTMSG.CL0105 + '</p>					<p id="normalact" class="mail_pl" style="display:none;"><a href="javascript:void(0);" id="vcancel">' + $CLTMSG.CL0202 + '</a>。</p><div class="layerMedia_tip02"><em class="num">2.</em><a href="javascript:void(0);" onclick ="App.uploadVideo();">' + $CLTMSG.CC6201 + "</a></div>";
        App.uploadVideo = function() {
            var y = {
                pid: a.get("pic") || "",
                publish: Core.String.leftB(Core.String.trim(a.elements.editor.value), 340) || ""
            };
            var s = App.jsonToQuery(y, true),
                x;
            var w = "http://upload.video.sina.com.cn/index.php" + (s ? ("?" + s) : "");
            x = window.open(w, "", "height=420,width=570,location=no,left=" + l[0] + ",top=" + l[1]);
            a.clear();
            if (scope.$extdialog) {
                    scope.$extdialog.close()
                }
            x.focus()
        };
        var p = function() {
            scope.$extdialog = null
        };
        var q = false;
        scope.$extdialog = new App.MediaDialog.BasicDialog(g, {
            width: 368,
            zIndex: 1000,
            hidden: true,
            timer: 2,
            distance: 5,
            beforeClose: function() {
                p()
            }
        });
        var m = Core.Events.addEvent;
        var l = Core.Dom.getXY(f);
        scope.$extdialog.setPosition(l[0], l[1] + parseInt(f.offsetHeight) + 5);
        var t = typeof j === "function" ? j : function() {};
        var k = typeof h === "function" ? h : function() {};
        var b = function(s) {
            if (q) {
                return false
            }
            var y = {
                url: $E("vinput").value
            };
            var x = $E("vredinfo");
            var w = $E("normalact");
            q = true;
            Utils.Io.Ajax.request("/video/publish.php", {
                POST: y,
                onComplete: function(z) {
                    if (z) {
                        if (z.code == "A00006") {
                            x.style.display = "none";
                            x.innerHTML = "";
                            w.style.display = "none";
                            if (!s) {
                                t(z);
                                scope.$extdialog.close()
                            }
                        } else {
                            x.style.display = "";
                            x.innerHTML = App.getMsg({
                                code: z.code
                            });
                            w.style.display = "";
                            k(z);
                            q = false
                        }
                    } else {
                        x.style.display = "";
                        x.innerHTML = $CLTMSG.CL0105;
                        w.style.display = "";
                        k();
                        q = false
                    }
                },
                onException: function() {
                    if (json) {
                        x.style.display = "";
                        x.innerHTML = App.getMsg({
                            code: json.code
                        });
                        w.style.display = "";
                        k(json)
                    } else {
                        x.style.display = "";
                        x.innerHTML = App.getMsg({
                            code: R01404
                        });
                        w.style.display = "";
                        k()
                    }
                    q = false
                },
                returnType: "json"
            })
        };
        try {
            scope.$extdialog.show();
            m($E("vsubmit"), function() {
                b()
            }, "click");
            m($E("vcancel"), function() {
                if (scope.$extdialog) {
                    scope.$extdialog.close()
                }
            }, "click");
            m($E("vback"), function() {
                if ($E("vinput")) {
                    a.insertText(" " + $E("vinput").value + " ")
                }
                if (scope.$extdialog) {
                    scope.$extdialog.close()
                }
            }, "click");
            App.enterSubmit({
                parent: "musicinput",
                action: function() {
                    b()
                }
            });
            var n = function() {
                var s = Core.Events.getEventTarget();
                if (Core.Dom.contains(f, s)) {
                    Core.Events.removeEvent(document.body, n, "click");
                    Core.Events.stopEvent();
                    return false
                }
                if (scope.$extdialog) {
                    if (Core.Dom.contains(scope.$extdialog._node, s)) {
                        return true
                    } else {
                        scope.$extdialog && scope.$extdialog.close()
                    }
                }
                Core.Events.removeEvent(document.body, n, "click")
            };
            setTimeout(function() {
                Core.Events.addEvent(document.body, n, "click")
            }, 200);
            var v = {};
            var r = function(w) {
                var s = Core.System.winSize();
                if (v.width != s.width || v.height != s.height) {
                    n();
                    v = s;
                    Core.Events.removeEvent(window, r, "resize")
                }
            };
            Core.Events.addEvent(window, r, "resize")
        } catch (o) {}
        return true
    };
    (function(a) {
        a.miniblogPublisherVideo = function(b) {
            var f = {};
            f.init = function(g) {
                var h = function(k) {
                    var j = function(l) {
                        try {
                            if (l) {
                                g.insertText(" " + l.data.shorturl + " ")
                            }
                        } catch (m) {}
                    };
                    App.addvideo(b.button, j, function() {}, g)
                };
                Core.Events.addEvent(b.button, function() {
                    if (!g.checkLogin(arguments)) {
                        return
                    }
                    h()
                }, "click")
            };
            f.clear = function() {};
            return f
        }
    })(App);
Core.Dom.getElementsByAttr = function(h, b, j) {
        var f = [];
        for (var g = 0, a = h.childNodes.length; g < a; g++) {
            if (h.childNodes[g].nodeType == 1) {
                if (h.childNodes[g].getAttribute(b) == j) {
                    f.push(h.childNodes[g])
                }
                if (h.childNodes[g].childNodes.length > 0) {
                    f = f.concat(arguments.callee.call(null, h.childNodes[g], b, j))
                }
            }
        }
        return f
    };
$registJob("init_input", function() {
        App.Dom.getBy(function(f) {
            if (f.getAttribute("dycolor") || f.getAttribute("dycolor") == false) {
                return
            }
            var g = f.getAttribute("type");
            var b = f.getAttribute("name");
            if (/text|password/.test(g) && b != "nickname") {
                var a = f.getAttribute("clew");
                f.style.color = "#999";
                Core.Events.addEvent(f, function() {
                    if (a) {
                        if (a === f.value) {
                            f.value = ""
                        }
                    }
                    f.style.color = "#333"
                }, "focus");
                Core.Events.addEvent(f, function() {
                    if (a) {
                        if (f.value === "") {
                            f.value = a
                        }
                    }
                    f.style.color = "#999"
                }, "blur")
            }
        }, "input", document)
    });
scope.jsReady = function() {
        return true
    };
App.addmusic = function(Q, D, V, A) {
        if (scope.$extdialog_music) {
            scope.$extdialog_music.close();
            scope.$extdialog_music = null;
            Core.Events.removeEvent(document.body, N, "click")
        }
        scope.$playsong = null;
        var y = '<div class="layerTag">                    	<ul>                        <li id="findsong" class="cur"><a href="javascript:void(0)" onclick = "App.musicchangeli(\'1\');return false;">' + $CLTMSG.CL0101 + '</a><span class="tagR"></span></li>                        <li id="inputmusiclink"><a href="javascript:void(0);"  onclick = "App.musicchangeli(\'2\');return false;">' + $CLTMSG.CL0102 + '</a><span class="tagR"></span></li>                        </ul>                     </div>					 <div id="findsongdiv">						 <div class="layerMedia_input">		                    <input id="mfindinput" type="text" value="' + $CLTMSG.CL0103 + '" class="layerMusic_txt"/>							<a id="mfindsubmit" class="btn_normal" href="javascript:void(0);"><em>' + $CLTMSG.CL0104 + '</em></a>						</div>						<p id="mfindredinfo" style="display:none;" class="layerMedia_err error_color">' + $CLTMSG.CL0105 + '</p>					 	<div id="mfindmusictip" class="layerMedia_tip01" style="display:none"></div>						<div id="musicDetail" class="musicDetail" style="display:none">						<div><a id="mfindinfo" class="btn_normal" href="javascript:void(0)"><em>' + $CLTMSG.CL0106 + '</em></a></div>						</div>					 </div>					 <div id="linksongdiv" style="display:none;">					 <div id="linksonginput" class="layerMedia_input">	                    <input id="mlinkinput" type="text" value="' + $CLTMSG.CL0107 + '" class="layerMusic_txt" style=""/>	                    <a id="mlinksubmit" class="btn_normal" href="javascript:void(0);" style=""><em>' + $CLTMSG.CL0106 + '</em></a>	                 </div>					 <p id="mlinkredinfo" style="display:none;" class="layerMedia_err error_color">' + $CLTMSG.CL0105 + '</p>					 <p id="mlinkre" class="mail_pl" style="display:none;"><a href="javascript:void(0);" id="mlinkback">' + $CLTMSG.CL0108 + '</a>。</p>					 <div id="mlinkmusictip" class="layerMedia_tip01" style="display:none"></div>					 <div id="musicInfo" class="musicInfo" style="display:none">                            <table>                            	<tbody><tr>                                	<th><em class="error_color">*</em>' + $CLTMSG.CL0109 + '</th>                                	<td><input id = "songname" type="text" value="" class="musicInfo_txt"/><span id="mlinkredtext" class="error_color" style="display:none">' + $CLTMSG.CL0110 + "</span></td>                                </tr>                                <tr>                                	<th>" + $CLTMSG.CL0111 + '</th>                                	<td><input id = "singer" type="text" value="" class="musicInfo_txt"/></td>                                </tr>                                <tr>                                	<th/>                                	<td><a class="btn_normal" id="mlinkinfo" href="javascript:void(0);"><em>' + $CLTMSG.CL0112 + "</em></a></td>                                </tr>                            </tbody></table>                            </div>						</div>";
        var O = function() {
            scope.$playsong = null;
            if ($E("musicflash")) {
                Core.Dom.removeNode($E("musicflash"))
            }
            scope.$extdialog_music = null;
            Core.Dom.removeNode(M.get("box"))
        };
        scope.$extdialog_music = new App.MediaDialog.BasicDialog(y, {
            width: 373,
            zIndex: 1000,
            hidden: true,
            timer: 2,
            distance: 5,
            beforeClose: function() {
                O()
            }
        });
        var q = $E("mfindmusictip");
        var s = $E("mfindredinfo");
        var m = $E("mlinkre");
        var X = $E("mfindsubmit");
        var K = $E("mfindinfo");
        var W = $E("musicDetail");
        var o = $E("mlinksubmit");
        var r = $E("mlinkinfo");
        var v = $E("musicInfo");
        var t = $E("mlinkredinfo");
        var B = $E("songname");
        var R = $E("singer");
        var g;
        var b = $E("mlinkredtext");
        var j = $E("mlinkmusictip");
        var w;
        var h = Core.Dom.getElementsByAttr;
        var G = Core.Events.addEvent;
        var L = Core.Dom.getXY(Q);
        scope.$extdialog_music.setPosition(L[0], L[1] + parseInt(Q.offsetHeight) + 5);
        var F = typeof D === "function" ? D : function() {};
        var U = typeof V === "function" ? V : function() {};
        var J = $E("mfindinput");
        var P = $E("mlinkinput");
        var a = App.doRequest;
        var H = function(Y, p) {
            if (p) {
                Y.innerHTML = p
            }
            Y.style.display = ""
        };
        var x = function(p) {
            p.innerHTML = "";
            p.style.display = "none"
        };
        var n = function() {
            if ($E("musicflash")) {
                return
            }
            Core.Dom.insertHTML($E("publisher_music"), '<div id="musicflash"></div>', "AfterEnd");
            var p = {
                quality: "high",
                allowScriptAccess: "always",
                wmode: "transparent",
                allowFullscreen: true
            };
            var Y = {};
            swfobject.embedSWF([scope.$BASESTATIC + "miniblog/static/swf/player/MiniPlayer.swf", Boot.getJsVersion()].join(""), "musicflash", "1", "1", "9.0.0", null, Y, p)
        };
        var l = function() {
            return Core.Base.detect.$IE ? window.musicflash : document.musicflash
        };
        var E = function(Y) {
            var p = Core.String.trim(Y).length;
            if (p > 0) {
                return Math.ceil(Core.String.byteLength(Core.String.trim(Y)) / 2)
            } else {
                return 0
            }
        };
        var I = function(p) {
            while (p.tagName.toLowerCase() != "tr") {
                p = p.parentNode
            }
            return p
        };
        var C = function() {
            var Z = E(B.value);
            var p = true;
            var aa = true;
            if (Z >= 0 && Z <= 15) {
                p = true
            } else {
                p = false
            }
            var Y = E(R.value);
            if (Y >= 0 && Y <= 15) {
                aa = true
            } else {
                aa = false
            }
            if (aa && p) {
                x(t);
                return true
            } else {
                if (!aa) {
                    H(t, $CLTMSG.CL0113);
                    return false
                }
                if (!p) {
                    H(t, $CLTMSG.CL0114);
                    return false
                }
            }
        };
        var T = function() {
            if (Core.String.trim(J.value) == "" || Core.String.trim(J.value) == $CLTMSG.CL0103) {
                return false
            }
            w.songStop && w.songStop();
            J.value = Core.String.trim(J.value);
            a({
                songname: J.value
            }, "/music/search.php", function(ae, Y) {
                if (Y) {
                    x(s);
                    x(q);
                    if ($E("music_list")) {
                        Core.Dom.removeNode($E("music_list"))
                    }
                    var ac = Core.String.encodeHTML(E(J.value) > 25 ? (J.value.substr(0, 25) + "...") : J.value);
                    if (Y.count > 0) {
                        H(q, $CLTMSG.CL0115);
                        Core.Dom.insertHTML(W, ae, "AfterBegin");
                        H(W);
                        var p = Core.Dom.getElementsByClass($E("music_list"), "div", "play");
                        var Z = $E("music_list").getElementsByTagName("label");
                        for (var ad = 0; ad < p.length; ad++) {
                            Z[ad].innerHTML = E(Z[ad].innerHTML) > 25 ? Z[ad].innerHTML.substr(0, 47) + "..." : Z[ad].innerHTML;
                            !w.songPlay && (p[ad].style.visibility = "hidden");
                            w.songPlay && G(p[ad], (function(af, ag) {
                                return function() {
                                    try {
                                        var ah = I(af);
                                        var ak = af.className == "play" || false;
                                        for (var aj = 0; aj < ag.length; aj++) {
                                            ag[aj].className = "play"
                                        }
                                        if (scope.$playsong === ah) {
                                            if (ak) {
                                                w.songPlay && w.songPlay();
                                                return false
                                            } else {
                                                w.songStop && w.songStop();
                                                return false
                                            }
                                        } else {
                                            var ai = encodeURIComponent(h(ah, "name", "url")[0].value);
                                            scope.$playsong = ah;
                                            w.setUrl && w.setUrl(ai);
                                            return false
                                        }
                                    } catch (al) {}
                                }
                            })(p[ad], p), "click")
                        }
                        var aa = Core.Dom.getElementsByClass($E("music_list"), "p", "mselect");
                        for (var ab = 0; ab < aa.length; ab++) {
                            G(aa[ab], (function(af) {
                                return function() {
                                    var ah = I(af);
                                    var ag = h(ah, "name", "url")[0];
                                    ag.checked = true
                                }
                            })(aa[ab]), "click")
                        }
                    } else {
                        H(s, $CLTMSG.CL0116 + ac + $CLTMSG.CL0117);
                        W.style.display = "none"
                    }
                }
            }, function(Y) {
                if (Y) {
                    var p = Core.String.encodeHTML(E(J.value) > 25 ? (J.value.substr(0, 25) + "...") : J.value);
                    H(s, $CLTMSG.CL0116 + p + $CLTMSG.CL0117)
                }
                x(q);
                W.style.display = "none"
            })
        };
        var z = function() {
            var Y = Core.Dom.getElementsByAttr(W, "name", "url");
            var ab, p, aa;
            for (var Z = 0; Z < Y.length; Z++) {
                if (Y[Z].checked == true) {
                    ab = Y[Z];
                    p = Core.Dom.getElementsByAttr(ab.parentNode, "name", "songname")[0].value;
                    aa = Core.Dom.getElementsByAttr(ab.parentNode, "name", "singer")[0].value;
                    break
                }
            }
            if (!ab) {
                H(s, $CLTMSG.CL0118);
                return
            }
            a({
                url: ab.value,
                name: p,
                singer: aa
            }, "/music/publish.php", function(ad, ac) {
                F(ad);
                scope.$extdialog_music.close()
            }, function(ac) {
                if (ac) {
                    H(s, App.getMsg({
                        code: ac.code
                    }))
                }
                x(q);
                W.style.display = "none"
            })
        };
        var k = function() {
            v.style.display = "none";
            o.style.display = "";
            if (Core.String.trim(P.value) == "" || Core.String.trim(P.value) == $CLTMSG.CL0107) {
                return false
            }
            a({
                url: P.value
            }, "/music/input_check.php", function(p) {
                H(j, $CLTMSG.CL0119);
                x(t);
                m.style.display = "none";
                H(v);
                if (p) {
                    R.value = p.author || "";
                    B.value = p.title || "";
                    g = p.url
                }
            }, function(p) {
                if (p) {
                    if (p.code) {
                        H(t, App.getMsg({
                            code: p.code
                        }));
                        H(m)
                    } else {
                        H(t, App.getMsg({
                            code: "M14002"
                        }));
                        H(m)
                    }
                }
                v.style.display = "none";
                R.value = "";
                B.value = "";
                g = "";
                x(j)
            })
        };
        var f = function() {
            x(b);
            if (!C()) {
                return false
            }
            if (B.value == "" || Core.String.trim(B.value) == "") {
                H(b, $CLTMSG.CL0103);
                return false
            }
            a({
                url: g,
                name: B.value,
                singer: R.value
            }, "/music/publish_link.php", function(p) {
                F(p);
                scope.$extdialog_music.close()
            }, function(p) {
                if (p) {
                    H(t, App.getMsg({
                        code: p.code
                    }))
                }
                U(p)
            })
        };
        try {
            n();
            w = (l() || {});
            var M = App.fansfind({
                input: J,
                timer: 7,
                light: function(p) {
                    p.className = "cur"
                },
                select: function(p, Y) {
                    J.value = Y;
                    T()
                },
                "class": "layerMedia_menu",
                data: "/music/recommend.php"
            });
            scope.$extdialog_music.show();
            G(B, function() {
                x(b);
                C()
            }, "blur");
            G(R, function() {
                x(b);
                C()
            }, "blur");
            G(J, function() {
                if (J.value == $CLTMSG.CL0103) {
                    J.value = ""
                }
            }, "focus");
            G(J, function() {
                if (J.value == "") {
                    J.value = $CLTMSG.CL0103
                }
            }, "blur");
            G(P, function() {
                if (P.value == $CLTMSG.CL0107) {
                    P.value = ""
                }
            }, "focus");
            G(P, function() {
                if (P.value == "") {
                    P.value = $CLTMSG.CL0107
                } else {
                    k()
                }
            }, "blur");
            G($E("mlinkcancel"), function() {
                if (scope.$extdialog_music) {
                    scope.$extdialog_music.close()
                }
            });
            G($E("mlinkback"), function() {
                if (P) {
                    A.insertText(" " + P.value + " ")
                }
                if (scope.$extdialog_music) {
                    scope.$extdialog_music.close()
                }
            });
            G(X, function() {
                T()
            }, "click");
            G(K, function() {
                z()
            }, "click");
            G(o, function() {
                k()
            }, "click");
            G(r, function() {
                f()
            }, "click");
            App.enterSubmit({
                parent: "findsongdiv",
                action: function() {
                    T()
                }
            });
            App.enterSubmit({
                parent: "linksonginput",
                action: function() {
                    k();
                    P.blur()
                }
            });
            var N = function() {
                var Y = Core.Events.getEvent();
                var p = Y ? (Y.srcElement || Y.target) : null;
                if (Core.Dom.contains(Q, p)) {
                    Core.Events.removeEvent(document.body, N, "click");
                    Core.Events.stopEvent();
                    return false
                }
                if (scope.$extdialog_music) {
                    while (p && p != document.body) {
                        if (p == scope.$extdialog_music._node || p.className == "layerMedia_menu") {
                            return true
                        }
                        p = p.parentNode
                    }
                    scope.$extdialog_music && scope.$extdialog_music.close()
                }
                Core.Events.removeEvent(document.body, N, "click")
            };
            setTimeout(function() {
                Core.Events.addEvent(document.body, N, "click")
            }, 200)
        } catch (S) {}
    };
App.musicchangeli = function(a) {
        if (a == "1") {
            $E("findsongdiv").style.display = "";
            $E("linksongdiv").style.display = "none";
            $E("findsong").className = "cur";
            $E("inputmusiclink").className = ""
        }
        if (a == "2") {
            $E("findsongdiv").style.display = "none";
            $E("linksongdiv").style.display = "";
            $E("inputmusiclink").className = "cur";
            $E("findsong").className = ""
        }
        return false
    };
scope.listener = function(f, a) {
        if (!scope.$playsong) {
            return false
        }
        var g = Core.Dom.getElementsByClass(scope.$playsong, "div", "play")[0] || Core.Dom.getElementsByClass(scope.$playsong, "div", "stop")[0] || Core.Dom.getElementsByClass(scope.$playsong, "div", "loading")[0];
        if (a == "playing") {
            g.className = "stop"
        } else {
            if (a == "buffer") {
                g.className = "loading"
            } else {
                g.className = "play"
            }
        }
    };
    (function(a) {
        a.miniblogPublisherMusic = function(b) {
            var f = {};
            f.init = function(g) {
                var h = function(k) {
                    var j = function(l) {
                        if (l) {
                            g.insertText("  " + (Core.String.trim(l.singer).length > 0 ? l.singer + "-" : "") + l.name + "-" + l.shorturl + "  ")
                        }
                    };
                    App.addmusic(b.button, j, function() {}, g)
                };
                Core.Events.addEvent(b.button, function() {
                    if (!g.checkLogin(arguments)) {
                        return
                    }
                    h()
                }, "click")
            };
            f.clear = function() {};
            return f
        }
    })(App);
    (function(a) {
        a.miniblogPublisherFace = function(b) {
            var f = {};
            f.init = function(h) {
                var g = function() {
                    h.limit()
                };
                b.button.href = "####";
                b.button.onclick = function() {
                    return false
                };
                var j;
                Core.Events.addEvent(b.button, function(k) {
                    j = j || k.srcElement || k.target;
                    if (!h.checkLogin(arguments)) {
                        return
                    }
                    App.showFaces(b.button, h.getDom("editor"), -32, 5, "360px", g, function(l) {
                        h.insertText(l);
                        return true
                    });
                    return false
                }, "click")
            };
            f.clear = function() {};
            return f
        }
    })(App);
Core.String.expand = function(b) {
        var a = b.replace(/([\u00ff-\ufffe])/gi, "\uffff$1");
        return a
    };
Core.String.collapse = function(a) {
        return a.replace(/\uffff/gi, "")
    };
Core.String.shorten = function(f, a, b) {
        if (b != "" && Core.String.expand(f).length > a) {
            b = b || "..."
        } else {
            b = ""
        }
        return Core.String.collapse(Core.String.expand(f).substr(0, a)) + b
    };
    (function() {
        App.DragDrop = function(h, m, j) {
            j = j || {};
            j.driect = j.driect || "";
            j.index = j.index || 100;
            j.range = j.range || 50;
            j.size = j.size || Math.floor(j.range / 5);
            j.cont = j.cont || null;
            var f = navigator.userAgent.toLowerCase();
            var p = document.documentElement,
                r = document.body;
            var b = Core.Events,
                k = App.Dom;
            var n = "dragdrop";
            this.dragDom = null;
            this.curPos = null;
            var a = function() {};
            var g = function() {};
            var o = function() {};
            var l = this;
            var q = {
                    initEvent: function() {
                        b.addEvent(m, q.onmouseDown, "mousedown")
                    },
                    fireEvent: function() {
                        b.removeEvent(m, q.onmouseDown, "mousedown")
                    },
                    init: function() {
                        this.dragDom = (typeof h === "string") ? $E(h) : h;
                        k.addClass(this.dragDom, n);
                        if (m) {
                            m = (typeof m === "string") ? $E(m) : m
                        } else {
                            m = this.dragDom
                        }
                        q.initEvent()
                    },
                    getDDRange: function() {
                        var y = j.cont,
                            x = k.getXY(y),
                            t = App.DOMSize(y, "width", true),
                            s = App.DOMSize(l.dragDom, "width", true),
                            w = App.DOMSize(y, "height", true),
                            v = App.DOMSize(l.dragDom, "height", true);
                        return {
                                min_x: x.x,
                                max_x: x.x + t - s,
                                min_y: x.y,
                                max_y: x.x + w - v
                            }
                    },
                    onmouseDown: function(t) {
                        b.stopEvent();
                        var s = m;
                        while (s.tagName) {
                            if (k.hasClass(s, n)) {
                                l.dragDom = s;
                                break
                            }
                            s = s.parentNode
                        }
                        j.cont && (l.ddRange = q.getDDRange());
                        l._oPos = k.getXY(l.dragDom, {
                            abs: true
                        });
                        l._cPos = q.getCurPos(t);
                        b.addEvent(document, q.onmouseUp, "mouseup");
                        b.addEvent(document, q.onmouseMove, "mousemove");
                        if ($IE) {
                            m.setCapture()
                        }
                        s.style.width = s.offsetWidth + "px";
                        s.style.left = l._oPos.x + "px";
                        s.style.top = l._oPos.y + "px";
                        s.style.position = "absolute";
                        s.style.zIndex = j.index;
                        s.style.cursor = "move";
                        a(l);
                        return false
                    },
                    onmouseMove: function(A) {
                        b.stopEvent();
                        var x = q.getCurPos(A);
                        if (j.range > 0) {
                            var s = k.getScroll();
                            var w = k.getScreen();
                            var t = 0,
                                v = 0;
                            if (x.y > w.h + s.t - j.range) {
                                    t += j.size;
                                    (f.match(/chrome\/([\d\.]+)/) ? r : p).scrollTop += j.size
                                } else {
                                    if (x.y < s.t + j.range) {
                                        t -= j.size;
                                        (f.match(/chrome\/([\d\.]+)/) ? r : p).scrollTop -= j.size
                                    }
                                }
                        }
                        l.curPos = x;
                        var z = x.x - l._cPos.x + l._oPos.x,
                            y = t + x.y - l._cPos.y + l._oPos.y;
                        if (l.ddRange) {
                                z = l.ddRange.min_x > z ? l.ddRange.min_x : (l.ddRange.max_x < z ? l.ddRange.max_x : z);
                                y = l.ddRange.min_y > y ? (l.ddRange.max_y < y ? l.ddRange.max_y : y) : l.ddRange.min_y
                            }
                        if (j.driect == "x") {
                                l.dragDom.style.left = z + "px"
                            } else {
                                if (j.driect == "y") {
                                    l.dragDom.style.top = y + "px"
                                } else {
                                    l.dragDom.style.left = z + "px";
                                    l.dragDom.style.top = y + "px"
                                }
                            }
                        o(l);
                        return false
                    },
                    onmouseUp: function(s) {
                        if ($IE) {
                            m.releaseCapture()
                        }
                        b.removeEvent(document, q.onmouseUp, "mouseup");
                        b.removeEvent(document, q.onmouseMove, "mousemove");
                        g(l)
                    },
                    getCurPos: function(t) {
                        t = t || window.event;
                        var s = document.documentElement;
                        if (t.pageX) {
                            return {
                                x: t.pageX,
                                y: t.pageY
                            }
                        }
                        return {
                            x: t.clientX + s.scrollLeft - s.clientLeft,
                            y: t.clientY + s.scrollTop - s.clientTop
                        }
                    }
                };
            q.init();
            return {
                    dragStart: function(s) {
                        a = s
                    },
                    onDrag: function(s) {
                        o = s
                    },
                    dragEnd: function(s) {
                        g = s
                    },
                    init: function() {
                        q.initEvent()
                    },
                    fire: function() {
                        q.fireEvent()
                    }
                }
        }
    })();
    (function() {
        App.Panel = function(a, g) {
            a = (typeof a === "string") ? $E(a) : a;
            g = g || {};
            g.ismask = g.ismask || false;
            g.isdrag = g.isdrag || false;
            g.index = g.index || 0;
            g.width = g.width || "";
            g.height = g.height || "";
            g.isFire = g.isFire || false;
            g.pos = g.pos || [];
            var b = Core.Events,
                j = App.Dom;
            ua = navigator.userAgent.toLowerCase();
            if (a == null) {
                    return
                }
            var m = function() {};
            var h = function() {};
            var n = function() {};
            var p = null,
                f = null,
                k = "display:none;visibility:visible;position:fixed;bottom:0px;left:0;background-color:#000;filter:alpha(opacity=15);-moz-opacity: 0.15;opacity:0.15;";
            var l = this;
            l.ie = /msie (6|7){1,1}/.test(ua);
            l.panel = a;
            var o = {
                    init: function() {
                        if (g.ismask && p == null) {
                            p = document.createElement("div");
                            p.style.cssText = k;
                            p.style.zIndex = g.index;
                            j.setStyle(p, "position", l.ie ? "absolute" : "fixed");
                            if (l.ie) {
                                f = document.createElement("iframe");
                                f.style.cssText = k;
                                f.style.zIndex = g.index;
                                j.setStyle(f, "position", l.ie ? "absolute" : "fixed");
                                document.body.insertBefore(f, document.body.childNodes[0])
                            }
                            document.body.insertBefore(p, document.body.childNodes[0])
                        }
                        j.setStyle(a, "width", g.width);
                        j.setStyle(a, "height", g.height);
                        var r = o.getPanelPos();
                        j.setStyle(a, "top", r.t + "px");
                        j.setStyle(a, "left", r.l + "px");
                        if (g.isdrag) {
                            var q = App.DragDrop(a, null, g)
                        }
                        b.addEvent(window, function() {
                            o.symask()
                        }, "scroll");
                        b.addEvent(window, function() {
                            o.symask()
                        }, "resize")
                    },
                    getPanelPos: function() {
                        var r = j.getScroll();
                        var s = j.getScreen();
                        var t = Math.max(a.clientHeight, a.offsetHeight, j.getStyle(a, "height").replace("px", ""));
                        var q = Math.max(a.clientWidth, a.offsetWidth, j.getStyle(a, "width").replace("px", ""));
                        return {
                            scroll: r,
                            w: s.w,
                            h: s.h,
                            t: g.pos[0] || Math.round(t > s.h ? (s.h / 5 + r.t) : ((s.h - t) / 2 + r.t)),
                            l: g.pos[1] || Math.round(q > s.w ? (s.w / 5 + r.l) : ((s.w - q) / 2 + r.l))
                        }
                    },
                    resize: function() {
                        var q = o.getPanelPos();
                        j.setStyle(a, "top", q.t + "px");
                        j.setStyle(a, "left", q.l + "px");
                        o.symask(q)
                    },
                    symask: function(q) {
                        q = q || o.getPanelPos();
                        p && j.setStyle(p, "width", q.w + "px");
                        p && j.setStyle(p, "height", q.h + "px");
                        f && j.setStyle(f, "width", q.w + "px");
                        f && j.setStyle(f, "height", q.h + "px");
                        if (l.ie) {
                            p && j.setStyle(p, "top", q.scroll.t + "px");
                            f && j.setStyle(f, "top", q.scroll.t + "px")
                        }
                    },
                    hide: function() {
                        j.setStyle(a, "display", "none");
                        p && j.setStyle(p, "display", "none");
                        f && j.setStyle(f, "display", "none");
                        h(l)
                    },
                    show: function() {
                        o.resize();
                        j.setStyle(a, "position", "absolute");
                        a.style.cssText = a.style.cssText;
                        a.style.zIndex = g.index + 1;
                        p && j.setStyle(p, "display", "");
                        f && j.setStyle(f, "display", "");
                        m(l);
                        j.setStyle(a, "display", "block")
                    },
                    fire: function() {
                        p && document.body.removeChild(p);
                        f && document.body.removeChild(f);
                        a && a.parentNode.removeChild(a);
                        n(l)
                    }
                };
            j.getBy(function(q) {
                    if (j.hasClass(q, "panel_close")) {
                        b.addEvent(q, o.hide)
                    }
                }, "", a);
            o.init();
            return {
                    hide: function(q) {
                        typeof(q) == "function" && (h = q);
                        g.isFire ? (o.fire()) : (o.hide())
                    },
                    show: function(q) {
                        typeof(q) == "function" && (m = q);
                        o.show()
                    },
                    fire: function(q) {
                        typeof(q) == "function" && (n = q);
                        o.fire()
                    }
                }
        };
        App.PopLayer = function(h, f) {
            f = f || {};
            f.container = f.container || document.body;
            var a = [];
            a.push('<table class="mBlogLayer" style="width:100%;"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c">');
            a.push('<div id="root" class="layerBox">');
            a.push('	<div id="hd" class="layerBoxTopb"></div>');
            a.push('	<div id="bd" class="layerBoxCon"></div>');
            a.push('	<div id="ft"></div>');
            a.push("</div>");
            a.push('</td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>');
            var b = $C("div");
            h && b.setAttribute("id", h);
            f.container.appendChild(b);
            var g = App.builder3(a.join(""), b, {
                dd: "id"
            });
            b = App.Panel(b, f);
            b.domList = g.domList;
            b.root = g.domList.root;
            b.hd = g.domList.hd;
            b.bd = g.domList.bd;
            b.ft = g.domList.ft;
            return b
        };
        App.CommLayer = function(h, f) {
            f = f || {};
            f.container = f.container || document.body;
            f.close = f.close ||
            function() {
                return false
            };
            var a = [];
            a.push('<table class="mBlogLayer" style="width:100%;"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c">');
            a.push('<div id="root" class="layerBox">');
            a.push('<div id="hd" class="layerBoxTop"><div class="topCon"><strong>');
            a.push(f.title || "");
            a.push('</strong><a id="close" title="' + $CLTMSG.CD0018 + '" class="close" href="javascript:;"></a><div class="clear"></div></div></div>');
            a.push('<div id="bd" class="layerBoxCon">');
            a.push(f.html || "");
            a.push('</div><div id="ft"></div></div>');
            a.push('</td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>');
            var b = $C("div");
            h && b.setAttribute("id", h);
            f.container.appendChild(b);
            var g = App.builder3(a.join(""), b, {
                dd: "id"
            });
            b = App.Panel(b, f);
            b.domList = g.domList;
            b.root = g.domList.root;
            b.hd = g.domList.hd;
            b.bd = g.domList.bd;
            b.ft = g.domList.ft;
            Core.Events.addEvent(g.domList.close, function() {
                if (!f.close(b)) {
                    b.hide()
                }
            });
            return b
        }
    })();
if (!domkey) {
        var domkey = {}
    }
domkey.Date = function(k, v, n, z, f, b, r) {
        var t = this;
        t.startDate = f || new Date();
        t.decDays = b || 7;
        var p = function(A) {
            return document.createElement(A)
        };
        var o = function(A) {
            return document.getElementById(A)
        };
        var g = function(A, D) {
            var C = 0;
            var B = A % 400 ? (A % 4 ? false : (A % 100 ? true : false)) : true;
            switch (parseInt(D)) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                C = 31;
                break;
            case 3:
            case 5:
            case 8:
            case 10:
                C = 30;
                break;
            case 1:
                if (B) {
                    C = 29
                } else {
                    C = 28
                }
            }
            return C
        };
        this.year = n || (new Date()).getFullYear();
        this.month = z || (new Date()).getMonth();
        this.hlDay = r || false;
        this.fun = v ||
        function() {};
        var x = p("DIV");
        var y = p("SELECT");
        var j = p("DIV");
        var s = p("INPUT");
        var a = p("INPUT");
        var h = p("INPUT");
        var m = p("UL");
        this.oDate = p("UL");
        x.className = "selector";
        y.className = "month";
        j.className = "year";
        s.className = "yearval";
        a.className = "yearbtn";
        h.className = "yearbtn2";
        m.className = "weeks";
        this.oDate.className = "days";
        a.type = "button";
        h.type = "button";
        var l = function(A, C, B) {
            t.curYear = C || (new Date().getFullYear());
            t.curMonth = B || (new Date().getMonth());
            t.whiteDay = (new Date(t.curYear, t.curMonth, 1)).getDay();
            t.length = g(t.curYear, t.curMonth);
            t.setDateInterval(t.startDate, t.decDays)
        };
        for (var w = 0; w < this.monthText.length; w++) {
            y.options[y.length] = new Option(this.monthText[w], w)
        }
        for (var w = 0; w < this.weekText.length; w++) {
            var q = p("LI");
            q.innerHTML = this.weekText[w];
            m.appendChild(q)
        }
        x.appendChild(y);
        x.appendChild(j);
        j.appendChild(s);
        j.appendChild(a);
        j.appendChild(h);
        k.appendChild(x);
        k.appendChild(m);
        k.appendChild(this.oDate);
        y.value = this.month;
        s.value = this.year;
        y.onchange = function() {
            l(v, parseInt(s.value), y.value)
        };
        a.onclick = function() {
            var A = parseInt(s.value) + 1;
            s.value = A;
            l(v, parseInt(s.value), y.value)
        };
        h.onclick = function() {
            var A = parseInt(s.value) - 1;
            s.value = A;
            l(v, parseInt(s.value), y.value)
        };
        s.onblur = function() {
            var A = parseInt(this.value);
            if (A < 1900) {
                A = 1990
            }
            if (A > 2100) {
                A = 2010
            }
            this.value = A;
            l(v, parseInt(s.value), y.value)
        };
        s.onkeypress = function(A) {
            if (A.keyCode == 13) {
                var B = parseInt(this.value);
                if (B < 1900) {
                    B = 1990
                }
                if (B > 2100) {
                    B = 2010
                }
                this.value = B;
                l(v, parseInt(s.value), y.value)
            }
        };
        l(v, n, z)
    };
domkey.Date.prototype = {
        monthText: [$CLTMSG.CL0501, $CLTMSG.CL0502, $CLTMSG.CL0503, $CLTMSG.CL0504, $CLTMSG.CL0505, $CLTMSG.CL0506, $CLTMSG.CL0507, $CLTMSG.CL0508, $CLTMSG.CL0509, $CLTMSG.CL0510, $CLTMSG.CL0511, $CLTMSG.CL0512],
        weekText: [$CLTMSG.CL0302, $CLTMSG.CL0309, $CLTMSG.CL0310, $CLTMSG.CL0311, $CLTMSG.CL0312, $CLTMSG.CL0313, $CLTMSG.CL0314],
        setDateInterval: function(a, l) {
            var h = this;
            var b = new Date(a.getFullYear(), a.getMonth(), a.getDate());
            var k = new Date(a.getFullYear(), a.getMonth(), a.getDate());
            k.setHours(l * -24);
            h.oDate.innerHTML = "";
            for (var g = 0; g < h.whiteDay; g++) {
                h.oDate.appendChild($C("LI"))
            }
            for (var g = 0; g < this.length; g++) {
                var j = $C("LI");
                var m = new Date(h.curYear, h.curMonth, g);
                if (m.getTime() >= k.getTime() && m.getTime() < b.getTime()) {
                    var f = $C("A");
                    f.href = "#date";
                    f.setAttribute("day", g + 1);
                    f.setAttribute("month", this.month);
                    f.onclick = function() {
                        h.fun(h.curYear, h.curMonth, this.getAttribute("day"))
                    };
                    f.innerHTML = "<strong>" + (g + 1) + "</strong>";
                    j.appendChild(f);
                    if (h.hlDay) {
                        if (h.curYear == h.year && h.curMonth == h.month) {
                            if (h.hlDay == (g + 1)) {
                                f.className = "day"
                            }
                        }
                    }
                } else {
                    j.innerHTML = g + 1;
                    j.title = ""
                }
                h.oDate.appendChild(j)
            }
        }
    };
App.showVote = function(h, j) {
        var n = {
            appcode: "10001",
            proxy: "/public/app_proxy.php",
            max: 20,
            btn: h
        };
        var f = Core.Events;
        var k = App.Dom;
        var b = {};
        var a = null,
            g = null,
            l = k.getScreen();
        var m = this;
        var o = function(t, s) {
                if (t && $SYSMSG[t]) {
                    s.innerHTML = $SYSMSG[t]
                }
                return false
            };
        var r = {
                path: function(t) {
                    var s = t,
                        v = null;
                    v = b;
                    if (s == "") {
                            return v
                        }
                    s = s.split(".");
                    for (i = 0, len = s.length; i < len; i++) {
                            v[s[i]] = v[s[i]] || {};
                            v = v[s[i]]
                        }
                    return v
                },
                cash: function(s, t) {
                    b[s] || (b[s] = []);
                    t && b[s].push(t)
                },
                hashSet: function(s, t, v) {
                    t = t || "temp";
                    var w = r.path(s);
                    w[t] || (w[t] = []);
                    v && w[t].push(v)
                },
                proxy: {
                    io: function(s, t) {
                        s.appcode = s.appcode || n.appcode;
                        Utils.Io.Ajax.request(n.proxy, {
                            POST: s,
                            onComplete: function(v) {
                                if (v.code == "A00006") {
                                    t.sucess(v)
                                } else {
                                    t.fail(v)
                                }
                            },
                            onException: function() {},
                            returnType: "json"
                        })
                    },
                    getHtml: function(w, v, t) {
                        t = t || {};
                        t.type = w || w.type;
                        var s = {
                            sucess: function(x) {
                                typeof(v.sucess) == "function" && v.sucess(x)
                            },
                            fail: function(x) {
                                typeof(v.fail) == "function" && v.fail(x)
                            }
                        };
                        this.io(t, s)
                    }
                },
                domHash: function() {
                    b.items = a.items;
                    k.getBy(function(t) {
                        var s = t.tagName.toLowerCase();
                        t.getAttribute("nav") && r.hashSet("tab", t.getAttribute("nav"), t);
                        t.getAttribute("tab") && r.hashSet("tab", t.getAttribute("tab"), t);
                        if (s == "li" && k.hasClass(t, "cur")) {
                            b.tab["on"] = t.getAttribute("nav");
                            b.tab[t.getAttribute("nav")]["exist"] = true
                        }
                    }, "", b.root);
                    k.getBy(function(v) {
                        var s = v.tagName.toLowerCase();
                        var t = v.getAttribute("act");
                        t && r.hashSet("vote", t, v);
                        switch (s) {
                        case "input":
                            if (t) {
                                if (v.getAttribute("type") == "text" && (t == "vitem" || t == "title")) {
                                    t == "vitem" && r.hashSet("vote", "opt", v.parentNode);
                                    if (t == "vitem") {
                                        Utils.Sinput.limitMaxLen(v, 40);
                                        r.vote.input(v, v.parentNode)
                                    } else {
                                        Utils.Sinput.limitMaxLen(v, 50);
                                        r.vote.input(v)
                                    }
                                }
                            }
                            break;
                        case "textarea":
                            if (t && t == "info") {
                                Utils.Sinput.limitMaxLen(v, 1000);
                                r.vote.input(v)
                            }
                            break
                        }
                    }, "", b.tab["new"][1])
                },
                loading: function() {
                    var t = $C("div");
                    t.style.display = "none";
                    k.addClass(t, "layerBox_loading");
                    var s = [];
                    s.push('<div id="loading" class="layerBox_loading"><div class="ll_info">');
                    s.push('<img height="16" width="16" src="' + scope.$BASEIMG + 'style/images/common/loading.gif" alt="" title="">');
                    s.push('<p id="msg"></p></div></div>');
                    t.innerHTML = s.join("");
                    return t
                },
                resize: function() {
                    var s = k.getScreen();
                    return s.w != l.w || s.h !== l.h
                },
                layer: {
                    vote: function() {
                        _pos = k.getXY(n.btn);
                        var s = App.PopLayer("", {
                            pos: [(_pos.y + 20), (_pos.x - 190)],
                            index: 998,
                            width: "420px"
                        });
                        s.root.innerHTML = "";
                        s.hd = s.bd = s.ft = s.root;
                        return s
                    },
                    bind: function(s, t) {
                        var v = App.builder3(t.data, s.root, {
                            dd: "id"
                        });
                        s.items = v.domList;
                        s.items.close && f.addEvent(s.items.close, function() {
                            f.stopEvent();
                            s.hide()
                        });
                        n.btn && f.addEvent(n.btn, function() {
                            s.show()
                        })
                    },
                    errtip: function() {
                        var s = App.Panel(b.items["tip"], {
                            index: 999,
                            width: "235px"
                        });
                        f.addEvent(b.items["tip_close"], function() {
                            s.hide()
                        });
                        s.setMsg = function(v, t) {
                            b.items["tip_title"].innerHTML = v;
                            b.items["tip_msg"].innerHTML = t
                        };
                        return s
                    }
                },
                tab: {
                    build: function() {
                        var s = b.tab;
                        for (var v in s) {
                            var t = s[v];
                            typeof(t) == "object" && f.addEvent(t[0], function() {
                                f.stopEvent();
                                var B = f.getEventTarget();
                                for (; B.tagName.toLowerCase() != "li"; B = B.parentNode) {}
                                if (s.on && s[s.on][0] == B) {
                                    return
                                }
                                var A = B.getAttribute("nav");
                                k.removeClass(s[s.on][0], "cur");
                                s[s.on][1] && (s[s.on][1].style.display = "none");
                                k.addClass(s[A][0], "cur");
                                s.on = A;
                                if (!s[A][1]) {
                                    var w = $C("div");
                                    w.setAttribute("tab", A);
                                    s[A][1] = w;
                                    b.items["tab"].appendChild(s[A][1])
                                }
                                b.items["list_error"] && (b.items["list_error"].style.display = "none");
                                if (!s[A]["exist"]) {
                                    var C = b.loading;
                                    var z = b.items["tab"];
                                    if (C.parentNode != z) {
                                        z.appendChild(C)
                                    }
                                    C.style.display = "";
                                    var x = 1;
                                    var y = {
                                        sucess: function(D) {
                                            r.list.refresh(D, x);
                                            b.loading.style.display = "none";
                                            s[A]["exist"] = true;
                                            s[A][1].style.display = "";
                                            r.list.pageBtn()
                                        },
                                        fail: function(D) {
                                            o(D.code, b.items["list_error_msg"]);
                                            b.items["list_error_msg"] && (b.items["list_error_msg"].innerHTML = D.error);
                                            b.items["list_error"] && (b.items["list_error"].style.display = "");
                                            b.loading.style.display = "none"
                                        }
                                    };
                                    r.list.getPage(x, y)
                                } else {
                                    b.loading.style.display = "none";
                                    s[A][1].style.display = ""
                                }
                            })
                        }
                    }
                },
                vote: {
                    build: function() {
                        b.loading && (b.loading.style.display = "none");
                        this.dd();
                        this.hh();
                        this.mm();
                        this.add(b.items.add);
                        f.addEvent(b.items.save, function() {
                            r.vote.save()
                        });
                        f.addEvent(b.vote["dd"][0], function() {
                            r.vote.time(f.getEventTarget())
                        });
                        f.addEvent(b.items.addInfo, function() {
                            r.vote.show(b.vote.info[0])
                        })
                    },
                    show: function(s) {
                        s.style.display = s.style.display === "none" ? "" : "none"
                    },
                    add: function(v) {
                        this.idx || (this.idx = 6);
                        var s = this.idx;
                        var t = function() {
                            var x = $C("p");
                            k.addClass(x, "lv_inputsub");
                            var w = $C("span");
                            w.innerHTML = s+++".";
                            x.appendChild(w);
                            var y = $C("input");
                            y.setAttribute("type", "text");
                            y.setAttribute("act", "vitem");
                            y.setAttribute("name", "items");
                            x.appendChild(y);
                            r.hashSet("vote", "vitem", y);
                            r.vote.input(y, true);
                            Utils.Sinput.limitMaxLen(y, 40);
                            return x
                        };
                        f.addEvent(v, function() {
                            for (var x = 0; x < 5; x++) {
                                var w = t();
                                v.parentNode.parentNode.insertBefore(w, v.parentNode);
                                r.hashSet("vote", "opt", w);
                                b.vote["opt"].length == n.max && k.setStyle(v.parentNode, "display", "none")
                            }
                        })
                    },
                    input: function(t, s) {
                        f.addEvent(t, function() {
                            var v = f.getEvent();
                            r.vote.mouse(v.type, s ? t.parentNode : t)
                        }, "focus");
                        f.addEvent(t, function() {
                            var v = f.getEvent();
                            r.vote.mouse(v.type, s ? t.parentNode : t);
                            r.vote.select()
                        }, "blur")
                    },
                    select: function() {
                        var v = b.items.vote_class;
                        var B = b.vote["vitem"];
                        var A = v.options;
                        var t = 0;
                        var x = A.length;
                        var s = function(C) {
                            var D = $C("option");
                            D.setAttribute("value", C);
                            if (C == "1") {
                                D.innerHTML = $CLTMSG.WL1000
                            } else {
                                D.innerHTML = $CLTMSG.WL1001.replace(/#num#/, C)
                            }
                            return D
                        };
                        for (var w = 0, y = B.length; w < y; w++) {
                            B[w].value.replace(/^\s+|\s+$/g, "") && (t++)
                        }
                        if (t < 1 || t == x) {
                            return
                        } else {
                            if (x < t) {
                                for (var w = x; w < t; w++) {
                                    v.appendChild(s(w + 1))
                                }
                                v.selectedIndex = v.options.length - 1
                            } else {
                                var z = v.selectedIndex;
                                for (var w = x; w > t; w--) {
                                    v.removeChild(v.options[w - 1])
                                }
                                if (z >= t) {
                                    v.selectedIndex = v.options.length - 1
                                }
                            }
                            v.style.width = "100px"
                        }
                        v.selectedIndex = 0
                    },
                    mouse: function(t, s) {
                        switch (t) {
                        case "focus":
                            k.addClass(s, "lv_focus");
                            break;
                        case "blur":
                            k.removeClass(s, "lv_focus");
                            break
                        }
                    },
                    time: function(s, w) {
                        w = w ||
                        function() {
                            return true
                        };
                        s.setAttribute("readonly", "");
                        var B = null;
                        var A = Core.Dom.getXY(s);
                        var E = k.getByClass("pc_caldr", "div", document);
                        if (E.length > 0) {
                            B = E[0];
                            B.parentNode.removeChild(B)
                        }
                        B = document.createElement("DIV");
                        B.style.cssText = "position:absolute;display:none;z-Index:3000;";
                        B.style.left = A[0] + "px";
                        B.style.top = A[1] + 20 + "px";
                        B.className = "pc_caldr";
                        document.body.appendChild(B);
                        var v = function(I, F, H) {
                            var G = I + "-" + ((parseInt(F) + 1) > 9 ? (parseInt(F) + 1) : "0" + (parseInt(F) + 1)) + "-" + (parseInt(H) > 9 ? H : "0" + H);
                            s.value = G;
                            x();
                            w();
                            return false
                        };
                        var x = function() {
                            B.style.display = "none";
                            B.innerHTML = "";
                            f.removeEvent(document.body, x, "click")
                        };
                        var D = function(F) {
                            var H = 1000 * 60;
                            var G = H * 60;
                            var I = G * 24;
                            return (Math.round(F / I))
                        };
                        var t = new Date();
                        t.setFullYear(t.getFullYear() + 2);
                        t.setDate(t.getDate() - 1);
                        var z = D(t.getTime()) - D((new Date()).getTime()) + 1;
                        var y = new Date();
                        var C = [];
                        if (s.value) {
                            C = s.value.split("-")
                        }
                        new domkey.Date(B, v, parseInt(C[0], 10) || (new Date()).getFullYear(), (parseInt(C[1], 10) || (new Date().getMonth() + 1)) - 1, t, z, (parseInt(C[2], 10) || ((new Date()).getDate())));
                        B.style.display = "";
                        f.stopEvent();
                        B.onclick = function() {
                            f.stopEvent();
                            return false
                        };
                        f.addEvent(document.body, x, "click")
                    },
                    dd: function() {
                        var x = new Date(),
                            s = _mm = _dd = "";
                        var v = 1000 * 60;
                        var t = v * 60;
                        var w = t * 24;
                        var y = new Date(x.getTime() + w * 7);
                        s = y.getFullYear();
                        _mm = (y.getMonth() + 1);
                        _dd = y.getDate();
                        _mm = _mm < 10 ? ("0" + _mm) : _mm;
                        _dd = _dd < 10 ? ("0" + _dd) : _dd;
                        b.vote["dd"][0].value = s + "-" + _mm + "-" + _dd
                    },
                    hh: function() {
                        var w = b.items["vote_hh"];
                        var v = (new Date()).getHours();
                        w.innerHTML = "";
                        var t = function(x) {
                            var y = $C("option");
                            y.setAttribute("value", x);
                            y.innerHTML = x;
                            return y
                        };
                        for (var s = 0; s < 24; s++) {
                            w.appendChild(t(s))
                        }
                        w.value = v
                    },
                    mm: function() {
                        var w = b.items["vote_mm"];
                        var s = (new Date()).getMinutes();
                        w.innerHTML = "";
                        var v = function(x) {
                            var y = $C("option");
                            y.setAttribute("value", x);
                            y.innerHTML = x;
                            return y
                        };
                        for (var t = 0; t < 60; t++) {
                            w.appendChild(v(t))
                        }
                        w.selectedIndex = s
                    },
                    htmltojson: function(w, v) {
                        var s = App.htmlToJson(w, ["input", "textarea", "select"], true);
                        s.type = v;
                        for (var t in s) {
                            if (Core.Array.isArray(s[t])) {
                                s[t] = s[t].join(",")
                            }
                        }
                        return s
                    },
                    save: function() {
                        f.stopEvent();
                        var s = r.vote.check();
                        if (s.pass) {
                            var t = r.vote.htmltojson(b.items["container"], "submit_create");
                            if (b.vote.info[0].style.display !== "none") {
                                t.info = encodeURIComponent(b.vote.info[0].value)
                            }
                            var v = {
                                sucess: function(w) {
                                    j($CLTMSG.WL1002.replace(/#VALUE#/, b.vote["title"][0].value) + w.data, b.items.save)
                                },
                                fail: function(x) {
                                    o(x.code, b.items["save_err_msg"]);
                                    b.items["save_error"].style.display = "";
                                    b.items["form"].style.display = "none";
                                    var w = function() {
                                        b.items["save_error"].style.display = "none";
                                        b.items["form"].style.display = "";
                                        f.removeEvent(b.items["save_back"], w, "click")
                                    };
                                    f.addEvent(b.items["save_back"], w)
                                }
                            };
                            r.proxy.io(t, v)
                        } else {
                            if (!g) {
                                g = r.layer.errtip()
                            }
                            g.setMsg(s.tt, s.mm);
                            g.show(function(x) {
                                var w = k.getXY(s.node, {
                                    abs: true
                                });
                                x.panel.style.top = (w.y - 90) + "px";
                                x.panel.style.left = (w.x - 7) + "px";
                                App.TextareaUtils.setCursor(s.node)
                            })
                        }
                    },
                    check: function() {
                        var t = {
                            pass: true,
                            node: null,
                            tt: "",
                            mm: "",
                            opt: [],
                            num: 0
                        };
                        if (b.vote["title"]) {
                            var x = Core.String.byteLength(b.vote["title"][0].value.replace(/^\s+|\s+$/g, "").replace(/　/g, ""));
                            if (x == 0) {
                                t.pass = false;
                                t.node = b.vote["title"][0];
                                t.tt = $CLTMSG.WL1003;
                                t.mm = $CLTMSG.WL1004;
                                return t
                            } else {
                                if (x / 2 > 25) {
                                    t.pass = false;
                                    t.node = b.vote["title"][0];
                                    t.tt = $CLTMSG.WL1003;
                                    t.mm = $CLTMSG.WL1005;
                                    return t
                                }
                            }
                        }
                        for (var w = 0, s = b.vote["vitem"].length; w < s; w++) {
                            var x = Core.String.byteLength(b.vote["vitem"][w].value.replace(/^\s+|\s+$/g, ""));
                            if (x > 0) {
                                t.num++
                            }
                        }
                        for (var w = 0, s = b.vote["vitem"].length; w < s; w++) {
                            var v = b.vote["vitem"][w];
                            var x = Core.String.byteLength(v.value.replace(/^\s+|\s+$/g, ""));
                            if (t.num < 2 && x == 0) {
                                t.pass = false;
                                t.node = v;
                                t.tt = $CLTMSG.WL1006;
                                t.mm = $CLTMSG.WL1007;
                                return t
                            } else {
                                if (x / 2 > 20) {
                                    t.pass = false;
                                    t.node = v;
                                    t.tt = $CLTMSG.WL1006;
                                    t.mm = $CLTMSG.WL1008;
                                    return t
                                }
                            }
                            v.value && t.opt.push(encodeURIComponent(v.value))
                        }
                        return t
                    }
                },
                list: {
                    build: function() {
                        f.addEvent(b.items["list_add"], function() {
                            f.stopEvent();
                            var s = r.list.getSelect(b.items["vote_list"]);
                            if (s) {
                                j(s.getAttribute("link"))
                            }
                            return false
                        });
                        f.addEvent(b.items["list_next"], r.list.pageNext);
                        f.addEvent(b.items["list_up"], r.list.pageUp)
                    },
                    pageBtn: function() {
                        var s = b.page["show"],
                            t = b.items["list_next"],
                            v = b.items["list_up"];
                        v.style.display = (s == 1) ? "none" : "";
                        t.style.display = (b.page["maxpage"] == 1) ? "none" : (s == b.page["maxpage"] ? "none" : "");
                        r.list.setDefRadio()
                    },
                    setDefRadio: function() {
                        var s = b.page[b.page["show"]][0];
                        k.getBy(function(v) {
                            var t = v.getAttribute("act");
                            if (t && t == "v_item") {
                                return true
                            }
                        }, "input", s)[0].checked = true
                    },
                    getSelect: function(t) {
                        var s = k.getBy(function(x) {
                            var v = x.getAttribute("act");
                            var w = x.getAttribute("type");
                            if (w == "radio" && v == "v_item" && x.checked) {
                                return true
                            }
                        }, "input", t);
                        return s[0] || null
                    },
                    pageUp: function() {
                        var s = b.page["show"] * 1;
                        b.page[s][0].style.display = "none";
                        b.page[s - 1][0].style.display = "";
                        b.page["show"] = s - 1;
                        r.list.pageBtn()
                    },
                    pageNext: function() {
                        var v = b.page["show"] * 1;
                        var t = b.page["maxpage"] * 1;
                        if (v < t && !b.page[v + 1]) {
                            var s = v + 1;
                            var w = {
                                sucess: function(x) {
                                    r.list.refresh(x, s);
                                    b.page[v][0].style.display = "none";
                                    b.page["show"] = s;
                                    r.list.pageBtn()
                                },
                                fail: function(x) {}
                            };
                            r.list.getPage((v + 1), w)
                        } else {
                            if (v < t && b.page[v + 1]) {
                                b.page[v][0].style.display = "none";
                                b.page[v + 1][0].style.display = "";
                                b.page["show"] = v + 1;
                                r.list.pageBtn()
                            }
                        }
                    },
                    getPage: function(s, v) {
                        var t = {};
                        t.page = s;
                        r.proxy.getHtml("mylist", v, t)
                    },
                    refresh: function(v, t) {
                        var s = $C("div");
                        s.setAttribute("pid", t);
                        b.items["vote_list"].appendChild(s);
                        s.innerHTML = v.data;
                        r.list.cashItem(s, true);
                        b.page["maxpage"] = v.maxpage;
                        b.page["maxrow"] = v.maxrow
                    },
                    cashItem: function(v, s) {
                        s = s || false;
                        var t = v.getAttribute("pid");
                        r.hashSet("page", "show", null);
                        if (b.page[t] == v) {
                            return
                        }!b.page[t] && r.hashSet("page", t, v);
                        s && (b.page["show"] = t);
                        !b.page["hasPage"] && r.hashSet("page", "hasPage", null);
                        r.hashSet("page", "hasPage", t)
                    },
                    hover: function() {}
                }
            };
        var q = function(t) {
                var w = {};
                var v = {
                    error: function(y) {
                        if (!g) {
                            g = r.layer.errtip()
                        }
                        var x = r.vote.check();
                        var z = $SYSMSG ? $SYSMSG[y.code] : "";
                        g.setMsg(z, "");
                        if (w.div_uploadimg.style.display != "none") {
                            x.node = w.img_upload
                        } else {
                            if (w.div_reuploadimg.style.display != "none") {
                                x.node = w.img_reupload
                            }
                        }
                        g.show(function(B) {
                            var A = k.getXY(x.node, {
                                abs: true
                            });
                            B.panel.style.top = (A.y - 80) + "px";
                            B.panel.style.left = (A.x - 7) + "px"
                        });
                        v._clear(true)
                    },
                    showSuccess: function(C) {
                        var B = 18;
                        var z = 0;
                        var D = "";
                        var A = 0;
                        var y = w.theimg;
                        var E = ((y && y.vl) ? y.vl : "");
                        y && (function() {
                            y.value = C.pid
                        })();
                        if (!E) {
                            return
                        }
                        z = Core.String.byteLength(E);
                        if (z > B) {
                            D = E.substring(E.lastIndexOf("."));
                            D = "..." + D;
                            A = D.length;
                            E = Core.String.shorten(E, B - A, D)
                        }
                        w.img_up.innerHTML = E;
                        var x = [w.div_successimg, w.div_uploadingimg, w.div_uploadimg, w.div_reuploadimg];
                        v._changestate(x)
                    },
                    _show: function(x) {
                        (x.style.display === "none") && (function() {
                            x.style.display = ""
                        })()
                    },
                    _hid: function(x) {
                        (x.style.display != "none") && (function() {
                            x.style.display = "none"
                        })()
                    },
                    _changestate: function(x) {
                        v._show(x[0]);
                        for (var y = 1; y < x.length; y++) {
                            v._hid(x[y])
                        }
                    },
                    _imgSubmit: function(z, A) {
                        if (!/\.(gif|jpg|png|jpeg)$/i.test(z.value)) {
                            v._clear();
                            v.error({
                                code: "M07004"
                            });
                            return
                        }
                        var x = [w.div_uploadingimg, w.div_uploadimg, w.div_reuploadimg, w.div_successimg];
                        var y = z ? z.value : "";
                        y = y.match(/[^\/|\\]*$/)[0];
                        y = y.substring(y.lastIndexOf(";") + 1);
                        w.theimg.vl = y;
                        v._changestate(x);
                        scope.addImgSuccess = function(B) {
                            if (B && B.ret == "1") {
                                v.showSuccess(B)
                            } else {
                                v.showReupload()
                            }
                        };
                        A && A.submit();
                        v._clear()
                    },
                    showReupload: function() {
                        var x = [w.div_reuploadimg, w.div_uploadimg, w.div_successimg, w.div_uploadingimg];
                        v._changestate(x)
                    },
                    hideTitle: function() {
                        g && g.hide()
                    },
                    _clear: function(x) {
                        if (x) {
                            w.theimg.value = "";
                            w.theimg.vl = ""
                        }
                        w.uploadimg_form.reset();
                        w.reuploadimg_form.reset()
                    },
                    deleteImg: function() {
                        var x = w.img_up;
                        x && (function() {
                            x.innerHTML = "";
                            v._returnState()
                        })()
                    },
                    _returnState: function() {
                        v._clear(true);
                        var x = [w.div_uploadimg, w.div_reuploadimg, w.div_successimg, w.div_uploadingimg];
                        v._changestate(x)
                    },
                    _cancelUpload: function() {
                        v._returnState()
                    },
                    bindImg: function(x) {
                        if (!x) {
                            w = b.items
                        } else {
                            w = x
                        }
                        f.addEvent(w.img_upload, function() {
                            v._imgSubmit(w.img_upload, w.uploadimg_form)
                        }, "change");
                        f.addEvent(w.img_reupload, function() {
                            v._imgSubmit(w.img_reupload, w.reuploadimg_form)
                        }, "change");
                        f.addEvent(w.img_upload, v.hideTitle, "click");
                        f.addEvent(w.img_reupload, v.hideTitle, "click");
                        f.addEvent(w.img_recancel, v._cancelUpload, "click");
                        f.addEvent(w.img_cancel, v._cancelUpload, "click");
                        f.addEvent(w.img_dele, v.deleteImg, "click")
                    }
                };
                var s = function() {
                    var x = {};
                    x.div_reuploadimg = $E("div_reuploadimg");
                    x.div_successimg = $E("div_successimg");
                    x.div_uploadimg = $E("div_uploadimg");
                    x.div_uploadingimg = $E("div_uploadingimg");
                    x.img_cancel = $E("img_cancel");
                    x.img_dele = $E("img_dele");
                    x.img_recancel = $E("img_recancel");
                    x.img_reupload = $E("img_reupload");
                    x.img_up = $E("img_up");
                    x.img_upload = $E("img_upload");
                    x.reuploadimg_form = $E("reuploadimg_form");
                    x.uploadimg_form = $E("uploadimg_form");
                    x.theimg = $E("theimg");
                    return x
                };
                if (!t) {
                    v.bindImg()
                } else {
                    v.bindImg(s())
                }
            };
        var p = function() {
                a = r.layer.vote();
                b.root = a.root;
                b.items = [];
                b.loading = r.loading();
                a.root.appendChild(b.loading);
                var s = {
                    sucess: function(t) {
                        r.layer.bind(a, t);
                        r.domHash();
                        q();
                        r.tab.build();
                        r.vote.build();
                        r.list.build()
                    },
                    fail: function(t) {
                        if (t && t.code) {
                            if (t.code == "B50001") {
                                b.loading.innerHTML = '<div class="ll_info"><img class="tipicon" style="height:14px;width:18px" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title=""><em>' + t.error + "</em></div>"
                            } else {
                                if ($SYSMSG[t.code]) {
                                    b.loading.innerHTML = '<div class="ll_info"><img class="tipicon" style="height:14px;width:18px" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" alt="" title=""><em>' + $SYSMSG[t.code] + "</em></div>"
                                }
                            }
                        }
                    }
                };
                r.proxy.getHtml("create", s)
            };
        p();
        return {
                getPanel: function() {
                    return a
                },
                clear: function() {
                    a.fire()
                },
                show: function(t) {
                    f.addEvent(window, function() {
                        if (r.resize()) {
                            l = k.getScreen();
                            a.hide(t)
                        }
                    }, "resize");
                    !b.tab && (b.loading.style.display = "");
                    var s = function(w) {
                        typeof(t) == "function" && t(w);
                        var v = k.getXY(n.btn);
                        w.panel.style.top = (v.y + 20) + "px";
                        w.panel.style.left = (v.x - 190) + "px"
                    };
                    a.show(s)
                },
                hide: function(s) {
                    f.removeEvent(window, r.resize, "resize");
                    a.hide(s)
                },
                fire: function(s) {
                    a.fire(s)
                }
            }
    };
    (function(a) {
        a.miniblogPublisherVote = function(p) {
            var m = {};
            var f = Core.Events,
                l = App.Dom,
                g = p.button;
            var o = App.PopUpAlert();
            var k = null,
                j = null,
                b = null;
            var h = function() {
                    var q = f.getEventTarget();
                    if (l.contains(b.root.parentNode, q) || l.contains(g, q)) {} else {
                        k && k.hide();
                        f.removeEvent(document.body, h, "click")
                    }
                };
            var n = function() {
                    if (!j.checkLogin(arguments)) {
                        return
                    }
                    if (!k) {
                        var q = p.button;
                        k = App.showVote(q, function(s, v) {
                            var t = function() {
                                j.insertText(" " + s);
                                k.fire();
                                k = null
                            };
                            if (v) {
                                var z = Core.Dom.getXY(v);
                                var r = z[0] - ((200 - v.offsetWidth) / 2);
                                var w = z[1] - (v.offsetHeight) - 47;
                                o.yes(function() {
                                    setTimeout(t, 500)
                                });
                                o.position(r, w).content($CLTMSG.JQ0015).icon(3).wipe("up", true).lateClose(500)
                            } else {
                                t()
                            }
                        })
                    }
                    k.show();
                    m.clear = function() {
                        k.clear();
                        k = null;
                        f.removeEvent(document.body, h, "click")
                    };
                    b = k.getPanel();
                    f.addEvent(document.body, h)
                };
            m.init = function(q) {
                    j = q
                };
            f.addEvent(g, n);
            return m
        }
    })(App);
$registJob("publisher3", function() {
        var _addFeed = function(feedStr, extinfo) {
            if ($E("emptydata_msg")) {
                $E("emptydata_msg").style.display = "none"
            }
            var myTempFeedUl = $E("myTempFeedUl");
            var feedList = myTempFeedUl || $E("feed_list");
            feedList.style.display = "";
            if (feedList && feedStr != null) {
                var isWrite = feedList.getAttribute("iswrite");
                if (isWrite === "0") {
                    return
                }
                var ul = $C("ul"),
                    li, fstc = feedList.getElementsByTagName("li")[0];
                ul.className = "MIB_feed";
                with(ul.style) {
                        overflow = "hidden";
                        visibility = "hidden";
                        position = "relative";
                        clear = "both";
                        height = "0px"
                    }
                ul.innerHTML = feedStr;
                feedList.parentNode.insertBefore(ul, feedList);
                li = ul.getElementsByTagName("li")[0];
                li && (li.style[$IE ? "styleFloat" : "cssFloat"] = "left");
                try {
                        App.bindMedia(ul);
                        if (typeof App.regPopCard === "function") {
                            var spec = {
                                container: ul,
                                tag: "namecard"
                            };
                            App.regPopCard(spec)
                        }
                    } catch (e) {}
                setTimeout(function() {
                        App.Wipe(ul, li).wipe("down", false, function() {
                            if (scope.$eid) {
                                var betops = App.Dom.getByClass("betop", "img", feedList);
                                var len = betops.length;
                                if (len > 0) {
                                    var tmp = betops[len - 1];
                                    while (!App.Dom.hasClass(tmp, "MIB_linedot_l")) {
                                        tmp = tmp.parentNode
                                    }
                                    fstc = tmp.nextSibling
                                }
                            }
                            ul.style.cssText = "";
                            if (fstc) {
                                feedList.insertBefore(li, fstc)
                            } else {
                                feedList.appendChild(li)
                            }
                            ul.parentNode.removeChild(ul);
                            li.style.cssText = ""
                        }, true)
                    }, 1500)
            }
        };
        var pub = App.miniblogPublisher({
            editor: $E("publish_editor"),
            submit: $E("publisher_submit"),
            info: $E("publisher_info")
        }, {
            init: function(pub) {
                if (scope.$no_cookie_cache) {
                    return false
                }
                if (scope.$eid) {
                    return false
                }
                return true
            },
            onDisable: function() {
                $E("publisher_submit").parentNode.className = "postBtnBg bgColorA_No"
            },
            onEnable: function() {
                $E("publisher_submit").parentNode.className = "postBtnBg"
            },
            onLimit: function(len) {
                if (len >= 0 && len <= 140) {
                    $E("publisher_info").className = "wordNumBg";
                    $E("publisher_info").innerHTML = $CLTMSG.CD0071.replace(/#\{cls\}/, "pipsLim").replace(/#\{len\}/, 140 - len)
                } else {
                    $E("publisher_info").className = "wordNumBg error";
                    var _src = 'src="' + scope.$BASECSS + 'style/images/common/transparent.gif" ';
                    var _num = $CLTMSG.CD0072.replace(/#\{len\}/, (140 - len) * (-1));
                    $E("publisher_info").innerHTML = '<div class="word_c"><img ' + _src + ' title="" alt="" class="tipicon tip2">' + _num + '</div><b class="rcorner"></b>'
                }
            },
            onSuccess: function(json, params) {
                $E("publish_editor").parentNode.className = "inputsuccess";
                $E("publish_editor").style.display = "none";
                setTimeout(function() {
                    $E("publish_editor").parentNode.className = "inputarea";
                    $E("publish_editor").style.display = "";
                    $E("publish_editor").focus()
                }, 1000);
                if (typeof scope.$publishCallback === "function") {
                    try {
                        scope.$publishCallback(json, params)
                    } catch (e) {}
                }
                if (scope["$feedtype"] === "ispic" && !params.pic) {
                    return false
                }
                if (scope["$feedtype"] === "islink" && json.islink != 1) {
                    return false
                }
                if (scope["$feedtype"] === "isrt") {
                    return false
                }
                if (scope["$feedtype"] === "favorite") {
                    if (App.refurbishUpdate) {
                        App.refurbishUpdate.add(1)
                    }
                    return false
                }
                if (scope["$feedtype"] === "isat") {
                    if (App.refurbishUpdate) {
                        App.refurbishUpdate.add(1)
                    }
                    if (scope.$uname) {
                        if (!(new RegExp("(@|＠)" + scope.$uname + "([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(params.content)) {
                            return false
                        }
                    }
                }
                setTimeout(function() {
                    _addFeed(json.html, json.extinfo)
                }, 10)
            },
            onError: function() {},
            limitNum: 140,
            emptyStr: ["#请在这里输入自定义话题#"],
            topic: "",
            styleId: scope.styleid
        }).plugin(App.miniblogPublisherImage({
            button: $E("publisher_image")
        })).plugin(App.miniblogPublisherTopic({
            button: $E("publisher_topic")
        })).plugin(App.miniblogPublisherVideo({
            button: $E("publisher_video")
        })).plugin(App.miniblogPublisherMusic({
            button: $E("publisher_music")
        })).plugin(App.miniblogPublisherFace({
            button: $E("publisher_faces")
        })).plugin(App.miniblogPublisherVote({
            button: $E("publisher_vote")
        }))
    });
$registJob("topic", function() {
        var a = function() {
            var q = App.alert;
            var f = function(t) {
                if (t && t.code) {
                    q({
                        code: t.code
                    }, {
                        ok: function() {
                            if (scope.$uid == "123456") {
                                window.location.reload();
                                return
                            }
                        }
                    })
                } else {
                    q({
                        code: "R01404"
                    })
                }
                s = false
            };
            var s = false;
            var j = {
                addBox: $E("add_topic_box"),
                lisBox: $E("list_topic_box"),
                moreBox: $E("more_topic_box"),
                lisTit: $E("topic_list_title"),
                shell: $E("topic_list_shell"),
                newTopic: $E("add_topic_btn"),
                topic: $E("att_topic")
            };
            var r = {
                botton: '<a href="javascript:void(0);" onclick="App.topic.add(\'${keyword}\',this);return false;">' + $CLTMSG.CX0040 + "</a>",
                added: $CLTMSG.CX0041 + " (<a href=\"javascript:;\" onclick=\"App.topic.del('${keyid}','${keyword}',this);return false;\">" + $CLTMSG.CX0042 + "</a>)",
                item: '<a href="/k/${keyword}">${keyword}</a><span href="javascript:void();" onclick="App.topic.del(\'${keyid}\');return false;" title="' + $CLTMSG.CX0043 + '">x</span>'
            };
            var p = {
                addTopic: {
                    mtd: "POST",
                    url: "/dialog/adddialog.php"
                },
                delTopic: {
                    mtd: "POST",
                    url: "/dialog/deldialog.php"
                }
            };
            var k = function(v, x, t, y) {
                if (!p[v]) {
                    throw ("wrong key for request!")
                }
                if (!x) {
                    throw ("what is you want to update?")
                }
                t = t ||
                function() {};
                y = y || f;
                var w = {};
                w[p[v]["mtd"]] = x;
                w.onComplete = function(z) {
                    if (z.code == "A00006") {
                        t(z.data)
                    } else {
                        y(z)
                    }
                };
                w.onException = y;
                w.returnType = "json";
                Utils.Io.Ajax.request(p[v]["url"], w)
            };
            var b = j.lisBox ? true : false;
            var h = 10;
            App.topic = {
                add: function(t, y, w, v) {
                    if (s) {
                        return false
                    }
                    s = true;
                    w = w ||
                    function() {};
                    t = decodeURIComponent(t);
                    if (!t) {
                        return false
                    }
                    if (scope.$uid == "") {
                        App.ModLogin({
                            func: App.topic.add,
                            param: t
                        });
                        return
                    }
                    var x = function(B) {
                        if (scope.$uid == "123456") {
                            window.location.reload();
                            return
                        }
                        var D = B || "";
                        var F = r.added.replace(/\$\{keyword\}/g, encodeURIComponent(t)).replace(/\$\{keyid\}/g, D);
                        if (y) {
                            y.parentNode.innerHTML = F
                        }
                        if (j.addBox) {
                            j.addBox.innerHTML = F
                        }
                        if (b) {
                            var C = document.createElement("LI");
                            C.id = "topic_" + D;
                            t = Core.String.encodeHTML(Core.String.trim(t));
                            C.innerHTML = r.item.replace(/\$\{keyword\}/g, t).replace(/\$\{keyid\}/g, D);
                            if (App.topic.list.length == 0) {
                                j.lisBox.parentNode.style.display = "block"
                            }
                            var E = '<li id = "' + C.id + '" onmouseover="this.className=\'list_hover\'" onmouseout="this.className=\'\'">' + C.innerHTML + "</li>";
                            Core.Dom.insertHTML(j.lisBox, E, "AfterBegin");
                            App.topic.list.push(C);
                            j.lisTit.innerHTML = $CLTMSG.CX0044 + "(" + App.topic.list.length + ")";
                            if (App.topic.list.length > 10) {
                                if (j.moreBox) {
                                    var z = j.lisBox.getElementsByTagName("LI");
                                    for (var A = o; A >= 10; A--) {
                                        z[A].style.display = "none"
                                    }
                                    j.moreBox.style.display = "block"
                                }
                            }
                            w()
                        }
                        s = false
                    };
                    k("addTopic", {
                        keyWords: t
                    }, x, v)
                },
                del: function(v, t, x) {
                    s = false;
                    if (!v) {
                        return false
                    }
                    var w = function(A) {
                        if (b) {
                            try {
                                Core.Dom.removeNode("topic_" + v);
                                for (var z = 0, y = App.topic.list.length; z < y; z++) {
                                    if (App.topic.list[z].id == "topic_" + v) {
                                        App.topic.list.splice(z, 1);
                                        break
                                    }
                                }
                                j.lisTit.innerHTML = $CLTMSG.CX0044 + "(" + App.topic.list.length + ")"
                            } catch (B) {}
                        }
                        if (j.addBox) {
                            try {
                                if (scope["$search"] == t) {
                                    j.addBox.innerHTML = r.botton.replace(/\$\{keyword\}/g, t)
                                }
                            } catch (B) {}
                        }
                        if (x) {
                            try {
                                x.parentNode.innerHTML = r.botton.replace(/\$\{keyword\}/g, t)
                            } catch (B) {}
                        }
                        if (j.shell) {
                            if (!App.topic.list.length) {
                                j.shell.style.display = "none"
                            }
                        }
                    };
                    k("delTopic", {
                        id: v
                    }, w)
                },
                more: function(E) {
                    var v = [],
                        t = [];
                    for (var y = 0, w = 0, B = App.topic.list.length; y < B; y++) {
                            var z = App.topic.list[y];
                            if (z.style["display"] == "none") {
                                if (w < E) {
                                    w++;
                                    v.push(z);
                                    continue
                                }
                                t.push(z)
                            }
                        }
                    var D = 0;
                    var F = App.timer.add(function() {
                            if (D >= v.length) {
                                App.timer.remove(F);
                                if (App.topic.list.length > 0 && App.topic.list[App.topic.list.length - 1].style.display != "none") {
                                    if (j.moreBox) {
                                        j.moreBox.style.display = "none"
                                    }
                                }
                                return false
                            }
                            v[D].style.display = "";
                            D++
                        });
                    if (t.length > 0) {
                            return
                        }
                    var x = Core.Events.getEventTarget();
                    if (typeof(x) == "object") {
                            for (; !App.Dom.hasClass(x, "txt_right"); x = x.parentNode) {}
                            var C = App.Dom.getByClass("MIB_liner", "span", x);
                            if (C && C[0]) {
                                C[0].style.display = "none"
                            }
                            var A = x.getElementsByTagName("a");
                            if (A && A[1]) {
                                A[1].style.display = "none"
                            }
                        }
                },
                list: []
            };
            if (b) {
                var n = j.lisBox.getElementsByTagName("LI");
                for (var g = 0, o = n.length; g < o; g++) {
                    App.topic.list.push(n[g])
                }
            }
            if (j.newTopic) {
                var m = function() {
                    var v = [];
                    v.push('<div id="panel" style="position:absolute;left:0px;z-index:10;" class="small_Yellow pop_tips"><table class="CP_w" style="width: 200px;">');
                    v.push('<thead><tr><th class="tLeft"><span></span></th><th class="tMid"><span></span></th><th class="tRight"><span></span></th></tr></thead><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot>');
                    v.push('<tbody><tr><td class="tLeft"><span></span></td><td class="tMid">');
                    v.push('	<div class="tagslayer">');
                    v.push('		<p><input type="text" id="topic" class="PY_input" /><a id="save" href="javascript:;" class="btn_normal btnxs"><em>' + $CLTMSG.CC1102 + "</em></a></p>");
                    v.push('		<p class="txt"><span id="error">' + $CLTMSG.CC5001 + "</span></p>");
                    v.push('	</div></td><td class="tRight"><span></span></td></tr>');
                    v.push("</tbody></table>");
                    v.push('<div class="close"><a id="close" href="javascript:;"></a></div></div>');
                    var w = {
                        closePanel: function() {
                            x.domList.panel.style.display = "none";
                            x.domList.panel.parentNode.removeChild(x.domList.panel);
                            j.topic.style.cssText = ""
                        },
                        saveTopic: function() {
                            var z = j.lisBox.getElementsByTagName("li");
                            if (z.length >= 100) {
                                x.domList.error.style.cssText = "color:red;";
                                x.domList.error.innerHTML = $CLTMSG.CC5005;
                                return
                            }
                            var C = x.domList.topic.value.replace(/^\s+|\s+$/g, "");
                            var A = Core.String.byteLength(C);
                            if (A > 20) {
                                x.domList.error.style.cssText = "color:red;";
                                x.domList.error.innerHTML = $CLTMSG.CC5004;
                                return
                            }
                            var y = x.domList.topic.value.replace(/^\s+|\s+$/g, "");
                            if (y == "") {
                                x.domList.error.style.cssText = "color:red;";
                                x.domList.error.innerHTML = $CLTMSG.CC5002;
                                return
                            }
                            var B = false;
                            App.Dom.getBy(function(D) {
                                if (!B && D.innerHTML == y) {
                                    B = true
                                }
                            }, "a", j.lisBox);
                            if (!B) {
                                y = encodeURIComponent(y);
                                Core.Events.removeEvent(x.domList.save, w.saveTopic);
                                App.topic.add(y, null, function() {
                                    w.closePanel()
                                }, function(D) {
                                    Core.Events.addEvent(x.domList.save, w.saveTopic);
                                    x.domList.error.style.cssText = "color:red;";
                                    x.domList.error.innerHTML = $SYSMSG[D.code]
                                })
                            } else {
                                x.domList.error.style.cssText = "color:red;";
                                x.domList.error.innerHTML = $CLTMSG.CC5003
                            }
                        }
                    };
                    var t = {
                        template: v.join(""),
                        box: j.topic
                    };
                    var x = App.builder2(t);
                    Core.Events.addEvent(x.domList.save, w.saveTopic);
                    Core.Events.addEvent(x.domList.close, w.closePanel);
                    App.TextareaUtils.setCursor(x.domList.topic)
                };
                var l = function() {
                    var t = App.Dom.getByClass("pop_tips", "div", j.topic) || [];
                    if (t.length > 0) {
                        return
                    }
                    j.topic.style.cssText = "position:relative;overflow:visible;z-index:4;";
                    m()
                };
                Core.Events.addEvent(j.newTopic, l)
            }
        };
        if (scope.rightmodule) {
            App.CustomEvent.add("widget", "app5", a)
        } else {
            a()
        }
    });
App.Comment = {
        loadData: function(f, h, g, b, a) {
            Core.Class.extend(g, scope.commentConfig.params);
            Utils.Io.Ajax.request(f, {
                onComplete: function(j) {
                    if (j.code == "A00006" && h != null) {
                        h.innerHTML = j.data;
                        b(j)
                    } else {
                        if (j.code == "A00003") {} else {
                            a(j)
                        }
                    }
                }.bind2(this),
                onException: function(j) {},
                returnType: "json",
                GET: g
            })
        },
        post: function(f, g, b, a) {
            Core.Class.extend(g, scope.commentConfig.params);
            g.content && (g.content = g.content.replace(/\uff20/ig, "@"));
            Utils.Io.Ajax.request(f, {
                POST: g,
                onComplete: function(h) {
                    scope.commentConfig.params.retcode = "";
                    if (h.code == "A00006") {
                        b(h)
                    } else {
                        if (h.code == "M00008") {
                            window.location.href = h.data
                        } else {
                            a(h)
                        }
                    }
                }.bind2(this),
                onException: function() {
                    scope.commentConfig.params.retcode = ""
                },
                returnType: "json"
            })
        },
        addComment: function(h, k, g, f) {
            var b = false;
            var j = function() {
                if (k.locked) {
                    return
                }
                k.locked = true;
                k.className = "btn_notclick";
                var n = k.oParam;
                if (n) {
                    var l = $E("_comment_content_" + n.productId + "_" + n.resourceId + ((n.cid && n.listInDiv != 1) ? "_" + n.cid : "")).value;
                    var p = Core.String.trim(l);
                    var o = new RegExp("^" + $CLTMSG.CC0501 + "[^:]*:");
                    var m = new RegExp("^" + $CLTMSG.CC0501 + "[^:]*:$");
                    if (p == "" || (o.test(p) && (m.test(p)))) {
                        f.bind2(k)({
                            code: "SCM008"
                        });
                        return
                    }
                    n.content = l;
                    if (n.forward) {
                        h += "?f=1"
                    }
                }
                this.post(h, n, (function(r, q) {
                    return function(t) {
                        if (r.$loginDiv && r.$loginuser && r.$loginpassword) {
                            setTimeout(function() {
                                window.location.reload()
                            }, 10);
                            return
                        }
                        r.locked = false;
                        r.className = "btn_normal";
                        var s = $E("_comment_count_" + r.oParam.productId + "_" + r.oParam.resourceId);
                        try {
                            if (t.data) {
                                App.Comment.count(s, "+")
                            }
                        } catch (v) {}
                        q(r, t)
                    }
                })(k, g), f ||
                function() {})
            };
            if (k.$loginDiv && k.$loginuser && k.$loginpassword) {
                if (!k.$loginuser.value || k.$loginuser.value == $SYSMSG.R01008) {
                    App.alert($SYSMSG.M00901);
                    return
                }
                if (k.$loginpassword.value == "") {
                    App.alert($SYSMSG.M00902);
                    return
                }
                b = true;
                var a = {
                    name: k.$loginuser.value,
                    pwd: k.$loginpassword.value,
                    remb: true,
                    succ: j.bind2(this),
                    error: function(m, l) {
                        if (l == "4010") {
                            var n = App.getMsg("R01010", {
                                mail: k.$loginuser.value
                            });
                            App.alert(n)
                        } else {
                            App.alert(m)
                        }
                    }
                };
                App.LoginAction(a)
            } else {
                j.bind2(this)()
            }
        },
        deleteComment: function(f, g, b, a) {
            this.post(f, g, function(j) {
                var h = $E("_comment_count_" + g.productId + "_" + g.resId);
                try {
                    this.count(h, "-")
                } catch (k) {}
                b()
            }.bind2(this), a ||
            function() {})
        },
        count: function(oNode, sMethod) {
            var s = oNode.getElementsByTagName("strong");
            if (s && (s = s[1])) {
                var count = s.innerHTML;
                count = parseInt(count.match(/(\d+)/));
                count = ((count + "") == "NaN" ? 0 : count);
                count = Math.max(eval(count + sMethod + 1), 0);
                s.innerHTML = "";
                count && (s.innerHTML = ["(", count, ")"].join(""))
            }
        },
        superCount: function(f, a, b) {},
        setCount: function(b, a) {
            if (a > 0) {
                b.innerHTML = $CLTMSG.CC0502 + "<strong>(" + a + ")</strong>"
            } else {
                b.innerHTML = $CLTMSG.CC0502
            }
        },
        login: function() {},
        listenerUserInput: function(b, f) {
            b = $E(b);
            if (b == null) {
                return
            }
            var a = function(h) {
                var g = Core.String.byteLength(this.value);
                if (g > h) {
                    this.value = Core.String.leftB(this.value, h)
                }
            };
            App.BindAtToTextarea(b, {
                borderWidth: "1px",
                fontSize: "12px"
            });
            App.autoHeightTextArea(b, Core.Function.bind3(a, b, [f]))
        },
        changeArrow: function(b, a) {
            if (b != null) {
                switch (a) {
                case "up":
                    b.className = "off";
                    break;
                case "down":
                    b.className = "on";
                    break
                }
            }
        },
        alert: function(a, b, f, g, h) {
            return App.flyDialog(b, (!h) ? "alert" : "confirm", a, {
                icon: f,
                ok: g
            })
        },
        tip: function(a, b, f, g, h) {
            return App.flyDialog(b, (!h) ? "alert" : "confirm", a, {
                icon: f,
                ok: g,
                hasBtn: false
            })
        },
        getTarget: function() {
            try {
                var b = Core.Events.getEvent();
                var a = b ? (b.srcElement || b.target) : null
            } catch (f) {
                return null
            }
            return a
        },
        focus: function(f, a) {
            if (!f) {
                return
            }
            try {
                App.TextareaUtils.setCursor(f)
            } catch (b) {}
            if (a) {
                setTimeout(function() {
                    window.scrollTo(0, a)
                }, 20)
            }
        }
    };
    (function() {
        var a = {};
        a.prov0 = $CLTMSG.CX0078;
        a.code0 = "0";
        a.prov34 = $CLTMSG.CX0079;
        a.code34 = "1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18";
        a.prov11 = $CLTMSG.CX0080;
        a.code11 = "1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,28,29";
        a.prov50 = $CLTMSG.CX0081;
        a.code50 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,81,82,83,84";
        a.prov35 = $CLTMSG.CX0082;
        a.code35 = "1,2,3,4,5,6,7,8,9";
        a.prov62 = $CLTMSG.CX0083;
        a.code62 = "1,2,3,4,5,6,7,8,9,10,24,26,29,30";
        a.prov44 = $CLTMSG.CX0084;
        a.code44 = "1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,51,52,53";
        a.prov45 = $CLTMSG.CX0085;
        a.code45 = "21,22,3,4,5,6,7,8,9,10,11,12";
        a.prov52 = $CLTMSG.CX0086;
        a.code52 = "1,2,3,4,22,23,24,26,27";
        a.prov46 = $CLTMSG.CX0087;
        a.code46 = "1,2,90";
        a.prov13 = $CLTMSG.CX0088;
        a.code13 = "1,2,3,4,5,6,7,8,9,10,11";
        a.prov23 = $CLTMSG.CX0089;
        a.code23 = "1,2,3,4,5,6,7,8,9,10,11,12,27";
        a.prov41 = $CLTMSG.CX0090;
        a.code41 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18";
        a.prov42 = $CLTMSG.CX0091;
        a.code42 = "1,2,3,5,6,7,8,9,10,11,12,13,28,29,30,31,32";
        a.prov43 = $CLTMSG.CX0092;
        a.code43 = "1,2,3,4,5,6,7,8,9,10,11,12,13,31";
        a.prov15 = $CLTMSG.CX0093;
        a.code15 = "1,2,3,4,5,6,7,22,25,26,28,29";
        a.prov32 = $CLTMSG.CX0094;
        a.code32 = "1,2,3,4,5,6,7,8,9,10,11,12,13";
        a.prov36 = $CLTMSG.CX0095;
        a.code36 = "1,2,3,4,5,6,7,8,9,10,11";
        a.prov22 = $CLTMSG.CX0096;
        a.code22 = "1,2,3,4,5,6,7,8,24";
        a.prov21 = $CLTMSG.CX0097;
        a.code21 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14";
        a.prov64 = $CLTMSG.CX0098;
        a.code64 = "1,2,3,4";
        a.prov63 = $CLTMSG.CX0099;
        a.code63 = "1,21,22,23,25,26,27,28";
        a.prov14 = $CLTMSG.CX0100;
        a.code14 = "1,2,3,4,5,6,7,8,9,10,23";
        a.prov37 = $CLTMSG.CX0101;
        a.code37 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17";
        a.prov31 = $CLTMSG.CX0102;
        a.code31 = "1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,30";
        a.prov51 = $CLTMSG.CX0103;
        a.code51 = "1,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,32,33,34";
        a.prov12 = $CLTMSG.CX0104;
        a.code12 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,21,23,25,26,27";
        a.prov54 = $CLTMSG.CX0105;
        a.code54 = "1,21,22,23,24,25,26";
        a.prov65 = $CLTMSG.CX0106;
        a.code65 = "1,2,21,22,23,27,28,29,30,31,32,40,42,43,44";
        a.prov53 = $CLTMSG.CX0107;
        a.code53 = "1,3,4,5,6,23,25,26,27,28,29,31,32,33,34,35";
        a.prov33 = $CLTMSG.CX0108;
        a.code33 = "1,2,3,4,5,6,7,8,9,10,11";
        a.prov61 = $CLTMSG.CX0109;
        a.code61 = "1,2,3,4,5,6,7,8,9,10";
        a.prov71 = $CLTMSG.CX0110;
        a.code71 = "1,2,3,4,5,6,7,90";
        a.prov81 = $CLTMSG.CX0111;
        a.code81 = "1";
        a.prov82 = $CLTMSG.CX0112;
        a.code82 = "1";
        a.prov400 = $CLTMSG.CX0113;
        a.code400 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,16";
        a.prov100 = "";
        a.code100 = "";
        a.provinces = $CLTMSG.CX0114;
        a.provcodes = "34,11,50,35,62,44,45,52,46,13,23,41,42,43,15,32,36,22,21,64,63,14,37,31,51,12,54,65,53,33,61,71,81,82,400,100";
        App.ProvinceAndCity = function(h, k, n, l, m, f, g, b, j) {
            this.provDom = h;
            this.cityDom = k;
            this.provCode = n;
            this.cityCode = l;
            this.areaDom = m;
            this.areaCode = f;
            this.is3level = b;
            this.noLimit = j;
            this.areacache = {};
            this.cache = {};
            if (g) {
                this.areaDisplay = document.getElementsByName(g)
            }
            this.init()
        };
        (function(b) {
            b.init = function() {
                this.loadProv();
                this.loadCity();
                if (this.is3level) {
                    this.loadArea()
                }
                Core.Events.addEvent(this.provDom, (function(f) {
                    return function() {
                        f.provCode = f.provDom.value;
                        if (!f.noLimit) {
                            f.cityCode = f.provCode === "400" ? 1 : 1000
                        } else {
                            if (f.noLimit.city) {
                                f.cityCode = 1
                            } else {
                                f.cityCode = 1000
                            }
                        }
                        f.provCode = f.provDom.value;
                        f.loadCity();
                        f.loadArea()
                    }
                })(this), "change");
                Core.Events.addEvent(this.cityDom, (function(f) {
                    return function() {
                        if (!f.noLimit) {
                            f.areaCode = 1000
                        } else {
                            if (f.noLimit.area) {
                                f.areaCode = 1
                            } else {
                                f.areaCode = 1000
                            }
                        }
                        f.cityCode = f.cityDom.value;
                        f.loadArea()
                    }
                })(this), "change")
            };
            b.disp = function() {};
            b.loadProv = function() {
                var g = this.provDom.options;
                var j = a.provcodes.split(",");
                var h = a.provinces.split(",");
                if (g.length <= 1) {
                    if (!(this.noLimit && this.noLimit.province)) {
                        g[0] = new Option($CLTMSG.CX0115, 0)
                    }
                    for (var k = 0, f = j.length; k < f; k++) {
                        g[g.length] = new Option(h[k], j[k])
                    }
                }
                if (Core.Array.findit(j, this.provCode) != -1) {
                    this.provDom.value = this.provCode
                } else {
                    this.provDom.value = 0
                }
            };
            b.loadCity = function() {
                if (this.provCode == "1001") {
                    this.cityDom.style.display = "none";
                    this.cityDom.disabled = true;
                    return false
                } else {
                    this.cityDom.disabled = false;
                    this.cityDom.style.display = ""
                }
                var k = this.cityDom.options;
                while (k.length) {
                    this.cityDom.remove(0)
                }
                var g = a["code" + this.provCode].split(",");
                var j = a["prov" + this.provCode].split(",");
                if (!(this.noLimit && this.noLimit.city) && (this.provCode !== "400")) {
                    k[0] = new Option($CLTMSG.CX0116, 1000)
                }
                for (var h = 0, f = g.length; h < f; h++) {
                    if (j[h] && g[h]) {
                        k[k.length] = new Option(j[h], g[h])
                    }
                }
                if (Core.Array.findit(g, this.cityCode) != -1) {
                    this.cityDom.value = this.cityCode
                } else {
                    if (!this.noLimit) {
                        this.cityDom.value = 1000
                    } else {
                        if (this.noLimit.city) {
                            this.cityDom.value = 1
                        }
                    }
                }
            };
            b.displayarea = function(h, k, o, g) {
                if (o && o.length > 0) {
                    if (!h || h.length == 0) {
                        for (var f = 0, l = o.length; f < l; f++) {
                            o[f].style.display = "none"
                        }
                        return false
                    }
                    for (var f = 0, l = o.length; f < l; f++) {
                        o[f].style.display = ""
                    }
                }
                if (!(g && g.area)) {
                    k[0] = new Option($CLTMSG.CC5802, 1000)
                }
                for (var j = 0, l = h.length; j < l; j++) {
                    var n = h[j]["value"];
                    var p = h[j]["text"];
                    if (p && n) {
                        k[k.length] = new Option(p, n)
                    }
                }
            };
            b.loadArea = function() {
                if (!this.is3level) {
                    return false
                }
                var g = this.areaDom.options;
                var h = this.areaDisplay;
                var f = this.cache;
                while (g.length) {
                    this.areaDom.remove(0)
                }
                var j = this;
                if (!f[j.provCode + "_" + j.cityCode]) {
                    App.doRequest({
                        province: this.provDom.value,
                        city: this.cityDom.value
                    }, "/person/aj_getarea.php", function(k) {
                        b.displayarea(k, g, h, j.noLimit);
                        f[j.provCode + "_" + j.cityCode] = k
                    }, function() {})
                } else {
                    b.displayarea(this.cache[this.provCode + "_" + this.cityCode], g, h, j.noLimit)
                }
            };
            b.loadNewData = function(f, g) {
                this.provCode = f;
                this.cityCode = g;
                this.loadProv();
                this.loadCity();
                if (this.is3level) {
                    this.loadArea()
                }
            }
        })(App.ProvinceAndCity.prototype)
    })();
App.queryToJson = function(b, j) {
        var h = (Core.String.trim(b)).split("&");
        var f = {};
        var k = function(m) {
            if (j) {
                return decodeURIComponent(m)
            } else {
                return m
            }
        };
        for (var g = 0, a = h.length; g < a; g++) {
            if (h[g]) {
                var l = h[g].split("=");
                if (l[1]) {
                    if (!f[l[0]]) {
                        f[l[0]] = k(l[1])
                    } else {
                        f[l[0]] = [k(l[1])].concat(f[l[0]])
                    }
                } else {
                    if (!f["$nullName"]) {
                        f["$nullName"] = k(l[0])
                    } else {
                        f["$nullName"] = [k(l[0])].concat(f["$nullName"])
                    }
                }
            }
        }
        return f
    };
App.finishInformation = function() {
        window.location.href = "/person/full_info.php"
    };
   //3#
App.sizzle = (function() {
        var s = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            m = 0,
            g = Object.prototype.toString,
            r = false,
            l = true;[0, 0].sort(function() {
                l = false;
                return 0
            });
        var b = function(A, v, D, E) {
                D = D || [];
                v = v || document;
                var G = v;
                if (v.nodeType !== 1 && v.nodeType !== 9) {
                    return []
                }
                if (!A || typeof A !== "string") {
                    return D
                }
                var B = [],
                    x, I, L, w, z = true,
                    y = b.isXML(v),
                    F = A,
                    H, K, J, C;
                do {
                        s.exec("");
                        x = s.exec(F);
                        if (x) {
                            F = x[3];
                            B.push(x[1]);
                            if (x[2]) {
                                w = x[3];
                                break
                            }
                        }
                    } while (x);
                if (B.length > 1 && n.exec(A)) {
                        if (B.length === 2 && h.relative[B[0]]) {
                            I = k(B[0] + B[1], v)
                        } else {
                            I = h.relative[B[0]] ? [v] : b(B.shift(), v);
                            while (B.length) {
                                A = B.shift();
                                if (h.relative[A]) {
                                    A += B.shift()
                                }
                                I = k(A, I)
                            }
                        }
                    } else {
                        if (!E && B.length > 1 && v.nodeType === 9 && !y && h.match.ID.test(B[0]) && !h.match.ID.test(B[B.length - 1])) {
                            H = b.find(B.shift(), v, y);
                            v = H.expr ? b.filter(H.expr, H.set)[0] : H.set[0]
                        }
                        if (v) {
                            H = E ? {
                                expr: B.pop(),
                                set: a(E)
                            } : b.find(B.pop(), B.length === 1 && (B[0] === "~" || B[0] === "+") && v.parentNode ? v.parentNode : v, y);
                            I = H.expr ? b.filter(H.expr, H.set) : H.set;
                            if (B.length > 0) {
                                L = a(I)
                            } else {
                                z = false
                            }
                            while (B.length) {
                                K = B.pop();
                                J = K;
                                if (!h.relative[K]) {
                                    K = ""
                                } else {
                                    J = B.pop()
                                }
                                if (J == null) {
                                    J = v
                                }
                                h.relative[K](L, J, y)
                            }
                        } else {
                            L = B = []
                        }
                    }
                if (!L) {
                        L = I
                    }
                if (!L) {
                        b.error(K || A)
                    }
                if (g.call(L) === "[object Array]") {
                        if (!z) {
                            D.push.apply(D, L)
                        } else {
                            if (v && v.nodeType === 1) {
                                for (C = 0; L[C] != null; C++) {
                                    if (L[C] && (L[C] === true || L[C].nodeType === 1 && b.contains(v, L[C]))) {
                                        D.push(I[C])
                                    }
                                }
                            } else {
                                for (C = 0; L[C] != null; C++) {
                                    if (L[C] && L[C].nodeType === 1) {
                                        D.push(I[C])
                                    }
                                }
                            }
                        }
                    } else {
                        a(L, D)
                    }
                if (w) {
                        b(w, G, D, E);
                        b.uniqueSort(D)
                    }
                return D
            };
        b.uniqueSort = function(w) {
                if (f) {
                    r = l;
                    w.sort(f);
                    if (r) {
                        for (var v = 1; v < w.length; v++) {
                            if (w[v] === w[v - 1]) {
                                w.splice(v--, 1)
                            }
                        }
                    }
                }
                return w
            };
        b.matches = function(v, w) {
                return b(v, null, null, w)
            };
        b.find = function(C, v, D) {
                var B;
                if (!C) {
                    return []
                }
                for (var y = 0, x = h.order.length; y < x; y++) {
                    var A = h.order[y],
                        z;
                    if ((z = h.leftMatch[A].exec(C))) {
                            var w = z[1];
                            z.splice(1, 1);
                            if (w.substr(w.length - 1) !== "\\") {
                                z[1] = (z[1] || "").replace(/\\/g, "");
                                B = h.find[A](z, v, D);
                                if (B != null) {
                                    C = C.replace(h.match[A], "");
                                    break
                                }
                            }
                        }
                }
                if (!B) {
                    B = v.getElementsByTagName("*")
                }
                return {
                    set: B,
                    expr: C
                }
            };
        b.filter = function(G, F, J, z) {
                var x = G,
                    L = [],
                    D = F,
                    B, v, C = F && F[0] && b.isXML(F[0]);
                while (G && F.length) {
                        for (var E in h.filter) {
                            if ((B = h.leftMatch[E].exec(G)) != null && B[2]) {
                                var w = h.filter[E],
                                    K, I, y = B[1];
                                v = false;
                                B.splice(1, 1);
                                if (y.substr(y.length - 1) === "\\") {
                                        continue
                                    }
                                if (D === L) {
                                        L = []
                                    }
                                if (h.preFilter[E]) {
                                        B = h.preFilter[E](B, D, J, L, z, C);
                                        if (!B) {
                                            v = K = true
                                        } else {
                                            if (B === true) {
                                                continue
                                            }
                                        }
                                    }
                                if (B) {
                                        for (var A = 0;
                                        (I = D[A]) != null; A++) {
                                            if (I) {
                                                K = w(I, B, A, D);
                                                var H = z ^ !! K;
                                                if (J && K != null) {
                                                    if (H) {
                                                        v = true
                                                    } else {
                                                        D[A] = false
                                                    }
                                                } else {
                                                    if (H) {
                                                        L.push(I);
                                                        v = true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                if (K !== undefined) {
                                        if (!J) {
                                            D = L
                                        }
                                        G = G.replace(h.match[E], "");
                                        if (!v) {
                                            return []
                                        }
                                        break
                                    }
                            }
                        }
                        if (G === x) {
                            if (v == null) {
                                b.error(G)
                            } else {
                                break
                            }
                        }
                        x = G
                    }
                return D
            };
        b.error = function(v) {
                throw "Syntax error, unrecognized expression: " + v
            };
        var h = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function(v) {
                        return v.getAttribute("href")
                    }
                },
                relative: {
                    "+": function(B, w) {
                        var y = typeof w === "string",
                            A = y && !/\W/.test(w),
                            C = y && !A;
                        if (A) {
                                w = w.toLowerCase()
                            }
                        for (var x = 0, v = B.length, z; x < v; x++) {
                                if ((z = B[x])) {
                                    while ((z = z.previousSibling) && z.nodeType !== 1) {}
                                    B[x] = C || z && z.nodeName.toLowerCase() === w ? z || false : z === w
                                }
                            }
                        if (C) {
                                b.filter(w, B, true)
                            }
                    },
                    ">": function(B, w) {
                        var z = typeof w === "string",
                            A, x = 0,
                            v = B.length;
                        if (z && !/\W/.test(w)) {
                                w = w.toLowerCase();
                                for (; x < v; x++) {
                                    A = B[x];
                                    if (A) {
                                        var y = A.parentNode;
                                        B[x] = y.nodeName.toLowerCase() === w ? y : false
                                    }
                                }
                            } else {
                                for (; x < v; x++) {
                                    A = B[x];
                                    if (A) {
                                        B[x] = z ? A.parentNode : A.parentNode === w
                                    }
                                }
                                if (z) {
                                    b.filter(w, B, true)
                                }
                            }
                    },
                    "": function(y, w, A) {
                        var x = m++,
                            v = t,
                            z;
                        if (typeof w === "string" && !/\W/.test(w)) {
                                w = w.toLowerCase();
                                z = w;
                                v = q
                            }
                        v("parentNode", w, x, y, z, A)
                    },
                    "~": function(y, w, A) {
                        var x = m++,
                            v = t,
                            z;
                        if (typeof w === "string" && !/\W/.test(w)) {
                                w = w.toLowerCase();
                                z = w;
                                v = q
                            }
                        v("previousSibling", w, x, y, z, A)
                    }
                },
                find: {
                    ID: function(w, x, y) {
                        if (typeof x.getElementById !== "undefined" && !y) {
                            var v = x.getElementById(w[1]);
                            return v ? [v] : []
                        }
                    },
                    NAME: function(x, A) {
                        if (typeof A.getElementsByName !== "undefined") {
                            var w = [],
                                z = A.getElementsByName(x[1]);
                            for (var y = 0, v = z.length; y < v; y++) {
                                    if (z[y].getAttribute("name") === x[1]) {
                                        w.push(z[y])
                                    }
                                }
                            return w.length === 0 ? null : w
                        }
                    },
                    TAG: function(v, w) {
                        return w.getElementsByTagName(v[1])
                    }
                },
                preFilter: {
                    CLASS: function(y, w, x, v, B, C) {
                        y = " " + y[1].replace(/\\/g, "") + " ";
                        if (C) {
                            return y
                        }
                        for (var z = 0, A;
                        (A = w[z]) != null; z++) {
                            if (A) {
                                if (B ^ (A.className && (" " + A.className + " ").replace(/[\t\n]/g, " ").indexOf(y) >= 0)) {
                                    if (!x) {
                                        v.push(A)
                                    }
                                } else {
                                    if (x) {
                                        w[z] = false
                                    }
                                }
                            }
                        }
                        return false
                    },
                    ID: function(v) {
                        return v[1].replace(/\\/g, "")
                    },
                    TAG: function(w, v) {
                        return w[1].toLowerCase()
                    },
                    CHILD: function(v) {
                        if (v[1] === "nth") {
                            var w = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(v[2] === "even" && "2n" || v[2] === "odd" && "2n+1" || !/\D/.test(v[2]) && "0n+" + v[2] || v[2]);
                            v[2] = (w[1] + (w[2] || 1)) - 0;
                            v[3] = w[3] - 0
                        }
                        v[0] = m++;
                        return v
                    },
                    ATTR: function(z, w, x, v, A, B) {
                        var y = z[1].replace(/\\/g, "");
                        if (!B && h.attrMap[y]) {
                            z[1] = h.attrMap[y]
                        }
                        if (z[2] === "~=") {
                            z[4] = " " + z[4] + " "
                        }
                        return z
                    },
                    PSEUDO: function(z, w, x, v, A) {
                        if (z[1] === "not") {
                            if ((s.exec(z[3]) || "").length > 1 || /^\w/.test(z[3])) {
                                z[3] = b(z[3], null, null, w)
                            } else {
                                var y = b.filter(z[3], w, x, true ^ A);
                                if (!x) {
                                    v.push.apply(v, y)
                                }
                                return false
                            }
                        } else {
                            if (h.match.POS.test(z[0]) || h.match.CHILD.test(z[0])) {
                                return true
                            }
                        }
                        return z
                    },
                    POS: function(v) {
                        v.unshift(true);
                        return v
                    }
                },
                filters: {
                    enabled: function(v) {
                        return v.disabled === false && v.type !== "hidden"
                    },
                    disabled: function(v) {
                        return v.disabled === true
                    },
                    checked: function(v) {
                        return v.checked === true
                    },
                    selected: function(v) {
                        v.parentNode.selectedIndex;
                        return v.selected === true
                    },
                    parent: function(v) {
                        return !!v.firstChild
                    },
                    empty: function(v) {
                        return !v.firstChild
                    },
                    has: function(x, w, v) {
                        return !!b(v[3], x).length
                    },
                    header: function(v) {
                        return (/h\d/i).test(v.nodeName)
                    },
                    text: function(v) {
                        return "text" === v.type
                    },
                    radio: function(v) {
                        return "radio" === v.type
                    },
                    checkbox: function(v) {
                        return "checkbox" === v.type
                    },
                    file: function(v) {
                        return "file" === v.type
                    },
                    password: function(v) {
                        return "password" === v.type
                    },
                    submit: function(v) {
                        return "submit" === v.type
                    },
                    image: function(v) {
                        return "image" === v.type
                    },
                    reset: function(v) {
                        return "reset" === v.type
                    },
                    button: function(v) {
                        return "button" === v.type || v.nodeName.toLowerCase() === "button"
                    },
                    input: function(v) {
                        return (/input|select|textarea|button/i).test(v.nodeName)
                    }
                },
                setFilters: {
                    first: function(w, v) {
                        return v === 0
                    },
                    last: function(x, w, v, y) {
                        return w === y.length - 1
                    },
                    even: function(w, v) {
                        return v % 2 === 0
                    },
                    odd: function(w, v) {
                        return v % 2 === 1
                    },
                    lt: function(x, w, v) {
                        return w < v[3] - 0
                    },
                    gt: function(x, w, v) {
                        return w > v[3] - 0
                    },
                    nth: function(x, w, v) {
                        return v[3] - 0 === w
                    },
                    eq: function(x, w, v) {
                        return v[3] - 0 === w
                    }
                },
                filter: {
                    PSEUDO: function(x, C, B, D) {
                        var v = C[1],
                            w = h.filters[v];
                        if (w) {
                                return w(x, B, C, D)
                            } else {
                                if (v === "contains") {
                                    return (x.textContent || x.innerText || b.getText([x]) || "").indexOf(C[3]) >= 0
                                } else {
                                    if (v === "not") {
                                        var y = C[3];
                                        for (var A = 0, z = y.length; A < z; A++) {
                                            if (y[A] === x) {
                                                return false
                                            }
                                        }
                                        return true
                                    } else {
                                        b.error("Syntax error, unrecognized expression: " + v)
                                    }
                                }
                            }
                    },
                    CHILD: function(v, y) {
                        var B = y[1],
                            w = v;
                        switch (B) {
                            case "only":
                            case "first":
                                while ((w = w.previousSibling)) {
                                    if (w.nodeType === 1) {
                                        return false
                                    }
                                }
                                if (B === "first") {
                                    return true
                                }
                                w = v;
                            case "last":
                                while ((w = w.nextSibling)) {
                                    if (w.nodeType === 1) {
                                        return false
                                    }
                                }
                                return true;
                            case "nth":
                                var x = y[2],
                                    E = y[3];
                                if (x === 1 && E === 0) {
                                        return true
                                    }
                                var A = y[0],
                                    D = v.parentNode;
                                if (D && (D.sizcache !== A || !v.nodeIndex)) {
                                        var z = 0;
                                        for (w = D.firstChild; w; w = w.nextSibling) {
                                            if (w.nodeType === 1) {
                                                w.nodeIndex = ++z
                                            }
                                        }
                                        D.sizcache = A
                                    }
                                var C = v.nodeIndex - E;
                                if (x === 0) {
                                        return C === 0
                                    } else {
                                        return (C % x === 0 && C / x >= 0)
                                    }
                            }
                    },
                    ID: function(w, v) {
                        return w.nodeType === 1 && w.getAttribute("id") === v
                    },
                    TAG: function(w, v) {
                        return (v === "*" && w.nodeType === 1) || w.nodeName.toLowerCase() === v
                    },
                    CLASS: function(w, v) {
                        return (" " + (w.className || w.getAttribute("class")) + " ").indexOf(v) > -1
                    },
                    ATTR: function(A, y) {
                        var x = y[1],
                            v = h.attrHandle[x] ? h.attrHandle[x](A) : A[x] != null ? A[x] : A.getAttribute(x),
                            B = v + "",
                            z = y[2],
                            w = y[4];
                        return v == null ? z === "!=" : z === "=" ? B === w : z === "*=" ? B.indexOf(w) >= 0 : z === "~=" ? (" " + B + " ").indexOf(w) >= 0 : !w ? B && v !== false : z === "!=" ? B !== w : z === "^=" ? B.indexOf(w) === 0 : z === "$=" ? B.substr(B.length - w.length) === w : z === "|=" ? B === w || B.substr(0, w.length + 1) === w + "-" : false
                    },
                    POS: function(z, w, x, A) {
                        var v = w[2],
                            y = h.setFilters[v];
                        if (y) {
                                return y(z, x, w, A)
                            }
                    }
                }
            };
        b.selectors = h;
        var n = h.match.POS,
            j = function(w, v) {
                return "\\" + (v - 0 + 1)
            };
        for (var p in h.match) {
                h.match[p] = new RegExp(h.match[p].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
                h.leftMatch[p] = new RegExp(/(^(?:.|\r|\n)*?)/.source + h.match[p].source.replace(/\\(\d+)/g, j))
            }
        var a = function(w, v) {
                w = Array.prototype.slice.call(w, 0);
                if (v) {
                    v.push.apply(v, w);
                    return v
                }
                return w
            };
        try {
                Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
            } catch (o) {
                a = function(z, y) {
                    var w = y || [],
                        x = 0;
                    if (g.call(z) === "[object Array]") {
                            Array.prototype.push.apply(w, z)
                        } else {
                            if (typeof z.length === "number") {
                                for (var v = z.length; x < v; x++) {
                                    w.push(z[x])
                                }
                            } else {
                                for (; z[x]; x++) {
                                    w.push(z[x])
                                }
                            }
                        }
                    return w
                }
            }
        var f;
        if (document.documentElement.compareDocumentPosition) {
                f = function(w, v) {
                    if (!w.compareDocumentPosition || !v.compareDocumentPosition) {
                        if (w == v) {
                            r = true
                        }
                        return w.compareDocumentPosition ? -1 : 1
                    }
                    var x = w.compareDocumentPosition(v) & 4 ? -1 : w === v ? 0 : 1;
                    if (x === 0) {
                        r = true
                    }
                    return x
                }
            } else {
                if ("sourceIndex" in document.documentElement) {
                    f = function(w, v) {
                        if (!w.sourceIndex || !v.sourceIndex) {
                            if (w == v) {
                                r = true
                            }
                            return w.sourceIndex ? -1 : 1
                        }
                        var x = w.sourceIndex - v.sourceIndex;
                        if (x === 0) {
                            r = true
                        }
                        return x
                    }
                } else {
                    if (document.createRange) {
                        f = function(y, w) {
                            if (!y.ownerDocument || !w.ownerDocument) {
                                if (y == w) {
                                    r = true
                                }
                                return y.ownerDocument ? -1 : 1
                            }
                            var x = y.ownerDocument.createRange(),
                                v = w.ownerDocument.createRange();
                            x.setStart(y, 0);
                            x.setEnd(y, 0);
                            v.setStart(w, 0);
                            v.setEnd(w, 0);
                            var z = x.compareBoundaryPoints(Range.START_TO_END, v);
                            if (z === 0) {
                                    r = true
                                }
                            return z
                        }
                    }
                }
            }
        b.getText = function(v) {
                var w = "",
                    y;
                for (var x = 0; v[x]; x++) {
                        y = v[x];
                        if (y.nodeType === 3 || y.nodeType === 4) {
                            w += y.nodeValue
                        } else {
                            if (y.nodeType !== 8) {
                                w += b.getText(y.childNodes)
                            }
                        }
                    }
                return w
            };
            (function() {
                var w = document.createElement("div"),
                    x = "script" + (new Date()).getTime();
                w.innerHTML = "<a name='" + x + "'/>";
                var v = document.documentElement;
                v.insertBefore(w, v.firstChild);
                if (document.getElementById(x)) {
                        h.find.ID = function(z, A, B) {
                            if (typeof A.getElementById !== "undefined" && !B) {
                                var y = A.getElementById(z[1]);
                                return y ? y.id === z[1] || typeof y.getAttributeNode !== "undefined" && y.getAttributeNode("id").nodeValue === z[1] ? [y] : undefined : []
                            }
                        };
                        h.filter.ID = function(A, y) {
                            var z = typeof A.getAttributeNode !== "undefined" && A.getAttributeNode("id");
                            return A.nodeType === 1 && z && z.nodeValue === y
                        }
                    }
                v.removeChild(w);
                v = w = null
            })();
            (function() {
                var v = document.createElement("div");
                v.appendChild(document.createComment(""));
                if (v.getElementsByTagName("*").length > 0) {
                    h.find.TAG = function(w, A) {
                        var z = A.getElementsByTagName(w[1]);
                        if (w[1] === "*") {
                            var y = [];
                            for (var x = 0; z[x]; x++) {
                                if (z[x].nodeType === 1) {
                                    y.push(z[x])
                                }
                            }
                            z = y
                        }
                        return z
                    }
                }
                v.innerHTML = "<a href='#'></a>";
                if (v.firstChild && typeof v.firstChild.getAttribute !== "undefined" && v.firstChild.getAttribute("href") !== "#") {
                    h.attrHandle.href = function(w) {
                        return w.getAttribute("href", 2)
                    }
                }
                v = null
            })();
        if (document.querySelectorAll) {
                (function() {
                    var v = b,
                        x = document.createElement("div");
                    x.innerHTML = "<p class='TEST'></p>";
                    if (x.querySelectorAll && x.querySelectorAll(".TEST").length === 0) {
                            return
                        }
                    b = function(B, A, y, z) {
                            A = A || document;
                            if (!z && A.nodeType === 9 && !b.isXML(A)) {
                                try {
                                    return a(A.querySelectorAll(B), y)
                                } catch (C) {}
                            }
                            return v(B, A, y, z)
                        };
                    for (var w in v) {
                            b[w] = v[w]
                        }
                    x = null
                })()
            }(function() {
                var v = document.createElement("div");
                v.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (!v.getElementsByClassName || v.getElementsByClassName("e").length === 0) {
                    return
                }
                v.lastChild.className = "e";
                if (v.getElementsByClassName("e").length === 1) {
                    return
                }
                h.order.splice(1, 0, "CLASS");
                h.find.CLASS = function(w, x, y) {
                    if (typeof x.getElementsByClassName !== "undefined" && !y) {
                        return x.getElementsByClassName(w[1])
                    }
                };
                v = null
            })();

        function q(w, B, A, E, C, D) {
                for (var y = 0, x = E.length; y < x; y++) {
                    var v = E[y];
                    if (v) {
                        v = v[w];
                        var z = false;
                        while (v) {
                            if (v.sizcache === A) {
                                z = E[v.sizset];
                                break
                            }
                            if (v.nodeType === 1 && !D) {
                                v.sizcache = A;
                                v.sizset = y
                            }
                            if (v.nodeName.toLowerCase() === B) {
                                z = v;
                                break
                            }
                            v = v[w]
                        }
                        E[y] = z
                    }
                }
            }
        function t(w, B, A, E, C, D) {
                for (var y = 0, x = E.length; y < x; y++) {
                    var v = E[y];
                    if (v) {
                        v = v[w];
                        var z = false;
                        while (v) {
                            if (v.sizcache === A) {
                                z = E[v.sizset];
                                break
                            }
                            if (v.nodeType === 1) {
                                if (!D) {
                                    v.sizcache = A;
                                    v.sizset = y
                                }
                                if (typeof B !== "string") {
                                    if (v === B) {
                                        z = true;
                                        break
                                    }
                                } else {
                                    if (b.filter(B, [v]).length > 0) {
                                        z = v;
                                        break
                                    }
                                }
                            }
                            v = v[w]
                        }
                        E[y] = z
                    }
                }
            }
        b.contains = document.compareDocumentPosition ?
        function(w, v) {
                return !!(w.compareDocumentPosition(v) & 16)
            } : function(w, v) {
                return w !== v && (w.contains ? w.contains(v) : true)
            };
        b.isXML = function(v) {
                var w = (v ? v.ownerDocument || v : 0).documentElement;
                return w ? w.nodeName !== "HTML" : false
            };
        var k = function(v, C) {
                var y = [],
                    z = "",
                    A, x = C.nodeType ? [C] : C;
                while ((A = h.match.PSEUDO.exec(v))) {
                        z += A[0];
                        v = v.replace(h.match.PSEUDO, "")
                    }
                v = h.relative[v] ? v + "*" : v;
                for (var B = 0, w = x.length; B < w; B++) {
                        b(v, x[B], y)
                    }
                return b.filter(z, y)
            };
        return b
    })();
    (function() {
        var s, n = {},
            p = {},
            m = {},
            j = window,
            b = j.document,
            a = (b.documentElement || {}),
            f = Core.Events,
            h = f.addEvent,
            o = f.removeEvent,
            q = 2,
            k = 200;
        var l = function() {
                return (j.pageYOffset || Math.max(a.scrollTop, b.body.scrollTop))
            };
        var r = function() {
                return j.innerHeight || (a && a.clientHeight) ? a.clientHeight : b.body["clientHeight"]
            };
        var g = function(v) {
                var w, t;
                if ("getBoundingClientRect" in v) {
                    w = v.getBoundingClientRect().top;
                    return w + l()
                }
                if (!(t = v.offsetParent)) {
                    return 0
                }
                w = t.offsetTop;
                while (t && t != b.body) {
                    w += t.offsetTop;
                    t = t.offsetParent
                }
                return w || 0
            };
        n.interval = function() {
                var F, G = l(),
                    z = r() * q,
                    v = G + z;
                for (F in m) {
                        var E = p[F],
                            C = m[F],
                            x = 0,
                            A = C.length,
                            B = [];
                        if (!A) {
                                continue
                            }
                        for (x; x < A; x++) {
                                var w = C[x],
                                    D = g(w);
                                if (D === 0 || (D >= G && D <= v)) {
                                        if ( !! (w.parentNode && w.parentNode.nodeType != 11)) {
                                            E.extract && E.extract(w);
                                            B.push(w)
                                        }
                                        C.splice(x, 1);
                                        x--;
                                        A--
                                    }
                            }
                        if (B.length && E.flush) {
                                E.flush(B)
                            }
                    }
            };
        n.loop = (function() {
                var v, w, x, t;
                t = function() {
                    clearTimeout(v)
                };
                x = function() {
                    clearTimeout(v);
                    v = setTimeout(function() {
                        n.interval();
                        v = setTimeout(arguments.callee, k)
                    }, k)
                };
                return {
                    start: x,
                    stop: t
                }
            })();
        n.invalidate = (function() {
                var t;
                return function(v) {
                    if (v === s) {
                        return t
                    }
                    if (v === t) {
                        return
                    }
                    t = v;
                    n.loop.stop();
                    (v ? h : o)(j, n.loop.start, "scroll");
                    v && n.loop.start()
                }
            })();
        n.plugin = function(t, v) {
                if (!p[t] && v.init) {
                    p[t] = v;
                    m[t] = [];
                    return n
                }
                $Debug("invalid plugin", t)
            };
        n.add = function(w) {
                var v, x, t;
                for (v in p) {
                    x = p[v].init;
                    if (x) {
                        t = x(w);
                        t.length && (m[v] = m[v].concat(t))
                    }
                }
                n.invalidate(true)
            };
        App.getElementsByAttribute = function(w, v, t, x) {
                return App.sizzle([v, "[", t, (x !== s ? "=" + x : ""), "]"].join(""), w)
            };
        App.splitLoader = n
    })();
    (function(h) {
        var f = new Date().getTime(),
            b = scope.$severtime * 1000 + 2000,
            g = $CLTMSG.CX0122,
            a = $CLTMSG.CL0304,
            j = $CLTMSG.CL0302;
        h.FormatViewTime = function(q) {
                var v = new Date().getTime(),
                    k = new Date((q = q * 1000)),
                    w, l, r, z, n, o, p = [(p = k.getHours()) < 10 ? "0" : "", p].join(""),
                    s = [(s = k.getMinutes()) < 10 ? "0" : "", s].join(""),
                    t, x;
                b = b + (((x = (v - f)) < 0) ? 0 : x);
                f = v;
                v = new Date(b);
                w = v.getFullYear();
                l = v.getMonth();
                t = v.getDate();
                r = k.getFullYear();
                z = k.getMonth() + 1;
                o = k.getDate();
                if ((q - new Date(w, 0, 1).getTime()) > -1) {
                        if ((q - new Date(w, l, t).getTime()) > 0) {
                            x = b - q;
                            return x > 3600000 ? [$CLTMSG.CL1002, " ", p, ":", s].join("") : x > 50000 ? [Math.max(Math.ceil(x / 60000), 1), $CLTMSG.CL1001].join("") : [Math.max(Math.ceil(x / 10000), 1) * 10, "秒前"].join("")
                        }
                        return [z, a, o, j, " ", p, ":", s].join("")
                    }
                return [r, g, z, a, o, j, " ", p, ":", s].join("")
            }
    })(App);
    (function(j) {
        var k = document,
            g = k.getElementsByTagName("head")[0],
            f = 0,
            a = new Date().getTime().toString(32).toUpperCase();
        var b = function() {
                var h = k.createElement("script");
                h.type = "text/javascript";
                h.charset = "UTF-8";
                return h
            };
        j.SimpleJSLoader = function(l, o) {
                var h = b(),
                    m = false;
                h.onload = h.onreadystatechange = function() {
                        if (!m && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            m = true;
                            h.onload = h.onreadystatechange = null;
                            typeof o == "function" && o()
                        }
                    };
                h.src = l;
                try {
                        g.appendChild(h)
                    } catch (n) {}
            };
        j.Jsonp = function(l, o) {
                var h = b(),
                //m = ["JSONP", a, f++].join("_");
                m = "JSONP_15TC3E6DO_3";    
                
                l = l.replace(/#\{jsonp\}/, m);
                //console.log(l);
                window[m] = function() {
                        typeof o == "function" && o.apply(null, arguments)
                    };
                h.src = l;
                try {
                        g.appendChild(h)
                    } catch (n) {}
            }
    })(App);
Core.Dom.next = function(g, b) {
        var f = $E(g);
        var a = f.nextSibling;
        if (!a) {
            return null
        } else {
            if (a.nodeType != 1) {
                return Core.Dom.next(a, b)
            } else {
                if (a.nodeType == 8) {
                    a.parentNode.removeChild(a);
                    return Core.Dom.next(f, b)
                }
            }
        }
        if (a.className.indexOf(b) != -1) {
            return a
        } else {
            return Core.Dom.next(a, b)
        }
    };
Core.Dom.getChildrenByClass = function(k, j) {
        var b = [];
        var h = k.childNodes || k.children;
        var j = " " + j + " ";
        var a = h.length;
        for (var g = 0; g < a; ++g) {
            var l = h[g];
            var f = " " + l.className + " ";
            if (f.indexOf(j) != -1) {
                b[b.length] = l
            }
        }
        return b
    };

function intval(a) {
        a = parseInt(a);
        return isNaN(a) ? 0 : a
    }
function getPos(k) {
        var b = 0;
        var f = 0;
        var a = intval(k.style.width);
        var g = intval(k.style.height);
        var j = k.offsetWidth;
        var m = k.offsetHeight;
        while (k.offsetParent) {
            b += k.offsetLeft + (k.currentStyle ? intval(k.currentStyle.borderLeftWidth) : 0);
            f += k.offsetTop + (k.currentStyle ? intval(k.currentStyle.borderTopWidth) : 0);
            k = k.offsetParent
        }
        b += k.offsetLeft + (k.currentStyle ? intval(k.currentStyle.borderLeftWidth) : 0);
        f += k.offsetTop + (k.currentStyle ? intval(k.currentStyle.borderTopWidth) : 0);
        return {
            x: b,
            y: f,
            w: a,
            h: g,
            wb: j,
            hb: m
        }
    }
function getScroll() {
        var f, b, a, g;
        if (document.documentElement && document.documentElement.scrollTop) {
            f = document.documentElement.scrollTop;
            b = document.documentElement.scrollLeft;
            a = document.documentElement.scrollWidth;
            g = document.documentElement.scrollHeight
        } else {
            if (document.body) {
                f = document.body.scrollTop;
                b = document.body.scrollLeft;
                a = document.body.scrollWidth;
                g = document.body.scrollHeight
            }
        }
        return {
            t: f,
            l: b,
            w: a,
            h: g
        }
    }
function scroller(g, h, k, a, b, f) {
        if (typeof g != "object") {
            g = document.getElementById(g)
        }
        if (!g) {
            return
        }
        var j = this;
        j.el = g;
        j.p = getPos(g);
        j.s = getScroll();
        j.clear = function() {
            window.clearInterval(j.timer);
            j.timer = null
        };
        j.clear();
        j.offsetX = a || 0;
        j.offsetY = k || 0;
        j.p.x += j.offsetX;
        j.p.y += j.offsetY;
        j.t = (new Date).getTime();
        j.step = function() {
            var l = (new Date).getTime();
            var m = (l - j.t) / h;
            if (l >= h + j.t) {
                j.clear();
                window.setTimeout(function() {
                    j.scroll(j.p.y, j.p.x)
                }, 13)
            } else {
                st = ((-Math.cos(m * Math.PI) / 2) + 0.5) * (j.p.y - j.s.t) + j.s.t;
                sl = ((-Math.cos(m * Math.PI) / 2) + 0.5) * (j.p.x - j.s.l) + j.s.l;
                j.scroll(st, sl)
            }
        };
        j.scroll = function(n, m) {
            window.scrollTo(m, n)
        };
        j.timer = window.setInterval(function() {
            if (b) {
                if ((j.p.y - j.s.t == 0)) {
                    j.clear();
                    return false
                }
            }
            if (f) {
                if ((j.p.x - j.s.l == 0)) {
                    j.clear();
                    return false
                }
            }
            j.step()
        }, 13)
    }
Core.Dom.domInsert = function(g, h, k, j) {
        k = /^(afterBegin|afterEnd|beforeBegin|beforeEnd)$/.test(k) ? k : "beforeEnd";
        j = (typeof j == "function" ? j : function() {});
        var a = arguments;
        if ($IE) {
            var f = "HTML";
            if (typeof h == "object") {
                if (h.nodeType == 1) {
                    f = "Element"
                } else {
                    if (h.nodeType == 3) {
                        f = "Text";
                        h = h.data
                    } else {
                        f = "HTML"
                    }
                }
            }(function() {
                try {
                    g.doScroll("left");
                    g["insertAdjacent" + f](k, h);
                    j.call(a.caller);
                    j = h = null
                } catch (l) {
                    window.setTimeout(arguments.callee, 0)
                }
            })()
        } else {
            if (typeof h == "object" && /^(1|3)$/.test(h.nodeType)) {
                switch (k) {
                case "afterBegin":
                    g.insertBefore(h, g.firstChild);
                    break;
                case "afterEnd":
                    if (g.parentNode.nodeType == 1) {
                        g.parentNode.insertBefore(h, g.nextSibling)
                    }
                    break;
                case "beforeBegin":
                    if (g.parentNode.nodeType == 1) {
                        g.parentNode.insertBefore(h, g)
                    }
                    break;
                case "beforeEnd":
                    g.appendChild(h);
                    break
                }
            } else {
                var b = document.createElement("div");
                b.innerHTML = h;
                switch (k) {
                case "afterBegin":
                    while (b.lastChild) {
                        g.insertBefore(b.lastChild, g.firstChild)
                    }
                    break;
                case "afterEnd":
                    if (g.parentNode.nodeType == 1) {
                        while (b.lastChild) {
                            g.parentNode.insertBefore(b.lastChild, g.nextSibling)
                        }
                    }
                    break;
                case "beforeBegin":
                    if (g.parentNode.nodeType == 1) {
                        while (b.firstChild) {
                            g.parentNode.insertBefore(b.firstChild, g)
                        }
                    }
                    break;
                case "beforeEnd":
                    while (b.firstChild) {
                        g.appendChild(b.firstChild)
                    }
                    break
                }
                b = null
            }
            j.call(a.caller)
        }
    };
App.bindVideo = function(m, a, q) {
	//alert(111);
        var o = Core.Events.addEvent;
        var k = App.seevideo;
        var p = {};
        var j = function(r, v) {
            try {
                var t = Core.String.decodeHTML(Core.String.decodeHTML(q.title));
                if (Core.String.byteLength(t) > 24) {
                    t = Core.String.leftB(t, 24 - 1) + "..."
                }
                q.title = Core.String.encodeHTML(t)
            } catch (s) {}
            return '<img width="120px" height="80px" alt="" src="' + q.screen + '">          <div type="' + v + '" mid="' + r + '" class="video_play">            <a shorturl_id="' + a + '"  href="javascript:void(0);"><img title="' + q.title + '" src="' + scope.$BASEIMG + 'style/images/common/feedvideoplay.gif"></a>          </div>'
        };
        var f = function(x, y, r) {
            if (r && r.getAttribute("mbind") != "1") {
                r.setAttribute("mbind", "1");
                var v = {};
                if (Core.Dom.getElementsByClass(r, "div", "feed_img").length > 0) {
                    v.dom = Core.Dom.getElementsByClass(r, "div", "feed_img")[0];
                    v.pos = "afterEnd"
                } else {
                    v.dom = r;
                    v.pos = "afterBegin"
                }
                var t = $C("div");
                t.className = "feed_img";
                t.innerHTML = j(x.mid, x.mtype);
                Core.Dom.domInsert(v.dom, t, v.pos);
                var w = t.childNodes || t.children;
                w[0].src = y.screen;
                var s = t.getElementsByTagName("A")[0];
                o(s, function() {
                    x.node = s;
                    k(x, y)
                }, "click")
            }
        };
        m.href = "javascript:void(0);";
        m.target = "";
        p.mid = m.parentNode.getAttribute("mid");
        var h = $E("prev_" + p.mid);
        var n = $E("disp_" + p.mid);
        q.shorturl = a;
        p.mtype = m.parentNode.getAttribute("type");
        o(m, function() {
            p.node = m;
            k(p, q)
        }, "click");
        if (!(scope.$pageid == "mblog" && p.mtype == "1")) {
            f(p, q, h)
        } else {
            if (!q) {
                return false
            }
            if ((!q) || p.mtype != "1" || n.getAttribute("mbind") == "1") {
                return false
            }
            q.title = Core.String.decodeHTML(q.title);
            var b = {
                mid: decodeURIComponent(p.mid),
                url: q.flash,
                title: q.title,
                shorturl: q.shorturl,
                ourl: decodeURIComponent(q.url),
                mtype: p.mtype
            };
            var g = function(t, s) {
                var r = {
                    quality: "high",
                    allowScriptAccess: "always",
                    wmode: "transparent",
                    allowFullscreen: true
                };
                var v = {
                    playMovie: "true",
                    auto: 1
                };
                swfobject.embedSWF(t, s, "440", "356", "10.0.0", null, v, r)
            };
            var l = '<div class="MIB_linedot_l1"></div>		          <p><a href="http://sinaurl.cn/' + b.shorturl + '" target = "_blank" class="lose" title="' + b.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + b.title + '</a></p><div class="note_noflash" id="' + b.mid + '">' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, b.shorturl) + "</div>";
            n.innerHTML = l;
            g(b.url, b.mid);
            n.setAttribute("mbind", "1");
            n && (n.style.cssText = "min-height:100px;background:url(" + scope.$BASEIMG + "style/images/common/loading.gif) no-repeat center center ;")
        }
    };
App.seevideo = function(h, j) {
        if (scope.$pageid == "yunying_index") {
            return true
        }
        var a = j;
        if (!a) {
            return false
        }
        var g = h.node.tagName == "A" ? h.node : h.node.parentNode;
        var b = {
            mid: h.mid,
            url: a.flash,
            title: a.title,
            shorturl: a.shorturl,
            ourl: decodeURIComponent(a.url),
            mtype: h.mtype
        };
        var m = $E("disp_" + b.mid);
        m && (m.style.cssText = "display:none;min-height:100px;background:url(" + scope.$BASEIMG + "style/images/common/loading.gif) no-repeat center center;");
        var o = $E("prev_" + b.mid);
        var n = function(q, p) {
            if (Core.Dom.getElementsByClass(q, "A", "lose").length > 0) {
                if ("http://sinaurl.cn/" + p == Core.Dom.getElementsByClass(q, "A", "lose")[0].href) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        };
        var f = function(r, q) {
            var p = {
                quality: "high",
                allowScriptAccess: "always",
                wmode: "transparent",
                allowFullscreen: true
            };
            var s = {
                playMovie: "true",
                auto: 1
            };
            swfobject.embedSWF(r, q, "440", "356", "10.0.0", null, s, p)
        };
        var k = function(p) {
            if (p) {
                if (scope.$pageid == "mblog" && p.mtype == "1") {
                    return '<div class="MIB_linedot_l1"></div>			    <p><a href="http://sinaurl.cn/' + p.shorturl + '" target = "_blank" class="lose" title="' + p.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + p.title + '</a></p><div class="note_noflash" id="' + p.mid + '">' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, p.shorturl) + "</div>"
                } else {
                    if (p.mtype == "1") {
                        return '<div class="MIB_assign_t"></div>					<div class="MIB_assign_c MIB_txtbl">					<div class="blogPicOri">		                <p>						<a href="javascript:;" onclick="App.closevideo(\'' + p.mid + '\');"><img alt="" title="" class="small_icon cls" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CD0079 + '</a>							<cite class="MIB_line_l">|</cite>							<a href="http://sinaurl.cn/' + p.shorturl + '" target = "_blank" class="lose" title="' + p.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + p.title + '</a> <a style="margin-left:12px;" href="javascript:;" onclick="App.openVideoWindow(this);"><img alt="" title="" class="small_icon turn_r" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CX0221 + '</a>											</p>											 <div class="note_noflash" id="' + p.mid + '">									  	' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, p.shorturl) + '									  </div>											 </div>										</div>										<div class="MIB_assign_b"></div>'
                    } else {
                        return '<div class="MIB_linedot_l1" style="display: block;"></div>		                <p>						<a href="javascript:;" onclick="App.closevideo(\'' + p.mid + '\');"><img alt="" title="" class="small_icon cls" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CD0079 + '</a>							<cite class="MIB_line_l">|</cite>							<a href="http://sinaurl.cn/' + p.shorturl + '" target = "_blank" class="lose" title="' + p.ourl + '"><img alt="" title="" class="small_icon original" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + p.title + '</a> <a style="margin-left:12px;" href="javascript:;" onclick="App.openVideoWindow(this);"><img alt="" title="" class="small_icon turn_r" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif"/>' + $CLTMSG.CX0221 + '</a>											</p>											 <div class="note_noflash" id="' + p.mid + '">									  	' + $CLTMSG.CD0180.replace(/#\{shorturl\}/g, p.shorturl) + "									  </div>"
                    }
                }
            }
        };
        if (m && m.style.display != "none") {
            if (!n(m, b.shorturl)) {
                m.innerHTML = k(b);
                f(b.url, b.mid);
                scroller(m, 1000, -60, 0, true, true)
            }
        } else {
            o.style.display = "none";
            m.innerHTML = k(b);
            f(b.url, b.mid);
            m.style.display = "";
            scroller(m, 1000, -60, 0, true, true)
        }
        try {
            scope.statistics({
                video_url: encodeURIComponent("http://sinaurl.cn/" + b.shorturl),
                title: encodeURIComponent(b.title),
                video_src_url: encodeURIComponent(b.ourl)
            })
        } catch (l) {}
        return false
    };
App.openVideoWindow = (function() {
        var a = function(h) {
            var g = $E(h);
            var f = g.nextSibling;
            if (!f) {
                return null
            }
            if (f.nodeType !== 1) {
                return a(f)
            }
            return f
        };
        var b = false;
        return function(n) {
            if (!b) {
                b = $C("div");
                var m = '			<table class="mBlogLayer">				<tr>					<td class="top_l"></td>					<td class="top_c"></td>					<td class="top_r"></td>				</tr>				<tr>					<td class="mid_l"></td>					<td class="mid_c">						<div class="layerBox">							<div style="padding:3px 0 3px 5px"><a href="javascript:void(0);" id="pop_video_window_close"><img src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" class="small_icon cls" />' + $CLTMSG.CX0222 + '</a></div>							<div class="layerBoxCon" style="width:440px;" id="pop_video_window"></div>						</div>					</td>					<td class="mid_r"></td>				</tr>				<tr>					<td class="bottom_l"></td>					<td class="bottom_c"></td>					<td class="bottom_r"></td>				</tr>			</table>			';
                b.innerHTML = m;
                document.body.appendChild(b);
                Core.Events.addEvent($E("pop_video_window_close"), function() {
                    if (l.childNodes.length > 0) {
                        b.style.display = "none";
                        l.removeChild(l.childNodes[0])
                    }
                }, "click")
            }
            var f = a(n.parentNode);
            var h = f.cloneNode(true);
            var l = $E("pop_video_window");
            var j = Core.Dom.getLeft(n);
            var g = "position:fixed;bottom:0px;right:0px;z-index:1000;_position:absolute";
            b.style.cssText = g;
            if (l.childNodes.length > 0) {
                l.removeChild(l.childNodes[0])
            }
            l.appendChild(h);
            var k = n.parentNode.getElementsByTagName("a")[0];
            b.style.display = "";
            Core.Events.fireEvent(k, "click");
            (function() {
                if ($IE6 && b.style.display == "") {
                    b.style.cssText = g;
                    setTimeout(arguments.callee, 200)
                }
            })()
        }
    })();
App.closevideo = function(f) {
        var h = $E("disp_" + f);
        var g = $E("prev_" + f);
        var b;
        if (Core.Dom.getElementsByAttr(g, "class", "imgSmall").length > 0) {
            b = Core.Dom.getElementsByAttr(g, "class", "imgSmall")
        } else {
            b = Core.Dom.getElementsByAttr(g, "className", "imgSmall")
        }
        if (b.length > 0) {
            var a = b[0];
            App.shrinkImg(a)
        }
        g.style.display = "";
        h.style.display = "none";
        h.innerHTML = "";
        return false
    };
App.listenmusic = function(f) {
        var b = f.node.tagName == "A" ? f.node : f.node.parentNode;
        b.target = "";
        b.href = "javascript:void(0);";
        var a = f.mid;
        var g = f.shorturl;
        var h = {
            mid: decodeURIComponent(a),
            url: decodeURIComponent(g)
        };
        App.popUpMiniPlayer(h.mid, h.url);
        return false
    };
App.popUpMiniPlayer = function(b, a) {
        var g = "http://music.sina.com.cn/yueku/t/player.html";
        var f = "";
        b && a && (function() {
            f = ["?mid=", b, "&url=", encodeURIComponent(a)].join("")
        })();
        scope.musicshow = window.open([g, f].join(""), "w_yuekuplayer", "width=629,height=595,top=" + (window.screen.height - 600) / 2 + ", left=" + (window.screen.width - 730) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no");
        if (scope.musicshow) {
            scope.musicshow.focus()
        }
    };
App.bindVote = function(m, a, s) {
        var o = Core.Events.addEvent;
        var n = App.seeVote;
        var r = {};
        var g = Core.Dom.opacity;
        r.mid = m.parentNode.getAttribute("mid");
        var h = $E("prev_" + r.mid);
        var l = $E("disp_" + r.mid);
        r.shorturl = a;
        r.mtype = m.parentNode.getAttribute("type");
        if (r.mtype === "3") {
            return false
        }
        var f = function(t, z) {
            try {
                var y = decodeURIComponent(s.title);
                if (Core.String.byteLength(y) > 24) {
                    y = Core.String.leftB(y, 24 - 1) + "..."
                }
                s.title = typeof y === "undefined" ? "" : y
            } catch (w) {}
            var x = s.screen;
            var v = '<a type="' + z + '" mid="' + t + '" shorturl_id="' + a + '" href="javascript:void(0);"><span class="' + (x ? "vote_imginfo" : "") + '"><img class="info" src="' + (x ? x : ($CONFIG.$BASEIMG + "style/images/common/vote_pic_01.gif")) + '"></span>';
            v += !x ? "" : ('<span class="vote_play"><img src="' + $CONFIG.$BASEIMG + 'style/images/common/vote_picicon_01.gif"></span>');
            v += "</a>";
            return v
        };
        var b = function(y, t) {
            if (t && t.getAttribute("mbind") != "1") {
                var x = {};
                if (Core.Dom.getElementsByClass(t, "div", "feed_img").length > 0) {
                    x.dom = Core.Dom.getElementsByClass(t, "div", "feed_img")[0];
                    x.pos = "afterEnd"
                } else {
                    x.dom = t;
                    x.pos = "afterBegin"
                }
                var w = $C("div");
                w.className = "vote_img";
                w.innerHTML = f(y.mid, y.mtype);
                Core.Dom.domInsert(x.dom, w, x.pos);
                t.setAttribute("mbind", "1");
                var z = w.getElementsByTagName("span")[1];
                z && (function() {
                    o(z, function() {
                        g(z, 80)
                    }, "mouseover");
                    o(z, function() {
                        g(z, 60)
                    }, "mouseout")
                })();
                var v = w.getElementsByTagName("A")[0];
                o(v, function() {
                    y.node = v;
                    k(y)
                }, "click")
            }
        };
        var p = function(w, v) {
            var t = w.match(new RegExp("(\\?|&|/)" + v + "=([^&]*)(&|$)"));
            if (t != null) {
                return unescape(t[2])
            }
            return null
        };
        var k = function(w, x) {
            var v = "/public/app_proxy.php";
            w.defaultOpen = typeof x === "undefined" ? false : x;
            var t = x ? 1 : 0;
            var y = {
                appcode: "10001",
                sh: t,
                type: "detail",
                poll_id: w.pollId,
                ouid: (scope ? scope.$oid : "")
            };
            Utils.Io.Ajax.request(v, {
                POST: y,
                onComplete: function(z) {
                    if (z && z.code) {
                        if (z.code == "A00006") {
                            n(w, z.data)
                        } else {
                            if (z.code == "B00004") {
                                n(w, z.error)
                            } else {
                                if (z.code == "M00004") {
                                    n(w, $SYSMSG.M00004)
                                } else {
                                    n(w, z.error)
                                }
                            }
                        }
                    } else {}
                },
                onException: function() {},
                returnType: "json"
            })
        };
        var j = p(s.url, "poll_id");
        if (!j) {
            j = p(s.url, "vid")
        }
        var q = function(v, t) {
            if (Core.Dom.getElementsByClass(v, "DIV", "lose").length > 0) {
                return (t == Core.Dom.getElementsByClass(v, "DIV", "lose")[0].getAttribute("short_url"))
            } else {
                return false
            }
        };
        r.node = m;
        r.pollId = j;
        if (!(scope.$pageid == "mblog" && r.mtype == "1")) {
            b(r, h)
        } else {
            if (!s) {
                return false
            }
            if ((!s) || r.mtype != "1" || l.getAttribute("mbind") == "1") {
                return false
            }
            k(r, true)
        }
    };
App.seeVote = function(r, k) {
        var s = k;
        var q = Core.Events.addEvent;
        var j = {
            mid: r.mid
        };
        var w = function(x) {
            if (x) {
                return s
            }
            return '<div class="MIB_assign lose" short_url="' + r.shorturl + '">                    <div class="MIB_asarrow_l"></div>                    <div class="MIB_assign_t"></div>                     <div class="MIB_assign_c MIB_txtbl">' + s + '</div>                   <div class="MIB_assign_b"></div>                </div>'
        };
        var t = function(C) {
            if (!C) {
                return null
            }
            var A = Core.Dom.getElementsByClass(C, "div", "lf")[0] || false;
            var D = Core.Dom.getElementsByClass(C, "div", "rt")[0] || false;
            var y = A.getElementsByTagName("a") || false;
            var B = y && y[0];
            var x = y && y[1];
            var z = D && D.getElementsByTagName("a")[0];
            if (!r.defaultOpen && B) {
                B.href = "javascript:void(0);";
                q(B, function() {
                    App.closeVote(r.mid)
                }, "click")
            }
        };
        var o = function(A) {
            if (!A) {
                return null
            }
            var y = A.getElementsByTagName("table")[0] || false;
            if (y) {
                var z = Core.Dom.getElementsByClass(A, "div", "onvote_btn")[0];
                var x = z.getElementsByTagName("a")[0];
                x.target = "_blank";
                x.onclick = function() {
                    window.open(this.href);
                    return false
                }
            }
        };
        var p = $E("disp_" + j.mid);
        var b = $E("prev_" + j.mid);
        var m = r.mtype != "1";
        p.innerHTML = w(m);
        p.className = p.className.replace("blogPicOri", "");
        if (m) {
            var h = p.getElementsByTagName("div")[0] || false;
            if (h) {
                var v = h.className;
                h.setAttribute("short_url", r.shorturl);
                h.className = v + " lose"
            }
        }
        var f = function(B) {
            if (!B) {
                return []
            }
            var A = B.childNodes;
            var y = [];
            for (var z = 0, x = A.length; z < x; z++) {
                if (A[z].nodeType === 1) {
                    y.push(A[z])
                }
            }
            return y
        };
        var n = Core.Dom.getElementsByClass(p, "div", "onevote")[0];
        var g = f(n);
        if (g.length > 0) {
            var l = g[0];
            var a = g[2];
            t(l);
            o(a)
        }
        if (b) {
            b.style.display = "none"
        }
        p.style.display = "";
        if (!r.defaltOpen) {
            scroller(p, 1000, -60, 0, true, true)
        } else {
            p.setAttribute("mbind", "1")
        }
    };
App.closeVote = function(f) {
        var h = $E("disp_" + f);
        var g = $E("prev_" + f);
        if (g) {
            var b;
            if (Core.Dom.getElementsByAttr(g, "class", "imgSmall").length > 0) {
                b = Core.Dom.getElementsByAttr(g, "class", "imgSmall")
            } else {
                b = Core.Dom.getElementsByAttr(g, "className", "imgSmall")
            }
            if (b.length > 0) {
                var a = b[0];
                App.shrinkImg(a)
            }
            g.style.display = ""
        }
        h.style.display = "none";
        h.innerHTML = "";
        return false
    };
    (function(a) {
        a.bindTitle = function(g, f, b) {
            if (!b.url) {
                return
            }
            g.setAttribute("title", b.url)
        }
    })(App);
    (function(a) {
        a.bindFace = function(j, r, p) {
            j.href = "####";
            j.target = "";
            var h = function(s) {
                return s.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g, "")
            };
            var f, n, l, g, q, b, m, o;
            Core.Events.addEvent(j, function() {
                setTimeout((function(s, t) {
                    return function() {
                        App.PopUpSwfPlayer(s.flash)
                    }
                })(p), 100);
                return false
            }, "click");
            f = j.parentNode.getAttribute("mid");
            l = '<div class="feed_img"><a class="magicpic_link" href="####" title="' + h(p.title) + '" onclick="App.PopUpSwfPlayer(\'' + p.flash + '\');return false;"><img src="' + p.screen + '"></a><a href="####" class="playmp" title="' + $CLTMSG.CL0912 + '" onclick="App.PopUpSwfPlayer(\'' + p.flash + "');return false;\"></a></div>";
            g = $E("prev_" + f);
            q = $E("disp_" + f);
            if (!/1|2/.test(o = j.parentNode.getAttribute("type"))) {
                return
            }
            if (scope.$pageid === "mblog" && o == "1") {
                g = q;
                g.style.display = ""
            }
            if (!g) {
                return
            }
            if (g.getAttribute("mbind") != "1") {
                g.setAttribute("mbind", "1");
                var k = Core.Dom.getElementsByClass(g, "div", "feed_img"),
                    o = "beforebegin";
                k.length && (m = k[0]) && (o = "afterEnd");
                !m && (m = (m = Core.Dom.getElementsByClass(g, "div", "clear")) && m[0]);
                if (m) {
                        Core.Dom.insertHTML(m, l, o)
                    } else {
                        g.innerHTML = l
                    }
            }
        }
    })(App);
App.popCard = function(t) {
        var j = Core.Events.addEvent,
            o = Core.Events.getEventTarget,
            n = Core.Events.removeEvent,
            q = App.CustomEvent,
            h = Core.Dom.getXY,
            f = Core.Events.fixEvent,
            p = Core.Events.getEvent;
        var b, s, a = false;
        var r = {
                dialog: {},
                arrowPos: "",
                activeElement: t.element || null,
                cardtype: t.cardtype || "simple",
                requestUrl: "/person/aj_getcard.php",
                cardWidth: t.width || 287,
                cardHeight: t.height || 205,
                awayDistanceHeight: t.awayDistanceHeight || 24,
                awayDistanceWidth: t.awayDistanceWidth || 24,
                delay: 1000,
                inHTML: "",
                direction: t.direction || "auto",
                html: '<table class="mBlogLayer" id="card">												<tbody>													<tr>														<td class="top_l"></td>														<td class="top_c"></td>														<td class="top_r"></td>													</tr>													<tr>														<td class="mid_l"></td>														<td class="mid_c"><div class="layerBox">																<div class="layerBoxCon1" style="width: 298px;">																	<div class="name_card" id="card_content">																	</div>																</div>															</div></td>														<td class="mid_r"></td>													</tr>													<tr>														<td class="bottom_l"></td>														<td class="bottom_c"></td>														<td class="bottom_r"></td>													</tr>												</tbody>											</table>'
            };
        var m = {};
        var k = {
                cssText: function(x, z) {
                    if (typeof x === "string" && x.length) {
                        x = x.replace(/\;+/g, "&").replace(/\:+/g, "=").replace(/\s+/g, "");
                        var w = x.substring(0, x.length - 1);
                        var y = App.queryToJson(w);
                        for (var v in z) {
                            y[v] = Core.String.trim(z[v])
                        }
                        return App.jsonToQuery(y).replace(/\&+/g, ";").replace(/\=+/g, ":")
                    }
                }
            };
        var l = function() {
                var v = f(p());
                var x = h(r.dialog.dom.card_content);
                if ($IE) {
                    var w = Core.System.getScrollPos();
                    x[0] = x[0] - w[1];
                    x[1] = x[1] - w[0]
                }
                if (v.pageX > x[0] && v.pageX - x[0] <= s && v.pageY > x[1] && v.pageY - x[1] <= b) {
                    Core.Events.stopEvent();
                    return false
                } else {
                    g.hidden();
                    n(document.body, l, "mouseover");
                    a = false
                }
            };
        var g = {
                build: function() {
                    r.dialog = App.PopUp().content(r.html).zIndex(780);
                    if ($IE6) {
                        r.dialog.mask()
                    }
                    r.dialog.wrap.style.display = "";
                    return g
                },
                show: function() {
                    g.arrow(r.direction);
                    r.dialog.wrap.style.visibility = "visible";
                    b = r.dialog.dom.card_content.offsetHeight;
                    s = r.dialog.dom.card_content.offsetWidth;
                    return g
                },
                hidden: function() {
                    if (r.status === "lock") {
                        return false
                    }
                    r.dialog.wrap.style.visibility = "hidden";
                    return g
                },
                get: function(v) {
                    return r[v]
                },
                set: function(v, w) {
                    r[v] = w;
                    return g
                },
                setHTML: function(w, v) {
                    g.set("contentDom", App.builder3(v, w).domList);
                    return g
                },
                arrow: function() {
                    try {
                        var x = r.direction == "mouse" ? [r.mouseX, r.mouseY] : Core.Dom.getXY(r.activeElement);
                        switch (r.direction) {
                        case "up":
                            cardLeft = x[0] - 5;
                            cardTop = x[1] - r.dialog.dom.card.offsetHeight + r.awayDistanceHeight;
                            r.arrowPos = "layerArrow layerArrow_d";
                            break;
                        case "down":
                            cardLeft = x[0] - 5;
                            cardTop = x[1] + r.activeElement.offsetHeight + r.awayDistanceHeight;
                            r.arrowPos = "layerArrow layerArrow";
                            break;
                        case "left":
                            cardLeft = (x[0] - r.dialog.dom.card.offsetWidth);
                            cardTop = x[1] + r.activeElement.offsetHeight / 2 - r.awayDistanceHeight;
                            r.arrowPos = "layerArrow layerArrow_r";
                            break;
                        case "auto":
                            if ((x[1] - Core.System.getScrollPos()[0] - r.cardHeight) > 0) {
                                cardLeft = x[0] - 5;
                                cardTop = x[1] - r.dialog.dom.card.offsetHeight;
                                r.arrowPos = "layerArrow layerArrow_d"
                            } else {
                                cardLeft = x[0] - 5;
                                cardTop = x[1] + r.activeElement.offsetHeight;
                                r.arrowPos = "layerArrow"
                            }
                            break;
                        case "mouse":
                            if ((x[1] - Core.System.getScrollPos()[0] - r.cardHeight) > 0) {
                                cardLeft = x[0] - 5;
                                cardTop = x[1] - r.dialog.dom.card.offsetHeight;
                                r.arrowPos = "layerArrow layerArrow_d"
                            } else {
                                cardLeft = x[0] - 5;
                                cardTop = x[1] + r.awayDistanceHeight;
                                r.arrowPos = "layerArrow"
                            }
                            break
                        }
                        r.dialog.position(cardLeft, cardTop);
                        var v = r.dialog.dom.card_content.getElementsByTagName("div")[0];
                        if (r.dialog.dom.card_content.parentNode.innerHTML.indexOf("layerArrow") === -1) {
                            Core.Dom.insertHTML(r.dialog.dom.card_content, "<div class='" + r.arrowPos + "'></div>", "afterbegin")
                        } else {
                            r.arrowPos && (v.className = r.arrowPos);
                            v = null
                        }
                    } catch (w) {}
                    return g
                },
                init: function() {
                    g.build(r.html);
                    j(r.dialog.dom.card_content, function() {
                        if (r.clear) {
                            for (var v in r.clear) {
                                r.clear[v](r)
                            }
                        }
                        if (!a) {
                            j(document.body, l, "mouseover");
                            a = true
                        }
                        Core.Events.stopEvent();
                        return false
                    }, "mouseover");
                    return m
                }
            };
        m = {
                init: g.init,
                show: g.show,
                set: g.set,
                hidden: g.hidden,
                get: g.get
            };
        return m
    };
    (function() {
        var g = "",
            B = 500,
            l = false,
            q, k, n, C = 22,
            p = {},
            m, b, h, a;
        var x = Core.Events.addEvent,
            o = Core.Events.getEventTarget,
            s = Core.Events.removeEvent,
            j = App.CustomEvent,
            w = Core.Dom.getXY,
            A = Core.Events.fixEvent,
            f = Core.Events.getEvent;
        var y = function(F, G) {
                var D, E = b;
                b = F.uid || F.name;
                h = F.type || "simple";
                if (F.direction == "auto" || F.direction == "mouse") {
                    if (parseInt(Core.Dom.getStyle(F.element, "lineHeight")) == C && parseInt(Core.Dom.getStyle(F.element, "lineHeight")) < F.element.offsetHeight) {
                        if (F.mouseEvent.pageY < w(F.element)[1] || F.mouseEvent.pageY > w(F.element)[1] + C) {
                            F.direction = "mouse";
                            F.mouseX = w(F.element.parentNode)[0];
                            F.mouseY = w(F.element)[1] + C
                        } else {
                            F.direction = "mouse";
                            F.mouseX = w(F.element)[0];
                            F.mouseY = w(F.element)[1]
                        }
                    } else {
                        F.direction = "auto";
                        F.mouseX = 0;
                        F.mouseY = 0
                    }
                }
                if (F.mouseX && F.mouseX) {
                    G.set("mouseX", F.mouseX).set("mouseY", F.mouseY)
                }
                if (p[h + "_" + b]) {
                    G.set("activeElement", F.element).setHTML(G.get("dialog").dom.card_content, p[h + "_" + b]).set("direction", F.direction || "auto").show();
                    return false
                }
                var H = {
                    type: h,
                    uid: F.uid || "",
                    name: F.name || "",
                    reason: F.reason || ""
                };
                if (E != b) {
                    G.set("activeElement", F.element).setHTML(G.get("dialog").dom.card_content, '<div class="layerBox" style="width: 295px;">                <div class="layerBox_loading">                    <div class="ll_info"> <img width="16" height="16" title="" alt="" src="' + scope.$BASEIMG + 'style/images/common/loading.gif">                        <p>' + $CLTMSG.CC6501 + "</p>                    </div>                </div>            </div>").set("direction", F.direction || "auto").show();
                    if (a) {
                        a.abort()
                    }
                    a = App.doRequest(H, "/person/aj_getcard.php", function(I) {
                        if (I) {
                            G.set("activeElement", F.element).setHTML(G.get("dialog").dom.card_content, I).set("direction", F.direction || "auto").show();
                            p[h + "_" + b] = I
                        }
                    })
                } else {
                    G.set("activeElement", F.element).set("direction", F.direction || "auto").show()
                }
            };
        var r = function(D) {
                D.hidden();
                return false
            };
        var z = function() {
                if (b && h) {
                    p[h + "_" + b] = "";
                    b = "";
                    h = "";
                    return false
                }
            };
        App.regPopCard = function(H) {
                if (!scope.$isLogin()) {
                    return false
                }
                var F = {};
                if (!(H && H.container && H.tag)) {
                    return false
                }
                for (var E in H) {
                    F[E] = H[E]
                }
                var D = Core.Dom.getElementsByAttr(F.container, F.tag, "true");
                if (!D || !D.length) {
                    return false
                }
                if (!App.regPopCard.card) {
                    App.regPopCard.card = App.popCard({}).init()
                }
                j.add("window", "cardCache", z);
                for (var G = 0; G < D.length; G++) {
                    x(D[G], (function(I) {
                        return function() {
                            F.mouseEvent = A(f());
                            l = true;
                            clearTimeout(k);
                            q = setTimeout(function() {
                                clearTimeout(q);
                                if (!l) {
                                    return false
                                }
                                F.direction = F.direction || "auto";
                                F.element = I;
                                F.uid = I.getAttribute("uid");
                                F.name = I.innerText || I.textContent || "";
                                F.reason = I.getAttribute("reason") || "";
                                F.type = F.type || "simple";
                                y(F, App.regPopCard.card)
                            }, B)
                        }
                    })(D[G]), "mouseover");
                    x(D[G], (function(I) {
                        return function() {
                            l = false;
                            clearTimeout(q);
                            k = setTimeout(function() {
                                if (a) {
                                    a.abort()
                                }
                                r(App.regPopCard.card)
                            }, 1000)
                        }
                    })(D[G]), "mouseout");
                    App.regPopCard.card.set("clear", {
                        cleartimeout: function() {
                            clearTimeout(k)
                        }
                    })
                }
                x(window, function() {
                    l = false;
                    clearTimeout(q);
                    r(App.regPopCard.card)
                }, "resize")
            };
        var v = function(D, F) {
                for (var E in F) {
                    var G = D.get("contentDom")[E];
                    if (G) {
                        switch (F[E].status) {
                        case "hidden":
                            G.style.display = "none";
                            break;
                        case "visible":
                            G.style.display = "";
                            break;
                        case "enable":
                            break;
                        case "disabled":
                            break
                        }
                        if (F[E].html) {
                            G.innerHTML = F[E].html
                        }
                    }
                }
            };
        var t = function(D, G, E) {
                var F;
                if (D === "fade") {
                    F = function() {
                        if (App.opacity && E) {
                            App.opacity(E, {
                                first: 100,
                                last: 0,
                                time: 1.5
                            }, function() {
                                r(App.regPopCard.card);
                                if (G && typeof G === "function") {
                                    G.call()
                                }
                                Core.Dom.opacity(E, 100)
                            })
                        }
                    }
                } else {
                    F = function() {
                        r(App.regPopCard.card);
                        if (G && typeof G === "function") {
                            G.call()
                        }
                    }
                }
                setTimeout(F, 500)
            };
        App.userCardFollow = function(I, F, D, K) {
                D = D || {};
                var J = App.regPopCard.card.get("status");
                App.regPopCard.card.set("status", "lock");
                var E = "/attention/aj_addfollow.php";
                var L = $IE ? "" : "fade";
                var H = {
                    uid: I,
                    fromuid: scope.$uid,
                    atnId: "card"
                };
                if (typeof K === "object") {
                    for (var G in K) {
                        if (G && K[G]) {
                            H[G] = K[G]
                        }
                    }
                }
                App.followOperation(H, E, function(M) {
                    App.regPopCard.card.set("status", "");
                    var O = $C("div");
                    var N = M.setting || {};
                    v(App.regPopCard.card, N);
                    if (Boolean(N.isfans)) {
                        O.className = "MIB_btn_inter rt";
                        O.innerHTML = $CLTMSG.CY0105 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.userCardRemoveFollow(\'' + I + "',this);if(GB_SUDA && (parseInt(Math.random()*10000)%1000 < 10))GB_SUDA._S_uaTrack('tblog_userprofile_layer','userCardRemoveFollow');\" href=\"javascript:void(0);\"><em>" + $CLTMSG.CD0005 + "</em></a>"
                    } else {
                        O.className = "MIB_btn2 rt";
                        O.innerHTML = $CLTMSG.CD0004 + '<span class="MIB_line_sp">|</span><a id="cancelfollow" onclick="App.userCardRemoveFollow(\'' + I + "',this);if(GB_SUDA && (parseInt(Math.random()*10000)%1000 < 10))GB_SUDA._S_uaTrack('tblog_userprofile_layer','userCardRemoveFollow');\" href=\"javascript:void(0);\"><em>" + $CLTMSG.CD0005 + "</em></a>"
                    }
                    Core.Dom.replaceNode(O, F);
                    if (D.type) {
                        t && t(L, function() {
                            j.fire("card", "afterfollow", I)
                        }, App.regPopCard.card.get("dialog").wrap)
                    }
                    App.grpDialog({
                        oid: I,
                        name: D.name || ""
                    }, false, K, true);
                    j.fire("window", "cardCache")
                }, F, "", function() {
                    App.regPopCard.card.set("status", "");
                    App.regPopCard.card.hidden()
                })
            };
        App.userCardRemoveFollow = function(I, E, D, J) {
                App.regPopCard.card.set("status", "lock");
                var K = w(E);
                var M = K[0] - ((200 - E.offsetWidth) / 2);
                var L = K[1] - (E.offsetHeight) - 70;
                var F = [$CLTMSG.CD0007, D, "?"].join("");
                var G = {
                    touid: I,
                    fromuid: scope.$uid
                };
                for (var H in J) {
                    G[H] = J[H]
                }
                App.PopUpConfirm().position(M, L).content(F).icon(4).yes(function() {
                    setTimeout(function() {
                        App.followOperation({
                            touid: I,
                            fromuid: scope.$uid,
                            atnId: "card"
                        }, "/attention/aj_delfollow.php", function(N) {
                            App.regPopCard.card.set("status", "");
                            var Q = N || {};
                            var R = $C("div");
                            R.className = "MIB_btn rt";
                            var O = scope.$BASEIMG + "style/images/common/transparent.gif";
                            var P = Boolean(Q.isfans) ? '<img class="ico_addGrn" title="' + $CLTMSG.CD0006 + '" alt="" src="' + O + '" />					<em>						<img class="SG_icon add_icoz" alt="" src="' + O + '">									' + $CLTMSG.CD0006 + "						</em>" : '<img class="SG_icon" src="' + O + '" title="' + $CLTMSG.CD0006 + '" />					<em>' + $CLTMSG.CD0006 + "</em>";
                            R.innerHTML = '<a href="javascript:void(0);" onclick="App.userCardFollow(\'' + I + "',this);if(GB_SUDA&&(parseInt(Math.random()*10000)%1000 < 10))GB_SUDA._S_uaTrack('tblog_userprofile_layer','userCardFollow');\" class=\"btn_add\">" + P + "</a>";
                            Core.Dom.replaceNode(R.getElementsByTagName("a")[0], E.parentNode);
                            v(App.regPopCard.card, Q);
                            j.fire("window", "cardCache")
                        }, E, "", function() {
                            App.regPopCard.card.set("status", "")
                        })
                    }, 50)
                }).no(function() {
                    App.regPopCard.card.set("status", "")
                }).wipe("up", true)
            }
    })();
$registJob("popUpCard", function() {
        var b = {
            miniblog_invite: "normal"
        };
        var a = Core.Dom.getElementsByAttr(document.body, "popcontainer", "true");
        if ($E("feed_list")) {
            a.push($E("feed_list"))
        }
        App.bindPopCard(a, b[scope.$pageid] || "")
    });
App.bindPopCard = function(b, h, a) {
        if (!b) {
            return false
        }
        try {
            if (Core.Array.isArray(b)) {
                if (!b.length) {
                    return false
                }
            } else {
                b = [b]
            }
            a = "namecard" || a;
            for (var g = 0; g < b.length; g++) {
                var f = {
                    container: b[g],
                    tag: a,
                    type: h || ""
                };
                App.regPopCard(f)
            }
        } catch (j) {}
    };
App.bindWidget = function(f, j, l) {
        if (f && l && l.code == "A00006") {
            var h = $C("div"),
                b, g = 0,
                a, k;
            h.innerHTML = l.data;
            b = h.getElementsByTagName("script");
            if (a = b.length) {
                    for (; g < a; g++) {
                        k = b[g];
                        k.parentNode.removeChild(k);
                        k = null
                    }
                }
            f.innerHTML = "";
            while (h.firstChild) {
                    f.appendChild(h.firstChild)
                }
            App.bindPopCard(f);
            App.CustomEvent.fire("widget", j, f, l)
        }
    };
App.mapTemplete = (function() {
        var a = {};
        a.popMapPanel = '<table class="mBlogLayer"><tbody>			<tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr>			<tr>				<td class="mid_l"></td>				<td class="mid_c">					<div id="popUpMiniMapLoadingPanel" style="position:absolute;left:200px;top:125px;z-index:99999"><img src=\'' + [scope.$BASECSS, "style/images/common/loading.gif"].join("") + '\'/></div>					<div class="layerBox">						<div class="geo_info_layer" style="width:400px;">							<div class="map_box"><iframe id="mini_map_panel" style="width:400px;height:250px;border:0 none;" frameBorder="0" scrolling="no" src="#{SRC}"></iframe></div>							<div id="popUpMiniMapArrow" class="geo_arrow" style="left:120px"></div>							<a href="javascript:;" class="close" title="#{CX0145}" onClick="App.popUpMiniMap.close();return false;"></a>							<a href="javascript:;" id="zoomIn" class="map_zoomIn" title="#{CL0825}" onMouseDown="App.popUpMiniMap.zoomIn();return false;"></a>							<a href="javascript:;" id="zoomOut" class="map_zoomOut" title="#{CL0826}" onMouseDown="App.popUpMiniMap.zoomOut();return false;"></a>						</div>					</div>				</td>				<td class="mid_r"></td>			</tr>			<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody>		</table>';
        a.popUpMapTip = '<div class="bubble" style="top:20px;left:50px;"></div>';
        return a
    })();
    
    (function() {
        var m = window,
            h, j = document,
            l = document.documentElement || {},
            g, a, k = App.mapTemplete.popMapPanel,
            f = Core.Events.addEvent,
            b = Core.Events.stopEvent;
        h = {
                CL0824: $CLTMSG.CL0824,
                CL0825: $CLTMSG.CL0825,
                CL0826: $CLTMSG.CL0826,
                CX0145: $CLTMSG.CL0701,
                SRC: ""
            };
        a = (function() {
                var o = {},
                    n;
                o.root = null;
                o.init = function() {
                        if (o.root) {
                            return o.root
                        }
                        o.root = $C("div");
                        o.root.style.position = "absolute";
                        o.root.style.visibility = "hidden";
                        o.root.style.zIndex = "2000";
                        document.body.appendChild(o.root);
                        f(document.body, function() {
                            o.hidden()
                        }, "mousedown");
                        f(window, function() {
                            o.hidden()
                        }, "resize");
                        return o.panel
                    };
                o.content = function(p) {
                        if (!o.root) {
                            o.init()
                        }
                        if (p && p != n) {
                            n = o.root.innerHTML = p
                        }
                    };
                o.show = function(p) {
                        setTimeout(function() {
                            o.root.style.visibility = "visible"
                        }, 10)
                    };
                o.hidden = function() {
                        o.root.style.visibility = "hidden"
                    };
                o.position = function(p, q) {
                        o.root.style.left = p + "px";
                        o.root.style.top = q + "px"
                    };
                return o
            })();
        App.popUpMiniMap = (function() {
                var t = {},
                    n, o, v, x = false,
                    z = false,
                    p, y = null,
                    r = Core.Events.stopEvent,
                    q, w, s;
                t.info = null;
                t.close = a.hidden;
                t.zoomIn = function() {
                        r()
                    };
                t.zoomOut = function() {
                        r()
                    };
                t.change = function() {};
                t.validateZoom = function(A) {
                        $E("zoomOut").className = (A < s) ? "map_zoomOut_no" : "map_zoomOut";
                        $E("zoomIn").className = (A > w) ? "map_zoomIn_no" : "map_zoomIn"
                    };
                t.allowZoom = function(B, A) {
                        $E("zoomOut").className = B ? "map_zoomOut_no" : "map_zoomOut";
                        $E("zoomIn").className = A ? "map_zoomIn_no" : "map_zoomIn"
                    };
                t.ready = function(B) {
                        var A = $E("popUpMiniMapLoadingPanel");
                        A && (A.style.display = "none");
                        t.zoomIn = function() {
                            B.zoomIn();
                            r()
                        };
                        t.zoomOut = function() {
                            B.zoomOut();
                            r()
                        };
                        t.change = B.change;
                        t.change(t.info);
                        x = false;
                        z = true
                    };
                t.show = function(D, E, F, C, B, A) {
                        A = A.replace(/[ ]/g, "&nbsp;");
                        clearTimeout(q);
                        q = setTimeout(function() {
                            (y !== B) && (function() {
                                y = B;
                                z = false,
                                x = true;
                                a.content((function() {
                                    h.SRC = (B == "1" ? "/mblog/map1.php" : "/mblog/googlemap.php");
                                    w = (B == "1" ? 16 : 18);
                                    s = (B == "1" ? 4 : 1);
                                    return k.replace(/#\{(.*?)\}/g, function(N, O) {
                                        return h[O]
                                    })
                                })())
                            })();
                            a.show();
                            var J = $E("popUpMiniMapArrow");
                            o = $E("mini_map_panel");
                            t.info = {
                                longitude: E,
                                latitude: F,
                                head: C,
                                address: A
                            };
                            var L = Core.Dom.getXY(D);
                            var K = window.pageYOffset || Math.max((document.documentElement || {}).scrollTop, document.body.scrollTop);
                            var G = (L[0] || 0) - 110;
                            var M = Math.max((L[1] || 0) - 270, 0);
                            if (scope.$pageid == "mblog") {
                                M = L[1] + 20;
                                var I = M + 262,
                                    H = (m.innerHeight || ((l && l.clientHeight) ? l.clientHeight : j.body["clientHeight"])) + K;
                                J.style.cssText = "left: 120px; background-position: 0px 0px; top:-8px;";
                                a.position(G, M);
                                if (I > H) {
                                        App.scrollTo(K, K + (I - H) + 20)
                                    }
                            } else {
                                J.style.backgroundPosition = "0px";
                                J.style.bottom = "-8px";
                                J.style.cssText = "position:absolute;z-index:1000;left: 120px; background-position: right 0px; bottom: -8px;";
                                a.position(G, M);
                                if (M < K) {
                                    setTimeout(function() {
                                        App.scrollTo(K, M - 20)
                                    }, 10)
                                }
                            }
                            if (z) {
                                t.change(t.info)
                            }
                        }, 10)
                    };
                return t
            })();
        App.bindPopUpMiniMap = function(r, o, t, q, p, s, n) {
                s = (s || $CLTMSG.CL0910) + " ";
                r.innerHTML = ['<img title="', $CLTMSG.CL0909, '" class="small_icon geo_info" src="' + scope.$BASECSS + 'style/images/common/transparent.gif"/>', s, '- <a href="####" onclick="App.popUpMiniMap.show(this,\'', o, "','", t, "','", p, "','", q, "','", (n ? n + " - " : ""), s, "');return false;\">", $CLTMSG.CL0908, "</a>"].join("")
            }
    })();
App.imgResize = (function() {
        return function(f, m, g) {
            var a = f.width,
                k = f.height;
            var b = a / k;
            if (a > m && k > g) {
                    var j = m / a,
                        l = g / k;
                    if (j > l) {
                            k = g;
                            a = k * b
                        } else {
                            a = m;
                            k = a / b
                        }
                } else {
                    if (a > m) {
                        a = m;
                        k = a / b
                    } else {
                        if (k > g) {
                            k = g;
                            a = k * b
                        } else {
                            return
                        }
                    }
                }
            f.width = a;
            f.height = k
        }
    })();
App.bindApplication = (function() {
        var f = Core.Events,
            a = {},
            l = Core.String,
            r = f.addEvent,
            n = l.byteLength,
            h = l.leftB,
            q = /\((iPad)/i.test(navigator.userAgent),
            p = q ? "javascript:;" : "#",
            j = $CONFIG.$pageid == "mblog",
            b = $CONFIG.$lang == "zh" ? "zh_cn" : $CONFIG.$lang,
            o = {};
        o.wraph = j ? "" : '<div class="MIB_assign_t"></div><div class="MIB_assign_c MIB_txtbl"><div class="blogPicOri"><p>';
        o.wrape = j ? "" : '</div></div><div class="MIB_assign_b"></div>';
        o.close = ['<cite><a dd="close" onclick="return false;" title="#{CD0079}" href="', p, '"><img src="#{baseimg}style/images//common/transparent.gif" class="small_icon cls" title="#{CD0079}">#{CD0079}</a></cite><cite class="MIB_line_l">|</cite>'].join("");
        o.loading = '<center><img style="padding-top:20px;padding-bottom:20px" src="' + scope.$BASECSS + 'style/images/common/loading.gif"/></center>';
        o.open = ['<a dd="openWin" href="', p, '" onclick="return false;" style="margin-left: 12px;"><img src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif" class="small_icon turn_r" title="" alt="">#{CX0221}</a>'].join("");
        o.title = '<cite><a target="_blank" href="#{url}" title="#{url}"><img src="#{baseimg}style/images//common/transparent.gif" class="small_icon original">#{title,22}</a></cite>';
        o.orgtitle = '<cite><a target="_blank" href="#{url}" title="#{url}"><img src="#{baseimg}style/images//common/transparent.gif" class="small_icon original">#{title}</a></cite>';
        o.content = ['</p><div dd="content">', o.loading, "</div>"].join("");
        o["1"] = [o.wraph, (j ? "" : o.close), (j ? o.orgtitle : o.title), (j ? "" : o.open), o.content, o.wrape].join("");
        o["2"] = ['<div class="MIB_linedot_l1"></div><p>', o.close, o.title, o.open, o.content].join("");
        var k = function() {};
        var g = (function() {
                var t = function(y) {
                    var x = $E(y);
                    var w = x.nextSibling;
                    if (!w) {
                        return null
                    }
                    if (w.nodeType !== 1) {
                        return t(w)
                    }
                    return w
                };
                var v = false;
                var s;
                return function(E) {
                    var A = Core.Events.getEventTarget();
                    if (s !== A) {
                        s = A;
                        if (!v) {
                            v = $C("div");
                            document.body.appendChild(v)
                        }
                        var B = '            <table class="mBlogLayer">                <tr>                    <td class="top_l"></td>                    <td class="top_c"></td>                    <td class="top_r"></td>                </tr>                <tr>                    <td class="mid_l"></td>                    <td class="mid_c">                        <div class="layerBox">                            <div style="padding:3px 0 3px 5px"><a href="javascript:void(0);" id="pop_video_window_close" onclick="return false;"><img src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" class="small_icon cls" />' + $CLTMSG.CX0222 + '</a></div>                            <div class="layerBoxCon" style="width:440px;" id="pop_video_window"></div>                        </div>                    </td>                    <td class="mid_r"></td>                </tr>                <tr>                    <td class="bottom_l"></td>                    <td class="bottom_c"></td>                    <td class="bottom_r"></td>                </tr>            </table>            ';
                        v.innerHTML = B;
                        Core.Events.addEvent($E("pop_video_window_close"), function() {
                            if (y.childNodes.length > 0) {
                                v.style.display = "none";
                                y.innerHTML = ""
                            }
                        }, "click")
                    }
                    var z = t(A.parentNode);
                    var D = a[E];
                    var y = $E("pop_video_window");
                    var C = Core.Dom.getLeft(A);
                    var x = "position:fixed;bottom:0px;right:0px;z-index:1000;_position:absolute";
                    v && (v.style.cssText = x);
                    if (y.childNodes.length > 0) {
                        y.removeChild(y.childNodes[0])
                    }
                    Core.Dom.insertHTML(y, D, "beforeend");
                    var F = "frameborder:0;allowtransparency:true;width:" + (v.offsetWidth - 8) + "px;height:" + (v.offsetHeight - 8) + "px;position:fixed;bottom:3px;right:3px;z-index:200;_position:absolute;background-color:transparent;";
                    var w = A.parentNode.getElementsByTagName("a")[0];
                    v && (v.style.display = "");
                    Core.Events.fireEvent(w, "click");
                    (function() {
                        if ($IE6 && v.style.display == "") {
                            v.style.cssText = x;
                            setTimeout(arguments.callee, 200)
                        }
                    })()
                }
            })();
            
              
        m = function(z, v, E, D, x, w, B) {
                var x = {
                    CD0079: $CLTMSG.CD0079,
                    baseimg: $CONFIG.$BASEIMG,
                    title: x.title || "",
                    url: x.url || "",
                    CX0221: $CLTMSG.CX0221
                },
                    y = App.DomBuilder(o[z].replace(/#\{(\w*)?,?(\d*)?}/g, function(F, H, I) {
                        var G = x[H] || "";
                        if (G && (I = (I * 1)) && I < n(G)) {
                            G = [h(G, I), "..."].join("")
                        }
                        return G
                    }), E),
                    s = y.domList.content;
                r(y.domList.close, function() {
                        if (v) {
                            v.style.display = ""
                        }
                        E.style.display = "none";
                        E.innerHTML = ""
                    }, "click");
                y.domList.openWin && (y.domList.openWin.onclick = function() {
                        return false
                    });
                r(y.domList.openWin, function() {
                        g(D)
                    }, "click");
                if (v) {
                        v.style.display = "none"
                    }
                if (E) {
                        E.style.display = "";
                        E.style.visibility = "visible"
                    }
                y.add();
                scroller(s, 1000, -60, 0, true, true);
                var t = setTimeout(function() {
                        s.innerHTML = $CLTMSG.CL0915
                    }, 10000);
                var C = "";
                if (scope.$IE) {
                        C = "object"
                    } else {
                        var A = function() {
                            if (navigator.plugins && navigator.plugins.length > 0) {
                                var F = navigator.plugins["Shockwave Flash"];
                                if (F) {
                                    return true
                                }
                            }
                            return false
                        };
                        if (A()) {
                            C = "embed"
                        } else {
                            C = "html5"
                        }
                    }/**/
               App.Jsonp(["/show.jsonp?source=3417389906&short_url=", D, "&lang=", b, "&jsonp=#{jsonp}", "&mid=", B, "&vers=3&template_name=", C].join(""), function(F) {
                 //	App.Jsonp(["show.jsonp?source=3417389906&short_url=hrpx8H&lang=zh_cn&jsonp=#{jsonp}&mid=201110415324491663&vers=3&template_name=embed"].join(""), function(F) {
                	
                	
                        if (!F) {
                            return
                        }
                        try {
                        	
                            clearTimeout(t);
                            if (F.result) {
                                s.innerHTML = F.result;
                                a[D] = F.result;
                                setTimeout(function() {
                                    s.style.marginBottom = "1px";
                                    s.style.hasLayout = "0"
                                }, 0)
                            } else {
                                if (F.error_code) {
                                    s.innerHTML = $CLTMSG.CL0916
                                }
                            }
                        } catch (G) {}
                    })
            };
        return function(A, E, t) {
                var x = A.parentNode.getAttribute("mid"),
                    B = A.parentNode.getAttribute("type"),
                    C = $E("disp_" + x),
                    y = $E("prev_" + x) || C,
                    v = y.getAttribute("mbind");
                if (B == "3" || !C) {
                        return
                    }
                A.onclick = function() {
                        return false
                    };
                var F = function(G) {
                        G !== 1 && (C.innerHTML = "");
                        m(B, y, C, E, t, j, x);
                        Core.Events.stopEvent();
                        return false
                    };
                r(A, F, "click");
                if (v != 1) {
                        y.setAttribute("mbind", "1");
                        if (j && B != "2") {
                            F(1);
                            Core.Events.stopEvent();
                            return false
                        }
                        if (!t.screen) {
                            return false
                        }
                        var s = $C("div"),
                            D = Core.Dom.getElementsByClass(y, "div", "feed_img")[0];
                        s.className = "feed_img";
                        s.innerHTML = ['<a href="', p, '" onclick="return false;"><img class="imgicon" style="cursor:pointer;" /></a></div>'].join("");
                        var w = s.getElementsByTagName("IMG")[0];
                        w.onload = function() {
                                if (t.type == "video") {
                                    App.imgResize(w, 120, 90)
                                }
                            };
                        w.src = t.screen;
                        if (D) {
                                D.parentNode.insertBefore(s, D.nextSibling)
                            } else {
                                y.insertBefore(s, y.firstChild)
                            }
                        r(s, F, "click");
                        if (!t.icon) {
                                return false
                            }
                        var z = new Image();
                        z.onload = function() {
                                var G = "filter:alpha(opacity=50);-moz-opacity:.5;opacity:.5;",
                                    J = "filter:alpha(opacity=80);-moz-opacity:.8;opacity:.8;",
                                    H = ["cursor:pointer;position:absolute;top:50%;left:50%;margin:-", (z.width / 2), "px 0 0 -", (z.height / 2), "px;"].join("");
                                var I = ["position:absolute;top:50%;left:50%;margin:-", (z.width / 2), "px 0 0 -", (z.height / 2), "px;filter:alpha(opacity=50);-moz-opacity:.5;opacity:.5;"].join("");
                                z.style.cssText = [H, G].join("");
                                z.onmouseover = function() {
                                        z.style.cssText = [H, J].join("")
                                    };
                                z.onmouseout = function() {
                                        z.style.cssText = [H, G].join("")
                                    };
                                s.appendChild(z)
                            };
                        z.src = t.icon
                    }
            }
    })();
    //4#
App.bindMusic = function(f, b, a) {
        App.bindApplication(f, b, a)
    };
$registJob("splitLoadMedia", function() {
        var h = App.sizzle,
            g = function() {
                var j = {},
                    m = {},
                    l = [],
                    k = [];
                j.data = l;
                j.plugin = function(o, n) {
                        m[o] = n;
                        return j
                    };
                j.add = function(o, n) {
                        l.push(o);
                        k.push(n)
                    };
                j.exec = function(n, o, q) {
                        var p;
                        (p = m[q.type]) && p(n, o, q)
                    };
                j.flush = function(p) {
                        var o = 0,
                            n = k.length;
                        if (!n) {
                                return
                            }
                        for (o; o < n; o++) {
                                if (p[l[o]]) {
                                    try {
                                        j.exec(k[o], l[o], p[l[o]])
                                    } catch (q) {}
                                    k.splice(o, 1);
                                    l.splice(o, 1);
                                    o--;
                                    n--
                                }
                            }
                    };
                return j
            },
            b = function(l, k) {
                if (!l.parentNode) {
                    l.src = k;
                    return
                }
                var j = new Image;
                j.onload = function() {
                    j.onload = null;
                    l.src = k
                };
                j.src = k
            },
            f = function(j) {
                return Core.String.trim(((j = j.match(/\/([^\/]+)\/?(<[^<]*)?$/i)) && j[1]) || "")
            },
            a = function() {};
        App.splitLoader.plugin("flushImg", {
                init: function(j) {
                    var k = h("img[dynamic-src]", j);
                    return k
                },
                flush: function(m) {
                    if (m.length) {
                        var n, l = arguments.callee,
                            n = n = m.shift(),
                            k, j;
                        if (n && (k = n.getAttribute("dynamic-src"))) {
                                b(n, k);
                                if (n.getAttribute("vimg")) {
                                    j = new Image();
                                    j.setAttribute("dynamic-src", k.replace(/\/thumbnail\//, "/bmiddle/"));
                                    m.push(j)
                                }
                            }
                        setTimeout(function() {
                                l(m)
                            }, 0)
                    }
                }
            }).plugin("flushApp", (function() {
                var j = g();
                return {
                    init: function(l) {
                        var k = h("a[mt]", l);
                        return k
                    },
                    extract: function(k) {
                        j.add(f(k.innerHTML), k)
                    },
                    flush: (function() {
                        j.plugin("video", App.bindApplication).plugin("url", App.bindTitle).plugin("magic", App.bindFace).plugin("music", App.bindMusic).plugin("vote", App.bindVote);
                        return function(n) {
                            var l = {
                                url: j.data.join(","),
                                lang: $CONFIG["$lang"]
                            };
                            var k = "/mblog/sinaurl_info.php";
                            var m = function(o) {
                                j.flush(o)
                            };
                            App.doRequest(l, k, m, a, "get")
                        }
                    })()
                }
            })()).plugin("flushCommentCount", (function() {
                var j = g();
                return {
                    init: function(k) {
                        var l = h("strong[rid]", k);
                        return l
                    },
                    extract: function(k) {
                        j.add(k.getAttribute("rid"), k)
                    },
                    flush: (function() {
                        j.plugin("count", function(o, n, m) {
                            var l, k = o.getAttribute("type");
                            if (k && (l = parseInt(m[k]))) {
                                o.innerHTML = ["(", l, ")"].join("")
                            }
                        });
                        return function(o) {
                            if (!o.length || !(/^(?:mymblog|profile)$/i.test(scope.$pageid))) {
                                return
                            }
                            var m = {
                                mids: j.data.join(","),
                                oid: scope.$oid
                            };
                            var l = "/mblog/aj_comment.php";
                            var k = function() {};
                            var n = function(p) {
                                j.flush(p)
                            };
                            App.doRequest(m, l, n, k, "get")
                        }
                    })()
                }
            })()).plugin("flushState", {
                init: function(j) {
                    var k = h("strong[oid]", j);
                    return k
                },
                extract: function(k) {
                    var j = k.getAttribute("oid");
                    j && (j == scope.$uid) && (k.style.display = "")
                }
            }).plugin("flushLanguage", {
                init: function(k) {
                    var j = h("strong[lang]", k);
                    return j
                },
                extract: function(k) {
                    var j = k.getAttribute("lang");
                    j && (j = $CLTMSG[j]) && (k.innerHTML = j)
                }
            }).plugin("flushWidget", (function() {
                var k = {},
                    j = 0,
                    l = [],
                    n, m = 0;
                return {
                        init: function(p) {
                            var o = h("div[wbml=widget]", p);
                            return o
                        },
                        extract: function(t) {
                            var p, v, q = (j && j % 5 == 0) ? 0 : -1,
                                o = t.getAttribute("name");
                            if (!o) {
                                    return
                                }
                            k[o] = t;
                            !q && (j = 0);
                            p = (p = l.length) ? p + q : 0;
                            l[p] = (v = l[p]) != null ? [v, o].join(",") : o;
                            j++
                        },
                        flush: function(o) {
                            var p = l.shift();
                            if (!p) {
                                return
                            }
                            App.Jsonp(["/widget/aj_proxy.php?appid=", p, "&ouid=", $CONFIG.$oid, "&jsonp=#{jsonp}"].join(""), function(r) {
                                if (r && r.code == "A00006" && r.data) {
                                    for (var q in r.data) {
                                        App.bindWidget(k[q], q, r.data[q])
                                    }
                                }
                            });
                            if (l.length) {
                                clearTimeout(n);
                                n = setTimeout(arguments.callee, 2000)
                            }
                        }
                    }
            })()).plugin("flushMap", (function() {
                var m = [],
                    l = [],
                    k = [],
                    n = {},
                    j = 0;
                App.bindGeo = function(p) {
                        var o, r, q;
                        for (o in p) {
                            if (r = n[o]) {
                                q = r.geo.split(",");
                                App.bindPopUpMiniMap(r.dom, q[0], q[1], p[o].type, r.head, p[o].addr, r.nick)
                            }
                        }
                    };
                return {
                        init: function(o) {
                            var q = h("p[geo]", o);
                            return q
                        },
                        extract: function(r) {
                            var q = r.getAttribute("geo"),
                                p = r.getAttribute("head"),
                                o = r.getAttribute("nick") || "";
                            var s = ["g", j++].join("");
                            n[s] = {
                                    dom: r,
                                    head: p,
                                    geo: q,
                                    nick: o
                                };
                            m.push([q, s].join(","))
                        },
                        flush: function(p) {
                            if (!m.length) {
                                return
                            }
                            var o = ["http://api.map.sina.com.cn/i/xyInChina_mul.php?xy=", m.join("|"), "&rnd=", new Date().getTime().toString(32), Math.floor(Math.random() * 1000).toString(32)].join("");
                            m = [];
                            App.SimpleJSLoader(o)
                        }
                    }
            })());
        App.splitLoader.add(document.body);
        App.bindMedia = App.splitLoader.add
    });
scope.commentConfig = {
        iInputLimitSize: 280,
        defaultPage: "0",
        sPostUrl: "/comment/addcomment.php",
        sDeleteAPI: "/comment/delcomment.php",
        sDataUrl: "/comment/commentlist.php",
        params: {},
        ListNode: null
    };
scope.initCommentLoginInput = function(b, a) {
        if (b) {
            (function(f, h, g, j) {
                h.style.color = "#999999";
                h.alt = h.title = f;
                if (j == "") {
                    h.value = f
                }
                if (!h.binded) {
                    Core.Events.addEvent(h, function() {
                        passcardOBJ.init(h, {
                            overfcolor: "#999",
                            overbgcolor: "#e8f4fc",
                            outfcolor: "#000000",
                            outbgcolor: ""
                        }, g, parent);
                        h.style.color = "#333333";
                        if (h.value == f) {
                            h.value = ""
                        }
                    }, "focus");
                    Core.Events.addEvent(h, function() {
                        h.style.color = "#999999";
                        if (h.value == "") {
                            h.value = f
                        }
                    }, "blur");
                    b.binded = true
                }
            })("电子邮箱/UC号/会员帐号/手机号", b, a, b.value)
        }
    };
scope.closeCommentByRid = function(f, a) {
        var b = $E("_comment_list_" + f + "_" + a);
        b.innerHTML = "";
        b.loaded = false
    };
scope.loadCommentByRid = function(k, j, n, o, m, f, l, g, h, q, p) {
        if (scope.$cuser_status === "nofull" && scope.$uid !== "" && g == 1) {
            App.finishInformation();
            return false
        }
        var a = App.Comment.getTarget();
        var b = $E("_comment_list_" + j + "_" + o);
        scope.commentConfig.ListNode = b;
        if (b != null) {
            if (!b.loaded || h == 1) {
                if (!b.loaded) {
                    b.innerHTML = '<div style="padding:30px 0;text-align:center"><img src="' + scope.$BASEIMG + 'style/images/common/loading.gif" /></div>';
                    b.style.diplay = ""
                }
                b.loaded = false
            } else {
                b.innerHTML = "";
                b.loaded = false;
                return
            }
            App.Comment.loadData(scope.commentConfig.sDataUrl, b, {
                act: g,
                from: scope.currentCommentPage || scope.commentConfig.defaultPage,
                ownerUid: k,
                productId: j,
                resId: o,
                resInfo: f,
                type: g
            }, function(z) {
                b.loaded = true;
                b.removeAttribute("cacheid");
                try {
                    App.bindMedia(b);
                    App.bindPopCard(b)
                } catch (F) {}
                var s = $E("_comment_content_" + j + "_" + o);
                App.Comment.listenerUserInput(s, scope.commentConfig.iInputLimitSize);
                var D = $E("_comment_post_" + j + "_" + o);
                var x = $E("_comment_logindiv_" + j + "_" + o);
                var v = $E("_comment_loginuser_" + j + "_" + o);
                var G = $E("_comment_loginpassword_" + j + "_" + o);
                var w = 0,
                    y = b.getElementsByTagName("input"),
                    C = y.length;
                var r = $E("agree_" + o);
                var B = $E("isroot_" + o);
                scope.initCommentLoginInput(v, G);
                D.oParam = {
                        uid: scope.$uid,
                        ownerUid: k,
                        resourceId: o,
                        productId: j,
                        productName: n,
                        resTitle: m,
                        resInfo: f,
                        listInDiv: g
                    };
                if (!D.binded) {
                        Core.Events.addEvent(D, function() {
                            r && (D.oParam.forward = (r.checked) ? "1" : "0");
                            B && (D.oParam.isroot = (B.checked) ? "1" : "0");
                            var J = Core.Function.bind3(App.Comment.addComment, App.Comment, [scope.commentConfig.sPostUrl, D, function(K, O) {
                                var N = null;
                                if (scope.commentConfig.params.role !== undefined && scope.commentConfig.params.role != -1) {
                                    N = function() {
                                        var P = App.alert({
                                            code: "M02007"
                                        }, {
                                            icon: 3,
                                            hasBtn: false
                                        });
                                        setTimeout(function() {
                                            P.close()
                                        }, 1000)
                                    }
                                }
                                s.value = "";
                                if (O.data) {
                                    var L;
                                    if (g == 1) {
                                        L = Core.Dom.getElementsByClass(b, "ul", "PL_list")[0]
                                    } else {
                                        L = Core.Dom.getElementsByClass(b, "ul", "commentsList")[0]
                                    }
                                    Core.Dom.insertHTML(L, O.data, "afterbegin");
                                    try {
                                        App.bindMedia(L.getElementsByTagName("li")[0]);
                                        App.bindPopCard(L.getElementsByTagName("li")[0])
                                    } catch (M) {}
                                    try {
                                        App.Comment.superCount(b, "+")
                                    } catch (M) {}
                                    App.Comment.focus(s)
                                } else {
                                    scope.loadCommentByPage.bind2(D)(0, 1, N)
                                }},function(K) {
                                if (K.code == "A00003") {
                                    D.$loginDiv = x;
                                    D.$loginuser = v;
                                    D.$loginpassword = G;
                                    x.style.display = "block";
                                    D.className = "btn_normal";
                                    D.locked = false
                                } else {
                                    if (K.code == "M01155") {
                                        App.Comment.alert(D, App.getMsg(K.code), 1, function() {});
                                        s.value = "";
                                        D.className = "btn_normal";
                                        D.locked = false
                                    } else {
                                        if (K.code == "MR0050") {
                                            D.className = "btn_normal";
                                            D.locked = false;
                                            App.forbidrefresh(function() {
                                                scope.commentConfig.params.retcode = scope.doorretcode || "";
                                                scope.doorretcode = "";
                                                Core.Events.fireEvent(D, "click")
                                            }, scope.commentConfig.sPostUrl)
                                        } else {
                                            D.className = "btn_normal";
                                            D.locked = false;
                                            App.Comment.alert(D, App.getMsg(K.code), 1, function() {})
                                        }
                                    }
                                }}]);
                            J()
                        }, "click");
                        Core.Events.addEvent(s, function(J) {
                            if ((J.ctrlKey == true && J.keyCode == "13") || (J.altKey == true && J.keyCode == "83")) {
                                s.blur();
                                Core.Events.fireEvent(D, "click")
                            }
                        }, "keyup");
                        D.binded = true
                    }
                if (q == 1) {
                        if (g == 2) {
                            var H = window,
                                E = H.document,
                                A = E.documentElement || {};
                            var t = Core.Dom.getTop(s);
                            var I = (H.pageYOffset || Math.max(A.scrollTop, E.body.scrollTop));
                            t = (I > t) ? t - 150 : null;
                            App.Comment.focus(s, t)
                        } else {
                            App.Comment.focus(s)
                        }
                    }
                if (!scope.loginKit().isLogin) {
                        D.$loginDiv = x;
                        D.$loginuser = v;
                        D.$loginpassword = G;
                        x.style.display = "block"
                    }
                if (typeof(p) == "function") {
                        setTimeout(p, 200)
                    }
            }, function(r) {
                App.Comment.alert(a, App.getMsg(r.code))
            }.bind2(this))
        }
    };
scope.deleteCommentByRid = function(h, p, q, b, o, g, m) {
        var a = App.Comment.getTarget();
        var k = $E("_comment_post_" + o + "_" + q);
        var j = $E("_comment_logindiv_" + o + "_" + q);
        var f = $E("_comment_loginuser_" + o + "_" + q);
        var n = $E("_comment_loginpassword_" + o + "_" + q);
        var l = function(s) {
            var r = App.getMsg("SCM001");
            if (h != p && h != scope.$uid && (Core.Array.findit(App.admin_uid_list, h) === -1)) {
                r += "<div style='margin-top:10px;font-size:14px;'><input style='vertical-align:-1px;margin-right:3px;' type='checkbox' id='block_user' name='block_user'><label for='block_user'>" + $CLTMSG.CC0601 + "</label></div>"
            }
            App.Comment.alert(a, r, 4, function() {
                var t = {
                    act: "delComment",
                    resUid: p,
                    resId: q,
                    id: b,
                    productId: o,
                    commentId: h
                };
                if ($E("block_user") && $E("block_user").checked) {
                    t.isblack = "OK"
                }
                App.Comment.deleteComment(scope.commentConfig.sDeleteAPI, t, function(y) {
                    if (s) {
                        setTimeout(function() {
                            window.location.reload(true)
                        }, 10);
                        return
                    }
                    if (m == 1) {
                        if (!scope.$resourceId && g == 2) {
                            setTimeout(function() {
                                window.location.reload(true)
                            }, 10)
                        } else {
                            var x = "commentsCell",
                                w = a;
                            if (g == 1) {
                                    x = "MIB_linedot3"
                                }
                            while (true) {
                                    if (([" ", w.className, " "].join("").indexOf(x) != -1) || !(w = w.parentNode)) {
                                        break
                                    }
                                }
                            var v = w.parentNode;
                            v.removeChild(w);
                            try {
                                    App.Comment.superCount(v.parentNode, "-", function() {
                                        scope.loadCommentByPage.bind2(k)(scope.currentCommentPage)
                                    })
                                } catch (z) {}
                        }
                    }
                    if (m === false) {
                        var A = a.parentNode.parentNode;
                        if (A && A.className.indexOf("commentsCell") !== -1) {
                            A.parentNode.removeChild(A)
                        }
                    }
                }, function(v) {
                    if (!v.code) {
                        return
                    }
                    if (v.code == "A00003") {
                        App.ModLogin(function() {})
                    } else {
                        App.Comment.alert(a, App.getMsg(v.code), 1, function() {
                            window.location.reload(true)
                        })
                    }
                })
            }, function() {})
        };
        if (!scope.loginKit().isLogin) {
            App.ModLogin({
                func: function() {
                    l(true)
                }
            })
        } else {
            l()
        }
    };
scope.loadCommentByPage = function(g, n, m) {
        n = n || 0;
        scope.currentCommentPage = g || scope.commentConfig.defaultPage;
        if (this.oParam) {
            var a = this.oParam;
            scope.loadCommentByRid(a.ownerUid, a.productId, a.productName, a.resourceId, a.resTitle, a.resInfo, "", a.listInDiv, 1, n, m)
        } else {
            scope.loadCommentByRid(scope.$oid || "", $CONFIG.$product || "", scope.$appName || "", scope.$resourceId || "", scope.$resTitle || "", scope.$resInfo || "", "", "2", 1, n, m)
        }
        var h = Core.Events.getEvent();
        if (h.type != "click") {
            return
        }
        var f = scope.commentConfig.ListNode;
        if (!n && f) {
            var j = Core.Dom.getTop(f);
            var b = navigator.userAgent.toLowerCase(),
                l = {};
            var k = document.documentElement;
            l.chrome = /chrome/i.test(b);
            var k = document.documentElement;
            if (l.chrome) {
                    k = document.body
                }
            k.scrollTop = j + 40
        }
    };
scope.replyByCid = function(b, m, t, o, q, r, p, w, k, s) {
        w = w == 1 ? 1 : 2;
        var F;
        var D;
        var B = $E("_comment_post_" + p + "_" + t);
        var n = $E("_comment_logindiv_" + p + "_" + t + (w == 2 ? "_" + o : ""));
        var G = $E("_comment_loginuser_" + p + "_" + t + (w == 2 ? "_" + o : ""));
        var E = $E("_comment_loginpassword_" + p + "_" + t + (w == 2 ? "_" + o : ""));
        scope.initCommentLoginInput(G, E);
        if (w == 1) {
            F = $E("_comment_content_" + p + "_" + t);
            if (B && B.oParam) {
                B.oParam.replyUid = b;
                B.oParam.ccontent = r;
                B.oParam.cid = o
            }
        } else {
            F = $E("_comment_content_" + p + "_" + t + "_" + o);
            var a = $E("_comment_reply_" + p + "_" + t + "_" + o);
            if (a.isOpen) {
                a.style.display = "none";
                a.isOpen = false;
                return
            } else {
                a.style.display = "block";
                a.isOpen = true
            }
            var g = a.getElementsByTagName("input");
            var x = g.length;
            var C = $E("agree_" + o);
            var f = $E("isroot_" + o);
            if (C && C.parentNode) {
                C.parentNode.style.display = "block"
            }
            var A = $E("_comment_post_" + p + "_" + t + "_" + o);
            A.oParam = (!B) ? {
                uid: scope.$uid,
                ownerUid: m,
                resourceId: t,
                productId: p,
                resTitle: s,
                listInDiv: w
            } : (function() {
                var I = {};
                for (var H in B.oParam) {
                    I[H] = B.oParam[H]
                }
                return I
            })();
            A.oParam.replyUid = b;
            A.oParam.ccontent = r;
            A.oParam.cid = o;
            if (!A.binded) {
                Core.Events.addEvent(A, function() {
                    C && (A.oParam.forward = (C.checked) ? "1" : "0");
                    f && (A.oParam.isroot = (f.checked) ? "1" : "0");
                    var H = Core.Function.bind3(App.Comment.addComment, App.Comment, [scope.commentConfig.sPostUrl, A, function(M) {
                        if (k == 1) {
                            var J;
                            if (scope.commentConfig.params.role !== undefined && scope.commentConfig.params.role != -1) {
                                J = function() {
                                    return App.alert({
                                        code: "M02008"
                                    }, {
                                        icon: 3
                                    })
                                }
                            }
                            scope.loadCommentByPage.bind2(A)(0, 1, J)
                        } else {
                            var L = A.oParam;
                            var K = $E("_comment_reply_" + L.productId + "_" + L.resourceId + "_" + L.cid);
                            F.value = "";
                            A.isOpen = false;
                            A.className = "btn_normal";
                            if (scope.$pageid == "commentHandler") {
                                var I = $E("_comment_paneltip_" + L.productId + "_" + L.resourceId + "_" + L.cid);
                                if (K && I) {
                                    var N = App.Comment.tip(A, App.getMsg("SCM007"), 3, function() {});
                                    N.onClose = function() {
                                        window.clearTimeout(N.clock);
                                        I.style.display = "none";
                                        K.style.display = "none"
                                    };
                                    N.clock = window.setTimeout(function() {
                                        N.close()
                                    }, 1000)
                                }
                            } else {
                                App.Comment.alert(A, App.getMsg("SCM007"), 3, function() {});
                                K.style.display = "none"
                            }
                            K.isOpen = false
                        }},function(I) {
                        if (I.code == "A00003") {
                            A.$loginDiv = n;
                            A.$loginuser = G;
                            A.$loginpassword = E;
                            n.style.display = "block";
                            A.className = "btn_normal";
                            A.locked = false
                        } else {
                            if (I.code == "M01155") {
                                A.className = "btn_normal";
                                A.locked = false;
                                App.Comment.alert(A, App.getMsg(I.code), 1, function() {});
                                F.value = ""
                            } else {
                                if (I.code == "MR0050") {
                                    App.forbidrefresh(function() {
                                        A.className = "btn_normal";
                                        A.locked = false;
                                        scope.commentConfig.params.retcode = scope.doorretcode || "";
                                        scope.doorretcode = "";
                                        Core.Events.fireEvent(A, "click")
                                    }, scope.commentConfig.sPostUrl)
                                } else {
                                    A.className = "btn_normal";
                                    A.locked = false;
                                    App.Comment.alert(A, App.getMsg(I.code), 1, function() {})
                                }
                            }
                        }}]);
                    H()
                }, "click");
                Core.Events.addEvent(F, function(H) {
                    if ((H.ctrlKey == true && H.keyCode == "13") || (H.altKey == true && H.keyCode == "83")) {
                        F.blur();
                        Core.Events.fireEvent(A, "click")
                    }
                }, "keyup");
                A.binded = true
            }
            if (!scope.loginKit().isLogin) {
                A.$loginDiv = n;
                A.$loginuser = G;
                A.$loginpassword = E;
                n.style.display = "block"
            }
        }
        App.Comment.listenerUserInput(F, scope.commentConfig.iInputLimitSize);
        D = Core.String.trim(F.value);
        var l = new RegExp("^" + $CLTMSG.CC0501 + "[^:]*:");
        if (l.test(D)) {
            F.value = D.replace(l, $CLTMSG.CC0602 + q + ":")
        } else {
            F.value = $CLTMSG.CC0602 + q + ":" + D
        }
        var z = window,
            j = z.document,
            h = j.documentElement || {};
        var y = Core.Dom.getTop(F);
        var v = (z.pageYOffset || Math.max(h.scrollTop, j.body.scrollTop));
        y = (v > y) ? y - 150 : null;
        App.Comment.focus(F, y)
    };
scope.getCommentCount = function(j) {
        var h = j || scope.$commentdata;
        var b = [];
        var a = [];
        var f = [];
        if (h && h.length > 0) {
            var g = 0;
            for (g; g < h.length; g++) {
                b.push(h[g].pid);
                a.push(h[g].oid);
                f.push(h[g].rid)
            }
            Utils.Io.Ajax.request("/comment/commentnum.php", {
                POST: {
                    resourceids: f.join(","),
                    productids: b.join(","),
                    ownerUids: a.join(",")
                },
                onComplete: function(o) {
                    if (o.code == "A00006") {
                        var k = o.data;
                        if (k) {
                            var m;
                            var l = {};
                            for (m in k) {
                                l[k[m]["resourceid"]] = k[m].count;
                                var n = $E("_comment_count_" + k[m].productid + "_" + k[m].resourceid);
                                if (n) {
                                    App.Comment.setCount(n, k[m].count || 0)
                                }
                            }
                            var s = document.getElementsByName("_comment_count_" + k[m].productid);
                            var p = s.length;
                            if (p > 0) {
                                var m = 0;
                                for (m; m < p; m++) {
                                    var t = s[m];
                                    if (!t.changed) {
                                        var r = t.getAttribute("resid");
                                        var q = l[r];
                                        if (l[r]) {
                                            t.innerHTML = $CLTMSG.CC0603 + "<string>(" + (l[r] || 0) + ")</string>"
                                        } else {
                                            t.innerHTML = $CLTMSG.CC0603 + "<string>(0)</string>"
                                        }
                                        t.changed = true
                                    }
                                }
                            }
                        }
                    }
                },
                returnType: "json"
            })
        }
    };
scope.focusCommentContent = function(f, b) {
        f = "miniblog";
        var a = $E("_comment_content_" + f + "_" + b);
        App.Comment.focus(a)
    };
scope.loadComment = function(a) {
        if (a !== undefined) {
            Core.Class.extend(scope.commentConfig.params, {
                role: a.toString()
            })
        }
        if (scope.$resourceId) {
            scope.loadCommentByPage(1, 2)
        }
    };
$registJob("loadComment", function() {
        scope.loadComment(scope.$pageid == "mblog" ? "-1" : undefined)
    });
$registJob("ratateImage", function() {
        if (!$E("imgContainer")) {
            return false
        }
        var b = 500;
        var a = "imgContainer";
        Core.Events.addEvent("rotateLeft", function() {
            App.rotate.rotateLeft(a, 90, function(f) {}, b)
        }, "click");
        Core.Events.addEvent("rotateRight", function() {
            App.rotate.rotateRight(a, 90, function(f) {}, b)
        }, "click")
    });
App.rotate = {
        rotateRight: function(a, f, g, b) {
            this._img[a] = this._img[a] || {};
            this._img[a]._right = this._img[a]._right || 0;
            this._img[a]._right++;
            this._rotate(a, f == undefined ? 90 : f, g, b)
        },
        rotateLeft: function(a, f, g, b) {
            this._img[a] = this._img[a] || {};
            this._img[a]._left = this._img[a]._left || 0;
            this._img[a]._left++;
            this._rotate(a, f == undefined ? -90 : -f, g, b)
        },
        _img: {},
        _rotate: function(j, g, o, n) {
            var b = $E(j);
            b.angle = ((b.angle == undefined ? 0 : b.angle) + g) % 360;
            if (b.angle >= 0) {
                var q = Math.PI * b.angle / 180
            } else {
                var q = Math.PI * (360 + b.angle) / 180
            }
            var m = Math.cos(q);
            var h = Math.sin(q);
            if (document.all && !window.opera) {
                var f = document.createElement("img");
                f.src = b.src;
                f.height = b.height;
                f.width = b.width;
                if (!this._img[j]._initWidth) {
                    this._img[j]._initWidth = f.width;
                    this._img[j]._initHeight = f.height
                }
                if (f.height > n + 8) {
                    f._w1 = f.width;
                    f._h1 = f.height;
                    f.height = n - 4;
                    f.width = (f._w1 * f.height) / f._h1
                }
                f.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + m + ",M12=" + (-h) + ",M21=" + h + ",M22=" + m + ",SizingMethod='auto expand')";
                var l = this;
                setTimeout(function() {
                    var r = l._img[j]._left,
                        p = l._img[j]._right;
                    if (p % 2 == 0 || r % 2 == 0 || Math.abs(p - r) % 2 == 0) {
                            f.width = l._img[j]._initWidth - 4;
                            f.height = l._img[j]._initHeight - 4
                        }
                    if ((r === 1 && !p) || (!r && p === 1)) {
                            l._img[j]._width = f.width;
                            l._img[j]._height = f.height
                        }
                    if (p > 0 && r > 0 && Math.abs(p - r) % 2 != 0) {
                            f.width = l._img[j]._width - 4;
                            f.height = l._img[j]._height - 4
                        }
                }, 0)
            } else {
                var f = document.createElement("canvas");
                if (!b.oImage) {
                    f.oImage = b
                } else {
                    f.oImage = b.oImage
                }
                f.style.width = f.width = Math.abs(m * f.oImage.width) + Math.abs(h * f.oImage.height);
                f.style.height = f.height = Math.abs(m * f.oImage.height) + Math.abs(h * f.oImage.width);
                if (f.width > n) {
                    f.style.width = n + "px"
                }
                var a = f.getContext("2d");
                a.save();
                if (q <= Math.PI / 2) {
                    a.translate(h * f.oImage.height, 0)
                } else {
                    if (q <= Math.PI) {
                        a.translate(f.width, -m * f.oImage.height)
                    } else {
                        if (q <= 1.5 * Math.PI) {
                            a.translate(-m * f.oImage.width, f.height)
                        } else {
                            a.translate(0, -h * f.oImage.width)
                        }
                    }
                }
                a.rotate(q);
                try {
                    a.drawImage(f.oImage, 0, 0, f.oImage.width, f.oImage.height)
                } catch (k) {}
                a.restore()
            }
            f.id = b.id;
            f.angle = b.angle;
            b.parentNode.replaceChild(f, b);
            if (o && typeof o === "function") {
                o(f)
            }
        }
    };
App.shrinkImg = function(p) {
        var h = window,
            f = h.document,
            a = f.documentElement || {};
        var l = function() {
                if (arguments.length > 0) {
                    a.scrollTop = arguments[0];
                    f.body.scrollTop = arguments[0];
                    return
                }
                return (h.pageYOffset || Math.max(a.scrollTop, f.body.scrollTop))
            };
        var m = h.innerHeight || (a && a.clientHeight) ? a.clientHeight : f.body["clientHeight"];
        var q = Core.Dom.getXY;
        var g = function(t) {
                var v, s;
                if ("getBoundingClientRect" in t) {
                    v = t.getBoundingClientRect().top;
                    return v + l()
                }
                if (!(s = t.offsetParent)) {
                    return 0
                }
                v = s.offsetTop;
                while (s && s != f.body) {
                    v += s.offsetTop;
                    s = s.offsetParent
                }
                return v || 0
            };
        var b = function(v, s) {
                if (s) {
                    return m - (q(v)[1] - l())
                } else {
                    return q(v)[1] - l()
                }
            };
        var r = $E("disp_" + p);
        var j = $E("prev_" + p);
        var o = j.parentNode.parentNode;
        if (o.nodeName.toLowerCase() !== "li") {
                o = o.parentNode.parentNode
            }
        var k = b(o);
        r.innerHTML = "";
        r.style.display = "none";
        j.style.display = "";
        var n = o.offsetHeight;
        if ((-k) > n) {
                l(l() + k)
            }
    };
App.scaleImg = function(g, j, h) {
        var b = scope.$BASEIMG + "style/images/",
            a = {},
            m = 440;
        a.dom = g.getElementsByTagName("IMG")[0];
        a.initW = a.dom.width;
        a.initH = a.dom.height;
        if (h && $IE6) {
                m -= 8
            }
        if (g.loading && g.loading.style.display === "") {
                return
            }
        if (!g.loading) {
                var f = g.loading = $C("img");
                f.src = b + "common/loading.gif";
                Core.Dom.insertAfter(f, g, "beforeend");
                f.style.cssText = ["position:absolute", "top:" + (a.initH / 2 - 10) + "px", "left:" + (a.initW / 2 - 10) + "px", "background-color:transparent", "border:0px", "width:16px", "height:16px", "z-index:1001"].join(";")
            } else {
                g.loading.style.display = ""
            }
        var l = function(o) {
                var n = {};
                if (o[0] > m) {
                    n.width = m;
                    n.height = Math.round(o[1] * (m / o[0]))
                } else {
                    n.width = false;
                    n.height = false
                }
                k(n)
            };
        var k = function(o) {
                var w = function() {
                    var C = g.parentNode.parentNode.getAttribute("id");
                    return C.replace("prev_", "")
                };
                var s = w();
                var y = $E("disp_" + s);
                var r = $E("prev_" + s);
                var A = $C("div");
                A.className = "blogPicOri";
                var p = "loaded" + (new Date().getTime());
                var z = "left" + (new Date().getTime()) + Math.round(Math.random(100) * 100000);
                var B = "right" + (new Date().getTime()) + Math.round(Math.random(100) * 100000);
                var v = b + "/common/transparent.gif";
                try {
                    scope.statistics({
                        type: "open_img",
                        source: encodeURIComponent(App.imgURL(j, "bmiddle"))
                    })
                } catch (t) {}
                var n = '		    <p>		        <cite>		            <a href="javascript:;" onclick="App.shrinkImg(\'' + s + '\');">		            	<img title="' + $CLTMSG.CD0079 + '" class="small_icon cls" src="' + v + '">' + $CLTMSG.CD0079 + '</a>		            <cite class="MIB_line_l">|</cite>		        </cite>		        <cite>					<a href="' + App.imgURL(j, j.charAt(9) == "w" ? "large" : "orignal") + '" target="_blank">		            	<img  title="' + $CLTMSG.CD0080 + '" class="small_icon original" src="' + v + '">' + $CLTMSG.CD0080 + '</a>		        </cite>		        <cite class="MIB_line_l">|</cite>		        <cite>		            <a id="' + z + '" href="javascript:;"><img  title="' + $CLTMSG.CD0081 + '" class="small_icon turn_l" 		            	src="' + v + '">' + $CLTMSG.CD0081 + '</a>		        </cite>		        <cite>		            <a id="' + B + '" href="javascript:;" class="last_turn_r">		            	<img title="' + $CLTMSG.CD0082 + '" class="small_icon turn_r" src="' + v + '">' + $CLTMSG.CD0082 + '</a>		        </cite>		    </p>		    <img id="' + p + '" class="imgSmall" 		    	src="' + App.imgURL(j, "bmiddle") + '" ' + (o.width ? ('width="' + o.width + '"') : "") + " >		";
                if (h) {
                    A.innerHTML = n
                } else {
                    A.innerHTML = '<div class="MIB_assign_t"></div><div class="MIB_assign_c MIB_txtbl"><div class="blogPicOri">' + n + '</div></div><div class="MIB_assign_b"></div>';
                    A.className = "MIB_assign"
                }
                g.loading.style.display = "none";
                y.style.display = "";
                r.style.display = "none";
                if (h) {
                    var q = $C("div");
                    q.className = "MIB_linedot_l1";
                    y.appendChild(q);
                    y.appendChild(A)
                } else {
                    y.appendChild(A)
                }
                Core.Events.addEvent($E(p), function() {
                    App.shrinkImg(s)
                }, "click");
                Core.Events.addEvent($E(z), function() {
                    App.rotate.rotateLeft(p, 90, x, m)
                }, "click");
                Core.Events.addEvent($E(B), function() {
                    App.rotate.rotateRight(p, 90, x, m)
                }, "click");

                function x(C) {
                    C.className = "imgSmall";
                    Core.Events.addEvent(C, function() {
                        App.shrinkImg(s)
                    }, "click");
                    A.parentNode.style.cssText = "text-align:center;width:100%;"
                }
            };
        new App.getImgSize(App.imgURL(j, "bmiddle"), l)
    };
App.closeIntroduction = function(j, h) {
        if (j == 101) {
            Utils.Cookie.setCookie("lianghui", "1", 24, false, "weibo.com", false);
            return false
        }
        if (j == 103) {
            Utils.Cookie.setCookie("message", "1", 24 * 7, false, "weibo.com", false);
            return false
        }
        var a = parseInt(j);
        if (j > 10) {
            var b = parseInt(Utils.Cookie.getCookie("weekguide")) || 0;
            var g = [1, 2, 4, 8, 16];
            var f = (g[j - 11]) | b;
            Utils.Cookie.setCookie("weekguide", f, ((24 - (new Date()).getHours()) - ((new Date()).getMinutes()) / 60 + 24 * (7 - (new Date()).getDay())), false, "weibo.com", false)
        } else {
            var b = parseInt(Utils.Cookie.getCookie("guide")) || 0;
            var g = [16, 8, 4, 2, 1];
            var f = (g[j - 1]) | b;
            Utils.Cookie.setCookie("guide", f, ((24 - (new Date()).getHours()) - ((new Date()).getMinutes()) / 60), false, "weibo.com", false)
        }
    };
App.closeIntroduction2 = function(g, f, b) {
        f = parseInt(f);
        var a = (f / 3600);
        Utils.Cookie.setCookie((b || "c_") + g, "1", a, false, "weibo.com", false)
    };
App.rollOut = function(g, h) {
        if (g.style.display === "") {
            return
        }
        g.style.cssText = "position:relative;overflow:hidden;";
        g.style.display = "";
        var a = g.offsetHeight;
        var f = 0;
        g.style.height = f + "px";
        var b = function() {
            f = Math.min(a, (f + 10));
            g.style.height = f + "px";
            if (f == a) {
                g.style.cssText = "";
                if (h) {
                    h()
                }
            } else {
                setTimeout(arguments.callee, 20)
            }
        };
        b()
    };
scope.langList = function(a) {
        scope.switchLanguage(a.value)
    };
scope.langList1 = function(a) {
        scope.switchLanguage(a.value)
    };
scope.switchLanguage = function(a) {
        var b = scope.$lang === "zh" ? "zh-cn" : scope.$lang;
        if (b === a) {
            return
        }
        App.confirm($CLTMSG.CD0150, {
            icon: 4,
            width: 360,
            ok: function() {
                Utils.Io.Ajax.request("/person/aj_select_lang.php", {
                    onComplete: function(f) {
                        if (f.code === "A00006") {
                            window.location.reload(true)
                        }
                        if (f.code === "M00003") {
                            return App.ModLogin(null, $CLTMSG.CD0058)
                        }
                    },
                    onException: function(f) {},
                    returnType: "json",
                    POST: {
                        uid: scope.$uid,
                        lang: a
                    }
                })
            },
            cancel: function() {
                $E("lang_select").value = b
            }
        })
    };
scope.statistics = (function() {
        var j, a = [],
            f, g = document.getElementsByTagName("head")[0],
            b;
        return function(k, h) {
                try {
                    if (!k) {
                        return false
                    }
                    if (!k.uid) {
                        k.uid = scope.loginKit().uid
                    }
                    if (j) {
                        j.parentNode.removeChild(j)
                    }
                    for (f in k) {
                        a.push("".concat(f, "=", k[f]))
                    }
                    j = document.createElement("script");
                    j.charset = "utf-8";
                    b = h ? h : "http://hits.sinajs.cn/c.html?";
                    j.src = [b, a.join("&")].join("");
                    g.appendChild(j)
                } finally {
                    f = null;
                    a = []
                }
            }
    })();
scope.msgClose = function() {
        var a;
        if (a = $E("top_tray_msg_panel")) {
            a.style.display = "none";
            Utils.Io.Ajax.request("/public/del_unread.php", {
                onComplete: function(b) {
                    if (b.code != "A00006") {
                        App.alert(App.getMsg(b.code))
                    }
                },
                onException: function(b) {},
                returnType: "json",
                POST: {}
            })
        }
    };
App.addfavorite = function(a, b) {
        if (document.all) {
            window.external.addFavorite(a, b)
        } else {
            if (window.sidebar) {
                window.sidebar.addPanel(b, a, "")
            }
        }
        return false
    };
App.reportOpenWin = function(a) {
        if (!scope.$uid) {
            var b = $CLTMSG.CX0059;
            App.ModLogin({
                func: function() {
                    window.open(a, $CLTMSG.CX0060, "height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
                },
                initErrorTip: b
            });
            return
        }
        window.open(a, $CLTMSG.CX0060, "height=538px,width=450px,toolbar=no, menubar=no,resizable=no,location=no, status=no")
    };
App.closeTips = function() {
        Core.Events.stopEvent();
        var b = Core.Events.getEventTarget();
        var a = b;
        for (; !App.Dom.hasClass(a, "Mblog_tips_tl"); a = b.parentNode) {}
        if (a) {
            a.style.display = "none"
        }
    };
    (function() {
        Boot.addDOMLoadEvent(function() {
            if (!window.WBTopTray) {
                return
            }
            if (scope.new_feed) {
                return
            }
            WBTopTray.addListener("breath", function(k) {
                try {
                    var l = $E("top_tray_msg_panel"),
                        j, v = (l || {}).style,
                        y = $E("toptray_yellow_tip"),
                        g = $E("feed_msg_new"),
                        n = (g || {}).style,
                        b = false;
                    var A = [],
                        q = k,
                        w = q.comment,
                        h = q.msg,
                        x = q.atme,
                        z = q.attention.num,
                        o = q.feed;
                    w > 0 && A.push('<div class="l_1">' + w + $CLTMSG.CX0050 + '<a href="/comments">' + $CLTMSG.CX0051 + "</a></div>");
                    z > 0 && A.push('<div class="l_1">' + z + $CLTMSG.CX0052 + '<a href="http://weibo.com/' + scope.$uid + '/fans">' + $CLTMSG.CX0053 + "</a></div>");
                    h > 0 && A.push('<div class="l_1">' + h + $CLTMSG.CX0054 + '<a href="/messages">' + $CLTMSG.CX0055 + "</a></div>");
                    x > 0 && A.push('<div class="l_1">' + x + $CLTMSG.CX0056 + '<a href="/atme">' + $CLTMSG.CX0057 + "</a></div>");
                    v && (v.display = "none") && (A = A.join(" ")) && y && (y.innerHTML = A) && (v.display = "");
                    n && (n.display == "none") && (o > 0) && g && (function() {
                            try {
                                window.external.msSiteModeSetIconOverlay(scope.$BASECSS + "style/images/common/favicon/newMsg.ico", "新微博")
                            } catch (a) {}
                            Core.Events.addEvent(g, function() {
                                if (!scope.$uid || scope.dosplitload) {
                                    try {
                                        window.external.msSiteModeClearIconOverlay()
                                    } catch (f) {}
                                    return
                                }
                                window.location.href = "/" + scope.$uid;
                                return false
                            }, "click");
                            if (scope.att_newmblog === "gidall") {
                                g.innerHTML = $CLTMSG.YA0009
                            } else {
                                if (scope.att_newmblog === "search") {
                                    g.innerHTML = "";
                                    g.style.display = "none";
                                    return
                                } else {
                                    g.innerHTML = $CLTMSG.CX0058
                                }
                            }
                            g.parentNode.style.overflow = "hidden";
                            if (scope.dosplitload && !App._feedCache) {
                                App._getFeedCache(g);
                                return
                            }
                            App.rollOut(g);
                            b = true
                        })()
                } catch (p) {}
            })
        })
    })();
App.miniblogDel = function(b, q, f) {
        var n = Core.Dom.getXY(f);
        var p = n[0] - ((200 - f.offsetWidth) / 2);
        var o = n[1] - (f.offsetHeight) - 70;
        var m = App.PopUpConfirm().position(p, o);
        var l = App.PopUpAlert().position(p, o);
        q = (scope.$pageid == "mblog") ? true : false;
        var g;
        var j;
        if (scope.$feedtype == "isat") {
            g = "/myat/delete.php";
            j = $CLTMSG.CC2801
        } else {
            g = "/mblog/delete.php";
            j = $CLTMSG.CC2802
        }
        var k = function(r) {
            if (q) {
                setTimeout(function() {
                    location.href = "/mymblog.php"
                }, 400);
                return
            }
            setTimeout(function() {
                var s = $E("mid_" + b);
                App.Wipe(null, s).wipe("down", false, function() {
                    var t;
                    if (App.refurbishUpdate && !(/\/atme/.test(window.location + ""))) {
                        App.refurbishUpdate.add(-1)
                    }
                    s.parentNode.parentNode.removeChild(s.parentNode)
                })
            }, 10)
        };
        var a = {
            mid: b
        };
        var h = function(r) {
            if (r && r.code) {
                if (r.code == "M00009") {
                    r.code = "M01160"
                }
                l.content(App.getMsg(r.code)).position(p, o + 22).icon(1).wipe("up").lateClose(1500)
            }
        };
        m.content(j).icon(4).yes(function() {
            if (!scope.loginKit().isLogin) {
                App.ModLogin({
                    func: function() {
                        Core.Events.fireEvent(f, "click")
                    }
                });
                return
            }
            App.doRequest(a, g, k, h, "get")
        }).wipe("up", true)
    };
App.attention = function(a, b) {
        App.rightSideFollow(a, b, function() {
            location.reload()
        });
        return false
    };
App.attentionAll = function(f, b) {
        url = "/attention/aj_addfollow.php";
        f = scope.recommendId || f;

        function a() {
            for (var l = 0, g = f.length, k; k = f[l]; l++) {
                var m = $E("recomm_" + k);
                if (m) {
                    var h = m.getElementsByTagName("a")[0];
                    if (h) {
                        var j = document.createElement("SPAN");
                        j.innerHTML = $CLTMSG.CD0004;
                        m.replaceChild(j, h)
                    }
                }
            }
            $E("attAllBtn").style.visibility = "hidden";
            location.reload()
        }
        App.followOperation({
            uid: f.join(","),
            fromuid: scope.$uid
        }, url, a);
        return false
    };
$registJob("recommuser", function() {
        var f = scope.recommendId;
        if (f) {
            var b = "attention/aj_checkattention.php";
            var g = {
                uid: f.join(",")
            };
            var a = function(o, n) {
                var o = n.uid;
                for (var l = 0, h = o.length; l < h; l++) {
                    var m = $E("recomm_" + o[l]);
                    if (m) {
                        var j = m.getElementsByTagName("a")[0];
                        if (j) {
                            var k = document.createElement("SPAN");
                            k.innerHTML = $CLTMSG.CD0004;
                            m.replaceChild(k, j)
                        }
                    }
                }
            };
            App.doRequest(g, b, a)
        }
    });
App.focusEditor = function() {
        location.hash = "fbq";
        $E("publish_editor").focus();
        return false
    };
$registJob("splitLoadMyProfile", function() {
        var G = $E("feed_list");
        if (!G) {
            return
        }
        var x = $E("focus_feed_list");
        if (x) {
            x.onfocus = function() {
                var R = G.getElementsByTagName("a");
                if (R.length > 1) {
                    R[1].focus()
                }
                return false
            }
        }
        var L = function(S) {
            var U, R = S.length,
                V;
            for (U = 0; U < R; U++) {
                    V = S[U];
                    var T = V.getAttribute("date") * 1;
                    T && (T = App.FormatViewTime(T));
                    T && (V.innerHTML = T)
                }
        };
        setInterval(function() {
            L(App.sizzle("strong[date]", document.body))
        }, 60000);
        if (!scope.dosplitload) {
            return
        }
        var z = G.getElementsByTagName("li").length,
            C = G.parentNode;
        G.setAttribute("_num", z);
        var t = $C("ul");
        t.className = "MIB_feed";
        t.id = "myTempFeedUl";
        t.style.display = "none";
        C.insertBefore(t, G);
        var n = (function() {
                if (document.getElementsByClassName) {
                    return function(S, R) {
                        return S.getElementsByClassName(R)
                    }
                } else {
                    return function(S, R) {
                        return Core.Dom.getChildrenByClass(S, R)
                    }
                }
            })();
        var F = function(R) {
                return n(C, R)
            };
        var g = F("feed_lding");
        if (!g.length) {
                return
            }
        var q = F("MIB_bobar")[0];
        var y = g[0];
        var O = g[1];
        var r = g[2];
        var J = g[3];
        var H = $E("feed_msg_new");
        O.getElementsByTagName("a")[0].onclick = function() {
                H.style.display = "none";
                O.style.display = "none";
                y.style.display = "";
                I()
            };
        J.getElementsByTagName("a")[0].onclick = function() {
                J.style.display = "none";
                r.style.display = "";
                v()
            };
        var K = "";
        var b = function(R, S) {
                var U = document.createElement("div"),
                    T = document.createDocumentFragment();
                U.innerHTML = R;
                    (function() {
                        if (U.firstChild) {
                            T.appendChild(U.firstChild);
                            setTimeout(arguments.callee, 0)
                        } else {
                            S(T)
                        }
                    })()
            };
        var f = function(S) {
                var R = S.firstChild;
                while (R && (R.nodeType != 1 || R.nodeName != "LI")) {
                    R = R.nextSibling
                }
                return R
            };
        var P = function(S) {
                var R = S.lastChild;
                while (R && (R.nodeType != 1 || R.nodeName != "LI")) {
                    R = R.previousSibling
                }
                return R
            };
        var h = f(G);
        if (h == null) {
                h = {};
                h.id = 0
            }
        var Q = scope.$firstid || "0";
        var p = scope.$lastid;
        var B;
        var j = "/mblog/aj_feed_myprofile.php";
        var o = function(S) {
                var W = S;
                var U = n(C, "MIB_feed");
                var V, T;
                for (var R = U.length - 1; R > 0; R--) {
                    T = U[R];
                    V = 0 | T.getAttribute("_num");
                    if (!V) {
                        continue
                    }
                    if (W < V) {
                        T.setAttribute("_num", V - W);
                        while (W--) {
                            T.removeChild(P(T))
                        }
                        break
                    } else {
                        if (T.id === "feed_list") {
                            T.innerHTML = "";
                            T.setAttribute("_num", 0)
                        } else {
                            C.removeChild(T)
                        }
                        if (W === V) {
                            break
                        }
                        W -= V
                    }
                }
            };
        var N = function(R) {
                var U = $C("ul");
                U.className = "MIB_feed";
                U.innerHTML = K;
                U.setAttribute("_num", B);
                App.splitLoader.add(U);
                if (typeof App.regPopCard === "function") {
                    var S = {
                        container: U,
                        tag: "namecard"
                    };
                    App.regPopCard(S)
                }
                z += B;
                if (R) {
                    var T = Core.Dom.next(t, "MIB_feed");
                    var V = n(T, "MIB_linesld_l");
                    if (V.length) {
                        V[0].className = "MIB_linedot_l"
                    }
                    t.innerHTML = "";
                    t.style.display = "none";
                    if (z > 100) {
                        o(z - 100)
                    }
                    P(U).className = "MIB_linesld_l";
                    C.insertBefore(U, T);
                    y.style.display = "none";
                    h = f(G)
                } else {
                    C.insertBefore(U, r);
                    if (!E) {
                        m();
                        q.style.display = ""
                    }
                    r.style.display = "none";
                    setTimeout(function() {
                        k = true
                    }, 500)
                }
            };
        var l = (function() {
                return (document.compatMode === "BackCompat") ? document.body : document.documentElement
            })();
        var s = function() {
                return !((window.pageYOffset || l.scrollTop) + 2 * l.clientHeight < l.scrollHeight - 330)
            };
        var A, k = true,
            E = 2,
            M;
        var w = function() {
                if (k && !A) {
                    A = setTimeout(v, 500)
                }
            };
        var D = 0 | scope.$totalnum;
        if (D < 16) {
                E = 0
            } else {
                if (D < 31) {
                    E = 1
                }
            }
        if (E) {
                Core.Events.addEvent(window, w, "scroll")
            }
        var v = function() {
                clearTimeout(A);
                A = null;
                if (s()) {
                    k = false;
                    if (E === 2) {
                        M = 15
                    } else {
                        if (E === 1) {
                            M = 20
                        } else {
                            Core.Events.removeEvent(window, w, "scroll");
                            return
                        }
                    }
                    var R = {
                        returnType: "json",
                        GET: {
                            before: p,
                            count: M
                        },
                        onComplete: function(S) {
                            if (S.code === "A00006") {
                                E--;
                                B = S.data.total;
                                if (B === 0) {
                                    r.style.display = "none";
                                    setTimeout(function() {
                                        k = true
                                    }, 500);
                                    return
                                }
                                K = S.data.html;
                                p = S.data.endmid;
                                N()
                            } else {
                                this.onException(S.code)
                            }
                        },
                        onException: function(S) {
                            if (S) {}
                            r.style.display = "none";
                            J.style.display = ""
                        }
                    };
                    J.display = "none";
                    r.style.display = "";
                    Utils.Io.Ajax.request(j, R)
                }
            };
        var I = function() {
                App._feedCache = 1;
                var R = {
                    returnType: "json",
                    GET: {
                        after: Q
                    },
                    onComplete: function(S) {
                        if (S.code === "A00006") {
                            K = S.data.html;
                            B = S.data.total;
                            Q = S.data.startmid || Q;
                            if (B === 0) {
                                y.style.display = "none";
                                return
                            }
                            if (B < 51) {
                                N(true);
                                App._feedCache = null
                            } else {
                                window.location.href = "/" + scope.$uid
                            }
                        } else {
                            this.onException(S.code)
                        }
                    },
                    onException: function(S) {
                        y.style.display = "none";
                        O.style.display = ""
                    }
                };
                O.style.display = "none";
                y.style.display = "";
                Utils.Io.Ajax.request(j, R)
            };
        H.onclick = function() {
                try {
                    window.external.msSiteModeClearIconOverlay()
                } catch (R) {}
                this.style.display = "none";
                if (App._feedCache) {
                    O.style.display = "none";
                    y.style.display = "";
                    K = App._feedCache.html;
                    B = App._feedCache.total;
                    Q = App._feedCache.startmid || Q;
                    if (B < 51) {
                        N(true)
                    } else {
                        window.location.href = "/" + scope.$uid
                    }
                    a()
                } else {
                    I()
                }
                return false
            };
        var m = function() {
                if (D < 51) {
                    return
                }
                var V = n($E("feed_foot"), "btn_num")[0];
                var S = "&endmid=" + p;
                V.href += S;
                document.getElementsByName("endmid")[0].value = p;
                var T = $E("page_div").getElementsByTagName("a");
                for (var U = 1, R = T.length; U < R; U++) {
                    T[U].href += S
                }
            };
        var a = function() {
                delete App._feedCache
            };
        App._getFeedCache = function(R) {
                var S = {
                    returnType: "json",
                    GET: {
                        after: Q
                    },
                    onComplete: function(T) {
                        if (T.code === "A00006") {
                            if (!T.data.total) {
                                return
                            }
                            App._feedCache = T.data;
                            App.rollOut(R);
                            setTimeout(a, 30000)
                        }
                    }
                };
                Utils.Io.Ajax.request(j, S)
            }
    });
$registJob("paging", function() {
        var j = $E("page_div");
        if (j) {
            document.body.appendChild(j);
            var h = $E("paging_popup");
            var a = false;
            var f = 300;
            var b = function() {
                if (j.style.display == "none" && a) {
                    var k = Core.Dom.getXY(h);
                    k[1] -= (h).offsetHeight;
                    j.style.left = k[0] + ("v" == "\v" ? -2 : 0) + "px";
                    j.style.top = k[1] + 23 + "px";
                    j.style.display = "";
                    j.style.top = parseInt(j.style.top) - j.offsetHeight + "px"
                }
            };
            var g = function() {
                if (j.style.display == "" && !a) {
                    j.style.display = "none"
                }
            };
            Core.Events.addEvent(h, function(k) {
                Core.Events.stopEvent(k);
                if (!a) {
                    setTimeout(b, f);
                    a = true
                }
            }, "mouseover");
            Core.Events.addEvent(h, function(k) {
                Core.Events.stopEvent(k);
                if (a) {
                    setTimeout(g, f);
                    a = false
                }
            }, "mouseout");
            Core.Events.addEvent(j, function(k) {
                Core.Events.stopEvent(k);
                if (!a) {
                    setTimeout(b, f);
                    a = true
                }
            }, "mouseover");
            Core.Events.addEvent(j, function(k) {
                Core.Events.stopEvent(k);
                if (a) {
                    setTimeout(g, f);
                    a = false
                }
            }, "mouseout")
        }
    });
App.topic_recommend = function(f, b) {
        var a = $E("cat_list");
        var g = $E("category");
        if (f && f.getElementsByTagName("EM").length > 0) {
            return false
        }
        if (a) {
            (function(h) {
                var k = h.getElementsByTagName("A");
                for (var j = 0; j < k.length; j++) {
                    k[j].style.cssText = "";
                    k[j].innerHTML = k[j].innerText || k[j].textContent
                }
            })(g);
            f.style.cssText = "cursor: text; text-decoration: none;";
            f.innerHTML = '<em class="MIB_txtar fb">' + f.innerHTML + "</em>";
            Utils.Io.Ajax.request("/public/get_cat_list.php", {
                GET: {
                    cat_id: b || ""
                },
                onComplete: function(h) {
                    if (h.code == "A00006") {
                        a.innerHTML = h.data
                    } else {
                        a.innerHTML = ""
                    }
                },
                onException: function() {
                    a.innerHTML = ""
                },
                returnType: "json"
            })
        }
    };
    (function(a) {
        a.bigpop = function(b) {
            b.template = '<div class="PopLayer" id="bigpop" style="display:none;"><table class="Poptips"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div style="width: auto;" class="layerBoxCon1"><div class="PopInfo clearFix"><div class="Pop_close"><a id="popclose" class="close" href="javascript:void(0);"></a></div><div id="poptype" class="Poparrow"></div><div class="iconntent" id="popcontent"><div class="clearit"></div></div></div></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table></div>';
            b.view = new a.builder2(b);
            var f = $C("IFRAME");
            f.frameBorder = "0";
            f.Border = "0";
            f.framespacing = "0";
            f.allowtransparency = true;
            b.view.domList.bigpopifr = f;
            b.view.domList.popcontent.innerHTML = b.popcontent + b.view.domList.popcontent.innerHTML;
            b.view.domList.popclose.onclick = function() {
                g.clear = true;
                b.view.domList.bigpop.style.display = "none";
                b.view.domList.bigpopifr.style.display = "none";
                a.doRequest({
                    type: b.popfrom
                }, "/person/aj_closepop.php", function() {}, function() {})
            };
            b.view.domList.bigpop.style.position = "absolute";
            b.view.domList.bigpop.style.zIndex = "800";
            b.view.domList.bigpopifr.style.position = "absolute";
            b.view.domList.bigpopifr.style.zIndex = "600";
            b.view.domList.bigpopifr.style.backgroundColor = "transparent";
            document.body.appendChild(b.view.domList.bigpop);
            document.body.appendChild(b.view.domList.bigpopifr);
            var g = {
                show: function() {
                    g.clear = false;
                    b.view.domList.bigpop.style.display = "";
                    b.view.domList.bigpopifr.style.display = ""
                },
                hidd: function() {
                    Core.Events.fireEvent(b.view.domList.popclose, "click")
                },
                getWidth: function() {
                    return b.view.domList.bigpop.offsetWidth
                },
                getHeight: function() {
                    return b.view.domList.bigpop.offsetHeight
                },
                setPostion: function(h) {
                    Core.Dom.setXY(b.view.domList.bigpop, h);
                    Core.Dom.setXY(b.view.domList.bigpopifr, [h[0] + 2, h[1] + 2]);
                    b.view.domList.bigpopifr.width = b.view.domList.bigpop.offsetWidth - 5;
                    b.view.domList.bigpopifr.height = b.view.domList.bigpop.offsetHeight - 5
                },
                setType: function(h) {
                    b.view.domList.poptype.className = "Poparrow" + h
                },
                getRoot: function() {
                    return b.view.domList.bigpop
                }
            };
            return g
        }
    })(App);
$registJob("bigpop", function() {
        try {
            var j = document.body;
            var a = j.getElementsByTagName("A");
            if (!scope.popalert || !scope.popid) {
                return false
            }
            var h = $SYSMSG[scope.popalert],
                g;
            if (Core.Dom.getElementsByAttr($E("pop_" + scope.popid), "pop", "true").length <= 0) {
                    return false
                }
            g = Core.Dom.getElementsByAttr($E("pop_" + scope.popid), "pop", "true")[0];
            var f = function(n, l) {
                    var r = {
                        type: 4
                    };
                    var p = Core.Dom.getXY(n);
                    var o = Core.System.winSize();
                    var m = Core.System.getScrollPos();
                    var q = 10;
                    r.popwidth = l.offsetWidth;
                    r.popHeight = l.offsetHeight;
                    r.position = new Array();
                    if (p[0] + n.offsetWidth / 2 >= (o.width / 2 + m[1])) {
                        if (p[0] - r.popwidth - q - m[1] > 0) {
                            r.type = 2;
                            r.position[0] = p[0] - r.popwidth - q;
                            r.position[1] = p[1] - ((l.offsetHeight - n.offsetHeight) / 2);
                            return r
                        }
                        if (p[0] + n.offsetWidth + r.popwidth < o.width - m[1] && p[0] + n.offsetWidth + r.popwidth > m[1]) {
                            r.type = 4;
                            r.position[0] = p[0] + n.offsetWidth + q;
                            r.position[1] = p[1] - ((l.offsetHeight - n.offsetHeight) / 2);
                            return r
                        }
                    } else {
                        if (p[0] - r.popwidth - q - m[1] > 0) {
                            r.type = 2;
                            r.position[0] = p[0] - r.popwidth - q;
                            r.position[1] = p[1] - ((l.offsetHeight - n.offsetHeight) / 2);
                            return r
                        }
                        if (p[0] + n.offsetWidth + r.popwidth > m[1]) {
                            r.type = 4;
                            r.position[0] = p[0] + n.offsetWidth + q;
                            r.position[1] = p[1] - ((l.offsetHeight - n.offsetHeight) / 2);
                            return r
                        }
                    }
                    if (p[1] + n.offsetHeight / 2 >= (o.height / 2 + m[0])) {
                        if (p[1] + n.offsetHeight + r.popHeight < o.height - m[1] && p[1] + n.offsetHeight + r.popHeight >= m[0]) {
                            r.type = 1;
                            r.position[0] = p[0] - ((l.offsetWidth - n.offsetWidth) / 2);
                            r.position[1] = p[1] + n.offsetHeight + q;
                            return r
                        }
                        if (p[1] - r.popHeight - q > m[0]) {
                            r.type = 3;
                            r.position[0] = p[0] - ((l.offsetWidth - n.offsetWidth) / 2);
                            r.position[1] = p[1] - r.popHeight - q;
                            return r
                        }
                    } else {
                        if (p[1] + n.offsetHeight + r.popHeight >= m[0]) {
                            r.type = 1;
                            r.position[0] = p[0] - ((l.offsetWidth - n.offsetWidth) / 2);
                            r.position[1] = p[1] + n.offsetHeight + q;
                            return r
                        }
                        if (p[1] - r.popHeight - q > m[0]) {
                            r.type = 3;
                            r.position[0] = p[0] - ((l.offsetWidth - n.offsetWidth) / 2);
                            r.position[1] = p[1] - r.popHeight - q;
                            return r
                        }
                    }
                    return false
                };
            scope.bigpop = new App.bigpop({
                    popcontent: h,
                    popfrom: scope.popid
                });
            scope.bigpop.show();
            var b = setInterval(function() {
                    if (scope.bigpop.clear) {
                        clearInterval(b);
                        return false
                    }
                    var l = f(g, scope.bigpop.getRoot());
                    if (!l) {
                        return false
                    }
                    scope.bigpop.setType(l.type);
                    scope.bigpop.setPostion(l.position)
                }, 100)
        } catch (k) {}
    });
    (function(a) {
        a.hover = function(h, f, j) {
            var b = h.className;
            var g = h.style.cssText;
            Core.Events.addEvent(h, function() {
                f(h)
            }, "mouseover");
            if (!j || typeof j != "function") {
                Core.Events.addEvent(h, function() {
                    h.className = b;
                    h.style.cssText = g
                }, "mouseout")
            } else {
                Core.Events.addEvent(h, function() {
                    j(h)
                }, "mouseout")
            }
        }
    })(App);
Core.String.toInt = function(b, a) {
        return parseInt(b, a)
    };
App.addfavorite_miniblog = function(b) {
        var f = Core.Events.getEvent();
        var g = f ? (f.srcElement || f.target) : null;
        var k = Core.Dom.getXY(g);
        var a = k[0] - ((200 - g.offsetWidth) / 2);
        var j = k[1] - (g.offsetHeight) - 47;
        var h = App.PopUpAlert().position(a, j);
        if (b == "" || b == null) {
            return false
        }
        if (!scope.loginKit().isLogin) {
            App.ModLogin({
                func: function() {
                    Core.Events.fireEvent(g, "click")
                }
            });
            return
        }
        if (scope.$cuser_status === "nofull") {
            App.finishInformation();
            return false
        }
        Utils.Io.Ajax.request("/favorite/aj_add.php", {
            POST: {
                mid: b
            },
            onComplete: function(m) {
                var l;
                if (m) {
                    if (m.code == "A00006" || m.code == "M10001") {
                        var n = $C("strong");
                        n.innerHTML = $CLTMSG.CL0911;
                        document.body.appendChild(n);
                        Core.Dom.replaceNode(n, g.parentNode);
                        setTimeout(function() {
                            h.content($SYSMSG.M10010).icon(3).wipe("up", true).lateClose(1500)
                        }, 200)
                    } else {
                        setTimeout(function() {
                            var o = 0;
                            if (m.code == "M02019") {
                                o = -15
                            }
                            h.content(App.getMsg(m.code)).position(a, j + o).icon(1).wipe("up", true).lateClose(1500)
                        }, 200)
                    }
                } else {
                    h.content(App.getMsg(m.code)).icon(2).wipe("up", true).lateClose(1500)
                }
            },
            onException: function(l) {
                if (typeof l == "object" && l.code) {
                    h.content(App.getMsg(l.code)).icon(2).wipe("up", true).lateClose(1500)
                } else {
                    h.content($CLTMSG.CC0801).icon(2).wipe("up", true).lateClose(1500)
                }
            },
            returnType: "json"
        })
    };
App.deletefavorite_miniblog = function(a) {
        var b = Core.Events.getEvent();
        var j = b ? (b.srcElement || b.target) : null;
        var l = Core.Dom.getXY(j);
        var n = l[0] - ((200 - j.offsetWidth) / 2);
        var m = l[1] - (j.offsetHeight) - 70;
        var k = App.PopUpConfirm().position(n, m);
        var g = App.PopUpAlert().position(n, m);
        if (a == "" || a == null) {
            return false
        }
        var f = function() {
            var q = Core.Events.getEvent();
            var p = q.srcElement || q.target;
            while (p.nodeType != 1) {
                p = p.parentNode
            }
            return p
        };
        var o = f();
        while (o.tagName.toLowerCase() != "li") {
            o = o.parentNode
        }
        k.content($CLTMSG.CC0802).icon(4).yes(function() {
            if (!scope.loginKit().isLogin) {
                App.ModLogin({
                    func: function() {
                        Core.Events.fireEvent(j, "click")
                    }
                });
                return
            }
            h(o)
        }).wipe("up", true);
        var h = function(s) {
            var q, p;
            var t = $E("feed_title").getElementsByTagName("em").length > 0 ? $E("feed_title").getElementsByTagName("em")[0] : null;
            var r = "/favorite/aj_delete.php";
            Utils.Io.Ajax.request(r, {
                POST: {
                    mid: a
                },
                onComplete: function(w) {
                    if (w) {
                        if (w.code == "A00006") {
                            App.Wipe(null, s).wipe("down", false, function() {
                                s.parentNode.parentNode.removeChild(s.parentNode)
                            });
                            t.innerHTML = (Core.String.toInt(t.innerHTML) - 1).toString();
                            var v = $E("feed_list").getElementsByTagName("li").length;
                            if (v <= 1) {
                                window.location.reload(true)
                            }
                        } else {
                            g.content(App.getMsg(w.code)).wipe("up", true).icon(1).lateClose(1500)
                        }
                    } else {
                        g.content($CLTMSG.CC0701).wipe("up", true).icon(1).lateClose(1500)
                    }
                },
                onException: function(v) {
                    if (v && v.code) {
                        g.content(App.getMsg(v.code)).wipe("up", true).icon(1).lateClose(1500)
                    } else {
                        g.content($CLTMSG.CC0701).wipe("up", true).icon(1).lateClose(1500)
                    }
                },
                returnType: "json"
            })
        }
    };
$registJob("atme_filter", function() {
        var f = Core.Events,
            g = App.Dom;
        var b = {
                mod: $E("atme_filter")
            };
        var a = {
                init: function(j) {
                    g.getBy(function(l) {
                        var k = l.getAttribute("act");
                        if (!k) {
                            return false
                        }
                        b[k] = l;
                        switch (k) {
                        case "exp":
                            f.addEvent(l, function() {
                                a.panel(l)
                            });
                            break;
                        case "unexp":
                            f.addEvent(l, function() {
                                a.panel(l)
                            });
                            break;
                        case "submit":
                            f.addEvent(l, a.submit);
                            break
                        }
                    }, "", j);
                    var h = 0
                },
                submit: function() {
                    f.stopEvent();
                    b.form.submit()
                },
                panel: function(k) {
                    var j = k.getAttribute("state");
                    if (j == "post") {
                        return
                    }
                    f.stopEvent();
                    var h = k.getAttribute("act");
                    a[h] && a[h]()
                },
                exp: function() {
                    g.setStyle(b.title, "display", "none");
                    var m = b.panel;
                    m.style.cssText = "";
                    g.setStyle(m, "opacity", 0);
                    g.setStyle(m, "display", "");
                    var j = 0,
                        l = 10,
                        n = 1.5,
                        o = 100,
                        k = null;
                    var h = function() {
                            l *= n;
                            j += l;
                            if (j >= 100) {
                                clearInterval(k);
                                g.setStyle(m, "opacity", 100)
                            } else {
                                g.setStyle(m, "opacity", j / 100)
                            }
                        };
                    k = setInterval(h, o)
                },
                unexp: function() {
                    var l = b.panel;
                    var j = l.offsetHeight;
                    g.setStyle(l, "overflow", "hidden");
                    var n = 35,
                        k = null,
                        m = 40;
                    var h = function() {
                            m -= 3;
                            j -= m;
                            if (j <= 17 || m <= 0) {
                                clearInterval(k);
                                g.setStyle(l, "display", "none");
                                g.setStyle(b.title, "display", "")
                            } else {
                                g.setStyle(l, "height", j + "px")
                            }
                        };
                    k = setInterval(h, n)
                }
            };
        b.mod && a.init(b.mod)
    });
Core.Dom.removeClassName = function(b, a) {
        b = $E(b);
        b.className = (" " + b.className + " ").replace(" " + a + " ", "")
    };
$registJob("keyword_filter", function() {
        var a = {
            navPanel: $E("filter_nav_panel"),
            keyPanel: $E("filter_key_panel"),
            advPanel: $E("filter_adv_panel"),
            keyBtn: $E("filter_key_btn"),
            advBtn: $E("filter_adv_btn"),
            hideBtn: $E("filter_adv_hide"),
            advShow: $E("filter_adv_show"),
            keyInput: $E("filter_key_input"),
            advInput: $E("filter_adv_input"),
            keyForm: $E("filter_key_form"),
            advForm: $E("filter_adv_form"),
            stime: $E("filter_adv_stime"),
            etime: $E("filter_adv_etime"),
            dateRange: $E("date_range"),
            filterDate: $E("filter_date")
        };
        var f = Core.Events,
            h = Core.Dom,
            b = App.Dom;
        var g = {
                init: function() {
                    a.keyInput && f.addEvent(a.keyInput, g.searhInputBlur, "blur");
                    a.keyInput && f.addEvent(a.keyInput, g.searhInputFocus, "focus");
                    a.advInput && f.addEvent(a.advInput, g.searhInputBlur, "blur");
                    a.advInput && f.addEvent(a.advInput, g.searhInputFocus, "focus");
                    a.stime && f.addEvent(a.stime, g.searhInputBlur, "blur");
                    a.etime && f.addEvent(a.etime, g.searhInputBlur, "blur");
                    a.advShow && f.addEvent(a.advShow, g.showAdvPanel);
                    a.hideBtn && f.addEvent(a.hideBtn, g.hideAdvPanel);
                    a.keyBtn && f.addEvent(a.keyBtn, g.keySubmit);
                    a.advBtn && f.addEvent(a.advBtn, g.advSubmit);
                    a.stime && f.addEvent(a.stime, g.createSTime);
                    a.etime && f.addEvent(a.etime, g.createETime);
                    a.etime && (a.etime.readOnly = true);
                    a.stime && (a.stime.readOnly = true);
                    a.advPanel && a.advPanel.style.display !== "none" && h.setStyle(a.keyPanel, "display", "none");
                    this.selectTimeRange()
                },
                clearAbtnClass: function() {
                    b.getBy(function(j) {
                        if (b.hasClass(j, cName)) {
                            h.removeClassName(j, cName)
                        }
                    }, "a", aBtn.parentNode)
                },
                showAdvPanel: function(j) {
                    f.stopEvent();
                    h.setStyle(a.keyPanel, "display", "none");
                    g.showPanel(a.advPanel)
                },
                hideAdvPanel: function() {
                    var j = a.hideBtn.getAttribute("state");
                    if (j == "post") {
                        return
                    }
                    f.stopEvent();
                    g.hidePanel(a.advPanel);
                    var k = Core.Dom.getElementsByClass(document, "div", "pc_caldr");
                    if (k.length > 0) {
                        box = k[0];
                        box.innerHTML = "";
                        document.body.removeChild(box)
                    }
                },
                keySubmit: function() {
                    f.stopEvent();
                    if (a.keyInput.value.replace(/(^[\s]*)|([\s]*$)/g, "") != "") {
                        if (a.keyInput.value != a.keyInput.getAttribute("def")) {
                            a.keyForm.submit()
                        } else {
                            if (a.filterDate && a.filterDate.value !== "") {
                                a.keyInput.value = "";
                                a.keyForm.submit()
                            }
                        }
                    } else {
                        if (a.filterDate && a.filterDate.value !== "") {
                            a.keyInput.value = "";
                            a.keyForm.submit()
                        }
                    }
                },
                advSubmit: function() {
                    f.stopEvent();
                    if (a.advInput && a.advInput.getAttribute("def") === a.advInput.value) {
                        a.advInput.value = ""
                    }
                    if (a.stime && a.stime.getAttribute("def") === a.stime.value) {
                        a.stime.value = ""
                    }
                    if (a.etime && a.etime.getAttribute("def") === a.etime.value) {
                        a.etime.value = ""
                    }
                    if (a.stime && a.stime.value != "" && !g.compareDate()) {
                        return
                    }
                    a.advForm.submit()
                },
                searhInputBlur: function() {
                    var j = f.getEventTarget();
                    var k = j.getAttribute("def");
                    if (j.value == "") {
                        j.value = k
                    }
                },
                searhInputFocus: function() {
                    var j = f.getEventTarget();
                    var k = j.getAttribute("def");
                    if (j.value == k) {
                        j.value = ""
                    }
                },
                showPanel: function(n) {
                    n.style.cssText = "";
                    h.setStyle(n, "opacity", 0);
                    h.setStyle(n, "display", "");
                    var k = 0,
                        m = 10,
                        o = 1.5,
                        p = 100,
                        l = null;
                    var j = function() {
                            m *= o;
                            k += m;
                            if (k >= 100) {
                                clearInterval(l);
                                h.setStyle(n, "opacity", 100)
                            } else {
                                h.setStyle(n, "opacity", k / 100)
                            }
                        };
                    l = setInterval(j, p)
                },
                hidePanel: function(m) {
                    var k = m.offsetHeight;
                    h.setStyle(m, "overflow", "hidden");
                    var o = 35,
                        l = null,
                        n = 40;
                    var j = function() {
                            n -= 3;
                            k -= n;
                            if (k <= 17 || n <= 0) {
                                clearInterval(l);
                                h.setStyle(m, "display", "none");
                                h.setStyle(a.keyPanel, "display", "")
                            } else {
                                h.setStyle(m, "height", k + "px")
                            }
                        };
                    l = setInterval(j, o)
                },
                createTime: function(k, m) {
                    var v = Core.Events,
                        o = Core.Dom,
                        m = m ||
                    function() {
                            return true
                        };
                    var n = null;
                    var s = Core.Dom.getXY(k);
                    if (o.getElementsByClass(document, "div", "pc_caldr").length > 0) {
                            n = o.getElementsByClass(document, "div", "pc_caldr")[0];
                            n.innerHTML = "";
                            o.removeNode(n)
                        }
                    n = document.createElement("DIV");
                    n.style.cssText = "position:absolute;display:none;z-Index:1000;";
                    n.style.left = s[0] + "px";
                    n.style.top = s[1] + 20 + "px";
                    n.className = "pc_caldr";
                    document.body.appendChild(n);
                    var l = function(A, w, z) {
                            var x = A + "-" + ((parseInt(w) + 1) > 9 ? (parseInt(w) + 1) : "0" + (parseInt(w) + 1)) + "-" + (parseInt(z) > 9 ? z : "0" + z);
                            k.value = x;
                            p();
                            m();
                            return false
                        };
                    var p = function() {
                            n.style.display = "none";
                            n.innerHTML = "";
                            o.removeNode(n);
                            v.removeEvent(document.body, p, "click")
                        };
                    var j = new Date();
                    j.setFullYear(j.getFullYear() - 1);
                    j.setDate(j.getDate());
                    var r = Math.floor(((new Date() - j)) / (1000 * 60 * 60 * 24)) + 1;
                    var q = new Date();
                    var t = [];
                    if (k.value) {
                            t = k.value.split("-")
                        }
                    new domkey.Date(n, l, parseInt(t[0], 10) || (new Date()).getFullYear(), (parseInt(t[1], 10) || (new Date().getMonth() + 1)) - 1, new Date(), r, (parseInt(t[2], 10) || ((new Date()).getDate())));
                    n.style.display = "";
                    v.stopEvent();
                    n.onclick = function() {
                            v.stopEvent();
                            return false
                        };
                    v.addEvent(document.body, p, "click")
                },
                compareDate: function() {
                    var l = a.stime.value.replace(/-/g, "/"),
                        j = a.etime.value.replace(/-/g, "/");
                    l = new Date(l);
                    j = j == "" ? new Date() : new Date(j);
                    var m = "adv_filter_err";
                    var k = $E(m);
                    if (l > j) {
                            if (!k) {
                                k = $C("label");
                                k.setAttribute("id", m);
                                k.setAttribute($IE ? "className" : "class", "errorTs error_color");
                                k.style.cssText = "margin:0 0 0 10px;padding-bottom:2px;";
                                k.innerHTML = $CLTMSG.KF0001;
                                a.advBtn.parentNode.appendChild(k)
                            }
                        } else {
                            if (k) {
                                k.parentNode.removeChild(k)
                            }
                        }
                    return l <= j
                },
                createSTime: function() {
                    var j = function() {
                        g.compareDate()
                    };
                    g.createTime(a.stime, j);
                    g.searhInputFocus()
                },
                createETime: function() {
                    var j = function() {
                        g.compareDate()
                    };
                    g.createTime(a.etime, j);
                    g.searhInputFocus()
                },
                selectTimeRange: function() {
                    var k = Core.Events.addEvent,
                        r = Core.Events.fireEvent,
                        j = a.dateRange,
                        q, n = a.filterDate;
                    if (j && (q = j.parentNode) && n) {
                            var p = q.children[0];
                            j.style.visibility = "hidden";
                            j.style.position = "absolute";
                            k(q, function(v) {
                                var t = v.target || v.srcElement,
                                    s = t.tagName.toUpperCase();
                                if (s === "SPAN" || s === "IMG") {
                                        j.style.visibility = j.style.visibility === "hidden" ? "visible" : "hidden"
                                    }
                            }, "click");
                            k(document.body, function(t) {
                                var s = t.target || t.srcElement;
                                if (!Core.Dom.contains(q, s)) {
                                    j.style.visibility = "hidden"
                                }
                            }, "click", false);
                            var o = j.getElementsByTagName("a"),
                                m = o.length;
                            for (var l = 0; l < m; l++) {
                                    (function(s) {
                                        k(s, function() {
                                            Core.Array.each(o, function(v) {
                                                if (v != s) {
                                                    v.className = ""
                                                }
                                            });
                                            s.className = "on";
                                            var t = s.getAttribute("date") || "";
                                            if (t !== "other") {
                                                n.value = t;
                                                p.innerHTML = s.innerHTML
                                            } else {
                                                n.value = "";
                                                r("filter_adv_show", "click");
                                                setTimeout(function() {
                                                    a.stime && r("filter_adv_stime", "click")
                                                }, 200)
                                            }
                                            j.style.visibility = "hidden"
                                        }, "click")
                                    })(o[l])
                                }
                        }
                }
            };
        g.init()
    });
$registJob("feed_sort", function() {
        var a = {
            on: function(h, g, f) {
                Core.Events.addEvent(h, g, f);
                return a
            },
            re: function(h, g, f) {
                Core.Events.removeEvent(h, g, f);
                return a
            },
            c: Core.Dom.contains,
            s: Core.Events.stopEvent,
            e: Core.Events.getEvent,
            t: Core.Events.getEventTarget,
            sz: App.sizzle,
            cont: $E("feed_sort"),
            btn: null,
            menu: null,
            b: false
        };
        var b = function() {
            var f = a.t(a.e());
            if (a.c(f, a.cont)) {
                a.menu.style.display = "none";
                a.re(document.body, b, "mouseover");
                a.b = false
            }
        };
        return {
            init: function() {
                a.btn = a.sz("a[act=btn]", a.cont)[0];
                a.menu = a.sz("ul", a.cont)[0];
                a.cont && a.on(a.cont, function() {
                    a.s();
                    a.menu.style.display = "";
                    if (!a.b) {
                        a.on(document.body, b, "mouseover");
                        a.b = true
                    }
                }, "mouseover");
                return this
            },
            run: function() {
                a.cont && this.init()
            }
        }.run()
    });
$registJob("hotkey", (function() {
        var j = window,
            f = j.document,
            b = f.documentElement || {};
        var l = function() {
                if (arguments.length > 0) {
                    b.scrollTop = arguments[0];
                    f.body.scrollTop = arguments[0];
                    return
                }
                return (j.pageYOffset || Math.max(b.scrollTop, f.body.scrollTop))
            };
        var a = j.innerHeight || (b && b.clientHeight) ? b.clientHeight : f.body["clientHeight"];
        var h = Core.Dom.getXY;
        var g = function(n) {
                var o, m;
                if ("getBoundingClientRect" in n) {
                    o = n.getBoundingClientRect().top;
                    return o + l()
                }
                if (!(m = n.offsetParent)) {
                    return 0
                }
                o = m.offsetTop;
                while (m && m != f.body) {
                    o += m.offsetTop;
                    m = m.offsetParent
                }
                return o || 0
            };
        var k = function(n, m) {
                if (m) {
                    return a - (h(n)[1] - l())
                } else {
                    return h(n)[1] - l()
                }
            };
        return function() {
                var p = [];
                if ($E("feed_list")) {
                    p = $E("feed_list").getElementsByTagName("LI")
                }
                var n = (function() {
                    var s = p.length;
                    var r = -1;
                    return function(w, z) {
                        var y = a;
                        var x = l();
                        var A;
                        if (w) {
                            for (var v = (s - 1); v >= 0; v = v - 1) {
                                if (k(p[v]) <= y) {
                                    A = v;
                                    break
                                }
                            }
                        } else {
                            for (var v = 0; v < s; v = v + 1) {
                                if (k(p[v]) > 0) {
                                    A = v;
                                    break
                                }
                            }
                        }
                        r = A;
                        if (w) {
                            if (r <= s) {
                                r = r + 1
                            }
                        } else {
                            if (r >= -1) {
                                r = r - 1
                            }
                        }
                        if (r > -1 && r < s) {
                            setTimeout(function() {
                                var B = 0;
                                var t = a;
                                if (w) {
                                    if (p[r].offsetHeight > t && z) {
                                        B = Math.round(l() + t)
                                    } else {
                                        B = Math.round(l() + (p[r].offsetHeight - k(p[r], 1)))
                                    }
                                } else {
                                    if ((-k(p[r])) > t && z) {
                                        B = Math.round(l() - t)
                                    } else {
                                        B = Math.round(l() - (-k(p[r]))) - 15
                                    }
                                }
                                l(B)
                            }, 10)
                        }
                        if (r === -1) {
                            l(0)
                        }
                        if (r === s) {
                            l(x + 270)
                        }
                    }
                })();
                var q = function() {
                    l(0)
                };
                var m = function() {
                    var r = $E("feed_msg_new");
                    if (r && r.style.display === "") {
                        Core.Events.fireEvent(r, "click")
                    }
                };
                var o = function() {
                    if ($E("publish_editor")) {
                        q();
                        setTimeout(function() {
                            var t = $E("publish_editor");
                            t.focus();
                            var s = 0;
                            var r = function() {
                                if (s % 2 === 1) {
                                    t.style.backgroundColor = "#fff";
                                    s = s + 1
                                } else {
                                    t.style.backgroundColor = "#B0FAA9";
                                    s = s + 1
                                }
                                if (s === 6) {
                                    s = 0;
                                    return
                                }
                                setTimeout(arguments.callee, 100)
                            };
                            r()
                        }, 10)
                    }
                };
                Core.Events.addEvent(document, function(t) {
                    if (t.ctrlKey || t.metaKey) {
                        return
                    }
                    var s = t.keyCode;
                    var r = Core.Events.getEventTarget(t);
                    if (r.nodeName.toLowerCase() === "textarea" || r.nodeName.toLowerCase() === "input") {
                        return
                    }
                    switch (s) {
                    case 82:
                        m();
                        break;
                    case 80:
                        o();
                        break;
                    case 70:
                        o();
                        break;
                    case 84:
                        q();
                        break;
                    default:
                        return
                    }
                    Core.Events.stopEvent()
                }, "keydown");
                App.hotKey = {};
                App.hotKey.backTop = q;
                App.hotKey.focusPublish = o
            }
    })());
$registJob("medal", function() {
        var a = function() {
            var n = $E("medal_box");
            if (n) {
                var j = $E("medal_list_box");
                var q = $E("medal_list_more");
                var r;
                var g = "hidd";
                var o = function(t) {
                    if (t === "hidd") {
                        q.className = "popbtn_off"
                    }
                    if (t === "show") {
                        q.className = "popbtn_on"
                    }
                    g = t
                };
                App.doRequest({
                    pageid: scope.$pageid,
                    uid: scope.$oid || ""
                }, "/plugins/aj_medalmore.php", function(v, t) {
                    n.innerHTML = v;
                    j = $E("medal_list_box");
                    q = $E("medal_list_more");
                    r = j.getElementsByTagName("LI");
                    k();
                    m()
                }, function() {});
                var k = function() {
                    if (r.length > 4) {
                        Core.Events.addEvent(q, function() {
                            if (g === "hidd") {
                                if (r.length > 5) {
                                    for (var v = 0, t = r.length; v < t; v += 1) {
                                        r[v].style.display = ""
                                    }
                                }
                                o("show");
                                return
                            }
                            if (g === "show") {
                                for (var v = 5, t = r.length; v < t; v += 1) {
                                    r[v].style.display = "none"
                                }
                                o("hidd");
                                return
                            }
                        }, "click");
                        Core.Events.addEvent(n, function() {}, "mouseover");
                        Core.Events.addEvent(n, function() {
                            if (g === "hidd") {}
                        }, "mouseout")
                    }
                }
            }
            var p = function(F) {
                var z = F.delay || 100;
                var E = F.isover || false;
                var C = F.act;
                var x = F.ext || [];
                var v = null;
                var w = function(G) {
                    if (E) {
                        F.fun.apply(F.act, [E])
                    }
                };
                var A = function(G) {
                    if (!E) {
                        F.fun.apply(F.act, [E])
                    }
                };
                var D = function(G) {
                    E = true;
                    if (v) {
                        clearTimeout(v)
                    }
                    v = setTimeout(function() {
                        w(G)
                    }, z)
                };
                var t = function(G) {
                    E = false;
                    if (v) {
                        clearTimeout(v)
                    }
                    v = setTimeout(function() {
                        A(G)
                    }, z)
                };
                Core.Events.addEvent(C, D, "mouseover");
                Core.Events.addEvent(C, t, "mouseout");
                for (var y = 0, B = x.length; y < B; y += 1) {
                    Core.Events.addEvent(x[y], D, "mouseover");
                    Core.Events.addEvent(x[y], t, "mouseout")
                }
            };
            var b = $C("DIV");
            var s = $C("DIV");
            var l = false;
            b.className = "PopLayer";
            b.style.width = "332px";
            b.style.zIndex = "1000";
            b.innerHTML = '<table class="mBlogLayer">	   <tr>	      <td class="top_l"></td>	      <td class="top_c"></td>	      <td class="top_r"></td>	   </tr>	   <tr>	      <td class="mid_l"></td>	      <td class="mid_c"><div class="layerBox">	            <div class="layerBoxCon1" style="width:320px;">	               <div class="closecontain"><a class="close" href="javascript:void(0);" onclick="App.closeMedalCard();" style="visibility:hidden"></a></div>	               <div class="commonLayer3" id="medal_card_introduction">				   </div>	            </div>	         </div></td>	      <td class="mid_r"></td>	   </tr>	   <tr>	      <td class="bottom_l"></td>	      <td class="bottom_c"></td>	      <td class="bottom_r"></td>	   </tr>	</table>';
            (new Image()).src = scope.$BASECSS + "style/images/common/loading.gif";
            App.medalCard = function(z, w, v) {
                w = w.getElementsByTagName("A")[0];
                var A = Core.Dom.getXY(w);
                var y = '<div class="honor1_ly">{content}</div>';
                var t = '<div class="honor_ly">{content}</div>';
                b.style.display = "";
                b.style.left = (A[0] - (parseInt(b.offsetWidth) - w.offsetWidth) / 2) + (v == "left" ? 100 : 0) + "px";
                b.style.top = A[1] + w.offsetHeight + 5 + "px";
                var x = '<div class="layerArrow"></div>              <div class="ldcontent">               	<p>' + $CLTMSG.ZB0005 + '</p>              </div>              <div class="clearit"></div>';
                $E("medal_card_introduction").innerHTML = ((v == "left") ? y.replace("{content}", x) : t.replace("{content}", x));
                Utils.Io.Ajax.request("/plugins/aj_popmedal.php", {
                    GET: {
                        pageid: scope.$pageid,
                        medalid: z,
                        uid: scope.$oid
                    },
                    onComplete: function(B) {
                        if (B.code === "A00006") {
                            $E("medal_card_introduction").innerHTML = ((v == "left") ? y.replace("{content}", B.data) : t.replace("{content}", B.data));
                            b.style.display = ""
                        } else {
                            App.alert($SYSMSG[B.code])
                        }
                    },
                    onException: function() {},
                    returnType: "json"
                })
            };
            App.closeMedalCard = function() {
                b.style.display = "none";
                $E("medal_card_introduction").innerHTML = ""
            };
            App.medalNewClose = function() {
                var t = $E("medal_new_tips");
                if (t) {
                    t.style.display = "none";
                    Utils.Io.Ajax.request("/medal/aj_clean.php", {
                        POST: {},
                        onComplete: function(v) {},
                        onException: function() {},
                        returnType: "json"
                    })
                }
            };
            var f = [];
            var h = null;
            b.medaltype = null;
            var m = function() {
                if (j) {
                    f = j.getElementsByTagName("LI")
                }
                if ($E("medal_manage_box")) {
                    f = $E("medal_manage_box").getElementsByTagName("LI")
                }
                try {
                    for (var v = 0, t = f.length; v < t; v += 1) {
                        (function(x) {
                            p({
                                act: f[x],
                                ext: [b],
                                fun: function(y) {
                                    if (y) {
                                        var z = f[x].getAttribute("medaltype");
                                        if (b.medaltype === null) {
                                            App.medalCard(z, f[x], "midd");
                                            b.medaltype = z
                                        }
                                    } else {
                                        App.closeMedalCard();
                                        b.medaltype = null
                                    }
                                }
                            })
                        })(v)
                    }
                } catch (w) {}
            };
            if ($E("medal_manage_box")) {
                m()
            }
            document.body.appendChild(b);
            App.closeMedalCard()
        };
        a()
    });
    (function(b) {
        b.openReportDialog = function(p, t, x, m, z, B, q, f) {
            var k = "reportDialog",
                r = x - 1;
            if ($E(k)) {
                    return
                }
            var o = [["JQ0009", "JQ0008", "JQ0001"], ["JQ0011", "JQ0011", "JQ0012"], ["JQ0010", "JQ0010", "JQ0013"]];
            var h = [o[0][r] || "JQ0001", o[1][r] || "JQ0011"];
            var n = $CLTMSG[o[2][r] || "JQ0010"];
            var l = decodeURIComponent(B || "");
            var s = q ? '<img alt="" class="popreport_inforimg" src="' + q + '">' : "";
            var j = function() {
                    var C = [];
                    C.push(m);
                    if (l) {
                        C.push("：");
                        C.push(l)
                    }
                    return C.join("")
                };
            var g = '<div class="reportLayer">			<div class="popreport_tip"><img title="" alt="" src="' + scope.$BASEIMG + 'style/images/common/transparent.gif" class="tipicon tip5">' + $CLTMSG.JQ0002 + '</div>			<div class="MIB_linedot1"></div>			<div class="popreport_title" >' + $CLTMSG[h[0]].replace(/#\{name\}/g, m || "") + '</div>			<div id="reportArea" class="popreport_info">				<div class="popreport_infol"><img alt="" src="' + z + '"></div>				<div class="popreport_infor">					<p>' + j() + "</p>" + s + '				</div>			</div>			<div class="popreport_say">				<div class="popreport_title">' + $CLTMSG[h[1]] + '</div>				<textarea id="moreReport">' + n + '</textarea>			</div>			<div class="MIB_linedot1"></div>			<div class="popreport_btn">' + $CLTMSG.JQ0004 + '	           	<a class="btn_normal" href="javascript:;" id="reportCancel"><em>' + $CLTMSG.JQ0005 + '</em></a>				<a class="btn_normal" href="javascript:;" id="reportSubmit"><em>' + $CLTMSG.JQ0006 + '</em></a>			</div>	        <div class="clearit"></div>			</div>		</div>';
            var w = App.CommLayer(k, {
                    ismask: true,
                    index: 801,
                    width: "540px",
                    title: $CLTMSG.JQ0007,
                    isFire: true
                });
            var y = App.builder3(g, w.bd, {
                    dd: "id"
                });
            App.autoHeightTextArea(y.domList.moreReport, null, 75);
            w.bd = y.domList;
            var v = function(D, C) {
                    y.domList.moreReport.value = D;
                    y.domList.moreReport.style.color = C
                };
            var A = function() {
                    var C = Core.String.trim(y.domList.moreReport.value);
                    if (C === n) {
                        return ""
                    }
                    return C
                };
            Core.Events.addEvent(y.domList.moreReport, function() {
                    A() || v("", "#717171")
                }, "focus");
            Core.Events.addEvent(y.domList.moreReport, function() {
                    A() || v(n, "#999")
                }, "blur");
            Core.Events.addEvent(y.domList.reportCancel, function() {
                    w.fire();
                    return false
                }, "click");
            Core.Events.addEvent(y.domList.reportSubmit, (function(D) {
                    Core.Events.stopEvent();
                    var C = false;
                    var E = function(F) {
                        Core.Dom.setStyle(y.domList.reportSubmit.firstChild, "color", F ? "#8F8F8F" : "#000");
                        C = F
                    };
                    return function() {
                        if (C) {
                            return
                        }
                        E(true);
                        Utils.Io.Ajax.request("/complaint/do_send.php", {
                            POST: {
                                uid: p,
                                cid: t,
                                cType: x,
                                content_nick: m,
                                content_image: z,
                                content: A(),
                                source: f ? "http://weibo.com/" + f : window.location.href
                            },
                            onComplete: function(F) {
                                var G = "M00004";
                                switch (F.code) {
                                case "M00009":
                                    G = "MJ0002";
                                    break;
                                case "A00006":
                                    G = "MJ0001";
                                    break;
                                default:
                                    G = "M00004";
                                    break
                                }
                                if (G === "MJ0001") {
                                    var H = App.alert($SYSMSG[G], {
                                        icon: 3,
                                        hasBtn: false
                                    });
                                    w.fire();
                                    setTimeout(function() {
                                        H.close()
                                    }, 1000)
                                } else {
                                    E(false);
                                    App.alert($SYSMSG[G])
                                }
                            },
                            onException: function(F) {
                                E(false);
                                App.alert($CLTMSG.CD0036)
                            },
                            returnType: "json"
                        });
                        return false
                    }
                })(), "click");
            w.show()
        };
        var a = function(f, g, h) {
            f.reportBtn || (f.reportBtn = Core.Dom.byClz(f, "a", "reportBtn")[0] || "no");
            f.lineBtn || (f.lineBtn = Core.Dom.byClz(f, "span", "MIB_line_l")[0] || "no");
            f.closeBtn || (f.closeBtn = Core.Dom.byClz(f, "div", "icon_closel")[0] || "no");
            f.reportBtn && (f.reportBtn != "no") && Core.Dom.setStyle(f.reportBtn, g, h);
            f.lineBtn && (f.lineBtn != "no") && Core.Dom.setStyle(f.lineBtn, g, h);
            f.closeBtn && (f.closeBtn != "no") && Core.Dom.setStyle(f.closeBtn, g, h)
        };
        b.showExtendBtn = function(f) {
            a(f, "visibility", "visible")
        };
        b.hideExtendBtn = function(f) {
            a(f, "visibility", "hidden")
        }
    })(App);
$registJob("mbloghead", function() {
        var C = Core.Events.addEvent;
        var F = document.getElementById("MIB_newFilter");
        if (!F) {
            return false
        }
        var y = Core.Dom.getChildrenByClass(F, "nfTagB")[0];
        var n = Core.Dom.getChildrenByClass(F, "nfBox")[0];
        var B = Core.Dom.getChildrenByClass(y, "nftagOpen")[0];
        var b = Core.Dom.getElementsByClass(y, "li", "current")[0];
        var j = Core.Dom.getElementsByClass(y, "ul", "sltmenu")[0];
        var g = Core.Dom.getElementsByClass(y, "a", "arrow")[0];
        var s = document.getElementById("filter_mkey_input");
        var x = document.getElementById("filter_mkey_btn");
        var h = Core.Dom.getElementsByClass(n, "a", "current")[0];
        var z = "nfBoxStatus" + scope.$uid;
        var w = function() {
            return App.storage.get(z)
        };
        var a = function(G) {
            App.storage.set(z, G)
        };
        var D = function() {
            a(false);
            B.title = "展开";
            B.innerHTML = "<em>&gt;</em>";
            y.className = "nfTagB nfTagOff";
            n.style.display = "none"
        };
        var m = function() {
            a(true);
            B.title = "收起";
            B.innerHTML = "<em>&lt;</em>";
            y.className = "nfTagB nfTagOn";
            n.style.display = ""
        };
        (function() {
            var H = w();
            var G = n.style.display;
            (H !== "false" || G !== "none") ? m() : D()
        })();
        b.onclick = function() {
            window.location.href = b.getElementsByTagName("span")[0].getAttribute("_link")
        };
        var l = Core.Dom.getElementsByClass(y, "a", "moreti")[0];
        var E = Core.Dom.getElementsByClass(document.body, "div", "nfTaglay")[0];
        var r = null;
        var o = document.getElementById("indexMainL");
        if (l) {
            var A = Core.Dom.getXY(l);
            E.style.cssText = "display:none;z-index:99;position:absolute;left:" + (A[0] - 14) + "px;top:" + (A[1] + l.offsetHeight) + "px;";
            l.onclick = function() {
                E.style.display = "";
                return false
            }
        }
        var f = Core.Dom.getElementsByClass(o, "a", "close")[0];
        if (f) {
            var p = f.onclick;
            f.onclick = function() {
                p.call(this);
                var G = Core.Dom.getXY(l);
                E.style.cssText = "display:none;z-index:99;position:absolute;left:" + (G[0] - 14) + "px;top:" + (G[1] + l.offsetHeight) + "px;"
            }
        }
        var k = false;
        var v = function(Q) {
            var N = Q.act;
            var J = Q.ext || [];
            var P = false;
            var H = null;
            var I = function() {
                if (P) {
                    Q.fun(P)
                }
            };
            var L = function() {
                if (!P) {
                    Q.fun(P)
                }
            };
            var O = function() {
                if (k) {
                    return
                }
                P = true;
                if (H) {
                    clearTimeout(H)
                }
                H = setTimeout(I, 200)
            };
            var G = function() {
                P = false;
                if (H) {
                    clearTimeout(H)
                }
                H = setTimeout(L, 200)
            };
            C(N, O, "mouseover");
            C(N, G, "mouseout");
            for (var K = 0, M = J.length; K < M; K += 1) {
                C(J[K], O, "mouseover");
                C(J[K], G, "mouseout")
            }
        };
        var t = function(G, H) {
            return function(I) {
                if (I) {
                    H.style.display = ""
                } else {
                    H.style.display = "none"
                }
            }
        };
        if (l) {
            v({
                act: l,
                ext: [E],
                fun: t(l, E)
            })
        }
        B.onclick = function() {
            var G = /nfTagOff/.test(y.className);
            G ? m() : D();
            return false
        };
        B.onfocus = function() {
            this.blur()
        };
        if (g) {
            g.onclick = function(G) {
                j.style.display = "";
                k = true;
                G ? G.stopPropagation() : (window.event.cancelBubble = true);
                return false
            };
            document.onclick = function(G) {
                if (j.style.display == "") {
                    k = false;
                    j.style.display = "none"
                }
            }
        }
        var q = function(I) {
            if (I.preventDefault) {
                I.preventDefault()
            } else {
                I.returnValue = false
            }
            var G = s.value;
            if (G === s.getAttribute("def")) {
                G = ""
            }
            var H = h.href.split("&");
            window.location.href = H[0] + "&" + (H[1] || "") + (G ? "&filter_search=" + encodeURIComponent(G) : "")
        };
        C(s, function(G) {
            if (s.value === "") {
                s.value = s.getAttribute("def")
            }
        }, "blur");
        C(s, function(G) {
            k = false;
            j && (j.style.display = "none");
            if (s.value === s.getAttribute("def")) {
                s.value = ""
            }
        }, "focus");
        C(s, function(G) {
            if (G.keyCode === 13) {
                q(G)
            }
        }, "keypress");
        C(x, q, "click")
    });
$registJob("addgroup", function() {
        var a = document.getElementById("MIB_creategroup");
        if (!a) {
            return false
        }
        var k = Core.Events.addEvent;
        var f = '<div class="groupLayer"><div class="inputBox">' + $CLTMSG.YA0002 + '：<input id="group_newname" type="text" value="' + $CLTMSG.YA0003 + '"></div><div id="errorTs" class="errorTs" style="display:none"></div><div class="btns"><a id="group_submit" href="javascript:void(0)" class="btn_normal"><em>' + $CLTMSG.CX0125 + '</em></a><a id="group_cancel" href="javascript:void(0)" class="btn_normal"><em>' + $CLTMSG.CX0126 + "</em></a></div></div>";
        var b, g, o, r, p, m, l;
        var j = function() {
            var s = Core.String.trim(g.value);
            if (q(s)) {
                if (!s) {
                    return false
                }
                App.group_manage.create({
                    name: s,
                    success: function(t) {
                        setTimeout(function() {
                            b.hidd();
                            window.location.href = "/attention/att_list.php?uid=" + scope.$uid + "&gid=" + t
                        }, 500)
                    },
                    onError: function(t) {
                        b.hidd();
                        App.alert($SYSMSG[t.code])
                    }
                });
                return true
            }
            return false
        };
        k(a, function() {
            b = b || new App.Dialog.BasicDialog($CLTMSG.YA0001, f, {
                zIndex: 1200,
                width: 300,
                hiddClose: true,
                hidden: true
            });
            g = $E("group_newname");
            o = $E("group_submit");
            r = $E("group_cancel");
            p = $E("errorTs");
            m = document.getElementById("errorTs");
            l = $CLTMSG.YA0003;
            k(g, function(s) {
                if (g.value === "") {
                    g.value = $CLTMSG.YA0003
                }
            }, "blur");
            k(g, function(s) {
                if (g.value === $CLTMSG.YA0003) {
                    g.value = ""
                }
            }, "focus");
            k(g, function(s) {
                if (s.keyCode === 13) {
                    j()
                }
            }, "keypress");
            k(o, function() {
                j()
            }, "click");
            k(r, function() {
                b.hidd()
            }, "click");
            g.value = $CLTMSG.YA0003;
            p.style.display = "none";
            p.innerHTML = "";
            b.show();
            g.focus();
            return false
        }, "click");
        var h = function(s) {
            if (!m) {
                return
            }
            m.innerHTML = $SYSMSG[s];
            m.style.display = ""
        };
        var n = function(s) {
            if (!m) {
                return
            }
            m.style.display = "none"
        };
        var q = function(t) {
            if (Core.String.byteLength(t) > 16) {
                h("M14010");
                return false
            }
            if (t == l || t == "") {
                h("M14014");
                return false
            }
            for (var v = 0, s = scope.groupList.length; v < s; v += 1) {
                if (Core.String.decodeHTML(scope.groupList[v]["name"]) == t) {
                    h("M14008");
                    return false
                }
            }
            n();
            return true
        }
    });
Core.Dom.previous = function(g, b) {
        var f = $E(g);
        if (f == f.parentNode.firstChild) {
            return null
        }
        var a = f.previousSibling;
        if (a.nodeType != 1) {
            return Core.Dom.previous(a, b)
        }
        if (a.className.indexOf(b) != -1) {
            return a
        } else {
            return Core.Dom.previous(a, b)
        }
    };
$registJob("grouporder", function() {
        var m;
        var o = Core.Events.addEvent;
        var p = Core.Events.removeEvent;
        var q = $E("Adjust_group_order");
        var r = function(v) {
            var t = v.firstChild;
            while (t && (t.nodeType != 1 || t.nodeName != "LI")) {
                t = t.nextSibling
            }
            return t
        };
        var f = function(v) {
            var t = v.lastChild;
            while (t && (t.nodeType != 1 || t.nodeName != "LI")) {
                t = t.previousSibling
            }
            return t
        };
        var g;
        var a = function(x) {
            var w = ['<div class="friLayBox">                <div class="frileft">                  <ul id="mpop_ul_frititle" class="frititle">                    <li>' + $CLTMSG.YA0002 + '</li>                  </ul>                  <div class="friList">					<ul id="group_ul_lists">'];
            var y = '<li class="current"><span>' + $CLTMSG.YA0010 + "</span></li>";
            for (var v = 0, t = x.length; v < t; v++) {
                if (v < 4) {
                    w.push("<li _index=" + v + '><a  href="javascript:void(0)">' + x[v].value + "</a></li>");
                    y += "<li>" + (x[v].value2 || x[v].value) + '</li><li class="MIB_line_l">|</li>'
                } else {
                    w.push("<li _index=" + v + '><a  href="javascript:void(0)">' + x[v].value + "</a></li>")
                }
            }
            y += "<li>更多</li>";
            w.push('</ul>                  </div>                </div>                <div class="friright">                  <a id="orderup" href="javascript:void(0)" class="btn_notclick"><em><img src="' + scope.$BASECSS + 'style/images/common/transparent.gif" class="chupdwn_icon dch_icon" title="">' + $CLTMSG.YA0005 + '</em></a>                  <a id="orderdown" href="javascript:void(0)" class="btn_notclick"><em><img title="" class="chupdwn_icon uch_icon" src="' + scope.$BASECSS + 'style/images/common/transparent.gif">' + $CLTMSG.YA0006 + '</em></a>               </div>                <p id="mpop_p_btn" class="btn"><a id="gosave" href="javascript:void(0)" class="newabtngrn"><em>' + $CLTMSG.CX0036 + '</em></a><a id="gocancel" href="javascript:void(0)" class="btn_normal btns"><em>' + $CLTMSG.CC1103 + "</em></a></p>              </div>			</div>");
            w.unshift('<div class="friexpicbor">				  <div class="friexpic">					<h3>' + $CLTMSG.YA0008 + '</h3>					<div class="fbTagB">					  <ul id="ul_oriderLists">', y, "</ul>					 </div>					</div>				</div>");
            return w.join("")
        };
        var n = false;
        o(q, function() {
            k();
            n = true;
            return false
        }, "click");
        var h = function(v) {
            v = v || window.event;
            if (!v.target) {
                v.target = v.srcElement || document
            }
            if (!v.which && ((v.charCode || v.charCode === 0) ? v.charCode : v.keyCode)) {
                v.which = v.charCode || v.keyCode
            }
            if (!v.which && v.button !== undefined) {
                v.which = (v.button & 1 ? 1 : (v.button & 2 ? 3 : (v.button & 4 ? 2 : 0)))
            }
            if (v.pageX == null && v.clientX != null) {
                var w = document.documentElement,
                    t = document.body;
                v.pageX = v.clientX + (w && w.scrollLeft || t && t.scrollLeft || 0) - (w && w.clientLeft || t && t.clientLeft || 0);
                v.pageY = v.clientY + (w && w.scrollTop || t && t.scrollTop || 0) - (w && w.clientTop || t && t.clientTop || 0)
            }
            return v
        };
        var b = function(t, v) {
            while (t) {
                if (t.parentNode === v) {
                    return t
                }
                t = t.parentNode
            }
            return null
        };
        var s = document.createElement("div");
        s.style.cssText = "cursor:move; height:3px; background-color:#36f;display:none;overflow:hidden";
        var j = function() {
            this.initialize.apply(this, arguments)
        };
        j.prototype = {
            initialize: function() {
                var v = this;
                this._mouseStarted = false;
                var t = function(w) {
                    w = h(w);
                    v.mouseDown(w)
                };
                o(document, t, "mousedown")
            },
            mouseDown: function(t) {
                var v = this;
                this.cancel = !this.mouseCapture(t);
                if (this.cancel) {
                    return false
                }
                this.mouseStart(t);
                this.mouseMoveFunc = function(w) {
                    v.mouseDrag(w)
                };
                this.mouseUpFunc = function(w) {
                    v.mouseUp(w)
                };
                o(document, v.mouseMoveFunc, "mousemove");
                o(document, v.mouseUpFunc, "mouseup")
            },
            mouseDrag: function(t) {
                t = h(t);
                if (this._mouseStarted) {
                    this.mouseMove(t)
                }
                if (this.moveDistance(t)) {
                    this._mouseStarted = true
                }
            },
            mouseUp: function(t) {
                if (this.cancel) {
                    return false
                }
                var v = this;
                p(document, v.mouseMoveFunc, "mousemove");
                p(document, v.mouseUpFunc, "mouseup");
                this._mouseStarted = false;
                this.mouseStop(t)
            },
            mouseStart: function(t) {
                return true
            },
            mouseMove: function(t) {},
            mouseStop: function(t) {},
            mouseCapture: function(t) {
                return true
            },
            moveDistance: function(t) {
                return true
            }
        };
        var l;
        var k = function() {
            if (n) {
                return
            }
            Utils.Io.Ajax.request("http://weibo.com/attention/aj_grouplist.php", {
                onComplete: function(P) {
                    P = P || [];
                    var B = a(P);
                    l = new App.Dialog.BasicDialog($CLTMSG.YA0004, B, {
                        zIndex: 1200,
                        width: 440
                    });
                    n = false;
                    var K = $E("group_ul_lists");
                    var Q = K.getElementsByTagName("a");
                    var N = Q.length;
                    var J = Core.Dom.getElementsByClass(K, "a", "down")[0];
                    var y = $E("gosave");
                    var M = $E("gocancel");
                    var v = $E("orderup");
                    var F = $E("orderdown");
                    var R = function() {
                        g = [];
                        for (var V = 0, U = P.length; V < U; V++) {
                            g.push(P[V].key)
                        }
                        Utils.Io.Ajax.request("http://weibo.com/attention/aj_update_group_order.php?gids=" + g.join(","), {
                            onComplete: function(W) {
                                if (W.code === "A00006") {
                                    var X = App.alert({
                                        code: "A00006"
                                    }, {
                                        icon: 3,
                                        ok: function() {
                                            window.location.reload()
                                        }
                                    });
                                    setTimeout(function() {
                                        X.close();
                                        window.location.reload()
                                    }, 1000)
                                } else {
                                    App.alert({
                                        code: W.code
                                    })
                                }
                            },
                            returnType: "json"
                        })
                    };
                    var I, H, x;
                    var w = document.getElementById("ul_oriderLists");
                    var z = function(Y, X) {
                        Y.getElementsByTagName("a")[0].focus();
                        var W = Y.getAttribute("_index");
                        var V = X.getAttribute("_index");
                        Y.setAttribute("_index", V);
                        X.setAttribute("_index", W);
                        if (V < 4 && W > 3) {
                            w.getElementsByTagName("li")[V * 2 + 1].innerHTML = P[W].value2 || P[W].value
                        } else {
                            if (W < 4 && V > 3) {
                                w.getElementsByTagName("li")[W * 2 + 1].innerHTML = P[V].value2 || P[V].value
                            } else {
                                if (V < 4 && W < 4) {
                                    w.getElementsByTagName("li")[W * 2 + 1].innerHTML = P[V].value2 || P[V].value;
                                    w.getElementsByTagName("li")[V * 2 + 1].innerHTML = P[W].value2 || P[W].value
                                }
                            }
                        }
                        var U = P[V];
                        P[V] = P[W];
                        P[W] = U
                    };
                    var T = function(U, Y) {
                        var ac = K.getElementsByTagName("li");
                        var X = w.getElementsByTagName("li");
                        var aa = 0 | U.getAttribute("_index"),
                            Z;
                        if (Y) {
                                Z = Y && 0 | Y.getAttribute("_index")
                            } else {
                                Z = -1
                            }
                        var ab = P[aa];
                        if (aa < Z) {
                                P.splice(Z + 1, 0, ab);
                                P.splice(aa, 1)
                            } else {
                                if (aa > Z) {
                                    P.splice(aa, 1);
                                    P.splice(Z + 1, 0, ab)
                                } else {
                                    return
                                }
                            }
                        for (var V = 0, W = ac.length; V < W; V++) {
                                if (V < 4) {
                                    X[V * 2 + 1].innerHTML = P[V].value2 || P[V].value
                                } else {}
                                ac[V].setAttribute("_index", V);
                                ac[V].getElementsByTagName("a")[0].style.cursor = ""
                            }
                    };
                    var E = function(V, U, W) {
                        if (W) {
                            Core.Dom.insertAfter(V, U)
                        } else {
                            K.insertBefore(V, U)
                        }
                        if (V === r(K)) {
                            v.className = "btn_notclick";
                            F.className = "btn_normal"
                        } else {
                            if (V === f(K)) {
                                v.className = "btn_normal";
                                F.className = "btn_notclick"
                            } else {
                                v.className = "btn_normal";
                                F.className = "btn_normal"
                            }
                        }
                        z(V, U)
                    };
                    o(y, function() {
                        l.close();
                        R()
                    }, "click");
                    o(M, function() {
                        l.close();
                        return false
                    }, "click");
                    o(v, function() {
                        if (!J) {
                            return
                        }
                        x = J.parentNode;
                        H = Core.Dom.previous(x, "");
                        while (H && H.nodeName != "LI") {
                            H = Core.Dom.previous(H, "")
                        }
                        if (v.className != "btn_notclick") {
                            E(x, H)
                        }
                        return false
                    }, "click");
                    o(F, function() {
                        if (!J) {
                            return
                        }
                        x = J.parentNode;
                        I = Core.Dom.next(x, "");
                        while (I && I.nodeName != "LI") {
                            I = Core.Dom.next(I, "")
                        }
                        if (F.className != "btn_notclick") {
                            E(x, I, true)
                        }
                        return false
                    }, "click");
                    var G = new j(),
                        L, C, O, S, D = null;
                    var t = document.getElementById("mpop_ul_frititle"),
                        A = document.getElementById("mpop_p_btn");
                    G.mouseCapture = function(V) {
                            var U = b(V.target, K);
                            return V.which === 1 && U && (U.nodeName === "LI")
                        };
                    G.mouseStart = function(U) {
                            this.pageY = U.pageY;
                            C = U.target;
                            while (C.nodeName != "A") {
                                C = C.parentNode
                            }
                            C.className = "drag";
                            C.ondragstart = function() {
                                return false
                            }
                        };
                    G.moveDistance = function(U) {
                            return (Math.abs(U.pageY - this.pageY)) > 2
                        };
                    G.mouseMove = function(U) {
                            if (U.target === s) {
                                return
                            }
                            D = b(U.target, K);
                            if (D) {
                                if (O || L != D) {
                                    S = D.getElementsByTagName("a")[0];
                                    if (S.style.cursor == "") {
                                        S.style.cursor = "move"
                                    }
                                    O = false;
                                    s.style.display = "";
                                    L = D;
                                    Core.Dom.insertAfter(s, L)
                                }
                            } else {
                                if (L === r(K)) {
                                    O = true;
                                    K.insertBefore(s, L)
                                }
                                if (Core.Dom.contains(t, U.target)) {
                                    K.parentNode.scrollTop -= 10
                                } else {
                                    if (Core.Dom.contains(A, U.target)) {
                                        K.parentNode.scrollTop += 10
                                    }
                                }
                            }
                        };
                    G.mouseStop = function(U) {
                            s.style.display = "none";
                            if (L) {
                                if (J) {
                                    J.className = ""
                                }
                                C.className = "down";
                                J = C;
                                if (O) {
                                    K.insertBefore(C.parentNode, r(K));
                                    T(C.parentNode)
                                } else {
                                    Core.Dom.insertAfter(C.parentNode, L);
                                    T(C.parentNode, L)
                                }
                                L = null
                            } else {
                                if (C == J) {
                                    J = null;
                                    C.className = ""
                                } else {
                                    J && (J.className = "");
                                    C.className = "down";
                                    J = C
                                }
                            }
                            if (J === null) {
                                v.className = "btn_notclick";
                                F.className = "btn_notclick"
                            } else {
                                if (J == Q[0]) {
                                    v.className = "btn_notclick";
                                    F.className = "btn_normal"
                                } else {
                                    if (J == Q[N - 1]) {
                                        v.className = "btn_normal";
                                        F.className = "btn_notclick"
                                    } else {
                                        v.className = "btn_normal";
                                        F.className = "btn_normal"
                                    }
                                }
                            }
                        }
                },
                returnType: "json"
            })
        }
    });
Core.Array.ArrayWithout = function() {
        if (arguments.length < 2) {
            return arguments.length == 1 ? arguments[0] : null
        }
        var g = [];
        var k = arguments[0];
        if (k === null || k.constructor != Array) {
            return null
        }
        if (arguments[1].constructor == Array) {
            var b = [];
            b[0] = k;
            Core.Array.foreach(arguments[1], function(j, l) {
                b[l + 1] = j
            })
        } else {
            b = arguments
        }
        for (var f = 0; f < k.length; f++) {
            var h = true;
            for (var a = 1; a < b.length; a++) {
                if (k[f] == b[a]) {
                    h = false;
                    break
                }
            }
            if (h) {
                g.push(k[f])
            }
        }
        return g
    };
$registJob("maybeYourFriend", function() {
        var b = function() {
            var k = $E("maybe_friens_container");
            if (k) {
                k.style.position = "static"
            }
            App.mbufLock = false;
            if (!k) {
                return false
            }
            var s = function(z, y) {
                return z.getElementsByTagName(y)
            };
            var o = function(z, B) {
                for (var A = 0, y = z.length; A < y; A += 1) {
                    if (z[A] == B) {
                        return true
                    }
                }
                return false
            };
            var h = s(k, "div");
            var r = s(k, "p");
            var x = $E("maybe_friens_task");
            var q = $E("mb_refresh");
            var l = $E("interest_person");
            var m = s(h[2], "a");
            var j = "/person/aj_maybefriend.php";
            var t = "";
            var v = {
                add_Event: Core.Events.addEvent,
                addRefresh: function(z, y) {
                    v.add_Event(z, function() {
                        if (y._html.length <= 5) {
                            w.checkAndRequest(true, l, function() {})
                        } else {
                            w.checkBuffer(y, true)
                        }
                    }, "click")
                },
                addFollow: function(y, A, z) {
                    v.add_Event(y, function() {
                        try {
                            A.innerHTML = "";
                            A.className = ""
                        } catch (B) {}
                    }, "click")
                },
                addUnLike: function(z, y) {
                    v.add_Event(z, function() {
                        g.show_Link(y, true)
                    }, "mouseover");
                    v.add_Event(z, function() {
                        g.show_Link(y, false)
                    }, "mouseout")
                },
                bindFandU: function(y) {
                    var C = s(y, "dd");
                    for (var B = 0, z = C.length; B < z; B++) {
                        var A = s(C[B], "a");
                        g.show_Link(A[2], false);
                        v.addFollow(A[1], A[2], B);
                        v.addUnLike(C[B].parentNode, A[2])
                    }
                    A = null;
                    C = null
                }
            };
            var g = {
                show_Link: function(z, y) {
                    if (z) {
                        if (y === true) {
                            z.style.display = ""
                        }
                        if (y === false) {
                            z.style.display = "none"
                        }
                    }
                },
                showContent: function(y, A, z) {
                    var B = A;
                    if (!z) {
                        y.innerHTML = B
                    } else {
                        y.innerHTML = B.replace(/(^<dl( uid=\"[0-9]*\")*>)|(<\/dl>$)/gi, "")
                    }
                    v.bindFandU(y)
                }
            };
            var w = {
                checkBuffer: function(z, B) {
                    var A;
                    if (z._uid.length > 0) {
                        var y = z._uid.length;
                        if (B) {
                            A = z._html.splice(0, y < 3 ? y : 3).join("");
                            z._uidN = z._uid.splice(0, y < 3 ? y : 3);
                            t = ""
                        } else {
                            t = z._uid.shift();
                            z._uidN.push(t);
                            A = z._html.shift()
                        }
                        if (z._uid.length > 0) {
                            g.show_Link(q, true);
                            g.show_Link(m[0], true)
                        } else {
                            g.show_Link(q, false);
                            g.show_Link(m[0], false)
                        }
                        if (B) {
                            g.showContent(l, A)
                        } else {
                            g.showContent(z.delContainer, A, true)
                        }
                        App.regPopCard && App.regPopCard({
                            container: k,
                            tag: "namecard",
                            direction: "left",
                            type: "normal"
                        })
                    } else {
                        g.show_Link(q, false);
                        g.show_Link(m[0], false);
                        if (z._uidN.length == 0) {
                            g.showContent(l, "");
                            x.innerHTML = n
                        }
                        t = ""
                    }
                },
                checkAndRequest: function(B, A, z) {
                    var y = p._uid.length;
                    if (y <= 5) {
                        p.getList(B, function() {
                            w.checkBuffer(p, B);
                            v.bindFandU(A || l);
                            if (typeof z === "function") {
                                z()
                            }
                        })
                    }
                    v.bindFandU(A || l)
                }
            };
            App.replaceByAnewUser = function(z, A) {
                var y = function() {
                    z.innerHTML = "";
                    p._uidN = Core.Array.ArrayWithout(p._uidN, A);
                    p.delContainer = z;
                    var C, B;
                    if (p._html.length <= 5) {
                        w.checkAndRequest(false, z, function() {
                            if (t) {
                                z.setAttribute("uid", t);
                                App.regPopCard && App.regPopCard({
                                    container: k,
                                    tag: "namecard",
                                    direction: "left",
                                    type: "normal"
                                });
                                setTimeout(function() {
                                    App.opacity(z, {
                                        first: 0,
                                        last: 100,
                                        time: 2
                                    })
                                }, 200)
                            } else {
                                Core.Dom.removeNode(z)
                            }
                        });
                        return false
                    } else {
                        w.checkBuffer(p, false)
                    }
                    if (t) {
                        z.setAttribute("uid", t);
                        App.regPopCard && App.regPopCard({
                            container: k,
                            tag: "namecard",
                            direction: "left",
                            type: "normal"
                        });
                        App.opacity(z, {
                            first: 0,
                            last: 100,
                            time: 2
                        })
                    } else {
                        Core.Dom.removeNode(z)
                    }
                };
                App.opacity(z, {
                    first: 100,
                    last: 0,
                    time: 1
                }, y)
            };
            App.unLike = function(z, A) {
                if (App.mbufLock) {
                    return false
                }
                App.mbufLock = true;
                var y = "/pub/aj_disincline.php";
                App.doRequest({
                    nuid: z,
                    rnd: Math.random()
                }, y, function() {
                    App.replaceByAnewUser(A.parentNode.parentNode.parentNode, z);
                    App.mbufLock = false
                }, function() {
                    App.replaceByAnewUser(A.parentNode.parentNode.parentNode, z);
                    App.mbufLock = false
                }, "get")
            };
            var n = "";
            var p = {
                _uid: [],
                _html: [],
                _uidN: [],
                init: function() {
                    g.show_Link(q, false);
                    g.show_Link(m[0], false)
                },
                getList: function(z, y) {
                    Utils.Io.Ajax.request(j, {
                        GET: {
                            withtask: 1
                        },
                        onComplete: function(C) {
                            if (C.code === "A00006" && (C.data == "" || C.data.length > 0) && C.taskAll) {
                                n = C.taskAll || "";
                                if (C.data.length > 0) {
                                    if (C.taskTodo == "") {
                                        x.style.display = "none"
                                    } else {
                                        x.innerHTML = C.taskTodo
                                    }
                                    for (var B = 0, A = C.data.length; B < A; B++) {
                                        if (p._uidN.length > 0) {
                                            if ((z ? z : (!o(p._uidN, C.data[B].uid))) && (!o(p._uid, C.data[B].uid))) {
                                                p._uid.push(C.data[B].uid);
                                                p._html.push(C.data[B].html)
                                            }
                                        } else {
                                            p._uid.push(C.data[B].uid);
                                            p._html.push(C.data[B].html)
                                        }
                                    }
                                }
                                if (C.data.length == 0) {
                                    x.innerHTML = n;
                                    k.style.display = "none"
                                }
                                if (typeof y === "function") {
                                    y()
                                }
                            } else {
                                if (C.data.length == 0) {
                                    x.innerHTML = n;
                                    k.style.display = "none"
                                }
                                k.innerHTML = "";
                                k.className = "";
                                x.innerHTML = "";
                                x.className = ""
                            }
                        },
                        onException: function(A) {
                            k.className = "";
                            k.innerHTML = ""
                        },
                        returnType: "json"
                    })
                },
                run: function() {
                    p.init();
                    v.addRefresh(q, p);
                    Core.Array.foreach(s(l, "dl"), function(y) {
                        v.bindFandU(y);
                        p._uidN.push(y.getAttribute("uid"))
                    });
                    p.getList(true, function() {
                        w.checkBuffer(p, true)
                    })
                }
            };
            p.run()
        };
        if (scope.rightmodule) {
            App.CustomEvent.add("widget", "app20", b)
        } else {
            b()
        }
        var a = function(g, k, h) {
            var j;
            if (g === "fade") {
                j = function() {
                    if (App.opacity && h) {
                        App.opacity(h, {
                            first: 100,
                            last: 0,
                            time: 1.5
                        }, function() {
                            hidden(App.regPopCard.card);
                            if (k && typeof k === "function") {
                                k.call()
                            }
                            Core.Dom.opacity(h, 100)
                        })
                    }
                }
            } else {
                j = function() {
                    hidden(App.regPopCard.card);
                    if (k && typeof k === "function") {
                        k.call()
                    }
                }
            }
            setTimeout(j, 500)
        };
        var f = function(g) {
            App.card_follow && App.card_follow(g)
        };
        App.CustomEvent.add("card", "afterfollow", f)
    });
$registJob("poppublish", function() {
        if (0 | scope.isFirstBind) {
            App.storage.del("pub_" + $CONFIG.$uid);
            var a = '<div class="layerBox">         <div class="layerBoxCon">           <div class="commonLayer2" style="padding-top: 14px;">             <div class="zPoster">               <div class="ztips">                 <div class="writeScores" id="publisher_info_pop">' + $CLTMSG.YA0011 + '<span class="pipsLim">140</span>字</div>               </div>               <div class="ztxtarea">                 <textarea id="publish_editor_pop" rows="" cols="" name=""></textarea>               </div>               <div> <span id="publisher_faces_pop"> <a  href="javascript:void(0);"> <img align="absmiddle" class="zmotionico" alt="" src="http://img.wcdn.cn/t35/style/images/common/transparent.gif">表情 </a> </span>                   <a  id="publisher_submit_pop"  href="javascript:void(0);" title="' + $CLTMSG.YA0012 + '"><img  src="http://img.wcdn.cn/t35/style/images/common/transparent.gif" alt="' + $CLTMSG.YA0012 + '" class="submit_notclick"/></a></div>             </div>             <div class="clearit"></div>           </div>         </div>       </div>';
            var g = new App.Dialog.BasicDialog($CLTMSG.YA0036, a, {
                zIndex: 1200,
                width: 490
            });
            var f = function(n, k) {
                if ($E("emptydata_msg")) {
                    $E("emptydata_msg").style.display = "none"
                }
                var j = $E("feed_list");
                if (j && n != null) {
                    if (App.refurbishUpdate) {
                        App.refurbishUpdate.add(1)
                    }
                    var m = $C("ul"),
                        h, l = j.getElementsByTagName("li")[0];
                    m.className = "MIB_feed";
                    m.style.cssText = "overflow:hidden;visibility:hidden;position:relative;clear:both;height:0px";
                    m.innerHTML = n;
                    j.parentNode.insertBefore(m, j);
                    h = m.getElementsByTagName("li")[0];
                    h && (h.style[$IE ? "styleFloat" : "cssFloat"] = "left");
                    try {
                            App.bindMedia(m)
                        } catch (o) {}
                    setTimeout(function() {
                            App.Wipe(m, h).wipe("down", false, function() {
                                if (scope.$eid) {
                                    var q = App.Dom.getByClass("betop", "img", j);
                                    var p = q.length;
                                    if (p > 0) {
                                        var r = q[p - 1];
                                        while (!App.Dom.hasClass(r, "MIB_linedot_l")) {
                                            r = r.parentNode
                                        }
                                        l = r.nextSibling
                                    }
                                }
                                m.style.cssText = "";
                                j.insertBefore(h, l);
                                m.parentNode.removeChild(m);
                                h.style.cssText = ""
                            }, true)
                        }, 1500)
                }
            };
            var b = App.miniblogPublisher({
                editor: $E("publish_editor_pop"),
                submit: $E("publisher_submit_pop"),
                info: $E("publisher_info_pop")
            }, {
                init: function(h) {
                    return true
                },
                onDisable: function() {
                    if (!$E("publisher_submit_pop")) {
                        return
                    }
                    $E("publisher_submit_pop").parentNode.className = "sendor postBtnBg bgColorA_No"
                },
                onEnable: function() {
                    $E("publisher_submit_pop").parentNode.className = "sendor postBtnBg"
                },
                onLimit: function(h) {
                    if (!$E("publisher_info_pop")) {
                        return
                    }
                    if (h >= 0 && h <= 140) {
                        $E("publisher_info_pop").className = "wordNumBg";
                        $E("publisher_info_pop").innerHTML = $CLTMSG.CD0071.replace(/#\{cls\}/, "pipsLim").replace(/#\{len\}/, 140 - h)
                    } else {
                        $E("publisher_info_pop").className = "wordNumBg error";
                        var k = 'src="' + scope.$BASECSS + 'style/images/common/transparent.gif" ';
                        var j = $CLTMSG.CD0072.replace(/#\{len\}/, (140 - h) * (-1));
                        $E("publisher_info_pop").innerHTML = '<div class="word_c"><img ' + k + ' title="" alt="" class="tipicon tip2">' + j + '</div><b class="rcorner"></b>'
                    }
                },
                onSuccess: function(h, j) {
                    g.close();
                    if (scope["$feedtype"] === "ispic" && !j.pic) {
                        return false
                    }
                    if (scope["$feedtype"] === "islink" && h.islink != 1) {
                        return false
                    }
                    if (scope["$feedtype"] === "isrt") {
                        return false
                    }
                    if (scope["$feedtype"] === "favorite") {
                        return false
                    }
                    if (scope["$feedtype"] === "isat") {
                        if (scope.$uname) {
                            if (!(new RegExp("(@|＠)" + scope.$uname + "([^a-zA-Z0-9\u4e00-\u9fa5_]|$)")).test(j.content)) {
                                return false
                            }
                        }
                    }
                    setTimeout(function() {
                        f(h.html, h.extinfo)
                    }, 10)
                },
                onError: function() {},
                limitNum: 140,
                emptyStr: ["#请在这里输入自定义话题#"],
                topic: "",
                styleId: scope.styleid
            }).plugin(App.miniblogPublisherFace({
                button: $E("publisher_faces_pop")
            }));
            $E("publish_editor_pop").value = $CLTMSG.YA0013.replace(/#nikename#/, scope.nikename || " ");
            $E("publish_editor_pop").focus();
            g.onClose = function() {
                $E("publish_editor_pop").value = "";
                b.casheInput();
                this.onClose = function() {}
            }
        }
    });
    (function() {
        var a = Core.Events.addEvent;
        App.pulleyConfig = function(f, b) {
            var g = {};
            var h = 50;
            var j;
            f.style.overflow = "hidden";
            var k = function(l) {
                return App.animation.speed(App.timer.delay, l, h)
            };
            g.left = function(q, o, n) {
                var m = k(q);
                var p = 0;
                j = f.scrollLeft;
                App.setOpacity(f, 80);
                var l = App.timer.add(function() {
                    if (p >= m.length) {
                        App.timer.remove(l);
                        f.scrollLeft = j + q;
                        App.setOpacity(f, 100);
                        o();
                        return false
                    }
                    f.scrollLeft = j + m[p];
                    n(m[p]);
                    p += 1
                });
                return this
            };
            g.right = function(q, o, n) {
                var m = k(q);
                var p = 0;
                j = f.scrollLeft;
                App.setOpacity(f, 80);
                var l = App.timer.add(function() {
                    if (p >= m.length) {
                        App.timer.remove(l);
                        f.scrollLeft = j - q;
                        App.setOpacity(f, 100);
                        o();
                        return false
                    }
                    f.scrollLeft = j - m[p];
                    n(m[p]);
                    p += 1
                });
                return this
            };
            g.up = function(q, o, n) {
                var m = k(q);
                var p = 0;
                j = f.scrollTop;
                App.setOpacity(f, 80);
                var l = App.timer.add(function() {
                    if (p >= m.length) {
                        App.timer.remove(l);
                        f.scrollTop = j + q;
                        App.setOpacity(f, 100);
                        o();
                        return false
                    }
                    f.scrollTop = j + m[p];
                    n(m[p]);
                    p += 1
                });
                return this
            };
            g.down = function(q, o, n) {
                var m = k(q);
                var p = 0;
                j = f.scrollTop;
                App.setOpacity(f, 80);
                var l = App.timer.add(function() {
                    if (p >= m.length) {
                        App.timer.remove(l);
                        f.scrollTop = j - q;
                        App.setOpacity(f, 100);
                        o();
                        return false
                    }
                    f.scrollTop = j - m[p];
                    n(m[p]);
                    p += 1
                });
                return this
            };
            return g
        };
        App.pulley = function(j, y, p, t, x, m, B, k) {
            var v = App.pulleyConfig(p);
            B = B || 157;
            var s = 0;
            var g = 0;
            var C = true;
            var h;
            var A = false;
            var z = k && k.isVertical ? "up" : "left";
            var l = k && k.isVertical ? "scrollTop" : "scrollLeft";
            var o = function() {
                if (t.length == 0) {
                    return false
                }
                if (k && k.notloop) {
                    return false
                }
                if (A) {
                    return false
                }
                if (!C) {
                    return false
                }
                C = false;
                if (k && k.turnTo && k.turnTo.length > 1) {
                    var G = k.turnTo;
                    for (var F = 0, D = G.length; F < D; F++) {
                        var H = G[F];
                        if (H.className === "on") {
                            H.className = "";
                            var E = F < D - 1 ? (F + 1) : 0;
                            G[E].className = "on";
                            break
                        }
                    }
                }
                v[z](B * m, function() {
                    for (var I = 0; I < m; I += 1) {
                        x.appendChild(t[0]);
                        if (k && k.isArray) {
                            h = t.shift();
                            t.push(h)
                        }
                        p[l] = (p[l] - B)
                    }
                    C = true;
                    if (k && typeof k.endRFun == "function") {
                        k.endRFun(t)
                    }
                }, function(I) {
                    if (k && typeof k.moveRFun == "function") {
                        k.moveRFun(I)
                    }
                })
            };
            var q = (k && k.loopsTime) || 5000;
            App._loops = setInterval(o, q);
            var b = function() {
                try {
                    clearInterval(App._loops);
                    App._loops = setInterval(o, q)
                } catch (D) {}
            };
            a(y, function() {
                if (!C) {
                    return false
                }
                C = false;
                v[z](B * m, function() {
                    for (var D = 0; D < m; D += 1) {
                        x.appendChild(t[0]);
                        if (k && k.isArray) {
                            h = t.shift();
                            t.push(h)
                        }
                        p[l] -= (B)
                    }
                    C = true;
                    b();
                    if (k && typeof k.endRFun == "function") {
                        k.endRFun(t)
                    }
                }, function(D) {
                    if (k && typeof k.moveRFun == "function") {
                        k.moveRFun(D)
                    }
                });
                return false
            }, "click");
            a(j, function() {
                if (!C) {
                    return false
                }
                C = false;
                var D = z === "up" ? "down" : z;
                v[D](B * m, function() {
                    for (var E = 0; E < m; E += 1) {
                        x.insertBefore(t[t.length - 1], t[0]);
                        if (k && k.isArray) {
                            h = t.pop();
                            t.unshift(h)
                        }
                        p[l] += (B)
                    }
                    C = true;
                    b();
                    if (k && typeof k.endLFun == "function") {
                        k.endLFun(t)
                    }
                }, function(E) {
                    if (k && typeof k.moveLFun == "function") {
                        k.moveLFun(E)
                    }
                });
                return false
            }, "click");
            if (k && k.turnTo) {
                var n = [];
                var r = k.turnTo;
                for (var f = 0; f < r.length; f++) {
                    (function(D) {
                        n[D] = t[D];
                        a(r[D], function() {
                            if (!C) {
                                return false
                            }
                            var F = Math.round(p.scrollTop / B);
                            var J = t.length > 2 ? 1 : 0;
                            var H = t[J];
                            if (n[D] === H) {
                                return
                            }
                            C = false;
                            var K = Core.Dom.getElementsByClass(r[0].parentNode, "a", "on")[0];
                            if (K) {
                                K.className = ""
                            }
                            r[D].className = "on";
                            H.className = "";
                            var G = 0,
                                E = "up";
                            if (t.length == 2) {
                                    G = 1;
                                    E = "up"
                                } else {
                                    for (var I = 0; I < t.length; I++) {
                                        if (n[D] === t[I]) {
                                            if (I == 0) {
                                                G = 1;
                                                E = "down"
                                            } else {
                                                G = I - 1;
                                                E = "up"
                                            }
                                            break
                                        }
                                    }
                                }
                            v[E](B * G, function() {
                                    for (var M = 0; M < G; M += 1) {
                                        if (E === "down") {
                                            x.insertBefore(t[t.length - 1], t[0])
                                        } else {
                                            x.appendChild(t[0])
                                        }
                                        if (k && k.isArray) {
                                            h = t.pop();
                                            t.unshift(h)
                                        }
                                        var L = E === "up" ? (-B) : (B);
                                        p[l] += (L)
                                    }
                                    C = true;
                                    b();
                                    if (k && typeof k.endLFun == "function") {
                                        k.endLFun(t)
                                    }
                                }, function(L) {})
                        }, "click");
                        r[D].onfocus = function() {
                            this.blur()
                        }
                    })(f)
                }
            }
            if (!(k && k.nomouseAction)) {
                a(p, function() {
                    A = true
                }, "mouseover")
            }
            if (!(k && k.nomouseAction)) {
                a(p, function() {
                    A = false
                }, "mouseout")
            }
            if (t.length > 2) {
                for (var w = 0; w < m; w += 1) {
                    x.insertBefore(t[t.length - 1], t[0]);
                    if (k && k.isArray) {
                        h = t.pop();
                        t.unshift(h)
                    }
                    p[l] += (B)
                }
            }
            p[l] -= s
        };
        App.clearPulley = function() {
            clearInterval(App._loops)
        }
    })();
$registJob("missionBox", function() {
        try {
            var g = $E("pully_list");
            var j = $E("ad_container");
            if (!(g && j)) {
                return false
            }
            var k = j.children;
            var a = Core.Dom.next;
            var b = a(g, "pages");
            var m = b.children;
            var h = m.length;
            j.style.width = "560px";
            j.style.height = (h * 75) + "px";
            var n = g.getAttribute("loops_time") || 5;
            n = parseInt(n) * 1000;
            (function l() {
                for (var t = 0, r = k.length; t < r; t++) {
                    var w = k[t];
                    var v = w.getAttribute("start_time");
                    var p = w.getAttribute("end_time");
                    v = v == null ? 0 : parseInt(v);
                    p = p == null ? 0 : parseInt(p);
                    var s = parseInt(scope.$severtime);
                    if ((v > 0 && v > s) || (p > 0 && p < s)) {
                        j.removeChild(w);
                        b.removeChild(m[t]);
                        k = j.children;
                        m = b.children;
                        for (var q = 0, o = m.length; q < o; q++) {
                            m[q].innerHTML = "<span>" + (q + 1) + "</span>"
                        }
                        l();
                        break
                    }
                }
            })();
            b.style.display = "";
            if (k.length) {
                if (k.length < 2) {
                    b.style.display = "none";
                    return
                } else {
                    m[0].className = "on"
                }
                g.parentNode.style.display = ""
            } else {
                Core.Dom.removeNode(g.parentNode);
                return false
            }
            App.pulley(null, null, g, k, j, 1, 75, {
                isVertical: true,
                turnTo: m,
                loopsTime: n
            })
        } catch (f) {}
    });
$registJob("close_anti_cheat_tip", function() {
        var a = Core.Events.addEvent;
        if ($E("close_comment_tip")) {
            a($E("close_comment_tip"), function() {
                if ($E("anti_cheat_tip")) {
                    $E("anti_cheat_tip").style.display = "none"
                }
                Utils.Cookie.deleteCookie("comment_cheat");
                Utils.Cookie.setCookie("comment_cheat", "off", 360, "/", "weibo.com")
            }, "click", false)
        }
        if ($E("close_msg_tip")) {
            a($E("close_msg_tip"), function() {
                if ($E("anti_cheat_tip")) {
                    $E("anti_cheat_tip").style.display = "none"
                }
                Utils.Cookie.deleteCookie("msg_cheat");
                Utils.Cookie.setCookie("msg_cheat", "off", 360, "/", "weibo.com")
            }, "click", false)
        }
    });
$registJob("webim", function() {
        setTimeout(function() {
            try {
                WBIM && WBIM.init && WBIM.init()
            } catch (a) {}
        }, 500)
    });
$registJob("advertisement_fxl", function() {
        var l = Core.Dom.getXY;
        var g = Core.Dom.opacity;
        var h = function(n, p) {
            var o = document.createElement(n);
            p.appendChild(o);
            return o
        };
        window.ad = function(n, o) {
            k(n, o)
        };
        App.ads_close = function() {};
        var a = function(s, o) {
            o = o ? o : {};
            var w = o.title ? o.title : $CLTMSG.CL0601;
            var p = {};
            p.width = o.width ? o.width : 360;
            p.height = o.height;
            p.zIndex = o.zIndex ? o.zIndex : 1000;
            p.hidden = o.hidden;
            var r = '#{cnt} <div class="layerBtn" id="btn_#{t}"></div>';
            var q = new Utils.Template(r);
            var x = (new Date()).getTime();
            var n = q.evaluate({
                cnt: s,
                t: x
            });
            var v = new App.Dialog.BasicDialog(w, n, p);
            App.ads_close = function() {
                v && v.close && v.close()
            }
        };
        var f = {
            setHtml: function(o) {
                var n = f.loading();
                n += '<iframe id="ads_iframe" onload="App.ads_setHeight(this)" scrolling="no" frameborder="0"  marginheight="0" marginwidth="0" src=""  style="width:100%; border:none;"></iframe>';
                try {
                    a(n, {
                        title: (o.title ? o.title : " "),
                        width: o.wd
                    })
                } catch (p) {}
                $E("ads_iframe").src = o.url
            },
            callbk: function(o, n) {
                try {
                    if (!n) {
                        if (o.code == "A00006") {
                            f.setHtml(o.data)
                        } else {
                            App.alert($SYSMSG[o.code])
                        }
                    } else {
                        f.setHtml(o)
                    }
                } catch (p) {}
            },
            loading: function() {
                var n = '<div id="ifr_loading" style="position:relative;"><div style="position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;margin-top:30px;" ><img height="16" width="16" src="' + scope["$BASEIMG"] + 'style/images/common/loading.gif" alt="" title=""><p>正在加载，请稍候...</p></div></div>';
                return n
            }
        };
        App.ads_setHeight = function(o) {
            var n = $E("ifr_loading");
            n && n.parentNode.removeChild(n)
        };
        App.adsJoin = function(o, n) {
            if (n) {} else {
                f.callbk(o, true)
            }
        };
        var b = function(n) {
            this._waite = null;
            this._waiteBg = null;
            this._parent = n;
            this._ads = null
        };
        b.prototype = {
            waite: function(q) {
                var r = this._waite;
                var o = this._waiteBg;
                var v = this._parent;
                if (!r) {
                    o = h("div", v);
                    r = h("div", v);
                    var n = o.style;
                    n.position = "absolute";
                    n.left = n.top = "0px";
                    n.zIndex = "5";
                    n.height = n.width = "100%";
                    n.background = "#CCCCCC";
                    g(o, 1);
                    v.style.position = "relative";
                    r.innerHTML = '<img src="' + scope["$BASEIMG"] + 'style/images/common/loading.gif" style="position:absolute; background:transparent; border:0px none; width: 22px; height: 22px;">'
                }
                var t = (App.ELSize(v, "width") / 2) - 11 + "px";
                var s = (App.ELSize(v, "height") / 2) - 11 + "px";
                var p = r.getElementsByTagName("img")[0];
                p.style.left = t;
                p.style.top = s;
                r.style.display = o.style.display = "none"
            },
            show: function(n, q) {
                var o = this._ads;
                var p = this._parent;
                if (!o) {
                    p.innerHTML = "";
                    o = h("div", p);
                    _waite = null
                }
                this.waite(false);
                o.innerHTML = n
            }
        };
        var j = {
            ads_35: new b($E("ads_35")),
            ads_36: new b($E("ads_36")),
            ads_37: new b($E("ads_37")),
            ads_bottom_1: new b($E("ads_bottom_1"))
        };
        j.url = {
            ads_35: "http://ta.sass.sina.com.cn/front/deliver?psId=PDPS000000025448",
            ads_36: "http://ta.sass.sina.com.cn/front/deliver?psId=PDPS000000025774",
            ads_37: "http://ta.sass.sina.com.cn/front/deliver?psId=PDPS000000025769",
            ads_bottom_1: "http://ta.sass.sina.com.cn/front/deliver?psId=PDPS000000025447"
        };
        var k = function(n, o) {
            j[o] && j[o].show(n, o)
        };
        var m = function(n) {
            if ($E(n)) {
                j[n].waite(true);
                App.Jsonp(j.url[n] + "&jsonp=#{jsonp}")
            }
        };
        setTimeout(function() {
            m("ads_35");
            m("ads_36");
            m("ads_37");
            m("ads_bottom_1")
        }, 3000)
    });

function main() {
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (b) {}
        var a = new Jobs();
        a.add("initSearch");
        if (scope.$uid === scope.$oid) {
            a.add("poppublish");
            a.add("publisher3")
        }
        a.add("close_anti_cheat_tip");
        a.add("topic");
        a.add("loadComment");
        a.add("init_input");
        a.add("paging");
        a.add("bigpop");
        a.add("keyword_filter");
        a.add("atme_filter");
        a.add("feed_sort");
        a.add("maybeYourFriend");
        a.add("mbloghead");
        a.add("splitLoadMyProfile");
        a.add("splitLoadMedia");
        a.add("hotkey");
        a.add("grouporder");
        a.add("addgroup");
        a.add("popUpCard");
        a.add("medal");
        a.add("webim");
        a.add("advertisement_fxl");
        a.add("missionBox");
        a.add("start_suda");
        a.start()
    };

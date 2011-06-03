(function() {
    var slice = Array.prototype.slice,
        sqrt = Math.sqrt,
        pow = Math.pow,
        PI = Math.PI,
        sin = Math.sin,
        round = Math.round,
        win = window;
    if (win["YO"]) {
            return;
        } else {
            win["YO"] = {
                Effect: {},
                Plugin: {}
            };
        };

    mix(YO, {
            ie: !-[1, ],
            ie6: !-[1, ] && !window.XMLHttpRequest,
            mix: mix,
            addImg: function(url, id) {
                var img = new Image();
                img.src = url;
                if (id) {
                    img.id = id;
                };
                return img;
            },
            random: function(n) {
                return Math.floor(Math.random() * n + 1)
            },
            charset: function() {
                return document.characterSet || document.charset;
            },
            //获得页面编码
            Class: {
                create: function() {
                    return function() {
                        this.init.apply(this, arguments);
                    }
                }
            } //创建类
        });




    try {
            document.execCommand('BackgroundImageCache', false, true);
        } catch (e) {}; //ie6缓存背景



    //私有内容


    function mix(o, s) {
            if (o._ex) {
                return o;
            } else {
                for (var n in s) {
                    o[n] = s[n];
                };
                o._ex = true;
                return o;
            }
        };

    function _each(ar, fn, ars) {
            var i = 0,
                n = ar.length;
            if (ars) {
                    for (; i < n;) {
                        if (fn.apply(ar[i++], ars) === false) {
                            break;
                        }
                    }
                } else {
                    for (var v = ar[0]; i < n && fn.call(v, i, v) !== false; v = ar[++i]) {}
                };
            return ar;
        };
    //方法扩展
    mix(Function.prototype, {
            bind: function(o) {
                var fn = this,
                    ar = slice.call(arguments).slice(1);
                return function() {
                        return fn.apply(o, ar.concat(slice.call(arguments)));
                    };
            },
            bindEvent: function(o) {
                var fn = this,
                    ar = slice.call(arguments).slice(1);
                return function(e) {
                        return fn.apply(o, [(e || window.event)].concat(ar).concat(slice.call(arguments)));
                    }
            },
            delay: function(t) {
                var fn = this,
                    ar = slice.call(arguments).slice(1);
                return window.setTimeout(function() {
                        return fn.apply(fn, ar);
                    }, t);
            },
            methodize: function() {
                if (this._md) {
                    return this._md;
                };
                var fn = this;
                return this._md = function() {
                    return fn.apply(null, [this].concat(slice.call(arguments)));
                };
            },
            amplify: function() {
                var fn = this;
                return function() {
                    var c = slice.call(arguments);
                    return fn.apply(c.shift(), c);
                };
            }
        });
    //字符串扩展
    mix(String.prototype, {
            trim: function() {
                return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            },
            firstUp: function() {
                return this.replace(/^[a-z]/, function(v) {
                    return v.toLocaleUpperCase()
                });
            },
            toRgb: function() {
                if (this == "transparent") {
                    return [255, 255, 255];
                };
                if (this.indexOf("#") != -1) {
                    var ma = /(\w{1,2})(\w{1,2})(\w{1,2})/i.exec(this);
                    if (this.length < 5) {
                        ma[1] += ma[1];
                        ma[2] += ma[2];
                        ma[3] += ma[3];
                    };
                    return [parseInt(ma[1], 16), parseInt(ma[2], 16), parseInt(ma[3], 16)];
                }
                else {
                    var re = this.replace(/rgb\(|\)|\ /g, '').split(',');
                    return [Number(re[0]), Number(re[1]), Number(re[2])];
                }
            },
            toInt: function(n) {
                return parseInt(this, n || 10);
            },
            unCamel: function() {
                return this.replace(/[A-Z]/g, function(v) {
                    return ('-' + v.charAt(0).toLowerCase());
                });
            },
            fileName: function() {
                return this.replace(/^.*\/([^\/\?]*).*$/, '$1');
            },
            extName: function() {
                return this.replace(/^.*\/[^\/]*(\.[^\.\?]*).*$/, '$1');
            },
            delHtml: function() {
                return this.replace(/<\/?[^>]+>/gi, '');
            },
            delScript: function() {
                return this.replace(/<script[^>]*>[\S\s]*?<\/script>/gim, '');
            }
        });
    //数组扩展
    mix(Array.prototype, {
            each: _each.methodize(),
            clone: function() {
                return this.concat([]);
            },
            add: function(i, v) {
                return this.splice(i, 0, v);
            },
            del: function(i) {
                return this.splice(i, 1);
            },
            toString: function() {
                return this.join('');
            },
            filter: function(fn, o) {
                var re = [];
                this.each(function() {
                    if (fn.call(o, this)) {
                        re.push(this);
                    }
                });
                return re;
            },
            toHex: function() {
                return _hex(this[0]) + _hex(this[1]) + _hex(this[2]);
            }
        });
    //选择器
    var _style = {
            width: _spx,
            height: _spx,
            left: _spx,
            top: _spx,
            right: _spx,
            bottom: _spx,
            opacity: _sop,
            color: _sco,
            backgroundColor: _sco,
            scrollRight: _ssc,
            scrollLeft: _ssc,
            scrollTop: _ssc,
            scrollBottom: _ssc
        };
    var _css = {
            width: _cpx,
            height: _cpx,
            left: _cpx,
            top: _cpx,
            right: _cpx,
            bottom: _cpx,
            opacity: _cop,
            color: _cco,
            backgroundColor: _cco
        };

    function _hex(v) {
            v = round(v).toString(16);
            return (v.length == 1) ? ("0" + v) : v;
        };

    function _rgb(b, s) {
            return [b[0] - s[0], b[1] - s[1], b[2] - s[2]];
        }

    function _spx(o, n, v, t) {
            o.style[n] = round(v.s + v.w * t) + "px";
        };

    function _sop(o, n, v, t) {
            v = round(v.s + v.w * t);
            YO.ie ? (o.style.filter = 'alpha(opacity=' + v + ')') : (o.style.opacity = v / 100);
        };

    function _sco(o, n, v, t) {
            o.style[n] = "#" + [(v.s[0] + v.w[0] * t), (v.s[1] + v.w[1] * t), (v.s[2] + v.w[2] * t)].toHex();
        };

    function _ssc(o, n, v, t) {
            o[n] = round(v.s + v.w * t);
        };

    function _cpx(n, v, t) {
            return n + ":" + round(v.s + v.w * t) + "px;";
        };

    function _cop(n, v, t) {
            v = round(v.s + v.w * t);
            return YO.ie ? "filter:alpha(opacity=" + v + ");" : "opacity:" + (v / 100) + ";";
        };

    function _cco(n, v, t) {
            return n.unCamel() + ":#" + [(v.s[0] + v.w[0] * t), (v.s[1] + v.w[1] * t), (v.s[2] + v.w[2] * t)].toHex() + ";";
        };

    function _sMove(o, sp, mx, fn, ea) {
            var n, i = 0,
                t;
            o._slow = setInterval(move, 15);

            function move() {
                    t = ea(i / sp);
                    for (n in mx) {
                        _style[n](o, n, mx[n], t);
                    };
                    if (i == sp) {
                        clearInterval(o._slow);
                        fn && fn();
                    } else {
                        i++;
                    }
                }
        }

    function _cMove(o, sp, mx, fn, ea) {
            var n, i = 0,
                t, css;
            o._slow = setInterval(move, 15);

            function move() {
                    t = ea(i / sp);
                    css = "";
                    for (n in mx) {
                        css += _css[n](n, mx[n], t);
                    };
                    o.style.cssText = css;
                    if (i == sp) {
                        clearInterval(o._slow);
                        fn && fn();
                    } else {
                        i++;
                    }
                }
        }

    function _markFn(o, mx) {
            var u, n;
            for (n in mx) {
                if (_style[n]) {
                    u = o.getStyle(n);
                    mx[n] = {
                        s: u,
                        w: (typeof u) == "number" ? (mx[n] - u) : (_rgb(mx[n].toRgb(), u))
                    };
                } else {
                    delete mx[n];
                }
            };
        }
    var Dom = {
            get: function(tag, exc) {
                var m = /(.+)\[(\w*)(\W+)(.*)\]/.exec(tag);
                if (!m) {
                    tag = this.getElementsByTagName(tag);
                    if (exc === undefined) {
                        tag.each = _each.methodize();
                        for (var i = 0, n = tag.length; i < n; i++) {
                            mix(tag[i], Dom);
                        };
                    };
                    return tag;
                } else {
                    tag = this.getElementsByTagName(m[1]);
                    var ar = [],
                        f = m[2],
                        s = m[3],
                        o;
                    if (f == "class" && YO.ie) {
                            f = "className";
                        };
                    for (var i = 0, n = tag.length; i < n; i++) {
                            o = tag[i];
                            if (s == "<" && o.parentNode.id == m[4] || s == "=" && o.getAttribute(f) == m[4] || s == "!=" && o.getAttribute(f) != m[4]) {
                                ar[ar.length] = exc === undefined ? mix(o, Dom) : o;
                            }
                        };
                    return ar;
                }
            },
            addEvent: function(s, fn) {
                this.attachEvent ? this.attachEvent('on' + s, fn) : this.addEventListener(s, fn, false);
                return this;
            },
            delEvent: function(s, fn) {
                this.detachEvent ? this.detachEvent('on' + s, fn) : this.removeEventListener(s, fn, false);
                return this;
            },
            getSite: function(id) {
                var o = this,
                    x = 0,
                    y = 0;
                while (o) {
                        x += o.offsetLeft;
                        y += o.offsetTop;
                        o = o.offsetParent;
                        if (id && o.id == id) {
                            break;
                        };
                    };
                return {
                        x: x,
                        y: y
                    };
            },
            getNodes: function(tag) {
                var n = this.childNodes.length,
                    ar = [];
                tag = tag ? tag.toUpperCase() : null;
                for (var i = 0; i < n; i++) {
                        if (this.childNodes[i].nodeType == 1) {
                            if (tag) {
                                if (this.childNodes[i].nodeName == tag) {
                                    ar.push(this.childNodes[i]);
                                }
                            } else {
                                ar.push(this.childNodes[i]);
                            };
                        };
                    };
                return ar;
            },
            getStyle: function(p) {
                if (p == 'opacity') {
                    p = YO.ie ? "filter" : "opacity";
                };
                var re = (this.currentStyle ? this.currentStyle[p] : document.defaultView.getComputedStyle(this, null)[p]) || null;

                if (p == "filter" || p == "opacity") {
                    return re == null ? 100 : YO.ie ? (parseInt(re.replace(/\D/g, ''))) : re * 100;
                };
                if (/color/i.test(p)) {
                    return re.toRgb() || [255, 255, 255];
                };
                if (re != "auto" && re) {
                    return /px$/.test(re) ? (re.replace("px", "") * 1) : re;
                };
                if (/^(width|height|left|right|top|bottom)$/.test(p)) {
                    return this['offset' + p.firstUp()];
                };
                if (p.indexOf("margin") != -1) {
                    return this[p.replace('margin', 'offset')];
                };
                if (p.indexOf("scroll") != -1) {
                    return this[p];
                }
                if (/^\z/.test(p)) {
                    return 0;
                };
                return null;
            },
            slow: function(mx, fn, sp, ea, md) {
                clearInterval(this._slow);
                !ea && (ea = Easing.None);
                !sp && (sp = 80);
                if (!md) {
                    var i = 0,
                        n;
                    for (n in mx) {
                            if (++i > 1) {
                                break;
                            }
                        };
                    md = i > 1 ? "css" : "style";
                };
                _markFn(this, mx);
                md == "css" ? _cMove(this, sp, mx, fn, ea) : _sMove(this, sp, mx, fn, ea);
            },
            show: function(t, fn) {
                if (t) {
                    YO.ie ? (this.style.filter = 'alpha(opacity=0)') : (this.style.opacity = 0.01);
                    this.style.display = "block";
                    this.slow({
                        opacity: 100
                    }, fn, t);
                } else {
                    this.style.display = "block";
                }
            },
            hide: function(t, fn) {
                var o = this;
                if (t) {
                    this.slow({
                        opacity: 0
                    }, function() {
                        o.style.display = "none";
                        fn && fn();
                    }, t);
                } else {
                    this.style.display = "none";
                }
            },
            initEvent: function(s) {
                YO.ie ? this.fireEvent("on" + s) : go;

                function go() {
                    var e = document.createEvent('HTMLEvents');
                    e.initEvent(s, true, true);
                    this.dispatchEvent(e);
                }
            }
        };

    function $o(id, tag, exc) {
            id = typeof id != "string" ? id : document.getElementById(id);


            if (tag === false || id == null) {
                return id;
            }
            else if (tag === undefined) {
                return mix(id, Dom);
            }
            else {
                return Dom.get.call(id, tag, exc);
            }
        };
    window.$o = $o;


    //加载器
    //加载器
    var doc = $o(document),
        win = $o(window),
        mods = {},
        head = $o(doc, "head", false)[0] || doc.documentElement,
        Sload = YO.ie ?
    function(o, fn) {
            o.attachEvent("onreadystatechange", function() {
                if (/loaded|complete/.test(o.readyState)) {
                    fn();
                };
            })
        } : function(o, fn) {
            o.addEventListener('load', fn, false);
        };

    function _contrast(ns) {
            for (var i = 0, n = ns.length; i < n; i++) {
                if (mods[ns[i]].status != 2) {
                    return false;
                }
            };
            return true;
        }

    function _load(mod, fn, code) {
            if (mod.status == 0) {
                mod.status = 1;
                mod.node = doc.createElement('script');
                mod.node.src = mod.path;
                mod.node.charset = code;
                Sload(mod.node, cback);
                head.appendChild(mod.node);
            } else if (mod.status == 1) {
                mod.node.charset = code;
                Sload(mod.node, cback);
            };

            function cback() {
                mod.status = 2;
                fn();
            }
        }
    win.Exes = function(ns, fn) {
            ns = ns.split(',');
            var code = slice.call(arguments);
            code = code[code.length - 1] == 'utf-8' ? 'utf-8' : 'gb2312';
            if (ns.length == 1 && typeof fn != "function" && arguments.length > 1 && arguments[1] !== 'utf-8' && arguments[1] !== 'gb2312') {
                var ar = slice.call(arguments),
                    br = ar.shift()[0].split('.');
                fn = br.length == 2 ?
                function() {
                        YO[br[1]].apply(null, ar);
                    } : function() {
                        YO[br[1]][br[2]].apply(null, ar);
                    }
            }
            for (var i = 0; i < ns.length; i++) {
                if (!mods[ns[i]]) {
                    mods[ns[i]] = {
                        status: 0,
                        path: /\//.test(ns[i]) ? ns[i] : ("http://i2.sinaimg.cn/hs/baoyue/" + ns[i].replace(/\./g, "/") + ".js")
                    }
                };
            }
            if (_contrast(ns) && typeof fn == 'function') {
                fn && fn();
                return;
            };
            for (var i = 0; i < ns.length; i++) {
                if (mods[ns[i]].status == 2) {
                    continue;
                } else {
                    _load(mods[ns[i]], function() {
                        if (_contrast(ns) && fn && typeof fn != 'string') {
                            setTimeout(function() {
                                fn();
                                fn = null;
                            }, 100);
                        }
                    }, code);
                }
            }
        };
    //dom准备完毕
    var _rl = [],
        _isr = false,
        _rb = false;

    function domReady(fn) {
            _isr ? fn.call(doc) : _rl.push(fn);
            !_rb ? _domLoad() : (_rb = true);
        }

    function _ready() {
            if (_isr) {
                return;
            } else {
                _isr = true;
                for (var i = 0, n = _rl.length; i < n; i++) {
                    _rl[i].call(doc);
                };
                _rl = null;
            }
        }

    function _domLoad() {
            var dl;
            if (doc.readyState == "complete") {
                setTimeout(_ready, 1);
            };
            if (doc.addEventListener) {
                dl = function() {
                    doc.removeEventListener("DOMContentLoaded", dl, false);
                    _ready();
                };
                doc.addEventListener("DOMContentLoaded", dl, false);
                win.addEventListener("load", _ready, false);
            } else if (doc.attachEvent) {
                dl = function() {
                    if (doc.readyState === "complete") {
                        doc.detachEvent("onreadystatechange", dl);
                        _ready();
                    }
                };
                doc.attachEvent("onreadystatechange", dl);
                win.attachEvent("onload", _ready);
                var le = false;
                try {
                    le = win.frameElement == null;
                } catch (e) {};
                if (doc.documentElement.doScroll && le) {
                    test();
                }
            }
            function test() {
                if (_isr) {
                    return;
                };
                try {
                    doc.documentElement.doScroll("left");
                } catch (e) {
                    setTimeout(test, 100);
                    return;
                };
                _ready();
            }
        }
    YO.domReady = domReady;
    //事件处理
    win.Event = {
            stop: function(e) {
                e.stopPropagation ? e.stopPropagation() : (win.event.cancelBubble = true);
                e.preventDefault ? e.preventDefault() : (win.event.returnValue = false);
            },
            dom: function(e) {
                var t = e.target || win.event.srcElement;
                while (t.nodeType == 3) {
                    t = t.parentNode;
                };
                return t;
            },
            getX: function(e) {
                return e.pageX || (win.event.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft));
            },
            getY: function(e) {
                return e.pageY || (win.event.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop))
            },
            add: Dom.addEvent.amplify(),
            del: Dom.delEvent.amplify()
        };
    //缓动曲线
    win.Easing = {
            None: function(t) {
                return t;
            },
            In: function(t) {
                return t * t;
            },
            InCirc: function(t) {
                return -(sqrt(1 - t * t) - 1);
            },
            InBack: function(t) {
                return t * t * (2.70158 * t - 1.70158);
            },
            InExpo: function(t) {
                return (t == 0) ? 0 : pow(2, 10 * (t - 1));
            },
            Out: function(t) {
                return (2 - t) * t;
            },
            OutCirc: function(t) {
                return sqrt(1 - (--t) * t);
            },
            OutBack: function(t) {
                return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
            },
            OutExpo: function(t) {
                return (t == 1) ? 1 : -pow(2, -10 * t) + 1;
            },
            Both: function(t) {
                return (t *= 2) < 1 ? .5 * t * t : .5 * (1 - (--t) * (t - 2));
            },
            BothStrong: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : .5 * (2 - (t -= 2) * t * t * t);
            },
            BothCirc: function(t) {
                return (t *= 2) < 1 ? -.5 * (sqrt(1 - t * t) - 1) : .5 * (sqrt(1 - (t -= 2) * t) + 1);
            },
            ElasticIn: function(t) {
                return (t === 0 || t === 1) ? t : -pow(2, 10 * (t -= 1)) * sin((t - .075) * (2 * PI) / .3);
            },
            ElasticOut: function(t) {
                return (t === 0 || t === 1) ? t : pow(2, -10 * t) * sin((t - .075) * (2 * PI) / .3) + 1;
            },
            BounceIn: function(t) {
                return 1 - Easing.BounceOut(1 - t);
            },
            BounceOut: function(t) {
                if (t < .363636) {
                    return 7.5625 * t * t;
                } else if (t < .727272) {
                    return 7.5625 * (t -= .5454) * t + .75;
                } else if (t < .90909) {
                    return 7.5625 * (t -= .8181) * t + .9375;
                };
                return 7.5625 * (t -= .9545) * t + .984375;
            }
        };
})();
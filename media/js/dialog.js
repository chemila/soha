App.dialog01 = function(b,c) {
        var f = Core.Events.getEvent();
        var g = f ? (f.srcElement || f.target) : null;
        var k = Core.Dom.getXY(g);
        var a = k[0] - ((200 - g.offsetWidth) / 2);
        var j = k[1] - (g.offsetHeight) - 47;
        var h = App.PopUpAlert().position(a, j);
        if (b == "" || b == null) {
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
                        
                        setTimeout(function() {
                            h.content(c).icon(3).wipe("up", true).lateClose(1500)
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
    
 //弹出层2
 
 
 App.dialog02 = function(t,m) {
        Core.Events.stopEvent();
        var O = "newdialog02";
        //var w = $CLTMSG.CD0025;
        var D = "";
        var F = "";        
        var f = [];
        f.push('<div class="selSend">');
        f.push(" </div>");
        var C = '<div class="shareLayer" id="forwardcontent_' + O + '">				<div class="zok" id="modforwardsucess_' + O + '" style="display:none"></div>				<div id="mdforwardinputarea_' + O + '">				<div class="turnToTxt" id="sharecontent_' + O + '">' + decodeURIComponent(m) + '</div>				<div class="clearit"></div>							<div id="tipInfoBox' + O + '" style="float:right;margin-right:13px;color:#008800"></div>	' + F + f.join(" ") + '<div class="MIB_btn"><a href="javascript:void(0);" id="mdforwardbtn_' + O + '" class="btn_normal"><em>' + $CLTMSG.CD0023 + '</em></a><a href="javascript:void(0)" id="mdforwardcancel_' + O + '" class="btn_notclick"><em>' + $CLTMSG.CD0005 + "</em></a></div>				</div>			</div>		";
        var j = {
            width: 390,
            zIndex: 1000
        };
        var P = new App.Dialog.BasicDialog(t, C, j);
       
        P._success = function(S) {
            P.close();
            var T = new App.alert($CLTMSG.CD0035, {
                icon: 3,
                hasBtn: false
            });
            setTimeout(function() {
                T.close();
                S();
            }, 1000)
        };

        var b = "/mblog/forward.php"; 
        var G = $E("mdforwardbtn_" + O);
        var t = 280;
      
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
       
        $E("mdforwardcancel_" + O).onclick = function() {
            P.close();
            return false
        };

        function M() { 
            var Z = {
               
            };
            var U = function() {       //post成功后执行的回调函数
                var ah = function() {
                	alert("回调函数");
               };
                P._success(ah);
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

            App.doRequest(Z, b, U, T)
        }
       
        G.onclick = function() {
            G.className = B;
                M()
              
        };
        
    };
//滚动 start
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
//滚动 end

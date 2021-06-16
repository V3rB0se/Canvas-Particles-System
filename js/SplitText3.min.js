! function(D, u) {
    "object" == typeof exports && "undefined" != typeof module ? u(exports) : "function" == typeof define && define.amd ? define(["exports"], u) : u((D = D || self).window = D.window || {})
}(this, function(e) {
    "use strict";
    var v = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;

    function m() {
        return String.fromCharCode.apply(null, arguments)
    }

    function p(D) {
        return F.getComputedStyle(D)
    }

    function s(D, u) {
        var e;
        return d(D) ? D : "string" == (e = typeof D) && !u && D ? a.call(X.querySelectorAll(D), 0) : D && "object" == e && "length" in D ? a.call(D, 0) : D ? [D] : []
    }

    function t(D) {
        return "absolute" === D.position || !0 === D.absolute
    }

    function u(D, u) {
        for (var e, t = u.length; - 1 < --t;)
            if (e = u[t], D.substr(0, e.length) === e) return e.length
    }

    function w(D, u) {
        void 0 === D && (D = "");
        var e = ~D.indexOf("++"),
            t = 1;
        return e && (D = D.split("++").join("")),
            function() {
                return "<" + u + " style='position:relative;display:inline-block;'" + (D ? " class='" + D + (e ? t++ : "") + "'>" : ">")
            }
    }

    function x(D, u, e) {
        var t = D.nodeType;
        if (1 === t || 9 === t || 11 === t)
            for (D = D.firstChild; D; D = D.nextSibling) x(D, u, e);
        else 3 !== t && 4 !== t || (D.nodeValue = D.nodeValue.split(u).join(e))
    }

    function y(D, u) {
        for (var e = u.length; - 1 < --e;) D.push(u[e])
    }

    function z(D, u, e) {
        for (var t; D && D !== u;) {
            if (t = D._next || D.nextSibling) return t.textContent.charAt(0) === e;
            D = D.parentNode || D._parent
        }
    }

    function A(D) {
        var u, e, t = s(D.childNodes),
            F = t.length;
        for (u = 0; u < F; u++)(e = t[u])._isSplit ? A(e) : u && e.previousSibling && 3 === e.previousSibling.nodeType ? (e.previousSibling.nodeValue += 3 === e.nodeType ? e.nodeValue : e.firstChild.nodeValue, D.removeChild(e)) : 3 !== e.nodeType && (D.insertBefore(e.firstChild, e), D.removeChild(e))
    }

    function B(D, u) {
        return parseFloat(u[D]) || 0
    }

    function C(D, u, e, F, C, i, n) {
        var E, s, r, l, o, d, a, h, f, c, g, m, v = p(D),
            _ = B("paddingLeft", v),
            b = -999,
            S = B("borderBottomWidth", v) + B("borderTopWidth", v),
            w = B("borderLeftWidth", v) + B("borderRightWidth", v),
            T = B("paddingTop", v) + B("paddingBottom", v),
            N = B("paddingLeft", v) + B("paddingRight", v),
            L = B("fontSize", v) * (u.lineThreshold || .2),
            O = v.textAlign,
            W = [],
            H = [],
            V = [],
            j = u.wordDelimiter || " ",
            M = u.tag ? u.tag : u.span ? "span" : "div",
            R = u.type || u.split || "chars,words,lines",
            k = C && ~R.indexOf("lines") ? [] : null,
            P = ~R.indexOf("words"),
            q = ~R.indexOf("chars"),
            G = t(u),
            I = u.linesClass,
            J = ~(I || "").indexOf("++"),
            K = [],
            Q = "flex" === v.display,
            U = D.style.display;
        for (J && (I = I.split("++").join("")), Q && (D.style.display = "block"), r = (s = D.getElementsByTagName("*")).length, o = [], E = 0; E < r; E++) o[E] = s[E];
        if (k || G)
            for (E = 0; E < r; E++)((d = (l = o[E]).parentNode === D) || G || q && !P) && (m = l.offsetTop, k && d && Math.abs(m - b) > L && ("BR" !== l.nodeName || 0 === E) && (a = [], k.push(a), b = m), G && (l._x = l.offsetLeft, l._y = m, l._w = l.offsetWidth, l._h = l.offsetHeight), k && ((l._isSplit && d || !q && d || P && d || !P && l.parentNode.parentNode === D && !l.parentNode._isSplit) && (a.push(l), l._x -= _, z(l, D, j) && (l._wordEnd = !0)), "BR" === l.nodeName && (l.nextSibling && "BR" === l.nextSibling.nodeName || 0 === E) && k.push([])));
        for (E = 0; E < r; E++)
            if (d = (l = o[E]).parentNode === D, "BR" !== l.nodeName)
                if (G && (f = l.style, P || d || (l._x += l.parentNode._x, l._y += l.parentNode._y), f.left = l._x + "px", f.top = l._y + "px", f.position = "absolute", f.display = "block", f.width = l._w + 1 + "px", f.height = l._h + "px"), !P && q)
                    if (l._isSplit)
                        for (l._next = s = l.nextSibling, l.parentNode.appendChild(l); s && 3 === s.nodeType && " " === s.textContent;) l._next = s.nextSibling, l.parentNode.appendChild(s), s = s.nextSibling;
                    else l.parentNode._isSplit ? (l._parent = l.parentNode, !l.previousSibling && l.firstChild && (l.firstChild._isFirst = !0), l.nextSibling && " " === l.nextSibling.textContent && !l.nextSibling.nextSibling && K.push(l.nextSibling), l._next = l.nextSibling && l.nextSibling._isFirst ? null : l.nextSibling, l.parentNode.removeChild(l), o.splice(E--, 1), r--) : d || (m = !l.nextSibling && z(l.parentNode, D, j), l.parentNode._parent && l.parentNode._parent.appendChild(l), m && l.parentNode.appendChild(X.createTextNode(" ")), "span" === M && (l.style.display = "inline"), W.push(l));
        else l.parentNode._isSplit && !l._isSplit && "" !== l.innerHTML ? H.push(l) : q && !l._isSplit && ("span" === M && (l.style.display = "inline"), W.push(l));
        else k || G ? (l.parentNode && l.parentNode.removeChild(l), o.splice(E--, 1), r--) : P || D.appendChild(l);
        for (E = K.length; - 1 < --E;) K[E].parentNode.removeChild(K[E]);
        if (k) {
            for (G && (c = X.createElement(M), D.appendChild(c), g = c.offsetWidth + "px", m = c.offsetParent === D ? 0 : D.offsetLeft, D.removeChild(c)), f = D.style.cssText, D.style.cssText = "display:none;"; D.firstChild;) D.removeChild(D.firstChild);
            for (h = " " === j && (!G || !P && !q), E = 0; E < k.length; E++) {
                for (a = k[E], (c = X.createElement(M)).style.cssText = "display:block;text-align:" + O + ";position:" + (G ? "absolute;" : "relative;"), I && (c.className = I + (J ? E + 1 : "")), V.push(c), r = a.length, s = 0; s < r; s++) "BR" !== a[s].nodeName && (l = a[s], c.appendChild(l), h && l._wordEnd && c.appendChild(X.createTextNode(" ")), G && (0 === s && (c.style.top = l._y + "px", c.style.left = _ + m + "px"), l.style.top = "0px", m && (l.style.left = l._x - m + "px")));
                0 === r ? c.innerHTML = "&nbsp;" : P || q || (A(c), x(c, String.fromCharCode(160), " ")), G && (c.style.width = g, c.style.height = l._h + "px"), D.appendChild(c)
            }
            D.style.cssText = f
        }
        G && (n > D.clientHeight && (D.style.height = n - T + "px", D.clientHeight < n && (D.style.height = n + S + "px")), i > D.clientWidth && (D.style.width = i - N + "px", D.clientWidth < i && (D.style.width = i + w + "px"))), Q && (U ? D.style.display = U : D.style.removeProperty("display")), y(e, W), P && y(F, H), y(C, V)
    }

    function D(D, e, F, C) {
        var i, n, E, s, r, l, o, d, p = e.tag ? e.tag : e.span ? "span" : "div",
            a = ~(e.type || e.split || "chars,words,lines").indexOf("chars"),
            h = t(e),
            B = e.wordDelimiter || " ",
            f = " " !== B ? "" : h ? "&#173; " : " ",
            A = "</" + p + ">",
            c = 1,
            g = e.specialChars ? "function" == typeof e.specialChars ? e.specialChars : u : null,
            y = X.createElement("div"),
            m = D.parentNode;
        for (m.insertBefore(y, D), y.textContent = D.nodeValue, m.removeChild(D), o = -1 !== (i = function getText(D) {
                var u = D.nodeType,
                    e = "";
                if (1 === u || 9 === u || 11 === u) {
                    if ("string" == typeof D.textContent) return D.textContent;
                    for (D = D.firstChild; D; D = D.nextSibling) e += getText(D)
                } else if (3 === u || 4 === u) return D.nodeValue;
                return e
            }(D = y)).indexOf("<"), !1 !== e.reduceWhiteSpace && (i = i.replace(b, " ").replace(_, "")), o && (i = i.split("<").join("{{LT}}")), r = i.length, n = (" " === i.charAt(0) ? f : "") + F(), E = 0; E < r; E++)
            if (l = i.charAt(E), g && (d = g(i.substr(E), e.specialChars))) l = i.substr(E, d || 1), n += a && " " !== l ? C() + l + "</" + p + ">" : l, E += d - 1;
            else if (l === B && i.charAt(E - 1) !== B && E) {
            for (n += c ? A : "", c = 0; i.charAt(E + 1) === B;) n += f, E++;
            E === r - 1 ? n += f : ")" !== i.charAt(E + 1) && (n += f + F(), c = 1)
        } else "{" === l && "{{LT}}" === i.substr(E, 6) ? (n += a ? C() + "{{LT}}</" + p + ">" : "{{LT}}", E += 5) : 55296 <= l.charCodeAt(0) && l.charCodeAt(0) <= 56319 || 65024 <= i.charCodeAt(E + 1) && i.charCodeAt(E + 1) <= 65039 ? (s = ((i.substr(E, 12).split(v) || [])[1] || "").length || 2, n += a && " " !== l ? C() + i.substr(E, s) + "</" + p + ">" : i.substr(E, s), E += s - 1) : n += a && " " !== l ? C() + l + "</" + p + ">" : l;
        D.outerHTML = n + (c ? A : ""), o && x(m, "{{LT}}", "<")
    }

    function E(u, e, F, C) {
        var i, n, r = s(u.childNodes),
            l = r.length,
            o = t(e);
        if (3 !== u.nodeType || 1 < l) {
            for (e.absolute = !1, i = 0; i < l; i++)(n = r[i])._next = n._isFirst = n._parent = n._wordEnd = null, 3 === n.nodeType && !/\S+/.test(n.nodeValue) || (o && 3 !== n.nodeType && "inline" === p(n).display && (n.style.display = "inline-block", n.style.position = "relative"), n._isSplit = !0, E(n, e, F, C));
            return e.absolute = o, void(u._isSplit = !0)
        }
        D(u, e, F, C)
    }
    var X, F, i, n, _ = /(?:\r|\n|\t\t)/g,
        b = /(?:\s\s+)/g,
        r = "SplitText",
        l = m(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        d = Array.isArray,
        a = [].slice,
        h = ((n = SplitText.prototype).split = function split(D) {
            this.isSplit && this.revert(), this.vars = D = D || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
            for (var u, e, t, F = this.elements.length, i = D.tag ? D.tag : D.span ? "span" : "div", n = w(D.wordsClass, i), s = w(D.charsClass, i); - 1 < --F;) t = this.elements[F], this._originals[F] = t.innerHTML, u = t.clientHeight, e = t.clientWidth, E(t, D, n, s), C(t, D, this.chars, this.words, this.lines, e, u);
            return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
        }, n.revert = function revert() {
            var e = this._originals;
            if (!e) throw "revert() call wasn't scoped properly.";
            return this.elements.forEach(function(D, u) {
                return D.innerHTML = e[u]
            }), this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
        }, SplitText.create = function create(D, u) {
            return new SplitText(D, u)
        }, SplitText);

    function SplitText(D, u) {
        i || function _initCore() {
            X = document, F = window, i = 1
        }(), this.elements = s(D), this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = u && this.split(u)
    }
    h.version = "3.6.1", e.SplitText = h, e.default = h;
    if (typeof(window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});

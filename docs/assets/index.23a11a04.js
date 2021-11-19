var ge = Object.defineProperty,
    _e = Object.defineProperties;
var he = Object.getOwnPropertyDescriptors;
var oe = Object.getOwnPropertySymbols;
var me = Object.prototype.hasOwnProperty,
    we = Object.prototype.propertyIsEnumerable;
var ae = (t, o, e) =>
        o in t
            ? ge(t, o, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: e
              })
            : (t[o] = e),
    T = (t, o) => {
        for (var e in o || (o = {})) me.call(o, e) && ae(t, e, o[e]);
        if (oe) for (var e of oe(o)) we.call(o, e) && ae(t, e, o[e]);
        return t;
    },
    H = (t, o) => _e(t, he(o));
import {
    u as ne,
    r as b,
    o as g,
    c as f,
    a as i,
    F as B,
    b as Y,
    d as S,
    w as fe,
    e as R,
    t as C,
    f as se,
    g as X,
    T as ve,
    p as re,
    h as ce,
    i as W,
    j as K,
    k as N,
    l as ee,
    m as ke,
    n as Se,
    q as be,
    s as Z,
    v as ie,
    L as _,
    x as Le,
    y as xe,
    z as G,
    A as F,
    B as le,
    C as $e,
    D as Pe,
    E as Ae,
    V as Ce,
    G as Ie,
    H as O,
    I as Te,
    J as Me,
    K as Ue,
    M as Ne,
    N as Be,
    O as Re,
    P as Ke,
    Q as De
} from "./vendor.2c99c20f.js";
const ze = function () {
    const o = document.createElement("link").relList;
    if (o && o.supports && o.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        a(s);
    new MutationObserver((s) => {
        for (const r of s)
            if (r.type === "childList")
                for (const n of r.addedNodes)
                    n.tagName === "LINK" && n.rel === "modulepreload" && a(n);
    }).observe(document, { childList: !0, subtree: !0 });
    function e(s) {
        const r = {};
        return (
            s.integrity && (r.integrity = s.integrity),
            s.referrerpolicy && (r.referrerPolicy = s.referrerpolicy),
            s.crossorigin === "use-credentials"
                ? (r.credentials = "include")
                : s.crossorigin === "anonymous"
                ? (r.credentials = "omit")
                : (r.credentials = "same-origin"),
            r
        );
    }
    function a(s) {
        if (s.ep) return;
        s.ep = !0;
        const r = e(s);
        fetch(s.href, r);
    }
};
ze();
var de = "./images/logo.png";
var I = (t, o) => {
    for (const [e, a] of o) t[e] = a;
    return t;
};
const Oe = {
        setup() {
            const t = ne();
            return {
                menuList: [
                    { title: "\u5C0B\u627E\u55AE\u8ECA", path: "/bike" },
                    { title: "\u5C0B\u627E\u8ECA\u9053", path: "/route" }
                ],
                goHome: () => {
                    t.push("/");
                }
            };
        }
    },
    je = {
        class: "flex relative z-50 justify-between shadow-lg items-center px-3 font-medium h-20"
    },
    Ee = { class: "menu flex" };
function Ve(t, o, e, a, s, r) {
    const n = b("router-link");
    return (
        g(),
        f("header", je, [
            i("img", {
                class: "w-20 cursor-pointer",
                src: de,
                alt: "",
                onClick: o[0] || (o[0] = (...l) => a.goHome && a.goHome(...l))
            }),
            i("ul", Ee, [
                (g(!0),
                f(
                    B,
                    null,
                    Y(
                        a.menuList,
                        (l) => (
                            g(),
                            f(
                                "li",
                                {
                                    class: "mx-3 text-lg text-primary-500",
                                    key: l.path
                                },
                                [
                                    S(
                                        n,
                                        { to: l.path, class: "duration-200" },
                                        {
                                            default: fe(() => [
                                                R(C(l.title), 1)
                                            ]),
                                            _: 2
                                        },
                                        1032,
                                        ["to"]
                                    )
                                ]
                            )
                        )
                    ),
                    128
                ))
            ])
        ])
    );
}
var He = I(Oe, [
    ["render", Ve],
    ["__scopeId", "data-v-61dd7a3d"]
]);
const Ye = {
        props: { showLoading: { type: Boolean, default: null } },
        setup() {}
    },
    Ze = (t) => (re("data-v-efe9d588"), (t = t()), ce(), t),
    Ge = { key: 0, class: "loading-wrap" },
    Fe = Ze(() =>
        i(
            "svg",
            {
                class: "spinner",
                width: "65px",
                height: "65px",
                viewBox: "0 0 66 66",
                xmlns: "http://www.w3.org/2000/svg"
            },
            [
                i("circle", {
                    class: "path",
                    fill: "none",
                    "stroke-width": "6",
                    "stroke-linecap": "round",
                    cx: "33",
                    cy: "33",
                    r: "30"
                })
            ],
            -1
        )
    ),
    qe = [Fe];
function Je(t, o, e, a, s, r) {
    return (
        g(),
        se(ve, { to: "#teleport-target" }, [
            e.showLoading ? (g(), f("div", Ge, qe)) : X("v-if", !0)
        ])
    );
}
var Qe = I(Ye, [
    ["render", Je],
    ["__scopeId", "data-v-efe9d588"]
]);
const Xe = {
    components: { Loading: Qe, Header: He },
    setup() {
        const t = W(!1);
        return (
            K("setShowLoading", (e) => {
                t.value = e;
            }),
            { showLoading: t }
        );
    }
};
function We(t, o, e, a, s, r) {
    const n = b("Header"),
        l = b("router-view"),
        $ = b("loading");
    return (
        g(),
        f(
            B,
            null,
            [
                S(n),
                S(l),
                S($, { showLoading: a.showLoading }, null, 8, ["showLoading"])
            ],
            64
        )
    );
}
var et = I(Xe, [["render", We]]);
const D = "https://ptx.transportdata.tw/MOTC/v2",
    tt = D + "/Bike/Station",
    ot = D + "/Bike/Availability",
    at = D + "/Cycling/Shape",
    nt = D + "/Bike/Station/NearBy",
    st = D + "/Bike/Availability/NearBy",
    rt = D + "/Tourism/ScenicSpot",
    ct = D + "/Tourism/Restaurant",
    q = [
        { label: "\u81FA\u5317\u5E02", value: "Taipei" },
        { label: "\u65B0\u5317\u5E02", value: "NewTaipei" },
        { label: "\u6843\u5712\u5E02", value: "Taoyuan" },
        { label: "\u81FA\u4E2D\u5E02", value: "Taichung" },
        { label: "\u81FA\u5357\u5E02", value: "Tainan" },
        { label: "\u9AD8\u96C4\u5E02", value: "Kaohsiung" },
        { label: "\u82D7\u6817\u7E23", value: "MiaoliCounty" },
        { label: "\u5609\u7FA9\u5E02", value: "Chiayi" },
        { label: "\u5C4F\u6771\u7E23", value: "PingtungCounty" },
        { label: "\u91D1\u9580\u7E23", value: "KinmenCounty" }
    ],
    it = {
        props: {
            city: { type: String, default: "" },
            keyword: { type: String, default: "" }
        },
        emits: ["updateCity", "updateKeyword", "search"],
        setup(t, { emit: o }) {
            return {
                CITY_LIST: q,
                updateKeyword: (r) => {
                    o("updateKeyword", r.target.value);
                },
                updateCity: (r) => {
                    o("updateCity", r.target.value);
                },
                search: () => {
                    o("search");
                }
            };
        }
    },
    lt = { class: "input-box py-2" },
    dt = ["value"],
    pt = { class: "flex pt-3" },
    ut = ["value"],
    yt = i("option", { value: "" }, "\u7E23\u5E02", -1),
    gt = ["value"];
function _t(t, o, e, a, s, r) {
    const n = b("font-awesome-icon");
    return (
        g(),
        f(
            B,
            null,
            [
                i("div", lt, [
                    S(n, { class: "text-gray-500", icon: "search" }),
                    i(
                        "input",
                        {
                            class: "w-1/2 pl-4",
                            placeholder: "\u8F38\u5165\u95DC\u9375\u5B57",
                            value: e.keyword,
                            onInput:
                                o[0] ||
                                (o[0] = (...l) =>
                                    a.updateKeyword && a.updateKeyword(...l)),
                            type: "text"
                        },
                        null,
                        40,
                        dt
                    )
                ]),
                i("div", pt, [
                    i(
                        "select",
                        {
                            class: "w-1/2",
                            value: e.city,
                            onChange:
                                o[1] ||
                                (o[1] = (...l) =>
                                    a.updateCity && a.updateCity(...l))
                        },
                        [
                            yt,
                            (g(!0),
                            f(
                                B,
                                null,
                                Y(
                                    a.CITY_LIST,
                                    (l) => (
                                        g(),
                                        f(
                                            "option",
                                            { key: l.value, value: l.value },
                                            C(l.label),
                                            9,
                                            gt
                                        )
                                    )
                                ),
                                128
                            ))
                        ],
                        40,
                        ut
                    ),
                    i(
                        "button",
                        {
                            onClick:
                                o[2] ||
                                (o[2] = (...l) => a.search && a.search(...l)),
                            class: "ml-2 w-1/2"
                        },
                        "\u641C\u5C0B"
                    )
                ])
            ],
            64
        )
    );
}
var te = I(it, [["render", _t]]),
    ht = "./images/illustration.png";
const mt = {
        components: { Search: te },
        setup() {
            const t = ne(),
                o = N({ city: q[0].value, keyword: "" }),
                e = (r) => {
                    o.city = r;
                },
                a = (r) => {
                    o.keyword = r;
                },
                s = () => {
                    t.push({
                        path: "/bike",
                        query: { keyword: o.keyword, city: o.city }
                    });
                };
            return H(T({}, ee(o)), {
                search: s,
                updateCity: e,
                updateKeyword: a
            });
        }
    },
    J = (t) => (re("data-v-c221866a"), (t = t()), ce(), t),
    wt = { class: "cover relative bg-primary-100" },
    ft = { class: "search w-4/5 m-auto md:ml-40 pt-12 md:w-96 relative z-10" },
    vt = J(() => i("img", { class: "w-60", src: de, alt: "" }, null, -1)),
    kt = J(() =>
        i(
            "p",
            { class: "text-2xl text-primary-500 font-extrabold" },
            "\u5C0B\u627E\u55AE\u8ECA,",
            -1
        )
    ),
    St = J(() =>
        i(
            "p",
            { class: "text-2xl text-primary-500 font-extrabold pb-4" },
            " \u4F86\u5834\u60A0\u9592\u7684\u653E\u9B06\u4E4B\u65C5\uFF01 ",
            -1
        )
    ),
    bt = J(() =>
        i("img", { class: "fixed bottom-60 md:bottom-6", src: ht }, null, -1)
    );
function Lt(t, o, e, a, s, r) {
    const n = b("Search");
    return (
        g(),
        f("div", wt, [
            i("div", ft, [
                vt,
                kt,
                St,
                S(
                    n,
                    {
                        onUpdateCity: a.updateCity,
                        onUpdateKeyword: a.updateKeyword,
                        onSearch: a.search,
                        city: t.city,
                        keyword: t.keyword
                    },
                    null,
                    8,
                    [
                        "onUpdateCity",
                        "onUpdateKeyword",
                        "onSearch",
                        "city",
                        "keyword"
                    ]
                )
            ]),
            bt
        ])
    );
}
var xt = I(mt, [
    ["render", Lt],
    ["__scopeId", "data-v-c221866a"]
]);
const $t = (t, o = "success") => {
        t && console.log(t, o);
    },
    pe = (t) => {
        let o = new Date(t);
        return ke(o).format("YYYY-MM-DD HH:mm:ss");
    },
    Q = (t, o) => {
        let e = "",
            a = "";
        switch (t) {
            case 0:
                (e = "no-available"), (a = "\u505C\u6B62\u71DF\u904B");
                break;
            case 1:
                (e = "available"), (a = "\u6B63\u5E38\u71DF\u904B");
                break;
            case 2:
                (e = "no-rent"), (a = "\u66AB\u505C\u71DF\u904B");
                break;
        }
        return o === "color" ? e : a;
    },
    U = Se.create({});
U.interceptors.request.use(
    (t) => {
        let o = t.params;
        return (
            Object.keys(o).map((e) => {
                o[e] || delete o[e];
            }),
            t
        );
    },
    (t) => t
);
U.interceptors.response.use(
    (t) => t.data,
    (t) => {
        const { status: o } = t.response;
        return $t(`error--${o}`, "error"), Promise.reject(t);
    }
);
const z = () => {
        let t = "b65665fcca144956a79d25bb3edc7b34",
            o = "daVxLDO01nPgTTwhQKVBmY-pjeQ";
        const e = new Date().toGMTString(),
            a = new be("SHA-1", "TEXT");
        a.setHMACKey(o, "TEXT"), a.update("x-date: " + e);
        let s = a.getHMAC("B64");
        return {
            Authorization: `hmac username="${t}", algorithm="hmac-sha1", headers="x-date", signature="${s}"`,
            "X-Date": e,
            "Content-Type": "application/x-www-form-urlencoded"
        };
    },
    j = (t) => {
        const { city: o } = t;
        return delete t.city, { cityPath: o, data: t };
    },
    Pt = (t) => {
        const { cityPath: o, data: e } = j(t);
        let a = { headers: z(), params: T({}, e) };
        return U.get(tt + `/${o}`, a);
    },
    At = (t) => {
        const { cityPath: o, data: e } = j(t);
        let a = { headers: z(), params: T({}, e) };
        return U.get(ot + `/${o}`, a);
    },
    Ct = (t) => {
        const { cityPath: o, data: e } = j(t);
        let a = { headers: z(), params: T({}, e) };
        return U.get(at + `/${o}`, a);
    },
    It = (t) => {
        let o = { headers: z(), params: T({}, t) };
        return U.get(nt, o);
    },
    Tt = (t) => {
        let o = { headers: z(), params: T({}, t) };
        return U.get(st, o);
    },
    Mt = (t) => {
        const { cityPath: o, data: e } = j(t);
        let a = { headers: z(), params: T({}, e) };
        return U.get(ct + `/${o}`, a);
    },
    Ut = (t) => {
        const { cityPath: o, data: e } = j(t);
        let a = { headers: z(), params: T({}, e) };
        return U.get(rt + `/${o}`, a);
    };
const Nt = {
        props: { city: { type: String, default: "" } },
        emits: ["getRoute"],
        setup(t, { emit: o }) {
            let e = null,
                a = null,
                s = null,
                r = null,
                n = null;
            const l = () => {
                    let u =
                        "pk.eyJ1Ijoiam9lY2hhbmcxMDE0IiwiYSI6ImNrdno1ZnM3OTRtM2YzMG8wYnA2NGxpZzEifQ.EDTMLv4rcckA89UjJNWgXQ";
                    (e = _.map("map_route")),
                        _.tileLayer(
                            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                            {
                                attribution:
                                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery \xA9 <a href="https://www.mapbox.com/">Mapbox</a>',
                                maxZoom: 18,
                                id: "mapbox/streets-v11",
                                tileSize: 512,
                                zoomOffset: -1,
                                accessToken: u
                            }
                        ).addTo(e),
                        (n = new _.MarkerClusterGroup().addTo(e)),
                        m();
                },
                $ = () => {
                    n.clearLayers(),
                        e.eachLayer((u) => {
                            u instanceof _.Marker && e.removeLayer(u);
                        });
                },
                p = (u) => {
                    let y = u
                        .replace("MULTILINESTRING ((", "")
                        .replace("))", "")
                        .split(",");
                    console.log("newStr");
                    const c = y[0] && y[0].split(" "),
                        d = y[y.length - 1] && y[y.length - 1].split(" ");
                    n.addLayer(_.marker([c[1], c[0]], { icon: a })),
                        n.addLayer(_.marker([d[1], d[0]], { icon: a })),
                        e.addLayer(n),
                        v(c[1], c[0]),
                        h(c[1], c[0]);
                },
                A = (u, w) => {
                    u
                        .map((y) => y.Position)
                        .forEach((y) => {
                            const { PositionLon: c, PositionLat: d } = y;
                            let k = w === "food" ? s : r;
                            n.addLayer(_.marker([d, c], { icon: k }));
                        }),
                        e.addLayer(n);
                },
                v = async (u, w) => {
                    const L = {
                        city: t.city,
                        $spatialFilter: `nearby(${u},${w},${500})`
                    };
                    try {
                        const y = await Ut(L);
                        A(y, "spot");
                    } catch (y) {
                        console.log("error", y);
                    }
                },
                h = async (u, w) => {
                    try {
                        const L = {
                                city: t.city,
                                $spatialFilter: `nearby(${u},${w},${500})`
                            },
                            y = await Mt(L);
                        A(y, "food");
                    } catch (L) {
                        console.log("error", L);
                    }
                },
                m = () => {
                    o("getRoute");
                },
                P = () => {
                    (a = new _.Icon({
                        iconUrl: "/images/mark/no_rent.png",
                        shadowUrl: "",
                        iconSize: [40, 40],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })),
                        (s = new _.Icon({
                            iconUrl: "/images/mark/food.png",
                            shadowUrl: "",
                            iconSize: [40, 40],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34]
                        })),
                        (r = new _.Icon({
                            iconUrl: "/images/mark/spot.png",
                            shadowUrl: "",
                            iconSize: [40, 40],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34]
                        }));
                },
                M = (u) => {
                    console.log("Geometry", u), $();
                    const w = new Le.exports.Wkt();
                    w.read(u);
                    const L = w.toJson(),
                        y = { color: "#C50047", weight: 5 };
                    (n = _.geoJSON(L, { style: y }).addTo(e)),
                        n.addData(L),
                        e.fitBounds(n.getBounds()),
                        e.addLayer(n),
                        p(u);
                };
            return (
                Z(() => {
                    P(), l();
                }),
                ie(() => {
                    (e = null), (n = null);
                }),
                { drawLine: M }
            );
        }
    },
    Bt = { id: "map_route", class: "map w-screen relative z-10" };
function Rt(t, o, e, a, s, r) {
    return g(), f("div", Bt);
}
var Kt = I(Nt, [
    ["render", Rt],
    ["__scopeId", "data-v-3aad47fd"]
]);
const Dt = {
    components: { VPagination: xe },
    setup() {
        const t = G("page"),
            o = G("totalPage"),
            e = G("setPage");
        return {
            page: t,
            totalPage: o,
            updateHandler: (s) => {
                e(s);
            }
        };
    }
};
function zt(t, o, e, a, s, r) {
    const n = b("v-pagination");
    return (
        g(),
        se(
            n,
            {
                "v-model": a.page,
                pages: a.totalPage,
                "range-size": 1,
                "active-color": "#DCEDFF",
                "onUpdate:modelValue": a.updateHandler
            },
            null,
            8,
            ["v-model", "pages", "onUpdate:modelValue"]
        )
    );
}
var ue = I(Dt, [["render", zt]]);
const Ot = {
        components: { Pagination: ue, Search: te },
        props: {
            singlePageList: { type: Array, default: () => [] },
            keyword: { type: String, default: "" },
            city: { type: String, default: "" }
        },
        emits: ["drawLine", "updateKeyword", "updateCity", "search"],
        setup(t, { emit: o }) {
            return {
                drawLine: (n) => {
                    o("drawLine", n);
                },
                updateCity: (n) => {
                    o("updateCity", n);
                },
                updateKeyword: (n) => {
                    o("updateKeyword", n);
                },
                search: () => {
                    o("search");
                }
            };
        }
    },
    jt = {
        class: "h-full w-96 fixed px-8 left-0 top-0 z-20 box-border pt-24 overflow-hidden bg-white"
    },
    Et = { class: "rounded-xl shadow-lg overflow-hidden" },
    Vt = i("div", { class: "h-8 bg-primary-500" }, null, -1),
    Ht = { class: "p-4" },
    Yt = i(
        "h1",
        { class: "text-3xl font-bold mb-6" },
        "\u5C0B\u627E\u8ECA\u9053",
        -1
    ),
    Zt = { class: "h-2/3 overflow-y-scroll mt-8 mb-4" },
    Gt = { class: "" },
    Ft = ["onClick"],
    qt = { class: "text-xl font-bold pb-2" },
    Jt = { class: "mr-8" },
    Qt = i("span", { class: "sub-title" }, "\u958B\u59CB", -1),
    Xt = i("span", { class: "sub-title" }, "\u7D50\u675F", -1);
function Wt(t, o, e, a, s, r) {
    const n = b("Search"),
        l = b("font-awesome-icon"),
        $ = b("pagination");
    return (
        g(),
        f("div", jt, [
            i("div", Et, [
                Vt,
                i("div", Ht, [
                    Yt,
                    S(
                        n,
                        {
                            onSearch: a.search,
                            onUpdateCity: a.updateCity,
                            onUpdateKeyword: a.updateKeyword,
                            city: e.city,
                            keyword: e.keyword
                        },
                        null,
                        8,
                        [
                            "onSearch",
                            "onUpdateCity",
                            "onUpdateKeyword",
                            "city",
                            "keyword"
                        ]
                    )
                ])
            ]),
            i("div", Zt, [
                i("ul", Gt, [
                    (g(!0),
                    f(
                        B,
                        null,
                        Y(
                            e.singlePageList,
                            (p) => (
                                g(),
                                f(
                                    "li",
                                    {
                                        class: "bg-grey-100 rounded-xl mb-3 px-2 py-4 cursor-pointer",
                                        key: p.StationUID,
                                        onClick: (A) => a.drawLine(p.Geometry)
                                    },
                                    [
                                        i("h3", qt, C(p.RouteName), 1),
                                        i("h4", null, [
                                            S(l, {
                                                class: "text-primary-500",
                                                icon: "map-marker-alt"
                                            }),
                                            R(" " + C(`${p.City}`), 1)
                                        ]),
                                        i("p", null, [
                                            i("span", Jt, [
                                                S(l, {
                                                    class: "text-primary-500 mr-2",
                                                    icon: "exchange-alt"
                                                }),
                                                R(
                                                    C(
                                                        p.Direction ||
                                                            "\u55AE\u5411"
                                                    ),
                                                    1
                                                )
                                            ]),
                                            i("span", null, [
                                                S(l, {
                                                    class: "text-primary-500 mr-2",
                                                    icon: "route"
                                                }),
                                                R(
                                                    C(p.CyclingLength) +
                                                        "\u516C\u5C3A",
                                                    1
                                                )
                                            ])
                                        ]),
                                        i("p", null, [
                                            Qt,
                                            R(C(p.RoadSectionStart), 1)
                                        ]),
                                        i("p", null, [
                                            Xt,
                                            R(C(p.RoadSectionEnd), 1)
                                        ]),
                                        X(
                                            " <button >\u67E5\u770B\u4F4D\u7F6E</button> "
                                        )
                                    ],
                                    8,
                                    Ft
                                )
                            )
                        ),
                        128
                    ))
                ])
            ]),
            S($)
        ])
    );
}
var eo = I(Ot, [["render", Wt]]);
const to = {
    components: { MapRoute: Kt, RouteList: eo },
    setup() {
        const t = W(null),
            o = N({ keyword: "", city: q[0].value, page: 1, totalPage: 1 }),
            e = (v) => {
                o.city = v;
            },
            a = (v) => {
                o.keyword = v;
            },
            s = N([]),
            r = async () => {
                const v = { city: o.city };
                try {
                    const h = await Ct(v);
                    console.log("result", h),
                        h.length > 0 &&
                            (console.log("innnnn"),
                            Object.assign(s, h),
                            (o.totalPage = Math.ceil(s.length / 30)),
                            (o.page = 1),
                            A());
                } catch (h) {
                    console.log("error", h);
                }
            },
            n = (v) => {
                (o.page = v), A();
            },
            l = () => {
                r();
            },
            $ = (v) => {
                t.value.drawLine(v);
            };
        K("totalPage", F(o, "totalPage")),
            K("page", F(o, "page")),
            K("setPage", n);
        const p = N([]),
            A = () => {
                const v = [...s],
                    h = (o.page - 1) * 30,
                    m = v.splice(h, 30);
                Object.assign(p, m);
                const P = p[0];
                $(P.Geometry);
            };
        return (
            Z(() => {}),
            H(T({}, ee(o)), {
                updateCity: e,
                updateKeyword: a,
                singlePageList: p,
                getRoute: r,
                mapInstance: t,
                drawLine: $,
                search: l
            })
        );
    }
};
function oo(t, o, e, a, s, r) {
    const n = b("map-route"),
        l = b("route-list");
    return (
        g(),
        f(
            B,
            null,
            [
                S(
                    n,
                    {
                        ref: "mapInstance",
                        city: t.city,
                        singlePageList: a.singlePageList,
                        onGetRoute: a.getRoute
                    },
                    null,
                    8,
                    ["city", "singlePageList", "onGetRoute"]
                ),
                S(
                    l,
                    {
                        onSearch: a.search,
                        onDrawLine: a.drawLine,
                        onUpdateCity: a.updateCity,
                        onUpdateKeyword: a.updateKeyword,
                        singlePageList: a.singlePageList,
                        keyword: t.keyword,
                        city: t.city
                    },
                    null,
                    8,
                    [
                        "onSearch",
                        "onDrawLine",
                        "onUpdateCity",
                        "onUpdateKeyword",
                        "singlePageList",
                        "keyword",
                        "city"
                    ]
                )
            ],
            64
        )
    );
}
var ao = I(to, [["render", oo]]);
const no = {
        props: { singlePageList: { type: Array, default: () => [] } },
        emits: ["mapReady"],
        setup(t, { emit: o }) {
            let e = null,
                a = null,
                s = null,
                r = null,
                n = null;
            const l = () => {
                    let m =
                        "pk.eyJ1Ijoiam9lY2hhbmcxMDE0IiwiYSI6ImNrdno1ZnM3OTRtM2YzMG8wYnA2NGxpZzEifQ.EDTMLv4rcckA89UjJNWgXQ";
                    (e = _.map("map")),
                        _.tileLayer(
                            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                            {
                                attribution:
                                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery \xA9 <a href="https://www.mapbox.com/">Mapbox</a>',
                                maxZoom: 18,
                                id: "mapbox/streets-v11",
                                tileSize: 512,
                                zoomOffset: -1,
                                accessToken: m
                            }
                        ).addTo(e),
                        (a = new _.MarkerClusterGroup().addTo(e)),
                        o("mapReady");
                },
                $ = () => {
                    a.clearLayers(),
                        e.eachLayer((m) => {
                            m instanceof _.Marker && e.removeLayer(m);
                        });
                },
                p = (m, P) => {
                    console.log("drawSelfMark======", p),
                        e.setView([m, P], 18),
                        _.marker([m, P], { icon: s })
                            .addTo(e)
                            .bindPopup("\u4F60\u5728\u9019\uFF5E")
                            .openPopup();
                },
                A = (m) => {
                    let { PositionLat: P, PositionLon: M } = m.StationPosition,
                        {
                            AvailableRentBikes: u,
                            AvailableReturnBikes: w,
                            UpdateTime: L,
                            StationName: y,
                            StationAddress: c,
                            ServiceStatus: d
                        } = m;
                    e.setView([P, M], 20),
                        _.popup()
                            .setLatLng([P, M])
                            .setContent(
                                `
                <h3 class="text-xl font-bold">
                    ${y.Zh_tw}
                </h3>
                <h4 class="pt-2 text-sm">
                    <span v-html='<font-awesome-icon icon="map-marker-alt" />'></span>
                    <font-awesome-icon icon="map-marker-alt" />
                    ${c.Zh_tw}
                </h4>
                <p class="text-sm">${pe(L)}</p>
                <p class="py-2">
                    <span class="${Q(d, "color")}">
                        ${Q(d, "type")}
                    </span>
                    <span
                        class="
                            ${u > 0 ? "available" : "no-available"}
                        "
                        >
                            ${
                                u > 0
                                    ? "\u5C1A\u6709\u55AE\u8ECA"
                                    : "\u5DF2\u7121\u55AE\u8ECA"
                            }
                        </span>
                </p>
                <div class="rent-info flex items-center justify-between">
                    <div class="w-1/2 h-24 flex flex-col justify-center rounded-md border-primary-500 mr-4 text-center border">
                        <p class="font-bold my-1 text-primary-500 text-base">\u53EF\u501F\u55AE\u8ECA</p>
                        <p class="font-bold text-2xl">
                            ${u}
                        </p>
                    </div>
                    <div class="w-1/2 h-24 flex flex-col justify-center rounded-md border-primary-500 text-center border">
                        <p class="font-bold text-primary-500 text-base">\u53EF\u505C\u7A7A\u4F4D</p>
                        <p class="font-bold text-2xl">
                            ${w}
                        </p>
                    </div>
                </div> `
                            )
                            .openOn(e);
                },
                v = () => {
                    (r = new _.Icon({
                        iconUrl: "/images/mark/no_rent.png",
                        shadowUrl: "",
                        iconSize: [40, 40],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })),
                        (n = new _.Icon({
                            iconUrl: "/images/mark/bike.png",
                            shadowUrl: "",
                            iconSize: [40, 40],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34]
                        })),
                        (s = new _.Icon({
                            iconUrl: "/images/mark/currentLocation.png",
                            shadowUrl: "",
                            iconSize: [40, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34]
                        }));
                },
                h = () => {
                    $(),
                        console.log("drawMark", t.singlePageList),
                        t.singlePageList.forEach((m) => {
                            let { PositionLat: P, PositionLon: M } =
                                m.StationPosition;
                            console.log("878787", P, M);
                            let { AvailableRentBikes: u } = m;
                            const w = u > 0 ? n : r;
                            console.log("mark===", w),
                                _.marker([P, M], { icon: w }).addTo(e);
                        });
                };
            return (
                Z(() => {
                    v(), l();
                }),
                ie(() => {
                    console.log("onBeforeUnmount--bikemap"),
                        (e = null),
                        (a = null);
                }),
                {
                    drawSelfMark: p,
                    drawMark: h,
                    setView: A,
                    transType: Q,
                    transTime: pe
                }
            );
        }
    },
    so = { id: "map", class: "map w-screen relative z-10" };
function ro(t, o, e, a, s, r) {
    return g(), f("div", so);
}
var co = I(no, [["render", ro]]);
const io = {
        components: { Pagination: ue, Search: te },
        props: {
            singlePageList: { type: Array, default: () => [] },
            keyword: { type: String, default: "" },
            city: { type: String, default: "" }
        },
        emits: ["setView", "updateKeyword", "updateCity", "search"],
        setup(t, { emit: o }) {
            return {
                setView: (n) => {
                    o("setView", n);
                },
                updateCity: (n) => {
                    o("updateCity", n);
                },
                updateKeyword: (n) => {
                    o("updateKeyword", n);
                },
                search: () => {
                    o("search");
                },
                transType: Q
            };
        }
    },
    lo = {
        class: "h-full w-96 fixed px-8 left-0 top-0 z-20 box-border pt-24 overflow-hidden bg-white"
    },
    po = { class: "rounded-xl shadow-lg overflow-hidden" },
    uo = i("div", { class: "h-8 bg-primary-500" }, null, -1),
    yo = { class: "p-4" },
    go = i(
        "h1",
        { class: "text-3xl font-bold mb-6" },
        "\u5C0B\u627E\u55AE\u8ECA",
        -1
    ),
    _o = { class: "h-2/3 overflow-y-scroll mt-8 mb-4" },
    ho = { class: "" },
    mo = ["onClick"],
    wo = { class: "text-xl font-bold" },
    fo = { class: "py-2" };
function vo(t, o, e, a, s, r) {
    const n = b("Search"),
        l = b("font-awesome-icon"),
        $ = b("pagination");
    return (
        g(),
        f("div", lo, [
            i("div", po, [
                uo,
                i("div", yo, [
                    go,
                    S(
                        n,
                        {
                            onSearch: a.search,
                            onUpdateCity: a.updateCity,
                            onUpdateKeyword: a.updateKeyword,
                            city: e.city,
                            keyword: e.keyword
                        },
                        null,
                        8,
                        [
                            "onSearch",
                            "onUpdateCity",
                            "onUpdateKeyword",
                            "city",
                            "keyword"
                        ]
                    )
                ])
            ]),
            i("div", _o, [
                i("ul", ho, [
                    (g(!0),
                    f(
                        B,
                        null,
                        Y(
                            e.singlePageList,
                            (p) => (
                                g(),
                                f(
                                    "li",
                                    {
                                        class: "bg-grey-100 rounded-xl mb-3 px-2 py-4 cursor-pointer",
                                        key: p.StationUID,
                                        onClick: (A) => a.setView(p)
                                    },
                                    [
                                        i("h3", wo, C(p.StationName.Zh_tw), 1),
                                        i("h4", null, [
                                            S(l, { icon: "map-marker-alt" }),
                                            R(
                                                " " + C(p.StationAddress.Zh_tw),
                                                1
                                            )
                                        ]),
                                        i("p", fo, [
                                            i(
                                                "span",
                                                {
                                                    class: le(
                                                        a.transType(
                                                            p.ServiceStatus,
                                                            "color"
                                                        )
                                                    )
                                                },
                                                C(
                                                    a.transType(
                                                        p.ServiceStatus,
                                                        "type"
                                                    )
                                                ),
                                                3
                                            ),
                                            i(
                                                "span",
                                                {
                                                    class: le(
                                                        p.AvailableRentBikes > 0
                                                            ? "available"
                                                            : "no-available"
                                                    )
                                                },
                                                C(
                                                    p.AvailableRentBikes > 0
                                                        ? "\u5C1A\u6709\u55AE\u8ECA"
                                                        : "\u5DF2\u7121\u55AE\u8ECA"
                                                ),
                                                3
                                            )
                                        ]),
                                        X(
                                            " <button >\u67E5\u770B\u4F4D\u7F6E</button> "
                                        )
                                    ],
                                    8,
                                    mo
                                )
                            )
                        ),
                        128
                    ))
                ])
            ]),
            S($)
        ])
    );
}
var ko = I(io, [["render", vo]]);
const So = {
    components: { MapBike: co, BikeList: ko },
    setup() {
        const t = W(null),
            o = $e(),
            e = N({ keyword: "", city: q[0].value, page: 1, totalPage: 1 }),
            a = (c) => {
                e.city = c;
            },
            s = (c) => {
                e.keyword = c;
            },
            r = () => {
                const c = o.query.city;
                c && (e.city = c);
                const d = o.query.keyword;
                d && (e.keyword = d),
                    c || d ? A() : (console.log("getNowPos!!!"), M());
            },
            n = G("setShowLoading");
        console.log("setShowLoading--inject", n);
        const l = (c) => {
                n(c);
            },
            $ = () => {
                A();
            },
            p = N([]),
            A = async () => {
                console.log("getBikeStation");
                const c = {
                    city: e.city,
                    $filter: e.keyword
                        ? `contains(StationAddress.Zh_tw,'${e.keyword}') or contains(StationName.Zh_tw,'${e.keyword}')`
                        : ""
                };
                try {
                    const d = await Pt(c);
                    console.log("station", d), Object.assign(p, d), m();
                } catch (d) {
                    console.log("error", d);
                }
            },
            v = async ({ longitude: c, latitude: d }) => {
                console.log("getNearByInfo", c, d);
                const k = {
                    city: e.city,
                    $filter: e.keyword
                        ? `contains(StationAddress.Zh_tw,'${e.keyword}') or contains(StationName.Zh_tw,'${e.keyword}')`
                        : "",
                    $spatialFilter: `nearby(${d},${c},${500})`
                };
                try {
                    const x = await It(k);
                    console.log("station", x), Object.assign(p, x), P(c, d);
                } catch (x) {
                    console.log("error", x);
                }
            },
            h = N([]),
            m = async () => {
                l(!0);
                const c = {
                    city: e.city,
                    $filter: e.keyword
                        ? `contains(StationAddress.Zh_tw,'${e.keyword}') or contains(StationName.Zh_tw,'${e.keyword}')`
                        : ""
                };
                try {
                    const d = await At(c);
                    d.forEach((k) => {
                        p.forEach((x) => {
                            x.StationUID === k.StationUID &&
                                ((k.StationName = x.StationName),
                                (k.StationPosition = x.StationPosition),
                                (k.StationAddress = x.StationAddress));
                        });
                    }),
                        Object.assign(h, d),
                        console.log("availableList", h),
                        (e.totalPage = Math.ceil(h.length / 30)),
                        (e.page = 1),
                        L();
                } catch (d) {
                    console.log("error", d);
                }
                l(!1);
            },
            P = async (c, d) => {
                l(!0);
                const k = { $spatialFilter: `nearby(${d},${c},${500})` };
                try {
                    const x = await Tt(k);
                    x.forEach((E) => {
                        p.forEach((V) => {
                            V.StationUID === E.StationUID &&
                                ((E.StationName = V.StationName),
                                (E.StationPosition = V.StationPosition),
                                (E.StationAddress = V.StationAddress));
                        });
                    }),
                        Object.assign(h, x),
                        console.log("availableList", h),
                        (e.totalPage = Math.ceil(h.length / 30)),
                        (e.page = 1),
                        L();
                } catch (x) {
                    console.log("error", x);
                }
                l(!1);
            },
            M = () => {
                navigator.geolocation &&
                    navigator.geolocation.getCurrentPosition(
                        (c) => {
                            const d = c.coords.longitude,
                                k = c.coords.latitude;
                            console.log("longitude", d),
                                console.log("latitude", k),
                                t.value.drawSelfMark(k, d),
                                v({ longitude: d, latitude: k });
                        },
                        (c) => {
                            const { code: d, message: k } = c;
                            console.log("error", `code=${d}, msg=${k}`), A();
                        }
                    );
            },
            u = (c) => {
                (e.page = c), L();
            };
        K("totalPage", F(e, "totalPage")),
            K("page", F(e, "page")),
            K("setPage", u);
        const w = N([]),
            L = () => {
                const c = [...h],
                    d = (e.page - 1) * 30,
                    k = c.splice(d, 30);
                Object.assign(w, k),
                    console.log("singlePageList", w),
                    t.value.drawMark();
                const x = w[0];
                y(x);
            },
            y = (c) => {
                t.value.setView(c);
            };
        return (
            Z(() => {}),
            H(T({}, ee(e)), {
                getNearByInfo: v,
                availableList: h,
                mapReady: r,
                mapInstance: t,
                updateCity: a,
                singlePageList: w,
                updateKeyword: s,
                setView: y,
                search: $
            })
        );
    }
};
function bo(t, o, e, a, s, r) {
    const n = b("map-bike"),
        l = b("bike-list");
    return (
        g(),
        f("div", null, [
            S(
                n,
                {
                    ref: "mapInstance",
                    singlePageList: a.singlePageList,
                    onMapReady: a.mapReady
                },
                null,
                8,
                ["singlePageList", "onMapReady"]
            ),
            S(
                l,
                {
                    onSearch: a.search,
                    onSetView: a.setView,
                    onUpdateCity: a.updateCity,
                    onUpdateKeyword: a.updateKeyword,
                    singlePageList: a.singlePageList,
                    city: t.city,
                    keyword: t.keyword
                },
                null,
                8,
                [
                    "onSearch",
                    "onSetView",
                    "onUpdateCity",
                    "onUpdateKeyword",
                    "singlePageList",
                    "city",
                    "keyword"
                ]
            )
        ])
    );
}
var Lo = I(So, [["render", bo]]);
const xo = [
        { path: "/", name: "Index", component: xt },
        { path: "/route", name: "Route", component: ao },
        { path: "/bike", name: "Bike", component: Lo }
    ],
    $o = Pe({ history: Ae(), routes: xo });
function Po(t) {
    const e = { tId: adminUse.Cookie("cAa") };
    t.commit("updLoading", !0),
        adminUse
            .getAjax(t.state.config.groupPath.platformAdmin + "/backLogOut", e)
            .then((a) => {
                t.commit("updLoading", !1),
                    a.resultCode == "000"
                        ? (adminUse.Cookie("remove", "cAa"),
                          t.commit("updMenuList", ""),
                          t.commit("updUserName", ""),
                          t.commit("updIsLogin", !1),
                          adminUse.showToast(a.msg),
                          router.push("/login"))
                        : adminUse.showToast(
                              a.msg + "(" + a.resultCode + ")",
                              "red"
                          );
            });
}
var Ao = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    logout: Po
});
const Co = new Ce({
        storage: window.localStorage,
        reducer: (t) => ({ myPlatformId: t.myPlatformId })
    }),
    Io = () => ({ config: {} });
var To = Ie({
    state: Io,
    mutations: {
        updBeep(t, o) {
            t.beep = o;
        }
    },
    actions: Ao,
    plugins: [Co.plugin],
    modules: {}
});
O.add(Te);
O.add(Me);
O.add(Ue);
O.add(Ne);
O.add(Be);
const ye = Re(et);
ye.component("font-awesome-icon", Ke);
ye.use(To).use($o).use(De).mount("#app");

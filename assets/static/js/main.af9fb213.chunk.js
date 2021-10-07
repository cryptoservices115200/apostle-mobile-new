(this["webpackJsonpreact-scheduler"] = this["webpackJsonpreact-scheduler"] || []).push([
    [0], {
        202: function(e, t, a) {},
        203: function(e, t, a) {},
        207: function(e, t, a) {
            "use strict";
            a.r(t);
            var n = a(16),
                s = a.n(n),
                o = (a(100), a(65)),
                r = a.n(o),
                i = (a(202), a(26)),
                c = a(27),
                d = a(29),
                l = a(28),
                u = (a(203), a(66)),
                h = a(22),
                m = a(5),
                b = function(e) {
                    Object(d.a)(a, e);
                    var t = Object(l.a)(a);

                    function a(e) { var n; return Object(i.a)(this, a), (n = t.call(this, e)).state = { level: "month" }, n }
                    return Object(c.a)(a, [{
                        key: "change",
                        value: function(e) {
                            var t = e.target.value;
                            this.setState({ level: t }), this.props.onChange && this.props.onChange({ level: t })
                        }
                    }, { key: "render", value: function() { var e = this; return Object(m.jsxs)("span", { className: "toolbar-item", children: ["Zoom:", Object(m.jsxs)("label", { children: [Object(m.jsx)("input", { type: "radio", name: "zoom", value: "month", onChange: function(t) { return e.change(t) }, checked: "month" === this.state.level }), " Month"] }), Object(m.jsxs)("label", { children: [Object(m.jsx)("input", { type: "radio", name: "zoom", value: "week", onChange: function(t) { return e.change(t) }, checked: "week" === this.state.level }), " Week"] })] }) } }]), a
                }(n.Component),
                v = function(e) {
                    Object(d.a)(a, e);
                    var t = Object(l.a)(a);

                    function a(e) { var n; return Object(i.a)(this, a), (n = t.call(this, e)).state = { startDate: "2021-06-01", days: 31, scale: "Day", timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }], cellWidthSpec: "Auto", cellWidth: 50, durationBarVisible: !1, treeEnabled: !0, rowHeaderColumns: [{ name: "Car" }, { name: "Seats", display: "seats", width: 50 }, { name: "Doors", display: "doors", width: 50 }, { name: "Transmission", display: "transmission", width: 90 }], resources: [{ name: "Convertible", id: "G2", expanded: !0, children: [{ name: "MINI Cooper", seats: 4, doors: 2, transmission: "Automatic", id: "A" }, { name: "BMW Z4", seats: 4, doors: 2, transmission: "Automatic", id: "B" }, { name: "Ford Mustang", seats: 4, doors: 2, transmission: "Automatic", id: "C" }, { name: "Mercedes-Benz SL", seats: 2, doors: 2, transmission: "Automatic", id: "D" }] }, { name: "SUV", id: "G1", expanded: !0, children: [{ name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E" }, { name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F" }, { name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G" }] }], events: [{ id: 101, text: "Reservation 101", start: "2021-06-02T00:00:00", end: "2021-06-05T00:00:00", resource: "A" }, { id: 102, text: "Reservation 102", start: "2021-06-06T00:00:00", end: "2021-06-10T00:00:00", resource: "A" }, { id: 103, text: "Reservation 103", start: "2021-06-03T00:00:00", end: "2021-06-10T00:00:00", resource: "C", backColor: "#6fa8dc", locked: !0 }, { id: 104, text: "Reservation 104", start: "2021-06-02T00:00:00", end: "2021-06-08T00:00:00", resource: "E", backColor: "#f6b26b", plus: !0 }, { id: 105, text: "Reservation 105", start: "2021-06-03T00:00:00", end: "2021-06-09T00:00:00", resource: "G" }, { id: 106, text: "Reservation 106", start: "2021-06-02T00:00:00", end: "2021-06-07T00:00:00", resource: "B" }] }, n }
                    return Object(c.a)(a, [{
                        key: "zoomChange",
                        value: function(e) {
                            switch (e.level) {
                                case "month":
                                    this.setState({ startDate: new h.DayPilot.Date("2021-06-01").firstDayOfMonth(), days: new h.DayPilot.Date("2021-06-01").daysInMonth(), scale: "Day" });
                                    break;
                                case "week":
                                    this.setState({ startDate: new h.DayPilot.Date("2021-06-01").firstDayOfWeek(), days: 7, scale: "Day" });
                                    break;
                                default:
                                    throw new Error("Invalid zoom level")
                            }
                        }
                    }, {
                        key: "cellWidthChange",
                        value: function(e) {
                            var t = e.target.checked;
                            this.setState({ cellWidthSpec: t ? "Auto" : "Fixed" })
                        }
                    }, {
                        key: "render",
                        value: function() {
                            var e = this,
                                t = Object.assign({}, this.state);
                            return Object(m.jsxs)("div", { children: [Object(m.jsxs)("div", { className: "toolbar", children: [Object(m.jsx)(b, { onChange: function(t) { return e.zoomChange(t) } }), Object(m.jsx)("button", { onClick: function(t) { return e.scheduler.message("Welcome!") }, children: "Welcome!" }), Object(m.jsx)("span", { className: "toolbar-item", children: Object(m.jsxs)("label", { children: [Object(m.jsx)("input", { type: "checkbox", checked: "Auto" === this.state.cellWidthSpec, onChange: function(t) { return e.cellWidthChange(t) } }), " Auto width"] }) })] }), Object(m.jsx)(h.DayPilotScheduler, Object(u.a)(Object(u.a)({}, t), {}, { onEventMoved: function(t) { console.log("Event moved: ", t.e.data.id, t.newStart, t.newEnd, t.newResource), e.scheduler.message("Event moved: " + t.e.data.text) }, onEventResized: function(t) { console.log("Event resized: ", t.e.data.id, t.newStart, t.newEnd), e.scheduler.message("Event resized: " + t.e.data.text) }, onTimeRangeSelected: function(t) { h.DayPilot.Modal.prompt("New event name", "Event").then((function(a) { e.scheduler.clearSelection(), a.result && e.scheduler.events.add({ id: h.DayPilot.guid(), text: a.result, start: t.start, end: t.end, resource: t.resource }) })) }, onBeforeEventRender: function(e) { e.data.backColor || (e.data.backColor = "#93c47d"), e.data.borderColor = "darker", e.data.fontColor = "white", e.data.areas = [], e.data.locked ? e.data.areas.push({ right: 4, top: 8, height: 18, width: 18, symbol: "icons/daypilot.svg#padlock", fontColor: "white" }) : e.data.plus && e.data.areas.push({ right: 4, top: 8, height: 18, width: 18, symbol: "icons/daypilot.svg#plus-4", fontColor: "white" }) }, ref: function(t) { e.scheduler = t && t.control } }))] })
                        }
                    }]), a
                }(n.Component),
                j = function(e) {
                    Object(d.a)(a, e);
                    var t = Object(l.a)(a);

                    function a() { return Object(i.a)(this, a), t.apply(this, arguments) }
                    return Object(c.a)(a, [{ key: "render", value: function() { return Object(m.jsx)(v, {}) } }]), a
                }(n.Component),
                p = function(e) {
                    e && e instanceof Function && a.e(3).then(a.bind(null, 208)).then((function(t) {
                        var a = t.getCLS,
                            n = t.getFID,
                            s = t.getFCP,
                            o = t.getLCP,
                            r = t.getTTFB;
                        a(e), n(e), s(e), o(e), r(e)
                    }))
                };
            r.a.render(Object(m.jsx)(s.a.StrictMode, { children: Object(m.jsx)(j, {}) }), document.getElementById("root")), p()
        }
    },
    [
        [207, 1, 2]
    ]
]);
//# sourceMappingURL=main.af9fb213.chunk.js.map

document.getElementById('root').innerHTML = "Hi"
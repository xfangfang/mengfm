"use strict";
function _typeof(e) {
	return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
	function(e) {
		return typeof e
	}: function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
	})(e)
}
function _classCallCheck(e, a) {
	if (! (e instanceof a)) throw new TypeError("Cannot call a class as a function")
}
function _defineProperties(e, a) {
	for (var t = 0; t < a.length; t++) {
		var o = a[t];
		o.enumerable = o.enumerable || !1,
		o.configurable = !0,
		"value" in o && (o.writable = !0),
		Object.defineProperty(e, o.key, o)
	}
}
function _createClass(e, a, t) {
	return a && _defineProperties(e.prototype, a),
	t && _defineProperties(e, t),
	e
} !
function(e) {
	function a(o) {
		if (t[o]) return t[o].exports;
		var i = t[o] = {
			i: o,
			l: !1,
			exports: {}
		};
		return e[o].call(i.exports, i, i.exports, a),
		i.l = !0,
		i.exports
	}
	var t = {};
	a.m = e,
	a.c = t,
	a.d = function(e, t, o) {
		a.o(e, t) || Object.defineProperty(e, t, {
			configurable: !1,
			enumerable: !0,
			get: o
		})
	},
	a.r = function(e) {
		Object.defineProperty(e, "__esModule", {
			value: !0
		})
	},
	a.n = function(e) {
		var t = e && e.__esModule ?
		function() {
			return e.
		default
		}:
		function() {
			return e
		};
		return a.d(t, "a", t),
		t
	},
	a.o = function(e, a) {
		return Object.prototype.hasOwnProperty.call(e, a)
	},
	a.p = "",
	a(a.s = 1)
} ([,
function(e, a, t) {
	t.r(a);
	var o = function() {
		function e(a) {
			_classCallCheck(this, e),
			this.id = a.id,
			this.url = a.url,
			this.endTime = a.endTime,
			this.playerBox = a.playerBox,
			this.callBack = a.callBack,
			this.damooDomArr = [],
			this.damooComment = null,
			this.playerBoxWidth = this.playerBox.offsetWidth,
			this.playerBoxHeight = this.playerBox.offsetHeight,
			this.isShowDamoo = !0
		}
		return _createClass(e, [{
			key: "loadData",
			value: function() {
				var e, a = this.url,
				t = this.id,
				o = this.endTime;
				self = this,
				$.ajax({
					url: a,
					type: "post",
					data: {
						id: t,
						start_timestamp: 1,
						end_timestamp: o
					},
					dataType: "json",
					success: function(a) {
						e = a;
						var t = [];
						for (var o in e) {
							o = Number(o);
							var i = void 0,
							l = Object.keys(e[o]).length;
							if (i = t[o] instanceof Array && t[o].length > 0 ? t.length: o, l > 10) {
								for (var n = Math.ceil(l / 10), r = 0; r < n; r++) t[i + r] = [];
								for (var s in e[o]) t[i].length >= 10 && (i += 1),
								t[i].push(e[o][s])
							} else {
								t[i] = [];
								for (var u in e[o]) t[i].push(e[o][u])
							}
						}
						self.damooComment = t,
						self.loadDom(),
						self.callBack.damooLoaded()
					}
				})
			}
		},
		{
			key: "loadDom",
			value: function() {
				if (null !== this.damooComment) {
					var a = this.damooComment;
					for (var t in a) {
						this.damooDomArr[t] = [];
						for (var o in a[t]) {
							var i = e._createDamooDom(a[t][o]);
							this.damooDomArr[t].push(i)
						}
					}
				}
			}
		},
		{
			key: "fire",
			value: function(e) {
				var a = this;
				if (this.isShowDamoo) {
					var t = this.damooDomArr[e];
					if (t instanceof Array && t.length > 0) {
						var o = 0;
						for (var i in t) !
						function(e) {
							var i = t[e];
							a.playerBox.appendChild(i),
							i.addEventListener("transitionend",
							function() {
								i.removeAttribute("style"),
								i.remove()
							}),
							o = a._setDamooCss(o, i)
						} (i)
					}
				}
			}
		},
		{
			key: "showDamoo",
			value: function() {
				this.isShowDamoo = !0
			}
		},
		{
			key: "hideDamoo",
			value: function() {
				this.isShowDamoo = !1;
				var e = document.getElementsByClassName("damooItem");
				Array.prototype.forEach.call(e,
				function(e) {
					e.style.display = "none"
				})
			}
		},
		{
			key: "_setDamooCss",
			value: function(a, t) {
				t.style.display = "block";
				var o, i, l = t.offsetWidth + 40 + 25,
				n = t.offsetHeight,
				r = 3 * Math.random() + 3;
				return 0 === a ? (o = 10, i = this.playerBoxWidth) : (o = (10 + n) * a, i = this.playerBoxWidth, o >= this.playerBoxHeight - n && (o = 10, i = this.playerBoxWidth, a = 0)),
				e._setCss(t, {
					left: i + "px",
					top: o + "px",
					padding: "0 25px 0 40px",
					transform: "translateX(" + ( - this.playerBoxWidth - l) + "px)",
					transition: "transform " + r + "s linear"
				}),
				++a
			}
		}], [{
			key: "_createDamooDom",
			value: function(e) {
				var a = document.createElement("div"),
				t = new Image,
				o = document.createElement("div");
				return a.setAttribute("class", "damooItem"),
				t.setAttribute("class", "user-icon"),
				o.setAttribute("class", "damoo-content"),
				t.src = e.user_icon,
				o.innerHTML = e.comment_content,
				a.appendChild(t),
				a.appendChild(o),
				a
			}
		},
		{
			key: "_setCss",
			value: function(e, a) {
				if (void 0 == e || void 0 == a) return ! 1;
				if ("object" != _typeof(a)) return ! 1;
				var t = "";
				for (var o in a) t += o + ":" + a[o] + ";";
				e.setAttribute("style", t)
			}
		}]),
		e
	} (),
	i = function() {
		function e(a) {
			var t = this;
			_classCallCheck(this, e),
			this.videoEle,
			this.videoBox = a.videoBox || void 0,
			this.isVideoScript = a.isVideoScript || void 0,
			this.callBack = a.callBack || void 0,
			this.videoDuration = a.videoDuration || void 0,
			this.videoPlayFun = a.videoPlayFun || void 0,
			this.videoPauseFun = a.videoPauseFun || void 0,
			this.videoEndFun = a.videoEndFun || void 0,
			this.isVideoScript && (this.showInfo = a.showInfo || null, this.video_timer_start = 0, this.video_timer_end = 0, this.Frames = [], this.Info = {
				frame_total: null
			},
			this.load());
			var o = this._getVideo(this.videoBox);
			this.videoEle = o,
			e._addEvent(o, "waiting", this.callBack.waiting),
			e._addEvent(o, "loadedmetadata",
			function(e) {
				t.callBack.loadedmetadata(o)
			}),
			e._addEvent(o, "play", this.callBack.play),
			e._addEvent(o, "pause", this.callBack.pause),
			e._addEvent(o, "playing", this.callBack.playing),
			e._addEvent(o, "timeupdate",
			function(e) {
				t.callBack.timeupdate(o)
			}),
			e._addEvent(o, "ended", this.callBack.ended),
			e._addEvent(o, "error", this.callBack.error)
		}
		return _createClass(e, [{
			key: "play",
			value: function() {
				var e = this.videoBox,
				a = this._getVideo(e);
				void 0 !== a && "" !== a && a.play()
			}
		},
		{
			key: "pause",
			value: function() {
				var e = this.videoBox,
				a = this._getVideo(e);
				void 0 !== a && "" !== a && a.pause()
			}
		},
		{
			key: "setTime",
			value: function(e) {
				var a = this.videoBox;
				this._getVideo(a).currentTime = e
			}
		},
		{
			key: "instances",
			value: function(e) {
				if ("Frame" === e) return function() {
					this.image = null,
					this.sound = null,
					this.bgm = null,
					this.role_name = null,
					this.dialogue_content = null,
					this.delay = 0,
					this.timer = 0,
					this.video_timer = []
				}
			}
		},
		{
			key: "load",
			value: function() {
				try {
					var a = 0,
					t = 0,
					o = this.showInfo,
					i = o.dialogues,
					l = o.script_info;
					for (var n in i) {
						var r = i[n],
						s = r.role_id,
						u = r.phase_image,
						c = r.dialogue_image,
						d = (r.phase_sound, r.phase_sound_duration),
						y = (r.dialogue_sound, r.dialogue_sound_duration),
						p = (r.phase_bgm, r.phase_bgm_duration, r.dialogue_bgm, r.dialogue_bgm_duration, r.dialogue_content),
						h = r.role_name,
						m = r.dialogue_delay,
						f = r.dialogue_video_timer,
						v = "",
						g = d > 0 ? d: y;
						for (var _ in l.script_role) if (l.script_role[_].role_id == s) {
							v = l.script_role[_].role_icon;
							break
						}
						var I = new(this.instances("Frame"));
						I.image = e._checkString(u) ? u: c,
						I.role_name = h,
						I.role_icon = v,
						I.dialogue_content = p,
						I.dialogue_image = c,
						I.delay = m,
						I.timer = t / 1e3,
						I.video_timer = f,
						this.Frames.push(I),
						t += m > 0 ? m: g,
						a++
					}
					this.Info.frame_total = a
				} catch(e) {}
			}
		},
		{
			key: "frameUpdate",
			value: function(e) {
				if (void 0 == e) return ! 1;
				for (var a in this.Frames) if (e >= this.Frames[a].video_timer[0] / 1e3 && e < this.Frames[a].video_timer[2] / 1e3) {
					this.callBack.frameUpdate(this.Frames[a]),
					this.video_timer_start = this.Frames[a].video_timer[0] / 1e3,
					this.video_timer_end = this.Frames[a].video_timer[2] / 1e3;
					break
				}
			}
		},
		{
			key: "getVideoEle",
			value: function() {
				return this.videoEle
			}
		},
		{
			key: "_getVideo",
			value: function(e) {
				return e.getElementsByTagName("video")[0]
			}
		}], [{
			key: "_checkString",
			value: function(e) {
				return null != e && e.length > 0
			}
		},
		{
			key: "_addEvent",
			value: function(e, a, t) {
				e.addEventListener(a, t)
			}
		}]),
		e
	} (),
	l = function() {
		function e(a, t) {
			_classCallCheck(this, e),
			this.showInfo = a,
			this.callBack = t,
			this.show = null,
			this.Frames = [],
			this.ArrayAudioSound = [],
			this.ArrayAudioBgm = [],
			this.Info = {
				show_title: null,
				frame_load_total: 3,
				frame_load_current: 0,
				frame_current: 0,
				frame_total: 0,
				total_time: 0,
				current_time: 0,
				play_bgm: !1,
				status: 0,
				audio_sound: null,
				audio_bgm: null,
				interval: null,
				debug_log: !0,
				bgm_volume: 1,
				sound_volume_arr: [],
				show_role_arr: []
			}
		}
		return _createClass(e, [{
			key: "instances",
			value: function(e) {
				return "Sound" === e ?
				function() {
					this.url = null,
					this.duration = 0,
					this.audio = null,
					this.play = !0,
					this.volume = 1
				}: "Frame" === e ?
				function() {
					this.image = null,
					this.sound = null,
					this.bgm = null,
					this.role_name = null,
					this.dialogue_content = null,
					this.delay = 0,
					this.timer = 0
				}: void 0
			}
		},
		{
			key: "initAudio",
			value: function(a) {
				var t = this,
				o = new Audio;
				return o.loop = !1,
				a && (o.loop = !0),
				e._addEvent(o, "waiting",
				function() {
					a || (t.callBack.waiting(), t._waiting())
				},
				!1),
				e._addEvent(o, "play",
				function() {
					t.callBack.play()
				},
				!1),
				e._addEvent(o, "canplaythrough",
				function() {
					t.callBack.play(),
					t._canPlay()
				},
				!1),
				e._addEvent(o, "pause",
				function() {
					1 !== t._getStatus() && t.callBack.pause()
				},
				!1),
				e._addEvent(o, "ended",
				function() {
					t.Info.frame_current++,
					t._nextFrame(!1, 1)
				},
				!1),
				o
			}
		},
		{
			key: "load",
			value: function() {
				try {
					var a = 0,
					t = 0,
					o = 0,
					i = this.showInfo,
					l = this.Info,
					n = this.ArrayAudioBgm,
					r = this.ArrayAudioSound;
					if (l.frame_load_total > 0) for (var s = 0; s < l.frame_load_total; s++) n.push(this.initAudio(!0)),
					r.push(this.initAudio(!1));
					else n.push(this.initAudio(!0)),
					r.push(this.initAudio(!1));
					if (i.hasOwnProperty("show_vols") && null != i.show_vols) {
						if (Object.keys(i.show_vols).length > 0) for (var u in i.show_vols) 0 == u ? l.bgm_volume = i.show_vols[u] : l.sound_volume_arr.push(i.show_vols[u])
					} else if (l.bgm_volume = 100, i.hasOwnProperty("show_role") && null != i.show_role && Object.keys(i.show_role).length > 0) for (var c in i.show_role) l.sound_volume_arr.push(100);
					if (Object.keys(i.show_role).length > 0) for (var d in i.show_role) l.show_role_arr.push(i.show_role[d].role_id);
					var y = i.dialogues,
					p = i.script_info;
					for (var h in y) {
						var m = y[h],
						f = m.role_id,
						v = m.phase_image,
						g = m.dialogue_image,
						_ = m.phase_sound,
						I = m.phase_sound_duration,
						k = m.dialogue_sound,
						D = m.dialogue_sound_duration,
						B = m.phase_bgm,
						A = m.phase_bgm_duration,
						b = m.dialogue_bgm,
						S = m.dialogue_bgm_duration,
						w = m.dialogue_content,
						E = m.role_name,
						j = m.dialogue_delay,
						C = m.dialogue_bgm_vols,
						O = m.dialogue_sound_vols,
						F = "",
						T = 0;
						for (var x in p.script_role) if (p.script_role[x].role_id == f) {
							F = p.script_role[x].role_icon;
							break
						} - 1 !== l.show_role_arr.indexOf(f) && (T = l.sound_volume_arr[l.show_role_arr.indexOf(f)]);
						var L = this.instances("Sound"),
						Q = new L;
						Q.url = e._checkString(_) ? _: k,
						Q.duration = I > 0 ? I: D,
						Q.play = !0,
						Q.volume = O > 0 ? O: T;
						var R = new L;
						R.url = e._checkString(B) ? B: b,
						R.duration = A > 0 ? A: S,
						R.play = l.play_bgm,
						R.volume = l.bgm_volume > 0 ? l.bgm_volume: C,
						l.frame_load_total > 0 ? (Q.audio = r[a], R.audio = n[a], a++, a %= l.frame_load_total) : (Q.audio = r[a], R.audio = n[a]),
						e._checkString(w) || (w = ""),
						e._checkString(E) || (E = "");
						var U = new(this.instances("Frame"));
						U.image = e._checkString(v) ? v: g,
						U.sound = Q,
						U.bgm = R,
						U.role_name = E,
						U.role_icon = F,
						U.dialogue_content = w,
						U.dialogue_image = g,
						U.delay = j,
						U.delayInterval = 0,
						U.remainingDelay,
						this.Frames.push(U),
						U.timer = o,
						o += j > 0 ? j: Q.duration,
						t++
					}
					return l.total_time = o,
					l.frame_total = t,
					this.show = i,
					!0
				} catch(e) {}
			}
		},
		{
			key: "play",
			value: function() {
				var e = this.Info;
				0 === this._getStatus() ? this._nextFrame(!0, e.frame_load_total) : 2 === this._getStatus() ? this._onLoadStart() : 3 === this._getStatus() && this._playInterval(),
				e.status = 1
			}
		},
		{
			key: "pause",
			value: function() {
				var e = this.Info;
				this._setStatus(2),
				e.status = 2
			}
		},
		{
			key: "setFrame",
			value: function(e) {
				var a = this.Info,
				t = this.Frames,
				o = this.callBack;
				if (e < a.frame_total) {
					this._setStatus(2),
					clearInterval(a.interval),
					a.frame_current = e,
					a.frame_load_current = e;
					var i = t[e];
					0 !== i.delayInterval && clearInterval(i.delayInterval),
					a.current_time = 0 === e ? 0 : i.timer / 1e3,
					null !== o.frameUpdate && o.frameUpdate(t[a.frame_current]),
					this._setStatus(0),
					this.play()
				}
			}
		},
		{
			key: "_nextFrame",
			value: function(a, t) {
				var o = this,
				i = this.Info,
				l = this.Frames;
				if (this.callBack.frameUpdate(l[i.frame_current]), i.frame_current < i.frame_total) {
					if (i.frame_load_total > 0) {
						for (var n = 0; i.frame_load_current < i.frame_total && t-->0;) {
							var r = l[i.frame_load_current],
							s = r.sound,
							u = r.bgm;
							this._loadAudio(s.audio, s.url),
							!u.play && e._checkString(u.url) && this._loadAudio(u.audio, u.url),
							i.frame_load_current++,
							n++
						}
						a && n > 0 ? (setTimeout(function() {
							o._onLoadStart()
						},
						2e3), setTimeout(function() {
							o._playInterval()
						},
						2e3)) : this._onLoadStart()
					} else {
						var c = l[i.frame_current],
						d = c.sound,
						y = c.bgm;
						this._loadAudio(d.audio, d.url),
						i.play_bgm && e._checkString(y.url) && this._loadAudio(y.audio, y.url),
						a ? (window.setTimeout(this._onLoadStart(), 2e3), window.setTimeout(this._playInterval(), 2e3)) : this._onLoadStart()
					}
				} else this._finish(),
				null != this.callBack.ended && this.callBack.ended()
			}
		},
		{
			key: "_loadAudio",
			value: function(e, a) {
				if(a !== null){
					e.src = a
					if(!e.gainNode){
						try{
							audioContext.resume();
							let source = audioContext.createMediaElementSource(e);
							e.gainNode = audioContext.createGain();
							source.connect(e.gainNode);
							e.gainNode.connect(audioContext.destination);
						}
						catch (error) {
							console.log("_loadAudio error", error, e.gainNode)
						}
					}
					e.load()
				}
			}
		},
		{
			key: "_onLoadStart",
			value: function() {
				var a = this,
				t = this.Info,
				o = this.Frames,
				i = (this.Fun, o[t.frame_current]),
				l = i.sound,
				n = i.bgm,
				r = i.delay,
				s = (i.delayInterval, i.remainingDelay);
				if (!n.play && e._checkString(n.url)) {
					null != t.audio_bgm && t.audio_bgm.pause();
					var u = n.audio;
					try{
						u.gainNode.gain.value = n.volume / 100
					}catch (e){}
					u.volume = n.volume / 100,
					u.play(),
					t.audio_bgm = u
				} else e._checkString(n.url) || null == t.audio_bgm || t.audio_bgm.play();
				if (void 0 !== s && null !== s && (r = s), r > 0) var c = setInterval(function() {
					1 == a._getStatus() ? (r -= 100, o[t.frame_current].remainingDelay = r) : 2 == a._getStatus() && (clearInterval(c), c = 0),
					r <= 0 && (o[t.frame_current].remainingDelay = void 0, clearInterval(c), t.frame_current++, a._nextFrame(!1, 1))
				},
				100);
				else if (e._checkString(l.url)) {
					var d = l.audio;
					try{
						d.gainNode.gain.value = l.volume / 100
					}catch (e){}
					d.volume = l.volume / 100,
					d.play(),
					t.audio_sound = d
				} else t.frame_current++,
				this._nextFrame(!1, 1)
			}
		},
		{
			key: "_getStatus",
			value: function() {
				return this.Info.status
			}
		},
		{
			key: "_setStatus",
			value: function(e) {
				var a = this.Info,
				t = a.audio_sound,
				o = a.audio_bgm;
				switch (e) {
				case 0:
				case 2:
					null != t && t.pause(),
					null != o && o.pause(),
					a.status = e;
					break;
				case 1:
					null != o && o.play(),
					null != t && t.play(),
					a.status = e
				}
			}
		},
		{
			key: "_playInterval",
			value: function() {
				var e = this,
				a = this.Info,
				t = this.callBack;
				a.interval = setInterval(function() {
					1 == e._getStatus() && (a.current_time < a.total_time / 1e3 ? (null != t.timeUpdate && t.timeUpdate(a.current_time, a.total_time), a.current_time += 1) : clearInterval(a.interval))
				},
				1e3)
			}
		},
		{
			key: "_waiting",
			value: function() {
				var e = this.Info;
				0 !== e.interval && clearInterval(e.interval),
				e.status = 3
			}
		},
		{
			key: "_canPlay",
			value: function() {
				this.play()
			}
		},
		{
			key: "_finish",
			value: function() {
				var e = this.Info,
				a = this.ArrayAudioBgm;
				this._setStatus(0),
				clearInterval(e.interval);
				for (var t = 0; t < a.length; t++) a[t].pause();
				e.current_time = 0,
				e.frame_current = 0,
				e.frame_load_current = 0
			}
		}], [{
			key: "_addEvent",
			value: function(e, a, t) {
				e.addEventListener(a, t)
			}
		},
		{
			key: "_checkString",
			value: function(e) {
				return null != e && e.length > 0
			}
		},
		{
			key: "_calcTimer",
			value: function(e, a) {
				var t = parseInt(e / 60);
				t < 10 && (t = "0" + t);
				var o = parseInt(e % 60);
				return o < 10 && (o = "0" + o),
				t + a + o
			}
		}]),
		e
	} (),
	n = function() {
		function e(a) {
			var t = this;
			_classCallCheck(this, e),
			this.playInfo = a.playInfo,
			null !== this.playInfo && void 0 !== this.playInfo && ("dialogues" in this.playInfo && (this.dialogues = this.playInfo.dialogues), "dialogue_durations" in this.playInfo && (this.duration = this.playInfo.dialogue_durations)),
			this.progressBar = a.progressBar,
			this.callBack = a.callBack,
			this.progressData = [];
			var o = [];
			if (void 0 !== this.dialogues) {
				var i = 0,
				l = this.progressBar.offsetWidth,
				n = this.dialogues,
				r = this.duration;
				for (var s in n) if (o[s] = [], null !== n[s].role_id) {
					o[s].second = n[s].phase_sound_duration / 1e3;
					var u = 0 == s ? 0 : l * (n[s].phase_sound_duration / r);
					o[s].inBarPos = 0 == s ? 0 : u + i,
					i += u
				}
			}
			var c = function(e) {
				t.callBack.mouseMove(e, progressIcon.offsetWidth, progressAll, t.progressBar)
			};
			if (null !== this.progressBar && "" !== this.progressBar) {
				var d = this.progressBar.querySelector("#progressIcon"),
				y = this.progressBar.querySelector("#progressAll");
				e._addEvent(d, "mousedown",
				function(a) {
					t.callBack.mouseDown(a, d.offsetWidth, y, t.progressBar),
					e._addEvent(progressBar, "mousemove", c)
				}),
				e._addEvent(d, "mouseup",
				function(a) {
					t.callBack.mouseUp(a, d.offsetWidth, y, t.progressBar, o),
					e._removeEvent(progressBar, "mousemove", c)
				}),
				e._addEvent(document, "mouseup",
				function(a) {
					t.callBack.mouseUp(a, d.offsetWidth, y, t.progressBar, o),
					e._removeEvent(progressBar, "mousemove", c)
				})
			}
		}
		return _createClass(e, null, [{
			key: "_addEvent",
			value: function(e, a, t) {
				e.addEventListener(a, t)
			}
		},
		{
			key: "_removeEvent",
			value: function(e, a, t) {
				e.removeEventListener(a, t)
			}
		}]),
		e
	} (),
	r = function() {
		function e(a, t, o) {
			return _classCallCheck(this, e),
			this.playerBoxElement = a,
			this.controlBarElement = t,
			this.callBack = o,
			this.allowProgress = !0,
			this.loadingIcon = "url('data:image/png;base64,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')",
			this
		}
		return _createClass(e, [{
			key: "setStyle",
			value: function() {
				this.playerBoxElement,
				this.controlBarElement
			}
		},
		{
			key: "setCover",
			value: function(e) {
				if (null != e) {
					var a = this.playerBoxElement.querySelector("#cover");
					void 0 !== a && (a.src = e)
				}
			}
		},
		{
			key: "setDialogue",
			value: function(e) {
				if (null != e) {
					var a = this.playerBoxElement.querySelector("#dialogues .dialogue .dialogue-content");
					void 0 !== a && (a.innerHTML = e)
				}
			}
		},
		{
			key: "setRoleIcon",
			value: function(e) {
				null != e && this.playerBoxElement.querySelector("#dialogues .role-icon").setAttribute("src", e)
			}
		},
		{
			key: "setRoleName",
			value: function(e) {
				null != e && (this.playerBoxElement.querySelector("#dialogues .role-name").innerHTML = e)
			}
		},
		{
			key: "resetProgressLen",
			value: function() {
				this.controlBarElement.querySelector("#progressBar").querySelector("#progressAll").style.width = 0
			}
		},
		{
			key: "setProgressLenByTime",
			value: function(e, a) {
				if (this.allowProgress) {
					var t = this.controlBarElement.querySelector("#progressBar");
					t.querySelector("#progressIcon"),
					t.querySelector("#progressAll").style.width = e / a * t.offsetWidth + "px"
				}
			}
		},
		{
			key: "setProgressLenByLen",
			value: function(e) {
				var a = this.controlBarElement.querySelector("#progressBar");
				a.querySelector("#progressIcon"),
				a.querySelector("#progressAll").style.width = e
			}
		},
		{
			key: "setTime",
			value: function(a, t) {
				this.controlBarElement.querySelector("#currentTime").innerHTML = e._calcTimer(a, ":")
			}
		},
		{
			key: "resetTime",
			value: function() {
				this.controlBarElement.querySelector("#currentTime").innerHTML = "00:00"
			}
		},
		{
			key: "setIcon",
			value: function(e) {
				var a = this.controlBarElement,
				t = a.querySelector("#playIcon"),
				o = a.querySelector("#pauseIcon");
				0 == e && (t.setAttribute("class", "hide"), o.removeAttribute("class", "hide")),
				1 != e && 2 != e || (t.removeAttribute("class", "hide"), o.setAttribute("class", "hide"))
			}
		},
		{
			key: "showDialogue",
			value: function() {
				this.playerBoxElement.querySelector("#dialogues").style.display = "block"
			}
		},
		{
			key: "hideDialogue",
			value: function() {
				this.playerBoxElement.querySelector("#dialogues").style.display = "none"
			}
		}], [{
			key: "_setCss",
			value: function(e, a) {
				if (void 0 == e || void 0 == a) return ! 1;
				if ("object" != _typeof(a)) return ! 1;
				var t = "";
				for (var o in a) t += o + ":" + a[o] + ";";
				e.setAttribute("style", t)
			}
		},
		{
			key: "_createEle",
			value: function(e, a) {
				if (void 0 != e) {
					var t = document.createElement(e);
					return void 0 != a && this._setCss(t, a),
					t
				}
			}
		},
		{
			key: "_addEvent",
			value: function(e, a, t) {
				e.addEventListener(a, t)
			}
		},
		{
			key: "_checkVideoInBox",
			value: function(e) {
				var a = e;
				if ("object" == _typeof(a.childNodes) && a.childNodes.length > 0) for (var t = 0; t < a.childNodes.length; t++) if ("VIDEO" == a.childNodes[t].nodeName) return ! 0
			}
		},
		{
			key: "_getVideo",
			value: function(e) {
				for (var a in e.childNodes) if ("VIDEO" == e.childNodes[a].nodeName) return e.childNodes[a]
			}
		},
		{
			key: "_calcTimer",
			value: function(e, a) {
				var t = parseInt(e / 60);
				t < 10 && (t = "0" + t);
				var o = parseInt(e % 60);
				return o < 10 && (o = "0" + o),
				t + a + o
			}
		}]),
		e
	} (),
	s = function() {
		function e(a) {
			_classCallCheck(this, e),
			void 0 !== a.playInfo && null !== a.playInfo ? (this.data = a, this.offline = !1, this.type = a.type || "show", this.playInfo = a.playInfo, this.callBack = a.callBack, this.isVideoScript = !1, this.playerBox = document.getElementById(a.playerEle), this.playData = {},
			this.playData.playStatus = 2, this.playData.duration, this.playData.obj, this.playData.styleObj, this.playData.damooObj, this.damooLoaded = !1, this.controlBar = document.getElementById(a.controlBar), this.initplayer()) : e.warning("播放数据不存在")
		}
		return _createClass(e, [{
			key: "initplayer",
			value: function() {
				window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
				var a = this,
				t = this.playInfo,
				s = this.type,
				u = new r(this.playerBox, this.controlBar, {});
				if (this.playData.styleObj = u, u.setStyle(), null != t) {
					var c = 0;
					"show_mp4_duration" in t && null != t.show_mp4_duration && (c = t.show_mp4_duration / 1e3),
					"dialogue_durations" in t && null != t.dialogue_durations && (c = t.dialogue_durations / 1e3),
					u.setTime(c)
				}
				var d, y, p = !1,
				h = this.controlBar.querySelector("#progressBar"),
				m = h.querySelector("#progressAll"),
				f = (h.querySelector("#progressIcon"), 0),
				v = (h.offsetWidth, {
					playInfo: this.playInfo,
					progressBar: h,
					callBack: {
						mouseDown: function(e, t, o, i) {
							e.preventDefault(),
							0 === a.playData.playStatus && (a.playData.styleObj.allowProgress = !1),
							p = !0,
							f = e.clientX - m.clientWidth
						},
						mouseMove: function(e, t, o, i) {
							e.preventDefault();
							var l = e.clientX - f;
							if (l < 0 && (l = 0), o.offsetWidth >= i.offsetWidth) return setTimeout(function() {
								a.playData.styleObj.resetProgressLen()
							},
							1e3),
							!1;
							a.playData.styleObj.setProgressLenByLen(l + "px")
						},
						mouseUp: function(e, o, i, l, n) {
							if (e.preventDefault(), !p) return ! 1;
							var r = i.offsetWidth,
							u = l.offsetWidth;
							if (0 == a.playData.playStatus) {
								if ("show" === s) {
									if ("video" === a.playData.type) {
										var c, d = a.playData.obj,
										y = d.getVideoEle(),
										h = isNaN(y.duration) ? t.show_mp4_duration / 1e3: y.duration;
										c = 0 == r ? 0 : r / u * h,
										d.setTime(c)
									} else if ("audio" === a.playData.type);
									else if ("normal" === a.playData.type) {
										var m = r,
										f = a.playData.obj;
										if (m <= 0) f.setFrame(0);
										else for (var v in n) if (m <= n[v].inBarPos) {
											if (v <= 0) {
												f.setFrame(0);
												break
											}
											f.setFrame(v);
											break
										}
									}
								} else if ("product" === s) if ("audio" === a.playData.type) {
									var g, _ = a.playData.obj,
									I = _.audioELe,
									k = isNaN(I.duration) ? t.product_sound_main.duration / 1e3: I.duration;
									g = 0 == r ? 0 : (r / u + o / u) * k,
									_.setTime(g)
								} else if ("video" === a.playData.type) {
									var D, B = a.playData.obj,
									A = B.videoBox.querySelector("#productVideo"),
									b = isNaN(A.duration) ? t.show_mp4_duration / 1e3: A.duration;
									D = 0 == r ? 0 : (r / u + o / u) * b,
									B.setTime(D)
								}
							} else a.playData.styleObj.resetProgressLen();
							0 === a.playData.playStatus && (a.playData.styleObj.allowProgress = !0),
							p = !1
						}
					}
				});
				if (new n(v), "show" === s ? y = null !== t.show_mp4_duration ? Math.floor(t.show_mp4_duration) : Math.floor(t.dialogue_durations) : "product" === s && (y = Math.floor(t.product_sound_main.duration)), document.onreadystatechange = function() {
					if ("interactive" === document.readyState) {
						var e = {
							id: "show" === s ? t.show_id: "product" === s ? t.product_id: null,
							url: "show" === s ? "/index.php?c=show&a=damoocomment": "product" === s ? "/index.php?c=product&a=damoocomment": "",
							endTime: y,
							playerBox: a.playerBox,
							callBack: {
								damooLoaded: function() {
									a.damooLoaded = !0
								}
							}
						}; (d = new o(e)).loadData(),
						a.playData.damooObj = d
					}
				},
				"show" === s) {
					var g = this.playInfo;
					if ("" !== g.show_mp4 && null !== g.show_mp4) {
						var _, I;
						if (this.playData.type = "video", this.playData.source = g.show_mp4, g.hasOwnProperty("script_info") && g.hasOwnProperty("dialogues")) {
							var k = e._isVideoScript(g.script_info, g.dialogues);
							this.isVideoScript = k,
							I = {
								showInfo: g,
								videoBox: this.playerBox,
								isVideoScript: k,
								callBack: {
									waiting: function() {
										a.playData.playStatus = 3
									},
									loadedmetadata: function(e) {
										a.playData.duration = e.duration
									},
									play: function() {
										a.playData.playStatus = 0
									},
									pause: function() {
										a.playData.playStatus = 1
									},
									playing: function() {
										a.playData.playStatus = 0
									},
									timeupdate: function(e) {
										a.playData.styleObj.setProgressLenByTime(e.currentTime, e.duration),
										a.playData.styleObj.setTime(e.currentTime, e.duration);
										var t = Math.ceil(e.currentTime);
										a.damooLoaded && t != _ && (_ = t, d.fire(Math.ceil(e.currentTime))),
										k && a.playData.obj.frameUpdate(e.currentTime)
									},
									ended: function() {
										a.playData.styleObj.resetProgressLen(),
										a.playData.styleObj.resetTime(),
										a.playData.styleObj.setIcon(2)
									},
									error: function() {},
									frameUpdate: k ?
									function(e) {
										a.playData.styleObj.showDialogue(),
										null != e && (null != e.dialogue_content && "" != e.dialogue_content && a.playData.styleObj.setDialogue(e.dialogue_content), null !== e.role_icon && "" !== e.role_icon && a.playData.styleObj.setRoleIcon(e.role_icon), null !== e.role_name && "" !== e.role_name && a.playData.styleObj.setRoleName(e.role_name))
									}: ""
								}
							}
						}
						this.playData.obj = new i(I)
					} else if ("" !== g.show_mp3 && null !== g.show_mp3) {
						var D;
						this.playData.type = "audio",
						this.playData.source = g.show_mp3;
						var B = {
							type: s,
							playInfo: g,
							callBack: {
								waiting: function() {
									a.playData.playStatus = 3,
									playIcon.style.backgroundImage = a.playData.styleObj.loadingIcon,
									playIcon.setAttribute("class", "playLoading")
								},
								loadedmetadata: function(e) {
									a.playData.duration = e.duration
								},
								play: function() {
									a.playData.playStatus = 0,
									playIcon.style.backgroundImage = a.playData.styleObj.pauseIcon,
									playIcon.removeAttribute("class")
								},
								pause: function() {
									a.playData.playStatus = 1,
									playIcon.style.backgroundImage = a.playData.styleObj.playIcon,
									playIcon.removeAttribute("class")
								},
								timeupdate: function(e) {
									a.playData.styleObj.setProgressLenByTime(e.currentTime, e.duration),
									a.playData.styleObj.setTime(e.currentTime, e.duration);
									var t = Math.ceil(e.currentTime);
									a.damooLoaded && t != D && (D = t, d.fire(Math.ceil(e.currentTime)))
								},
								frameUpdate: function(e, t) {
									a.playData.styleObj.showDialogue(),
									t.length > 0 && (null != t[e].dialogue_image && "" != t[e].dialogue_content && a.playData.styleObj.setCover(t[e].dialogue_image), null != t[e].dialogue_content && "" != t[e].dialogue_content && a.playData.styleObj.setDialogue(t[e].dialogue_content), null !== t[e].role_icon && "" !== t[e].role_icon && a.playData.styleObj.setRoleIcon(t[e].role_icon), null !== t[e].role_name && "" !== t[e].role_name && a.playData.styleObj.setRoleName(t[e].role_name))
								},
								ended: function() {
									a.playData.styleObj.resetProgressLen(),
									a.playData.styleObj.resetTime(),
									a.playData.styleObj.showControl()
								},
								error: function() {}
							}
						};
						this.playData.obj = new audioPlay(B)
					} else {
						this.playData.type = "normal",
						this.playData.source = null;
						var A = new l(g, {
							waiting: function() {
								a.playData.playStatus = 3
							},
							loadedmetadata: function() {},
							play: function() {
								a.playData.playStatus = 0
							},
							pause: function() {
								a.playData.playStatus = 1,
								playIcon.style.backgroundImage = a.playData.styleObj.playIcon,
								playIcon.removeAttribute("class")
							},
							frameUpdate: function(e) {
								null != e && (null != e.dialogue_image && "" != e.dialogue_content && a.playData.styleObj.setCover(e.dialogue_image), null != e.dialogue_content && "" != e.dialogue_content && a.playData.styleObj.setDialogue(e.dialogue_content), null !== e.role_icon && "" !== e.role_icon && a.playData.styleObj.setRoleIcon(e.role_icon), null !== e.role_name && "" !== e.role_name && a.playData.styleObj.setRoleName(e.role_name))
							},
							timeUpdate: function(e, t) {
								a.playData.styleObj.setProgressLenByTime(e, t / 1e3),
								a.playData.styleObj.setTime(e, t / 1e3),
								a.damooLoaded && d.fire(Math.ceil(e))
							},
							ended: function() {
								a.playData.styleObj.resetProgressLen(),
								a.playData.styleObj.resetTime(),
								a.playData.styleObj.setIcon(2),
								a.playData.styleObj.setCover(g.show_cover)
							}
						});
						A.load(),
						this.playData.obj = A
					}
				} else if ("product" === s) {
					var b = this.playInfo;
					this.playData.source = b.product_sound_main.url;
					var S, w = this.playData.source.slice( - 4);
					if (".mp3" == w) {
						this.playData.type = "audio";
						var E = {
							type: s,
							playInfo: t,
							callBack: {
								waiting: function() {
									a.playData.playStatus = 3,
									playIcon.style.backgroundImage = a.playData.styleObj.loadingIcon,
									playIcon.setAttribute("class", "playLoading")
								},
								loadedmetadata: function(e) {
									a.playData.duration = e.duration
								},
								play: function() {
									a.playData.playStatus = 0,
									playIcon.style.backgroundImage = a.playData.styleObj.pauseIcon,
									playIcon.removeAttribute("class")
								},
								pause: function() {
									a.playData.playStatus = 1,
									playIcon.style.backgroundImage = a.playData.styleObj.playIcon,
									playIcon.removeAttribute("class")
								},
								playing: function() {
									a.playData.playStatus = 0,
									playIcon.style.backgroundImage = a.playData.styleObj.pauseIcon,
									playIcon.removeAttribute("class")
								},
								timeupdate: function(e) {
									a.playData.styleObj.setProgressLenByTime(e.currentTime, e.duration),
									a.playData.styleObj.setTime(e.currentTime, e.duration);
									var t = Math.ceil(e.currentTime);
									a.damooLoaded && t != S && (S = t, d.fire(Math.ceil(e.currentTime)))
								},
								ended: function() {
									a.playData.styleObj.resetProgressLen(),
									a.playData.styleObj.resetTime(),
									a.playData.styleObj.showControl()
								},
								error: function() {}
							}
						};
						this.playData.obj = new audioPlay(E)
					} else if (".mp4" == w) {
						this.playData.type = "video";
						var j = {
							videoBox: this.playerBox,
							callBack: {
								waiting: function() {
									a.playData.playStatus = 3,
									playIcon.style.backgroundImage = a.playData.styleObj.loadingIcon,
									playIcon.setAttribute("class", "playLoading")
								},
								loadedmetadata: function(e) {
									a.playData.duration = e.duration
								},
								play: function() {
									a.playData.playStatus = 0,
									playIcon.style.backgroundImage = a.playData.styleObj.pauseIcon,
									playIcon.removeAttribute("class")
								},
								pause: function() {
									a.playData.playStatus = 1,
									playIcon.style.backgroundImage = a.playData.styleObj.playIcon,
									playIcon.removeAttribute("class")
								},
								playing: function() {
									a.playData.playStatus = 0,
									playIcon.style.backgroundImage = a.playData.styleObj.pauseIcon,
									playIcon.removeAttribute("class")
								},
								timeupdate: function(e) {
									a.playData.styleObj.setProgressLenByTime(e.currentTime, e.duration),
									a.playData.styleObj.setTime(e.currentTime, e.duration);
									var t = Math.ceil(e.currentTime);
									a.damooLoaded && t != S && (S = t, d.fire(Math.ceil(e.currentTime)))
								},
								ended: function() {
									a.playData.styleObj.resetProgressLen(),
									a.playData.styleObj.resetTime(),
									a.playData.styleObj.showControl()
								},
								error: function() {}
							}
						};
						this.playData.obj = new i(j)
					}
					u.setTime(0, b.product_sound_main.duration / 1e3)
				}
				"function" == typeof this.callBack.onloaded && this.callBack.onloaded(this),
				window.addEventListener("offline",
				function() {
					a.offline = !0,
					a.callBack.error("没有网络")
				}),
				window.addEventListener("online",
				function() {
					a.offline = !1
				})
			}
		},
		{
			key: "play",
			value: function() {
				if (this.offline) return void 0 !== this.callBack.error && this.callBack.error("没有网络"),
				void(this.playData.playStatus = 2);
				1 !== this.playData.playStatus && 2 !== this.playData.playStatus && 3 !== this.playData.playStatus || ("video" === this.playData.type ? this.playData.obj.play() : "audio" === this.playData.type ? this.playData.obj.play() : "normal" === this.playData.type && this.playData.obj.play(), this.playData.styleObj.setIcon(0))
			}
		},
		{
			key: "pause",
			value: function() {
				0 !== this.playData.playStatus && 3 !== this.playData.playStatus || ("video" === this.playData.type ? this.playData.obj.pause() : "audio" === this.playData.type ? this.playData.obj.pause() : "normal" === this.playData.type && this.playData.obj.pause(), this.playData.styleObj.setIcon(1))
			}
		},
		{
			key: "showDamoo",
			value: function() {
				void 0 !== this.playData.damooObj && "function" == typeof this.playData.damooObj.showDamoo && this.playData.damooObj.showDamoo()
			}
		},
		{
			key: "hideDamoo",
			value: function() {
				void 0 !== this.playData.damooObj && "function" == typeof this.playData.damooObj.hideDamoo && this.playData.damooObj.hideDamoo()
			}
		}], [{
			key: "_isVideoScript",
			value: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
				a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
				return ! (e = 0 == a.length) && (e.script_video > 0 || null != a && a.length > 0 && null != a[0].dialogue_video || void 0)
			}
		},
		{
			key: "warning",
			value: function(e) {}
		}]),
		e
	} ();
	window.player = s
}]);
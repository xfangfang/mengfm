"use strict";function equipment(){return{versions:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:/MicroMessenger/i.test(e),weibo:/Weibo/i.test(e),qq:/MQQBrowser/i.test(e)||/QQ/i.test(e),Safari:-1!=e.indexOf("Safari")&&!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),miniProgram:-1!=e.indexOf("miniProgram")&&-1!=e.indexOf("MicroMessenger")}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()}.versions}
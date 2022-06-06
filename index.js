import { handleEvent } from "flareact";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener("fetch", (event) => {
  // global.window = global.window || {};
  // window = window || {};
  // window.requestAnimationFrame = () => {
  //   console.log("Polyfil executed");
  // };
  // if (!window.requestAnimationFrame) {
  //   window.requestAnimationFrame = function () {
  //     console.log("filler func");
  //   };
  // }
  // (function () {
  //   var lastTiFme = 0;
  //   var vendors = ["ms", "moz", "webkit", "o"];
  //   for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  //     window.requestAnimationFrame =
  //       window[vendors[x] + "RequestAnimationFrame"];
  //     window.cancelAnimationFrame =
  //       window[vendors[x] + "CancelAnimationFrame"] ||
  //       window[vendors[x] + "CancelRequestAnimationFrame"];
  //   }

  //   if (!window.requestAnimationFrame)
  //     window.requestAnimationFrame = function (callback, element) {
  //       var currTime = new Date().getTime();
  //       var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  //       var id = window.setTimeout(function () {
  //         callback(currTime + timeToCall);
  //       }, timeToCall);
  //       lastTime = currTime + timeToCall;
  //       return id;
  //     };

  //   if (!window.cancelAnimationFrame)
  //     window.cancelAnimationFrame = function (id) {
  //       clearTimeout(id);
  //     };
  // })();

  try {
    event.respondWith(() => {
      global = global || {
        requestAnimationFrame: () => {
          console.log("poly");
        },
      };
      global.window = {};
      window = window || {};
      (function () {
        var lastTiFme = 0;
        var vendors = ["ms", "moz", "webkit", "o"];
        for (
          var x = 0;
          x < vendors.length && !window.requestAnimationFrame;
          ++x
        ) {
          window.requestAnimationFrame =
            window[vendors[x] + "RequestAnimationFrame"];
          window.cancelAnimationFrame =
            window[vendors[x] + "CancelAnimationFrame"] ||
            window[vendors[x] + "CancelRequestAnimationFrame"];
        }

        if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
              callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };

        if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
          };
      })();

      return handleEvent(
        event,
        require.context("./pages/", true, /\.(js|jsx|ts|tsx)$/),
        DEBUG
      );
    });
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

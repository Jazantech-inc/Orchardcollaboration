/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

/**
 * @preserve console-shim 1.0.2
 * https://github.com/kayahr/console-shim
 * Copyright (C) 2011 Klaus Reimer <k@ailis.de>
 * Licensed under the MIT license
 * (See http://www.opensource.org/licenses/mit-license)
 */
 
 
(function(){
"use strict";

/**
 * Returns a function which calls the specified function in the specified
 * scope.
 *
 * @param {Function} func
 *            The function to call.
 * @param {Object} scope
 *            The scope to call the function in.
 * @param {...*} args
 *            Additional arguments to pass to the bound function.
 * @returns {function(...[*]): undefined}
 *            The bound function.
 */
var bind = function(func, scope, args)
{
    var fixedArgs = Array.prototype.slice.call(arguments, 2);
    return function()
    {
        var args = fixedArgs.concat(Array.prototype.slice.call(arguments, 0));
        (/** @type {Function} */ func).apply(scope, args);
    };
};

// Create console if not present
if (!window["console"]) window.console = /** @type {Console} */ ({});
var console = (/** @type {Object} */ window.console);

// Implement console log if needed
if (!console["log"])
{
    // Use log4javascript if present
    if (window["log4javascript"])
    {
        var log = log4javascript.getDefaultLogger();
        console.log = bind(log.info, log);
        console.debug = bind(log.debug, log);
        console.info = bind(log.info, log);
        console.warn = bind(log.warn, log);
        console.error = bind(log.error, log);
    }
    
    // Use empty dummy implementation to ignore logging
    else
    {
        console.log = (/** @param {...*} args */ function(args) {});
    }
}

// Implement other log levels to console.log if missing
if (!console["debug"]) console.debug = console.log;
if (!console["info"]) console.info = console.log;
if (!console["warn"]) console.warn = console.log;
if (!console["error"]) console.error = console.log;

// Wrap the log methods in IE (<=9) because their argument handling is wrong
// This wrapping is also done if the __consoleShimTest__ symbol is set. This
// is needed for unit testing.
if (window["__consoleShimTest__"] != null || 
    eval("/*@cc_on @_jscript_version <= 9@*/"))
{
    /**
     * Wraps the call to a real IE logging method. Modifies the arguments so
     * parameters which are not represented by a placeholder are properly
     * printed with a space character as separator.
     *
     * @param {...*} args
     *            The function arguments. First argument is the log function
     *            to call, the other arguments are the log arguments.
     */
    var wrap = function(args)
    {
        var i, max, match, log;
        
        // Convert argument list to real array
        args = Array.prototype.slice.call(arguments, 0);
        
        // First argument is the log method to call
        log = args.shift();
        
        max = args.length;
        if (max > 1 && window["__consoleShimTest__"] !== false)
        {
            // When first parameter is not a string then add a format string to
            // the argument list so we are able to modify it in the next stop
            if (typeof(args[0]) != "string")
            {
                args.unshift("%o");
                max += 1;
            }
            
            // For each additional parameter which has no placeholder in the
            // format string we add another placeholder separated with a
            // space character.
            match = args[0].match(/%[a-z]/g);
            for (i = match ? match.length + 1 : 1; i < max; i += 1)
            {
                args[0] += " %o";
            }
        }
        Function.apply.call(log, console, args);
    };
    
    // Wrap the native log methods of IE to fix argument output problems
    console.log = bind(wrap, window, console.log);
    console.debug = bind(wrap, window, console.debug);
    console.info = bind(wrap, window, console.info);
    console.warn = bind(wrap, window, console.warn);
    console.error = bind(wrap, window, console.error);
}

// Implement console.assert if missing
if (!console["assert"])
{
    console["assert"] = function()
    {
        var args = Array.prototype.slice.call(arguments, 0);
        var expr = args.shift();
        if (!expr)
        {
            args[0] = "Assertion failed: " + args[0];
            console.error.apply(console, args);
        }
    };
}

// Linking console.dir and console.dirxml to the console.log method if
// missing. Hopefully the browser already logs objects and DOM nodes as a
// tree.
if (!console["dir"]) console["dir"] = console.log;
if (!console["dirxml"]) console["dirxml"] = console.log;

// Linking console.exception to console.error. This is not the same but
// at least some error message is displayed.
if (!console["exception"]) console["exception"] = console.error;

// Implement console.time and console.timeEnd if one of them is missing
if (!console["time"] || !console["timeEnd"])
{
    var timers = {};
    console["time"] = function(id)
    {
        timers[id] = new Date().getTime();
    };
    console["timeEnd"] = function(id)
    {
        var start = timers[id];
        if (start)
        {
            console.log(id + ": " + (new Date().getTime() - start) + "ms");
            delete timers[id];
        }
    };
}

// Implement console.table if missing
if (!console["table"])
{
    console["table"] = function(data, columns)
    {
        var i, iMax, row, j, jMax, k;
        
        // Do nothing if data has wrong type or no data was specified
        if (!data || !(data instanceof Array) || !data.length) return;
        
        // Auto-calculate columns array if not set
        if (!columns || !(columns instanceof Array))
        {
            columns = [];
            for (k in data[0])
            {
                if (!data[0].hasOwnProperty(k)) continue;
                columns.push(k);
            }
        }
        
        for (i = 0, iMax = data.length; i < iMax; i += 1)
        {
            row = [];
            for (j = 0, jMax = columns.length; j < jMax; j += 1)
            {
                row.push(data[i][columns[j]]);
            }
            
            Function.apply.call(console.log, console, row);
        }
    };
}

// Dummy implementations of other console features to prevent error messages
// in browsers not supporting it.
if (!console["clear"]) console["clear"] = function() {};
if (!console["trace"]) console["trace"] = function() {};
if (!console["group"]) console["group"] = function() {};
if (!console["groupCollapsed"]) console["groupCollapsed"] = function() {};
if (!console["groupEnd"]) console["groupEnd"] = function() {};
if (!console["timeStamp"]) console["timeStamp"] = function() {};
if (!console["profile"]) console["profile"] = function() {};
if (!console["profileEnd"]) console["profileEnd"] = function() {};
if (!console["count"]) console["count"] = function() {};

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnNvbGUtc2hpbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb25zb2xlLXNoaW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwcmVzZXJ2ZSBjb25zb2xlLXNoaW0gMS4wLjJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9rYXlhaHIvY29uc29sZS1zaGltXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTEgS2xhdXMgUmVpbWVyIDxrQGFpbGlzLmRlPlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiAoU2VlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UpXG4gKi9cbiBcbiBcbihmdW5jdGlvbigpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIGNhbGxzIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gaW4gdGhlIHNwZWNpZmllZFxuICogc2NvcGUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICogICAgICAgICAgICBUaGUgZnVuY3Rpb24gdG8gY2FsbC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICogICAgICAgICAgICBUaGUgc2NvcGUgdG8gY2FsbCB0aGUgZnVuY3Rpb24gaW4uXG4gKiBAcGFyYW0gey4uLip9IGFyZ3NcbiAqICAgICAgICAgICAgQWRkaXRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgYm91bmQgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oLi4uWypdKTogdW5kZWZpbmVkfVxuICogICAgICAgICAgICBUaGUgYm91bmQgZnVuY3Rpb24uXG4gKi9cbnZhciBiaW5kID0gZnVuY3Rpb24oZnVuYywgc2NvcGUsIGFyZ3MpXG57XG4gICAgdmFyIGZpeGVkQXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKClcbiAgICB7XG4gICAgICAgIHZhciBhcmdzID0gZml4ZWRBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgKC8qKiBAdHlwZSB7RnVuY3Rpb259ICovIGZ1bmMpLmFwcGx5KHNjb3BlLCBhcmdzKTtcbiAgICB9O1xufTtcblxuLy8gQ3JlYXRlIGNvbnNvbGUgaWYgbm90IHByZXNlbnRcbmlmICghd2luZG93W1wiY29uc29sZVwiXSkgd2luZG93LmNvbnNvbGUgPSAvKiogQHR5cGUge0NvbnNvbGV9ICovICh7fSk7XG52YXIgY29uc29sZSA9ICgvKiogQHR5cGUge09iamVjdH0gKi8gd2luZG93LmNvbnNvbGUpO1xuXG4vLyBJbXBsZW1lbnQgY29uc29sZSBsb2cgaWYgbmVlZGVkXG5pZiAoIWNvbnNvbGVbXCJsb2dcIl0pXG57XG4gICAgLy8gVXNlIGxvZzRqYXZhc2NyaXB0IGlmIHByZXNlbnRcbiAgICBpZiAod2luZG93W1wibG9nNGphdmFzY3JpcHRcIl0pXG4gICAge1xuICAgICAgICB2YXIgbG9nID0gbG9nNGphdmFzY3JpcHQuZ2V0RGVmYXVsdExvZ2dlcigpO1xuICAgICAgICBjb25zb2xlLmxvZyA9IGJpbmQobG9nLmluZm8sIGxvZyk7XG4gICAgICAgIGNvbnNvbGUuZGVidWcgPSBiaW5kKGxvZy5kZWJ1ZywgbG9nKTtcbiAgICAgICAgY29uc29sZS5pbmZvID0gYmluZChsb2cuaW5mbywgbG9nKTtcbiAgICAgICAgY29uc29sZS53YXJuID0gYmluZChsb2cud2FybiwgbG9nKTtcbiAgICAgICAgY29uc29sZS5lcnJvciA9IGJpbmQobG9nLmVycm9yLCBsb2cpO1xuICAgIH1cbiAgICBcbiAgICAvLyBVc2UgZW1wdHkgZHVtbXkgaW1wbGVtZW50YXRpb24gdG8gaWdub3JlIGxvZ2dpbmdcbiAgICBlbHNlXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyA9ICgvKiogQHBhcmFtIHsuLi4qfSBhcmdzICovIGZ1bmN0aW9uKGFyZ3MpIHt9KTtcbiAgICB9XG59XG5cbi8vIEltcGxlbWVudCBvdGhlciBsb2cgbGV2ZWxzIHRvIGNvbnNvbGUubG9nIGlmIG1pc3NpbmdcbmlmICghY29uc29sZVtcImRlYnVnXCJdKSBjb25zb2xlLmRlYnVnID0gY29uc29sZS5sb2c7XG5pZiAoIWNvbnNvbGVbXCJpbmZvXCJdKSBjb25zb2xlLmluZm8gPSBjb25zb2xlLmxvZztcbmlmICghY29uc29sZVtcIndhcm5cIl0pIGNvbnNvbGUud2FybiA9IGNvbnNvbGUubG9nO1xuaWYgKCFjb25zb2xlW1wiZXJyb3JcIl0pIGNvbnNvbGUuZXJyb3IgPSBjb25zb2xlLmxvZztcblxuLy8gV3JhcCB0aGUgbG9nIG1ldGhvZHMgaW4gSUUgKDw9OSkgYmVjYXVzZSB0aGVpciBhcmd1bWVudCBoYW5kbGluZyBpcyB3cm9uZ1xuLy8gVGhpcyB3cmFwcGluZyBpcyBhbHNvIGRvbmUgaWYgdGhlIF9fY29uc29sZVNoaW1UZXN0X18gc3ltYm9sIGlzIHNldC4gVGhpc1xuLy8gaXMgbmVlZGVkIGZvciB1bml0IHRlc3RpbmcuXG5pZiAod2luZG93W1wiX19jb25zb2xlU2hpbVRlc3RfX1wiXSAhPSBudWxsIHx8IFxuICAgIGV2YWwoXCIvKkBjY19vbiBAX2pzY3JpcHRfdmVyc2lvbiA8PSA5QCovXCIpKVxue1xuICAgIC8qKlxuICAgICAqIFdyYXBzIHRoZSBjYWxsIHRvIGEgcmVhbCBJRSBsb2dnaW5nIG1ldGhvZC4gTW9kaWZpZXMgdGhlIGFyZ3VtZW50cyBzb1xuICAgICAqIHBhcmFtZXRlcnMgd2hpY2ggYXJlIG5vdCByZXByZXNlbnRlZCBieSBhIHBsYWNlaG9sZGVyIGFyZSBwcm9wZXJseVxuICAgICAqIHByaW50ZWQgd2l0aCBhIHNwYWNlIGNoYXJhY3RlciBhcyBzZXBhcmF0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLip9IGFyZ3NcbiAgICAgKiAgICAgICAgICAgIFRoZSBmdW5jdGlvbiBhcmd1bWVudHMuIEZpcnN0IGFyZ3VtZW50IGlzIHRoZSBsb2cgZnVuY3Rpb25cbiAgICAgKiAgICAgICAgICAgIHRvIGNhbGwsIHRoZSBvdGhlciBhcmd1bWVudHMgYXJlIHRoZSBsb2cgYXJndW1lbnRzLlxuICAgICAqL1xuICAgIHZhciB3cmFwID0gZnVuY3Rpb24oYXJncylcbiAgICB7XG4gICAgICAgIHZhciBpLCBtYXgsIG1hdGNoLCBsb2c7XG4gICAgICAgIFxuICAgICAgICAvLyBDb252ZXJ0IGFyZ3VtZW50IGxpc3QgdG8gcmVhbCBhcnJheVxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZpcnN0IGFyZ3VtZW50IGlzIHRoZSBsb2cgbWV0aG9kIHRvIGNhbGxcbiAgICAgICAgbG9nID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBcbiAgICAgICAgbWF4ID0gYXJncy5sZW5ndGg7XG4gICAgICAgIGlmIChtYXggPiAxICYmIHdpbmRvd1tcIl9fY29uc29sZVNoaW1UZXN0X19cIl0gIT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBXaGVuIGZpcnN0IHBhcmFtZXRlciBpcyBub3QgYSBzdHJpbmcgdGhlbiBhZGQgYSBmb3JtYXQgc3RyaW5nIHRvXG4gICAgICAgICAgICAvLyB0aGUgYXJndW1lbnQgbGlzdCBzbyB3ZSBhcmUgYWJsZSB0byBtb2RpZnkgaXQgaW4gdGhlIG5leHQgc3RvcFxuICAgICAgICAgICAgaWYgKHR5cGVvZihhcmdzWzBdKSAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFyZ3MudW5zaGlmdChcIiVvXCIpO1xuICAgICAgICAgICAgICAgIG1heCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGb3IgZWFjaCBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aGljaCBoYXMgbm8gcGxhY2Vob2xkZXIgaW4gdGhlXG4gICAgICAgICAgICAvLyBmb3JtYXQgc3RyaW5nIHdlIGFkZCBhbm90aGVyIHBsYWNlaG9sZGVyIHNlcGFyYXRlZCB3aXRoIGFcbiAgICAgICAgICAgIC8vIHNwYWNlIGNoYXJhY3Rlci5cbiAgICAgICAgICAgIG1hdGNoID0gYXJnc1swXS5tYXRjaCgvJVthLXpdL2cpO1xuICAgICAgICAgICAgZm9yIChpID0gbWF0Y2ggPyBtYXRjaC5sZW5ndGggKyAxIDogMTsgaSA8IG1heDsgaSArPSAxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFyZ3NbMF0gKz0gXCIgJW9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBGdW5jdGlvbi5hcHBseS5jYWxsKGxvZywgY29uc29sZSwgYXJncyk7XG4gICAgfTtcbiAgICBcbiAgICAvLyBXcmFwIHRoZSBuYXRpdmUgbG9nIG1ldGhvZHMgb2YgSUUgdG8gZml4IGFyZ3VtZW50IG91dHB1dCBwcm9ibGVtc1xuICAgIGNvbnNvbGUubG9nID0gYmluZCh3cmFwLCB3aW5kb3csIGNvbnNvbGUubG9nKTtcbiAgICBjb25zb2xlLmRlYnVnID0gYmluZCh3cmFwLCB3aW5kb3csIGNvbnNvbGUuZGVidWcpO1xuICAgIGNvbnNvbGUuaW5mbyA9IGJpbmQod3JhcCwgd2luZG93LCBjb25zb2xlLmluZm8pO1xuICAgIGNvbnNvbGUud2FybiA9IGJpbmQod3JhcCwgd2luZG93LCBjb25zb2xlLndhcm4pO1xuICAgIGNvbnNvbGUuZXJyb3IgPSBiaW5kKHdyYXAsIHdpbmRvdywgY29uc29sZS5lcnJvcik7XG59XG5cbi8vIEltcGxlbWVudCBjb25zb2xlLmFzc2VydCBpZiBtaXNzaW5nXG5pZiAoIWNvbnNvbGVbXCJhc3NlcnRcIl0pXG57XG4gICAgY29uc29sZVtcImFzc2VydFwiXSA9IGZ1bmN0aW9uKClcbiAgICB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgdmFyIGV4cHIgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGlmICghZXhwcilcbiAgICAgICAge1xuICAgICAgICAgICAgYXJnc1swXSA9IFwiQXNzZXJ0aW9uIGZhaWxlZDogXCIgKyBhcmdzWzBdO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIExpbmtpbmcgY29uc29sZS5kaXIgYW5kIGNvbnNvbGUuZGlyeG1sIHRvIHRoZSBjb25zb2xlLmxvZyBtZXRob2QgaWZcbi8vIG1pc3NpbmcuIEhvcGVmdWxseSB0aGUgYnJvd3NlciBhbHJlYWR5IGxvZ3Mgb2JqZWN0cyBhbmQgRE9NIG5vZGVzIGFzIGFcbi8vIHRyZWUuXG5pZiAoIWNvbnNvbGVbXCJkaXJcIl0pIGNvbnNvbGVbXCJkaXJcIl0gPSBjb25zb2xlLmxvZztcbmlmICghY29uc29sZVtcImRpcnhtbFwiXSkgY29uc29sZVtcImRpcnhtbFwiXSA9IGNvbnNvbGUubG9nO1xuXG4vLyBMaW5raW5nIGNvbnNvbGUuZXhjZXB0aW9uIHRvIGNvbnNvbGUuZXJyb3IuIFRoaXMgaXMgbm90IHRoZSBzYW1lIGJ1dFxuLy8gYXQgbGVhc3Qgc29tZSBlcnJvciBtZXNzYWdlIGlzIGRpc3BsYXllZC5cbmlmICghY29uc29sZVtcImV4Y2VwdGlvblwiXSkgY29uc29sZVtcImV4Y2VwdGlvblwiXSA9IGNvbnNvbGUuZXJyb3I7XG5cbi8vIEltcGxlbWVudCBjb25zb2xlLnRpbWUgYW5kIGNvbnNvbGUudGltZUVuZCBpZiBvbmUgb2YgdGhlbSBpcyBtaXNzaW5nXG5pZiAoIWNvbnNvbGVbXCJ0aW1lXCJdIHx8ICFjb25zb2xlW1widGltZUVuZFwiXSlcbntcbiAgICB2YXIgdGltZXJzID0ge307XG4gICAgY29uc29sZVtcInRpbWVcIl0gPSBmdW5jdGlvbihpZClcbiAgICB7XG4gICAgICAgIHRpbWVyc1tpZF0gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9O1xuICAgIGNvbnNvbGVbXCJ0aW1lRW5kXCJdID0gZnVuY3Rpb24oaWQpXG4gICAge1xuICAgICAgICB2YXIgc3RhcnQgPSB0aW1lcnNbaWRdO1xuICAgICAgICBpZiAoc3RhcnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkICsgXCI6IFwiICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnQpICsgXCJtc1wiKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aW1lcnNbaWRdO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gSW1wbGVtZW50IGNvbnNvbGUudGFibGUgaWYgbWlzc2luZ1xuaWYgKCFjb25zb2xlW1widGFibGVcIl0pXG57XG4gICAgY29uc29sZVtcInRhYmxlXCJdID0gZnVuY3Rpb24oZGF0YSwgY29sdW1ucylcbiAgICB7XG4gICAgICAgIHZhciBpLCBpTWF4LCByb3csIGosIGpNYXgsIGs7XG4gICAgICAgIFxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGRhdGEgaGFzIHdyb25nIHR5cGUgb3Igbm8gZGF0YSB3YXMgc3BlY2lmaWVkXG4gICAgICAgIGlmICghZGF0YSB8fCAhKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkgfHwgIWRhdGEubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAvLyBBdXRvLWNhbGN1bGF0ZSBjb2x1bW5zIGFycmF5IGlmIG5vdCBzZXRcbiAgICAgICAgaWYgKCFjb2x1bW5zIHx8ICEoY29sdW1ucyBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29sdW1ucyA9IFtdO1xuICAgICAgICAgICAgZm9yIChrIGluIGRhdGFbMF0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhWzBdLmhhc093blByb3BlcnR5KGspKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAoaSA9IDAsIGlNYXggPSBkYXRhLmxlbmd0aDsgaSA8IGlNYXg7IGkgKz0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgcm93ID0gW107XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBqTWF4ID0gY29sdW1ucy5sZW5ndGg7IGogPCBqTWF4OyBqICs9IDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcm93LnB1c2goZGF0YVtpXVtjb2x1bW5zW2pdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEZ1bmN0aW9uLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIHJvdyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBEdW1teSBpbXBsZW1lbnRhdGlvbnMgb2Ygb3RoZXIgY29uc29sZSBmZWF0dXJlcyB0byBwcmV2ZW50IGVycm9yIG1lc3NhZ2VzXG4vLyBpbiBicm93c2VycyBub3Qgc3VwcG9ydGluZyBpdC5cbmlmICghY29uc29sZVtcImNsZWFyXCJdKSBjb25zb2xlW1wiY2xlYXJcIl0gPSBmdW5jdGlvbigpIHt9O1xuaWYgKCFjb25zb2xlW1widHJhY2VcIl0pIGNvbnNvbGVbXCJ0cmFjZVwiXSA9IGZ1bmN0aW9uKCkge307XG5pZiAoIWNvbnNvbGVbXCJncm91cFwiXSkgY29uc29sZVtcImdyb3VwXCJdID0gZnVuY3Rpb24oKSB7fTtcbmlmICghY29uc29sZVtcImdyb3VwQ29sbGFwc2VkXCJdKSBjb25zb2xlW1wiZ3JvdXBDb2xsYXBzZWRcIl0gPSBmdW5jdGlvbigpIHt9O1xuaWYgKCFjb25zb2xlW1wiZ3JvdXBFbmRcIl0pIGNvbnNvbGVbXCJncm91cEVuZFwiXSA9IGZ1bmN0aW9uKCkge307XG5pZiAoIWNvbnNvbGVbXCJ0aW1lU3RhbXBcIl0pIGNvbnNvbGVbXCJ0aW1lU3RhbXBcIl0gPSBmdW5jdGlvbigpIHt9O1xuaWYgKCFjb25zb2xlW1wicHJvZmlsZVwiXSkgY29uc29sZVtcInByb2ZpbGVcIl0gPSBmdW5jdGlvbigpIHt9O1xuaWYgKCFjb25zb2xlW1wicHJvZmlsZUVuZFwiXSkgY29uc29sZVtcInByb2ZpbGVFbmRcIl0gPSBmdW5jdGlvbigpIHt9O1xuaWYgKCFjb25zb2xlW1wiY291bnRcIl0pIGNvbnNvbGVbXCJjb3VudFwiXSA9IGZ1bmN0aW9uKCkge307XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

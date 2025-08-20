/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/safe-json-parse";
exports.ids = ["vendor-chunks/safe-json-parse"];
exports.modules = {

/***/ "(ssr)/./node_modules/safe-json-parse/tuple.js":
/*!***********************************************!*\
  !*** ./node_modules/safe-json-parse/tuple.js ***!
  \***********************************************/
/***/ ((module) => {

eval("module.exports = SafeParseTuple\n\nfunction SafeParseTuple(obj, reviver) {\n    var json\n    var error = null\n\n    try {\n        json = JSON.parse(obj, reviver)\n    } catch (err) {\n        error = err\n    }\n\n    return [error, json]\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2FmZS1qc29uLXBhcnNlL3R1cGxlLmpzIiwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N5bXBvc2lhLy4vbm9kZV9tb2R1bGVzL3NhZmUtanNvbi1wYXJzZS90dXBsZS5qcz8xYWFkIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gU2FmZVBhcnNlVHVwbGVcblxuZnVuY3Rpb24gU2FmZVBhcnNlVHVwbGUob2JqLCByZXZpdmVyKSB7XG4gICAgdmFyIGpzb25cbiAgICB2YXIgZXJyb3IgPSBudWxsXG5cbiAgICB0cnkge1xuICAgICAgICBqc29uID0gSlNPTi5wYXJzZShvYmosIHJldml2ZXIpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGVycm9yID0gZXJyXG4gICAgfVxuXG4gICAgcmV0dXJuIFtlcnJvciwganNvbl1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/safe-json-parse/tuple.js\n");

/***/ })

};
;
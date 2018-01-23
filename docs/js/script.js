(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":4}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":1}],4:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":7,"../../modules/es6.object.define-property":20}],5:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],6:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":16}],7:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],8:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":5}],9:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":12}],10:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":13,"./_is-object":16}],11:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":7,"./_ctx":8,"./_global":13,"./_hide":14}],12:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],13:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],14:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":9,"./_object-dp":17,"./_property-desc":18}],15:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":9,"./_dom-create":10,"./_fails":12}],16:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],17:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":6,"./_descriptors":9,"./_ie8-dom-define":15,"./_to-primitive":19}],18:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],19:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":16}],20:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":9,"./_export":11,"./_object-dp":17}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Webgl = function () {
    function Webgl() {
        (0, _classCallCheck3.default)(this, Webgl);

        this.renderer = null;
        this.scene = null;
        this.wrapper = null;
        this.camera = null;
        this.mesh = null;
        this.controls = null;
        this.init();
        this.initListener();
    }

    (0, _createClass3.default)(Webgl, [{
        key: 'init',
        value: function init() {
            this.initRenderer();
            this.initScene();
            this.addLightTo();
            this.addCamera();
            this.addMeshesTo();
            this.addGrid();
            this.onWindowResize();
            requestAnimationFrame(this.tick.bind(this));
        }
    }, {
        key: 'initRenderer',
        value: function initRenderer() {
            var ratio = window.devicePixelRatio || 1;
            this.renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            this.renderer.setPixelRatio(ratio);
            this.wrapper = document.querySelector('.content');
            var canvas = this.renderer.domElement;
            this.wrapper.appendChild(canvas);
        }
    }, {
        key: 'initScene',
        value: function initScene() {
            this.scene = new THREE.Scene();
        }
    }, {
        key: 'initListener',
        value: function initListener() {
            window.addEventListener('resize', this.onWindowResize.bind(this));
        }
    }, {
        key: 'addMeshesTo',
        value: function addMeshesTo() {
            // geometry
            var boxGeometry = new THREE.BoxGeometry(80, 80, 80);
            var sphereGeometry = new THREE.SphereGeometry(80, 32, 32);
            var torusGeometry = new THREE.TorusGeometry(80, 20, 32, 32);

            // texture
            var envMap = new THREE.TextureLoader().load('img/equirecmap.jpg');
            envMap.mapping = THREE.EquirectahgularReflectionMapping;
            envMap.magFilter = THREE.LinearFilter;
            envMap.minFilter = THREE.LinearMipMapLinearFilter;

            var boxMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff
            });
            var redMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000
            });
            var brickMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.9,
                metalness: 0.0,
                map: new THREE.TextureLoader().load('img/brick-albedo.jpg'),
                normalMap: new THREE.TextureLoader().load('img/brick-normal.jpg')
            });
            var goldMaterial = new THREE.MeshStandardMaterial({
                color: 0xffd280,
                roughness: .4,
                metalness: .95,
                envMap: envMap
            });
            var parrotMaterial = new THREE.PointsMaterial({
                map: new THREE.TextureLoader().load('img/parrot.png'),
                alphaTest: .5,
                transparent: true,
                sizeAttention: true,
                size: 20
            });

            // mesh
            this.mesh = new THREE.Mesh(boxGeometry, brickMaterial);
            // this.mesh = new THREE.Mesh(torusGeometry, goldMaterial)
            // this.mesh = new THREE.Points(sphereGeometry, parrotMaterial);

            this.scene.add(this.mesh);
        }
    }, {
        key: 'addLightTo',
        value: function addLightTo() {
            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, 400, 800);
            this.scene.add(directionalLight);

            var ambientLight = new THREE.AmbientLight(0xffffff, .4);
            this.scene.add(ambientLight);
        }
    }, {
        key: 'addCamera',
        value: function addCamera() {
            this.camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
            // this.camera = new THREE.OrthographicCamera(
            //     1, 1, 1, 1,
            //     -500,
            //     10000
            // )
            this.camera.position.set(0, 100, 400);
            // this.camera.position.set(0, 2, 12)
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.scene.add(this.camera);

            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        }
    }, {
        key: 'addGrid',
        value: function addGrid() {
            var gridHelper = new THREE.GridHelper(100, 20);
            this.scene.add(gridHelper);
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.tick.bind(this));
        }
    }, {
        key: 'onWindowResize',
        value: function onWindowResize() {
            var width = this.wrapper.offsetWidth;
            var height = this.wrapper.offsetHeight;

            this.camera.aspect = width / height;

            // when use orthographic camera
            // const scale = 50;
            // this.camera.left = -width/scale;
            // this.camera.top = height/scale;
            // this.camera.right = width/scale;
            // this.camera.bottom = -height/scale;

            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }]);
    return Webgl;
}();

exports.default = new Webgl();

},{"babel-runtime/helpers/classCallCheck":2,"babel-runtime/helpers/createClass":3}],22:[function(require,module,exports){
'use strict';

var _practice_ = require('./lib/practice_04');

var _practice_2 = _interopRequireDefault(_practice_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/practice_04":21}]},{},[22]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ratio = window.devicePixelRatio || 1;

// 1 rendererを作る
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(ratio);

var content = document.querySelector('.content');
var canvas = renderer.domElement;
content.appendChild(canvas);

// 2 sceneを作る
var scene = new THREE.Scene();

// 3 cameraを作る
var camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
camera.position.set(0, 100, 400);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// 4 lightを作る
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 200, 800);
scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0xffffff, .4);
scene.add(ambientLight);

// 5 meshを作る
var boxGeometry = new THREE.BoxGeometry(80, 80, 80);
var boxMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff
});
var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 0, 0);
boxMesh.rotation.y = -20 * Math.PI / 180;
scene.add(boxMesh);

onWindowResize();
window.addEventListener('resize', onWindowResize);
requestAnimationFrame(tick);

function onWindowResize() {
    var width = content.offsetWidth;
    var height = content.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

},{}]},{},[1]);

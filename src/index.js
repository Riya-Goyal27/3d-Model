import './styles/style.scss';
import apple from './assets/apple.glb';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const mobile = document.querySelector('.mobile');
const renderer = new THREE.WebGL1Renderer({
    canvas:mobile
})
renderer.setSize(innerWidth, innerHeight);
renderer.setClearAlpha(0);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/(window.innerHeight),
    0.1,
    1000
);

camera.position.set(0, 0, 1.5);

const loader = new GLTFLoader();
loader.load( apple, function ( glb ) {
    console.log(glb);
    const model = glb.scene;
	scene.add(model);
    model.position.y=-2;

    gsap.to(model.position, {
        y: 0,
        scrollTrigger:{
            trigger:mobile,
            start:"200px top",
            end:"600px top",
            scrub:1,
        }
    } );

    gsap.to(model.rotation, {
        y: 3.15,
        scrollTrigger:{
            trigger:mobile,
            start:"600px top",
            end: "1200px top",
            scrub:1,
        }
    } );

    gsap.to(model.rotation, {
        z: 1.575,
        scrollTrigger:{
            trigger:mobile,
            start:"1200px top",
            end: "1600px top",
            scrub:1,
        }
    } );

    gsap.to(camera.position, {
        z: 0,
        scrollTrigger:{
            trigger:mobile,
            start:"1600px top",
            end: "2100px top",
            scrub:1,
        }
    } );
}, undefined, function ( error ) {
	console.error( error );
} );

const light = new THREE.DirectionalLight(0x9bb5ce, 5);
light.position.set(2, 2, 4);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
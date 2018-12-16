import * as THREE from 'three';
import {TimelineMax} from 'gsap';
let OrbitControls = require('three-orbit-controls')(THREE);

import getText from './getText';


export default class Sketch{
  constructor(selector){
    this.scene =  new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();

    this.renderer.sortObjects = true;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerWidth);

    this.container = document.getElementById('container');
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001, 1000
    );
    this.camera.position.set( 0, 0, 10 );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;


    
    this.setupResize();
    

    this.resize();
    this.addObjects();
    this.animate();

  }

  

  setupResize(){
    window.addEventListener('resize', this.resize.bind(this)); 
  }

  resize(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    this.renderer.setSize( w, h );
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }



  render(){
    this.renderer.render(this.scene, this.camera);
  }





  addObjects(){
    // this.material = new THREE.ShaderMaterial( {
    //   extensions: {
    //       derivatives: '#extension GL_OES_standard_derivatives : enable',
    //   },
    //   side: THREE.DoubleSide,
    //   uniforms: {
    //     time: { type: 'f', value: 0 },
    //     pixels: {type: 'v2', value: new THREE.Vector2(window.innerWidth,window.innerHeight)},
    //     accel: {type: 'v2', value: new THREE.Vector2(0.5,2)},
    //     progress: {type: 'f', value: 0},
    //     texture: {
    //       value: THREE.ImageUtils.loadTexture('img/brush.png')
    //     },
    //     tMatCap: {
    //       type: 't',
    //       value: THREE.ImageUtils.loadTexture( '/img/matcap1.jpg' )
    //     },
    //     uvRate1: {
    //       value: new THREE.Vector2(1,1)
    //     },
    //   },
    //   // wireframe: true,
    //   transparent: true,
    //   vertexShader: vertex,
    //   fragmentShader: fragment
    // });

    // this.material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    // var plane = new THREE.Mesh( new THREE.PlaneGeometry( 5, 5, 32 ), this.material );
    // this.scene.add( plane );



    


    let TextCanvas = new getText();
    TextCanvas.draw();

    let canvasTexture = new THREE.Texture(TextCanvas.canvas);
    canvasTexture.needsUpdate = true;


    let material = new THREE.MeshBasicMaterial( {
    	// color: 0xff0000, 
    	transparent: true,
    	side: THREE.FrontSide,
    	alphaMap: canvasTexture,
    	// map: new THREE.TextureLoader().load('img/1.jpg')
    	map: canvasTexture
    } );

    let material1 = new THREE.MeshBasicMaterial( {
    	color: 0xff0000, 
    	transparent: true,
    	side: THREE.BackSide,
    	alphaMap: canvasTexture,
    	// map: new THREE.TextureLoader().load('img/1.jpg')
    	map: canvasTexture
    } );
    let geometry = new THREE.SphereGeometry( 1,200,200 );


    this.meshText1 = new THREE.Mesh(geometry,material);
    this.meshText2 = new THREE.Mesh(geometry,material1);

    this.meshText1.renderOrder = 2;
    this.meshText2.renderOrder = 1;

    this.meshText1.position.z = -0.01;
    this.scene.add(this.meshText1);
    this.scene.add(this.meshText2);



    let geometry1 = new THREE.CircleGeometry( 1.4, 32 );
    let material3 = new THREE.MeshBasicMaterial( { 
    	color: 0xffff00, 
    	side: THREE.DoubleSide,
    	map: new THREE.TextureLoader().load('img/1.jpg') 
    } );
    this.circle = new THREE.Mesh( geometry1, material3 );
    this.scene.add( this.circle );


  }



  animate(){
    this.time += 0.05;
    // this.material.uniforms.time.value = this.time;

    if(this.circle){
    	this.circle.quaternion.copy(
    		this.camera.quaternion
    	)
    }

    this.meshText1.rotation.y = this.time/10;
    this.meshText2.rotation.y = this.time/10;
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}

new Sketch('container');
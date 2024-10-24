import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MultiLevelAnimationService {

  constructor(private http: HttpClient) { }

  private sphereCamera: any;
  private mLevelCamera: any;
  private swapCamera: any;

  private sphereRenderer = new THREE.WebGLRenderer();
  private swapRenderer = new THREE.WebGLRenderer();
  private mLevelRenderer = new THREE.WebGLRenderer();

  async initMultiLevelAnim(el: any) {
    const vertexShader$ = this.http.get<string>('/assets/shaders/vertexShader.glsl', { responseType: 'text' as 'json' });
    const fragmentShader$ = this.http.get<string>('/assets/shaders/fragmentShader.glsl', { responseType: 'text' as 'json' });
    // const vertexShader = await fetch('vertexShader.glsl').then((res) => res.text());
    // const fragmentShader = await fetch('fragmentShader.glsl').then((res) => res.text());
    combineLatest([vertexShader$, fragmentShader$]).subscribe(([vertexShader, fragmentShader]) => {

      const container = document.getElementById('grid-container');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff)
      this.mLevelCamera = new THREE.PerspectiveCamera(45, /*window.innerWidth / window.innerHeight **/ .68, 1, 10000);
      this.mLevelCamera.position.set(240, 10, 140);
      //camera.lookAt(0, 0, 0); 
      this.mLevelCamera.lookAt(0, 0, -70); // moved the polygons up on the screen
      this.mLevelCamera.rotation.z = THREE.MathUtils.degToRad(45);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          pointTexture: {
            value: new THREE.TextureLoader().load('/assets/images/sprites/circle.png')
          },
          alphaTest: { value: .9 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x222222,
        linewidth: 3,
        transparent: true,
        opacity: 0.4
      });

      const gridSize = 5;
      const gridSpacing = 17;
      const initialZPosition = 70;

      const animationManager = new AnimationManager();
      const polygonGroup0 = new PolygonGroup(scene, gridSize, gridSpacing, initialZPosition, 0, material, edgesMaterial);
      polygonGroup0.animatePointsExpandCollapse(true, 0.25);
      polygonGroup0.pause(3.75);
      // polygonGroup0.animatePointColorChange('#999', .25)
      // polygonGroup0.pause(1.2);
      // polygonGroup0.animatePointColorChange('#1c1', .25)
      polygonGroup0.animatePointsExpandCollapse(false, 0.25);
      polygonGroup0.pause(.5);

      animationManager.addPolygon(polygonGroup0);
      const polygonGroup1 = new PolygonGroup(scene, gridSize, gridSpacing, initialZPosition, 1, material, edgesMaterial);
      polygonGroup1.fadePoints(0, .8)
      polygonGroup1.moveToZ(-70, 0.25);
      polygonGroup1.animatePointsExpandCollapse(true, 0.25);
      polygonGroup1.pause(1.5);
      // polygonGroup1.animatePointColorChange('#1c1', .25)
      polygonGroup1.pause(.9);
      polygonGroup1.animatePointsExpandCollapse(false, 0.25);
      polygonGroup1.pause(0.15);
      polygonGroup1.moveToZ(0, 0.25, -70);
      polygonGroup1.fadePoints(0, 1)
      polygonGroup1.animatePointColorChange('#ffd800', 0)

      animationManager.addPolygon(polygonGroup1);

      const polygonGroup2 = new PolygonGroup(scene, gridSize, gridSpacing, 0, 2, material, edgesMaterial);
      polygonGroup2.pause(.5);
      polygonGroup2.fadePoints(0, .8)
      polygonGroup2.moveToZ(-170, 0.25, -70);
      polygonGroup2.animatePointsExpandCollapse(true, 0.25);

      // polygonGroup2.pause(1);
      // polygonGroup2.animatePointsExpandCollapse(false, 0.25);
      // polygonGroup2.moveToY(-140, 0.5, 0);
      // polygonGroup2.animatePointColorChange('#ffd800', 0)
      // polygonGroup2.moveToY(0, 0.5, 140);
      // polygonGroup2.pause(.1);
      // polygonGroup2.moveToY(-140, 0.5, 0);
      // polygonGroup2.animatePointColorChange('#1c1', 0)
      // polygonGroup2.moveToY(0, 0.5, 140);
      // polygonGroup2.animatePointsExpandCollapse(true, 0.25);
      // polygonGroup2.pause(1.25);

      polygonGroup2.pause(1.25);

      polygonGroup2.animatePointsExpandCollapse(false, 0.25);
      // polygonGroup2.pause(0.25);


      polygonGroup2.moveToZ(-70, 0.25, -170);
      // polygonGroup2.pause(1.42);
      polygonGroup2.animatePointColorChange('#f00', 0)
      polygonGroup2.fadePoints(0.5, 10)
      animationManager.addPolygon(polygonGroup2);

      // this.mLevelRenderer = new THREE.WebGLRenderer();
      this.mLevelRenderer.setSize(665, 700);//window.innerWidth, window.innerHeight);
      el.appendChild(this.mLevelRenderer.domElement);

      const _this = this;


      // window.addEventListener('resize', () => onWindowResize(camera, renderer));

      function animate() {
        requestAnimationFrame(animate);
        // if (!resetInitiated) {
        // this is a hack, it shouldn't be called every frame, it should be called once
        // but it only works this way
        animationManager.initializeReset();
        // resetInitiated = true;
        // }
        animationManager.animate();
        _this.mLevelRenderer.render(scene, _this.mLevelCamera);
      }



      // let resetInitiated = false;
      animate();
    });
  }







  async initMSwapProjAnim(el: any) {
    const vertexShader$ = this.http.get<string>('/assets/shaders/vertexShader.glsl', { responseType: 'text' as 'json' });
    const fragmentShader$ = this.http.get<string>('/assets/shaders/fragmentShader.glsl', { responseType: 'text' as 'json' });
    // const vertexShader = await fetch('vertexShader.glsl').then((res) => res.text());
    // const fragmentShader = await fetch('fragmentShader.glsl').then((res) => res.text());
    combineLatest([vertexShader$, fragmentShader$]).subscribe(([vertexShader, fragmentShader]) => {

      const container = document.getElementById('grid-container');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff)
      this.swapCamera = new THREE.PerspectiveCamera(45, /*window.innerWidth / window.innerHeight **/ .68, 1, 10000);
      this.swapCamera.position.set(210, 10, 160);
      //camera.lookAt(0, 0, 0); 
      this.swapCamera.lookAt(0, 0, -70); // moved the polygons up on the screen
      this.swapCamera.rotation.z = THREE.MathUtils.degToRad(45);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          pointTexture: {
            value: new THREE.TextureLoader().load('/assets/images/sprites/circle.png')
          },
          alphaTest: { value: .9 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x222222,
        linewidth: 3,
        transparent: true,
        opacity: 0.4
      });

      const gridSize = 5;
      const gridSpacing = 20;
      const initialZPosition = 70;

      const animationManager = new AnimationManager();
      // const polygonGroup0 = new PolygonGroup(scene, gridSize, gridSpacing, initialZPosition, 0, material, edgesMaterial);
      // polygonGroup0.animatePointsExpandCollapse(true, 0.25);
      // polygonGroup0.pause(5.75);
      // polygonGroup0.animatePointsExpandCollapse(false, 0.25);
      // polygonGroup0.pause(.5);

      // animationManager.addPolygon(polygonGroup0);
      const polygonGroup1 = new PolygonGroup(scene, gridSize, gridSpacing, initialZPosition, 1, material, edgesMaterial);
      polygonGroup1.animatePointColorChange('#ffd800', 0)
      polygonGroup1.fadePoints(0, .8)
      polygonGroup1.moveToZ(-15, 0);
      polygonGroup1.animatePointsExpandCollapse(true, 0.25);
      polygonGroup1.pause(3.5);
      // polygonGroup1.animatePointColorChange('#1c1', .25)
      
      polygonGroup1.pause(4.3); //1.5);
      polygonGroup1.animatePointColorChange('#1c1', .25)
      polygonGroup1.pause(0.25)
      polygonGroup1.animatePointsExpandCollapse(false, 0.25);
      polygonGroup1.pause(.15);
      // polygonGroup1.moveToZ(0, 0.25, -70);
      polygonGroup1.fadePoints(0, 1)
     
      

      animationManager.addPolygon(polygonGroup1);

      const polygonGroup2 = new PolygonGroup(scene, gridSize, gridSpacing, 0, 2, material, edgesMaterial);
      polygonGroup2.animatePointColorChange('#f00', 0)
      polygonGroup2.pause(.5);
      polygonGroup2.fadePoints(0, .8)
      polygonGroup2.moveToZ(-105, 0.25, -70);
      polygonGroup2.animatePointsExpandCollapse(true, 0.25);




      polygonGroup2.pause(.5);
      polygonGroup2.animatePointsExpandCollapse(false, 0.25); // comment this
      polygonGroup2.moveToY(-140, 0.8, 0);
      polygonGroup2.animatePointColorChange('#ffd800', 0)
      polygonGroup2.moveToY(0, 0.8, 140);
      polygonGroup2.animatePointsExpandCollapse(true, 0.2);
      polygonGroup2.pause(.7);
      polygonGroup2.animatePointsExpandCollapse(false, 0.2);
      polygonGroup2.moveToY(-140, 0.8, 0);
      polygonGroup2.animatePointColorChange('#1c1', 0)
      polygonGroup2.moveToY(0, 0.8, 140);
      polygonGroup2.animatePointsExpandCollapse(true, 0.25); // comment this
      polygonGroup2.pause(.75);





      // polygonGroup2.pause(3.25);

      polygonGroup2.animatePointsExpandCollapse(false, 0.25);
      // polygonGroup2.pause(0.25);


      polygonGroup2.moveToZ(-15, 0.25, -105);
      // polygonGroup2.pause(1.42);
      polygonGroup2.fadePoints(0, 0);
      // polygonGroup2.fadePoints(0.5, 10)
      animationManager.addPolygon(polygonGroup2);

      // this.swapRenderer = new THREE.WebGLRenderer();
      this.swapRenderer.setSize(665, 700);//window.innerWidth, window.innerHeight);
      el.appendChild(this.swapRenderer.domElement);




      // window.addEventListener('resize', () => onWindowResize(camera, renderer));
      const _this = this;
      function animate() {
        requestAnimationFrame(animate);
        // if (!resetInitiated) {
        // this is a hack, it shouldn't be called every frame, it should be called once
        // but it only works this way
        animationManager.initializeReset();
        // resetInitiated = true;
        // }
        animationManager.animate();
        _this.swapRenderer.render(scene, _this.swapCamera);
      }



      // let resetInitiated = false;
      animate();
    });
  }








  onWindowResize(newWidth: number, newHeight: number): void {
    // this.mLevelCamera.aspect = newWidth / newHeight;
    // this.mLevelCamera.updateProjectionMatrix();

    // this.swapCamera.aspect = newWidth / newHeight;
    // this.swapCamera.updateProjectionMatrix();


    // this.sphereCamera.aspect = newWidth / newHeight;
    // this.sphereCamera.updateProjectionMatrix();


    // // // this.mLevelRenderer.setSize(newWidth, newHeight);
    // // // this.swapRenderer.setSize(newWidth, newHeight);
    // // this.sphereRenderer.setSize(newWidth, newWidth / 2); //newHeight);


    // // this.swapRenderer.setSize(newWidth, newWidth / 2);
    this.setBreakpoints(newWidth, newHeight);


  //   const newHeight2 = newWidth * (9 / 16);  // Adjust the ratio as per your design (16:9 is typical)

  // // Update camera aspect ratio based on width and proportional height
  // this.sphereCamera.aspect = newWidth / newHeight2;
  // console.log('newWidth', newWidth, 'newHeight', newHeight2)
  // this.setBreakpoints(newWidth, newHeight);
 
  }



  initSphereAnim(el: any) {
    // Fetch shaders as text
    const vertexShader$ = this.http.get<string>('/assets/shaders/vertexShader.glsl', { responseType: 'text' as 'json' });
    const fragmentShader$ = this.http.get<string>('/assets/shaders/fragmentShader.glsl', { responseType: 'text' as 'json' });
    // const vertexShader = await fetch('vertexShader.glsl').then((res) => res.text());
    // const fragmentShader = await fetch('fragmentShader.glsl').then((res) => res.text());
    combineLatest([vertexShader$, fragmentShader$]).subscribe(([vertexShader, fragmentShader]) => {
      console.log('chaders', vertexShader, fragmentShader)
    // Get container and create the scene
    const container = document.getElementById('container') as HTMLElement;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
  
    // Setup camera
    this.sphereCamera = new THREE.PerspectiveCamera(45, /*window.innerWidth / window.innerHeight*/ 16/9, 1, 10000);
    this.sphereCamera.position.set(250, 10, 250);
    this.sphereCamera.lookAt(0, 0, -70);
    this.sphereCamera.rotation.z = THREE.MathUtils.degToRad(45);
  
    // Edges material
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0xbbbbbb, // Lighter gray for edges
      linewidth: 2,
      transparent: true,
      opacity: 0.5,
    });
  
    // Create particle sphere
    const createParticleSphere = (
      radius: number,
      latSegments: number,
      lonSegments: number,
      color: THREE.Color
    ): THREE.Group => {
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      const edges: number[] = [];
  
      for (let i = 0; i <= latSegments; i++) {
        const theta = (i * Math.PI) / latSegments; // Latitude angle
  
        for (let j = 0; j <= lonSegments; j++) {
          const phi = (j * 2 * Math.PI) / lonSegments; // Longitude angle
  
          const x = radius * Math.sin(theta) * Math.cos(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(theta);
  
          positions.push(x, y, z);
  
          // Connect this point to the previous one along the same latitude
          if (j > 0) {
            edges.push(
              positions[(i * (lonSegments + 1) + j - 1) * 3], // Previous longitude
              positions[(i * (lonSegments + 1) + j - 1) * 3 + 1],
              positions[(i * (lonSegments + 1) + j - 1) * 3 + 2],
              x,
              y,
              z
            );
          }
  
          // Connect this point to the previous one along the same longitude
          if (i > 0) {
            edges.push(
              positions[((i - 1) * (lonSegments + 1) + j) * 3], // Previous latitude
              positions[((i - 1) * (lonSegments + 1) + j) * 3 + 1],
              positions[((i - 1) * (lonSegments + 1) + j) * 3 + 2],
              x,
              y,
              z
            );
          }
        }
      }
  
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
      // Create particle points
      // const particleMaterial = new THREE.PointsMaterial({
      //   color: color,
      //   size: 5,
      //   sizeAttenuation: true,
      //   transparent: true,
      //   opacity: 0.8,
      // });

      const textureLoader = new THREE.TextureLoader();
      const circleTexture = textureLoader.load('/assets/images/sprites/circle.png'); //https://threejs.org/examples/textures/sprites/circle.png');

      // Create PointsMaterial with the texture
      const particleMaterial = new THREE.PointsMaterial({
        color,
        map: circleTexture,   // Use the circular texture
        size: 5,              // Set particle size
        transparent: true,    // Enable transparency (for the texture)
        alphaTest: 0.5,       // Remove pixels with alpha less than 0.5 (optional)
        depthTest: true,      // Ensure correct depth sorting
      });

      // const particleMaterial = new THREE.ShaderMaterial({
      //   uniforms: {
      //     color: { value: new THREE.Color(0xaaaaaa) }
      //   },
      //   vertexShader: vertexShader,
      //   fragmentShader: fragmentShader,
      //   // transparent: true,
      //   depthTest: true, // Ensure particles are depth-tested
      //   depthWrite: true, // Ensure depth buffer is updated
      //   alphaTest: 0.9,  // Discard fragments with low alpha (if applicable)
      // });



      // const particleMaterial = new THREE.ShaderMaterial({
      //   uniforms: {
      //     color: { value: color },
      //     pointTexture: {
      //       value: new THREE.TextureLoader().load('/assets/images/sprites/circle.png') //'/assets/textures/circle.png'), // Circular texture
      //     },
      //   },
      //   vertexShader: vertexShader,
      //   fragmentShader: fragmentShader,
      //   // transparent: true,
      //   alphaTest: 0.5, // Helps with transparent particles
      // });



      // const material = new THREE.ShaderMaterial({
      //   uniforms: {
      //     color: { value: new THREE.Color(0xffffff) },
      //     pointTexture: {
      //       value: new THREE.TextureLoader().load('/assets/images/sprites/circle.png')
      //     },
      //     alphaTest: { value: .9 }
      //   },
      //   vertexShader: vertexShader,
      //   fragmentShader: fragmentShader
      // });



  
      const particles = new THREE.Points(geometry, particleMaterial);
  
      // Create edges
      const edgeGeometry = new THREE.BufferGeometry();
      edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3));
      const lineSegments = new THREE.LineSegments(edgeGeometry, edgesMaterial);
  
      const group = new THREE.Group();
      group.add(particles); // Add particles to the group
      group.add(lineSegments); // Add edges to the group
  
      return group;
    };
  
    // Create spheres with progressively lighter colors
    const sphere1 = createParticleSphere(200, 12, 24, new THREE.Color(0xaaaaaa)); // Starting with light gray
  
    scene.add(sphere1);
  
    // Setup renderer
    // this.sphereRenderer = new THREE.WebGLRenderer();
    // this.sphereRenderer.setSize(2200, 1100);
    
    // this.sphereRenderer.setSize(window.innerWidth, window.innerHeight);
    // this.setBreakpoints(window.innerHeight, window.innerHeight);


    const initialWidth = window.innerWidth;
    const initialHeight = initialWidth * (9 / 16); // Proportional height based on width
  
    // Set initial renderer size based on width
   // this.sphereRenderer.setSize(initialWidth, initialHeight,  false);
    this.setBreakpoints(initialWidth, initialHeight)
    this.sphereRenderer.domElement.classList.add('threejs-canvas');
    el.appendChild(this.sphereRenderer.domElement);
  
    // Handle window resize
    // window.addEventListener('resize', () => onWindowResize(camera, renderer));
    const _this = this;
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
  
      // Rotate spheres
      sphere1.rotation.y += 0.004;
  
      _this.sphereRenderer.render(scene, _this.sphereCamera);
    }
  
    animate();
    });
  }



  // setBreakpoints(newWidth: number, newHeight: number): void {
  //   // Adjust visualization size based on window width breakpoints
  //   if (newWidth < 768) {
  //     // Small screen (mobile)
  //     this.sphereRenderer.setSize(newWidth * 0.8, newHeight * 0.5, false);
  //   } else if (newWidth >= 768 && newWidth < 1200) {
  //     // Medium screen (tablet)
  //     this.sphereRenderer.setSize(newWidth * 0.9, newHeight * 0.7, false);
  //   } else {
  //     // Large screen (desktop)
  //     this.sphereRenderer.setSize(newWidth, newHeight),  false;
  //   }
  // }


  currentBreakpoint: string | null = null;

  setBreakpoints(newWidth: number, newHeight: number): void {
    let newBreakpoint: string;
  
    // Determine the breakpoint range based on the window width
    if (newWidth < 768) {
      newBreakpoint = 'small';  // Small screen (mobile)
    } else if (newWidth >= 768 && newWidth < 1200) {
      newBreakpoint = 'medium';  // Medium screen (tablet)
    } else if (newWidth >= 1200 && newWidth < 1600) {
      newBreakpoint = 'large';  // Large screen (desktop)
    } else {
      newBreakpoint = 'xlarge';  // Large screen (desktop)
    }
  
    // Only apply changes if the new breakpoint is different from the current one
    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;  // Update the current breakpoint
  
      // Apply fixed sizes for each breakpoint
      switch (newBreakpoint) {
        case 'small':
          // Small screen (mobile)
          this.sphereRenderer.setSize(500, 300, false);  // Use fixed width and height for mobile
          break;
        case 'medium':
          // Medium screen (tablet)
          this.sphereRenderer.setSize(1200, 600, false);  // Use fixed size for tablet
          break;
        case 'large':
            // Large screen (desktop)
            this.sphereRenderer.setSize(1600, 800, false);  // Use fixed size for desktop
            break;
        case 'xlarge':
          // Large screen (desktop)
          this.sphereRenderer.setSize(2100, 1200, false);  // Use fixed size for desktop
          break;
      }
    }
  }

}


class AnimationStep {
  start: number;
  end: number;
  duration: number;
  action: (value: number) => void;
  startTime: number | null;

  constructor(start: number, end: number, duration: number, action: (value: number) => void) {
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.action = action;
    this.startTime = null;
  }

  reset() {
    this.startTime = null;
  }

  update(currentTime: number): boolean {
    if (this.startTime === null) {
      this.startTime = currentTime;
    }
    const elapsed = (currentTime - this.startTime) / 1000;
    const progress = Math.min(elapsed / this.duration, 1);

    // Interpolate between start and end
    const interpolatedValue = THREE.MathUtils.lerp(this.start, this.end, progress);

    this.action(interpolatedValue);

    return progress >= 1;
  }
}

class AnimationSequence {
  steps: AnimationStep[];
  currentStepIndex: number;
  markForResetCallback: ((reset: boolean) => void) | null;

  constructor() {
    this.steps = [];
    this.currentStepIndex = 0;
    this.markForResetCallback = null;
  }

  addStep(step: AnimationStep) {
    this.steps.push(step);
  }

  update(currentTime: number) {
    if (this.currentStepIndex < this.steps.length) {
      const stepCompleted = this.steps[this.currentStepIndex].update(currentTime);
      if (stepCompleted) {
        this.currentStepIndex++;
      }
    } else {
      if (this.markForResetCallback) {
        // This resets the animation from the parent if all polygons have completed their sequences
        this.markForResetCallback(true);
      }
    }
  }

  reset() {
    this.currentStepIndex = 0;
    this.steps.forEach((step) => step.reset());
  }

  isComplete(): boolean {
    return this.currentStepIndex >= this.steps.length;
  }

  setMarkForResetCallback(callback: (reset: boolean) => void) {
    this.markForResetCallback = callback;
  }
}

// import * as THREE from 'three';
// import Stats from 'three/addons/libs/stats.module.js';
// import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';



class PolygonGroup {
  scene: THREE.Scene;
  gridSize: number;
  gridSpacing: number;
  index: number;
  material: THREE.Material;
  edgesMaterial: THREE.Material;
  group: THREE.Group;
  positions: number[];
  finalPositions: number[];
  colors: number[];
  sizes: number[];
  edges: number[];
  finalEdges: number[];
  points!: THREE.Points;
  lines!: THREE.LineSegments;
  geometry!: THREE.BufferGeometry;
  edgesGeometry!: THREE.BufferGeometry;
  animationSequence: AnimationSequence;

  constructor(
    scene: THREE.Scene,
    gridSize: number,
    gridSpacing: number,
    zPosition: number,
    index: number,
    material: THREE.Material,
    edgesMaterial: THREE.Material
  ) {
    this.scene = scene;
    this.gridSize = gridSize;
    this.gridSpacing = gridSpacing;
    this.index = index;
    this.material = material.clone();
    this.edgesMaterial = edgesMaterial.clone();

    this.group = new THREE.Group();
    this.positions = [];
    this.finalPositions = [];
    this.colors = [];
    this.sizes = [];
    this.edges = [];
    this.finalEdges = [];
    this.createPolygons();
    this.scene.add(this.group);

    this.animationSequence = new AnimationSequence();
  }

  createPolygons() {
    const color = new THREE.Color();
    let vertexColor: THREE.Color;
    if (this.index === 0) {
      vertexColor = new THREE.Color('#1c1'); // Greenish color
    } else if (this.index === 1) {
      vertexColor = new THREE.Color('#ffd800'); // Yellow color
    } else if (this.index === 2) {
      vertexColor = new THREE.Color('#f00'); // Red color
    } else {
      vertexColor = new THREE.Color('#aaa'); // Default to white if index is not 0, 1, or 2
    }
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const colorCycleMutl = 10;
        const x = (i - (this.gridSize - 1) / 2) * this.gridSpacing;
        const y = (j - (this.gridSize - 1) / 2) * this.gridSpacing;
        const idx = i * colorCycleMutl * this.gridSize + j;

        this.finalPositions.push(x, y, 0); // Default to center z-position (0)

        if (this.index === 0) {
          this.positions.push(x, y, 0);
        } else {
          this.positions.push(0, 0, 0);
        }
        color.setHSL(120 / 360, 0.8, 0.43);
        vertexColor.toArray(this.colors, this.colors.length);
        this.sizes.push(11);

        if (i < this.gridSize - 1) {
          this.finalEdges.push(x, y, 0, x + this.gridSpacing, y, 0);
          this.edges.push(x, y, 0, x, y, 0);
        }
        if (j < this.gridSize - 1) {
          this.finalEdges.push(x, y, 0, x, y + this.gridSpacing, 0);
          this.edges.push(x, y, 0, x, y, 0);
        }
        if (i < this.gridSize - 1 && j < this.gridSize - 1) {
          this.finalEdges.push(x + this.gridSpacing, y, 0, x + this.gridSpacing, y + this.gridSpacing, 0);
          this.edges.push(x, y, 0, x, y, 0);
          this.finalEdges.push(x, y + this.gridSpacing, 0, x + this.gridSpacing, y + this.gridSpacing, 0);
          this.edges.push(x, y, 0, x, y, 0);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(this.colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(this.sizes, 1));
    this.points = new THREE.Points(geometry, this.material);

    const edgesGeometry = new THREE.BufferGeometry();
    edgesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.edges, 3));
    this.lines = new THREE.LineSegments(edgesGeometry, this.edgesMaterial);

    this.group.add(this.points);
    this.group.add(this.lines);

    this.geometry = geometry;
    this.edgesGeometry = edgesGeometry;
  }

  moveToZ(targetZ: number, duration: number, startZx: number | null = null) {
    const startZ = startZx !== null ? startZx : this.group.position.z; // Capture the current Z position at the start of the animation
    this.animationSequence.addStep(
      new AnimationStep(
        startZ, // Start Z position
        targetZ, // Target Z position
        duration,
        (interpolatedZ) => {
          // Interpolate the Z position between startZ and targetZ
          this.group.position.z = interpolatedZ;
        }
      )
    );
  }

  moveToY(targetZ: number, duration: number, startZx: number | null = null) {
    const startZ = startZx !== null ? startZx : this.group.position.z; // Capture the current Z position at the start of the animation
    this.animationSequence.addStep(
      new AnimationStep(
        startZ, // Start Z position
        targetZ, // Target Z position
        duration,
        (interpolatedZ) => {
          // Interpolate the Z position between startZ and targetZ
          this.group.position.y = interpolatedZ;
        }
      )
    );
  }

  pause(duration: number) {
    this.animationSequence.addStep(
      new AnimationStep(this.group.position.z, this.group.position.z, duration, () => { })
    );
  }

  animatePointsExpandCollapse(expand: boolean, duration: number) {
    this.animationSequence.addStep(
      new AnimationStep(expand ? 0 : 1, expand ? 1 : 0, duration, (interpolatedValue) => {
        const positionsAttr = this.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
        const edgesAttr = this.edgesGeometry.getAttribute('position') as THREE.BufferAttribute | undefined;

        if (positionsAttr && edgesAttr) {
          const positions = positionsAttr.array;
          const edges = edgesAttr.array;

          for (let i = 0; i < this.finalPositions.length; i += 3) {
            positions[i] = this.finalPositions[i] * interpolatedValue;
            positions[i + 1] = this.finalPositions[i + 1] * interpolatedValue;
          }
          positionsAttr.needsUpdate = true;

          for (let i = 0; i < this.finalEdges.length; i += 6) {
            edges[i] = this.finalEdges[i] * interpolatedValue;
            edges[i + 1] = this.finalEdges[i + 1] * interpolatedValue;
            edges[i + 2] = this.finalEdges[i + 2];

            edges[i + 3] = this.finalEdges[i + 3] * interpolatedValue;
            edges[i + 4] = this.finalEdges[i + 4] * interpolatedValue;
            edges[i + 5] = this.finalEdges[i + 5];
          }
          edgesAttr.needsUpdate = true;
        }
      })
    );
  }

  fadePoints(duration: number, targetAlpha: number = 1.0) {
    const startAlpha = (this.material as any).uniforms.alphaTest.value; // Get the current alpha value

    this.animationSequence.addStep(
      new AnimationStep(0, 1, duration, (interpolatedValue) => {
        // Interpolate the alpha value
        const interpolatedAlpha = THREE.MathUtils.lerp(startAlpha, targetAlpha, interpolatedValue);

        // Set the alphaTest uniform to the interpolated alpha value
        (this.material as any).uniforms.alphaTest.value = interpolatedAlpha;

        this.material.needsUpdate = true; // Ensure the material is updated with the new alpha value
      })
    );
  }















  animatePointColorChange(targetColorHex: string | null = null, duration: number, targetAlpha: number = 0.4) {
    const startColors = this.colors.slice(); // Make a copy of the current colors
    const startAlpha = (this.material as any).uniforms.alphaTest.value; // Get the current alpha value

    this.animationSequence.addStep(
      new AnimationStep(0, 1, duration, (interpolatedValue) => {
        if (targetColorHex !== null) {
          const targetColor = new THREE.Color(targetColorHex); // Convert the target color from hex to THREE.Color
          const colors = this.geometry.getAttribute('customColor')!.array;

          for (let i = 0; i < this.colors.length; i += 3) {
            // Calculate the interpolated color
            const startColor = new THREE.Color(startColors[i], startColors[i + 1], startColors[i + 2]);
            const interpolatedColor = startColor.lerp(targetColor, interpolatedValue);

            // Apply the interpolated color to the array
            interpolatedColor.toArray(colors, i);
          }

          (this.geometry.attributes as any).customColor.needsUpdate = true; // Mark the color attribute for update
        }

        // Uncomment if you want to interpolate the alpha value
        // const interpolatedAlpha = THREE.MathUtils.lerp(startAlpha, targetAlpha, interpolatedValue);

        // Set the alphaTest uniform to the interpolated alpha value
        // this.material.uniforms.alphaTest.value = interpolatedAlpha;

        this.material.needsUpdate = true; // Ensure the material is updated with the new alpha value
      })
    );
  }

  update(currentTime: number) {
    this.animationSequence.update(currentTime);

    // if (this.index % 2 === 0) {
    this.group.rotation.z += 0.01;
    // } else {
    //     this.group.rotation.z -= 0.01;
    // }
  }
}

class AnimationManager {
  polygons: PolygonGroup[];
  startTime: number;

  constructor() {
    this.polygons = [];
    this.startTime = Date.now();
  }

  addPolygon(polygonGroup: PolygonGroup) {
    this.polygons.push(polygonGroup);
  }

  animate() {
    const currentTime = Date.now();
    this.polygons.forEach((polygon) => polygon.update(currentTime));
  }

  initializeReset() {
    let numResets = 0;
    this.polygons.forEach((poly) => {
      poly.animationSequence.setMarkForResetCallback((reset: boolean) => {
        if (reset) {
          numResets++;
          if (numResets === this.polygons.length) {
            this.polygons.forEach((polygon) => polygon.animationSequence.reset());
            numResets = 0;
          }
        }
      });
    });
  }
}



// async function init2() {
//   const vertexShader = await fetch('vertexShader.glsl').then((res) => res.text());
//   const fragmentShader = await fetch('fragmentShader.glsl').then((res) => res.text());

//   const container = document.getElementById('container');
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xffffff);

//   const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
//   camera.position.set(250, 10, 250);
//   camera.lookAt(0, 0, -70);
//   camera.rotation.z = THREE.MathUtils.degToRad(45);

//   const edgesMaterial = new THREE.LineBasicMaterial({
//     color: 0xbbbbbb,  // Lighter gray for edges
//     linewidth: 2,
//     transparent: true,
//     opacity: 0.5
//   });

//   const createParticleSphere = (radius, latSegments, lonSegments, color) => {
//     const geometry = new THREE.BufferGeometry();
//     const positions = [];
//     const edges = [];

//     for (let i = 0; i <= latSegments; i++) {
//       const theta = (i * Math.PI) / latSegments; // Latitude angle

//       for (let j = 0; j <= lonSegments; j++) {
//         const phi = (j * 2 * Math.PI) / lonSegments; // Longitude angle

//         const x = radius * Math.sin(theta) * Math.cos(phi);
//         const y = radius * Math.sin(theta) * Math.sin(phi);
//         const z = radius * Math.cos(theta);

//         positions.push(x, y, z);

//         // Connect this point to the previous one along the same latitude
//         if (j > 0) {
//           edges.push(
//             positions[(i * (lonSegments + 1) + j - 1) * 3],     // Previous longitude
//             positions[(i * (lonSegments + 1) + j - 1) * 3 + 1],
//             positions[(i * (lonSegments + 1) + j - 1) * 3 + 2],
//             x, y, z
//           );
//         }

//         // Connect this point to the previous one along the same longitude
//         if (i > 0) {
//           edges.push(
//             positions[((i - 1) * (lonSegments + 1) + j) * 3],     // Previous latitude
//             positions[((i - 1) * (lonSegments + 1) + j) * 3 + 1],
//             positions[((i - 1) * (lonSegments + 1) + j) * 3 + 2],
//             x, y, z
//           );
//         }
//       }
//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

//     // Create particle points
//     const particleMaterial = new THREE.PointsMaterial({
//       color: color,
//       size: 5,
//       sizeAttenuation: true,
//       transparent: true,
//       opacity: 0.8
//     });

//     const particles = new THREE.Points(geometry, particleMaterial);

//     // Create edges
//     const edgeGeometry = new THREE.BufferGeometry();
//     edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3));
//     const lineSegments = new THREE.LineSegments(edgeGeometry, edgesMaterial);

//     const group = new THREE.Group();
//     group.add(particles);     // Add particles to the group
//     group.add(lineSegments);  // Add edges to the group

//     return group;
//   };

//   // Create spheres with progressively lighter colors and matching lighter edges
//   const sphere1 = createParticleSphere(200, 12, 24, new THREE.Color(0xaaaaaa)); // Starting with light gray
//   // const sphere2 = createParticleSphere(150, 12, 24, new THREE.Color(0xcccccc)); // Lighter
//   // const sphere3 = createParticleSphere(100, 12, 24, new THREE.Color(0xeeeeee)); // Lightest

//   scene.add(sphere1);
//   // scene.add(sphere2);
//   // scene.add(sphere3);

//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   container.appendChild(renderer.domElement);

//   window.addEventListener('resize', () => onWindowResize(camera, renderer));

//   function animate() {
//     requestAnimationFrame(animate);

//     // Rotate spheres at different speeds
//     sphere1.rotation.y += 0.01;
//     // sphere2.rotation.y -= 0.015;
//     // sphere3.rotation.y += 0.02;

//     renderer.render(scene, camera);
//   }
//   animate();
// }

// // function onWindowResize(camera, renderer) {
// //   camera.aspect = window.innerWidth / window.innerHeight;
// //   camera.updateProjectionMatrix();
// //   renderer.setSize(window.innerWidth, window.innerHeight);
// // }


// function onWindowResize(camera, renderer) {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// init();

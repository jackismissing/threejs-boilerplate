var Scene = (function() {
	
	/*******************************
	 * Properties
	 * 
	 ******************************/

	// Scene-related lements
	var Assets = {
		scene       : 'scene',
		camera      : 'camera',
		renderer    : 'renderer',
		ambienLight : 'ambienLight'
	};

	// Mesh elements
	var Meshes = {
		cube : 'cubeMesh'
	};

	// Global elements
	var Globals = {
		fps      : 60, // Our custom fps
		now      : 'now',
		then     : Date.now(),
		interval : 1000,
		delta    : 'delta',
		clock    : 'clock'
	};

	// Utility elements
	var Utils = {
		toRad : toRad
	};

	/*******************************
	 * Init functions
	 * 
	 ******************************/

	var init = function() {
		// Init clock to manualy set the FPS
		Globals.clock = new THREE.Clock();
		Globals.interval = Globals.interval/Globals.fps;

		initScene();
		initLights();
		initMeshes();

		renderScene();
	};

	function initScene() {
		Assets.scene  = new THREE.Scene();
		Assets.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
		Assets.camera.position.set(0,0,20);
		Assets.camera.lookAt(new THREE.Vector3(0,0,0));

		Assets.renderer = new THREE.WebGLRenderer();
		Assets.renderer.setSize( window.innerWidth, window.innerHeight );
		Assets.renderer.setClearColorHex( 0xdddddd	, 1 );
		
		document.body.appendChild( Assets.renderer.domElement );
	}

	function initLights() {
		Assets.ambienLight = new THREE.AmbientLight( 0xffffff );
		Assets.scene.add(Assets.ambienLight);
	}

	function initMeshes() {
		// Init cube
		var cubeGeo = new THREE.CubeGeometry(1,1,1);
		var cubeMaterial = new THREE.MeshNormalMaterial({wireframe: true});
		Meshes.cube = new THREE.Mesh(cubeGeo, cubeMaterial);
		Assets.scene.add(Meshes.cube);
	}

	/*******************************
	 * Update functions
	 * 
	 ******************************/

	// Render scene with custom FPS
	function renderScene() {
		requestAnimationFrame(renderScene);

		// TODO: ADD CREDITS HERE
		// get the time ellapsed between last frame and now
		var elapsedTime = Globals.clock.getDelta();
		Globals.now = Date.now();
    	Globals.delta = Globals.now - Globals.then;
     
    	// Do stuff in the FPS interval
    	if (Globals.delta > Globals.interval) {
	        // update time stuffs
	         
	        // Just `then = now` is not enough.
	        // Lets say we set fps at 10 which means
	        // each frame must take 100ms
	        // Now frame executes in 16ms (60fps) so
	        // the loop iterates 7 times (16*7 = 112ms) until
	        // delta > interval === true
	        // Eventually this lowers down the FPS as
	        // 112*10 = 1120ms (NOT 1000ms).
	        // So we have to get rid of that extra 12ms
	        // by subtracting delta (112) % interval (100).
	        // Hope that makes sense.
	        Globals.then = Globals.now - (Globals.delta % Globals.interval);
	         
			updateMeshes();
			Assets.renderer.render( Assets.scene, Assets.camera );
	    }
	}

	function updateMeshes() {
		updateCube();
	}

	function updateCube() {
		// Rotate cube by 0.5 degree each of every frame
		Meshes.cube.rotation.x += toRad(1);
		Meshes.cube.rotation.z += toRad(1);
	}

	/*******************************
	 * Utils 
	 * 
	 ******************************/
	
	// Converts degrees to radians
	function toRad(degrees) {
		return degrees * Math.PI/180;
	};

	/*******************************
	 * API
	 * 
	 ******************************/

	return {
		init : init
	}
})();
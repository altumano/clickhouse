var container, controls;
var camera, scene, renderer;

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.x = 50;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(0, 0, 0);
	camera.up.set(0, 0, 1);

	controls = new THREE.TrackballControls( camera );

	scene = new THREE.Scene();
	scene.add( new THREE.HemisphereLight() );

	var light = new THREE.PointLight( 0xffeedd );
	light.position.set( 10, 10, 10 );
	scene.add( light );

	//3ds files dont store normal maps
	var loader = new THREE.TextureLoader();
	var normal = loader.load( 'js/examples/models/3ds/portalgun/textures/normal.jpg' );

	var loader = new THREE.TDSLoader( );
	loader.setPath( 'js/examples/models/3ds/portalgun/textures/' );
	//var modelFile = 'js/examples/models/3ds/portalgun/portalgun.3ds'; 
	var modelFile = 'Testmodel.3ds'; 
	loader.load( modelFile, function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.normalMap = normal;
			}

		} );
		scene.add( object );
		

	});

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	window.addEventListener( 'resize', resize, false );

}

function resize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	controls.update();
	renderer.render( scene, camera );

	requestAnimationFrame( animate );

}
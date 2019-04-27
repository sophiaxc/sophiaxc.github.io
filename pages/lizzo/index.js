var Pulse = function(hertz, fn) {
  if (!fn) fn = Math.sin;
  return function(min, max) {
    if (!min) min = 0;
    if (!max) max = 1;
    return (
      min +
      0.5 * (1 + fn((2 * Math.PI * hertz * new Date()) / 1000)) * (max - min)
    );
  };
};

var Actor = function(options = {}) {
  var self = this;
  options = options || {};
  var cadence = options.cadence || 1.4;
  this.element = new THREE.Group();
  this.element.position.x = options.x || 0;
  this.element.position.y = options.y || 0;
  this.element.position.z = options.z || 0;
  self.options = options;

  var materials = {
    white: new THREE.MeshLambertMaterial({
      color: 0xffffff,
      shading: THREE.FlatShading
    }),
    black: new THREE.MeshLambertMaterial({
      color: 0x000000,
      shading: THREE.FlatShading
    }),
    skin: new THREE.MeshLambertMaterial({
      color: options.color,
      shading: THREE.FlatShading
    }),
    lips: new THREE.MeshLambertMaterial({
      color: 0xff3344,
      shading: THREE.FlatShading
    }),
    shirt: new THREE.MeshLambertMaterial({
      color: options.shirt,
      shading: THREE.FlatShading
    })
  };

  var headPosition = { x: 0, y: 285, z: 20 };
  var head = (this.head = new THREE.Group());
  head.position.set(headPosition.x, headPosition.y, headPosition.z);
  var bodyPosition = { x: -100, y: 0, z: 0 };
  var body = (this.body = new THREE.Group());
  body.position.set(bodyPosition.x, bodyPosition.y, bodyPosition.z);

  function initHead() {
    var bonce = new THREE.Mesh(
      new THREE.SphereGeometry(55, 500, 60),
      materials.skin
    );
    head.add(bonce);
    //
    var leftEye = new THREE.Mesh(
      new THREE.CircleGeometry(5, 10, 50),
      materials.black
    );
    leftEye.position.set(-20, 25, 61);
    var rightEye = leftEye.clone();
    rightEye.position.x = 20;
    head.add(leftEye);
    head.add(rightEye);
    //
    var leftEar = new THREE.Mesh(
      new THREE.BoxGeometry(16, 40, 10),
      materials.skin
    );
    leftEar.position.set(-58, 12, 15);
    var rightEar = leftEar.clone();
    rightEar.position.x = 58;
    head.add(leftEar);
    head.add(rightEar);
    //
    var nose = new THREE.Mesh(
      new THREE.BoxGeometry(15, 45, 20),
      materials.skin
    );
    nose.position.set(0, 5, 61);
    nose.rotation.x = -20 * (Math.PI / 180);
    head.add(nose);
    //
    var mouth = new THREE.Mesh(new THREE.CircleGeometry(7, 50), materials.lips);

    mouth.position.set(0, -35, 61);
    self.mouth = mouth;
    head.add(self.mouth);

    var hair = new THREE.Mesh(
      new THREE.BoxGeometry(110, 20, 70),
      materials.black
    );
    hair.position.y = 51;
    hair.rotation.x = -20 * (Math.PI / 180);
    head.add(hair);

    const hairTie = new THREE.Mesh(
      new THREE.SphereGeometry(20, 20, 70),
      materials.shirt
    );
    hairTie.position.x = 70;
    hairTie.position.y = 60;
    hairTie.rotation.x = -20 * (Math.PI / 180);

    head.add(hairTie);

    const hairTieTwo = hairTie.clone();
    hairTieTwo.position.x = -70;
    head.add(hairTieTwo);

    const getHair = () =>
      new THREE.Mesh(new THREE.SphereGeometry(50, 32, 32), materials.black);

    for (const x of [-80, 80]) {
      for (let i = 0; i < 5; i++) {
        const hairball = getHair();
        hairball.position.x = x;
        hairball.position.y = -(0 + i * 10);

        head.add(hairball);
      }
    }
  }

  function initBody() {
    var torsoShape = new THREE.Shape();
    torsoShape.moveTo(20, 0);
    torsoShape.lineTo(50, 200);
    torsoShape.lineTo(150, 200);
    torsoShape.lineTo(170, 0);
    torsoShape.lineTo(20, 0);
    var torso = new THREE.Mesh(
      torsoShape.extrude({ amount: 40 }),
      materials.shirt
    );
    body.add(torso);

    var rightBoob = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      materials.shirt
    );
    var leftBoob = rightBoob.clone();
    rightBoob.position.set(70, 150, 20);
    leftBoob.position.set(140, 150, 20);

    body.add(rightBoob);
    body.add(leftBoob);

    var armGeom = new THREE.BoxGeometry(20, 140, 40);
    armGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -100, 0));
    var leftArm = (self.leftArm = new THREE.Mesh(armGeom, materials.skin));
    leftArm.position.set(50, 220, 20);
    var rightArm = (self.rightArm = leftArm.clone());
    rightArm.position.x = 160;
    leftArm.rotation.z = -50 * (Math.PI / 180);
    rightArm.rotation.z = 50 * (Math.PI / 60);
    body.add(leftArm);
    body.add(rightArm);
    //
    var legGeom = new THREE.BoxGeometry(50, 200, 50);
    legGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -100, 0));
    var leftLeg = (self.leftLeg = new THREE.Mesh(legGeom, materials.skin));
    leftLeg.position.set(50, -30, 20);
    var rightLeg = (self.rightLeg = leftLeg.clone());
    rightLeg.position.x = 150;
    body.add(leftLeg);
    body.add(rightLeg);
  }

  function init() {
    initHead();
    initBody();
    self.element.add(self.head);
    self.element.add(self.body);

    self.element.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }

  var pulseSingle = new Pulse(cadence);
  var pulseDouble = new Pulse(cadence * 2);
  var pulseSingle2 = new Pulse(cadence, Math.cos);

  this.tick = function() {
    self.head.rotation.z = pulseSingle(-10, 10) * (Math.PI / 180);
    self.head.position.y = headPosition.y + pulseDouble(-10, 10);
    self.head.position.x = headPosition.x + pulseSingle2(-5, 5);
    self.body.position.y = bodyPosition.y + pulseDouble(0, 20);
    self.body.rotation.x = pulseSingle(-3, 3) * (Math.PI / 180);
    self.body.rotation.y = pulseSingle(-10, 10) * (Math.PI / 180);
    self.rightArm.rotation.x = pulseSingle(-25, 25) * (Math.PI / 180);
    self.leftArm.rotation.x = pulseSingle(-25, 25) * -1 * (Math.PI / 180);
    self.leftLeg.rotation.x = pulseSingle(-20, 40) * (Math.PI / 180);
    self.rightLeg.rotation.x = pulseSingle(-40, 20) * -1 * (Math.PI / 180);

    if (self.mouth.scale.y < 1.6) {
      self.mouth.scale.y += 0.01;
    } else {
      self.mouth.scale.y = 1;
    }
  };

  init();
};

var World = function(element) {
  var self = this;
  var scene, camera, controls, actors;

  var light, shadowLight, backLight;

  Object.defineProperty(this, "width", {
    get: function() {
      return window.innerWidth;
    }
  });
  Object.defineProperty(this, "height", {
    get: function() {
      return window.innerHeight;
    }
  });
  Object.defineProperty(this, "aspectRatio", {
    get: function() {
      return self.width / self.height;
    }
  });

  function doResize() {
    renderer.setSize(self.width, self.height);
    camera.aspect = self.aspectRatio;
    camera.updateProjectionMatrix();
  }

  function initRenderer() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(self.width, self.height);
    renderer.shadowMapEnabled = true;
    element.appendChild(renderer.domElement);
  }

  function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x363d3d, -1, 3000);
  }

  function initLights() {
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    //
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
    shadowLight.position.set(200, 200, 200);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 0.2;
    //
    backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-100, 200, 50);
    backLight.castShadow = true;
    backLight.shadowDarkness = 0.2;
    //
    scene.add(backLight);
    scene.add(light);
    scene.add(shadowLight);
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(
      60, // Field of view
      self.aspectRatio, // Aspect ratio
      1, // Near plane
      2000 // Far plane
    );
    camera.position.set(0, 280, 800);
    camera.lookAt(new THREE.Vector3(0, 200, 0));
    window.camera = camera;
  }

  function render() {
    actors.forEach(function(actor) {
      actor.tick();
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function init() {
    initRenderer();
    initScene();
    initLights();
    initCamera();
    //
    window.addEventListener("resize", doResize, false);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //
    actors = [];

    actors.push(
      new Actor({
        cadence: 1,
        color: 0x633e19,
        shirt: 0xffdb58
      })
    );
    actors.push(
      new Actor({
        cadence: 2,
        x: 450,
        z: -450,
        color: 0xf8e2dc,
        shirt: 0xff69b4
      })
    );
    actors.push(
      new Actor({
        cadence: 2,
        x: -450,
        z: -450,
        color: 0xefbeb2,
        shirt: 0xadff2f
      })
    );
    actors.push(
      new Actor({
        cadence: 3,
        x: -750,
        z: -150,
        color: 0x1b0d06,
        shirt: 0x9370db
      })
    );
    actors.push(new Actor({ cadence: 3, x: 750, z: -150, color: 0xd77849 }));

    actors.forEach(function(actor) {
      scene.add(actor.element);
    });

    render();
  }

  init();
};

new World(document.getElementById("world"));

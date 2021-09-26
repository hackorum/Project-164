AFRAME.registerComponent("bullets", {
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        let bullet = document.createElement("a-entity");
        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });
        bullet.setAttribute("material", "color", "black");
        let cam = document.querySelector("#camera");
        pos = cam.getAttribute("position");
        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z + 2,
        });
        let camera = document.querySelector("#camera").object3D;
        let direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        bullet.setAttribute("velocity", direction.multiplyScalar(-20));
        let scene = document.querySelector("#scene");
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });
        bullet.setAttribute("visible", true);
        bullet.addEventListener("collide", this.removeBullet);
        scene.appendChild(bullet);
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    let scene = document.querySelector("#scene");
    //bullet element
    let element = e.detail.target.el;

    //element which is hit
    let elementHit = e.detail.body.el;

    //Create paint splash
    let paint = document.createElement("a-entity");
    let pos = element.getAttribute("position");
    let rotate = elementHit.getAttribute("rotation");

    paint.setAttribute("position", {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
    paint.setAttribute("rotation", {
      x: rotate.x,
      y: rotate.y,
      z: rotate.z,
    });
    paint.setAttribute("scale", {
      x: 2,
      y: 2,
      z: 2,
    });

    let colorNum = parseInt(Math.random() * 8 + 1);

    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./images/paint splash-0" + colorNum + ".png",
    });

    paint.setAttribute("geometry", {
      primitive: "plane",
      width: 0.5,
      height: 0.5,
    });
    scene.appendChild(paint);

    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene
    scene.removeChild(element);
  },
  shootSound: function () {
    let entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

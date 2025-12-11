class Cursor {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.angle = Math.random() * 2 * Math.PI;
    this.factor = 0.8 + Math.random() * 0.4;

    this.el = document.createElement("cursor");
    this.updatePos();

    document.body.appendChild(this.el);
  }

  move(e) {
    const v = { x: e.movementX, y: e.movementY };

    this.rotate(v);
    this.scale(v);

    this.x += v.x;
    this.y += v.y;

    if (this.x < 0) {
      this.x += this.width;
    }
    if (this.y < 0) {
      this.y += this.height;
    }
    this.x = this.x % this.width;
    this.y = this.y % this.height;

    this.updatePos();
  }

  rotate(v) {
    v.x = v.x * Math.cos(this.angle) - v.y * Math.sin(this.angle);
    v.y = v.x * Math.sin(this.angle) + v.y * Math.cos(this.angle);
  }
  scale(v) {
    v.x *= this.factor;
    v.y *= this.factor;
  }

  updatePos() {
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }
}

class FollowCursor extends Cursor {
  constructor() {
    super();
  }

  move(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.updatePos();
  }
}

(function () {
  const numCursors = 1200;
  const cursors = [];

  const bbox = document.body.getBoundingClientRect();
  for (let i = 0; i < numCursors; i++) {
    cursors.push(new Cursor(bbox.width, bbox.height));
  }
  cursors.push(new FollowCursor(bbox.width, bbox.height));

  addEventListener("mousemove", (e) => {
    for (let i = 0; i < numCursors + 1; i++) {
      cursors[i].move(e);
    }
  });

  const button = document.querySelector("button");
  button.addEventListener("click", (e) => {
    button.innerHTML = "Clicked!";
    button.style.backgroundColor = "#0dc900";
  });

  addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
})();
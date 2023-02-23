(function () {
  function createMap() {
    const container = document.getElementById("container") as HTMLDivElement;
    for (let a = 0; a < 400; a++) {
      const div = document.createElement("div");
      div.style.width = "20px";
      div.style.height = "20px";
      div.style.backgroundColor = "grey";
      container.appendChild(div);
    }
    const paragraphs = container.getElementsByTagName("div");

    const map: HTMLDivElement[][] = [];
    let row: HTMLDivElement[] = [];
    for (let i = 0; i < paragraphs.length; i++) {
      row?.push(paragraphs[i]);
      if (row.length === 20) {
        map.push(row);
        row = [];
      }
    }

    return map;
  }
  function createSnake() {
    const sanke: [x: number, y: number][] = [
      [4, 0],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 0],
    ];
    return sanke;
  }
  function createFood() {
    let randomFood = Math.floor(Math.random() * (400 - sanke.length));
    const food: [x: number, y: number] = [0, 0];

    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        let hasSnake = false;
        for (let i = 0; i < sanke.length; i++) {
          const sx = sanke[i][0];
          const sy = sanke[i][1];
          if (sx === x && sy === y) {
            hasSnake = true;
          }
        }
        if (!hasSnake) {
          randomFood--;
        }
        if (randomFood === 0) {
          food[0] = x;
          food[1] = y;
        }
      }
    }

    return food;
  }
  function renderMap() {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        map[y][x].style.backgroundColor = "grey";
      }
    }
  }
  function renderFood() {
    const fx = food[0];
    const fy = food[1];
    map[fy][fx].style.backgroundColor = "pink";
  }
  function renderSnake() {
    for (let i = 0; i < sanke.length; i++) {
      const x = sanke[i][0];
      const y = sanke[i][1];

      if (i === 0) {
        map[y][x].style.backgroundColor = "green";
      } else {
        map[y][x].style.backgroundColor = "black";
      }
    }
  }
  function moveSnake() {
    const last = sanke.pop() as [x: number, y: number];
    const first = sanke[0];

    last[0] = first[0] + direction[0];
    last[1] = first[1] + direction[1];

    sanke.unshift(last);
  }
  function eatFoodWhenCounter() {
    const first = sanke[0];
    const last = sanke[sanke.length - 1];
    if (first[0] === food[0] && first[1] === food[1]) {
      const added = [last[0], last[1]];
      sanke.push(added as never);
      food = createFood();
    }
  }
  function dieWhenEatSelf() {
    const xt = sanke[0][0];
    const yt = sanke[0][1];
    for (let a = 1; a < sanke.length; a++) {
      const sx = sanke[a][0];
      const xy = sanke[a][1];
      if (xt === sx && yt === xy) {
        gameOver();
      }
    }
  }
  function dieWhenOut() {
    const first = sanke[0];
    if (
      first[0] === 20 ||
      first[0] === -1 ||
      first[1] === 20 ||
      first[1] === -1
    ) {
      gameOver();
    }
  }
  function control() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight" && direction[0] !== -1) {
        direction[0] = 1;
        direction[1] = 0;
      }
      if (event.code === "ArrowLeft" && direction[0] !== 1) {
        direction[0] = -1;
        direction[1] = 0;
      }
      if (event.code === "ArrowUp" && direction[1] !== 1) {
        direction[0] = 0;
        direction[1] = -1;
      }
      if (event.code === "ArrowDown" && direction[1] !== -1) {
        direction[0] = 0;
        direction[1] = 1;
      }
    });
  }
  function gameOver() {
    alert("Game Over");
    window.location.reload();
  }

  const map: HTMLDivElement[][] = createMap();
  const sanke: [x: number, y: number][] = createSnake();
  const direction = [1, 0];
  let food = createFood();

  control();

  renderMap();
  renderSnake();
  renderFood();

  setInterval(() => {
    moveSnake();

    eatFoodWhenCounter();
    dieWhenEatSelf();
    dieWhenOut();

    renderMap();
    renderFood();
    renderSnake();
  }, 300);
})();

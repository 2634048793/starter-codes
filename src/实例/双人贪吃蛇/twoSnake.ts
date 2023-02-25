(function () {
  type Position = [x: number, y: number];

  type Controller = {
    up: string;
    down: string;
    right: string;
    left: string;
  };

  type Snake = {
    body: Position[];
    direction: Position;
    controller: Controller;
    headColor: string;
    bodyColor: string;
  };

  function isSnakeThere(position: Position, snake: Snake) {
    const [x, y] = position;
    for (let i = 0; i < snake.body.length; i++) {
      const [sx, sy] = snake.body[i];
      if (sx === x && sy === y) {
        return true;
      }
    }
    return false;
  }

  /** 生成地图（20*20个盒子） */
  function createMap() {
    const container = document.getElementById("container") as HTMLDivElement;
    // 循环生成400个盒子
    for (let a = 0; a < 400; a++) {
      const div = document.createElement("div");
      div.style.width = "20px";
      div.style.height = "20px";
      div.style.backgroundColor = "grey";
      container.appendChild(div);
    }

    // index = y * 20 + x;
    // 将一维的400个元素转换为二维的20*20矩阵以方便读写，具体为：将每20个元素保存为一行，保存20行
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
  /** 生成多条蛇 */
  function createSnakes(num: 1 | 2): Snake[] {
    const snake1: Snake = {
      body: [
        [4, 0],
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 0],
      ],
      controller: {
        up: "KeyW",
        down: "KeyS",
        right: "KeyD",
        left: "KeyA",
      },
      direction: [1, 0],
      headColor: "green",
      bodyColor: "black",
    };
    const snake2: Snake = {
      body: [
        [15, 19],
        [16, 19],
        [17, 19],
        [18, 19],
        [19, 19],
      ],
      controller: {
        up: "ArrowUp",
        down: "ArrowDown",
        right: "ArrowRight",
        left: "ArrowLeft",
      },
      direction: [-1, 0],
      headColor: "red",
      bodyColor: "black",
    };

    const snakes = [snake1, snake2];
    return snakes.slice(0, num);
  }

  /** 生成食物 */
  function createFood() {
    // 食物可以存放的空位有(400-occupied)个，随机选择一个 0 - (400-occupied) 的数字，并在地图上找到对应的空位
    const occupied = snakes.reduce((sum, item) => (sum += item.body.length), 0);
    let foodIndex = Math.floor(Math.random() * (400 - occupied));
    const food: [x: number, y: number] = [0, 0];

    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        let isOccupied = false;
        for (let i = 0; i < snakes.length; i++) {
          if (isSnakeThere([x, y], snakes[i])) {
            isOccupied = true;
          }
        }
        if (!isOccupied) {
          foodIndex--;
        }
        if (foodIndex === 0) {
          food[0] = x;
          food[1] = y;
        }
      }
    }

    return food;
  }

  /** 重置地图 */
  function renderMap() {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        map[y][x].style.backgroundColor = "grey";
      }
    }
  }
  /** 绘制食物 */
  function renderFood() {
    const fx = food[0];
    const fy = food[1];
    map[fy][fx].style.backgroundColor = "pink";
  }
  /** 绘制蛇身体 */
  function renderSnake(snake: Snake) {
    const [x, y] = snake.body[0];
    map[y][x].style.backgroundColor = snake.headColor;

    for (let i = 1; i < snake.body.length; i++) {
      const [x, y] = snake.body[i];
      map[y][x].style.backgroundColor = snake.bodyColor;
    }
  }

  /** 移动蛇 */
  function moveSnake(snake: Snake) {
    // 将蛇朝着 direction 的方向移动：将尾巴取出来，并将坐标设置为蛇头下一步的位置，并放到数组的首位，即蛇头的位置
    const last = snake.body.pop() as [x: number, y: number];
    const first = snake.body[0];

    last[0] = first[0] + snake.direction[0];
    last[1] = first[1] + snake.direction[1];

    snake.body.unshift(last);
  }
  /** 判断是否吃食物 如果吃到食物则蛇的身体长度+1 并重新生成食物 */
  function eatFoodWhenCounter(snake: Snake) {
    const first = snake.body[0];
    const last = snake.body[snake.body.length - 1];
    if (first[0] === food[0] && first[1] === food[1]) {
      // 复制蛇的尾巴坐标作为新增的身体
      const added = [last[0], last[1]];
      snake.body.push(added as never);
      food = createFood();
    }
  }
  /** 判断蛇头是否吃到蛇身 吃到则游戏结束 */
  function dieWhenEatSelf(snake: Snake) {
    const hx = snake.body[0][0];
    const hy = snake.body[0][1];
    for (let a = 1; a < snake.body.length; a++) {
      const bx = snake.body[a][0];
      const by = snake.body[a][1];
      if (hx === bx && hy === by) {
        gameOver();
      }
    }
  }

  function dieWhenEatEachOther() {
    for (let i = 0; i < snakes.length; i++) {
      const snake = snakes[i];
      const [hx, hy] = snake.body[0];

      for (let j = 0; j < snakes.length; j++) {
        if (i === j) continue;

        const otherSnake = snakes[j];
        for (let k = 0; k < otherSnake.body.length; k++) {
          const [bx, by] = otherSnake.body[k];
          if (hx === bx && hy === by) {
            gameOver();
          }
        }
      }
    }
  }

  /** 穿墙 蛇头出界则在另一端再次出现 */
  function throughWalls(sanke: Snake) {
    const tx = sanke.body[0][0];
    const ty = sanke.body[0][1];
    if (tx === 20) {
      sanke.body[0][0] = 0;
    }
    if (tx === -1) {
      sanke.body[0][0] = 19;
    }
    if (ty === 20) {
      sanke.body[0][1] = 0;
    }
    if (ty === -1) {
      sanke.body[0][1] = 19;
    }
  }

  /** 监听键盘的事件 控制蛇头的方向并且不能反方向走 */
  function control(snake: Snake) {
    window.addEventListener("keydown", (event) => {
      const { controller, direction } = snake;
      if (event.code === controller.left && direction[0] !== 1) {
        direction[0] = -1;
        direction[1] = 0;
      }
      if (event.code === controller.right && direction[0] !== -1) {
        direction[0] = 1;
        direction[1] = 0;
      }
      if (event.code === controller.down && direction[1] !== -1) {
        direction[0] = 0;
        direction[1] = 1;
      }
      if (event.code === controller.up && direction[1] !== 1) {
        direction[0] = 0;
        direction[1] = -1;
      }
    });
  }

  // 游戏结束刷新页面
  function gameOver() {
    alert("Game Over");
    window.location.reload();
  }

  const map: HTMLDivElement[][] = createMap();

  const snakes = createSnakes(2);

  snakes.forEach((snake) => control(snake));

  let food = createFood();

  renderMap();
  renderFood();
  snakes.forEach((snake) => renderSnake(snake));

  setInterval(() => {
    snakes.forEach((snake) => {
      moveSnake(snake);
      eatFoodWhenCounter(snake);
      dieWhenEatSelf(snake);
      throughWalls(snake);
    });

    dieWhenEatEachOther();
    renderMap();
    renderFood();
    snakes.forEach((snake) => renderSnake(snake));
  }, 300);
})();

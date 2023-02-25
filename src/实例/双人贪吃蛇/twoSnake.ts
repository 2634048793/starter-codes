(function () {
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
    /** 生成蛇的身体 */
    function createSnake() {
      const sanke: [x: number, y: number][] = [
        [15, 19],
        [16, 19],
        [17, 19],
        [18, 19],
        [19, 19],
      ];
      return sanke;
    }

    function createSnake2() {
        const sanke: [x: number, y: number][] = [
          [4, 0],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 0],
        ];
        return sanke;
      }
    /** 生成食物 */
    function createFood() {
      // 食物可以存放的空位有(400-snake.lenght)个，随机选择一个 0 - (400-snake.length) 的数字，并在地图上找到对应的空位
      let randomFood = Math.floor(Math.random() * (400 - sanke.length));
      const food: [x: number, y: number] = [0, 0];
  
      // 遍历地图
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          // 遍历蛇的身体，判断当前位置是否被蛇占据
          let hasSnake = false;
          for (let i = 0; i < sanke.length; i++) {
            const sx = sanke[i][0];
            const sy = sanke[i][1];
            if (sx === x && sy === y) {
              hasSnake = true;
            }
          }
          // 若未被占据则 randomFood - 1
          if (!hasSnake) {
            randomFood--;
          }
          // 当 randomFood 为零时表示找到了食物的位置
          if (randomFood === 0) {
            food[0] = x;
            food[1] = y;
          }
        }
      }
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          // 遍历蛇的身体，判断当前位置是否被蛇占据
          let hasSnake = false;
          for (let i = 0; i < sanke2.length; i++) {
            const sx = sanke2[i][0];
            const sy = sanke2[i][1];
            if (sx === x && sy === y) {
              hasSnake = true;
            }
          }
          // 若未被占据则 randomFood - 1
          if (!hasSnake) {
            randomFood--;
          }
          // 当 randomFood 为零时表示找到了食物的位置
          if (randomFood === 0) {
            food[0] = x;
            food[1] = y;
          }
        }
      }

      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          // 遍历蛇的身体，判断当前位置是否被蛇占据
          let hasSnake = false;
          for (let i = 0; i < sanke.length; i++) {
            const sx = sanke[i][0];
            const sy = sanke[i][1];
            if (sx === x && sy === y) {
              hasSnake = true;
            }
          }
          // 若未被占据则 randomFood - 1
          if (!hasSnake) {
            randomFood--;
          }
          // 当 randomFood 为零时表示找到了食物的位置
          if (randomFood === 0) {
            food[0] = x;
            food[1] = y;
          }
        }
      }
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          // 遍历蛇的身体，判断当前位置是否被蛇占据
          let hasSnake = false;
          for (let i = 0; i < sanke.length; i++) {
            const sx = sanke[i][0];
            const sy = sanke[i][1];
            if (sx === x && sy === y) {
              hasSnake = true;
            }
          }
          // 若未被占据则 randomFood - 1
          if (!hasSnake) {
            randomFood--;
          }
          // 当 randomFood 为零时表示找到了食物的位置
          if (randomFood === 0) {
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
    function renderSnake() {
      const [x, y] = sanke[0];
      map[y][x].style.backgroundColor = "green";
  
      for (let i = 1; i < sanke.length; i++) {
        const [x, y] = sanke[i];
        map[y][x].style.backgroundColor = "black";
      }
    }

    function renderSnake2() {
        const [x, y] = sanke2[0];
        map[y][x].style.backgroundColor = "red";
    
        for (let i = 1; i < sanke2.length; i++) {
          const [x, y] = sanke2[i];
          map[y][x].style.backgroundColor = "skyblue";
        }
      }
    /** 移动蛇 */
    function moveSnake() {
      // 将蛇朝着 direction 的方向移动：将尾巴取出来，并将坐标设置为蛇头下一步的位置，并放到数组的首位，即蛇头的位置
      const last = sanke.pop() as [x: number, y: number];
      const first = sanke[0];
  
      last[0] = first[0] - direction[0];
      last[1] = first[1] - direction[1];
  
      sanke.unshift(last);
    }

    function moveSnake2() {
        // 将蛇朝着 direction 的方向移动：将尾巴取出来，并将坐标设置为蛇头下一步的位置，并放到数组的首位，即蛇头的位置
        const last = sanke2.pop() as [x: number, y: number];
        const first = sanke2[0];
    
        last[0] = first[0] + direction2[0];
        last[1] = first[1] + direction2[1];
    
        sanke2.unshift(last);
      }
    /** 判断是否吃食物 如果吃到食物则蛇的身体长度+1 并重新生成食物 */
    function eatFoodWhenCounter() {
      const first = sanke[0];
      const last = sanke[sanke.length - 1];
      if (first[0] === food[0] && first[1] === food[1]) {
        // 复制蛇的尾巴坐标作为新增的身体
        const added = [last[0], last[1]];
        sanke.push(added as never);
        food = createFood();
      }
    }
    function eatFoodWhenCounter2() {
        const first = sanke2[0];
        const last = sanke2[sanke2.length - 1];
        if (first[0] === food[0] && first[1] === food[1]) {
          // 复制蛇的尾巴坐标作为新增的身体
          const added = [last[0], last[1]];
          sanke2.push(added as never);
          food = createFood();
        }
      }
    /** 判断蛇头是否吃到蛇身 吃到则游戏结束 */
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

    function dieWhenEatSelf2() {
        const xt = sanke2[0][0];
        const yt = sanke2[0][1];
        for (let a = 1; a < sanke2.length; a++) {
          const sx = sanke2[a][0];
          const xy = sanke2[a][1];
          if (xt === sx && yt === xy) {
            gameOver();
          }
        }
      }

    function dieWhenEatEachOther() {
        const xt = sanke[0][0];
        const yt = sanke[0][1];
        for (let a = 1; a < sanke2.length; a++) {
          const sx = sanke2[a][0];
          const xy = sanke2[a][1];
          if (xt === sx && yt === xy) {
            gameOver();
          }
          if(xt===sanke2[0][0]&&yt===sanke2[0][1]){
            gameOver();
          }
        }
      }
      function dieWhenEatEachOther2() {
        const xt = sanke2[0][0];
        const yt = sanke2[0][1];
        for (let a = 1; a < sanke.length; a++) {
          const sx = sanke[a][0];
          const xy = sanke[a][1];
          if (xt === sx && yt === xy) {
            gameOver();
          }
          if(xt===sanke[0][0]&&yt===sanke[0][1]){
            gameOver();
          }
        }
      }


    /** 判断蛇头是否出界 出界则游戏结束 */
    // function dieWhenOut() {
    //   const first = sanke[0];
    //   if (
    //     first[0] === 20 ||
    //     first[0] === -1 ||
    //     first[1] === 20 ||
    //     first[1] === -1
    //   ) {
    //     gameOver();
    //   }
    // }
    /** 穿墙 蛇头出界则在另一端再次出现 */ 
    function throughWalls() {
      const tx = sanke[0][0];
      const ty = sanke[0][1];
      if (tx === 20) {
        sanke[0][0] = 0;
      }
      if (tx === -1) {
        sanke[0][0] = 19;
      }
      if (ty === 20) {
        sanke[0][1] = 0;
      }
      if (ty === -1) {
        sanke[0][1] = 19;
      }
    }

    function throughWalls2() {
        const tx = sanke2[0][0];
        const ty = sanke2[0][1];
        if (tx === 20) {
          sanke2[0][0] = 0;
        }
        if (tx === -1) {
          sanke2[0][0] = 19;
        }
        if (ty === 20) {
          sanke2[0][1] = 0;
        }
        if (ty === -1) {
          sanke2[0][1] = 19;
        }
      }
    /** 监听键盘的事件 控制蛇头的方向并且不能反方向走 */ 
    function control() {
      window.addEventListener("keydown", (event) => {
        console.log(event.code)
        if (event.code === "KeyD" && direction[0] !== 1) {
          direction[0] = -1;
          direction[1] = 0;
        }
        if (event.code === "KeyA" && direction[0] !== -1) {
          direction[0] = 1;
          direction[1] = 0;
        }
        if (event.code === "KeyW" && direction[1] !== -1) {
          direction[0] = 0;
          direction[1] = 1;
        }
        if (event.code === "KeyS" && direction[1] !== 1) {
          direction[0] = 0;
          direction[1] = -1;
        }
      });
    }
    function control2() {
        window.addEventListener("keydown", (event) => {
          console.log(event.code)
          if (event.code === "ArrowRight" && direction2[0] !== -1) {
            direction2[0] = 1;
            direction2[1] = 0;
          }
          if (event.code === "ArrowLeft" && direction2[0] !== 1) {
            direction2[0] = -1;
            direction2[1] = 0;
          }
          if (event.code === "ArrowUp" && direction2[1] !== 1) {
            direction2[0] = 0;
            direction2[1] = -1;
          }
          if (event.code === "ArrowDown" && direction2[1] !== -1) {
            direction2[0] = 0;
            direction2[1] = 1;
          }
        });
      }
    // 游戏结束刷新页面
    function gameOver() {
      alert("Game Over");
      window.location.reload();
    }
  
    const map: HTMLDivElement[][] = createMap();
    const sanke: [x: number, y: number][] = createSnake();
    const sanke2: [x: number, y: number][] = createSnake2();
    const direction = [1, 0];
    const direction2 = [1, 0];
    let food = createFood();
  
    control();
    control2();
    renderMap();
    renderSnake();
    renderSnake2();

    renderFood();
    
    setInterval(() => {
      moveSnake();
      moveSnake2();
      eatFoodWhenCounter();
      eatFoodWhenCounter2();
      dieWhenEatSelf();
      dieWhenEatSelf2();
      // dieWhenOut();
      dieWhenEatEachOther();
      dieWhenEatEachOther2();
      throughWalls();
      throughWalls2();
      renderMap();
      renderFood();
      renderSnake();
      renderSnake2();
    }, 200);
  })();
  
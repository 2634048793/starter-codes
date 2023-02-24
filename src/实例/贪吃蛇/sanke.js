(function () {
    /** 生成地图（20*20个盒子） */
    function createMap() {
        var container = document.getElementById("container");
        // 循环生成400个盒子
        for (var a = 0; a < 400; a++) {
            var div = document.createElement("div");
            div.style.width = "20px";
            div.style.height = "20px";
            div.style.backgroundColor = "grey";
            container.appendChild(div);
        }
        // index = y * 20 + x;
        // 将一维的400个元素转换为二维的20*20矩阵以方便读写，具体为：将每20个元素保存为一行，保存20行
        var paragraphs = container.getElementsByTagName("div");
        var map = [];
        var row = [];
        for (var i = 0; i < paragraphs.length; i++) {
            row === null || row === void 0 ? void 0 : row.push(paragraphs[i]);
            if (row.length === 20) {
                map.push(row);
                row = [];
            }
        }
        return map;
    }
    /** 生成蛇的身体 */
    function createSnake() {
        var sanke = [
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
        var randomFood = Math.floor(Math.random() * (400 - sanke.length));
        var food = [0, 0];
        // 遍历地图
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                // 遍历蛇的身体，判断当前位置是否被蛇占据
                var hasSnake = false;
                for (var i = 0; i < sanke.length; i++) {
                    var sx = sanke[i][0];
                    var sy = sanke[i][1];
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
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                map[y][x].style.backgroundColor = "grey";
            }
        }
    }
    /** 绘制食物 */
    function renderFood() {
        var fx = food[0];
        var fy = food[1];
        map[fy][fx].style.backgroundColor = "pink";
    }
    /** 绘制蛇身体 */
    function renderSnake() {
        var _a = sanke[0], x = _a[0], y = _a[1];
        map[y][x].style.backgroundColor = "green";
        for (var i = 1; i < sanke.length; i++) {
            var _b = sanke[i], x_1 = _b[0], y_1 = _b[1];
            map[y_1][x_1].style.backgroundColor = "black";
        }
    }
    /** 移动蛇 */
    function moveSnake() {
        // 将蛇朝着 direction 的方向移动：将尾巴取出来，并将坐标设置为蛇头下一步的位置，并放到数组的首位，即蛇头的位置
        var last = sanke.pop();
        var first = sanke[0];
        last[0] = first[0] + direction[0];
        last[1] = first[1] + direction[1];
        sanke.unshift(last);
    }
    /** 判断是否吃食物 如果吃到食物则蛇的身体长度+1 并重新生成食物 */
    function eatFoodWhenCounter() {
        var first = sanke[0];
        var last = sanke[sanke.length - 1];
        if (first[0] === food[0] && first[1] === food[1]) {
            // 复制蛇的尾巴坐标作为新增的身体
            var added = [last[0], last[1]];
            sanke.push(added);
            food = createFood();
        }
    }
    /** 判断蛇头是否吃到蛇身 吃到则游戏结束 */
    function dieWhenEatSelf() {
        var xt = sanke[0][0];
        var yt = sanke[0][1];
        for (var a = 1; a < sanke.length; a++) {
            var sx = sanke[a][0];
            var xy = sanke[a][1];
            if (xt === sx && yt === xy) {
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
        var tx = sanke[0][0];
        var ty = sanke[0][1];
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
    /** 监听键盘的事件 控制蛇头的方向并且不能反方向走 */
    function control() {
        window.addEventListener("keydown", function (event) {
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
    // 游戏结束刷新页面
    function gameOver() {
        alert("Game Over");
        window.location.reload();
    }
    var map = createMap();
    var sanke = createSnake();
    var direction = [1, 0];
    var food = createFood();
    control();
    renderMap();
    renderSnake();
    renderFood();
    setInterval(function () {
        moveSnake();
        eatFoodWhenCounter();
        dieWhenEatSelf();
        // dieWhenOut();
        throughWalls();
        renderMap();
        renderFood();
        renderSnake();
    }, 300);
})();

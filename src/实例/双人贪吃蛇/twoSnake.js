(function () {
    function isSnakeThere(position, snake) {
        var x = position[0], y = position[1];
        for (var i = 0; i < snake.body.length; i++) {
            var _a = snake.body[i], sx = _a[0], sy = _a[1];
            if (sx === x && sy === y) {
                return true;
            }
        }
        return false;
    }
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
    /** 生成多条蛇 */
    function createSnakes(num) {
        var snake1 = {
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
                left: "KeyA"
            },
            direction: [1, 0],
            headColor: "green",
            bodyColor: "black"
        };
        var snake2 = {
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
                left: "ArrowLeft"
            },
            direction: [-1, 0],
            headColor: "red",
            bodyColor: "black"
        };
        var snakes = [snake1, snake2];
        return snakes.slice(0, num);
    }
    /** 生成食物 */
    function createFood() {
        // 食物可以存放的空位有(400-occupied)个，随机选择一个 0 - (400-occupied) 的数字，并在地图上找到对应的空位
        var occupied = snakes.reduce(function (sum, item) { return (sum += item.body.length); }, 0);
        var foodIndex = Math.floor(Math.random() * (400 - occupied));
        var food = [0, 0];
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                var isOccupied = false;
                for (var i = 0; i < snakes.length; i++) {
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
    function renderSnake(snake) {
        var _a = snake.body[0], x = _a[0], y = _a[1];
        map[y][x].style.backgroundColor = snake.headColor;
        for (var i = 1; i < snake.body.length; i++) {
            var _b = snake.body[i], x_1 = _b[0], y_1 = _b[1];
            map[y_1][x_1].style.backgroundColor = snake.bodyColor;
        }
    }
    /** 移动蛇 */
    function moveSnake(snake) {
        // 将蛇朝着 direction 的方向移动：将尾巴取出来，并将坐标设置为蛇头下一步的位置，并放到数组的首位，即蛇头的位置
        var last = snake.body.pop();
        var first = snake.body[0];
        last[0] = first[0] + snake.direction[0];
        last[1] = first[1] + snake.direction[1];
        snake.body.unshift(last);
    }
    /** 判断是否吃食物 如果吃到食物则蛇的身体长度+1 并重新生成食物 */
    function eatFoodWhenCounter(snake) {
        var first = snake.body[0];
        var last = snake.body[snake.body.length - 1];
        if (first[0] === food[0] && first[1] === food[1]) {
            // 复制蛇的尾巴坐标作为新增的身体
            var added = [last[0], last[1]];
            snake.body.push(added);
            food = createFood();
        }
    }
    /** 判断蛇头是否吃到蛇身 吃到则游戏结束 */
    function dieWhenEatSelf(snake) {
        var hx = snake.body[0][0];
        var hy = snake.body[0][1];
        for (var a = 1; a < snake.body.length; a++) {
            var bx = snake.body[a][0];
            var by = snake.body[a][1];
            if (hx === bx && hy === by) {
                gameOver();
            }
        }
    }
    function dieWhenEatEachOther() {
        for (var i = 0; i < snakes.length; i++) {
            var snake = snakes[i];
            var _a = snake.body[0], hx = _a[0], hy = _a[1];
            for (var j = 0; j < snakes.length; j++) {
                if (i === j)
                    continue;
                var otherSnake = snakes[j];
                for (var k = 0; k < otherSnake.body.length; k++) {
                    var _b = otherSnake.body[k], bx = _b[0], by = _b[1];
                    if (hx === bx && hy === by) {
                        gameOver();
                    }
                }
            }
        }
    }
    /** 穿墙 蛇头出界则在另一端再次出现 */
    function throughWalls(sanke) {
        var tx = sanke.body[0][0];
        var ty = sanke.body[0][1];
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
    function control(snake) {
        window.addEventListener("keydown", function (event) {
            var controller = snake.controller, direction = snake.direction;
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
    var map = createMap();
    var snakes = createSnakes(2);
    snakes.forEach(function (snake) { return control(snake); });
    var food = createFood();
    renderMap();
    renderFood();
    snakes.forEach(function (snake) { return renderSnake(snake); });
    setInterval(function () {
        snakes.forEach(function (snake) {
            moveSnake(snake);
            eatFoodWhenCounter(snake);
            dieWhenEatSelf(snake);
            throughWalls(snake);
        });
        dieWhenEatEachOther();
        renderMap();
        renderFood();
        snakes.forEach(function (snake) { return renderSnake(snake); });
    }, 300);
})();

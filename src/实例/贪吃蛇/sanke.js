(function () {
    function createMap() {
        var container = document.getElementById("container");
        for (var a = 0; a < 400; a++) {
            var div = document.createElement("div");
            div.style.width = "20px";
            div.style.height = "20px";
            div.style.backgroundColor = "grey";
            container.appendChild(div);
        }
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
    function createFood() {
        var randomFood = Math.floor(Math.random() * (400 - sanke.length));
        var food = [0, 0];
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                var hasSnake = false;
                for (var i = 0; i < sanke.length; i++) {
                    var sx = sanke[i][0];
                    var sy = sanke[i][1];
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
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 20; x++) {
                map[y][x].style.backgroundColor = "grey";
            }
        }
    }
    function renderFood() {
        var fx = food[0];
        var fy = food[1];
        map[fy][fx].style.backgroundColor = "pink";
    }
    function renderSnake() {
        for (var i = 0; i < sanke.length; i++) {
            var x = sanke[i][0];
            var y = sanke[i][1];
            if (i === 0) {
                map[y][x].style.backgroundColor = "green";
            }
            else {
                map[y][x].style.backgroundColor = "black";
            }
        }
    }
    function moveSnake() {
        var last = sanke.pop();
        var first = sanke[0];
        last[0] = first[0] + direction[0];
        last[1] = first[1] + direction[1];
        sanke.unshift(last);
    }
    function eatFoodWhenCounter() {
        var first = sanke[0];
        var last = sanke[sanke.length - 1];
        if (first[0] === food[0] && first[1] === food[1]) {
            var added = [last[0], last[1]];
            sanke.push(added);
            food = createFood();
        }
    }
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
    function dieWhenOut() {
        var first = sanke[0];
        if (first[0] === 20 ||
            first[0] === -1 ||
            first[1] === 20 ||
            first[1] === -1) {
            gameOver();
        }
    }
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
        dieWhenOut();
        renderMap();
        renderFood();
        renderSnake();
    }, 300);
})();

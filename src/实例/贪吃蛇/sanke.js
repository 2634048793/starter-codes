(function () {
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
    var sanke = [
        [6, 0],
        [5, 0],
        [4, 0],
        [3, 0],
        [2, 0],
    ];
    var row = [];
    for (var i = 0; i < paragraphs.length; i++) {
        row === null || row === void 0 ? void 0 : row.push(paragraphs[i]);
        if (row.length === 20) {
            map.push(row);
            row = [];
        }
    }
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
    var fx = food[0];
    var fy = food[1];
    map[fy][fx].style.backgroundColor = "pink";
})();
var empty = [20, 20];
var count = 0;
while (true) {
    count++;
    var x = Math.floor(Math.random() * 20);
    var y = Math.floor(Math.random() * 20);
    console.log({ count: count, x: x, y: y });
    if (x === empty[0] && y === empty[1]) {
        break;
    }
}

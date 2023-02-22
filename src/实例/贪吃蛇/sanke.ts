(function () {
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
  const sanke: [x: number, y: number][] = [
    [6, 0],
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
  ];

  let row: HTMLDivElement[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    row?.push(paragraphs[i]);
    if (row.length === 20) {
      map.push(row);
      row = [];
    }
  }

  for (let i = 0; i < sanke.length; i++) {
    const x = sanke[i][0];
    const y = sanke[i][1];

    if (i === 0) {
      map[y][x].style.backgroundColor = "green";
    } else {
      map[y][x].style.backgroundColor = "black";
    }
  }
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

  const fx = food[0];
  const fy = food[1];
  map[fy][fx].style.backgroundColor = "pink";
})();

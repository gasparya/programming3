class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    mul() {
        this.multiply++
        let emptCells = this.chooseCell()
        let newCell = random(emptCells)

        if (this.multiply >= 8 && newCell) {
            let x = newCell[0]
            let y = newCell[1]

            matrix[y][x] = 1
            this.multiply = 0
            let grass = new Grass(x, y)
            grassArr.push(grass)
        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 30;
        this.directions = [];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }

    eat() {
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }


            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy == 0) {
                this.die();
            }
        }
    }


    mul() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            var norXotaker = new GrassEater(x, y, this.index);
            grassEaterArr.push(norXotaker);


            matrix[y][x] = 1;
            this.multiply = 0;
        }
    }


    die() {

        matrix[this.y][this.x] = 0;

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }

}

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 20
        this.directions = []
    }
    chooseCell() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getDirections(t) {
        this.chooseCell();
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    move() {
        let fundCords = this.getDirections(0)
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
        }
    }
    eat() {
        var fundCords = this.getDirections(2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

        
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                    }
               }
            
            if (this.multiply == 15) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy == 0) {
                this.die();
            }
        }
    }
    mul() {
        let fundCords = this.getDirections(0);
        let cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            let norPredator = new Predator(x, y);
            predatorArr.push(norPredator);

            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
            }
        }
    }
}

class Bear {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 8
        this.directions = []
    }
    chooseCell() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getDirections(t) {
        this.chooseCell();
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    move() {
        let fundCords = this.getDirections(0)
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0


            this.x = x
            this.y = y
        }
    }
    eat() {
        var fundCords1 = this.getDirections(2);
        var fundCords2 = this.getDirections(3)
        let fundCords = fundCords1.concat(fundCords2)
        var cord = random(fundCords);

        if (cord) {
            console.log(cord)
            var x = cord[0];

            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
            
            
                for (var i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1)
                    }
                }
            

            if (this.multiply == 30) {
                this.mul()
                this.multiply = 0;
            }

        } else {

            this.move();
            this.energy--;
            if (this.energy == 0) {
                this.die();
            }
        }
    }
    mul() {
        let fundCords = this.getDirections(0);
        let cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            let norBear = new Bear(x, y);
            bearArr.push(norBear);

            matrix[y][x] = 4;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in bearArr) {
            if (this.x == bearArr[i].x && this.y == bearArr[i].y) {
                bearArr.splice(i, 1)
            }
        }
    }
}

class BearEater{
    constructor(x,y){
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 10
        this.directions = []
    }
    chooseCell() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getDirections(t) {
        this.chooseCell();
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    move() {
        let fundCords = this.getDirections(0)
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]

            matrix[y][x] = 5
            matrix[this.y][this.x] = 0


            this.x = x
            this.y = y
        }
    }
    eat() {
        var fundCords1 = this.getDirections(2);
        var fundCords2 = this.getDirections(3);
        var fundCords3 = this.getDirections(4);
        let fundCords = fundCords1.concat(fundCords2,fundCords3)
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];

            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
            
            
                for (var i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1)
                    }
                }
            
            
            for(let i in bearArr){
                if(x == bearArr[i].x && y == bearArr[i].y){
                     bearArr.splice(i, 1)
                }
            }
            
            

            if (this.multiply == 40) {
                this.mul()
                this.multiply = 0;
            }

        } else {

            this.move();
            this.energy--;
            if (this.energy == 0) {
                this.die();
            }
        }
    }
    mul() {
        let fundCords = this.getDirections(0);
        let cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            let norBearEater = new BearEater(x, y);
            bearEaterArr.push(norBearEater);

            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in bearEaterArr) {
            if (this.x == bearEaterArr[i].x && this.y == bearEaterArr[i].y) {
                bearEaterArr.splice(i, 1)
            }
        }
    }
}



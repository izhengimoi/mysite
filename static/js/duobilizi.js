/***
 * 
 * 单对象编程
 */

var game = {
    redBall: document.getElementsByClassName('red')[0],
    spanTimer: document.getElementsByTagName('span')[0],
    flag: true,
    num: 0,
    movePlus: {
        outer: document.getElementsByClassName('outer')[0],
        iWidth: document.getElementsByClassName('outer')[0].offsetWidth,
        iHeight: document.getElementsByClassName('outer')[0].offsetHeight,
        ispeedX: 10,
        ispeedY: 10
    },
    greenArr: [],
    init: function () {
        this.creatBall(this.movePlus);
        this.dragRedBall(this.movePlus);
        this.timerRun();
    },
    timerRun: function () {
        var self = this;
        // var num = 0;
        this.timerRun = setInterval(function () {
            self.num++;
            document.getElementById("myspan").innerHTML='坚持了' + self.num + '秒！';
        }, 1000)
    },
    creatBall: function (obj) {
        var plus = obj;

        function Green(plus) {
            //   this.a = plus.a 

            this.ball = document.createElement('div');
            this.ball.className = 'green';
            plus.outer.appendChild(this.ball);
            this.sumWidth = Math.floor(Math.random() * (plus.iWidth - this.ball.offsetWidth));
            this.ball.style.left = this.sumWidth + 'px';
            this.speedX = Math.floor(Math.random() * plus.ispeedX) + 1;
            this.speedY = Math.floor(Math.random() * plus.ispeedY) + 1;
            this.iWidth = plus.iWidth;
            this.iHeight = plus.iHeight;
        }
        var self = this;
        var greenBall = new Green(plus);
        this.greenArr.push(greenBall);
        this.creatTimer = setInterval(function () {
            var greenBall = new Green(plus);
            self.greenArr.push(greenBall);
        }, 2000)

        this.moveBall();
    },
    moveBall: function (obj) {
        var self = this;
        this.gotimer = setInterval(function () {
            // console.log(self.greenArr[i].speedY)
            for (var i = 0; i < self.greenArr.length; i++) {
                self.crashCheck(self.greenArr[i]);
                var newLeft = self.greenArr[i].speedX + self.greenArr[i].ball.offsetLeft;
                var newTop = self.greenArr[i].speedY + self.greenArr[i].ball.offsetTop;
                // console.log(newLeft + '===' + newTop)
                if (newLeft < 0) {
                    self.greenArr[i].speedX *= -1;
                } else if (newLeft > (self.greenArr[i].iWidth - self.greenArr[i].ball.offsetWidth)) {
                    self.greenArr[i].speedX *= -1;
                } else if (newTop < 0) {
                    self.greenArr[i].speedY *= -1;
                } else if (newTop > (self.greenArr[i].iHeight - self.greenArr[i].ball.offsetHeight)) {
                    self.greenArr[i].speedY *= -1;
                }
                self.greenArr[i].ball.style.left = newLeft + 'px';
                self.greenArr[i].ball.style.top = newTop + 'px';
            }


        }, 50)

    },
    dragRedBall: function (obj) {
        var self = this;
        this.redBall.onmousedown = function (e) {
            var e_x = e.pageX;
            var e_y = e.pageY;

            document.onmousemove = function (e) {
                var cha_x = e.pageX - e_x;
                var cha_y = e.pageY - e_y;
                self.redBall.style.left = cha_x + self.redBall.offsetLeft + 'px';
                self.redBall.style.top = cha_y + self.redBall.offsetTop + 'px';
                e_x = e.pageX;
                e_y = e.pageY;

                if (self.redBall.offsetLeft < 0 && self.flag) { //zuo
                    self.flag = false;
                    alert('游戏结束!已经坚持' + self.num + '秒');
                    self.clearTimer();
                    window.location.reload();
                } else if (self.redBall.offsetLeft > (obj.iWidth - self.redBall.offsetWidth) && self.flag) { //you
                    self.flag = false;
                    alert('游戏结束!已经坚持' + self.num + '秒');
                    self.clearTimer();
                    window.location.reload();
                } else if (self.redBall.offsetTop < 0 && self.flag) { //tshang
                    self.flag = false;
                    alert('游戏结束!已经坚持' + self.num + '秒');
                    self.clearTimer();
                    window.location.reload();

                } else if (self.redBall.offsetTop > (obj.iHeight - self.redBall.offsetHeight) && self.flag) { //xia
                    self.flag = false;
                    alert('游戏结束!已经坚持' + self.num + '秒');
                    self.clearTimer();
                    window.location.reload();
                }

            }
            document.onmouseup = function (e) {
                document.onmousemove = null;
            }

        }
    },
    crashCheck: function (green) {
        var greenX1 = green.ball.offsetLeft + Math.floor(green.ball.offsetWidth / 2);
        var greenY1 = green.ball.offsetTop + Math.floor(green.ball.offsetWidth / 2);

        var redX2 = this.redBall.offsetLeft + Math.floor(this.redBall.offsetWidth / 2);
        var redY2 = this.redBall.offsetTop + Math.floor(this.redBall.offsetWidth / 2);
        var dx = Math.abs(greenX1 - redX2);
        var dy = Math.abs(greenY1 - redY2);
        var dis = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
        console.log(dis);
        var R = this.redBall.offsetWidth / 2 + green.ball.offsetWidth / 2;
        // console.log(R)
        if (dis < R && this.flag) {
            console.log("====" + this.flag);
            this.flag = false;
            alert('游戏结束!已经坚持' + this.num + '秒');
            this.clearTimer();
            window.location.reload();

        }

    },
    clearTimer: function () {
        clearInterval(this.gotimer);
        clearInterval(this.timerRun);
        clearInterval(this.creatTimer);

    }


}
game.init();
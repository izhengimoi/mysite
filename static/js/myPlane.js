var bulletArr = [];
var superBullerArr1 = [];
var superBullerArr2 = [];
var superBombArr = [];
var smallPlaneArr = [];
var mediumPlaneArr = [];
var bigPlaneArr = [];
var superArr = [];
var check = true;
var d = document.getElementsByClassName('score')[0]; //分数	
var score = 0;
var main1 = document.getElementById('main');
var myPlane = document.getElementById('myPlane');
var myPlane1 = document.getElementById('myPlane1');
var bulletAll = document.getElementById('bullet');
var smallPlaneF = document.getElementById('smallPlane');
var mediumPlaneF = document.getElementById('mediumPlane');
var bigPlaneF = document.getElementById('bigPlane');
var gameover = document.getElementById('gameover');
var begin = document.getElementsByClassName('begin')[0];
var lifeNum = document.getElementsByClassName('lifeNum');
var life = lifeNum.length;
var bombNum = document.getElementsByClassName('bomb');
var bomb = bombNum.length;
var wd = document.getElementById('wdtime');
var wdtime = document.getElementsByClassName('wdtime')[0];
var sp = document.getElementsByClassName('span');
var invincible = false; //无敌状态
var superB = document.getElementById('super');
var superBomb = document.getElementById('superBomb');
var superTime = false;								//超级子弹时间

function main() {

	if(check == false) {
		console.log(check);
		return false;
	}

	function my() { //飞机创建

		main1.addEventListener('mousemove', function(e) {
			var a = e.pageX;
			var b = e.pageY;
			if(myPlaneOut(a, b)) {
				myPlane.style.left = e.pageX - 51 - main1.offsetLeft + "px";
				myPlane.style.top = e.pageY - 63 + "px";
			}
		});

	};

	function bullet() { //子弹创建
		var bullet = document.createElement('div');
		bullet.className = 'bullet';
		bullet.style.left = parseInt(myPlane.style.left) + 48 + "px";
		bullet.style.top = parseInt(myPlane.style.top) + 12 + "px";
		bulletArr.push(bullet);
		bulletAll.appendChild(bullet);
	};

	function superBullet() {

		var bullet1 = document.createElement('div');
		bullet1.className = 'bullet';
		bullet1.style.left = parseInt(myPlane.style.left) + 10 + "px";
		bullet1.style.top = parseInt(myPlane.style.top) + 10 + "px";
		superBullerArr1.push(bullet1);
		bulletAll.appendChild(bullet1);

		var bullet2 = document.createElement('div');
		bullet2.className = 'bullet';
		bullet2.style.left = parseInt(myPlane.style.left) + 82 + "px";
		bullet2.style.top = parseInt(myPlane.style.top) + 10 + "px";
		superBullerArr2.push(bullet2);
		bulletAll.appendChild(bullet2);

	}

	var timer = setInterval(function() {
		d.innerHTML = score;
		my();
		bombCheck();
		myCheck();
		if(parseInt(myPlane1.style.top) == 126) { //飞机形态切换
			myPlane1.style.top = parseInt(myPlane1.style.top) - 126 + "px";
		} else {
			myPlane1.style.top = "126px";
		}
		if(superTime == false) {				
			
			bulletMove(bulletArr);
			if(superBullerArr1.length != 0) {
				bulletMove(superBullerArr1);
				bulletMove(superBullerArr2);
			}
		} else if(superTime == true) {
			
			if(bulletArr.length != 0) {
				bulletMove(bulletArr);
			}
			bulletMove(superBullerArr1);
			bulletMove(superBullerArr2);

		}
		if(life == 0) { //死亡条件
			gameover.style.display = "block";
			clearInterval(timer);
			clearInterval(timer11);
			check = false;
			enemyPlane();
		}

		

	}, 200)


	var timer11 = setInterval(function(){
		if(superTime == false) {
			bullet(); //生成子弹
			bulletMove(bulletArr);
			if(superBullerArr1.length != 0) {
				bulletMove(superBullerArr1);
				bulletMove(superBullerArr2);
			}
		} else if(superTime == true) {
			superBullet();
			if(bulletArr.length != 0) {
				bulletMove(bulletArr);
			}
			bulletMove(superBullerArr1);
			bulletMove(superBullerArr2);

		}
	},100)
	
	
	
	

};










function myCheck(){
	//玩家与小型敌机
		for(var n = 0; n < smallPlaneArr.length; n++) {
			if(invincible == false) {
				if(checkHit(myPlane, smallPlaneArr[n]) == true) {
					(function() {
						del1(smallPlaneArr[n]);
					}());
					smallPlaneArr.splice(n, 1);
					if(life != 0) {

						lifeNum[lifeNum.length - 1].remove();
						life -= 1;
						invincible1();

					}

				}
			}
		}

		//玩家与中型敌机
		for(var m = 0; m < mediumPlaneArr.length; m++) {
			if(invincible == false) {
				if(checkHit(myPlane, mediumPlaneArr[m]) == true) {

					del2(mediumPlaneArr[m]);

					mediumPlaneArr.splice(m, 1);
					if(life != 0) {
						lifeNum[lifeNum.length - 1].remove();
						life -= 1;
						invincible1();

					}

				}
			}
		}
		
		for(var m = 0; m < bigPlaneArr.length; m++) {
			if(invincible == false) {
				if(checkHit(myPlane, bigPlaneArr[m]) == true) {
					if(life != 0) {
						lifeNum[lifeNum.length - 1].remove();
						life -= 1;
						invincible1();

					}

				}
			}
		}

		for(var m = 0; m < superArr.length; m++) { //玩家与超级子弹

			if(checkHit(myPlane, superArr[m]) == true) {
				superArr[m].remove();
				superArr.splice(m, 1);

				console.log(superArr[m]);
				superTime = true;
				var sssa = setInterval(function() {
					superTime = false;
					clearInterval(sssa);
				}, 10000);
			}
		}
		
		for(var k = 0; k < superBombArr.length; k ++){	//玩家与炸弹
			if(checkHit(myPlane, superBombArr[k]) == true){
				qweasdzxc();
				superBombArr[k].remove();
				superBombArr.splice(k,1);
			}
		}
}
















function bulletMove(arr) {

	//子弹与敌机

	for(var i = 0; i < arr.length; i++) {
		var ba = parseInt(arr[i].style.top);
		var bb = parseInt(arr[i].style.left);
		arr[i].style.top = parseInt(arr[i].style.top) - 30 + "px"; //子弹移动
		if(parseInt(arr[i].style.top) < 50) { //子弹出界
			arr[i].remove();
			arr.splice(i, 1);
		}
		head(arr);
	}

}

function head(bArr) {
	for(var i = 0; i < bArr.length; i++) {
		for(var j = 0; j < smallPlaneArr.length; j++) { //消灭小型敌机
			if(bArr[i]) {
				if(checkHit(bArr[i], smallPlaneArr[j]) == true) {

					bArr[i].remove();
					bArr.splice(i, 1);
					(function() {
						del1(smallPlaneArr[j])
					}());
					smallPlaneArr.splice(j, 1);
					score += 10;
				}
			}
		}

		for(var k = 0; k < mediumPlaneArr.length; k++) { //消灭中型敌机
			if(bArr[i]) {
				if(checkHit(bArr[i], mediumPlaneArr[k]) == true) {
					bArr[i].remove();
					bArr.splice(i, 1);
					var hit1 = mediumPlaneArr[k].children[0].innerHTML;
					mediumPlaneArr[k].children[0].innerHTML -= 1;

					mediumPlaneArr[k].children[1].style.width = parseInt(mediumPlaneArr[k].children[1].style.width) - 7 + "px";
					if(hit1 > 3 && hit1 < 7) {
						mediumPlaneArr[k].children[1].style.backgroundColor = "yellow";
					} else if(hit1 > 0 && hit1 < 4) {
						mediumPlaneArr[k].children[1].style.backgroundColor = "red";
					} else if(hit1 == 0) {

						del2(mediumPlaneArr[k]);

						mediumPlaneArr.splice(k, 1);
						score += 100;
					}
				}
			}
		}
		
		for(var k = 0; k < bigPlaneArr.length; k++) { //消灭大型敌机
			if(bArr[i]) {
				if(checkHit(bArr[i], bigPlaneArr[k]) == true) {
					bArr[i].remove();
					bArr.splice(i, 1);
					var hit1 = bigPlaneArr[k].children[0].innerHTML;
					bigPlaneArr[k].children[0].innerHTML -= 1;

					bigPlaneArr[k].children[1].style.width = parseInt(bigPlaneArr[k].children[1].style.width) -3.33 + "px";
					if(hit1 > 15 && hit1 < 40) {
						bigPlaneArr[k].children[1].style.backgroundColor = "yellow";
					} else if(hit1 > 0 && hit1 < 15) {
						bigPlaneArr[k].children[1].style.backgroundColor = "red";
					} else if(hit1 == 0) {

						del3(bigPlaneArr[k]);

						bigPlaneArr.splice(k, 1);
						score += 10000;
					}
				}
			}
		}
		
	}
}



function bombCheck(){
		document.onkeydown = function (e){
		
		if(bomb > 0){
			if(e.keyCode == 32){
				bombNum[bomb-1].remove();
				bomb -=1;
				qweasdzxc();
				
			}
		}
	}
}


function qweasdzxc(){
	for(var i =0; i < smallPlaneArr.length; i ++){
		if(parseInt(smallPlaneArr[i].style.top) > -300){
				del1(smallPlaneArr[i]);
					}
				}
				for(var i =0; i < mediumPlaneArr.length; i ++){
					if(parseInt(mediumPlaneArr[i].style.top) > -100){
						del2(mediumPlaneArr[i]);
					}
				}
				for(var i =0; i < bigPlaneArr.length; i ++){
					if(parseInt(bigPlaneArr[i].style.top) > -100){
						del3(bigPlaneArr[i]);
					}
				}
				
}



function clearAllNode(parentNode) {
	while(parentNode.firstChild) {
		var oldNode = parentNode.removeChild(parentNode.firstChild);
		oldNode = null;
	}
}

function invincible1() { //无敌时间以及状态
	invincible = true;
	myPlane1.style.backgroundImage = 'url(images/me_destroy_3.png)';
	wdtime.style.width = '480px';
	wd.style.display = 'block';
	setTimeout('invincible = false', 3000);

	function aa11() {
		myPlane1.style.background = 'url(images/me1.png)';
	};
	var aaa = setInterval(function() {
		wdtime.style.width = parseInt(wdtime.style.width) - 10 + 'px';
	}, 63);
	var sss = setInterval(function() {
		aa11();
		clearInterval(sss);
		clearInterval(aaa);
		wd.style.display = 'none';
	}, 3000);

};

function again() { //重新开始

	begin.addEventListener('click', function() {
		gameover.style.display = 'none';
		bulletArr = [];
		smallPlaneArr = [];
		mediumPlaneArr = [];
		check = true;
		score = 0;
		superTime = false;
		clearAllNode(bulletAll);
		clearAllNode(smallPlaneF);
		clearAllNode(mediumPlaneF);
		clearAllNode(bigPlaneF);
		clearAllNode(document.getElementById('bomb'));
		main();
		enemyPlane();
		for(var i = 0; i < 3; i++) {
			var x = document.createElement('div');
			x.className = 'lifeNum';
			document.getElementById('life').appendChild(x);
			life = 3;
		}
		for(var j = 0; j < 3; j++) {
			var y = document.createElement('div');
			y.className = 'bomb';
			document.getElementById('bomb').appendChild(y);
			bomb = 3;
		}

	})
}

//结束游戏
var over = document.getElementsByClassName('close')[0];
over.addEventListener('click', function() {
	window.opener = null;
	window.open('', '_self');
	window.close();
})
var asd = document.getElementById('score');
asd.style.left = main1.offsetLeft + main1.offsetWidth + "px";
var ass = document.getElementById('prompt');
ass.style.left = asd.offsetLeft + asd.offsetWidth + "px";
main();
enemyPlane();
again();




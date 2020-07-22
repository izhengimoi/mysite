var timer1;
var timer2;
var timer3;
var timer4;
var timer5;
var timer6;
var timer7;
var timer8;
var timer9;
var timer10;
var timer11;
function enemyPlane() {

	clearInterval(timer1);
	clearInterval(timer2);
	clearInterval(timer3);
	clearInterval(timer4);
	clearInterval(timer7);
	clearInterval(timer8);

	function smallPlane() { //小型敌机
		var smallPlane = document.createElement('div');
		smallPlane.className = 'smallPlane';
		smallPlane.style.left = rnd(8, 460) + "px";
		smallPlane.style.top = -rnd(50, 700) + "px";

		smallPlaneArr.push(smallPlane);
		smallPlaneF.appendChild(smallPlane);
	}

	function mediumPlane() { //中型敌机
		var span = document.createElement('div');

		var div = document.createElement('div');
		var mediumPlane = document.createElement('div');
		div.innerHTML = '10';
		span.className = 'span';
		span.style.width = "69px";
		span.style.height = "5px";
		mediumPlane.className = 'mediumPlane';
		mediumPlane.style.left = rnd(8, 445) + "px";
		mediumPlane.style.top = -rnd(300, 1800) + "px";
		mediumPlane.appendChild(div);
		mediumPlane.appendChild(span);
		mediumPlaneArr.push(mediumPlane);
		mediumPlaneF.appendChild(mediumPlane);
	}
	
	function bigPlane() { //大型敌机
		var span = document.createElement('div');

		var div = document.createElement('div');
		var bigPlane = document.createElement('div');
		div.innerHTML = '50';
		span.className = 'span';
		span.style.width = "168px";
		span.style.height = "10px";
		bigPlane.className = 'bigPlane';
		bigPlane.style.left = rnd(8, 312) + "px";
		bigPlane.style.top = -rnd(300, 1800) + "px";
		bigPlane.appendChild(div);
		bigPlane.appendChild(span);
		bigPlaneArr.push(bigPlane);
		bigPlaneF.appendChild(bigPlane);
	}
	

	function superBullet() { //超级子弹
		var supers = document.createElement('div');
		supers.className = 'super';
		supers.style.left = rnd(8, 460) + "px";
		supers.style.top = -rnd(50, 700) + "px";
		superArr.push(supers);
		superB.appendChild(supers);

	}


	function superBomb1() {													 //全屏炸弹
		var supers = document.createElement('div');
		supers.className = 'superBomb';
		supers.style.left = rnd(8, 460) + "px";
		supers.style.top = -rnd(50, 700) + "px";
		superBombArr.push(supers);
		superBomb.appendChild(supers);

	}



	function rnd(n, m) {
		var random = Math.floor(Math.random() * (m - n + 1) + n);
		return random;
	}

	timer1 = setInterval(function() {
		ccc(smallPlaneArr,50);
	}, 100);

	timer3 = setInterval(function() {
		ccc(mediumPlaneArr,20);

	}, 100)

	timer6 = setInterval(function() {
		ccc(superArr,10);
	}, 200);
	timer8 = setInterval(function() {
		ccc(superBombArr,10);
		
	}, 500);
	timer10 = setInterval(function(){
		ccc(bigPlaneArr,5)
	},100)
	timer2 = setInterval(function() {
		smallPlane();
	}, 1000);

	timer4 = setInterval(function() {
		mediumPlane();
	}, 7000);
	timer7 = setInterval(function() {
		superBullet();
	}, 40000);
	timer9 = setInterval(function() {
		superBomb1();
	}, 50000);
	timer11 = setInterval(function(){
		bigPlane();
	},15000);
}

function hitsThe(a, b, hit) { //a：对象      b：生命值       hit:当前剩余生命值
	a.style.width = Math.floor(a.offsetWidth / b) * hit;
	console.log(a.offsetWidth);
}




function del1(a) {													//小型飞机死亡动画

	var z = setInterval(function() {

		if(a.className == 'smallPlane') {
			a.className = 'smallPlane1';
		} else if(a.className == 'smallPlane1') {
			a.className = 'smallPlane2';
		} else if(a.className == 'smallPlane2') {
			a.className = 'smallPlane3';
		} else if(a.className == 'smallPlane3') {
			a.className = 'smallPlane4';
		} else if(a.className == 'smallPlane4') {
			a.remove();
			clearInterval(z);
		}

	}, 25);
}

function del2(a) {													//中型飞机死亡动画

	var z = setInterval(function() {

		if(a.className == 'mediumPlane') {
			a.className = 'mediumPlane1';
		} else if(a.className == 'mediumPlane1') {
			a.className = 'mediumPlane2';
		} else if(a.className == 'mediumPlane2') {
			a.className = 'mediumPlane3';
		} else if(a.className == 'mediumPlane3') {
			a.className = 'mediumPlane4';
		} else if(a.className == 'mediumPlane4') {
			a.remove();
			clearInterval(z);
		}

	}, 25);
}
function del3(a) {													//小型飞机死亡动画

	var z = setInterval(function() {

		if(a.className == 'bigPlane') {
			a.className = 'bigPlane1';
		} else if(a.className == 'bigPlane1') {
			a.className = 'bigPlane2';
		} else if(a.className == 'bigPlane2') {
			a.className = 'bigPlane3';
		} else if(a.className == 'bigPlane3') {
			a.className = 'bigPlane4';
		} else if(a.className == 'bigPlane4') {
			a.className = 'bigPlane5';
		}else if(a.className == 'bigPlane5'){
			a.className = 'bigPlane6'
		}else if(a.className == 'bigPlane6'){
			a.remove();
			clearInterval(z);
		}

	}, 25);
}

function ccc(arr,v){											//arr：对象数组    v 对象速度
	for(var i = 0; i < arr.length; i++) {
			arr[i].style.top = parseInt(arr[i].style.top) + v + "px";
			if(parseInt(arr[i].style.top) > 700) {
				arr[i].remove();
			}
		}
}

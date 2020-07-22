function checkHit(div1, div2) {
	var l1 = div1.offsetLeft;
	var r1 = div1.offsetLeft + div1.offsetWidth;
	var t1 = div1.offsetTop;
	var b1 = div1.offsetTop + div1.offsetHeight;

	var l2 = div2.offsetLeft;
	var r2 = div2.offsetLeft + div2.offsetWidth;
	var t2 = div2.offsetTop;
	var b2 = div2.offsetTop + div2.offsetHeight;

	if(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
		return false;
	} else {
		return true;
	}
}

function myPlaneOut(X, Y) {

	var l2 = main1.offsetLeft;
	var r2 = main1.offsetLeft + main1.offsetWidth;
	var t2 = main1.offsetTop;
	var b2 = main1.offsetTop + main1.offsetHeight;
	if(X < l2 || X > r2 || Y > b2 || Y < t2) {
		return false;
	} else {
		return true;
	}
}
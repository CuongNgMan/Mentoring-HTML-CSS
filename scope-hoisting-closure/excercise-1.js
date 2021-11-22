/**
 * 1.	Create	a	function	runningAverage()	that	returns	a	callable	function	object.	Update	the
 * series	with	each	given	value	and	calculate	the	current	average
 */

function runningAverage() {
  const baseSpeed = 10;
  function cal(speed) {
    return (speed + baseSpeed) / 2;
  }
  return cal;
}

const rAvg = runningAverage();

console.log(rAvg(10));
console.log(rAvg(11));
console.log(rAvg(12));
console.log(rAvg(13));

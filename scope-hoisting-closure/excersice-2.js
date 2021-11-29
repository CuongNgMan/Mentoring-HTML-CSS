/**
 * 2.	Write	a	sum	function	which	will	 work	properly	when	invoked	using	syntax	below.
 */

function add(a, b) {
  return a + b;
}

function sum(...args) {
  let result = args.reduce(add, 0);

  function nestedSum(numb) {
    result += numb;
    console.log(result);
    return nestedSum;
  }

  console.log(result);
  return nestedSum;
}

sum(2, 3);
sum(2)(3);
sum(2)(3)(4)(5);

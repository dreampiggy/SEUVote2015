$.get("public/RESORCE/json/introduction.json",function(candidates,result){
    if(result=="success")
    {
        reArrangeArray(candidates);
        initilize_candidates(candidates);
    }
});

/**
 * @param {Array} arr
 by WuTao, tks!
 */
function reArrangeArray(arr) {
	if (!(arr instanceof Array)) {
		console.error("Parameter wrong : {" + arr + "} is not an Array");
		return null;
	};

	var tmp, index;
	for (var i=1; i<arr.length; i++) {
		
		index = Math.floor( Math.random() * arr.length ) % i; 
		
		tmp = arr[index];
		arr[index] = arr[i];
		arr[i] = tmp;
	};
    
	return arr;
}
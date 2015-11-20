/*
array = a,b,c
combinations = []
2 ^ 3 = 8 - 1 = 7

Level 0 - ["a","b","c"]
combinations = ["a","b","c"]

a + a = a,a -
a + b = a,b +
a + c = a,c +
b + a = a,b -
b + b = b,b -
b + c = b,c +
c + a = a,c -
c + b = b,c -
c + c = c,c -

Level 1 - ["a,b","a,c","b,c"]
combinations = ["a","b","c","a,b","a,c","b,c"]

a,b + a = a,a,b -
a,b + b = a,b,b -
a,b + c = a,b,c + break!

combinations = ["a","b","c","a,b","a,c","b,c","a,b,c"]

return ["a","b","c",["a","b"],["a","c"],["b","c"],["a","b","c"]]
*/
var CombinationStates = function (statesArray) {
    var combinations = new Array(),
        newValue = null,
        arrayBeforeLevel = new Array(),
        $level = 0,
        array = new Clone(statesArray),
        firstInteration = true,
        indexFirstInteration = 0,
        sizeValues = array.length,
        totalSizeValues = Math.pow(2, array.length) - 1;
    array.sort();
    combinations = new Clone(array);
    arrayBeforeLevel = new Clone(array);
    loopLevel: while ($level < arrayBeforeLevel.length) {
        for (var $i = 0; $i < array.length; $i++) {
            newValue = arrayBeforeLevel[$level] + "," + array[$i];
            newValue = newValue.split(",");
            newValue.sort();
            newValue = newValue.join(",");
            if (combinations.indexOf(newValue) == -1 && arrayBeforeLevel[$level].toString().indexOf(array[$i]) == -1) {
                if (firstInteration) {
                    firstInteration = false;
                    indexFirstInteration = combinations.length
                }
                sizeValues++;
                combinations.push(newValue);
                if (sizeValues == totalSizeValues) {
                    break loopLevel;
                }
            }
        }
        $level++;
        if ($level == arrayBeforeLevel.length) {
            firstInteration = true;
            arrayBeforeLevel = new Clone(combinations);
            arrayBeforeLevel = arrayBeforeLevel.splice(indexFirstInteration);
            indexFirstInteration = 0;
            $level = 0;
        }
    }
    sizeValues = combinations.length;
    for (var $i = 0; $i < sizeValues; $i++) {
        combinations[$i] = combinations[$i].toString();
    }
    return combinations;
}

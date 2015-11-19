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
    forLevel: while ($level < arrayBeforeLevel.length) {
        forConcat: for (var $i = 0; $i < array.length; $i++) {
            newValue = arrayBeforeLevel[$level] + "," + array[$i];
            newValue = newValue.split(",");
            newValue.sort();
            newValue = newValue.join(",");
            if (combinations.indexOf(newValue) == -1 && arrayBeforeLevel[$level].indexOf(array[$i]) == -1) {
                if (firstInteration) {
                    firstInteration = false;
                    indexFirstInteration = combinations.length
                }
                sizeValues++;
                combinations.push(newValue);
                if (sizeValues == totalSizeValues) {
                    break forLevel;
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
    return combinations;
}

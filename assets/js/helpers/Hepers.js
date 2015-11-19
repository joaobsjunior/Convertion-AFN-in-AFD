var Clone = function (data) {
    return JSON.parse(JSON.stringify(data));
}

var ArrayUnique = function (array) {
    return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
    });
}

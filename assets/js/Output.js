var Output = function () {
    var self = this,
        terminal = [],
        state = -1;

    var checkData = function (data) {
        if (data.state != undefined && data.state != null && data.terminal != undefined && data.terminal != null && data.terminal >= 0) {
            return true;
        }
        return false;
    }

    /*
    Add output for state.
    Parameter Formatter:
    -> {state:index, terminal:index}
    */
    self.addOutputState = function (data) {
        if (checkData(data)) {

        }
    }
}

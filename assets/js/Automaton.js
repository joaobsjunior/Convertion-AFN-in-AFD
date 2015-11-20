var Automaton = function () {
    var self = this,
        finalStates = [],
        initialState = -1;
    self.states = [];
    self.terminalSymbols = [];

    /*
    Reset All Datas, reseting automaton.
    */
    self.reset = function () {
        self.states = [];
        self.terminalSymbols = [];
        finalStates = [];
        initialState = -1;
    };

    /*
    Clean Datas
    */
    self.cleanDatas = function () {
        var sizeStates = self.states.length;
        self.states = [];
        self.setStatesSize(sizeStates);
        self.setFinalStates(finalStates);
        self.setInitalState(initialState);
    }

    /*
    Set size of states.
    Parameter Formatter:
    -> size
    */
    self.setStatesSize = function (size) {
        for (var $i = 0; $i < size; $i++) {
            self.states.push(new State());
        }
    };

    /*
    Set final state.
    Parameter Formatter:
    -> [index]
    */
    self.setFinalStates = function (data) {
        data = data || [];
        finalStates = data;
        var sizeData = data.length;
        if (sizeData) {
            for (var $i = 0; $i < sizeData; $i++) {
                self.states[data[$i]].end = true;
            }
        } else {
            console.log(Messages.msg001);
        }
    };

    /*
    Set start state.
    Parameter Formatter:
    -> index
    */
    self.setInitalState = function (data) {
        data = (data != null) ? data : -1;
        var sizeStates = self.states.length;
        if (data != -1) {
            for (var $i = 0; $i < sizeStates; $i++) {
                self.states[$i].start = false;
            }
            self.states[data].start = true;
            initialState = data;
        } else {
            console.log(Messages.msg002);
        }
    };

    /*
    Set outputs terminals.
    Parameter Formatter:
    -> ["terminal"]
    */
    self.setTerminalSymbols = function (data) {
        for (var $i = 0; $i < data.length; $i++) {
            self.terminalSymbols.push(data[$i]);
        }
    };

    /*
    Add outputs of terminal in states.
    Parameter Formatter:
    -> {state:index, output:{terminal:index, states:[index]}}
    */
    self.setOutputTerminal = function (data) {
        var sizeOutputs = 0,
            validate = false;
        if (data) {
            sizeOutputs = self.states[data.state].outputs.length;
            if (sizeOutputs) {
                loopOutputs: for (var $i = 0; $i < sizeOutputs; $i++) {
                    if (self.states[data.state].outputs[$i].terminal == data.output.terminal) {
                        self.states[data.state].outputs[$i].states = data.output.states;
                        validate = true;
                        break loopOutputs;
                    }
                }
                if (!validate) {
                    self.states[data.state].outputs.push({
                        terminal: data.output.terminal,
                        states: data.output.states
                    });
                }
            } else {
                self.states[data.state].outputs.push({
                    terminal: data.output.terminal,
                    states: data.output.states
                });
            }
        }
    };

    /*
    Add references to State
    Parameter Formatter:
    -> {state: index, reference: string}
    */
    self.setReferentToState = function (data) {
        if (data) {
            self.states[data.state].reference = data.reference;
        }
    }
};

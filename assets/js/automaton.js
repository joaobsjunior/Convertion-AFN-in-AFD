var Automaton = function () {
        var self = this,
            finalStates = [],
            initialState = -1;
        self.states = [];
        self.terminalSymbols = [];

        /*
        Initialize of Method
        */
        self.init = function () {
            console.log("Teste");
        };

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
                self.states.push({
                    outputs: [],
                    start: false,
                    end: false
                });
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
        -> [{state:index,output:[{terminal:[index], state: index}]}]
        */
        self.setOutputStates = function (data) {
            if (data) {
                var sizeData = data.length,
                    sizeStates = 0,
                    sizeOutputs = 0,
                    sizeTerminals = 0;
                loopData: for (var $i = 0; $i < sizeData; $i++) {
                    sizeOutputs = data[$i].outputs.length;
                    loopOutpus: for (var $j = 0; $j < sizeOutputs; $j++) {
                        sizeTerminals = data[$i].outputs[$j].terminal.length;
                        loopTerminals: for (var $k = 0; $k < sizeTerminals; $k++) {
                            if (self.terminalSymbols.indexOf(data[$i].outputs[$j].terminal[$k]) != -1) {
                                sizeStates = self.states[data[$i].outputs[$j].state].outputs.length;
                            } else {
                                console.log(Messages.msg004);
                                self.cleanDatas();
                                break loopData;
                            }
                        }
                    }
                }
            } else {

            }
        };
    },
    app = new Automaton();

var Automaton = function () {
        var self = this;
        self.states = [];
        self.terminalSymbols = [];
        /*Initialize of Method*/
        self.init = function () {
            console.log("Teste");
        };
        self.cleanAll = function () {
            self.states = [];
            self.terminalSymbols = [];
        };
        self.setStatesSize = function (size) {
            for (var $i = 0; $i < size; $i++) {
                self.states.push({
                    outputs: [],
                    start: false,
                    end: false
                });
            }
        };
        self.setFinalStates = function (data) {
            data = data || [];
            var sizeData = data.length;
            if (sizeData) {
                for (var $i = 0; $i < sizeData; $i++) {
                    self.states[data[$i]].end = true;
                }
            }
        };
        self.setStartState = function (data) {
            data = (data != null) ? data : -1;
            var sizeStates = self.states.length;
            if (data != -1) {
                for (var $i = 0; $i < sizeStates; $i++) {
                    self.states[$i].start = false;
                }
                self.states[data].start = true;
            }
        };
        self.setTerminalSymbols = function (data) {
            for (var $i = 0; $i < data.length; $i++) {
                self.terminalSymbols.push(data[$i]);
            }
        };
        self.setOutputStates = function (data) {
            data = data || [];
            var sizeData = data.length,
                sizeStates = 0;
            if (sizeData) {
                for (var $a = 0; $a < sizeData; $a++) {
                    sizeStates = data[$a].outputs.length;
                    for (var $b = 0; $b < sizeStates; $b++) {
                        self.states[data[$a].state].outputs.push({
                            terminal:
                        });
                    }
                }
            }
        };
    },
    app = new Automaton();

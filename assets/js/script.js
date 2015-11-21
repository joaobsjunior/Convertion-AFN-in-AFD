var App = function () {
        var self = this;
        self.init = function () {
            var AFN = new Automaton();
            AFN.setStatesSize(3);
            AFN.setInitalState(0);
            AFN.setFinalStates([2]);
            AFN.setTerminalSymbols(["a", "b"]);
            AFN.setOutputTerminal({
                state: 0,
                output: {
                    terminal: 0,
                    states: [1, 2]
                }
            });
            AFN.setOutputTerminal({
                state: 1,
                output: {
                    terminal: 0,
                    states: [2]
                }
            });
            AFN.setOutputTerminal({
                state: 1,
                output: {
                    terminal: 1,
                    states: [0, 2]
                }
            });
            AFN.setOutputTerminal({
                state: 2,
                output: {
                    terminal: 0,
                    states: [2]
                }
            });
            AFN.setOutputTerminal({
                state: 2,
                output: {
                    terminal: 1,
                    states: [0]
                }
            });
            var afn = new Clone(AFN);
            console.log("AFN:", afn);
            var afd = new Clone(new Convertion(afn));
            console.log("AFD:", afd);
        }
    },
    app = new App();

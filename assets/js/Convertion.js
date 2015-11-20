var Convertion = function (AFN) {
    var self = this,
        AFD = new Automaton(),
        sizeStatesAFD = Math.pow(2, AFN.states.length),
        sizeStatesAFN = AFN.states.length,
        arrayStates = [],
        finalStates = [];
    AFD.setStatesSize(sizeStatesAFD);
    AFD.setTerminalSymbols(AFN.terminalSymbols);
    for (var $i = 0; $i < sizeStatesAFN; $i++) {
        arrayStates.push($i);
    }
    arrayStates = new CombinationStates(arrayStates);
    for (var $i = 0; $i < sizeStatesAFD; $i++) {
        AFD.setReferentToState({
            state: $i,
            reference: arrayStates[$i]
        });
    }
    for (var $i = 0; $i < AFN.states.length; $i++) {
        if (AFN.states[$i].end) {
            finalStates.push($i);
        }
        if (AFN.states[$i].start) {
            AFD.setInitalState($i);
        }
    }
    AFD.setFinalStates(finalStates);
    for (var $i = 0; $i < AFD.terminalSymbols.length; $i++) {
        for (var $j = 0; $j < AFD.states.length; $j++) {
            AFD.states[$j].outputs
        }
    }
    console.log("AFD:", new Clone(AFD));
    return AFN;
}

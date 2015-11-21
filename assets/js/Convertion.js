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

    /*CALL COMBINATIONS OF STATES*/
    arrayStates = new CombinationStates(arrayStates);

    /*SET REFERENCE OF STATES THE OF AFN*/
    for (var $i = 0; $i < sizeStatesAFD; $i++) {
        AFD.setReferentToState({
            state: $i,
            reference: arrayStates[$i]
        });
    }

    /*SET INITIAL STATE AND SERCH FINAL IN AFN*/
    for (var $i = 0; $i < AFN.states.length; $i++) {
        if (AFN.states[$i].end) {
            finalStates.push($i);
        }
        if (AFN.states[$i].start) {
            AFD.setInitalState($i);
        }
    }

    /*SET FINAL STATES OF AFD*/
    for (var $i = 0; $i < AFD.states.length; $i++) {
        for (var $j = 0; $j < finalStates.length; $j++) {
            if (AFD.states[$i].reference) {
                if (AFD.states[$i].reference.toString().indexOf(finalStates[$j]) != -1) {
                    AFD.states[$i].end = true;
                }
            }
        }
    }

    /*SEARCH AFD STATE*/
    for (var $i = 0; $i < AFD.states.length; $i++) {
        /*ACCESS TERMINAL OF STATE*/
        for (var $j = 0; $j < AFD.terminalSymbols.length; $j++) {
            var arrayStatesCheckAFN = AFD.states[$i].reference.split(","),
                referenceOutput = "";
            if ($i < AFD.states.length - 1) {
                /*SEARCH STATE REFERENCE OF AFN*/
                for (var $k = 0; $k < arrayStatesCheckAFN.length; $k++) {
                    var arrayOutputs = AFN.states[arrayStatesCheckAFN[$k]].outputs;
                    /*SEARCH TERMINALS IN CURRENT REFERENCE STATE*/
                    loopTerminalAFN: for (var $l = 0; $l < arrayOutputs.length; $l++) {
                        if (arrayOutputs[$l].terminal == $j) {
                            arrayOutputs[$l].states.sort();
                            var statesOfOutput = arrayOutputs[$l].states;
                            /*SEARCH STATES OF TERMINAL OUTPUTS IN AFN*/
                            for (var $m = 0; $m < statesOfOutput.length; $m++) {
                                if (referenceOutput.indexOf(statesOfOutput[$m]) == -1) {
                                    if (referenceOutput) {
                                        referenceOutput += "," + statesOfOutput[$m];
                                    } else {
                                        referenceOutput += statesOfOutput[$m];
                                    }
                                    referenceOutput = referenceOutput.split(",");
                                    referenceOutput.sort();
                                    referenceOutput = referenceOutput.join(",");
                                }
                            }
                            break loopTerminalAFN;
                        }
                    }
                }
            }
            /*INDENTIFY EQUIVALENT STATE IN AFD FOR AFN OUTPUTS*/
            for (var $n = 0; $n < AFD.states.length; $n++) {
                if (referenceOutput == AFD.states[$n].reference) {
                    AFD.setOutputTerminal({
                        state: $i,
                        output: {
                            terminal: $j,
                            states: [$n]
                        }
                    })
                    break;
                } else if ($n == AFD.states.length - 1) {
                    AFD.setOutputTerminal({
                        state: $i,
                        output: {
                            terminal: $j,
                            states: [$n]
                        }
                    })
                    break;
                }
            }

        }
    }

    /*CHECK INACCESSIBLE STATES*/
    var stackAccesible = [0],
        elPop = -1,
        referenceOutput = "";
    while (stackAccesible.length) {
        elPop = stackAccesible.pop();
        AFD.states[elPop].accessible = true;
        arrayOutputs = AFD.states[elPop].outputs;
        for (var $l = 0; $l < arrayOutputs.length; $l++) {
            arrayOutputs[$l].states.sort();
            statesOfOutput = arrayOutputs[$l].states;
            /*SEARCH TERMINAL OUTPUT OF STATE IN AFN*/
            for (var $m = 0; $m < statesOfOutput.length; $m++) {
                if (referenceOutput.indexOf(statesOfOutput[$m]) == -1) {
                    if (referenceOutput) {
                        referenceOutput += "," + statesOfOutput[$m];
                    } else {
                        referenceOutput += statesOfOutput[$m];
                    }
                    referenceOutput = referenceOutput.split(",");
                    referenceOutput.sort();
                    stackAccesible = stackAccesible.concat(referenceOutput);
                    stackAccesible = new ArrayUnique(stackAccesible);
                    referenceOutput = referenceOutput.join(",");
                }
            }
        }
    }

    /*CHECK ACCESSIBLE STATES NOT FINAL AND WITHOUT ACCESS TO OTHER STATES*/
    for (var $i = 0; $i < AFD.states.length; $i++) {
        if (AFD.states[$i].accessible && !AFD.states[$i].end) {
            AFD.states[$i].accessible = false;
            arrayOutputs = AFD.states[$i].outputs;
            for (var $j = 0; $j < arrayOutputs.length; $j++) {
                statesOfOutput = arrayOutputs[$j].states;
                for (var $k = 0; $k < statesOfOutput.length; $k++) {
                    if (statesOfOutput[$k] != $i) {
                        AFD.states[$i].accessible = true;
                    }
                }
            }
        }
    }

    return AFD;
}

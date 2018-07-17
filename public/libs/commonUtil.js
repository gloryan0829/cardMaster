(function(){
    Kakao.init('c0f483364ab1436546702d51ada90e27');
}());

function writeLog(msg, i) {
    if (i === undefined)
        i = currentAccount;
    if (logs[i] === undefined)
        logs[i] = "";

    logs[i] = logs[i] + "[" + new Date().toLocaleString() + "] " + msg + "\n";

    if (i == currentAccount)
        document.getElementById("result").textContent = logs[i];
}

function errorChk(msg, error) {
    if (error != null) {
        writeLog(msg + " : " + error.toString());
        return true;
    } else {
        return false;
    }
}

function txLog(option) {

    var logText = "[" + new Date().toLocaleString() + "]" + option.msg + "\n";

    document.getElementById(option.targetEl).innerHTML = logText;
}

function loginStatus() {
    return new Promise((ok, fail) => {
        Kakao.Auth.getStatus((result) => {
            ok(result);
        })
    });
}
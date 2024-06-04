let isRunning = false;
self.onmessage = function (event) {
    if (isRunning) return;
    isRunning = true;

    const state = event.data;
    const { activeTask, secondsRemaining } = state;

    // Primeiro segundo
    const endData = activeTask.startDate + ( secondsRemaining * 1000);
    const now = Date.now(); 
    let countDownSeconds = Math.ceil((endData - now) / 1000);

    function tick() {
        self.postMessage(countDownSeconds);
        
        const now = Date.now();
        countDownSeconds = Math.floor((endData - now) / 1000);        

        setTimeout(tick, 1000);
    }
    tick();
}
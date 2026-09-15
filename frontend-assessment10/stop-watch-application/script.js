   let seconds = 0;

        let minutes = 0;

        let hours = 0;

        let timer = null;


            const display =
            document.getElementById("display");



        function startStopwatch() {

            if (timer !== null) {
                return;
            }


            timer = setInterval(function () {

                seconds++;


                if (seconds === 60) {

                    seconds = 0;

                    minutes++;

                }


                if (minutes === 60) {

                    minutes = 0;

                    hours++;

                }


                displayTime();

            }, 1000);

        }



        function stopStopwatch() {

            clearInterval(timer);

        
            timer = null;

        }



        function resetStopwatch() {

            clearInterval(timer);

            timer = null;


            seconds = 0;

            minutes = 0;

            hours = 0;


            displayTime();

        }



        function displayTime() {

            let h =
                hours < 10
                    ? "0" + hours
                    : hours;


            let m =
                minutes < 10
                    ? "0" + minutes
                    : minutes;


            let s =
                seconds < 10
                    ? "0" + seconds
                    : seconds;


            
            display.innerText =
                h + ":" + m + ":" + s;

        }

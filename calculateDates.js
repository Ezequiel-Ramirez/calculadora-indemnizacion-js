window.onload = function() {
    getToday();
}

function getToday() {
    document.getElementById("initial-date").value = moment().format("YYYY-MM-DD");
}

function calculateDate() {
    const INITIAL_DATE = document.getElementById("initial-date").value;
    if (INITIAL_DATE !== "") {
        const DAYS = parseInt(document.getElementById("days").value);
        const MONTHS = parseInt(document.getElementById("months").value);
        const YEARS = parseInt(document.getElementById("years").value);

        const RESULT = moment(INITIAL_DATE)
            .add(DAYS, "days")
            .add(MONTHS, "months")
            .add(YEARS, "years");

        document.getElementById("final-date").value = moment(RESULT).format("YYYY-MM-DD");
    } else {
        alert("insert start date");
    }

}

function calculateBetweenDates() {
    const INITIAL_DATE = document.getElementById("initial-date").value;
    const FINAL_DATE = document.getElementById("final-date").value;
    if (INITIAL_DATE !== "" && FINAL_DATE !== "") {
        const DIFF_DURATION = moment.duration(moment(INITIAL_DATE).diff(FINAL_DATE));

        document.getElementById("days").value = DIFF_DURATION.days();
        document.getElementById("months").value = DIFF_DURATION.months();
        document.getElementById("years").value = DIFF_DURATION.years();
    }

}

function reset() {
    getToday();
    document.getElementById("final-date").value = "";
    document.getElementById("formNumbers").reset();
}

function setZero(element) {
    if (element.value === "") element.value = 0;
}
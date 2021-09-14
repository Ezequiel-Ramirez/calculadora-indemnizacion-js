let sueldo= 0;
let DAYS ="";
let MONTHS = "";
let YEARS = "";
let yearTotal ="";
let preaviso = "";
let totalDias ="";
let aguinaldo = "";
let sacAnti ="";
let sacpre ="";
let sacvac ="";
let sacagui = "";
let total =0;

let anos = document.getElementById("antiguedad");
let anti = document.getElementById("totalantiguedad");
let sactotalantiguedad = document.getElementById("sactotalantiguedad");
let pre = document.getElementById("pre");
let presac = document.getElementById("presac");
let vac = document.getElementById("vac");
let vacsac = document.getElementById("vacsac");
let agui = document.getElementById("agui");
let aguisac = document.getElementById("aguisac");
let totales = document.getElementById("totales");

window.onload = function() {
    getToday();
}

function getToday() {
    document.getElementById("initial-date").value = moment().format("YYYY-MM-DD");
}

function calculateDate() {
    const INITIAL_DATE = document.getElementById("initial-date").value;
    if (INITIAL_DATE !== "") {
        DAYS = parseInt(document.getElementById("days").value);
        MONTHS = parseInt(document.getElementById("months").value);
        YEARS = parseInt(document.getElementById("years").value);

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
        const DIFF_DURATION = moment.duration(moment(FINAL_DATE).diff(INITIAL_DATE));

        document.getElementById("days").value = DIFF_DURATION.days();
        document.getElementById("months").value = DIFF_DURATION.months();
        document.getElementById("years").value = DIFF_DURATION.years();
    }

}

function reset() {
    getToday();
    document.getElementById("final-date").value = "";
    document.getElementById("formNumbers").reset();
    document.getElementById("sueldo").value = 0;
    DAYS ="";
    MONTHS = "";
    YEARS = "";
    sueldo ="";
    yearTotal="";
    preaviso="";
    totalDias="";
    anos.innerText="";
    anti.innerText="";
    pre.innerText="";
    vac.innerText="";
    agui.innerText="";
    aguinaldo = "";
    sacAnti="";
    total=0;
    presac.innerText="";
    sacpre="";
    vacsac.innerText="";
    sacvac="";
    sacagui="";
    aguisac.innerText="";
    sactotalantiguedad.innerText="";
}

function setZero(element) {
    if (element.value === "") element.value = 0;
}

function redondear(numero) {
    let signo = numero >= 0?1 : -1;

    return (Math.round((numero * Math.pow(10, 2))+(signo * 0.0001)) / Math.pow(10, 2)).toFixed(2);
}

function getSueldo() {
    sueldo = parseFloat(document.getElementById("sueldo").value);   
}

function getAnti() {
    if (MONTHS > 3) {
        yearTotal = YEARS + 1; 
        sacAnti = yearTotal/12;      
    }else if(MONTHS <= 3){
        yearTotal = YEARS;
        sacAnti= yearTotal/12;
    };
    total+=(yearTotal*sueldo)+ sacAnti;

    anos.innerText = yearTotal+ "años";
    anti.innerText =  "$"+yearTotal * sueldo ;
    sactotalantiguedad.innerText= "(S.A.C.) $" + redondear(sacAnti);
}
function getPrea() {
    if (yearTotal <= 5) {
       preaviso = sueldo; 
       sacpre = preaviso/12;
    } else if(yearTotal > 5){
        preaviso = sueldo * 2;
        sacpre = preaviso/12;
    }
    total+=preaviso + sacpre;
    pre.innerText = "$" + redondear(preaviso) ;
    presac.innerText = "(S.A.C.) $" + redondear(sacpre) ;

}

function getVaca() {
    if(yearTotal < 1 && DAYS > 0){
        let diascontados=(MONTHS * 30) + DAYS;
        let totalDiasparcial = (diascontados * 14) / 360;
        totalDias = (sueldo / 25) * totalDiasparcial;
        sacvac = totalDias/12;

    }else if (yearTotal <= 5 ) {
        totalDias = (sueldo / 25)*14;
        sacvac = totalDias/12;

    } else if(yearTotal > 5 && yearTotal < 10){
        totalDias = (sueldo / 25)*21;
        sacvac = totalDias/12;

    }else if(yearTotal >= 10 ){
        totalDias = (sueldo / 25)*28;
        sacvac = totalDias/12;
    } 
    total+=totalDias +sacvac;
    vac.innerText = "$" + redondear(totalDias) ;
    vacsac.innerText = "(S.A.C.) $" + redondear(sacvac);
}
function getAgui() {
    let dias = (MONTHS*30)+DAYS;
    if (dias <= 184 ) {
        let aguinaldoparcial= (sueldo /2)*dias;
        aguinaldo = aguinaldoparcial/184;
        sacagui=aguinaldo/12;
    } else if(dias > 184) {
        let diastotales = dias - 184;
        let aguinaldoparcial= (sueldo /2)*diastotales;
        aguinaldo = aguinaldoparcial/184;
        sacagui=aguinaldo/12;
    }
    total+=aguinaldo+sacagui;
    agui.innerText = "$" + redondear(aguinaldo);
    aguisac.innerText = "(S.A.C.) $" + redondear(sacagui);
}

function getResult() {
    calculateDate();
    calculateBetweenDates();
    getAnti();
    getPrea();
    getVaca();
    getAgui();
    totales.innerText = redondear(total);
    console.log(yearTotal);
    console.log(DAYS);
    console.log(MONTHS);
    console.log(YEARS);
    
}
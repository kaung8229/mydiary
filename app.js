// --> Get UI
// start history
var uiyearbtn = document.querySelector('.year-btn');
var uiyears = document.querySelectorAll('.years');

var uimonthcontainer = document.querySelector('.month-container');

// start year
uiyearbtn.onclick = function(){
    // console.log(this);
    this.classList.toggle('active');
}

uiyears.forEach(uiyear=>{
    uiyear.addEventListener('click',function(){
        uiyears.forEach(uiyear=>{
            uiyear.classList.remove('active');
        })
        uiyearbtn.classList.remove('active');
        uiyear.classList.add('active');
    })
})

// end year

// start months & days

function monthdayhis(){

    var uimonthbtns = document.querySelectorAll('.month-btn');
    var uidaycontainers = document.querySelectorAll('.days-container');
    var uidaybtns = document.querySelectorAll('.day-btn');

    uimonthbtns.forEach(uimonthbtn=>{
        uimonthbtn.addEventListener('click',function(){
            // console.log(monthbtn.nextElementSibling.scrollHeight);
            
            uidaycontainers.forEach(uidaycontainer=>{
                uidaycontainer.style.height = 0 + "px";
            })
    
            uimonthbtn.classList.toggle("active");
            
            if(uimonthbtn.classList.contains('active')){
                uimonthbtn.nextElementSibling.style.height = uimonthbtn.nextElementSibling.scrollHeight + "px";
            }else{
                uimonthbtn.nextElementSibling.style.height = 0 + "px";
            }
    
            uimonthbtns.forEach(uimonthbtn=>{
                if(uimonthbtn.classList.contains('active')){
                    uimonthbtn.nextElementSibling.style.height = uimonthbtn.nextElementSibling.scrollHeight + "px";
                }else{
                    uimonthbtn.nextElementSibling.style.height = 0 + "px";
                }
            })
    
        })
    });
    
    uidaybtns.forEach(uidaybtn=>{
        uidaybtn.addEventListener("click",function(){
            uidaybtns.forEach(uidaybtn=>{
                uidaybtn.classList.remove('active');
            })
            uidaybtn.classList.add("active");
        })
    })

    uiyears[uiyears.length-1].classList.add('active');
    uimonthbtns[uimonthbtns.length-1].classList.add("active");
    uidaybtns[uidaybtns.length-1].classList.add("active");
    uidaycontainers[uidaycontainers.length-1].style.height = uidaycontainers[uidaycontainers.length-1].scrollHeight + "px";

}

// end months & days

// end history




// start main part
// --> Get UI
var maintitle = document.getElementById('main-title');
var emptypage = document.getElementById('empty-page');
var dataaddbtn = document.getElementById('data-add-btn');

var adddatabox = document.querySelector('.add-data-box-big-bg');
var btnclose = document.querySelector('.btn-close');
var datatitle = document.querySelector('.title');
var datatext = document.getElementById('data-text');
var submitbtn = document.querySelector('.submit-btn');

var tooltip = document.getElementById('tooltip');
var contentItemcontainer = document.querySelector('.contentItem-container');

var lntime = document.querySelector('.ln-time');
var sttime = document.querySelector('.st-time');


var learn = 0;
var study = 0;


dataaddbtn.addEventListener('click',function(){
    adddataboxshow();
})

btnclose.onclick = function(){
    adddataboxhide();
}

submitbtn.addEventListener('click',function(e){
    // console.log(datatext.value);
    // console.log(datatext.value.trim());
    if(datatext.value.trim() != ''){
        e.preventDefault();
        // console.log('added');

        let gethour = new Date().getHours();
        let getmin = new Date().getMinutes();
        let ampm = '';

        if(gethour >= 12){
            ampm = "pm";
        }else{
            ampm = "am";
        }

        if(gethour > 12){
            gethour -= 12;
        }

        if(gethour < 10){
            gethour = '0' + gethour;
        }

        if(getmin < 10){
            getmin = '0' + getmin;
        }

        var addtime = `${gethour}:${getmin} ${ampm}`;
        // console.log(addtime);
        // console.log(datatext.value);

        if(datatext.value.includes("learn")){
            learn += 1;
        }

        if(datatext.value.includes("study")){
            study += 1;
        }
        // console.log(learn);
        // console.log(study);

        addnewdata(addtime,datatext.value);

        emptypagehide();
        adddataboxhide();

    }

})




var datalses = JSON.parse(localStorage.getItem('datas'));
// console.log(datalses);

if(datalses != null){
    var datalslast = datalses[datalses.length - 1];
    // console.log(datalslast);

    var times = datalslast.time[datalslast.time.length - 1];
    var texts = datalslast.text[datalslast.text.length - 1];

    // console.log(times);
    // console.log(texts);

    var dtimes = datalslast.time;
    var dtexts = datalslast.text;
    var dmonths = datalslast.month;
    var ddays = datalslast.day;
    var dlearns = datalslast.learn;
    var dstudys = datalslast.study;

    var datanew = datalses;
    bringlsdata(datalses);
    newdate(datalses);
}else{
    var times = [];
    var texts = [];

    var dtimes = [];
    var dtexts = [];
    var dmonths = '';
    var ddays = [];
    var dlearns = [];
    var dstudys = [];

    var datas = [];
    var datanew = [];

    currenttimeonce();
    monthdayhis();
}


function addnewdata(addtime,datatext){

    // console.log(addtime);
    // console.log(datatext);
    
    var datalses = JSON.parse(localStorage.getItem('datas'));
    // console.log(datalses);

    let monthnow = new Date().getMonth() + 1;
    // let monthnow = 6;
    let daynow = new Date().getDate();
    // let daynow = 28;
    // console.log(monthnow);
    // console.log(daynow);

    times.push(addtime);
    texts.push(datatext);


    // console.log(dtimes);
    // console.log(dtexts);

    if(dtimes.length == 0 && dtexts.length == 0){
        dtimes.push(times);
        dtexts.push(texts);
    }else{
        dtimes[dtimes.length-1] = times;
        dtexts[dtexts.length-1] = texts;
    }
    

    var dataobj = {
        time: dtimes,
        text: dtexts,
        month: dmonths,
        day: ddays,
        learn: learn,
        study: study
    };
    // console.log(dataobj);
    // console.log(datatexts);
    // console.log(datas);

    if(datalses != null){

        // console.log(datalses[datalses.length-1]);

        var datals = datalses[datalses.length-1];

        // console.log(datals);

        // console.log(datanew);
        // console.log(datals.month);
        // console.log(datals.month[datals.month.length - 1]);
        // console.log(monthnow);

        if(datals.month != monthnow){

            // console.log('month is not same');
            dtexts[dtexts.length-2].pop();
            dataobj.text = dtexts;

            ddays = [];
            dtimes = [];
            dtexts = [];
            times = [];
            texts = [];

            dataobj.month = monthnow;
            ddays.push(daynow);
            times.push(addtime);
            texts.push(datatext);

            if(dtimes.length == 0 && dtexts.length == 0){
                dtimes.push(times);
                dtexts.push(texts);
            }else{
                dtimes[dtimes.length-1] = times;
                dtexts[dtexts.length-1] = texts;
            }

            dataobj.day = ddays;
            dataobj.time = dtimes;
            dataobj.text = dtexts;
            newdata(datals,dataobj,datanew,learn,study,daynow,monthnow);

        }else{
            
            overridedata(datals,dataobj,datanew,learn,study);

            if(datals.day[datals.day.length - 1] == daynow){

                // console.log("day is same");
                dataobj.month = monthnow;
                overridedata(datals,dataobj,datanew,learn,study);

            }else{

                

                // console.log("day is not same");
                // console.log(datals.text);

                dataobj.month = monthnow;
                ddays.push(daynow);

                times = [];
                texts = [];

                times.push(addtime);
                texts.push(datatext);

                // console.log(texts);
                // console.log(dtexts);

                dtimes.push(times);
                dtexts.push(texts);

                // console.log(dtexts.length);
                if(dtexts.length != 1){
                    dtexts[dtexts.length-2].pop();
                }

                var datanewobj = {
                    time: dtimes,
                    text: dtexts
                };

                // console.log(datanewobj.text);

                dataobj = Object.assign({},dataobj,datanewobj);
                // console.log(dataobj);

                // newdata(datals,dataobj,datanew,learn,study,daynow,monthnow);
                overridedata(datals,dataobj,datanew,learn,study);

                // console.log(datals.text);

            }
        }
    }else{
        dataobj.month = monthnow;
        ddays.push(daynow);
        console.log(dataobj);
        datas.push(dataobj);
        datanew.push(dataobj);
        localStorage.setItem('datas',JSON.stringify(datas));

        let contenttextel = document.createElement('div');
        contenttextel.className = "content-item";

        contenttextel.innerHTML = `
            <span class="time-text">${dataobj.time[0]}</span>
            <p class="content-text">${dataobj.text[0]}</p>
        `;
        // console.log(contenttextel);

        contentItemcontainer.append(contenttextel);

    }

}

function newdata(datals,dataobj,datanew,learn,study,daynow,monthnow){

    datals.time = dataobj.time;
    datals.text = dataobj.text;
    datals.month = dataobj.month;
    datals.day = dataobj.day;
    datals.learn = learn;
    datals.study = study;
    datanew.push(datals);
    // datanew[datanew.length - 1] = datals;
    localStorage.setItem('datas',JSON.stringify(datanew));
    adddatatohtml(datals);

}

function overridedata(datals,dataobj,datanew,learn,study){

    datals.time = dataobj.time;
    datals.text = dataobj.text;
    datals.month = dataobj.month;
    datals.day = dataobj.day;
    datals.learn = learn;
    datals.study = study;
    datanew[datanew.length - 1] = datals;
    localStorage.setItem('datas',JSON.stringify(datanew));
    adddatatohtml(datals);

}

function adddatatohtml(obj){

    // console.log(obj.text);
    var objtimes = obj.time[obj.time.length-1];
    var objtexts = obj.text[obj.text.length-1];

    contentItemcontainer.innerHTML = '';

    for(let i=0; i<objtimes.length; i++){

        // console.log(objtimes[i]);
        // console.log(objtexts[i]);

        let contenttextel = document.createElement('div');
        contenttextel.className = "content-item";

        contenttextel.innerHTML = `
            <span class="time-text">${objtimes[i]}</span>
            <p class="content-text">${objtexts[i]}</p>
        `;
        // console.log(contenttextel);
        contentItemcontainer.append(contenttextel);

    }
    

}



function currenttimeonce(){

    let curmonth = new Date().getMonth() + 1;
    let curday = new Date().getDate();

    var curmdel = document.createElement('li');
    curmdel.className = 'month-item';

    curmdel.innerHTML = `
        <a href="javascript:void(0);" class="month-btn">
            <p>${curmonth} month</p>
            <ion-icon name="caret-down-outline" class="dropdown-icon"></ion-icon>
        </a>

        <ul class="days-container">
            <li class="day-item">
                <a href="javascript:void(0);" class="day-btn">
                    <p>${curday} - ${curmonth}</p>
                    <ion-icon name="caret-forward-outline"></ion-icon>
                </a>
            </li>
        </ul>
    `;

    // console.log(curmdel);
    uimonthcontainer.append(curmdel);

}


function bringlsdata(lsdatas){
    uimonthcontainer.innerHTML = '';

    var lsdatadays = lsdatas[lsdatas.length-1].day;

    for(var l=0; l<lsdatas.length; l++){

        var lsdatamel = document.createElement('li');
        lsdatamel.className = 'month-item';

        var htmltexts = [`
            <a href="javascript:void(0);" class="month-btn">
                <p>${lsdatas[l].month} month</p>
                <ion-icon name="caret-down-outline" class="dropdown-icon"></ion-icon>
            </a>

            <ul class="days-container">
        `];

        for(let d=0; d<lsdatadays.length; d++){

            var lsdatadel = `
                <li class="day-item">
                    <a href="javascript:void(0);" class="day-btn">
                        <p>${lsdatadays[d]} - ${lsdatas[l].month}</p>
                        <ion-icon name="caret-forward-outline"></ion-icon>
                    </a>
                </li>
            `;

            htmltexts.push(lsdatadel);
        }

        htmltexts[htmltexts.length] = "</ul>";
        // console.log(htmltexts.join(''));
        lsdatamel.innerHTML = htmltexts.join('');

        // console.log(lsdatamel);
        uimonthcontainer.append(lsdatamel);

    }

    adddatatohtml(lsdatas[lsdatas.length-1]);
    emptypagehide();
    

    monthdayhis();

}


function newdate(dataobj){

    // console.log(dataobj);

}



function adddataboxshow(){
    adddatabox.classList.remove('hide');
    datatext.value = '';
    datatext.focus();
}

function adddataboxhide(){
    adddatabox.classList.add('hide');
}

function emptypagehide(){
    emptypage.classList.add('hide');
}




// end main part




// 26PHP


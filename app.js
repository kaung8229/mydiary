// --> Get UI
// start history
var uiyearbtn = document.querySelector('.year-btn');
var uiyears = document.querySelectorAll('.years');

var uimonthbtns = document.querySelectorAll('.month-btn');
var uidaycontainers = document.querySelectorAll('.days-container');
var uidaybtns = document.querySelectorAll('.day-btn');

alwaysactive();

function alwaysactive(){
    uiyears[uiyears.length-1].classList.add('active');
    uimonthbtns[uimonthbtns.length-1].classList.add("active");
    uidaybtns[uidaybtns.length-1].classList.add("active");
    uidaycontainers[uidaycontainers.length-1].style.height = uidaycontainers[uidaycontainers.length-1].scrollHeight + "px";
}

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


function addnewdata(addtime,datatext){
    // console.log(addtime);
    // console.log(datatext);

    var dataobj = {
        time: addtime,
        text: datatext
    };
    // console.log(dataobj);

    let contenttextel = document.createElement('div');
    contenttextel.className = "content-item";

    contenttextel.innerHTML = `
        <span class="time-text">${dataobj.time}</span>
        <p class="content-text">${dataobj.text}</p>
    `;
    // console.log(contenttextel);

    contentItemcontainer.append(contenttextel);

}


function adddataboxshow(){
    adddatabox.classList.remove('hide');
}

function adddataboxhide(){
    adddatabox.classList.add('hide');
}

function emptypagehide(){
    emptypage.classList.add('hide');
}




// end main part


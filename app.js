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



function modify_qty(val) {
    var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty,10) + val;

    if (new_qty < 0) {
        new_qty = 0;
    }
    document.getElementById('qty').value = new_qty;
    return new_qty;
    alert("Sucessfully Registered");
}

function myfun() {
    var radios_c = document.getElementsByName('c');
    var radios_t = document.getElementsByName('t');
    var radios_s = document.getElementsByName('s');
    var one=0;
    var two=0,three=0;

    for (var i = 0, length = radios_c.length; i < length; i++) {
        if (radios_c[i].checked) {
// do whatever you want with the checked radio
            one = radios_c[i].value;
        //}
    }
    for (i = 0, length = radios_t.length; i < length; i++) {
        if (radios_t[i].checked) {
// do whatever you want with the checked radio
            two = radios_t[i].value;
        }
    }
    for (i = 0, length = radios_s.length; i < length; i++) {
        if (radios_s[i].checked) {
// do whatever you want with the checked radio
            three = radios_s[i].value;
        }
    }

    var link = one + "_" + two + "_" + three + ".html";
    document.getElementById("text").innerHTML=link;
    window.location = link;
}}
var largest;
var index;
let aux_arr;
const SIZE_OF_ARR = 10;
let arr = Array(SIZE_OF_ARR).fill(0);

function gen_original_arr(){
    for(let i=0; i<SIZE_OF_ARR;i++){
        arr[i] = Math.floor(Math.random()*10);
    }
}
function create_original_array(){
    document.getElementById("announce").style.display="block";
    write_message("generating a random array...");
    gen_original_arr();
    for(let i = 0; i<arr.length; i++){
        let mem_of_arr = document.createElement('span');
        mem_of_arr.textContent = arr[i];
        mem_of_arr.setAttribute("class",'mem_of_arr');
        mem_of_arr.setAttribute("id",i+"original");
        document.getElementById("original_arr").appendChild(mem_of_arr);
    }
}

function check_biggest(){
    largest = -1;
    index = -1;
    for(let i=0; i<arr.length;i++){
       if(arr[i]>largest){
            largest = arr[i];
            index=i;
       }

    }
        let largest_ann = document.getElementById("announce");
        largest_ann.textContent="The largest number in array is: "+largest;
        document.getElementById(index+"original").style.backgroundColor="yellow";
}

function end(){
    document.getElementById("play_animation").onclick=null;
}
function write_message(message){
    document.getElementById("announce").textContent=message;
}
function create_aux_arr(){
    document.getElementById(index+"original").style.backgroundColor="white";
    write_message("Create an array with size "+(largest+1));
    aux_arr = new Array(largest+1).fill(0);
    SORTING = largest+1;
    for(let i=0;i<largest+1;i++){
        let cont = document.createElement('span');
        let counter = document.createElement('span');
        let value = document.createElement('span');
        counter.textContent=0;
        value.textContent=i;
        counter.setAttribute("class",'counter');
        cont.setAttribute("class",'cont');
        value.setAttribute("class",'value');
        counter.setAttribute("id",i+"counter");
        cont.appendChild(counter);
        cont.appendChild(value);
        document.getElementById("aux_arr").appendChild(cont);
    }
}

function count(num){
    write_message("Adding 1 to "+arr[num]);
   if(num>0){
    document.getElementById((num-1)+"original").style.backgroundColor="white";
    document.getElementById(arr[num-1]+"counter").style.backgroundColor="white";

   }
    document.getElementById(num+"original").style.backgroundColor="yellow";
    cur_counter = document.getElementById(arr[num]+"counter");
    cur_counter.style.backgroundColor="yellow"
    aux_arr[arr[num]]++;
    cur_counter.textContent=aux_arr[arr[num]];
    
}

let cur_pos=0;
function sort(num){
    write_message("Placing "+num)
    if(num>0){
        document.getElementById((num-1)+"counter").style.backgroundColor="white";
       }
        document.getElementById(num+"counter").style.backgroundColor="yellow";
    while(aux_arr[num]>0){
        let mem_of_arr = document.createElement('span');
        mem_of_arr.textContent = num;
        mem_of_arr.setAttribute("class",'mem_of_arr');
        document.getElementById("sorted_arr").appendChild(mem_of_arr);
        aux_arr[num]--;
        cur_pos++;
    }  
}
function clear_original(){
    const elements = document.querySelectorAll('.mem_of_arr');
    document.getElementById((SIZE_OF_ARR-1)+"original").style.backgroundColor = "white";
    for (let i = 0; i < elements.length; i++) {
        document.getElementById(arr[i]+"counter").style.backgroundColor="white";
    }
    write_message("Beginning to sort...");
}
const commands_set1 = [
    create_original_array,
    check_biggest,
    create_aux_arr
];


let cur_index = 0; 
const FIRST_SET = commands_set1.length;
const COUNTING = SIZE_OF_ARR;
let SORTING;
function handle_click(){
    if(cur_index<FIRST_SET){
        commands_set1[cur_index]();
    }
    else if(cur_index<FIRST_SET+COUNTING){
        count(cur_index-FIRST_SET);
    }
    else if(cur_index==FIRST_SET+COUNTING){
        clear_original();
    }
    else{
        sort(cur_index-FIRST_SET-1-COUNTING);
    }
    cur_index++;
    if(cur_index>FIRST_SET){
        if(cur_index==FIRST_SET+COUNTING+1+SORTING){ 
            end();
            write_message("Done!");
            document.getElementById(largest+"counter").style.backgroundColor="white";
        }
    }
}


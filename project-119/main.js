quick_draw_data_set=["apple","pen","paper","ruler,book","sandwich","bottle","binoculars","alarm clock"];
random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array=quick_draw_data_set[random_number];
document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+Element_of_array;

timer_counter="0";
timer_check="";
drawn_sketch="";
answer_holder="";
score="0";
sketch=Element_of_array;

function draw(){
    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML ="Timer : "+timer_counter;
    if(timer_counter>400){
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function updateCanvas(){
    background("white");
    sketch = Element_of_array;
    document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+sketch;
}


function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(14);
    stroke(0);
    if(mouseIsPressed){
        ("pmouseX, pmouseY, mouseX, and mouseY");
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);

}

function gotResult(error, results){
      if(error){
          console.log(error);
      }
      console.log(results);
      document.getElementById('label').innerHTML = 'Label: '+results[0].label;
      document.getElementById('confindence').innerHTML = 'Confindence: ' + Math.round(results[0].confindence*100) + '%';

      utterThis = new SpeechSynthesisUtterance(results[0].label);
      synth.speak(utterThis);
}
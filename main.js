song = ""; 
scorerightwr = 0;
scoreleftwr = 0;
leftWristx = 0;
leftWristy = 0;
rightwristx = 0;
rightwristy = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
     posenet.on('pose', gotPoses);
}

 function gotPoses(results)
 {
     if(results.length > 0)
     {
         console.log(results);
         leftWristx = results[0].pose.leftWrist.x;
         leftWristy = results[0].pose.leftWrist.y;
         console.log("leftWristx ="+ leftWristx + "leftWristy =" + leftWristy);

        scoreleftwr = results[0].pose.keypoints[9].score;
        scorerightwr = results[0].pose.keypoints[10].score;
        console.log("scorerightwr = " + scorerightwr + "scoreleftwr =" + scoreleftwr);

         rightwristx = results[0].pose.rightWrist.x;
         rightwristy = results[0].pose.rightWrist.y;
         console.log("rightwristx ="+ rightwristx + "rightwristy =" + rightwristy);

     }
 }

function modelLoaded()
{
   console.log('Posenet is intialized'); 
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

        if(scorerightwr > 0.2)
    {
        circle(rightwristx, rightwristy,20);
        if(rightwristy > 0 && rightwristy <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5 x ";
            song.rate(0.5);
        }
    
        else if(rightwristy >100 && rightwristy <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1 x";
            song.rate(1);
        }
    
        else if(rightwristy >200 && rightwristy <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5 x";
            song.rate(1.5);
        }
    
        else if (rightwristy >300 && rightwristy <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2 x ";
            song.rate(2);
        }
    
        else if (rightwristy >400 && rightwristy <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5 x ";
            song.rate(2.5);
        }
    }
  
        if(scoreleftwr > 0.2)
        {
            circle(leftWristx,leftWristy,20);
            number = Number(leftWristy);
            remove = floor(number);
            volume = remove/500;
            document.getElementById("volume").innerHTML = "volume =" + volume;
            song.setVolume(volume);
        }

  
}

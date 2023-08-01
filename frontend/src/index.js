// File to work the frontend reponsiveness of the website
console.log("Working");

// Placeholder list for voters
// Would be generated from the contract
const voters = ['Zehaan22','Aditya22','Ritesh22','Animesh22'];


function login(){
    const userid = document.getElementById('user-id').value;
    const password = document.getElementById('user-password').value;
    const firstPref = document.getElementById('user-firstpref').value;
    const secondPref = document.getElementById('user-secondpref').value;
    const thirdref = document.getElementById('user-thirdpref').value;
    var trig = 1;
    for(var i = 0 ; i<4 ; i++){
        if (userid === voters[i]){
            if (password === 'pass123'){ // placeholder for a contract generated password
                
                castVote(userid, firstPref, secondPref, thirdref);
                return;
            }
            else{
                alert("IncorrectPassword !!");
            }
        trig = 0;
        }
    }
    if (trig){
        alert("Invalid ID");
    }
    
    
}

function castVote(userid, firstPref, secondPref, thirdref){
    alert("Vote casted: \n" + "Preferrence order: \n" + firstPref + secondPref + thirdref);
    // Will send this pref to the contract
}
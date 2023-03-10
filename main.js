data = {
    "quizcontent": [{
        "question": "The Bharata natyam is indigenous to which Indian state?",
        // "image": "http://dummyimage.com/400x50/",
        "correct": 1,
        "answers": ["Tamil Nadu", "Andhra Pradesh", "Kerala", "Telangana"]
}, {
        "question": "Who was the first Indian citizen to go into space?",
        // "image": "http://dummyimage.com/350x50/",
        "correct": 3,
        "answers": ["Sunita Williams", "Kalpana Chawla", "Rakesh Sharma", "Ravish Malhotra"]
}, {
        "question": "In which state is the Kaziranga National Park situated?",
        // "image": "http://dummyimage.com/500x30/",
        "correct": 2,
        "answers": ["Madhya Pradesh", "Assam", "Bihar", "Rajasthan"]
}, {
        "question": "Which is the national tree of India?",
        // "image": "http://dummyimage.com/600x80/",
        "correct": 4,
        "answers": ["Peepal", "Coconut", "Mango Tree", "Banayan"]
}],
};
var lengthofobject = data.quizcontent.length;
var curPage = 0,
    correct = 0;
var myAnswers = [];
// console.log(document);
// var newimage = document.getElementById("quizimage");
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var btnNext = document.getElementById("btnNext");
var btnPrevious = document.getElementById("btnPrevious");
var btnFinish = document.getElementById("finishQuiz");
var questionSection = document.getElementById("questions");
checkPage();
// console.log(classname);

// console.log(myQuestion);
// console.log(myQuestion.children[0]);
// console.log(myQuestion.children[1]);
// console.log(myQuestion.children[2]);
// console.log(myQuestion.children[3]);

// console.log(quizcontent.length);

btnNext.addEventListener("click", moveNext);
btnPrevious.addEventListener("click", moveBack);
btnFinish.addEventListener("click", endQuiz);
function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    // document.getElementById("page1").innerHTML = 'Answer '+ idAnswer;
    /// check for correct answer
    myAnswers[curPage] = idAnswer;
    if (data.quizcontent[curPage].correct == idAnswer) {
        //console.log('Correct Answer');
    } else {
        //console.log('Wrong Answer');
    }
    addBox();
}
function addBox() {
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
}
function moveNext() {
    ///check if an answer has been made
    if (myAnswers[curPage]) {
        //console.log('okay to proceed');
        if (curPage < (lengthofobject - 1)) {
            curPage++;
            console.log(curPage);
            // document.getElementById("page1").innerHTML = 'Next Question Page '+ curPage;
            checkPage(curPage);
        } else {
            ///check if quiz is completed
            //console.log(curPage + ' ' + lengthofobject);
            if (lengthofobject >= curPage) {
                endQuiz();
            } else {
                //console.log('end of quiz Page ' + curPage);
            }
        }
    } else {
        //console.log('not answered');
    }
}
function endQuiz() {
    if (myAnswers[(lengthofobject - 1)]) {
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (data.quizcontent[i].correct == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                correct++;
            } else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
            }
            output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
        }
       
        output = output + '<p>You have correctly answered ' + correct + ' out of ' + lengthofobject + '</p></div> ';
        output = output + '<p>You scored ' + (5*correct) + ' out of ' + (5*lengthofobject) + '</p></div> ';
        document.getElementById("quizContent").innerHTML = output;
    } else {
        //console.log('not answered');
    }
}
function checkPage(i) {
    /// add remove disabled buttons if there are no more questions in que
    if (curPage == 0) {
        btnPrevious.classList.add("hide");
    } else {
        btnPrevious.classList.remove("hide");
    }
    if ((curPage + 1) < (lengthofobject)) {
        btnNext.classList.remove("hide");
    } else {
        btnNext.classList.add("hide");
        btnFinish.classList.remove("hide");
    }
    var myObj = data.quizcontent[curPage];
    // console.log(curPage + 1);
    console.log(myObj);
    myHeader.innerHTML = myObj.question;
    // newimage.src = myObj.image;
    questionSection.innerHTML = "";
    var addSelClass = '';
    console.log(myAnswers);
    console.log(curPage);
    console.log(myAnswers[curPage]);
    for (var index in myObj.answers) {
        console.log(parseInt(index) + 1);
        if (myAnswers[curPage] == (parseInt(index) + 1)) {
            addSelClass = "selAnswer";
        } else {
            addSelClass = "";
        }
        questionSection.innerHTML += '<div class="col-sm-6 ' + addSelClass + ' "> <a data-id="' + (parseInt(index) + 1) + '" class="btn btn-default answer ">' + myObj.answers[index] + '</a> </div>';
    }
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', myAnswer, false);
    }
    ///update progress bar
    var increment = Math.ceil((curPage) / (lengthofobject) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (increment) + '%';
}
function moveBack() {
    if (curPage > 0) {
        curPage--;
        // document.getElementById("page1").innerHTML = 'Previous Question Page '+ curPage;
        checkPage(curPage);
    } else {
        //console.log('end of quiz Page ' + curPage);
    }
}
function capitalise(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
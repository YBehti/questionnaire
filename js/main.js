
var Quizz = {
    lastQ:0,
    answered:[],
    notAnswered:[],
    confirm:false,
    falseAnswer:0,
    correction:false,
    getQ:function(numQ) {
        $.ajax({
            url: 'quizz.php',
            type: 'GET',
            dataType: 'JSON',
            data: {question: numQ},
            success: function (data) {

                Quizz.displayQ(data);
                Quizz.buttonM(numQ);
                Quizz.check(numQ);
                if(Quizz.correction === true){

                    Quizz.correctness(data,numQ);
                }

            }.bind(this)
        });
    },

    getNextQ:function(numQ){
      $.ajax({
          url: 'quizz.php',
          type: 'GET',
          dataType: 'JSON',
          data: {question: parseInt(numQ)+2},
          success: function (data) {
              if(data.length === 0){
                  this.lastQ = parseInt(numQ)+1;

              }
          }.bind(this)

      });
    },
    //Display manager
    displayQ:function(data){
        $('h2').text(data['question']);
        $('label').each(function (i) {

            $(this).text(data['propositions'][i]);

        });
        $(':radio').prop('checked',false);

    },
    //Buttons manager
    buttonM:function(numQ){


       if(Quizz.confirm === true){

           var index = Quizz.notAnswered.indexOf(numQ);
           $('#next').attr('numQ',Quizz.notAnswered[index+1]);
           $('#previous').attr('numQ',Quizz.notAnswered[index-1]);

           if(Quizz.notAnswered.length >=2){

               switch (index){
                   case 0:
                       $('#previous,#confirm').prop('disabled',true);
                       $('#next').prop('disabled',false);
                       break;
                   case Quizz.notAnswered.length -1:
                       $('#previous,#confirm').prop('disabled',false);
                       $('#next').prop('disabled',true);
                       break;
                   default:
                       $('#previous,#next').prop('disabled',false);
                       $('#confirm').prop('disabled',true);



               }
           }else if(Quizz.notAnswered.length === 1){
               $('#previous,#next').prop('disabled',true);
               $('#confirm').prop('disabled',false);
           }


       }else if(Quizz.confirm === false || Quizz.correction === true){
           $('#next').attr('numQ',parseInt(numQ)+1);
           $('#previous').attr('numQ',parseInt(numQ)-1);
           this.getNextQ(numQ);
           switch(parseInt(numQ)){
               case 1:
                   $('#previous,#confirm').prop('disabled',true);
                   $('#next').prop('disabled',false);
                   break;
               case Quizz.lastQ:
                   $('#previous').prop('disabled',false);
                   if(Quizz.correction === false){
                       $('#confirm').prop('disabled',false);
                   }

                   $('#next').prop('disabled',true);
                   if(Quizz.correction === true){
                       $('#exit').show();
                   }
                   break;
               default:
                   $('#previous,#next').prop('disabled',false);
                   $('#confirm').prop('disabled',true);
           }
       }


    },
    //A on deja repondu
    check:function (numQ) {
        var answer = Quizz.answered[numQ-1];
        $(':radio[value='+answer+']').prop('checked',true);

    },
    //Comparer les réponses données aux bonnes réponses
    correctness : function(data,numQ){
        var correct = data.correct;
        var answer = Quizz.answered[numQ-1];

        $('p_'+correct).addClass('correct');
        if(answer != correct){

            $('p_'+answer).addClass('error');
            Quizz.falseAnswer++;
        }

    }
};

$('#start').on('click',function(){
    $('#start,#quizz,#exit').toggle();
    var numQ = 1;

    Quizz.getQ(numQ);


});

$('#next,#previous').on('click',function () {
   var numQ = $(this).attr('numq');
    console.log(Quizz.confirm);
    Quizz.getQ(numQ);

});

$(':radio').on('click',function(){
    var numQ = parseInt($('#next').attr('numq'))-2;
     Quizz.answered[numQ] = parseInt($(this).val());

});

$('#confirm').on('click',function(){
    Quizz.confirm = true;
    Quizz.notAnswered = [];
    //On vérifie si on a répondu , si non alors on push dans un tableau et si par la suite on y repond(apres avoir confirmé) alors on en retrouve l'index et on le supprime des tableau non repondu
    for(var i=0;i<Quizz.lastQ ;i++){
        if(typeof (Quizz.answered[i]) !== 'number'){

            Quizz.notAnswered.push(i);
        }
    }
    var numQ = Quizz.notAnswered[0];
    if(typeof numQ === 'number'){
        Quizz.getQ(numQ);
    }
    else{
        Quizz.correction = true;
        numQ = 1;
        Quizz.getQ(numQ);
    }

});
$('#exit').on('click',function () {
    $('#quizz,.button').hide();
    var message = 'Vous avez '+(Quizz.lastQ - Quizz.falseAnswer)+' bonne(s) réponse(s) et '+Quizz.falseAnswer+' mauvaise(s) réponse(s)'
    $('span').text(message);
});


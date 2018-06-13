<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Quizz 2015</title>
        <link rel="stylesheet" href="css/main.css" media="all"/>
    <body>
        <input type="button" class="button" id="start" value="Commencer le quizz"/>
        <div id="quizz">
            <div id="questions">
                <h2></h2>
                <form>
                    <p id="p_1">
                        <input name="reponses" id="rep1" type="radio" value="1"/><label id="proposition1" for="rep1"></label>
                    </p>
                    <p id="p_2">
                        <input name="reponses" id="rep2" type="radio" value="2"/><label id="proposition2" for="rep2"></label>
                    </p>
                    <p id="p_3">
                        <input name="reponses" id="rep3" type="radio" value="3"/><label id="proposition3" for="rep3"></label>
                    </p>
                </form>
            </div>            
            <div id="buttons">
                <input class="button" type="button" id="previous" value="Précédente"/>
                <input class="button" type="button" id="next" value="Suivante"/>
                <input class="button" type="button" id="confirm" value="Valider"/>
                <input class="button" type="button" id="exit" value="Fin"/>
            </div>
            <div id="message">
                <span></span>
            </div>
        </div>
        <script src="js/libs/jquery/jquery.js" type="text/javascript"></script>
        <script src="js/main.js"></script>
    </body>
</html>

$('.part').hide();

//AJAX Call for Random Word
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://randomword.setgetgo.com/get.php?len=4",
		data: {},
		dataType: 'jsonp',

		//Initial callback
		success: function(data){
			// Initial Variables
			var partCounter = 1;
			var guessed = [];
			var turns = 6;
			var newWord = data.Word;
			newWord = newWord.toLowerCase();
			var word = newWord.split('');
			var wordLength = word.length;
			console.log(word);
			$('#turns').html(turns);
			//Inserts word into List 
			var counter = 0;
			//Dictionary Definition AJAX Call from Wordnik API
			$.ajax({
				type: "GET",
				url: "http://api.wordnik.com/v4/word.json/" + newWord + "/definitions",
				data: {
					api_key: "7db6bd11c9129e919c32b001fd70f4dec5d3158b9c2b3df43"
				},
				dataType: 'json',
				//Adds data to the Definition div on the page
				success: function(data){
					var definition = data[0].text;
					$('#definition').html(definition);

				}
			});
			while(counter <wordLength){
					var listItem = "#letter" + counter;
					$(listItem).html(word[counter]);
					counter += 1;
			};
			//Hides Letter on initial load
			$('.letter').hide();

			//Defines What happens when you win
			function victory(){
				$('#leftArm').addClass('leftarmWiggle');
				$('#rightArm').addClass('rightarmWiggle');
				$('.letter').show();
				alert("Ya Did It!");
			};
			//Defines What happens when you lose
			function defeat(){
				$('body').removeClass();
				$('body').addClass('defeat');
				$('.letter').show();
				alert("Ya Blew It!");
			};
			//Adds a body part to the Gallows if you miss 
			function partAdd(){
				var partClass = "." + partCounter;
				$(partClass).show();
				partCounter += 1;
			}
			//Reveals the correct letter when you 

			//Iterates through the Word and Checks to see if the Guess is found in it
			function sorter(guess, word){
				for(x=0; x<word.length; x++){
					if(guess == word[x] && word[x] != guessed[x]){
						var letterBox = '#letter' + x;
						$(letterBox).fadeIn(800);
						guessed[x] = guess;
						return true;
					}
				}
				return false;
			}
			//Compares The two Arrays for Equality to test Win Condition
			function arraysAreIdentical(arr1, arr2){
			    if (arr1.length !== arr2.length) {return false};
			    for (var i = 0, len = arr1.length; i < len; i++){
			        if (arr1[i] !== arr2[i]){
			            return false;
			        } else {
			        	return true;
			        }
			    }
			}
			//What happens when a letter is entered into the Box and submit is hit
			$('#submit').on('click',function(event){
				event.preventDefault();
				var guess = $('#letterEntry').val();
				//Checks to see if nothing is entered;
				if(guess.length == 0 || guess.length > 1){
					alert("Enter only one Letter! NO Numbers!!");
					$('#letterEntry').val('');
					return;
				}
				var correctCheck = sorter(guess, word);
				var victoryCheck = arraysAreIdentical(guessed,word);
				//Checks if you have won the game or not
				if (victoryCheck == true){
					$('.part').show();
					victory();
				}
				//Checks to see if the word you enter was correct or not
				if (correctCheck == true){
				} else {
					turns = turns - 1;
					partAdd();

				}
				if(turns == 0 ){
					defeat();
				}
				$('#letterEntry').val('');
				$('#turns').html(turns);
			});

		}

	});
});





// //Inserts correct guess into List 
// function letterInsertion(position,letter){
// 	var listItem = "#letter" + position;
// 	$(listItem).html(letter);
// }

// //Iterates through the Word and Checks to see if the Guess is found in it
// function sorter(guess, word){
// 	for(x=0; x<word.length; x++){
// 		if(guess == word[x]){
// 			guessed[x] = guess;
// 			letterInsertion(x,guess)
// 			console.log("Found!");
// 			console.log(guessed);
// ;			return;
// 		} else {
// 			console.log("NOT Found :(");
// 		} 
// 	}
// }

// //Retrieves Guess from User







// //Compares The two Arrays for Equality to test Win Condition
// function arraysAreIdentical(arr1, arr2){
//     if (arr1.length !== arr2.length) return false;
//     for (var i = 0, len = arr1.length; i < len; i++){
//         if (arr1[i] !== arr2[i]){
//             return false;
//         }
//     }
//     return true; 
// }

//Executes the game


















// function guessGame(array){
// 	var turns = 6;
// 	while (turns > 0){
// 		sorter(getGuess(),array);
// 		//Checks for a victory
// 		if(arraysAreIdentical(array,guessed) == true){
// 			alert("You Won!!");
// 			//If the player has won
// 			return;
// 		//If the player hasn't won 	
// 		} else {
// 			turns = turns -1;
// 		}
// 		//If the player runs out of the turns 
// 		if(turns == 0){
// 			alert("You Lose!!");
// 			return;
// 		}
// 	};
// };
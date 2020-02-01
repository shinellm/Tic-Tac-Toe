(function () {
    'use strict';

    angular.module('TicTacToe', [])
        .controller('TicTacToeController', TicTacToeController);

        TicTacToeController.$inject = ['$scope'];
        
        function TicTacToeController($scope) {
            $scope.modes = [
                {name: "icon-single-player", title: "single-player"},
                {name: "icon-two-player", title: "two-player"}
            ];
            $scope.icons = [
                {name: "icon-random", title: 'pick random'},
                {name: "icon-circle"},
                {name: "icon-cross"},
                {name: "icon-check"},
                {name: "icon-heart"},
                {name: "icon-star"},
                {name: "icon-puzzle"},
                {name: "icon-alarm-clock"},
                {name: "icon-coffee-cup"},
                {name: "icon-camera"},
                {name: "icon-house"},
                {name: "icon-umbrella"},
                {name: "icon-smiley-face"},
                {name: "icon-thumbs-up"},
                {name: "icon-person"},
                {name: "icon-sun"},
                {name: "icon-bell"},
                {name: "icon-pen"},
                {name: "icon-pencil"},
                {name: "icon-music"},
                {name: "icon-mobile"},
                {name: "icon-desktop"},
                {name: "icon-shopping-cart"}
            ];
            $scope.headers = [
                {name: "iconsSetOne", title: "Player 1's Icons", header: "iconsHeadingOne", player: 1},
                {name: "iconsSetTwo", title: "Player 2's Icons", header: "iconsHeadingTwo", player: 2}
            ];
            $scope.alertMsg = false;
            $scope.playerIcon = "";
            $scope.cpuPlayerIcon = "";
            $scope.player1Icon = "";
            $scope.player2Icon = "";
            $scope.player1Move = false;
            $scope.player2Move = false;
            $scope.gameBoard = [
                [{symbol: ""},{symbol: ""},{symbol: ""}],
                [{symbol: ""},{symbol: ""},{symbol: ""}],
                [{symbol: ""},{symbol: ""},{symbol: ""}]
            ];
            $scope.modeSelected = false;
            $scope.gameMode = "";
            $scope.gameStarted = false;
            $scope.gameStatus = "awaiting";
            $scope.movesLeft = 9;

            $scope.setGameMode = function(event) {
                $scope.modeSelected = true;
                console.log(event.target);
                console.log(event.target.title);
                $scope.gameMode = event.target.title;
            };

            $scope.setPlayerSymbol = function(event, player) {
                switch (player) {
                    case 1:
                        $scope.player1Icon = event.target.title;
                        if ($scope.player1Icon === 'icon-random') {
                            $scope.player1Icon = pickRandomIcon();
                        }
                        break;
                    case 2:
                        $scope.player2Icon = event.target.title;
                        if ($scope.player2Icon === 'icon-random') {
                            $scope.player2Icon = pickRandomIcon();
                        }
                        break;
                    default:
                        $scope.playerIcon = event.target.title;
                        if ($scope.playerIcon === 'icon-random') {
                            $scope.playerIcon = pickRandomIcon();
                        }
                }
                console.log('player symbol: ', $scope.playerIcon);
                console.log('player 1 symbol: ', $scope.player1Icon);
                console.log('player 2 symbol: ', $scope.player2Icon);
            };

            $scope.startGame = function() {
                if (checkAlertStatus() === true) {
                    return;
                };
                $scope.gameStarted = true;
                $scope.gameStatus = "in progress";
                $scope.cpuPlayerIcon = ($scope.gameMode === 'single-player') ? pickRandomIcon() : "";
                $scope.player1Move = true;
            };

            $scope.closeAlert = function() {
                $scope.alertMsg = false;
            };

            $scope.playersMove = function(event) {
                if ($scope.gameStatus === "in progress") {
                    console.log('player move: ', event.target);
                    console.log('player: ', $scope.playerIcon);
                    console.log('cpu: ' + $scope.cpuPlayerIcon);
                    if ($scope.gameMode === 'single-player') {
                        updateGameBoard(event.target.parentNode.title, event.target.title, $scope.playerIcon);
                        if ($scope.gameStatus !== "game over" && $scope.player2Move === true) {
                            cpuMove();
                        }
                    }
                    else if ($scope.gameMode === 'two-player') {
                        if ($scope.player1Move) {
                            updateGameBoard(event.target.parentNode.title, event.target.title, $scope.player1Icon);
                        }
                        else if ($scope.player2Move) {
                            updateGameBoard(event.target.parentNode.title, event.target.title, $scope.player2Icon);
                        }
                    }
                }
            }

            $scope.newMatch = function() {
                $scope.gameStatus = "in progress";
                $scope.gameStatusMsg = "";
                $scope.movesLeft = 9;
                $scope.gameBoard = [
                    [{symbol: ""},{symbol: ""},{symbol: ""}],
                    [{symbol: ""},{symbol: ""},{symbol: ""}],
                    [{symbol: ""},{symbol: ""},{symbol: ""}]
                ];
                otherPlayersTurn();
                if ($scope.player2Move === true && $scope.gameMode === 'single-player') {
                    cpuMove();
                }
            }

            $scope.exitMatch = function() {
                $scope.modeSelected = false;
                $scope.gameMode = "";
                $scope.gameStarted = false;
                $scope.gameStatus = "awaiting";
                $scope.gameStatusMsg = "";
                $scope.movesLeft = 9;
                $scope.gameBoard = [
                    [{symbol: ""},{symbol: ""},{symbol: ""}],
                    [{symbol: ""},{symbol: ""},{symbol: ""}],
                    [{symbol: ""},{symbol: ""},{symbol: ""}]
                ];
                $scope.playerIcon = "";
                $scope.cpuPlayerIcon = "";
                $scope.player1Icon = "";
                $scope.player2Icon = "";
                $scope.player1Move = false;
                $scope.player2Move = false;
            }

            function pickRandomIcon() {
                var randomIcon = $scope.icons[getRandomInt($scope.icons.length)].name;
                return (randomIcon !== $scope.playerIcon && randomIcon !== 'icon-random') ? randomIcon : pickRandomIcon();
            }

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            function checkAlertStatus() {
                if ($scope.gameMode === 'single-player' && $scope.playerIcon === "") {
                    $scope.alertMsg = true;
                }
                else if ($scope.gameMode === 'two-player' && ($scope.player1Icon === "" || $scope.player2Icon === "")) {
                    $scope.alertMsg = true;
                }
                return $scope.alertMsg;
            }

            function cpuMove() {
                var row = getRandomInt($scope.gameBoard.length);
                var col = getRandomInt($scope.gameBoard[0].length);

                if ($scope.gameBoard[row][col].symbol !== "") {
                    cpuMove();
                }
                else {
                    updateGameBoard(row, col, $scope.cpuPlayerIcon);
                }
            };

            function updateGameBoard(row, col, symbol) {
                if ($scope.gameBoard[row][col].symbol === "") {
                    $scope.gameBoard[row].splice(col, 1, {symbol: symbol});

                    decreaseMovesLeft();
                    console.log($scope.movesLeft)
                    if ($scope.movesLeft >= 0) {
                        checkForWin(row, col, symbol);
                        if ($scope.movesLeft === 0 && $scope.gameStatus !== "game over") {
                            showStatusMsg();
                        }
                        else {
                            otherPlayersTurn();
                        }
                    }
                }
            }

            function decreaseMovesLeft() {
                $scope.movesLeft -= 1;
            }

            function otherPlayersTurn() {
                var swap = $scope.player1Move;
                $scope.player1Move = $scope.player2Move;
                $scope.player2Move = swap;
            }

            function checkForWin(row, col, symbol) {
                console.log($scope.gameBoard)
                console.log('row win: ' + checkRowsForWin(row, symbol))
                console.log('col win: ' + checkColumnsForWin(col, symbol))
                console.log('diag win: ' + checkDiagonalsForWin(symbol))
                if (checkRowsForWin(row, symbol) || checkColumnsForWin(col, symbol) || checkDiagonalsForWin(symbol)) {
                    showStatusMsg(symbol);
                }
            }

            function showStatusMsg(symbol) {
                $scope.gameStatus = "game over";
                console.log(symbol)

                switch(symbol) {
                    case $scope.playerIcon:
                        $scope.gameStatusMsg = "You win! Play again?"
                        break;
                    case $scope.cpuPlayerIcon:
                        $scope.gameStatusMsg = "You Lose! Try again?"
                        break;
                    case $scope.player1Icon:
                        $scope.gameStatusMsg = "Player 1 Wins! Try again?"
                        break;
                    case $scope.player2Icon:
                        $scope.gameStatusMsg = "Player 2 Wins! Try again?"
                        break;
                    default:
                        $scope.gameStatusMsg = "It's a draw! Play again?"
                }
                console.log($scope.gameStatusMsg)
            }

            function checkRowsForWin(row, symbol) {
                for (var i = 0; i < 3; i++) {
                    if ($scope.gameBoard[row][i].symbol !== symbol) {
                        return false;
                    }
                }
                return true;
            }

            function checkColumnsForWin(col, symbol) {
                for (var i = 0; i < 3; i++) {
                    if ($scope.gameBoard[i][col].symbol !== symbol) {
                        return false;
                    }
                }
                return true;
            }

            function checkDiagonalsForWin(symbol) {
                var diagonalWin1 = true;
                var diagonalWin2 = true;
                
                for (var i = 0; i < 3; i++) {
                    if ($scope.gameBoard[i][i].symbol !== symbol) {
                        diagonalWin1 = false;
                    }
                    if ($scope.gameBoard[2-i][i].symbol !== symbol) {
                        diagonalWin2 = false;
                    }
                }
                return diagonalWin1 || diagonalWin2;
            }
        }
    }
)();
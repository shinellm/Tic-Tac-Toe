(function () {
    'use strict';

    angular.module('TicTacToe', [])
        .controller('TicTacToeController', TicTacToeController);

        TicTacToeController.$inject = ['$scope', '$timeout'];
        
        function TicTacToeController($scope, $timeout) {
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
            $scope.players = [
                {name: "", title: "Player 1", player: 'one', wins: 0},
                {name: "", title: "Player 2", player: 'two', wins: 0}
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
                $scope.gameMode = event.target.title;
            };

            $scope.setPlayerSymbol = function(event, player) {
                switch (player) {
                    case 1:
                        $scope.player1Icon = event.target.title;
                        if ($scope.player1Icon === 'icon-random') {
                            $scope.player1Icon = pickRandomIcon($scope.player2Icon);
                        }
                        $scope.players[0].name = $scope.player1Icon;
                        break;
                    case 2:
                        $scope.player2Icon = event.target.title;
                        if ($scope.player2Icon === 'icon-random') {
                            $scope.player2Icon = pickRandomIcon($scope.player1Icon);
                        }
                        $scope.players[1].name = $scope.player2Icon;
                        break;
                    default:
                        $scope.playerIcon = event.target.title;
                        if ($scope.playerIcon === 'icon-random') {
                            $scope.playerIcon = pickRandomIcon();
                        }
                        $scope.cpuPlayerIcon = pickRandomIcon($scope.playerIcon);
                        $scope.players[0].name = $scope.playerIcon;
                        $scope.players[1].name = $scope.cpuPlayerIcon;
                }
            };

            $scope.startGame = function() {
                if (checkAlertStatus() === true) {
                    return;
                };
                $scope.gameStarted = true;
                $scope.gameStatus = "in progress";
                $scope.player1Move = true;
            };

            $scope.closeAlert = function() {
                $scope.alertMsg = false;
            };

            $scope.playersMove = function(event) {
                if ($scope.gameStatus === "in progress") {
                    if ($scope.gameMode === 'single-player' && $scope.player1Move === true) {
                        updateGameBoard(event.target.parentNode.title, event.target.title, $scope.playerIcon);
                        if ($scope.gameStatus !== "game over" && $scope.player2Move === true) {
                            $timeout(function() {cpuMove()}, 1000);
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
                $scope.players = [
                    {name: "", title: "Player 1", player: 'one', wins: 0},
                    {name: "", title: "Player 2", player: 'two', wins: 0}
                ];
                $scope.playerIcon = "";
                $scope.cpuPlayerIcon = "";
                $scope.player1Icon = "";
                $scope.player2Icon = "";
                $scope.player1Move = false;
                $scope.player2Move = false;
            }

            function pickRandomIcon(notAllowed) {
                var randomIcon = $scope.icons[getRandomInt($scope.icons.length)].name;
                return (randomIcon !== notAllowed && randomIcon !== 'icon-random') ? randomIcon : pickRandomIcon(notAllowed);
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
                else {
                    $scope.alertMsg = false;
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
                if (checkRowsForWin(row, symbol) || checkColumnsForWin(col, symbol) || checkDiagonalsForWin(symbol)) {
                    showStatusMsg(symbol);
                }
            }

            function showStatusMsg(symbol) {
                $scope.gameStatus = "game over";

                switch(symbol) {
                    case $scope.playerIcon:
                        $scope.gameStatusMsg = "You win! Play again?"
                        $scope.players[0].wins += 1;
                        break;
                    case $scope.cpuPlayerIcon:
                        $scope.gameStatusMsg = "You Lose! Try again?"
                        $scope.players[1].wins += 1;
                        break;
                    case $scope.player1Icon:
                        $scope.gameStatusMsg = "Player 1 Wins! Try again?"
                        $scope.players[0].wins += 1;
                        break;
                    case $scope.player2Icon:
                        $scope.gameStatusMsg = "Player 2 Wins! Try again?"
                        $scope.players[1].wins += 1;
                        break;
                    default:
                        $scope.gameStatusMsg = "It's a draw! Play again?"
                }
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
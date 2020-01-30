(function () {
    'use strict';

    angular.module('TicTacToe', [])
        .controller('TicTacToeController', TicTacToeController);

        TicTacToeController.$inject = ['$scope'];
        
        function TicTacToeController($scope) {
            $scope.icons = [
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
            $scope.iconSelected = false;
            $scope.alertMsg = false;
            $scope.playerIcon = "";
            $scope.cpuPlayerIcon = "";
            $scope.gameBoard = [
                [{symbol: ""},{symbol: ""},{symbol: ""}],
                [{symbol: ""},{symbol: ""},{symbol: ""}],
                [{symbol: ""},{symbol: ""},{symbol: ""}]
            ];
            $scope.gameStarted = false;
            $scope.gameStatus = "awaiting";
            $scope.movesLeft = 9;


            $scope.setPlayerSymbol = function(event) {
                $scope.playerIcon = event.target.title;
                $scope.iconSelected = true;
            };

            $scope.startGame = function() {
                if ($scope.iconSelected === false) {
                    $scope.alertMsg = true;
                    return;
                }
                $scope.gameStarted = true;
                $scope.gameStatus = "in progress";
                $scope.cpuPlayerIcon = pickRandomIcon();
            };

            $scope.closeAlert = function() {
                $scope.alertMsg = false;
            };

            $scope.playersMove = function(event) {
                if ($scope.gameStatus === "in progress") {
                    updateGameBoard(event.target.parentNode.title, event.target.title, $scope.playerIcon);
                    if ($scope.gameStatus !== "game over") {
                        cpuMove();
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
            }

            $scope.exitMatch = function() {
                $scope.gameStarted = false;
                $scope.gameStatus = "awaiting";
                $scope.gameStatusMsg = "";
                $scope.movesLeft = 9;
                $scope.gameBoard = [
                    [{symbol: ""},{symbol: ""},{symbol: ""}],
                    [{symbol: ""},{symbol: ""},{symbol: ""}],
                    [{symbol: ""},{symbol: ""},{symbol: ""}]
                ];
                $scope.iconSelected = false;
                $scope.playerIcon = "";
                $scope.cpuPlayerIcon = "";
            }

            function pickRandomIcon() {
                var randomIcon = $scope.icons[getRandomInt($scope.icons.length)].name;
                return (randomIcon !== $scope.playerIcon) ? randomIcon : pickRandomIcon();
            }

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
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
                    decreaseMovesLeft();
                    $scope.gameBoard[row].splice(col, 1, {symbol: symbol});

                    if ($scope.movesLeft > 0) {
                        checkForWin(row, col, symbol);
                    }
                    else {
                        showStatusMsg(symbol);
                    }
                }
            }

            function decreaseMovesLeft() {
                $scope.movesLeft -= 1;
            }

            function checkForWin(row, col, symbol) {
                if (checkRowsForWin(row, symbol) || checkColumnsForWin(col, symbol) || checkDiagonalsForWin(symbol)) {
                    showStatusMsg(symbol);
                }
            }

            function showStatusMsg(symbol) {
                $scope.gameStatus = "game over";

                if ($scope.movesLeft === 0) {
                    $scope.gameStatusMsg = "It's a draw! Play again?"
                }
                else if ($scope.playerIcon === symbol) {
                    $scope.gameStatusMsg = "You win! Play again?"
                }
                else {
                    $scope.gameStatusMsg = "You Lose! Try again?"
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
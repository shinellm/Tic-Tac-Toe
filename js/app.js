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


            $scope.setPlayerSymbol = function(event) {
                $scope.playerIcon = event.target.title;
                $scope.iconSelected = true;
                console.log($scope.playerIcon);
            };

            $scope.startGame = function() {
                if ($scope.iconSelected === false) {
                    $scope.alertMsg = true;
                    return;
                }
                $scope.gameStarted = true;
                console.log('player icon : ' + $scope.playerIcon);
                $scope.cpuPlayerIcon = pickRandomIcon();
                console.log('cpu icon : ' + $scope.cpuPlayerIcon);
            };

            $scope.closeAlert = function() {
                $scope.alertMsg = false;
            };

            $scope.playersMove = function(event) {
                // event.target.className += ' playIcon ' + $scope.playerIcon;
                console.log('row: ' + event.target.parentNode.title, 'col: ' + event.target.title);
                updateGameBoard(event.target.parentNode.title, event.target.title, $scope.playerIcon);
                cpuMove();
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
                console.log('computer row: ' + row + ' col: ' + col)
                $scope.gameBoard[row].splice(col, 1, {symbol: $scope.cpuPlayerIcon});

            };

            function updateGameBoard(row, col, symbol) {
                $scope.gameBoard[row][col].symbol = symbol;
                console.log($scope.gameBoard);
            }

            function checkBoard() {
                
            }
        }
    }
)();
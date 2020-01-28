(function () {
    'use strict';

    angular.module('TicTacToe', [])
        .controller('TicTacToeController', TicTacToeController);

        TicTacToeController.$inject = ['$scope'];
        
        function TicTacToeController($scope) {
            $scope.gameBoard = [];
            $scope.player = "";
            $scope.gameStarted = false;
            $scope.row1Col1 = "";
            $scope.row1Col2 = "";
            $scope.row1Col3 = "";
            $scope.row2Col1 = "";
            $scope.row2Col2 = "";
            $scope.row2Col3 = "";
            $scope.row3Col1 = "";
            $scope.row3Col2 = "";
            $scope.row3Col3 = "";

            $scope.startGame = function() {
                $scope.gameStarted = true;
                // for (var i = 0; i < 3; i++) {
                //     $scope.gameBoard[i] = new Array(3);
                // }
            };

            $scope.addMove = function(pos) {
                
            };

            function checkBoard() {
                
            }
        }
    }
)();
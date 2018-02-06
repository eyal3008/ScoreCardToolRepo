angular.module('fileModelDirective', [])

.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var parsedFile = $parse(attrs.fileModel);
      var parsedFileSetter = parsedFile.assign;

      element.bind('change', function() {    // on any change, it gonna parse the file and update scope
        scope.$apply(function() {  // this is how its updated
          parsedFileSetter(scope, element[0].files[0]);
        });
      });
    }
  };
  console.log('im on directive');
}]);

// so here we parsing the file, and then updating the scope with that file

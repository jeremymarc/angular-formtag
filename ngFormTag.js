angular.module('formtag', [])
.directive('ngFormTag', function() {
  return {
    restrict: 'A',
    scope: true,
    transclude: false,
    require: '?ngModel',
    compile: (function(_this) {
      return function(element, attrs, transclude) {
        if (attrs.ngModel) {
          attrs.$set('ngModel', attrs.ngModel, false);
        }
        return function($scope, element, attrs, ngModel) {
          var _options;
          _options = {};
          eval("_options =" + attrs.ngFormtagOptions);
          element.formtag(_options);
          $scope.$watch(attrs.ngModel, (function(newVal, oldVal) {
            $('.' + _options.namespace + 'wrapper').remove();
            element.formtag(_options);
            if (!$scope.$$phase) {
              $scope.$apply();
            }
          }), true);
          return element.on('change', function(a) {
            var model, submit, value;
            value = $(a.target).val();
            model = '$scope.' + $(a.target).attr('ng-model');
            eval(model += "= value");
            submit = '$scope.' + attrs.ngFormTag;
            return eval(submit);
          });
        };
      };
    })(this)
  };
});

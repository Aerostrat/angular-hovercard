/**
 * Angular hovercard directive.
 * @version v1.0.3 - 2016-08-04
 * @link https://github.com/yaru22/angular-hovercard
 * @author Brian Park <yaru22@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* global angular */
'use strict';
angular.module('yaru22.hovercard', ['yaru22.hovercard.tmpls']).directive('hovercard', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'template/angular-hovercard.tmpl',
    scope: true,
    link: function ($scope, $element, $attrs) {
      $scope.hoverTmplUrl = $attrs.hoverTmplUrl;
      $attrs.$observe('eventData', function (eventData) {
        $scope.eventData = $scope.$eval(eventData);
        $scope.hoverCardStyle.background = $scope.eventData.color;
      });
      $scope.onHoverIn = $scope.$eval($attrs.onHoverIn);
      $scope.onHoverOut = $scope.$eval($attrs.onHoverOut);
      var placement = $attrs.placement || 'bottomRight';
      $scope.hoverLabelStyle = {};
      if ($attrs.labelColor) {
        $scope.hoverLabelStyle.color = $attrs.labelColor;
      }
      $scope.hoverCardStyle = {};
      if ($attrs.background) {
      }
      if ($attrs.width) {
        $scope.hoverCardStyle.width = $attrs.width;
      }
      if (placement) {
        var positionStrings = placement.replace(/([A-Z])/g, ' $1').toLowerCase().split(' ');
        var positionObj = {};
        positionObj[positionStrings[0]] = true;
        positionObj[positionStrings[1]] = true;
        if (positionObj.bottom) {
          $scope.hoverCardStyle.bottom = '';
          $scope.hoverCardStyle.top = '-1em';
          $scope.hoverCardStyle['padding-bottom'] = '';
          $scope.hoverCardStyle['padding-top'] = '3em';
        }
        if (positionObj.top) {
          $scope.hoverCardStyle.bottom = '-1em';
          $scope.hoverCardStyle.top = '';
          $scope.hoverCardStyle['padding-bottom'] = '';
          $scope.hoverCardStyle['padding-top'] = '';
        }
        if (positionObj.left) {
          $scope.hoverCardStyle.left = '';
          $scope.hoverCardStyle.right = '-1em';
        }
        if (positionObj.right) {
          $scope.hoverCardStyle.left = '-1em';
          $scope.hoverCardStyle.right = '';
        }
      }
    }
  };
});
angular.module('yaru22.hovercard.tmpls', []).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/angular-hovercard.tmpl', '<div class=angular-hovercard ng-mouseenter="showCard = true; onHoverIn()" ng-mouseleave="showCard = false; onHoverOut()"><label class=angular-hovercard-label ng-class="{ \'angular-hovercard-active\': showCard }" ng-style=hoverLabelStyle ng-transclude></label><div class=angular-hovercard-detail ng-class="{ \'angular-hovercard-active\': showCard }" ng-include=hoverTmplUrl ng-style=hoverCardStyle></div></div>');
  }
]);
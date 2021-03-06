angular.module( 'app', [
    'ui.router',
    'ui.bootstrap',
    'appTemplates',
    'app.about',
    'appData'
])

.constant( 'APP_TITLE', 'Node Angular Starter' )

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
     $stateProvider.state( 'home', {
        url: '/',
        data: {
            pageTitle: 'Home'
        }
    } );
    $urlRouterProvider.otherwise( '/' );
})

.run( function run ( $rootScope, APP_TITLE ) {
    $rootScope.APP_TITLE = APP_TITLE;
})

.controller( 'AppCtrl', function AppCtrl ( $scope, APP_TITLE, APIService ) {

    $scope.userInfo = null;
    APIService.getUserInfo().then( function ( response ) {
        $scope.userInfo = response.data;
        console.log( $scope.userInfo );
    });

    $scope.navCollapsed = true;

    // Update the page title according the current state data.
    $scope.$on( '$stateChangeSuccess', function( event, toState ) {
        if ( angular.isDefined( toState.data.pageTitle ) ) {
            $scope.pageTitle = toState.data.pageTitle + ' | ' + APP_TITLE;
        }
    });
})

;
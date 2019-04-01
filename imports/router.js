Router.route('/', function(){
    this.layout('layout');
    this.render('main');
});

Router.route('/newNotifications', function(){
    this.layout('layout');
    this.render('newNotifications');
});

Router.route('/:gymID/:toolID/notify/', function(){
    var gymID = this.params.gymID;
    var toolID = this.params.gymID;

    this.layout('layout');
    this.render('notify');
});

$(document).ready(function () {
    var wrapperChildren = $("#content").children();
    var sections = [];
    for (var i = 0; i < wrapperChildren.length; i++) {
        sections.push(wrapperChildren[i].id.slice(0,-4));
    }
    for (let i of sections) {
        $('#sb_'+i).on('click', function(){
            $('#sidebar li').removeClass();
            $(this).parent().addClass('active');
            $('#content').scrollTo('#'+i+"_div", {duration:500,});
        });
    }


    $('#content').on('scroll', function(){
        var wrapperChildren = $("#content").children();
        let curScrollPos = $("#content").scrollTop();
        let iterHeight = 0;
        for (var i = 0; i < wrapperChildren.length; i++) {
            if(iterHeight + $(wrapperChildren[i]).height() > curScrollPos){
                $('#sidebar li').removeClass();
                $('#sb_'+wrapperChildren[i].id.slice(0,-4)).parent().addClass('active');
                console.log('#sb_'+wrapperChildren[i].id.slice(0,-4));
                break;
            }
        }
    });
});

let script = 'https://script.google.com/macros/s/AKfycby5bX31JwGbPzhumA7atIgDdQwwD-qoTw3DXVcnL8tVmej_t8vm/exec';

let headervue = new Vue({
    el: '#wrapperid',
    data: {
        name: "First Last",
        desig: "Desig",
        affiliatedOrg: "Organisation",
        logourl: "logo_URL",
        facebook: false,
        linkedin: false,
        email: false,
        github: false,
        location: false,
        experience: [],
        aboutme: "",
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods:{
        handleResize(){
            if(window.innerWidth < 768){
                $('#sidebar').addClass('active');
            }else{
                $('#sidebar').removeClass('active');
            }
        }
    }
});


function loadProfile(){
    axios.get(script+'?type=profile',{crossdomain: true}).then(function (response) {
              // handle success
        let profile = response.data;
        headervue.name = profile.name;
        headervue.desig = profile.affiliation.desig;
        headervue.affiliatedOrg = profile.affiliation.name;
        headervue.logourl = profile.affiliation.logo;
        headervue.facebook = profile.social.facebook;
        headervue.linkedin = profile.social.linkedin;
        headervue.github = profile.social.github;
        headervue.email = "mailto: "+profile.social.mail;
        headervue.aboutme = profile.aboutme;
        headervue.experience = profile.experience;
    });
}

loadProfile();

/**
 * Created by 陈岳钦 on 2017/3/8.
 */
myApp = angular.module('myApp',['ngRoute']);
//路由配置
myApp.config(function($routeProvider){
    $routeProvider.when('/',{templateUrl:'views/login.html',controller:'loginCtrl'})
                    .when('/register',{templateUrl:'views/register.html',controller:'registerCtrl'})
                     .when('/view',{templateUrl:'views/view.html',controller:'viewCtrl'});
});
myApp.controller('loginCtrl',function($scope,$http){
    //登录验证
    $scope.login=function(){
        var uname = $('.login #user').val();
        var pword = $('.login #password').val();
        if(uname.trim()== ''){
            $scope.uError= true;
            loginName= false;
        }else{
            $scope.uError= false;
            loginName= true;
        }
        if(pword.trim()==''){
            $scope.pError= true;
            loginPword= false;
        }else{
            $scope.pError= false;
            loginPword= true;
        }
        if(loginName== true&&loginPword== true){
            $http({
                method:'post',
                url:'php/login.php',
                params:{'username':uname, 'password':pword}
            }).success(function(response){
                if(response == 1){
                    sessionStorage.setItem('user',uname);
                    window.location.href='#/view';
                }else{alert('用户名或密码错误！')}
            }).error(function(){
                alert('请求失败！')
            });
        }else{return false;}

    };
});

//注册功能
myApp.controller('registerCtrl',function($scope,$http){
    //检查用户名是否重复
    $scope.checkName=function(){
        var uname = $('.register #user').val();
        $http({
            method:'get',
            url:'php/checkName.php',
            params:{'username':uname}
        }).success(function(response){
            if(response == 1){
                $scope.uError = false;
                $scope.nameExisted = true;
                noName= false;
            }else{
                $scope.uError = false;
                $scope.nameExisted = false;
                noName= true;
            }
        });
    };

//提交注册信息
$scope.register=function(){
        var uname = $('.register #user').val();
        var upword = $('.register #password').val();
        var rupword = $('.register #rpassword').val();
    //验证用户名合法性
        if(uname.trim()==''){
            $scope.uError= true;
            uName= false;
        }else if(uname.match(/\s/)){
            $scope.kongge= true;
            uName= false;
        }else{
            $scope.kongge= false;
            uName= true;
        }
    //验证密码合法性
        if(upword.trim()== ''){
            $scope.pError= true;
            noPword= false;
        }else{
            $scope.pError= false;
            noPword= true;
        }
        if(rupword != upword){
            $scope.rpError= true;
            p2p= false;
        }else{
            $scope.rpError= false;
            p2p= true;
        }
        if(rupword == ''){
            $scope.norpError= true;
            $scope.rpError= false;
            noRpWord= false;
        }else{
            $scope.norpError= false;
            noRpWord= true;
        }

        if(noName== true&&uName== true&&noPword== true&&p2p== true&&noRpWord== true){
            $http({
                method:'post',
                url:'php/register.php',
                params:{'username':uname, 'password':upword}
            }).success(function(response){
                if(response == 1){
                    alert('注册成功，请登录！');
                    window.location.href='#/';
                }else{alert('注册失败！')}
            }).error(function(){
                alert('请求失败！');
            });
        }else{return false;}
    }
});

// 列表加载、展示、操作
//判断时间
    function checkTime(){
        var now =new Date();
        var hour= now.getHours();
        time= null;
        if(hour<= 11){time= '上午好'}
        else if(11<hour&&hour<= 13){time= '中午好'}
        else if(13<hour&&hour<= 18){time= '下午好'}
        else if(18<hour&&hour<= 23){time= '晚上好'}
    }
//登录验证
myApp.controller('viewCtrl',function($scope,$http){
    var user = sessionStorage.getItem('user');
    $scope.user= user;
    if(user == null){
        window.location.href='#/';
    }
    checkTime();
    $scope.time= time;
    $http({
        method:'get',
        url:'php/view.php',
        params:{'user':user}
    }).success(function(response){
        $scope.total= response.length;
        $scope.names= response;
    }).error(function(){
        alert('请求失败！');
    });

    //退出
    $scope.exit= function () {
        if(confirm('确定退出？')){
            sessionStorage.removeItem('user');
            window.location.reload();
        }else{return false}
    };

    //添加新员工
    $scope.showAddBox= false;
    $scope.add=function(){
        $scope.showAddBox= true;
        $scope.isAdd= true;
        $scope.isEdit= false;
        $scope.type= '新增';
    };
    //取消添加或修改
    $scope.addCancel=function(){
        $scope.showAddBox= false;
        $('.addBox .name').val('');
        $('.addBox .sex').val('男');
        $('.addBox .remark').val('');
    };
    //保存添加
    $scope.addSave=function(){
        var user= sessionStorage.getItem('user');
        var name= $('.addBox .name').val();
        var sex= $('.addBox .sex').val();
        var remark= $('.addBox .remark').val();
        if(name.trim()==''){
            alert('请输入姓名！');
        }else{
            $http({
                method:'post',
                url:'php/add.php',
                params:{'user':user,'name':name,'sex':sex,'remark':remark}
            }).success(function(response){
                if(response == 1){
                    $scope.showAddBox= false;
                    window.location.reload();
                }else{alert('添加失败，请重新添加！')}
            }).error(function(){
                alert('请求失败！');
            });
        }

    };
    //编辑列表
    $scope.edit=function(){
        $scope.showAddBox= true;
        $scope.type= '编辑';
        $scope.isAdd= false;
        $scope.isEdit= true;
    };
    var view= $('.view');
    view.delegate('.eBtn','click',function(){
        var tr= $(this).parent().parent();
        id= tr.attr('id');
        var name= tr.find('td').eq(1).text();
        var sex= tr.find('td').eq(2).text();
        var remark= tr.find('td').eq(3).text();
        var editBox= $('.addBox');
        $('.name').val(name).focus();
        $('.sex').val(sex);
        $('.remark').val(remark);
    });
    //保存修改
    $scope.editSave= function(){
        var name= $('.addBox .name').val();
        var sex= $('.addBox .sex').val();
        var remark= $('.addBox .remark').val();
        if(name.trim()==''){
            alert('请输入姓名！');
        }else {
            $http({
                method: 'post',
                url: 'php/edit.php',
                params: {'id': id, 'name': name, 'sex': sex, 'remark': remark}
            }).success(function (response) {
                if (response == 1) {
                    $scope.showAddBox = false;
                    window.location.reload();
                } else {
                    alert('修改失败，请重新修改！')
                }
            }).error(function () {
                alert('请求失败！');
            });
        }
    };
    //删除
   view.delegate('.dBtn','click',function(){
       var id= $(this).parent().parent().attr('id');
       if(confirm('确定删除？')){
           $http({
               method:'post',
               url:'php/delete.php',
               params:{'id':id}
           }).success(function(response){
               if(response == 1){
                   window.location.reload();
               }else{alert('删除失败，请重试！')}
           }).error(function(){
               alert('请求失败！');
           });
       }else{return false}

    });

});

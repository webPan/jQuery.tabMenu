/*
 * jQuery tabMenu Plugin
 *
 * Copyright (c) 2017/04/11 by fengyeqing
 *
 * @version 1.0.0
 *
 * Example usage:
 * $().tabMenu({
 *		leftMenu   : $('#left-menu'),//左边菜单
 *		topTabMenu : $('#top-tab-menu'),//顶部菜单
 *		iframe     : $('#iframe')//框架内容
 });
 */

//面向对象插件开发
;(function($,window,document,undefined){
	var tabMenu = function(opt) {

		this.defaults = {//绑定内容位置
			leftMenu   : $('#left-menu'),//左边菜单
			topTabMenu : $('#top-tab-menu'),//顶部菜单
			iframe     : $('#iframe')//框架内容
		},

		this.opt = $.extend({} , this.defaults , opt);
	}

	//左侧菜单栏点击事件
	tabMenu.prototype = {
		leftMenuFunc : function(){
			var iframe = this.opt.iframe , leftMenu = this.opt.leftMenu , topTabMenu = this.opt.topTabMenu;
			this.opt.leftMenu.find('a').each(function(i){
				$(this).click(function(){
					//验证当前单机的a标签是否已经插入节点，如果已经插入，则不再插入，如果没插入那追加节点
					if(topTabMenu.find('li').hasClass($(this).attr('target'))){
						iframe.find('iframe').hide();//让所有iframe隐藏
                    	iframe.find('.'+$(this).attr('target')).show(); 
                    	topTabMenu.find('.'+$(this).attr('target')).addClass('active').siblings().removeClass('active');
						return false;
					}

					//清除active类
					topTabMenu.find('li').removeClass('active');

					//topTabMenu插入
					topTabMenu.append('<li class="active '+$(this).attr('target')+' " data-index='+$(this).attr('target')+'>'+$(this).html()+'<span>X</span></li>');

					iframe.find('iframe').hide();//让所有iframe隐藏
					//iframe插入
					iframe.append("<iframe class='if"+i+"' name="+$(this).attr('target')+" src="+$(this).attr('href')+" width='100%' height='100%' frameborder='0'></iframe>");
					var TabMenu = new tabMenu();
					TabMenu.topTabMenuFunc(),TabMenu.iframeFunc()
				});
			});
		},
		//顶部菜单栏切换
		topTabMenuFunc : function(){
			var iframe = this.opt.iframe , leftMenu = this.opt.leftMenu , topTabMenu = this.opt.topTabMenu;
				topTabMenu.find('li').each(function(){
					$(this).click(function(){
						$(this).addClass('active').siblings().removeClass('active');
                		iframe.find('iframe').hide();//让所有iframe隐藏
                		var active=$(this).attr('data-index');
                		$('.'+active).show();
					});
			});
		},
		//iframe节点删除
		iframeFunc : function(){
			var iframe = this.opt.iframe , topTabMenu = this.opt.topTabMenu;
			topTabMenu.find('span').each(function(){//单机X删除当前节点及相应iframe节点
            $(this).click(function(){
            	var $index = $(this).parent().attr('data-index');
                if($(this).parent().hasClass('active')){
                    $(this).parent().prev().addClass('active');
                    iframe.find('.'+$index).prev().show();
                }
               
                
                iframe.find('.'+$index).remove();
                $(this).parent().remove();
                $('iframe:last').show();
                return false;
            });
        });
		}
	}

	//在插件中使用对象方法
	$.fn.tabMenu = function(opt){
		var TabMenu = new tabMenu(this , opt);
		return 	[TabMenu.leftMenuFunc(),TabMenu.topTabMenuFunc(),TabMenu.iframeFunc()];
	}
})(jQuery,window,document);


	/*
	思路:

    A 、点击A标签：插入顶部菜单
                 当前项变为活动状态
                 其他iframe隐藏，插入当前点击iframe便签内容
                 
    B 、点击X图标：删除当前对应的iframe标签
                 让最后一个标签变为活动状态
                 
    C 、点击选项卡：被点击项为活动状态
                  iframe内容相应的切换
                 
                 
*/
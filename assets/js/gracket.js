(function(g){
  g.fn.gracket=function(k){
    g.fn.gracket.defaults={
      gracketClass:"g_gracket",
      gameClass:"g_game",
      roundClass:"g_round",
      roundLabelClass:"g_round_label",
      teamClass:"g_team",
      winnerClass:"g_winner",
      spacerClass:"g_spacer",
      currentClass:"g_current",
      cornerRadius:15,
      canvasId:"g_canvas",
      canvasClass:"g_canvas",
      canvasLineColor:"#eee",
      canvasLineCap:"round",
      canvasLineWidth:2,
      canvasLineGap:15,
      roundLabels:[],
      src:{}
    };

  if("object"!==typeof JSON)
    return g.error("json2 does not exsist. Please add the script to your head!");
  var j=this,q=JSON.parse(j.data("gracket"))||JSON.parse(this.gracket.defaults.src),r,s,y;g.fn.gracket.settings={};
  var t={
    init:function(a){
      this.gracket.settings=g.extend({},this.gracket.defaults,a);
      this.gracket.settings.canvasId=this.gracket.settings.canvasId+"_"+(new Date).getTime();
      a=document.createElement("canvas");
      a.id=this.gracket.settings.canvasId;
      a.className=this.gracket.settings.canvasClass;
      a.style.position="absolute";
      a.style.left=0;
      a.style.top=0;
      a.style.right="auto";
      j.addClass(this.gracket.settings.gracketClass).prepend(a);
      s=q.length;
      for(a=0;a<s;a++){
        var d=l.build.round(this.gracket.settings);
        j.append(d);
        y=q[a].length;
        for(var b=0;b<y;b++){
          var c=l.build.game(this.gracket.settings),f=j.find("."+this.gracket.settings.gameClass).outerHeight(!0),f=l.build.spacer(this.gracket.settings,f,a,0!==a&&0===b?!0:!1);
          0==b%1&&0!==a&&d.append(f);
          d.append(c);
          r=q[a][b].length;
          for(f=0;f<r;f++){
            var o=l.build.team(q[a][b][f],this.gracket.settings);
            c.append(o);
            1===r&&(c.prev().remove(),l.align.winner(c,this.gracket.settings,c.parent().prev().children().eq(0).height()), l.listeners(this.gracket.settings,q,c.parent().prev().children().eq(1)))
          }
        }
      }
    }
  },
  l={
    build:{
      team:function(a,d){
        return team=g("<div />",{html:"<h3><span>"+(a.seed||0)+"</span> "+a.name+"</h3>","class":d.teamClass+" "+(a.id||"id_null")})
      },
      game:function(a){
        return game=g("<div />",{"class":a.gameClass})
      },
      round:function(a){
        return round=g("<div />",{"class":a.roundClass})
      },
      spacer:function(a,d,b,c){
        return spacer=g("<div />",{"class":a.spacerClass}).css({height:c?(Math.pow(2,b)-1)*(d/2):(Math.pow(2,b)-1)*d})
      },
      labels:function(a,d){
        var b,c=a.length,f;for(b=0;b<c;b++)f=0===b?d.padding+d.width*b:d.padding+d.width*b+d.right*b,g("<h5 />",{text:d.labels.length?d.labels[b]:"Round "+(b+1),"class":d["class"]}).css({position:"absolute",left:f,width:d.width}).prependTo(j)
      },
      canvas:{
        resize:function(a){
          a=document.getElementById(a.canvasId);a.height=j.innerHeight();a.width=j.innerWidth();g(a).css({height:j.innerHeight(),width:j.innerWidth(),zIndex:1,pointerEvents:"none"})
        },
        draw:function(a,d,b){
          var c=document.getElementById(a.canvasId);
          "undefined"!=typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(c);
          var c=c.getContext("2d"),f=b.outerWidth(!0),o=b.outerHeight(!0),k=parseInt(j.css("paddingLeft"))||0,q=parseInt(j.css("paddingTop"))||0;parseInt(b.css("marginBottom"));
          var r=f+k,p=parseInt(j.find("> div").css("marginRight"))||0,e=a.cornerRadius,u=a.canvasLineGap,t=b.height()-2*b.find("> div").eq(1).height();_playerHt=b.find("> div").eq(1).height();
          e>o/3&&(e=o/3);e>p/2&&(e=p/2-2);0>=e&&(e=1);u>p/3&&(u=p/3);
          c.strokeStyle=a.canvasLineColor;
          c.lineCap=a.canvasLineCap;c.lineWidth=a.canvasLineWidth;
          c.beginPath();
          var b=Math.pow(2,d.length-2),m=0,v,s=0.5,w=0===m&&1===b?!0:!1;
          if(w)
            var x=g("."+a.gameClass),f=x.eq(x.length-1),o=f.outerHeight(!0),f=f.outerWidth(!0);
          for(;1<=b;){
            for(v=0;v<b;v++){
              1==b&&(s=1);
              var h=w?f+k:r+m*f+m*p,i=s*p,n=((Math.pow(2,m-1)-0.5)*(m&&1)+v*Math.pow(2,m))*o+q+(w?x.find("> div").eq(1).height():_playerHt)+t/2;c.moveTo(h+u,n);
              1<b?c.lineTo(h+i-e,n):c.lineTo(h+i-u,n);
              b<Math.pow(2,d.length-2)&&(c.moveTo(h-f-u,n),c.lineTo(h- f-0.5*p,n));
              1<b&&0==v%2&&(c.moveTo(h+i,n+e),c.lineTo(h+i,n+Math.pow(2,m)*o-e),h=h+i-e,i=n+e,c.moveTo(h,i-e),c.arcTo(h+e,i-e,h+e,i,e),i=n+Math.pow(2,m)*o-e,c.moveTo(h+e,i-e),c.arcTo(h+e,i+e,h,i+e,e))}m++;b/=2}c.stroke();l.build.labels(d,{width:f,padding:k,left:r,right:p,labels:a.roundLabels,"class":a.roundLabelClass})
        }
      }
      },
      align:{
        winner:function(a,d,b){
          b=1===a.parent().siblings().not("canvas").length?b-(a.height()+a.height()/2):b+a.height()/2;
          return a.addClass(d.winnerClass).css({"margin-top":b})
        }
      },
        listeners:function(a,d,b){
          g.each(g("."+a.teamClass+" > h3"),function(){
            var b="."+g(this).parent().attr("class").split(" ")[1];void 0!==b&&g(b).hover(function(){
              g(b).addClass(a.currentClass)},function(){
                g(b).removeClass(a.currentClass)
              })
          });
          l.build.canvas.resize(a);
          l.build.canvas.draw(a,d,b)}
        };
          if(t[k])
            return t[k].apply(this,Array.prototype.slice.call(arguments,1));
          if("object"===typeof k||!k)
            return t.init.apply(this,arguments);
          g.error('Method "'+k+'" does not exist in gracket!')
  }
})(jQuery);

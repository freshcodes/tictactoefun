(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"k6+y":function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return c}));var r=n("hosL"),o=n("Y3FI"),s=n("ddgq"),i=n("k8bO"),a=n("7YW4");class c extends r.Component{constructor(t){super(t),this.boardClick=t=>{console.log("BoardClick",t,this.game),this.game.finished||this.game.nextPlayer===this.player&&(t.isEmpty||alert("This space is already taken"),this.controller.move(t.boardIndex))},this.restart=()=>{this.controller.restart()},this.newgame=()=>{Object(o.b)("/")},this.state={connectedToPeer:!1,connectedToPlayer:!1,waiting:!0,error:!1,win:[],board:i.a.generateEmptyBoard()},"undefined"!=typeof window&&(this.hostId=window.location.search.replace("?",""),this.controller=new a.a(i.a.O),this.controller.on("open",()=>{this.setState({connectedToPeer:!0}),this.controller.connectToHost(this.hostId)}),this.controller.on("connected",()=>this.setState({connectedToPlayer:!0})),this.controller.on("updatedGameState",t=>{this.setState({waiting:this.game.nextPlayer!==this.player,win:t.winIndexes,board:t.board})}))}get player(){return this.controller&&this.controller.player}get game(){return this.controller&&this.controller.game}status(){return this.game&&this.game.finished?this.game.draw?"Tie":this.player===i.a.X&&this.game.xWin||this.player===i.a.O&&this.game.oWin?"You won":"You lost":this.state.waiting?"Waiting...":"Your turn..."}renderConnecting(){return Object(r.h)("main",null,Object(r.h)("p",null,"Connecting..."),this.renderButtons())}renderWaitingForPlayer(){return Object(r.h)("main",null,Object(r.h)("p",null,"Connecting to player..."),this.renderButtons())}renderBoard(){const t=this.state.connectedToPlayer?Object(r.h)(s.a,{win:this.state.win,board:this.state.board,click:this.boardClick}):Object(r.h)("div",null);return Object(r.h)("main",null,Object(r.h)("p",null,"You are playing as O."),Object(r.h)("div",{class:"board-wrapper"},t,Object(r.h)("span",{class:"status"},this.status())),this.renderButtons())}renderButtons(){const t=this.game&&this.game.finished?Object(r.h)("button",{onclick:this.restart},"Restart"):"";return Object(r.h)("p",null,t,Object(r.h)("button",{onclick:this.newgame},"New Game"))}render(t,e){return e.connectedToPeer?e.connectedToPlayer?this.renderBoard():this.renderWaitingForPlayer():this.renderConnecting()}}}}]);
//# sourceMappingURL=route-remote_game.chunk.db261.esm.js.map
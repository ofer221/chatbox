(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},106:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(27),o=a.n(s),c=(a(67),a(14)),i=a(15),u=a(18),l=a(16),m=a(17),p=a(5),g=a.n(p),f=a(10),h=a(30),d=a(9),E=a(57),v=a.n(E),S=a(2),N=window.location.origin,b=function(e,t,a){return fetch(N+e,{method:"POST",body:JSON.stringify(t),headers:Object(S.a)({"Content-Type":"application/json"},a)})},w=function(e){return{type:"UI_SET_LOGIN_ERROR",error:e}},y=a(11),O=a(58),C=a(59),I={isLoading:!1,isSignup:!1,loginError:""};var k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;return"UI_START_LOADING"===t.type?function(e,t){return Object(S.a)({},e,{isLoading:!0})}(e):"UI_STOP_LOADING"===t.type?function(e,t){return Object(S.a)({},e,{isLoading:!1})}(e):"IS_SIGNUP"===t.type?function(e,t){return Object(S.a)({},e,{isSignup:t,loginError:""})}(e,t.isSignup):"UI_SET_LOGIN_ERROR"===t.type?function(e,t){return Object(S.a)({},e,{loginError:t})}(e,t.error):e},j={token:"",username:"",isAuth:!1,socket:{}};var x=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,a=arguments.length>1?arguments[1]:void 0;return"SET_AUTH"===a.type?{token:(e=a.authData).token,username:e.username,isAuth:e.authState,socket:e.socket}:t},_=a(39),A={users:[],messages:[],activeChat:""};var T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;return"SET_USERS"===t.type?function(e,t){var a=Object(_.a)(e,function(e){var a=e.users.filter(function(e){return-1!==t.findIndex(function(t){return t.username===e.username})});e.users=function(e){for(var t=e.concat(),a=0;a<t.length;++a)for(var n=a+1;n<t.length;++n)t[a].username===t[n].username&&t.splice(n--,1);return t}(a.concat(t))});return Object(S.a)({},e,{users:a.users})}(e,t.users):"SEND_MESSAGE"===t.type?function(e,t){return Object(S.a)({},e,{messages:e.messages.concat([t])})}(e,t.message):"GET_MESSAGES"===t.type?function(e,t){return Object(S.a)({},e,{messages:t})}(e,t.messages):"SET_PENDING_MESSAGE"===t.type?function(e,t,a){var n=Object(_.a)(e,function(e){var n=e.users.findIndex(function(e){return e.username===t});0===a?e.users[n].pending=0:e.users[n].pending+=1});return Object(S.a)({},e,{users:n.users})}(e,t.from,t.pending):"SET_ACTIVE_CHAT"===t.type?function(e,t){return Object(S.a)({},e,{activeChat:t})}(e,t.activeChat):e},L=Object(y.combineReducers)({ui:k,auth:x,chat:T}),U=Object(y.createStore)(L,Object(O.composeWithDevTools)(Object(y.applyMiddleware)(C.a))),M=function(e){var t=[];return e&&(t=e.map(function(e,t){return{username:e,pending:0}})),{type:"SET_USERS",users:t}},G=function(e){return{type:"GET_MESSAGES",messages:JSON.parse(localStorage.getItem(e))||[]}},D=function(e){return function(t){t(U.getState().chat.activeChat===e?G(e):R(e,1))}},R=function(e,t){return{type:"SET_PENDING_MESSAGE",from:e,pending:t}},P=function(e){return{type:"SET_AUTH",authData:e}},B=function(e,t){return function(a){var n,r;a({type:"UI_START_LOADING"}),a(w("")),(n="/auth/signup",r={name:e,password:t},fetch(N+n,{method:"PUT",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}})).then(function(e){if(422===e.status)throw new Error("Validation failed. Make sure the email address isn't used yet!");if(200!==e.status&&201!==e.status)throw console.log("Error!"),new Error("Creating a user failed!");a({type:"UI_STOP_LOADING"}),a({type:"IS_SIGNUP",isSignup:!1})}).catch(function(e){a({type:"UI_STOP_LOADING"}),a(w(e.message))})}},J=function(e,t,a,n){var r=v()(window.location.origin);a(r),r.on("users",function(e){var a=JSON.parse(e);t(a)}),r.on("new_message",function(e){var t=JSON.parse(e),a=JSON.parse(localStorage.getItem(t.from));a?a.push(t):a=[t],localStorage.setItem(t.from,JSON.stringify(a)),n(t.from)}),r.emit("logged_in",{username:e.username}),t(e.users),localStorage.setItem("username",e.username)},z=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={isSignup:!1,username:"",password:"",rePassword:""},a.toggleLogin=function(){a.props.setSignup(!a.props.isSignup)},a.handleChange=function(e){a.setState(Object(h.a)({},e.target.name,e.target.value))},a.handleSubmit=function(){var e=Object(f.a)(g.a.mark(function e(t){var n,r,s;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),n=a.state,r=n.username,s=n.password,a.props.isSignup?a.validateForm(!1)&&a.props.signup(r,s):a.validateForm(!0)&&a.props.login(r,s).then(function(){a.props.authStateChanged()});case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.validateForm=function(e){var t="",n=a.state,r=n.username,s=n.password,o=n.rePassword;return""===s||""===r?t="All fields are required":e||o===s||(t="The two passwords do not match"),""===t||(a.props.setLoginError(t),!1)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container  "},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"center-form"},r.a.createElement("div",{className:"col-sm-12 col-md-10 col-md-offset-1"},r.a.createElement("p",{className:"home-logo text-center mt-4 text-muted"},r.a.createElement("i",{className:"fas fa-cube"})," ChatBox"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group input-group"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"}," ",r.a.createElement("i",{className:"fa fa-user"})," ")),r.a.createElement("input",{name:"username",className:"form-control",placeholder:"Username",type:"text",onChange:this.handleChange})),r.a.createElement("div",{className:"form-group input-group"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"}," ",r.a.createElement("i",{className:"fa fa-lock"})," ")),r.a.createElement("input",{name:"password",className:"form-control",placeholder:"Password",type:"password",onChange:this.handleChange})),this.props.isSignup?r.a.createElement("div",{className:"form-group input-group"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{className:"input-group-text"}," ",r.a.createElement("i",{className:"fa fa-lock"})," ")),r.a.createElement("input",{name:"rePassword",className:"form-control",placeholder:"Repeat password",type:"password",onChange:this.handleChange})):null,r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"}," ",this.props.isSignup?"Create Account":"Log In"))),r.a.createElement("p",{className:"text-center my-0",style:{fontSize:"0.8rem",color:"red"}},this.props.loginError),r.a.createElement("br",null),r.a.createElement("p",{className:"text-center"},this.props.isSignup?"Have an account?":"Don't have an account?",r.a.createElement("button",{className:"btn btn-link mb-1",onClick:this.toggleLogin},this.props.isSignup?"Log In":"Signup"))))))}}]),t}(n.Component),H=Object(d.b)(function(e){return{isSignup:e.ui.isSignup,loginError:e.ui.loginError}},function(e){return{setSignup:function(t){return e(function(e){return{type:"IS_SIGNUP",isSignup:e}}(t))},login:function(t,a){return e(function(e,t){return function(){var a=Object(f.a)(g.a.mark(function a(n){var r,s,o;return g.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n({type:"UI_START_LOADING"}),n(w("")),a.next=5,b("/auth/login",{name:e,password:t});case 5:if(422!==(r=a.sent).status){a.next=8;break}throw new Error("Not a member of ChatBox");case 8:if(401!==r.status){a.next=10;break}throw new Error("Wrong password");case 10:if(200===r.status||201===r.status){a.next=13;break}throw console.log("Error!",r.status),new Error("Could not authenticate you!");case 13:return a.next=15,r.json();case 15:s=a.sent,o=s.token,localStorage.setItem("token",o),J(s,function(e){n(M(e))},function(t){n(P({authState:!0,username:e,token:o,socket:t}))},function(e){n(D(e))}),n({type:"UI_STOP_LOADING"}),a.next=26;break;case 22:a.prev=22,a.t0=a.catch(0),n({type:"UI_STOP_LOADING"}),n(w(a.t0.message));case 26:case"end":return a.stop()}},a,null,[[0,22]])}));return function(e){return a.apply(this,arguments)}}()}(t,a))},signup:function(t,a){return e(B(t,a))},setLoginError:function(t){return e(w(t))}}})(z),F=function(e){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("p",{className:"side-logo text-center mt-4"},r.a.createElement("i",{className:"fas fa-cube"})," ChatBox"),r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropbtn"},r.a.createElement("i",{className:"fas fa-user mr-3"}),e.username,r.a.createElement("i",{className:"fas fa-angle-down ml-3"})),r.a.createElement("div",{className:"dropdown-content"},r.a.createElement("div",{style:{cursor:"pointer"},onClick:e.onLogout},"Log Out",r.a.createElement("i",{className:"ml-3 fas fa-sign-out-alt"})))))),r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"mt-3 font-weight-bold text-white text-muted"},"Online users list")),e.users.map(function(t,a){return e.username!==t.username&&r.a.createElement("div",{className:e.activeChat===t.username?"active row user-list-item ml-1":"row user-list-item ml-1",onClick:function(){return e.onUserClick(t.username)},key:a},e.activeChat===t.username?r.a.createElement("i",{className:"fas fa-user-ninja mr-3 pt-1 mb-3"}):r.a.createElement("i",{className:"far fa-user mr-3 pt-1 mb-3 my-auto"}),t.username,0!==t.pending?r.a.createElement("label",{className:"badge badge-pill badge-warning ml-auto"},t.pending):null," ")}))},V=a(60),W=a.n(V),q=function(e){return r.a.createElement("div",{className:"row mt-1"},r.a.createElement("div",{className:"col-1"},e.itsMe?r.a.createElement("i",{className:"far fa-user mt-2 ",style:{fontSize:40}}):r.a.createElement("i",{className:"fas fa-user-ninja mt-2 ",style:{fontSize:40}})),r.a.createElement("div",{className:"col-11"},r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"font-weight-bold text-monospace",style:{fontSize:12}},e.messageFrom),r.a.createElement("p",{className:"text-muted ml-1 font-italic",style:{fontSize:12}},W()(Number(e.messageTime)).fromNow())),r.a.createElement("div",{className:"row"},r.a.createElement("p",{style:{fontSize:12}},e.messageContent))),r.a.createElement("hr",{style:{width:"80%"}}))},$=function(e){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 mt-3 chat-header"},r.a.createElement("p",{className:"mt-3"},"Chatting with ",r.a.createElement("i",{className:"fas fa-long-arrow-alt-right mr-2"}),e.activeChat))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 mt-3 chat-area",ref:e.msgBoxRef},e.messages.map(function(t,a){return r.a.createElement(q,{key:a,messageFrom:t.from,messageContent:t.content,messageTime:t.time,itsMe:e.currentUser===t.from})}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"input-group mb-3 mt-5"},r.a.createElement("input",{type:"text",className:"form-control",onChange:e.onMessageChanged,"aria-label":"Example text with button addon","aria-describedby":"button-addon1",value:e.inputText}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{onClick:e.onSendMessage,className:"btn btn-outline-primary",type:"button",id:"button-addon1"},"Send")))))},K=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={messageInput:""},a.msgBoxRef={},a.handleLogout=Object(f.a)(g.a.mark(function e(){return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.logout();case 2:a.props.authStateChanged();case 3:case"end":return e.stop()}},e)})),a.handelUserClick=function(e){a.toggleActiveChat(e),a.props.getMessages(e)},a.toggleActiveChat=function(e){a.props.setActiveChat(e),a.props.setPendingMessage(e,0),a.setState(function(e){return Object(S.a)({},e,{messageInput:""})})},a.handleMessageChange=function(e){var t=e.target.value;a.setState(function(e){return Object(S.a)({},e,{messageInput:t})})},a.handleSendMessage=function(){""!==a.state.messageInput&&(a.props.sendMessage({from:a.props.currentUser,to:a.props.activeChat,content:a.state.messageInput,time:""}),a.setState(function(e){return Object(S.a)({},e,{messageInput:""})}))},a.getMsgBoxRef=function(e){a.msgBoxRef=e},a.componentDidUpdate=function(){a.msgBoxRef.scrollTop=a.msgBoxRef.scrollHeight},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"row",style:{width:"100vw"}},r.a.createElement("div",{className:"col-md-3  side-panel"},r.a.createElement(F,{activeChat:this.props.activeChat,onUserClick:this.handelUserClick,onLogout:this.handleLogout,users:this.props.usersList,username:this.props.currentUser})),r.a.createElement("div",{className:"col-md-9",style:{backgroundColor:"#eee"}},""!==this.props.activeChat?r.a.createElement($,{messages:this.props.messages,activeChat:this.props.activeChat,onMessageChanged:this.handleMessageChange,onSendMessage:this.handleSendMessage,currentUser:this.props.currentUser,inputText:this.state.messageInput,msgBoxRef:this.getMsgBoxRef}):null))}}]),t}(n.Component),Q=Object(d.b)(function(e){return{usersList:e.chat.users,currentUser:e.auth.username,messages:e.chat.messages,activeChat:e.chat.activeChat}},function(e){return{logout:function(){return e((U.getState().auth.socket.emit("logout"),function(e){e(P({authState:!1,username:"",token:"",socket:{}})),localStorage.removeItem("token")}))},sendMessage:function(t){return e(function(e){var t=U.getState().auth.socket;e.time=Date.now().toString();var a=JSON.parse(localStorage.getItem(e.to));return a?a.push(e):a=[e],localStorage.setItem(e.to,JSON.stringify(a)),t.emit("msg",e),{type:"SEND_MESSAGE",message:e}}(t))},getMessages:function(t){return e(G(t))},setActiveChat:function(t){return e(function(e){return{type:"SET_ACTIVE_CHAT",activeChat:e}}(t))},setPendingMessage:function(t,a){return e(R(t,a))}}})(K),X=a(12),Y=(a(100),function(){return r.a.createElement("div",{className:"spinner-border spinner"})}),Z=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={auth:!1},a.onAuthStateChanged=function(){a.props.isAuth?a.props.history.push("/"):a.props.history.push("/login")},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("token");t&&this.props.autoLogin(t).then(function(){e.onAuthStateChanged()}),this.onAuthStateChanged()}},{key:"render",value:function(){var e=this;return this.props.isLoading?r.a.createElement(Y,null):r.a.createElement(X.c,null,r.a.createElement(X.a,{exact:!0,path:"/",render:function(t){return r.a.createElement(Q,Object.assign({},t,{authStateChanged:e.onAuthStateChanged}))}}),r.a.createElement(X.a,{path:"/login",render:function(t){return r.a.createElement(H,Object.assign({},t,{authStateChanged:e.onAuthStateChanged}))}}))}}]),t}(n.Component),ee=Object(d.b)(function(e){return{isAuth:e.auth.isAuth,isLoading:e.ui.isLoading}},function(e){return{setAuth:function(t){return e(P(t))},autoLogin:function(t){return e(function(e){return function(){var t=Object(f.a)(g.a.mark(function t(a){var n,r;return g.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a({type:"UI_START_LOADING"}),t.next=4,b("/auth/autologin",{},{Authorization:"Bearer "+e});case 4:if(401!==(n=t.sent).status){t.next=7;break}throw new Error("Validation failed.");case 7:if(200===n.status||201===n.status){t.next=10;break}throw console.log("Error!",n.status),new Error("Could not authenticate you!");case 10:return t.next=12,n.json();case 12:r=t.sent,J(r,function(e){a(M(e))},function(t){a(P({authState:!0,username:r.username,token:e,socket:t}))},function(e){a(D(e))}),a({type:"UI_STOP_LOADING"}),t.next=21;break;case 17:t.prev=17,t.t0=t.catch(0),a({type:"UI_STOP_LOADING"}),console.log(t.t0);case 21:case"end":return t.stop()}},t,null,[[0,17]])}));return function(e){return t.apply(this,arguments)}}()}(t))}}})(Z),te=a(37);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ae=Object(X.e)(ee);o.a.render(r.a.createElement(d.a,{store:U},r.a.createElement(te.a,null,r.a.createElement(ae,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},62:function(e,t,a){e.exports=a(106)},67:function(e,t,a){},96:function(e,t){}},[[62,1,2]]]);
//# sourceMappingURL=main.4d247d9f.chunk.js.map
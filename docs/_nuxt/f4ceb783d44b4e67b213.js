(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{220:function(t,e,o){"use strict";o.r(e);o(49),o(17),o(38),o(18),o(11),o(29),o(211);var n=o(22),r=o(27),l=o(14),c=o.n(l);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}function d(t,e){for(var o=e.diff(t,"day"),n=Math.floor(o/7),r=o%7,l=t.day(),c=0,i=0;i<r;i++){var h=l+i;6!==h&&7!==h||c++}return o-2*n-c}var v={components:{Plotly:o(214).Plotly},data:function(){return{hoursPerDay:8,clockPickerData:null,plotlyLightMode:!1,plotlyLayoutDark:{paper_bgcolor:"#333333",font:{color:"#eeeeee"}},plotlyLayoutLight:{paper_bgcolor:"#fff",font:{color:"#333"}},plotlyDataStyle:{textinfo:"label+percent",type:"pie",showlegend:!1}}},computed:y(y(y({},Object(r.e)("analytics",[])),Object(r.c)("issues",["completedThisMonthHours","completedLastMonthHours"])),{},{daysInThisMonth:function(){return c()().daysInMonth()},workDaysInThisMonth:function(){return d(c()().startOf("month"),c()().endOf("month"))},passedWorkDaysInThisMonth:function(){return d(c()().startOf("month"),c()())},remainWorkDaysInThisMonth:function(){return this.workDaysInThisMonth-this.passedWorkDaysInThisMonth},sumOfCompletedThisMonthHours:function(){return this.completedThisMonthHours.length<1?null:this.completedThisMonthHours.map((function(t){return t.hours})).reduce((function(t,e,i,o){return t+e}))},plotlyLayout:function(){return this.plotlyLightMode?this.plotlyLayoutLight:this.plotlyLayoutDark},plotlyData:function(){var t=this;return new Map(["LastMonth","ThisMonth"].map((function(e){return[e,[Object.assign({values:t["completed".concat(e,"Hours")].map((function(t){return t.hours})),labels:t["completed".concat(e,"Hours")].map((function(t){return t.projectKey}))},t.plotlyDataStyle)]]})))}}),methods:y(y({},Object(r.b)("analytics",[])),Object(r.d)("analytics",[]))},f=o(23),component=Object(f.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"section"},[o("div",{staticClass:"container"},[o("div",{staticClass:"columns"},[o("div",{staticClass:"column"},[o("p",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.plotlyLightMode,expression:"plotlyLightMode"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.plotlyLightMode)?t._i(t.plotlyLightMode,null)>-1:t.plotlyLightMode},on:{change:function(e){var o=t.plotlyLightMode,n=e.target,r=!!n.checked;if(Array.isArray(o)){var l=t._i(o,null);n.checked?l<0&&(t.plotlyLightMode=o.concat([null])):l>-1&&(t.plotlyLightMode=o.slice(0,l).concat(o.slice(l+1)))}else t.plotlyLightMode=r}}}),t._v(" "),o("label",{attrs:{for:""}},[t._v("白背景グラフ")])]),t._v(" "),o("p",[t._v("最新状態にするにはissuesを一回表示してください")])])]),t._v(" "),o("div",{staticClass:"columns"},[o("div",{staticClass:"column"},[o("p",[t._v("Last Month")]),t._v(" "),o("plotly",{attrs:{data:t.plotlyData.get("LastMonth"),layout:t.plotlyLayout,"display-mode-bar":!1}})],1),t._v(" "),o("div",{staticClass:"column"},[o("p",[t._v("This Month")]),t._v(" "),o("plotly",{attrs:{data:t.plotlyData.get("ThisMonth"),layout:t.plotlyLayout,"display-mode-bar":!1}})],1)]),t._v(" "),o("p",[t._v("今月の入力済み時間 "+t._s(t.sumOfCompletedThisMonthHours)+"h")]),t._v(" "),o("p",[t._v("weekday:"+t._s(t.daysInThisMonth)+"日中"+t._s(t.workDaysInThisMonth)+"日("+t._s(t.workDaysInThisMonth*t.hoursPerDay)+"時間)")]),t._v(" "),o("p",[t._v("経過"+t._s(t.passedWorkDaysInThisMonth*t.hoursPerDay)+"時間/残り"+t._s(t.remainWorkDaysInThisMonth*t.hoursPerDay)+"時間")]),t._v(" "),o("b-collapse",{staticClass:"card",attrs:{open:!1,"aria-id":"settings"},scopedSlots:t._u([{key:"trigger",fn:function(e){return o("div",{staticClass:"card-header",attrs:{role:"button","aria-controls":"settings"}},[o("p",{staticClass:"card-header-title"},[t._v("\n          Settings\n        ")]),t._v(" "),o("a",{staticClass:"card-header-icon"},[o("b-icon",{attrs:{icon:e.open?"menu-down":"menu-up"}})],1)])}}])},[t._v(" "),o("div",{staticClass:"card-content"},[o("div",{staticClass:"content"},[o("div",{staticClass:"field is-horizontal"},[o("span",{staticStyle:{"align-self":"center"}},[t._v("1日あたり時間数")]),t._v(" "),o("div",{staticClass:"control"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.hoursPerDay,expression:"hoursPerDay"}],staticClass:"input",attrs:{type:"number"},domProps:{value:t.hoursPerDay},on:{input:function(e){e.target.composing||(t.hoursPerDay=e.target.value)}}})]),t._v(" "),o("span",{staticStyle:{"align-self":"center"}},[t._v("時間")])])])])])],1)])}),[],!1,null,null,null);e.default=component.exports}}]);
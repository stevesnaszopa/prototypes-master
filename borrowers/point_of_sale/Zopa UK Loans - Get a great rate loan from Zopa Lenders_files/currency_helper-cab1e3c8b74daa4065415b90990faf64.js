(function(e,t){"use strict";var n=function(e){return/^([1-9][0-9]*|0)(\.[0-9]{0,2})?$/.test(e)},r=function(e){return Number(e.replace(/[^0-9\.]+/g,""))},i=function(e,t){var n="",r=0,i=0,s=0,o=0;t=t||"£",isNaN(e)&&(e=0),e<0&&(n="-",e=Math.abs(e)),e=Math.floor(e*100+.50000000001),r=e%100,e=Math.floor(e/100).toString(),r<10&&(r="0"+r),o=Math.floor((e.length-1)/3);for(i=0;i<o;i++)s=e.length-(4*i+3),e=e.substring(0,s)+","+e.substring(s);return n+t+e+"."+r};e.currencyHelper={validCurrency:n,currencyToNumber:r,numberToCurrency:i}})(typeof exports=="object"&&exports||this);
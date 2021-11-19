'use strict';

const { STATUS, HTTP_STATUS } = require('./constant');
const moment = require('moment');

const common = {
    createResponse: (status, data) => {
        return {
            status: status,
            data,
        };
    },
    isEmpty: (input) => {
        return input === null || input === undefined || input === '';
    },

    createRes: (data,res) => {
        res.status(HTTP_STATUS.OK);
        return res.json(data);
    },

    prefixZero: (num, length) => {
        return (new Array(length).join('0') + num).slice(-length);
    },

    strToTime: (str, format) => {
        return  moment(str,format).toDate();
    },

    strTimeFormat: (str, format) => {
        return  moment(str).format(format);
    },

    nowFormat: (format) => {
        return  moment().format(format);
    },

    inArray:(search,array) => {
        for(var i in array){
            if(array[i]==search){
                return true;
            }
        }
        return false;
    },
    sleep:(t) => {
        return new Promise(res => setTimeout(res, t))
    },
    delUrlParam:(url,name) => {
        var urlArr = url.split('?');
        if(urlArr.length>1 && urlArr[1].indexOf(name)>-1){
            var query = urlArr[1];
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var urlte = urlArr[0] +'?'+ JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
            return urlte;
        }else{
            return url;
        };
    },
    delXmlNode:(xmlString,name) => {
        if(xmlString.indexOf("<"+name+">")>-1){
            var start = xmlString.indexOf("<"+name+">");
            var end = xmlString.lastIndexOf("<\/"+name+">");
            return xmlString.substring(0,start)+xmlString.substring(end+name.length+3,xmlString.length); 
        }else{
            return xmlString;
        };
    },
    h2d :(s) =>{
        function add(x, y) {
            let c = 0;
            const r = [];
            x = x.split('').map(Number);
            y = y.split('').map(Number);
            while (x.length || y.length) {
                const s = (x.pop() || 0) + (y.pop() || 0) + c;
                r.unshift(s < 10 ? s : s - 10);
                c = s < 10 ? 0 : 1;
            }
            if (c)
                r.unshift(c);
            return r.join('');
        }
        let dec = '0';
        s.split('').forEach(function (chr) {
            let n = parseInt(chr, 16);
            for (let t = 8; t; t >>= 1) {
                dec = add(dec, dec);
                if (n & t)
                    dec = add(dec, '1');
            }
        });
        return dec;
    }
};

module.exports = common;
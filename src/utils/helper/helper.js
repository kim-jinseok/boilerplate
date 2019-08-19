import axios from 'axios'

export default {
    install(Vue) {
        /// bind: 디렉티브가 처음 엘리먼트에 바인딩 될 때 한번만 호출 됩니다.이곳에서 일회성 설정을 할 수 있습니다.
        /// inserted: 바인딩 된 엘리먼트가 부모 노드에 삽입 되었을 때 호출 됩니다. (이것은 부모 노드 존재를 보장하며 반드시 document 내에 있는 것은 아닙니다.)
        /// update: 포함하는 컴포넌트가 업데이트 된 후 호출됩니다.그러나 자식이 업데이트 되기 전일 가능성이 있습니다 디렉티브의 값은 변경되었거나 변경되지 않았을 수 있지만 바인딩의 현재 값과 이전 값을 비교하여 불필요한 업데이트를 건너 뛸 수 있습니다. (아래의 훅 전달인자를 참조하세요)
        /// componentUpdated: 포함하고 있는 컴포넌트와 그 자식들 이 업데이트 된 후에 호출됩니다.
        /// unbind: 디렉티브가 엘리먼트로부터 언바인딩된 경우에만 한번 호출됩니다.

        Vue.directive('focus', {
            // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
            inserted: function(el) {
                // 엘리먼트에 포커스를 줍니다
                el.focus()
            }
        })

        window.helper = function() {

        }


        this.getSafeInt = function(val, def) {
            def = this.isSafeInt(def) ? def : 0
            return this.isSafeInt(val) ? parseInt(val, 10) : def
        }

        helper.getSafeFloat = function(val, def) {
            def = this.isSafeFloat(def) ? def : 0.0
            return this.isSafeFloat(val) ? parseFloat(val, 10) : def
        }

        helper.getSafeStr = function(val, def) {
            def = this.isEmptyStr(def) ? '' : def
            return this.isEmptyStr(val) ? def.trim() : val.trim()
        }

        helper.parseJwt = function(token) {
            if (this.isNull(token)) return ''
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

            return JSON.parse(decodeURIComponent(window.atob(base64)))
        }

        helper.navNoShow = function(route, noShowName) {
            return route.filter(function(v) {
                return v.name.indexOf(noShowName) === -1
            })
        }

        helper.getSafeBool = function(val, def) {
            def = this.isEmpty(def) ? false : def
            val = this.isEmpty(val) ? def : val

            if (val === true || val === false) {
                return val
            } else if (val === 1 || val === 0) {
                return val === 1
            } else if (val === 'true' || val === 'false') {
                return val === 'true'
            } else if (val === 'True' || val === 'False') {
                return val === 'True'
            } else if (val === 'TRUE' || val === 'FALSE') {
                return val === 'TRUE'
            } else if (val === '1' || val === '0') {
                return val === '1'
            } else {
                return false
            }
        }

        helper.getSafeDate = function(jsonDate, formatString, def) {

            var date = this.isEmpty(jsonDate) ? def : this.getDateFromJsonDate(jsonDate);
                
            // var result = this.isEmpty(date) ? '' : moment(date).format((this.getSafeStr(formatString, '') === '' ? 'YYYY-MM-DD' : formatString));
            
            // if (result.isIn(['1900-01-01', '1800-01-01'])) {
            //     result = this.isEmpty(def) ? '' : def
            // }

            return date;
        }

        
        helper.getDateFromJsonDate = function (jsonDate) {
            
            var datepart = '';

            try {
                if (jsonDate !== null) {
                    datepart = jsonDate.substring(0,10);
                 
       
                    if (this.isSafeInt(datepart)) {
                        return new Date(parseInt(datepart, 10));
                    }

                    
                }
               
            }
            catch (e) {
               
            }
           
            return datepart
        };


        helper.brText = function() {
            return this.replace(/\n/g, '<br />')
        }

        helper.isNull = function(val) {
            var rtn = true
            if (typeof(val) === 'undefined' || val === undefined || val === 'null' || val === null || val === '') {
                rtn = true
            } else if (typeof(val) === [] && val.length < 1) {
                rtn = true
            } else {
                rtn = false
            }
            return rtn
        }

        helper.isEmpty = function(val) {
            return (typeof(val) === 'undefined') || val === undefined || (val === null);
        }



        helper.serialize = function(obj, prefix) {
            var str = []
            var p
            for (p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + '[' + p + ']' : p
                    var v = obj[p]
                    str.push((v !== null && typeof v === 'object') ?
                        this.serialize(v, k) :
                        encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
            }
            return str.join('&');
        }

        helper.getJSON = async function(sp, params, callback) {

            try {

                const param = { spName: sp, jsonParam: JSON.stringify(params), logging: '' }

                const result = await axios.post('/api/ajax/dbGetResultAsJson', param).then(callback).catch(function(data) {
                
                })

                return result.data

            } catch (err) {


            }
        }


        helper.getINT = async function(param, sp_name) {
            param = JSON.stringify(param)

            return await axios.get('/api/ajax/dbGetResultAsInt?spName=' + sp_name + '&jsonParam=' + param)
        }

        helper.getSTR = async function(param, sp_name) {
            param = JSON.stringify(param)
            return await axios.get('/api/ajax/dbGetResultAsStr?spName=' + sp_name + '&jsonParam=' + param)
        }

          //확장명 찾기
          helper.getExtension = function (file) {
                if (helper.isNull(file)) return "";

                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                return extension;
         }

         
        helper.getSafeBoolean = function (val, def) {
            def = this.isEmpty(def) ? false : def
            val = this.isEmpty(val) ? def : val;

            if (val === true || val === false) {
                return val;
            }
            else if (val === 1 || val === 0) {
                return val === 1;
            }
            else if (val === "true" || val === "false") {
                return val === "true";
            }
            else if (val === "True" || val === "False") {
                return val === "True";
            }
            else if (val === "TRUE" || val === "FALSE") {
                return val === "TRUE";
            }
            else if (val === "1" || val === "0") {
                return val === "1";
            }
            else {
                return false
            }
     };

     
        //3d파일 미리보기를 이미지로 확인할 파일
        helper.chkDrawingImgFile = function (ext) {

            if ($.inArray(ext, base.drawingImgExt) != -1) {
                return true;
            } else {
                return false;
            }
        }

        //확장명 변경
        helper.setChangeFileExtension = function (file, chgExt) {
            if (helper.isNull(file)) return "";

            var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();

            return file.substring(0, file.lastIndexOf('.') + 1) + chgExt;

        }

        helper.rpc = function (Source, From, To) { if (this.isEmpty(Source)) { return ""; } var Rslt = Source; while (Rslt.indexOf(From) > -1) { Rslt = Rslt.replace(From, To); } return Rslt; }




    }


}
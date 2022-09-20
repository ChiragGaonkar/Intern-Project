const validatorMixin = {
    data() {
      return {
  
      }
    },
  
    mounted() {
  
    },
  
    methods: {
  
      checkValidation(val, validRules, label) {
        if (label == undefined || label == '') {
          label = 'Field'
        }
        var isValid = true
        var validationMsg = ''
        var rules = validRules.split("|")
        for (var i = 0; i < rules.length; i++) {
          var ruleConfig = rules[i].split(":");
          switch (ruleConfig[0]) {
            case 'required': if (val == undefined || val == null || val == '' || val == '$$UNSET$$') {
              isValid = false
              validationMsg = label + ' is required'
            }
              break
            case 'alpha': var re = new RegExp("^[a-zA-Z]+$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only alphabets'
                }
              }
              break
            case 'numeric': var re = new RegExp("^[0-9]+$");
              if (val || val === 0) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only numbers'
                }
              }
              break
            case 'alpha-num': var re = new RegExp("^[a-zA-Z0-9{1}]+[a-zA-Z0-9 ]*$");
              if (val || val === 0) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only alphabets or numbers'
                }
              }
              break
            case 'alpha-num-special': var re = new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9 .,!?-]*$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only alphabets, numbers or , . - ! ? characters'
                }
              }
              break
            case 'email': var re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should be a valid email address'
                }
              }
              break
            case 'date': if (val) {
              var dateParts = val.split('-')
              var day = dateParts[0]
              var month = dateParts[1] - 1
              var year = dateParts[2]
              var dateObj = new Date(year, month, day)
              if (dateObj == 'Invalid Date') {
                isValid = false
                validationMsg = label + ' should be a valid date (DD-MM-YYYY)'
              }
            }
              break
            case 'time': var re = new RegExp("^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should be a valid time (HH:mm)'
                }
              }
              break
  
            case 'decimal': var re = new RegExp("^[0-9]+(\\.[0-9]{1,2})?$");
              if (val || val === 0) {
                if (val !== '' && !re.test(val)) {
                  isValid = false
                  validationMsg = label + ' only upto 2 decimal places'
                }
              }
              break
            case 'alpha-dash': var re = new RegExp("^[a-zA-Z0-9-_]+$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only alpha-numeric, dashes and underscores'
                }
              }
              break
  
            case 'alpha-space': var re = new RegExp("^[a-zA-Z\\s]+$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain alphabetic characters and spaces'
                }
              }
              break
            case 'max': var len = ruleConfig[1]
              if (val) {
                if (val.length > len) {
                  isValid = false
                  validationMsg = 'Maximum ' + len + ' characters'
                }
              }
              break
            case 'min': var len = ruleConfig[1]
              if (val) {
                if (val.length < len) {
                  isValid = false
                  validationMsg = 'Minimum ' + len + ' characters'
                }
              }
              break
            case 'max-value': var num = parseInt(ruleConfig[1])
              if (val > num && val != null) {
                isValid = false;
                validationMsg = 'Exceeding max value ' + num;
              }
              break;
  
            case 'min-value': var num = parseInt(ruleConfig[1])
              if (val < num && val != null) {
                isValid = false;
                validationMsg = 'Lower than min value ' + num;
              }
              break;
  
            case 'alpha-dash-lowercase': var re = new RegExp("^[a-z0-9-_]*$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only lowercase characters, numbers, dashes and underscores'
                }
              }
              break
            case 'first-alpha': var re = new RegExp("^[a-zA-Z]{1}");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = 'First character should be alphabet'
                }
              }
              break
            case 'alpha-num-finite-special-char': var re = new RegExp("^[a-zA-Z0-9{1}]+[a-zA-Z0-9-,. ]*$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should contain only alphabets, numbers or , . - characters'
                }
              }
              break
  
            case 'geom-point': var re = new RegExp(/^Point\s*\((\s*[+-]{0,1}(([0-9]|[0-8][0-9])\.\d*|90)\s+[+-]{0,1}((\d{0,2}|1[0-7][0-9])\.\d*|180)\s*){1}\s*\)/g);
              if (val) {
                if (!re.test(val)) {
                  isValid = false;
                  validationMsg = 'Invalid point WKT format'
                }
              }
              break;
  
            case 'geom-linestring': var re = new RegExp(/^LineString\s*\((\s*[+-]{0,1}(([0-9]|[0-8][0-9])\.\d*|90)\s+[+-]{0,1}((\d{0,2}|1[0-7][0-9])\.\d*|180)\s*,)+\s*([+-]{0,1}(([0-9]|[0-8][0-9])\.\d*|90)\s+[+-]{0,1}((\d{0,2}|1[0-7][0-9])\.\d*|180)\s*)\s*\)/g);
              if (val) {
                if (!re.test(val)) {
                  isValid = false;
                  validationMsg = 'Invalid linestring WKT format'
                }
              }
              break;
  
            case 'geom-polygon': var re = new RegExp(/^Polygon\s*\(\s*\(((\s*[+-]{0,1}(([0-9]|[0-8][0-9])\.\d*|90)\s+[+-]{0,1}((\d{0,2}|1[0-7][0-9])\.\d*|180)\s*,)+\s*([+-]{0,1}(([0-9]|[0-8][0-9])\.\d*|90)\s+[+-]{0,1}((\d{0,2}|1[0-7][0-9])\.\d*|180)\s*)\s*\))+\s*\)/g);
              if (val) {
                if (!re.test(val)) {
                  isValid = false;
                  validationMsg = 'Invalid polygon WKT format'
                }
              }
              break;
            case 'mobile': var re = new RegExp("^[1-9]{1}[0-9]{9}$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = label + ' should be a valid mobile number'
                }
              }
              break;
            case 'password': var re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
              if (val) {
                if (!re.test(val)) {
                  isValid = false
                  validationMsg = 'Min 8 chars, atleast 1 upper case, 1 lower case,1 special chars and 1 number'
                }
              }
              break;
          }
          if (!isValid) {
            break
          }
        }
  
  
        if (validationMsg === '') {
          return true
        } else {
          return validationMsg
        }
  
      }
  
    }
  }
  
  export default validatorMixin
  